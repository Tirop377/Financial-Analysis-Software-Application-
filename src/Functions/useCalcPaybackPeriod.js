function usecalcPaybackPeriod(cashFlows) {
  let cumulativeCashFlow = 0;
  let paybackPeriod = 0;

  for (let i = 0; i < cashFlows.length; i++) {
    cumulativeCashFlow += cashFlows[i];

    if (cumulativeCashFlow >= 0) {
      // Payback period is found, calculate the exact period
      paybackPeriod = i;

      // If we need a more precise time within the period
      if (i > 0) {
        const previousCumulativeCashFlow = cumulativeCashFlow - cashFlows[i];
        const remainingAmount = -previousCumulativeCashFlow;
        const amountRecoveredInCurrentPeriod = cashFlows[i];
        const fractionalPeriod = remainingAmount / amountRecoveredInCurrentPeriod;
        paybackPeriod = i - 1 + fractionalPeriod;
      }
      
      break;
    }
  }

  if (cumulativeCashFlow < 0) {
    // If the investment is never fully recovered
    return -1;
  }

  return paybackPeriod;
}

export default usecalcPaybackPeriod;