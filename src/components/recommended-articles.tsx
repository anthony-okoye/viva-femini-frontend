import { ArticleCard } from "@/components/article-card"

export function RecommendedArticles() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard 
          title="5 Ways to Reduce Stress During Your Cycle" 
          image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" 
        />
        <ArticleCard 
          title="Best Nutrition Tips for Better Energy" 
          image="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400" 
        />
        <ArticleCard 
          title="How Sleep Affects Hormonal Balance" 
          image="https://images.unsplash.com/photo-1511295742364-9119171788c5?auto=format&fit=crop&q=80&w=400" 
        />
      </div>
    </div>
  )
}
