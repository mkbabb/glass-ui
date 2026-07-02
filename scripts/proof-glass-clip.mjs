#!/usr/bin/env node
// BG.W-GLASS-CLIP-DISCIPLINE — the ONE narrowed paint-box clip register + the
// dock-cast retire (proof:glass-clip).
//
// The house carried TWO divergent per-class clip DIALECTS — `.glass-card` →
// `contain: layout style paint` and `.glass-btn` → `contain: paint` (both
// surfaces.css) — while the five ladder rungs + the `.glass-material` GROUP
// carried NONE (so a bare <Card> composing `.glass-resting` clipped NOTHING and
// the host's own rounded backdrop-filter raster aliased to a rect at the corner).
// This wave RETIRES the two dialects into ONE `contain: paint` register on a
// NARROWED CONTENT + `.glass-card` + glass-atom selector in material.css, with
// the OVERLAY BAND (`.glass-floating`/`.glass-overlay` — a PopperArrow paints past
// the rounded corner) and the 4 DOCK CONTROLS (the BA.W-DOCK-GEOMETRY freed cross
// axis) DELIBERATELY EXCLUDED. It also ABSORBS W-DOCK-CAST-RETIRE — the kinetic
// `.cartoon-cast` dock child + the `<span class="cartoon-cast">` are deleted
// (the self-defeating maroon-halo D3 mechanism) and a dock-scope PRM
// `--motion-weight: 0` carve lands in its place.
//
// The comment-strip + pure-detector house pattern (mirroring proof-glass-idiom-
// factor.mjs / proof-glass-cal.mjs). Born-RED at HEAD (no unified clip register +
// two live per-class dialects + the live `.cartoon-cast` block + no PRM carve) →
// GREEN at the edit. A `--self-test` arm proves each clause has teeth.
//
//   C1 — the ONE clip register is DECLARED EXACTLY ONCE in material.css AND its
//        selector list INCLUDES the content tiers + `.glass-card` + `.glass-btn`
//        (the nested-backdrop-cost surfaces proof:nested-backdrop-budget reads).
//        A missing register REDs; a second `contain:` declaration (a re-forked
//        clip home) REDs; a missing INCLUDED surface REDs.
//   C2 — the per-class dialects are RETIRED from surfaces.css: ZERO `contain:`
//        declaration survives on `.glass-card`/`.glass-btn` (a surviving dialect
//        is the two-source drift this wave kills).
//   C3 — the OVERLAY BAND (`.glass-floating`/`.glass-overlay`) + the 4 DOCK
//        CONTROLS are EXCLUDED from the clip register (the Popper-arrow-survives
//        + the dock-plate-clearance source guarantee). A re-widen onto any of the
//        6 EXCLUDED selectors REDs.
//   C4 — a `border-radius` rides ALONGSIDE the clip (a clip with no radius trims
//        to a SHARP RECT): the explicit-radius clipped surfaces carry one
//        (`.glass-card` → `--radius-card`, `.glass-btn` → `--radius-pill`) AND the
//        material `::before`/`::after` pseudos carry `border-radius: inherit` (the
//        ladder rungs inherit the host's rounded box).
//   C5 — the DOCK cast is SOURCE-ABSENT: dock/shape.css declares NO
//        `.cartoon-cast` selector AND GlassDock.vue carries NO
//        `class="cartoon-cast"` (atomic — no orphan half-delete). The shared
//        `.cartoon-cast` base rule (cards.css) + its glass-atom/btn-punch
//        consumers are OUT of scope (untouched).
//   C6 — the dock-scope PRM carve is PRESENT: dock/shape.css declares
//        `--motion-weight: 0` on `.glass-dock` under
//        `@media (prefers-reduced-motion: reduce)`.
//   C7 — lightningcss-form-aware: IF the built `/styles` partition
//        `dist/styles/glass.css` (where the material cascade compiles — NOT the
//        SFC-scoped `dist/glass-ui.css`) is present, the `contain: paint`
//        substring survived the build (the clip is not comment-only). Befitting-
//        skip when the built partition is absent.
//
// bite-check (the --self-test arm): a material.css WITHOUT the register reds C1; a
// doubled `contain:` reds C1; a surviving surfaces `contain: paint` reds C2; a
// clip rule listing `.glass-overlay` reds C3; a re-introduced `.cartoon-cast`
// selector OR `class="cartoon-cast"` reds C5; a shape.css without the PRM carve
// reds C6.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

