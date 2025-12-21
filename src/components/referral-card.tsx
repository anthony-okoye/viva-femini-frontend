import { Card } from "@/components/ui/card"

export function ReferralCard() {
  return (
    <Card className="p-5 bg-gradient-to-r from-pink-50 to-purple-50 border-0 shadow-sm relative group">
      <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="flex items-center gap-3">
        <div className="text-4xl">💝</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1">Refer your friends to VivaFemini 💕✨</h3>
          <p className="text-sm text-gray-600">Gift your friend 30 days of free Premium to help them thrive</p>
        </div>
      </div>
    </Card>
  )
}
