function usecalculateCFRR(cashFlows, initialInvestment) {
  const tolerance = 1e-6;
  const maxIterations = 1000;
  let lowRate = -1;
  let highRate = 1;
  let rate = (lowRate + highRate) / 2;

  function npv(rate) {
    return cashFlows.reduce((npv, cashFlow, index) => {
      return npv + cashFlow / Math.pow(1 + rate, index + 1);
    }, -initialInvestment);
  }

  function iterate(rate) {
    return npv(rate) > 0 ? highRate = rate : lowRate = rate;
  }

  for (let i = 0; i < maxIterations; i++) {
    iterate(rate);

    if (Math.abs(rate) < tolerance || lowRate >= highRate) {
      return rate.toFixed(4);
    }

    rate = (lowRate + highRate) / 2;
  }

  throw new Error('CFRR did not converge');
}


export default usecalculateCFRR;