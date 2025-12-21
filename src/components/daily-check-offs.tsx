import { Card } from "@/components/ui/card"

export function DailyCheckOffs() {
  return (
    <Card className="p-6 border-0 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Daily Check-Offs</h3>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
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

      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            Trend Watch
          </h4>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Most Frequent Symptom</span>
            <span className="font-semibold text-primary">
              Bloating
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Symptom Intensity Change</span>
            <span className="font-semibold text-teal-600 flex items-center gap-1">
              Stable
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
