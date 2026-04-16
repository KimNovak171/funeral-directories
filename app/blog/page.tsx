import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

const siteUrl = "https://funeraldirectories.com";

export const metadata: Metadata = {
  title: "Funeral Home Resources & Articles | Funeral Home Directories",
  description:
    "Guides and articles on funeral planning, cremation, burial, grief, costs, and choosing a funeral home — from FuneralDirectories.com.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Funeral Home Resources & Articles | Funeral Home Directories",
    description:
      "Guides and articles on funeral planning, cremation, burial, grief, and more.",
    url: "/blog",
    siteName: "FuneralDirectories.com",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "FuneralDirectories.com blog",
      },
    ],
  },
};

function formatPostDate(dateStr: string): string {
  const t = Date.parse(dateStr);
  if (Number.isNaN(t)) return dateStr;
  return new Date(t).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "FuneralDirectories.com",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  return (
    <div className="bg-surface-muted text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="space-y-6 rounded-2xl bg-navy px-6 py-8 text-white shadow-sm sm:px-8 sm:py-10">
            <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
              Funeral home resources
            </p>
            <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Funeral Home Resources &amp; Articles
            </h1>
            <p className="max-w-2xl text-balance text-sm text-white/90 sm:text-base">
              Practical guides on planning services, understanding costs,
              cremation and burial options, and supporting your family
              through loss.
            </p>
          </div>

          <div className="w-full rounded-2xl border-2 border-teal/40 bg-surface p-6 shadow-xl shadow-navy/20 ring-1 ring-teal/30">
            <h2 className="text-xl font-semibold text-navy">All articles</h2>
            <p className="mt-2 text-sm text-slate-600">
              {posts.length.toLocaleString()} articles — newest first.
            </p>

            <ul className="mt-8 space-y-4">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-xl border-2 border-gold bg-surface-muted px-5 py-4 text-left shadow-sm ring-1 ring-gold/30 transition hover:border-teal hover:bg-surface hover:ring-teal/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    <time
                      dateTime={post.date}
                      className="text-xs font-semibold uppercase tracking-wide text-teal"
                    >
                      {formatPostDate(post.date)}
                    </time>
                    <h3 className="mt-2 text-lg font-semibold text-navy">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {post.description}
                    </p>
                    <p className="mt-3 text-xs font-medium text-teal">
                      Read article →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <nav className="text-sm text-slate-600">
            <Link
              href="/"
              className="font-medium text-teal hover:text-teal-soft hover:underline"
            >
              ← Back to homepage
            </Link>
          </nav>
        </div>
      </section>
    </div>
  );
}
