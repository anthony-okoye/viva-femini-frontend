import { Card } from "@/components/ui/card"

export function DailyCheckOffs() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <Card className="px-4 border-0 shadow-sm">
      <h3 className="text-lg border-b border-gray-100 font-bold mb-4">Daily Check-Offs</h3>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <span className="text-sm font-medium text-gray-700">Symptoms</span>
          <span className="text-sm font-semibold text-primary">
            Mild Bloating, Cravings 🍫
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Health Report</span>
          <span className="text-sm font-semibold text-teal-600">Pilates (Logged)</span>
        </div>
      </div>
      </Card>

      <Card className="px-4 border-0 shadow-sm">
      <div className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold flex items-center gap-2">
            📊 Trend Watch
          </h4>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Most Frequent Symptom</span>
            <span className="font-semibold bg-[#E948671A] px-2 py-1 rounded-md text-primary">
              Bloating
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Symptom Intensity Change</span>
            <span className="font-semibold bg-[#4FC4F838] px-2 py-1 rounded-md text-[#07DBB1] flex items-center gap-1">
              Stable 😌
            </span>
          </div>
        </div>
      </div>
    </Card>
    </div>
  )
}
