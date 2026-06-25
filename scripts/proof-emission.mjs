#!/usr/bin/env node
// BA.W-EMISSION — proof:emission, the PRODUCER-SIDE self-emission gate (the
// load-bearing half of the wave; the producer-side mirror of value.js's inv-N-7 /
// the consumer-side scripts/proof-phantom-classes.mjs).
//
// THE DEFECT (BA-VJS-B / valuejs-fold register B / the P9 class): glass-ui's own
// STRUCTURAL arbitrary utilities silently die in EVERY consumer. Two mechanisms
// chained:
//   (a) the SHIPPED `@source "../components"` in dist/styles/index.css resolved to
//       dist/components/ — a directory carrying ONLY `.d.ts` mirror files (zero
//       `.js`, zero `.vue`). The compiled render-functions live FLAT at dist/*.js.
//       So a consumer re-importing that cascade scanned an empty dir.
//   (b) the fully-arbitrary BRACKET utilities (`[max-height:var(--reka-popper-…)]`,
//       `[--slider-track-height:1.25rem]`) are rejected by BOTH a JIT content-scan
//       (they ship only in a dist/*.js chunk) AND the P9 emitComponentUtilities
//       safelist (its `classish` token filter rejects `[`-leading tokens).
// Result: a 16-item Select dropdown rendered 745px tall and overflowed a 900px
// viewport by 125px (the bound never painted — getComputedStyle.maxHeight === "none");
// a `size=md` standard Slider rendered the 6px fallback track (the size CVA was inert).
//
// THE FIX (the class CLOSES at the root): (1) re-point the `@source` to the real
// distribution surface (`../` → dist/ in the shipped copy, src/ in source); (2) move
// every STRUCTURAL arbitrary utility (geometry/bounds/sizing) OUT of the consumer-
// JIT-dependent bracket form into PRECOMPILED shipped CSS — the Select bound into a
// `[data-slot="select-content"]` rule (src/styles/select.css), the Slider size axis
// into `[data-size]`-scoped CSS (Slider.vue) — so a structural utility is NEVER
// load-bearing on any consumer's content-scan reach.
//
// THIS GATE asserts the class is CLOSED by reading the BUILT artefact (the producer-
// side truth, NOT the SFC source — the authored bound was always present in source;
// the bug was it never COMPILED). The build MUST run before this gate (the gate reads
// dist/glass-ui.css). BORN-RED against the dead-@source HEAD: the two named bounds
// grep = 0 in dist/glass-ui.css.
//
// The SOURCE/built-CSS half (W1-W5) is this gate; the BINDING painted truth is the π
// arm (tests-visual/emission.spec.ts) + the proof:ba-gestalt verdicts — NEVER this
// gate alone (the A1-1/P-1 source-green/visually-broken gap is the BA close-class fix).

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:emission";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// Strip CSS block comments + JS line comments so a `--token` or an `@source`
// mentioned in PROSE is never mistaken for a live declaration/directive.
const strip = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });
const facts = {};

