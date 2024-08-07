function usecalculateNPV(cashFlows, discountRate) {
  return cashFlows.reduce((npv, cashFlow, index) => {
    return npv + cashFlow / Math.pow(1 + discountRate, index);
  }, 0);
}

export default usecalculateNPV;