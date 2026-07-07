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

    const frenchTranslation = game.translations.find(
        (item) => item.locale === "fr"
    );

    const description =
        frenchTranslation?.description ?? game.description;

    const screenshots = game.screenshots
        ? game.screenshots.split(",").filter(Boolean)
        : [];

    return (
        <main className="min-h-screen bg-black text-white">
            <section className="relative h-[500px]">
                <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/70" />

                <div className="absolute bottom-12 left-12">
                    <h1 className="text-7xl font-bold">{game.title}</h1>

                    <p className="mt-4 text-xl text-gray-300">{game.developer}</p>
                </div>
            </section>

            <section className="grid grid-cols-3 gap-12 px-12 py-12">
                <div className="col-span-2">
                    <h2 className="text-3xl font-bold">Description</h2>

                    <p className="mt-6 whitespace-pre-line text-lg text-gray-400">
                        {description}
                    </p>

                    {screenshots.length > 0 && (
                        <section className="mt-12">
                            <h2 className="mb-6 text-3xl font-bold">Galerie</h2>

                            <div className="grid grid-cols-2 gap-6">
                                {screenshots.map((screenshot) => (
                                    <div
                                        key={screenshot}
                                        className="relative h-64 overflow-hidden rounded-2xl border border-zinc-800"
                                    >
                                        <Image
                                            src={screenshot}
                                            alt={game.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="mt-10 flex gap-4">
                        {game.officialWebsite && (
                            <Link
                                href={game.officialWebsite}
                                className="rounded-xl bg-white px-6 py-3 text-black"
                            >
                                Site officiel
                            </Link>
                        )}
                    </div>
                </div>

                <aside className="space-y-5 rounded-3xl bg-zinc-900 p-8">
                    <h3 className="text-2xl font-bold">Informations</h3>

                    <p>Genre : {game.genre}</p>

                    <p>Sortie : {game.releaseDate.toISOString().slice(0, 10)}</p>

                    <p>Statut : {game.status}</p>

                    <hr className="border-zinc-700" />

                    <p>⭐ Note : {game.rating ?? "N/A"}</p>

                    <p>🏆 Metacritic : {game.metacritic ?? "N/A"}</p>

                    <p>⏱ Temps moyen : {game.playtime ?? "?"} h</p>

                    <hr className="border-zinc-700" />

                    <p>
                        Plateformes :
                        <br />
                        {game.platforms}
                    </p>

                    {game.stores && (
                        <p>
                            Stores :
                            <br />
                            {game.stores}
                        </p>
                    )}

                    {game.tags && (
                        <p>
                            Tags :
                            <br />
                            {game.tags}
                        </p>
                    )}
                </aside>
            </section>
        </main>
    );
}