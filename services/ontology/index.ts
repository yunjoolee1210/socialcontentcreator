import { generateEmbedding } from "@/services/ai";
import { prisma } from "@/lib/db";

export interface OntologyData {
  domain: string;
  subcategory: string;
  entities: string[];
  semanticKeywords: string[];
  embedding: number[];
}

export async function buildOntology(
  text: string,
  existingTags: string[]
): Promise<OntologyData> {
  const embedding = await generateEmbedding(text);

  // Derive domain from tags
  const domain = existingTags[0] || "General";
  const subcategory = existingTags[1] || "Other";

  return {
    domain,
    subcategory,
    entities: existingTags.slice(2),
    semanticKeywords: existingTags,
    embedding,
  };
}

export async function semanticSearch(
  query: string,
  limit: number = 10
): Promise<any[]> {
  const queryEmbedding = await generateEmbedding(query);

  // Use pgvector cosine similarity search
  // This requires the pgvector extension to be enabled in PostgreSQL
  const results = await prisma.$queryRaw`
    SELECT id, title, summary, "sourceUrl",
      1 - (embedding <=> ${queryEmbedding}::vector) as similarity
    FROM "Article"
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${queryEmbedding}::vector
    LIMIT ${limit}
  `;

  return results as any[];
}

export async function findRelatedArticles(
  articleId: string,
  limit: number = 5
): Promise<any[]> {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) return [];

  const embedding = await generateEmbedding(
    `${article.title} ${article.summary}`
  );

  const results = await prisma.$queryRaw`
    SELECT id, title, summary, "sourceUrl",
      1 - (embedding <=> ${embedding}::vector) as similarity
    FROM "Article"
    WHERE id != ${articleId}
      AND embedding IS NOT NULL
    ORDER BY embedding <=> ${embedding}::vector
    LIMIT ${limit}
  `;

  return results as any[];
}
