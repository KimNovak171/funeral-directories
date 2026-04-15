/**
 * Turn raw Google-style category labels into short, natural phrases for prose
 * (e.g. city page intros). Omits entries that do not look funeral-home-related.
 */

const EXACT_PHRASE: Record<string, string> = {
  "funeral home": "funeral homes",
  mortuary: "mortuaries",
  crematory: "crematories",
  "memorial chapel": "memorial chapels",
  cemetery: "cemeteries",
  cremation: "cremation services",
  "funeral director": "funeral directors",
  "memorial park": "memorial parks",
};

const FUNERAL_LIKE =
  /funeral|mortuary|cremat|cemetery|memorial chapel|burial|interment|obituary|embalm|undertaker|mausoleum|inurnment|wake|visitation|death care/i;

/** Labels that match common noise but are not funeral-home categories. */
const NON_FUNERAL =
  /nail|manicure|pedicure|beauty salon|hair salon|gel nail|acrylic nail|auto\s+repair|collision|transmission|student\s+dormitory|orthodox\s+church|storage\s+facility|insurance\s+agency|urolog|restaurant|pharmacy/i;

function normalizeKey(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Fallback: lowercase prose, light plural / phrasing for service-style labels. */
function humanizeFallback(raw: string): string {
  const s = raw.trim().toLowerCase();
  if (!s) return "";
  if (s.endsWith(" service")) {
    return `${s.slice(0, -" service".length)} services`;
  }
  if (s.endsWith(" clinic")) {
    return s.replace(/ clinic$/, " clinics");
  }
  if (s.endsWith(" center")) {
    return s.replace(/ center$/, " centers");
  }
  if (!s.endsWith("s")) {
    return `${s}s`;
  }
  return s;
}

function phraseForLabel(raw: string): string | null {
  const key = normalizeKey(raw);
  if (!key) return null;
  if (NON_FUNERAL.test(key)) return null;
  if (EXACT_PHRASE[key]) return EXACT_PHRASE[key];
  if (!FUNERAL_LIKE.test(raw)) return null;
  return humanizeFallback(raw);
}

function oxfordJoin(items: string[]): string {
  if (items.length === 1) return items[0]!;
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/**
 * @param careTypes Raw labels from listings (dedupe before calling if needed).
 * @param maxItems Cap how many categories appear in the sentence (default 5).
 * @returns Clause starting with "including …" or a neutral fallback (no leading "including" duplicate in caller).
 */
export function formatCareTypesClause(
  careTypes: string[],
  maxItems = 5,
): string {
  const seen = new Set<string>();
  const phrases: string[] = [];
  for (const raw of careTypes) {
    const p = phraseForLabel(raw);
    if (!p || seen.has(p)) continue;
    seen.add(p);
    phrases.push(p);
    if (phrases.length >= maxItems) break;
  }
  if (phrases.length === 0) {
    return "including funeral homes, mortuaries, crematories, memorial chapels, and cemeteries";
  }
  return `including ${oxfordJoin(phrases)}`;
}

/** Schema.org-typed entries for primary funeral categories (LocalBusiness / related types). */
export function funeralCategorySchemaThings(): Array<{
  "@type": string;
  name: string;
}> {
  return [
    { "@type": "FuneralHome", name: "Funeral Home" },
    { "@type": "FuneralHome", name: "Mortuary" },
    { "@type": "Crematory", name: "Crematory" },
    { "@type": "FuneralHome", name: "Memorial Chapel" },
    { "@type": "Cemetery", name: "Cemetery" },
  ];
}

/** Default sentence when no care-type stats exist (FAQ answers, etc.). */
export const DEFAULT_FUNERAL_CARE_TYPES_SENTENCE =
  "Funeral Home, Mortuary, Crematory, Memorial Chapel, Cemetery";
