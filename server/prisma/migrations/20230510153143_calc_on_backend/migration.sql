-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "apiSymbol" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "thump" TEXT NOT NULL,
    "large" TEXT NOT NULL,
    "marketCapRank" INTEGER NOT NULL,
    "averageBuyPrice" REAL NOT NULL DEFAULT 0,
    "totalQuantity" REAL NOT NULL DEFAULT 0,
    "latestPrice" REAL NOT NULL DEFAULT 0,
    "holdingsInDollers" REAL NOT NULL DEFAULT 0,
    "profitLoss" REAL NOT NULL DEFAULT 0,
    "totalInvestment" REAL NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Coin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coin" ("apiSymbol", "averageBuyPrice", "createdAt", "id", "large", "latestPrice", "marketCapRank", "name", "symbol", "thump", "totalQuantity", "updatedAt", "userId") SELECT "apiSymbol", "averageBuyPrice", "createdAt", "id", "large", "latestPrice", "marketCapRank", "name", "symbol", "thump", "totalQuantity", "updatedAt", "userId" FROM "Coin";
DROP TABLE "Coin";
ALTER TABLE "new_Coin" RENAME TO "Coin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
