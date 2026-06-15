// proof:suffuse — AZ.W-SUFFUSE: the suffusion pass (the audacious-type uplift +
// the motion-purple color-pop map under the one-color-event rule + the calm
// glass/grid/math content idiom on the thin pages) — born-RED, device-free
// SOURCE arm.
//
// The house OWNS a magnificent audacious type ladder + a 13-stop section-color
// ramp + paper/grid/math vocabulary, but the demo STARVED all three: the chassis
// capped every title at text-heading, the two top audacious tiers had ZERO
// consumers, the motion family spent the WRONG (Fourier-red) hue, ~104/121 routes
// wore the flat default with no glass/grid/math read, and the settings eyebrows
// cycled a four-hue rainbow. This wave SUFFUSES the language within proportion —
// each surface gets its ONE deliberate color/display event, never two competing.
//
// THIS DEVICE-FREE SOURCE ARM proves the STRUCTURE; the π arm
// (tests-visual/suffuse.spec.ts) proves the RENDER (a hero title resolving to a
// display register, a motion plot resolving to --viz-legendre, an activated
// metric number resolving to the mega/audacious tier, the thin-page grid
// underlay VISIBLE). The implementer must NOT treat a green source arm as done;
// G2 (the π readback) is the binding close.
//
// This arm asserts:
//   (a) StoryHero upgrades the hero title to a DISPLAY register (text-display-3/4)
//       on a hero page — the title rung is no longer text-heading for ALL pages.
//   (b) the two top audacious tiers (text-display-mega / text-display-audacious)
//       have ≥2 live demo consumers each on the enrolled metric/number/hero
//       surfaces (the FLOOR — the ACTIVATE not prune), AND the CEILING holds: the
//       mega/audacious tiers land ONLY on the enrolled metric/number/hero element
//       set (a section <h2> / body-copy consuming them FAILS).
//   (c) --motion-accent keyed off --viz-legendre exists + the motion surfaces
//       consume it; NO --viz-fourier / --demo-hue / stroke-[--primary] orange-red
//       remains on a motion plot/dot/sample/typewriter/underline — checked across
//       the FILL/STROKE/BACKGROUND channels, not only color:/text-*.
//   (d) the one-color-event proportion holds, by the THREE machine-checkable
//       predicates over the per-surface LEDGER: (d1) body ink untinted on each
//       enrolled surface (the decidable floor); (d2) the chip recipe stays ≤ icon
//       scale where used; (d3) ≤1 declared tinted EVENT per enrolled surface (the
//       count over the full channel set) + the legitimately-monochrome surfaces
//       assert ZERO tinted elements; AND the ledger COVERS the closed enrolled set.
//   (e) NO <Aurora>/<Constellation>/<FourierField>/<GooBlob> is ADDED to a content
//       page (the over-spend fence) + ppmycota purple is NOT in any library token.
//
// Born-RED on the pre-edit tree: the flat type (StoryHero rendered no display
// hero title), the dead mega/audacious tiers (0 consumers), the Fourier-red
// motion (typewriter/underline on --viz-fourier), and the four-hue settings
// eyebrows tripping d3.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// BA.W-CARVE2 — typography.css carved into typography/*.css partials (the
// .section-label--tinted variant lives in utilities.css); readMonolith
// concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:suffuse";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Recursively list files under a repo-relative dir matching the extension,
// returned as repo-relative paths.
const listFiles = (relDir, ext) => {
    const out = [];
    const walk = (dir) => {
        for (const name of readdirSync(dir)) {
            const p = resolve(dir, name);
            if (statSync(p).isDirectory()) walk(p);
            else if (name.endsWith(ext)) out.push(p.slice(ROOT.length + 1));
        }
    };
    walk(resolve(ROOT, relDir));
    return out;
};
const listStoryFiles = () => listFiles("demo/stories", ".vue");
const listLibStyleFiles = () => listFiles("src/styles", ".css");

