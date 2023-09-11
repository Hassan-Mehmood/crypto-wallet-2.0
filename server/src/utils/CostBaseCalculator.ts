export class CostBasisCalculator {
  private assets: { quantity: number; pricePerUnit: number }[] = [];
  private realizedPNL: number = 0;

  // Buy assets and add them to the FIFO queue
  buy(quantity: number, pricePerUnit: number): void {
    this.assets.push({ quantity, pricePerUnit });
  }

  sell(quantitySold: number, sellingPrice: number) {
    let quantityToBeSold = quantitySold;
    const costBasisOfSellTransaction = quantityToBeSold * sellingPrice; // Cost basis of current sell transaction

    while (quantityToBeSold > 0 && this.assets.length > 0) {
      const assetToBeSold = this.assets.shift();

      if (!assetToBeSold) return;

      if (assetToBeSold.quantity <= quantityToBeSold) {
        console.log('IF');
        console.log('Asset being sold', assetToBeSold);
        // If the entire asset is sold
        const costBasisForAssetToBeSold = assetToBeSold.quantity * assetToBeSold.pricePerUnit; // Cost basis of asset which going to be sold
        this.realizedPNL += costBasisOfSellTransaction - costBasisForAssetToBeSold;
        quantityToBeSold -= assetToBeSold.quantity;
      } else {
        // If only a part of the asset is sold
        console.log('else');
        console.log('Asset being sold partially', assetToBeSold);
        const costBasisForSoldQuantity = quantityToBeSold * assetToBeSold.pricePerUnit;
        this.assets.unshift({
          quantity: assetToBeSold.quantity - quantityToBeSold,
          pricePerUnit: assetToBeSold.pricePerUnit,
        });

        this.realizedPNL += costBasisOfSellTransaction - costBasisForSoldQuantity;
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
