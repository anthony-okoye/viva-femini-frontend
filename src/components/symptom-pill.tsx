"use client"

import { cn } from "@/lib/utils"
import { SymptomColor } from "@/lib/contentService"

interface SymptomPillProps {
  label: string
  emoji?: string
  selected?: boolean
  onClick?: () => void
  color?: SymptomColor
}

export function SymptomPill({ label, emoji, selected = false, onClick, color = "pink" }: SymptomPillProps) {
  const colorClasses: Record<SymptomColor, string> = {
    pink: "bg-pink-100/50 text-pink-700 border-pink-200 hover:bg-pink-100",
    red: "bg-red-100/50 text-red-700 border-red-200 hover:bg-red-100",
    purple: "bg-purple-100/50 text-purple-700 border-purple-200 hover:bg-purple-100",
    yellow: "bg-yellow-100/50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
    blue: "bg-blue-100/50 text-blue-700 border-blue-200 hover:bg-blue-100",
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer",
        selected && "ring-2 ring-primary ring-offset-2 bg-white",
        !selected && colorClasses[color],
      )}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </button>
  )
}
