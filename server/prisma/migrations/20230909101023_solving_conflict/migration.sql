/*
  Warnings:

  - You are about to drop the column `realizedPNL` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `costBasis` on the `Transaction` table. All the data in the column will be lost.

*/
-- CreateTable
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
    "cost" REAL NOT NULL DEFAULT 0,
    "costBasis" REAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "new_Coin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "cost" REAL NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Coin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coin" ("active", "apiSymbol", "averageBuyPrice", "cost", "createdAt", "holdingsInDollers", "id", "large", "latestPrice", "marketCapRank", "name", "profitLoss", "symbol", "thump", "totalInvestment", "totalQuantity", "updatedAt", "userId") SELECT "active", "apiSymbol", "averageBuyPrice", "cost", "createdAt", "holdingsInDollers", "id", "large", "latestPrice", "marketCapRank", "name", "profitLoss", "symbol", "thump", "totalInvestment", "totalQuantity", "updatedAt", "userId" FROM "Coin";
DROP TABLE "Coin";
ALTER TABLE "new_Coin" RENAME TO "Coin";
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "quantity" REAL NOT NULL,
    "timeBought" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "coinId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("coinId", "createdAt", "id", "price", "quantity", "timeBought", "type", "updatedAt") SELECT "coinId", "createdAt", "id", "price", "quantity", "timeBought", "type", "updatedAt" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
