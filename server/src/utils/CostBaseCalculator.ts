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
      const assetToBeSold = this.assets.shift();

      if (!assetToBeSold) return;

      if (assetToBeSold.quantity <= quantityToBeSold) {
        // If the entire asset is sold
        const costBasis_AssetToBeSold = assetToBeSold.quantity * assetToBeSold.pricePerUnit; // Cost basis of asset which going to be sold
        const asset_costBasis = assetToBeSold.quantity * sellingPrice;
        this.realizedPNL += asset_costBasis - costBasis_AssetToBeSold;

        quantityToBeSold -= assetToBeSold.quantity;
      } else {
        // If only a part of the asset is sold
        const costBasisForSoldQuantity = quantityToBeSold * assetToBeSold.pricePerUnit;
        const asset_costBasis = quantityToBeSold * sellingPrice;

        this.assets.unshift({
          quantity: assetToBeSold.quantity - quantityToBeSold,
          pricePerUnit: assetToBeSold.pricePerUnit,
        });

        this.realizedPNL += asset_costBasis - costBasisForSoldQuantity;
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
