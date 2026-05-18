import Parser from "rss-parser";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "AI-Marketing-SaaS/1.0",
  },
});

export interface CrawledArticle {
  title: string;
  content: string;
  sourceUrl: string;
  imageUrl?: string;
  publishedAt: Date;
}

// RSS feed sources by category
const RSS_FEEDS: Record<string, string[]> = {
  technology: [
    "https://feeds.feedburner.com/TechCrunch/",
    "https://www.wired.com/feed/rss",
    "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
  ],
  business: [
    "https://feeds.bloomberg.com/markets/news.rss",
    "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
  ],
  ai: [
    "https://feeds.feedburner.com/TechCrunch/",
    "https://www.wired.com/feed/category/ai/latest/rss",
  ],
  marketing: [
    "https://feeds.feedburner.com/Mashable",
  ],
};

export async function crawlRSSFeeds(
  keyword: string,
  category: string
): Promise<CrawledArticle[]> {
  const feeds = RSS_FEEDS[category.toLowerCase()] || RSS_FEEDS.technology;
  const articles: CrawledArticle[] = [];

  for (const feedUrl of feeds) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const filtered = feed.items
        .filter(
          (item) =>
            item.title?.toLowerCase().includes(keyword.toLowerCase()) ||
            item.contentSnippet?.toLowerCase().includes(keyword.toLowerCase())
        )
        .slice(0, 5);

      for (const item of filtered) {
        articles.push({
          title: item.title || "Untitled",
          content: item.contentSnippet || item.content || "",
          sourceUrl: item.link || "",
          imageUrl: item.enclosure?.url,
          publishedAt: item.pubDate
            ? new Date(item.pubDate)
            : new Date(),
        });
      }
    } catch (error) {
      console.error(`RSS feed error for ${feedUrl}:`, error);
    }
  }

  return articles;
}

export async function crawlNewsAPI(
  keyword: string
): Promise<CrawledArticle[]> {
  if (!process.env.NEWS_API_KEY) return [];

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
    );
    const data = await response.json();

    if (data.status !== "ok") return [];

    return data.articles.map((article: any) => ({
      title: article.title || "Untitled",
      content: article.description || article.content || "",
      sourceUrl: article.url || "",
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt
        ? new Date(article.publishedAt)
        : new Date(),
    }));
  } catch (error) {
    console.error("NewsAPI error:", error);
    return [];
  }
}

export async function crawlAllSources(
  keyword: string,
  category: string
): Promise<CrawledArticle[]> {
  const [rssArticles, newsApiArticles] = await Promise.allSettled([
    crawlRSSFeeds(keyword, category),
    crawlNewsAPI(keyword),
  ]);

  const articles: CrawledArticle[] = [];

  if (rssArticles.status === "fulfilled") {
    articles.push(...rssArticles.value);
  }
  if (newsApiArticles.status === "fulfilled") {
    articles.push(...newsApiArticles.value);
  }

  // Deduplicate by URL
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (seen.has(article.sourceUrl)) return false;
    seen.add(article.sourceUrl);
    return true;
  });
}
