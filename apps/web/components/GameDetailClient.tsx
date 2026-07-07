"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Header } from "./Header";
import { Language, translations } from "../data/translations";
import { LANGUAGE_STORAGE_KEY } from "../lib/language";

type GameDetail = {
    title: string;
    description: string;
    image: string;
    developer: string;
    publisher: string;
    country: string;
    genre: string;
    platforms: string;
    releaseDate: Date;
    status: string;
    rating: number | null;
    metacritic: number | null;
    playtime: number | null;
    stores: string | null;
    tags: string | null;
    screenshots: string | null;
    officialWebsite: string | null;
    translations: {
        locale: string;
        title: string;
        description: string;
    }[];
};

type Props = {
    game: GameDetail;
};

export function GameDetailClient({ game }: Props) {
    const [language, setLanguage] = useState<Language>("fr");

    useEffect(() => {
        const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (savedLanguage === "fr" || savedLanguage === "en") {
            setLanguage(savedLanguage);
        }
    }, []);

    function handleLanguageChange(value: Language) {
        setLanguage(value);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
    }

    const text = translations[language];

    const translated = game.translations.find((item) => item.locale === language);

    const description =
        language === "fr"
            ? translated?.description ?? game.description
            : game.description;

    const screenshots = game.screenshots
        ? game.screenshots.split(",").filter(Boolean)
        : [];

    return (
        <main className="min-h-screen bg-black text-white">
            <Header
                language={language}
                setLanguage={handleLanguageChange}
                text={{
                    games: text.games,
                    news: text.news,
                    calendar: text.calendar,
                }}
            />

            <section className="relative h-[500px]">
                {game.image && (
                    <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                )}

                <div className="absolute inset-0 bg-black/70" />

                <div className="absolute bottom-12 left-12">
                    <h1 className="text-7xl font-bold">{game.title}</h1>
                    <p className="mt-4 text-xl text-gray-300">{game.developer}</p>
                </div>
            </section>

            <section className="grid grid-cols-3 gap-12 px-12 py-12">
                <div className="col-span-2">
                    <h2 className="text-3xl font-bold">{text.description}</h2>

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

                    {game.officialWebsite && (
                        <Link
                            href={game.officialWebsite}
                            className="mt-10 inline-block rounded-xl bg-white px-6 py-3 text-black"
                        >
                            {text.website}
                        </Link>
                    )}
                </div>

                <aside className="space-y-5 rounded-3xl bg-zinc-900 p-8">
                    <h3 className="text-2xl font-bold">{text.information}</h3>

                    <p>{text.genre} : {game.genre}</p>
                    <p>{text.date} : {new Date(game.releaseDate).toISOString().slice(0, 10)}</p>
                    <p>{text.status} : {game.status}</p>

                    <hr className="border-zinc-700" />

                    <p>⭐ Note : {game.rating ?? "N/A"}</p>
                    <p>🏆 Metacritic : {game.metacritic ?? "N/A"}</p>
                    <p>⏱ Temps moyen : {game.playtime ?? "?"} h</p>

                    <hr className="border-zinc-700" />

                    <p>Plateformes :<br />{game.platforms}</p>

                    {game.stores && <p>Stores :<br />{game.stores}</p>}
                    {game.tags && <p>Tags :<br />{game.tags}</p>}
                </aside>
            </section>
        </main>
    );
}