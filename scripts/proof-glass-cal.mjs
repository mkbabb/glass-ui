#!/usr/bin/env node
// BA.W-GLASS-CAL — the blur dial-back + the disco retirement (proof:glass-cal).
//
// The comment-strip + pure-detector house pattern (mirroring proof-dock-unify.mjs
// / proof-goo-redress.mjs). Each witness is RED at HEAD pre-wave; the π gestalt
// readback (tests-visual + the W-GLASS-CAL-DELTA) is the BINDING visual truth —
// per-mechanism greens alone do NOT close this visual wave (BA inv-4).
//
// TWO ARMS:
//
//   BLUR — the six `--glass-blur-*-radius` primitives dialed back ~15-20% UNIFORMLY
//   (the user's "a hair too much" over-diffusion) + the @2dppx overlay restore
//   pulled, while the `--glass-level` opacity axis + the per-rung saturate()/
//   brightness() companions stay UNTOUCHED (the radius axis ONLY — the anti-overreach
//   wrong-axis assert). The dark-recipe saturate/brightness companions
//   (W-DARK-MATERIAL, dark-arm.css) preserved.
//
//   DISCO — the `btn-audacious`/`btn-audacious-gold` recipe family + the
//   `sparkle-sweep`/`btn-gold-bg-sweep` keyframes + the `--duration-sparkle`/
//   `--glass-grain-opacity-disco` knobs are GONE; no `btn-audacious` class survives
//   on any consumer; the dock-tab PRIMARY phase-grain collapsed onto the calm glass
//   register; toggle-chip reads the §6 tokens (no `duration-150`/raw `ease-out`). The
//   FENCED-OUT good pops (`.gold-shimmer`, the specular registers) STAY.
//
//   SPRING CLOCK (Unit 3) — the per-spring `--spring-<name>-duration` vocabulary is
//   minted from the (response, ζ) PRESETS table (generated, never hand) AND no
//   `--spring-*` easing rides a generic `--duration-*` clock in the swept src/styles
//   files (the anti-recurrence floor).
//
// bite-check: revert any radius to its pre-wave value → B1 reddens; re-introduce
// `@utility btn-audacious` → D1 reddens; restore the dock phase-grain → D3 reddens;
// drop a `--spring-*-duration` token → S1 reddens.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execSync } from "node:child_process";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

// Strip BOTH block (`/* */`) and line (`//`) comments — for .vue/.ts/.css sources
// where a retirement-NOTE comment legitimately names a retired token in prose. A
// line `//` is only stripped when it is not inside a string (conservative — we run
// it over already-quote-aware class scans, so a `//` in a URL is a non-issue here).
function stripAllComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:'"`])\/\/[^\n]*/g, "$1");
}

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// The six radius primitives + their pre-wave (HEAD) values + the AV.W7-F2 band.
const PRE_WAVE_RADII = {
    "glass-blur-wash-radius": 1,
    "glass-blur-quiet-radius": 10,
    "glass-blur-resting-radius": 12,
    "glass-blur-floating-radius": 16,
    "glass-blur-overlay-radius": 15,
    "glass-blur-dock-radius": 11,
};
const BAND_LO = 8;
const BAND_HI = 15;
const PRE_WAVE_2DPPX = 24; // the high-resolution overlay restore at HEAD

const SPRING_NAMES = ["smooth", "snappy", "bouncy", "gentle", "dock"];

// The src/styles files Unit 3 OWNS/swept (the anti-recurrence scope). The fenced
// sites (segmented-tabs → W-TABS indicator clock; configurator → W-CONFIG-CHASSIS;
// the DarkModeToggle deliberately-authored literals) are NOT in this scope.
const SWEPT_FILES = [
    "src/styles/transitions.css",
    "src/styles/animations.css",
    "src/styles/view-transition.css",
    "src/styles/glass/surfaces.css",
    "src/styles/utilities/btn.css",
    "src/styles/typography/utilities.css",
    "src/styles/dock.css",
    "src/styles/tokens/scale-paper.css",
];

