// no-masking-manifest.mjs — the DORMANT-STATE MANIFEST (BG.NF.1 W-FALLBACK-EXCISE).
//
// The NO-MASKING-FALLBACK edict (docs/tranches/BG/audit/no-fallback/) draws ONE
// line: a fallback that RESTATES the identity-rest is HONEST (`var(--stretch, 1)`,
// `var(--mouse-x, 50%)` — the dormant IS the identity), but a fallback that paints
// a plausible STATE on a missing writer/class is the MASKING crime (`var(--dock-
// expand-t, 1)` paints the EXPANDED look when the state class is absent; a registered
// scalar's non-initial fallback is DEAD-and-contradictory; a JS `?? <literal>` that
// duplicates a same-cascade token drift-hedges). "Primary works in paint or fails
// loud; no fallback that hides a dead primary" (the user edict, 07-03).
//
// This manifest is what keeps `proof:no-masking-fallback` SHARP without
// false-positiving the §4 survivors — the detector reads THESE declared channels,
// never a blanket `var(--x, F)` scan (which would red every legitimate identity-rest).

// ── Arm B — the BARE-VAR channels ───────────────────────────────────────────────
// Every read of these customs in the given scope MUST be a BARE `var(--x)` — the
// masking `var(--x, F)` fallback is forbidden. The honest missing-state is either
// "fail VISIBLE" (guaranteed-invalid → unset chrome, never plausibly-expanded) for
// the state-class channels, or the SAME-cascade declared value for the token
// channels (the fallback literal is a pure drift-hedge that duplicates the token).
export const BARE_VAR_CHANNELS = [
    {
        name: "--dock-expand-t",
        scope: "src/styles/dock",
        reason:
            "the directional expanded-ness is DECLARED by the state class (.expanded/.collapsed/.always-expanded); the `, 1` fallback paints the EXPANDED look on a broken class binding — a missing class must fail VISIBLE, never plausibly-expanded.",
    },
    {
        name: "--dock-morph-t",
        scope: "src/styles/dock",
        // A registered @property (initial-value 0): a registered scalar NEVER triggers
        // the fallback, so a `, F` fallback is DEAD. `F ≠ 0` CONTRADICTS the initial (a
        // masking crime — RED, the `var(--dock-morph-t, 1)` at layers.css); `F == 0`
        // merely RESTATES the initial (dead-but-harmless — TOLERATED, the morph-bridge
        // `, 0` defensive reads, F3.R3's file, not NF.1's named purge).
        allowInitialFallback: true,
        initialValue: "0",
        reason:
            "registered @property, initial 0 — a non-initial fallback contradicts the dormant (RED); an == initial fallback is dead-but-harmless (tolerated).",
    },
    {
        name: "--glass-backdrop-luma-knee",
        scope: "src/styles",
        reason:
            "declared once (glass-fx.css `--glass-backdrop-luma-knee: 0.6`); the `, 0.6` fallback duplicates the same-cascade token — a pure drift-hedge (the literal silently forks the day the token re-tunes).",
    },
    {
        name: "--spring-dock",
        scope: "src/styles/dock/stack-rail.css",
        reason:
            "the generated spring curve (scheme-spring.css, declared unconditionally at :root); the `, var(--ease-out)` fallback is a drift-hedge over the generated token.",
    },
    {
        name: "--spring-dock-duration",
        scope: "src/styles/dock/stack-rail.css",
        reason:
            "the generated spring settle clock (scheme-spring.css, declared unconditionally at :root); the `, var(--duration-normal)` fallback is a drift-hedge over the generated token.",
    },
];

// ── Arm A — the registered-@property MASKING-REST channels ──────────────────────
// A registered scalar written ONLY by JS must carry a DORMANT `initial-value` — a
// masked initial (open/expanded look) paints on SSR/no-JS/before-the-first-write.
// The gate reads the live `@property` initial-value from src/styles and asserts it
// equals `dormant` (a channel not found is SKIPPED — no false-red on an unlisted one).
export const REGISTERED_DORMANT = [
    { name: "--dock-morph-t", dormant: "0", writer: "dockMorphContext.ensureSpringRunning" },
    { name: "--glass-drawer-t", dormant: "0", writer: "useDrawerSnap.writeScalar (F5.R2)" },
    { name: "--glass-btn-press-t", dormant: "0", writer: "useLiquidPress/useSpringPress" },
    { name: "--stage-t", dormant: "0", writer: "useOverlayStage" },
];

// ── Arm C — the JS single-source (stale-literal) sites ──────────────────────────
// A composable reading a token off the live root must NOT carry a bare drift-prone
// literal fallback duplicating the token's declared value (the 1.14/44 the
// `useDockOrientationMorph`/`dockMorphMeasure` sites carried, whose own comments
// record the PRIOR 1.08→1.14 drift). Single-source: import the token-mirror constant
// from `constants.ts` (ONE JS declaration) — the gate asserts the constant is
// imported AND the banned bare literal is GONE from the read.
export const JS_SINGLE_SOURCE = [
    {
        file: "src/components/custom/dock/composables/useDockOrientationMorph.ts",
        constant: "DOCK_MORPH_MAX_STRETCH",
        token: "--dock-morph-max-stretch",
        banLiteral: "1.14",
    },
    {
        file: "src/components/custom/dock/composables/dockMorphMeasure.ts",
        constant: "DOCK_TAP_FLOOR_PX",
        token: "--dock-morph-min",
        banLiteral: "44",
    },
];

