export function getProfitLossColor(profitLoss: number | undefined, colorMode: string) {
  if (profitLoss === undefined) {
    return "";
  }

  if (profitLoss > 0) {
    if (colorMode === "light") {
      return "#8bc53f";
    } else {
      return "#0facf0"
    }
  } else if (profitLoss < 0) {
    return "rgb(255, 0, 0)";
  } else {
    return "";
  }
}

export function calculatePercentage(
  profitOrLoss: number | undefined,
  cost: number | undefined,
  investment?: number | undefined
) {
  if (!profitOrLoss || !cost) {
    console.log("CalculatePercentage parameters undefined");
    return "0";
  }
  console.log("profitOrLoss", profitOrLoss);
  console.log("cost", cost);

  const percentage = (profitOrLoss / cost) * 100;
  const sign = `${percentage > 0 ? "+" : ""}`;

  return `${sign}${percentage.toFixed(2)}`;
}
