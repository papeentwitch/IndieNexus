import { GameDetailClient } from "../../../components/GameDetailClient";
import { prisma } from "../../../lib/prisma";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function GamePage({ params }: Props) {
    const { slug } = await params;

    const game = await prisma.game.findUnique({
        where: { slug },
        include: {
            translations: true,
        },
    });

    if (!game) {
        return (
            <main className="min-h-screen bg-black p-12 text-white">
                Jeu introuvable
            </main>
        );
    }

    return <GameDetailClient game={game} />;
}