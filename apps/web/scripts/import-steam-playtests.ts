import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleanHtml(value: string | undefined) {
    if (!value) return "No description available yet.";
    return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

async function main() {
    await prisma.game.updateMany({
        data: {
            hasPlaytest: false,
        },
    });

    const response = await fetch(
        "https://store.steampowered.com/search/?term=playtest&category1=998",
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

    console.log("Steam playtest candidates:", ids.length);

    for (const id of ids) {
        const detailsResponse = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${id}&cc=us&l=english`
        );

        const detailsJson = await detailsResponse.json();
        const item = detailsJson[id];

        if (!item?.success || !item.data?.name) continue;

        const data = item.data;

        const isRealPlaytest = data.name.toLowerCase().includes("playtest");

        if (!isRealPlaytest) continue;

        await prisma.game.upsert({
            where: {
                slug: `steam-${id}`,
            },

            update: {
                title: data.name,
                description: cleanHtml(data.short_description),
                image: data.header_image ?? "",
                developer: data.developers?.join(", ") ?? "Unknown",
                publisher: data.publishers?.join(", ") ?? "Unknown",
                platforms: "PC",
                status: "upcoming",
                hasPlaytest: true,
                steamAppId: Number(id),
                steamUrl: `https://store.steampowered.com/app/${id}`,
                stores: "Steam",
                tags: "Steam,Playtest",
            },

            create: {
                slug: `steam-${id}`,
                steamAppId: Number(id),
                title: data.name,
                description: cleanHtml(data.short_description),
                genre: "Indie",
                platforms: "PC",
                releaseDate: new Date("2099-01-01"),
                releaseDateText: data.release_date?.date ?? "Playtest",
                status: "upcoming",
                image: data.header_image ?? "",
                developer: data.developers?.join(", ") ?? "Unknown",
                publisher: data.publishers?.join(", ") ?? "Unknown",
                country: "Unknown",
                multiplayer: false,
                coop: false,
                controller: Boolean(data.controller_support),
                hasDemo: false,
                hasPlaytest: true,
                steamUrl: `https://store.steampowered.com/app/${id}`,
                stores: "Steam",
                tags: "Steam,Playtest",
            },
        });

        console.log("Playtest imported:", data.name);
    }

    console.log("Steam playtests completed");
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });