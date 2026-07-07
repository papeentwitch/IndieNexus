export type GameStatus = "released" | "upcoming" | "development";

export type Game = {
    id: number;

    slug: string;

    title: string;
    description: string;

    genre: string;

    platforms: string[];

    releaseDate: string;

    status: GameStatus;

    image: string;

    developer: string;
    publisher: string;
    country: string;

    multiplayer: boolean;
    coop: boolean;
    controller: boolean;

    steamUrl?: string;
    officialWebsite?: string;
    trailerUrl?: string;
};