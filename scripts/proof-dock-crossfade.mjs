#!/usr/bin/env node
// BI.W-DOCK-CROSSFADE — proof:dock-crossfade, the born-RED thin-crossfade-slot gate
// (PASS-1 §2.6, PASS-4B ruling 3 — G6 CLOSED: crossfade beats View Transitions).
//
// `DockLayerGroup`/`DockLayer`/`useLayerTransition` FOLD to ONE crossfade slot: the
// content layer hosts ONE active face; a switch is a two-child OPACITY OVERLAP on the
// per-face `--dock-t` scalar (driven by the ONE `useDockSpring` — velocity-continuous +
// interruptible, NOT a UA-eased non-interruptible View Transition). The reserved box is
// sized to the PEAK face as a MEASURE-ONCE `min-block-size` (never a per-swap FLIP). A
// dissolving focus-holding face transfers focus to its successor (un-inert-before-focus).
// The G12 content-wrapper clip lands on a non-interactive `.dock-face-content` wrapper
// ONLY (never the `.dock-face` interactive run) and coexists with a mid-flight crossfade.
//
// PURE DEVICE-FREE static src-scan (Vue-template + TS + CSS scans; no browser, no GPU).
// Runs on EVERY runner → carries `tags: ["local","ci"]`.
//
// CLAUSES (born-RED on the pre-wave tree — `useLayerTransition.ts` 408L + its 2nd
// `new SpringProgress` + the `DockLayerGroup` register/unregister machinery live):
//   X1 one-crossfade-slot — the face-swap is a two-child opacity overlap on `--dock-t`
//      (crossfade.css: `.dock-face.is-active` reads `var(--dock-t)`, `.is-leaving` reads
//      `calc(1 - var(--dock-t))`); DockCrossfade writes `--dock-t` off `useDockSpring`;
//      `useLayerTransition` is DEFINITION-ABSENT (ZERO src reference); the DockLayerGroup
//      register/unregister/measurePeak/second-spring machinery is FOLDED out.
//   X2 no-VT-face-swap — ZERO `startViewTransition`/`view-transition-name` in the dock
//      face-swap path (DockCrossfade + DockLayerGroup) — the interruptible spring
//      crossfade is the SOLE mechanism.
//   X3 thin-core-factoring — `<DockCrossfade :active>` exists ONCE as a `/dock` export
//      the controlled-no-rail case imports WITHOUT a `useSelectionGroup` (the ruling-3
//      split: a no-selection face-swap does not route through a selection engine).
//   X4 peak-reserve-measure-once + focus-transfer — the reserved box is a measure-once
//      `min-block-size` off `scrollHeight` (NOT a per-swap `--dock-morph-from/to` FLIP);
//      a dissolving focus-holder transfers focus to its successor after un-inert.
//   X5 G12-compound — the content-wrapper `clip-path` lands on `.dock-face-content`
//      (non-interactive) ONLY, is `[data-morphing]`-gated (coexists with a mid-flight
//      crossfade), and NEVER on the `.dock-face` interactive run.
//
// Self-test bites (each planted defect MUST flag): a synthetic re-added
// `startViewTransition` REDs X2; a synthetic per-swap `--dock-morph-from/to` FLIP measure
// REDs X1/X4; a synthetic `clip-path` on the `.dock-face` interactive run REDs X5.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const HERE = fileURLToPath(import.meta.url);
const ROOT = resolve(HERE, "../..");

const PATHS = {
    ROOT,
    CROSSFADE_VUE: resolve(ROOT, "src/components/custom/dock/DockCrossfade.vue"),
    LAYERGROUP: resolve(ROOT, "src/components/custom/dock/DockLayerGroup.vue"),
    LAYER: resolve(ROOT, "src/components/custom/dock/DockLayer.vue"),
    CROSSFADE_CSS: resolve(ROOT, "src/styles/dock/crossfade.css"),
    LAYER_TRANSITION: resolve(
        ROOT,
        "src/components/custom/dock/composables/useLayerTransition.ts",
    ),
    DOCK_INDEX: resolve(ROOT, "src/components/custom/dock/index.ts"),
    SRC_DIR: resolve(ROOT, "src"),
    ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_CROSSFADE_ARTIFACT", "dock-crossfade"),
};

