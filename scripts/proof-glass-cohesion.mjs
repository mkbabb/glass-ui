// proof:glass-cohesion — AY.W-GLASS: the inventory-complete glass-cohesion gate.
//
// SUPERSEDES the 8-file `proof:glass-one-model` canary (that arm + its package.json
// key are REMOVED, not aliased). Where the old canary whitelisted exactly 8 named
// surfaces (a regression lock for 8 past fixes), this gate is INVENTORY-COMPLETE: it
// WALKS every component surface that paints a glass plate and asserts each routes
// through the ONE glass model — so D1–D6 cannot silently re-drift.
//
// The discipline (the user's standing "ONE design/material language" ask): every
// surface the library calls "glass" reads as the SAME material — it routes its
// background through a `--glass-*` tier (one of the five rungs / glass-card /
// glass-dock / input-pill / the named `.glass-opaque` escape), its blur scales by the
// `--glass-level` knob (so the whole set flattens to solid --card + blur(0) at
// level:0), its lift composes the `--glass-shadow-*` ladder, and the moving-specular
// catch-light is OPT-IN (wired-or-omitted like Card) so an idle/unwired surface
// attaches ZERO specular animation tracks.
//
// Device-free SOURCE arm. The PAINTED RENDER — Drawer/Slider/Notification each paint
// a real backdrop-filter blur over a busy backdrop AND flatten to opaque --card +
// blur(0) at `--glass-level: 0` — is the π arm (tests-visual/glass-cohesion.spec.ts),
// NEVER this source gate alone (the cardinal AX lesson: a green CPU gate over a still-
// broken live render is the headless-green trap; the orchestrator drives the live
// readback + the idle-track DELTA capture).
//
// Born-RED at HEAD on five witnesses (the opaque Drawer; the Slider literal blur + the
// hand-rolled thumb lip; the glass-wash Notification + shadow-elevated; the always-on
// specular transition). The asserts below invert each. The self-proving synthetic
// fixture (arm 6) demonstrates the inventory bite every run.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:glass-cohesion";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};
// strip CSS/JS + HTML/Vue comments so a prose mention (e.g. a comment naming the
// `bg-background` it replaced) is not a false hit
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const glassRaw = read("src/styles/glass.css");
const glass = strip(glassRaw);
const drawer = strip(read("src/styles/drawer.css"));
const slider = strip(read("src/components/ui/slider/Slider.vue"));
const notification = strip(read("src/components/ui/notification/Notification.vue"));

const checks = []; // {arm, id, pass, detail}
const add = (arm, id, pass, detail) => checks.push({ arm, id, pass: Boolean(pass), detail });

// ── A glass marker = any sign the surface routes through the one glass model. ─────
const GLASS_MARKER =
    /--glass-bg-|--glass-blur-|glass-wash|glass-quiet|glass-resting|glass-floating|glass-overlay|glass-card|glass-material|glass-opaque|glass-drawer|glass-dock|input-pill|glass-specular-track|\.glass-|backdrop-filter/;

// The forbidden raw-surface set: a glass-surface DEFINITION (a .glass-* rule body, a
// component's surface CSS) that paints a SOLID --background/--card plate or a LITERAL
// blur radius off the level knob. Tailwind class-variant escapes (the `solid`/`outline`
// Button variants, a translucent `bg-card/40` preset chip) are NOT in this set — the
// bite is the DEFINITION-level opaque plate (the D1 Drawer / D2 Slider class), not a
// per-variant opt-out. The synthetic fixture (arm 6) proves the bite.
const RAW_OPAQUE_SURFACE =
    /background(-color)?:\s*var\(--(background|card)\)\s*;/;
