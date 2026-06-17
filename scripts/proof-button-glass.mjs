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
    const { buttonIndex, buttonVue, surfacesCss, propertyRegsCss } = sources;
    const facts = {};
    const violations = [];

    const idx = stripComments(buttonIndex);
    const vue = stripComments(buttonVue);
    const surf = stripComments(surfacesCss);
    const regs = stripComments(propertyRegsCss);

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
    // (2) the tinted pair is referenced on the glass arms.
    facts.b1.tintedReferenced =
        /(?:hover|active|aria-pressed):bg-\(--glass-bg-resting-tinted\)/.test(idx) &&
        /active:bg-\(--glass-bg-floating-tinted\)/.test(idx);
    // (3) surfaces.css mints the tinted pair on the W55 oklab seam (BOTH tint vars
    //     present — the anti-evasion: a tint-FREE oklab swap REDs).
    const restingTintedBlock =
        surf.match(/--glass-bg-resting-tinted:\s*color-mix\([\s\S]*?\)\s*;/)?.[0] ??
        "";
    const floatingTintedBlock =
        surf.match(/--glass-bg-floating-tinted:\s*color-mix\([\s\S]*?\)\s*;/)?.[0] ??
        "";
    const seamOk = (block, rung) =>
        /color-mix\(\s*in\s+oklab/.test(block) &&
        new RegExp(`--glass-bg-${rung}\\b`).test(block) &&
        /--glass-tint-source/.test(block) &&
        /--glass-tint-strength/.test(block);
    facts.b1.restingSeam = seamOk(restingTintedBlock, "resting");
    facts.b1.floatingSeam = seamOk(floatingTintedBlock, "floating");

    if (!facts.b1.noRawHoverActive) {
        violations.push(
            "B1: a glass-variant arm still paints the RAW `bg-(--glass-bg-resting)`/`-floating` on hover/active — re-point onto the element-level oklab-tinted `--glass-bg-*-tinted` pair",
        );
    }
    if (!facts.b1.tintedReferenced) {
        violations.push(
            "B1: the glass-variant arms must paint the hover/active fill via the tinted pair (`--glass-bg-resting-tinted` on hover, `--glass-bg-floating-tinted` on active)",
        );
    }
    if (!(facts.b1.restingSeam && facts.b1.floatingSeam)) {
        violations.push(
            "B1: surfaces.css must mint `--glass-bg-{resting,floating}-tinted` as `color-mix(in oklab, <rung>, var(--glass-tint-source) var(--glass-tint-strength))` — BOTH tint vars present (a tint-FREE oklab swap REDs: the W55 seam must be the mix's second arm)",
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
    // the LOW cap — `maxStretch` ≤ 1.08 (the iOS-segmented register; an uncapped /
    // high-cap taffy-pull REDs). Extract the numeric literal.
    const capMatch = vue.match(/maxStretch:\s*([\d.]+)/);
    facts.b2.cap = capMatch ? Number(capMatch[1]) : null;
    facts.b2.capLow = facts.b2.cap !== null && facts.b2.cap <= 1.08;
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
            `B2: the squish cap (maxStretch=${facts.b2.cap}) must be LOW (≤1.08, the iOS-segmented register) — an uncapped/high-cap taffy-pull REDs`,
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

    // ── B3 — the gleam consumes the ONE shared specular leaf, NOT a fork ────────
    facts.b3 = {};
    // the shared leaf is consumed (useSpecularTracking — the AX.W09 ONE position-write
    // seam; the §0-drift re-located leaf since useSpecularPointer/the auto-arm did not land).
    facts.b3.consumesLeaf =
        /useSpecularTracking\s*\(/.test(vue) &&
        /import\s*\{[^}]*useSpecularTracking[^}]*\}/.test(vue);
    // the pointermove is bound (the leaf's handler reaches the host).
    facts.b3.pointerMoveBound = /@pointermove\s*=\s*"onPointerMove"/.test(vue);
    // NO button-local --mouse-x / --mouse-y direct write (the DRY single-source — a
    // hand-rolled pointermove handler writing the vars directly REDs).
    facts.b3.noLocalMouseWrite =
        !/['"`]--mouse-x['"`]\s*:/.test(vue) &&
        !/['"`]--mouse-y['"`]\s*:/.test(vue) &&
        !/setProperty\(\s*['"`]--mouse-[xy]['"`]/.test(vue);

    if (!facts.b3.consumesLeaf) {
        violations.push(
            "B3: Button.vue must consume the SHARED `useSpecularTracking` leaf (the ONE position-write seam) — imported + called",
        );
    }
    if (!facts.b3.pointerMoveBound) {
        violations.push(
            "B3: Button.vue must bind the leaf's `@pointermove=\"onPointerMove\"` so the gleam tracks the pointer",
        );
    }
    if (!facts.b3.noLocalMouseWrite) {
        violations.push(
            "B3: Button.vue must NOT write `--mouse-x`/`--mouse-y` directly (a button-local pointermove fork) — the leaf is the ONE source",
        );
    }

    // ── B4 — the refraction edge is the `.glass-refract` opt-in CONSUMING the axis ──
    facts.b4 = {};
    // the button opts in via the EXISTING `.glass-refract` class (the `:liquid` prop).
    facts.b4.consumesRefractAxis = /['"`]glass-refract['"`]/.test(vue);
    // the `:liquid` prop is declared (additive default-OFF).
    facts.b4.liquidProp = /\bliquid\?:\s*boolean/.test(vue);
    // surfaces.css gates the button-refraction arm on @supports + binds the press
    // drive (the `.btn-glass.glass-refract` recipe reading `--glass-btn-press-t`).
    facts.b4.supportsGated = /@supports\s*\(\s*backdrop-filter:\s*url/.test(surf) ||
        /\.btn-glass\.glass-refract\s*\{[\s\S]*?--glass-btn-press-t/.test(surf);
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
            "B4: the refraction opt-in must consume the EXISTING `.glass-refract` axis (the `:liquid` prop adds the class) — never a button-local lens",
        );
    }
    if (!facts.b4.liquidProp) {
        violations.push(
            "B4: Button.vue must declare the additive `liquid?: boolean` prop (the refraction-edge opt-in, default OFF)",
        );
    }
    if (!facts.b4.supportsGated) {
        violations.push(
            "B4: surfaces.css must carry the `.btn-glass.glass-refract` press-drive arm (binding `--glass-btn-press-t`), and the refraction filter stays `@supports (backdrop-filter: url(...))`-gated in glass-refract.css",
        );
    }
    if (!facts.b4.blurBasePreserved) {
        violations.push(
            "B4: the un-gated `.btn-glass { backdrop-filter: var(--glass-blur-btn) }` base must be PRESERVED (the off-Chromium degrade floor)",
        );
    }
    if (!facts.b4.noLocalLensFork) {
        violations.push(
            "B4: NO button-local `feDisplacementMap` displacement filter (the lens is the ONE `.glass-refract` axis — a fork REDs)",
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
        propertyRegsCss: safeRead(
            resolve(ROOT, "src/styles/tokens/property-regs.css"),
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
    facts.selfTest = { b5BiteRed: biteRed };

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
                facts.b1.tintedReferenced &&
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
        `  B3 gleam consumes the ONE leaf    : ${yn(
            facts.b3.consumesLeaf &&
                facts.b3.pointerMoveBound &&
                facts.b3.noLocalMouseWrite,
        )}`,
    );
    console.log(
        `  B4 refraction opt-in (.glass-refract): ${yn(
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
    console.log(`  self-test B5 bite reds            : ${yn(facts.selfTest.b5BiteRed)}`);

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
