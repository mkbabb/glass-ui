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
//
// BB.W-HIERARCHY2 (A4-CENSUS) — the set is WIDENED to the A4 `text-heading`-on-<h2>
// stragglers (data/search · display/section · data/infinite-scroll) that the
// existing off-canon-<h2> clause DETECTS but never WALKED (they were OFF the 5-route
// enrolled set). The set must GROW, not shrink — the H2-CENSUS bite asserts the named
// stragglers are CONTAINED (a fix that greens the off-canon clause by NARROWING the
// set reds). The compositions `text-heading` are <h3> CARD/CLAIM titles
// (page-title-class moments, not section <h2>s — the A4 rule reserves text-heading for
// those), so they are NOT enrolled here (the off-canon scan is <h2>-only by design).
const AZ_ENROLLED_STORIES = [
    "demo/stories/dock/overview.vue",
    "demo/stories/dock/layers.vue",
    "demo/stories/navigation/tabs.vue",
    "demo/stories/data/data-table.vue",
    "demo/stories/display/card.vue",
];
const BB_STRAGGLER_STORIES = [
    "demo/stories/data/search.vue",
    "demo/stories/display/section.vue",
    "demo/stories/data/infinite-scroll.vue",
];
const ENROLLED_STORIES = [...AZ_ENROLLED_STORIES, ...BB_STRAGGLER_STORIES];

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
const storySection = strip(read("demo/chassis/section/StorySection.vue"));
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
// (§10); the Configurator HIERARCHY vocabulary tokens live in §10. BC.W-CUT
// re-drained that §10 tail into the cohesive leaf tokens/sizing-config.css (the
// no-god-module drain, sizing.css:447). This reader FOLLOWS the carve into the
// leaf (the W-CARVE4 "reader gates follow the carve into the leaf" precedent) by
// reading BOTH the parent + the carved leaf, so a token's relocation never
// silently de-fangs the c1/c3 declaration checks below.
const offsets =
    strip(read("src/styles/tokens/sizing.css")) +
    "\n" +
    strip(read("src/styles/tokens/sizing-config.css"));
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

// ══════════════════════════════════════════════════════════════════════════════
// BB.W-HIERARCHY2 — the StoryHeader reading-order cluster + the GRAVITY entrance +
// the widened census + the --dock-content-safe-inset content gutter (born-RED at
// the pre-wave tree; extend-in-place, NO new gate id).
// ══════════════════════════════════════════════════════════════════════════════

const storyPage = strip(read("demo/chassis/page/StoryPage.vue"));
const storyHero = strip(read("demo/chassis/hero/StoryHero.vue"));
const storyHeader = strip(read("demo/chassis/hero/StoryHeader.vue"));
const storyHeroCss = strip(read("demo/chassis/hero/story-hero.css"));

// ── (H2-ORDER) the StoryHeader cluster is ONE ordered unit (reading order) ──────
// BOTH arms (anti-evasion): (1) the chrome <header> descriptor (eyebrow + blurb) is
// SUPPRESSED on the HERO path — StoryPage's chrome <header> renders only on
// `variant === 'page'` (so a hero page shows the descriptor ONCE, re-homed into the
// cluster); (2) the cluster's DOM order is eyebrow → <h1> (default slot) → blurb (a
// fix that suppresses the chrome header but leaves the blurb ABOVE the <h1> reds).
const chromeHeaderHeroSuppressed =
    /<header\b[^>]*\bv-if="variant\s*===\s*'page'"/.test(storyPage) ||
    /<header\b[^>]*\bv-if="variant === 'page'"/.test(storyPage);
// The cluster unit renders eyebrow (story-header-eyebrow) BEFORE the <slot/> (the
// display <h1> host) BEFORE blurb (story-header-blurb) — the reading order in DOM.
const eyebrowIdx = storyHeader.indexOf("story-header-eyebrow");
const slotIdx = storyHeader.indexOf("<slot");
const blurbIdx = storyHeader.indexOf("story-header-blurb");
const clusterOrderCorrect =
    eyebrowIdx >= 0 &&
    slotIdx >= 0 &&
    blurbIdx >= 0 &&
    eyebrowIdx < slotIdx &&
    slotIdx < blurbIdx;
// StoryHero hosts the cluster (the StoryHeader unit wraps the display <h1>).
const heroHostsCluster =
    /<StoryHeader\b[\s\S]*?story-hero-title[\s\S]*?<\/StoryHeader>/.test(storyHero);
