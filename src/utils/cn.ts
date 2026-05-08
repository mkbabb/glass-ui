import { type ClassValue, clsx } from "clsx";

/**
 * `cn()` — class-name compositor for glass-ui.
 *
 * Rationale (W3.b.2 / A5 §3 Split 6): `tailwind-merge` ships ~22 KB
 * gzipped of full Tailwind config to resolve every conflict pair across
 * the framework. Glass-ui exercises a small, stable subset of Tailwind
 * utilities; the conflict surface is enumerable. We replace twMerge with
 * a hand-rolled deduplicator that handles the ~30 conflict pairs glass-ui
 * actually relies on, paying ~0.5 KB gzipped instead.
 *
 * Semantics: clsx normalises the variadic argument shape (strings,
 * arrays, conditional objects, falsy filtering). The deduplicator then
 * walks the joined string left-to-right, computes each token's
 * conflict-key (the CSS-property bucket the utility writes to), and
 * keeps only the last token per bucket. Variant prefixes like
 * `hover:`, `md:`, `dark:`, `[&::after]:` carry their own conflict
 * scope: a bucket-key incorporates the prefix so `text-sm md:text-lg`
 * keeps both. `!`-important tokens scope identically to their
 * non-important twin (`!p-2 p-4` keeps `p-4` — last-write-wins ignores
 * importance, mirroring twMerge's behaviour for the cases glass-ui hits).
 *
 * Tokens that don't match a known bucket pass through untouched (custom
 * classes, arbitrary-value utilities like `[&::after]:hidden`, anything
 * not in the conflict table).
 */
export function cn(...inputs: ClassValue[]): string {
    return dedupClasses(clsx(inputs));
}

/**
 * Rules: each entry is `[bucket-id, regex]`. The regex is matched
 * against the *unprefixed core* of a token (after stripping variant
 * prefixes and `!`). The bucket-id is what we collide on — two tokens
 * sharing a bucket-id under the same prefix scope are conflicts.
 *
 * Order matters: the FIRST matching rule wins. Subset rules (e.g.
 * `text-{color}` vs the more specific `text-{size}`) must therefore be
 * listed in the right order.
 */
