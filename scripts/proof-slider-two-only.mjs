#!/usr/bin/env node
// AV.W11 — the slider-two-only cardinality + design gate (proof:slider-two-only).
//
// The reka-backed `<Slider>` ships EXACTLY two recipes — `standard` (the
// CONTINUOUS GLASS CYLINDER with NO VISIBLE THUMB AT ALL: you pull the TRACK
// itself, the filled glass cylinder's leading edge IS the handle) and `spectrum`
// (the value.js gradient-track color slider with the THIN VISIBLE track-height
// squircle thumb). This gate freezes that cardinality AND the thumb-INVISIBLE
// design contract, and polices the keyset at BOTH boundaries — the library
// cardinality AND the consumer call-site. Five clauses:
//
//   (1) KEYSET — `sliderVariants` in index.ts lists exactly
//       ['standard','spectrum'].
//   (2) ORPHAN-SCAN — Slider.vue scoped CSS carries no `[data-variant="X"]`
//       selector for X ∉ keyset (no orphan removed-variant block).
//   (3) THUMB-INVISIBLE — the standard slider has NO DISTINCT THUMB PAINT (the
//       user's binding bar, USER-AUDIT-2026-06-10 §B3: "no visible thumb AT ALL;
//       you pull the TRACK itself"). The third+final restatement, a CONJUNCTION
//       — three legs, all required:
//         • INVISIBLE-PAINT — base `.slider-thumb` collapses to no own paint:
//           `width: 0` AND `opacity: 0` (the thumb element stays mounted for
//           a11y/keyboard/drag but renders nothing over the fill edge — NO disc,
//           NO cap, NO ring). Any nonzero base width OR a base `border-radius:
//           50%` / `aspect-ratio: 1` round-knob paint REDS (the regression to a
//           visible knob the user rejected twice);
//         • FOCUS-ON-TRACK — keyboard focus rings the TRACK, not the (invisible)
//           thumb: a `.glass-slider…:focus-within .slider-track` rule resolves
//           `box-shadow: var(--focus-ring-shadow)` (the W-PRIM-POLISH focus
//           register on the visible surface the user pulls);
//         • the `.slider-range` fill carries a `backdrop-filter` (the
//           continuous glass cylinder whose edge IS the handle).
//   (4) SQUIRCLE-SPECTRUM — the spectrum thumb is the track-height SQUIRCLE:
//       a `corner-shape: var(--corner-shape-thumb)` decl sits ONLY inside an
//       `@supports (corner-shape: superellipse(2))` gate (the Chrome-139 PE
//       tier — `var()` is not @supports-evaluable so the gate tests the
//       literal feature) over a `border-radius` round CONTRACT, with
//       `height: 100%` (full track height, not a floating circle).
//   (5) CONSUMER-BOUNDARY — every `@mkbabb/glass-ui` consumer source tree
//       (self glass-ui `src`+`demo` + the constellation siblings) is scanned
//       for `<Slider>` variant bindings; any LITERAL variant value X ∉ keyset
//       (static `variant="X"` or bound `:variant="'X'"`) on a consumer that
//       RESOLVES THE CURRENT TWO-ONLY BUILD reddens — closing the "migrate ALL
//       consumers" half AX.W59 left source-only. The keyset comes from the SAME
//       `EXPECTED_KEYS` constant clauses 1-4 use (widen it once → re-permitted
//       at both the library AND the consumer boundary). Version-pin-aware: a
//       consumer whose INSTALLED glass-ui predates the two-only floor
//       (`TWO_ONLY_FLOOR` = the 3.9.0 build AX.W59 shipped in) resolves the
//       removed variant against ITS OWN older keyset — its binding is NOT a
//       no-op there, so it is a LOGGED out-of-scope skip, never a violation. A
//       non-literal bound expression (`:variant="someRef"`) cannot be
//       statically resolved → reported as UNCHECKABLE (logged, NOT flagged: a
//       false-positive there would lie). Absent siblings on a clean runner are
//       the graceful registry-default skip (`skipSibling`).
//
// inv ε / bite-check: re-adding a removed variant key reddens (1); restoring a
// removed scoped block reddens (2); painting a VISIBLE standard knob (a nonzero
// base width, a base `border-radius: 50%` round knob, or a base `opacity` other
// than 0), dropping the `:focus-within .slider-track` focus ring, OR stripping
// the fill `backdrop-filter` reddens (3); dropping the spectrum `corner-shape`
// decl, leaking it outside the `@supports` gate, or floating the squircle thumb
// off the track height reddens (4); a consumer on the current build binding
// `<Slider variant="rounded">` reddens (5).

import { existsSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { readdirSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { CONSUMERS, resolveSibling, skipSibling } from "./constellation.mjs";

const EXPECTED_KEYS = ["standard", "spectrum"];

// The glass-ui build the AX.W59 two-only collapse shipped in (commit a730782,
// contained in v3.9.0). A consumer whose INSTALLED `@mkbabb/glass-ui` is BELOW
// this floor resolves a removed variant against its own pre-collapse keyset —
// the binding paints there, it is NOT a silent no-op — so clause 5 skips it
// (logged, out-of-scope). The boundary is policed EXACTLY where the no-op
// would occur: on a consumer that resolves the two-only build.
const TWO_ONLY_FLOOR = "3.9.0";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        INDEX: resolve(ROOT, "src/components/ui/slider/index.ts"),
        SFC: resolve(ROOT, "src/components/ui/slider/Slider.vue"),
        ARTIFACT: gateArtifactPath("GLASS_UI_SLIDER_TWO_ONLY_ARTIFACT", "AV-slider-two-only"),
    };
    return _cliPaths;
}

// Strip /* … */ + // comments so neither doc-prose nor a commented-out block
// can spoof a clause.
function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
}

// Resolve a CSS length literal (`1.25rem` / `20px` / `0`) to px (16px/rem).
function lenToPx(v) {
    if (v == null) return null;
    const m = String(v).trim().match(/^([\d.]+)(rem|px)?$/);
    if (!m) return null;
    const n = Number(m[1]);
    return m[2] === "rem" || !m[2] ? (m[2] === "px" ? n : n * 16) : n;
}

// Parse the per-rung `--slider-track-height` / `--slider-thumb-size` CSS vars out
// of the SHIPPED size axis. BA.W-EMISSION (BA-VJS-A3) moved the geometry OFF the
// dead index.ts arbitrary-property CVA brackets (`[--slider-track-height:1.25rem]`
// &c. — they compiled only into a `dist/*.js` chunk no consumer content-scan
// reaches, so the `size` prop was INERT) INTO the SFC's `[data-size]`-scoped
// SHIPPED CSS (Slider.vue: `.glass-slider[data-size="md"] { --slider-track-height:
// 1.25rem; --slider-thumb-size: 1rem; }`), which SHIPS in dist/glass-ui.css. The
// parse reads the SHIPPED source — the three `[data-size="sm|md|lg"]` scoped
// rules in the SFC. Returns { sm: {track, thumb}, md: …, lg: … } in px.
function parseSizeRungs(sfcSrc) {
    const code = stripComments(sfcSrc);
    const rungs = {};
    for (const rung of ["sm", "md", "lg"]) {
        const ruleRe = new RegExp(
            `\\.glass-slider\\[data-size="${rung}"\\]\\s*\\{([^}]*)\\}`,
        );
        const m = code.match(ruleRe);
        if (!m) continue;
        const body = m[1];
        const track = (body.match(/--slider-track-height\s*:\s*([^;]+);/) || [])[1]?.trim();
        const thumb = (body.match(/--slider-thumb-size\s*:\s*([^;]+);/) || [])[1]?.trim();
        rungs[rung] = { track: lenToPx(track), thumb: lenToPx(thumb), trackRaw: track, thumbRaw: thumb };
    }
    return Object.keys(rungs).length ? rungs : null;
}

