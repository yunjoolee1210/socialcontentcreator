# AI Marketing Automation SaaS

## Features
- AI-driven news crawling and summarization
- Automated social media post generation (X, Instagram)
- Auto-scheduling via Trigger.dev
- Deep Analytics and Excel Exports
- Semantic Search and Ontology Mapping
- Built-in SEO optimizations

## Tech Stack
- Next.js 16 (App Router)
- TypeScript Strict
- TailwindCSS + shadcn/ui
- Prisma + PostgreSQL + pgvector
- NextAuth
- Trigger.dev
- OpenAI GPT-5 / Embeddings
- Playwright / Firecrawl

## Run Locally
1. `npm install`
2. Configure `.env` from `.env.example`
3. `npx prisma generate && npx prisma db push`
4. `npm run dev`

## Deployment
Docker and Vercel support included out of the box.

## License
MIT
