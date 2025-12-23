import { Card } from "@/components/ui/card"
import { StaticImageData } from "next/image"
import Image from "next/image"

interface ArticleCardProps {
  title: string
  image: string | StaticImageData;
  link?: string
}

export function ArticleCard({ title, image, link }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow group/card cursor-pointer">
      <div className="aspect-16/10 w-full overflow-hidden bg-gray-100">
        <Image src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3 leading-snug line-clamp-2">{title}</h3>
        <button
          className="text-sm font-medium flex items-center gap-1 group text-primary"
        >
          Read more
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Card>
  )
}
