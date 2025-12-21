import type React from "react"

interface CycleInfoPillProps {
  icon: React.ReactNode
  label: string
  value: string
  color?: "pink" | "purple" | "blue"
}

export function CycleInfoPill({ icon, label, value, color = "pink" }: CycleInfoPillProps) {
  const colorClasses = {
    pink: "bg-pink-100/50 text-pink-700 border-pink-200",
    purple: "bg-purple-100/50 text-purple-700 border-purple-200",
    blue: "bg-blue-100/50 text-blue-700 border-blue-200",
  }

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${colorClasses[color]}`}>
      <span className="shrink-0">{icon}</span>
      <span className="text-sm font-medium">
        {label}: <span className="font-semibold">{value}</span>
      </span>
    </div>
  )
}
