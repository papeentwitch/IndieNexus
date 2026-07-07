import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleanHtml(value: string | undefined) {
    if (!value) return "No description available yet.";
    return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function safeDate(value: string | undefined) {
    if (!value || value === "Coming soon") return new Date("2099-01-01");

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? new Date("2099-01-01") : date;
}

function getStatus(data: any) {
    if (data.release_date?.coming_soon) return "upcoming";
    if (data.genres?.some((g: any) => g.description?.toLowerCase().includes("early access"))) return "early_access";
    return "released";
}

async function main() {
    const response = await fetch(
        "https://steamspy.com/api.php?request=tag&tag=Indie&page=0"
    );

    const steamSpyGames = await response.json();
    const appIds = Object.keys(steamSpyGames).slice(0, 150);

    for (const appId of appIds) {
        const detailsResponse = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${appId}&cc=us&l=english`
        );

        const detailsJson = await detailsResponse.json();
        const item = detailsJson[appId];

        if (!item?.success || !item.data?.name) continue;

        const data = item.data;

        const categories = data.categories?.map((c: any) => c.description.toLowerCase()) ?? [];
        const genres = data.genres?.map((g: any) => g.description.toLowerCase()) ?? [];

        const hasDemo =
            Boolean(data.demos?.length) ||
            categories.some((item: string) => item.includes("demo"));

        const hasPlaytest =
            data.name.toLowerCase().includes("playtest") ||
            categories.some((item: string) => item.includes("playtest"));

        const screenshots =
            data.screenshots
                ?.slice(0, 5)
                .map((screenshot: any) => screenshot.path_full)
                .join(",") ?? data.header_image ?? null;

        const status = getStatus(data);

        await prisma.game.upsert({
            where: {
                slug: `steam-${appId}`,
            },

            update: {
                steamAppId: Number(appId),
                title: data.name,
                description: cleanHtml(data.short_description),
                image: data.header_image ?? "",
                developer: data.developers?.join(", ") ?? "Unknown",
                publisher: data.publishers?.join(", ") ?? "Unknown",
                platforms: "PC",
                releaseDate: safeDate(data.release_date?.date),
                releaseDateText: data.release_date?.date ?? null,
                status,
                hasDemo,
                hasPlaytest,
                controller: Boolean(data.controller_support),
                steamUrl: `https://store.steampowered.com/app/${appId}`,
                stores: "Steam",
                tags: [...genres, "steam", "indie"].join(","),
                screenshots,
            },

            create: {
                slug: `steam-${appId}`,
                steamAppId: Number(appId),
                title: data.name,
                description: cleanHtml(data.short_description),
                genre: "Indie",
                platforms: "PC",
                releaseDate: safeDate(data.release_date?.date),
                releaseDateText: data.release_date?.date ?? null,
                status,
                image: data.header_image ?? "",
                developer: data.developers?.join(", ") ?? "Unknown",
                publisher: data.publishers?.join(", ") ?? "Unknown",
                country: "Unknown",
                multiplayer: false,
                coop: false,
                controller: Boolean(data.controller_support),
                hasDemo,
                hasPlaytest,
                steamUrl: `https://store.steampowered.com/app/${appId}`,
                stores: "Steam",
                tags: [...genres, "steam", "indie"].join(","),
                screenshots,
            },
        });

        console.log("Steam imported:", data.name, "-", status, {
            hasDemo,
            hasPlaytest,
            release: data.release_date?.date,
        });
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