import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/config/posts";

export const metadata: Metadata = {
  title: "Excel Formula Generator Blog",
  description:
    "Deep dives on Excel and Google Sheets automation. Learn AI-assisted formula writing, FILTER + XLOOKUP tricks, and spreadsheet best practices.",
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 px-6 pb-24 pt-16 sm:px-8">
      <header className="space-y-4 text-center sm:text-left">
        <h1 className="text-4xl font-semibold text-slate-50">
          Excel Formula Generator Blog
        </h1>
        <p className="text-base text-slate-200/80">
          Weekly tutorials on Excel, Google Sheets, SUMIFS, XLOOKUP, dynamic
          arrays, and AI-assisted spreadsheet automation.
        </p>
      </header>

      <section className="space-y-6">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-sky-300/60"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-sky-300/80">
                {new Date(post.publishedAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h2 className="text-2xl font-semibold text-sky-100">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-slate-200/80">{post.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                {post.keywords.map((keyword) => (
                  <span
                    key={`${post.slug}-${keyword}`}
                    className="rounded-full bg-white/10 px-3 py-1"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="text-center text-xs text-slate-400">
        <Link href="/">Back to the generator →</Link>
      </footer>
    </main>
  );
}
