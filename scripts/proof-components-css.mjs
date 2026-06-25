// proof-components-css.mjs — the components.css self-sufficiency gate (R3).
//
// vite.style-assets.ts emitComponentUtilities() ships glass-ui's own
// component-utility RULES into dist/styles/components.css (P9) so a bare
// consumer paints `rounded-panel` / `p-4` / `gap-2` &c. without an `@source`
// glob. Those utilities reference Tailwind theme custom properties via
// `var(--X)` — every spacing utility is `calc(var(--spacing) * N)`. The compile
// step DROPS Tailwind's `:root,:host` @theme block (glass-ui ships its own
// radius/color/text bases), so without R3's minimal `:root{}` re-emit, props
// Tailwind OWNS (`--spacing`, the `--text-*` ladder, …) would be undefined and
// the utilities silently no-op.
//
// This gate fail-closes that regression class. It asserts against the BUILT
// dist/styles/components.css:
//   (a) the file exists (build first if not),
//   (b) it carries the canonical witness rule
//       `.rounded-panel{border-radius:var(--radius-panel)}`,
//   (c) every BARE `var(--X)` it references (no `var(--X, fallback)` — a
//       fallback cannot no-op) resolves to a definition: a `--X:` decl or
//       `@property --X` registration INSIDE components.css, OR a glass-ui token
//       defined in the dist token cascade (tokens.css + theme.css +
//       typography.css — glass-ui's tokens span those three authored rungs, not
//       tokens.css alone), OR a documented runtime/consumer-SET escape-hatch
//       prop (the `--reka-*` / dock / carousel / stack arbitrary-value props a
//       component or consumer sets at runtime, never in static CSS),
//   (d) it carries zero `@layer base` (the preflight reset must stay dropped).
//
// Pure function of dist — no sibling checkout, runs identically on a dev machine
// and a clean CI runner. Fail-closed: a NEW genuinely-undefined Tailwind theme
// prop (a future `--spacing`-class miss) is neither in components.css, nor the
// glass cascade, nor the runtime allowlist, so it is flagged.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";

const DIST_STYLES = resolve(ROOT, "dist/styles");
const COMPONENTS = resolve(DIST_STYLES, "components.css");

// The canonical witness rule — `rounded-panel` is a glass-ui CVA utility that
// only the emit step generates; its presence proves components.css carries the
// component vocabulary (not an empty / preflight-only file).
const WITNESS = ".rounded-panel{border-radius:var(--radius-panel)}";

// The glass-ui token cascade rungs that DEFINE custom properties (the @theme
// namespace + the structural/visual tokens + the typography ladder). A bare
// `var(--X)` resolving to one of these is a glass-ui token that already ships in
// the cascade ahead of components.css — not a miss.
const GLASS_TOKEN_RUNGS = ["tokens.css", "theme.css", "typography.css"];

