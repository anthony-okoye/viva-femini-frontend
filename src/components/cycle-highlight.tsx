import { Card } from "@/components/ui/card"
import { TipCard } from "@/components/tip-card"

export function CycleHighlight() {
  return (
    <div className="space-y-6">
      <Card className="p-6 border-0 shadow-sm flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-2 text-primary">
          Cycle Highlight
        </h2>
        <p className="text-center text-gray-600 text-sm mb-4">Understand your cycle and take care during peak days</p>
        <button
          className="mx-auto block px-4 py-2 rounded-lg text-sm font-medium bg-blush text-primary hover:opacity-90 transition-opacity cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Day 1 Tip
          </span>
        </button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TipCard
          icon="💧"
          title="Stay Comfortable"
          description="On heavy flow days, prioritize comfort. Stay hydrated and use heating pads."
          action="Listen to your body"
          colorClass="blush"
        />
        <TipCard
          icon="🧘"
          title="Gentle Movement"
          description="Light stretches and walks can ease discomfort during your cycle."
          action="Listen to your body"
          colorClass="peach"
        />
        <div className="bg-mint rounded-2xl p-5 flex items-center justify-center">
          <p className="text-sm text-gray-600 text-center font-medium">More tips coming...</p>
        </div>
      </div>
    </div>
  )
}
