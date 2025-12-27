"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CircleQuestionMark } from "lucide-react";
import { SkeletonCard } from "@/components/loading/SkeletonCard";
import { usePeriodLength } from "@/hooks/useHealthReport";
import { format } from "date-fns";

export function PeriodLengthCard() {
  const { periodLengthData, loading } = usePeriodLength();

  if (loading) {
    return <SkeletonCard className="h-80" />;
  }

  if (!periodLengthData || periodLengthData.length === 0) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Period Length</h3>
            <p className="text-sm text-gray-600">Monthly period pattern (0–7 days) and flow intensity</p>
          </div>
          <div className="flex items-center justify-center h-48 text-gray-500">
            No period data available yet
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate chart dimensions
  const maxFlowValue = 10;
  const chartHeight = 180;
  const chartWidth = 580;
  const leftMargin = 50;
  const bottomMargin = 20;
  const dataHeight = chartHeight - bottomMargin;
  
  // Calculate positions for data points
  const xStep = (chartWidth - leftMargin) / (periodLengthData.length - 1 || 1);
  const points = periodLengthData.map((record, index) => {
    const x = leftMargin + (index * xStep);
    const y = dataHeight - ((record.flowValue / maxFlowValue) * (dataHeight - 20));
    return { x, y, record };
  });

  // Create polyline points string
  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

  // Get unique dates for x-axis labels
  const uniqueDates = Array.from(new Set(periodLengthData.map(d => d.date)));
  const dateToXPosition = new Map<string, number>();
  
  // Calculate x position for each unique date (use first occurrence)
  periodLengthData.forEach((record, index) => {
    if (!dateToXPosition.has(record.date)) {
      dateToXPosition.set(record.date, leftMargin + (index * xStep));
    }
  });

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Period Length</h3>
          <p className="text-sm text-gray-600">Monthly period pattern (0–{maxFlowValue} days) and flow intensity</p>
        </div>
        <div className="relative h-48">
          <svg viewBox="0 0 600 200" className="h-full w-full">
            {/* Y-axis labels */}
            <text x="20" y="30" className="text-xs fill-gray-500">
              10
            </text>
            <text x="20" y="90" className="text-xs fill-gray-500">
              6
            </text>
            <text x="20" y="130" className="text-xs fill-gray-500">
              3
            </text>
            <text x="20" y="190" className="text-xs fill-gray-500">
              0
            </text>

            {/* X and Y axis lines (L shape) */}
            <line x1="50" y1="20" x2="50" y2="180" className="stroke-gray-400" strokeWidth="2" />
            <line x1="50" y1="180" x2="580" y2="180" className="stroke-gray-400" strokeWidth="2" />

            {/* Y-axis tick marks */}
            <line x1="45" y1="20" x2="50" y2="20" className="stroke-gray-400" strokeWidth="2" />
            <line x1="45" y1="80" x2="50" y2="80" className="stroke-gray-400" strokeWidth="2" />
            <line x1="45" y1="120" x2="50" y2="120" className="stroke-gray-400" strokeWidth="2" />
            <line x1="45" y1="180" x2="50" y2="180" className="stroke-gray-400" strokeWidth="2" />

            {/* X-axis tick marks for unique dates */}
            {Array.from(dateToXPosition.entries()).map(([date, xPos], i) => (
              <line 
                key={`tick-${i}`}
                x1={xPos} 
                y1="180" 
                x2={xPos} 
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
                r="5" 
                className="fill-white stroke-primary" 
                strokeWidth="3" 
              />
            ))}

            {/* X-axis labels (dates) - only for unique dates */}
            {Array.from(dateToXPosition.entries()).map(([date, xPos], i) => (
              <text 
                key={`label-${i}`}
                x={xPos} 
                y="200" 
                className="text-xs fill-gray-500" 
                textAnchor="middle"
              >
                {format(new Date(date), "yyyy-MM-dd")}
              </text>
            ))}
          </svg>
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <span className="text-xs"><CircleQuestionMark/></span>
          Chart shows your period flow intensity over time. Track regularly for better insights.
        </p>
      </CardContent>
    </Card>
  );
}
