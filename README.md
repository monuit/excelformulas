<div align="center">
  <img alt="ExcelFormula.xyz - AI-Powered Excel Formula Assistant" src="app/(chat)/opengraph-image.png" width="100%">
  <h1>📊 ExcelFormula.xyz</h1>
  <p><strong>AI-Powered Excel Formula Assistant</strong></p>
  <p>Get instant, accurate Excel formulas with AI. No explanations, no fluff—just the formula you need.</p>
</div>

<p align="center">
  <a href="https://excelformula.xyz"><strong>Live Demo</strong></a> ·
  <a href="#-features"><strong>Features</strong></a> ·
  <a href="#-tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#-deployment"><strong>Deploy</strong></a> ·
  <a href="#-local-development"><strong>Local Setup</strong></a>
</p>

<br/>

## 🎯 What is ExcelFormula.xyz?

ExcelFormula.xyz is a **laser-focused AI assistant** that does ONE thing exceptionally well: generates Excel formulas. No distractions, no explanations unless you ask—just direct, accurate formulas powered by multiple AI models including GPT-4o Mini, GPT-5 Nano, and Grok.

### Why ExcelFormula.xyz?

- **🎯 Excel-Only**: Refuses all non-Excel questions—100% focused on formulas
- **⚡ Direct Answers**: Get the formula immediately, no lengthy explanations
- **🤖 Multiple AI Models**: Choose between GPT-4o Mini, GPT-5 Nano, or Grok
- **🔓 Free Forever**: Unlimited formula generation, no credit card required
- **💎 Premium Tools**: VBA generators, SQL builders, and debuggers available

<br/>

## ✨ Features

### Core Functionality
- **🎯 Excel Formula Chat**: AI-powered formula generation with zero fluff
- **🤖 Multi-Model Support**: GPT-4o Mini, GPT-5 Nano, Grok Vision, Grok Reasoning
- **🚫 Strict Focus**: Automatically refuses non-Excel questions
- **⚡ Instant Responses**: Direct formula output without unnecessary explanations
- **💬 Chat History**: Save and share formula conversations
- **🔍 SEO Pages**: Pre-generated formula pages with ISR (Incremental Static Regeneration)

### Premium Features (Ko-fi Support)
- **🐛 VBA Debugger**: Fix VBA macro errors with AI analysis
- **📝 Formula Debugger**: Debug and optimize Excel formulas
- **⚙️ VBA Generator**: Create production-ready VBA macros
- **🗄️ SQL Generator**: Generate SQL queries for Excel data

### Technical Features
- **Next.js 15** with App Router and React Server Components
- **Vercel AI SDK** for unified AI model access
- **NextAuth.js** for authentication (guest & registered users)
- **Neon Postgres** for chat history and user data
- **Vercel Blob** for file storage
- **Upstash Redis** for caching and rate limiting
- **shadcn/ui** + Tailwind CSS for modern UI

## 🤖 AI Models

ExcelFormula.xyz uses the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) to access multiple AI models:

| Model | ID | Best For |
|-------|-----|----------|
| **GPT-4o Mini** | `gpt-4o-mini` | Fast Excel formulas (recommended) |
| **GPT-5 Nano** | `chat-model-reasoning` | Complex reasoning problems |
| **Grok Vision** | `chat-model` | Multimodal with vision capabilities |
| **Grok Reasoning** | `chat-model-reasoning-grok` | Chain-of-thought reasoning |

### Model Configuration

Models are configured in `lib/ai/providers.ts` using the Vercel AI Gateway. Authentication is automatic on Vercel deployments via OIDC tokens.

For non-Vercel deployments, set `AI_GATEWAY_API_KEY` in your `.env.local` file.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, React Server Components, Partial Prerendering)
- **AI**: Vercel AI SDK with multiple model providers
- **Database**: Neon Serverless Postgres (via Drizzle ORM)
- **Storage**: Vercel Blob (for file uploads)
- **Cache**: Upstash Redis (for rate limiting & SEO caching)
- **Auth**: NextAuth.js with guest support
- **UI**: shadcn/ui + Tailwind CSS + Framer Motion
- **Payments**: Ko-fi webhook integration for premium features
- **Deployment**: Vercel with edge functions

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Database (Neon Postgres)
POSTGRES_URL="postgresql://..."

# Authentication (NextAuth.js)
AUTH_SECRET="your-secret-key"

# Redis Cache (Upstash)
REDIS_URL="redis://..."

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="..."

# Ko-fi Webhook (optional)
KOFI_VERIFICATION_TOKEN="your-kofi-token"

# Site URL
NEXT_PUBLIC_URL="https://excelformula.xyz"

# AI Gateway (for non-Vercel deployments)
AI_GATEWAY_API_KEY="..."
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Fork this repository
2. Create a new project on [Vercel](https://vercel.com)
3. Connect your forked repository
4. Add environment variables from `.env.example`
5. Deploy!

**Note**: The AI Gateway authentication works automatically on Vercel via OIDC tokens.

## 💻 Local Development

### Prerequisites

- Node.js 18+ and pnpm
- Neon Postgres database
- Upstash Redis instance
- Vercel Blob storage

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/monuit/excelformulas.git
   cd excelformulas
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

   Or pull from Vercel (if you have a Vercel project):
   ```bash
   npm i -g vercel
   vercel link
   vercel env pull
   ```

4. **Set up the database**
   ```bash
   pnpm db:migrate
   pnpm db:studio  # Open Drizzle Studio to inspect
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Key Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run linting
pnpm db:migrate   # Run database migrations
pnpm db:studio    # Open Drizzle Studio
```

## 🎨 Project Structure

```
excelformula.xyz/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (chat)/          # Main chat interface
│   ├── api/             # API routes
│   ├── debug/           # Debugger pages
│   ├── generators/      # Code generator pages
│   └── excel/[slug]/    # SEO formula pages
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── landing/         # Landing page sections
│   ├── debuggers/       # Debugger components
│   └── generators/      # Generator components
├── lib/
│   ├── ai/              # AI configuration & prompts
│   ├── db/              # Database schemas & queries
│   └── seo/             # SEO utilities
└── public/              # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💎 Premium Support

Support the project and unlock premium features:
- 🐛 Advanced VBA & Formula Debuggers
- ⚙️ VBA & SQL Code Generators
- ✨ Priority support

[Support on Ko-fi](https://ko-fi.com/monuit)

## 🔗 Links

- **Live Site**: [excelformula.xyz](https://excelformula.xyz)
- **Twitter**: [@moevals](https://x.com/moevals)
- **Ko-fi**: [monuit](https://ko-fi.com/monuit)

---

<div align="center">
  Built with ❤️ using Next.js, Vercel AI SDK, and GPT-4o Mini
</div>
