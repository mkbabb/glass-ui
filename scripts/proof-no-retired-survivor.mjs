#!/usr/bin/env node
// proof:no-retired-survivor — AY.W-LEG1 (the AX.W27a/b gate NEVER written;
// the AX hardening-corpus falsely asserted it was "authored W21 / registered W33").
//
// MIGRATION.md is BINDING (L invariant 16). Every "RETIRED" claim it makes is a
// promise that the named artefact — a `@mkbabb/glass-ui/<x>` subpath, a `src/…`
// component dir, an exported symbol, a `--<token>` — is GONE. A half-landed
// retirement that the migration guide asserts as complete is the exact
// headless-green / doc-says-done-but-reverted failure class: at HEAD,
// `MIGRATION.md:800` declares `metric-cell` + `metric-stack` RETIRED while the
// dirs/subpath-barrels/package.json-exports/api-re-exports all SURVIVE (speedtest
// re-adopted them). A consumer reading the guide is misled.
//
// This gate resolves each RETIRED claim's named artefacts to their on-disk
// reality and REDs on any survivor — so a binding-doc retirement lie cannot ride
// again. It does NOT re-retire a live-consumed family; the honest fix for the
// metric lie is the doc correction (the MIGRATION.md entry rewritten to the
// truth: un-retired, speedtest-consumed), which this gate then verifies stays
// honest.
//
// THE CLAIM MODEL. A RETIRED claim is a MIGRATION.md heading or bullet carrying
// the word `RETIRED`. From its text we extract the named artefacts:
//   - SUBPATH — a `@mkbabb/glass-ui/<x>` ref OR a `/<x>` slash-subpath in the
//     claim → must be ABSENT from package.json `exports` + `typesVersions`.
//   - DIR — a `<x>/` component-dir ref → the dir must NOT exist under
//     `src/components/{ui,custom}/<x>` and no `src/subpaths/<x>.ts` /
//     `src/<x>.ts` barrel may survive.
//   - EXPORT — a backticked Capitalized identifier the claim says is deleted →
//     ABSENT from `src/index.ts` + `src/api/index.ts`.
//   - TOKEN — a `--<x>` token the claim says is removed → ABSENT from
//     `src/styles/`.
// To stay precise (a RETIRED bullet often names the NEW live surface too — e.g.
// "flat `/dark` + `/keyboard`"), the gate keys off the EXPLICITLY-retired
// artefacts each claim enumerates, declared in RETIRED_CLAIMS below (parsed +
// machine-checked, the prose is the human half).
//
// SELF-PROVING: a synthetic RETIRED claim naming a definitely-present subpath
// (`/dock`) is evaluated every run and MUST flag — the bite proof. If it does
// not, the gate reds loudly.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:no-retired-survivor";
const MIGRATION = join(ROOT, "MIGRATION.md");

// ── Survival probes (PURE over the file system / loaded source) ────────────────

/** A claimed-retired SUBPATH survives if package.json still exports it. */
function subpathSurvives(name, pkg) {
    const exportKey = `./${name}`;
    const inExports = Object.prototype.hasOwnProperty.call(pkg.exports ?? {}, exportKey);
    const tv = pkg.typesVersions?.["*"] ?? {};
    const inTypesVersions = Object.prototype.hasOwnProperty.call(tv, name);
    return inExports || inTypesVersions;
}

/** A claimed-retired component DIR survives if the dir or a barrel for it exists. */
function dirSurvives(name) {
    const candidates = [
        join(ROOT, "src/components/ui", name),
        join(ROOT, "src/components/custom", name),
        join(ROOT, "src/subpaths", `${name}.ts`),
        join(ROOT, "src", `${name}.ts`),
    ];
    return candidates.find((p) => existsSync(p)) ?? null;
}

/** A claimed-retired EXPORT survives if a barrel still re-exports the symbol. */
function exportSurvives(symbol, barrels) {
    const re = new RegExp(`\\b${symbol}\\b`);
    for (const [rel, src] of barrels) if (re.test(src)) return rel;
    return null;
}

