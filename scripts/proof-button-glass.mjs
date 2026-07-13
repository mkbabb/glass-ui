#!/usr/bin/env node
// BB.W-BUTTON-GLASS — the lit glass button stays legible, springs under the
// press, and tracks the gleam (proof:button-glass).
//
// The born-RED→GREEN device-free SOURCE arm. The button register minted every
// iOS-27 liquid-glass token but COMPOSED almost none on the LIT surface, and its
// two best mechanisms — the W55 adaptive-darken legibility seam + the moving
// specular — silently no-op'd the moment the pointer landed. This wave reaches the
// solved-legibility seam on the lit button (more glass AND more legible at once),
// wires the squishy interruptible press, consumes the ONE shared specular leaf, and
// opts into the EXISTING refraction axis — all token-first, COMPOSE-don't-author.
//
// §0 RE-GROUND DRIFT (recorded in PROGRESS): the spec named a W-LENSING
// `useSpecularPointer` leaf + a `.glass-lens`/`--press-t` axis + a W-LIQUIDHOVER
// tier-root auto-arm — NONE landed at HEAD. The ONE shared specular-position leaf at
// HEAD is `useSpecularTracking` (AX.W09, Card+DockIconButton consume it); the HEAD
// refraction axis is `.glass-refract` (AW.W23 `#glass-refract` SVG filter). So this
// wave CONSUMES `useSpecularTracking` (the documented "auto-arm-not-landed → call
// the leaf explicitly" branch) + `.glass-refract` (the existing axis), never a fork.
//
// Five falsifiable device-free SOURCE clauses (each born-RED at HEAD pre-wave, GREEN
// at close), plus the BINDING π readback + the proof:ba-gestalt verdict:
//
//   B1 — the hover/active fills paint the ELEMENT-LEVEL oklab tint, NOT the raw
//        token. The glass-variant CVA arms (default/glass/primary-audacious) paint
//        the hover/active fill via the `--glass-bg-*-tinted` pair, and surfaces.css
//        mints that pair as `color-mix(in oklab, <rung>, var(--glass-tint-source)
//        var(--glass-tint-strength))` (the W55 seam — both tint vars present). NO
//        glass arm paints the bare raw `bg-(--glass-bg-resting)`/`-floating` on
//        hover/active. Bite: a tint-FREE oklab swap (no `--glass-tint-source`/
//        `-strength` second arm) REDs.
//   B2 — the press composes useSpringPress driving useLiquidFlex (the volume-
//        preserving X/Y reciprocal squish, capped LOW), with the CSS `.tap-squish
//        active:scale-(--scale-press-btn)` floor retained as the no-JS path. Bite:
//        a useSpringPress-only scale without useLiquidFlex REDs; an uncapped/high
//        squish cap (>1.08) REDs; removing the CSS scale floor REDs.
//   B3 — the gleam consumes the ONE shared specular leaf (useSpecularTracking),
//        NOT a button-local --mouse-x/--mouse-y pointermove fork. Bite: a hand-
//        rolled --mouse-x/--mouse-y write in Button.vue REDs.
//   B4 — the refraction edge is the `.glass-refract` opt-in CONSUMING the existing
//        axis, `@supports`-gated with the un-gated `.btn-glass` blur base preserved.
//        Bite: a button-local feDisplacementMap/displacement filter data-URI in the
//        button bounds REDs (the lens is the ONE axis, never a fork).
//   B5 — the calm-CTA fence HOLDS. ZERO `✦`/`btn-audacious`/sparkle-sweep/ripple/
//        disco-grain on any button variant or the new recipe. SELF-TEST BITE: the
//        gate injects a `✦`/`btn-audacious` revival into a fixture and asserts the
//        clause REDs on it (the fence has teeth).
//
// House style mirrors proof-eyebrow-union.mjs / proof-glass-cal.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation. The π half (the lit-button AA over the synthetic-white plate, the
// press squish + coupled specular frame-series, the gleam-tracks-pointer hover, the
// off-Chromium refraction degrade) is tests-visual/button-glass.spec.ts —
// LOCAL-ONLY (real-GPU/CDP dev-box), backstopped by proof:live-verified-ledger.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip /* *​/ block comments + // line comments so a witness never matches
 *  commented prose. The CSS half has no // comments; the TS/Vue halves do. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

/**
 * Pure detector — given the source strings, return { facts, violations }.
 * The sources are passed in so the self-test can inject a fixture (the B5 bite).
 */
export function detectButtonGlass(sources) {
    const { buttonIndex, buttonVue, surfacesCss, propertyRegsCss, refractCss } =
        sources;
    const facts = {};
    const violations = [];

    const idx = stripComments(buttonIndex);
    const vue = stripComments(buttonVue);
    const surf = stripComments(surfacesCss);
    const regs = stripComments(propertyRegsCss);
    const refract = stripComments(refractCss ?? "");

    // The three glass-variant arms whose hover/active fills must be re-pointed.
    const GLASS_ARMS = ["default", "glass", "primary-audacious"];

    // ── B1 — the hover/active fills paint the ELEMENT-LEVEL oklab tint ──────────
    facts.b1 = {};
    // (1) NO glass arm paints the bare raw `bg-(--glass-bg-resting)` /
    //     `bg-(--glass-bg-floating)` on hover/active (the raw pre-substituted token).
    //     A `-tinted` suffix is the fix; the bare token is the trap. We match the
    //     hover:/active: prefixed raw-token paint, EXCLUDING the `-tinted` form.
    const rawHoverActive =
        /(?:hover|active|aria-pressed):bg-\(--glass-bg-(?:resting|floating)\)/.test(
            idx,
        ) ||
        /(?:hover|active|aria-pressed):bg-\[color-mix\([^\]]*--glass-bg-(?:resting|floating)\)[^\]]*\]/.test(
            idx,
        );
    facts.b1.noRawHoverActive = !rawHoverActive;
    // (2) BD.W-BUTTON-GLASS-CONSUME — the glass-variant arms COMPOSE the shared
    //     `.glass-capsule .glass-capsule-hover` register (the inline near-gray
    //     `hover:bg-*`/`active:bg-*` chains were DELETED, clean break). The hover/active
    //     fill + lift now come from the capsule register: `.glass-capsule`'s fill is the
    //     element-level oklab-tinted FLOATING seam (`--glass-bg-floating-tinted`, warm-
    //     floored, indirected through `--glass-capsule-fill`) and `.glass-capsule-hover`
    //     carries the specular catch-light + scale lift. ONE recipe ≥3 consumers (the
    //     A8 overfit clearance). So B1 asserts the glass arms COMPOSE the capsule register
    //     (not an inline tinted-pair string), and the capsule fill resolves the tinted seam.
    const glassArmStrings = (idx.match(/glass(?:-wash)?[^,'"`]*?glass-capsule[\s\S]*?['"`]/g) || []).join("\n");
    facts.b1.composesCapsule =
        /glass-capsule\b/.test(idx) && /glass-capsule-hover\b/.test(idx);
    // the capsule register's own fill is the warm-floored oklab-tinted floating seam.
    const cap = stripComments(sources.glassCapsuleCss ?? "");
    const capFillBlock = cap.match(/\.glass-capsule\s*\{[\s\S]*?background:\s*([\s\S]*?);/)?.[1] ?? "";
    facts.b1.capsuleFillTinted =
        /var\(\s*--glass-capsule-fill\b/.test(capFillBlock) &&
        /--glass-bg-floating-tinted\b/.test(capFillBlock) &&
        /color-mix\(\s*in\s+oklab/.test(capFillBlock);
    // (3) surfaces.css mints the tinted pair on the W55 oklab seam (BOTH tint vars
    //     present — the anti-evasion: a tint-FREE oklab swap REDs). The glass button
    //     reads `--glass-bg-floating-tinted` through the capsule for the hover/active
    //     register; the QUIET-rung tint is the button's RESTING fill (BD: the button's
    //     resting fill rides `[--glass-capsule-fill:var(--glass-bg-quiet-tinted)]`,
    //     retiring the former `--glass-bg-resting-tinted` wrapper). Both seams must hold.
    const quietTintedBlock =
        surf.match(/--glass-bg-quiet-tinted:\s*color-mix\([\s\S]*?\)\s*;/)?.[0] ??
        "";
    const floatingTintedBlock =
        surf.match(/--glass-bg-floating-tinted:\s*color-mix\([\s\S]*?\)\s*;/)?.[0] ??
        "";
    const seamOk = (block, rung) =>
        /color-mix\(\s*in\s+oklab/.test(block) &&
        new RegExp(`--glass-bg-${rung}\\b`).test(block) &&
        /--glass-tint-source/.test(block) &&
        /--glass-tint-strength/.test(block);
    facts.b1.restingSeam = seamOk(quietTintedBlock, "quiet");
    facts.b1.floatingSeam = seamOk(floatingTintedBlock, "floating");

    if (!facts.b1.noRawHoverActive) {
        violations.push(
            "B1: a glass-variant arm still paints the RAW `bg-(--glass-bg-resting)`/`-floating` on hover/active — re-point onto the element-level oklab-tinted register (the `.glass-capsule` fill / the `--glass-bg-*-tinted` pair)",
        );
    }
    if (!facts.b1.composesCapsule) {
        violations.push(
            "B1: the glass-variant arms must COMPOSE the shared `.glass-capsule .glass-capsule-hover` register (the hover/active tinted fill + specular lift live there, ONE recipe ≥3 consumers — the inline gray hover:bg-*/active:bg-* chains are DELETED)",
        );
    }
    if (!facts.b1.capsuleFillTinted) {
        violations.push(
            "B1: `.glass-capsule`'s fill must read the element-level oklab-tinted FLOATING seam (`var(--glass-capsule-fill, color-mix(in oklab, var(--glass-bg-floating-tinted), …warm-floor…))`) — the W55 adaptive darken seam, never the raw rung",
        );
    }
    if (!(facts.b1.restingSeam && facts.b1.floatingSeam)) {
        violations.push(
            "B1: surfaces.css must mint `--glass-bg-{quiet,floating}-tinted` as `color-mix(in oklab, <rung>, var(--glass-tint-source) var(--glass-tint-strength))` — BOTH tint vars present (a tint-FREE oklab swap REDs: the W55 seam must be the mix's second arm)",
        );
    }

    // ── B2 — the press composes the squishy interruptible spring on the per-spring clock ──
    facts.b2 = {};
    facts.b2.composesSpringPress =
        /useSpringPress\s*\(/.test(vue) &&
        /import\s*\{[^}]*useSpringPress[^}]*\}/.test(vue);
    facts.b2.composesLiquidFlex =
        /useLiquidFlex\s*\(/.test(vue) &&
        /import\s*\{[^}]*useLiquidFlex[^}]*\}/.test(vue);
    // the reciprocal squish: the X/Y pairing reads the stretch reciprocally
    // (scale: `${scaleX} ${scaleY}` with scaleX*stretch / scaleY/stretch) — assert
    // the `stretch` value is consumed (the squish is the deform, not a bare scale).
    facts.b2.squishConsumed = /\.stretch\b/.test(vue);
    // the LOW cap — BD.W-BUTTON-GLASS-CONSUME re-tuned the loud-press amplitude
    // `maxStretch 1.04 (quiet) → 1.09 (punch)`. The squish is volume-preserving, so the
    // peak bbox AREA ≈ maxStretch — the fence is the composed-area ≤ 1.14 anti-taffy bar
    // (the SAME cartoon-punch family fence the tab blob rides), NOT the old per-axis 1.08.
    // Scan EVERY maxStretch literal; the MAX must clear the area fence (an uncapped /
    // taffy-pull >1.14 REDs).
    // capture every numeric literal that follows a `maxStretch:` on the same line
    // (handles `maxStretch: 1.08`, `maxStretch: () => (cond ? 1.09 : 1.04)` — both legs).
    const capMatches = [];
    for (const lineM of vue.matchAll(/maxStretch:\s*([^\n]*)/g)) {
        for (const num of lineM[1].matchAll(/\b(\d\.\d+)\b/g)) capMatches.push(Number(num[1]));
    }
    facts.b2.cap = capMatches.length ? Math.max(...capMatches) : null;
    facts.b2.capLow = facts.b2.cap !== null && facts.b2.cap <= 1.14 && facts.b2.cap > 1.0;
    // the CSS no-JS floor is RETAINED: the CVA base keeps `active:scale-(--scale-press-btn)`.
    facts.b2.cssFloorRetained = /active:scale-\(--scale-press-btn\)/.test(idx);
    // the per-spring drive token is registered (the --glass-btn-press-t typed @property).
    facts.b2.pressDriveRegistered = /@property\s+--glass-btn-press-t/.test(regs);

    if (!(facts.b2.composesSpringPress && facts.b2.composesLiquidFlex)) {
        violations.push(
            "B2: Button.vue must compose BOTH useSpringPress AND useLiquidFlex (the spring drives the volume-preserving squish — a useSpringPress-only scale without the reciprocal squish REDs)",
        );
    }
    if (!facts.b2.squishConsumed) {
        violations.push(
            "B2: Button.vue must consume the useLiquidFlex `.stretch` (the reciprocal X/Y deform is the squish — a bare scale is not the deform)",
        );
    }
    if (!facts.b2.capLow) {
        violations.push(
            `B2: the squish cap (max maxStretch=${facts.b2.cap}) must clear the composed-area anti-taffy fence (1.0 < cap ≤ 1.14, the volume-preserving peak area ≈ maxStretch; the cartoon-punch family fence) — an uncapped/taffy-pull >1.14 REDs`,
        );
    }
    if (!facts.b2.cssFloorRetained) {
        violations.push(
            "B2: the CSS `.tap-squish active:scale-(--scale-press-btn)` floor must be RETAINED in the CVA base (the no-JS / SSR / pre-hydration press)",
        );
    }
    if (!facts.b2.pressDriveRegistered) {
        violations.push(
            "B2: the `--glass-btn-press-t` typed @property must be registered (property-regs.css) — the ONE press drive the squish + the coupled specular + the lens read consume",
        );
    }

    // ── B3 — the gleam consumes the ONE shared position-write source, NOT a fork ──
    // §0 RE-GROUND RECONCILE (BB.W-LIQUIDHOVER LANDED): the §0 comment booked the
    // re-point — at this wave's HEAD the auto-arm had not landed, so the button hand-
    // wired `useSpecularTracking()` + `@pointermove`. W-LIQUIDHOVER then landed the
    // `vSpecular` tier-root AUTO-ARM (the directive WRAPS the SAME `createSpecularWriter`
    // single source), so the button RETIRES the hand-wire onto `v-specular`. The
    // contract is UNCHANGED in spirit — the gleam consumes the ONE shared source, never
    // a button-local `--mouse-x/y` fork — only the DELIVERY moved from the explicit leaf
    // call to the directive. Full teeth: the directive arm must be present AND the
    // no-fork bite stays.
    facts.b3 = {};
    // the shared source is consumed via the `v-specular` tier-root auto-arm (the
    // W-LIQUIDHOVER reconcile — `vSpecular` wraps `createSpecularWriter`, the ONE
    // position-write core; proof:glass-material-unified locks the directive↔core wrap).
    facts.b3.armsDirective =
        /\bv-specular\b/.test(vue) &&
        /import\s*\{[^}]*\bvSpecular\b[^}]*\}/.test(vue);
    // the arm is GATED to the glass-register variants (a `solid`/`link`/`outline`
    // button has no `::before` to gleam — the directive's reactive value opts it out).
    facts.b3.armGated = /v-specular\s*=\s*"specularArmed"/.test(vue);
    // NO button-local --mouse-x / --mouse-y direct write (the DRY single-source — a
    // hand-rolled pointermove handler writing the vars directly REDs; the directive
    // owns the host write now).
    facts.b3.noLocalMouseWrite =
        !/['"`]--mouse-x['"`]\s*:/.test(vue) &&
        !/['"`]--mouse-y['"`]\s*:/.test(vue) &&
        !/setProperty\(\s*['"`]--mouse-[xy]['"`]/.test(vue);
    // the retired hand-wire is GONE — a surviving `useSpecularTracking()` + `@pointermove`
    // triplet on the button is the forked second source (the W-LIQUIDHOVER kill).
    facts.b3.handWireRetired = !(
        /@pointermove/.test(vue) && /useSpecularTracking\s*\(/.test(vue)
    );

    if (!facts.b3.armsDirective) {
        violations.push(
            "B3: Button.vue must arm the SHARED `v-specular` directive (the W-LIQUIDHOVER tier-root auto-arm wrapping the ONE `createSpecularWriter` source) — imported + applied on the host",
        );
    }
    if (!facts.b3.armGated) {
        violations.push(
            'B3: the `v-specular="specularArmed"` arm must be GATED to the glass-register variants (a non-glass button has no `::before` gleam — no wasted listener)',
        );
    }
    if (!facts.b3.noLocalMouseWrite) {
        violations.push(
            "B3: Button.vue must NOT write `--mouse-x`/`--mouse-y` directly (a button-local pointermove fork) — the `v-specular` directive owns the ONE host write",
        );
    }
    if (!facts.b3.handWireRetired) {
        violations.push(
            "B3: Button.vue still hand-wires `@pointermove` + `useSpecularTracking()` — the retired per-consumer triplet; the `v-specular` directive owns the listener now (BB.W-LIQUIDHOVER)",
        );
    }

    // ── B4 — the refraction edge is the `.glass-lens` opt-in CONSUMING the axis ──
    // §0 RE-GROUND RECONCILE (BB.W-LENSING LANDED): the §0 comment booked the rename —
    // W-LENSING renamed the opt-in CLASS `.glass-refract` → `.glass-lens` (clean break,
    // no alias; the filter-id `#glass-refract` + the `--glass-refract` magnitude axis
    // names are KEPT). The button COMPOSES the renamed `.glass-lens` class; the
    // `@supports`-gated filter lives in glass-refract.css; surfaces.css carries the
    // `.btn-glass.glass-lens` press-drive arm. Full teeth: the filter stays `@supports`-
    // gated (verified in its real home), the blur base survives, no button-local fork.
    facts.b4 = {};
    // the button opts in via the EXISTING (renamed) `.glass-lens` class (the `:liquid` prop).
    facts.b4.consumesRefractAxis = /['"`]glass-lens['"`]/.test(vue);
    // the `:liquid` prop is declared (additive default-OFF).
    facts.b4.liquidProp = /\bliquid\?:\s*boolean/.test(vue);
    // surfaces.css carries the button-refraction press-drive arm (the
    // `.btn-glass.glass-lens` recipe binding `--glass-btn-press-t`) AND the refraction
    // filter stays `@supports (backdrop-filter: url(...))`-gated in glass-refract.css.
    facts.b4.pressDriveArm =
        /\.btn-glass\.glass-lens\s*\{[\s\S]*?--glass-btn-press-t/.test(surf);
    facts.b4.filterSupportsGated =
        /@supports\s*\(\s*backdrop-filter:\s*url/.test(refract) &&
        /\.glass-lens\b/.test(refract);
    facts.b4.supportsGated =
        facts.b4.pressDriveArm && facts.b4.filterSupportsGated;
    // the un-gated `.btn-glass` blur base is PRESERVED (the off-Chromium floor — the
    // `.btn-glass { backdrop-filter: var(--glass-blur-btn) }` base rule survives).
    facts.b4.blurBasePreserved =
        /\.btn-glass\s*\{[\s\S]*?backdrop-filter:\s*var\(--glass-blur-btn\)/.test(
            surf,
        );
    // NO button-local displacement-filter fork (a forked feDisplacementMap data-URI
    // in the button bounds REDs — the lens is the ONE axis in glass-refract.css).
    facts.b4.noLocalLensFork =
        !/feDisplacementMap/.test(surf) && !/feDisplacementMap/.test(vue);

    if (!facts.b4.consumesRefractAxis) {
        violations.push(
            "B4: the refraction opt-in must consume the EXISTING `.glass-lens` axis (BB.W-LENSING renamed `.glass-refract`→`.glass-lens`; the `:liquid` prop adds the class) — never a button-local lens",
        );
    }
    if (!facts.b4.liquidProp) {
        violations.push(
            "B4: Button.vue must declare the additive `liquid?: boolean` prop (the refraction-edge opt-in, default OFF)",
        );
    }
    if (!facts.b4.pressDriveArm) {
        violations.push(
            "B4: surfaces.css must carry the `.btn-glass.glass-lens` press-drive arm (binding `--glass-btn-press-t`)",
        );
    }
    if (!facts.b4.filterSupportsGated) {
        violations.push(
            "B4: the refraction filter must stay `@supports (backdrop-filter: url(...))`-gated on `.glass-lens` in glass-refract.css (the off-Chromium engine paints the un-gated blur base alone)",
        );
    }
    if (!facts.b4.blurBasePreserved) {
        violations.push(
            "B4: the un-gated `.btn-glass { backdrop-filter: var(--glass-blur-btn) }` base must be PRESERVED (the off-Chromium degrade floor)",
        );
    }
    if (!facts.b4.noLocalLensFork) {
        violations.push(
            "B4: NO button-local `feDisplacementMap` displacement filter (the lens is the ONE `.glass-lens` axis — a fork REDs)",
        );
    }

    // ════════════════════════════════════════════════════════════════════════════
    // BC.W-BUTTON-GLASS-IOS — the iOS-27 register lift (EXTENDED in place).
    // BG-IOS-1..6 born-RED on the pre-fix tree → GREEN at close, beside the B1-B5
    // BB clauses that stay GREEN.
    // ════════════════════════════════════════════════════════════════════════════
    const { glassTokens = "", buttonGlassSpec = "" } = sources;
    const gtok = stripComments(glassTokens);
    const spec = stripComments(buttonGlassSpec);

    // ── BG-IOS-1 — the button blur is the UNIFIED RESTING PEER (8px content material) ──
    // BG.W-GLASS-BLUR-PEER demoted the glass button OFF the floating-tier "more glass"
    // register onto the 8px content material; BI.W-BLUR-MUTE then dialed the button cohort a
    // HAIR below the 8px peer via its OWN `--glass-blur-btn-radius` primitive (the muted glass
    // CTA — dock·Card·menu-row stay the unified 8px). The button reads REAL glass (the
    // resting/quiet peer OR the muted `btn`-cohort primitive, NOT the sub-perceptual wash 1px
    // tile AND NOT a per-button floating/deep slab — more-glass is the HERO deep tier only).
    // ALIAS-FOLLOWING: a re-pin to the wash tile OR a per-button floating composite REDs.
    facts.bgIos1 = {};
    const btnDecl = gtok.match(/--glass-blur-btn:\s*([^;]+);/)?.[1]?.trim() ?? "";
    const btnAlias = btnDecl.match(/^var\(\s*--(glass-blur-[a-z]+)\s*\)$/);
    const btnTier = btnAlias
        ? btnAlias[1].replace("glass-blur-", "") // alias → tier name
        : (btnDecl.match(/--glass-blur-([a-z]+)-radius/)?.[1] ?? null); // composite → tier
    facts.bgIos1.btnTier = btnTier;
    // the peer is a CALM CONTENT tier (resting | quiet) = the 8px material; wash 1px tile reds,
    // a per-button floating/deep slab reds (more-glass lives on the hero deep tier).
    // BI.W-BLUR-MUTE — the button-cohort `btn` tier (the --glass-blur-btn-radius primitive a
    // hair below the 8px peer, the muted glass CTA) is accepted alongside the resting/quiet peer.
    facts.bgIos1.readsContentPeer =
        btnTier === "resting" || btnTier === "quiet" || btnTier === "btn";
    // it still concentrates light: the resolved source carries a saturate() companion.
    const btnResolved = btnAlias
        ? (gtok.match(new RegExp(`--${btnAlias[1]}:\\s*([^;]+);`))?.[1] ?? "")
        : btnDecl;
    facts.bgIos1.concentratesLight = /saturate\(/.test(btnResolved);
    if (!(facts.bgIos1.readsContentPeer && facts.bgIos1.concentratesLight)) {
        violations.push(
            "BG-IOS-1: `--glass-blur-btn` must resolve real content-tier glass (the resting/quiet 8px peer OR the muted `--glass-blur-btn-radius` btn-cohort primitive a hair below it, alias-following) + a saturate() (it still concentrates light) — NOT the wash 1px tile NOR a per-button floating/deep slab (more-glass is the hero deep tier only)",
        );
    }

    // ── BG-IOS-2 — ONLY the hero primary-audacious composes .glass-deep (default demoted) ──
    // BG.W-GLASS-BLUR-PEER demoted the bare `default` button OFF `.glass-deep` onto the 8px
    // peer; the maximal iOS deep-glass register is the HERO opt-in only. So `primary-audacious`
    // MUST carry `.glass-deep` and `default` MUST NOT.
    facts.bgIos2 = {};
    const heroArmHasDeep = (arm) => {
        const re = new RegExp(
            `['"\`]?${arm.replace(/[-]/g, "\\$&")}['"\`]?\\s*:\\s*\\n?\\s*['"\`]([^'"\`]*)['"\`]`,
        );
        const m = idx.match(re);
        return m ? /\bglass-deep\b/.test(m[1]) : false;
    };
    facts.bgIos2.defaultDeep = heroArmHasDeep("default");
    facts.bgIos2.primaryDeep = heroArmHasDeep("primary-audacious");
    // surfaces.css carries the `.btn-glass.glass-deep` arm re-pointing `--glass-blur-btn`
    // onto the deep family (the token-substitution model — composing the ONE deep axis).
    facts.bgIos2.btnDeepArm =
        /\.btn-glass\.glass-deep\s*\{[\s\S]*?--glass-blur-btn:\s*var\(--glass-blur-deep\)/.test(
            surf,
        );
    if (!facts.bgIos2.primaryDeep) {
        violations.push(
            "BG-IOS-2: the hero CTA `primary-audacious` must compose `.glass-deep` (the maximal iOS deep-glass register) — a flat-quiet hero REDs",
        );
    }
    if (facts.bgIos2.defaultDeep) {
        violations.push(
            "BG-IOS-2: the bare `default` button must NOT compose `.glass-deep` — BG.W-GLASS-BLUR-PEER demoted it onto the unified 8px peer; the deep register is the hero opt-in only (`primary-audacious`/`<Button :liquid>`/an explicit `.glass-deep`)",
        );
    }
    if (!facts.bgIos2.btnDeepArm) {
        violations.push(
            "BG-IOS-2: surfaces.css must carry the `.btn-glass.glass-deep { --glass-blur-btn: var(--glass-blur-deep) }` arm (the hero deep opt-in re-points the button blur onto the ONE deep axis via the token-substitution model — the calm `--glass-blur-btn` alias keeps this re-point working)",
        );
    }

    // ── BG-IOS-3 — the press reads the iOS interactive spring from the ONE source ──
    facts.bgIos3 = {};
    // Button.vue must NOT carry a button-local magic-number spring — no `response:`/
    // `dampingFraction:` LITERAL in the `useSpringPress(...)` call (the spring physics
    // live at the ONE SPRING_PRESETS table BC.W-SPRING-EASE owns + `useSpringPress`'s
    // defaults read; a per-call literal is the button-local fork the fence forbids).
    const springPressCall =
        vue.match(/useSpringPress\s*\(([\s\S]*?)\)/)?.[1] ?? "";
    facts.bgIos3.noLocalMagicSpring =
        !/response\s*:/.test(springPressCall) &&
        !/dampingFraction\s*:/.test(springPressCall);
    if (!facts.bgIos3.noLocalMagicSpring) {
        violations.push(
            "BG-IOS-3: Button.vue must NOT pass a button-local magic-number spring to `useSpringPress` (no `response:`/`dampingFraction:` literal) — the iOS interactive press (0.15/0.86) lives at the ONE SPRING_PRESETS source (BC.W-SPRING-EASE) that `useSpringPress`'s defaults read; Button consumes the default, never a per-call literal (the W-GLASS-CAL spring fence)",
        );
    }

    // ── BG-IOS-4 — the press drive couples a brightness/specular leg (P3) ──
    facts.bgIos4 = {};
    // surfaces.css drives `--specular-intensity` off the `--glass-btn-press-t` 0..1 drive
    // (the ONE drive feeds BOTH the squish AND the gleam illumination — a press that moves
    // scale-only REDs).
    facts.bgIos4.specCoupledToPressDrive =
        /--specular-intensity:\s*calc\([\s\S]*?var\(--glass-btn-press-t\)[\s\S]*?\)/.test(
            surf,
        );
    if (!facts.bgIos4.specCoupledToPressDrive) {
        violations.push(
            "BG-IOS-4: the `--glass-btn-press-t` press drive must COUPLE a specular/brightness leg in surfaces.css (`--specular-intensity` LERPed off `--glass-btn-press-t` — the touch-illumination, one drive two legs) — a press that moves scale-ONLY REDs (P3)",
        );
    }

    // ── BG-IOS-5 — the §C interaction diagnosis is DISCHARGED ──
    facts.bgIos5 = {};
    // The π spec carries a LIVE click/keyboard-fires assert on the variant buttons (the
    // binding-verification e2e — the MEMORY glass_ui_binding_verification chronic). Either
    // the diagnosis found interaction-dead (and the e2e is OWED) or it found the buttons
    // fire (and the lane records the "clicks fire" verdict) — both satisfy by the lane's
    // presence. A /display/buttons whose click is dead with NO covering e2e REDs; we
    // satisfy BG-IOS-5 by REQUIRING the click-fires lane exist in the π spec (so the §C
    // interaction is OWNED in substance, never punted to a phantom).
    facts.bgIos5.clickFiresLane =
        /(@click|click handler|fires|\.click\(\))/i.test(spec) &&
        /(BG-IOS-5|interaction|click[- ]fires|don'?t work)/i.test(spec);
    if (!facts.bgIos5.clickFiresLane) {
        violations.push(
            "BG-IOS-5: tests-visual/button-glass.spec.ts must carry the §C interaction lane — a LIVE click + keyboard Enter/Space fires-`@click` assert on the variant buttons (the binding-verification e2e the MEMORY glass_ui_binding_verification chronic demands; the §C \"buttons don't work\" defect is OWNED in substance, not punted)",
        );
    }

    // ── BG-IOS-6 — outline/secondary/accent carry NO shadcn-neutral token (de-shadcn reskin) ──
    facts.bgIos6 = {};
    const reskinArm = (arm) => {
        const re = new RegExp(
            `['"\`]?${arm}['"\`]?\\s*:\\s*\\n?\\s*['"\`]([^'"\`]*)['"\`]`,
        );
        return idx.match(re)?.[1] ?? "";
    };
    const SHADCN_NEUTRAL =
        /(?<![\w:-])bg-background(?![\w-])|(?<![\w-])border-input(?![\w-])|(?<![\w:-])bg-secondary(?![\w/-])|(?<![\w:-])bg-accent(?![\w/-])/;
    const outlineArm = reskinArm("outline");
    const secondaryArm = reskinArm("secondary");
    const accentArm = reskinArm("accent");
    // each reskinned arm composes the glass register (`glass-wash`/`btn-glass` + a
    // `--glass-bg-*`/`--glass-border-*` token) AND carries NO leading shadcn-neutral fill.
    const reskinned = (arm) =>
        /\bbtn-glass\b/.test(arm) &&
        /--glass-bg-/.test(arm) &&
        !SHADCN_NEUTRAL.test(arm);
    facts.bgIos6.outlineReskinned = reskinned(outlineArm);
    facts.bgIos6.secondaryReskinned = reskinned(secondaryArm);
    facts.bgIos6.accentReskinned = reskinned(accentArm);
    if (
        !(
            facts.bgIos6.outlineReskinned &&
            facts.bgIos6.secondaryReskinned &&
            facts.bgIos6.accentReskinned
        )
    ) {
        violations.push(
            "BG-IOS-6: the `outline`/`secondary`/`accent` variants must compose the glass register (`glass-wash btn-glass` + `--glass-bg-*` tier + warm rim) with NO shadcn-neutral token (`border-input`/`bg-background`/`bg-secondary`/`bg-accent`-as-fill) — the de-shadcn A6 reskin (the button half of proof:no-shadcn-default's D1 residual). A re-added `border-input bg-background` outline REDs",
        );
    }

    // ── B5 — the calm-CTA fence HOLDS (no disco revival) ────────────────────────
    facts.b5 = {};
    const discoNeedles = [
        { name: "sparkle-glyph", re: /✦/ },
        { name: "btn-audacious", re: /btn-audacious/ },
        { name: "sparkle-sweep", re: /sparkle-sweep/ },
        { name: "btn-gold-bg-sweep", re: /btn-gold-bg-sweep/ },
        { name: "ripple-radius", re: /--ripple-radius/ },
        { name: "disco-grain", re: /glass-grain-opacity-disco|disco-grain/ },
    ];
    const discoHits = [];
    for (const src of [idx, vue, surf, regs]) {
        for (const n of discoNeedles) {
            if (n.re.test(src)) discoHits.push(n.name);
        }
    }
    facts.b5.discoHits = [...new Set(discoHits)];
    facts.b5.fenceHolds = facts.b5.discoHits.length === 0;
    if (!facts.b5.fenceHolds) {
        violations.push(
            `B5: the calm-CTA fence is BROKEN — a disco recipe revived on a button (${facts.b5.discoHits.join(
                ", ",
            )}). The disco is RETIRED (BA.W-GLASS-CAL H2a) — the glassmorphism rises via the tint/depth/gleam/refraction, NEVER a disco revival`,
        );
    }

    return { facts, violations };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_BUTTON_GLASS_ARTIFACT",
        "BB-button-glass",
    );
    const sources = {
        buttonIndex: safeRead(
            resolve(ROOT, "src/components/ui/button/index.ts"),
        ),
        buttonVue: safeRead(resolve(ROOT, "src/components/ui/button/Button.vue")),
        surfacesCss: safeRead(resolve(ROOT, "src/styles/glass/surfaces.css")),
        // BI.W-STYLE-REDRAIN — --glass-btn-press-t's @property registration was carved
        // into tokens/property-regs-specular.css; read both so B2 FOLLOWS the carve.
        propertyRegsCss:
            safeRead(resolve(ROOT, "src/styles/tokens/property-regs.css")) +
            "\n" +
            safeRead(resolve(ROOT, "src/styles/tokens/property-regs-specular.css")),
        // BB.W-LENSING — the `@supports`-gated `#glass-refract` filter on the
        // renamed `.glass-lens` class lives here (B4 verifies the gate in its home).
        refractCss: safeRead(resolve(ROOT, "src/styles/glass-refract.css")),
        // BC.W-BUTTON-GLASS-IOS — the iOS-tier blur lives in the glass tokens
        // (BG-IOS-1); the §C interaction lane lives in the π spec (BG-IOS-5).
        glassTokens: safeRead(resolve(ROOT, "src/styles/tokens/glass.css")),
        // BD.W-BUTTON-GLASS-CONSUME — the glass button composes the shared
        // `.glass-capsule` register; B1 reads the capsule fill (the warm-floored oklab-
        // tinted floating seam) off its home.
        glassCapsuleCss: safeRead(resolve(ROOT, "src/styles/glass/glass-capsule.css")),
        buttonGlassSpec: safeRead(
            resolve(ROOT, "tests-visual/button-glass.spec.ts"),
        ),
    };

    const { facts, violations } = detectButtonGlass(sources);

    // ── The B5 SELF-TEST BITE — inject a disco revival into a fixture and assert
    //    the B5 clause REDs on it (the fence has teeth). A FAIL here is a gate-
    //    integrity violation, NOT a source violation.
    const biteSources = {
        ...sources,
        buttonIndex:
            sources.buttonIndex +
            "\n/* synthetic */ const x = 'btn-audacious'; const y = '✦';\n",
    };
    const bite = detectButtonGlass(biteSources);
    const biteRed = bite.violations.some((v) => v.startsWith("B5:"));
    if (!biteRed) {
        violations.push(
            "SELF-TEST: the B5 disco self-test bite did NOT red on an injected `btn-audacious`/`✦` revival — the fence has no teeth (gate integrity failure)",
        );
    }

    // ── BC.W-BUTTON-GLASS-IOS SELF-TEST BITES — each forbidden form must RED ──
    // BG-IOS-1 (BG.W-GLASS-BLUR-PEER): a synthetic WASH-1px re-pin of `--glass-blur-btn`
    // REDs (the sub-perceptual tile is not the content-tier peer).
    const ios1Bite = detectButtonGlass({
        ...sources,
        glassTokens: sources.glassTokens.replace(
            /--glass-blur-btn:\s*[^;]+;/,
            "--glass-blur-btn: var(--glass-blur-wash);",
        ),
    });
    const ios1BiteRed = ios1Bite.violations.some((v) => v.startsWith("BG-IOS-1:"));

    // BG-IOS-1b: a synthetic per-button FLOATING (13px) slab re-pin REDs (the un-collapsed BC
    // state — more-glass is the hero deep tier only, the calm button stays the 8px peer).
    const ios1bBite = detectButtonGlass({
        ...sources,
        glassTokens: sources.glassTokens.replace(
            /--glass-blur-btn:\s*[^;]+;/,
            "--glass-blur-btn: blur(calc(var(--glass-blur-floating-radius) * var(--glass-level))) saturate(var(--glass-saturate-floating)) brightness(1.02);",
        ),
    });
    const ios1bBiteRed = ios1bBite.violations.some((v) => v.startsWith("BG-IOS-1:"));

    // BG-IOS-2: a synthetic `default` arm carrying `glass-deep` REDs (the demoted default must
    // NOT reach the hero deep register).
    const ios2Bite = detectButtonGlass({
        ...sources,
        buttonIndex: sources.buttonIndex.replace(
            /default:\s*\n?\s*['"`][^'"`]*['"`]/,
            "default:\n          'glass-wash btn-glass glass-deep glass-capsule glass-capsule-hover text-foreground'",
        ),
    });
    const ios2BiteRed = ios2Bite.violations.some((v) => v.startsWith("BG-IOS-2:"));

    // BG-IOS-4: a synthetic scale-only press (strip the press-drive specular coupling) REDs.
    const ios4Bite = detectButtonGlass({
        ...sources,
        surfacesCss: sources.surfacesCss.replace(
            /--specular-intensity:\s*calc\([\s\S]*?var\(--glass-btn-press-t\)[\s\S]*?\);/,
            "/* stripped */",
        ),
    });
    const ios4BiteRed = ios4Bite.violations.some((v) => v.startsWith("BG-IOS-4:"));

    // BG-IOS-5: a synthetic π spec with no interaction lane REDs.
    const ios5Bite = detectButtonGlass({
        ...sources,
        buttonGlassSpec: "// no interaction lane here",
    });
    const ios5BiteRed = ios5Bite.violations.some((v) => v.startsWith("BG-IOS-5:"));

    // BG-IOS-6: a synthetic shadcn-neutral `outline` re-paste REDs.
    const ios6Bite = detectButtonGlass({
        ...sources,
        buttonIndex: sources.buttonIndex.replace(
            /outline:\s*\n?\s*['"`][^'"`]*['"`]/,
            "outline:\n          'border border-input bg-background hover:bg-accent'",
        ),
    });
    const ios6BiteRed = ios6Bite.violations.some((v) => v.startsWith("BG-IOS-6:"));

    const iosBiteChecks = [
        ["BG-IOS-1 wash-1px tile re-pin", ios1BiteRed],
        ["BG-IOS-1b floating-13px slab re-pin", ios1bBiteRed],
        ["BG-IOS-2 default-composes-deep", ios2BiteRed],
        ["BG-IOS-4 scale-only press", ios4BiteRed],
        ["BG-IOS-5 no-interaction-lane", ios5BiteRed],
        ["BG-IOS-6 shadcn-neutral outline re-paste", ios6BiteRed],
    ];
    for (const [name, red] of iosBiteChecks) {
        if (!red) {
            violations.push(
                `SELF-TEST: the ${name} bite did NOT red — the clause has no teeth (gate integrity failure)`,
            );
        }
    }

    facts.selfTest = {
        b5BiteRed: biteRed,
        ios1BiteRed,
        ios4BiteRed,
        ios5BiteRed,
        ios6BiteRed,
    };

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:button-glass",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:button-glass — the lit glass button: legible + squishy + tracking (BB.W-BUTTON-GLASS)",
    );
    console.log(
        `  B1 hover/active fills oklab-tinted: ${yn(
            facts.b1.noRawHoverActive &&
                facts.b1.composesCapsule &&
                facts.b1.capsuleFillTinted &&
                facts.b1.restingSeam &&
                facts.b1.floatingSeam,
        )}`,
    );
    console.log(
        `  B2 squishy press (spring→liquid)  : ${yn(
            facts.b2.composesSpringPress &&
                facts.b2.composesLiquidFlex &&
                facts.b2.squishConsumed &&
                facts.b2.capLow &&
                facts.b2.cssFloorRetained &&
                facts.b2.pressDriveRegistered,
        )}  (cap=${facts.b2.cap})`,
    );
    console.log(
        `  B3 gleam via v-specular auto-arm  : ${yn(
            facts.b3.armsDirective &&
                facts.b3.armGated &&
                facts.b3.noLocalMouseWrite &&
                facts.b3.handWireRetired,
        )}`,
    );
    console.log(
        `  B4 refraction opt-in (.glass-lens): ${yn(
            facts.b4.consumesRefractAxis &&
                facts.b4.liquidProp &&
                facts.b4.supportsGated &&
                facts.b4.blurBasePreserved &&
                facts.b4.noLocalLensFork,
        )}`,
    );
    console.log(
        `  B5 calm-CTA fence holds           : ${yn(facts.b5.fenceHolds)}  (disco: ${
            facts.b5.discoHits.length
        })`,
    );
    console.log("  ── BC.W-BUTTON-GLASS-IOS (iOS-27 register lift) ──");
    console.log(
        `  BG-IOS-1 btn blur = 8px resting peer: ${yn(
            facts.bgIos1.readsContentPeer && facts.bgIos1.concentratesLight,
        )} (tier=${facts.bgIos1.btnTier})`,
    );
    console.log(
        `  BG-IOS-2 deep = HERO only (default off): ${yn(
            facts.bgIos2.primaryDeep &&
                !facts.bgIos2.defaultDeep &&
                facts.bgIos2.btnDeepArm,
        )}`,
    );
    console.log(
        `  BG-IOS-3 press = ONE-source spring: ${yn(facts.bgIos3.noLocalMagicSpring)}`,
    );
    console.log(
        `  BG-IOS-4 press drive couples gleam: ${yn(facts.bgIos4.specCoupledToPressDrive)}`,
    );
    console.log(
        `  BG-IOS-5 §C interaction discharged: ${yn(facts.bgIos5.clickFiresLane)}`,
    );
    console.log(
        `  BG-IOS-6 outline/secondary/accent glass: ${yn(
            facts.bgIos6.outlineReskinned &&
                facts.bgIos6.secondaryReskinned &&
                facts.bgIos6.accentReskinned,
        )}`,
    );
    console.log(
        `  self-test bites red               : ${yn(
            facts.selfTest.b5BiteRed &&
                facts.selfTest.ios1BiteRed &&
                facts.selfTest.ios4BiteRed &&
                facts.selfTest.ios5BiteRed &&
                facts.selfTest.ios6BiteRed,
        )}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
