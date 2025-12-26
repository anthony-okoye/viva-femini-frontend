"use client"

import { HealthHeader } from "@/components/health-header"
import { CycleSummaryCard } from "@/components/health-report/CycleSummaryCard"
import { FlowSymptomSummaryCard } from "@/components/health-report/FlowSymptomSummaryCard"
import { PeriodLengthCard } from "@/components/health-report/PeriodLengthCard"
import { SymptomFrequencyCard } from "@/components/health-report/SymptomFrequencyCard"
import { HistoricalDataCard } from "@/components/health-report/HistoricalDataCard"

export default function HealthReportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader />
      
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cycle Summary - Order 1 on mobile */}
          <CycleSummaryCard />

          {/* Flow & Symptom Summary - Order 2 on mobile */}
          <FlowSymptomSummaryCard />

          {/* Period Length Chart - Order 3 on mobile */}
          <PeriodLengthCard />

          {/* Symptom Frequency - Order 4 on mobile */}
          <SymptomFrequencyCard />

          {/* Historical Cycle Data - Order 5 on mobile */}
          <HistoricalDataCard />
        </div>
      </main>
    </div>
  )
}
