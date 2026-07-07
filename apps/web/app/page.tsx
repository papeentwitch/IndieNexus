import { HomeClient } from "../components/HomeClient";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const games = await prisma.game.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const upcomingGames =
    await prisma.game.findMany({
      where: {
        status: "upcoming",
      },

      orderBy: {
        releaseDate: "asc",
      },

      take: 12,
    });

  return (
    <HomeClient
      games={games}
      upcomingGames={upcomingGames}
    />
  );
}