/** A claimed-retired TOKEN survives if any styles/ file still declares it. */
function tokenSurvives(token, stylesSrc) {
    // `--metric-row-*` → the family stem; a literal `--x` → exact.
    const stem = token.replace(/-\*$/, "");
    return stylesSrc.includes(stem);
}

// ── The declared RETIRED claims — each located BY NAME, artefacts machine-checked ─
// EACH claim carries a `find` regex matching the UNIQUE retirement-asserting line
// it owns (a marker phrase / wave tag the doc line carries verbatim) — the gate
// LOCATES the line by searching MIGRATION.md for the first line that matches
// `find` AND carries `RETIRED`, rather than a hard-coded line number. Inserting a
// new MIGRATION row above a claim no longer drifts its anchor (the AY.W-LEG1 line-
// number-coupling class, closed). The artefact lists are the concrete promise each
// claim makes. This keeps the gate precise: a bullet that names BOTH the retired
// AND the live-replacement surface (the common shape) only asserts the RETIRED side.
const RETIRED_CLAIMS = [
    {
        // The demo warm-red interactive preset (--demo-nav-accent → --viz-fourier)
        // retired at AZ.W-REGISTER-IOS. The artefact is DEMO-side CSS, outside this
        // gate's src probes — the BINDING machine check is proof:register-ios's
        // negative predicate (no interactive-state rule reads --viz-fourier /
        // --demo-nav-accent across src/styles/** + demo/**). Anchored here so the
        // coverage guard knows the claim is owned.
        label: "the demo nav-accent red interactive preset (machine-locked by proof:register-ios)",
        find: /preset is RETIRED \(the demo consumes the neutral root register/,
    },
    {
        label: "v3.10.0 AY-prune subpaths deck-progress/instrument-rail (NARROWED at AZ.W-PRUNE2 — header-ribbon/glass-panel RESTORED, keyframes-consumed)",
        find: /\*\*v3\.10\.0 \(AY, NARROWED at AZ\.W-PRUNE2\)\*\*.*RETIRED/,
        subpaths: ["deck-progress", "instrument-rail"],
        dirs: ["deck-progress", "instrument-rail"],
    },
    {
        label: "nested composables/dark + composables/keyboard subpaths",
        find: /Nested `composables\/dark` \+ `composables\/keyboard` subpaths RETIRED/,
        subpaths: ["composables/dark", "composables/keyboard"],
    },
    {
        label: "pagination/virtual composables + subpaths",
        find: /RETIRED composables: `useOffsetPagination`/,
        subpaths: ["pagination", "virtual"],
        exports: [
            "useOffsetPagination",
            "useVirtualSectionWindow",
            "useWindowedStore",
            "virtualSectionLayout",
        ],
    },
    {
        label: "demo-private <DockShowcaseFrame> primitive",
        find: /RETIRED primitive: demo-private `<DockShowcaseFrame>`/,
        exports: ["DockShowcaseFrame"],
    },
    // ── BA cut (4.0.0) retirements — anchored here for the coverage guard; the
    // BINDING "is it actually gone" machine check rides each wave's own gate
    // (the established pattern: the demo nav-accent claim above is artefact-less,
    // proof:register-ios is its binding check). ──────────────────────────────────
    {
        label: "the SegmentedTabs overflow=scroll/auto axis (W-TABS; machine-locked by proof:tabs-std)",
        find: /`overflow="scroll" \/ "auto"` axis RETIRED/,
    },
    {
        label: "DialogContent variant=glass|opaque (W-SURFACE-AXIS; machine-locked by proof:surface-axis)",
        find: /`<DialogContent variant="glass\|opaque">` is RETIRED/,
    },
    {
        label: "CarouselDots onto <PagerDots> (W-PAGER; machine-locked by proof:pager)",
        find: /\*\*BA\.W-PAGER — `CarouselDots` RETIRED onto `<PagerDots>`/,
    },
    {
        // The /underline subpath is gone from package.json exports (the binding
        // artefact); proof:handmark verifies the DEC-8 fold. The /underline
        // subpath-history cross-mention (the "NEW subpath … RETIRED at the BA cut"
        // line) is a back-reference to this claim.
        label: "GlassUnderline + /underline subpath onto <HandMark> (W-HANDMARK; machine-locked by proof:handmark)",
        find: /\*\*BA\.W-HANDMARK — `GlassUnderline` \+ the `\/underline` subpath RETIRED/,
        subpaths: ["underline"],
    },
    {
        // BB.W-METAL-SHIMMER — the gold-only @keyframes gold-shimmer-slide retired
        // onto the parameterized metal-shimmer-sweep. The artefact is a CSS keyframe
        // NAME (outside this gate's src/subpath/export/token probes); the BINDING
        // machine check is proof:metal-shimmer (the keyframe-absent + re-point arm).
        // Anchored here for the coverage guard.
        label: "the gold-shimmer-slide keyframe onto metal-shimmer-sweep (W-METAL-SHIMMER; machine-locked by proof:metal-shimmer)",
        find: /\*\*BB\.W-METAL-SHIMMER — the `@keyframes gold-shimmer-slide` RETIRED/,
    },
    {
        label: "the disco CTA keyframes/tokens (W-GLASS-CAL; machine-locked by proof:glass-cal)",
        find: /`@keyframes sparkle-sweep` \/ `btn-gold-bg-sweep`.*\| RETIRED/,
    },
    {
        // BB.W-SCROLL-FADE-RETIRE — the static .scroll-fade-* utility rules + the
        // --mask-fade-width token retired at the 4.1.0 cut (clean break). The
        // artefacts are CSS (outside this gate's src/subpath probes); the BINDING
        // machine check is proof:fading-scroll's W6 DEFINITION-ABSENT + token-absent
        // + dist-absent arms. Anchored here for the coverage guard.
        label: "the static .scroll-fade-* utilities + --mask-fade-width token (W-SCROLL-FADE-RETIRE; machine-locked by proof:fading-scroll W6)",
        find: /were RETIRED at the 4\.1\.0 cut — BB\.W-SCROLL-FADE-RETIRE/,
    },
    {
        // BB.W-LENSING — the crude AW.W23 uniform-radial displacement map retired
        // (the .glass-refract → .glass-lens class rename composes the EVOLVED
        // squircle bevel-profile filter). The artefact is the SVG filter map (CSS,
        // outside this gate's probes); the BINDING machine check is proof:lensing.
        // Anchored here for the coverage guard.
        label: "the crude AW.W23 uniform-radial lens map onto the squircle bevel-profile filter (W-LENSING; machine-locked by proof:lensing)",
        find: /the crude AW\.W23 uniform-radial map is RETIRED/,
    },
    {
        // BB.W-LIQUID-REVEAL — the @utility popover-animate + @utility
        // slide-in-from-side bezier-zoom-95 enter recipes retired onto the
        // spring-clocked .glass-reveal. The artefacts are CSS @utility bodies
        // (outside this gate's probes); the BINDING machine check is
        // proof:liquid-reveal / proof:no-dual-path D1. Anchored here for the guard.
        label: "the popover-animate + slide-in-from-side enter utilities onto .glass-reveal (W-LIQUID-REVEAL; machine-locked by proof:liquid-reveal)",
        find: /`@utility slide-in-from-side` are RETIRED, replaced by the spring-clocked LIQUID-ENTER recipe/,
    },
    {
        // BC.W-DOCK-STACK-RAIL — the AZ divider-carousel rail (DockRail + DockRailItem)
        // retired clean onto the macOS hover-expand <DockStack> + DockStackItem (no alias).
        // The EXPORTS DockRail + DockRailItem are the binding artefacts (ABSENT from
        // src/index.ts + src/api/index.ts); the deeper retire (the SFC, the rail-extend.css
        // chip partial, the measureSeam/--dock-rail-seam-offset seam-locator) is machine-
        // locked by proof:dock-stack-rail's S1 DEFINITION-ABSENT arm.
        label: "DockRail + DockRailItem onto <DockStack> + DockStackItem (W-DOCK-STACK-RAIL; machine-locked by proof:dock-stack-rail S1)",
        find: /\*\*BC\.W-DOCK-STACK-RAIL — `<DockRail>` \+ `DockRailItem` RETIRED onto the macOS/,
        exports: ["DockRail", "DockRailItem"],
    },
    // NOTE: the metric-cell + metric-stack families are NOT retired — they ship,
    // speedtest-consumed (MIGRATION.md §"KEPT (speedtest-consumed)", corrected
    // here from the AV.W10 doc lie). They are deliberately absent from this list:
    // a RETIRED claim for a live-consumed family would be the lie this gate exists
    // to forbid. The gate stays honest by the un-retirement doc correction, not by
    // listing them as retired.
];

// ── BACK-REFERENCE lines — RETIRED-bearing lines that point at an ALREADY-declared
// claim (NOT a new retirement assertion). Located BY NAME (a unique marker phrase),
// same robustness as the claims: a new MIGRATION row above them never drifts the
// anchor. Each is verified to resolve to exactly one line carrying `RETIRED`.
const BACKREF_FINDS = [
    // The /underline subpath-history cross-mention → the BA.W-HANDMARK claim.
    /NEW subpath: `@mkbabb\/glass-ui\/underline`.*RETIRED at the BA cut/,
    // "…the v0.9.4 nested form `composables/dark` is RETIRED—see §2" → the line-305
    // composables/dark claim.
    /the v0\.9\.4 nested form `composables\/dark` is RETIRED—see §2/,
];

/**
 * Evaluate a single claim → violation strings. PURE over the loaded inputs so the
 * self-test can drive a synthetic claim.
 *
 * @param {object} claim
 * @param {{pkg:object, barrels:[string,string][], stylesSrc:string}} ctx
 * @returns {string[]}
 */
export function evaluateClaim(claim, ctx) {
    const v = [];
    for (const sp of claim.subpaths ?? []) {
        if (subpathSurvives(sp, ctx.pkg))
            v.push(
                `${claim.label}: subpath "@mkbabb/glass-ui/${sp}" is claimed RETIRED but package.json still exports it`,
            );
    }
    for (const d of claim.dirs ?? []) {
        const hit = dirSurvives(d);
        if (hit)
            v.push(
                `${claim.label}: dir/barrel "${d}" is claimed RETIRED but survives at ${hit.slice(ROOT.length + 1)}`,
            );
    }
    for (const e of claim.exports ?? []) {
        const hit = exportSurvives(e, ctx.barrels);
        if (hit)
            v.push(`${claim.label}: export "${e}" is claimed RETIRED but survives in ${hit}`);
    }
    for (const t of claim.tokens ?? []) {
        if (tokenSurvives(t, ctx.stylesSrc))
            v.push(`${claim.label}: token "${t}" is claimed RETIRED but survives in src/styles/`);
    }
    return v;
}

// ── Load the inputs ────────────────────────────────────────────────────────
function loadBarrels() {
    const rels = ["src/index.ts", "src/api/index.ts"];
    return rels
        .map((rel) => [rel, existsSync(join(ROOT, rel)) ? readFileSync(join(ROOT, rel), "utf8") : ""])
        .filter(([, src]) => src.length > 0);
}

function loadStyles() {
    // Concatenate every styles/ file's text — a token survives if ANY declares it.
    const dir = join(ROOT, "src/styles");
    if (!existsSync(dir)) return "";
    let out = "";
    const walk = (d) => {
        for (const n of readdirSync(d)) {
            const p = join(d, n);
            if (statSync(p).isDirectory()) walk(p);
            else if (n.endsWith(".css")) out += readFileSync(p, "utf8") + "\n";
        }
    };
    walk(dir);
    return out;
}

function run() {
    const md = existsSync(MIGRATION) ? readFileSync(MIGRATION, "utf8") : "";
    if (!md) {
        console.error(`[proof:no-retired-survivor] MIGRATION.md not found: ${MIGRATION}`);
        process.exit(1);
    }
    const mdLines = md.split("\n");
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
    const barrels = loadBarrels();
    const stylesSrc = loadStyles();
    const ctx = { pkg, barrels, stylesSrc };

    const violations = [];

    // Locate each declared claim BY NAME — the first line matching its `find`
    // regex AND carrying `RETIRED`. A `find` that matches NOTHING (the claim's
    // marker text vanished or was edited away) is a hard fail-loud: the claim has
    // drifted off the doc and the gate must not green vacuously. (The artefact
    // check below is the binding "is it actually gone" probe; this locates + proves
    // the claim line is still present.)
    const declaredLines = new Set();
    for (const claim of RETIRED_CLAIMS) {
        const idx = mdLines.findIndex(
            (ln) => /RETIRED/.test(ln) && claim.find.test(ln),
        );
        if (idx === -1) {
            violations.push(
                `${claim.label}: the declared RETIRED claim's marker (${claim.find}) matches NO line carrying "RETIRED" in MIGRATION.md — the claim drifted off the doc. Restore the retirement assertion OR update the claim's \`find\` marker.`,
            );
            // Still evaluate artefacts (a surviving artefact for a vanished claim is
            // its own violation; both surface).
            violations.push(...evaluateClaim(claim, ctx));
            continue;
        }
        declaredLines.add(idx + 1);
        claim.locatedLine = idx + 1;
        violations.push(...evaluateClaim(claim, ctx));
    }

    // Coverage guard — every MIGRATION.md line that ASSERTS a retirement must be
    // anchored by a declared claim (or be a back-reference to one). A NEW RETIRED
    // line not on this set is an un-checked claim that could ride a fresh lie —
    // flagged so the declared claim list cannot silently fall behind the doc.
    // Back-reference lines (a RETIRED-bearing line pointing at an ALREADY-declared
    // claim) are located BY NAME too — the same line-number-drift-proof discipline.
    const backrefLines = new Set();
    for (const find of BACKREF_FINDS) {
        const idx = mdLines.findIndex((ln) => /RETIRED/.test(ln) && find.test(ln));
        if (idx === -1) {
            violations.push(
                `BACKREF: the back-reference marker (${find}) matches NO line carrying "RETIRED" in MIGRATION.md — update or remove the stale back-reference.`,
            );
            continue;
        }
        backrefLines.add(idx + 1);
    }
    mdLines.forEach((ln, i) => {
        const n = i + 1;
        if (!/RETIRED/.test(ln)) return;
        if (declaredLines.has(n) || backrefLines.has(n)) return;
        violations.push(
            `MIGRATION.md:${n} asserts RETIRED but is not anchored by a declared claim in RETIRED_CLAIMS — add it (with its named artefacts) so the retirement is machine-checked, or mark it a back-reference.`,
        );
    });

    // SELF-TEST — a synthetic RETIRED claim naming a definitely-LIVE subpath
    // (`/dock`) MUST flag. The bite proof, every run.
    const selfFlag = evaluateClaim(
        { label: "SELFTEST", subpaths: ["dock"] },
        ctx,
    );
    if (selfFlag.length === 0) {
        console.error(
            "[proof:no-retired-survivor] SELF-TEST FAILED — a synthetic RETIRED claim for the LIVE /dock subpath was NOT flagged; the gate is not load-bearing.",
        );
        process.exit(1);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GATE_NO_RETIRED_SURVIVOR_OUT", "AY-no-retired-survivor");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:no-retired-survivor",
        command: COMMAND,
        claims: RETIRED_CLAIMS.map((c) => c.label),
        violations,
    });

    console.log("proof:no-retired-survivor — every MIGRATION.md RETIRED claim resolves to absent (AY.W-LEG1)");
    console.log(`  MIGRATION.md          : ${MIGRATION.slice(ROOT.length + 1)}`);
    console.log(`  RETIRED claims checked: ${RETIRED_CLAIMS.length}`);
    console.log(`  self-test (bite proof): OK — synthetic /dock RETIRED claim flagged`);
    console.log(`  violations            : ${violations.length}`);
    for (const v of violations) console.error(`  ${v}`);

    if (status === "fail") {
        console.error(
            `\n[proof:no-retired-survivor] ${violations.length} surviving retired artefact(s) — a MIGRATION.md RETIRED claim is a binding promise (L inv 16). Re-land the retirement OR rewrite the claim to the truth.`,
        );
        process.exit(1);
    }
    console.log(
        "\n[proof:no-retired-survivor] every RETIRED claim resolves to zero surviving dir/subpath/export/token.",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
