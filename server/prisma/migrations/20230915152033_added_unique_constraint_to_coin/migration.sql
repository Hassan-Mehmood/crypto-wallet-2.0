/*
  Warnings:

  - A unique constraint covering the columns `[symbol,id]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coin_symbol_id_key" ON "Coin"("symbol", "id");