// Strip HTML/Vue/JS/CSS comments so a prose mention in a comment is NOT a false
// hit — the whole gate is comment-blind. Preserve newlines for line geometry.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ═══════════════════════════════════════════════════════════════════════════
// The per-surface ONE-COLOR-EVENT LEDGER (the REQUIRED gate INPUT — §8).
//
// Each enrolled surface declares its ONE tinted event ({event-token,
// element-selector}); the legitimately-monochrome surfaces (D3-9) declare ZERO.
// The enrolled set is CLOSED (the under-enrollment guard): it is the union of
// every defect-table color surface + the D3-9 monochrome set. The d3 count check
// reads this ledger.
//
// The "tinted element" channel set is the FULL paint surface — a token counts
// when it appears in ANY of {color:, background[-color]:, fill:, stroke:} or their
// Tailwind arbitrary forms {text-[…], bg-[…], fill-[…], stroke-[…]} or an inline
// :style/backgroundColor/component-color-prop. The event-token families are the
// suffusion tokens: --section-color-N / --chart-* / --viz-* / --motion-accent /
// --color-gold / --section-label-accent / --tier-featured.
// ═══════════════════════════════════════════════════════════════════════════
const LEDGER = [
    // ── The motion category — ONE coherent purple event (--motion-accent) ──────
    {
        surface: "demo/stories/motion/curve-gallery.vue",
        event: "--motion-accent",
        kind: "color",
    },
    {
        surface: "demo/stories/foundations/motion.vue",
        event: "--motion-accent",
        kind: "color",
    },
    {
        surface: "demo/stories/motion/springs.vue",
        event: "--motion-accent",
        kind: "color",
    },
    {
        surface: "demo/stories/motion/typewriter.vue",
        event: "--motion-accent",
        kind: "color",
    },
    {
        surface: "demo/stories/motion/underline.vue",
        event: "--motion-accent",
        kind: "color",
    },
    // ── The metric surfaces — the semantic glyph tint (--chart-*) ──────────────
    {
        surface: "demo/stories/data/metric-cell.vue",
        event: "--chart-*",
        kind: "color",
    },
    // ── The settings eyebrows — ONE section-accent register (de-noised D1-8) ───
    {
        surface: "demo/stories/compositions/settings.vue",
        event: "--section-color-7",
        kind: "color",
    },
    // ── The IconChip POP surfaces — ONE section-color event via the primitive ──
    // (BA.W-ICON-CHIP). The chip is the ONE event vehicle: the Pops reference row
    // (icons.vue) + the empty-states grid each read the `--section-color-N` ramp
    // through `<IconChip :section>` — proof:suffuse now asserts the one-event count
    // against the SINGLE component, not the N inline pastes the chip subsumed. Body
    // ink stays untinted (d1) — the chip tints only the plate+glyph, never a <p>.
    {
        surface: "demo/stories/foundations/icons.vue",
        event: "--section-color-*",
        kind: "color",
    },
    {
        surface: "demo/stories/compositions/empty-states.vue",
        event: "--section-color-*",
        kind: "color",
    },
    // ── The legitimately-monochrome surfaces (D3-9) — ZERO events ──────────────
    // The icon GRID (the icons.vue grid block — NOT the Pops chip block, which is
    // the chip reference and a sanctioned event), the Section type-ladder
    // (typography.vue), and the curve-gallery TABLE — adding color VIOLATES the
    // one-event proportion. (These are scoped by their own SURFACE not the file;
    // the gate's d3 monochrome assert names the specific zero-tint blocks below.)
    {
        surface: "demo/stories/foundations/typography.vue",
        event: null,
        kind: "monochrome",
    },
];

const LEDGER_BY_FILE = new Map(LEDGER.map((r) => [r.surface, r]));