function squish(src) {
    return src.replace(/\s+/g, " ");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const MATERIAL_FILE = "src/styles/glass/material.css";
const SURFACES_FILE = "src/styles/glass/surfaces.css";
const SHAPE_FILE = "src/styles/dock/shape.css";
const DOCK_VUE = "src/components/custom/dock/GlassDock.vue";
// The material/ladder/surfaces cascade compiles into the `/styles` partition
// `dist/styles/glass.css` (NOT the SFC-scoped `dist/glass-ui.css`, which carries
// only the data-v-* component CSS) — that is where the narrowed clip register
// lands in the shipped bundle.
const DIST_CSS = "dist/styles/glass.css";

// the narrowed clip contract — the INCLUDED content/atom surfaces + the EXCLUDED
// overlay-band / dock-control surfaces (the blast-radius fence).
const INCLUDED = [".glass-wash", ".glass-quiet", ".glass-resting", ".glass-card", ".glass-btn"];
const EXCLUDED = [
    ".glass-floating",
    ".glass-overlay",
    ".dock-icon-button",
    ".dock-tab-button",
    ".dock-select-trigger",
    ".dock-dropdown-trigger",
];

function readFile(rel) {
    const file = resolve(ROOT, rel);
    return existsSync(file) ? readFileSync(file, "utf8") : "";
}

// ── the clip-rule extractor (comment-stripped) ───────────────────────────────
// Returns { count, selectors } — `count` is the number of `{ contain: paint }`
// paint-clip blocks, `selectors` the comma-split selector list of the (first)
// clip block. A block whose sole declaration is a paint-bearing `contain:` is a
// clip rule.
function extractClipRule(css) {
    const clean = stripCss(css);
    // match `<selectors> { … contain: … paint … ; … }` — any block declaring a
    // paint-bearing `contain`. `[^{}]` keeps the match inside a single rule body.
    const re = /([^{}]+)\{([^{}]*\bcontain\s*:[^;{}]*\bpaint\b[^;{}]*;[^{}]*)\}/g;
    const rules = [];
    let m;
    while ((m = re.exec(clean)) !== null) {
        rules.push({
            selectors: m[1]
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        });
    }
    return { count: rules.length, rules };
}

// ── C1: the ONE clip register in material.css, INCLUDED set present ──────────
function detectRegister() {
    const violations = [];
    const facts = {};

    const material = readFile(MATERIAL_FILE);
    facts.materialExists = material.length > 0;
    if (!facts.materialExists) {
        violations.push(`C1: ${MATERIAL_FILE} is absent`);
        return { violations, facts, selectors: [] };
    }

    const { count, rules } = extractClipRule(material);
    facts.clipRuleCount = count;

    if (count === 0) {
        violations.push(
            `C1: material.css declares NO \`contain: paint\` clip register — the ONE narrowed clip home is missing (the two per-class dialects were never factored into the single register)`,
        );
        return { violations, facts, selectors: [] };
    }
    if (count > 1) {
        violations.push(
            `C1: material.css declares ${count} \`contain\` paint-clip rules — the clip register must be DECLARED ONCE (a second declaration is a re-forked clip home)`,
        );
    }

    const selectors = rules[0].selectors;
    facts.clipSelectors = selectors;

    const missing = INCLUDED.filter((s) => !selectors.includes(s));
    facts.includedComplete = missing.length === 0;
    if (missing.length) {
        violations.push(
            `C1: the clip register omits the INCLUDED surface(s) ${missing.join(", ")} — the content tiers + \`.glass-card\` + the \`.glass-btn\` glass-atom must ALL carry the paint clip (proof:nested-backdrop-budget reads \`contain:paint\` on \`.glass-card\` + \`.glass-btn\`)`,
        );
    }

    return { violations, facts, selectors };
}

// ── C2: the per-class dialects retired from surfaces.css ─────────────────────
function detectDialectsRetired() {
    const violations = [];
    const facts = {};

    const surfaces = stripCss(readFile(SURFACES_FILE));
    facts.surfacesExists = surfaces.length > 0;
    if (!facts.surfacesExists) {
        violations.push(`C2: ${SURFACES_FILE} is absent`);
        return { violations, facts };
    }

    // ANY surviving `contain:` declaration is a per-class dialect (surfaces.css
    // carries no `contain` after the retire; the clip is material.css's ONE
    // register). `contain` (not `contain-intrinsic-*` / `container`) only.
    const survivors = (surfaces.match(/(?<![\w-])contain\s*:/g) || []).length;
    facts.survivingContainDecls = survivors;
    if (survivors > 0) {
        violations.push(
            `C2: ${survivors} surviving \`contain:\` declaration(s) in surfaces.css — the \`.glass-card\` (\`layout style paint\`) + \`.glass-btn\` (\`paint\`) per-class dialects must be RETIRED onto the ONE material.css register (a surviving dialect is the two-source drift)`,
        );
    }

    return { violations, facts };
}

// ── C3: the overlay band + dock controls EXCLUDED from the clip register ─────
function detectExclusions(selectors) {
    const violations = [];
    const facts = {};

    const rewidened = EXCLUDED.filter((s) => selectors.includes(s));
    facts.exclusionsHeld = rewidened.length === 0;
    if (rewidened.length) {
        violations.push(
            `C3: the clip register RE-WIDENED onto the EXCLUDED selector(s) ${rewidened.join(", ")} — the overlay band (Popper-arrow-survives) + the 4 dock controls (dock-plate-clearance) must carry NO clip`,
        );
    }

    return { violations, facts };
}

// ── C4: a border-radius rides alongside the clip ─────────────────────────────
function detectRadiusAlongside() {
    const violations = [];
    const facts = {};

    const surfaces = stripCss(readFile(SURFACES_FILE));
    const material = stripCss(readFile(MATERIAL_FILE));

    const cardRadius = /border-radius:\s*var\(--radius-card\)/.test(surfaces);
    const btnRadius = /border-radius:\s*var\(--radius-pill\)/.test(surfaces);
    const pseudoInherit = /border-radius:\s*inherit/.test(material);
    facts.cardRadius = cardRadius;
    facts.btnRadius = btnRadius;
    facts.pseudoInherit = pseudoInherit;

    if (!cardRadius) {
        violations.push(
            "C4: `.glass-card` no longer declares `border-radius: var(--radius-card)` — a paint clip with no radius trims to a SHARP RECT (the clipped surface must carry a radius)",
        );
    }
    if (!btnRadius) {
        violations.push(
            "C4: `.glass-btn` no longer declares `border-radius: var(--radius-pill)` — a paint clip with no radius trims to a SHARP RECT",
        );
    }
    if (!pseudoInherit) {
        violations.push(
            "C4: the material `::before`/`::after` pseudos no longer carry `border-radius: inherit` — the ladder rungs inherit the host's rounded box, so the pseudos must follow the corner",
        );
    }

    return { violations, facts };
}

// ── C5: the dock cast is source-absent (atomic) ──────────────────────────────
function detectCastAbsent() {
    const violations = [];
    const facts = {};

    const shape = stripCss(readFile(SHAPE_FILE));
    // Strip HTML `<!-- -->` + CSS/JS `/* */` comments from the SFC so a
    // retirement-note comment mentioning `cartoon-cast` is NOT a false RED — the
    // clause binds the RENDERED class, not the prose.
    const dockVue = readFile(DOCK_VUE)
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "");

    const shapeCast = /\.cartoon-cast\b/.test(shape);
    const vueCast = /\bcartoon-cast\b/.test(dockVue);
    facts.shapeCastAbsent = !shapeCast;
    facts.vueCastAbsent = !vueCast;

    if (shapeCast) {
        violations.push(
            "C5: dock/shape.css still declares a `.cartoon-cast` rule — the dock cast child is RETIRED (the D3 maroon-halo mechanism); the shared cards.css base rule + its glass-atom/btn-punch consumers stay, but the DOCK cast is gone",
        );
    }
    if (vueCast) {
        violations.push(
            "C5: GlassDock.vue still renders/mentions `cartoon-cast` — the `<span class=\"cartoon-cast\">` must be deleted TOGETHER with the shape.css rule (atomic; no orphan half-delete)",
        );
    }

    return { violations, facts };
}

// ── C6: the dock-scope PRM `--motion-weight: 0` carve ────────────────────────
function detectMotionWeightCarve() {
    const violations = [];
    const facts = {};

    const shapeRaw = readFile(SHAPE_FILE);
    facts.shapeExists = shapeRaw.length > 0;
    if (!facts.shapeExists) {
        violations.push(`C6: ${SHAPE_FILE} is absent`);
        return { violations, facts };
    }

    // a `@media (prefers-reduced-motion: reduce)` block whose body declares
    // `.glass-dock { --motion-weight: 0 }`.
    const shape = squish(stripCss(shapeRaw));
    const carve =
        /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{[^@]*?\.glass-dock\s*\{[^}]*--motion-weight\s*:\s*0[^}]*\}/.test(
            shape,
        );
    facts.prmCarve = carve;
    if (!carve) {
        violations.push(
            "C6: the dock-scope PRM carve is missing — dock/shape.css must declare `.glass-dock { --motion-weight: 0 }` under `@media (prefers-reduced-motion: reduce)` (the punch amplitude flattens to 1 under reduce)",
        );
    }

    return { violations, facts };
}

// ── C7: lightningcss-form-aware built-bundle substring (optional) ────────────
function detectBuiltBundle() {
    const violations = [];
    const facts = {};

    const distPath = resolve(ROOT, DIST_CSS);
    if (!existsSync(distPath)) {
        facts.builtBundlePresent = false;
        facts.builtBundleNote = `${DIST_CSS} absent — befitting-skip (source is the authoritative device-free arm; the built arm binds only when a build has run)`;
        return { violations, facts };
    }
    facts.builtBundlePresent = true;

    const dist = readFileSync(distPath, "utf8");
    // lightningcss-form-aware: `paint` IMMEDIATELY after `contain:` is the bare
    // paint clip — `contain:layout paint`/`contain:content` (the retired `layout
    // style paint` minifies to `content`) do NOT match (they start with a
    // different keyword), so a re-introduced multi-axis dialect on a content
    // surface would NOT satisfy this arm. Tolerant of the spaced `/styles` form
    // AND a minified `contain:paint`.
    const bareClip = /contain:\s*paint(?![a-z-])/.test(dist);
    facts.builtClipSurvives = bareClip;
    if (!bareClip) {
        violations.push(
            `C7: the built ${DIST_CSS} carries NO bare \`contain: paint\` substring — the narrowed clip register did not survive the build (a comment-only clip would green the source arm but never paint)`,
        );
    }

    return { violations, facts };
}