// Parse the CVA `variant: { … }` keyset out of index.ts.
function parseVariantKeys(indexSrc) {
    const code = stripComments(indexSrc);
    const m = code.match(/variant\s*:\s*\{([\s\S]*?)\}/);
    if (!m) return null;
    const keys = [];
    const keyRe = /(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$-]*))\s*:/g;
    let k;
    while ((k = keyRe.exec(m[1]))) keys.push(k[1] ?? k[2] ?? k[3]);
    return keys;
}

// ── (5) CONSUMER-BOUNDARY — the pure, exported, testable detector ────────────

/**
 * Compare two dotted numeric versions. Returns -1 / 0 / 1 (a<b / a==b / a>b).
 * Pre-release/build suffixes are ignored (a `3.9.0-rc.1` compares as `3.9.0` —
 * a published RC of the floor is treated as the floor for scope purposes).
 */
export function compareSemver(a, b) {
    const norm = (v) => String(v ?? "").replace(/^[v=]/, "").split(/[-+]/)[0].split(".").map((n) => Number(n) || 0);
    const [a0, a1 = 0, a2 = 0] = norm(a);
    const [b0, b1 = 0, b2 = 0] = norm(b);
    if (a0 !== b0) return a0 < b0 ? -1 : 1;
    if (a1 !== b1) return a1 < b1 ? -1 : 1;
    if (a2 !== b2) return a2 < b2 ? -1 : 1;
    return 0;
}

/**
 * scanSliderVariants — the pure, side-effect-free `<Slider>` variant-binding
 * detector. Walks `src` looking for every `<Slider …>` open tag (multi-line
 * tolerant — `variant=` legally lives on a line below `<Slider`) and classifies
 * its `variant` / `:variant` binding:
 *
 *   - static `variant="X"` / `variant='X'`           → a LITERAL value X.
 *   - bound  `:variant="'X'"` / `:variant='"X"'`     → a LITERAL value X.
 *   - bound  `:variant="someRef"` (no inner literal) → UNCHECKABLE (a ref the
 *                                                       gate cannot statically
 *                                                       resolve; logged, NOT a
 *                                                       violation).
 *   - no `variant` binding (default `standard`)      → ignored (in-keyset).
 *
 * A LITERAL value ∉ EXPECTED_KEYS is a HIT (the silent-no-op binding). The
 * `line` reported is the 1-based line of the `<Slider` open-tag.
 *
 * @param {string} src   the raw file source (a `.vue` SFC)
 * @param {string} file  a label for the hits (repo-relative path)
 * @returns {{ hits: {line:number, variant:string, file:string}[], uncheckable: number }}
 */
