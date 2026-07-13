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
// literal fallback duplicating the token's declared value (the 44 the
// `dockMorphMeasure` site carried, whose own comment records the drift). Single-source:
// import the token-mirror constant from `constants.ts` (ONE JS declaration) — the gate
// asserts the constant is imported AND the banned bare literal is GONE from the read.
// (BI.W-DOCK-RETIRES — the `useDockOrientationMorph.ts` / `--dock-morph-max-stretch`
// 1.14 mirror site retired with the V↔H orientation morph; DEFINITION-ABSENT.)
export const JS_SINGLE_SOURCE = [
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
        owedBy: "BI.W-DOCK-CONTROLS",
        rationale:
            "the useSpecularPointer writer is exported but consumer-pending; BI.W-DOCK-CONTROLS lands the specular register on a REAL binding consumer (the dock-control glass-capsule face, vSpecular/useLiquidPress) or the leaf retires (EDICT §2b L6). Re-pointed off the phantom `WS8.4 W-GLASS-SOTA-LADDER` (no wave-spec on disk — BI.W-AXES-GATES OWNEDBY-RESOLVE).",
    },
];

// ── Arm E — the legacy-ladder census (BG.NF.2 W-LEGACY-LADDER-COLLAPSE) ──────────
// The pre-target `@supports not (…)` / positive-`@supports` / JS API-presence
// ladders (target = current Chrome + current Safari/WebKit). NF.1 SEEDED this
// register; NF.2 COLLAPSES each row onto modern CSS and TIGHTENS the arm: a
// `collapsed` row names its `file` + the ladder `absent` signature(s) — Arm E reds
// if any signature is STILL PRESENT on disk (comments stripped, so a documentary
// mention never counts). Born-RED on HEAD (the ladders live) → GREEN at the
// deletes. A `collapse-owed`/`escalated` row is owner-registered (green, tracked-
// not-ignored); an `a11y-state` row (forced-colors/prefers-contrast/reduced-*) is a
// FENCED KEEP and never enrolled here.
export const LADDER_OWED = [
    {
        site: "glass/a11y-fallback.css GUARD-1 (no-blur) + GUARD-2 (webkit-only) backdrop-filter @supports arms",
        file: "src/styles/glass/a11y-fallback.css",
        absent: ["@supports not ((backdrop-filter", "-webkit-backdrop-filter: blur(1px)) and (not"],
        verdict: "collapsed",
        owedBy: "NF.2",
        note: "engines supporting NEITHER the unprefixed NOR the webkit backdrop-filter form are years pre-target; proof:webkit-backdrop re-points at the build-emitted -webkit- dist prefix pair (O-2a, the real mechanism).",
    },
    {
        site: "glass/a11y-fallback.css @supports not selector(:has(*)) + the phantom .is-focus-within toggler comment",
        file: "src/styles/glass/a11y-fallback.css",
        absent: ["@supports not selector(:has(*))", "is-focus-within"],
        verdict: "collapsed",
        owedBy: "NF.2",
        note: ":has() is Chrome 105+/Safari 15.4+ (far pre-target) AND doubly-dead — no .is-focus-within toggler exists on disk (the comment lied); .glass-card:has(:focus-visible) is the sole mechanism.",
    },
    {
        site: "glass/liquid-enter.css @supports not (animation-timing-function: linear(0, 1)) — the Safari<17.2 bezier floor",
        file: "src/styles/glass/liquid-enter.css",
        absent: ["@supports not (animation-timing-function: linear(0, 1))"],
        verdict: "collapsed",
        owedBy: "NF.2",
        note: "both targets parse linear() spring curves; the cubic-bezier floor serves no target engine.",
    },
    {
        site: "scroll-choreography.css @supports not (animation-timing-function: linear(0, 1)) — the Safari<17.2 bezier floor",
        file: "src/styles/scroll-choreography.css",
        absent: ["@supports not (animation-timing-function: linear(0, 1))"],
        verdict: "collapsed",
        owedBy: "NF.2",
        note: "linear() is the sole timing source on the target set; the --ease-scroll-spring bezier degrade arm collapses.",
    },
    {
        site: "glass/control-surfaces.css .user-invalid-fallback / .user-valid-fallback selector members",
        file: "src/styles/glass/control-surfaces.css",
        absent: [".user-invalid-fallback", ".user-valid-fallback"],
        verdict: "collapsed",
        owedBy: "NF.2",
        note: ":user-invalid is Chrome 119+/Safari 16.5+; the class members collapse. The [aria-invalid=\"true\"] member (programmatic-invalid axis) + the aria BRIDGE half of useUserInvalidAria KEEP — a11y, not a ladder. proof:input-invalid-aria re-points to the two-member group.",
    },
    {
        site: "composables/dom/useUserInvalidAria.ts fallback-class auto-arm (supportsUserInvalid + the toggle)",
        file: "src/composables/dom/useUserInvalidAria.ts",
        absent: ["supportsUserInvalid", "user-invalid-fallback"],
        verdict: "collapsed",
        owedBy: "NF.2",
        note: "the CSS.supports('selector(:user-invalid)')-gated fallback-class toggle never runs on a target engine; the aria-invalid bridge (the a11y half) KEEPS.",
    },
    {
        site: "composables/motion/useRAFLoop.ts MQL addListener/removeListener shim (LegacyMediaQueryList)",
        file: "src/composables/motion/useRAFLoop.ts",
        absent: ["addListener", "LegacyMediaQueryList"],
        verdict: "collapsed",
        owedBy: "NF.2",
        note: "MediaQueryList.addEventListener('change') is Safari 14+; the addListener shim serves no target engine (addEventListener is the sole path).",
    },
    {
        site: "dock/shell.css dock scroll-fade @supports (animation-timeline: scroll()) co-gate (vertical block axis)",
        file: "src/styles/dock/shell.css",
        absent: ["@supports (animation-timeline: scroll())"],
        verdict: "collapsed",
        owedBy: "NF.2",
        note: "the Safari-26 scroll() floor is RATIFIED by 4.7's dual-engine paint PASS (WebKit 26.4 drove the ScrollTimelines live); the scroll-fade mask+driver un-gate onto the target set.",
    },
    {
        site: "dock/overflow.css dock scroll-fade @supports (animation-timeline: scroll()) co-gate (inline axis)",
        file: "src/styles/dock/overflow.css",
        absent: ["@supports (animation-timeline: scroll())"],
        verdict: "collapsed",
        owedBy: "NF.2",
        note: "the co-gate collapses with its shell.css sibling — scroll-driven animations are the un-gated mechanism on the target set.",
    },
    {
        // L5 — the F2.2 light-dark() COLOR witness table. The 60 `.dark {}` color
        // witnesses byte-agree with the light-dark() dark arg (proof:glass DA1 GREEN),
        // so the collapse is ZERO-PIXEL on the target set. BUT it is NOT a clean
        // rider deletion: ~5 device-free gates read those `.dark {}` witnesses as
        // their source-of-truth (proof:no-gray `dark-foreground-arms-lockstep`,
        // proof:dark-material, proof:metal-shimmer bronze/silver/gold, proof:suffuse
        // gold, proof:glass-cal primary), and the "arms-lockstep" witnesses are
        // SEMANTICALLY about the two-arm relationship the collapse dissolves. So the
        // execution owes a COORDINATED cross-gate re-point (read the light-dark() dark
        // arg) — F2.2 W-GLASS-BASIS-CONSOLIDATE's own domain, not this ladder wave.
        // Registered here (tracked, not silently ignored) as the Arm E principle.
        site: "tokens/dark-arm.css light-dark() COLOR witness table (F2.2) — cross-gate-entangled",
        verdict: "escalated",
        owedBy: "F2.2 W-GLASS-BASIS-CONSOLIDATE",
        note: "collapse is zero-pixel on targets (proof:glass DA1 proves byte-agreement) but entangled with ~5 gates that read the .dark {} witnesses as source-of-truth; needs a coordinated cross-gate re-point, not a rider deletion.",
    },
];

