// proof:motion — BG.W-DEAD-COMPOSABLE-CUT (F5 Motion): the dead-composable cut is COMPLETE.
//
// The F5 motion band carried FIVE dead composables + one dead weld that shipped with
// their own gates + "≥2-consumer" evidence docs while their ACTUAL binary-consumer count
// was 0-1 (the shelf-ware class the SOTA fewer-sharper-primitives law forbids):
//   • useHaptic (core/) — the navigator.vibrate wrapper, no live consumer.
//   • useCelebrationBurst (+ jubilance.css) — the earned-petal bloom, no live consumer.
//   • useVizChoreography (glass/) — the viz entrance-choreography leaf, spec-only.
//   • useLiquidMorph (+ liquid-morph.css) — the BE liquid-dock spike; the composable had
//     ZERO importer, the CSS is demo-only (MOVED to demo/ — the god-module #1 drain).
//   • useDockContextSilhouette — the BE dock context→silhouette state machine, its only
//     demo (AppSwitcher.vue) reads useBloomUp not this; no live consumer (the #8 drain).
//   • useMorphField() — the WELD weld body had ZERO callers; only its motion-named
//     `MORPH_SIGNATURES` DATA map was live, so it is GUTTED to morphSignatures.ts (the
//     DATA kept on the barrel; morph-field.css deleted).
//
// This gate LOCKS the DEFINITION-ABSENCE: each dead file gone, no surviving import, the
// paired CSS out of src/ + unwired from the cascade, the DATA survives on the barrel, the
// three lying evidence docs deleted, the retired subject-gates deleted — AND the
// NAME-COLLISION FENCE (proof:liquid-morph, the BC dock-morph teardrop gate, is DISTINCT
// from useLiquidMorph and MUST survive untouched).
//
// BG.W-MOTION-SPINE ADDS TWO CLAUSE FAMILIES (the F5.1 runner-single collapse):
//   • S1 — the ONE FLIP/morph runner. `useElementMorph.ts` is the SOLE owner of the rAF
//     `step()` loop over `new ElementMorph` (sampled from SPRING_PRESETS via
//     springPreset/springTimingFunction) + the `lockSpatialTransition` driver-lock seam +
//     the hoisted `asElement` resolver. The reveal + cta family (useLiquidReveal,
//     useDockCtaReceive) COMPOSE it and own NO second runner (no `new ElementMorph`, no
//     `requestAnimationFrame`, no `springTimingFunction` re-sample) — the HOLLOW-falsifier
//     the `proof:flip-one` gate would have carried, folded here. (useBloomUp's fold onto
//     the spine is BOOKED — see the BLOOM_WRAPPERS note.)
//   • S2 — the press-tower collapse (R16 WATCH-3). `useLiquidPress` composes `useSpringPress`
//     (the interruptible velocity-continuous re-seat, via `useSpring` → kf `SpringProgress`)
//     and exposes the `squish?: boolean` toggle so ONE wrapper serves BOTH press registers.
//     Button.vue PRESERVES the byte-identical `--glass-btn-press-t` drive on its DIRECT
//     `useSpringPress` composition (the `proof:button-glass` B2 fence held).
//
// BG.W-DRAWER-PAINT-BIND (F5.R2) ADDS the drawer model↔paint bind arm (D1-D4). The
// `useDrawerSnap` engine wrote `--glass-drawer-t` to a STALE reka `$el` snapshot (captured
// when `<Presence>` had not yet mounted the sheet), so `writeScalar` "never fired" on the
// live element and the scalar stayed un-written — and because the CSS default was `1`
// (full-open) the sheet SILENTLY seated open, MASKING the dead writer (the live-gesture π
// the settled-capture harness could not see). D1/D2 lock the NO-MASKING-FALLBACK edict
// (the un-written default is the CSS CLOSED state 0, never full-open — a dead writer fails
// LOUD offscreen); D3 locks the LIVE content resolution (a `() => HTMLElement | null` getter
// resolved per write, reached from the proven-live handle, not the snapshotted `$el`); D4
// locks the open-seat slide-in (seed the spring CLOSED so DRAWER_SNAP paints, not a settled
// no-op at the seat). Its self-test re-introduces the masking `initial-value: 1` and asserts
// the arm flags it.
//
// BG.W-OVERLAY-ENTER-PAINT (F5.R1) ADDS the overlay-enter-paint arm (O1-O4). The zero-JS
// `.glass-reveal` enter never composited a from-state — reka mounts the portaled
// Dialog/Sheet/Popover content already `data-state="open"` at first paint, so the
// `[closed]→[open]` transition had NO prior computed style and the whole enter landed in
// ONE ~44ms frame (the opacity/blur pop), while the modal scrim ran its OWN slower clock,
// decoupled from the panel launch. O1 locks the real from-state (an `@starting-style` block
// on `.glass-reveal[data-state="open"]` — the §TOP-LAYER `.glass-top-layer` grammar applied
// to the data-state recipe); O2 locks the COUPLED scale + opacity 0 + filter-blur from-state
// (≥6 intermediate frames on the snappy clock); O3 locks the side-anchored `translate`
// from-state (a side popover SLIDES from its edge, not a pop-in-place); O4 locks the scrim
// coupling (the native `[open]::backdrop` gets a launch-coupled ENTER clock on `--ease-out`
// / `--top-layer-backdrop-in` so the dim reaches its target within ~100ms, the base rule
// staying the released-with-panel EXIT clock). Its self-test strips the `@starting-style`
// from-state (the HEAD one-frame-pop state) and asserts the arm flags it.
//
// SELF-PROVING: the detector runs against synthetic states that (a) re-plant a dead
// composable (file present + a live import) and (b) re-fork the rAF/ElementMorph runner into
// a bloom wrapper, and asserts BOTH FLAG — so the gate's teeth cannot silently rot (the
// born-RED→GREEN discipline, the house comment-strip-free pure-detector pattern).
//
// Device-free. Tags ["local","ci","release"].

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// BG.W-LIQUID-WEIGHT-DEFAULT (F5.2) — the LW arm diffs the committed
// --transition-liquid-spatial line against the regen's ONE source (drift-proof).
// generateInteractiveSpatialBlock() is a PURE string (no keyframes.js call), so the
// import is cheap; proof:spring-tokens-synced imports the same module in CI.
import { generateInteractiveSpatialBlock } from "./regen-spring-tokens.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:motion";
// The drift-proof expected committed line for --transition-liquid-spatial (trimmed of
// its 4-space indent). The regen owns the "which spring is the interactive-spatial
// default" mapping; the LW arm asserts the committed scheme-spring.css matches.
const GENERATED_LIQUID_SPATIAL = generateInteractiveSpatialBlock().trim();

// ── The dead composables (DEFINITION-ABSENT) ───────────────────────────────────
const DEAD = [
    { name: "useHaptic", path: "src/composables/motion/core/useHaptic.ts", base: "useHaptic" },
    { name: "useCelebrationBurst", path: "src/composables/motion/useCelebrationBurst.ts", base: "useCelebrationBurst" },
    { name: "useVizChoreography", path: "src/composables/glass/useVizChoreography.ts", base: "useVizChoreography" },
    { name: "useLiquidMorph", path: "src/composables/motion/useLiquidMorph.ts", base: "useLiquidMorph" },
    { name: "useDockContextSilhouette", path: "src/components/custom/dock/composables/useDockContextSilhouette.ts", base: "useDockContextSilhouette" },
    // GUTTED — the weld function is gone; only morphSignatures.ts survives (M3).
    { name: "useMorphField", path: "src/composables/motion/useMorphField.ts", base: "useMorphField" },
];

// The paired CSS that must leave src/ (deleted or moved to demo/).
const DEAD_SRC_CSS = [
    "src/styles/jubilance.css",
    "src/styles/motion/morph-field.css",
    "src/styles/glass/liquid-morph.css",
];

// The three lying "≥2-consumer" evidence docs (deleted with their subjects — the
// proof:consumer-evidence-live forcing rule keeps this consistent).
const DEAD_EVIDENCE = [
    "docs/consumer-evidence/use-haptic.md",
    "docs/consumer-evidence/use-celebration-burst.md",
    "docs/consumer-evidence/use-viz-choreography.md",
];

// The retired subject-gates (their subject composable is deleted — a surviving gate REDs).
const DEAD_GATES = [
    "scripts/proof-haptic.mjs",
    "scripts/proof-celebration-burst.mjs",
    "scripts/proof-viz-choreography.mjs",
    "scripts/proof-dock-context.mjs",
];

// ── The BG.W-MOTION-SPINE runner-single surface (S1) ────────────────────────────
// The ONE FLIP/morph runner + the bloom leaves that COLLAPSE onto it. The two shipped in
// this cut are useLiquidReveal + useDockCtaReceive (the reveal + cta family); useBloomUp's
// fold is BOOKED (its 4th color channel + no-mount-flash prime couple tightly into
// proof:bloom-up's per-channel W3/W4 asserts, which must follow the carve into the spine's
// abstracted shape — a bounded successor, its own gate-widen). Until then useBloomUp keeps
// its own runner and is NOT on this runner-single watch (it is not one of the folded leaves).
const SPINE_PATH = "src/composables/motion/useElementMorph.ts";
const BLOOM_WRAPPERS = [
    "src/composables/motion/useLiquidReveal.ts",
    "src/composables/motion/useDockCtaReceive.ts",
];

// ── The import corpus — every src/ + demo/ .ts/.vue/.mjs source (the grep surface for a
//    surviving live import of a deleted module). ──────────────────────────────────
const CORPUS_ROOTS = ["src", "demo"];
const CORPUS_EXTS = new Set([".ts", ".vue", ".mjs"]);
const IGNORE_DIRS = new Set(["node_modules", "dist", ".git"]);

function collectCorpus() {
    const out = [];
    const walk = (dir) => {
        let entries;
        try {
            entries = readdirSync(dir, { withFileTypes: true });
        } catch {
            return;
        }
        for (const e of entries) {
            if (IGNORE_DIRS.has(e.name)) continue;
            const full = resolve(dir, e.name);
            if (e.isDirectory()) walk(full);
            else if (e.isFile() && CORPUS_EXTS.has(extname(e.name))) {
                out.push({ path: full.slice(ROOT.length + 1), content: readFileSync(full, "utf8") });
            }
        }
    };
    for (const r of CORPUS_ROOTS) walk(resolve(ROOT, r));
    return out;
}

