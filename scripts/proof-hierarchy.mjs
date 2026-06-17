// proof:hierarchy — AZ.W-HIERARCHY: the canonical section-heading rung + the
// Configurator hierarchy vocabulary gate (born-RED, device-free SOURCE arm).
//
// The fleet's D1 hierarchy set (D1-1..D1-10) + D6-3 root-caused: there was no
// canonical section-heading rung — story <h2>s were hand-rolled across THREE
// incompatible patterns (the canonical `text-subheading`, a BELOW-body
// `text-sm font-semibold text-muted-foreground` caption, and a `text-heading`
// that DUPLICATES the page title) — and the Configurator column read as a flat
// undifferentiated stack (section labels at `text-small font-semibold`, the
// preset row cramped). This wave lands ONE rung on <StorySection> + a NAMED
// Configurator hierarchy vocabulary the studios inherit.
//
// THIS DEVICE-FREE SOURCE ARM proves the STRUCTURE; the π arm
// (tests-visual/hierarchy.spec.ts) proves the RENDER (the RESOLVED 20.4px
// section-h2 size + no child <h3> > parent <h2> + the Configurator section
// label resolving above the row rung + the preset-row block-padding resolving
// above a body ConfiguratorRow's — the bite this source arm CANNOT give: an
// implementer could re-roll a fourth off-canon class — `text-[14px] …` — and
// green this arm while the same below-body caption defect lives; only the π
// getComputedStyle readback binds the resolved size). The implementer must NOT
// treat a green source arm as done; G2 (the π readback) is the binding close.
//
// This arm asserts:
//   (a) NO enrolled demo story <section> carries a hand-rolled section <h2>
//       using `text-sm font-semibold text-muted-foreground` (the below-body
//       caption pattern) OR a `text-heading` section <h2> (the page-title dup).
//       The canonical `text-subheading` (or the <StorySection heading=> register)
//       is the ONLY section-heading rung in the enrolled set.
//   (b) <StorySection> exposes the canonical heading register — a
//       `text-subheading`-keyed <h2> slot/register (not only the mono
//       `.section-label` caption).
//   (c) the Configurator hierarchy vocabulary's THREE NAMED tokens are declared
//       AND consumed: `--configurator-section-size` + `--configurator-section-weight`
//       on a `.configurator-section-label` (which <ConfiguratorLayer> composes —
//       no longer the flat `text-small font-semibold`), + `--configurator-preset-row-weight`
//       consumed by `.configurator-presets`'s block-padding/gap (the SPATIAL
//       rhythm slot, NOT a font-weight — D6-3's defect is the CRAMPED preset row,
//       so a font-weight consumption would green a presence-assert while the
//       "tight" defect lives). These are NOT the already-shipped
//       `--configurator-row-gap-*` density ladder (asserting that would pass
//       vacuously since it predates this wave).
//
// Born-RED at the pre-edit tree: overview/tabs hand-rolled the
// `text-sm font-semibold text-muted-foreground` h2s (a), data-table's card h2
// was `text-heading` (a), <StorySection> had only `.section-label` (b), and the
// three vocabulary tokens did not exist (c).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:hierarchy";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip HTML/Vue/JS/CSS comments so a prose mention in a comment is NOT a false
// hit — the whole gate is comment-blind. Preserve newlines for line geometry.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── The ENROLLED story set (the worst-offender routes the gate + π walk) ──────
// These are the WAVE BOUND — the pages migrated onto the canonical rung. A
// LIBRARY-WIDE migration (all ~110 stories) is a successor (the gate's
// enrolled-set assert prevents regression on the migrated pages).
const ENROLLED_STORIES = [
    "demo/stories/dock/overview.vue",
    "demo/stories/dock/layers.vue",
    "demo/stories/navigation/tabs.vue",
    "demo/stories/data/data-table.vue",
    "demo/stories/display/card.vue",
];

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── (a) NO off-canon section <h2> in the enrolled set ────────────────────────
// Pattern 1: the below-body caption `text-sm font-semibold text-muted-foreground`
//            (or `…text-foreground`) on an <h2>.
// Pattern 2: a `text-heading` on an <h2> (the page-title-duplicating rung — the
//            page <h1> is `text-heading`, so a section <h2> using it competes).
// We scan each enrolled story's <h2 ...> open tags (comment-blind).
const offCanonHits = [];
for (const rel of ENROLLED_STORIES) {
    const src = strip(read(rel));
    // Every <h2 ...> open tag's class attribute.
    const h2Tags = src.match(/<h2\b[^>]*>/g) ?? [];
    for (const tag of h2Tags) {
        const classMatch = tag.match(/class="([^"]*)"/);
        const cls = classMatch ? classMatch[1] : "";
        // Pattern 1 — the below-body caption (text-sm + font-semibold).
        if (/\btext-sm\b/.test(cls) && /\bfont-semibold\b/.test(cls)) {
            offCanonHits.push({
                rel,
                tag: tag.slice(0, 70),
                reason: "text-sm font-semibold caption",
            });
        }
        // Pattern 2 — the page-title-duplicating text-heading rung.
        if (/\btext-heading\b/.test(cls)) {
            offCanonHits.push({
                rel,
                tag: tag.slice(0, 70),
                reason: "text-heading page-title dup",
            });
        }
    }
}
add(
    "no-off-canon-section-h2",
    offCanonHits.length === 0,
    offCanonHits.length === 0
        ? `every enrolled-story section <h2> is on the canonical rung (no \`text-sm font-semibold\` below-body caption, no \`text-heading\` page-title dup) across ${ENROLLED_STORIES.length} routes — D1-1/D1-3/D1-5`
        : `${offCanonHits.length} off-canon section <h2>(s): ${offCanonHits
              .map((h) => `${h.rel} [${h.reason}]`)
              .slice(0, 6)
              .join("; ")}`,
);