const RULES: ReadonlyArray<readonly [string, RegExp]> = [
    // ── Typography ────────────────────────────────────────────────
    // Font-size — listed BEFORE text-color so `text-sm` doesn't get
    // mis-bucketed as a colour.
    ["font-size", /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/],
    [
        "font-weight",
        /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
    ],
    ["font-family", /^font-(sans|serif|mono)$/],
    ["font-style", /^(italic|not-italic)$/],
    ["text-align", /^text-(left|center|right|justify|start|end)$/],
    ["text-transform", /^(uppercase|lowercase|capitalize|normal-case)$/],
    ["text-decoration", /^(underline|overline|line-through|no-underline)$/],
    ["text-color", /^text-/], // catch-all colour bucket; runs AFTER size/align

    // ── Spacing — padding ─────────────────────────────────────────
    ["padding-x", /^px-/],
    ["padding-y", /^py-/],
    ["padding-t", /^pt-/],
    ["padding-r", /^pr-/],
    ["padding-b", /^pb-/],
    ["padding-l", /^pl-/],
    ["padding-s", /^ps-/],
    ["padding-e", /^pe-/],
    ["padding", /^p-/],

    // ── Spacing — margin ──────────────────────────────────────────
    ["margin-x", /^-?mx-/],
    ["margin-y", /^-?my-/],
    ["margin-t", /^-?mt-/],
    ["margin-r", /^-?mr-/],
    ["margin-b", /^-?mb-/],
    ["margin-l", /^-?ml-/],
    ["margin-s", /^-?ms-/],
    ["margin-e", /^-?me-/],
    ["margin", /^-?m-/],

    // ── Gap ───────────────────────────────────────────────────────
    ["gap-x", /^gap-x-/],
    ["gap-y", /^gap-y-/],
    ["gap", /^gap-/],

    // ── Sizing ────────────────────────────────────────────────────
    ["width", /^w-/],
    ["height", /^h-/],
    ["min-width", /^min-w-/],
    ["min-height", /^min-h-/],
    ["max-width", /^max-w-/],
    ["max-height", /^max-h-/],
    ["size", /^size-/],

    // ── Colour ────────────────────────────────────────────────────
    ["bg-color", /^bg-/],
    ["border-color", /^border-(?:[a-z]+-\d+|black|white|transparent|current|inherit)/],
    ["border-width", /^border(?:-x|-y|-t|-r|-b|-l|-s|-e)?(?:-\d+|-0|)$/],
    ["ring-color", /^ring-(?:[a-z]+-\d+|black|white|transparent)/],
    ["ring-width", /^ring(?:-\d+|-0|)$/],

    // ── Borders / radius ─────────────────────────────────────────
    ["rounded", /^rounded(?:-(?:none|sm|md|lg|xl|2xl|3xl|full|t|r|b|l|tl|tr|bl|br))?$/],

    // ── Layout ────────────────────────────────────────────────────
    [
        "display",
        /^(block|inline-block|inline|flex|inline-flex|grid|inline-grid|table|hidden|contents|flow-root)$/,
    ],
    ["position", /^(static|fixed|absolute|relative|sticky)$/],
    ["overflow", /^overflow-(auto|hidden|clip|visible|scroll)$/],
    ["overflow-x", /^overflow-x-/],
    ["overflow-y", /^overflow-y-/],

    // ── Flex / grid alignment ─────────────────────────────────────
    ["flex", /^flex-(1|auto|none|initial)$/],
    ["flex-direction", /^flex-(row|row-reverse|col|col-reverse)$/],
    ["flex-wrap", /^flex-(wrap|wrap-reverse|nowrap)$/],
    ["items", /^items-/],
    ["justify", /^justify-/],
    ["self", /^self-/],
    ["place-items", /^place-items-/],
    ["place-content", /^place-content-/],

    // ── Misc ──────────────────────────────────────────────────────
    ["opacity", /^opacity-/],
    ["z-index", /^-?z-/],
    ["cursor", /^cursor-/],
    ["pointer-events", /^pointer-events-/],
    ["select", /^select-/],
    ["shadow", /^shadow(?:-|$)/],
] as const;

/**
 * Split a token like `md:hover:!text-lg` into `[prefixScope, core]`.
 * The prefix scope is everything up through the final `:` (variants),
 * with the leading `!` stripped from `core`. An empty prefix means a
 * base-layer token.
 */
function splitToken(token: string): { scope: string; core: string } {
    const lastColon = token.lastIndexOf(":");
    const scope = lastColon === -1 ? "" : token.slice(0, lastColon + 1);
    let core = lastColon === -1 ? token : token.slice(lastColon + 1);
    if (core.startsWith("!")) core = core.slice(1);
    return { scope, core };
}

function bucketFor(core: string): string | null {
    for (const [id, re] of RULES) {
        if (re.test(core)) return id;
    }
    return null;
}

/**
 * Walk the joined class string left-to-right; for each token, look up
 * its conflict bucket; keep only the last token per `(scope|bucket)`
 * pair. Tokens with no bucket pass through (preserving order).
 */
function dedupClasses(joined: string): string {
    if (!joined) return "";
    const tokens = joined.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return "";

    // Map keys to indices into `tokens`; later writes overwrite earlier.
    const lastIndex = new Map<string, number>();
    // Mark which token positions to keep. Default true; conflicting
    // earlier positions flip to false when a later same-key lands.
    const keep: boolean[] = new Array(tokens.length).fill(true);

    for (let i = 0; i < tokens.length; i += 1) {
        const token = tokens[i];
        const { scope, core } = splitToken(token);
        const bucket = bucketFor(core);
        if (bucket === null) continue;
        const key = `${scope}|${bucket}`;
        const prev = lastIndex.get(key);
        if (prev !== undefined) keep[prev] = false;
        lastIndex.set(key, i);
    }

    const out: string[] = [];
    for (let i = 0; i < tokens.length; i += 1) {
        if (keep[i]) out.push(tokens[i]);
    }
    return out.join(" ");
}