const LITERAL_GLASS_BLUR =
    /backdrop-filter:\s*(?:var\([^,]+,\s*)?blur\(\s*[0-9.]+px\s*\)/;

// ── ARM: inventory ─────────────────────────────────────────────────────────────
// Walk every component surface that paints a glass plate (matches a glass class /
// composes a --glass-bg-* / names .glass-drawer|.glass-dock|input-pill). Assert each
// routes through a --glass-* tier AND carries NO definition-level raw opaque plate or
// literal blur OFF the legibility allowlist. The allowlist + the dock-shell exemption
// are the ONLY exempt entries.
const ALLOWLIST = new Set([
    "avatar",
    "label",
    "separator",
    "skeleton",
    "table",
    "data-table",
    "badge",
    // AY.W-PRIM-POLISH D7 ARM B — Checkbox/Radio are 16px selection atoms, below
    // the size where glass reads as glass over a flat substrate (the blur is
    // sub-perceptual at that scale — ARM A would ship machinery that paints
    // opaque anyway, the speculative-substrate overfit). Their checked/unchecked
    // STATE wants MAXIMAL contrast — the same legibility argument the allowlist
    // already makes for `badge`'s loud pill — so their opacity is RATIFIED here,
    // not unconverted. The Switch TRACK (24×44px) earns glass and took ARM A
    // (the `.glass-wash` tier + specular in Switch.vue) — it is NOT on this list.
    "checkbox",
    "radio-group",
]);

function walk(dir, out) {
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) {
            if (name === "__tests__" || name === "node_modules") continue;
            walk(p, out);
        } else if (/\.(vue|ts)$/.test(name) && !/\.(test|spec)\.ts$/.test(name)) {
            out.push(p);
        }
    }
}

const componentRoots = [
    resolve(ROOT, "src/components/ui"),
    resolve(ROOT, "src/components/custom"),
];
const allFiles = [];
for (const r of componentRoots) if (existsSync(r)) walk(r, allFiles);

// A file is "in the allowlist family" if its path is under one of the allowlisted
// component package dirs (avatar/, label/, …) — those legitimately stay opaque.
const inAllowlist = (file) => {
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    return [...ALLOWLIST].some((a) =>
        new RegExp(`/(?:ui|custom)/${a}(?:-[a-z]+)?/`).test(rel) ||
        new RegExp(`/(?:ui|custom)/${a}/`).test(rel),
    );
};

const inventory = [];
for (const file of allFiles) {
    const raw = read(relative(ROOT, file));
    const body = strip(raw);
    if (!GLASS_MARKER.test(body)) continue; // not a glass surface — out of scope
    if (inAllowlist(file)) continue; // legitimately opaque (legibility allowlist)
    inventory.push({ file: relative(ROOT, file), body });
}

const inventoryViolations = [];
for (const { file, body } of inventory) {
    const routesGlass = GLASS_MARKER.test(body);
    const opaque = RAW_OPAQUE_SURFACE.test(body);
    const literalBlur = LITERAL_GLASS_BLUR.test(body);
    if (!routesGlass || opaque || literalBlur) {
        const why = [];
        if (!routesGlass) why.push("no --glass-* tier marker");
        if (opaque) why.push("definition-level background: var(--background|--card) opaque plate");
        if (literalBlur) why.push("literal blur(<n>px) backdrop-filter off the --glass-level knob");
        inventoryViolations.push(`${file} — ${why.join("; ")}`);
    }
}
add(
    "inventory",
    "every-glass-surface-on-model",
    inventoryViolations.length === 0,
    inventoryViolations.length === 0
        ? `all ${inventory.length} glass surfaces route a --glass-* tier off the raw-opaque/literal-blur forbidden set (allowlist + dock-shell exempt)`
        : `${inventoryViolations.length} glass surface(s) OFF the model: ${inventoryViolations.join(" | ")}`,
);
// The inventory is non-empty (a zero-surface walk would vacuously pass).
add(
    "inventory",
    "inventory-non-empty",
    inventory.length >= 20,
    `${inventory.length} glass-bearing component surfaces enumerated (need ≥20 — the walk is reaching the inventory)`,
);

