"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { useState } from "react";

import { games } from "../../../data/games";
import { Language, translations } from "../../../data/translations";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default function GamePage({ params }: Props) {
    const { slug } = use(params);

    const [language, setLanguage] =
        useState<Language>("fr");

    const text = translations[language];

    const game = games.find(
        (item) => item.slug === slug
    );

    if (!game) {
        return (
            <main className="min-h-screen bg-black p-12 text-white">
                Jeu introuvable
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">

            <div className="absolute right-8 top-8 z-10">
                <select
                    value={language}
                    onChange={(e) =>
                        setLanguage(e.target.value as Language)
                    }
                    className="rounded-xl bg-zinc-900 px-4 py-2"
                >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                </select>
            </div>


            <section className="relative h-[500px]">
                <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/70" />

                <div className="absolute bottom-12 left-12">
                    <h1 className="text-7xl font-bold">
                        {game.title}
                    </h1>

                    <p className="mt-4 text-xl text-gray-300">
                        {game.developer}
                    </p>
                </div>
            </section>


            <section className="grid grid-cols-3 gap-12 px-12 py-12">

                <div className="col-span-2">

                    <h2 className="text-3xl font-bold">
                        {text.description}
                    </h2>

                    <p className="mt-6 text-lg text-gray-400">
                        {game.description}
                    </p>


                    {game.officialWebsite && (
                        <Link
                            href={game.officialWebsite}
                            className="mt-10 inline-block rounded-xl bg-white px-6 py-3 text-black"
                        >
                            {text.website}
                        </Link>
                    )}

                </div>


                <aside className="rounded-3xl bg-zinc-900 p-8">

                    <h3 className="mb-6 text-2xl font-bold">
                        {text.information}
                    </h3>

                    <p>{text.studio} : {game.developer}</p>
                    <p>{text.publisher} : {game.publisher}</p>
                    <p>{text.country} : {game.country}</p>

                    <hr className="my-5 border-zinc-700" />

                    <p>{text.genre} : {game.genre}</p>
                    <p>{text.date} : {game.releaseDate}</p>
                    <p>{text.status} : {game.status}</p>

                    <hr className="my-5 border-zinc-700" />

                    <p>
                        Coop : {game.coop ? text.yes : text.no}
                    </p>

                    <p>
                        Manette :{" "}
                        {game.controller ? text.yes : text.no}
                    </p>

                </aside>
            </section>

        </main>
    );
}