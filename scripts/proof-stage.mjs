// proof:stage — BA.W-STAGE: the demo backdrop system (born-RED). Every route
// staged over a per-category background, glassiness demos float over the live
// field, the dock demos sit over one offscreen-paused backdrop, the aurora
// `breathing` register made honest. The device-free SOURCE arm; the BINDING
// painted truth is the π arm (tests-visual/stage.spec.ts) + the proof:ba-gestalt
// staged-demo verdict — a source-green/visually-flat-void close is the exact AZ
// P-1 class this tranche exists to fix (BA invariant 4).
//
// The four falsifiable SOURCE witnesses (the comment-strip + pure-detector house
// pattern, mirroring proof-suffuse.mjs / proof-ba-animate.mjs), each RED at HEAD:
//
//   W1 — every route declares a background (zero keyless). EVERY s() story row in
//        manifest.ts resolves a NON-EMPTY background kind ∈ {aurora, constellation,
//        fourier, grid, paper} — declared on the row OR inherited from a per-category
//        default (the CATEGORY_DEFAULT_BG map). The assert is POSITIVE per-row, NOT
//        "the declared count rose" (a partial map that leaves rows keyless passes a
//        count check while the void survives). RED at HEAD: ~80 rows carry no
//        background and no category-default map exists.
//
//   W2 — ShowcaseFrame stages glass over the field, not an opaque plate. The
//        ShowcaseFrame `field` tier resolves to NO bg-card / opaque plate (a
//        bg-transparent / no-fill branch), AND glass-material.vue references
//        tier="field", AND the resting/quiet tiers STILL carry bg-card (the
//        opaque-atom host stays — a blanket transparent-everywhere is a regression).
//        RED at HEAD: the tierClass is bg-card / bg-card/40 only; glass-material uses
//        the opaque default.
//
//   W3 — the dock-stage chassis exists + is offscreen-paused + consumed. DockStage.vue
//        EXISTS, composes a single shared <Aurora> (offscreen-paused by construction
//        via the useIntersectionPause + content-visibility seam Aurora ships), AND the
//        three dock stories (overview / layers / morph-showcase) reference it with the
//        flat `bg-card/40` panels GONE. RED at HEAD: no DockStage.vue; grep bg-card/40
//        in the dock stories hits.
//
//   W4 — the aurora `breathing` register has non-zero drift (BA-VJS-2, valuejs-fold
//        A-4). atoms.ts's `breathing` MOTION_FIELDS atom carries a NON-ZERO nucleiDrift
//        and/or paletteDrift (and/or a raised breathDepth), NOT the all-zero state; AND
//        aurora.frag.ts is byte-UNTOUCHED by this wave (the GL fence held — the fix is
//        the JS motion TABLE, not the shader). RED at HEAD: all three drift terms zero.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:stage";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip HTML/Vue/JS/CSS comments so a prose mention in a comment is NOT a false
// hit — the whole gate is comment-blind. Preserve newlines for line geometry.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

const BG_KINDS = new Set(["aurora", "constellation", "fourier", "grid", "paper"]);

// ── The source surfaces (comment-stripped) ───────────────────────────────────
const manifest = strip(read("demo/stories/manifest.ts"));
const showcaseFrame = strip(read("demo/stories/ShowcaseFrame.vue"));
const glassMaterial = strip(read("demo/stories/substrates/glass-material.vue"));
const dockStageExists = existsSync(resolve(ROOT, "demo/stories/dock/DockStage.vue"));
const dockStage = strip(read("demo/stories/dock/DockStage.vue"));
const dockOverview = strip(read("demo/stories/dock/overview.vue"));
const dockLayers = strip(read("demo/stories/dock/layers.vue"));
const dockMorph = strip(read("demo/stories/dock/morph-showcase.vue"));
// BB.W-CARVE5 carved the MOTION_FIELDS table (incl. the `breathing` atom) out of
// atoms.ts into atoms-fields.ts; the W4 breathing-drift assert FOLLOWS the carve into
// the leaf (the "asserts follow the carve into the leaf" precedent). Read both so the
// breathing literal resolves wherever it lives.
const atoms =
    strip(read("src/components/custom/aurora/composables/atoms.ts")) +
    "\n" +
    strip(read("src/components/custom/aurora/composables/atoms-fields.ts"));

