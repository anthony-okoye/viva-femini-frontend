"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { HealthHeader } from "@/components/health-header"
import { WelcomeCard } from "@/components/welcome-card"
import { SymptomSection } from "@/components/symptom-section"
import { FlowIntensitySlider } from "@/components/flow-intensity-slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"

const physicalPainSymptoms = [
  { id: "cramps", label: "Cramps", emoji: "💧", color: "red" as const },
  { id: "diarrhea", label: "Diarrhea", emoji: "😖", color: "yellow" as const },
  { id: "fatigue", label: "Fatigue", emoji: "😴", color: "yellow" as const },
  { id: "headache", label: "Headache", emoji: "🤕", color: "red" as const },
  { id: "breast-tenderness", label: "Breast tenderness", emoji: "🤱", color: "pink" as const },
  { id: "abdominal-pain", label: "Abdominal pain", emoji: "😣", color: "yellow" as const },
  { id: "pelvic-pain", label: "Pelvic pain", emoji: "👤", color: "purple" as const },
  { id: "water-retention", label: "Water retention", emoji: "💦", color: "pink" as const },
  { id: "lower-back-pain", label: "Lower back pain", emoji: "🧍", color: "purple" as const },
  { id: "appetite-changes", label: "Appetite changes", emoji: "🍎", color: "purple" as const },
]

const moodSymptoms = [
  { id: "happy", label: "Happy", emoji: "😊", color: "yellow" as const },
  { id: "neutral", label: "Neutral", emoji: "😐", color: "yellow" as const },
  { id: "sad", label: "Sad", emoji: "😢", color: "yellow" as const },
  { id: "low-motivation", label: "Low Motivation", emoji: "😔", color: "blue" as const },
  { id: "mood-swings", label: "Mood swings", emoji: "🤪", color: "purple" as const },
  { id: "irritability", label: "Irritability", emoji: "😠", color: "red" as const },
  { id: "cravings", label: "Cravings", emoji: "🍫", color: "yellow" as const },
  { id: "tearfulness", label: "Tearfulness", emoji: "😭", color: "blue" as const },
  { id: "difficulty-concentrating", label: "Difficulty Concentrating", emoji: "😵", color: "yellow" as const },
]

const periodIndicators = [
  { id: "spotting", label: "Spotting", emoji: "💧", color: "red" as const },
  { id: "heavier-flow", label: "heavier flow", emoji: "💦", color: "blue" as const },
  { id: "lighter-flow", label: "lighter flow", emoji: "💧", color: "blue" as const },
  { id: "virginal-dryness", label: "Virginal Dryness", emoji: "😶", color: "yellow" as const },
]

const sexualHealthSymptoms = [
  { id: "increased-sex-drive", label: "Increased sex drive", emoji: "😏", color: "yellow" as const },
  { id: "decreased-sex-drive", label: "Decreased sex drive", emoji: "😐", color: "yellow" as const },
  { id: "virginal-discharge", label: "Virginal discharge", emoji: "💧", color: "yellow" as const },
]

export default function TrackingPage() {
  const { user } = useAuth()
  const [selectedPhysicalPain, setSelectedPhysicalPain] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<string[]>([])
  const [selectedPeriodIndicators, setSelectedPeriodIndicators] = useState<string[]>([])
  const [selectedSexualHealth, setSelectedSexualHealth] = useState<string[]>([])
  const [flowIntensity, setFlowIntensity] = useState(3)
  const [notes, setNotes] = useState("")

  const toggleSymptom = (list: string[], setList: (list: string[]) => void, symptomId: string) => {
    if (list.includes(symptomId)) {
      setList(list.filter((id) => id !== symptomId))
    } else {
      setList([...list, symptomId])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HealthHeader />
      
      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <WelcomeCard />

            {/* Period Indicators */}
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <SymptomSection
                  title="Period Indicators"
                  symptoms={periodIndicators}
                  selectedSymptoms={selectedPeriodIndicators}
                  onToggle={(id) => toggleSymptom(selectedPeriodIndicators, setSelectedPeriodIndicators, id)}
                />
              </CardContent>
            </Card>

            {/* Sexual Health */}
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <SymptomSection
                  title="Sexual Health"
                  symptoms={sexualHealthSymptoms}
                  selectedSymptoms={selectedSexualHealth}
                  onToggle={(id) => toggleSymptom(selectedSexualHealth, setSelectedSexualHealth, id)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="border-gray-200">
              <CardContent className="p-6 space-y-6">
                {/* Physical Pain */}
                <SymptomSection
                  title="Physical Pain"
                  symptoms={physicalPainSymptoms}
                  selectedSymptoms={selectedPhysicalPain}
                  onToggle={(id) => toggleSymptom(selectedPhysicalPain, setSelectedPhysicalPain, id)}
                />

                {/* Mood & Mental */}
                <SymptomSection
                  title="Mood & Mental"
                  symptoms={moodSymptoms}
                  selectedSymptoms={selectedMood}
                  onToggle={(id) => toggleSymptom(selectedMood, setSelectedMood, id)}
                />

                {/* Flow Intensity */}
                <FlowIntensitySlider value={flowIntensity} onChange={setFlowIntensity} />

                {/* Notes */}
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                    <span className="text-gray-400">📝</span>
                    Notes
                  </h3>
                  <Textarea
                    placeholder="Inputting Note"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px] resize-none border-gray-200"
                  />
                </div>

                {/* Save Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-14 rounded-full text-base font-semibold">
                  Save <Check className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