export function scanSliderVariants(src, file = "") {
    const hits = [];
    let uncheckable = 0;
    // Index every line start so a tag's byte offset maps back to a 1-based line.
    const lineStarts = [0];
    for (let i = 0; i < src.length; i++) if (src[i] === "\n") lineStarts.push(i + 1);
    const lineOf = (idx) => {
        let lo = 0;
        let hi = lineStarts.length - 1;
        while (lo < hi) {
            const mid = (lo + hi + 1) >> 1;
            if (lineStarts[mid] <= idx) lo = mid;
            else hi = mid - 1;
        }
        return lo + 1;
    };

    // Find each `<Slider` open tag (word-boundary after — `<SliderControl` /
    // `<SliderRoot` are DISTINCT components, NOT the glass-ui `<Slider>`), then
    // slice the tag text to its first unquoted `>` so a multi-line tag's
    // `variant=` is in scope.
    const tagRe = /<Slider(?=[\s/>])/g;
    let m;
    while ((m = tagRe.exec(src))) {
        const openIdx = m.index;
        // Walk to the end of the open tag, respecting attribute-value quotes so a
        // `>` inside `:foo="a > b"` does not prematurely close the tag.
        let i = openIdx + m[0].length;
        let quote = null;
        for (; i < src.length; i++) {
            const ch = src[i];
            if (quote) {
                if (ch === quote) quote = null;
            } else if (ch === '"' || ch === "'") {
                quote = ch;
            } else if (ch === ">") {
                break;
            }
        }
        const tag = src.slice(openIdx, i);
        const line = lineOf(openIdx);

        // Static `variant="X"` / `variant='X'` — but NOT the bound `:variant`
        // (a leading `:` or `v-bind:` makes it the bound form handled below).
        const staticRe = /(^|[^:\w-])variant\s*=\s*(["'])([^"']*)\2/;
        const sm = tag.match(staticRe);
        if (sm) {
            const v = sm[3];
            if (!EXPECTED_KEYS.includes(v)) hits.push({ line, variant: v, file });
            continue;
        }

        // Bound `:variant="…"` / `v-bind:variant="…"`. Extract the inner; a
        // single/double-quoted string literal inside is the resolvable value, a
        // bare identifier/expression is UNCHECKABLE.
        const boundRe = /(?::|v-bind:)variant\s*=\s*(["'])([\s\S]*?)\1/;
        const bm = tag.match(boundRe);
        if (bm) {
            const inner = bm[2].trim();
            const litRe = /^(['"])([^'"]*)\1$/;
            const lit = inner.match(litRe);
            if (lit) {
                const v = lit[2];
                if (!EXPECTED_KEYS.includes(v)) hits.push({ line, variant: v, file });
            } else {
                uncheckable += 1;
            }
        }
    }
    return { hits, uncheckable };
}

// Read a consumer's INSTALLED `@mkbabb/glass-ui` version (its
// `node_modules/@mkbabb/glass-ui/package.json`). Returns the version string or
// null when the consumer has no installed glass-ui (a fresh-clone CI runner
// resolves the registry; absence is handled by the caller as out-of-scope).
function installedGlassUiVersion(dir) {
    const pkg = resolve(dir, "node_modules/@mkbabb/glass-ui/package.json");
    if (!existsSync(pkg)) return null;
    try {
        return JSON.parse(readFileSync(pkg, "utf8")).version ?? null;
    } catch {
        return null;
    }
}

// Recursively collect `.vue` files under a root, skipping vendored/build/agent
// dirs (the same ignore set the consumer-static walk uses — node_modules, dist,
// .claude worktrees, …). `<Slider variant=>` is Vue-template-only, so the scan
// narrows to `*.vue` for speed (doc-block clause 5).
const IGNORED_DIRS = new Set([
    ".git", ".vite", "dist", "build", "coverage", "node_modules",
    ".output", ".nuxt", ".claude", "worktrees",
]);
function walkVue(dir, out = []) {
    let entries;
    try {
        entries = readdirSync(dir);
    } catch {
        return out;
    }
    for (const entry of entries) {
        if (IGNORED_DIRS.has(entry)) continue;
        const full = join(dir, entry);
        let st;
        try {
            st = statSync(full);
        } catch {
            continue;
        }
        if (st.isDirectory()) walkVue(full, out);
        else if (st.isFile() && extname(full) === ".vue") out.push(full);
    }
    return out;
}

function run() {
    const { ROOT, INDEX, SFC, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(INDEX) || !existsSync(SFC)) {
        violations.push("slider index.ts or Slider.vue missing");
        writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status: "fail", gate: "proof:slider-two-only", facts, violations });
        console.log("proof:slider-two-only — FAIL (source files missing)");
        process.exit(1);
    }

    const indexSrc = readFileSync(INDEX, "utf8");
    const sfcSrc = readFileSync(SFC, "utf8");
    // BG.W-LIQUID-FILL — the continuous glass fill (backdrop-filter blur + rim) was
    // EXTRACTED into the shared `.glass-liquid-fill` register the `.slider-range`
    // composes; this reader FOLLOWS the carve into the leaf (the BB.W-CARVE4 "asserts
    // follow the composition into the carved leaf" precedent).
    const registerCss = existsSync(resolve(ROOT, "src/styles/glass/liquid-fill.css"))
        ? readFileSync(resolve(ROOT, "src/styles/glass/liquid-fill.css"), "utf8")
        : "";

    // (1) KEYSET
    const keys = parseVariantKeys(indexSrc);
    facts.variantKeys = keys;
    if (!keys) {
        violations.push("could not parse `variant: { … }` block in index.ts");
    } else {
        const extra = keys.filter((k) => !EXPECTED_KEYS.includes(k));
        const missing = EXPECTED_KEYS.filter((k) => !keys.includes(k));
        if (extra.length) violations.push(`unexpected variant key(s): ${extra.join(", ")} — keyset must be exactly [${EXPECTED_KEYS.join(",")}]`);
        if (missing.length) violations.push(`missing variant key(s): ${missing.join(", ")}`);
    }

    // (2) ORPHAN-SCAN — any [data-variant="X"] in the scoped CSS where X ∉ keyset.
    const css = stripComments(sfcSrc);
    const orphans = new Set();
    const dvRe = /\[data-variant=["']([^"']+)["']\]/g;
    let d;
    while ((d = dvRe.exec(css))) {
        if (!EXPECTED_KEYS.includes(d[1])) orphans.add(d[1]);
    }
    facts.orphanVariantSelectors = [...orphans];
    if (orphans.size) violations.push(`orphan [data-variant] block(s) for removed variant(s): ${[...orphans].join(", ")}`);

    // (3) THUMB-INVISIBLE — the base `.slider-thumb { … }` paints NOTHING (the
    //     user's binding bar, USER-AUDIT-2026-06-10 §B3): NO VISIBLE THUMB AT ALL.
    //     The standard thumb collapses to `width: 0` AND `opacity: 0` — the element
    //     stays mounted for a11y/keyboard/drag but renders no disc/cap/ring over the
    //     continuous fill edge. A nonzero base width, a base `border-radius: 50%`
    //     round-knob, or a base `opacity` other than 0 is the regression to a
    //     visible knob the user rejected → REDS.
    const thumbMatch = css.match(/(^|\})\s*\.slider-thumb\s*\{([^}]*)\}/);
    facts.thumbBlockFound = Boolean(thumbMatch);
    if (!thumbMatch) {
        violations.push("base `.slider-thumb { … }` block not found");
    } else {
        const body = thumbMatch[2];
        const widthRaw = (body.match(/(?:^|[;{])\s*width\s*:\s*([^;]+);/) || [])[1]?.trim();
        const opacityRaw = (body.match(/(?:^|[;{])\s*opacity\s*:\s*([^;]+);/) || [])[1]?.trim();
        const radius = (body.match(/border-radius\s*:\s*([^;]+);/) || [])[1]?.trim();
        facts.thumbWidth = widthRaw ?? null;
        facts.thumbOpacity = opacityRaw ?? null;
        facts.thumbBorderRadius = radius ?? null;

        // INVISIBLE-PAINT leg 1 — the base width is 0 (no horizontal footprint to
        // paint a knob). A `0` / `0px` / `0rem` passes; any nonzero value REDS.
        const widthPx = lenToPx(widthRaw);
        const widthIsZero = widthRaw != null && widthPx === 0;
        facts.thumbWidthIsZero = widthIsZero;
        if (!widthIsZero) violations.push(`standard .slider-thumb width is "${widthRaw ?? "(none)"}" — must be 0 (NO visible thumb; the filled track edge IS the handle, USER-AUDIT §B3), NOT a paint width`);

        // INVISIBLE-PAINT leg 2 — the base opacity is 0 (nothing renders).
        const opacityIsZero = opacityRaw === "0";
        facts.thumbOpacityIsZero = opacityIsZero;
        if (!opacityIsZero) violations.push(`standard .slider-thumb opacity is "${opacityRaw ?? "(none)"}" — must be 0 (the thumb paints invisible; no distinct disc/cap/ring over the cylinder)`);

        // The visible-knob regression tell: a base `border-radius: 50%` round-knob.
        // (The spectrum thumb's radius is scoped under [data-variant="spectrum"], so
        // a 50% in the BASE block is the rejected floating circle.)
        if (radius === "50%") violations.push("standard .slider-thumb declares a base `border-radius: 50%` — the visible round knob the user rejected (no visible thumb AT ALL, USER-AUDIT §B3)");
    }

    // The size rungs still parse (the `--slider-thumb-size` token sizes the
    // spectrum's visible thin thumb + the standard's invisible-thumb value-follow
    // inset / the 44px coarse hit-halo). thumb ≤ track at every rung keeps the
    // spectrum squircle inscribed in the tall track. BA.W-EMISSION: the geometry
    // moved off the index.ts brackets into the SFC's `[data-size]` scoped CSS, so
    // the rungs are parsed from Slider.vue (the SHIPPED source), not index.ts.
    const rungs = parseSizeRungs(sfcSrc);
    facts.sizeRungs = rungs
        ? Object.fromEntries(Object.entries(rungs).map(([k, v]) => [k, { track: v.trackRaw, thumb: v.thumbRaw }]))
        : null;
    if (!rungs) {
        violations.push("could not parse the `[data-size]` rungs in Slider.vue (the size axis must thread --slider-track-height / --slider-thumb-size per [data-size] scoped rule)");
    } else {
        for (const [rung, { track, thumb }] of Object.entries(rungs)) {
            if (track == null || thumb == null) {
                violations.push(`size rung "${rung}" is missing --slider-track-height or --slider-thumb-size`);
            } else if (thumb > track) {
                violations.push(`size rung "${rung}" thumb-size (${thumb}px) exceeds track-height (${track}px) — the spectrum squircle must stay inscribed in the tall track`);
            }
        }
    }

    // (3) FOCUS-ON-TRACK — keyboard focus rings the TRACK (the W-PRIM-POLISH focus
    //     register on the visible surface), not the invisible thumb. A
    //     `:focus-within .slider-track` rule must resolve `box-shadow:
    //     var(--focus-ring-shadow)`.
    const focusTrackRe = /:focus-within\s+\.slider-track\s*\{([^}]*)\}/;
    const focusTrackMatch = css.match(focusTrackRe);
    const focusOnTrack = focusTrackMatch ? /box-shadow\s*:\s*var\(--focus-ring-shadow\)/.test(focusTrackMatch[1]) : false;
    facts.focusRingsTrack = focusOnTrack;
    if (!focusTrackMatch) violations.push("no `:focus-within .slider-track` rule — keyboard focus must ring the TRACK, not the invisible thumb (W-PRIM-POLISH)");
    else if (!focusOnTrack) violations.push("the `:focus-within .slider-track` rule does not resolve `box-shadow: var(--focus-ring-shadow)` — the track focus ring must ride the canonical focus register");

    // The continuous glass fill: the `.slider-range` carries the W52 material blur
    // (the knob rides ON it — continuous with the track, not an offset disc). Since
    // BG.W-LIQUID-FILL the blur lives in the shared `.glass-liquid-fill` register the
    // range COMPOSES (in the template) + BRIDGES onto (`--liquid-fill-blur`); the
    // fact is satisfied by EITHER the historical inline `backdrop-filter` on
    // `.slider-range` OR the carve: the range composes the register AND the register
    // itself carries the `backdrop-filter`.
    const rangeMatch = css.match(/(^|\})\s*\.slider-range\s*\{([^}]*)\}/);
    const inlineRangeBlur = rangeMatch ? /backdrop-filter\s*:/.test(rangeMatch[2]) : false;
    const composesRegister = /class=["'][^"']*\bslider-range glass-liquid-fill\b/.test(
        sfcSrc,
    );
    const registerHasBlur = /backdrop-filter\s*:\s*var\(\s*--liquid-fill-blur/.test(
        registerCss,
    );
    const rangeBlur = inlineRangeBlur || (composesRegister && registerHasBlur);
    facts.rangeHasBackdropFilter = rangeBlur;
    facts.rangeComposesLiquidFillRegister = composesRegister;
    if (!rangeMatch) violations.push("base `.slider-range { … }` block not found");
    else if (!rangeBlur) violations.push("standard .slider-range carries no glass fill — it must set `backdrop-filter` inline OR compose the shared `.glass-liquid-fill` register (which carries the blur — BG.W-LIQUID-FILL)");

    // (4) SQUIRCLE-SPECTRUM — the spectrum thumb is the track-height squircle:
    //     a `corner-shape: var(--corner-shape-thumb)` decl ONLY inside an
    //     `@supports (corner-shape: superellipse(2))` gate (the Chrome-139 PE
    //     tier) over a `border-radius` round fallback, with `height: 100%`.
    const cornerDecls = (css.match(/corner-shape\s*:/g) || []).length;
    const supportsBlock = css.match(/@supports\s*\(\s*corner-shape\s*:\s*superellipse\(2\)\s*\)\s*\{([\s\S]*?\}\s*)\}/);
    facts.cornerShapeDeclCount = cornerDecls;
    facts.supportsGatePresent = Boolean(supportsBlock);
    if (cornerDecls === 0) {
        violations.push("spectrum .slider-thumb declares no `corner-shape` — the track-height squircle is missing (AX.W59)");
    } else if (!supportsBlock) {
        violations.push("a `corner-shape` decl exists but no `@supports (corner-shape: superellipse(2))` gate wraps it — the squircle must be PE-gated over the round fallback");
    } else {
        // The corner-shape decl(s) must read the token, and live ONLY inside the gate.
        const gatedReadsToken = /corner-shape\s*:\s*var\(--corner-shape-thumb\)/.test(supportsBlock[1]);
        facts.squircleReadsToken = gatedReadsToken;
        if (!gatedReadsToken) violations.push("the @supports squircle gate must read `corner-shape: var(--corner-shape-thumb)` (the token axis, not a bare keyword)");
        // No corner-shape decl may leak OUTSIDE the @supports gate (a leak breaks
        // the round contract on a partial-support engine).
        const outside = css.replace(supportsBlock[0], "");
        if (/corner-shape\s*:/.test(outside)) violations.push("a `corner-shape` decl leaks OUTSIDE the @supports gate — the round fallback is the cross-engine contract");
    }
    // The spectrum thumb spans the FULL track height (not a floating circle).
    const spectrumThumb = css.match(/\[data-variant="spectrum"\]\s*\.slider-thumb\s*\{([^}]*)\}/);
    const spectrumHeight = spectrumThumb ? (spectrumThumb[1].match(/(?:^|[;{])\s*height\s*:\s*([^;]+);/) || [])[1]?.trim() : null;
    facts.spectrumThumbHeight = spectrumHeight ?? null;
    if (!spectrumThumb) violations.push("spectrum `.slider-thumb` block not found");
    else if (spectrumHeight !== "100%") violations.push(`spectrum .slider-thumb height is "${spectrumHeight ?? "(none)"}" — must be 100% (the squircle spans the track height, not a floating circle)`);

    // (5) CONSUMER-BOUNDARY — walk every `@mkbabb/glass-ui` consumer (self
    //     glass-ui src+demo + the constellation siblings) and RED on a LITERAL
    //     `<Slider>` variant binding X ∉ EXPECTED_KEYS that would silently no-op
    //     against the current two-only build. Reuses the shipped constellation
    //     consumer-walk (CONSUMERS/resolveSibling/skipSibling) — no new harness.
    const consumerVariantHits = [];
    let consumerUncheckableBinds = 0;
    const consumersScanned = [];
    const consumersSkipped = [];
    for (const member of CONSUMERS) {
        const { present, self } = resolveSibling(member);
        if (!present) {
            // An absent SELF (glass-ui) is a hard error — but `self` is ROOT,
            // already asserted present by the index/SFC existsSync above, so this
            // path is the graceful sibling skip (registry-default world).
            if (self) {
                violations.push(`consumer self (${member.id}) is absent — glass-ui must be checked out`);
            } else {
                skipSibling("proof:slider-two-only", member);
                consumersSkipped.push({ repo: member.id, reason: "absent" });
            }
            continue;
        }
        // Version-pin scope: a sibling whose INSTALLED glass-ui predates the
        // two-only floor resolves a removed variant against its OWN older keyset
        // — the binding paints there, it is NOT a no-op — so it is OUT OF SCOPE.
        // `self` (glass-ui) IS the build, so it is always in scope. A present
        // sibling with no installed glass-ui (fresh checkout) resolves the
        // registry → the two-only build → in scope (the conservative default).
        if (!self) {
            const installed = installedGlassUiVersion(member.dir);
            if (installed && compareSemver(installed, TWO_ONLY_FLOOR) < 0) {
                skipSibling("proof:slider-two-only", member);
                consumersSkipped.push({ repo: member.id, reason: `installed ${installed} < ${TWO_ONLY_FLOOR} (pre-two-only)` });
                continue;
            }
        }
        let scannedAnyRoot = false;
        for (const root of member.roots) {
            if (!existsSync(root)) continue; // multi-root member: a missing sub-root is the fourier case
            scannedAnyRoot = true;
            for (const file of walkVue(root)) {
                let fileSrc;
                try {
                    fileSrc = readFileSync(file, "utf8");
                } catch {
                    continue;
                }
                const rel = file.startsWith(member.dir) ? file.slice(member.dir.length + 1) : file;
                const { hits, uncheckable } = scanSliderVariants(fileSrc, rel);
                consumerUncheckableBinds += uncheckable;
                for (const h of hits) consumerVariantHits.push({ repo: member.id, file: rel, line: h.line, variant: h.variant });
            }
        }
        if (scannedAnyRoot) consumersScanned.push(member.id);
        else consumersSkipped.push({ repo: member.id, reason: "no source root on disk" });
    }
    facts.consumersScanned = consumersScanned;
    facts.consumersSkipped = consumersSkipped;
    facts.consumerVariantHits = consumerVariantHits;
    facts.consumerUncheckableBinds = consumerUncheckableBinds;
    for (const h of consumerVariantHits) {
        violations.push(`consumer ${h.repo}/${h.file}:${h.line} binds Slider variant="${h.variant}" — ${h.variant} ∉ [${EXPECTED_KEYS.join(",")}]; the removed variant is a silent runtime no-op`);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, gate: "proof:slider-two-only", expectedKeys: EXPECTED_KEYS, facts, violations });

    console.log("proof:slider-two-only — exactly two slider recipes ship + the integrated-continuous design contract");
    console.log(`  variant keys       : ${keys ? keys.join(", ") : "(unparsed)"}`);
    console.log(`  orphan selectors   : ${facts.orphanVariantSelectors.length ? facts.orphanVariantSelectors.join(", ") : "(none)"}`);
    console.log(`  std thumb invisible : width ${facts.thumbWidth ?? "?"} (zero ${facts.thumbWidthIsZero ?? "?"}), opacity ${facts.thumbOpacity ?? "?"} (zero ${facts.thumbOpacityIsZero ?? "?"})`);
    console.log(`  size rungs (thumb≤track): ${facts.sizeRungs ? Object.entries(facts.sizeRungs).map(([k, v]) => `${k} ${v.thumb}≤${v.track}`).join(", ") : "(unparsed)"}`);
    console.log(`  focus rings track   : ${facts.focusRingsTrack}`);
    console.log(`  range glass blur    : ${facts.rangeHasBackdropFilter}`);
    console.log(`  spectrum squircle   : ${facts.supportsGatePresent ? "@supports-gated" : "(missing)"} (height ${facts.spectrumThumbHeight ?? "?"})`);
    console.log(`  consumers scanned   : ${facts.consumersScanned.length ? facts.consumersScanned.join(", ") : "(none)"}`);
    console.log(`  consumers skipped   : ${facts.consumersSkipped.length ? facts.consumersSkipped.map((s) => `${s.repo} (${s.reason})`).join(", ") : "(none)"}`);
    console.log(`  consumer variant hits: ${facts.consumerVariantHits.length} (uncheckable binds: ${facts.consumerUncheckableBinds})`);
    if (violations.length) { console.log("\nVIOLATIONS:"); for (const v of violations) console.log(`  ✗ ${v}`); }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
