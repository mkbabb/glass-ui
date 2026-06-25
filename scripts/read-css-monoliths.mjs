// AY.W-CSS1 — the per-monolith ordered partial-list authority (the
// read-dock-css.mjs model, generalized to the three central stylesheets).
//
// W-CSS1 carved the three biggest stylesheets — tokens.css (was 2356),
// glass.css (was 1219), utilities.css (was 1230) — into cohesive `<name>/*.css`
// partials, each under the no-god-module 500-line bound, @import-ed by a thin
// `<name>.css` root in CASCADE ORDER. The CSS authority for each is therefore
// now the partial SET, not the single file. This module records the canonical
// cascade order per monolith so the `.css`-aware god-module gate can assert
// IMPORT-ORDER PRESERVATION (the F3 caveat: "assert import-order, not just per-
// file line count") + SINGLE-LAYER ISOMORPHISM — a reordered @import or a leaked
// layer reds the gate.
//
// Three consumers (tokens/glass/utilities arms) → the ≥2-consumer authority bar.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Per-monolith manifest: the thin @import root, its carved-partial directory,
 * and the CANONICAL cascade order of the partials (the order they MUST @import
 * in). A `layer` field names the @layer each component-layer partial opens (the
 * isomorphism assertion); a `null` layer means the partial carries no top-level
 * `@layer` (a :root / @media / @supports / @utility block — its containment is
 * the source-order position, not a layer).
 */