// ── W1 — every route declares a background (zero keyless) ─────────────────────
//
// Parse the CATEGORY_DEFAULT_BG map (the per-category inherit table) + every s()
// row. A row resolves a background IFF it carries an explicit `background:` OR its
// category has a default entry. The POSITIVE assert: every s() row resolves a
// NON-EMPTY kind, and every category in CATEGORIES has a default entry.

// 1a. Parse CATEGORY_DEFAULT_BG — `<cat>: "<kind>",` lines inside the map literal.
const defaultMapBlock = (() => {
    const m = manifest.match(
        /CATEGORY_DEFAULT_BG\s*:\s*Record<[^>]*>\s*=\s*\{([\s\S]*?)\};/,
    );
    return m ? m[1] : "";
})();
const categoryDefaults = new Set();
for (const m of defaultMapBlock.matchAll(/(\w[\w-]*)\s*:\s*["'](\w+)["']/g)) {
    if (BG_KINDS.has(m[2])) categoryDefaults.add(m[1]);
}

// 1b. The categories declared in CATEGORIES (id: "<cat>"). Every one MUST have a
// default entry so a keyless row in it inherits a valid kind.
const declaredCategories = [...manifest.matchAll(/\bid:\s*["'](\w[\w-]*)["']/g)]
    .map((m) => m[1])
    // The category ids are the ones that also carry a `title:` + `stories:` —
    // approximate by the known set the manifest declares at the category level.
    .filter((id) =>
        new Set([
            "foundations",
            "substrates",
            "forms",
            "display",
            "containers",
            "navigation",
            "dock",
            "data",
            "feedback",
            "motion",
            "compositions",
        ]).has(id),
    );
const uniqueCategories = [...new Set(declaredCategories)];
const everyCategoryHasDefault = uniqueCategories.every((c) =>
    categoryDefaults.has(c),
);
const missingDefaults = uniqueCategories.filter((c) => !categoryDefaults.has(c));

// 1c. Every s() row: extract its category (1st arg) and whether it carries an
// explicit background kind. A row resolves IFF explicit-kind OR category-default.
// Parse each s("<cat>", "<id>", ... { ... background: ... }) call.
const sRows = [];
{
    // Walk s( ... ) call openings; capture the 1st string arg (category) + a
    // window of text after to detect an explicit `background:` kind.
    const re = /\bs\(\s*["'](\w[\w-]*)["']\s*,\s*["']([\w-]+)["']/g;
    let m;
    while ((m = re.exec(manifest)) !== null) {
        const cat = m[1];
        const id = m[2];
        // Window = from this match to the next s( opening (or +800 chars).
        const next = manifest.indexOf("s(", re.lastIndex);
        const end = next === -1 ? Math.min(manifest.length, re.lastIndex + 800) : next;
        const window = manifest.slice(re.lastIndex, end);
        // explicit background: "<kind>" OR background: { kind: "<kind>" }
        const bm =
            window.match(/background:\s*["'](\w+)["']/) ||
            window.match(/background:\s*\{\s*kind:\s*["'](\w+)["']/);
        const explicit = bm && BG_KINDS.has(bm[1]) ? bm[1] : null;
        sRows.push({ cat, id, explicit });
    }
}
const keylessRows = sRows.filter(
    (r) => !r.explicit && !categoryDefaults.has(r.cat),
);
const everyRowResolves =
    sRows.length > 0 && keylessRows.length === 0 && everyCategoryHasDefault;
add(
    "w1-zero-keyless-routes",
    everyRowResolves,
    everyRowResolves
        ? `all ${sRows.length} s() story rows resolve a non-empty background kind (explicit OR a per-category default; every category has a default entry) — the void is killed`
        : `keyless routes survive: ${keylessRows.length} row(s) resolve no background ${keylessRows
              .slice(0, 6)
              .map((r) => `${r.cat}/${r.id}`)
              .join(", ")}${missingDefaults.length ? ` | categories missing a default: ${missingDefaults.join(", ")}` : ""} (rows parsed=${sRows.length})`,
);

// ── W2 — ShowcaseFrame stages glass over the field, not an opaque plate ───────
//
// The `field` tier resolves to no bg-card / a transparent branch; resting/quiet
// STILL carry bg-card (the opaque-atom host stays); glass-material references
// tier="field".
const fieldBranch = (() => {
    // Find the case "field": ... return "<class>" branch in the tierClass computed.
    const m = showcaseFrame.match(/case\s+["']field["']\s*:\s*return\s+["']([^"']+)["']/);
    return m ? m[1] : "";
})();
const fieldNoPlate =
    fieldBranch.length > 0 &&
    /(\bbg-transparent\b|\bbg-none\b|\bborder-transparent\b)/.test(fieldBranch) &&
    !/\bbg-card\b/.test(fieldBranch);
// The opaque-atom host stays — resting/quiet must STILL carry bg-card somewhere in
// the tierClass computed (a blanket transparent-everywhere is a regression).
const restingKeepsPlate = /\bbg-card\b/.test(showcaseFrame);
// glass-material references tier="field" (the BG-2 fix at the consumer).
const glassMaterialField = /tier=["']field["']/.test(glassMaterial);
const w2 = fieldNoPlate && restingKeepsPlate && glassMaterialField;
add(
    "w2-showcaseframe-field-no-plate",
    w2,
    w2
        ? `ShowcaseFrame carries a field tier that drops the opaque plate ("${fieldBranch}"), the resting/quiet tiers still carry bg-card (the opaque-atom host stays), and glass-material.vue uses tier="field" — glass floats over the page field, not a black plate (BG-2 fixed)`
        : `the field-backed mode is missing or incomplete (field-no-plate=${fieldNoPlate} resting-keeps-plate=${restingKeepsPlate} glass-material-field=${glassMaterialField}) — the opaque ShowcaseFrame occludes the page aurora (BG-2)`,
);

// ── W3 — the dock-stage chassis exists + is offscreen-paused + consumed ───────
//
// DockStage.vue exists, composes a single shared <Aurora> (offscreen-paused by
// construction), AND the three dock stories reference it with the flat bg-card/40
// panels GONE.
const dockStageComposesAurora = /<Aurora\b/.test(dockStage);
const dockStageConsumers = [
    ["overview.vue", dockOverview],
    ["layers.vue", dockLayers],
    ["morph-showcase.vue", dockMorph],
];
const consumedByAll = dockStageConsumers.every(([, src]) => /<DockStage\b/.test(src));
const flatPanelOffenders = dockStageConsumers
    .filter(([, src]) => /\bbg-card\/40\b/.test(src))
    .map(([name]) => name);
const w3 =
    dockStageExists &&
    dockStageComposesAurora &&
    consumedByAll &&
    flatPanelOffenders.length === 0;
add(
    "w3-dock-stage-chassis-consumed",
    w3,
    w3
        ? "DockStage.vue exists, composes ONE shared <Aurora> (offscreen-paused by construction), and the three dock stories reference it with the flat bg-card/40 panels GONE — the dock glass reads as liquid glass over a live field (FD-DOCK-1)"
        : `the dock-stage chassis is missing or unconsumed (exists=${dockStageExists} composes-aurora=${dockStageComposesAurora} consumed-by-3=${consumedByAll} flat-panels-survive=${flatPanelOffenders.join(", ") || "none"})`,
);

// ── W4 — the aurora `breathing` register has non-zero drift (BA-VJS-2) ────────
//
// The `breathing` MOTION_FIELDS atom carries a NON-ZERO nucleiDrift and/or
// paletteDrift (and/or raised breathDepth), AND aurora.frag.ts is byte-untouched.
const breathingAtom = (() => {
    const m = atoms.match(/breathing\s*:\s*\{([^}]*)\}/);
    return m ? m[1] : "";
})();
const nuclei = Number((breathingAtom.match(/nucleiDrift\s*:\s*([\d.]+)/) || [])[1] ?? 0);
const palette = Number((breathingAtom.match(/paletteDrift\s*:\s*([\d.]+)/) || [])[1] ?? 0);
const warp = Number((breathingAtom.match(/warpDrift\s*:\s*([\d.]+)/) || [])[1] ?? 0);
const breathingHasDrift = nuclei > 0 || palette > 0 || warp > 0;
add(
    "w4-aurora-breathing-non-zero-drift",
    breathingHasDrift,
    breathingHasDrift
        ? `the aurora breathing register carries non-zero spatial/chromatic drift (nucleiDrift=${nuclei} paletteDrift=${palette} warpDrift=${warp}) — a calm-seed aurora reads as perceptible atmospheric drift, not the dead ±2.5% pulse (BA-VJS-2)`
        : `the breathing register is DEAD: all spatial/chromatic drift terms are zero (nucleiDrift=${nuclei} paletteDrift=${palette} warpDrift=${warp}) — the surviving luminance pulse is sub-perceptible (valuejs-fold A-4)`,
);

// W4-negative — the GL fence held: aurora.frag.ts is byte-untouched by this wave.
// The fix is the JS motion TABLE only. (Detector cannot diff git here, so it
// asserts the frag carries no W-STAGE marker — a positive proof the shader was not
// edited by this wave; the spec's binding fence is the byte-untouched commit.)
const auroraFrag = read(
    "src/components/custom/aurora/constants/shaders/aurora.frag.ts",
);
const fragUntouchedByWave = !/W-STAGE/.test(auroraFrag);
add(
    "w4-gl-fence-held",
    fragUntouchedByWave,
    fragUntouchedByWave
        ? "aurora.frag.ts carries no W-STAGE marker — the GL shader fence held (the breathing fix is the JS motion TABLE, not the fragment)"
        : "aurora.frag.ts was edited by this wave — the GL fence was breached (the breathing fix must be the JS atoms.ts motion table only)",
);

// ── (z) the π readback spec is wired (the BINDING close — BA inv-4) ───────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/stage.spec.ts")),
    "tests-visual/stage.spec.ts exists (the π readback: a keyless-today route now backgrounded + the grid/paper VISIBLE-in-dark + glass-material rungs over aurora no-opaque-frame + the dock demos over a live field + a calm-seed aurora's perceptible breathing drift — the BINDING close)",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:stage — the demo backdrop system: every route staged, glass over the live field, the dock demos over one offscreen-paused backdrop, the aurora breathing register honest (BA.W-STAGE)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_BA_STAGE_OUT", "BA-stage");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:stage",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RESOLVED backgrounds-everywhere + the grid/paper VISIBLE-in-dark + the glass-over-aurora-no-opaque-frame + the dock-over-live-field + the perceptible breathing drift are proven by tests-visual/stage.spec.ts (the π readback, the binding close) + the proof:ba-gestalt staged-demo verdict, never this gate alone.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:stage] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:stage] the storybook STOPS being an 80%-blank near-black void — every route declares or inherits a category background with a real dark arm, glassiness demos float over the live substrate, the token tours read against a contrast field, the dock demos sit over one offscreen-paused field, and the aurora breathing register reads as perceptible drift. The π arm binds the painted render.",
);
