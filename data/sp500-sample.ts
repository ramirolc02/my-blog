// Static illustration dataset for S&P 500 compounding over 40 years
// Nominal: 10.11% avg annual
// Real:    6.84% avg annual (after inflation)

export const SP500_YEARS = 40
export const SP500_NOMINAL = 0.1054
export const SP500_REAL = 0.0668

export const sp500Sample = Array.from({ length: SP500_YEARS + 1 }, (_, year) => {
  const nominal = Math.pow(1 + SP500_NOMINAL, year)
  const real = Math.pow(1 + SP500_REAL, year)
  return {
    year,
    nominal,
    real,
  }
})