add(
    "storyheader-cluster-reading-order",
    chromeHeaderHeroSuppressed && clusterOrderCorrect && heroHostsCluster,
    chromeHeaderHeroSuppressed && clusterOrderCorrect && heroHostsCluster
        ? "the StoryHeader cluster is ONE ordered unit — the chrome <header> descriptor is suppressed on the HERO path (variant==='page' guard), and the cluster renders eyebrow → <h1> (slot) → blurb in DOM reading order, hosted in StoryHero (A4-INVERSION; the π baseline-order readback is the binding floor)"
        : `StoryHeader cluster wrong (chrome-header hero-suppressed: ${chromeHeaderHeroSuppressed}, cluster DOM order eyebrow<slot<blurb: ${clusterOrderCorrect}, StoryHero hosts the cluster: ${heroHostsCluster})`,
);

// ── (H2-GRAVITY) the cluster entrance is the no-overshoot GRAVITY register ──────
// The 3-stage cluster entrance keyframe (story-hero-cluster-rise) animates ONLY
// transform/opacity (compositor-only — NO font-size/margin/top/width key — the P5
// floor coordinating with proof:no-layout-animation), the entrance rides --ease-out
// (NO --spring-bouncy/--spring-snappy on the cluster stages — the no-overshoot
// doctrine P2), the stagger is keyframe `animation-delay` (NO setTimeout cascade),
// and the WHOLE register lives inside the prefers-reduced-motion: no-preference gate
// (PRM → static terminal).
// Pull just the keyframe body (the first balanced block after the name).
const clusterKfBody = (() => {
    const i = storyHeroCss.indexOf("@keyframes story-hero-cluster-rise");
    if (i < 0) return "";
    const open = storyHeroCss.indexOf("{", i);
    if (open < 0) return "";
    let depth = 0;
    for (let j = open; j < storyHeroCss.length; j++) {
        if (storyHeroCss[j] === "{") depth++;
        else if (storyHeroCss[j] === "}") {
            depth--;
            if (depth === 0) return storyHeroCss.slice(open + 1, j);
        }
    }
    return "";
})();
const LAYOUT_KEYS =
    /\b(font-size|margin|margin-block|margin-inline|padding|padding-block|padding-inline|top|left|right|bottom|inset|width|height|inline-size|block-size|line-height|gap)\s*:/;