// ── (b) <StorySection> exposes the canonical heading register ─────────────────
// The chassis renders a `text-subheading`-keyed <h2> (the `heading` prop /
// `#heading` slot), distinct from the mono `.section-label` caption.
const storySection = strip(read("demo/stories/StorySection.vue"));
const hasSubheadingH2 = /<h2[^>]*\bclass="[^"]*\btext-subheading\b/.test(storySection);
const hasHeadingProp =
    /\bheading\??:\s*string/.test(storySection) || /name="heading"/.test(storySection);
add(
    "story-section-canonical-heading-register",
    hasSubheadingH2 && hasHeadingProp,
    hasSubheadingH2 && hasHeadingProp
        ? "<StorySection> exposes the canonical heading register — a text-subheading-keyed <h2> driven by the `heading` prop / `#heading` slot, distinct from the .section-label caption (D1-1 chassis close)"
        : `<StorySection> is missing the canonical heading register (subheading-<h2>: ${hasSubheadingH2}, heading prop/slot: ${hasHeadingProp})`,
);

// ── (c) The Configurator hierarchy vocabulary — three NAMED tokens ────────────
// BB.W-CARVE3 — offsets-sizing.css carved into offsets.css (§9) + sizing.css
// (§10); the Configurator HIERARCHY vocabulary tokens live in §10 → sizing.css.
const offsets = strip(read("src/styles/tokens/sizing.css"));
const configCss = strip(read("src/styles/configurator.css"));
const layer = strip(read("src/components/custom/configurator/ConfiguratorLayer.vue"));

// c1 — section register: --configurator-section-size + --configurator-section-weight
//      DECLARED (token), and CONSUMED by `.configurator-section-label`.
const sectionSizeDecl = /--configurator-section-size\s*:/.test(offsets);
const sectionWeightDecl = /--configurator-section-weight\s*:/.test(offsets);
const sectionLabelRule = configCss.match(
    /\.configurator-section-label\s*\{([\s\S]*?)\}/,
);
const sectionLabelBody = sectionLabelRule ? sectionLabelRule[1] : "";
const sectionLabelConsumes =
    /font-size:\s*var\(--configurator-section-size\)/.test(sectionLabelBody) &&
    /font-weight:\s*var\(--configurator-section-weight\)/.test(sectionLabelBody);
