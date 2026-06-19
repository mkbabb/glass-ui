// BB.W-DOCK-MORPH-FAMILY — proof:dock-morph-family, the dock-morph REPAIR gate
// (born-RED at HEAD, driven GREEN by the wave). Six falsifiable device-free SOURCE
// clauses (F1-F6) + a self-test bite, mirroring the comment-strip + pure-detector
// house pattern (proof-dock-plate-clearance.mjs / proof-dock-no-scale-pop.mjs).
//
// THE DEFECT FAMILY (the BA W-DOCK-MORPH-INSITU consumed AZ substrate carried six
// mechanism defects the speedtest AW v2.1 audit measured + the unified brief §4.1
// placed):
//   (a) the morph animates `inline-size`/`block-size` per frame → a relayout EVERY
//       morph frame (CDP Layout busy — "too slow and laggy");
//   (b) the active pane is REVEALED through a GROWING layout box → a blank/half-
//       painted dock at the leading frames ("blank icon partially sized dock");
//   (c) under PRM the scalar jumps 0→1 but the span seats a rAF later → the box
//       paints the collapsed `from` (a 10×74 blank sliver, every control OUTSIDE
//       the box — a P0 TERMINAL failure);
//   (d) `DockLayerGroup` never self-reserves its peak-layer block-size → the
//       consumer hand-rolls a `--dock-host-reserve` guess (over-reserves ~70%);
//   (e) `--dock-local-scale` substitutes ONCE at `:root` (not `@property`-
//       registered) → a consumer-scope override never re-evaluates (the 3rd
//       recurrence of the substitution-vs-inheritance trap);
//   (f) the vertical collapse↔expand morphs `block-size` but its plate chrome SNAPS
//       discretely (the `--dock-expand-t` chrome-interp is gated `:not(.vertical)`
//       across the whole axis) → chrome/geometry desync on a collapsing vertical dock.
//
// WHAT THIS GATE PROVES — SIX SOURCE CLAUSES (device-free) + a π/DELTA + gestalt:
//   F1 — the morph animates a COMPOSITOR TRANSFORM, not a layout property. The
//        `[data-morphing]` morph-axis rule lands the live `--dock-morph-t` scalar on
//        `transform` (a `scale()` over a reserved settled footprint), the box
//        RESERVES its settled `to` footprint (a layout-property set to
//        `--dock-morph-to`, NOT the live scalar calc), AND NO morph-path rule
//        animates `inline-size`/`block-size` off the live scalar (the per-frame
//        relayout is GONE, not supplemented). RED at HEAD: `inline-size:
//        var(--dock-morph-size)` (the live calc on the layout axis).
//   F2 — the reveal seats at the settled geometry. Asserted via F1's "reserve the
//        settled footprint" arm (the box is `to`-sized from frame 0; the transform
//        composites over it — no growing-aperture reveal). The binding behavioural
//        floor is the π frame-series (no half-painted interim frame).
//   F3 — the PRM path seats the geometry SYNCHRONOUSLY. Both
//        `dockMorphContext.onSwap` + `useLayerTransition` carry a
//        `prefersReducedMotion()` branch that seats the box at the true `to` + the
//        scalar at the endpoint in ONE step (a `nextTick`-bounded synchronous
//        measure — post-flush, NOT an rAF morph window), composing the BA-VJS-1
//        nested ordering, AND the PRM branch does NOT enter the `requestAnimationFrame`
//        measure-defer. RED at HEAD: no PRM synchronous seat (the span seats a rAF
//        later → the sliver).
//   F4 — `DockLayerGroup` self-reserves its peak-layer block-size. The group
//        MEASURES its registered layers' intrinsic block-size (a `scrollHeight`/
//        intrinsic measure across the panes, NOT a token guess), reserves the PEAK
//        as `min-block-size` on its OWN root, and exposes `--dock-layer-peak-block-
//        size`. RED at HEAD: `registerGroup` exists but no peak measure/reserve, no
//        `--dock-layer-peak-block-size`.
//   F5 — `--dock-local-scale` threads via an inheriting `@property` registration.
//        `@property --dock-scale` AND `@property --dock-local-scale` are registered
//        with `inherits: true` (the `@property --dock-morph-t` house idiom), default
//        `1` (byte-identical at the default scale). RED at HEAD: `--dock-scale`/
//        `--dock-local-scale` declared at `:root` only, no `@property` registration.
//   F6 — the VERTICAL collapse↔expand chrome interpolates on `--dock-expand-t`,
//        padding-INLINE pinned (BB-1 + BB-4). NO chrome-interp rule that reads
//        `--dock-expand-t` excludes the vertical dock (no `:not(.vertical)` on the
//        bg/border/padding/child-stagger derivation arms), a parallel `.vertical`
//        chrome-interp drives bg/border off the SAME scalar, the vertical padding
//        interp pins `padding-inline` + morphs `padding-block` (the axis-inverse of
//        the horizontal pin), the radius arm reaches `.glass-dock.vertical.shape-card`,
//        the stale "ALWAYS-EXPANDED" justification is GONE, NO `transition: padding/
//        background/border-color` second-clock arm is re-added to the vertical root,
//        AND the BB-4 slot transition reads `--dock-morph-t`. RED at HEAD: the
//        chrome-interp is `:not(.vertical)`-scoped; the stale comment sits in shell.css.
//
// The π binding readback (the cardinal-lesson DELTA, LOCAL-ONLY real-GPU/CDP) lives
// in tests-visual/dock-morph-family.spec.ts + the captured DELTA at
// docs/tranches/BB/audit/visual/W-DOCK-MORPH-FAMILY-DELTA.md — the CDP Layout-flat
// trace, the complete-at-every-frame series, the PRM synchronous-seat before/after
// (against the 10×74 sliver ground), the peak-reserve readback, the scope-scale
// paint, the VERTICAL chrome-interp frame-series, BOTH modes. The device-free F1-F6
// arm runs on EVERY runner; the π readback is the binding visual truth (a
// source-green/visually-broken render does NOT close).