export function detect() {
    const c1 = detectRegister();
    const c2 = detectDialectsRetired();
    const c3 = detectExclusions(c1.selectors);
    const c4 = detectRadiusAlongside();
    const c5 = detectCastAbsent();
    const c6 = detectMotionWeightCarve();
    const c7 = detectBuiltBundle();
    // the self-test bites run EVERY run (the proof-glass-idiom-factor "proven
    // every run" discipline) — a bite that loses its teeth REDs the gate.
    const biteFails = selfTest();
    return {
        violations: [
            ...c1.violations,
            ...c2.violations,
            ...c3.violations,
            ...c4.violations,
            ...c5.violations,
            ...c6.violations,
            ...c7.violations,
            ...biteFails,
        ],
        facts: {
            c1: c1.facts,
            c2: c2.facts,
            c3: c3.facts,
            c4: c4.facts,
            c5: c5.facts,
            c6: c6.facts,
            c7: c7.facts,
            selfTestOk: biteFails.length === 0,
        },
    };
}

// ── the self-test bites (--self-test) — the anti-gameability arm ─────────────
function selfTest() {
    const fails = [];

    // C1 bite (a) — a material WITHOUT the register must red (0 clip rules).
    const noRegister = ".glass-card { position: relative; }";
    if (extractClipRule(noRegister).count !== 0) {
        fails.push("self-test C1a: a material with no clip register was mis-counted as having one (the register-present detector has no teeth)");
    }
    // C1 bite (b) — a DOUBLED clip declaration must be counted as >1.
    const doubled = ".glass-card { contain: paint; } .x { contain: paint; }";
    if (extractClipRule(doubled).count <= 1) {
        fails.push("self-test C1b: a doubled `contain: paint` was NOT counted as >1 (the declared-once detector has no teeth)");
    }
    // C1 bite (c) — a register MISSING an INCLUDED surface must be detectable.
    const partial = extractClipRule(".glass-card, .glass-btn { contain: paint; }").rules[0].selectors;
    if (INCLUDED.filter((s) => !partial.includes(s)).length === 0) {
        fails.push("self-test C1c: a register omitting `.glass-wash`/`.glass-quiet`/`.glass-resting` was NOT flagged (the INCLUDED-complete detector has no teeth)");
    }

    // C2 bite — a surviving surfaces `contain:` must be caught.
    const survivor = ".glass-btn { contain: paint; }";
    if ((stripCss(survivor).match(/(?<![\w-])contain\s*:/g) || []).length === 0) {
        fails.push("self-test C2: a surviving surfaces `contain:` dialect was NOT detected (the no-dialect detector has no teeth)");
    }

    // C3 bite — a clip rule listing an EXCLUDED selector must be flagged.
    const rewidened = extractClipRule(".glass-card, .glass-overlay { contain: paint; }").rules[0].selectors;
    if (EXCLUDED.filter((s) => rewidened.includes(s)).length === 0) {
        fails.push("self-test C3: a clip register re-widened onto `.glass-overlay` was NOT flagged (the exclusion detector has no teeth)");
    }

    // C5 bite — a re-introduced `.cartoon-cast` selector / class must be caught.
    if (!/\.cartoon-cast\b/.test(".glass-dock > .cartoon-cast { }")) {
        fails.push("self-test C5a: a `.cartoon-cast` selector slipped the cast-absent detector");
    }
    if (!/class="cartoon-cast"/.test('<span class="cartoon-cast"></span>')) {
        fails.push("self-test C5b: a `class=\"cartoon-cast\"` slipped the cast-absent detector");
    }

    // C6 bite — a shape WITHOUT the PRM carve must red.
    const noCarve = squish(".glass-dock { --motion-weight: 1; }");
    if (
        /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{[^@]*?\.glass-dock\s*\{[^}]*--motion-weight\s*:\s*0[^}]*\}/.test(
            noCarve,
        )
    ) {
        fails.push("self-test C6: a shape without the PRM `--motion-weight: 0` carve was falsely greened (the carve detector has no teeth)");
    }

    return fails;
}

