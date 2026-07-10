// proof:meta · glass-paper-congruence — the WS12 `--glass-key-*` SPINE machine-lock
// (BG.W-GLASS-PAPER-CONGRUENCE, F8 capstone 17.5).
//
// The WS12 coherence audit READS the one-key spine (proof:coherence-census §A6 —
// the audit-of-record BOOKS it here); THIS wave OWNS + machine-locks it. The two
// are the clean division the census §A6 records: "the spine is owned + machine-
// locked by 17.5 W-GLASS-PAPER-CONGRUENCE (the Regular/Clear tier map, dock-
// excluded); this census READS it, it does not re-author it."
//
// The physical truth (iOS-27 concentricity, GU-1 `glass-key-fill`): ONE light
// source governs the glass bevel/rim. The WS8 bevel `--glass-key-{lit,shade}-{x,y}`
// cohort (BD.W-GLASS-KEY-EDGE) is the SINGLE canonical spine every glass rim
// register calc-derives from — the FAMILY-MEMBERSHIP invariant (§0E-1): each
// physical key register is SHARED-SOURCED from the ONE spine, NOT a hardcoded
// literal angle (a companion may hold a contradictory literal and still cohere if
// it READS the spine). The paper register does NOT force-fit onto the spine — the
// `--paper-grain-tooth` is the ISOTROPIC warm raster tooth (NO directional key),
// and the painterly cel field is the §4 SANCTIONED multi-light exception the
// census allowlists (cartoon-technicolor-punch, a binding law). So glass + paper
// COHERE: glass rides ONE key, paper introduces NO competing un-sanctioned key.
//
// This gate is a proof:meta family CLAUSE (the coherence-census precedent —
// proof-meta.mjs imports `glassPaperCongruence` into its CLAUSES + folds
// `glassPaperCongruenceSelfBites`). It carries FIVE arms:
//
//   GPC1 — SPINE-CANONICAL. The four `--glass-key-{lit,shade}-{x,y}` tokens are
//          DECLARED exactly ONCE across src/styles/ (the glass-fx.css keystone) —
//          a second declaration is a fork; a `--glass-key-*-dark` parallel is the
//          per-mode fork §0E-1 bans (dark READS the inherited spine).
//   GPC2 — SPINE-READ, both modes (FAMILY-MEMBERSHIP). Every glass rim register
//          calc-READS the spine (`var(--glass-key-*)`), NOT a hardcoded px offset:
//          the glass-fx.css light rim (`--glass-rim-top`/`--glass-rim-bottom`), the
//          dark-arm.css dark rim (the plain per-mode pair reading the SAME spine),
//          the rim.css `--glass-material-rim`.
//   GPC3 — REGULAR/CLEAR tier map. The Apple 2-variant split: Regular = the calm
//          5-rung `--glass-bg-{wash..overlay}` ladder, each composed through the
//          ONE `--glass-level` knob; Clear = the `--glass-depth` opt-in deep tier
//          (`@property --glass-depth`, `.glass-deep` re-points the floating blur
//          token to the deep family — NOT a parallel backdrop-filter recipe).
//   GPC4 — DOCK EXCLUDED. The dock rides its OWN `--glass-bg-dock` footprint rung
//          (`--glass-opacity-dock`), NOT a content 5-rung ladder tier — the dock
//          is not force-fitted into the content-tier read (§A3b dock-exclusion).
//   GPC5 — PAPER §4 SANCTIONED CONGRUENCE. `--paper-grain-tooth` is the isotropic
//          warm tooth (present) with NO LIVE directional-key filter primitive
//          (`feDiffuseLighting`/`feDistantLight` — a competing key vs the glass
//          spine); the census §A6 names THIS wave as the spine owner (the
//          reads-it↔owns-it tie).
//
// SELF-TEST (born-RED→GREEN): `node scripts/proof-glass-paper-congruence.mjs
// --self-test` feeds the PURE detector synthetic worlds — a forked spine token, a
// hardcoded-literal rim, a `-dark` fork, a broken tier ladder, a missing Clear
// tier, a dock folded into the content ladder, a live directional paper key each
// MUST flag; the fully-clean world greens. If the detector misses a planted defect
// OR false-flags the clean world, the gate reds (acceptance is the RED-witness
// inverse). born-RED on the pre-spine tree (WS8 bevel unlanded) → GREEN at HEAD.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { ROOT } from "./constellation.mjs";
import { stripComments } from "./lib/detect/index.mjs";

