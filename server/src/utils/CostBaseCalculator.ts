export class CostBasisCalculator {
  private assets: { quantity: number; pricePerUnit: number }[] = [];
  private realizedPNL: number = 0;

  // Buy assets and add them to the FIFO queue
  buy(quantity: number, pricePerUnit: number): void {
    this.assets.push({ quantity, pricePerUnit });
  }

  sell(quantitySold: number, sellingPrice: number) {
    let quantityToBeSold = quantitySold;

    while (quantityToBeSold > 0 && this.assets.length > 0) {
      const asset = this.assets.shift();

      if (!asset) {
        return;
      }

      if (asset.quantity <= quantityToBeSold) {
        // If the entire asset is sold
        const costBasisForAsset = asset.quantity * asset.pricePerUnit;
        this.realizedPNL += sellingPrice - costBasisForAsset;
        quantityToBeSold -= asset.quantity;
      } else {
        // If only a part of the asset is sold
        const costBasisForSoldQuantity = quantityToBeSold * asset.pricePerUnit;
        this.assets.unshift({
          quantity: asset.quantity - quantityToBeSold,
          pricePerUnit: asset.pricePerUnit,
        });
        this.realizedPNL += sellingPrice - costBasisForSoldQuantity;

        quantityToBeSold = 0;
      }
    }
  }

  getTotalCostBasis(): number {
    return this.assets.reduce((totalCostBasis, asset) => {
      return totalCostBasis + asset.quantity * asset.pricePerUnit;
    }, 0);
  }

  getRealizedPNL(): number {
    return this.realizedPNL;
  }
}

// Sell assets and calculate the cost basis
// sell(quantitySold: number, sellingPrice: number) {
//   let quantityToBeSold = quantitySold;

//   while (quantityToBeSold > 0 && this.assets.length > 0) {
//     const asset = this.assets.shift();

//     if (!asset) return;

//     if (asset.quantity <= quantityToBeSold) {
//       quantityToBeSold -= asset.quantity;
//       this.realizedPNL += sellingPrice - asset.quantity * asset.pricePerUnit;
//     } else {
//       this.assets.unshift({
//         quantity: asset.quantity - quantityToBeSold,
//         pricePerUnit: asset.pricePerUnit,
//       });
//       quantityToBeSold = 0;
//       this.realizedPNL += sellingPrice - quantityToBeSold * asset.pricePerUnit;
//     }
//   }
// }
