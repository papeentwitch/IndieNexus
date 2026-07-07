import Image from "next/image";
import Link from "next/link";

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
    });

    if (!game) {
        return (
            <main className="min-h-screen bg-black p-12 text-white">
                <h1 className="text-4xl font-bold">Jeu introuvable</h1>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <section className="relative h-[500px]">
                <Image src={game.image} alt={game.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/70" />

                <div className="absolute bottom-12 left-12">
                    <h1 className="text-7xl font-bold">{game.title}</h1>
                    <p className="mt-4 text-xl text-gray-300">{game.developer}</p>
                </div>
            </section>

            <section className="grid grid-cols-3 gap-12 px-12 py-12">
                <div className="col-span-2">
                    <h2 className="text-3xl font-bold">Description</h2>

                    <p className="mt-6 text-lg text-gray-400">{game.description}</p>

                    {game.officialWebsite && (
                        <Link
                            href={game.officialWebsite}
                            className="mt-10 inline-block rounded-xl bg-white px-6 py-3 text-black"
                        >
                            Site officiel
                        </Link>
                    )}
                </div>

                <aside className="rounded-3xl bg-zinc-900 p-8">
                    <h3 className="mb-6 text-2xl font-bold">Informations</h3>

                    <p>Studio : {game.developer}</p>
                    <p>Éditeur : {game.publisher}</p>
                    <p>Pays : {game.country}</p>

                    <hr className="my-5 border-zinc-700" />

                    <p>Genre : {game.genre}</p>
                    <p>Date : {game.releaseDate.toISOString().slice(0, 10)}</p>
                    <p>Statut : {game.status}</p>

                    <hr className="my-5 border-zinc-700" />

                    <p>Coop : {game.coop ? "Oui" : "Non"}</p>
                    <p>Manette : {game.controller ? "Oui" : "Non"}</p>
                </aside>
            </section>
        </main>
    );
}