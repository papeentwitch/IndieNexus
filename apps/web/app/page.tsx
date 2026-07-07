import { HomeClient } from "../components/HomeClient";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const games = await prisma.game.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <HomeClient games={games} />;
}