export const CSS_MONOLITHS = {
    tokens: {
        root: "src/styles/tokens.css",
        dir: "src/styles/tokens",
        // Cascade-binding: the master :root partials FIRST, then light-dark
        // (overrides them), then the .dark arm (after light-dark), then the
        // @property registrations + the specular magnitude cohort LAST.
        order: [
            "scheme-motion.css",
            "color-radius.css",
            "shadow.css",
            "glass.css",
            // BB.W-CARVE4 — glass.css's decorative/fx tail (grain/specular/edge-light
            // + the adaptive tint-source/backdrop-luma bucket + fringe/curvature/
            // chart-palette + the per-tier shadow/spine/under-shadow/overlay-scrim)
            // carved into glass-fx.css, an adjacent same-selector :root{} block
            // @import-ed IMMEDIATELY AFTER glass.css (preserving the original
            // ladder→fx source order — the dist is byte-isomorphic).
            "glass-fx.css",
            // BB.W-DEEP-GLASS — the OPT-IN deep-glass token family (the SEPARATE
            // --glass-blur-deep-* family + the --glass-depth scalar), @import-ed
            // right after glass.css (the deep recipe LERPs against the §8 calm
            // ladder composite, so it resolves after it). The calm ladder NEVER
            // reads it — proof:glass-cal stays GREEN by construction.
            "glass-deep.css",
            // BB.W-ON-GLASS-FG — the on-glass foreground register, carved out of
            // glass.css to hold the bound, @import-ed right after it (the rungs
            // derive against the §8 ladder composite, so they resolve after it).
            "on-glass-fg.css",
            // BB.W-CARVE3 — offsets-sizing.css carved at the §9/§10 seam into two
            // adjacent same-selector :root partials at the same cascade slot
            // (offsets.css §9 ANIMATION OFFSETS, then sizing.css §10 SIZING).
            "offsets.css",
            "sizing.css",
            // BC.W-CARVE6 — sizing.css's §10 tail (MetricBadge stacked geometry +
            // the Configurator density/HIERARCHY/divider family + the --select-font
            // override) carved into sizing-config.css to hold the 500-line bound,
            // @import-ed IMMEDIATELY AFTER sizing.css (adjacent :root blocks —
            // byte-isomorphic).
            "sizing-config.css",
            "scale-paper.css",
            // BB.W-CARVE4 — scale-paper.css's §20 scroll-driven substrate axes + the
            // BB.W-SCROLL-MOTION scroll-CHOREOGRAPHY knob family (--scroll-reveal-*/
            // --scroll-build-*/--scroll-cascade-*/--scroll-pin-*) carved into
            // scroll-tokens.css, an adjacent same-selector :root{} block @import-ed
            // IMMEDIATELY AFTER scale-paper.css (the --scroll-* tokens are non-
            // conflicting + un-re-pointed in light-dark/dark-arm, so the relocation is
            // cascade-order-invariant — the dist is byte-isomorphic).
            "scroll-tokens.css",
            "light-dark.css",
            "dark-arm.css",
            "property-regs.css",
        ],
    },
    glass: {
        root: "src/styles/glass.css",
        dir: "src/styles/glass",
        // The base ladder (material/ladder/surfaces) splits into three adjacent
        // @layer components blocks; the squircle @supports + the a11y overrides
        // MUST stay AFTER the base ladder (they override it).
        order: [
            "material.css",
            "ladder.css",
            // BC.W-ACCENT-TONE — the contrast-floored 3-channel tonal-accent register
            // (.accent-tone: one --tone → idle/active/edge/ink), @import-ed AFTER
            // ladder.css (it reads the warm-cream --card surface the ladder mints) and
            // BEFORE rim.css; the SOLE writer of the --accent-* channels, so the
            // placement is cascade-order-invariant (the dist is byte-isomorphic).
            "accent-tone.css",
            // BB.W-CARVE4 — ladder.css's AW.W22 unified rim + the BB.W-GLASS-ACCENT
            // per-INSTANCE chromatic rim/accent group carved into rim.css, an adjacent
            // same-@layer-components block @import-ed IMMEDIATELY AFTER ladder.css (the
            // rim group was the tail of ladder.css, just before surfaces.css; it is the
            // SOLE writer of --glass-material-rim/--glass-border-accent so the
            // relocation is cascade-order-invariant — the dist is byte-isomorphic).
            "rim.css",
            "surfaces.css",
            // BC.W-CARVE6 — the .input-pill / .control-surface form-control REST
            // register carved out of surfaces.css to hold the 500-line bound,
            // @import-ed IMMEDIATELY AFTER surfaces.css (same @layer components,
            // same source order — the dist is byte-isomorphic).
            "control-surfaces.css",
            // BD.W-TAB-IOS-CAPSULE — the ONE shared .glass-capsule glassy register
            // (the warm-transmissive lifted lozenge + recessed channel every consumer
            // COMPOSES instead of re-forking), @import-ed AFTER control-surfaces.css
            // (it composes the control REST register the prior partial mints) and
            // BEFORE surface-axis.css; same @layer components, source-order-after.
            "glass-capsule.css",
            "surface-axis.css",
            "reveal.css",
            // BD.W-LIQUID-ENTRANCE-GENERAL — the universal liquid-enter mount recipe
            // (.glass-reveal's four coupled channels promoted to a mount @keyframes so
            // a v-if-born-at-open surface ANIMATES), @import-ed IMMEDIATELY AFTER
            // reveal.css (it lifts the reveal register's channels into a mount keyframe)
            // and BEFORE deep.css; same @layer, source-order-after so it rides the
            // reveal recipe it promotes.
            "liquid-enter.css",
            // BB.W-DEEP-GLASS — the OPT-IN .glass-deep decoration (a deep blur
            // token re-point ON a base rung, the .glass-opaque precedent), homed
            // after surfaces/surface-axis (the same @layer components, source-
            // order-after so the re-point lands beside the rung it rides) and
            // BEFORE the squircle/a11y overrides (which still win by :root level).
            "deep.css",
            "progress-rail.css",
            "squircle.css",
            "a11y-fallback.css",
        ],
    },
    utilities: {
        root: "src/styles/utilities.css",
        dir: "src/styles/utilities",
        // The leading @utility animation pair, the @layer components base/
        // components split (adjacent same-layer blocks), the @utility button
        // cluster, then the a11y @media overrides last.
        order: [
            "animate.css",
            "base.css",
            // BB.W-CARVE3 — base.css's post-tap-squish tail (status-dot → kbd +
            // the fading-scroll recipe) carved into base-misc.css, an adjacent
            // same-`@layer components` block immediately after base.css.
            "base-misc.css",
            // BB.W-METAL-SHIMMER — the brand-metal utility family (.metal-*),
            // homed right after base-misc.css (its .gold-shimmer sibling — both
            // @layer components metal registers).
            "metal.css",
            "components.css",
            "btn.css",
            "a11y-overrides.css",
        ],
    },
    // AZ.W-CARVE — the two surviving over-bound CENTRAL stylesheets drained
    // their no-god-module ratchet rows into cohesive partials, same precedent.
    "dock-controls": {
        root: "src/styles/dock-controls.css",
        dir: "src/styles/dock-controls",
        // The FIVE control families in cascade order; the shared cross-family
        // `:where()` specular-sizing group stays at the thin root. The tail
        // overrides (touch-floor + the vertical-rail selected register) MUST
        // @import last (they override the base families).
        order: [
            "icon-button.css",
            "dark-mode-toggle.css",
            "tab-button.css",
            "triggers.css",
            "touch-floor.css",
        ],
    },
    theme: {
        root: "src/styles/theme.css",
        dir: "src/styles/theme",
        // Cascade-binding: the LEADING plain @theme (radius primitives +
        // aliases) FIRST so the inline bridges can reference them, then the
        // @theme inline (the tokens.css var() bridges), then the trailing plain
        // @theme (the --animate-*/opacity/text-shadow literals), then the
        // @variant dark LAST. A re-ordered split drops a value-identical
        // rounded-* utility (the radius header collision) — import-order is the
        // load-bearing witness.
        order: [
            "radius.css",
            "bridges.css",
            "literals.css",
            "dark.css",
        ],
    },
    // BA.W-CARVE2 — typography.css drained its no-god-module ratchet row into
    // cohesive partials, the same precedent.
    typography: {
        root: "src/styles/typography.css",
        dir: "src/styles/typography",
        // Cascade-binding: the OFL fallback @font-face declarations + the :root
        // √φ --type-* scale tokens FIRST (the semantic classes read them), the
        // body{} cascade + the DISPLAY/HEADING/BODY/MICRO/ADMIN-LABEL semantic
        // @utility classes SECOND, the MATH/MONO/FONT-FAMILY/ORNAMENTAL @utility
        // set + the @layer components AUX hooks LAST. The carve moves rules in
        // the SAME source position → byte-isomorphic dist.
        order: [
            "scale.css",
            "semantic.css",
            "utilities.css",
        ],
    },
};

