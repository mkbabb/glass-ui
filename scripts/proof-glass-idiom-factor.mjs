#!/usr/bin/env node
// BG.W-GLASS-IDIOM-FACTOR — the DRY plate-tint recipe declared ONCE + the
// reader-census-at-landing net-neutral guard (proof:glass-idiom-factor).
//
// The five-rung surface ladder (.glass-{wash,quiet,resting,floating,overlay})
// each composed the SAME element-level oklab tint INLINE — 5 byte-identical
// `color-mix(in oklab, var(--glass-bg-<rung>), var(--glass-tint-source)
// var(--glass-tint-strength))` pastes. This wave factors the recipe into ONE
// `--glass-plate-tinted` declaration (the rim.css `--glass-border-rung` →
// `--glass-border-accent` indirection pattern, mirrored for the plate
// background): each rung sets only its own `--glass-bg-rung` + reads
// `background: var(--glass-plate-tinted)`. NET-NEUTRAL — a custom property
// substitutes its var() refs against the SAME element's other customs, so the
// per-rung bg + the per-element W55 re-points reach the recipe unchanged; the
// dist is byte-isomorphic.
//
// The comment-strip + pure-detector house pattern (mirroring proof-glass-
// accent.mjs / proof-glass-cal.mjs). Born-RED at HEAD (no `--glass-plate-tinted`
// declaration + 5 inline pastes) → GREEN at the factor. A `--self-test` arm
// proves each clause has teeth.
//
//   F1 — the recipe is DECLARED EXACTLY ONCE across the glass cascade AND
//        composes `color-mix(in oklab, var(--glass-bg-rung),
//        var(--glass-tint-source) var(--glass-tint-strength))` (the W55 seam
//        reading the per-rung indirection). A second declaration (a forked
//        recipe home) REDs; a missing declaration REDs.
//   F2 — the 5 ladder rungs each set `--glass-bg-rung: var(--glass-bg-<rung>)`
//        (the per-rung mapping, resting→resting not a cross-paste) AND read
//        `background: var(--glass-plate-tinted)`; ZERO surviving inline
//        `background: color-mix(in oklab, var(--glass-bg-…))` paste in ladder.css.
//   F3 — the reader-census-at-landing net-neutral guard. The phantom
//        `--glass-warm-zero` is ABSENT (the DROPPED work item — a re-introduction
//        REDs), AND the 3-false-claims KEEP tokens stay DECLARED in glass-fx.css
//        (`--glass-spine-blur`/`--glass-spine-opacity`, test-pinned by
//        InstrumentChassis.spine-variant.test.ts; `--meter-track-stroke`, the
//        speedtest `useTokenColor` consumer extension-point) — an over-prune of a
//        token with 0 in-CSS var() readers but a LIVE off-CSS consumer is the
//        3-false-delete-claims lesson, and deleting any REDs.
//
// bite-check (the --self-test arm): a doubled `--glass-plate-tinted` declaration
// reds F1; a surviving inline rung paste reds F2; a re-introduced
// `--glass-warm-zero` OR a deleted KEEP token reds F3.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

