export const translations = {
  fr: {
    games: "Jeux",
    news: "Actualités",
    calendar: "Calendrier",
    title: "Découvrez la nouvelle génération de jeux indépendants.",
    subtitle:
      "Explorez les jeux indépendants du monde entier, leurs studios, plateformes et actualités.",
    search: "Rechercher un jeu, studio, genre...",
    discoveries: "Découvertes à venir",
    allPlatforms: "Toutes les plateformes",
    coop: "Coop",
    controller: "Manette",
  },

  en: {
    games: "Games",
    news: "News",
    calendar: "Calendar",
    title: "Discover the next generation of indie games.",
    subtitle:
      "Explore indie games worldwide, studios, platforms and gaming news.",
    search: "Search games, studios, genres...",
    discoveries: "Upcoming discoveries",
    allPlatforms: "All platforms",
    coop: "Coop",
    controller: "Controller",
  },
};

export type Language = keyof typeof translations;