function readFile(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

function parseRadius(src, name) {
    const m = src.match(new RegExp(`--${name}:\\s*([\\d.]+)px`));
    return m ? Number(m[1]) : null;
}

// ── BG.W-GLASS-BLUR-PEER — the 8px resolved-radius PEER LOCK ────────────────────
// dock · button · default-Card · menu-row all resolve the SAME blur(8px) RADIUS LEG
// (the ONE unified glass material). The per-tier brightness/saturate companions are
// EXCLUDED from the lock — only the radius leg is peer-locked (the saturate-revert is a
// later WS1-gated paint). The resolver is ALIAS-FOLLOWING: `--glass-blur-btn` is a thin
// alias of `--glass-blur-resting`, so the gate follows the chain to the 8px primitive.
// Born-RED on HEAD (button → floating 13px, dock → dock 9px); GREEN after the collapse
// (button + dock → the resting/quiet 8px peer). The HERO deep register is EXCLUDED — it
// is reached only via `.btn-glass.glass-deep` (a per-instance opt-in), never the peer.
const PEER_RADIUS = 8;

// Follow a --glass-blur-<tier> token through an alias chain to its radius primitive (px).
// An alias is `--glass-blur-btn: var(--glass-blur-resting);`; a composed rung is
// `--glass-blur-resting: blur(calc(var(--glass-blur-resting-radius) * …)) …`.
function resolveBlurRadiusPx(glassTokens, blurTokenName, depth = 0) {
    if (depth > 4) return null; // alias-cycle guard
    const m = glassTokens.match(new RegExp(`--${blurTokenName}:\\s*([^;]+);`));
    if (!m) return null;
    const value = m[1].trim();
    const alias = value.match(/^var\(\s*--(glass-blur-[a-z]+)\s*\)$/);
    if (alias) return resolveBlurRadiusPx(glassTokens, alias[1], depth + 1);
    const radTok = value.match(/--glass-blur-([a-z]+)-radius/);
    if (!radTok) return null;
    return parseRadius(glassTokens, `glass-blur-${radTok[1]}-radius`);
}

export function detectPeerLock({ glassTokens, surfaces, shell, menu } = {}) {
    const violations = [];
    const facts = { peers: {} };
    glassTokens ??= stripCss(readFile("src/styles/tokens/glass.css"));
    surfaces ??= stripCss(readFile("src/styles/glass/surfaces.css"));
    shell ??= stripCss(readFile("src/styles/dock/shell.css"));
    menu ??= stripCss(readFile("src/styles/menu.css"));

    // 1. default-Card — `.glass-card` backdrop-filter reads `--glass-blur-quiet`.
    const cardTok = surfaces.match(/\.glass-card\s*\{[\s\S]*?backdrop-filter:\s*var\(\s*--(glass-blur-[a-z]+)\s*\)/);
    facts.peers.card = cardTok ? resolveBlurRadiusPx(glassTokens, cardTok[1]) : null;

    // 2. button — `.btn-glass` backdrop-filter reads `--glass-blur-btn` (alias → resting).
    const btnTok = surfaces.match(/\.btn-glass\s*\{[\s\S]*?backdrop-filter:\s*var\(\s*--(glass-blur-[a-z]+)\s*\)/);
    facts.peers.button = btnTok ? resolveBlurRadiusPx(glassTokens, btnTok[1]) : null;

    // 3. dock — `--dock-surface-blur` reads `--glass-blur-resting`.
    const dockTok = shell.match(/--dock-surface-blur:\s*var\(\s*--(glass-blur-[a-z]+)\b/);
    facts.peers.dock = dockTok ? resolveBlurRadiusPx(glassTokens, dockTok[1]) : null;

    // 4. menu-row — `.glass-menu-row` binds the QUIET tier via `--menu-row-bg`
    //    (`color-mix(… var(--glass-bg-quiet) …)`); the row has no own backdrop-filter,
    //    so its material is the quiet tier whose blur radius is the 8px peer.
    const menuBindsQuiet = /--menu-row-bg:\s*color-mix\([^;]*var\(--glass-bg-quiet\)/.test(menu);
    facts.peers.menuRow = menuBindsQuiet ? parseRadius(glassTokens, "glass-blur-quiet-radius") : null;

    for (const [name, px] of Object.entries(facts.peers)) {
        if (px !== PEER_RADIUS) {
            violations.push(
                `PEER: ${name} resolves blur(${px ?? "?"}px) — must resolve the unified blur(${PEER_RADIUS}px) RADIUS LEG (the dock·button·default-Card·menu-row ONE-material peer; alias-following)`,
            );
        }
    }
    return { facts, violations };
}

// The peer-lock self-test bite — proves the detector FLAGS a synthetic pre-wave regression
// (button on the floating 13px tier, dock on the dock 9px tier) AND PASSES the unified
// 8px peer. Folded into the gate's own violations (the proof-glass-legibility pattern).
export function selfTestPeerLock() {
    const fails = [];
    // The HEAD pre-collapse shape: button reads the floating-tier composite, dock its own
    // 9px tier, resting still 10px. The peer lock MUST flag button + dock.
    const headGlass = `:root {
        --glass-blur-quiet-radius: 8px;
        --glass-blur-resting-radius: 10px;
        --glass-blur-floating-radius: 13px;
        --glass-blur-dock-radius: 9px;
        --glass-blur-quiet: blur(calc(var(--glass-blur-quiet-radius) * var(--glass-level))) saturate(1.4) brightness(1.02);
        --glass-blur-resting: blur(calc(var(--glass-blur-resting-radius) * var(--glass-level))) saturate(1.4);
        --glass-blur-floating: blur(calc(var(--glass-blur-floating-radius) * var(--glass-level))) saturate(1.6);
        --glass-blur-dock: blur(calc(var(--glass-blur-dock-radius) * var(--glass-level))) saturate(1.4) brightness(1.02);
        --glass-blur-btn: blur(calc(var(--glass-blur-floating-radius) * var(--glass-level))) saturate(1.6) brightness(1.02);
    }`;
    const headSurfaces = `.glass-card { backdrop-filter: var(--glass-blur-quiet); } .btn-glass { backdrop-filter: var(--glass-blur-btn); }`;
    const headShell = `.glass-dock { --dock-surface-blur: var(--glass-blur-dock, var(--glass-blur-wash)); }`;
    const menuOk = `.glass-menu-row { --menu-row-bg: color-mix(in oklab, var(--glass-bg-quiet), var(--glass-tint-source) var(--glass-tint-strength)); }`;
    const head = detectPeerLock({ glassTokens: headGlass, surfaces: headSurfaces, shell: headShell, menu: menuOk });
    if (!head.violations.some((v) => /PEER: button/.test(v))) {
        fails.push("self-test PEER: the HEAD floating-tier (13px) button did NOT red the 8px peer lock");
    }
    if (!head.violations.some((v) => /PEER: dock/.test(v))) {
        fails.push("self-test PEER: the HEAD dock-tier (9px) dock did NOT red the 8px peer lock");
    }
    // The collapsed shape: button aliases resting (8px), dock reads resting (8px). GREEN.
    const fixGlass = `:root {
        --glass-blur-quiet-radius: 8px;
        --glass-blur-resting-radius: 8px;
        --glass-blur-quiet: blur(calc(var(--glass-blur-quiet-radius) * var(--glass-level))) saturate(1.4) brightness(1.02);
        --glass-blur-resting: blur(calc(var(--glass-blur-resting-radius) * var(--glass-level))) saturate(1.4);
        --glass-blur-btn: var(--glass-blur-resting);
    }`;
    const fixShell = `.glass-dock { --dock-surface-blur: var(--glass-blur-resting); }`;
    const fix = detectPeerLock({ glassTokens: fixGlass, surfaces: headSurfaces, shell: fixShell, menu: menuOk });
    if (fix.violations.length) {
        fails.push(`self-test PEER: the collapsed 8px-peer fixture unexpectedly RED (${fix.violations.join("; ")})`);
    }
    // A broken menu (no quiet binding) MUST red — the menu-row is IN the peer set.
    const menuBroken = detectPeerLock({ glassTokens: fixGlass, surfaces: headSurfaces, shell: fixShell, menu: ".glass-menu-row { --menu-row-bg: var(--accent); }" });
    if (!menuBroken.violations.some((v) => /PEER: menuRow/.test(v))) {
        fails.push("self-test PEER: a menu-row off the quiet-tier material did NOT red (menus are IN the peer lock)");
    }
    return fails;
}

export function detectBlur() {
    const violations = [];
    const facts = { radii: {}, twodppx: null, companions: {} };

    const glassTokens = stripCss(readFile("src/styles/tokens/glass.css"));

    // ── B1 — the six radii calibrated (strictly below pre-wave, in-band, wash=1).
    for (const [name, pre] of Object.entries(PRE_WAVE_RADII)) {
        const v = parseRadius(glassTokens, name);
        facts.radii[name] = v;
        if (v === null) {
            violations.push(`B1: --${name} not found in tokens/glass.css`);
            continue;
        }
        if (name === "glass-blur-wash-radius") {
            // wash stays 1px (sub-perceptual, unchanged).
            if (v !== 1) violations.push(`B1: --${name} is ${v}px (must stay 1px — sub-perceptual, unchanged)`);
            continue;
        }
        if (v >= pre) {
            violations.push(`B1: --${name} is ${v}px — NOT below its pre-wave ${pre}px (the dial-back did not land)`);
        }
        if (v < BAND_LO || v > BAND_HI) {
            violations.push(`B1: --${name} ${v}px is outside the AV.W7-F2 [${BAND_LO}, ${BAND_HI}]px band`);
        }
    }

    // ── B2 — the @2dppx overlay restore pulled below 24px, in-band.
    const ldark = stripCss(readFile("src/styles/tokens/light-dark.css"));
    const m2 = ldark.match(/@media\s*\(min-resolution:\s*2dppx\)[\s\S]*?--glass-blur-overlay-radius:\s*([\d.]+)px/);
    const v2 = m2 ? Number(m2[1]) : null;
    facts.twodppx = v2;
    if (v2 === null) {
        violations.push("B2: the @2dppx --glass-blur-overlay-radius restore not found in tokens/light-dark.css");
    } else if (v2 >= PRE_WAVE_2DPPX) {
        violations.push(`B2: the @2dppx overlay restore is ${v2}px — NOT below its pre-wave ${PRE_WAVE_2DPPX}px (not pulled)`);
    }

    // ── B3 — the wrong axis untouched (anti-overreach). The base composed tokens
    //   keep their saturate()/brightness() companions + --glass-level scaling; the
    //   dark-arm.css companions keep their dark saturate/brightness values.
    //
    //   BC.W-GLASS-LEGIBILITY-MEASURED (the speedtest-AX BC-W10 fold) — the per-rung
    //   saturate companion is now READ THROUGH the named `--glass-saturate-{tier}`
    //   knob (`saturate(var(--glass-saturate-{tier}))`) instead of a baked literal, so
    //   a `:root` override re-resolves the rung saturation with ZERO recipe edit. The
    //   companion is PRESERVED, not drifted: the composed string reads the named token,
    //   AND the named token DEFAULTS to the original W52-D19 literal (so the resolved
    //   blur is BYTE-IDENTICAL). B3 asserts BOTH — the substitution form is the
    //   sanctioned shape, and `--glass-saturate-{tier}` carries the named default.
    //   A drifted COMPOSED SHAPE (a baked literal, a dropped brightness companion, a
    //   missing --glass-level scale) reds B3 exactly as before.
    //
    //   BD.W-GLASS-ABROGATE-GRAY (FIX-D) — the LIGHT content/floating/overlay saturate
    //   defaults are LIFTED toward the apple.com nav-glass "concentrated light" SOTA
    //   (content 1.05→1.4, floating 1.18→1.6, overlay 1.2→1.6) so the warm backdrop pulls
    //   THROUGH the glass (the transmissive Maps-card read). This is the warm-LUMINOSITY
    //   arm, NOT a radius dial-back: the RADIUS axis (B1/B2) is BYTE-FROZEN, and the
    //   calm-vs-deep fence holds — every content tier stays BELOW the deep ceiling
    //   --glass-saturate-deep 1.8 (asserted below). The named-knob substitution form is
    //   unchanged; only the WARM-LUMINOSITY default value moves. The dark saturate arm
    //   (dark-arm.css, already 1.22-1.35) is UNTOUCHED.
    const expectCompanions = [
        { tok: "glass-blur-wash", radius: "wash", sat: "wash", satDefault: "1.4", bright: null },
        { tok: "glass-blur-quiet", radius: "quiet", sat: "quiet", satDefault: "1.4", bright: "1.02" },
        { tok: "glass-blur-resting", radius: "resting", sat: "resting", satDefault: "1.4", bright: null },
        { tok: "glass-blur-floating", radius: "floating", sat: "floating", satDefault: "1.6", bright: null },
        { tok: "glass-blur-overlay", radius: "overlay", sat: "overlay", satDefault: "1.6", bright: null },
    ];
    const satDefaultRe = (tier, value) =>
        new RegExp(`--glass-saturate-${tier}:\\s*${value.replace(".", "\\.")}\\s*;`);
    for (const { tok, radius, sat, satDefault, bright } of expectCompanions) {
        // the composed string reads the radius × --glass-level AND the named saturate
        // knob, with the brightness() companion (if any) intact (radius-only axis).
        const brightArm = bright ? ` brightness\\(${bright.replace(".", "\\.")}\\)` : "";
        const composedRe = new RegExp(
            `--${tok}:\\s*blur\\(calc\\(var\\(--glass-blur-${radius}-radius\\) \\* var\\(--glass-level\\)\\)\\) saturate\\(var\\(--glass-saturate-${sat}\\)\\)${brightArm}`,
        );
        const composedOk = composedRe.test(glassTokens);
        // the named saturate knob DEFAULTS to the unchanged W52-D19 literal (byte-equiv).
        const defaultOk = satDefaultRe(sat, satDefault).test(glassTokens);
        const ok = composedOk && defaultOk;
        facts.companions[tok] = ok;
        if (!composedOk) {
            violations.push(`B3: the composed --${tok} token's saturate()/brightness() companion + --glass-level scaling drifted (must read saturate(var(--glass-saturate-${sat})) with the brightness companion + radius axis intact — the dial-back must touch the RADIUS axis ONLY)`);
        } else if (!defaultOk) {
            violations.push(`B3: the --glass-saturate-${sat} default drifted off ${satDefault} (the named knob must default to the W52-D19 bake so the composed blur is byte-identical — a drifted default is a saturate dial-back the radius-only fence forbids)`);
        }
    }
    // The dark-arm companions (W-DARK-MATERIAL) preserved — radius-only.
    // W-NAV-DOCK-FIX — the dark dock saturate was re-pointed onto the NAMED knob
    // `saturate(var(--glass-saturate-dock))` (the SAME named-knob substitution the
    // light/dark content tiers already ride above; the gate accepts that sanctioned
    // shape). The brightness companion (the iOS-dark luminosity lift) + the radius ×
    // --glass-level axis stay intact, and the `--glass-saturate-dock` default stays at
    // the W52-D19 1.30 bake (byte-identical composed blur). A baked literal, a dropped
    // brightness companion, a missing --glass-level scale, or a drifted default reds.
    const darkArm = stripCss(readFile("src/styles/tokens/dark-arm.css"));
    const darkCompanionShapeOk =
        /--glass-blur-dock:\s*blur\(calc\(var\(--glass-blur-dock-radius\) \* var\(--glass-level\)\)\) saturate\(var\(--glass-saturate-dock\)\) brightness\(1\.12\)/.test(darkArm);
    const darkDockSatDefaultOk = /--glass-saturate-dock:\s*1\.30\s*;/.test(darkArm);
    const darkCompanionOk = darkCompanionShapeOk && darkDockSatDefaultOk;
    facts.companions.darkArm = darkCompanionOk;
    if (!darkCompanionShapeOk) {
        violations.push("B3: the W-DARK-MATERIAL dark dock blur companion drifted — it must read saturate(var(--glass-saturate-dock)) brightness(1.12) with the radius × --glass-level axis intact (the named-knob substitution; the radius pull preserves the dark luminosity lift)");
    }
    if (!darkDockSatDefaultOk) {
        violations.push("B3: the --glass-saturate-dock default drifted off 1.30 (the named knob must default to the W52-D19 bake so the composed dark dock blur is byte-identical)");
    }

    // BD.W-GLASS-ABROGATE-GRAY — the calm-vs-deep fence: every LIFTED content/floating/overlay
    // saturate default stays STRICTLY BELOW the deep-tier ceiling --glass-saturate-deep (1.8,
    // the apple.com nav ceiling in glass-deep.css). The deep tier stays the richest; content
    // tiers lift TOWARD it but never reach it (the two-register fence).
    const deepGlass = stripCss(readFile("src/styles/tokens/glass-deep.css"));
    const deepM = deepGlass.match(/--glass-saturate-deep:\s*([\d.]+)\s*;/);
    const deepSat = deepM ? Number(deepM[1]) : null;
    facts.deepSaturate = deepSat;
    const liftedSats = [
        { tier: "floating", v: 1.6 },
        { tier: "overlay", v: 1.6 },
        { tier: "resting", v: 1.4 },
    ];
    if (deepSat === null) {
        violations.push("B3: --glass-saturate-deep not found in tokens/glass-deep.css (the calm-vs-deep ceiling fence cannot resolve)");
    } else {
        for (const { tier, v } of liftedSats) {
            if (!(v < deepSat)) {
                violations.push(`B3: --glass-saturate-${tier} (${v}) is NOT strictly below the deep ceiling --glass-saturate-deep (${deepSat}) — the calm-vs-deep fence broke (a content tier must stay calmer than the deep refractive register)`);
            }
        }
    }

    return { facts, violations };
}

export function detectDisco() {
    const violations = [];
    const facts = {};

    // ── D1 — the recipe family is GONE from src/styles (positive absence).
    const utilities = stripCss(readMonolith(ROOT, "utilities"));
    const tokens = stripCss(readMonolith(ROOT, "tokens"));
    const animations = stripCss(readFile("src/styles/animations.css"));
    const glassMono = stripCss(readMonolith(ROOT, "glass"));

    const gone = [
        { what: "@utility btn-audacious", re: /@utility\s+btn-audacious\b/, src: utilities },
        { what: "@utility btn-audacious-gold", re: /@utility\s+btn-audacious-gold\b/, src: utilities },
        { what: "@keyframes sparkle-sweep", re: /@keyframes\s+sparkle-sweep\b/, src: animations },
        { what: "@keyframes btn-gold-bg-sweep", re: /@keyframes\s+btn-gold-bg-sweep\b/, src: utilities },
        { what: "--duration-sparkle declaration", re: /--duration-sparkle\s*:/, src: tokens },
        { what: "--glass-grain-opacity-disco declaration", re: /--glass-grain-opacity-disco\s*:/, src: glassMono },
    ];
    facts.recipeFamilyPresent = [];
    for (const { what, re, src } of gone) {
        if (re.test(src)) {
            facts.recipeFamilyPresent.push(what);
            violations.push(`D1: '${what}' STILL EXISTS in src/styles — the disco recipe family must be RETIRED (clean break)`);
        }
    }

    // ── D2 — no consumer carries the btn-audacious/-gold class (src/ + demo/).
    //   We enumerate every .vue/.ts/.css under src/ + demo/, strip ALL comments (so a
    //   retirement-NOTE that names the retired token in prose is not a false hit), and
    //   flag a `btn-audacious` token that survives in NON-comment code (a CVA class
    //   string, a class= attribute, a literal). The `@utility btn-audacious`
    //   declaration is D1's concern and excluded here.
    const consumerHits = [];
    const files = execSync(
        `find ${resolve(ROOT, "src")} ${resolve(ROOT, "demo")} -type f \\( -name "*.vue" -o -name "*.ts" -o -name "*.css" \\) 2>/dev/null || true`,
        { encoding: "utf8" },
    )
        .split("\n")
        .filter(Boolean)
        // the gate scripts + this file itself reference the token in prose; never scan scripts/
        .filter((f) => !/\/scripts\//.test(f));
    for (const f of files) {
        const code = stripAllComments(readFileSync(f, "utf8"));
        // a surviving btn-audacious that is NOT an `@utility` declaration (D1's bite).
        const withoutUtilityDecl = code.replace(/@utility\s+btn-audacious[a-z-]*\s*\{/g, "");
        if (/\bbtn-audacious\b/.test(withoutUtilityDecl)) {
            consumerHits.push(f.slice(ROOT.length + 1));
        }
    }
    facts.consumerClassHits = consumerHits;
    if (consumerHits.length) {
        violations.push(`D2: ${consumerHits.length} live btn-audacious consumer(s) survive in non-comment code — every consumer must collapse onto the calm register: ${consumerHits.slice(0, 3).join(", ")}`);
    }

    // ── D3 — the dock primary tier collapsed (no grain hover, no phase-halo).
    const tabButton = stripCss(readFile("src/styles/dock-controls/tab-button.css"));
    const primaryBlock = tabButton.match(/\.dock-tab-button\[data-tier="primary"\]\s*\{([\s\S]*?)\n\s{4}\}/);
    const primaryBody = primaryBlock ? primaryBlock[1] : tabButton;
    facts.dockGrainGone =
        !/--glass-grain-opacity-disco/.test(tabButton) &&
        !/--paper-clean-texture/.test(tabButton) &&
        !/\[data-phase\][^{]*::before/.test(tabButton);
    if (!facts.dockGrainGone) {
        violations.push("D3: the dock-tab primary tier still composes the disco grain (--glass-grain-opacity-disco / --paper-clean-texture / the [data-phase]::before halo) — it must collapse onto the plain glass hover register");
    }
    // The DockTabButton.vue auto-attach removed.
    const dockTabVue = readFile("src/components/custom/dock/DockTabButton.vue");
    facts.autoAttachRemoved = !/&&\s*"btn-audacious"|isPrimaryTier[\s\S]*?btn-audacious/.test(dockTabVue);
    if (!facts.autoAttachRemoved) {
        violations.push("D3: DockTabButton.vue still auto-attaches `btn-audacious` on data-tier=primary — remove it (the utility is gone)");
    }

    // ── D4 — the toggle-chip lifts via the SHARED chip-family §6 register.
    //   BD.W-CHIP-CONGRUENT-GLASS collapsed the chip family onto ONE congruent recipe:
    //   the toggle-chip's `index.ts` no longer carries an inline `--spring-smooth` scale
    //   leg + the per-state `color-mix(…--primary…)` literals (clean break, no fork) — it
    //   RE-POINTS onto `../selectable-chip/chipVariants`, which composes
    //   `glass-chip glass-capsule glass-capsule-hover accent-tone`. The ONE `scale` write
    //   (hover/press/punch, single source) lives in `glass/glass-chip.css` riding the
    //   weighty `--ease-cartoon-punch` × `--motion-weight` register (the §6 lift) + the
    //   shared `.glass-capsule-hover` specular step — so the chip LIFTS like its neighbors,
    //   it no longer color-snaps flat. D4 asserts the NEW shape: no fast-snap literal in
    //   index.ts, the recipe composes the shared lift register, and the register's scale
    //   write rides the §6 weighty curve.
    //   Comment-stripped so a retirement-NOTE naming the OLD register in prose is not a hit.
    const chip = stripAllComments(readFile("src/components/custom/toggle-chip/index.ts"));
    const chipVariantsSrc = stripAllComments(readFile("src/components/custom/selectable-chip/chipVariants.ts"));
    const glassChipCss = stripCss(readFile("src/styles/glass/glass-chip.css"));
    facts.chipNoFastSnap = !/duration-150/.test(chip) && !/\bease-out\b/.test(chip);
    // the recipe re-points onto the shared chipVariants AND that recipe composes the
    // shared specular-lift register (`.glass-capsule-hover`).
    facts.chipReadsSharedRecipe =
        /chipVariants\s*\(/.test(chip) && /glass-capsule-hover/.test(chipVariantsSrc);
    // the shared chip register carries the §6 scale lift on the weighty curve.
    facts.chipScaleLeg =
        /scale[\s\S]{0,200}var\(--ease-cartoon-punch\)/.test(glassChipCss) ||
        /transition:[\s\S]{0,160}scale[\s\S]{0,160}var\(--ease-cartoon-punch\)/.test(glassChipCss);
    if (!facts.chipNoFastSnap) {
        violations.push("D4: toggle-chip still carries `duration-150` or a raw `ease-out` literal — it must read the §6 --duration-fast/--ease-standard register");
    }
    if (!facts.chipReadsSharedRecipe) {
        violations.push("D4: toggle-chip does not re-point onto the shared chipVariants lens (the `.glass-chip .glass-capsule .glass-capsule-hover .accent-tone` register) — the chip-family congruence (no fork) broke");
    }
    if (!facts.chipScaleLeg) {
        violations.push("D4: the shared chip register (glass/glass-chip.css) carries no §6 scale lift on the weighty --ease-cartoon-punch curve — the chip color-snaps flat instead of lifting/punching like its neighbors");
    }

    // ── D5 — the FENCE held (anti-overreach): the good pops STAY.
    const base = stripCss(readMonolith(ROOT, "utilities"));
    facts.goldShimmerStays = /\.gold-shimmer\b/.test(base) && /background-clip:\s*text/.test(base);
    facts.specularStays = /--glass-specular\s*:/.test(stripCss(readMonolith(ROOT, "tokens"))) || /--glass-specular\s*:/.test(stripCss(readMonolith(ROOT, "glass")));
    if (!facts.goldShimmerStays) {
        violations.push("D5: `.gold-shimmer` static text gradient (the FENCED-OUT good pop) was over-pruned — it must STAY");
    }
    if (!facts.specularStays) {
        violations.push("D5: the `--glass-specular` register (the FENCED-OUT liquid-glass catch-light) was over-pruned — it must STAY");
    }

    return { facts, violations };
}

export function detectSpringClock() {
    const violations = [];
    const facts = { durations: {}, swept: {} };

    // ── S1 — the per-spring --spring-<name>-duration vocabulary is minted.
    // BD.W-CUT carved scheme-motion's §2 EASING block (the spring curves + per-
    // spring duration clocks) into the adjacent scheme-spring.css partial to hold
    // the 500-line bound. Read BOTH partials concatenated so the minted clocks are
    // in scope (the no-gray/glass-fx carve precedent).
    const schemeMotion = stripCss(
        readFile("src/styles/tokens/scheme-motion.css") +
            "\n" +
            readFile("src/styles/tokens/scheme-spring.css"),
    );
    for (const name of SPRING_NAMES) {
        const m = schemeMotion.match(new RegExp(`--spring-${name}-duration:\\s*([\\d.]+)s`));
        facts.durations[name] = m ? Number(m[1]) : null;
        if (!m) {
            violations.push(`S1: --spring-${name}-duration not minted in tokens/scheme-motion.css (the generated per-spring clock)`);
        }
    }

    // ── S2 — no --spring-* easing rides a generic --duration-* clock in the swept
    //   files (the anti-recurrence floor). A transition/animation leg pairing a
    //   `var(--spring-<name>)` with a `var(--duration-*)` is the off-clock pattern.
    for (const rel of SWEPT_FILES) {
        const src = stripCss(readFile(rel));
        const offClock = [];
        const declRe = /\b(?:transition|animation)\s*:\s*([^;}]+)[;}]/gi;
        let m;
        while ((m = declRe.exec(src)) !== null) {
            const leg = m[1];
            // a single transition value list may carry multiple comma legs; split.
            for (const seg of leg.split(",")) {
                const hasSpring = /var\(\s*--spring-(?:smooth|snappy|bouncy|gentle|dock)\)/.test(seg);
                const hasGenericDur = /var\(\s*--duration-(?:instant|fast|normal|slow|panel|xl|xxl)\)/.test(seg);
                if (hasSpring && hasGenericDur) offClock.push(seg.trim().slice(0, 70));
            }
        }
        // Also catch the split-longhand form: transition-duration: var(--duration-*)
        // paired with transition-timing-function: var(--spring-*) in the SAME rule.
        // (Conservative: only count when both longhands sit adjacent.)
        const splitRe = /transition-duration:\s*var\(\s*--duration-(?:instant|fast|normal|slow|panel|xl|xxl)\)\s*;\s*transition-timing-function:\s*var\(\s*--spring-(?:smooth|snappy|bouncy|gentle|dock)\)/g;
        if (splitRe.test(src)) offClock.push("(split-longhand generic-duration + spring-timing)");
        facts.swept[rel] = offClock;
        if (offClock.length) {
            violations.push(`S2: ${rel} still pairs a --spring-* easing with a generic --duration-* clock (${offClock.length} leg): ${offClock[0]} — re-point to the matching --spring-<name>-duration`);
        }
    }

    return { facts, violations };
}

export function detect() {
    const blur = detectBlur();
    const peer = detectPeerLock();
    const disco = detectDisco();
    const spring = detectSpringClock();
    const peerSelfTest = selfTestPeerLock().map((f) => `SELF-TEST ${f}`);
    return {
        violations: [
            ...blur.violations,
            ...peer.violations,
            ...peerSelfTest,
            ...disco.violations,
            ...spring.violations,
        ],
        facts: { blur: blur.facts, peer: { ...peer.facts, selfTestFails: selfTestPeerLock() }, disco: disco.facts, spring: spring.facts },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_GLASS_CAL_ARTIFACT", "BA-glass-cal");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:glass-cal",
        facts,
        violations,
    });

    console.log("proof:glass-cal — the blur ladder dialed back + the disco retired + the per-spring clock minted (BA.W-GLASS-CAL)");
    console.log(`  blur radii        : ${Object.entries(facts.blur.radii).map(([k, v]) => `${k.replace("glass-blur-", "").replace("-radius", "")}=${v}`).join(" ")}`);
    console.log(`  @2dppx restore    : ${facts.blur.twodppx}px   companions intact: ${Object.values(facts.blur.companions).every(Boolean) ? "yes ✓" : "NO ✗"}`);
    console.log(`  8px peer lock     : ${Object.entries(facts.peer.peers).map(([k, v]) => `${k}=${v}px`).join(" ")} (target ${PEER_RADIUS}px)`);
    console.log(`  disco recipe gone : ${facts.disco.recipeFamilyPresent.length === 0 ? "yes ✓" : `NO ✗ (${facts.disco.recipeFamilyPresent.join(", ")})`}`);
    console.log(`  consumer classes  : ${facts.disco.consumerClassHits.length} live`);
    console.log(`  dock grain gone   : ${facts.disco.dockGrainGone ? "yes ✓" : "NO ✗"}   chip §6: ${facts.disco.chipNoFastSnap && facts.disco.chipScaleLeg ? "yes ✓" : "NO ✗"}`);
    console.log(`  fence held        : gold-shimmer=${facts.disco.goldShimmerStays ? "✓" : "✗"} specular=${facts.disco.specularStays ? "✓" : "✗"}`);
    console.log(`  spring clocks     : ${Object.entries(facts.spring.durations).map(([k, v]) => `${k}=${v}s`).join(" ")}`);
    console.log(`  off-clock springs : ${Object.values(facts.spring.swept).reduce((n, a) => n + a.length, 0)} in swept files`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
