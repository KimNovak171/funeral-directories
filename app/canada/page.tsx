import type { Metadata } from "next";
import Link from "next/link";
import {
  getCanadaDirectoryIndex,
  getCanadaNationwideStats,
} from "@/lib/canadaFacilities";

export async function generateMetadata(): Promise<Metadata> {
  const stats = getCanadaNationwideStats();
  const total = stats.totalFacilities.toLocaleString();
  const provinces = stats.provinceCount.toLocaleString();
  const title = `Funeral Homes in Canada | ${total} verified listings | Funeral Home Directories`;
  const description = `Browse ${total} verified funeral homes across ${provinces} provinces and territories—maps, contact info, and Google ratings. Every listing rated 3 stars or higher on Google Maps.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/canada",
    },
    openGraph: {
      title,
      description,
      url: "/canada",
      siteName: "FuneralDirectories.com",
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "Canada funeral home directory preview",
        },
      ],
    },
  };
}

export default async function CanadaLandingPage() {
  const directory = await getCanadaDirectoryIndex();

  return (
    <div className="bg-surface-muted text-foreground">
      <section className="bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="space-y-6 rounded-2xl bg-navy px-6 py-8 text-white shadow-sm sm:px-8 sm:py-10">
            <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
              Canadian Funeral Home Directories
            </p>
            <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Funeral Homes in Canada — Province by Province
            </h1>
            <p className="max-w-2xl text-balance text-sm sm:text-base text-white/90">
              Verified funeral homes across provinces and territories.
              Every listing rated 3★ or higher on Google Maps.
            </p>
          </div>

          <div className="w-full rounded-2xl border-2 border-teal/40 bg-surface p-6 shadow-xl shadow-navy/20 ring-1 ring-teal/30">
            <h2 className="text-xl font-semibold text-foreground">
              Choose a province
            </h2>
            <p className="mt-2 text-sm text-foreground/90">
              Browse verified funeral homes by province, then drill down
              by city to compare services and contact details.
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {directory.map((item) => item.provinceName).join(" • ")}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {directory.map((item) => (
                <Link
                  key={item.provinceSlug}
                  href={`/canada/${item.provinceSlug}`}
                  className="rounded-xl border-2 border-gold bg-surface-muted px-5 py-4 text-left text-navy transition hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <p className="text-lg font-semibold">{item.provinceName}</p>
                  <p className="mt-1 text-sm text-gold-soft">
                    {item.provinceName} — {item.totalFacilities.toLocaleString()} funeral homes
                  </p>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">
              Each province has its own dedicated directory — specific
              funeral homes, specific cities, built for that province only.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-4" aria-label="Breadcrumb">
          <Link
            href="/"
            className="text-sm font-medium text-teal hover:text-teal-soft hover:underline"
          >
            ← Back to homepage
          </Link>
        </nav>
      </div>
    </div>
  );
}
