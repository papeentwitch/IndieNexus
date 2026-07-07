import Image from "next/image";
import { games } from "../../../data/games";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function GamePage({ params }: Props) {
    const { slug } = await params;

    const game = games.find((item) => item.slug === slug);

    if (!game) {
        return (
            <main className="min-h-screen bg-black p-12 text-white">
                <h1 className="text-4xl font-bold">Game not found</h1>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <section className="relative h-96">
                <Image src={game.image} alt={game.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/60" />
            </section>

            <section className="px-12 py-12">
                <h1 className="text-6xl font-bold">{game.title}</h1>

                <p className="mt-4 text-gray-400">
                    {game.developer} • {game.country}
                </p>

                <p className="mt-8 max-w-3xl text-xl text-gray-300">
                    {game.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm">
                    <span className="rounded-full bg-zinc-900 px-4 py-2">
                        {game.genre}
                    </span>

                    {game.platforms.map((platform) => (
                        <span key={platform} className="rounded-full bg-zinc-900 px-4 py-2">
                            {platform}
                        </span>
                    ))}

                    <span className="rounded-full bg-zinc-900 px-4 py-2">
                        {game.releaseDate}
                    </span>
                </div>
            </section>
        </main>
    );
}