interface TipCardProps {
  icon: string
  title: string
  description: string
  action: string
  colorClass: "mint" | "blush" | "peach"
}

export function TipCard({ icon, title, description, action, colorClass }: TipCardProps) {
  const bgColors = {
    mint: "bg-[#E8F5F3]",
    blush: "bg-[#F8E8F3]",
    peach: "bg-[#FFF5E8]",
  }

  return (
    <div className={`${bgColors[colorClass]} rounded-2xl p-5 flex flex-col items-start gap-4`}>
      <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center flex-shrink-0 text-2xl">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-2 leading-tight">{title}</h3>
        <p className="text-xs text-gray-700 leading-relaxed mb-3">{description}</p>
        <button className="flex items-center gap-1 text-xs text-purple-600 font-medium hover:text-purple-700 transition-colors cursor-pointer">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          {action}
        </button>
      </div>
    </div>
  )
}
