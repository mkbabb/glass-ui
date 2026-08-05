export type ClassValue =
    | string
    | number
    | false
    | null
    | undefined
    | ClassValue[]
    | { readonly [className: string]: unknown };

/**
 * `cn()` — class-name compositor for glass-ui components.
 *
 * Glass-ui uses a small, stable subset of Tailwind utilities, so a compact
 * local conflict table is sufficient. This keeps class normalization and
 * last-write-wins deduplication in one dependency-free owner.
 *
 * Semantics: `joinClassValues` normalises the variadic argument shape (strings,
 * arrays, conditional objects, falsy filtering). The deduplicator then
 * walks the joined string left-to-right, computes each token's
 * conflict-key (the CSS-property bucket the utility writes to), and
 * keeps only the last token per bucket. Variant prefixes like
 * `hover:`, `md:`, `dark:`, `[&::after]:` carry their own conflict
 * scope: a bucket-key incorporates the prefix so `text-small md:text-lg`
 * keeps both. `!`-important tokens scope identically to their
 * non-important twin (`!p-2 p-4` keeps `p-4` — last-write-wins ignores
 * importance, mirroring twMerge's behaviour for the cases glass-ui hits).
 *
 * Tokens that don't match a known bucket pass through untouched (custom
 * classes, arbitrary-value utilities like `[&::after]:hidden`, anything
 * not in the conflict table).
 */
export function cn(...inputs: ClassValue[]): string {
    return dedupClasses(joinClassValues(...inputs));
}

/** Normalize Vue-compatible class values without shipping a runtime class helper. */
export function joinClassValues(...inputs: ClassValue[]): string {
    const classes: string[] = [];
    const visit = (value: ClassValue): void => {
        if (!value) return;
        if (typeof value === "string" || typeof value === "number") {
            classes.push(String(value));
        } else if (Array.isArray(value)) {
            value.forEach(visit);
        } else {
            for (const [name, enabled] of Object.entries(value)) {
                if (enabled) classes.push(name);
            }
        }
    };
    inputs.forEach(visit);
    return classes.join(" ");
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
    // Font-size — listed BEFORE text-color so `text-small` doesn't get
    // mis-bucketed as a colour.
    ["font-size", /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/],
    // Glass-ui typography utilities (`text-micro`, `text-display*`,
    // `text-title`, `text-hero`, `text-body`, `text-caption`,
    // `text-mono-*`, etc. — see `styles/typography.css`). These are
    // size/leading/font-family recipes, NOT colour utilities; bucketing
    // them as `font-size` (separate from `text-color`) lets the colour
    // utility from a `cva` variant (e.g. Button `default` →
    // `text-primary-foreground`) coexist with a consumer's typography
    // utility (`text-micro`) instead of shadowing it. This conflict-bucket
    // fix is the publisher-side resolution
    // (dashboard map "DL" chip text invisibility — `text-micro` from
    // the consumer was clobbering `text-primary-foreground` from the
    // Button variant under the previous catch-all `text-color` bucket).
    [
        "font-size",
        /^text-(micro|small|caption|body|prose|admin-label|heading|subheading|title|display|display-hero|display-mega|display-audacious|display-2|display-3|display-4|display-5|hero|math|math-body|mono-caption|mono-small|mono-prose|mono-micro)$/,
    ],
    [
        "font-weight",
        /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
    ],
    ["font-family", /^font-(sans|serif|mono)$/],
    ["font-style", /^(italic|not-italic)$/],
    ["text-align", /^text-(left|center|right|justify|start|end)$/],
    ["text-transform", /^(uppercase|lowercase|capitalize|normal-case)$/],
    ["text-decoration", /^(underline|overline|line-through|no-underline)$/],
    ["text-color", /^text-/], // catch-all colour bucket; runs AFTER size/align/typography

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
    // ONE bucket per CSS longhand group the utility writes, and an OPEN value
    // segment. The prior single rule enumerated only shadcn's size ladder
    // (`none|sm|md|lg|xl|2xl|3xl|full` + bare sides), which had two holes:
    //   1. every ROLE utility Tailwind emits from a `--radius-*` theme key
    //      (`rounded-card`, `rounded-pill`, `rounded-panel`, `rounded-dialog`,
    //      `rounded-tab`, `rounded-dock-card`, `rounded-media`, `rounded-xs`, …)
    //      matched nothing, so it never conflicted — a consumer's `rounded-card`
    //      and a recipe's `rounded-panel` BOTH survived `cn()` and the winner was
    //      decided by stylesheet order, not call order. That is the O-7 defect:
    //      the override silently no-ops. Same for arbitrary values
    //      (`rounded-[6px]`) and the v4 var shorthand (`rounded-(--radius-card)`).
    //   2. `rounded-t-lg` matched nothing either (the old rule accepted a bare
    //      side, never side + value).
    // Per-corner/per-side buckets are required, NOT one radius bucket: the
    // corner longhands are disjoint from the shorthand's other corners, so
    // `rounded-card rounded-t-none` must keep BOTH tokens. Order is
    // corner (2 letters) → side (1 letter) → shorthand, because `^rounded-t…`
    // would otherwise swallow `rounded-tl-…`. Role names that merely START with a
    // side letter are safe by construction: the side rules require `-` or
    // end-of-token right after the letter, so `rounded-tab`, `rounded-tooltip`,
    // `rounded-badge`, `rounded-lg` and `rounded-sm` all fall through to the
    // shorthand bucket, which is correct — they set all four corners.
    ["rounded-ss", /^rounded-ss(?:-.+)?$/],
    ["rounded-se", /^rounded-se(?:-.+)?$/],
    ["rounded-ee", /^rounded-ee(?:-.+)?$/],
    ["rounded-es", /^rounded-es(?:-.+)?$/],
    ["rounded-tl", /^rounded-tl(?:-.+)?$/],
    ["rounded-tr", /^rounded-tr(?:-.+)?$/],
    ["rounded-br", /^rounded-br(?:-.+)?$/],
    ["rounded-bl", /^rounded-bl(?:-.+)?$/],
    ["rounded-s", /^rounded-s(?:-.+)?$/],
    ["rounded-e", /^rounded-e(?:-.+)?$/],
    ["rounded-t", /^rounded-t(?:-.+)?$/],
    ["rounded-r", /^rounded-r(?:-.+)?$/],
    ["rounded-b", /^rounded-b(?:-.+)?$/],
    ["rounded-l", /^rounded-l(?:-.+)?$/],
    ["rounded", /^rounded(?:-.+)?$/],

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