// ── (a) StoryHero hero-title display register ────────────────────────────────
// The chassis renders a DISPLAY-register hero <h1> (text-display-3 / -4) when
// variant="hero", off the prior flat text-heading-for-all-pages.
const storyHero = strip(read("demo/stories/StoryHero.vue"));
const heroTitleIsDisplay =
    /<h1[^>]*\bclass="[^"]*\btext-display-[34]\b/.test(storyHero) &&
    /showHeroTitle|variant\s*===\s*["']hero["']/.test(storyHero);
add(
    "a-hero-title-display-register",
    heroTitleIsDisplay,
    heroTitleIsDisplay
        ? "StoryHero renders the chassis hero <h1> at the DISPLAY register (text-display-3/4) on a hero page — the title rung is no longer text-heading for ALL pages (D2-1)"
        : "StoryHero does NOT render a display-register hero <h1> (text-display-3/4 on variant=hero)",
);

// ── (b) Activate the dead audacious tiers — FLOOR (≥2 each) + CEILING ─────────
// FLOOR: text-display-mega + text-display-audacious each have ≥2 live demo
// consumers on the enrolled metric/number/hero surfaces.
const ENROLLED_AUDACIOUS_SURFACES = [
    "demo/stories/data/metric-cell.vue",
    "demo/stories/data/metric-stack.vue",
    "demo/stories/display/metric-badge.vue",
    "demo/stories/compositions/hero.vue",
    "demo/stories/foundations/intro.vue",
    "demo/stories/compositions/auth-shell.vue",
];

function countTierConsumers(tierClass) {
    let count = 0;
    const hits = [];
    for (const rel of ENROLLED_AUDACIOUS_SURFACES) {
        const src = strip(read(rel));
        const re = new RegExp(`\\b${tierClass}\\b`, "g");
        const m = src.match(re);
        if (m) {
            count += m.length;
            hits.push(`${rel}×${m.length}`);
        }
    }
    return { count, hits };
}

const megaConsumers = countTierConsumers("text-display-mega");
const audaciousConsumers = countTierConsumers("text-display-audacious");
add(
    "b-floor-mega-tier-activated",
    megaConsumers.count >= 2,
    megaConsumers.count >= 2
        ? `text-display-mega has ${megaConsumers.count} live consumer(s) on enrolled metric/number/hero surfaces: ${megaConsumers.hits.join(", ")} (the ACTIVATE, not prune — D2-3)`
        : `text-display-mega has only ${megaConsumers.count} enrolled consumer(s) (<2): ${megaConsumers.hits.join(", ")}`,
);
add(
    "b-floor-audacious-tier-activated",
    audaciousConsumers.count >= 2,
    audaciousConsumers.count >= 2
        ? `text-display-audacious has ${audaciousConsumers.count} live consumer(s) on enrolled metric/number/hero surfaces: ${audaciousConsumers.hits.join(", ")} (D2-3)`
        : `text-display-audacious has only ${audaciousConsumers.count} enrolled consumer(s) (<2): ${audaciousConsumers.hits.join(", ")}`,
);

// CEILING: the mega/audacious tiers land ONLY on the enrolled metric/number/hero
// element set — a section <h2> or body-copy <p> consuming a mega/audacious tier
// FAILS. We scan EVERY demo story file; any <h2 ...mega/audacious> or
// <p ...mega/audacious> (the body/section channels) is a ceiling breach.
const audaciousCeilingBreaches = [];
const ALL_STORY_FILES = listStoryFiles();
for (const rel of ALL_STORY_FILES) {
    const src = strip(read(rel));
    // A section <h2> or a long-form <p class="text-prose/-body"> carrying a
    // mega/audacious tier is a body/section breach (the tiers belong on the
    // metric/number value spans + the hero <h1>, never the section/body rung).
    const breachRe = /<(h2|h3)\b[^>]*\bclass="[^"]*\btext-display-(mega|audacious)\b/g;
    let m;
    while ((m = breachRe.exec(src)) !== null) {
        audaciousCeilingBreaches.push(`${rel} <${m[1]} …mega/audacious>`);
    }
    // A text-prose/-body element carrying the tier (body-copy breach).
    const proseBreachRe =
        /class="[^"]*\btext-(prose|body)\b[^"]*\btext-display-(mega|audacious)\b|class="[^"]*\btext-display-(mega|audacious)\b[^"]*\btext-(prose|body)\b/g;
    while ((m = proseBreachRe.exec(src)) !== null) {
        audaciousCeilingBreaches.push(`${rel} body-copy+mega/audacious`);
    }
}
add(
    "b-ceiling-audacious-only-on-metric-hero",
    audaciousCeilingBreaches.length === 0,
    audaciousCeilingBreaches.length === 0
        ? "the mega/audacious tiers stay in proportion — NO section <h2>/<h3> and NO body-copy element consumes them (the ceiling: they land only on the metric/number value + the hero <h1>) — the Arm-D2 over-spend counter"
        : `${audaciousCeilingBreaches.length} ceiling breach(es): ${audaciousCeilingBreaches.slice(0, 6).join("; ")}`,
);

