"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CompoundChart } from "@/app/components/CompoundChart"
import { compoundSeries, compoundSeriesWithContributions, percentageChange } from "@/lib/compound"
import { SP500_NOMINAL, SP500_REAL } from "@/data/sp500-sample"

export default function CompoundInterestPage() {
    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl space-y-10">
            <header className="space-y-4 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                    Compound Interest
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    A 1% daily improvement compounds to ~37x in a year.
                </p>
            </header>

            <CompoundSwitcher />
        </div>
    )
}

function CompoundSwitcher() {
    type View = "sp500" | "running"
    const [view, setView] = useState<View>("sp500")
    const [unit, setUnit] = useState<"km" | "mi">("km")

    const [initialDistance, setInitialDistance] = useState(5)
    const [growthPct, setGrowthPct] = useState(5)
    const [weeks, setWeeks] = useState(52)

    const [dcaInitial, setDcaInitial] = useState(100)
    const [dcaMonthly, setDcaMonthly] = useState(100)
    const [dcaYears, setDcaYears] = useState(40)
    const dcaAnnualRate = SP500_NOMINAL * 100

    const inflationGap = (SP500_NOMINAL - SP500_REAL) * 100

    const dca = useMemo(() => {
        const months = dcaYears * 12
        const nominalMonthlyRate = Math.pow(1 + dcaAnnualRate / 100, 1 / 12) - 1
        const realAnnual = Math.max(0, dcaAnnualRate - inflationGap)
        const realMonthlyRate = Math.pow(1 + realAnnual / 100, 1 / 12) - 1

        const nominal = compoundSeriesWithContributions({
            initial: dcaInitial,
            contributionPerPeriod: dcaMonthly,
            ratePerPeriod: nominalMonthlyRate,
            periods: months,
            labelEvery: 12,
            labelFormatter: (i) => `${i / 12}`,
        })

        const real = compoundSeriesWithContributions({
            initial: dcaInitial,
            contributionPerPeriod: dcaMonthly,
            ratePerPeriod: realMonthlyRate,
            periods: months,
            labelEvery: 12,
            labelFormatter: (i) => `${i / 12}`,
        })

        const contributionsPoints = (() => {
            const pts = []
            let total = dcaInitial
            for (let i = 0; i <= months; i += 1) {
                if (i % 12 === 0) {
                    pts.push({ label: `${i / 12}`, value: total })
                }
                total += dcaMonthly
            }
            return pts
        })()

        return {
            labels: nominal.points.map((p) => p.label),
            nominal,
            real,
            contributions: contributionsPoints,
            inflationUsed: inflationGap,
        }
    }, [dcaAnnualRate, dcaInitial, dcaMonthly, dcaYears, inflationGap])

    const running = useMemo(() => {
        const factor = unit === "mi" ? 0.621371 : 1
        const data = compoundSeries({
            initial: initialDistance * factor,
            ratePerPeriod: growthPct / 100,
            periods: weeks,
            labelEvery: Math.max(1, Math.floor(weeks / 12)),
            labelFormatter: (i) => `W${i}`,
        })
        return {
            labels: data.map((p) => p.label),
            values: data.map((p) => p.value),
            final: data[data.length - 1]?.value ?? initialDistance * factor,
            unitLabel: unit === "mi" ? "miles/week" : "km/week",
        }
    }, [growthPct, initialDistance, unit, weeks])

    const chartLabels = view === "sp500" ? dca.labels : running.labels
    const chartSeries =
        view === "sp500"
            ? [
                {
                    label: `Nominal (${dcaAnnualRate.toFixed(2)}%/yr)`,
                    data: dca.nominal.points.map((p) => p.value),
                    borderColor: "rgb(59, 130, 246)",
                    backgroundColor: "rgba(59,130,246,0.15)",
                    fill: true,
                    pointRadius: 0,
                },
                {
                    label: `Real (${(dcaAnnualRate - inflationGap).toFixed(2)}%/yr)`,
                    data: dca.real.points.map((p) => p.value),
                    borderColor: "rgb(16, 185, 129)",
                    backgroundColor: "rgba(16,185,129,0.12)",
                    fill: true,
                    pointRadius: 0,
                },
                {
                    label: "Total contributions (no growth)",
                    data: dca.contributions.map((p) => p.value),
                    borderColor: "rgb(107, 114, 128)",
                    borderDash: [6, 4],
                    backgroundColor: "transparent",
                    fill: false,
                    pointRadius: 0,
                },
            ]
            : [
                { label: `Weekly volume (${running.unitLabel})`, data: running.values, borderColor: "rgb(234, 179, 8)", fill: false, pointRadius: 0 },
            ]

    return (
        <Card className="overflow-hidden">
            <div className="h-4" />
            <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-3">
                    <Button variant={view === "sp500" ? "default" : "secondary"} onClick={() => setView("sp500")}>
                        S&P 500
                    </Button>
                    <Button variant={view === "running" ? "default" : "secondary"} onClick={() => setView("running")}>
                        Running volume
                    </Button>
                </div>

                {view === "sp500" ? (
                    <>
                        <div className="h-[420px] md:h-[520px]">
                            <CompoundChart
                                labels={chartLabels}
                                series={chartSeries}
                                yLabel="Balance (USD)"
                                xLabel="Years"
                            />
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            <Field label="Initial investment ($)" value={dcaInitial} onChange={setDcaInitial} />
                            <Field label="Monthly contribution ($)" value={dcaMonthly} onChange={setDcaMonthly} />
                            <Field label="Years" value={dcaYears} onChange={setDcaYears} />
                        </div>

                        <div className="space-y-1 text-sm text-muted-foreground">
                            <p>A = P(1 + r/n)<sup>nt</sup>; DCA sums each monthly deposit via the geometric-series future value.</p>
                            <p>Using historical average annual returns for the S&P 500 (nominal and real) from <a href="https://www.investopedia.com/ask/answers/042415/what-average-annual-return-sp-500.asp" target="_blank" rel="noopener noreferrer">Investopedia</a>.</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="h-[420px] md:h-[520px]">
                            <CompoundChart labels={chartLabels} series={chartSeries} yLabel={running.unitLabel} xLabel="Weeks" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <Field label={`Initial weekly (${unit})`} value={initialDistance} onChange={setInitialDistance} />
                            <Field label="Weekly growth %" value={growthPct} onChange={setGrowthPct} suffix="%" />
                            <Field label="Weeks" value={weeks} onChange={setWeeks} />
                            <div className="flex items-center gap-2 sm:col-span-3">
                                <Button size="sm" variant={unit === "km" ? "default" : "secondary"} onClick={() => setUnit("km")}>
                                    km
                                </Button>
                                <Button size="sm" variant={unit === "mi" ? "default" : "secondary"} onClick={() => setUnit("mi")}>
                                    miles
                                </Button>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Final weekly volume: <span className="font-semibold text-foreground">{running.final.toFixed(1)} {running.unitLabel}</span> ({percentageChange(running.values[0], running.final).toFixed(1)}% from start).
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    )
}

function Field({
    label,
    value,
    onChange,
    suffix,
}: {
    label: string
    value: number
    onChange: (v: number) => void
    suffix?: string
}) {
    const displayValue = Number.isFinite(value) && value !== 0 ? value : ""
    return (
        <div className="space-y-2">
            <div className="text-sm font-medium text-foreground/80">{label}</div>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    inputMode="decimal"
                    pattern="[0-9]*"
                    min={0}
                    value={displayValue}
                    onChange={(e) => {
                        const next = Number(e.target.value)
                        if (Number.isNaN(next)) {
                            onChange(0)
                            return
                        }
                        onChange(Math.max(0, next))
                    }}
                    className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition"
                />
                {suffix ? <span className="text-sm text-muted-foreground">{suffix}</span> : null}
            </div>
        </div>
    )
}

