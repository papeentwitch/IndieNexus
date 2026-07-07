import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleanHtml(value: string | undefined) {
    if (!value) return "No description available yet.";
    return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function safeDate(value: string | undefined) {
    if (!value || value === "Coming soon") return new Date();

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return new Date();
    }

    return date;
}

async function main() {
    const response = await fetch(
        "https://steamspy.com/api.php?request=tag&tag=Indie&page=0"
    );

    const steamSpyGames = await response.json();

    const appIds = Object.keys(steamSpyGames).slice(0, 50);

    for (const appId of appIds) {
        const detailsResponse = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=english`
        );

        const detailsJson = await detailsResponse.json();
        const item = detailsJson[appId];

        if (!item?.success || !item.data?.name) continue;

        const data = item.data;

        const screenshots =
            data.screenshots
                ?.slice(0, 5)
                .map((screenshot: any) => screenshot.path_full)
                .join(",") ?? data.header_image ?? null;

        await prisma.game.upsert({
            where: {
                slug: `steam-${appId}`,
            },

            update: {
                title: data.name,
                description: cleanHtml(data.short_description),
                image: data.header_image ?? "",
                developer: data.developers?.join(", ") ?? "Unknown",
                publisher: data.publishers?.join(", ") ?? "Unknown",
                platforms: "PC",
                releaseDate: safeDate(data.release_date?.date),
                status: data.release_date?.coming_soon ? "upcoming" : "released",
                controller: Boolean(data.controller_support),
                steamUrl: `https://store.steampowered.com/app/${appId}`,
                stores: "Steam",
                tags: "Steam,Indie",
                screenshots,
            },

            create: {
                slug: `steam-${appId}`,
                title: data.name,
                description: cleanHtml(data.short_description),
                genre: "Indie",
                platforms: "PC",
                releaseDate: safeDate(data.release_date?.date),
                status: data.release_date?.coming_soon ? "upcoming" : "released",
                image: data.header_image ?? "",
                developer: data.developers?.join(", ") ?? "Unknown",
                publisher: data.publishers?.join(", ") ?? "Unknown",
                country: "Unknown",
                multiplayer: false,
                coop: false,
                controller: Boolean(data.controller_support),
                steamUrl: `https://store.steampowered.com/app/${appId}`,
                stores: "Steam",
                tags: "Steam,Indie",
                screenshots,
            },
        });

        console.log("Steam imported:", data.name);
    }

    console.log("Steam import completed");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });