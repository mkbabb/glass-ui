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
// AY.W-CSS1 — glass.css became a thin @import root over carved partials;
// readMonolith concatenates root + partials in cascade order (read-dock-css.mjs
// precedent) so the cohesion scan keeps finding every glass rule + its comments.
import { readMonolith } from "./read-css-monoliths.mjs";

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

const glassRaw = readMonolith(ROOT, "glass");
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
        // \s+ between every word: the prose re-wraps at the carve's indentation
        // (W-CARVE relocated it into glass/material.css), and the clause binds
        // the named consequence, not its line-wrapping.
        /NO shared\s+edge-gleam\s*\/\s*moving-specular/i.test(glassRaw),
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

// ── ARM: feedback-tone — the variant-arm tone-clobber teeth (BA.W-FEEDBACK-TONE) ──
// The GVC-4 gate hole: proof:glass-cohesion enumerated Toast + Notification (both match
// GLASS_MARKER via `glass-floating`) and verified the BASE routes glass — but it never
// detected a variant ARM clobbering that base with an OPAQUE `bg-<tone>` plate, and the
// class-variant exemption (the legitimate-translucent `bg-card/40` door) let an opaque
// tone slab ride through. The Toast variant map (`bg-success` etc.) + the Notification
// type map (`bg-success/90`) shipped a colored SLAB under a green "parity" claim (the
// AW.W25 close). This arm gives the tone clobber teeth.
//
// `OPAQUE_TONE_UTIL` matches an opaque `bg-<tone>` / `bg-<tone>/N` (N≥90) Tailwind
// utility on the four house tones — the SLAB pattern. A translucent escape
// (`bg-card/40`, `bg-success/20`) is NOT matched (the door is NARROWED to translucent,
// not removed): N is captured and only N≥90 (or no alpha at all) reds.
const toast = strip(read("src/components/ui/toast/Toast.vue"));
const alert = strip(read("src/components/ui/alert/index.ts"));
const feedbackTone = strip(read("src/styles/feedback-tone.css"));

// bg-<tone> with NO alpha (opaque) OR bg-<tone>/N with N≥90 (near-opaque slab). The
// alternation: (a) `bg-<tone>` not followed by `/` (opaque); (b) `bg-<tone>/<N>` N≥90.
const OPAQUE_TONE_UTIL =
    /\bbg-(?:success|warning|info|destructive)(?:\/(9[0-9]|100))?(?![\w/.-])/;
// Detect the same SLAB if a future consumer renames the tone to a raw-Tailwind escape
// (`bg-emerald-500`/`bg-red-500`/…) — the anti-evasion bite (a renamed opaque utility
// must STILL fail; the W1 bite-tightening).
const RAW_TAILWIND_TONE_SLAB =
    /\bbg-(?:emerald|green|red|rose|amber|yellow|orange|blue|sky|indigo)-[0-9]{3}\b/;

const toastSlab = OPAQUE_TONE_UTIL.test(toast) || RAW_TAILWIND_TONE_SLAB.test(toast);
const notifSlab =
    OPAQUE_TONE_UTIL.test(notification) || RAW_TAILWIND_TONE_SLAB.test(notification);
add(
    "feedback-tone",
    "toast-no-opaque-tone-plate",
    !toastSlab,
    toastSlab
        ? "Toast.vue carries an OPAQUE bg-<tone>/bg-<tone>/N≥90 (or a raw-Tailwind bg-emerald-500-style) tone SLAB over its glass base — the F-1/GVC-1 clobber (born-RED at HEAD)"
        : "Toast.vue carries NO opaque tone plate — the variant map routes the tinted-glass register, not a slab",
);
add(
    "feedback-tone",
    "notification-no-opaque-tone-plate",
    !notifSlab,
    notifSlab
        ? "Notification.vue carries an OPAQUE/near-opaque bg-<tone>/N≥90 (or raw-Tailwind) tone SLAB over its glass base — the F-3/GVC-2 clobber (born-RED at HEAD)"
        : "Notification.vue carries NO opaque tone plate — the type map routes the tinted-glass register, not a slab",
);

// The three-map collapse, source-asserted (POSITIVE): all three surfaces reference the
// shared `feedback-tone` register, and the recipe resolves the SAME color-mix(in oklab,
// <glass rung bg>, var(--tone) …) seam (NOT a parallel bg-<tone> map).
const TONE_REGISTER = /\bfeedback-tone(?:-(?:success|warning|info|destructive|glyph))?\b/;
const toastOnRegister = TONE_REGISTER.test(toast);
const notifOnRegister = TONE_REGISTER.test(notification);
const alertOnRegister = TONE_REGISTER.test(alert);
add(
    "feedback-tone",
    "three-maps-collapse-onto-shared-register",
    toastOnRegister && notifOnRegister && alertOnRegister,
    toastOnRegister && notifOnRegister && alertOnRegister
        ? "Toast + Notification + Alert ALL reference the shared .feedback-tone-* register (the three independent tone maps collapsed onto ONE source)"
        : `the three-map collapse is INCOMPLETE — on-register: Toast=${toastOnRegister}, Notification=${notifOnRegister}, Alert=${alertOnRegister} (each must consume the shared --feedback-tone-* family)`,
);

// The recipe is the EXISTING tint seam (color-mix(in oklab, <rung>, var(--tone) …)) —
// ZERO new compositing path; a parallel bg-<tone> opaque map in the recipe file fails.
const recipeOnSeam =
    /\.feedback-tone\b[\s\S]*?background:\s*color-mix\(\s*in oklab,\s*var\(--feedback-tone-rung\)[\s\S]*?var\(--tone\)\s*var\(--feedback-tone-strength\)/.test(
        feedbackTone,
    );
const recipeNoOpaqueMap = !OPAQUE_TONE_UTIL.test(feedbackTone);
add(
    "feedback-tone",
    "recipe-on-the-tint-seam",
    recipeOnSeam && recipeNoOpaqueMap,
    recipeOnSeam && recipeNoOpaqueMap
        ? "feedback-tone.css mints the tinted-glass register on the EXISTING color-mix(in oklab, <rung>, var(--tone) <strength>) seam (zero new compositing path), with NO parallel opaque bg-<tone> map"
        : `the recipe is NOT on the tint seam — on-seam=${recipeOnSeam}, no-opaque-map=${recipeNoOpaqueMap} (the toast-glass "zero new compositing path" floor)`,
);

// Self-proof: the bite distinguishes an OPAQUE tone from a TRANSLUCENT escape — the
// narrowed exemption (W3). The opaque/near-opaque slabs MUST flag; the legitimate
// translucent escape MUST NOT (the door is narrowed, not removed).
const TONE_BITES =
    OPAQUE_TONE_UTIL.test("glass-floating bg-success border-success") && // opaque → flags
    OPAQUE_TONE_UTIL.test("glass-floating bg-destructive/90") && // /90 near-opaque → flags
    OPAQUE_TONE_UTIL.test("glass-floating bg-info/95") && // /95 near-opaque → flags
    !OPAQUE_TONE_UTIL.test("glass-floating bg-card/40") && // translucent escape → exempt
    !OPAQUE_TONE_UTIL.test("glass-floating bg-success/20"); // translucent tone wash → exempt
add(
    "feedback-tone",
    "tone-bite-distinguishes-opaque-from-translucent",
    TONE_BITES,
    "the OPAQUE_TONE_UTIL bite flags bg-success / bg-destructive/90 / bg-info/95 (opaque slabs) AND exempts bg-card/40 + bg-success/20 (the narrowed translucent-only door) — the bite distinguishes opaque-tone from translucent-escape",
);

// ── ARM: liquid-hover — the tier-root specular auto-arm + the grain pop-kill ──────
// BB.W-LIQUIDHOVER. The moving-specular system is fully wired to PAINT (the
// material.css `::before` maps --mouse-x/y + lifts intensity on :hover/:active for
// EVERY interactive glass rung), but at HEAD its POSITION write was a per-consumer
// opt-in (hand-wired at DockIconButton + Card + Button) — so every glass control that
// did NOT hand-wire the composable hovered DEAD at the centred 50% fallback (the
// "dead-centre static gleam", speedtest C8 / T8-F5). This arm locks the auto-arm: the
// position write is a PROPERTY OF THE TIER (the `vSpecular` directive wrapping the ONE
// position-write core), the per-consumer hand-wires RETIRE onto it, and the disco-grain
// pop (T8-F6) is killed at the COMPOSITION CLASS (the grain engage rides an opacity
// cross-fade, never a `background-image: none → image` swap). All four witnesses are
// born-RED on the pre-wave tree (no vSpecular.ts; the SFC triplets; no engage clock).

const vSpecularSrc = read("src/composables/glass/vSpecular.ts");
const vSpecularStripped = strip(vSpecularSrc);
const specularCore = strip(read("src/composables/glass/useSpecularTracking.ts"));
const glassBarrel = strip(read("src/composables/glass/index.ts"));
const buttonSfc = strip(read("src/components/ui/button/Button.vue"));
const dockIconBtn = strip(read("src/components/custom/dock/DockIconButton.vue"));
const dockTabBtn = strip(read("src/components/custom/dock/DockTabButton.vue"));
const dockSelectTrig = strip(read("src/components/custom/dock/DockSelectTrigger.vue"));
const dockDropdownTrig = strip(read("src/components/custom/dock/DockDropdownTrigger.vue"));
const cardSfc = strip(read("src/components/ui/card/Card.vue"));
const grainCss = strip(readMonolith(ROOT, "glass")); // ladder.css folds into the glass monolith
// BB.W-CARVE4 — the grain knob (--glass-grain-engage-duration) carved from glass.css
// into tokens/glass-fx.css; read both so the W4 token-minted assert follows the carve.
const grainToken = strip(
    read("src/styles/tokens/glass.css") + "\n" + read("src/styles/tokens/glass-fx.css"),
);

// W1 — the auto-arm seam is minted ONCE and WRAPS the single-source core.
// vSpecular.ts exists, imports `createSpecularWriter` (NOT a hand-rolled rAF/PRM/coord
// copy), and `createSpecularWriter` is the extracted SINGLE core in
// useSpecularTracking.ts (so both the composable + the directive share ONE write).
const w1SeamExists = vSpecularSrc.length > 0;
const w1WrapsCore =
    /import\s*\{[^}]*createSpecularWriter[^}]*\}\s*from\s*["']\.\/useSpecularTracking["']/.test(
        vSpecularSrc,
    ) && /createSpecularWriter\s*\(/.test(vSpecularStripped);
const w1CoreSingleSource =
    /export function createSpecularWriter\b/.test(specularCore) &&
    /createSpecularWriter\s*\(/.test(strip(read("src/composables/glass/useSpecularTracking.ts")));
add(
    "liquid-hover",
    "auto-arm-seam-minted-once-wraps-core",
    w1SeamExists && w1WrapsCore && w1CoreSingleSource,
    w1SeamExists && w1WrapsCore && w1CoreSingleSource
        ? "vSpecular.ts exists + imports/composes createSpecularWriter (the ONE extracted position-write core in useSpecularTracking.ts) — the directive WRAPS the single-source, does NOT re-implement the rAF/PRM/coordinate write"
        : `the auto-arm seam is NOT minted-once-wrapping-the-core — exists=${w1SeamExists}, wraps-core=${w1WrapsCore}, core-single-source=${w1CoreSingleSource}`,
);

// W1 bite (anti-evasion) — NO second `--mouse-x`/`--mouse-y` writer exists outside the
// core + the directive that wraps it. A `pointermove → --mouse-x` write (a re-pasted
// handler, a forked tracker) in ANY component SFC returns ZERO (the single-source is
// machine-locked). The core's `el.style.setProperty("--mouse-x"` (directive) +
// `"--mouse-x": ...` (composable ref) are the ONLY sanctioned writers.
const MOUSE_WRITE =
    /setProperty\(\s*["']--mouse-x["']|["']--mouse-x["']\s*:/;
const forkedWriters = [];
for (const file of allFiles) {
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    // The two sanctioned write homes are exempt (the composable + the directive).
    if (
        rel === "src/composables/glass/useSpecularTracking.ts" ||
        rel === "src/composables/glass/vSpecular.ts"
    )
        continue;
    if (MOUSE_WRITE.test(strip(read(rel)))) forkedWriters.push(rel);
}
add(
    "liquid-hover",
    "no-forked-mouse-writer",
    forkedWriters.length === 0,
    forkedWriters.length === 0
        ? "NO second --mouse-x/--mouse-y writer exists outside createSpecularWriter + vSpecular (the single-source is machine-locked; a re-pasted/forked tracker would flag)"
        : `a FORKED --mouse-x/y writer exists outside the single-source core: ${forkedWriters.join(", ")}`,
);

// W2 — the interactive-glass surfaces auto-arm with ZERO per-consumer wiring. Button's
// glass variants + the dock control family carry the `v-specular` directive at their
// component root. The directive is exported on the /glass barrel (a consumer with a
// NET-NEW surface auto-arms it with `v-specular`).
const w2ButtonArms = /v-specular\b/.test(buttonSfc);
const w2DockArms =
    /v-specular\b/.test(dockIconBtn) &&
    /v-specular\b/.test(dockTabBtn) &&
    /v-specular\b/.test(dockSelectTrig) &&
    /v-specular\b/.test(dockDropdownTrig);
const w2Published = /\bvSpecular\b/.test(glassBarrel);
add(
    "liquid-hover",
    "interactive-glass-auto-arms-zero-wiring",
    w2ButtonArms && w2DockArms && w2Published,
    w2ButtonArms && w2DockArms && w2Published
        ? "Button + the four dock controls (icon/tab/select/dropdown) carry the v-specular auto-arm at their root, and vSpecular is published on the /glass barrel — a bare <Button variant=\"glass\"> / <DockIconButton> gleams pointer-following with ZERO consumer wiring"
        : `the interactive-glass auto-arm is INCOMPLETE — button=${w2ButtonArms}, dock-family=${w2DockArms}, published=${w2Published}`,
);

// W3 — the per-consumer hand-wire RETIRED onto the seam (DRY restored). DockIconButton
// carries NO hand-composed `@pointermove="onPointerMove"`/`:style="specularStyle"`
// triplet (it auto-arms via the directive). The count of hand-composed onPointerMove
// SFC call sites dropped to ≤1 (NO always-on interactive control re-pastes the handler;
// Card routes the gated case through the SAME directive, NOT a re-pasted handler). The
// bite: scan every glass-bearing SFC for a live `@pointermove="onPointerMove"` triplet.
const HANDWIRED_TRIPLET =
    /@pointermove=["']onPointerMove["']|@pointermove=["'][^"']*onPointerMove\(/;
const handwired = [];
for (const file of allFiles) {
    if (!/\.vue$/.test(file)) continue;
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    if (HANDWIRED_TRIPLET.test(strip(read(rel)))) handwired.push(rel);
}
const dockIconNoTriplet = !HANDWIRED_TRIPLET.test(dockIconBtn);
add(
    "liquid-hover",
    "handwire-retired-no-two-copies",
    dockIconNoTriplet && handwired.length === 0,
    dockIconNoTriplet && handwired.length === 0
        ? "DockIconButton carries NO hand-composed @pointermove=\"onPointerMove\" triplet (it auto-arms via the directive); ZERO interactive control re-pastes the handler — the DRY single-source is restored (Card's gated opt-in routes the SAME directive)"
        : `a hand-composed @pointermove triplet survives — dock-icon-clean=${dockIconNoTriplet}, surviving sites: ${handwired.join(", ") || "none"}`,
);

// W4 — the disco-grain pop is killed (opacity engage, NEVER `none → image`). The grain
// `::after` keeps `background-image: var(--paper-clean-texture)` ALWAYS PRESENT (never
// `none` at rest), and the grain engage rides a `--glass-grain-engage-duration` opacity
// cross-fade. The negative predicate (anti-pop): NO `background-image: none → image`
// transition on a grain layer.
const w4TokenMinted = /--glass-grain-engage-duration\s*:/.test(grainToken);
const w4OpacityCrossfade =
    /transition:\s*opacity\s+var\(--glass-grain-engage-duration/.test(grainCss);
const w4ImageAlwaysPresent =
    /background-image:\s*var\(--paper-clean-texture\)/.test(grainCss);
// The anti-pop negative predicate: NO `background-image: none` anywhere on a grain
// layer (the discrete none→image swap is the forbidden pop).
const w4NoNoneSwap = !/background-image:\s*none/.test(grainCss);
add(
    "liquid-hover",
    "grain-pop-killed-opacity-crossfade",
    w4TokenMinted && w4OpacityCrossfade && w4ImageAlwaysPresent && w4NoNoneSwap,
    w4TokenMinted && w4OpacityCrossfade && w4ImageAlwaysPresent && w4NoNoneSwap
        ? "the grain ::after keeps background-image always present + rides a --glass-grain-engage-duration opacity cross-fade (NO background-image: none → image swap) — the disco-grain pop (T8-F6) killed at the composition class"
        : `the grain pop-kill is INCOMPLETE — token=${w4TokenMinted}, opacity-crossfade=${w4OpacityCrossfade}, image-always-present=${w4ImageAlwaysPresent}, no-none-swap=${w4NoNoneSwap}`,
);

// W4 self-test bite — a synthetic `.grain-x { background-image: none } .grain-x:hover {
// background-image: var(--paper-clean-texture) }` fixture (the none→image swap) MUST be
// flagged by the anti-pop predicate; the opacity cross-fade fixture MUST NOT. The bite
// is demonstrated every run (born-RED on the swap pattern, GREEN on the cross-fade).
const SWAP_FIXTURE =
    ".grain-x { background-image: none; } .grain-x:hover { background-image: var(--paper-clean-texture); }";
const CROSSFADE_FIXTURE =
    ".grain-y { background-image: var(--paper-clean-texture); transition: opacity 120ms linear; }";
const swapBites = /background-image:\s*none/.test(SWAP_FIXTURE);
const crossfadeClean = !/background-image:\s*none/.test(CROSSFADE_FIXTURE);
add(
    "liquid-hover",
    "grain-pop-self-test-bite",
    swapBites && crossfadeClean,
    swapBites && crossfadeClean
        ? "the anti-pop predicate FLAGS the synthetic none→image swap fixture AND exempts the opacity cross-fade fixture — the bite has teeth (born-RED on the pop pattern)"
        : `the grain pop self-test bite is broken — swap-flags=${swapBites}, crossfade-exempt=${crossfadeClean}`,
);

// W5 — the π binding readback spec is wired (the gleam-tracks-cursor + grain-no-pop +
// PRM-static truth, both modes — runs under W-VISUAL-RUNNER, never existsSync'd alone).
add(
    "liquid-hover",
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/liquid-hover.spec.ts")),
    "tests-visual/liquid-hover.spec.ts exists (the π render readback — the gleam POSITION tracks the cursor off the centred 50%, the grain engage shows NO pop, the PRM bracket pins static; the BINDING visual truth, both modes)",
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
    `\n[proof:glass-cohesion] TOTAL glass cohesion locked — ${inventory.length} surfaces on ONE model; Drawer/Slider/Notification on the band; the moving-specular transition is opt-in (0 idle tracks); the tier-root specular auto-arm (vSpecular wrapping the ONE position-write core) gleams pointer-following with zero per-consumer wiring; the disco-grain pop is killed onto an opacity cross-fade; the π arm proves the render.`,
);