/**
 * Read a carved CSS monolith as ONE concatenated string — the thin `@import`
 * root followed by its partials in cascade order (the `read-dock-css.mjs`
 * model). A gate that scanned `tokens.css`/`glass.css`/`utilities.css` for a
 * rule keeps finding it after the carve with a one-line read swap
 * (`read("src/styles/tokens.css")` → `readMonolith(ROOT, "tokens")`). `name` is
 * one of `tokens` | `glass` | `utilities`; an UNKNOWN name (or a not-yet-carved
 * sheet) falls back to the single file so the helper is safe pre-carve.
 */
export function readMonolith(repoRoot, name) {
    const spec = CSS_MONOLITHS[name];
    if (!spec) {
        const single = resolve(repoRoot, "src/styles", `${name}.css`);
        return existsSync(single) ? readFileSync(single, "utf8") : "";
    }
    const parts = [];
    const rootFile = resolve(repoRoot, spec.root);
    if (existsSync(rootFile)) parts.push(readFileSync(rootFile, "utf8"));
    const dir = resolve(repoRoot, spec.dir);
    if (existsSync(dir)) {
        // Cascade order first; any future partial not yet listed appends (alpha)
        // so a new cohesion axis is never silently dropped.
        const present = new Set(
            readdirSyncSafe(dir).filter((f) => f.endsWith(".css")),
        );
        const ordered = [
            ...spec.order.filter((f) => present.has(f)),
            ...[...present].filter((f) => !spec.order.includes(f)).sort(),
        ];
        for (const f of ordered) parts.push(readFileSync(resolve(dir, f), "utf8"));
    }
    return parts.join("\n");
}

/** readdirSync that returns [] for a missing dir (pre-carve safety). */
function readdirSyncSafe(dir) {
    try {
        return readdirSync(dir);
    } catch {
        return [];
    }
}

/**
 * Read the `@import "./<name>/<partial>.css";` sequence (in file order) from a
 * thin monolith root. Returns the partial basenames in the order they appear.
 */
export function readImportOrder(root, rootRelPath) {
    const full = resolve(root, rootRelPath);
    if (!existsSync(full)) return [];
    const css = readFileSync(full, "utf8");
    const order = [];
    const re = /@import\s+["']\.\/[a-z0-9-]+\/([a-z0-9-]+\.css)["']\s*;/g;
    let m;
    while ((m = re.exec(css))) order.push(m[1]);
    return order;
}

/**
 * Assert that each monolith's thin root @imports its partials in the recorded
 * canonical cascade order. Returns a per-monolith fact list:
 *   { name, root, expected, actual, importOrderPreserved, missing }
 * `root` is the repo root the gate already computes.
 */
export function assertMonolithImportOrder(repoRoot) {
    const facts = [];
    for (const [name, spec] of Object.entries(CSS_MONOLITHS)) {
        const actual = readImportOrder(repoRoot, spec.root);
        const expected = spec.order;
        const importOrderPreserved =
            actual.length === expected.length &&
            actual.every((f, i) => f === expected[i]);
        const missing = expected.filter(
            (f) => !existsSync(resolve(repoRoot, spec.dir, f)),
        );
        facts.push({ name, root: spec.root, expected, actual, importOrderPreserved, missing });
    }
    return facts;
}
