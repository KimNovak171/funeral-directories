import type { Metadata } from "next";

type RegionPageProps = {
  params: {
    region: string;
  };
};

export function generateMetadata({
  params,
}: RegionPageProps): Metadata {
  const regionCode = params.region.toUpperCase();

  return {
    title: `Funeral homes in ${regionCode}`,
    description: `Explore funeral home options in ${regionCode} with FuneralDirectories.com.`,
    openGraph: {
      title: `Funeral homes in ${regionCode} | FuneralDirectories.com`,
      description: `Browse funeral homes and mortuaries in ${regionCode}.`,
      url: `/locations/${params.region}`,
      type: "website",
    },
  };
}

export default function RegionPage({ params }: RegionPageProps) {
  const regionCode = params.region.toUpperCase();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal">
          Funeral homes by region
        </p>
        <h1 className="text-3xl font-semibold text-navy">
          Funeral homes in {regionCode}
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          This is a placeholder view for{" "}
          <span className="font-semibold">{regionCode}</span>. Here you&apos;ll
          be able to browse funeral homes and mortuaries in this state or
          province.
        </p>
        <div className="mt-6 rounded-xl border border-surface-muted bg-surface px-4 py-6 text-sm text-slate-500">
          Listing data will be loaded from your data model. This template
          ships with an empty `data/` folder (no JSON files).
          <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">
            /data
          </code>{" "}
          directory.
        </div>
      </div>
    </main>
  );
}
