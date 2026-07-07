import { HomeClient } from "../components/HomeClient";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const games = await prisma.game.findMany({
    include: {
      translations: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const upcomingGames = await prisma.game.findMany({
    include: {
      translations: true,
    },

    where: {
      status: "upcoming",
    },

    orderBy: {
      releaseDate: "asc",
    },

    take: 12,
  });

  const platforms = Array.from(
    new Set(
      games
        .flatMap((game) => game.platforms.split(","))
        .map((platform) => platform.trim())
        .filter(Boolean)
    )
  ).sort();

  return (
    <HomeClient
      games={games}
      upcomingGames={upcomingGames}
      platforms={platforms}
    />
  );
}