// ---------------------------------------------------------------------------
// DOCUMENTED RUNTIME-PROP ALLOWLIST.
//
// These custom properties are SET AT RUNTIME — by reka-ui on its primitives, or
// by a glass-ui component's scoped CSS / inline style, or by the consumer — and
// are referenced as bare `var(--X)` arbitrary-value escape hatches in the
// emitted utilities. They are LEGITIMATELY undefined in static CSS; a static
// definition would be wrong (it would shadow the runtime value). Any NEW bare
// reference NOT covered here lands as a VIOLATION until a maintainer makes a
// conscious allowlist entry (with a one-line rationale), keeping the gate a real
// guard rather than a rubber stamp.
//
//   --reka-popover-trigger-width  — reka-ui PopoverContent sets it to the
//                                   trigger width for `w-[var(...)]` matching.
//   --reka-toast-swipe-{end,move}-x — reka-ui ToastRoot sets these per swipe
//                                   gesture for the swipe-translate utilities.
//   --reka-combobox-content-transform-origin — reka-ui ComboboxContent sets the
//                                   popper transform-origin; ComboboxList reads it
//                                   via `origin-(--reka-…)` (AV.W16 TW5 paren form).
//   --reka-select-content-transform-origin — reka-ui SelectPopperPosition sets the
//                                   popper transform-origin; SelectContent reads it
//                                   via `origin-(--reka-…)` for trigger-edge scale-in
//                                   (popover-family parity, AW.W26).
//   --reka-select-trigger-{height,width} — reka-ui SelectContent sets these to the
//                                   trigger box; SelectContent's popper viewport
//                                   reads them via `h-(--reka-…)`/`min-w-(--reka-…)`.
//   --reka-tabs-indicator-{position,size} — reka-ui TabsIndicator sets these per
//                                   active tab; the indicator reads them via
//                                   `translate-x-(--reka-…)`/`h-(--reka-…)`.
//   --dock-pos                    — GlassDock sets the dock offset inline.
//   --carousel-nav-{offset,size}  — Carousel nav-button positioning, consumer-
//                                   tunable, defaulted in the carousel SFC.
//   --stack-overlap-{sm,md,lg}    — StackedIcons overlap, set per `size` variant
//                                   on the stack root.
// ---------------------------------------------------------------------------
const RUNTIME_PROPS = new Set([
    "--reka-popover-trigger-width",
    "--reka-toast-swipe-end-x",
    "--reka-toast-swipe-move-x",
    "--reka-combobox-content-transform-origin",
    "--reka-select-content-transform-origin",
    "--reka-select-trigger-height",
    "--reka-select-trigger-width",
    "--reka-tabs-indicator-position",
    "--reka-tabs-indicator-size",
    "--dock-pos",
    "--carousel-nav-offset",
    "--carousel-nav-size",
    "--stack-overlap-sm",
    "--stack-overlap-md",
    "--stack-overlap-lg",
    // BB.W-CARD-PAD — the golden card+overlay padding ladder is minted INLINE on
    // the component roots (Card.vue / the overlay primitives / DrawerHeader+Footer
    // via the Tailwind `[--card-pad-inline:--spacing(6)]` arbitrary-property form,
    // with the sqrt-φ/φ calc derivations), NOT at :root — so the descendant
    // utilities (`px-(--card-pad-inline)` &c.) the W-EMISSION self-emit ships into
    // components.css reference these as runtime props resolved on the host root.
    // Mirrors the --dock-pos / --carousel-nav-* / --stack-overlap-* component-scoped
    // runtime-prop pattern above.
    "--card-pad-inline",
    "--card-pad-block",
    "--card-pad-section-gap",
    "--card-pad-footer",
    "--card-pad-title-gap",
    "--overlay-pad-inline",
    "--overlay-pad-block",
    // BB.W-BUTTON-GLASS — the lit glass-button fill re-points off the RAW
    // `--glass-bg-floating` rung token onto an ELEMENT-LEVEL oklab-tinted wrapper
    // minted on `.btn-glass` (glass/surfaces.css): `color-mix(in oklab, <rung>,
    // var(--glass-tint-source) var(--glass-tint-strength))`. It is DELIBERATELY
    // element-scoped, NOT a :root base prop — a :root emit would bake it at the
    // root 0%-strength and the W55 bright-bucket darken / contrast-color() flip would
    // never reach the lit fill (the substitution-vs-inheritance trap W-BUTTON-GLASS
    // closes). The tab pill + the floating button rung resolve `--glass-bg-floating-tinted`
    // at runtime off their host — the same component-scoped runtime-prop pattern as
    // --dock-pos / --card-pad-*. (BD: the button's resting fill now rides the
    // `quiet`-tinted rung via `[--glass-capsule-fill:var(--glass-bg-quiet-tinted)]`,
    // retiring the former `--glass-bg-resting-tinted` wrapper.)
    "--glass-bg-floating-tinted",
    // BB.W-EASING-PRIMITIVE — EasingPicker localizes the curve-stroke color onto an
    // ELEMENT-LEVEL `--easing-curve-accent` (declared inline on the SVG root as
    // `var(--motion-accent, var(--viz-legendre))` — the violet identity with the
    // library --viz-legendre fallback, so it is self-sufficient at runtime), then the
    // de-arbitrary'd Tailwind utility references `(--easing-curve-accent)`. The
    // component-scoped declaration resolves at runtime off the picker root — the same
    // element-scoped runtime-prop pattern as --glass-bg-*-tinted / --dock-pos above.
    "--easing-curve-accent",
    // BC.W-BUTTON-GLASS-IOS (BG-IOS-6) — the de-shadcn `outline`/`secondary`/`accent`
    // reskin re-points its QUIETER glass fill onto the SAME element-level oklab-tinted
    // wrapper the resting/floating pair use, on the `quiet` rung: `--glass-bg-quiet-tinted`
    // is minted on `.btn-glass` (glass/surfaces.css), DELIBERATELY element-scoped (NOT a
    // :root base — the W55 bright-bucket darken must reach the lit fill, the
    // substitution-vs-inheritance trap). The CVA's `bg-(--glass-bg-quiet-tinted)` utility
    // (self-emitted by W-EMISSION) resolves it off the `.btn-glass` host — the SAME pattern
    // as the already-allowlisted --glass-bg-{resting,floating}-tinted above.
    "--glass-bg-quiet-tinted",
    // BC.W-ACCENT-TONE — the contrast-floored tonal-accent register. SelectableChip's
    // `.accent-tone` (glass/accent-tone.css) mints the four per-instance accent rungs
    // (`--accent-fill`/`--accent-band`/`--accent-edge`/`--accent-ink`) from the consumer
    // `--glass-accent` data hue, ON the `.accent-tone` element (NOT :root — the accent is a
    // per-INSTANCE chromatic axis, W-GLASS-ACCENT). The de-arbitrary'd utilities the
    // W-EMISSION self-emit ships reference them off the chip host — the element-scoped
    // runtime-prop pattern as --glass-bg-*-tinted above.
    "--accent-fill",
    "--accent-band",
    "--accent-edge",
    "--accent-ink",
    // BC.W-DOCK-SEARCH — FuzzySearch's modal root sets `--search-modal-width` inline
    // (`[--search-modal-width:36rem]` on the modal content, FuzzySearch.vue), a consumer-
    // tunable width the `max-w-(--search-modal-width)` utility reads off the modal host —
    // the same component-scoped inline runtime-prop pattern as --card-pad-* / --dock-pos.
    "--search-modal-width",
    // BC — the Switch geometry quad is derived from the control-height anchor INLINE on the
    // Switch root (`[--switch-track-h:…] [--switch-thumb:…] [--switch-track-w:…]
    // [--switch-throw:…]`, Switch.vue) so the whole switch scales in lockstep off the ONE
    // `--switch-track-h` anchor (useControlSize.ts §derivation). The `h-(--switch-track-w)`
    // / `size-(--switch-thumb)` / `translate-x-(--switch-throw)` utilities the W-EMISSION
    // self-emit ships resolve them off the switch host — element-scoped, NOT :root (a :root
    // base would freeze the quad at the md size). Same pattern as --stack-overlap-* above.
    "--switch-track-h",
    "--switch-thumb",
    "--switch-track-w",
    "--switch-throw",
]);

