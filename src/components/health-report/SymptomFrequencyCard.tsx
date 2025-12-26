"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSymptomFrequency } from "@/hooks/useHealthReport";
import { SkeletonCard } from "@/components/loading/SkeletonCard";

const categoryColors: Record<string, { stroke: string; text: string; bg: string }> = {
  "Physical Pain": { stroke: "#ef4444", text: "text-red-500", bg: "bg-red-500" },
  "Mood & Mental": { stroke: "#a855f7", text: "text-purple-500", bg: "bg-purple-500" },
  "Period Indicators": { stroke: "#eab308", text: "text-yellow-500", bg: "bg-yellow-500" },
  "Sexual Health": { stroke: "#ec4899", text: "text-pink-500", bg: "bg-pink-500" },
  "Digestion & Appetite": { stroke: "#22c55e", text: "text-green-500", bg: "bg-green-500" },
};

// Fixed order for consistent display
const categoryOrder = [
  "Physical Pain",
  "Mood & Mental",
  "Period Indicators",
  "Sexual Health",
  "Digestion & Appetite"
];

export function SymptomFrequencyCard() {
  const { frequency, loading } = useSymptomFrequency();

  if (loading) {
    return <SkeletonCard className="h-96" />;
  }

  // Show empty state if no data
  if (Object.keys(frequency).length === 0) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Symptom Frequency</h3>
            <p className="text-sm text-gray-600">Study your body system & understand your wellbeing</p>
          </div>
          <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
            No symptom data available yet. Start tracking to see frequency analysis.
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStrokeDashoffset = (percentage: number) => {
    const circumference = 201; // 2 * π * 32
    return circumference - (percentage / 100) * circumference;
  };

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Symptom Frequency</h3>
          <p className="text-sm text-gray-600">Study your body system & understand your wellbeing</p>
        </div>

        {/* Desktop: 2x3 grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {categoryOrder.map((category) => {
            const percentage = frequency[category] || 0;
            const colors = categoryColors[category];
            return (
              <div key={category} className="flex flex-col items-center gap-2">
                <div className="relative h-28 w-28">
                  <svg className="h-full w-full -rotate-90 transform">
                    <circle
                      cx="56"
                      cy="56"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-100"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="45"
                      stroke={colors.stroke}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (percentage / 100) * 283}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-2xl font-bold ${colors.text}`}>{percentage}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${colors.bg}`} />
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Charts in row, labels below in 2 rows */}
        <div className="lg:hidden space-y-4 overflow-hidden">
          {/* Charts row */}
          <div className="flex justify-between items-center gap-1 overflow-x-auto scrollbar-hide">
            {categoryOrder.map((category) => {
              const percentage = frequency[category] || 0;
              const colors = categoryColors[category];
              return (
                <div key={category} className="flex flex-col items-center flex-shrink-0">
                  <div className="relative h-16 w-16">
                    <svg className="h-full w-full -rotate-90 transform">
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="currentColor"
                        strokeWidth="5"
                        fill="none"
                        className="text-gray-100"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke={colors.stroke}
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray="163"
                        strokeDashoffset={163 - (percentage / 100) * 163}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-sm font-bold ${colors.text}`}>{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
  );
}