const rel = (p) => p.replace(ROOT + "/", "");

// The four WS8-bevel spine tokens (the ONE canonical key family — BD.W-GLASS-KEY-EDGE).
const SPINE = Object.freeze(["glass-key-lit-x", "glass-key-lit-y", "glass-key-shade-x", "glass-key-shade-y"]);

// The named source files the arms read (relative to ROOT).
const F = Object.freeze({
    glassFx: "src/styles/tokens/glass-fx.css",
    darkArm: "src/styles/tokens/dark-arm.css",
    rim: "src/styles/glass/rim.css",
    glass: "src/styles/tokens/glass.css",
    deep: "src/styles/glass/deep.css",
    glassDeep: "src/styles/tokens/glass-deep.css",
    propRegs: "src/styles/tokens/property-regs.css",
    paper: "src/styles/paper.css",
    census: "docs/tranches/BG/audit/WS12-CENSUS.md",
});

// ── PURE helpers (operate on injected strings — self-testable, fs-free) ────────

/** The value of a `--token:` declaration (up to its terminating `;`), or null.
 * CSS multi-stop values carry commas + nested `var(...)` parens but no `;`. */
export function declValue(cssText, token) {
    const m = cssText.match(new RegExp(`--${token}\\s*:\\s*([^;]*)`));
    return m ? m[1] : null;
}

/** Count `--token:` DECLARATION sites in a corpus (a read `var(--token)` has no
 * trailing colon so it never miscounts as a declaration). */
export function declCount(corpus, token) {
    return (corpus.match(new RegExp(`--${token}\\s*:`, "g")) || []).length;
}

/** A rim register READS the spine iff its value carries a `var(--glass-key-…)` —
 * the FAMILY-MEMBERSHIP invariant (shared-sourcing, not a hardcoded literal). */
function readsSpine(value) {
    return value != null && /var\(\s*--glass-key-(lit|shade)-[xy]\s*\)/.test(value);
}

// ── The detector (fed an injected `world` — the self-test feeds synthetic ones) ─
// world = { read(relpath) → text|null, corpus: string } — `read` returns RAW file
// text (the detector strips comments where a live-vs-comment distinction matters);
// `corpus` is the comment-stripped concatenation of all src/styles CSS (single-
// source counting).

