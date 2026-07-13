// proof:one-gl-per-route — BI.W-AUTH-SHELL-BG (PERF-2 / UF-K4 / FAM-5): the
// device-free SOURCE arm of the one-GL-per-route budget for the auth-shell fourier
// retirement + the no-double-mount structural invariant.
//
// The auth-shell mounted the library's HEAVIEST shader (a 4.87MP live Fourier SDF)
// as a decorative page-background wash BEHIND the form, PLUS a brand-panel aurora,
// PLUS the recessive shell aurora — THREE live GL contexts on one route ("miserable"
// performance). This wave retires the fourier page-wash (a teaching SDF is NEVER an
// ambient background) and holds the one-GL budget: the auth-shell drops to ONE live
// GL context (the brand-panel aurora), the page declares a zero-GL `grid` wash, and
// the route is enrolled in SELF_STAGES_GL so the shell aurora stands down.
//
// This gate proves the SOURCE consistency (the runtime census is the π —
// tests-visual/auth-shell-bg.spec.ts; the LIVE canvas count is the binding truth).
//
// The witnesses (device-free):
//   AB1 — the `"fourier"` StoryBackground kind is RETIRED (clean break, no alias):
//         the StoryBackgroundKind union carries NO "fourier", GL_BG_KINDS carries no
//         "fourier", StoryHero mounts NO <FourierField> (the kind folded out), and NO
//         manifest row declares a live fourier background wash.
//   AB2 — the auth-shell route mounts <= 1 live GL context (SOURCE proxy): its
//         manifest background resolves to a ZERO-GL kind, it is enrolled in
//         SELF_STAGES_GL (the shell aurora stands down), and its SFC mounts EXACTLY
//         ONE <Aurora> (the brand panel) — shell(suppressed)=0 + manifest-bg=0 +
//         own=1 = ONE.
//   AB3 — no double-mount: every SELF_STAGES_GL route declares a NON-GL (`grid`/
//         `paper`) background — a self-staging route (mounts its own GL field) that
//         ALSO declared a GL `background.kind` would double-mount (the StoryHero
//         page-field PLUS its own body field). This is the "dispose the manifest bg
//         field when the route body hosts its own" structural guarantee.
//
// Self-test bites (--self-test): (1) a planted `{kind:"fourier"}` page-bg makes AB1
// RED; (2) a planted SELF_STAGES_GL route with a GL background (a 3-GL route:
// shell-suppressed + StoryHero field + own field) makes AB3 RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:one-gl-per-route";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
const stripComments = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

