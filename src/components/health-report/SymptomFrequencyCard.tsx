"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SymptomFrequencyChart } from "@/components/symptom-frequency-chart";
import { useSymptomFrequency } from "@/hooks/useHealthReport";
import { SkeletonCard } from "@/components/loading/SkeletonCard";

const categoryColors: Record<string, "red" | "purple" | "yellow" | "pink" | "green"> = {
  "Physical Pain": "red",
  "Mood & Mental": "purple",
  "Period Indicators": "yellow",
  "Sexual Health": "pink",
  "Digestion & Appetite": "green",
};

export function SymptomFrequencyCard() {
  const { frequency, loading } = useSymptomFrequency();

  if (loading) {
    return <SkeletonCard className="h-96" />;
  }

  const categories = Object.keys(frequency);

  // Show empty state if no data
  if (categories.length === 0) {
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

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Symptom Frequency</h3>
          <p className="text-sm text-gray-600">Study your body system & understand your wellbeing</p>
        </div>
        
        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <SymptomFrequencyChart
              key={category}
              label={category}
              percentage={frequency[category] || 0}
              color={categoryColors[category] || "red"}
            />
          ))}
        </div>

        {/* Mobile: Responsive layout */}
        <div className="lg:hidden space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <SymptomFrequencyChart
                key={category}
                label={category}
                percentage={frequency[category] || 0}
                color={categoryColors[category] || "red"}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
