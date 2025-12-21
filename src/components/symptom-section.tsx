"use client"

import { SymptomPill } from "./symptom-pill"

interface Symptom {
  id: string
  label: string
  emoji?: string
  color?: "pink" | "red" | "purple" | "yellow" | "blue"
}

interface SymptomSectionProps {
  title: string
  symptoms: Symptom[]
  selectedSymptoms?: string[]
  onToggle?: (symptomId: string) => void
}

export function SymptomSection({ title, symptoms, selectedSymptoms = [], onToggle }: SymptomSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {symptoms.map((symptom) => (
          <SymptomPill
            key={symptom.id}
            label={symptom.label}
            emoji={symptom.emoji}
            color={symptom.color}
            selected={selectedSymptoms.includes(symptom.id)}
            onClick={() => onToggle?.(symptom.id)}
          />
        ))}
      </div>
    </div>
  )
}