function parseStringSet(src, name) {
    const m = src.match(new RegExp(`${name}[^=]*=\\s*new Set\\(\\[([\\s\\S]*?)\\]\\)`));
    if (!m) return new Set();
    return new Set([...m[1].matchAll(/["']([\w/-]+)["']/g)].map((x) => x[1]));
}

const BG_KINDS = new Set([
    "aurora",
    "constellation",
    "liquid-grid",
    "grid",
    "paper",
]);

// Resolve every s() manifest row → { routeId, cat, id, kind } using the explicit
// `background:` (string or `{kind}` object) else the CATEGORY_DEFAULT_BG fallback.
function parseManifestRows(manifest) {
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
    const rows = [];
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
    return rows;
}

// ── The detection core — pure over its sources so the self-test can feed mutants ─
function detect({ auroraHero, focalSrc, storyHero, manifest, authShell }) {
    const checks = [];
    const add = (id, pass, detail) =>
        checks.push({ id, pass: Boolean(pass), detail });

    const auroraHeroStripped = stripComments(auroraHero);
    const focalStripped = stripComments(focalSrc);
    const storyHeroStripped = stripComments(storyHero);
    const manifestStripped = stripComments(manifest);
    const authShellStripped = stripComments(authShell);

    const GL_BG_KINDS = parseStringSet(focalStripped, "GL_BG_KINDS");
    const SELF_STAGES_GL = parseStringSet(focalStripped, "SELF_STAGES_GL");
    const rows = parseManifestRows(manifestStripped);
    const rowById = new Map(rows.map((r) => [r.routeId, r]));

    // ── AB1 — the "fourier" StoryBackground kind is RETIRED ───────────────────
    // The StoryBackgroundKind union carries NO "fourier" member.
    const unionBlock = (() => {
        const m = auroraHeroStripped.match(
            /StoryBackgroundKind\s*=([\s\S]*?);/,
        );
        return m ? m[1] : "";
    })();
    const unionNoFourier = unionBlock.length > 0 && !/["']fourier["']/.test(unionBlock);
    const glKindsNoFourier = !GL_BG_KINDS.has("fourier");
    // StoryHero mounts NO <FourierField> and carries no `kind === 'fourier'` branch.
    const storyHeroNoFourier =
        !/<FourierField[\s>]/.test(storyHeroStripped) &&
        !/kind\.value\s*===\s*["']fourier["']/.test(storyHeroStripped) &&
        !/kind\s*===\s*["']fourier["']/.test(storyHeroStripped);
    // NO manifest row declares a live fourier background wash.
    const manifestNoFourierBg =
        !/background:\s*["']fourier["']/.test(manifestStripped) &&
        !/background:\s*\{\s*kind:\s*["']fourier["']/.test(manifestStripped) &&
        !rows.some((r) => r.kind === "fourier");
    const ab1 =
        unionNoFourier &&
        glKindsNoFourier &&
        storyHeroNoFourier &&
        manifestNoFourierBg;
    add(
        "ab1-fourier-page-bg-kind-retired",
        ab1,
        ab1
            ? "the `fourier` StoryBackground kind is RETIRED — the union carries no `fourier`, GL_BG_KINDS carries no `fourier`, StoryHero mounts no <FourierField>/`kind==='fourier'` branch, and no manifest row declares a live fourier wash (the 4.87MP heaviest-shader page-wash is gone)"
            : `the fourier page-bg kind is NOT fully retired (union-no-fourier=${unionNoFourier} gl-kinds-no-fourier=${glKindsNoFourier} storyhero-folded=${storyHeroNoFourier} manifest-no-fourier=${manifestNoFourierBg})`,
    );

    // ── AB2 — the auth-shell route mounts <= 1 live GL context (SOURCE proxy) ──
    const authRow = rowById.get("compositions/auth-shell");
    const authBgZeroGl =
        authRow !== undefined &&
        authRow.kind !== undefined &&
        !GL_BG_KINDS.has(authRow.kind);
    const authEnrolledSelfStage = SELF_STAGES_GL.has("compositions/auth-shell");
    // Exactly ONE <Aurora> in auth-shell.vue (the brand panel — the route's ONE GL).
    const auroraMounts = (authShellStripped.match(/<Aurora[\s>]/g) ?? []).length;
    const authOneOwnAurora = auroraMounts === 1;
    const ab2 = authBgZeroGl && authEnrolledSelfStage && authOneOwnAurora;
    add(
        "ab2-auth-shell-one-gl-context",
        ab2,
        ab2
            ? `auth-shell mounts <= 1 live GL context: the manifest bg is a ZERO-GL kind (${authRow?.kind}), the route is in SELF_STAGES_GL (shell aurora stands down), and the SFC mounts EXACTLY ONE <Aurora> (the brand panel) → shell(0) + bg(0) + own(1) = ONE`
            : `auth-shell does NOT resolve to <= 1 GL context (bg-zero-gl=${authBgZeroGl} kind=${authRow?.kind} enrolled-self-stage=${authEnrolledSelfStage} own-aurora-count=${auroraMounts})`,
    );

    // ── AB3 — no double-mount: every SELF_STAGES_GL route declares a NON-GL bg ─
    // A self-staging route (mounts its own route-dominant GL field OUTSIDE the
    // `background` channel) that ALSO declared a GL `background.kind` would
    // double-mount (StoryHero's page-field PLUS its own body field). The structural
    // guarantee: every SELF_STAGES_GL route's resolved background is grid/paper.
    const selfStageRows = [...SELF_STAGES_GL].map((routeId) => ({
        routeId,
        kind: rowById.get(routeId)?.kind,
    }));
    const doubleMounters = selfStageRows.filter(
        (r) => r.kind !== undefined && GL_BG_KINDS.has(r.kind),
    );
    const ab3 = SELF_STAGES_GL.size > 0 && doubleMounters.length === 0;
    add(
        "ab3-no-double-mount-self-staging-non-gl-bg",
        ab3,
        ab3
            ? `every SELF_STAGES_GL route (${SELF_STAGES_GL.size}) declares a NON-GL background — a self-staging route hosts its OWN GL field, so its manifest background is a calm grid/paper wash (no StoryHero page-field double-mount)`
            : `SELF_STAGES_GL routes double-mount a GL background: ${doubleMounters.map((r) => `${r.routeId}=${r.kind}`).join(", ") || "(SELF_STAGES_GL empty — the check is inert)"}`,
    );

    return { checks };
}

const sources = {
    auroraHero: read("demo/chassis/hero/aurora-hero.ts"),
    focalSrc: read("demo/chassis/hero/focal.ts"),
    storyHero: read("demo/chassis/hero/StoryHero.vue"),
    manifest: read("demo/stories/manifest.ts"),
    authShell: read("demo/stories/compositions/auth-shell.vue"),
};

// ── Self-test — the two planted bites ─────────────────────────────────────────
if (SELF_TEST) {
    console.log("proof:one-gl-per-route --self-test");

    // Bite 1 — plant a `{kind:"fourier"}` page-bg on the auth-shell manifest row.
    // AB1 must RED (a fourier wash re-introduced).
    const mutManifestFourier = sources.manifest.replace(
        /background:\s*["']grid["']/,
        'background: { kind: "fourier" }',
    );
    const biteFourier = detect({ ...sources, manifest: mutManifestFourier });
    const ab1Live = detect(sources).checks.find(
        (c) => c.id === "ab1-fourier-page-bg-kind-retired",
    ).pass;
    const ab1Mutated = biteFourier.checks.find(
        (c) => c.id === "ab1-fourier-page-bg-kind-retired",
    ).pass;
    const bite1Teeth =
        mutManifestFourier !== sources.manifest && ab1Live && !ab1Mutated;
    console.log(
        `  ${bite1Teeth ? "✓" : "✗"} bite-1 — a planted {kind:"fourier"} page-bg makes AB1 RED (live=${ab1Live}, mutated=${ab1Mutated}, teeth=${bite1Teeth})`,
    );

    // Bite 2 — plant a SELF_STAGES_GL route with a GL background (a 3-GL route). The
    // dock/overview row (a SELF_STAGES_GL route) is given an explicit `background:
    // "aurora"` → it now double-mounts (StoryHero aurora + DockStage aurora, +
    // shell-suppressed). AB3 must RED.
    const mutManifestDouble = sources.manifest.replace(
        /(\bs\(\s*["']dock["']\s*,\s*["']overview["'][\s\S]*?)(\n)/,
        '$1\n                background: "aurora",$2',
    );
    const biteDouble = detect({ ...sources, manifest: mutManifestDouble });
    const ab3Live = detect(sources).checks.find(
        (c) => c.id === "ab3-no-double-mount-self-staging-non-gl-bg",
    ).pass;
    const ab3Mutated = biteDouble.checks.find(
        (c) => c.id === "ab3-no-double-mount-self-staging-non-gl-bg",
    ).pass;
    const bite2Teeth =
        mutManifestDouble !== sources.manifest && ab3Live && !ab3Mutated;
    console.log(
        `  ${bite2Teeth ? "✓" : "✗"} bite-2 — a planted SELF_STAGES_GL route with a GL background makes AB3 RED (live=${ab3Live}, mutated=${ab3Mutated}, teeth=${bite2Teeth})`,
    );

    if (!bite1Teeth || !bite2Teeth) {
        console.error("\n[self-test] a planted bite has NO teeth");
        process.exit(1);
    }
    console.log(
        "\n[self-test] the fourier-page-bg bite + the self-staging-double-mount bite have teeth",
    );
    process.exit(0);
}

// ── Report ────────────────────────────────────────────────────────────────────
const { checks } = detect(sources);
const failed = checks.filter((c) => !c.pass);
console.log(
    "proof:one-gl-per-route — the auth-shell fourier page-wash is retired + the one-GL-per-route budget holds (the runtime canvas census rides the π) (BI.W-AUTH-SHELL-BG)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_BI_ONE_GL_PER_ROUTE_OUT", "BI-one-gl-per-route");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:one-gl-per-route",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the auth-shell fourier page-wash retirement + the no-double-mount invariant. The binding close is the LIVE canvas census (tests-visual/auth-shell-bg.spec.ts — /compositions/auth-shell mounts <= 1 GL context, both modes).",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:one-gl-per-route] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:one-gl-per-route] the 4.87MP fourier page-wash is retired, auth-shell resolves to ONE live GL context (the brand aurora; shell suppressed via SELF_STAGES_GL), and no self-staging route double-mounts a GL background. The runtime canvas census rides the π.",
);