function run() {
    const selfTestMode = process.argv.includes("--self-test");
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_CLIP_ARTIFACT", "BG-glass-clip");

    if (selfTestMode) {
        const fails = selfTest();
        const ok = fails.length === 0;
        console.log("proof:glass-clip --self-test — the bite arm (anti-gameability)");
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
        gate: "proof:glass-clip",
        facts,
        violations,
    });

    console.log(
        "proof:glass-clip — the ONE narrowed paint-box clip register + the dock-cast retire — BG.W-GLASS-CLIP-DISCIPLINE",
    );
    console.log(
        `  C1 register       : ${facts.c1.clipRuleCount ?? 0} clip rule(s) (expect 1)   INCLUDED complete: ${facts.c1.includedComplete ? "✓" : "✗"}`,
    );
    console.log(
        `  C2 dialects retired: ${facts.c2.survivingContainDecls ?? "?"} surviving surfaces \`contain:\` (expect 0)`,
    );
    console.log(`  C3 exclusions held : ${facts.c3.exclusionsHeld ? "✓ overlay+dock un-clipped" : "✗ RE-WIDENED"}`);
    console.log(
        `  C4 radius alongside: card=${facts.c4.cardRadius ? "✓" : "✗"} btn=${facts.c4.btnRadius ? "✓" : "✗"} pseudo-inherit=${facts.c4.pseudoInherit ? "✓" : "✗"}`,
    );
    console.log(
        `  C5 cast absent     : shape=${facts.c5.shapeCastAbsent ? "✓" : "✗"} vue=${facts.c5.vueCastAbsent ? "✓" : "✗"}`,
    );
    console.log(`  C6 PRM carve       : ${facts.c6.prmCarve ? "✓ --motion-weight:0 under reduce" : "✗ MISSING"}`);
    console.log(
        `  C7 built bundle    : ${facts.c7.builtBundlePresent ? (facts.c7.builtClipSurvives ? "✓ contain:paint survives" : "✗ MISSING") : "— (dist absent, skipped)"}`,
    );
    console.log(`  self-test bites    : ${facts.selfTestOk ? "all teeth ✓" : "✗ BROKE"}`);

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