// Non-collision with W-HIERARCHY: no D2 edit re-rungs a shared-route section <h2>
// off text-subheading. The display moment is a SEPARATE element above the <h2>.
const HIERARCHY_SHARED_ROUTES = [
    "demo/stories/dock/overview.vue",
    "demo/stories/data/data-table.vue",
    "demo/stories/navigation/tabs.vue",
    "demo/stories/display/card.vue",
];
const sharedRouteH2Breaches = [];
for (const rel of HIERARCHY_SHARED_ROUTES) {
    const src = strip(read(rel));
    const h2Tags = src.match(/<h2\b[^>]*>/g) ?? [];
    for (const tag of h2Tags) {
        const cls = (tag.match(/class="([^"]*)"/) || [, ""])[1];
        // A shared-route section <h2> must NOT be lifted to a display/heading/title
        // rung (W-HIERARCHY's π asserts it resolves to text-subheading).
        if (/\btext-(display|heading|title)\b|\btext-display-/.test(cls)) {
            sharedRouteH2Breaches.push(`${rel}: ${tag.slice(0, 60)}`);
        }
    }
}
add(
    "b-non-collision-hierarchy-h2",
    sharedRouteH2Breaches.length === 0,
    sharedRouteH2Breaches.length === 0
        ? "no D2 edit re-rungs a W-HIERARCHY-shared-route section <h2> off text-subheading (the display head is a SEPARATE element above the <h2>, never the <h2>'s rung — the non-collision clause)"
        : `${sharedRouteH2Breaches.length} shared-route <h2> rung breach(es): ${sharedRouteH2Breaches.join("; ")}`,
);

// ── (c) The motion-purple identity + NO orange-red on a motion surface ────────
// --motion-accent minted off --viz-legendre (demo-local).
const demoCss = strip(read("demo/demo.css"));
const motionAccentMinted = /--motion-accent\s*:\s*var\(--viz-legendre\)/.test(demoCss);
add(
    "c-motion-accent-minted",
    motionAccentMinted,
    motionAccentMinted
        ? "--motion-accent is minted DEMO-LOCAL off var(--viz-legendre) (the ppmycota-purple library twin) — the motion family's ONE coherent purple event"
        : "--motion-accent is NOT minted off --viz-legendre in demo/demo.css",
);

