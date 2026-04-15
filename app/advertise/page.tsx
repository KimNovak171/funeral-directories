import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Advertise | Funeral Home Owners — Featured & Premium Listings",
  description:
    "Featured and premium listings for funeral home owners on FuneralDirectories.com. Reach families searching for funeral homes, mortuaries, and cremation providers across the United States.",
  alternates: {
    canonical: "/advertise",
    languages: {
      "en-us": "https://funeraldirectories.com/advertise",
    },
  },
  openGraph: {
    title: "Advertise | Funeral Home Owners — Featured & Premium Listings",
    description:
      "Promote your funeral home to families comparing local funeral, cremation, and memorial providers. Featured and premium city and homepage placement.",
    url: "/advertise",
    siteName: "FuneralDirectories.com",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "FuneralDirectories.com advertise page preview",
      },
    ],
  },
};

const siteUrl = "https://funeraldirectories.com";
const STRIPE_LINK_49 = "https://buy.stripe.com/bJedR98Ui5vxdgq9HzfAc0K";
const STRIPE_LINK_99 = "https://buy.stripe.com/aFaaEXgmK5vx4JU8DvfAc0L";

export default function AdvertisePage() {
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
        name: "Advertise",
        item: `${siteUrl}/advertise`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          For funeral home owners &amp; operators
        </p>
        <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
          Promote Your Funeral Home to Families Comparing Local Providers
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          If you own or manage a funeral home, mortuary, or cremation provider, FuneralDirectories.com
          is a funeral-home-only directory: your listing appears alongside other funeral professionals
          when families search by state and city. Featured and premium placements put your funeral home
          in front of visitors who are actively comparing local funeral, cremation, and memorial providers.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border border-surface-muted bg-surface p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy">
            Featured Listing — $49/month
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Priority placement at the top of your city directory section</li>
            <li>Featured badge on your listing</li>
            <li>Included in the Top Picks section on your state page</li>
            <li>Cancel anytime</li>
          </ul>
          <a
            href={STRIPE_LINK_49}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Pay $49/month with Stripe
          </a>
        </article>
        <article className="rounded-xl border border-surface-muted bg-surface p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-navy">
            Premium Listing — $99/month
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Everything in Featured</li>
            <li>Included in the Featured Funeral Homes section on the homepage</li>
            <li>Your funeral home logo or photo displayed</li>
            <li>Custom tagline (up to 25 words)</li>
            <li>Cancel anytime</li>
          </ul>
          <a
            href={STRIPE_LINK_99}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            Pay $99/month with Stripe
          </a>
        </article>
      </section>

      <section className="mt-10 rounded-xl border border-gold/30 bg-gold/5 px-6 py-5">
        <p className="text-sm text-slate-700">
          To get started or ask questions, contact us at{" "}
          <a
            href="mailto:hello@directoriesnetwork.com"
            className="font-medium text-teal underline underline-offset-2 hover:text-teal-soft"
          >
            hello@directoriesnetwork.com
          </a>{" "}
          — we&apos;ll have your listing live within 24 hours.
        </p>
      </section>

      <div className="mt-8 text-sm text-slate-600">
        <Link href="/" className="text-teal hover:text-teal-soft">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
