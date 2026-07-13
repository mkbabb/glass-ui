// proof:focal-complete — BG.W-FIELD-AURORA (M2): the route-FOCAL enumeration is
// CONSISTENT. On a focal route the shell `<Aurora>` stands down, so exactly ONE GL
// context mounts per route (the never-2-contexts law on Safari's per-window GL
// budget). This gate proves the ENUMERATION is consistent — NOT the runtime law
// (the async-dispose/WebKit-budget race can leave 2 live contexts while this gate
// greens). THE CLOSE HINGES ON THE LIVE MONOTONIC-GL CAPTURE, never this gate alone.
//
// The witnesses (device-free):
//   C1 — the resolver is WIRED: router.ts threads `isFocalRoute` into `meta.focal`
//        for both the story routes and the section landings (no hand-set focal flag).
//   C2 — SELF_STAGES_GL ⊇ the committed grep of `<DockStage` over the routed SFCs.
//        A SELF-STAGE route that mounts GL outside the `background` channel MUST be
//        enrolled — so adding a new DockStage route without enrolling it REDs the
//        gate (the silent "shell + DockStage = 2 GL" drift is closed). The grep is a
//        committed subprocess bite, not a manual one-off.
//   C3 — the resolver is TOTAL: GL_BG_KINDS carries the 4 full-bleed GL kinds, and
//        every manifest row whose resolved background.kind ∈ GL_BG_KINDS is focal by
//        construction (a focal-without-a-field is impossible — isFocalRoute checks
//        the kind first). NOTE: C3 is a one-GL ENUMERATION tautology — it never
//        verifies a focal route MOUNTS a field, so it GREENED OVER the 17.6 warm-
//        field defect; C4 is the missing regression guard.
//   C4 — BG.W-PAGE-COMPONENT-AUDIT (17.6): the shell-field suppression is HERO-
//        GATED. The landed fix DECOUPLES shell-field suppression onto
//        `suppressesShellField(routeId, bg, isHeroPage)` (the chromatic-field arm
//        `isHeroPage`-gated), so a non-hero GL-background CONTENT page KEEPS the
//        warm shell `<Aurora>` (navigation/tabs, motion/scroll) and an achromatic
//        constellation/fourier hero keeps it as an UNDERPAINT (compositions/hero).
//        C4 machine-locks: the fn is hero-gated, CHROMATIC_FIELD_KINDS excludes the
//        achromatic line-art, both router call sites thread the hero flag, and
//        shellFieldActive reads meta.suppressesShellField (not meta.focal).
//
// Self-test bites (--self-test): C2 drops a DockStage route from SELF_STAGES_GL and
// asserts C2 would RED; C4-bite-1 drops the `isHeroPage &&` gate from the chromatic
// arm (the pre-fix shape) and C4-bite-2 re-wires shellFieldActive off meta.focal —
// each must make C4 RED (the born-RED warm-field-defect teeth).

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:focal-complete";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
const stripTs = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── Parse focal.ts — GL_BG_KINDS + SELF_STAGES_GL ─────────────────────────────
const focalSrc = stripTs(read("demo/chassis/hero/focal.ts"));
function parseStringSet(src, name) {
    const m = src.match(new RegExp(`${name}[^=]*=\\s*new Set\\(\\[([\\s\\S]*?)\\]\\)`));
    if (!m) return new Set();
    return new Set([...m[1].matchAll(/["']([\w/-]+)["']/g)].map((x) => x[1]));
}
const GL_BG_KINDS = parseStringSet(focalSrc, "GL_BG_KINDS");
const SELF_STAGES_GL = parseStringSet(focalSrc, "SELF_STAGES_GL");
const CHROMATIC_FIELD_KINDS = parseStringSet(focalSrc, "CHROMATIC_FIELD_KINDS");

// ── Parse the manifest — story ids + resolved backgrounds + category defaults ──
const manifest = stripTs(read("demo/stories/manifest.ts"));
const BG_KINDS = new Set([
    "aurora",
    "constellation",
    "fourier",
    "liquid-grid",
    "grid",
    "paper",
]);
const defaultMapBlock = (() => {
    const m = manifest.match(
        /CATEGORY_DEFAULT_BG\s*:\s*Record<[^>]*>\s*=\s*\{([\s\S]*?)\};/,
    );
    return m ? m[1] : "";
})();
const categoryDefaults = new Map();
for (const m of defaultMapBlock.matchAll(/(\w[\w-]*)\s*:\s*["']([\w-]+)["']/g)) {
    if (BG_KINDS.has(m[2])) categoryDefaults.set(m[1], m[2]);
}
// Every s() row: category + id + explicit-kind → resolved kind.
const rows = [];
{
    const re = /\bs\(\s*["'](\w[\w-]*)["']\s*,\s*["']([\w-]+)["']/g;
    let m;
    while ((m = re.exec(manifest)) !== null) {
        const cat = m[1];
        const id = m[2];
        const next = manifest.indexOf("s(", re.lastIndex);
        const end = next === -1 ? Math.min(manifest.length, re.lastIndex + 800) : next;
        const window = manifest.slice(re.lastIndex, end);
        const bm =
            window.match(/background:\s*["']([\w-]+)["']/) ||
            window.match(/background:\s*\{\s*kind:\s*["']([\w-]+)["']/);
        const kind = bm && BG_KINDS.has(bm[1]) ? bm[1] : categoryDefaults.get(cat);
        rows.push({ routeId: `${cat}/${id}`, cat, id, kind });
    }
}
const storyIds = new Set(rows.map((r) => r.routeId));

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── C1 — the resolver is WIRED into router.ts meta.focal ──────────────────────
const routerSrc = stripTs(read("demo/router.ts"));
// The focal resolver re-homed to demo/chassis/hero/focal.ts (BH.B3 δ34).
const importsResolver = /import\s*\{[^}]*\bisFocalRoute\b[^}]*\}\s*from\s*["']\.\/chassis\/hero\/focal["']/.test(
    routerSrc,
);
const threadsStoryFocal = /focal:\s*isFocalRoute\(\s*`\$\{category\.id\}\/\$\{story\.id\}`/.test(
    routerSrc,
);
const threadsLandingFocal = /focal:\s*isFocalRoute\(\s*category\.id\b/.test(routerSrc);
const c1 = importsResolver && threadsStoryFocal && threadsLandingFocal;
add(
    "c1-resolver-wired-into-meta-focal",
    c1,
    c1
        ? "router.ts imports `isFocalRoute` and threads it into `meta.focal` for BOTH the story routes and the section landings (no hand-set focal flag)"
        : `router.ts does not wire the resolver (imports=${importsResolver} story-focal=${threadsStoryFocal} landing-focal=${threadsLandingFocal})`,
);

// ── C2 — SELF_STAGES_GL ⊇ the grep of `<DockStage` over routed SFCs ───────────
function dockStageRouteIds() {
    let out = "";
    try {
        out = execSync('grep -rl "<DockStage" demo/stories', {
            cwd: ROOT,
            encoding: "utf8",
        });
    } catch (e) {
        // grep exits 1 when no match — treat as empty.
        out = e.stdout ? String(e.stdout) : "";
    }
    const ids = new Set();
    for (const line of out.split("\n")) {
        const m = line.match(/demo\/stories\/([\w-]+)\/([\w-]+)\.vue$/);
        if (!m) continue;
        const routeId = `${m[1]}/${m[2]}`;
        // Only a routed STORY SFC counts (DockStage.vue / DockExampleTile.vue are
        // helpers, not routes — they are not manifest story ids).
        if (storyIds.has(routeId)) ids.add(routeId);
    }
    return ids;
}
const dockStageRoutes = dockStageRouteIds();
const c2Missing = [...dockStageRoutes].filter((r) => !SELF_STAGES_GL.has(r));
const c2 = dockStageRoutes.size > 0 && c2Missing.length === 0;
add(
    "c2-self-stages-superset-of-dockstage-grep",
    c2,
    c2
        ? `SELF_STAGES_GL ⊇ the {<DockStage} grep over routed SFCs (${dockStageRoutes.size} DockStage routes, all enrolled): ${[...dockStageRoutes].sort().join(", ")}`
        : `SELF_STAGES_GL is MISSING DockStage routes (the silent 2-GL drift): ${c2Missing.join(", ") || "(grep found 0 routes — the bite is inert)"}`,
);

// ── C3 — the resolver is TOTAL (GL_BG_KINDS complete + every GL-kind row focal) ─
// BI.W-AUTH-SHELL-BG — `"fourier"` RETIRED from GL_BG_KINDS (no route declares a live
// fourier wash — the heaviest shader is never an ambient page-background). The three
// surviving full-bleed GL kinds: aurora · constellation · liquid-grid.
const expectGlKinds = ["aurora", "constellation", "liquid-grid"];
const glKindsComplete = expectGlKinds.every((k) => GL_BG_KINDS.has(k));
const glRows = rows.filter((r) => GL_BG_KINDS.has(r.kind));
// Every GL-kind row is focal by construction (isFocalRoute checks the kind first).
const glRowsFocal = glRows.every(
    (r) => GL_BG_KINDS.has(r.kind) || SELF_STAGES_GL.has(r.routeId),
);
const c3 = glKindsComplete && glRowsFocal && rows.length > 0;
add(
    "c3-resolver-total",
    c3,
    c3
        ? `GL_BG_KINDS carries the ${expectGlKinds.length} full-bleed GL kinds, and all ${glRows.length} GL-kind rows resolve focal by construction (no focal-without-a-field; ${rows.length} rows parsed)`
        : `the resolver is not total (gl-kinds-complete=${glKindsComplete} every-gl-row-focal=${glRowsFocal} rows=${rows.length})`,
);

// ── C4 — the shell-field suppression is HERO-GATED (BG.W-PAGE-COMPONENT-AUDIT
//    17.6 regression guard). C3 is a TAUTOLOGY (it filters GL rows then asserts
//    they are focal "by construction" — never verifying a focal route MOUNTS a
//    field), so it GREENED OVER the 17.6 defect: a GL-background CONTENT page
//    (non-hero) was flagged focal → the shell warm `<Aurora>` suppressed → but
//    `StoryHero` mounts the GL field ONLY on `variant==='hero'` → 0 GL contexts →
//    the neutral near-white/near-black base (navigation/tabs · motion/scroll ·
//    compositions/hero read NOT-WARM at the roster probe box; meanChroma 0.003-
//    0.008 vs the warm floor — the paint-judge FAIL). The landed fix DECOUPLES
//    shell-field suppression onto `suppressesShellField(routeId, bg, isHeroPage)`
//    (the chromatic-field arm HERO-GATED) so a non-hero GL-background page KEEPS
//    the warm shell field, and an achromatic constellation/fourier hero keeps it
//    as an UNDERPAINT. C4 machine-locks that decoupling so the defect class cannot
//    silently regress (the two born-RED self-test bites below prove the teeth).
function detectHeroGatedSuppression(focalSource, routerSource) {
    const chromatic = parseStringSet(focalSource, "CHROMATIC_FIELD_KINDS");
    // (a) the resolver exists + carries the isHeroPage param (the decoupled gate).
    const fnDecl =
        /export function suppressesShellField\(\s*routeId[^)]*isHeroPage\s*:\s*boolean[^)]*\)/.test(
            focalSource,
        );
    // (b) the chromatic-field arm is HERO-GATED: the parenthesized arm that reads
    //     CHROMATIC_FIELD_KINDS.has(kind) BEGINS with `isHeroPage &&`, so a NON-hero
    //     GL-background CONTENT page does NOT suppress the warm shell field (the
    //     exact 17.6 defect guard — dropping this `&&` re-strips the whole nav/
    //     motion content band).
    const heroGatedArm =
        /\(\s*isHeroPage\s*&&[\s\S]*?CHROMATIC_FIELD_KINDS\.has\(\s*kind\s*\)\s*\)/.test(
            focalSource,
        );
    // (c) CHROMATIC_FIELD_KINDS EXCLUDES the achromatic line-art (constellation/
    //     fourier) so a constellation hero KEEPS the warm shell UNDERPAINT (the
    //     compositions/hero dark-void kill), and INCLUDES a real chromatic field
    //     (aurora) that legitimately replaces the shell (the one-GL law).
    const chromaticExcludesLineArt =
        chromatic.has("aurora") &&
        !chromatic.has("constellation") &&
        !chromatic.has("fourier");
    // (d) router.ts threads the hero flag into suppressesShellField at BOTH call
    //     sites (a landing always mounts StoryHero → true; a story → story.hero).
    const landingThreads =
        /suppressesShellField\(\s*category\.id\s*,\s*category\.landing\??\.background\s*,\s*true\s*,?\s*\)/.test(
            routerSource,
        );
    const storyThreads =
        /suppressesShellField\(\s*`\$\{category\.id\}\/\$\{story\.id\}`\s*,\s*story\.background\s*,\s*story\.hero\s*===\s*true\s*,?\s*\)/.test(
            routerSource,
        );
    // (e) the shell-field gate reads meta.suppressesShellField (NOT meta.focal) —
    //     the decoupling that restores the warm field on a non-focal-but-content
    //     route while the one-GL `focal` enumeration (proof:focal-complete C1-C3)
    //     stays byte-unchanged for its own reader.
    const wiredToSuppresses =
        /shellFieldActive\.value\s*=\s*!\s*to\.meta\??\.suppressesShellField/.test(
            routerSource,
        );
    return {
        fnDecl,
        heroGatedArm,
        chromaticExcludesLineArt,
        landingThreads,
        storyThreads,
        wiredToSuppresses,
    };
}
const c4d = detectHeroGatedSuppression(focalSrc, routerSrc);
const c4 =
    c4d.fnDecl &&
    c4d.heroGatedArm &&
    c4d.chromaticExcludesLineArt &&
    c4d.landingThreads &&
    c4d.storyThreads &&
    c4d.wiredToSuppresses;
add(
    "c4-shell-field-suppression-hero-gated",
    c4,
    c4
        ? `suppressesShellField(routeId, bg, isHeroPage) is HERO-GATED — a non-hero GL-background CONTENT page KEEPS the warm shell field; CHROMATIC_FIELD_KINDS={${[...CHROMATIC_FIELD_KINDS].sort().join(",")}} excludes constellation/fourier (underpaint kept); router threads the hero flag at both call sites + shellFieldActive reads meta.suppressesShellField (the 17.6 warm-field defect class machine-locked)`
        : `the shell-field suppression is NOT hero-gated (fnDecl=${c4d.fnDecl} heroGatedArm=${c4d.heroGatedArm} chromaticExcludesLineArt=${c4d.chromaticExcludesLineArt} landingThreads=${c4d.landingThreads} storyThreads=${c4d.storyThreads} wiredToSuppresses=${c4d.wiredToSuppresses}) — the 17.6 defect (a non-hero GL-background page strips the warm shell field → 0 GL contexts → neutral base) is NOT closed`,
);

// ── self-test: the planted bite — drop a DockStage route from SELF_STAGES_GL ───
if (SELF_TEST) {
    const dropped = [...dockStageRoutes][0];
    const mutated = new Set([...SELF_STAGES_GL].filter((r) => r !== dropped));
    const wouldRed =
        dropped !== undefined &&
        [...dockStageRoutes].some((r) => !mutated.has(r));
    console.log("proof:focal-complete --self-test");
    console.log(
        `  ${wouldRed ? "✓" : "✗"} planted-bite — dropping "${dropped}" from SELF_STAGES_GL makes C2 RED (wouldRed=${wouldRed})`,
    );
    if (!wouldRed) {
        console.error("\n[self-test] the planted bite has NO teeth");
        process.exit(1);
    }

    // C4 bite 1 — the 17.6 defect re-introduced: DROP the `isHeroPage &&` gate from
    // the chromatic-field arm (the exact pre-fix shape). A non-hero GL-background
    // page would then suppress the shell warm field → 0 GL contexts → neutral base.
    const preFixFocal = focalSrc.replace(
        /\(\s*isHeroPage\s*&&([\s\S]*?CHROMATIC_FIELD_KINDS\.has\(\s*kind\s*\))\s*\)/,
        "($1)",
    );
    const biteHero = detectHeroGatedSuppression(preFixFocal, routerSrc);
    const c4LiveHeroGated = detectHeroGatedSuppression(focalSrc, routerSrc).heroGatedArm;
    const c4HeroBiteHasTeeth =
        preFixFocal !== focalSrc && c4LiveHeroGated && !biteHero.heroGatedArm;
    console.log(
        `  ${c4HeroBiteHasTeeth ? "✓" : "✗"} c4-bite-1 — dropping \`isHeroPage &&\` from the chromatic arm makes C4 RED (live=${c4LiveHeroGated}, mutated=${biteHero.heroGatedArm}, teeth=${c4HeroBiteHasTeeth})`,
    );

    // C4 bite 2 — the decoupling severed: re-wire shellFieldActive off meta.focal
    // (the pre-fix wire that conflated the one-GL enumeration with the warm-field
    // gate). A GL-background content page is focal → the shell field is stripped.
    const preFixRouter = routerSrc.replace(
        /shellFieldActive\.value\s*=\s*!\s*to\.meta\??\.suppressesShellField/,
        "shellFieldActive.value = !to.meta?.focal",
    );
    const biteWire = detectHeroGatedSuppression(focalSrc, preFixRouter);
    const c4LiveWired = detectHeroGatedSuppression(focalSrc, routerSrc).wiredToSuppresses;
    const c4WireBiteHasTeeth =
        preFixRouter !== routerSrc && c4LiveWired && !biteWire.wiredToSuppresses;
    console.log(
        `  ${c4WireBiteHasTeeth ? "✓" : "✗"} c4-bite-2 — re-wiring shellFieldActive off meta.focal makes C4 RED (live=${c4LiveWired}, mutated=${biteWire.wiredToSuppresses}, teeth=${c4WireBiteHasTeeth})`,
    );

    if (!c4HeroBiteHasTeeth || !c4WireBiteHasTeeth) {
        console.error("\n[self-test] a C4 hero-gating bite has NO teeth");
        process.exit(1);
    }

    console.log(
        "\n[self-test] the C2 DockStage-grep bite + the two C4 hero-gating bites have teeth",
    );
    process.exit(0);
}

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
console.log(
    "proof:focal-complete — the route-FOCAL enumeration is consistent (background.kind-derived + SELF_STAGES_GL; the runtime one-GL law rides the live capture) (BG.W-FIELD-AURORA)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_BG_FOCAL_COMPLETE_OUT", "BG-focal-complete");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:focal-complete",
    command: COMMAND,
    note: "DEVICE-FREE ENUMERATION-CONSISTENCY arm — NOT the runtime one-GL law. The binding close is the LIVE monotonic-GL capture (glContextCount(allocated)===1 on every non-substrate route + content↔focal↔dock round-trips, Chrome AND real Safari).",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:focal-complete] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:focal-complete] focal is background.kind-derived + SELF_STAGES_GL, wired into router meta.focal, the DockStage grep is enrolled, the resolver is total, and the shell-field suppression is HERO-GATED (the 17.6 warm-field defect class machine-locked). The runtime one-GL law rides the live capture.",
);
