import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleanHtml(value: string | undefined) {
    if (!value) return "No description available yet.";
    return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

async function main() {
    const response = await fetch(
        "https://store.steampowered.com/search/?filter=comingsoon&category1=998",
        {
            headers: {
                "User-Agent": "Mozilla/5.0 IndieNexus",
            },
        }
    );

    const html = await response.text();

    const ids = Array.from(html.matchAll(/data-ds-appid="(\d+)"/g))
        .map((item) => item[1])
        .filter(Boolean)
        .slice(0, 50);

    console.log("Upcoming found:", ids.length);

    for (const id of ids) {
        const detailsResponse = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${id}&cc=us&l=english`
        );

        const detailsJson = await detailsResponse.json();
        const item = detailsJson[id];

        if (!item?.success || !item.data?.name) continue;

        const info = item.data;

        await prisma.game.upsert({
            where: {
                slug: `steam-${id}`,
            },
            update: {
                status: "upcoming",
                steamUrl: `https://store.steampowered.com/app/${id}`,
            },
            create: {
                slug: `steam-${id}`,
                title: info.name,
                description: cleanHtml(info.short_description),
                genre: "Indie",
                platforms: "PC",
                releaseDate: new Date(),
                status: "upcoming",
                image: info.header_image ?? "",
                developer: info.developers?.join(", ") ?? "Unknown",
                publisher: info.publishers?.join(", ") ?? "Unknown",
                country: "Unknown",
                multiplayer: false,
                coop: false,
                controller: Boolean(info.controller_support),
                steamUrl: `https://store.steampowered.com/app/${id}`,
                stores: "Steam",
                tags: "Steam,Upcoming",
            },
        });

        console.log("Upcoming:", info.name);
    }

    console.log("Steam upcoming completed");
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });