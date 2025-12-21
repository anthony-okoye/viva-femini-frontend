"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

interface FlowIntensitySliderProps {
  value?: number
  onChange?: (value: number) => void
}

export function FlowIntensitySlider({ value = 3, onChange }: FlowIntensitySliderProps) {
  const [intensity, setIntensity] = useState(value)

  const handleChange = (values: number[]) => {
    setIntensity(values[0])
    onChange?.(values[0])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Flow Intensity</h3>
        <span className="text-sm text-gray-600">{intensity}/10</span>
      </div>
      <p className="text-sm text-gray-600">How heavy is your flow today?</p>
      <div className="space-y-2 py-4">
        <Slider
          value={[intensity]}
          onValueChange={handleChange}
          max={10}
          min={1}
          step={1}
          className="**:[[role=slider]]:bg-white **:[[role=slider]]:border-2 **:[[role=slider]]:border-primary **:[[role=slider]]:h-5 **:[[role=slider]]:w-5"
        />
        <div className="flex justify-between text-xs text-gray-500 pt-2">
          <span>Light</span>
          <span>Medium</span>
          <span>Heavy</span>
        </div>
      </div>
    </div>
  )
}