// ── ARM: drawer (D1 — born-RED until E1) ─────────────────────────────────────────
add(
    "drawer",
    "drawer-routes-overlay-tier",
    /\.glass-drawer\s*\{[\s\S]*?backdrop-filter:\s*var\(--glass-blur-overlay\)/.test(drawer) &&
        /\.glass-drawer\s*\{[\s\S]*?background:\s*color-mix\(in oklab,\s*var\(--glass-bg-overlay\)/.test(
            drawer,
        ),
    ".glass-drawer composes background: color-mix(in oklab, var(--glass-bg-overlay), …) + backdrop-filter: var(--glass-blur-overlay)",
);
add(
    "drawer",
    "drawer-ladder-shadow",
    /\.glass-drawer\s*\{[\s\S]*?box-shadow:\s*var\(--glass-material-rim\),\s*var\(--glass-shadow-overlay\)/.test(
        drawer,
    ),
    ".glass-drawer lift composes var(--glass-material-rim), var(--glass-shadow-overlay) (the ladder rung, carrying --shadow-2xl)",
);
add(
    "drawer",
    "drawer-no-opaque-background",
    !RAW_OPAQUE_SURFACE.test(drawer),
    ".glass-drawer carries NO raw background-color: var(--background) (the D1 opaque plate is deleted, not flagged behind a switch)",
);
add(
    "drawer",
    "drawer-in-whc-skin",
    /@media\s*\(forced-colors:\s*active\)[\s\S]*?\.glass-drawer\b/.test(glass) &&
        /\.glass-floating,\s*\.glass-overlay,\s*\.glass-drawer\s*\{\s*background:\s*Canvas/.test(
            glass.replace(/\s+/g, " "),
        ),
    ".glass-drawer joins the WHC skin selector groups (CanvasText border + Canvas fill)",
);

// ── ARM: slider (D2/D3 — born-RED until E2/E3) ───────────────────────────────────
add(
    "slider",
    "slider-range-routes-rung",
    /backdrop-filter:\s*var\(--slider-range-blur,\s*var\(--glass-blur-quiet\)\)/.test(slider),
    ".slider-range backdrop-filter routes var(--slider-range-blur, var(--glass-blur-quiet)) (scales by --glass-level)",
);
add(
    "slider",
    "slider-range-no-literal-blur",
    !/backdrop-filter:\s*var\(--slider-range-blur,\s*blur\(\s*[0-9.]+px\s*\)\)/.test(slider),
    ".slider-range carries NO literal blur(<n>px) fallback (the level-defeat literal is gone)",
);
add(
    "slider",
    "slider-thumb-opts-in-gleam",
    // The SliderThumb composes `slider-thumb glass-specular-track` (the shared opt-in
    // edge-gleam). Match the two classes as a substring of the class attr so a
    // legitimate trailing utility (the W-SLD1/W-PRIM-POLISH `touch-hit-area` hit-floor)
    // does NOT false-RED the gate — what is load-bearing is that the thumb opts in to
    // the gleam, not that the class attr is exactly those two tokens.
    /class="[^"]*\bslider-thumb glass-specular-track\b[^"]*"/.test(slider),
    "the SliderThumb composes glass-specular-track (the shared opt-in edge-gleam, not a hand-rolled lip)",
);
add(
    "slider",
    "slider-thumb-no-handrolled-lip",
    !/\.slider-thumb\s*\{[\s\S]*?background:\s*\n?\s*linear-gradient\([\s\S]*?var\(--background\)[\s\S]*?\)[\s\S]*?var\(--slider-thumb-bg/.test(
        slider,
    ),
    ".slider-thumb drops the hand-rolled linear-gradient(...var(--background)...) lip for a flat fill",
);

// ── ARM: notification (D4 — born-RED until E5) ───────────────────────────────────
add(
    "notification",
    "notification-floating-tier",
    /class="glass-floating\b/.test(notification),
    "Notification composes glass-floating (the floating-chrome tier its siblings ride), not glass-wash",
);
add(
    "notification",
    "notification-no-off-ladder-shadow",
    !/glass-wash[^"]*shadow-elevated/.test(notification) && !/shadow-elevated/.test(notification),
    "Notification drops shadow-elevated (the floating tier's --glass-shadow-floating ladder rung carries the lift)",
);

// ── ARM: specular-opt-in (D5 — born-RED until E4) ────────────────────────────────
// The moving-specular `transition:` must NOT be inside the unconditional
// `.glass-*::before` group; it must ride a `.glass-specular-track::before` /
// `:hover::before` / `:active::before`-scoped selector (the wire-or-omit marker).
// Locate the unconditional `::before` body (the comma group that maps --specular-x/y
// from --mouse-x/y) and assert it carries NO `transition: --specular-*`.
const unconditionalBefore = glass.match(
    /\.glass-material::before,[\s\S]*?--specular-x:\s*var\(--mouse-x[\s\S]*?\}/,
);
add(
    "specular",
    "no-transition-in-unconditional-before",
    Boolean(unconditionalBefore) &&
        !/transition:\s*\n?\s*--specular-x/.test(unconditionalBefore[0]),
    "the unconditional .glass-*::before group carries NO transition: --specular-* (an idle/unwired ::before attaches ZERO tracks)",
);
add(
    "specular",
    "transition-on-wired-scope",
    /\.glass-specular-track::before,[\s\S]*?\.glass-floating:hover::before[\s\S]*?\{\s*\n?\s*transition:\s*\n?\s*--specular-x/.test(
        glass,
    ),
    "the moving-specular transition rides the .glass-specular-track::before + :hover/:active-scoped selector (the Card wire-or-omit pattern)",
);
// The §6 register is PRESERVED — the scoped transition still uses --ease-standard on
// the position-tracked + opacity legs (this wave does not change the easing).
add(
    "specular",
    "section6-register-preserved",
    /transition:\s*\n?\s*--specular-x var\(--duration-fast[^;]*var\(--ease-standard[\s\S]*?--specular-y var\(--duration-fast[^;]*var\(--ease-standard[\s\S]*?opacity var\(--duration-normal[^;]*var\(--ease-standard/.test(
        glass,
    ),
    "the scoped transition keeps the §6 register (position-tracked + opacity → --ease-standard) — only the SELECTOR scope changed",
);

// ── ARM: dock-shell exemption (E6 — recorded, gated) ─────────────────────────────
// The exemption prose lives in a CSS comment (the deliberate divergence record), so
// it is read off the RAW (un-stripped) glass.css — a comment is the canonical home
// for a named exemption, and it must NAME the consequence (no shared edge-gleam).
add(
    "dock-shell-exempt",
    "exemption-recorded",
    /glass-dock`?\s*SHELL is OUT of this group BY DESIGN/.test(glassRaw) &&
        /NO shared edge-gleam\s*\/\s*moving-specular/i.test(glassRaw),
    "the dock-shell edge-gleam exemption is RECORDED in glass.css (named consequence: the shell carries no moving-specular; the catch-light lives on its CONTROLS)",
);

// ── ARM: clean break — proof:glass-one-model is REMOVED ──────────────────────────
const pkg = read("package.json");
add(
    "clean-break",
    "one-model-key-removed",
    !/"proof:glass-one-model"/.test(pkg),
    "the superseded proof:glass-one-model package.json key is REMOVED (clean break, not aliased)",
);

// ── ARM: the π readback spec is wired (E8) ───────────────────────────────────────
add(
    "render",
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/glass-cohesion.spec.ts")),
    "tests-visual/glass-cohesion.spec.ts exists (the π render readback — Drawer/Slider/Notification paint glass + flatten at level:0; the BINDING render-side close)",
);

// ── ARM: self-proving synthetic fixture (E7 §6 — the inventory bite demonstrated) ─
// A fake `.glass-x` surface carrying a definition-level opaque plate MUST flag — the
// RED-witness pattern, so the inventory bite is proven every run (the proof:live-
// verified-ledger discipline). If the fixture does NOT flag, the gate's own teeth are
// broken (a self-proof failure reds the gate).
const SYNTHETIC = `.glass-x { backdrop-filter: var(--glass-blur-quiet); background-color: var(--background); }`;
const syntheticBites =
    GLASS_MARKER.test(SYNTHETIC) &&
    (RAW_OPAQUE_SURFACE.test(SYNTHETIC) || LITERAL_GLASS_BLUR.test(SYNTHETIC));
add(
    "self-proof",
    "synthetic-fixture-flags",
    syntheticBites,
    "the synthetic `.glass-x` fixture (a glass surface carrying background: var(--background)) is FLAGGED by the inventory rule — the bite has teeth",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const arms = [...new Set(checks.map((c) => c.arm))];

console.log("proof:glass-cohesion — the inventory-complete glass-cohesion gate (AY.W-GLASS)");
for (const arm of arms) {
    const armChecks = checks.filter((c) => c.arm === arm);
    console.log(`  [${arm}] ${armChecks.filter((c) => c.pass).length}/${armChecks.length} pass`);
    for (const c of armChecks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);
}

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_GLASS_COHESION_OUT", "AY-glass-cohesion");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:glass-cohesion",
    command: COMMAND,
    note: "SOURCE arm only — the painted backdrop-filter blur + the level:0 flatten over a busy backdrop is proven by tests-visual/glass-cohesion.spec.ts (the π arm), never this gate alone (the cardinal AX lesson).",
    inventorySize: inventory.length,
    checks: checks.map((c) => ({ arm: c.arm, id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:glass-cohesion] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.arm}/${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    `\n[proof:glass-cohesion] TOTAL glass cohesion locked — ${inventory.length} surfaces on ONE model; Drawer/Slider/Notification on the band; the moving-specular transition is opt-in (0 idle tracks); the π arm proves the render.`,
);
