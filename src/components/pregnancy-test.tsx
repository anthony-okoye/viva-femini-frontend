"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import FaintLine from "@/assets/faint-line.svg"
import DidntTakeTest from "@/assets/take-test.svg"

const TEST_OPTIONS = [
  { label: "Didn't take test", icon: DidntTakeTest },
  { label: "Positive", icon: FaintLine },
  { label: "Faint line", icon: FaintLine },
  { label: "Negative", icon: FaintLine },
]

export function PregnancyTest() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <Card className="p-5 border-0 shadow-sm relative group">
      <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <h3 className="font-semibold text-gray-900 mb-4">Hi! Did you take your pregnancy test?</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {TEST_OPTIONS.map((option, index) => {
          const Icon = option.icon;
          
          return(
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`
              flex flex-col items-center gap-2 p-3 rounded-xl transition-all cursor-pointer
              ${
                selected === index
                  ? "text-white"
                  : "text-white"
              }
            `}
          >
            <div
              className="w-12 h-12 flex items-center justify-center text-2xl text-white"
            >
              <Icon className="w-8 h-8" /> 
            </div>
            <span className="text-[10px] sm:text-xs text-center text-gray-700 font-medium leading-none">{option.label}</span>
          </button>
          );
        })}
      </div>

      <button className="mx-auto flex w-[100px] items-center justify-center py-2 rounded-lg bg-gray-100 text-gray-400 font-medium text-sm hover:bg-gray-200 transition-colors cursor-pointer">
        Apply
      </button>
    </Card>
  )
}
