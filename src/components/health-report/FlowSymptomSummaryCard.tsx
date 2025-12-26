"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useHealthTips } from "@/hooks/useContent";
import { useCycleSummary } from "@/hooks/useHealthReport";

export function FlowSymptomSummaryCard() {
  const { healthTips } = useHealthTips();
  const { cycleSummary } = useCycleSummary();

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Flow & Symptom Summary</h3>
          <p className="text-sm text-gray-600">Understand your symptoms linked to sleep & activity</p>
        </div>
        <div className="space-y-2 rounded-lg bg-pink-50/50 p-4 border border-pink-100">
          <p className="text-sm text-gray-900">
            Your average cycle length is {cycleSummary?.avgCycleLength || 28} days. 
            Track your symptoms regularly to identify patterns and improve your wellbeing.
          </p>
          {healthTips.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-900">Tips To Adhere To:</p>
              <ul className="mt-1 space-y-1 text-sm text-gray-700">
                {healthTips.slice(0, 3).map((tip) => (
                  <li key={tip._id} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{tip.content}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
