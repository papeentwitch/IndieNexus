-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "platforms" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "multiplayer" BOOLEAN NOT NULL,
    "coop" BOOLEAN NOT NULL,
    "controller" BOOLEAN NOT NULL,
    "steamUrl" TEXT,
    "officialWebsite" TEXT,
    "trailerUrl" TEXT,
    "rating" REAL,
    "metacritic" INTEGER,
    "playtime" INTEGER,
    "steamAppId" INTEGER,
    "releaseDateText" TEXT,
    "hasDemo" BOOLEAN NOT NULL DEFAULT false,
    "hasPlaytest" BOOLEAN NOT NULL DEFAULT false,
    "isAvailableSteam" BOOLEAN NOT NULL DEFAULT true,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "price" TEXT,
    "discount" INTEGER,
    "vrOnly" BOOLEAN NOT NULL DEFAULT false,
    "screenshots" TEXT,
    "stores" TEXT,
    "tags" TEXT,
    "rawgId" INTEGER,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Game" ("controller", "coop", "country", "createdAt", "description", "developer", "genre", "hasDemo", "hasPlaytest", "id", "image", "metacritic", "multiplayer", "officialWebsite", "platforms", "playtime", "publisher", "rating", "rawgId", "releaseDate", "releaseDateText", "screenshots", "slug", "status", "steamAppId", "steamUrl", "stores", "tags", "title", "trailerUrl", "updatedAt") SELECT "controller", "coop", "country", "createdAt", "description", "developer", "genre", "hasDemo", "hasPlaytest", "id", "image", "metacritic", "multiplayer", "officialWebsite", "platforms", "playtime", "publisher", "rating", "rawgId", "releaseDate", "releaseDateText", "screenshots", "slug", "status", "steamAppId", "steamUrl", "stores", "tags", "title", "trailerUrl", "updatedAt" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