add(
    "configurator-section-register",
    sectionSizeDecl && sectionWeightDecl && sectionLabelConsumes,
    sectionSizeDecl && sectionWeightDecl && sectionLabelConsumes
        ? "--configurator-section-size + --configurator-section-weight DECLARED and CONSUMED by .configurator-section-label (font-size + font-weight) — the section register, NOT the flat text-small font-semibold (D6-3)"
        : `section register incomplete (size-decl: ${sectionSizeDecl}, weight-decl: ${sectionWeightDecl}, .configurator-section-label consumes both: ${sectionLabelConsumes})`,
);

// c2 — <ConfiguratorLayer> composes .configurator-section-label for its label
//      (and NO LONGER the flat `text-small font-semibold` span).
const layerComposesSectionLabel = /configurator-section-label/.test(layer);
const layerHasFlatLabel = /text-small\s+font-semibold\s+text-foreground/.test(layer);
add(
    "configurator-layer-section-label",
    layerComposesSectionLabel && !layerHasFlatLabel,
    layerComposesSectionLabel && !layerHasFlatLabel
        ? "<ConfiguratorLayer> renders its label via .configurator-section-label (the section register), and the prior flat `text-small font-semibold text-foreground` span is gone"
        : `<ConfiguratorLayer> label register wrong (composes .configurator-section-label: ${layerComposesSectionLabel}, still has flat text-small font-semibold: ${layerHasFlatLabel})`,
);

// c3 — preset-row PRIMARY-AFFORDANCE lift: --configurator-preset-row-weight
//      DECLARED, and CONSUMED by `.configurator-presets`'s block-padding/gap —
//      the SPATIAL rhythm slot, NOT a font-weight (the D6-3 cramped-row guard).
const presetWeightDecl = /--configurator-preset-row-weight\s*:/.test(offsets);
const presetsRule = configCss.match(/\.configurator-presets\s*\{([\s\S]*?)\}/);
const presetsBody = presetsRule ? presetsRule[1] : "";
// MUST land on padding/gap (spatial), MUST NOT be a font-weight consumption.
const presetConsumesSpatial =
    /(?:padding|padding-block|padding-top|padding-bottom|gap)\s*:[^;]*var\(--configurator-preset-row-weight\)/.test(
        presetsBody,
    );
const presetConsumedAsFontWeight = new RegExp(
    "font-weight\\s*:[^;]*var\\(--configurator-preset-row-weight\\)",
).test(configCss);
add(
    "configurator-preset-row-spatial-lift",
    presetWeightDecl && presetConsumesSpatial && !presetConsumedAsFontWeight,
    presetWeightDecl && presetConsumesSpatial && !presetConsumedAsFontWeight
        ? "--configurator-preset-row-weight DECLARED and consumed by .configurator-presets's block-padding/gap (the SPATIAL rhythm slot, NOT a font-weight) — the preset-row primary-affordance lift (D6-3 cramped-row fix; the π arm binds the resolved block-padding > a body ConfiguratorRow's)"
        : `preset-row lift wrong (token-decl: ${presetWeightDecl}, .configurator-presets consumes it on padding/gap: ${presetConsumesSpatial}, mis-consumed as font-weight: ${presetConsumedAsFontWeight})`,
);

// ── (z) the π readback spec is wired (the BINDING close — G2) ──────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/hierarchy.spec.ts")),
    "tests-visual/hierarchy.spec.ts exists (the π getComputedStyle readback: the resolved 20.4px section-h2 + no child>parent + the Configurator section/preset-row spatial readback — the BINDING close)",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:hierarchy — the canonical section-heading rung + the Configurator hierarchy vocabulary (AZ.W-HIERARCHY)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_HIERARCHY_OUT", "AZ-hierarchy");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:hierarchy",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RESOLVED 20.4px section-h2 size + the child<parent constraint + the Configurator section/preset-row resolved spacing are proven by tests-visual/hierarchy.spec.ts (the π getComputedStyle readback — the binding close), never this gate alone (a fourth off-canon class re-roll greens this arm while π reds).",
    enrolledStories: ENROLLED_STORIES,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:hierarchy] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:hierarchy] the canonical section-heading rung is the ONLY section register in the enrolled set; <StorySection> exposes it; the Configurator hierarchy vocabulary (section weight + label register + preset-row spatial lift) is declared and consumed — the π arm binds the resolved sizes.",
);