import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:dock-morph-family";

// ── Strip CSS block (`/* */`) + JS/Vue line (`//`) comments (false-witness
//    discipline). The TS composables + Vue SFCs carry `//` doc-comments that mention
//    the PRIOR shape ("the box never paints unpinned", "inline-size") describing the
//    superseded mechanism; a raw grep over them false-flags the fix. ──────────────
function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}
function stripAllComments(text) {
    const noBlock = stripBlockComments(text);
    let result = "";
    let i = 0;
    while (i < noBlock.length) {
        // The URL-safe `//` strip — never eat a `://` (no URLs in these sources, but
        // the house idiom guards it).
        if (
            noBlock[i] === "/" &&
            noBlock[i + 1] === "/" &&
            noBlock[i - 1] !== ":"
        ) {
            const end = noBlock.indexOf("\n", i + 2);
            const stop = end === -1 ? noBlock.length : end;
            result += blankRange(noBlock, i, stop);
            i = stop;
        } else {
            result += noBlock[i];
            i++;
        }
    }
    return result;
}

// Split CSS into { selector, body } rule blocks (comment-stripped, whitespace-
// collapsed). Reused across F1/F6 axis detectors.
function ruleBlocks(css) {
    const flat = stripBlockComments(css).replace(/\s+/g, " ");
    return [...flat.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((b) => ({
        selector: b[1].trim(),
        body: b[2],
    }));
}

// ── F1 — the morph is a COMPOSITOR TRANSFORM over a reserved footprint ───────────
export function detectCompositorTransform(layersCss) {
    const violations = [];
    const facts = {};
    const blocks = ruleBlocks(layersCss);

    // The morph-axis rules are the `[data-morphing]` ones that pin a box size span.
    // The horizontal comma-group + the two vertical rules.
    const morphRules = blocks.filter(
        (b) =>
            /\[data-morphing\]/.test(b.selector) &&
            /(\.dock-layers|\.dock-layer-stack)\b/.test(b.selector) &&
            /(inline-size|block-size|transform)\s*:/.test(b.body),
    );
    facts.morphRuleCount = morphRules.length;
    if (morphRules.length === 0) {
        violations.push(
            "F1: no `[data-morphing]` morph-axis rule found in layers.css (drift?) — cannot confirm the compositor re-express",
        );
        return { facts, violations };
    }

    // (a) the live scalar lands on `transform` (a scale() reading --dock-morph-t or
    //     --dock-morph-scale, which is derived FROM --dock-morph-t).
    const anyTransformScalar = morphRules.some((b) =>
        /transform\s*:\s*scale[XY]?\(\s*var\(\s*--dock-morph-scale\b/.test(b.body),
    );
    facts.transformOnScalar = anyTransformScalar;
    if (!anyTransformScalar) {
        violations.push(
            "F1: no morph-axis rule lands the live scalar on `transform: scaleX/Y(var(--dock-morph-scale))` — the compositor transform is absent (the box still morphs via the layout axis)",
        );
    }

    // (b) the box RESERVES the settled `to` footprint — a layout property set to
    //     `var(--dock-morph-to)` (the SETTLED value), NOT the live `--dock-morph-size`
    //     calc. AND (the anti-evasion bite) NO morph rule animates a layout property
    //     off the LIVE scalar (`inline-size`/`block-size: var(--dock-morph-size)` or
    //     a calc reading --dock-morph-t).
    // BC.W-LIQUID-MORPH owns the reserve FLOOR: the reserve may be bare
    // `var(--dock-morph-to)` OR floored `max(var(--dock-morph-to), var(--dock-morph-min))`
    // — both reserve the SETTLED `to` footprint (a single layout solve, NOT a live calc;
    // the floor value contains no --dock-morph-t, so the liveLayoutAnim anti-evasion
    // below still catches a real per-frame relayout). F1 tolerates the floor wrapper (the
    // white-morph safety net).
    const anyReserve = morphRules.some((b) =>
        /(inline-size|block-size)\s*:\s*(?:max\(\s*)?var\(\s*--dock-morph-to\s*\)/.test(b.body),
    );
    facts.reservesSettledFootprint = anyReserve;
    if (!anyReserve) {
        violations.push(
            "F1: no morph-axis rule RESERVES the settled `to` footprint (`inline-size`/`block-size: var(--dock-morph-to)`) — the box does not reserve its end geometry (the reveal-seat (b) requires the settled-footprint reserve)",
        );
    }

    // The anti-evasion bite: a layout property reading the LIVE scalar (the per-frame
    // relayout) must be GONE. `--dock-morph-size` was the live calc; a layout prop
    // reading it (or --dock-morph-t directly) REDs even if a transform is also added.
    const liveLayoutAnim = morphRules.some(
        (b) =>
            /(inline-size|block-size)\s*:\s*var\(\s*--dock-morph-size\s*\)/.test(b.body) ||
            /(inline-size|block-size)\s*:[^;]*var\(\s*--dock-morph-t\b/.test(b.body),
    );
    facts.liveLayoutAnimationPresent = liveLayoutAnim;
    if (liveLayoutAnim) {
        violations.push(
            "F1: a morph-axis rule still animates a LAYOUT property (`inline-size`/`block-size`) off the LIVE scalar (`--dock-morph-size`/`--dock-morph-t`) — the per-frame relayout must be GONE, not supplemented by a transform (the C3 defect)",
        );
    }

    return { facts, violations };
}

// ── F3 — the PRM path seats the geometry SYNCHRONOUSLY ──────────────────────────
export function detectPrmSynchronousSeat(orchestratorTs, layerTransitionTs) {
    const violations = [];
    const facts = {};

    for (const [name, raw] of [
        ["dockMorphContext.ts", orchestratorTs],
        ["useLayerTransition.ts", layerTransitionTs],
    ]) {
        const src = stripAllComments(raw);
        // (a) a PRM probe exists.
        const hasProbe = /prefersReducedMotion\s*\(/.test(src) &&
            /matchMedia\(\s*["'`]\(prefers-reduced-motion:\s*reduce\)["'`]\s*\)/.test(src);
        // (b) a PRM branch seats synchronously via nextTick (post-flush, NOT an rAF
        //     morph window). The branch guards the synchronous seat AND returns
        //     (does not fall through to the rAF measure-defer).
        const prmBranch = /if\s*\(\s*prefersReducedMotion\(\)\s*\)\s*\{[^}]*nextTick\([\s\S]*?seat[\s\S]*?\}/.test(
            src.replace(/\n/g, " "),
        );
        // (c) the synchronous seat composes the BA-VJS-1 nested ordering (the
        //     orchestrator) — `seatTargetSync`/`measureTo`/`nestedTargetsWithin`/
        //     `forceNestedMaxContent` reached on the sync path; useLayerTransition is
        //     the standalone (no nested targets), so it only needs the max-content
        //     circular-measure escape. BB.W-CARVE4 — for the orchestrator, `src` is
        //     the dockMorphContext.ts + dockMorphMeasure.ts CONCATENATION (the
        //     measure/seat helpers carved into the sibling leaf; the assert FOLLOWS
        //     the composition into it).
        const composesNested =
            name === "dockMorphContext.ts"
                ? /seatTargetSync[\s\S]*measureTo\(/.test(src) &&
                  /function\s+measureTo\([\s\S]*nestedTargetsWithin\(/.test(src)
                : /function\s+seatSync\([\s\S]*max-content/.test(src);

        facts[`${name}.prmProbe`] = hasProbe;
        facts[`${name}.prmSyncBranch`] = prmBranch;
        facts[`${name}.composesMeasure`] = composesNested;

        if (!hasProbe) {
            violations.push(
                `F3: ${name} has no \`prefersReducedMotion()\` probe (matchMedia '(prefers-reduced-motion: reduce)') — the PRM synchronous seat is absent`,
            );
        }
        if (!prmBranch) {
            violations.push(
                `F3: ${name} has no PRM branch that seats SYNCHRONOUSLY via \`nextTick(() => seat…)\` and returns (no rAF morph window) — the span still seats a rAF later under PRM (the 10×74 sliver)`,
            );
        }
        if (!composesNested) {
            violations.push(
                `F3: ${name}'s synchronous seat does not compose the measure escape (the orchestrator's BA-VJS-1 nested \`max-content\` ordering / the standalone \`max-content\` circular-measure escape) — the nested group reads to:0 / the measure is circular`,
            );
        }
    }

    return { facts, violations };
}

// ── F4 — DockLayerGroup self-reserves its peak-layer block-size ─────────────────
export function detectPeakSelfReserve(groupVue) {
    const violations = [];
    const facts = {};
    const src = stripAllComments(groupVue);

    // (a) the group MEASURES the peak (an intrinsic measure across panes — a
    //     scrollHeight/getBoundingClientRect read, NOT a token literal). The
    //     canonical form iterates `.dock-layer-item-host` panes reading `scrollHeight`.
    const measuresPeak =
        /querySelectorAll[^;]*\.dock-layer-item-host/.test(src) &&
        /\.scrollHeight\b/.test(src);
    facts.measuresPeak = measuresPeak;
    if (!measuresPeak) {
        violations.push(
            "F4: DockLayerGroup does not MEASURE the peak-layer block-size (a `.dock-layer-item-host` pane intrinsic measure via `scrollHeight`) — the reserve must be MEASURED, not a token guess (the consumer's mis-guess is what is being retired)",
        );
    }

    // (b) NOT a hardcoded literal reserve (the dead-knob/guess evasion).
    const literalReserve = /min-block-size["']?\s*:\s*["']?\s*[\d.]+(px|rem)/.test(src);
    facts.hardcodedLiteralReserve = literalReserve;
    if (literalReserve) {
        violations.push(
            "F4: DockLayerGroup hardcodes a literal `min-block-size: <px|rem>` reserve — a token guess is exactly the thing being retired (the reserve must be a MEASURED peak)",
        );
    }

    // (c) the reserve applies to the GROUP root (`.dock-layer-group`), NOT the dock
    //     root (the box-inviolate fence) — the min-block-size + the read-only
    //     `--dock-layer-peak-block-size` are bound on the group element's style.
    const exposesPeakVar = /--dock-layer-peak-block-size/.test(src);
    const reserveOnGroup =
        /min-block-size/.test(src) &&
        /:style=["'][^"']*groupReserveStyle|groupReserveStyle/.test(groupVue);
    facts.exposesPeakVar = exposesPeakVar;
    facts.reserveBoundOnGroupRoot = reserveOnGroup;
    if (!exposesPeakVar) {
        violations.push(
            "F4: DockLayerGroup does not expose the read-only `--dock-layer-peak-block-size` custom property — the consumer cannot READ the reserve",
        );
    }
    if (!reserveOnGroup) {
        violations.push(
            "F4: the `min-block-size` reserve is not bound on the GROUP root via `groupReserveStyle` — the reserve must apply to the group's own root, never inflate the dock root (the box-inviolate fence)",
        );
    }

    // (d) re-measured on a resize tick (the panes' intrinsic size can change).
    const reMeasures = /useResizeObserver\(\s*containerEl/.test(src);
    facts.reMeasuresOnResize = reMeasures;
    if (!reMeasures) {
        violations.push(
            "F4: the peak reserve is not re-measured on a `useResizeObserver` tick — a pane's intrinsic size change would leave a stale reserve",
        );
    }

    return { facts, violations };
}

// ── F5 — --dock-local-scale threads via an inheriting @property registration ────
export function detectScalePropertyThread(dockCss) {
    const violations = [];
    const facts = {};
    const css = stripBlockComments(dockCss);

    // The two registrations: @property --dock-scale + @property --dock-local-scale,
    // both inheriting, default 1 (byte-identical at the default scale).
    function checkProp(name) {
        const re = new RegExp(
            `@property\\s+${name.replace(/[-]/g, "\\-")}\\s*\\{([^}]*)\\}`,
        );
        const m = css.match(re);
        if (!m) return { found: false, inherits: false, initOne: false };
        const body = m[1];
        return {
            found: true,
            inherits: /inherits\s*:\s*true/.test(body),
            initOne: /initial-value\s*:\s*1\b/.test(body),
            isNumber: /syntax\s*:\s*["']<number>["']/.test(body),
        };
    }

    const scale = checkProp("--dock-scale");
    const local = checkProp("--dock-local-scale");
    facts.dockScaleReg = scale;
    facts.dockLocalScaleReg = local;

    if (!local.found) {
        violations.push(
            "F5: `@property --dock-local-scale` is not registered — the consumer-scope override never re-evaluates (the substitution-once :root trap)",
        );
    } else {
        if (!local.inherits)
            violations.push(
                "F5: `@property --dock-local-scale` is not `inherits: true` — a non-inheriting registration does not thread to a dock scope",
            );
        if (!local.initOne)
            violations.push(
                "F5: `@property --dock-local-scale` default is not `1` — the default-scale render must be byte-identical (the additive thread, not a re-tune)",
            );
    }
    if (!scale.found) {
        violations.push(
            "F5: `@property --dock-scale` is not registered — the derived axis does not re-substitute per-element when --dock-local-scale shifts",
        );
    } else {
        if (!scale.inherits)
            violations.push(
                "F5: `@property --dock-scale` is not `inherits: true`",
            );
        if (!scale.initOne)
            violations.push(
                "F5: `@property --dock-scale` default is not `1` (byte-identical at default scale)",
            );
    }

    return { facts, violations };
}

// ── F6 — the VERTICAL chrome-interp un-gate (BB-1 + BB-4) ────────────────────────
export function detectVerticalChromeInterp(morphCss, shellCss, layersCss) {
    const violations = [];
    const facts = {};
    const morphBlocks = ruleBlocks(morphCss);
    const shellBlocks = ruleBlocks(shellCss);

    // (i) the `--dock-expand-t` DERIVATION arms (the rules that SET `--dock-expand-t:`
    //     — the directional expanded-ness derivation) are axis-INVARIANT (a t-vs-1-t
    //     blend with no axis), so they MUST be orientation-agnostic — a residual
    //     `:not(.vertical)` on a SETTER arm REDs (the vertical dock would never derive
    //     the in-flight expand-t, so its chrome could not interpolate at all). The
    //     bg/border/padding arms (which READ --dock-expand-t in a value) legitimately
    //     KEEP their `:not(.vertical)` qualifier under the parallel-`.vertical`-block
    //     form (option ii) — those are checked by (ii)/(iii) below, which verify the
    //     vertical twin exists.
    const derivationSetters = morphBlocks.filter((b) =>
        /--dock-expand-t\s*:/.test(b.body),
    );
    const gatedSetters = derivationSetters.filter((b) =>
        /:not\(\.vertical\)/.test(b.selector),
    );
    facts.derivationSetterCount = derivationSetters.length;
    facts.gatedSetterCount = gatedSetters.length;
    // back-compat fact name (the summary printer reads it)
    facts.gatedExpandTReaderCount = gatedSetters.length;
    if (gatedSetters.length > 0) {
        violations.push(
            `F6: ${gatedSetters.length} \`--dock-expand-t\` DERIVATION (setter) rule(s) still carry \`:not(.vertical)\` — the directional derivation must be orientation-agnostic so a vertical dock derives the in-flight expand-t (selectors: ${gatedSetters.map((b) => b.selector).slice(0, 4).join(" | ")})`,
        );
    }

    // (ii) a parallel `.vertical` chrome-interp drives bg/border off --dock-expand-t.
    const verticalBgInterp = morphBlocks.some(
        (b) =>
            /\.glass-dock\.vertical\b/.test(b.selector) &&
            !/:not\(\.vertical\)/.test(b.selector) &&
            /background\s*:/.test(b.body) &&
            /--dock-expand-t/.test(b.body),
    );
    facts.verticalBgInterpPresent = verticalBgInterp;
    if (!verticalBgInterp) {
        violations.push(
            "F6: no `.glass-dock.vertical` chrome-interp rule drives `background` off --dock-expand-t — the vertical plate bg/border does not interpolate (snaps)",
        );
    }

    // (iii) the vertical PADDING interp is the axis-INVERSE: pins `padding-inline`
    //       (cross/invariant) + morphs `padding-block` (the morph axis) off
    //       --dock-expand-t. A vertical rule morphing `padding-inline` off the scalar
    //       REDs (the wrong axis re-introduces horizontal reflow).
    const verticalPadRule = morphBlocks.find(
        (b) =>
            /\.glass-dock\.vertical/.test(b.selector) &&
            !/:not\(\.vertical\)/.test(b.selector) &&
            /padding-(block|inline)\s*:/.test(b.body),
    );
    if (!verticalPadRule) {
        violations.push(
            "F6: no `.glass-dock.vertical` padding-interp rule found — the vertical padding does not morph (snaps)",
        );
    } else {
        const padBlockMorphs = /padding-block\s*:\s*calc\([^;]*--dock-expand-t/.test(
            verticalPadRule.body,
        );
        const padInlinePinned =
            /padding-inline\s*:\s*var\(\s*--dock-padding-inline/.test(verticalPadRule.body) &&
            !/padding-inline\s*:\s*calc\([^;]*--dock-expand-t/.test(verticalPadRule.body);
        facts.verticalPadBlockMorphs = padBlockMorphs;
        facts.verticalPadInlinePinned = padInlinePinned;
        if (!padBlockMorphs) {
            violations.push(
                "F6: the vertical padding interp does not MORPH `padding-block` off --dock-expand-t — the morph (block) axis aperture is not animated",
            );
        }
        if (!padInlinePinned) {
            violations.push(
                "F6: the vertical padding interp does not PIN `padding-inline` (the cross/invariant axis) — morphing the inline axis re-introduces a horizontal sibling reflow (the §1 layout-isolation contract, axis-inverted)",
            );
        }
    }

    // (iv) the RADIUS arm reaches `.glass-dock.vertical.shape-card` (the radius lives
    //      in shell.css, not morph.css — the cite-drift correction).
    const verticalRadiusMorph = shellBlocks.some(
        (b) =>
            /\.glass-dock\.vertical\.shape-card\b/.test(b.selector) &&
            /border-radius\s*:\s*calc\([^;]*--dock-expand-t/.test(b.body),
    );
    facts.verticalRadiusMorphPresent = verticalRadiusMorph;
    if (!verticalRadiusMorph) {
        violations.push(
            "F6: no `.glass-dock.vertical.shape-card` radius-morph rule reads --dock-expand-t in shell.css — the vertical card radius snaps",
        );
    }

    // (v) the stale "ALWAYS-EXPANDED" justification comment is GONE (the raw shell.css
    //     must no longer carry the false assumption that justified the deleted arms).
    const staleComment = /a vertical rail is ALWAYS-EXPANDED \(no collapse/i.test(shellCss);
    facts.staleAlwaysExpandedComment = staleComment;
    if (staleComment) {
        violations.push(
            'F6: the stale "a vertical rail is ALWAYS-EXPANDED (no collapse…)" comment still sits in shell.css — it is false since vertical-collapse shipped; delete it (clean break)',
        );
    }

    // (vi) NO `transition: padding/background/border-color` second-clock chrome-arm
    //      is re-added to the vertical root (the forbidden second-clock smell). The
    //      vertical root's `transition` may carry box-shadow/transform/scale (the
    //      decorative arms) but NOT the morph-chrome props.
    const verticalRoot = shellBlocks.find(
        (b) =>
            /^\.glass-dock\.vertical$/.test(b.selector) &&
            /transition\s*:/.test(b.body),
    );
    if (verticalRoot) {
        const transitionMatch = verticalRoot.body.match(/transition\s*:\s*([^;]*)/);
        const transitionVal = transitionMatch ? transitionMatch[1] : "";
        const hasSecondClock = /(padding|background|border-color)\b/.test(transitionVal);
        facts.verticalSecondClockTransition = hasSecondClock;
        if (hasSecondClock) {
            violations.push(
                "F6: the vertical root re-added a `transition: padding/background/border-color` arm — the morph-chrome props on a CSS transition are the FORBIDDEN second-clock smell (the morph is the --dock-expand-t single-scalar interp)",
            );
        }
    }

    // (vii) the BB-4 slot transition (the leaving pane in layers.css) reads the
    //       block-size spring scalar `--dock-morph-t`, NOT a separate crossfade clock.
    const layersFlat = stripBlockComments(layersCss).replace(/\s+/g, " ");
    const slotTransitionOnScalar = /\.is-leaving[\s\S]*?opacity\s*:\s*calc\(\s*1\s*-\s*var\(\s*--dock-morph-t/.test(
        layersFlat,
    );
    facts.bb4SlotTransitionOnScalar = slotTransitionOnScalar;
    if (!slotTransitionOnScalar) {
        violations.push(
            "F6/BB-4: the leaving-pane slot transition does not read `opacity: calc(1 - var(--dock-morph-t))` — it reverted to a separate crossfade clock (the second-clock the single-scalar rebuild retires)",
        );
    }

    return { facts, violations };
}

// ── the self-test bite — each detector REDs on a synthetic pre-fix fixture ───────
function selfTest() {
    const failures = [];
    const assertRed = (label, fn) => {
        let red = false;
        try {
            const { violations } = fn();
            red = violations.length > 0;
        } catch {
            red = true;
        }
        if (!red) failures.push(`self-test: ${label} did NOT red on its pre-fix fixture`);
    };

    // F1 — the HEAD inline-size morph fixture.
    assertRed("F1 inline-size morph", () =>
        detectCompositorTransform(
            `.glass-dock[data-morphing] .dock-layers { --dock-morph-size: calc(var(--dock-morph-from) + (var(--dock-morph-to) - var(--dock-morph-from)) * var(--dock-morph-t)); inline-size: var(--dock-morph-size); }`,
        ),
    );
    // F3 — no PRM seat fixture.
    assertRed("F3 no PRM seat", () =>
        detectPrmSynchronousSeat(
            `function onSwap() { requestAnimationFrame(() => { armTarget(); }); }`,
            `function armSpring() { spring.play(); }`,
        ),
    );
    // F4 — registry exists, no peak reserve fixture.
    assertRed("F4 no peak reserve", () =>
        detectPeakSelfReserve(
            `<script>const handle = morphHost.registerGroup({ containerEl, activeLayer, axis });</script><template><div class="dock-layer-group"><slot /></div></template>`,
        ),
    );
    // F4 — a hardcoded literal guess reds.
    assertRed("F4 literal guess", () =>
        detectPeakSelfReserve(
            `<script>const s = { 'min-block-size': '4rem' };</script><template><div class="dock-layer-group" :style="s"><slot /></div></template>`,
        ),
    );
    // F5 — :root-only declaration, no @property fixture.
    assertRed("F5 no @property", () =>
        detectScalePropertyThread(
            `:root { --dock-scale: calc(var(--ui-scale) * var(--dock-local-scale, 1)); --dock-local-scale: 1; }`,
        ),
    );
    // F6 — the HEAD :not(.vertical)-gated chrome-interp fixture: the DERIVATION setter
    //      carries :not(.vertical), no vertical bg/padding twin, the radius arm is
    //      horizontal-only, and the stale ALWAYS-EXPANDED comment sits in shell.
    assertRed("F6 gated chrome-interp", () =>
        detectVerticalChromeInterp(
            `.glass-dock:not(.vertical).collapsed[data-morphing] { --dock-expand-t: calc(1 - var(--dock-morph-t)); } .glass-dock:not(.vertical) { background: color-mix(in srgb, a calc(var(--dock-expand-t) * 100%), b); } .glass-dock:not(.vertical):not(.dock-overflow-wrap) { padding-block: var(--dock-padding-block); padding-inline: calc(var(--dock-pad-collapsed) + (var(--dock-padding-inline) - var(--dock-pad-collapsed)) * var(--dock-expand-t)); }`,
            `.glass-dock.vertical { transition: box-shadow var(--m); } .glass-dock:not(.vertical).shape-card { border-radius: calc(var(--radius-pill) + (var(--dock-card-radius) - var(--radius-pill)) * var(--dock-expand-t)); } /* a vertical rail is ALWAYS-EXPANDED (no collapse…) */`,
            `.dock-layer.is-leaving { opacity: 0; }`,
        ),
    );
    // F6 — the forbidden second-clock fixture: a vertical root re-adds a
    //      `transition: padding/background/border-color` arm.
    assertRed("F6 second-clock transition", () =>
        detectVerticalChromeInterp(
            `.glass-dock.expanded[data-morphing] { --dock-expand-t: var(--dock-morph-t); } .glass-dock.vertical { background: color-mix(in srgb, a calc(var(--dock-expand-t) * 100%), b); } .glass-dock.vertical:not(.dock-overflow-wrap) { padding-inline: var(--dock-padding-inline); padding-block: calc(x + y * var(--dock-expand-t)); }`,
            `.glass-dock.vertical { transition: padding var(--m), background var(--m); } .glass-dock.vertical.shape-card { border-radius: calc(var(--radius-pill) + (var(--dock-card-radius) - var(--radius-pill)) * var(--dock-expand-t)); }`,
            `.dock-layer.is-leaving { opacity: calc(1 - var(--dock-morph-t)); }`,
        ),
    );
    return failures;
}

async function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_MORPH_FAMILY_ARTIFACT",
        "BB-dock-morph-family",
    );

    const read = (p) => readFileSync(resolve(ROOT, p), "utf8");
    const layersCss = read("src/styles/dock/layers.css");
    const morphCss = read("src/styles/dock/morph.css");
    const shellCss = read("src/styles/dock/shell.css");
    const dockCss = read("src/styles/dock.css");
    // BB.W-CARVE4 — the orchestrator's measure/seat mechanism (`seatTargetSync` +
    // `measureTo` + the BA-VJS-1 nested ordering) carved into the sibling
    // `dockMorphMeasure.ts`; the orchestrator IMPORTS + composes them (the PRM probe
    // + the `nextTick(() => seatTargetSync(…))` branch stay in dockMorphContext.ts).
    // F3 reads the CONCATENATION so the asserts FOLLOW the composition into the leaf
    // (the proof:webgl-substrate-single precedent — the substrate-exists asserts
    // follow the composition into the carved leaf, never RED on the relocation).
    const orchestratorTs =
        read("src/components/custom/dock/composables/dockMorphContext.ts") +
        "\n" +
        read("src/components/custom/dock/composables/dockMorphMeasure.ts");
    const layerTransitionTs = read(
        "src/components/custom/dock/composables/useLayerTransition.ts",
    );
    const groupVue = read("src/components/custom/dock/DockLayerGroup.vue");

    const f1 = detectCompositorTransform(layersCss);
    const f3 = detectPrmSynchronousSeat(orchestratorTs, layerTransitionTs);
    const f4 = detectPeakSelfReserve(groupVue);
    const f5 = detectScalePropertyThread(dockCss);
    const f6 = detectVerticalChromeInterp(morphCss, shellCss, layersCss);
    const selfTestFailures = selfTest();

    const violations = [
        ...f1.violations,
        ...f3.violations,
        ...f4.violations,
        ...f5.violations,
        ...f6.violations,
        ...selfTestFailures,
    ];
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts: {
            f1: f1.facts,
            f3: f3.facts,
            f4: f4.facts,
            f5: f5.facts,
            f6: f6.facts,
        },
        violations,
        selfTestFailures,
    });

    printSummary({ status, f1, f3, f4, f5, f6, selfTestFailures });
    process.exit(status === "pass" ? 0 : 1);
}

function printSummary({ status, f1, f3, f4, f5, f6, selfTestFailures }) {
    console.log(
        "proof:dock-morph-family — the dock-morph REPAIR gate (compositor transform + PRM synchronous seat + peak self-reserve + @property scale thread + vertical chrome un-gate) (BB.W-DOCK-MORPH-FAMILY)",
    );
    console.log(
        `  F1 compositor-transform : transformOnScalar=${f1.facts.transformOnScalar} reservesFootprint=${f1.facts.reservesSettledFootprint} liveLayoutAnim=${f1.facts.liveLayoutAnimationPresent} ${f1.violations.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  F2 reveal-seat          : (asserted via F1 reserve + the π frame-series)`,
    );
    console.log(
        `  F3 PRM synchronous-seat : orchestrator(probe/branch/measure)=${f3.facts["dockMorphContext.ts.prmProbe"]}/${f3.facts["dockMorphContext.ts.prmSyncBranch"]}/${f3.facts["dockMorphContext.ts.composesMeasure"]} layerTransition=${f3.facts["useLayerTransition.ts.prmProbe"]}/${f3.facts["useLayerTransition.ts.prmSyncBranch"]}/${f3.facts["useLayerTransition.ts.composesMeasure"]} ${f3.violations.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  F4 peak self-reserve    : measures=${f4.facts.measuresPeak} exposesVar=${f4.facts.exposesPeakVar} onGroupRoot=${f4.facts.reserveBoundOnGroupRoot} reMeasures=${f4.facts.reMeasuresOnResize} ${f4.violations.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  F5 @property scale-thread: dock-scale(found/inh/1)=${f5.facts.dockScaleReg?.found}/${f5.facts.dockScaleReg?.inherits}/${f5.facts.dockScaleReg?.initOne} dock-local-scale=${f5.facts.dockLocalScaleReg?.found}/${f5.facts.dockLocalScaleReg?.inherits}/${f5.facts.dockLocalScaleReg?.initOne} ${f5.violations.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  F6 vertical chrome-interp: gatedReaders=${f6.facts.gatedExpandTReaderCount} vBg=${f6.facts.verticalBgInterpPresent} vPad(block/inline)=${f6.facts.verticalPadBlockMorphs}/${f6.facts.verticalPadInlinePinned} vRadius=${f6.facts.verticalRadiusMorphPresent} staleComment=${f6.facts.staleAlwaysExpandedComment} bb4=${f6.facts.bb4SlotTransitionOnScalar} ${f6.violations.length === 0 ? "OK" : "RED"}`,
    );
    const allV = [
        ...f1.violations,
        ...f3.violations,
        ...f4.violations,
        ...f5.violations,
        ...f6.violations,
    ];
    if (allV.length) {
        console.log("\nVIOLATIONS:");
        for (const v of allV) console.log(`  x ${v}`);
    }
    if (selfTestFailures.length) {
        console.log("\nSELF-TEST FAILURES:");
        for (const v of selfTestFailures) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
