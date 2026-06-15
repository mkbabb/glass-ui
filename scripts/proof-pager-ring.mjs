#!/usr/bin/env node
// BA.W-PAGER — the unified pager-dots register in a glass ring (proof:pager-ring).
//
// The born-RED→GREEN device-free SOURCE+RENDER arm for the R10-1 ring + the R10-3
// deck-dots fold: ONE pager register — a glass-floating pill chassis
// (`.glass-pager-ring`) hosting the counter + dots, and ONE `<PagerDots>` primitive
// the carousel ships (consumer #1) and the slides DeckPager adopts (consumer #2).
// The PAINTED truth — the dots host computes a translucent glass plate, the counter
// is off the opaque `bg-card` dark slab — is the BINDING visual truth proven by the
// π live readback (tests-visual/pager-ring.spec.ts → docs/tranches/BA/audit/visual/
// W-PAGER-DELTA.md). This gate is the no-device CI half; a source-green/visually-
// broken gap is the AZ P-1 close-class the BA gestalt bar (inv-4) exists to kill.
//
// Four falsifiable witnesses (each born-RED at HEAD pre-wave):
//
//   W1 — THE DOTS ARE RINGED. `.glass-pager-ring` exists in glass/surfaces.css and
//        composes the glass-floating recipe (a TRANSLUCENT `--glass-bg-floating`
//        background + a `--glass-blur-floating` backdrop-filter + `--radius-pill`),
//        and `<PagerDots>` composes it on the `ring` default. When dist/glass-ui.css
//        is present the RENDER assertion confirms `.glass-pager-ring`'s emitted
//        background is NOT an opaque `--card`/`bg-card` value. RED at HEAD: no
//        `.glass-pager-ring` recipe anywhere in src/styles/.
//   W2 — THE COUNTER IS OFF `bg-card`. CarouselPager.vue's counter `<span>` no longer
//        composes `bg-card` (the dark `rgb(28,25,23)` slab) and DOES compose
//        `.glass-pager-ring`. RED at HEAD: CarouselPager.vue:78 carries
//        `rounded-pill border border-border bg-card`.
//   W3 — ONE REGISTER. `CarouselDots.vue` is GONE; `<PagerDots>` exists; the
//        `.glass-pager-ring` recipe is composed by BOTH the dots host (PagerDots) AND
//        the counter (CarouselPager) — one recipe, two consumers (grep-positive); the
//        `--pager-dot-*` preset tokens are declared. ANTI-EVASION: a surviving
//        `CarouselDots` import/file anywhere in src/ or demo/ reds. RED at HEAD:
//        CarouselDots.vue present, no PagerDots, no `.glass-pager-ring`.
//   W4 — THE CONSUMER TRUTH. The `/pager-dots` subpath barrel exists
//        (src/subpaths/pager-dots.ts), the api/ types row is present
//        (`PagerDotsProps`), the slides-DeckPager adopt-book is authored (the 2nd
//        consumer's named path), and the MIGRATION rows are present. RED at HEAD:
//        none of these exist.
//
// House style mirrors proof-menu-glass.mjs / proof-surface-axis.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure detector, a byte-stable
// JSON artefact via gate-output, a human summary, process.exit(1) on any violation.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        SURFACES_CSS: resolve(ROOT, "src/styles/glass/surfaces.css"),
        PAGER_DOTS_VUE: resolve(ROOT, "src/components/custom/pager-dots/PagerDots.vue"),
        PAGER_DOTS_INDEX: resolve(ROOT, "src/components/custom/pager-dots/index.ts"),
        CAROUSEL_PAGER_VUE: resolve(ROOT, "src/components/ui/carousel/CarouselPager.vue"),
        CAROUSEL_DOTS_VUE: resolve(ROOT, "src/components/ui/carousel/CarouselDots.vue"),
        SUBPATH: resolve(ROOT, "src/subpaths/pager-dots.ts"),
        API: resolve(ROOT, "src/api/index.ts"),
        ADOPT_BOOK: resolve(ROOT, "docs/tranches/BA/audit/W-PAGER-adopt-book.md"),
        MIGRATION: resolve(ROOT, "MIGRATION.md"),
        // The GLOBAL `/styles` cascade (the `@layer components` recipes) ships
        // per-file under dist/styles/ — `.glass-pager-ring` lands in the surfaces
        // partial. (The scoped-SFC `.pager-dot` rules ride dist/glass-ui.css; that
        // dot-paint contrast is the orthogonal proof:carousel-glass-atoms arm.)
        DIST_CSS: resolve(ROOT, "dist/styles/glass/surfaces.css"),
        ARTIFACT: gateArtifactPath("GLASS_UI_PAGER_RING_ARTIFACT", "BA-pager-ring"),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}
