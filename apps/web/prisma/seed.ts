import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.game.deleteMany();

    await prisma.game.createMany({
        data: [
            {
                slug: "hollow-woods",
                title: "Hollow Woods",
                description: "A mysterious adventure game set in an ancient forgotten forest.",
                genre: "Adventure",
                platforms: "PC,Switch",
                releaseDate: new Date("2026-04-15"),
                status: "upcoming",
                image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
                developer: "Moon Lantern Studio",
                publisher: "Self-published",
                country: "Canada",
                multiplayer: false,
                coop: false,
                controller: true,
                officialWebsite: "https://example.com",
            },
            {
                slug: "neon-abyss-zero",
                title: "Neon Abyss Zero",
                description: "A fast roguelike action game in a cyberpunk universe.",
                genre: "Roguelike",
                platforms: "PC,PlayStation",
                releaseDate: new Date("2026-08-20"),
                status: "development",
                image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
                developer: "Pixel Forge",
                publisher: "Night Arcade",
                country: "France",
                multiplayer: true,
                coop: true,
                controller: true,
                steamUrl: "https://example.com",
            },
            {
                slug: "lost-planet-garden",
                title: "Lost Planet Garden",
                description: "Build and explore a peaceful world on a distant planet.",
                genre: "Simulation",
                platforms: "PC,Xbox",
                releaseDate: new Date("2025-11-10"),
                status: "released",
                image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8",
                developer: "Green Orbit Games",
                publisher: "Self-published",
                country: "Japan",
                multiplayer: false,
                coop: false,
                controller: true,
                officialWebsite: "https://example.com",
            },
        ],
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log("Seed completed");
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });