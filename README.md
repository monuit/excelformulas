# AI Excel Formula Generator

An SEO-optimized Next.js 14 web app that converts natural language prompts into Excel or Google Sheets formulas using Vercel AI SDK with hybrid routing across OpenAI GPT-5 and Anthropic Claude models.

## Prerequisites

- Node.js 18+
- npm (bundled with Node.js)
- API keys for OpenAI (GPT-5) and Anthropic (Claude 4.5)
- Optional: Upstash Redis credentials for production-grade rate limiting

## Environment Configuration

1. Copy the sample environment file:
   ```bash
   cp example.env .env
   ```
2. Populate `.env` with your keys:
   - `VERCEL_AI_API_KEY` – single key from the Vercel AI Model Router (covers GPT-5 & Claude)
   - `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` – optional; enable per-IP throttling
   - `NEXT_PUBLIC_SITE_URL` – base URL used for SEO metadata and canonical links

`example.env` documents the required variables, while `.env` stays uncommitted (see `.gitignore`).

## Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the generator locally.

## AI SDK Integration

- The API route (`src/app/api/formula/route.ts`) uses `streamText` from the Vercel AI SDK with structured chat messages as recommended in `ai_sdk.md`.
- Requests are routed to GPT-5 or Claude 4.5 based on heuristic complexity (see `src/lib/ai/model-router.ts`).
- Responses stream to the UI through the `useCompletion` hook, providing real-time feedback.

## Testing & Quality

Run lint checks before pushing changes:

```bash
npm run lint
```

## Deployment

Deploy to Vercel with analytics enabled. Ensure production environment variables mirror `.env` (especially `VERCEL_AI_API_KEY`) and configure Upstash Redis for durable rate limiting.
