import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function WelcomeCard() {
  return (
    <Card className="border-gray-200">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 relative h-48 w-48">
          <Image 
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=400&auto=format&fit=crop" 
            alt="Welcome illustration" 
            fill 
            className="object-contain rounded-2xl" 
          />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Welcome,</h2>
        <p className="mb-4 text-xl font-semibold text-gray-700">How are you doing today?</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Get to track your symptoms daily, to know your state of wellbeing
        </p>
      </CardContent>
    </Card>
  )
}