// ── The BUILT artefact (the producer-side truth this gate reads) ────────────────────
// The shipped `/styles` surface a consumer's bundler resolves is dist/styles/index.css
// PLUS every partial it @imports (the cascade tail, incl. select.css) PLUS the folded
// SFC bundle dist/glass-ui.css (AN.W1 — the /styles entry carries BOTH the @import
// cascade AND the SFC scoped CSS). A PRECOMPILED structural rule may land in EITHER the
// SFC bundle (Slider's [data-size] scoped CSS) OR a cascade partial (Select's
// [data-slot] bound in select.css) — so the producer-side truth is the CONCATENATION of
// the whole shipped /styles surface, not a single file. Read it like the consumer's
// bundler would.
function readShippedStyles() {
    const parts = [];
    // The SFC scoped-CSS bundle (folded into /styles).
    parts.push(read("dist/glass-ui.css"));
    // The cascade root + every partial under dist/styles/ (the @import tail).
    const stylesDir = resolve(ROOT, "dist/styles");
    if (existsSync(stylesDir)) {
        for (const f of readdirSync(stylesDir)) {
            if (f.endsWith(".css")) parts.push(read(`dist/styles/${f}`));
        }
        // dock/ + dock-controls/ subdirs carry partials too.
        for (const sub of ["dock", "dock-controls"]) {
            const subDir = resolve(stylesDir, sub);
            if (existsSync(subDir)) {
                for (const f of readdirSync(subDir)) {
                    if (f.endsWith(".css")) parts.push(read(`dist/styles/${sub}/${f}`));
                }
            }
        }
    }
    return parts.join("\n");
}
const distCss = readShippedStyles();
const distCssExists = read("dist/glass-ui.css").length > 0 && existsSync(resolve(ROOT, "dist/styles/index.css"));
add(
    "dist-css-built",
    distCssExists,
    distCssExists
        ? "dist/glass-ui.css present (the built artefact this gate reads — run `npm run build` first; proof:emission carries the build dependency, like profile:budget reads the dist)"
        : "dist/glass-ui.css MISSING — run `npm run build` before proof:emission (the gate reads the BUILT CSS; a stale/absent dist cannot prove the class closed)",
);