// ── The pure detector — takes an environment so the self-test can inject a synthetic
//    mutated state (a re-planted dead composable). ─────────────────────────────────
function detect({ existsFn, readFn, corpus }) {
    const V = [];

    // M1 — the dead composables are DEFINITION-ABSENT + no live import survives.
    for (const c of DEAD) {
        if (existsFn(c.path))
            V.push(`M1: ${c.name} — ${c.path} still on disk (must be DEFINITION-ABSENT)`);
        const spec = new RegExp(`from\\s+["'][^"']*${c.base}["']`);
        for (const f of corpus) {
            if (spec.test(f.content))
                V.push(`M1: ${c.name} — a live import of the deleted module survives in ${f.path}`);
        }
    }

    // M2 — the paired CSS left src/ AND the cascade + partition-manifest are unwired.
    for (const css of DEAD_SRC_CSS) {
        if (existsFn(css))
            V.push(`M2: paired CSS still in src/ (${css}) — must be deleted or moved to demo/`);
    }
    const indexCss = readFn("src/styles/index.css");
    if (/@import\s+["']\.\/jubilance\.css["']/.test(indexCss))
        V.push("M2: jubilance.css still @import-ed in styles/index.css");
    if (/@import\s+["']\.\/motion\/morph-field\.css["']/.test(indexCss))
        V.push("M2: motion/morph-field.css still @import-ed in styles/index.css");
    const partition = readFn("src/styles/critical-partition.mjs");
    if (/["']jubilance\.css["']/.test(partition))
        V.push("M2: jubilance.css still enrolled in critical-partition DEFERRED_PARTIALS");
    if (/["']motion\/morph-field\.css["']/.test(partition))
        V.push("M2: motion/morph-field.css still enrolled in critical-partition DEFERRED_PARTIALS");

    // M3 — the GUT: MORPH_SIGNATURES survives on morphSignatures.ts + the root barrel.
    if (!existsFn("src/composables/motion/morphSignatures.ts"))
        V.push("M3: morphSignatures.ts (the gutted DATA leaf) is missing");
    const sig = readFn("src/composables/motion/morphSignatures.ts");
    if (!/export const MORPH_SIGNATURES\b/.test(sig))
        V.push("M3: morphSignatures.ts does not export MORPH_SIGNATURES");
    if (!/export type MorphSignatureName\b/.test(sig))
        V.push("M3: morphSignatures.ts does not export the MorphSignatureName type");
    const rootBarrel = readFn("src/index.ts");
    if (!/MORPH_SIGNATURES[\s\S]{0,240}from\s+["']\.\/composables\/motion\/morphSignatures["']/.test(rootBarrel))
        V.push("M3: the root barrel does not re-export MORPH_SIGNATURES from ./composables/motion/morphSignatures");

    // M4 — the three lying evidence docs are deleted.
    for (const d of DEAD_EVIDENCE) {
        if (existsFn(d)) V.push(`M4: lying consumer-evidence doc still present (${d})`);
    }

    // M5 — NAME-COLLISION FENCE: proof:liquid-morph (the BC dock-morph teardrop gate, a
    //      DISTINCT concern from the deleted useLiquidMorph composable) MUST survive.
    if (!existsFn("scripts/proof-liquid-morph.mjs"))
        V.push(
            "M5: NAME-COLLISION FENCE breached — scripts/proof-liquid-morph.mjs (the BC.W-LIQUID-MORPH dock-morph gate, NOT the deleted useLiquidMorph composable) must NOT be touched",
        );

    // M6 — the retired subject-gates are deleted (their subject composable is gone).
    for (const g of DEAD_GATES) {
        if (existsFn(g))
            V.push(`M6: retired subject-gate still present (${g}) — its subject composable is DEFINITION-ABSENT`);
    }

    // ── S1 — the ONE FLIP/morph runner (BG.W-MOTION-SPINE) ──────────────────────────
    const spine = readFn(SPINE_PATH);
    if (!existsFn(SPINE_PATH)) {
        V.push(`S1: ${SPINE_PATH} (the ONE FLIP/morph runner) is missing`);
    } else {
        if (!/new\s+ElementMorph\b/.test(spine))
            V.push("S1: the spine must construct the ONE `new ElementMorph` (the compositor rect-delta)");
        if (!/requestAnimationFrame\s*\(/.test(spine))
            V.push("S1: the spine must own the ONE rAF `step()` loop");
        if (!/springTimingFunction\s*\(/.test(spine))
            V.push("S1: the spine must sample the spring curve via `springTimingFunction` (never a hand curve)");
        if (!/springPreset\s*\(/.test(spine))
            V.push("S1: the spine must sample the (response, ζ) from SPRING_PRESETS via `springPreset()`");
        if (!/export\s+function\s+lockSpatialTransition\b/.test(spine))
            V.push("S1: the spine must export `lockSpatialTransition` (the §3.1 driver-lock seam)");
        if (!/export\s+function\s+asElement\b/.test(spine))
            V.push("S1: the spine must export the hoisted `asElement` resolver (the binding-verification cure — every bloom leaf imports it)");
    }
    // The three bloom leaves COMPOSE the spine + own NO second runner.
    for (const w of BLOOM_WRAPPERS) {
        if (!existsFn(w)) {
            V.push(`S1: bloom wrapper missing (${w})`);
            continue;
        }
        const src = readFn(w);
        if (!/\buseElementMorph\b/.test(src))
            V.push(`S1: ${w} must COMPOSE useElementMorph (the ONE runner) — a wrapper cannot re-fork the morph engine`);
        if (/new\s+ElementMorph\b/.test(src))
            V.push(`S1: ${w} constructs its OWN \`new ElementMorph\` — the runner is single-sourced in useElementMorph.ts (no second FLIP engine)`);
        if (/requestAnimationFrame\s*\(/.test(src))
            V.push(`S1: ${w} runs its OWN \`requestAnimationFrame\` loop — the rAF runner is single-sourced (compose the spine, do not re-fork it)`);
        if (/springTimingFunction\s*\(/.test(src))
            V.push(`S1: ${w} re-samples \`springTimingFunction\` — the spring sample is the spine's ONE source`);
    }

    // ── S2 — the press-tower collapse (BG.W-MOTION-SPINE / R16 WATCH-3) ─────────────
    const lp = readFn("src/composables/motion/useLiquidPress.ts");
    if (!/useSpringPress\s*\(/.test(lp))
        V.push("S2: useLiquidPress must compose `useSpringPress` (the interruptible velocity-continuous re-seat — the iOS press contract)");
    if (!/\bsquish\?\s*:\s*boolean/.test(lp))
        V.push("S2: useLiquidPress must expose the `squish?: boolean` collapse toggle (the ONE wrapper serving BOTH press registers — bare + squishy)");
    if (!/options\.squish\s*!==\s*false/.test(lp))
        V.push("S2: useLiquidPress must BRANCH on the squish toggle (the bare-mode path — `options.squish !== false`), not ignore it");
    // The interruptible re-seat chain: useSpringPress → useSpring → kf SpringProgress.
    const sp = readFn("src/composables/motion/useSpringPress.ts");
    if (!/\buseSpring\b/.test(sp))
        V.push("S2: useSpringPress must compose `useSpring` (the SpringProgress velocity-continuous re-seat — a play() mid-flight retargets, never restarts)");
    // Button preserves the byte-identical --glass-btn-press-t drive on the DIRECT
    // useSpringPress composition (WATCH-3 — the proof:button-glass B2 direct-composition fence).
    const btn = readFn("src/components/ui/button/Button.vue");
    if (!/useSpringPress\s*\(/.test(btn))
        V.push("S2: Button.vue must KEEP composing `useSpringPress` DIRECTLY (the proof:button-glass B2 fence — WATCH-3; Button is NOT routed through useLiquidPress)");
    if (!/--glass-btn-press-t/.test(btn))
        V.push("S2: Button.vue must PRESERVE the byte-identical `--glass-btn-press-t` press drive (WATCH-3 — the gleam/specular coupling reads it)");

    // ── D — the drawer model↔paint bind (BG.W-DRAWER-PAINT-BIND / F5.R2) ────────────
    // The snap engine's `--glass-drawer-t` scalar must actually PAINT. On HEAD the writer
    // wrote to a stale reka `$el` snapshot (never the live sheet), so the scalar stayed
    // un-written and — because the CSS default was `1` (full-open) — the sheet SILENTLY
    // seated open, MASKING the dead writer. This arm locks the repair: (D1/D2) the
    // un-written default is the CSS CLOSED state (0), never the masking full-open `1`
    // (the NO-MASKING-FALLBACK edict — a dead writer must fail LOUD, offscreen); (D3) the
    // writer resolves the content element LIVE per write (a getter, not a snapshotted
    // ref), reached from the proven-live handle; (D4) the open path seeds the spring
    // CLOSED so DRAWER_SNAP paints a real slide-in, not a settled no-op at the seat.
    const drawerCss = readFn("src/styles/drawer.css");
    const drawerContent = readFn("src/components/ui/drawer/DrawerContent.vue");
    const drawerSnap = readFn("src/components/ui/drawer/composables/useDrawerSnap.ts");

    // D1 — the `@property --glass-drawer-t` registered default is the CLOSED state (0),
    //      never the masking full-open fallback (1).
    const propBlock = drawerCss.match(/@property\s+--glass-drawer-t\s*\{[^}]*\}/);
    if (!propBlock) {
        V.push("D1: drawer.css is missing the `@property --glass-drawer-t` registration");
    } else {
        if (/initial-value\s*:\s*1\b/.test(propBlock[0]))
            V.push("D1: `@property --glass-drawer-t` initial-value is 1 (the masking full-open fallback that hid the dead writer) — the NO-MASKING-FALLBACK edict requires the CLOSED state 0");
        if (!/initial-value\s*:\s*0\b/.test(propBlock[0]))
            V.push("D1: `@property --glass-drawer-t` initial-value must be 0 (the CSS CLOSED / fail-loud state)");
    }

    // D2 — the content transform reads NO masking `1` fallback (a dead writer must read
    //      offscreen/closed, not full-open).
    if (/--glass-drawer-t\s*,\s*1\b/.test(drawerContent))
        V.push("D2: DrawerContent.vue transform reads `var(--glass-drawer-t, 1)` — the masking full-open fallback; the un-written fallback must be `0` (the CSS CLOSED state)");

    // D3 — the writer reaches the LIVE content element (the SEVER repair). The composable
    //      option is a live GETTER (not a snapshotted Ref) resolved per write, and
    //      DrawerContent passes a live resolver — NOT the dead `$el` function-ref snapshot.
    if (!/contentEl\s*:\s*\(\)\s*=>\s*HTMLElement\s*\|\s*null/.test(drawerSnap))
        V.push("D3: useDrawerSnap's `contentEl` option must be a LIVE getter `() => HTMLElement | null` (reka forwards its root through a <Presence> swap — a snapshotted Ref captures a stale comment node, the model↔paint SEVER)");
    if (/contentEl\.value\b/.test(drawerSnap))
        V.push("D3: useDrawerSnap still reads `contentEl.value` (a snapshotted ref) — resolve the element LIVE via `contentEl()` on every write");
    if (!/\bcontentEl\(\)/.test(drawerSnap))
        V.push("D3: useDrawerSnap must resolve the content element LIVE via `contentEl()` (the fresh-per-write reach into the portaled sheet)");
    if (!/closest\(\s*['"]\[data-glass-drawer\]['"]\s*\)/.test(drawerContent))
        V.push("D3: DrawerContent.vue must resolve the live content root from the handle (`handleEl.closest('[data-glass-drawer]')`) — the proven-live ref, not reka's stale `$el` snapshot");
    if (/instanceof\s+HTMLElement\s*\?\s*el\s*:\s*null/.test(drawerContent))
        V.push("D3: DrawerContent.vue still snapshots reka's `$el` (`el instanceof HTMLElement ? el : null`) — the stale function-ref binding is the sever; resolve LIVE from the handle");

    // D4 — the open path seeds the spring at the CLOSED endpoint so DRAWER_SNAP paints a
    //      real slide-in (not a settled no-op at the seat), and seats the closed base.
    if (!/ensureSpring\(\s*0\s*\)/.test(drawerSnap))
        V.push("D4: the open path must seed the spring CLOSED via `ensureSpring(0)` so DRAWER_SNAP paints a slide-in from closed (an `initial: currentFraction()` seed leaves the spring settled at the seat — a no-op, no paint)");
    if (!/writeScalar\(\s*0\s*\)/.test(drawerSnap))
        V.push("D4: the open path must seat the CLOSED base via `writeScalar(0)` (the fail-loud starting frame)");

    // ── O — the overlay-enter-paint arm (BG.W-OVERLAY-ENTER-PAINT / F5.R1) ──────────
    // The zero-JS `.glass-reveal` enter never composited a from-state: reka mounts the
    // portaled Dialog/Sheet/Popover content already `data-state="open"` at first paint,
    // so the `[closed]→[open]` transition had NO prior computed style and the whole enter
    // landed in ONE ~44ms frame (the opacity/blur pop), while the scrim ran its OWN slower
    // clock, decoupled from the panel launch. The repair (glass/reveal.css +
    // animations.css): (O1) `.glass-reveal[data-state="open"]` gets a real from-state via
    // an `@starting-style` block (the §TOP-LAYER `.glass-top-layer` grammar applied to the
    // data-state recipe), so the enter interpolates FROM the closed values on the snappy
    // clock; (O2) that from-state is the COUPLED scale + opacity 0 + filter-blur trio
    // (≥6 intermediate frames); (O3) the side-anchored variants carry a `translate`
    // from-state so a side popover SLIDES from its edge; (O4) the native modal scrim
    // (`dialog.glass-top-layer[open]::backdrop`) gets a launch-coupled ENTER clock on
    // `--ease-out` so the dim reaches its target within the panel window, the base rule
    // staying the EXIT clock.
    const stripCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "");
    const reveal = stripCss(readFn("src/styles/glass/reveal.css"));
    const anim = stripCss(readFn("src/styles/animations.css"));

    // Brace-match the `.glass-reveal[data-state="open"]` rule body (the @starting-style
    // block nests inside it).
    const openRuleBody = (() => {
        const m = reveal.match(/\.glass-reveal\[data-state="open"\]\s*\{/);
        if (!m) return null;
        let i = m.index + m[0].length;
        let depth = 1;
        const start = i;
        for (; i < reveal.length && depth > 0; i++) {
            if (reveal[i] === "{") depth++;
            else if (reveal[i] === "}") depth--;
        }
        return reveal.slice(start, i - 1);
    })();

    if (openRuleBody == null) {
        V.push('O1: .glass-reveal[data-state="open"] rule not found in reveal.css (the LIQUID-ENTER recipe has no open state)');
    } else if (!/@starting-style\s*\{/.test(openRuleBody)) {
        V.push(
            'O1: .glass-reveal[data-state="open"] carries NO @starting-style block — reka mounts the portaled content already `open`, so with no from-state the whole enter lands in ONE frame (the opacity/blur pop). Give the enter a real from-state (the §TOP-LAYER grammar).',
        );
    } else {
        // O2 — the enter @starting-style provides the COUPLED SPATIAL+EFFECTS from-state:
        //      a scale (bloom), opacity 0 (fade), and a filter blur (light-bending decongest).
        const ss = openRuleBody.match(/@starting-style\s*\{([\s\S]*?)\}/);
        const ssBody = ss ? ss[1] : "";
        if (!/\bscale\s*:/.test(ssBody))
            V.push('O2: the enter @starting-style sets no `scale` from-state (the bloom-from-small — scale (0.88 × squish) → 1; without it the enter does not grow)');
        if (!/opacity\s*:\s*0\b/.test(ssBody))
            V.push('O2: the enter @starting-style sets no `opacity: 0` from-state (the coupled fade — the surface must materialize, not appear at full opacity)');
        if (!/filter\s*:\s*blur\(/.test(ssBody))
            V.push('O2: the enter @starting-style sets no `filter: blur(...)` from-state (the iOS light-bending decongest — the surface must clarify AS it blooms)');
    }

    // O3 — the side-anchored open variants carry a `translate` @starting-style from-state
    //      so a side popover SLIDES from its edge (reka mounts at `translate: 0 0` — with
    //      no from-state the side popover pops in place, never slides).
    const sideSlideFromState =
        /\.glass-reveal\[data-side="(?:top|bottom|left|right)"\]\[data-state="open"\][\s\S]*?@starting-style\s*\{[^{}]*translate\s*:/.test(
            reveal,
        );
    if (!sideSlideFromState)
        V.push(
            'O3: no side-anchored .glass-reveal[data-side][data-state="open"] rule provides a `translate` @starting-style from-state (a side popover mounts at `translate: 0 0` with no from-state — it pops in place instead of sliding from its edge)',
        );

    // O4 — the scrim couples to launch: the native modal `[open]::backdrop` gets its OWN
    //      launch-coupled ENTER transition on `--ease-out` reading the `--top-layer-
    //      backdrop-in` fast clock — distinct from the slower `--ease-standard`/`--duration-
    //      normal` EXIT clock on the base rule, so the dim reaches its target within ~100ms
    //      of launch (the panel window) rather than trailing ~400ms behind it.
    const openBackdropIdx = anim.search(/dialog\.glass-top-layer\[open\]::backdrop\s*\{/);
    if (openBackdropIdx < 0) {
        V.push("O4: dialog.glass-top-layer[open]::backdrop rule not found in animations.css (the modal scrim launch coupling has no home)");
    } else {
        const region = anim.slice(openBackdropIdx, openBackdropIdx + 700);
        const hasEnterTransition = /transition\s*:[^;]*var\(--ease-out\)/.test(region);
        if (!hasEnterTransition)
            V.push(
                "O4: the modal scrim [open]::backdrop carries no launch-coupled ENTER transition on `--ease-out` (the scrim must reach ≥80% dim within ~100ms of launch, released with the exit — at HEAD it decoupled onto the base --ease-standard clock and trailed ~400ms)",
            );
        if (!/var\(--top-layer-backdrop-in/.test(region))
            V.push(
                "O4: the modal scrim [open]::backdrop ENTER does not read the launch-coupled `--top-layer-backdrop-in` clock (couple the dim to the panel launch window, not the slow --duration-normal exit)",
            );
    }

    // ── O5 — the EXIT PAINTS (BG.W-OVERLAY-ENTER-PAINT / F5.R1 repair) ───────────────
    // The paint-judge FAIL: the enter bloom paints, but the Dialog+Popover EXIT painted
    // 0 frames — the `.glass-reveal[data-state="closed"]` exit was a CSS TRANSITION
    // (`animation-name: none`), and reka-ui's `usePresence` gates the portaled-overlay
    // unmount on `getComputedStyle(node).animationName` (it awaits animationstart/
    // animationend, with NO transitionend path), so a transition-only exit is torn down
    // (~11ms, <1 frame) before it can paint. The Sheet is immune only because its
    // `sheet-animate` is a @keyframes animation reka awaits. The repair gives the exit
    // the SAME kind: a `@keyframes glass-reveal-out` reka can await, applied on the closed
    // rule (`animationName ≠ none`) so `usePresence` dispatches ANIMATION_OUT and the exit
    // paints its full ≥4-frame recede. This arm is born-RED on the HEAD transition-only
    // exit (no `animation` on the closed rule, no `glass-reveal-out` keyframe).

    // Brace-match the BASE `.glass-reveal[data-state="closed"]` rule body (the exit leg).
    // The regex requires `{` right after the closed attr (with optional whitespace), so
    // the per-side `.glass-reveal[data-state="closed"][data-side="…"]` variants (which
    // carry `[data-side` before their `{`) do NOT match — the FIRST match is the base
    // exit rule inside @layer components.
    const closedRuleBody = (() => {
        const m = reveal.match(/\.glass-reveal\[data-state="closed"\]\s*\{/);
        if (!m) return null;
        let i = m.index + m[0].length;
        let depth = 1;
        const start = i;
        for (; i < reveal.length && depth > 0; i++) {
            if (reveal[i] === "{") depth++;
            else if (reveal[i] === "}") depth--;
        }
        return reveal.slice(start, i - 1);
    })();

    if (closedRuleBody == null) {
        V.push('O5: .glass-reveal[data-state="closed"] exit rule not found in reveal.css (the LIQUID-ENTER recipe has no closed/exit state)');
    } else if (!/animation\s*:\s*glass-reveal-out\b/.test(closedRuleBody)) {
        V.push(
            'O5: the .glass-reveal[data-state="closed"] EXIT is not a keyframe animation reka can await — it must apply `animation: glass-reveal-out …`. reka `usePresence` reads `getComputedStyle(node).animationName`; a transition-only exit resolves `none` and is torn down (<1 frame) before it paints (the paint-judge Dialog+Popover 0-exit-frame FAIL). Give the exit a @keyframes animation (the SAME mechanism that makes the Sheet exit paint).',
        );
    }

    // O5b — the `@keyframes glass-reveal-out` exists AND fades opacity → 0 (the exit fade
    //       reka's animationend gates, the SAME channels the enter blooms, reversed).
    const revealOutKf = anim.match(/@keyframes\s+glass-reveal-out\s*\{([\s\S]*?)\n\}/);
    if (!revealOutKf) {
        V.push("O5b: animations.css has no `@keyframes glass-reveal-out` (the awaited exit animation reka's usePresence gates the unmount on) — a transition-only exit is torn down before it paints");
    } else if (!/opacity\s*:\s*0\b/.test(revealOutKf[1])) {
        V.push("O5b: `@keyframes glass-reveal-out` does not fade `opacity: 0` (the exit must recede to gone — the coupled fade, the reversed enter bloom)");
    }

    // O5c — the PRM carve keeps the exit PAINTING (fade only): the reduced-motion closed
    //       rule swaps `animation-name` to `glass-reveal-out-reduced` AND that fade-only
    //       keyframe exists — the vestibular floor (no transform/blur frames, but the fade
    //       still paints; a transition-only fade would be torn down the same way).
    if (!/animation-name\s*:\s*glass-reveal-out-reduced\b/.test(reveal))
        V.push("O5c: the reduced-motion `.glass-reveal[data-state=\"closed\"]` carve does not swap `animation-name: glass-reveal-out-reduced` — under PRM a transition-only fade is torn down (the surface vanishes); keep the fade painting via a keyframe reka awaits");
    if (!/@keyframes\s+glass-reveal-out-reduced\s*\{/.test(anim))
        V.push("O5c: animations.css has no `@keyframes glass-reveal-out-reduced` (the PRM fade-only exit reka awaits — the vestibular floor)");

    // ── LW — the liquid-weight-default inversion (BG.W-LIQUID-WEIGHT-DEFAULT / F5.2) ──
    // The DEFAULT interactive-transition SPATIAL register is spring-derived, not a bare
    // `--ease-standard` bezier. HEAD: `.interactive-item`'s scale leg rode `--ease-standard`
    // (zero weight) — weight was a per-site `--motion-weight` allowlist, never the default.
    // This wave INVERTS it: weight becomes a property of the transition VOCABULARY.
    // `--transition-liquid-spatial` (spring-derived, GENERATED drift-proof by
    // regen-spring-tokens.mjs) is read on the SPATIAL (scale) leg of the base interactive
    // atoms, so every interactive surface inherits weight by default; `.motion-calm` is the
    // EXPLICIT opt-out; the PRM carve re-aliases it to the no-overshoot bezier. Born-RED on
    // HEAD (token absent + `.interactive-item` on a bezier + no `.motion-calm`).
    const schemeSpring = readFn("src/styles/tokens/scheme-spring.css");
    const schemeMotion = readFn("src/styles/tokens/scheme-motion.css");
    const baseCss = readFn("src/styles/utilities/base.css");
    const btnCss = readFn("src/styles/utilities/btn.css");

    // LW1 — the token is minted AND its default resolves to a SPRING register
    //       (var(--spring-*)), NEVER a bare `--ease-*` bezier (a bezier default would
    //       defeat the inversion — the base register must be spring-derived).
    const liquidDecl = schemeSpring.match(/--transition-liquid-spatial\s*:\s*([^;]+);/);
    if (!liquidDecl) {
        V.push("LW1: --transition-liquid-spatial is not minted in tokens/scheme-spring.css (the interactive-spatial DEFAULT curve — the liquid-weight inversion has no token; run `node scripts/regen-spring-tokens.mjs`)");
    } else if (!/var\(\s*--spring-[a-z]+\s*\)/.test(liquidDecl[1])) {
        V.push(`LW1: --transition-liquid-spatial default ('${liquidDecl[1].trim()}') does NOT resolve to a spring register var(--spring-*) — the base interactive-transition register must be spring-derived, not a bare bezier (the inversion is defeated by a bezier default)`);
    }

    // LW2 — the token is GENERATED drift-proof (the committed line matches
    //       regen-spring-tokens.mjs output — the ONE mapping source, the exemplar pattern).
    if (liquidDecl && !schemeSpring.includes(GENERATED_LIQUID_SPATIAL)) {
        V.push(`LW2: the committed --transition-liquid-spatial line does not match regen-spring-tokens.mjs output ('${GENERATED_LIQUID_SPATIAL}') — run 'node scripts/regen-spring-tokens.mjs' + commit (the drift-proof exemplar; a hand-edit drifts)`);
    }

    // LW3 — the base interactive-atom recipes read var(--transition-liquid-spatial) on
    //       their SPATIAL (scale) leg. Born-RED: HEAD's `.interactive-item` scale rode
    //       `--ease-standard`. The scan brace-matches each recipe body then checks the
    //       `scale … var(--transition-liquid-spatial)` transition leg is present.
    const readsLiquidScale = (css, selectorRe) => {
        const m = css.match(selectorRe);
        if (!m) return false;
        let i = m.index + m[0].length;
        let depth = 1;
        const start = i;
        for (; i < css.length && depth > 0; i++) {
            if (css[i] === "{") depth++;
            else if (css[i] === "}") depth--;
        }
        const body = css.slice(start, i - 1);
        return /scale\s+[^,;]*var\(\s*--transition-liquid-spatial\s*\)/.test(body);
    };
    if (!readsLiquidScale(baseCss, /\.interactive-item\s*\{/))
        V.push("LW3: .interactive-item's scale (SPATIAL) leg does not ride var(--transition-liquid-spatial) in utilities/base.css — the base interactive DEFAULT still carries zero weight (HEAD rode --ease-standard; the inversion is not applied)");
    if (!readsLiquidScale(baseCss, /\.tap-squish\s*\{/))
        V.push("LW3: .tap-squish's scale (SPATIAL) leg does not ride var(--transition-liquid-spatial) in utilities/base.css — the press vocabulary must read the opt-out token so `.motion-calm` reaches the Card press in lockstep");
    if (!readsLiquidScale(btnCss, /@utility\s+btn-interactive\s*\{/))
        V.push("LW3: the btn-interactive @utility's scale leg does not ride var(--transition-liquid-spatial) in utilities/btn.css — the named interactive-atom @utility must join the ONE spatial vocabulary (else `.motion-calm` cannot opt the button lift out of overshoot)");

    // LW4 — the .motion-calm opt-out swaps the token to the calm bezier (the EXPLICIT
    //       opt-out — a consumer wanting calm adds .motion-calm; born-RED: absent on HEAD).
    if (!/\.motion-calm\s*\{[^}]*--transition-liquid-spatial\s*:\s*var\(\s*--ease-standard\s*\)/.test(schemeMotion))
        V.push("LW4: the `.motion-calm { --transition-liquid-spatial: var(--ease-standard) }` opt-out is missing from tokens/scheme-motion.css — the calm register must be an EXPLICIT opt-out, not the accidental default");

    // LW5 — the PRM carve re-aliases the token to the no-overshoot bezier under reduce
    //       (the vestibular floor; mirrors the --ease-cartoon-punch PRM re-alias).
    const prmBlock = schemeMotion.match(/@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{[\s\S]*?\n\}/);
    if (!prmBlock || !/--transition-liquid-spatial\s*:\s*var\(\s*--ease-standard\s*\)/.test(prmBlock[0]))
        V.push("LW5: the PRM `@media (prefers-reduced-motion: reduce)` carve in scheme-motion.css does not re-alias --transition-liquid-spatial to var(--ease-standard) — under reduce the interactive spatial legs must lose their overshoot (the vestibular floor; mirrors the --ease-cartoon-punch PRM re-alias)");

    return V;
}

// ── The live disk run ───────────────────────────────────────────────────────────
const diskExists = (rel) => existsSync(resolve(ROOT, rel));
const diskRead = (rel) => (existsSync(resolve(ROOT, rel)) ? readFileSync(resolve(ROOT, rel), "utf8") : "");
const corpus = collectCorpus();

const violations = detect({ existsFn: diskExists, readFn: diskRead, corpus });

// ── The self-test bite — re-plant a dead composable (file present + a live import) and
//    assert the detector FLAGS it (the teeth-are-real proof). ─────────────────────
const synthCorpus = [
    ...corpus,
    {
        path: "src/_synthetic-motion-regression.ts",
        content: 'import { useHaptic } from "./composables/motion/core/useHaptic";\n',
    },
];
const synthExists = (rel) =>
    rel === "src/composables/motion/core/useHaptic.ts" ? true : diskExists(rel);
const synthViolations = detect({ existsFn: synthExists, readFn: diskRead, corpus: synthCorpus });
const selfTestFlags = synthViolations.length > violations.length;
if (!selfTestFlags) {
    console.error(
        "proof:motion — SELF-TEST FAILED: the detector did NOT flag a re-planted dead composable (useHaptic). The gate's teeth are gone; do not trust a GREEN.",
    );
    process.exit(1);
}

// ── The S1 self-test bite — re-fork the rAF/ElementMorph runner into a bloom wrapper and
//    assert the runner-single clause FLAGS it (BG.W-MOTION-SPINE teeth). ─────────────
const FORK_TARGET = "src/composables/motion/useLiquidReveal.ts";
const forkRead = (rel) =>
    rel === FORK_TARGET
        ? // a synthetic wrapper that re-forks the engine: a live requestAnimationFrame loop
          // over its OWN `new ElementMorph` — no useElementMorph compose (the dual-path shelf-ware)
          'let raf = 0;\nfunction play(el){ const m = new ElementMorph(a, b); raf = requestAnimationFrame(() => m.apply(el, 0.5)); }\n'
        : diskRead(rel);
const forkViolations = detect({ existsFn: diskExists, readFn: forkRead, corpus });
const s1SelfTestFlags = forkViolations.length > violations.length;
if (!s1SelfTestFlags) {
    console.error(
        "proof:motion — S1 SELF-TEST FAILED: the detector did NOT flag a bloom wrapper that re-forked the rAF/ElementMorph runner. The runner-single teeth are gone; do not trust a GREEN.",
    );
    process.exit(1);
}

// ── The D self-test bite — re-introduce the masking full-open fallback (--glass-drawer-t
//    initial-value: 1) and assert the drawer-paint-bind arm FLAGS it (the NO-MASKING teeth
//    are real; the `1` fallback is what silently hid the dead writer at HEAD). ─────────
const drawerCssDisk = diskRead("src/styles/drawer.css");
const maskRead = (rel) =>
    rel === "src/styles/drawer.css"
        ? drawerCssDisk.replace(/initial-value\s*:\s*0\b/, "initial-value: 1")
        : diskRead(rel);
const maskViolations = detect({ existsFn: diskExists, readFn: maskRead, corpus });
const dSelfTestFlags = maskViolations.length > violations.length;
if (!dSelfTestFlags) {
    console.error(
        "proof:motion — D SELF-TEST FAILED: the detector did NOT flag a re-introduced masking full-open fallback (--glass-drawer-t initial-value: 1). The NO-MASKING-FALLBACK / drawer-paint-bind teeth are gone; do not trust a GREEN.",
    );
    process.exit(1);
}

// ── The O self-test bite — strip the enter @starting-style from the .glass-reveal open
//    rule (the state HEAD shipped) and assert the overlay-enter-paint arm FLAGS it: the
//    reka portaled enter reverts to the one-frame pop (the born-RED teeth are real). ────
const revealDisk = diskRead("src/styles/glass/reveal.css");
const stripStartingRead = (rel) =>
    rel === "src/styles/glass/reveal.css"
        ? // remove every `@starting-style { … }` block (the from-states are non-nested)
          revealDisk.replace(/@starting-style\s*\{[^{}]*\}/g, "/* stripped @starting-style */")
        : diskRead(rel);
const stripViolations = detect({ existsFn: diskExists, readFn: stripStartingRead, corpus });
const oSelfTestFlags = stripViolations.length > violations.length;
if (!oSelfTestFlags) {
    console.error(
        "proof:motion — O SELF-TEST FAILED: the detector did NOT flag a .glass-reveal open rule stripped of its @starting-style from-state (the HEAD one-frame-pop state). The overlay-enter-paint teeth are gone; do not trust a GREEN.",
    );
    process.exit(1);
}

// ── The O5 self-test bite — revert the .glass-reveal EXIT to a transition-only recede
//    (drop the closed-rule `animation: glass-reveal-out …;`, the HEAD state reka's
//    usePresence tore down before it could paint — Dialog+Popover 0 exit frames) and
//    assert the exit-paints arm FLAGS it (the born-RED teeth are real). ─────────────────
const stripExitAnimRead = (rel) =>
    rel === "src/styles/glass/reveal.css"
        ? // drop the base closed-rule `animation: glass-reveal-out …;` — the exit reverts to
          //   the transition-only recede reka tears down before it paints (`animation-name`
          //   on the PRM carve is a different token, untouched)
          revealDisk.replace(/animation:\s*glass-reveal-out[^;]*;/g, "/* stripped exit animation */")
        : diskRead(rel);
const stripExitViolations = detect({ existsFn: diskExists, readFn: stripExitAnimRead, corpus });
const o5SelfTestFlags = stripExitViolations.length > violations.length;
if (!o5SelfTestFlags) {
    console.error(
        "proof:motion — O5 SELF-TEST FAILED: the detector did NOT flag a .glass-reveal EXIT reverted to a transition-only recede (the HEAD 0-exit-frame state reka tears down before it paints). The overlay-exit-paint teeth are gone; do not trust a GREEN.",
    );
    process.exit(1);
}

// ── The LW self-test bite — revert .interactive-item's scale leg to --ease-standard
//    (the HEAD zero-weight state) and assert the liquid-weight-default arm FLAGS it
//    (the born-RED teeth are real; --ease-standard on the base spatial leg is exactly the
//    zero-weight default this wave inverts). ──────────────────────────────────────────
const baseCssDiskLW = diskRead("src/styles/utilities/base.css");
const revertLiquidRead = (rel) =>
    rel === "src/styles/utilities/base.css"
        ? // revert the FIRST `scale … var(--transition-liquid-spatial)` leg (the
          //   `.interactive-item` atom) back to the bare --ease-standard bezier HEAD shipped
          baseCssDiskLW.replace(
              /(scale\s+[^,;]*)var\(\s*--transition-liquid-spatial\s*\)/,
              "$1var(--ease-standard)",
          )
        : diskRead(rel);
const revertLiquidViolations = detect({ existsFn: diskExists, readFn: revertLiquidRead, corpus });
const lwSelfTestFlags = revertLiquidViolations.length > violations.length;
if (!lwSelfTestFlags) {
    console.error(
        "proof:motion — LW SELF-TEST FAILED: the detector did NOT flag a .interactive-item scale leg reverted to var(--ease-standard) (the HEAD zero-weight default this wave inverts). The liquid-weight-default teeth are gone; do not trust a GREEN.",
    );
    process.exit(1);
}

// ── Report ──────────────────────────────────────────────────────────────────────
console.log("proof:motion — the F5 dead-composable cut is COMPLETE (BG.W-DEAD-COMPOSABLE-CUT)");
console.log(`  dead composables      : ${DEAD.map((d) => d.name).join(", ")}`);
console.log(`  paired CSS out of src/: ${DEAD_SRC_CSS.length} (jubilance · morph-field deleted; liquid-morph → demo/)`);
console.log(`  gutted DATA leaf      : morphSignatures.ts (MORPH_SIGNATURES on the barrel)`);
console.log(`  evidence docs deleted : ${DEAD_EVIDENCE.length}`);
console.log(`  retired gates deleted : ${DEAD_GATES.length}`);
console.log(`  name-collision fence  : proof-liquid-morph.mjs ${diskExists("scripts/proof-liquid-morph.mjs") ? "PRESENT (untouched)" : "MISSING"}`);
console.log("proof:motion — the F5.1 motion spine is single-sourced (BG.W-MOTION-SPINE)");
console.log(`  ONE FLIP/morph runner : ${SPINE_PATH} ${diskExists(SPINE_PATH) ? "PRESENT" : "MISSING"} (lockSpatialTransition + asElement + ONE rAF/ElementMorph)`);
console.log(`  bloom leaves collapsed: ${BLOOM_WRAPPERS.length} (useLiquidReveal · useDockCtaReceive — each ≤20-line-config, no second runner; useBloomUp fold BOOKED)`);
console.log(`  press-tower collapse  : useLiquidPress squish?-toggle + Button --glass-btn-press-t drive preserved (WATCH-3)`);
console.log("proof:motion — the drawer model↔paint bind PAINTS (BG.W-DRAWER-PAINT-BIND / F5.R2)");
console.log(`  --glass-drawer-t default: CLOSED (initial-value 0) — the masking full-open '1' fallback that hid the dead writer is GONE (NO-MASKING-FALLBACK edict)`);
console.log(`  live content resolve  : useDrawerSnap.contentEl is a () => HTMLElement | null getter (fresh per write; DrawerContent reaches it via handle.closest('[data-glass-drawer]'))`);
console.log(`  open-seat slide-in    : writeScalar(0) + ensureSpring(0) → DRAWER_SNAP {0.4,0.82} settles from CLOSED, no settled no-op`);
console.log(`  self-test (bite proof): OK — a re-planted dead composable, a re-forked rAF/ElementMorph runner, AND a re-introduced masking --glass-drawer-t: 1 all flag`);
console.log("proof:motion — the overlay .glass-reveal enter PAINTS a real from-state (BG.W-OVERLAY-ENTER-PAINT / F5.R1)");
console.log(`  enter from-state      : .glass-reveal[data-state="open"] @starting-style = scale(bloom×squish) + opacity 0 + filter blur — the reka portaled enter interpolates on the snappy clock (≥6 frames), not the HEAD one-frame pop`);
console.log(`  side-slide from-state : data-side[open] @starting-style translate (the side popover slides FROM its edge, not a pop-in-place)`);
console.log(`  scrim couples to launch: dialog.glass-top-layer[open]::backdrop ENTER on var(--top-layer-backdrop-in ~0.15s) + --ease-out — ≥80% dim within ~100ms; the base ::backdrop stays the released-with-panel EXIT clock`);
console.log(`  exit PAINTS (O5)      : .glass-reveal[data-state="closed"] rides @keyframes glass-reveal-out (scale/opacity/filter, --ease-out, the enter bloom REVERSED) — reka usePresence awaits animationName≠none so the exit paints ≥4 frames, not the transition-only 0-frame tear-down (the Sheet-immune mechanism); PRM → glass-reveal-out-reduced fade-only`);
console.log(`  self-test (bite proof): OK — a re-planted dead composable, a re-forked rAF/ElementMorph runner, a re-introduced masking --glass-drawer-t: 1, a .glass-reveal open rule stripped of its @starting-style from-state, AND a .glass-reveal exit reverted to transition-only all flag`);
console.log("proof:motion — the interactive-transition DEFAULT is spring-derived (BG.W-LIQUID-WEIGHT-DEFAULT / F5.2)");
console.log(`  liquid-weight-default : --transition-liquid-spatial = ${GENERATED_LIQUID_SPATIAL.replace(/^--transition-liquid-spatial:\s*/, "")} (spring-derived, GENERATED drift-proof) — the base atoms (.interactive-item · .tap-squish · btn-interactive) read it on their SPATIAL scale leg; weight is the VOCABULARY, not a per-site --motion-weight opt-in (the inversion off the HEAD bare --ease-standard)`);
console.log(`  calm opt-out + PRM    : .motion-calm → var(--ease-standard) (explicit opt-out) + the PRM carve re-aliases the same (no overshoot under reduce — the vestibular floor)`);
console.log(`  self-test (LW bite)   : OK — a .interactive-item scale leg reverted to var(--ease-standard) (the HEAD zero-weight default) flags`);
console.log(`  corpus scanned        : ${corpus.length} src/+demo/ sources`);
console.log(`  violations            : ${violations.length}`);
for (const m of violations) console.error(`  CUT-INCOMPLETE   ${m}`);

const ARTIFACT = gateArtifactPath("GATE_MOTION_OUT", "BG-motion");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    command: COMMAND,
    dead: DEAD.map((d) => d.name),
    deadSrcCss: DEAD_SRC_CSS,
    deadEvidence: DEAD_EVIDENCE,
    deadGates: DEAD_GATES,
    corpusScanned: corpus.length,
    selfTestFlagged: selfTestFlags,
    s1SelfTestFlagged: s1SelfTestFlags,
    dSelfTestFlagged: dSelfTestFlags,
    oSelfTestFlagged: oSelfTestFlags,
    o5SelfTestFlagged: o5SelfTestFlags,
    lwSelfTestFlagged: lwSelfTestFlags,
    transitionLiquidSpatial: GENERATED_LIQUID_SPATIAL,
    spine: SPINE_PATH,
    bloomWrappers: BLOOM_WRAPPERS,
    violations,
    green: violations.length === 0,
});

if (violations.length > 0) {
    console.error(`proof:motion — ${violations.length} cut-incomplete violation(s); the dead-composable cut is not GREEN.`);
    process.exit(1);
}
process.exit(0);
