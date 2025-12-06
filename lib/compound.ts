export type CompoundSeriesPoint = {
  label: string
  value: number
}

export function compoundSeries({
  initial,
  ratePerPeriod,
  periods,
  labelEvery = 1,
  labelFormatter,
}: {
  initial: number
  ratePerPeriod: number // e.g., 0.01 = 1% per period
  periods: number
  labelEvery?: number
  labelFormatter?: (i: number) => string
}): CompoundSeriesPoint[] {
  const points: CompoundSeriesPoint[] = []
  let current = initial
  for (let i = 0; i <= periods; i += 1) {
    if (i % labelEvery === 0) {
      points.push({
        label: labelFormatter ? labelFormatter(i) : `${i}`,
        value: current,
      })
    }
    current *= 1 + ratePerPeriod
  }
  return points
}

export function compoundSeriesWithContributions({
  initial,
  contributionPerPeriod,
  ratePerPeriod,
  periods,
  labelEvery = 1,
  labelFormatter,
}: {
  initial: number
  contributionPerPeriod: number
  ratePerPeriod: number
  periods: number
  labelEvery?: number
  labelFormatter?: (i: number) => string
}): { points: CompoundSeriesPoint[]; final: number; totalContributed: number } {
  const points: CompoundSeriesPoint[] = []
  let current = initial
  let totalContributed = initial

  for (let i = 0; i <= periods; i += 1) {
    if (i % labelEvery === 0) {
      points.push({
        label: labelFormatter ? labelFormatter(i) : `${i}`,
        value: current,
      })
    }

    current = current * (1 + ratePerPeriod) + contributionPerPeriod
    totalContributed += contributionPerPeriod
  }

  return { points, final: current, totalContributed }
}

export function compoundValue({
  initial,
  ratePerPeriod,
  periods,
}: {
  initial: number
  ratePerPeriod: number
  periods: number
}): number {
  return initial * Math.pow(1 + ratePerPeriod, periods)
}

export function percentageChange(from: number, to: number): number {
  if (from === 0) return 0
  return ((to - from) / from) * 100
}