// ════════════════════════════════════════════════════════════════════════════════════
// W1 — the dead `@source` is GONE / re-pointed (the class closes at the ROOT).
// Anti-evasion: the assert is the POSITIVE re-point (the @source reaches a surface that
// CONTAINS compiled render-functions, verified by a non-zero `.js`/`.vue` count under
// the new target), NOT merely "the old line changed".
// ════════════════════════════════════════════════════════════════════════════════════
const indexCssLive = strip(read("src/styles/index.css"));
const sourceDirectives = [...indexCssLive.matchAll(/@source\s+["']([^"']+)["']/g)].map(
    (m) => m[1],
);
facts.indexCssSourceDirectives = sourceDirectives;
// The dead pointer is GONE from the LIVE directive set (prose mentions stripped).
const deadPointerGone = !sourceDirectives.includes("../components");
add(
    "source-dead-pointer-gone",
    deadPointerGone,
    deadPointerGone
        ? `the dead @source "../components" is GONE from the live directive set (live directives: ${JSON.stringify(sourceDirectives)})`
        : `the dead @source "../components" still LIVE in src/styles/index.css — it resolves to the dist/components .d.ts-only mirror in the shipped copy`,
);
// The re-pointed @source reaches a surface that CONTAINS compiled render-functions.
// In the SHIPPED dist copy, `../` resolves to dist/ (the 154 flat dist/*.js chunks);
// in source it resolves to src/ (src/components/**/*.vue). Verify BOTH targets carry
// compiled/source render-functions so the directive is not a re-point to another
// empty dir.
function countByExt(dir, exts) {
    let n = 0;
    const walk = (d) => {
        let entries;
        try {
            entries = readdirSync(d, { withFileTypes: true });
        } catch {
            return;
        }
        for (const e of entries) {
            const p = resolve(d, e.name);
            if (e.isDirectory()) walk(p);
            else if (exts.some((x) => e.name.endsWith(x))) n++;
        }
    };
    walk(dir);
    return n;
}
// The shipped-dist truth: dist/ carries the flat compiled chunks.
const distJsCount = countByExt(resolve(ROOT, "dist"), [".js"]);
// The source truth: src/ carries the real .vue render-function sources.
const srcVueCount = countByExt(resolve(ROOT, "src/components"), [".vue"]);
facts.distJsCount = distJsCount;
facts.srcVueCount = srcVueCount;
// The dead target (dist/components) must NOT be where the @source points to anything live.
const deadMirrorJs = countByExt(resolve(ROOT, "dist/components"), [".js", ".vue"]);
facts.deadMirrorRenderFns = deadMirrorJs;
// The re-pointed glob reaches the flat compiled chunks in the SHIPPED dist (`../*.js`
// → dist/*.js). The own-build resolution (`src/*.js`) is deliberately empty (glass-ui's
// own SFCs compile via vite, not this @source — a bare `../` glob tripped Tailwind's dev
// candidate-extractor on the src/ shader template strings). The POSITIVE assert is the
// dist reach: a non-zero compiled-chunk count under the new target, NOT the dead mirror.
const repointReachesDist = sourceDirectives.includes("../*.js") && distJsCount > 0;
add(
    "source-reaches-compiled-surface",
    deadPointerGone && repointReachesDist && deadMirrorJs === 0,
    `the @source "../*.js" reaches the SHIPPED compiled surface: dist/ carries ${distJsCount} compiled .js render-function chunks (the flat chunks that hold glass-ui's utility class strings) — NOT the dead dist/components mirror (${deadMirrorJs} render-fns). src/ has ${srcVueCount} .vue sources (compiled via vite, off this @source).`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// W2 — the Select collision-bound has a BACKING RULE in the BUILT CSS.
// Anti-evasion: reads the BUILT dist/glass-ui.css (the producer-side truth), NOT the
// SFC source; a rule present in source but absent from the built CSS REDs.
// ════════════════════════════════════════════════════════════════════════════════════
// The precompiled bound ships from src/styles/select.css → dist/glass-ui.css as a
// `[data-slot="select-content"]` rule resolving max-height off the kf cap +
// --reka-popper-available-height tighten.
const selectBoundInDist =
    /\[data-slot=["']?select-content["']?\][^{}]*\{[^}]*max-height[^}]*\}/.test(distCss) ||
    (distCss.includes("reka-popper-available-height") &&
        distCss.includes("select-content-max-h"));
facts.selectBoundInDist = selectBoundInDist;
facts.selectMaxHCount = (distCss.match(/--select-content-max-h/g) ?? []).length;
add(
    "select-bound-in-built-css",
    selectBoundInDist,
    selectBoundInDist
        ? "the Select collision-bound SHIPS in dist/glass-ui.css (a [data-slot=select-content] rule resolving max-height off the min(24rem,60dvh) cap tightened by --reka-popper-available-height) — the bound paints in EVERY consumer regardless of JIT reach"
        : "the Select collision-bound is ABSENT from dist/glass-ui.css — the authored arbitrary-bracket class never compiled into the shipped CSS (the BA-VJS-A2-WO1 born-RED state)",
);

// ════════════════════════════════════════════════════════════════════════════════════
// W3 — the Slider `size=md` geometry has a BACKING RULE in the BUILT CSS.
// Anti-evasion: reads the BUILT CSS; a `[--slider-track-height:1.25rem]` bracket that
// only ships in a JS chunk REDs (that IS the bug).
// ════════════════════════════════════════════════════════════════════════════════════
// The [data-size="md"] rule (Slider.vue scoped CSS) resolves --slider-track-height:1.25rem
// — folded into dist/glass-ui.css by the SFC scoped-CSS publish. Match the data-size rule
// setting the track height to the md value (whitespace-tolerant).
// The minifier may strip a leading zero (`0.75rem` → `.75rem`) and inject a
// `[data-v-hash]` scope attribute between the selector and the brace, so the regex
// is whitespace/scope/leading-zero tolerant.
const sliderMdRule =
    /\[data-size=["']?md["']?\][^{}]*\{[^}]*--slider-track-height\s*:\s*1\.25rem[^}]*\}/.test(
        distCss,
    );
facts.sliderMdRuleInDist = sliderMdRule;
facts.sliderTrackHeightCount = (distCss.match(/--slider-track-height\s*:\s*1\.25rem/g) ?? [])
    .length;
add(
    "slider-md-geometry-in-built-css",
    sliderMdRule,
    sliderMdRule
        ? "the Slider size axis SHIPS in dist/glass-ui.css (a [data-size=md] rule resolving --slider-track-height:1.25rem) — a size=md standard slider renders the real ≈20px track in EVERY consumer, not the 6px fallback"
        : "the Slider size=md geometry is ABSENT from dist/glass-ui.css — the dead arbitrary-property CVA bracket compiled only into a dist/*.js chunk (the BA-VJS-A3 born-RED state)",
);
// The sm + lg rungs ship too (the full axis, not just md).
const sliderSm = /\[data-size=["']?sm["']?\][^{}]*\{[^}]*--slider-track-height\s*:\s*0?\.75rem[^}]*\}/.test(
    distCss,
);
const sliderLg = /\[data-size=["']?lg["']?\][^{}]*\{[^}]*--slider-track-height\s*:\s*1\.75rem[^}]*\}/.test(
    distCss,
);
add(
    "slider-full-size-axis-in-built-css",
    sliderSm && sliderLg,
    `the full Slider size axis ships in dist/glass-ui.css (sm 0.75rem ${sliderSm ? "✓" : "✗"}, lg 1.75rem ${sliderLg ? "✓" : "✗"}) — every rung resolves from a shipped [data-size] rule`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// W4 — every census'd STRUCTURAL arbitrary utility has a BACKING RULE (or a recorded
// disposition). The census is the GATE'S list (read here, recorded in the DELTA) so a
// future agent cannot re-introduce a dead structural bracket unaudited.
// ════════════════════════════════════════════════════════════════════════════════════
// THE CENSUS (the structural arbitrary-bracket inventory at HEAD; the full list + each
// disposition lives in the DELTA). STRUCTURAL = geometry/bounds/sizing (the consumer-
// JIT-load-bearing class); decoration (filter/shadow/background) is left as-is per the
// structural-only boundary (the AN.W2 blanket-emit reject).
const CENSUS = [
    {
        id: "select-bound",
        utility: "[max-height:var(--reka-popper-available-height,60dvh)]",
        site: "src/components/ui/select/SelectContent.vue",
        disposition: "PRECOMPILED → src/styles/select.css [data-slot=select-content]",
        inBounds: true,
        backed: selectBoundInDist,
    },
    {
        id: "slider-size-axis",
        utility: "[--slider-track-height:1.25rem] [--slider-thumb-size:1rem] (+sm/lg)",
        site: "src/components/ui/slider/index.ts → Slider.vue",
        disposition: "DATA-SCOPED → Slider.vue [data-size] rules",
        inBounds: true,
        backed: sliderMdRule && sliderSm && sliderLg,
    },
    {
        // The third instance the census surfaced — a SIBLING of the same class,
        // OUT of W-EMISSION File Bounds (Card.vue is not in scope). RECORDED, not
        // fixed here: the `[--card-spacing:--spacing(6)]` BASE setter is rejected by
        // the classish filter (the data-[size=sm] arm survives because it is
        // data-prefixed), so a DEFAULT <Card> reads `p-(--card-spacing)` against an
        // undefined var. Dispositioned to a FOLLOW-UP (the same fix-class: move the
        // base setter to a shipped [data-slot=card]/default rule, OR add a `var(…, N)`
        // fallback at the consumer reads). It degrades to no-padding (a layout-soft
        // miss), not the 745px/6px structural break — so it is a recorded BOOKING, not
        // a born-RED assert this in-bounds wave can green.
        id: "card-spacing-base-setter",
        utility: "[--card-spacing:--spacing(6)]",
        site: "src/components/ui/card/Card.vue:155",
        disposition:
            "BOOKED (out of W-EMISSION File Bounds; same fix-class — move base setter to shipped CSS or add consumer var() fallback)",
        inBounds: false,
        backed: null, // not asserted — out of bounds, recorded only
    },
];
facts.census = CENSUS;
// W4 asserts every IN-BOUNDS structural census entry is backed in the built CSS.
const inBoundsCensus = CENSUS.filter((c) => c.inBounds);
const allInBoundsBacked = inBoundsCensus.every((c) => c.backed === true);
add(
    "census-structural-utilities-backed",
    allInBoundsBacked,
    allInBoundsBacked
        ? `every IN-BOUNDS structural census utility has a backing rule in the built CSS (${inBoundsCensus.map((c) => c.id).join(", ")}); 1 sibling (card-spacing-base-setter) RECORDED + booked out-of-bounds`
        : `an in-bounds structural census utility lacks a backing rule: ${inBoundsCensus.filter((c) => !c.backed).map((c) => c.id).join(", ")}`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// W5 — the WatercolorDot `ghost` variant is a DASHED blob-SILHOUETTE outline
// (BC.W-VIZ-WATERCOLOR · BD.W-VIZ-BROKEN-FIX D4 — the silhouette mechanism RE-INVENTED).
//
// The BD redesign REPLACED the prior SVG `<ellipse rx=46 ry=46> stroke-dasharray` (which
// was a noise-jittered CIRCLE geometrically DISCONNECTED from the seeded blob silhouette)
// with a CSS `border: … dashed` on a `.watercolor-ghost-stroke` div whose `border-radius`
// is bound inline to `activeBorderRadius` — the SAME seeded 8-value superellipse the solid
// dot fills (`blob.borderRadius`). A CSS dashed border hugs its OWN `border-radius`, so the
// outline traces the seeded ORGANIC blob BY CONSTRUCTION — never a circle, never a
// rectangle (LIVE-VERIFIED: the ghost-stroke border-radius byte-matches the swatch's seeded
// superellipse, e.g. `60.9% 43.6% 21.9% 59.7% / 65.2% 44.8% 35.3% 25.8%`; .cache/gates/
// watercolor-ghost-delta.png). So the "dashed silhouette" WITNESS is now the dashed border
// on the ghost-stroke element BOUND to the seeded `activeBorderRadius`; the FORBIDDEN form
// is a dashed border on a NON-seeded box (a plain rect — no `activeBorderRadius`/
// `blob.borderRadius` binding). No-backwards-compat: the dead SVG-ellipse stroke is GONE,
// never aliased. Anti-evasion: the ghost still reuses useWatercolorBlob (the same seeded
// blob, not a fork).
// ════════════════════════════════════════════════════════════════════════════════════
const watercolorSrc = read("src/components/custom/watercolor-dot/WatercolorDot.vue");
const watercolorStripped = strip(watercolorSrc);
const watercolorBlobSrc = read("src/components/custom/watercolor-dot/useWatercolorBlob.ts");
const watercolorBlobStripped = strip(watercolorBlobSrc);
// The variant axis exists with a ghost value.
const hasVariantAxis =
    /variant\??\s*:\s*["']?(ghost|outline|solid)/.test(watercolorStripped) ||
    /variant\??\s*:\s*["'](ghost|outline)["']/.test(watercolorStripped) ||
    /defineProps[\s\S]*variant\s*\??:/.test(watercolorStripped);
const hasGhostValue = /["']ghost["']/.test(watercolorStripped);
// The ghost reuses useWatercolorBlob (the same seeded blob, not a fork).
const reusesBlob = /useWatercolorBlob/.test(watercolorStripped);
// REQUIRED: the ghost renders a DASHED SILHOUETTE outline — a `.watercolor-ghost-stroke`
// element carrying a `border: … dashed` whose `border-radius` is bound inline to the
// seeded `activeBorderRadius` (the SAME 8-value superellipse `useWatercolorBlob` mints).
// The dashed border hugs that organic radius, so it traces the seeded silhouette, not a
// rect (BD.W-VIZ-BROKEN-FIX D4). The witness: a ghost-stroke `border: … dashed` AND a
// `border-radius: activeBorderRadius` (or `blob.borderRadius`) inline binding on the same
// ghost element.
const hasGhostStrokeDashedBorder =
    /\.watercolor-ghost-stroke[\s\S]*?border\s*:\s*[^;]*dashed/.test(watercolorStripped);
const bindsSeededRadius =
    /borderRadius\s*:\s*activeBorderRadius/.test(watercolorStripped) ||
    /border-radius[\s\S]{0,40}activeBorderRadius/.test(watercolorStripped) ||
    /borderRadius\s*:\s*blob\.borderRadius/.test(watercolorStripped);
const hasDashedSiloStroke = hasGhostStrokeDashedBorder && bindsSeededRadius;
// FORBIDDEN: a dashed RECTANGULAR box border — a `border: … dashed` that is NOT the
// silhouette-bound ghost-stroke (i.e. a dashed border with no seeded `activeBorderRadius`
// binding = a plain rect). The narrowed negative — a dashed BOX, not a dashed silhouette.
const hasAnyDashedBorder = /border-style\s*:\s*dashed|border\s*:\s*[^;]*dashed/.test(
    watercolorStripped,
);
const isDashedBoxBorder = hasAnyDashedBorder && !hasDashedSiloStroke;
// The filter seed is PER-INSTANCE (BC.W-VIZ-WATERCOLOR §3) — NOT a hardcoded constant;
// it reads a computed off hashString(color + seed). Born-RED on HEAD's `seed="2"`.
const hasHardcodedFilterSeed = /<feTurbulence[\s\S]*?\sseed\s*=\s*["']\d+["']/.test(
    watercolorStripped,
);
const hasPerInstanceFilterSeed =
    /:seed\s*=\s*["']\w/.test(watercolorStripped) &&
    /hashString\s*\(/.test(watercolorStripped);
// The animate liveness is a COMPOSITOR transform wobble, NOT a per-frame border-radius
// paint under the filter (the §H Safari flash fix). The rAF tick must NOT write
// `borderRadius.value =`; it drives a `transform` ref.
const hasPerFrameRadiusPaint =
    /function\s+tick[\s\S]*?borderRadius\.value\s*=/.test(watercolorBlobStripped);
const drivesTransformWobble = /function\s+tick[\s\S]*?transform\.value\s*=/.test(
    watercolorBlobStripped,
);
const watercolorGhostOK =
    hasVariantAxis &&
    hasGhostValue &&
    reusesBlob &&
    hasDashedSiloStroke &&
    !isDashedBoxBorder &&
    !hasHardcodedFilterSeed &&
    hasPerInstanceFilterSeed &&
    !hasPerFrameRadiusPaint &&
    drivesTransformWobble;
facts.watercolor = {
    hasVariantAxis,
    hasGhostValue,
    reusesBlob,
    hasDashedSiloStroke,
    isDashedBoxBorder,
    hasHardcodedFilterSeed,
    hasPerInstanceFilterSeed,
    hasPerFrameRadiusPaint,
    drivesTransformWobble,
};
add(
    "watercolor-ghost-variant",
    watercolorGhostOK,
    watercolorGhostOK
        ? "WatercolorDot `ghost` is a DASHED blob-silhouette outline — a `.watercolor-ghost-stroke` dashed border BOUND to the seeded `activeBorderRadius` superellipse (so it traces the organic blob, NOT a dashed rect; BD.W-VIZ-BROKEN-FIX D4), reuses the seeded useWatercolorBlob silhouette, the wet filter seed is per-instance off hashString(color+seed) (not the hardcoded seed=2), and the animate liveness rides a compositor `transform` wobble (NOT a per-frame border-radius paint under the filter — the §H Safari flash fix)"
        : `WatercolorDot ghost NOT correct (variant-axis ${hasVariantAxis}, ghost-value ${hasGhostValue}, reuses-blob ${reusesBlob}, dashed-silhouette-stroke ${hasDashedSiloStroke}, dashed-box-border ${isDashedBoxBorder} [forbidden], hardcoded-filter-seed ${hasHardcodedFilterSeed} [forbidden], per-instance-filter-seed ${hasPerInstanceFilterSeed}, per-frame-radius-paint ${hasPerFrameRadiusPaint} [forbidden], drives-transform-wobble ${drivesTransformWobble})`,
);

// ════════════════════════════════════════════════════════════════════════════════════
// W5 self-test bites (BC.W-VIZ-WATERCOLOR) — each planted defect MUST trip its detector,
// proving the narrowed ghost gate distinguishes the good dashed silhouette from the bad
// dashed box / clone-seed / per-frame-paint forms (the anti-gameability floor).
// ════════════════════════════════════════════════════════════════════════════════════
// A dashed border on the swatch root with NO seeded-radius-bound ghost-stroke = a plain
// dashed RECT → must red as a box (the silhouette witness is absent, the box witness fires).
const dashedBoxPlanted = `<div class="watercolor-swatch" /> <style>.watercolor-swatch { border: 2px dashed var(--watercolor-color); }</style>`;
const plantedHasSilo =
    /\.watercolor-ghost-stroke[\s\S]*?border\s*:\s*[^;]*dashed/.test(dashedBoxPlanted) &&
    (/borderRadius\s*:\s*activeBorderRadius/.test(dashedBoxPlanted) ||
        /border-radius[\s\S]{0,40}activeBorderRadius/.test(dashedBoxPlanted));
const plantedHasDashed =
    /border-style\s*:\s*dashed|border\s*:\s*[^;]*dashed/.test(dashedBoxPlanted);
const dashedBoxBite = plantedHasDashed && !plantedHasSilo; // fires the FORBIDDEN box arm
// A removed dashed border on the ghost-stroke (a bare silhouette div, no outline) → the
// dashed-silhouette witness must NOT fire (the ghost has no traced outline).
const removedDashBite = !/\.watercolor-ghost-stroke[\s\S]*?border\s*:\s*[^;]*dashed/.test(
    `<div class="watercolor-ghost-stroke" :style="{ borderRadius: activeBorderRadius }" /> <style>.watercolor-ghost-stroke { position: absolute; inset: 0; }</style>`,
);
const clonedSeedBite = /<feTurbulence[\s\S]*?\sseed\s*=\s*["']\d+["']/.test(
    `<feTurbulence type="fractalNoise" seed="2" />`,
);
const perFrameRadiusBite = /function\s+tick[\s\S]*?borderRadius\.value\s*=/.test(
    `function tick(now) { borderRadius.value = radiiToCSS(current); rafId = requestAnimationFrame(tick); }`,
);
const selfTestPass =
    dashedBoxBite && removedDashBite && clonedSeedBite && perFrameRadiusBite;
facts.w5SelfTest = {
    dashedBoxBite,
    removedDashBite,
    clonedSeedBite,
    perFrameRadiusBite,
};
add(
    "watercolor-ghost-self-test-bites",
    selfTestPass,
    selfTestPass
        ? "the W5 ghost detectors BITE every planted defect: a dashed box border reds, a removed stroke-dasharray reds, a re-pasted feTurbulence seed=\"2\" reds, a per-frame borderRadius.value= inside the rAF tick reds"
        : `a W5 ghost self-test bite FAILED to trip (dashed-box ${dashedBoxBite}, removed-dash ${removedDashBite}, cloned-seed ${clonedSeedBite}, per-frame-radius ${perFrameRadiusBite}) — the detector does not bite its defect`,
);

// ── The π readback spec is wired (the BINDING close) ────────────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/emission.spec.ts")),
    "tests-visual/emission.spec.ts exists (the π readback — the bounded dropdown computed maxHeight + in-viewport + inner scroll, the md-track ≈1.25rem geometry, the spectrum thumb ≤0.5× track, the dashed-silhouette ghost stroke matching the solid seed; the BINDING visual truth)",
);

// ── Report ──────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log("proof:emission — the producer-side self-emission gate (BA.W-EMISSION)");
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GATE_EMISSION_OUT", "BA-emission");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:emission",
    command: COMMAND,
    note: "PRODUCER-side build-reading arm — reads dist/glass-ui.css (run `npm run build` first). The BINDING painted truth is the π arm tests-visual/emission.spec.ts + the proof:ba-gestalt verdicts, never this gate alone (the BA P-1 source-green/visually-broken close-class fix).",
    facts,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:emission] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:emission] the self-emission class is CLOSED at the root — the dead @source is re-pointed to the real compiled surface, the Select collision-bound + the Slider size axis ship as precompiled rules in dist/glass-ui.css (never load-bearing on a consumer's JIT reach), the census's in-bounds structural utilities are each backed, and the WatercolorDot ghost reuses the seeded blob. The π arm proves the painted truth.",
);