const kfCompositorOnly = clusterKfBody.length > 0 && !LAYOUT_KEYS.test(clusterKfBody);
// The cluster-enter eyebrow/blurb stages ride --ease-out (the no-overshoot leg) and
// carry an animation-delay (the deterministic CSS stagger); no setTimeout anywhere
// in the cluster files.
const clusterUsesEaseOut =
    /story-header-eyebrow\.story-header-cluster--enter[\s\S]*?var\(--ease-out/.test(
        storyHeroCss,
    ) &&
    /story-header-blurb\.story-header-cluster--enter[\s\S]*?var\(--ease-out/.test(
        storyHeroCss,
    );
const clusterNoSpring =
    !/story-hero-cluster-rise[\s\S]{0,120}--spring-(bouncy|snappy)/.test(storyHeroCss);
const clusterStaggerByDelay = /animation-delay:\s*\d+ms/.test(storyHeroCss);
const clusterNoSetTimeout =
    !/setTimeout/.test(storyHeader) && !/setTimeout/.test(storyHeroCss);
// The whole cluster register sits under the no-preference gate (PRM-safe).
const clusterUnderNoPref =
    /@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{[\s\S]*?story-hero-cluster-rise/.test(
        storyHeroCss,
    );
const gravityOk =
    kfCompositorOnly &&
    clusterUsesEaseOut &&
    clusterNoSpring &&
    clusterStaggerByDelay &&
    clusterNoSetTimeout &&
    clusterUnderNoPref;
add(
    "storyheader-cluster-gravity-entrance",
    gravityOk,
    gravityOk
        ? "the 3-stage cluster entrance is the no-overshoot GRAVITY register — story-hero-cluster-rise animates ONLY transform/opacity (compositor-only, P5), rides --ease-out (NO --spring-bouncy/-snappy on the audacious title, P2), staggers via keyframe animation-delay (NO setTimeout cascade), under the prefers-reduced-motion: no-preference gate (PRM → static terminal, P6)"
        : `cluster entrance wrong (compositor-only kf: ${kfCompositorOnly}, ease-out stages: ${clusterUsesEaseOut}, no spring on title kf: ${clusterNoSpring}, stagger by animation-delay: ${clusterStaggerByDelay}, no setTimeout: ${clusterNoSetTimeout}, under no-preference gate: ${clusterUnderNoPref})`,
);

// ── (H2-CENSUS bite) the enrolled set GREW to contain the named stragglers ──────
// The set must GROW, not shrink (a green-by-narrowing fix reds). Assert each named
// straggler route is CONTAINED in the widened enrolled set.
const STRAGGLERS_REQUIRED = [
    "demo/stories/data/search.vue",
    "demo/stories/display/section.vue",
    "demo/stories/data/infinite-scroll.vue",
];
const allStragglersEnrolled = STRAGGLERS_REQUIRED.every((s) =>
    ENROLLED_STORIES.includes(s),
);
const setGrew = ENROLLED_STORIES.length > AZ_ENROLLED_STORIES.length;
add(
    "census-enrolled-set-widened",
    allStragglersEnrolled && setGrew,
    allStragglersEnrolled && setGrew
        ? `the enrolled set is WIDENED to the A4 text-heading-on-<h2> stragglers (${STRAGGLERS_REQUIRED.length} routes added → ${ENROLLED_STORIES.length} total) so the off-canon-<h2> clause now WALKS them — the set GREW, not shrank (A4-CENSUS; the no-off-canon-section-h2 clause above bites the widened set)`
        : `census widen wrong (all stragglers enrolled: ${allStragglersEnrolled}, set grew from ${AZ_ENROLLED_STORIES.length}: ${setGrew})`,
);

// ── (H2-GUTTER) the --dock-content-safe-inset content gutter exists + consumed ──
// (1) the token is DECLARED (the dock geometry family, density.css); (2) it is
// DISTINCT from --dock-control-safe-inset (the de-overload — a re-point AT the
// control token reds); (3) the StoryPage <main> content column CONSUMES it (a
// scroll-padding/margin reserve, not a dead token).
const densityCss = strip(read("src/styles/dock/density.css"));
const dockNavCss = strip(read("demo/shell/dock-nav.css"));
const contentInsetDecl = /--dock-content-safe-inset\s*:/.test(densityCss);
// the de-overload: the declaration value must NOT be `var(--dock-control-safe-inset)`.
const contentInsetMatch = densityCss.match(/--dock-content-safe-inset\s*:\s*([^;]+);/);
const contentInsetValue = contentInsetMatch ? contentInsetMatch[1] : "";
const contentInsetDistinct =
    contentInsetDecl && !/--dock-control-safe-inset/.test(contentInsetValue);
// the <main> content column consumes it (the demo-main-scroller reserve).
const contentColumnConsumes =
    /\.demo-main-scroller\s*\{[\s\S]*?(scroll-padding|margin|padding)[^;]*var\(--dock-content-safe-inset/.test(
        dockNavCss,
    );
add(
    "dock-content-safe-inset-gutter",
    contentInsetDistinct && contentColumnConsumes,
    contentInsetDistinct && contentColumnConsumes
        ? "--dock-content-safe-inset is declared (the dock geometry family, keyed to the dock reach), DISTINCT from --dock-control-safe-inset (the de-overload holds — control-plate-inset ≠ content-band-gutter), and the StoryPage <main> content column reserves it (scroll-padding) — the CONTENT-side anti-collision gutter (A4-COLLISION direction-b). THE GENERALIZED REQUIREMENT (the cross-link witness): the band-agnostic chipOverMain:false holds on ALL enrolled desktop StoryPage routes (not the 3-route subset) — W-DOCK-RAIL-SEAT-FINAL's chipOverMain measure is the SEAT-side witness; this clause asserts the CONTENT side; the two together close the collision"
        : `--dock-content-safe-inset wrong (declared: ${contentInsetDecl}, distinct from control-safe-inset: ${contentInsetDistinct}, <main> consumes it: ${contentColumnConsumes})`,
);

// ── (z) the π readback spec is wired (the BINDING close — G2) ──────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/hierarchy.spec.ts")),
    "tests-visual/hierarchy.spec.ts exists (the π getComputedStyle readback: the resolved 20.4px section-h2 + no child>parent + the Configurator section/preset-row spatial readback + the BB.W-HIERARCHY2 baseline-order + entrance frame-series — the BINDING close)",
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
