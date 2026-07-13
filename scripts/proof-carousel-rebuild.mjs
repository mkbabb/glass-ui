#!/usr/bin/env node
// BI.W-CAROUSEL-REBUILD — proof:carousel-rebuild, the crisp-weighty-embla source gate.
//
// The carousel CONTENT barbell was a category error (D-PAGER PASS-1 §0 Defect 2): a
// `.carousel-goo-layer` metaball body (265px) flying 559px OUTSIDE the 414px card, sweeping
// the description text every advance. Unanimous verdict: RETIRE wholesale. The content is
// now crisp weighty embla scroll (ZERO filter — the 559px-escape class is structurally
// unreproducible), the ONE metaball morph is the pager worm (PagerDots), embla is the ONE
// authority (`v-model:active` + the `previousScrollSnap` delta guard), the drag-scrub drives
// the worm off `scrollProgress`, and the page is rebuilt into 5 exhibits with ONE pager each.
//
// Born-RED at HEAD: the content barbell is present (`useCarouselWorm` imported in
// CarouselContent.vue, the `.carousel-goo-layer` filtered layer, the `.carousel-content-root
// ::before` cast) and the page paints outside the card (the overlapping `-bottom-6` second
// pager + the side-by-side PagerDots/CarouselPager). GREEN here. Device-free SOURCE arm
// (W1-W4); the BINDING painted truth is tests-visual/carousel-rebuild.spec.ts (ZERO paint
// outside the card + the drag-scrub follow + the rapid-click authority, both modes, real GPU).
//
// W1 — `.carousel-goo-*` + the content-barbell references are DEFINITION-ABSENT in
//      CarouselContent.vue (the whole layer/body/neck/throat + `useCarouselWorm` + the
//      `#glass-goo` content filter + the `::before` cast). No half-delete — a broken
//      reference REDs the same as a stub.
// W2 — embla is the single authority: Carousel.vue declares `defineModel('active')` + reads
//      `previousScrollSnap()` (the delta guard) + owns NO shadow active `ref`; the demo binds
//      `v-model:active`.
// W3 — the drag-scrub wires the worm: the demo reads `scrollProgress()` and feeds a fractional
//      scrub into a pager `:active` (the worm follows the finger), the pager worm's ONE driver
//      is `useLeadTrail` (usePagerWorm composes it), and NO `filter` paints on the content.
// W4 — ONE pager per exhibit: the 5 exhibits are present, the total pager controls
//      (PagerDots + CarouselPager) == 5, and the overlapping `-bottom-6` / absolute second
//      pager is GONE.
//
// SELF-TEST (--selftest): a planted `.carousel-goo-layer` REDs W1; a planted second pager per
// exhibit (a 6th pager) REDs W4; a planted content `filter: url()` REDs W3.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const P = {
    content: "src/components/ui/carousel/CarouselContent.vue",
    carousel: "src/components/ui/carousel/Carousel.vue",
    useCarousel: "src/components/ui/carousel/useCarousel.ts",
    demo: "demo/stories/navigation/carousel.vue",
    pagerWorm: "src/components/custom/pager-dots/composables/usePagerWorm.ts",
};

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
};

/** Strip /* *​/ + // + <!-- --> comments (the house pure-detector pattern). */
const stripComments = (s) =>
    (s ?? "")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");

const styleOf = (sfc) => {
    const m = (sfc ?? "").match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    return m ? m[1] : "";
};
const templateOf = (sfc) => {
    const m = (sfc ?? "").match(/<template>([\s\S]*?)<\/template>/i);
    return m ? m[1] : "";
};
const scriptOf = (sfc) => {
    const m = (sfc ?? "").match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    return m ? m[1] : "";
};

// ── Clause runners ─────────────────────────────────────────────────────────────

// The retired content-barbell markers — a live reference to ANY of these in CarouselContent
// is the category error surviving (or a broken half-delete).
const BARBELL_MARKERS = [
    "carousel-goo-layer",
    "carousel-goo-body",
    "carousel-goo-neck",
    "carousel-neck-throat",
    "useCarouselWorm",
    "carousel-content-root",
    "glass-goo",
    "carousel-goo-filter",
];

