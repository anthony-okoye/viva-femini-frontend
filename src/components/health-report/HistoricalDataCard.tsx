"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudDownload, Copy } from "lucide-react";
import { useSymptomLogs } from "@/hooks/useHealthReport";
import { format } from "date-fns";
import { SkeletonCard } from "@/components/loading/SkeletonCard";

export function HistoricalDataCard() {
  const { logs, loading } = useSymptomLogs();

  if (loading) {
    return <SkeletonCard className="h-96" />;
  }

  const displayLogs = logs.slice(0, 8);

  return (
    <Card className="border-gray-200 lg:col-span-2">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Historical Cycle Data</h3>
            <p className="text-sm text-gray-600">{format(new Date(), "MMM yyyy")} ▼</p>
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
              {displayLogs.map((log) => {
                const totalSymptoms = log.symptoms.reduce((sum, s) => sum + s.symptoms.length, 0);
                const topCategory = log.symptoms.length > 0 ? log.symptoms[0].category : "N/A";
                
                return (
                  <tr key={log._id} className="border-b border-gray-100">
                    <td className="py-3 text-gray-900">
                      <div>{format(new Date(log.date), "MMM do")}</div>
                      <div className="text-xs text-gray-500">{format(new Date(log.createdAt), "hh:mm:ss a")}</div>
                    </td>
                    <td className="py-3 text-gray-900">{topCategory}</td>
                    <td className="py-3 text-gray-900">{totalSymptoms}/10</td>
                    <td className="py-3 text-gray-600">{log.notes || "No notes"}</td>
                    <td className="py-3 text-right">
                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <Copy className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
