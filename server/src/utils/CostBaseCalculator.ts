export class CostBasisCalculator {
  private assets: { quantity: number; pricePerUnit: number; type: string }[] = [];
  private transactions: { quantity: number; pricePerUnit: number; type: string }[] = [];
  private realizedPNL: number = 0;

  buy(quantity: number, pricePerUnit: number, type: string): void {
    this.transactions.push({ quantity, pricePerUnit, type });
    this.assets.push({ quantity, pricePerUnit, type });
  }

  sell(quantitySold: number, sellingPrice: number, type: string) {
    this.transactions.push({ quantity: quantitySold, pricePerUnit: sellingPrice, type });
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
          ...assetToBeSold,
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

  getAverageNetCost(): number {
    let totalQuantity = 0;
    let cost = 0;
    let proceeds = 0;

    for (const transaction of this.transactions) {
      if (transaction.type === 'BUY') {
        totalQuantity += transaction.quantity;
        cost += transaction.quantity * transaction.pricePerUnit;
      } else {
        totalQuantity -= transaction.quantity;
        proceeds += transaction.quantity * transaction.pricePerUnit;
      }
    }

    if (totalQuantity <= 0) {
      return 0;
    }

    const averageNetCost = (cost - proceeds) / totalQuantity;
    return averageNetCost;
  }
}