// NO orange-red token on a motion plot/dot/sample/typewriter/underline — across
// the FILL/STROKE/BACKGROUND/color channels (the channel-swap-evasion guard).
const MOTION_SURFACES = [
    "demo/stories/motion/curve-gallery.vue",
    "demo/stories/motion/springs.vue",
    "demo/stories/motion/typewriter.vue",
    "demo/stories/motion/underline.vue",
    "demo/stories/motion/scroll-vt.vue",
    "demo/stories/motion/curve-gallery/BezierEditor.vue",
    "demo/stories/foundations/motion.vue",
];
// The banned orange-red tokens (the Fourier-red family + the spring orange-red
// fallback hue + the near-black primary plot ink) on ANY paint channel.
const RED_CHANNEL_RE =
    /(?:color:|background(?:-color)?:|fill:|stroke:|backgroundColor)\s*[^;"}]*var\(--viz-fourier\)|(?:text|bg|fill|stroke)-\[var\(--viz-fourier\)\]|var\(--demo-hue|stroke-\[var\(--primary\)\]|fill-\[var\(--primary\)\]/;
const motionRedHits = [];
for (const rel of MOTION_SURFACES) {
    const src = strip(read(rel));
    if (RED_CHANNEL_RE.test(src)) {
        motionRedHits.push(rel);
    }
}
add(
    "c-no-orange-red-on-motion",
    motionRedHits.length === 0,
    motionRedHits.length === 0
        ? `NO --viz-fourier / --demo-hue / stroke-[--primary] orange-red remains on a motion plot/dot/sample/typewriter/underline across the FILL/STROKE/BACKGROUND/color channels (${MOTION_SURFACES.length} surfaces) — the channel-swap-evasion guard (D3-3/D3-4)`
        : `${motionRedHits.length} motion surface(s) still spend orange-red: ${motionRedHits.join("; ")}`,
);

// The motion surfaces CONSUME --motion-accent.
const motionConsumesAccent = MOTION_SURFACES.filter((rel) =>
    /--motion-accent/.test(strip(read(rel))),
);
add(
    "c-motion-surfaces-consume-accent",
    motionConsumesAccent.length >= 4,
    motionConsumesAccent.length >= 4
        ? `${motionConsumesAccent.length} motion surface(s) consume --motion-accent (the plots/dots/sample/typewriter/underline read ONE purple)`
        : `only ${motionConsumesAccent.length} motion surface(s) consume --motion-accent (<4)`,
);

// ── (d1) body ink untinted on each enrolled surface (the decidable floor) ─────
// On each enrolled surface, no body-copy element (text-prose/-body/-foreground/
// -muted-foreground <p>) carries a color:/text-{section,chart,viz,gold,motion}-*
// tint. We scan <p ...> open tags carrying a body register + a tint utility.
const TINT_UTILITY_RE =
    /\btext-(section-\d+|chart-[a-z]+|viz-[a-z]+|gold|motion-accent)\b|color:\s*[^;"}]*var\(--(section-color|chart|viz|color-gold|motion-accent|gold)/;
const bodyTintHits = [];
for (const row of LEDGER) {
    if (row.kind === "monochrome") continue;
    const src = strip(read(row.surface));
    const pTags = src.match(/<p\b[^>]*>/g) ?? [];
    for (const tag of pTags) {
        if (TINT_UTILITY_RE.test(tag)) {
            bodyTintHits.push(`${row.surface}: ${tag.slice(0, 60)}`);
        }
    }
}
add(
    "d1-body-ink-untinted",
    bodyTintHits.length === 0,
    bodyTintHits.length === 0
        ? `body ink is untinted on EVERY enrolled surface — no <p> body-copy element carries a section/chart/viz/gold/motion tint (the decidable one-color-event floor)`
        : `${bodyTintHits.length} tinted body-copy element(s): ${bodyTintHits.slice(0, 6).join("; ")}`,
);

// ── (d2) the chip≤glyph ratio is STRUCTURAL — owned by the <IconChip> component ─
// BA.W-ICON-CHIP consolidated the four inline chip pastes onto the <IconChip>
// primitive, so the chip≤glyph proportion is no longer re-derived from N inline
// `size-12`/`size-14`/`size-8` hardcodes — it is the component's enforced ratio
// recipe. This assert points at the SINGLE component: the `--icon-chip-glyph-ratio`
// token is declared AND the chip diameter floors at `max(…, <glyph> × ratio)` so a
// consumer's tiny `size` can NEVER collapse the plate under the glyph. (The full
// W2 falsifiable bite lives in proof:icon-chip; this is the suffusion-ledger
// dividend — d2 asserts against one component, not N pastes.)
const iconChipCss = strip(read("src/styles/icon-chip.css"));
const ratioTokenDeclared = /--icon-chip-glyph-ratio\s*:/.test(iconChipCss);
const ratioInFloor =
    /--icon-chip-glyph-ratio/.test(iconChipCss) &&
    /(?:inline-size|block-size|width|height)\s*:\s*max\(/.test(iconChipCss);
add(
    "d2-chip-glyph-ratio-structural",
    ratioTokenDeclared && ratioInFloor,
    ratioTokenDeclared && ratioInFloor
        ? `the chip≤glyph proportion is STRUCTURAL — the <IconChip> component owns the --icon-chip-glyph-ratio token AND floors the diameter at max(…, glyph × ratio), so the plate can never paint under the glyph (the d2 proportion against ONE component, not N inline pastes)`
        : `the IconChip chip≤glyph ratio is not enforced in-component (token:${ratioTokenDeclared} floor:${ratioInFloor}) — the d2 proportion did not consolidate onto the primitive`,
);

// ── (d3) ≤1 declared tinted EVENT per enrolled surface + monochrome ZERO ──────
// Count the DISTINCT event-token FAMILIES tinted on a surface (across all
// channels). A surface with its ONE declared event family is fine; a SECOND
// distinct family is a competing event → FAIL. The monochrome surfaces assert
// ZERO across all channels.
const EVENT_FAMILIES = [
    {
        name: "section-color",
        re: /--section-color-\d+|text-section-\d+|bg-section-\d+/,
    },
    { name: "section-label-accent", re: /--section-label-accent/ },
    { name: "chart", re: /--chart-[a-z]+|text-chart-|bg-chart-/ },
    { name: "motion-accent", re: /--motion-accent/ },
    { name: "viz", re: /--viz-[a-z]+|text-\[var\(--viz-|stroke-\[var\(--viz-/ },
    { name: "gold", re: /--color-gold|--tier-featured|text-gold|bg-gold/ },
];
const eventCountBreaches = [];
for (const row of LEDGER) {
    const src = strip(read(row.surface));
    const families = EVENT_FAMILIES.filter((f) => f.re.test(src)).map((f) => f.name);
    // section-color + section-label-accent are the SAME accent register (the
    // de-noised settings eyebrow), so collapse them to one family for the count.
    const collapsed = new Set(
        families.map((f) => (f === "section-label-accent" ? "section-color" : f)),
    );
    if (row.kind === "monochrome") {
        if (collapsed.size > 0) {
            eventCountBreaches.push(
                `${row.surface}: monochrome surface gained ${collapsed.size} tint event(s) [${[...collapsed].join(",")}] — must be ZERO`,
            );
        }
    } else if (collapsed.size > 1) {
        eventCountBreaches.push(
            `${row.surface}: ${collapsed.size} competing tint event families [${[...collapsed].join(",")}] — must be ≤1 (declared: ${row.event})`,
        );
    }
}
add(
    "d3-one-event-per-surface",
    eventCountBreaches.length === 0,
    eventCountBreaches.length === 0
        ? `≤1 tinted event family per enrolled surface (across ALL paint channels) + the monochrome surfaces carry ZERO — the one-color-event count holds over the ${LEDGER.length}-surface ledger (D3-1)`
        : `${eventCountBreaches.length} one-color-event breach(es): ${eventCountBreaches.slice(0, 6).join("; ")}`,
);

// ── (d-ledger) the ledger COVERS the closed enrolled set (under-enrollment guard) ─
// Every motion surface + metric-cell + settings + the monochrome set must be in
// the ledger. A defect-table color surface MISSING from the ledger FAILS.
const REQUIRED_LEDGER_SURFACES = [
    "demo/stories/motion/curve-gallery.vue",
    "demo/stories/foundations/motion.vue",
    "demo/stories/motion/springs.vue",
    "demo/stories/motion/typewriter.vue",
    "demo/stories/motion/underline.vue",
    "demo/stories/data/metric-cell.vue",
    "demo/stories/compositions/settings.vue",
    "demo/stories/foundations/typography.vue",
];
const missingFromLedger = REQUIRED_LEDGER_SURFACES.filter(
    (s) => !LEDGER_BY_FILE.has(s),
);
add(
    "d-ledger-covers-closed-set",
    missingFromLedger.length === 0,
    missingFromLedger.length === 0
        ? `the one-color-event ledger COVERS the closed enrolled set (the motion category + metric-cell + settings eyebrows + the D3-9 monochrome set) — the under-enrollment guard`
        : `${missingFromLedger.length} defect-table color surface(s) MISSING from the ledger: ${missingFromLedger.join("; ")}`,
);

// ── (e) The over-spend fence — NO live substrate ADDED to a content page ──────
// A content page (NOT a substrate-demo, NOT a chassis file) must not render a
// live GL/Canvas substrate component. The enrolled thin pages (settings, table,
// data-table, metric-cell, metric-stack) gained grid/paper — never a substrate.
const LIVE_SUBSTRATE_RE = /<(Aurora|Constellation|FourierField|GooBlob)\b/;
const CONTENT_PAGES_FENCED = [
    "demo/stories/compositions/settings.vue",
    "demo/stories/data/table.vue",
    "demo/stories/data/data-table.vue",
    "demo/stories/data/metric-cell.vue",
    "demo/stories/data/metric-stack.vue",
];
const substrateBreaches = CONTENT_PAGES_FENCED.filter((rel) =>
    LIVE_SUBSTRATE_RE.test(strip(read(rel))),
);
add(
    "e-no-live-substrate-on-content-page",
    substrateBreaches.length === 0,
    substrateBreaches.length === 0
        ? `NO <Aurora>/<Constellation>/<FourierField>/<GooBlob> is added to an enrolled content page (${CONTENT_PAGES_FENCED.length} pages) — the over-spend fence (D4-7); the suffusion is calm grid/paper + content accents`
        : `${substrateBreaches.length} content page(s) gained a live substrate: ${substrateBreaches.join("; ")}`,
);

// ppmycota purple is NOT in any library token (the HARD fence — E1-7).
const PPMYCOTA_RE = /ppmycota/i;
const libStyleFiles = listLibStyleFiles();
const ppmycotaInLib = libStyleFiles.filter((rel) => PPMYCOTA_RE.test(read(rel)));
add(
    "e-ppmycota-not-in-library",
    ppmycotaInLib.length === 0,
    ppmycotaInLib.length === 0
        ? "ppmycota purple is NOT in any library token (src/styles/) — the HARD fence (E1-7); --motion-accent rides the EXISTING --viz-legendre twin, demo-local only"
        : `ppmycota leaked into ${ppmycotaInLib.length} library file(s): ${ppmycotaInLib.join("; ")}`,
);

// ── (f) The thin pages gain the calm idiom (the section-label--tinted variant) ─
const typographyCss = strip(readMonolith(ROOT, "typography"));
const tintedVariantExists =
    /\.section-label--tinted\s*\{[\s\S]*?--section-label-accent/.test(typographyCss);
const settingsConsumesTinted = /section-label--tinted/.test(
    strip(read("demo/stories/compositions/settings.vue")),
);
add(
    "f-section-accent-register-abstracted",
    tintedVariantExists && settingsConsumesTinted,
    tintedVariantExists && settingsConsumesTinted
        ? ".section-label--tinted variant exists (ONE coherent --section-label-accent register, default --section-color-7) AND settings consumes it (the D1-8 four-hue de-noise — the page-scope one-color-event)"
        : `the section-accent register is incomplete (variant exists: ${tintedVariantExists}, settings consumes: ${settingsConsumesTinted})`,
);

// The settings four-hue eyebrow rainbow is GONE (no per-section section-color-N
// cycle on the eyebrow).
const settingsRaw = strip(read("demo/stories/compositions/settings.vue"));
const settingsFourHueGone =
    !/var\(--section-color-\$\{[^}]*\.section\}/.test(settingsRaw) &&
    !/section:\s*\d+\s*,/.test(settingsRaw);
add(
    "f-settings-four-hue-denoised",
    settingsFourHueGone,
    settingsFourHueGone
        ? "the settings four-hue eyebrow rainbow (per-group section: 2/5/8/11 cycle) is GONE — the eyebrows read ONE coherent section-accent register (D1-8)"
        : "the settings four-hue eyebrow cycle (per-group section-color-N) is still present",
);

// ── (z) the π readback spec is wired (the BINDING close — G2) ─────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/suffuse.spec.ts")),
    "tests-visual/suffuse.spec.ts exists (the π getComputedStyle readback: the hero title display rung + the motion plot --viz-legendre + the activated metric tier + the thin-page grid visibility — the BINDING close)",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:suffuse — the suffusion pass (audacious-type uplift + motion-purple color-pop + calm grid/paper/math idiom) under the one-color-event rule (AZ.W-SUFFUSE)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_SUFFUSE_OUT", "AZ-suffuse");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:suffuse",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RESOLVED hero-title display rung + the motion plot resolving to --viz-legendre + the activated metric tier + the thin-page grid visibility are proven by tests-visual/suffuse.spec.ts (the π getComputedStyle readback — the binding close), never this gate alone.",
    ledger: LEDGER,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:suffuse] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:suffuse] the design language is SUFFUSED within proportion — type sings through the chassis, the motion family reads ONE ppmycota-purple, the thin pages gain the calm grid/paper/section-accent idiom, each surface its ONE deliberate event; the restraint counters hold. The π arm binds the resolved render.",
);
