interface SymptomFrequencyChartProps {
  label: string
  percentage: number
  color: "red" | "purple" | "green" | "yellow" | "pink"
}

export function SymptomFrequencyChart({ label, percentage, color }: SymptomFrequencyChartProps) {
  const colorClasses = {
    red: "text-red-500",
    purple: "text-purple-500",
    green: "text-green-500",
    yellow: "text-yellow-500",
    pink: "text-pink-500",
  }

  const strokeColor = {
    red: "#ef4444",
    purple: "#a855f7",
    green: "#22c55e",
    yellow: "#eab308",
    pink: "#ec4899",
  }

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-28 w-28">
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-100"
          />
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke={strokeColor[color]}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${colorClasses[color]}`}>{percentage}%</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${colorClasses[color]} bg-current`} />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
    </div>
  )
}