export function glassPaperCongruenceCheck(world) {
    const { read, corpus } = world;
    const failures = [];
    const strip = (p) => {
        const raw = read(p);
        return raw == null ? null : stripComments(raw);
    };

    // ── GPC1 — SPINE-CANONICAL (single-source keystone, no per-mode fork) ──────
    for (const t of SPINE) {
        const n = declCount(corpus, t);
        if (n !== 1)
            failures.push(
                `GPC1 spine token --${t} declared ${n} time(s) across src/styles/ (want exactly 1 — the glass-fx.css keystone; a 2nd declaration is a fork).`,
            );
    }
    const forkRe = /--glass-key-(lit|shade)-[xy]-dark\s*:/;
    if (forkRe.test(corpus))
        failures.push(
            "GPC1 a `--glass-key-*-dark` PARALLEL token exists — the per-mode fork §0E-1 bans; the dark rim must READ the inherited spine, never a `-dark` clone.",
        );
    const fx = strip(F.glassFx);
    if (fx == null) failures.push(`GPC1 the spine keystone absent — ${F.glassFx}`);
    else
        for (const t of SPINE)
            if (declValue(fx, t) == null)
                failures.push(`GPC1 spine token --${t} not declared in the keystone ${F.glassFx}.`);

    // ── GPC2 — SPINE-READ, both modes (the rim calc-reads the spine) ──────────
    // The light rim (glass-fx.css) + the dark rim (dark-arm.css) each re-declare
    // `--glass-rim-top`/`--glass-rim-bottom` — both must READ the spine.
    for (const [file, mode] of [[F.glassFx, "light"], [F.darkArm, "dark"]]) {
        const txt = strip(file);
        if (txt == null) {
            failures.push(`GPC2 ${mode}-rim source absent — ${file}`);
            continue;
        }
        for (const reg of ["glass-rim-top", "glass-rim-bottom"]) {
            const v = declValue(txt, reg);
            if (v == null)
                failures.push(`GPC2 ${mode} rim register --${reg} not declared in ${rel(file)}.`);
            else if (!readsSpine(v))
                failures.push(
                    `GPC2 ${mode} rim register --${reg} does NOT read the --glass-key-* spine (it carries a hardcoded literal offset — the shared-sourcing invariant broken) in ${rel(file)}.`,
                );
        }
    }
    // The rim.css `--glass-material-rim` composes the spine's lit edges.
    const rimTxt = strip(F.rim);
    if (rimTxt == null) failures.push(`GPC2 the material-rim source absent — ${F.rim}`);
    else {
        const v = declValue(rimTxt, "glass-material-rim");
        if (v == null) failures.push(`GPC2 --glass-material-rim not declared in ${F.rim}.`);
        else if (!readsSpine(v))
            failures.push(
                `GPC2 --glass-material-rim does NOT read the --glass-key-* spine (a hardcoded catch-light edge) in ${F.rim}.`,
            );
    }

    // ── GPC3 — REGULAR/CLEAR tier map ─────────────────────────────────────────
    const glassTxt = strip(F.glass);
    if (glassTxt == null) failures.push(`GPC3 the tier-ladder source absent — ${F.glass}`);
    else {
        // Regular = the calm 5-rung ladder, each composed through the ONE --glass-level knob.
        for (const rung of ["wash", "quiet", "resting", "floating", "overlay"]) {
            const v = declValue(glassTxt, `glass-bg-${rung}`);
            if (v == null)
                failures.push(`GPC3 Regular-tier rung --glass-bg-${rung} not declared in ${F.glass}.`);
            else if (!/var\(\s*--glass-level\s*\)/.test(v))
                failures.push(
                    `GPC3 Regular-tier rung --glass-bg-${rung} does not compose through the ONE --glass-level knob (a parallel opacity recipe) in ${F.glass}.`,
                );
        }
    }
    // Clear = the --glass-depth opt-in deep tier (the @property twin + the .glass-deep re-point).
    const propTxt = strip(F.propRegs);
    if (propTxt == null || !/@property\s+--glass-depth\b/.test(propTxt))
        failures.push(
            `GPC3 the Clear-tier scalar @property --glass-depth is not registered in ${F.propRegs}.`,
        );
    const deepTxt = strip(F.deep);
    if (deepTxt == null) failures.push(`GPC3 the Clear-tier decoration source absent — ${F.deep}`);
    else {
        if (!/\.glass-deep\b/.test(deepTxt))
            failures.push(`GPC3 the .glass-deep Clear-tier decoration is absent in ${F.deep}.`);
        if (!/--glass-blur-floating\s*:\s*var\(\s*--glass-blur-deep\s*\)/.test(deepTxt))
            failures.push(
                `GPC3 .glass-deep does NOT re-point --glass-blur-floating onto the deep family (it forks a parallel backdrop-filter recipe instead of the token-substitution decoration) in ${F.deep}.`,
            );
    }
    const glassDeepTxt = strip(F.glassDeep);
    if (glassDeepTxt == null || declValue(glassDeepTxt, "glass-blur-deep-radius") == null)
        failures.push(`GPC3 the deep blur family --glass-blur-deep-radius is absent in ${F.glassDeep}.`);

    // ── GPC4 — DOCK EXCLUDED (its own footprint rung, not a content tier) ─────
    if (glassTxt != null) {
        if (declValue(glassTxt, "glass-bg-dock") == null)
            failures.push(
                `GPC4 the dock footprint rung --glass-bg-dock is absent — the dock must ride its OWN rung, not a content-tier ladder tier, in ${F.glass}.`,
            );
        if (declValue(glassTxt, "glass-opacity-dock") == null)
            failures.push(
                `GPC4 the dock footprint opacity --glass-opacity-dock is absent (the dock's own footprint, distinct from the 5 content-tier opacities) in ${F.glass}.`,
            );
    }

    // ── GPC5 — PAPER §4 SANCTIONED CONGRUENCE (glass + paper cohere) ──────────
    const paperTxt = strip(F.paper);
    if (paperTxt == null) failures.push(`GPC5 the paper source absent — ${F.paper}`);
    else {
        if (declValue(paperTxt, "paper-grain-tooth") == null)
            failures.push(`GPC5 the isotropic warm --paper-grain-tooth primary is absent in ${F.paper}.`);
        // The tooth introduces NO competing directional key (the §0E-1 "isotropic
        // tooth, no directional key" correction) — a LIVE feDiffuseLighting/
        // feDistantLight azimuth in paper would be a second key vs the glass spine.
        if (/feDiffuseLighting|feDistantLight/.test(paperTxt))
            failures.push(
                `GPC5 paper carries a LIVE directional-key filter primitive (feDiffuseLighting/feDistantLight) — a competing key vs the glass --glass-key-* spine; the tooth must stay isotropic (the cel field is the §4 sanctioned exception) in ${F.paper}.`,
            );
    }
    // The census §A6 names THIS wave as the spine owner (the reads-it↔owns-it tie).
    const censusTxt = read(F.census);
    if (censusTxt == null) failures.push(`GPC5 the WS12 census is absent — ${F.census}`);
    else {
        const a6 = sectionA6(censusTxt);
        if (a6 == null) failures.push(`GPC5 the census §A6 (glass-key spine read) is absent in ${F.census}.`);
        else if (!/17\.5\s+W-GLASS-PAPER-CONGRUENCE/.test(a6))
            failures.push(
                `GPC5 the census §A6 does not name 17.5 W-GLASS-PAPER-CONGRUENCE as the --glass-key-* spine owner (the reads-it↔owns-it tie) in ${F.census}.`,
            );
    }

    return failures;
}

