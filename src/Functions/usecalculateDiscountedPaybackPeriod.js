
function usecalculateDiscountedPaybackPeriod(cashFlows, discountRate) {
  let cumulativeDiscountedCashFlow = 0;
  let discountedPaybackPeriod = 0;

  for (let i = 0; i < cashFlows.length; i++) {
    cumulativeDiscountedCashFlow += cashFlows[i] / Math.pow(1 + discountRate, i + 1);

    if (cumulativeDiscountedCashFlow >= 0) {
      // Discounted payback period is found, calculate the exact period
      discountedPaybackPeriod = i;

      // If we need a more precise time within the period
      if (i > 0) {
        const previousCumulativeDCF = cumulativeDiscountedCashFlow - cashFlows[i] / Math.pow(1 + discountRate, i + 1);
        const remainingAmount = -previousCumulativeDCF;
        const amountRecoveredInCurrentPeriod = cashFlows[i] / Math.pow(1 + discountRate, i + 1);
        const fractionalPeriod = remainingAmount / amountRecoveredInCurrentPeriod;
        discountedPaybackPeriod = i - 1 + fractionalPeriod;
      }

      break;
    }
  }

  if (cumulativeDiscountedCashFlow < 0) {
    // If the investment is never fully recovered
    return -1;
  }

  return discountedPaybackPeriod;
}


export default usecalculateDiscountedPaybackPeriod;