// ── Arm D — the transitionend-LADDER files ──────────────────────────────────────
// The CSS-transition-era `transitionend`/`transitioncancel` settle ladder DIED at
// the AX.W01 spring migration (the morph runs on `--dock-morph-t`, no width/padding
// transition whose transitionend would fire — the files' own comments admit it). No
// dock-morph composable/SFC may carry a transitionend settle arm or a wrong-clock
// settle timer; `isTransitioning` resolves from the spring's OWN settle (useDockSpring).
export const NO_TRANSITIONEND_LADDER = [
    "src/components/custom/dock/composables/useDockMorphWindow.ts", // DELETED at NF.1
    "src/components/custom/dock/composables/dockMorphContext.ts",
    "src/components/custom/dock/composables/useLayerTransition.ts",
    "src/components/custom/dock/GlassDock.vue",
    "src/components/custom/dock/DockLayerGroup.vue",
];
// The wrong-clock settle-timer signatures the ladder carried (a spring-driven morph
// must never re-time off `--duration-normal`).
export const SETTLE_TIMER_SIGNATURES = ["morphWindowMs", "longestTransitionMs"];

// ── Arm E — the writer-owed channels (tracked, owed to a LATER wave) ────────────
// A channel wired-but-writer-less at HEAD whose writer/retire is a NAMED later wave.
// NF.1 registers it (acknowledged, not silently ignored); the owning wave flips it.
export const WRITER_OWED = [
    {
        name: "--specular-angle",
        owedBy: "WS8.4 W-GLASS-SOTA-LADDER",
        rationale:
            "the useSpecularPointer writer is exported but consumer-pending; WS8.4 wires a REAL writer via the Tier-1 GL path or retires the leaf (EDICT §2b L6).",
    },
];

// ── Arm E — the legacy-ladder census (collapse owed to NF.2) ────────────────────
// The pre-target `@supports not (…)` / prefixed / JS API-presence ladders. NF.1
// SEEDS this register (the Arm E census the gate reads); NF.2 W-LEGACY-LADDER-COLLAPSE
// deletes each `collapse-owed` row + tightens the arm to assert zero remain. An
// `a11y-state` row (forced-colors/prefers-contrast/reduced-*) is a FENCED KEEP.
export const LADDER_OWED = [
    { site: "src/styles/utilities/a11y-fallback.css GUARD-1/GUARD-2", verdict: "collapse-owed", owedBy: "NF.2" },
    { site: "src/styles/utilities/a11y-fallback.css @supports not selector(:has(*))", verdict: "collapse-owed", owedBy: "NF.2" },
    { site: "src/styles/glass/liquid-enter.css linear() Safari<17.2 floor", verdict: "collapse-owed", owedBy: "NF.2" },
    { site: "src/styles/scroll-choreography.css linear() Safari<17.2 floor", verdict: "collapse-owed", owedBy: "NF.2" },
    { site: "src/styles/control-surfaces.css .user-invalid-fallback (aria BRIDGE half KEEPS)", verdict: "collapse-owed", owedBy: "NF.2" },
    { site: "src/composables/motion/useRAFLoop.ts MQL addListener shim", verdict: "collapse-owed", owedBy: "NF.2" },
];

/** Strip `/* … *​/` block comments AND `//` line comments (URL-safe `://` preserved). */
export function stripComments(src) {
    // Block comments first.
    let out = src.replace(/\/\*[\s\S]*?\*\//g, "");
    // Line comments — the URL-safe form (only strip `//` NOT preceded by a `:`), so a
    // `https://` inside a string survives (the clause-7 house idiom).
    out = out.replace(/(^|[^:])\/\/[^\n]*/g, "$1");
    return out;
}

/**
 * Detect a MASKING `var(--name, <fallback>)` read (a comma after the custom-property
 * name inside the `var(` call) vs a HONEST bare `var(--name)`. Returns the count of
 * masking reads in `src` for `name`. Comments are stripped first so a prose mention
 * (a comment documenting the retired form) never counts.
 */
export function countMaskingVarReads(src, name) {
    const stripped = stripComments(src);
    // Match `var(  --name  ,` — a fallback present. `\s*` tolerates the wrapped
    // multi-line `var(\n    --name,` form the dock calc()s use.
    const re = new RegExp(
        `var\\(\\s*${name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\s*,`,
        "g",
    );
    const m = stripped.match(re);
    return m ? m.length : 0;
}

/**
 * Capture the SIMPLE (non-nested) fallback value of each `var(--name, F)` read — the
 * text after the comma up to the closing `)` (works for the numeric-scalar fallbacks
 * a registered channel carries, e.g. `var(--dock-morph-t, 0)` → "0"). Returns the
 * trimmed fallback strings. Comments stripped first.
 */
export function maskingFallbackValues(src, name) {
    const stripped = stripComments(src);
    const re = new RegExp(
        `var\\(\\s*${name.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\s*,\\s*([^,)]+)\\)`,
        "g",
    );
    const out = [];
    let m;
    while ((m = re.exec(stripped)) !== null) out.push(m[1].trim());
    return out;
}