function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : null;
}

/**
 * The W-PAGER detector. Pure: reads the comment-stripped sources, returns
 * `{ facts, violations }`.
 */
export function detect(paths) {
    const violations = [];
    const facts = {};

    const surfacesRaw = read(paths.SURFACES_CSS);
    const pagerDotsRaw = read(paths.PAGER_DOTS_VUE);
    const pagerIndexRaw = read(paths.PAGER_DOTS_INDEX);
    const pagerRaw = read(paths.CAROUSEL_PAGER_VUE);
    const subpathRaw = read(paths.SUBPATH);
    const apiRaw = read(paths.API);
    const adoptRaw = read(paths.ADOPT_BOOK);
    const migrationRaw = read(paths.MIGRATION);
    const distCss = read(paths.DIST_CSS);

    const surfaces = surfacesRaw ? stripBlockComments(surfacesRaw) : "";
    const pagerDots = pagerDotsRaw ? stripHtmlComments(stripBlockComments(pagerDotsRaw)) : "";
    const pager = pagerRaw ? stripHtmlComments(stripBlockComments(pagerRaw)) : "";
    const subpath = subpathRaw ? stripBlockComments(subpathRaw) : "";
    const api = apiRaw ? stripBlockComments(apiRaw) : "";

    // ── W1 — THE DOTS ARE RINGED ──────────────────────────────────────────────
    const ringRecipe = /\.glass-pager-ring\s*\{([^}]*)\}/.exec(surfaces);
    facts.ringRecipeExists = Boolean(ringRecipe);
    if (!ringRecipe) {
        violations.push(
            "W1: no `.glass-pager-ring` recipe in src/styles/glass/surfaces.css — the glass-floating pager pill chassis must exist",
        );
    } else {
        const body = ringRecipe[1];
        const hasFloatingBg = /background\s*:\s*var\(--glass-bg-floating\)/.test(body);
        const hasFloatingBlur = /backdrop-filter\s*:\s*var\(--glass-blur-floating\)/.test(body);
        const hasPillRadius = /border-radius\s*:\s*var\(--radius-pill\)/.test(body);
        facts.ringFloatingBg = hasFloatingBg;
        facts.ringFloatingBlur = hasFloatingBlur;
        facts.ringPillRadius = hasPillRadius;
        if (!hasFloatingBg)
            violations.push("W1: `.glass-pager-ring` background is not the translucent `var(--glass-bg-floating)` — NEVER an opaque bg-card");
        if (!hasFloatingBlur)
            violations.push("W1: `.glass-pager-ring` has no `backdrop-filter: var(--glass-blur-floating)` — the glass plate must read the substrate through it");
        if (!hasPillRadius)
            violations.push("W1: `.glass-pager-ring` is not a `var(--radius-pill)` pill");
        // anti-evasion: the recipe must NOT bake an opaque card plate.
        if (/background\s*:\s*var\(--card\)/.test(body) || /\bbg-card\b/.test(body)) {
            violations.push("W1: `.glass-pager-ring` composes an opaque `--card`/bg-card — the dark-slab class is forbidden");
        }
    }
    // PagerDots composes the ring on the default.
    const pagerDotsComposesRing = /glass-pager-ring/.test(pagerDots);
    facts.pagerDotsComposesRing = pagerDotsComposesRing;
    if (pagerDots && !pagerDotsComposesRing) {
        violations.push("W1: PagerDots.vue does not compose `.glass-pager-ring` (the `ring` default)");
    }
    // RENDER assertion when dist is present — the emitted ring bg must be translucent.
    if (distCss) {
        const distRing = /\.glass-pager-ring\s*\{([^}]*background[^}]*)\}/i.exec(distCss);
        facts.distRingFound = Boolean(distRing);
        if (distRing) {
            const bg = (/background\s*:\s*([^;]+);/i.exec(distRing[1]) || [])[1] || "";
            facts.distRingBackground = bg.trim().slice(0, 120);
            // a translucent glass plate resolves a color-mix/oklab or an rgba with alpha,
            // NOT a bare opaque rgb()/hex card.
            if (/^\s*(rgb\(|#[0-9a-f]{3,8}\b)/i.test(bg) && !/\/\s*0?\.\d/.test(bg)) {
                violations.push(`W1 (render): the emitted .glass-pager-ring background "${facts.distRingBackground}" reads opaque — must be a translucent glass plate`);
            }
        }
    }

    // ── W2 — THE COUNTER IS OFF bg-card ───────────────────────────────────────
    if (!pager) {
        violations.push("W2: CarouselPager.vue missing");
    } else {
        const counterMatch = /data-slot="carousel-pager-counter"[\s\S]*?class="([^"]*)"/.exec(pager);
        const counterClass = counterMatch ? counterMatch[1] : "";
        facts.counterClass = counterClass;
        if (/\bbg-card\b/.test(counterClass)) {
            violations.push("W2: the CarouselPager counter still composes `bg-card` — the dark slab must die (re-register onto `.glass-pager-ring`)");
        }
        if (!/\bglass-pager-ring\b/.test(counterClass)) {
            violations.push("W2: the CarouselPager counter does not compose `.glass-pager-ring`");
        }
    }

    // ── W3 — ONE REGISTER ─────────────────────────────────────────────────────
    // CarouselDots.vue GONE.
    const dotsGone = !existsSync(paths.CAROUSEL_DOTS_VUE);
    facts.carouselDotsRetired = dotsGone;
    if (!dotsGone) {
        violations.push("W3: src/components/ui/carousel/CarouselDots.vue still exists — it must retire onto <PagerDots>");
    }
    // PagerDots exists.
    facts.pagerDotsExists = Boolean(pagerDotsRaw);
    if (!pagerDotsRaw) {
        violations.push("W3: src/components/custom/pager-dots/PagerDots.vue does not exist");
    }
    // the index barrel exports PagerDots.
    if (!pagerIndexRaw || !/export\b[^\n]*PagerDots/.test(pagerIndexRaw)) {
        violations.push("W3: the pager-dots package barrel does not export `PagerDots`");
    }
    // the --pager-dot-* preset tokens are declared.
    const declaresPagerDotTokens =
        /--pager-dot-active\s*:/.test(pagerDots) &&
        /--pager-dot-inactive\s*:/.test(pagerDots);
    facts.pagerDotTokensDeclared = declaresPagerDotTokens;
    if (pagerDots && !declaresPagerDotTokens) {
        violations.push("W3: the `--pager-dot-active`/`--pager-dot-inactive` preset tokens are not declared in PagerDots.vue");
    }
    // the ring recipe has TWO consumers (one recipe, two surfaces).
    const ringConsumers = [pagerDotsComposesRing, /glass-pager-ring/.test(pager)].filter(Boolean).length;
    facts.ringConsumers = ringConsumers;
    if (ringConsumers < 2) {
        violations.push(`W3: the .glass-pager-ring recipe has only ${ringConsumers} composer(s) — must be ≥2 (PagerDots dots host + CarouselPager counter)`);
    }
    // ANTI-EVASION: no surviving CarouselDots import/reference in src/ or demo/.
    // (the file-presence check above covers the .vue; this catches a dangling import.)
    for (const [label, raw] of [
        ["src/carousel.ts", read(resolve(paths.ROOT, "src/carousel.ts"))],
        ["src/components/ui/carousel/index.ts", read(resolve(paths.ROOT, "src/components/ui/carousel/index.ts"))],
        ["demo/stories/navigation/carousel.vue", read(resolve(paths.ROOT, "demo/stories/navigation/carousel.vue"))],
    ]) {
        if (!raw) continue;
        const stripped = stripHtmlComments(stripBlockComments(raw));
        // a bare token in prose/code that still imports/binds the retired symbol.
        if (/\bCarouselDots\b/.test(stripped)) {
            violations.push(`W3 (anti-evasion): a surviving \`CarouselDots\` reference in ${label} — the retirement is a clean break`);
        }
    }

    // ── W4 — THE CONSUMER TRUTH ───────────────────────────────────────────────
    if (!subpath || !/export \* from "\.\.\/components\/custom\/pager-dots"/.test(subpath)) {
        violations.push("W4: the `/pager-dots` subpath mirror barrel (src/subpaths/pager-dots.ts) is missing or wrong");
    }
    facts.apiRowPresent = /PagerDotsProps/.test(api);
    if (!facts.apiRowPresent) {
        violations.push("W4: the api/ types row (`PagerDotsProps`) is missing from src/api/index.ts");
    }
    facts.adoptBookPresent = Boolean(adoptRaw) && /DeckPager/.test(adoptRaw || "") && /PagerDots/.test(adoptRaw || "");
    if (!facts.adoptBookPresent) {
        violations.push("W4: the slides-DeckPager adopt-book (docs/tranches/BA/audit/W-PAGER-adopt-book.md naming the 2nd consumer) is missing");
    }
    facts.migrationRowPresent = Boolean(migrationRaw) && /CarouselDots/.test(migrationRaw || "") && /PagerDots/.test(migrationRaw || "") && /W-PAGER/.test(migrationRaw || "");
    if (!facts.migrationRowPresent) {
        violations.push("W4: the MIGRATION.md W-PAGER rows (CarouselDots retirement + counter re-register) are missing");
    }

    return { facts, violations };
}