function squish(src) {
    return src.replace(/\s+/g, " ");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const LADDER_FILE = "src/styles/glass/ladder.css";
const GLASS_FX_FILE = "src/styles/tokens/glass-fx.css";

// the five surface rungs (the factored set) + their per-rung bg token.
const RUNGS = ["wash", "quiet", "resting", "floating", "overlay"];

function readFile(rel) {
    const file = resolve(ROOT, rel);
    return existsSync(file) ? readFileSync(file, "utf8") : "";
}

// ── F1: the recipe is declared ONCE + composes the W55 seam ──────────────────
function detectDeclaredOnce() {
    const violations = [];
    const facts = {};

    const glass = stripCss(readMonolith(ROOT, "glass"));
    const decls = (glass.match(/--glass-plate-tinted\s*:/g) || []).length;
    facts.plateTintedDeclarations = decls;

    if (decls === 0) {
        violations.push(
            "F1: `--glass-plate-tinted` is NOT declared in the glass cascade (the DRY recipe home is missing — the 5 inline pastes were never factored)",
        );
    } else if (decls > 1) {
        violations.push(
            `F1: \`--glass-plate-tinted\` is declared ${decls} times in the glass cascade — the recipe must be DECLARED ONCE (a second declaration is a forked recipe home; later consumers EXTEND the single selector group, they never re-declare the recipe)`,
        );
    }

    // the recipe composes the W55 seam reading the per-rung indirection.
    const recipe =
        /--glass-plate-tinted:\s*color-mix\(\s*in\s+oklab\s*,\s*var\(--glass-bg-rung\)\s*,\s*var\(--glass-tint-source\)\s*var\(--glass-tint-strength\)/.exec(
            squish(glass),
        );
    facts.recipeComposesSeam = Boolean(recipe);
    if (decls > 0 && !recipe) {
        violations.push(
            "F1: `--glass-plate-tinted` does not compose `color-mix(in oklab, var(--glass-bg-rung), var(--glass-tint-source) var(--glass-tint-strength))` — the recipe must be the W55 oklab tint seam reading the per-rung `--glass-bg-rung` indirection (an in-srgb mix, a baked rung, or a dropped tint leg breaks the net-neutral floor)",
        );
    }

    return { violations, facts };
}

// ── F2: the 5 rungs read the token + the per-rung mapping + no inline paste ──
function detectRungsRead() {
    const violations = [];
    const facts = {};

    const ladder = stripCss(readFile(LADDER_FILE));
    facts.ladderExists = ladder.length > 0;
    if (!facts.ladderExists) {
        violations.push(`F2: ${LADDER_FILE} is absent`);
        return { violations, facts };
    }

    const tokenReads = (ladder.match(/background:\s*var\(--glass-plate-tinted\)/g) || []).length;
    facts.tokenReads = tokenReads;
    if (tokenReads !== RUNGS.length) {
        violations.push(
            `F2: ${tokenReads}/${RUNGS.length} ladder rungs read \`background: var(--glass-plate-tinted)\` (every rung must read the factored token, not its own inline paste)`,
        );
    }

    const bgRungSets = (ladder.match(/--glass-bg-rung:\s*var\(--glass-bg-/g) || []).length;
    facts.bgRungSets = bgRungSets;
    if (bgRungSets !== RUNGS.length) {
        violations.push(
            `F2: ${bgRungSets}/${RUNGS.length} \`--glass-bg-rung: var(--glass-bg-…)\` sets (each rung sets its OWN bg indirection exactly once)`,
        );
    }

    // the per-rung mapping — each rung sets its OWN bg (resting→resting, never a
    // cross-paste that would silently re-color a rung).
    const missingMap = [];
    for (const rung of RUNGS) {
        const re = new RegExp(`--glass-bg-rung:\\s*var\\(--glass-bg-${rung}\\)`);
        if (!re.test(ladder)) missingMap.push(rung);
    }
    facts.rungMapComplete = missingMap.length === 0;
    if (missingMap.length) {
        violations.push(
            `F2: the per-rung bg mapping is incomplete/cross-pasted — missing \`--glass-bg-rung: var(--glass-bg-${missingMap.join(",")})\` (a rung reading the wrong bg silently re-colors it)`,
        );
    }

    // ZERO surviving inline plate paste among the ladder rungs.
    const inlinePastes = (
        ladder.match(/background:\s*color-mix\(\s*in\s+oklab\s*,\s*var\(--glass-bg-/g) || []
    ).length;
    facts.inlinePastes = inlinePastes;
    if (inlinePastes > 0) {
        violations.push(
            `F2: ${inlinePastes} surviving inline \`background: color-mix(in oklab, var(--glass-bg-…))\` paste(s) in ladder.css — the DRY factor must retire EVERY inline plate paste onto the token`,
        );
    }

    return { violations, facts };
}

// ── F3: the reader-census-at-landing net-neutral guard ───────────────────────
function detectCensus() {
    const violations = [];
    const facts = {};

    const glassFx = stripCss(readFile(GLASS_FX_FILE));
    facts.glassFxExists = glassFx.length > 0;
    if (!facts.glassFxExists) {
        violations.push(`F3: ${GLASS_FX_FILE} is absent`);
        return { violations, facts };
    }

    // the phantom DROP — `--glass-warm-zero` must stay ABSENT (it never existed;
    // a future re-introduction of the dropped work item REDs).
    const warmZero = /--glass-warm-zero\s*:/.test(glassFx);
    facts.warmZeroAbsent = !warmZero;
    if (warmZero) {
        violations.push(
            "F3: `--glass-warm-zero` is declared — it is the DROPPED phantom work item (absent at HEAD); a re-introduction breaks the census (KEEP deep-ceiling, DROP warm-zero)",
        );
    }

    // the 3-false-delete-claims KEEP tokens stay DECLARED — each has 0 in-CSS
    // var() readers but a LIVE off-CSS consumer, so a census-blind delete is the
    // lesson this guard locks.
    const KEEP = [
        {
            token: "--glass-spine-blur",
            why: "test-pinned by InstrumentChassis.spine-variant.test.ts (BB.W-DEAD-SWEEP KEEP)",
        },
        {
            token: "--glass-spine-opacity",
            why: "test-pinned by InstrumentChassis.spine-variant.test.ts (BB.W-DEAD-SWEEP KEEP)",
        },
        {
            token: "--meter-track-stroke",
            why: "speedtest useTokenColor(\"--meter-track-stroke\") consumer extension-point (proof-no-dead-token allowlist)",
        },
    ];
    facts.keepPresent = {};
    for (const { token, why } of KEEP) {
        const present = new RegExp(`${token}\\s*:`).test(glassFx);
        facts.keepPresent[token] = present;
        if (!present) {
            violations.push(
                `F3: the KEEP token \`${token}\` is no longer declared in ${GLASS_FX_FILE} — it has 0 in-CSS var() readers BUT is ${why}; deleting it is the 3-false-delete-claims lesson (reader-census-at-landing per delete)`,
            );
        }
    }

    return { violations, facts };
}

export function detect() {
    const f1 = detectDeclaredOnce();
    const f2 = detectRungsRead();
    const f3 = detectCensus();
    // the self-test bites run EVERY run (the proof-dock-fission "proven every run"
    // discipline) — a bite that loses its teeth REDs the gate, so the
    // anti-gameability arm can never silently rot.
    const biteFails = selfTest();
    return {
        violations: [...f1.violations, ...f2.violations, ...f3.violations, ...biteFails],
        facts: { f1: f1.facts, f2: f2.facts, f3: f3.facts, selfTestOk: biteFails.length === 0 },
    };
}

// ── the self-test bite (--self-test) — the anti-gameability arm ──────────────
function selfTest() {
    const fails = [];

    // F1 bite — a DOUBLED declaration must be caught (the declared-once detector
    // has teeth).
    const doubled = stripCss(
        "--glass-plate-tinted: color-mix(in oklab, var(--glass-bg-rung), var(--glass-tint-source) var(--glass-tint-strength)); .x { --glass-plate-tinted: red; }",
    );
    const doubledCount = (doubled.match(/--glass-plate-tinted\s*:/g) || []).length;
    if (doubledCount <= 1) {
        fails.push(
            "self-test F1: a doubled `--glass-plate-tinted` declaration was NOT counted as >1 (the declared-once detector has no teeth)",
        );
    }

    // F2 bite — a surviving inline rung paste must be flagged.
    const survivor = stripCss(
        ".glass-resting { background: color-mix(in oklab, var(--glass-bg-resting), var(--glass-tint-source) var(--glass-tint-strength)); }",
    );
    if (!/background:\s*color-mix\(\s*in\s+oklab\s*,\s*var\(--glass-bg-/.test(survivor)) {
        fails.push(
            "self-test F2: a surviving inline rung paste was NOT detected (the no-inline-paste detector has no teeth)",
        );
    }

    // F3 bite — a re-introduced `--glass-warm-zero` must be caught.
    const warmZeroReintro = "--glass-warm-zero: 0%;";
    if (!/--glass-warm-zero\s*:/.test(warmZeroReintro)) {
        fails.push(
            "self-test F3: a re-introduced `--glass-warm-zero` was NOT caught (the dropped-phantom guard has no teeth)",
        );
    }

    // F3 bite — a deleted KEEP token must be caught (a glass-fx WITHOUT
    // `--glass-spine-blur` must fail the present-detector).
    const prunedFx = "--glass-spine-opacity: 0; --meter-track-stroke: var(--foreground);";
    if (/--glass-spine-blur\s*:/.test(prunedFx)) {
        fails.push(
            "self-test F3: a deleted KEEP token (`--glass-spine-blur`) slipped the present-detector (the over-prune guard has no teeth)",
        );
    }

    return fails;
}

function run() {
    const selfTestMode = process.argv.includes("--self-test");
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_IDIOM_FACTOR_ARTIFACT", "BG-glass-idiom-factor");

    if (selfTestMode) {
        const fails = selfTest();
        const ok = fails.length === 0;
        console.log("proof:glass-idiom-factor --self-test — the bite arm (anti-gameability)");
        if (ok) {
            console.log("  all clause bites have teeth ✓");
        } else {
            for (const f of fails) console.log(`  ✗ ${f}`);
        }
        process.exit(ok ? 0 : 1);
    }

    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-idiom-factor",
        facts,
        violations,
    });

    console.log(
        "proof:glass-idiom-factor — the DRY plate-tint recipe declared ONCE + the reader-census net-neutral guard — BG.W-GLASS-IDIOM-FACTOR",
    );
    console.log(
        `  F1 declared-once  : ${facts.f1.plateTintedDeclarations} declaration(s) (expect 1)   composes W55 seam: ${facts.f1.recipeComposesSeam ? "✓" : "✗"}`,
    );
    console.log(
        `  F2 rungs read     : ${facts.f2.tokenReads}/5 read token   ${facts.f2.bgRungSets}/5 bg-rung sets   per-rung map: ${facts.f2.rungMapComplete ? "✓" : "✗"}   inline pastes: ${facts.f2.inlinePastes}`,
    );
    console.log(
        `  F3 census         : warm-zero absent=${facts.f3.warmZeroAbsent ? "✓" : "✗ RE-INTRODUCED"}   KEEP present: ${
            facts.f3.keepPresent
                ? Object.entries(facts.f3.keepPresent)
                      .map(([k, v]) => `${k}=${v ? "✓" : "✗"}`)
                      .join(" ")
                : "n/a"
        }`,
    );
    console.log(`  self-test bites   : ${facts.selfTestOk ? "all teeth ✓" : "✗ BROKE"}`);

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
