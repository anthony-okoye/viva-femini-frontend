"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CycleInfoPill } from "@/components/cycle-info-pill";
import { SkeletonCard } from "@/components/loading/SkeletonCard";
import { useCycleSummary } from "@/hooks/useHealthReport";
import { format } from "date-fns";
import EstimatedNextPhaseIcon from "@/assets/estimated-next-phase.svg";
import OvulationWindowIcon from "@/assets/ovulation-window.svg";
import PeriodDurationIcon from "@/assets/period-duration.svg";
import CycleLengthIcon from "@/assets/cycle-length.svg";

export function CycleSummaryCard() {
  const { cycleSummary, loading } = useCycleSummary();

  if (loading) {
    return <SkeletonCard className="h-48" />;
  }

  const currentMonth = format(new Date(), "MMMM yyyy");

  // Show empty state if no data
  if (!cycleSummary) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Cycle Summary – {currentMonth}</h2>
          <div className="flex items-center justify-center h-24 text-gray-500 text-sm">
            No cycle data available yet. Start tracking to see your summary.
          </div>
        </CardContent>
      </Card>
    );
  }

  const nextPeriod = cycleSummary.nextPeriodEstimate 
    ? format(new Date(cycleSummary.nextPeriodEstimate), "MMM d")
    : "N/A";
  
  const ovulationWindow = cycleSummary.ovulationWindow
    ? `${format(new Date(cycleSummary.ovulationWindow.start), "MMM d")}-${format(new Date(cycleSummary.ovulationWindow.end), "d")}`
    : "N/A";

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Cycle Summary – {currentMonth}</h2>
        <div className="flex flex-wrap gap-2">
          <CycleInfoPill
            icon={<CycleLengthIcon />}
            label="Cycle Length"
            value={`${cycleSummary.avgCycleLength} Days`}
            color="orange"
          />
          <CycleInfoPill
            icon={<PeriodDurationIcon />}
            label="Period Duration"
            value={`${cycleSummary.avgPeriodLength} Days`}
            color="pink"
          />
          <CycleInfoPill
            icon={<EstimatedNextPhaseIcon />}
            label="Estimated Next Period"
            value={nextPeriod}
            color="purple"
          />
          <CycleInfoPill
            icon={<OvulationWindowIcon />}
            label="Ovulation Window"
            value={ovulationWindow}
            color="blue"
          />
        </div>
      </CardContent>
    </Card>
  );
}
