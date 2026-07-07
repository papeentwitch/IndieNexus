"use client";

import { useState } from "react";

import { Filters } from "../components/Filters";
import { GameCard } from "../components/GameCard";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";

import { games } from "../data/games";
import { Language, translations } from "../data/translations";

export default function Home() {
  const [language, setLanguage] = useState<Language>("fr");

  const [search, setSearch] = useState("");

  const [platform, setPlatform] = useState("");

  const [status, setStatus] = useState("");

  const [coop, setCoop] = useState(false);

  const [controller, setController] = useState(false);

  const text = translations[language];

  const filteredGames = games.filter((game) => {
    const query = search.toLowerCase();

    const matchesSearch =
      game.title.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query) ||
      game.genre.toLowerCase().includes(query) ||
      game.platforms.join(" ").toLowerCase().includes(query);

    const matchesPlatform =
      !platform || game.platforms.includes(platform);

    const matchesStatus =
      !status || game.status === status;

    const matchesCoop =
      !coop || game.coop;

    const matchesController =
      !controller || game.controller;

    return (
      matchesSearch &&
      matchesPlatform &&
      matchesStatus &&
      matchesCoop &&
      matchesController
    );
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <Header
        language={language}
        setLanguage={setLanguage}
        text={{
          games: text.games,
          news: text.news,
          calendar: text.calendar,
        }}
      />

      <section className="px-12 py-24">
        <h2 className="max-w-4xl text-6xl font-bold">
          {text.title}
        </h2>

        <p className="mt-6 max-w-xl text-xl text-gray-400">
          {text.subtitle}
        </p>

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
            coop: text.coop,
            controller: text.controller,
          }}
        />

        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-bold">
            {text.discoveries}
          </h3>

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
                title={game.title}
                description={game.description}
                genre={game.genre}
                platforms={game.platforms}
                releaseDate={game.releaseDate}
                image={game.image}
                developer={game.developer}
                country={game.country}
                coop={game.coop}
                controller={game.controller}
                slug={game.slug}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}