

function useIRR(cashFlows, guess = 0.1) {
  const tolerance = 1e-6;
  const maxIterations = 1000;
  let iteration = 0;
  let irr = guess;

  function npv(rate) {
      return cashFlows.reduce((acc, val, i) => acc + val / Math.pow(1 + rate, i), 0);
  }

  function npvDerivative(rate) {
      return cashFlows.reduce((acc, val, i) => acc - i * val / Math.pow(1 + rate, i + 1), 0);
  }

  while (iteration < maxIterations) {
      const npvValue = npv(irr);
      const derivativeValue = npvDerivative(irr);
      const newIrr = irr - npvValue / derivativeValue;

      if (Math.abs(newIrr - irr) < tolerance) {
          return newIrr;
      }

      irr = newIrr;
      iteration++;
  }

  throw new Error('IRR did not converge');
}

export default useIRR;