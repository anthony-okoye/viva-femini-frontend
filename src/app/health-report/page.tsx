"use client"

import { useAuth } from "@/context/AuthContext"
import { HealthHeader } from "@/components/health-header"
import { Card, CardContent } from "@/components/ui/card"
import { CycleInfoPill } from "@/components/cycle-info-pill"
import { SymptomFrequencyChart } from "@/components/symptom-frequency-chart"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, CloudDownload, Copy, CircleQuestionMark } from "lucide-react"
import EstimatedNextPhaseIcon from "@/assets/estimated-next-phase.svg"
import OvulationWindowIcon from "@/assets/ovulation-window.svg"
import PeriodDurationIcon from "@/assets/period-duration.svg"
import CycleLengthIcon from "@/assets/cycle-length.svg"

export default function HealthReportPage() {
  const { user } = useAuth()
  
  const historicalData = [
    { date: "Oct 19th", time: "01:37:25 am", symptom: "Physical Pain", total: "6/10", note: "After lunch..." },
    { date: "Oct 18th", time: "00:37:25 am", symptom: "Physical Pain", total: "6/10", note: "After lunch" },
    { date: "Oct 18th", time: "01:37:25 am", symptom: "Physical Pain", total: "6/10", note: "After lunch" },
    { date: "Oct 18th", time: "01:37:25 am", symptom: "Physical Pain", total: "6/10", note: "After lunch" },
    { date: "Oct 18th", time: "01:37:25 am", symptom: "Physical Pain", total: "6/10", note: "After lunch" },
    { date: "Oct 19th", time: "01:37:25 am", symptom: "Physical Pain", total: "6/10", note: "After lunch" },
    { date: "Oct 19th", time: "01:37:25 am", symptom: "Physical Pain", total: "6/10", note: "After lunch" },
    { date: "Oct 19th", time: "01:37:25 am", symptom: "Physical Pain", total: "6/10", note: "After lunch" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader />
      
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cycle Summary - Order 1 on mobile */}
          <Card className="border-gray-200 order-1">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Cycle Summary – October 2025</h2>
              <div className="flex flex-wrap gap-2">
                <CycleInfoPill
                  icon={<CycleLengthIcon />}
                  label="Cycle Length"
                  value="28 Days"
                  color="orange"
                />
                <CycleInfoPill
                  icon={<PeriodDurationIcon />}
                  label="Period Duration"
                  value="5 Days"
                  color="pink"
                />
                <CycleInfoPill
                  icon={<EstimatedNextPhaseIcon />}
                  label="Estimated Next Period"
                  value="Nov 4"
                  color="purple"
                />
                <CycleInfoPill
                  icon={<OvulationWindowIcon />}
                  label="Ovulation Window"
                  value="Oct 17-22"
                  color="blue"
                />
              </div>
            </CardContent>
          </Card>

          {/* Flow & Symptom Summary - Order 2 on mobile */}
          <Card className="border-gray-200 order-2">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Flow & Symptom Summary</h3>
                <p className="text-sm text-gray-600">Understand your symptoms linked to sleep & activity</p>
              </div>
              <div className="space-y-2 rounded-lg bg-pink-50/50 p-4 border border-pink-100">
                <p className="text-sm text-gray-900">
                  Your average cycle length is 29 days. PMS symptoms were more frequent this month. Flow pattern
                  remains within a typical range.
                </p>
                <div>
                  <p className="text-sm font-medium text-gray-900">Tips To Adhere To:</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Low sleep nights → higher cramp scores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Low hydration → increased bloating</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Period Length Chart - Order 3 on mobile */}
          <Card className="border-gray-200 order-3">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Period Length</h3>
                <p className="text-sm text-gray-600">Monthly period pattern (0–7 days) and flow intensity</p>
              </div>
              <div className="relative h-48">
                <svg viewBox="0 0 600 200" className="h-full w-full">
                  {/* Y-axis labels */}
                  <text x="20" y="30" className="text-xs fill-gray-500">
                    10
                  </text>
                  <text x="20" y="110" className="text-xs fill-gray-500">
                    5
                  </text>
                  <text x="20" y="190" className="text-xs fill-gray-500">
                    0
                  </text>

                  {/* X and Y axis lines (L shape) */}
                  <line x1="50" y1="20" x2="50" y2="180" className="stroke-gray-400" strokeWidth="2" />
                  <line x1="50" y1="180" x2="580" y2="180" className="stroke-gray-400" strokeWidth="2" />

                  {/* Y-axis tick marks */}
                  <line x1="45" y1="20" x2="50" y2="20" className="stroke-gray-400" strokeWidth="2" />
                  <line x1="45" y1="100" x2="50" y2="100" className="stroke-gray-400" strokeWidth="2" />
                  <line x1="45" y1="180" x2="50" y2="180" className="stroke-gray-400" strokeWidth="2" />

                  {/* X-axis tick marks */}
                  <line x1="80" y1="180" x2="80" y2="185" className="stroke-gray-400" strokeWidth="2" />
                  <line x1="220" y1="180" x2="220" y2="185" className="stroke-gray-400" strokeWidth="2" />
                  <line x1="360" y1="180" x2="360" y2="185" className="stroke-gray-400" strokeWidth="2" />
                  <line x1="500" y1="180" x2="500" y2="185" className="stroke-gray-400" strokeWidth="2" />

                  {/* Line chart */}
                  <polyline
                    points="80,180 150,170 220,50 290,90 360,120 430,120 500,120"
                    fill="none"
                    className="stroke-primary"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  {[80, 150, 220, 290, 360, 430, 500].map((x, i) => {
                    const y = [180, 170, 50, 90, 120, 120, 120][i]
                    return <circle key={i} cx={x} cy={y} r="4" className="fill-white stroke-primary" strokeWidth="2" />
                  })}

                  {/* X-axis labels */}
                  <text x="80" y="200" className="text-xs fill-gray-500" textAnchor="middle">
                    2025-10-07
                  </text>
                  <text x="220" y="200" className="text-xs fill-gray-500" textAnchor="middle">
                    2025-10-09
                  </text>
                  <text x="360" y="200" className="text-xs fill-gray-500" textAnchor="middle">
                    2025-10-11
                  </text>
                  <text x="500" y="200" className="text-xs fill-gray-500" textAnchor="middle">
                    2025-10-13
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <span className="text-xs"><CircleQuestionMark/></span>
                Higher peaks indicate stronger symptoms. Flow overlay shows heavier days.
              </p>
            </CardContent>
          </Card>

          {/* Symptom Frequency - Order 4 on mobile */}
          <Card className="border-gray-200 order-4">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Symptom Frequency</h3>
                <p className="text-sm text-gray-600">Study your body system & understand your wellbeing</p>
              </div>
              
              {/* Desktop: 2x3 grid */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-6">
                <SymptomFrequencyChart label="Physical Pain" percentage={55} color="red" />
                <SymptomFrequencyChart label="Mood & Mental" percentage={75} color="purple" />
                <SymptomFrequencyChart label="Period Indicators" percentage={23} color="yellow" />
                <SymptomFrequencyChart label="Sexual Health" percentage={32} color="pink" />
                <SymptomFrequencyChart label="Digestion & Appetite" percentage={62} color="green" />
              </div>

              {/* Mobile: Charts in row, labels below in 2 rows */}
              <div className="lg:hidden space-y-4">
                {/* Charts row */}
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col items-center flex-1">
                    <div className="relative h-20 w-20">
                      <svg className="h-full w-full -rotate-90 transform">
                        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-100" />
                        <circle cx="40" cy="40" r="32" stroke="#ef4444" strokeWidth="6" fill="none" strokeDasharray="201" strokeDashoffset="90" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-red-500">55%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="relative h-20 w-20">
                      <svg className="h-full w-full -rotate-90 transform">
                        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-100" />
                        <circle cx="40" cy="40" r="32" stroke="#a855f7" strokeWidth="6" fill="none" strokeDasharray="201" strokeDashoffset="50" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-purple-500">75%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="relative h-20 w-20">
                      <svg className="h-full w-full -rotate-90 transform">
                        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-100" />
                        <circle cx="40" cy="40" r="32" stroke="#eab308" strokeWidth="6" fill="none" strokeDasharray="201" strokeDashoffset="155" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-yellow-500">23%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="relative h-20 w-20">
                      <svg className="h-full w-full -rotate-90 transform">
                        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-100" />
                        <circle cx="40" cy="40" r="32" stroke="#ec4899" strokeWidth="6" fill="none" strokeDasharray="201" strokeDashoffset="137" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-pink-500">32%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="relative h-20 w-20">
                      <svg className="h-full w-full -rotate-90 transform">
                        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-100" />
                        <circle cx="40" cy="40" r="32" stroke="#22c55e" strokeWidth="6" fill="none" strokeDasharray="201" strokeDashoffset="76" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-green-500">62%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Labels - Row 1: Physical Pain, Period Indicators */}
                <div className="flex gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-xs font-medium text-gray-700">Physical Pain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-xs font-medium text-gray-700">Period Indicators</span>
                  </div>
                </div>

                {/* Labels - Row 2: Mood, Sexual Health, Digestion */}
                <div className="flex gap-4 justify-center flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="text-xs font-medium text-gray-700">Mood & Mental</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-pink-500" />
                    <span className="text-xs font-medium text-gray-700">Sexual Health</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-gray-700">Digestion & Appetite</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historical Cycle Data - Order 5 on mobile */}
          <Card className="border-gray-200 order-5 lg:col-span-2">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Historical Cycle Data</h3>
                  <p className="text-sm text-gray-600">Oct 2025 ▼</p>
                </div>
                <Button variant="outline" size="sm" className="bg-primary text-white hover:bg-primary/90 border-none">
                  <CloudDownload className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm font-[sans-serif]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-2 text-left font-medium text-gray-600">Date</th>
                      <th className="pb-2 text-left font-medium text-gray-600">Top Symptom</th>
                      <th className="pb-2 text-left font-medium text-gray-600">Total Symptoms</th>
                      <th className="pb-2 text-left font-medium text-gray-600">Note</th>
                      <th className="pb-2 text-right font-medium text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalData.map((entry, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">
                          <div>{entry.date}</div>
                          <div className="text-xs text-gray-500">{entry.time}</div>
                        </td>
                        <td className="py-3 text-gray-900">{entry.symptom}</td>
                        <td className="py-3 text-gray-900">{entry.total}</td>
                        <td className="py-3 text-gray-600">{entry.note}</td>
                        <td className="py-3 text-right">
                          <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                            <Copy className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
