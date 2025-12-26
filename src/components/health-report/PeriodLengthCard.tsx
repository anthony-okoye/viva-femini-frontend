"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CircleQuestionMark } from "lucide-react";
import { SkeletonCard } from "@/components/loading/SkeletonCard";
import { useCycleRecords } from "@/hooks/useHealthReport";
import { format } from "date-fns";

export function PeriodLengthCard() {
  const { cycleRecords, loading } = useCycleRecords();

  if (loading) {
    return <SkeletonCard className="h-80" />;
  }

  if (!cycleRecords || cycleRecords.length === 0) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Period Length</h3>
            <p className="text-sm text-gray-600">Monthly period pattern (0–7 days) and flow intensity</p>
          </div>
          <div className="flex items-center justify-center h-48 text-gray-500">
            No cycle data available yet
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get last 7 cycle records for the chart
  const chartData = cycleRecords.slice(0, 7).reverse();
  
  // Calculate chart dimensions
  const maxPeriodLength = Math.max(...chartData.map(c => c.periodLength), 10);
  const chartHeight = 180;
  const chartWidth = 580;
  const leftMargin = 50;
  const bottomMargin = 20;
  const dataHeight = chartHeight - bottomMargin;
  
  // Calculate positions for data points
  const xStep = (chartWidth - leftMargin) / (chartData.length - 1 || 1);
  const points = chartData.map((record, index) => {
    const x = leftMargin + (index * xStep);
    const y = dataHeight - ((record.periodLength / maxPeriodLength) * (dataHeight - 20));
    return { x, y, record };
  });

  // Create polyline points string
  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Period Length</h3>
          <p className="text-sm text-gray-600">Monthly period pattern (0–{maxPeriodLength} days) and flow intensity</p>
        </div>
        <div className="relative h-48">
          <svg viewBox="0 0 600 200" className="h-full w-full">
            {/* Y-axis labels */}
            <text x="20" y="30" className="text-xs fill-gray-500">
              {maxPeriodLength}
            </text>
            <text x="20" y="110" className="text-xs fill-gray-500">
              {Math.round(maxPeriodLength / 2)}
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
            {points.map((point, i) => (
              <line 
                key={`tick-${i}`}
                x1={point.x} 
                y1="180" 
                x2={point.x} 
                y2="185" 
                className="stroke-gray-400" 
                strokeWidth="2" 
              />
            ))}

            {/* Line chart */}
            {points.length > 1 && (
              <polyline
                points={polylinePoints}
                fill="none"
                className="stroke-primary"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data points */}
            {points.map((point, i) => (
              <circle 
                key={`point-${i}`}
                cx={point.x} 
                cy={point.y} 
                r="4" 
                className="fill-white stroke-primary" 
                strokeWidth="2" 
              />
            ))}

            {/* X-axis labels (dates) */}
            {points.map((point, i) => (
              <text 
                key={`label-${i}`}
                x={point.x} 
                y="200" 
                className="text-xs fill-gray-500" 
                textAnchor="middle"
              >
                {format(new Date(point.record.startDate), "MMM d")}
              </text>
            ))}
          </svg>
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <span className="text-xs"><CircleQuestionMark/></span>
          Chart shows your period length over the last {chartData.length} cycles. Track regularly for better insights.
        </p>
      </CardContent>
    </Card>
  );
}
