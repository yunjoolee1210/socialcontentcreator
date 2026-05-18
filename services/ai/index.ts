import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AISummaryInput {
  title: string;
  content: string;
  category: string;
  keyword: string;
  platforms: string[];
}

export interface AISummaryOutput {
  seoSummary: string;
  seoDescription: string;
  instagramCaption: string;
  xPost: string;
  hashtags: string[];
  cta: string;
  engagementHook: string;
  ontologyTags: string[];
  entities: string[];
  sentiment: string;
  trendScore: number;
}

export async function generateAISummary(
  input: AISummaryInput
): Promise<AISummaryOutput> {
  const systemPrompt = `You are an expert AI marketing content creator. Given a news article, generate:
1. SEO-optimized summary (2-3 sentences)
2. SEO meta description (150 chars max)
3. Instagram caption (engaging, with CTA, hook, and emojis)
4. X/Twitter post (280 chars max, punchy, with link placeholder)
5. Relevant hashtags (5-10)
6. Call-to-action
7. Engagement hook (opening line to grab attention)
8. Ontology tags (domain categories)
9. Named entities mentioned
10. Sentiment (positive/negative/neutral)
11. Trend score (0-100)

Respond in JSON format only.`;

  const userPrompt = `Article Title: ${input.title}
Article Content: ${input.content}
Category: ${input.category}
Target Keyword: ${input.keyword}
Target Platforms: ${input.platforms.join(", ")}

Generate marketing content in JSON:
{
  "seoSummary": "",
  "seoDescription": "",
  "instagramCaption": "",
  "xPost": "",
  "hashtags": [],
  "cta": "",
  "engagementHook": "",
  "ontologyTags": [],
  "entities": [],
  "sentiment": "",
  "trendScore": 0
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 2000,
  });

  const result = JSON.parse(response.choices[0].message.content || "{}");
  return result as AISummaryOutput;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: text,
  });
  return response.data[0].embedding;
}

export async function generateSEOMetadata(article: {
  title: string;
  summary: string;
  keywords: string[];
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "Generate SEO metadata in JSON format: title, description, keywords, schema_org (JSON-LD NewsArticle), og_title, og_description, twitter_title, twitter_description",
      },
      {
        role: "user",
        content: `Title: ${article.title}\nSummary: ${article.summary}\nKeywords: ${article.keywords.join(", ")}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}
