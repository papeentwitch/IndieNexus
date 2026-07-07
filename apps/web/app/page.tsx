"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { GameCard } from "../components/GameCard";
import { games } from "../data/games";
import { Language, translations } from "../data/translations";
import { SearchBar } from "../components/SearchBar";

export default function Home() {
  const [language, setLanguage] = useState<Language>("fr");
  const [search, setSearch] = useState("");
  const text = translations[language];
  const filteredGames = games.filter((game) => {
    const query = search.toLowerCase();

    return (
      game.title.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query) ||
      game.genre.toLowerCase().includes(query) ||
      game.platforms
        .join(" ")
        .toLowerCase()
        .includes(query)
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
        <h2 className="max-w-4xl text-6xl font-bold">{text.title}</h2>

        <p className="mt-6 max-w-xl text-xl text-gray-400">{text.subtitle}</p>

        <SearchBar
          placeholder={text.search}
          value={search}
          onChange={setSearch}
        />
      </section>

      <section className="px-12">
        <h3 className="mb-8 text-2xl font-bold">{text.discoveries}</h3>

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