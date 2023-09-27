/*
  Warnings:

  - Added the required column `cost` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proceeds` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "quantity" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "costBasis" REAL NOT NULL,
    "cost" REAL NOT NULL,
    "proceeds" REAL NOT NULL,
    "coinId" INTEGER NOT NULL,
    "user" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("coinId", "costBasis", "createdAt", "date", "id", "price", "quantity", "type", "updatedAt", "user") SELECT "coinId", "costBasis", "createdAt", "date", "id", "price", "quantity", "type", "updatedAt", "user" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