/** The §A6 body (lines after the `### A6 …` heading up to the next `### `). */
export function sectionA6(text) {
    const lines = text.split("\n");
    let i = lines.findIndex((l) => /^###\s+A6\b/.test(l));
    if (i < 0) return null;
    const body = [];
    for (i += 1; i < lines.length; i++) {
        if (/^###\s+/.test(lines[i])) break;
        body.push(lines[i]);
    }
    return body.join("\n");
}

// ── The real-fs world (a recursive src/styles CSS walk for the corpus) ─────────

function walkCss(dir, out) {
    for (const e of readdirSync(dir)) {
        const abs = join(dir, e);
        const st = statSync(abs);
        if (st.isDirectory()) walkCss(abs, out);
        else if (e.endsWith(".css")) out.push(abs);
    }
    return out;
}

function realWorld() {
    const stylesDir = join(ROOT, "src/styles");
    const corpus = existsSync(stylesDir)
        ? walkCss(stylesDir, [])
            .map((abs) => stripComments(readFileSync(abs, "utf8")))
            .join("\n")
        : "";
    const read = (relpath) => {
        const abs = join(ROOT, relpath);
        return existsSync(abs) ? readFileSync(abs, "utf8") : null;
    };
    return { read, corpus };
}

// ── The clause (the proof:meta family member) ─────────────────────────────────
export function glassPaperCongruence() {
    return {
        clause: "glass-paper-congruence",
        visualCount: 0,
        failures: glassPaperCongruenceCheck(realWorld()),
    };
}

// ── SELF-TEST fixtures (fully synthetic — a fixed file/corpus world) ───────────

const CLEAN_FILES = () => ({
    [F.glassFx]:
        ":root {\n" +
        "  --glass-key-lit-x: -1px;\n  --glass-key-lit-y: 1px;\n" +
        "  --glass-key-shade-x: 1px;\n  --glass-key-shade-y: -1px;\n" +
        "  --glass-rim-top: inset 0 var(--glass-key-lit-y) 0 hsl(0 0% 100% / 0.30), inset var(--glass-key-lit-x) 0 0 hsl(0 0% 100% / 0.18);\n" +
        "  --glass-rim-bottom: inset 0 var(--glass-key-shade-y) 0 color-mix(in srgb, var(--foreground) 6%, transparent), inset var(--glass-key-shade-x) 0 0 color-mix(in srgb, var(--foreground) 4%, transparent);\n" +
        "}\n",
    [F.darkArm]:
        ".dark {\n" +
        "  --glass-rim-top: inset 0 var(--glass-key-lit-y) 0 hsl(0 0% 100% / 0.40), inset var(--glass-key-lit-x) 0 0 hsl(0 0% 100% / 0.24);\n" +
        "  --glass-rim-bottom: inset 0 var(--glass-key-shade-y) 0 color-mix(in srgb, var(--foreground) 6%, transparent), inset var(--glass-key-shade-x) 0 0 color-mix(in srgb, var(--foreground) 4%, transparent);\n" +
        "}\n",
    [F.rim]:
        ".glass-material {\n  --glass-material-rim: inset 0 var(--glass-key-lit-y) 0 var(--x), inset var(--glass-key-lit-x) 0 0 var(--y), var(--glass-rim-bottom);\n}\n",
    [F.glass]:
        ":root {\n" +
        "  --glass-bg-wash:     color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-wash)) * var(--glass-level)) * 100%), transparent);\n" +
        "  --glass-bg-quiet:    color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-quiet)) * var(--glass-level)) * 100%), transparent);\n" +
        "  --glass-bg-resting:  color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-resting)) * var(--glass-level)) * 100%), transparent);\n" +
        "  --glass-bg-floating: color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-floating)) * var(--glass-level)) * 100%), transparent);\n" +
        "  --glass-bg-overlay:  color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-overlay)) * var(--glass-level)) * 100%), transparent);\n" +
        "  --glass-opacity-dock: 0.50;\n" +
        "  --glass-bg-dock:     color-mix(in oklab, color-mix(in srgb, var(--card) calc((1 - (1 - var(--glass-opacity-dock)) * var(--glass-level)) * 100%), transparent), var(--glass-tint-source) var(--glass-tint-strength));\n" +
        "}\n",
    [F.propRegs]: "@property --glass-depth { syntax: '<number>'; inherits: true; initial-value: 1; }\n",
    [F.deep]: ".glass-deep { --glass-blur-floating: var(--glass-blur-deep); }\n",
    [F.glassDeep]: ":root { --glass-blur-deep-radius: 16px; }\n",
    [F.paper]:
        "/* NO feDiffuseLighting/lighting term — the metallic primitive is retired */\n" +
        ":root { --paper-grain-tooth: url(\"data:image/svg+xml,...feColorMatrix type='saturate' values='0'...\"); }\n",
    [F.census]:
        "### A6 — glass-key spine read\nowned + machine-locked by 17.5 W-GLASS-PAPER-CONGRUENCE (the Regular/Clear tier map, dock-excluded).\n\n### A7 — next\n",
});

/** Build a synthetic world (files + derived comment-stripped corpus) with an
 * optional single mutation. */
function synthWorld(mutate = (f) => f) {
    const files = mutate(CLEAN_FILES());
    // Only CSS files feed the single-source corpus (the census is markdown; the
    // spine-count regex never matches it anyway, but the walk mirrors the real one).
    const corpus = Object.entries(files)
        .filter(([k]) => k.endsWith(".css"))
        .map(([, v]) => stripComments(v))
        .join("\n");
    return {
        read: (p) => (p in files ? files[p] : null),
        corpus,
    };
}

const run = (mutate) => glassPaperCongruenceCheck(synthWorld(mutate));

/** The self-test bites — `[name, ok]` pairs the proof:meta self-test folds in. */
export function glassPaperCongruenceSelfBites() {
    return [
        ["clean synthetic world → no failure", run().length === 0],
        [
            "forked spine token (declared twice) → FLAG (GPC1)",
            run((f) => {
                f[F.glass] += "\n:root { --glass-key-lit-x: 2px; }\n";
                return f;
            }).some((x) => x.includes("--glass-key-lit-x declared 2")),
        ],
        [
            "`--glass-key-*-dark` per-mode fork → FLAG (GPC1)",
            run((f) => {
                f[F.darkArm] += "\n.dark { --glass-key-lit-y-dark: 3px; }\n";
                return f;
            }).some((x) => x.includes("`--glass-key-*-dark` PARALLEL")),
        ],
        [
            "hardcoded-literal rim (no spine read) → FLAG (GPC2)",
            run((f) => {
                f[F.glassFx] = f[F.glassFx].replace(
                    /--glass-rim-top:[^;]*/,
                    "--glass-rim-top: inset 0 1px 0 hsl(0 0% 100% / 0.30), inset -1px 0 0 hsl(0 0% 100% / 0.18)",
                );
                return f;
            }).some((x) => x.includes("light rim register --glass-rim-top does NOT read")),
        ],
        [
            "dark rim severed from the spine → FLAG (GPC2 both-modes)",
            run((f) => {
                f[F.darkArm] = f[F.darkArm].replace(
                    /--glass-rim-bottom:[^;]*/,
                    "--glass-rim-bottom: inset 0 -1px 0 color-mix(in srgb, var(--foreground) 6%, transparent)",
                );
                return f;
            }).some((x) => x.includes("dark rim register --glass-rim-bottom does NOT read")),
        ],
        [
            "Regular rung off the --glass-level knob → FLAG (GPC3)",
            run((f) => {
                f[F.glass] = f[F.glass].replace(
                    /--glass-bg-resting:[^;]*/,
                    "--glass-bg-resting: color-mix(in srgb, var(--card) 65%, transparent)",
                );
                return f;
            }).some((x) => x.includes("--glass-bg-resting does not compose through the ONE --glass-level")),
        ],
        [
            "Clear tier missing @property --glass-depth → FLAG (GPC3)",
            run((f) => {
                f[F.propRegs] = "@property --glass-level { syntax: '<number>'; inherits: true; initial-value: 1; }\n";
                return f;
            }).some((x) => x.includes("@property --glass-depth is not registered")),
        ],
        [
            ".glass-deep forks a parallel recipe (no token re-point) → FLAG (GPC3)",
            run((f) => {
                f[F.deep] = ".glass-deep { backdrop-filter: blur(16px) saturate(1.5); }\n";
                return f;
            }).some((x) => x.includes(".glass-deep does NOT re-point --glass-blur-floating")),
        ],
        [
            "dock folded into the content ladder (no own rung) → FLAG (GPC4)",
            run((f) => {
                f[F.glass] = f[F.glass]
                    .replace(/\s*--glass-opacity-dock:[^;]*;/, "")
                    .replace(/\s*--glass-bg-dock:[^;]*;/, "");
                return f;
            }).some((x) => x.includes("--glass-bg-dock is absent")),
        ],
        [
            "live directional paper key (competing vs the spine) → FLAG (GPC5)",
            run((f) => {
                f[F.paper] += "\n:root { --lit: url(\"data:image/svg+xml,<feDiffuseLighting><feDistantLight azimuth='290'/></feDiffuseLighting>\"); }\n";
                return f;
            }).some((x) => x.includes("LIVE directional-key filter primitive")),
        ],
        [
            "census §A6 drops the owner name → FLAG (GPC5 tie)",
            run((f) => {
                f[F.census] = "### A6 — glass-key spine read\nsome other prose without the owner.\n\n### A7 — next\n";
                return f;
            }).some((x) => x.includes("does not name 17.5 W-GLASS-PAPER-CONGRUENCE")),
        ],
    ];
}

// ── main (direct invocation — the clause also rides proof:meta) ────────────────
const isMain = process.argv[1] && process.argv[1].endsWith("proof-glass-paper-congruence.mjs");
if (isMain) {
    if (process.argv.includes("--self-test")) {
        const bites = glassPaperCongruenceSelfBites();
        console.log(`proof:meta · glass-paper-congruence — SELF-TEST (${bites.length} bites)`);
        let allOk = true;
        for (const [name, ok] of bites) {
            console.log(`  ${ok ? "OK    " : "MISS  "}  ${name}`);
            if (!ok) allOk = false;
        }
        const real = glassPaperCongruence().failures;
        console.log(`  real glass-paper-congruence failures : ${real.length}`);
        for (const f of real.slice(0, 25)) console.error(`    ${f}`);
        if (!allOk) {
            console.error(
                "\n[glass-paper-congruence] SELF-TEST FAILED — a synthetic fixture behaved wrong; the detector is not load-bearing.",
            );
            process.exit(1);
        }
        if (real.length > 0) {
            console.error(
                "\n[glass-paper-congruence] SELF-TEST FAILED — the REAL spine is not clean (the GREEN-after state must pass).",
            );
            process.exit(1);
        }
        console.log(
            "\n[glass-paper-congruence] SELF-TEST GREEN — every planted defect flags + the real --glass-key-* spine + tier map are clean.",
        );
        process.exit(0);
    }
    const { failures } = glassPaperCongruence();
    console.log("proof:meta · glass-paper-congruence — the WS8/WS9 --glass-key-* spine machine-lock (BG.W-GLASS-PAPER-CONGRUENCE)");
    console.log(`  failures : ${failures.length}`);
    for (const f of failures) console.error(`  ${f}`);
    if (failures.length > 0) {
        console.error(
            `\n[glass-paper-congruence] ${failures.length} violation(s) — the --glass-key-* spine / Regular-Clear tier map / dock-exclusion / paper-congruence is broken.`,
        );
        process.exit(1);
    }
    console.log(
        "\n[glass-paper-congruence] the WS8-bevel spine is single-sourced + read by every glass rim (both modes), the Regular/Clear tier map coheres through the ONE --glass-level/--glass-depth machinery, the dock rides its own footprint rung, and paper introduces no competing key — glass + paper COHERE.",
    );
    process.exit(0);
}
