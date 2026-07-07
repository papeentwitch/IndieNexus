"use client";

import { useEffect, useState } from "react";

import { Filters } from "./Filters";
import { GameCard } from "./GameCard";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";

import { Language, translations } from "../data/translations";
import { LANGUAGE_STORAGE_KEY } from "../lib/language";

type Game = {
    id: number;
    slug: string;
    title: string;
    description: string;
    genre: string;
    platforms: string;
    releaseDate: Date;
    status: string;
    image: string;
    developer: string;
    country: string;
    coop: boolean;
    controller: boolean;
    translations: {
        id: number;
        gameId: number;
        locale: string;
        title: string;
        description: string;
    }[];
};

type Props = {
    games: Game[];
    upcomingGames: Game[];
    platforms: string[];
};

export function HomeClient({ games, upcomingGames, platforms }: Props) {
    const [language, setLanguage] = useState<Language>("fr");
    const [search, setSearch] = useState("");
    const [platform, setPlatform] = useState("");
    const [status, setStatus] = useState("");
    const [coop, setCoop] = useState(false);
    const [controller, setController] = useState(false);

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

    function getDescription(game: Game) {
        if (language === "fr") {
            return (
                game.translations.find((item) => item.locale === "fr")?.description ??
                game.description
            );
        }

        return game.description;
    }

    const filteredGames = games.filter((game) => {
        const query = search.toLowerCase();

        const gamePlatforms = game.platforms
            .split(",")
            .map((item) => item.trim());

        const description = getDescription(game);

        const matchesSearch =
            game.title.toLowerCase().includes(query) ||
            description.toLowerCase().includes(query) ||
            game.genre.toLowerCase().includes(query) ||
            game.platforms.toLowerCase().includes(query);

        return (
            matchesSearch &&
            (!platform || gamePlatforms.includes(platform)) &&
            (!status || game.status === status) &&
            (!coop || game.coop) &&
            (!controller || game.controller)
        );
    });

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

            <section className="px-12 py-24">
                <h2 className="max-w-4xl text-6xl font-bold">{text.title}</h2>

                <p className="mt-6 max-w-xl text-xl text-gray-400">{text.subtitle}</p>

                <SearchBar
                    placeholder={text.search}
                    value={search}
                    onChange={setSearch}
                />
            </section>

            <section className="px-12">
                <Filters
                    platform={platform}
                    setPlatform={setPlatform}
                    platforms={platforms}
                    status={status}
                    setStatus={setStatus}
                    coop={coop}
                    setCoop={setCoop}
                    controller={controller}
                    setController={setController}
                    text={{
                        allPlatforms: text.allPlatforms,
                        allStatus: text.allStatus,
                        released: text.released,
                        upcoming: text.upcoming,
                        development: text.development,
                        demo: text.demo,
                        playtest: text.playtest,
                        earlyAccess: text.earlyAccess,
                        coop: text.coop,
                        controller: text.controller,
                    }}
                />

                <div className="mb-8 flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{text.discoveries}</h3>

                    <span className="text-sm text-gray-400">
                        {filteredGames.length} {text.results}
                    </span>
                </div>

                {filteredGames.length === 0 ? (
                    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center text-gray-400">
                        {text.noResults}
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-8">
                        {filteredGames.map((game) => (
                            <GameCard
                                key={game.id}
                                slug={game.slug}
                                title={game.title}
                                description={getDescription(game)}
                                genre={game.genre}
                                platforms={game.platforms.split(",").map((item) => item.trim())}
                                releaseDate={new Date(game.releaseDate)
                                    .toISOString()
                                    .slice(0, 10)}
                                image={game.image}
                                developer={game.developer}
                                country={game.country}
                                coop={game.coop}
                                controller={game.controller}
                            />
                        ))}
                    </div>
                )}
            </section>

            <section className="px-12 py-20">
                <h3 className="mb-8 text-3xl font-bold">{text.upcomingReleases}</h3>

                <div className="grid grid-cols-3 gap-8">
                    {upcomingGames.map((game) => (
                        <GameCard
                            key={game.id}
                            slug={game.slug}
                            title={game.title}
                            description={getDescription(game)}
                            genre={game.genre}
                            platforms={game.platforms.split(",").map((item) => item.trim())}
                            releaseDate={new Date(game.releaseDate)
                                .toISOString()
                                .slice(0, 10)}
                            image={game.image}
                            developer={game.developer}
                            country={game.country}
                            coop={game.coop}
                            controller={game.controller}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}