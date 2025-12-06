"use client"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
    TimeSeriesScale,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
    TimeSeriesScale
)

export type Series = {
    label: string
    data: number[]
    borderColor: string
    backgroundColor?: string
    tension?: number
    fill?: boolean
    pointRadius?: number
}

export function CompoundChart({
    labels,
    series,
    yLabel,
    xLabel,
}: {
    labels: string[]
    series: Series[]
    yLabel?: string
    xLabel?: string
}) {
    return (
        <Line
            data={{
                labels,
                datasets: series.map((s) => ({
                    label: s.label,
                    data: s.data,
                    borderColor: s.borderColor,
                    backgroundColor: s.backgroundColor ?? `${s.borderColor}33`,
                    fill: s.fill ?? false,
                    tension: s.tension ?? 0.25,
                    pointRadius: s.pointRadius ?? 0,
                })),
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top" as const,
                    },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                    },
                },
                interaction: {
                    mode: "index" as const,
                    intersect: false,
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        title: xLabel
                            ? {
                                display: true,
                                text: xLabel,
                            }
                            : undefined,
                    },
                    y: {
                        ticks: {
                            callback: (val) => {
                                const num = Number(val)
                                return Math.abs(num) >= 1000 ? `${(num / 1000).toFixed(1)}k` : num
                            },
                        },
                        title: yLabel
                            ? {
                                display: true,
                                text: yLabel,
                            }
                            : undefined,
                    },
                },
            }}
        />
    )
}

