"use client";

import { ArticleCard } from "@/components/article-card";
import { useArticles } from "@/hooks/useContent";
import { SkeletonArticleCard } from "@/components/loading/SkeletonCard";

export function RecommendedArticles() {
  const { articles, loading } = useArticles();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Recommended for You</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <SkeletonArticleCard />
            <SkeletonArticleCard />
            <SkeletonArticleCard />
          </>
        ) : (
          articles.map((article) => (
            <ArticleCard
              key={article._id}
              title={article.title}
              image={article.image}
            />
          ))
        )}
      </div>
    </div>
  );
}
