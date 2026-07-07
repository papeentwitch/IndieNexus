import { PrismaClient } from "@prisma/client";
import translate from "translate";

const prisma = new PrismaClient();

translate.engine = "google";

async function main() {
    const games = await prisma.game.findMany();

    for (const game of games) {
        const translatedDescription = await translate(game.description, {
            from: "en",
            to: "fr",
        });

        await prisma.gameTranslation.upsert({
            where: {
                gameId_locale: {
                    gameId: game.id,
                    locale: "fr",
                },
            },
            update: {
                title: game.title,
                description: translatedDescription,
            },
            create: {
                gameId: game.id,
                locale: "fr",
                title: game.title,
                description: translatedDescription,
            },
        });

        console.log("Translated:", game.title);
    }

    console.log("Translations completed");
}

main()
    .then(async () => prisma.$disconnect())
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });