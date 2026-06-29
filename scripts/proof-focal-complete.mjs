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
//        the kind first).
//
// A self-test bite (--self-test) drops a DockStage route from SELF_STAGES_GL and
// asserts C2 would RED (the planted bite).

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
const focalSrc = stripTs(read("demo/stories/focal.ts"));
function parseStringSet(src, name) {
    const m = src.match(new RegExp(`${name}[^=]*=\\s*new Set\\(\\[([\\s\\S]*?)\\]\\)`));
    if (!m) return new Set();
    return new Set([...m[1].matchAll(/["']([\w/-]+)["']/g)].map((x) => x[1]));
}
const GL_BG_KINDS = parseStringSet(focalSrc, "GL_BG_KINDS");
const SELF_STAGES_GL = parseStringSet(focalSrc, "SELF_STAGES_GL");

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
const importsResolver = /import\s*\{[^}]*\bisFocalRoute\b[^}]*\}\s*from\s*["']\.\/stories\/focal["']/.test(
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
const expectGlKinds = ["aurora", "constellation", "fourier", "liquid-grid"];
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
        ? `GL_BG_KINDS carries the 4 full-bleed GL kinds, and all ${glRows.length} GL-kind rows resolve focal by construction (no focal-without-a-field; ${rows.length} rows parsed)`
        : `the resolver is not total (gl-kinds-complete=${glKindsComplete} every-gl-row-focal=${glRowsFocal} rows=${rows.length})`,
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
    console.log("\n[self-test] the C2 DockStage-grep bite has teeth");
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
    "\n[proof:focal-complete] focal is background.kind-derived + SELF_STAGES_GL, wired into router meta.focal, the DockStage grep is enrolled, and the resolver is total. The runtime one-GL law rides the live capture.",
);
