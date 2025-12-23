import { ArticleCard } from "@/components/article-card"
import Image1 from "@/assets/img/img-1.jpg"
import Image2 from "@/assets/img/img-2.jpg"
import Image3 from "@/assets/img/img-3.jpg"

export function RecommendedArticles() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Recommended for You</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard 
          title="5 Ways to Reduce Stress During Your Cycle" 
          image={Image1} 
        />
        <ArticleCard 
          title="Best Nutrition Tips for Better Energy" 
          image={Image2} 
        />
        <ArticleCard 
          title="How Sleep Affects Hormonal Balance" 
          image={Image3} 
        />
      </div>
    </div>
  )
}
