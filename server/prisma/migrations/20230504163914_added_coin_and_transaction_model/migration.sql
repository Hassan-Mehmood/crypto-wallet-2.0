-- CreateTable
CREATE TABLE "Coin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "apiSymbol" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "thump" TEXT NOT NULL,
    "large" TEXT NOT NULL,
    "marketCapRank" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Coin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "quantity" REAL NOT NULL,
    "timeBought" DATETIME NOT NULL,
    "coinId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Coin_apiSymbol_key" ON "Coin"("apiSymbol");

-- CreateIndex
CREATE UNIQUE INDEX "Coin_symbol_key" ON "Coin"("symbol");
