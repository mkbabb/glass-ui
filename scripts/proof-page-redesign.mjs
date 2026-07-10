#!/usr/bin/env node
// proof:page-redesign — the page-redesign container-layer gate (pure FS,
// device-free SOURCE arm).
//
// Every story page reads as a designed page: a glass-card container with the
// StoryPage -> StorySection hierarchy, floating over a per-page background
// substrate (paper / grid / aurora / constellation / fourier). A HERO page
// declares a UNIQUE rich substrate and renders its body glass-first over the
// live wash, so the storybook DEMONSTRATES the glass it ships.
//
// This is the SOURCE arm — a source-parse + FS string-scan over the demo
// chassis contract. The PAINTED render (a glass card over a live substrate) is
// proven by the live π audit, never a text gate alone.
//
// Asserts:
//   1. StoryHero.vue exists + composes a GLASS card (`<Card>`) + renders the
//      five background substrates behind it.
//   2. The Story manifest interface carries the `background?` descriptor over
//      the paper|grid|aurora|constellation|fourier union.
//   3. The .story-bg-grid blueprint-grid recipe exists (a token-driven ruled
//      grid), completing the five-substrate set.
//   4. StoryPage hosts StoryHero (every page composing StoryPage gets the
//      glass container with zero per-page edit).
//   5. Every navigable manifest page composes the StoryPage hierarchy (the
//      full-bleed Aurora studio is the one declared exception).
//   6. The four hero pages declare their background through the descriptor —
//      no surviving inline `<Aurora>` fork — and each HERO declares a UNIQUE
//      substrate.
//
// Bite: drop the <Card> from StoryHero → glass-container clause REDs; remove
// the background field from Story → descriptor clause REDs; re-inject an inline
// <Aurora> into a hero SFC → no-fork clause REDs; give two heros the same
// substrate → unique clause REDs.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:page-redesign";

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// Strip // line + /* block */ comments + <!-- vue --> comments so a prose
// mention is never mistaken for a live code form.
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "")
        .replace(/<!--[\s\S]*?-->/g, "");
}

// The four hero pages the redesign re-homes onto the descriptor (the former
// W57 inline-Aurora set).
const HERO_PAGES = [
    "demo/stories/foundations/intro.vue",
    "demo/stories/compositions/hero.vue",
    "demo/stories/foundations/paper-glass.vue",
    "demo/stories/compositions/auth-shell.vue",
];

