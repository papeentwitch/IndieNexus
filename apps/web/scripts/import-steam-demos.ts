import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const response = await fetch(
        "https://steamspy.com/api.php?request=tag&tag=Demo&page=0"
    );

    const games = await response.json();

    const ids = Object.keys(games).slice(0, 100);

    console.log("Steam demos found:", ids.length);

    for (const id of ids) {
        const details = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${id}&cc=us&l=english`
        );

        const json = await details.json();
        const item = json[id];

        if (!item?.success) continue;

        const data = item.data;

        await prisma.game.upsert({
            where: {
                slug: `steam-${id}`,
            },

            update: {
                hasDemo: true,
                steamAppId: Number(id),
            },

            create: {
                slug: `steam-${id}`,
                steamAppId: Number(id),

                title: data.name,

                description:
                    data.short_description ??
                    "Steam demo available.",

                genre: "Indie",

                platforms: "PC",

                releaseDate: new Date(),

                status: data.release_date?.coming_soon
                    ? "upcoming"
                    : "released",

                image: data.header_image ?? "",

                developer:
                    data.developers?.join(", ") ??
                    "Unknown",

                publisher:
                    data.publishers?.join(", ") ??
                    "Unknown",

                country: "Unknown",

                multiplayer: false,
                coop: false,
                controller: false,

                hasDemo: true,
                hasPlaytest: false,

                steamUrl:
                    `https://store.steampowered.com/app/${id}`,

                stores: "Steam",

                tags: "Steam,Demo",
            },
        });

        console.log("Demo:", data.name);
    }

    console.log("Steam demos completed");
}

main()
    .finally(() => prisma.$disconnect());