/** Blank CSS comments (prose never false-matches a live-rule scan — the house idiom). */
function stripCssComments(text) {
    return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
}
/** Blank Vue `<!-- -->` template comments + `// …` and block script comments. */
function stripVueComments(text) {
    return text
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/[^\n]/g, " "));
}
/** Blank TS line + block comments (URL-safe `//` strip — the clause-7 house idiom). */
function stripTsComments(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/[^\n]/g, " "));
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

/** Walk `src/` for `.ts`/`.vue`/`.mts`, returning `[{ path, text }]`. */
function walkSrc(dir) {
    const out = [];
    for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        const st = statSync(full);
        if (st.isDirectory()) out.push(...walkSrc(full));
        else if (/\.(ts|mts|vue)$/.test(name))
            out.push({ path: full, text: readFileSync(full, "utf8") });
    }
    return out;
}

/** Split a CSS text into `{ selector, body }` rules (flat — nested @-blocks collapse
 *  into the enclosing text, which is fine: we only inspect declaration bodies). */
function cssRules(text) {
    const rules = [];
    const clean = stripCssComments(text);
    const rx = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = rx.exec(clean)) !== null) {
        rules.push({ selector: m[1].trim(), body: m[2] });
    }
    return rules;
}

// ── X1 — one-crossfade-slot ─────────────────────────────────────────────────────
function checkX1({ crossfadeCssText, crossfadeVueText, layerGroupText, layerTransitionExists, layerTransitionHits }) {
    const violations = [];
    const facts = {};

    // (a) `useLayerTransition.ts` DEFINITION-ABSENT + ZERO live src reference.
    facts.x1LayerTransitionAbsent = !layerTransitionExists;
    if (layerTransitionExists) {
        violations.push(
            "X1 — `useLayerTransition.ts` is NOT definition-absent; its 2nd `new SpringProgress` + FLIP measure fold to the crossfade slot (the standalone engine dies)",
        );
    }
    facts.x1LayerTransitionHits = layerTransitionHits;
    if (layerTransitionHits.length) {
        violations.push(
            `X1 — a live \`useLayerTransition\` reference survives (${layerTransitionHits
                .slice(0, 4)
                .join(", ")}); the FLIP engine is retired — nothing composes it`,
        );
    }

    // (b) the two-child opacity overlap reads `--dock-t` (entering `var(--dock-t)`,
    //     leaving `calc(1 - var(--dock-t))`) on the `.dock-face` cells.
    const css = stripCssComments(crossfadeCssText);
    const enterOpacity = /\.dock-face\.is-active[^{]*\{[^}]*opacity:\s*var\(\s*--dock-t/.test(css);
    const leaveOpacity = /\.dock-face\.is-leaving[^{]*\{[^}]*opacity:\s*calc\(\s*1\s*-\s*var\(\s*--dock-t/.test(css);
    facts.x1EnterOpacityOnDockT = enterOpacity;
    facts.x1LeaveOpacityOnDockT = leaveOpacity;
    if (!enterOpacity || !leaveOpacity) {
        violations.push(
            `X1 — the two-child opacity overlap on \`--dock-t\` is not the crossfade mechanism (entering=${enterOpacity} leaving=${leaveOpacity}); the entering face must read \`opacity: var(--dock-t)\` and the leaving \`opacity: calc(1 - var(--dock-t))\``,
        );
    }

    // (c) DockCrossfade WRITES `--dock-t` off the ONE `useDockSpring` (interruptible;
    //     NO second `new SpringProgress`).
    const vue = stripVueComments(crossfadeVueText);
    const writesDockT = /setProperty\(\s*["']--dock-t["']/.test(vue);
    const composesDockSpring = /useDockSpring\s*\(/.test(vue);
    const noRawSpring = !/new\s+SpringProgress/.test(vue);
    facts.x1WritesDockT = writesDockT;
    facts.x1ComposesDockSpring = composesDockSpring;
    facts.x1NoRawSpringProgress = noRawSpring;
    if (!writesDockT)
        violations.push("X1 — DockCrossfade does NOT write the per-face `--dock-t` opacity scalar");
    if (!composesDockSpring)
        violations.push("X1 — DockCrossfade does NOT compose `useDockSpring` (the ONE interruptible dock-spring factory)");
    if (!noRawSpring)
        violations.push("X1 — DockCrossfade mints its OWN `new SpringProgress` (the dock-single-engine fence: compose useDockSpring)");

    // (d) the DockLayerGroup register/unregister/measurePeak/second-spring machinery is
    //     FOLDED OUT (it composes `<DockCrossfade>` instead).
    const lg = stripVueComments(layerGroupText);
    const composesCrossfade = /<DockCrossfade\b/.test(layerGroupText) && /import\s+DockCrossfade/.test(lg);
    const hasOldRegister = /function\s+register\s*\(/.test(lg) && /function\s+unregister\s*\(/.test(lg);
    const hasMeasurePeak = /function\s+measurePeak\s*\(/.test(lg);
    const hasLayerTransition = /useLayerTransition/.test(lg);
    facts.x1LayerGroupComposesCrossfade = composesCrossfade;
    facts.x1LayerGroupNoRegisterMachinery = !hasOldRegister && !hasMeasurePeak && !hasLayerTransition;
    if (!composesCrossfade)
        violations.push("X1 — DockLayerGroup does NOT compose `<DockCrossfade>` (the switcher drives its `:active`)");
    if (hasOldRegister || hasMeasurePeak || hasLayerTransition)
        violations.push(
            `X1 — the DockLayerGroup FLIP/registration machinery survives (register+unregister=${hasOldRegister} measurePeak=${hasMeasurePeak} useLayerTransition=${hasLayerTransition}); it folds to the crossfade slot`,
        );

    return { violations, facts };
}

// ── X2 — no-VT-face-swap ─────────────────────────────────────────────────────────
function checkX2({ crossfadeVueText, layerGroupText }) {
    const violations = [];
    const facts = {};
    const combined = stripVueComments(crossfadeVueText) + "\n" + stripVueComments(layerGroupText);

    const vtHits = [];
    if (/startViewTransition/.test(combined)) vtHits.push("startViewTransition");
    if (/view-transition-name|viewTransitionName/.test(combined)) vtHits.push("view-transition-name");
    facts.x2ViewTransitionHits = vtHits;
    if (vtHits.length) {
        violations.push(
            `X2 — the dock face-swap path carries View-Transition wiring (${vtHits.join(
                ", ",
            )}); the interruptible spring crossfade is the SOLE mechanism (G6 CLOSED — VT is non-interruptible)`,
        );
    }
    return { violations, facts };
}

// ── X3 — thin-core-factoring ─────────────────────────────────────────────────────
function checkX3({ crossfadeVueText, crossfadeExists, dockIndexText }) {
    const violations = [];
    const facts = {};

    facts.x3CrossfadeExists = crossfadeExists;
    if (!crossfadeExists) violations.push("X3 — `DockCrossfade.vue` does NOT exist (the thin controlled face-swap core)");

    const idx = stripTsComments(dockIndexText);
    const exported = /export\s*\{\s*default\s+as\s+DockCrossfade\s*\}/.test(idx);
    facts.x3ExportedOnDock = exported;
    if (!exported) violations.push("X3 — `DockCrossfade` is NOT exported on the `/dock` subpath barrel (the controlled-no-rail consumer imports it directly)");

    const vue = stripVueComments(crossfadeVueText);
    // The controlled `:active` prop (the caller-owned model, the ONE registry).
    const hasActiveProp = /\bactive\s*:\s*string/.test(vue) || /defineProps<\{[^}]*\bactive\b/.test(vue);
    facts.x3ControlledActiveProp = hasActiveProp;
    if (!hasActiveProp) violations.push("X3 — DockCrossfade does NOT take a controlled `active` prop (the ruling-3 no-selection face-swap)");

    // The thin core does NOT route through a selection engine (a no-selection face-swap).
    const importsSelection = /useSelectionGroup/.test(vue);
    facts.x3NoSelectionEngine = !importsSelection;
    if (importsSelection)
        violations.push(
            "X3 — DockCrossfade imports `useSelectionGroup`; the thin controlled-no-rail core must NOT route through a selection engine (the roving machine + indicator + selection model are inert in that mode — don't abstract them over a case that never selects)",
        );

    return { violations, facts };
}

// ── X4 — peak-reserve-measure-once + focus-transfer ──────────────────────────────
function checkX4({ crossfadeVueText }) {
    const violations = [];
    const facts = {};
    const vue = stripVueComments(crossfadeVueText);

    // (a) peak-reserve is a MEASURE-ONCE `min-block-size` off `scrollHeight`, NOT a
    //     per-swap `--dock-morph-from`/`--dock-morph-to` FLIP.
    const reservesMinBlock = /min-block-size|min-inline-size/.test(vue);
    const measuresScroll = /scrollHeight|scrollWidth/.test(vue);
    const noFlipVars = !/--dock-morph-from|--dock-morph-to/.test(vue);
    facts.x4ReservesMinBlock = reservesMinBlock;
    facts.x4MeasuresScroll = measuresScroll;
    facts.x4NoPerSwapFlip = noFlipVars;
    if (!reservesMinBlock || !measuresScroll)
        violations.push(
            `X4 — the peak reserve is not a measure-once min-block-size off scrollHeight (min-block=${reservesMinBlock} scroll=${measuresScroll})`,
        );
    if (!noFlipVars)
        violations.push(
            "X4 — DockCrossfade writes a per-swap `--dock-morph-from`/`--dock-morph-to` FLIP; the reserve is measure-ONCE (a running peak), never a per-swap box FLIP",
        );

    // (b) focus-transfer-on-dissolve, un-inert-before-focus (a `nextTick` past the
    //     reactive is-active flip, then `.focus()`).
    const transfersFocus = /transferFocusOnDissolve|\.focus\?\.\(\)|\.focus\(\)/.test(vue);
    const unInertsFirst = /await\s+nextTick\s*\(\s*\)/.test(vue);
    facts.x4TransfersFocus = transfersFocus;
    facts.x4UnInertsBeforeFocus = unInertsFirst;
    if (!transfersFocus)
        violations.push("X4 — DockCrossfade does NOT transfer focus on dissolve (a focus-holding leaving face orphans keyboard/AT users)");
    if (!unInertsFirst)
        violations.push("X4 — the focus-transfer does NOT `await nextTick()` before focusing (un-inert-before-focus is load-bearing — focusing an [inert] host is a no-op)");

    return { violations, facts };
}

// ── X5 — G12-compound (content-wrapper clip only) ────────────────────────────────
function checkX5({ crossfadeCssText }) {
    const violations = [];
    const facts = {};
    const rules = cssRules(crossfadeCssText);

    const clipRules = rules.filter((r) => /clip-path\s*:/.test(r.body));
    facts.x5ClipRuleCount = clipRules.length;

    // (a) ≥1 clip rule targets the non-interactive `.dock-face-content` wrapper.
    const contentClips = clipRules.filter((r) => /\.dock-face-content/.test(r.selector));
    facts.x5ContentWrapperClip = contentClips.length > 0;
    if (contentClips.length === 0)
        violations.push("X5 — no `clip-path` rule targets the `.dock-face-content` content wrapper (the G12 spill clip lands on the non-interactive wrapper)");

    // (b) the content clip is `[data-morphing]`-gated (coexists with a mid-flight
    //     collapse crossfade — at REST no clip so hover plates overflow).
    const gated = contentClips.every((r) => /\[data-morphing\]/.test(r.selector));
    facts.x5ClipDataMorphingGated = contentClips.length > 0 && gated;
    if (contentClips.length > 0 && !gated)
        violations.push("X5 — a `.dock-face-content` clip is NOT `[data-morphing]`-gated; the clip must fire ONLY during a simultaneous collapse-morph (at rest hover plates overflow)");

    // (c) NEVER on the `.dock-face` interactive run (a clip rule whose subject is
    //     `.dock-face`/`.dock-crossfade`/a `[role]`/`button` — WITHOUT `.dock-face-content`).
    const interactiveClips = clipRules.filter(
        (r) =>
            !/\.dock-face-content/.test(r.selector) &&
            /(\.dock-face\b|\.dock-crossfade\b|\[role|\bbutton\b)/.test(r.selector),
    );
    facts.x5NoInteractiveRunClip = interactiveClips.length === 0;
    if (interactiveClips.length > 0)
        violations.push(
            `X5 — a \`clip-path\` lands on the interactive run (${interactiveClips
                .map((r) => r.selector)
                .slice(0, 2)
                .join(" | ")}); the clip must land on the non-interactive \`.dock-face-content\` wrapper ONLY, so hover plates still overflow`,
        );

    return { violations, facts };
}

// ── self-test bites ──────────────────────────────────────────────────────────────
function selfTest() {
    const errors = [];

    // X2 bite — a synthetic re-added `startViewTransition` in the face-swap path MUST flag.
    const x2 = checkX2({
        crossfadeVueText: "const vt = document.startViewTransition(swap);",
        layerGroupText: "<template></template>",
    });
    if (!x2.violations.some((v) => v.startsWith("X2") && /startViewTransition/.test(v))) {
        errors.push("X2 self-test BROKE — a synthetic startViewTransition was NOT flagged (the no-VT fence not load-bearing)");
    }

    // X1/X4 bite — a synthetic per-swap `--dock-morph-from/to` FLIP measure MUST flag.
    const x4 = checkX4({
        crossfadeVueText:
            'el.style.setProperty("--dock-morph-from", `${from}px`); el.style.setProperty("--dock-morph-to", `${to}px`); const min = el.scrollHeight; el.style.minBlockSize = min; el.focus();',
    });
    if (!x4.violations.some((v) => v.startsWith("X4") && /FLIP/.test(v))) {
        errors.push("X4 self-test BROKE — a synthetic per-swap --dock-morph-from/to FLIP was NOT flagged");
    }

    // X5 bite — a synthetic `clip-path` on the `.dock-face` interactive run MUST flag.
    const x5 = checkX5({
        crossfadeCssText:
            ".dock-crossfade > .dock-face.is-active { clip-path: inset(0 10% 0 0); } .dock-crossfade > .dock-face.is-active > .dock-face-content { clip-path: inset(0); }",
    });
    if (!x5.violations.some((v) => v.startsWith("X5") && /interactive run/.test(v))) {
        errors.push("X5 self-test BROKE — a synthetic clip on the `.dock-face` interactive run was NOT flagged");
    }

    return { ok: errors.length === 0, errors };
}

function layerTransitionHitsInSrc() {
    const hits = [];
    const rx = /\buseLayerTransition\s*[({]/;
    for (const { path, text } of walkSrc(PATHS.SRC_DIR)) {
        const clean = /\.vue$/.test(path) ? stripVueComments(text) : stripTsComments(text);
        if (rx.test(clean)) hits.push(relative(PATHS.ROOT, path));
    }
    return hits;
}

function run() {
    const crossfadeVueText = read(PATHS.CROSSFADE_VUE);
    const layerGroupText = read(PATHS.LAYERGROUP);
    const crossfadeCssText = read(PATHS.CROSSFADE_CSS);
    const dockIndexText = read(PATHS.DOCK_INDEX);
    const crossfadeExists = existsSync(PATHS.CROSSFADE_VUE);
    const layerTransitionExists = existsSync(PATHS.LAYER_TRANSITION);
    const layerTransitionHits = layerTransitionHitsInSrc();

    const x1 = checkX1({ crossfadeCssText, crossfadeVueText, layerGroupText, layerTransitionExists, layerTransitionHits });
    const x2 = checkX2({ crossfadeVueText, layerGroupText });
    const x3 = checkX3({ crossfadeVueText, crossfadeExists, dockIndexText });
    const x4 = checkX4({ crossfadeVueText });
    const x5 = checkX5({ crossfadeCssText });
    const self = selfTest();

    const violations = [
        ...x1.violations,
        ...x2.violations,
        ...x3.violations,
        ...x4.violations,
        ...x5.violations,
        ...self.errors,
    ];
    const facts = { ...x1.facts, ...x2.facts, ...x3.facts, ...x4.facts, ...x5.facts, selfTest: self.ok };
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(PATHS.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-crossfade",
        note: "BI.W-DOCK-CROSSFADE — the thin `<DockCrossfade :active>` face-swap FOLD (DockLayerGroup/DockLayer/useLayerTransition → ONE crossfade slot). X1 one-crossfade-slot (two-child opacity overlap on --dock-t; useLayerTransition DEFINITION-ABSENT; DockCrossfade writes --dock-t off useDockSpring; the register/measurePeak/second-spring machinery folded out) · X2 no-VT-face-swap (ZERO startViewTransition — G6 CLOSED, VT is non-interruptible) · X3 thin-core-factoring (DockCrossfade a /dock export the controlled-no-rail case imports WITHOUT useSelectionGroup) · X4 peak-reserve-measure-once (min-block-size off scrollHeight, NO --dock-morph-from/to FLIP) + focus-transfer (un-inert-before-focus) · X5 G12-compound (clip-path on .dock-face-content ONLY, [data-morphing]-gated, NEVER the interactive run) + 3 self-test bites.",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log("proof:dock-crossfade — the thin crossfade-slot FOLD gate (BI.W-DOCK-CROSSFADE; G6 CLOSED)");
    console.log(
        `  X1 one-crossfade-slot     : layerTransition-absent=${facts.x1LayerTransitionAbsent} live-hits=${facts.x1LayerTransitionHits?.length ?? "?"} opacity-overlap(enter=${facts.x1EnterOpacityOnDockT},leave=${facts.x1LeaveOpacityOnDockT}) writes--dock-t=${facts.x1WritesDockT} useDockSpring=${facts.x1ComposesDockSpring} no-raw-spring=${facts.x1NoRawSpringProgress} lg-composes=${facts.x1LayerGroupComposesCrossfade} lg-folded=${facts.x1LayerGroupNoRegisterMachinery} ${ok(x1.violations.length === 0)}`,
    );
    console.log(
        `  X2 no-VT-face-swap        : vt-hits=${facts.x2ViewTransitionHits?.length ?? "?"} ${ok(x2.violations.length === 0)}`,
    );
    console.log(
        `  X3 thin-core-factoring    : exists=${facts.x3CrossfadeExists} /dock-export=${facts.x3ExportedOnDock} controlled-active=${facts.x3ControlledActiveProp} no-selection-engine=${facts.x3NoSelectionEngine} ${ok(x3.violations.length === 0)}`,
    );
    console.log(
        `  X4 peak-reserve+focus     : min-block=${facts.x4ReservesMinBlock} scroll-measure=${facts.x4MeasuresScroll} no-flip=${facts.x4NoPerSwapFlip} focus-transfer=${facts.x4TransfersFocus} un-inert-first=${facts.x4UnInertsBeforeFocus} ${ok(x4.violations.length === 0)}`,
    );
    console.log(
        `  X5 G12-compound           : content-clip=${facts.x5ContentWrapperClip} data-morphing-gated=${facts.x5ClipDataMorphingGated} no-interactive-clip=${facts.x5NoInteractiveRunClip} ${ok(x5.violations.length === 0)}`,
    );
    console.log(`  self-test (bite proof)    : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${relative(PATHS.ROOT, PATHS.ARTIFACT)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { checkX1, checkX2, checkX3, checkX4, checkX5, selfTest };