function w1BarbellAbsent(o = {}) {
    const viol = [];
    const raw = o.content ?? read(P.content);
    if (!raw) return ["W1: CarouselContent.vue missing"];
    const code = stripComments(raw); // strip comments — a doc mention is not a live reference
    for (const marker of BARBELL_MARKERS) {
        if (code.includes(marker))
            viol.push(
                `W1: CarouselContent.vue still references the retired content barbell \`${marker}\` (the 559px-escape category error must be DEFINITION-ABSENT — no half-delete)`,
            );
    }
    return viol;
}

function w2EmblaAuthority(o = {}) {
    const viol = [];
    const carousel = o.carousel ?? read(P.carousel);
    if (!carousel) return ["W2: Carousel.vue missing"];
    const code = stripComments(scriptOf(carousel));

    // the v-model:active seam
    if (!/defineModel\s*<[^>]*>\s*\(\s*['"]active['"]/.test(code))
        viol.push("W2: Carousel.vue does not declare `defineModel('active')` (the v-model:active authority seam)");
    // the previousScrollSnap delta guard
    if (!/previousScrollSnap\s*\(/.test(code))
        viol.push("W2: Carousel.vue does not read `previousScrollSnap()` (the G7 delta guard against double-write)");
    // NO shadow active ref — a `ref(...)` assigned from selectedScrollSnap is the old shadow
    // (the model IS the authority; a parallel tracked index competes with it).
    if (/=\s*ref\([^)]*\)[\s\S]{0,120}selectedScrollSnap/.test(code) ||
        /const\s+\w*[Ii]ndex\w*\s*=\s*ref\(/.test(code))
        viol.push("W2: Carousel.vue keeps a shadow active `ref` — embla's selectedScrollSnap via the defineModel is the ONLY authority");

    // the demo binds v-model:active (the authority in use)
    const demo = o.demo ?? read(P.demo);
    if (!demo || !/v-model:active=/.test(demo))
        viol.push("W2: the demo page does not bind `v-model:active` (embla-as-authority not demonstrated)");
    return viol;
}

function w3DragScrubNoFilter(o = {}) {
    const viol = [];
    const demo = o.demo ?? read(P.demo);
    if (!demo) return ["W3: demo carousel.vue missing"];
    const demoCode = stripComments(scriptOf(demo));
    const demoTpl = templateOf(demo);

    // the drag-scrub reads scrollProgress + feeds a fractional scrub into a pager `:active`
    if (!/scrollProgress\s*\(/.test(demoCode))
        viol.push("W3: the demo drag-scrub does not read `scrollProgress()` (the finger-follow core)");
    // a fractional scrub ref is bound to a pager `:active` (the worm follows the scroll)
    const scrubBind = /:active="(\w+)"/.test(demoTpl);
    if (!scrubBind)
        viol.push("W3: no pager `:active` scrub binding in the demo (the worm is not driven by the scroll)");
    // the scrub var written from scrollProgress is the one bound to the pager
    if (!/scrollProgress\s*\(\s*\)\s*\*/.test(demoCode))
        viol.push("W3: the scrub does not map `scrollProgress() × lastIndex` to a fractional slide index");

    // the pager worm's ONE driver is useLeadTrail (the scrub drives it transitively)
    const worm = stripComments(o.pagerWorm ?? read(P.pagerWorm));
    if (!/useLeadTrail\b/.test(worm))
        viol.push("W3: usePagerWorm does not compose `useLeadTrail` (the worm driver the scrub feeds)");

    // NO filter on the content — the carousel content root/viewport/track carry no `filter`
    // painting (the 559px-escape had a `filter: url(#glass-goo)` layer; the content is crisp).
    const content = o.content ?? read(P.content);
    const contentAll = stripComments(content ?? "");
    const filterOnContent = /filter\s*:\s*(?!none\b)(url\(|var\(--[^)]*goo|blur\(|saturate\(|brightness\()/i;
    if (filterOnContent.test(contentAll))
        viol.push("W3: CarouselContent.vue paints a `filter` on the content (the crisp-content-no-filter floor is broken)");
    return viol;
}

// the 5 exhibit heading markers (distinctive substrings from the StorySection headings).
const EXHIBIT_HEADINGS = [
    /heading="Hero — single-card/i,
    /heading="Peek — multi-item/i,
    /heading="Hero-scale worm/i,
    /heading="Vertical/i,
    /heading="Windowed/i,
];

function w4OnePagerPerExhibit(o = {}) {
    const viol = [];
    const demo = o.demo ?? read(P.demo);
    if (!demo) return ["W4: demo carousel.vue missing"];
    const tpl = templateOf(demo);

    // the 5 exhibits present
    for (const re of EXHIBIT_HEADINGS) {
        if (!re.test(demo))
            viol.push(`W4: the exhibit heading ${re} is missing (the 5-exhibit rebuild is incomplete)`);
    }

    // ONE pager per exhibit — total pager controls (PagerDots + CarouselPager) == 5.
    const pagerDots = (tpl.match(/<PagerDots\b/g) ?? []).length;
    const carouselPagers = (tpl.match(/<CarouselPager\b/g) ?? []).length;
    const totalPagers = pagerDots + carouselPagers;
    if (totalPagers !== 5)
        viol.push(
            `W4: the page has ${totalPagers} pager controls (${pagerDots} PagerDots + ${carouselPagers} CarouselPager) — it must be exactly ONE per exhibit (5)`,
        );

    // the overlapping absolute second pager is GONE (the `-bottom-6` / absolute pager).
    if (/-bottom-6/.test(tpl))
        viol.push("W4: an absolute `-bottom-6` overlapping second pager survives (the overlapping-pager defect)");
    // no absolute-positioned pager (the overlapping class)
    if (/<PagerDots\b[^>]*class="[^"]*\babsolute\b/.test(tpl))
        viol.push("W4: a PagerDots carries `absolute` (an overlapping pager — one non-overlapping pager per exhibit)");
    return viol;
}

const CLAUSES = [
    ["W1", w1BarbellAbsent],
    ["W2", w2EmblaAuthority],
    ["W3", w3DragScrubNoFilter],
    ["W4", w4OnePagerPerExhibit],
];

function runAll(overrides = {}) {
    return CLAUSES.flatMap(([, fn]) => fn(overrides));
}

// ── Self-test: each planted defect MUST red its clause ─────────────────────────

function selfTest() {
    const fails = [];
    const content = read(P.content);
    const demo = read(P.demo);

    // 1. a planted content barbell (.carousel-goo-layer) → W1 reds
    const barbell = content.replace(
        /<template>/,
        '<template>\n<div class="carousel-goo-layer" />',
    );
    if (w1BarbellAbsent({ content: barbell }).length === 0)
        fails.push("bite1: a planted `.carousel-goo-layer` content barbell did NOT red W1");

    // 2. a planted second pager per exhibit (a 6th PagerDots) → W4 reds
    const twoPagers = demo.replace(
        /<\/template>/,
        '<PagerDots :count="3" :active="0" />\n</template>',
    );
    if (w4OnePagerPerExhibit({ demo: twoPagers }).length === 0)
        fails.push("bite2: a planted second pager per exhibit did NOT red W4");

    // 3. a planted content `filter: url()` → W3 reds
    const filtered = content.replace(
        /\.carousel-viewport\s*\{/,
        ".carousel-viewport {\n    filter: url(#glass-goo);",
    );
    if (w3DragScrubNoFilter({ content: filtered }).length === 0)
        fails.push("bite3: a planted content `filter: url()` did NOT red W3");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const viol = runAll();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = viol.length === 0 && selfFails.length === 0;

    const artifact = {
        gate: "proof:carousel-rebuild",
        wave: "BI.W-CAROUSEL-REBUILD",
        stamp: snapshotStamp(),
        ok,
        violations: viol,
        selfTestFailures: selfFails,
    };
    const out = gateArtifactPath("GLASS_UI_CAROUSEL_REBUILD_ARTIFACT", "proof-carousel-rebuild.json");
    writeGateArtifact(out, artifact);

    if (viol.length) {
        console.error("proof:carousel-rebuild — RED");
        for (const v of viol) console.error("  ✗ " + v);
    } else {
        console.log("proof:carousel-rebuild — GREEN (W1-W4)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("proof:carousel-rebuild --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("  ✗ " + f);
        } else {
            console.log("proof:carousel-rebuild --selftest — every planted defect RED ✓");
        }
    }
    process.exit(ok ? 0 : 1);
}

main();