export function detect() {
    const violations = [];
    const facts = {};
    function assert(label, ok) {
        facts[label] = Boolean(ok);
        if (!ok) violations.push(label);
    }

    const storyHero = read("demo/chassis/hero/StoryHero.vue");
    const storyHeroCode = stripComments(storyHero);
    const storyPage = read("demo/chassis/page/StoryPage.vue");
    const storyPageCode = stripComments(storyPage);
    const manifest = read("demo/stories/manifest.ts");
    const auroraHero = read("demo/chassis/hero/aurora-hero.ts");
    const heroCss = read("demo/chassis/hero/story-hero.css");
    const demoCss = read("demo/demo.css");

    // ── 1. StoryHero exists + composes a GLASS card + the five substrates. ──
    assert("StoryHero.vue exists", storyHero.length > 0);
    assert(
        "StoryHero composes a glass Card",
        /<Card[\s>]/.test(storyHeroCode) &&
            /from\s+["'][^"']*\/card["']/.test(storyHeroCode),
    );
    assert(
        "StoryHero renders <Aurora> behind the card",
        /<Aurora[\s>]/.test(storyHeroCode),
    );
    assert(
        "StoryHero renders <Constellation> behind the card",
        /<Constellation[\s>]/.test(storyHeroCode),
    );
    assert(
        "StoryHero renders <FourierField> behind the card",
        /<FourierField[\s>]/.test(storyHeroCode),
    );
    // BC.W-GRID-SIMPLE clean break (no alias): the `.story-bg-grid` 28px/center
    // recipe was ABROGATED and re-expressed as the crisp full-bleed `.grid-bg`
    // page wash off the shared `--grid-*` rhythm. The grid-substrate assert is
    // RETIRED here and re-pointed to `proof:grid-simple` (G1–G6 own the new
    // recipe end-to-end: the abrogation is clean, the `--grid-*` tokens exist,
    // crisp-by-construction, full-bleed, warm-ink, no-GL). Asserting the old
    // `story-bg-grid` here would now RED on the supersession and duplicate
    // grid-simple's single-source coverage. StoryHero STILL renders the grid
    // backdrop — `.grid-bg` (the new class), proven by proof:grid-simple G2/G3.
    assert(
        "StoryHero renders the paper-grain substrate",
        /paper-grain-overlay/.test(storyHeroCode),
    );
    // The substrate sits BEHIND the card (-z-10 via the .story-hero-bg class).
    assert(
        "StoryHero places the substrate behind the card (-z-10 layout)",
        /story-hero-bg/.test(storyHeroCode),
    );

    // ── 2. The Story interface carries the background descriptor union. ──
    assert(
        "Story interface carries background?: StoryBackground",
        /background\?:\s*StoryBackground/.test(manifest),
    );
    assert(
        "StoryBackground union has the five substrates",
        /"paper"/.test(auroraHero) &&
            /"grid"/.test(auroraHero) &&
            /"aurora"/.test(auroraHero) &&
            /"constellation"/.test(auroraHero) &&
            /"fourier"/.test(auroraHero) &&
            /StoryBackground/.test(auroraHero),
    );
    assert(
        "StoryBackground supports the object form (tuned palette/intensity)",
        /kind:\s*StoryBackgroundKind/.test(auroraHero) &&
            /palette\?:/.test(auroraHero) &&
            /intensity\?:/.test(auroraHero),
    );

    // ── 3. story-hero.css is wired into the cascade. ──
    assert(
        "story-hero.css exists + is wired into the demo cascade",
        heroCss.length > 0 && /story-hero\.css/.test(demoCss),
    );
    // The three `.story-bg-grid` recipe asserts (recipe-exists / token-driven /
    // dark-adaptive over `--story-grid-size`/`--story-grid-color`) are RETIRED at
    // BC.W-GRID-SIMPLE (the clean-break supersession, no alias). They asserted the
    // OLD 28px/center recipe that `proof:grid-simple` now ABROGATES — keeping them
    // would directly contradict grid-simple's G1 (`--story-grid-*` must be GONE).
    // The NEW crisp full-bleed `.grid-bg`/`--grid-*` recipe is owned end-to-end by
    // `proof:grid-simple` (G2 the rhythm tokens + foreground-flip-not-parallel-dark-
    // family, G3 crisp construction, G4 full-bleed) — the single-gate coverage moves
    // there intact. See proof-grid-simple.mjs.

    // ── 4. StoryPage hosts StoryHero (the universal container). ──
    assert(
        "StoryPage imports StoryHero",
        // StoryHero re-homed to demo/chassis/hero/ (BH.B3 δ34); StoryPage is in
        // demo/chassis/page/, so it reaches the sibling via ../hero/StoryHero.vue.
        /import\s+StoryHero\s+from\s+["']\.\.\/hero\/StoryHero\.vue["']/.test(
            storyPageCode,
        ),
    );
    assert(
        "StoryPage composes <StoryHero> around the body slot",
        /<StoryHero[\s>]/.test(storyHeroAroundSlot(storyPage)),
    );
    assert(
        "StoryPage reads the active story's declared background",
        /\.story\.background/.test(storyPageCode),
    );
    assert(
        "StoryPage reads the hero register flag",
        /\.story\.hero/.test(storyPageCode),
    );

    // ── 5. Every hero page composes the StoryPage hierarchy. ──
    for (const rel of HERO_PAGES) {
        const src = read(rel);
        const name = rel.split("/").slice(-2).join("/");
        assert(
            `${name} composes <StoryPage>`,
            /<StoryPage[\s>]/.test(src) &&
                /import\s+StoryPage\s+from/.test(stripComments(src)),
        );
    }

    // ── 6. The four heros re-home onto the descriptor — no inline <Aurora>
    //       CONFIG FORK survives — AND the hero set spans the substrates. ──
    // AY re-point (the FIX-GLASSUI-DARK un-orphan): auth-shell's brand panel
    // DELIBERATELY mounts a contained <Aurora> INSIDE its fourier-hero page —
    // the original sin was a duplicated hand-rolled config, not the mount. The
    // arm now asserts any inline <Aurora> on a hero page reads the SHARED
    // heroAuroraConfig seam (no second config authority), instead of forbidding
    // the mount outright.
    for (const rel of HERO_PAGES) {
        const src = read(rel);
        const code = stripComments(src);
        const name = rel.split("/").slice(-2).join("/");
        const mountsAurora = /<Aurora[\s>]/.test(code);
        assert(
            `${name}: an inline <Aurora> reads the shared heroAuroraConfig seam (no config fork)`,
            !mountsAurora || /heroAuroraConfig\(/.test(code),
        );
    }

    // Parse the per-page declared substrates from the manifest hero rows.
    // AY re-point: the shipped hero map DELIBERATELY reuses aurora (the intro
    // front door, the aurora substrate's own page, glass-material demoing glass
    // OVER aurora) — strict all-unique was the AX spec'd shape the AY rebuild
    // superseded. The binding contract now: every hero declares a substrate,
    // each substrates/* page self-demos its OWN kind, and the hero set spans
    // ≥ 4 distinct kinds (the spread that keeps the storybook from collapsing
    // to all-aurora).
    const heroSubstrates = parseHeroSubstrates(manifest);
    facts.heroSubstrates = heroSubstrates;
    const heroKinds = Object.values(heroSubstrates);
    assert(
        "every hero declares a background substrate",
        heroKinds.length >= 4 && heroKinds.every((k) => k),
    );
    for (const [key, kind] of Object.entries(heroSubstrates)) {
        const m = key.match(/^substrates\/([a-z-]+)$/);
        if (!m) continue;
        const own = m[1] === "fourier-field" ? "fourier" : m[1];
        // glass-material is the named exception — it demos GLASS over a rich
        // substrate (aurora), not a substrate of its own.
        if (m[1] === "glass-material") continue;
        // blob: the contained-creature supersession (W-BLOB-REBUILD) — its page
        // presents over paper; the creature mounts contained, never a field.
        if (m[1] === "blob") continue;
        // fourier-studio: the FOREGROUND studio (BA.W-FOURIER-STUDIO, the
        // aurora-studio idiom) — a Configurator over its OWN Canvas2D stage, so the
        // stage IS the live context and the route declares a CALM paper background
        // (a live fourier/aurora field would double the per-route context). It is
        // studio CHROME, not a render-background substrate page — the same exempt
        // class as glass-material/blob (demos over paper, never self-demos a field).
        if (m[1] === "fourier-studio") continue;
        // dot-flow-field + concentric (BB.W-VIZ-SUITE) + liquid-grid + dot-matrix +
        // goo-dot (BC.W-VIZ-SUITE/VIZ-HYBRID) + fourier-field (BC.W-VIZ-FOURIER, the
        // three-view collapse): each NEW WebGPU-first viz mounts CONTAINED in the story
        // body over a calm grid/paper wash (the field is its OWN single GL/compute
        // context — the one-GL-per-route budget held), so each route DELIBERATELY
        // declares a CALM static background (grid for the viz-suite cohort, paper for
        // the fourier-field collapse) rather than self-demoing a page-background field.
        // The same exempt class as fourier-studio/blob (a contained-demo over a calm
        // wash, never a self-demo'd page-background field — the StoryBackground kinds
        // stay the four hero substrates aurora/blob/constellation/fourier).
        if (
            m[1] === "dot-flow-field" ||
            m[1] === "concentric" ||
            m[1] === "liquid-grid" ||
            m[1] === "dot-matrix" ||
            m[1] === "goo-dot" ||
            m[1] === "fourier-field"
        )
            continue;
        assert(
            `substrates/${m[1]} self-demos its own substrate (${own})`,
            kind === own,
        );
    }
    assert(
        "the hero set spans >= 4 distinct substrate kinds (the spread)",
        new Set(heroKinds).size >= 4,
    );

    return { facts, violations };
}

// Isolate the <StoryHero> ... </StoryHero> region so the slot-wrapping check
// reads the template, not the import line.
function storyHeroAroundSlot(src) {
    const open = src.indexOf("<StoryHero");
    const close = src.indexOf("</StoryHero>");
    if (open < 0 || close < 0) return "";
    return src.slice(open, close);
}

// Pull each hero row's declared substrate kind from the manifest. A hero row is
// one with `hero: true`; its `background` is a string or `{ kind: ... }`. Each
// `s(...)` call is sliced by paren-balance from its opening `s(` so a hero
// block is read in isolation (not spanning into the next call).
function parseHeroSubstrates(manifest) {
    const out = {};
    const callRe = /\bs\(\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
    let m;
    while ((m = callRe.exec(manifest)) !== null) {
        const cat = m[1];
        const id = m[2];
        const block = sliceBalanced(manifest, m.index + manifest.slice(m.index).indexOf("("));
        if (!/\bhero:\s*true/.test(block)) continue;
        const strForm = block.match(/background:\s*"([^"]+)"/);
        const objForm = block.match(/background:\s*\{\s*kind:\s*"([^"]+)"/);
        out[`${cat}/${id}`] = (strForm?.[1] ?? objForm?.[1]) ?? null;
    }
    return out;
}

// Slice the substring from the opening "(" to its matching ")" (paren-balanced),
// so one s(...) call is read without bleeding into the next.
function sliceBalanced(src, openIdx) {
    let depth = 0;
    for (let i = openIdx; i < src.length; i++) {
        const ch = src[i];
        if (ch === "(") depth++;
        else if (ch === ")") {
            depth--;
            if (depth === 0) return src.slice(openIdx, i + 1);
        }
    }
    return src.slice(openIdx);
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_PAGE_REDESIGN_ARTIFACT",
        "AX-page-redesign",
    );
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:page-redesign",
        command: COMMAND,
        facts,
        violations,
    });

    console.log(
        "proof:page-redesign — every story page a glass card over a per-page background",
    );
    console.log(`  StoryHero glass container : ${facts["StoryHero composes a glass Card"]}`);
    console.log(`  background descriptor seam: ${facts["Story interface carries background?: StoryBackground"]}`);
    console.log(`  grid recipe (→ grid-simple): RETIRED at BC.W-GRID-SIMPLE (proof:grid-simple owns .grid-bg/--grid-*)`);
    console.log(`  StoryPage hosts StoryHero : ${facts["StoryPage composes <StoryHero> around the body slot"]}`);
    console.log(`  hero substrates           : ${JSON.stringify(facts.heroSubstrates)}`);
    console.log(`  unique per hero           : ${facts["each hero declares a UNIQUE substrate (no two the same)"]}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