// ── Arm F — the data-motion DEAD-SIGNAL clause (BI.W-TEMPO / N6) ─────────────────
// `useMotionAxis` (_shared/useMotionAxis.ts) emits `data-motion="reduced"/"off"` from
// the overlay content SFCs (Dialog + Sheet + more — ≥2 shipped emitters). A shipped
// emitter with ZERO live CSS consumer is a DEAD WIRE — the reduction "works" in the
// model but paints NOTHING (the masking class the NO-MASKING-FALLBACK edict forbids:
// "primary works in paint or fails loud"). N6 = WIRE (not excise — the emitters are a
// shipped feature): the gate counts emitters (.vue SFCs binding `data-motion=`) vs CSS
// consumers (`[data-motion` selectors in src/styles) and REDs when emitters ≥1 AND
// consumers < the floor. reveal.css's `[data-motion="reduced"/"off"]` arms are the
// consumers that flip it GREEN.
export const DATA_MOTION_SIGNAL = {
    attribute: "data-motion",
    emitterScope: "src/components", // .vue SFCs binding data-motion=
    consumerScope: "src/styles", // .css [data-motion selectors
    minConsumersWhenEmitted: 1,
    owedBy: "BI.W-TEMPO",
    reason:
        "useMotionAxis emits data-motion=reduced/off (Dialog + Sheet, ≥2 emitters); an emitter with 0 CSS consumers is a dead wire — N6 WIRES it via glass/reveal.css's [data-motion] arms (never excise a shipped feature).",
};

/**
 * Count `data-motion=` / `:data-motion=` attribute EMISSIONS in a .vue source (block +
 * `//` line + `<!-- -->` HTML comments stripped, so a prose mention never counts).
 */
export function countDataMotionEmitters(src) {
    const noHtml = stripComments(src).replace(/<!--[\s\S]*?-->/g, "");
    const m = noHtml.match(/:?data-motion\s*=/g);
    return m ? m.length : 0;
}

/** Count `[data-motion=…]` / `[data-motion]` SELECTOR consumers in a CSS source (comments stripped). */
export function countDataMotionConsumers(src) {
    const m = stripComments(src).match(/\[data-motion[=\]]/g);
    return m ? m.length : 0;
}

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