function run() {
    const paths = cliPaths();
    const { ROOT, ARTIFACT } = paths;
    const { facts, violations } = detect(paths);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:pager-ring",
        facts,
        violations,
    });

    console.log("proof:pager-ring — the unified pager-dots register in a glass ring (BA.W-PAGER)");
    console.log(`  ring recipe       : ${facts.ringRecipeExists ? "yes" : "NO"} (floating-bg ${facts.ringFloatingBg ? "y" : "n"} / blur ${facts.ringFloatingBlur ? "y" : "n"} / pill ${facts.ringPillRadius ? "y" : "n"})`);
    if (facts.distRingBackground) console.log(`  dist ring bg      : ${facts.distRingBackground}`);
    console.log(`  counter off bg-card: ${facts.counterClass !== undefined ? (/bg-card/.test(facts.counterClass) ? "NO" : "yes") : "?"}`);
    console.log(`  CarouselDots retired: ${facts.carouselDotsRetired ? "yes" : "NO"}`);
    console.log(`  PagerDots exists  : ${facts.pagerDotsExists ? "yes" : "NO"}`);
    console.log(`  ring consumers    : ${facts.ringConsumers ?? "?"} (≥2 required)`);
    console.log(`  pager-dot tokens  : ${facts.pagerDotTokensDeclared ? "yes" : "NO"}`);
    console.log(`  subpath/api/adopt/migration: ${facts.apiRowPresent ? "api✓" : "api✗"} ${facts.adoptBookPresent ? "adopt✓" : "adopt✗"} ${facts.migrationRowPresent ? "mig✓" : "mig✗"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
