import "dotenv/config";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function cleanHtml(value: string | null | undefined) {
    if (!value) return "No description available yet.";

    return value
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

async function main() {
    const key = process.env.RAWG_API_KEY;

    if (!key) {
        throw new Error("RAWG API key missing");
    }

    const response = await fetch(
        `https://api.rawg.io/api/games?key=${key}&genres=indie&page_size=40&dates=2026-07-07,2027-12-31&ordering=released`
    );

    const json = await response.json();

    for (const game of json.results) {
        const detailResponse = await fetch(
            `https://api.rawg.io/api/games/${game.slug}?key=${key}`
        );

        const detail = await detailResponse.json();

        await prisma.game.upsert({
            where: { slug: game.slug },

            update: {
                description: cleanHtml(detail.description),

                image: game.background_image ?? "",

                officialWebsite: detail.website || null,

                rating: detail.rating ?? null,

                metacritic: detail.metacritic ?? null,

                playtime: detail.playtime ?? null,

                rawgId: detail.id,

                status: game.released && new Date(game.released) > new Date()
                    ? "upcoming"
                    : "released",

                stores:
                    detail.stores
                        ?.map((item: any) => item.store.name)
                        .join(",") ?? null,

                tags:
                    detail.tags
                        ?.slice(0, 10)
                        .map((item: any) => item.name)
                        .join(",") ?? null,
            },

            create: {
                slug: game.slug,
                title: game.name,
                description: cleanHtml(detail.description),
                genre: "Indie",
                platforms:
                    game.platforms?.map((item: any) => item.platform.name).join(",") ??
                    "",
                releaseDate: game.released ? new Date(game.released) : new Date(),
                status: game.released && new Date(game.released) > new Date()
                    ? "upcoming"
                    : "released",
                image: game.background_image ?? "",
                developer: "Unknown",
                publisher: "Unknown",
                country: "Unknown",
                multiplayer: false,
                coop: false,
                controller: true,
                rating: detail.rating ?? null,

                metacritic: detail.metacritic ?? null,

                playtime: detail.playtime ?? null,

                rawgId: detail.id,

                stores:
                    detail.stores
                        ?.map((item: any) => item.store.name)
                        .join(",") ?? null,

                tags:
                    detail.tags
                        ?.slice(0, 10)
                        .map((item: any) => item.name)
                        .join(",") ?? null,
                officialWebsite: detail.website || null,
            },
        });

        console.log("Imported:", game.name);
    }

    console.log("RAWG import completed");
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