/** Strip CSS block comments so a `--token` mentioned in prose is not counted. */
function stripComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Custom-property DECLARATIONS (`--X:`) in a CSS string. */
function declaredProps(css) {
    const props = new Set();
    const re = /(?:^|[\s;{])(--[a-zA-Z0-9_-]+)\s*:/g;
    let m;
    while ((m = re.exec(css))) props.add(m[1]);
    return props;
}

/** `@property --X` registrations in a CSS string. */
function registeredProps(css) {
    const props = new Set();
    const re = /@property\s+(--[a-zA-Z0-9_-]+)/g;
    let m;
    while ((m = re.exec(css))) props.add(m[1]);
    return props;
}

/**
 * Every prop a token RUNG defines — INCLUDING its carved partials (AY.W-CSS1: a
 * rung is now a thin `@import "./<dir>/<partial>.css";` root over a partial
 * cascade, so the token DEFINITIONS live in the partials, not the root file).
 * Follows the `@import "./<dir>/<partial>.css";` statements ONE level (the carve
 * is a single dir of leaf partials — no nested re-imports) and unions the
 * declared + registered props from the root + every partial. A missing partial
 * is not silently skipped — it is a build-emit gap the caller fails on.
 *
 * @param {string} rungPath absolute path to the rung file under dist/styles/
 * @returns {{props:Set<string>, missing:string[]}}
 */
function rungPropsWithPartials(rungPath) {
    const props = new Set();
    const missing = [];
    const root = stripComments(readFileSync(rungPath, "utf-8"));
    for (const p of declaredProps(root)) props.add(p);
    for (const p of registeredProps(root)) props.add(p);
    // `@import "./<dir>/<partial>.css";` — the carved-partial cascade.
    const importRe = /@import\s+["'](\.\/[a-z0-9/_-]+\.css)["']\s*;/gi;
    let m;
    while ((m = importRe.exec(root))) {
        const partialPath = resolve(DIST_STYLES, m[1]);
        if (!existsSync(partialPath)) {
            missing.push(m[1]);
            continue;
        }
        const partial = stripComments(readFileSync(partialPath, "utf-8"));
        for (const p of declaredProps(partial)) props.add(p);
        for (const p of registeredProps(partial)) props.add(p);
    }
    return { props, missing };
}

/**
 * BARE `var(--X)` references — a `var(--X)` immediately closed by `)` with no
 * fallback. A `var(--X, …)` carries a fallback (CSS uses it when `--X` is
 * unset), so it can never silently no-op and is not a self-sufficiency concern.
 */
function bareReferences(css) {
    const refs = new Set();
    const re = /var\(\s*(--[a-zA-Z0-9_-]+)\s*([,)])/g;
    let m;
    while ((m = re.exec(css))) {
        if (m[2] === ")") refs.add(m[1]);
    }
    return refs;
}

function fail(message) {
    console.error(`proof:components-css — FAIL\n  ${message}`);
    process.exit(1);
}

function run() {
    // (a) the file must exist — it is a build artefact.
    if (!existsSync(COMPONENTS)) {
        fail(
            "dist/styles/components.css is absent — run `npm run build` first " +
                "(the emit runs in the build's closeBundle).",
        );
    }

    const raw = readFileSync(COMPONENTS, "utf-8");
    const css = stripComments(raw);

    // (b) canonical witness rule.
    if (!raw.includes(WITNESS)) {
        fail(
            `missing canonical witness rule \`${WITNESS}\` — components.css does ` +
                "not carry glass-ui's component utility vocabulary.",
        );
    }

    // (d) zero @layer base (the preflight reset must stay dropped).
    if (/@layer\s+base\b/.test(css)) {
        fail(
            "found `@layer base` in components.css — the Tailwind preflight reset " +
                "must be dropped (it would clobber consumer styles).",
        );
    }

    // (c) every BARE `var(--X)` reference must resolve.
    const allowed = new Set([
        ...declaredProps(css),
        ...registeredProps(css),
        ...RUNTIME_PROPS,
    ]);
    for (const rung of GLASS_TOKEN_RUNGS) {
        const path = resolve(DIST_STYLES, rung);
        if (!existsSync(path)) {
            fail(
                `glass-ui token rung dist/styles/${rung} is absent — run ` +
                    "`npm run build` first.",
            );
        }
        // AY.W-CSS1: a rung is a thin @import root over carved partials; follow
        // the @import partial cascade so the token DEFINITIONS in the partials
        // (color-radius.css/light-dark.css/dark-arm.css/…) count as defined.
        const { props, missing } = rungPropsWithPartials(path);
        if (missing.length > 0) {
            fail(
                `glass-ui token rung dist/styles/${rung} @imports a partial that ` +
                    `is absent from dist (${missing.join(", ")}) — the build emit ` +
                    "dropped a carved token partial. Run `npm run build`.",
            );
        }
        for (const p of props) allowed.add(p);
    }

    const undefinedRefs = [...bareReferences(css)]
        .filter((p) => !allowed.has(p))
        .sort();
    if (undefinedRefs.length > 0) {
        fail(
            `components.css references ${undefinedRefs.length} undefined custom ` +
                "property (bare `var(--X)` with no fallback, not defined in " +
                "components.css, not a glass-ui token, not an allowlisted " +
                "runtime prop) — the emit dropped a Tailwind-owned base it needs:\n" +
                undefinedRefs.map((p) => `    ${p}`).join("\n") +
                "\n  Fix: extend vite.style-assets.ts R3 base-prop emit, or (for a " +
                "genuine runtime prop) add a documented RUNTIME_PROPS allowlist entry.",
        );
    }

    console.log(
        "proof:components-css — PASS\n" +
            `  witness rule present; 0 @layer base; every bare var(--X) resolves ` +
            `(components.css defs + glass token cascade + ${RUNTIME_PROPS.size} ` +
            "runtime props).",
    );
}

run();
