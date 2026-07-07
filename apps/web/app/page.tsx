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

    const matchesCoop =
      !coop || game.coop;

    const matchesController =
      !controller || game.controller;

    return (
      matchesSearch &&
      matchesPlatform &&
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
          coop={coop}
          setCoop={setCoop}
          controller={controller}
          setController={setController}
          text={{
            allPlatforms: text.allPlatforms,
            coop: text.coop,
            controller: text.controller,
          }}
        />

        <h3 className="mb-8 text-2xl font-bold">
          {text.discoveries}
        </h3>

        <div className="grid grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              genre={game.genre}
              platforms={game.platforms}
              releaseDate={game.releaseDate}
              coop={game.coop}
              controller={game.controller}
            />
          ))}
        </div>
      </section>
    </main>
  );
}