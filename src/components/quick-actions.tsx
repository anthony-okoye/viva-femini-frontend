import { Card } from "@/components/ui/card"

export function QuickActions() {
  return (
    <Card className="p-5 border-0 shadow-sm overflow-x-auto">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Action</h3>

      <div className="flex gap-3 min-w-max sm:min-w-0">
        <button className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-blush text-primary font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="whitespace-nowrap">Log symptoms</span>
        </button>

        <button className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-blush text-primary font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="whitespace-nowrap">Log period</span>
        </button>

        <button className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-blush text-primary font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="whitespace-nowrap">Health Report</span>
        </button>
      </div>
    </Card>
  )
}
