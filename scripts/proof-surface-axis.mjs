#!/usr/bin/env node
// BA.W-SURFACE-AXIS — the shared {glass·veil·opaque} surface-decoration axis gate
// (proof:surface-axis).
//
// The born-RED→GREEN device-free SOURCE-STRUCTURE arm for the ONE shared surface
// axis. The CSS seam / TS resolver / SFC adoption is the artefact (NOT a grep for
// runtime behaviour); the PAINTED truth (each rung paints translucent-where-glass,
// solid-where-opaque, frosted-where-veil over the busy backdrop, BOTH modes) is
// the binding visual truth proven by the π live readback captured in
// docs/tranches/BA/audit/visual/W-SURFACE-AXIS-DELTA.md — this gate is the no-
// device CI half. A source-green/visually-broken gap is the exact AZ failure
// class (the re-open of R3-1); both halves must hold for a clean close.
//
// Six falsifiable witnesses (each born-RED at HEAD pre-wave, driven GREEN by the
// wave):
//
//   W1 — THE AXIS IS FACTORED ONCE. The `[data-surface="veil"]` /
//        `[data-surface="opaque"]` decoration rules exist in EXACTLY ONE shared
//        seam (src/styles/glass/surface-axis.css) over a base glass tier, AND the
//        `Surface` union + `surfaceClass` resolver exist in EXACTLY ONE shared
//        helper (_shared/useSurfaceAxis.ts). Bite (anti-evasion): NO second
//        {glass·veil·opaque} surface-axis definition exists OUTSIDE the shared seam
//        — a parallel `[data-surface="veil"]`/`[data-surface="opaque"]` decoration
//        block in any OTHER css partial returns ZERO. A consumer wave forking its
//        own axis fails this clause (the DAG §5 second-axis prohibition). RED at
//        HEAD: neither file exists.
//   W2 — THE RESOLVER IS PUBLISHED. useSurfaceAxis.ts exports `Surface` +
//        `surfaceClass`, re-exported from _shared/index.ts, AND `Surface` is
//        published in src/api/index.ts (the discovery layer). RED at HEAD: no such
//        symbol.
//   W3 — EVERY ENROLLED SURFACE THREADS THE AXIS. Each of the NINE surfaces
//        (Card, Dialog, Drawer, Popover, Command,
//        ExpandableContainer, Skeleton + Toast, Button — BB.W-SURFACE-AXIS-COMPLETE
//        finished the R8-12 enrollment; BI.W-GLASS-DEDUP retired GlassPanel)
//        carries the `surface` prop routed through
//        `surfaceClass` (or the `[data-surface]` decoration). The POSITIVE assert:
//        the surface composes the axis (a `surfaceClass(` call OR a `data-surface`
//        binding), ExpandableContainer's fullscreen overlay carries `glass-overlay`
//        (NOT `bg-background`), Skeleton carries the `--skeleton-glass-bg` over-
//        glass register. The roster-COUNT fact (eleven) is the anti-evasion floor —
//        a re-freeze at nine (dropping Toast/Button to dodge the work) reds W3. RED
//        at HEAD pre-BB: Toast.vue/Button.vue carry no `surface` thread.
//   W7 — THE DOC CLAIM IS HONEST (the doc-lie kill, BB.W-SURFACE-AXIS-COMPLETE).
//        The gate reads CLAUDE.md and asserts every `<Toast surface=…>` /
//        `<Button surface=…>` example references a prop the corresponding SFC
//        actually DECLARES (a `surface` prop in Toast.vue / Button.vue). A
//        documented prop with no backing declaration REDS the witness — the
//        structural anti-P-5 bite (a future doc claim AHEAD of the source fails).
//        RED at HEAD pre-BB: CLAUDE.md documented `<Toast surface="veil">` while
//        Toast.vue declared no `surface` prop.
//   W4 — THE CLEAN BREAK LANDED. DialogContent carries NO `variant` prop (the
//        binary glass|opaque string retired onto `surface`) AND a `surface` prop is
//        present, AND MIGRATION.md carries the `variant`→`surface` row. RED at
//        HEAD: DialogContent declares `variant?: 'glass' | 'opaque'`.
//   W5 — THE CONTROL REST TIER IS UNIFIED (scope 7). The `--control-surface-*` REST
//        register is declared ONCE (the control plate bg/border/blur), AND the
//        Select default trigger no longer rides the `glass-wash` gray fork (it
//        reads the shared register), AND `.input-pill` reads the shared register —
//        the form family is ONE material at rest. RED at HEAD: no `--control-
//        surface-*` token; SelectTrigger default is `glass-wash`.
//   W6 — THE PAPER-INK-MARK REGISTER (scope 8). The `.paper-ink-mark` MARK register
//        is declared ONCE (a 2px `--foreground` ink hairline — no plate, no blur,
//        no glass), AND ≥2 consumers compose it (a demo demonstration — the tabs
//        paper-underline SHAPE, scanned across demo/stories after the overfit math-paper
//        section-RAIL demo retired at BI.W-MATH-PAPER-REMOVE — + the shipping W-TABS
//        underline indicator). RED at HEAD: no `.paper-ink-mark` register.
//
// House style mirrors proof-dock-rail-hairline.mjs / proof-glass-cohesion.mjs: ESM
// .mjs, comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ui = (p) => resolve(ROOT, "src/components/ui", p);
    const custom = (p) => resolve(ROOT, "src/components/custom", p);
    _cliPaths = {
        ROOT,
        SURFACE_AXIS_CSS: resolve(ROOT, "src/styles/glass/surface-axis.css"),
        USE_SURFACE_AXIS_TS: ui("_shared/useSurfaceAxis.ts"),
        SHARED_INDEX_TS: ui("_shared/index.ts"),
        API_INDEX_TS: resolve(ROOT, "src/api/index.ts"),
        MIGRATION_MD: resolve(ROOT, "MIGRATION.md"),
        // BB.W-SURFACE-AXIS-COMPLETE — the W7 doc-honesty witness reads the glass-system
        // canon home (BH.B5c re-home off CLAUDE.md).
        // The eleven enrolled surfaces (BB.W-SURFACE-AXIS-COMPLETE finished the
        // R8-12 enrollment — Toast + Button join the prior nine).
        CARD_VUE: ui("card/Card.vue"),
        DIALOG_VUE: ui("dialog/DialogContent.vue"),
        DRAWER_VUE: ui("drawer/DrawerContent.vue"),
        POPOVER_VUE: ui("popover/PopoverContent.vue"),
        COMMAND_VUE: ui("command/Command.vue"),
        EXPANDABLE_VUE: custom("expandable-container/ExpandableContainer.vue"),
        SKELETON_VUE: ui("skeleton/Skeleton.vue"),
        // BB.W-SURFACE-AXIS-COMPLETE — the two surfaces R8-12 named verbatim.
        TOAST_VUE: ui("toast/Toast.vue"),
        BUTTON_VUE: ui("button/Button.vue"),
        // BI.W-SURFACE-EXTRACT — the extracted bare plate primitive (W8).
        SURFACE_VUE: ui("surface/Surface.vue"),
        SRC_DIR: resolve(ROOT, "src"),
        // Scope 7 — control surfaces.
        SELECT_TRIGGER_VUE: ui("select/SelectTrigger.vue"),
        // Scope 8 — paper-ink-mark register consumers (the demo tree, scanned;
        // BI.W-MATH-PAPER-REMOVE retired the single-file math-paper.vue probe).
        DEMO_STORIES_DIR: resolve(ROOT, "demo/stories"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_SURFACE_AXIS_ARTIFACT",
            "BA-surface-axis",
        ),
    };
    return _cliPaths;
}

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
        } else if (text[i] === "/" && text[i + 1] === "/") {
            // Line comment (TS/JS) — blank to EOL.
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Strip Vue SFC `<!-- … -->` HTML comments — a commented-out render must not
// satisfy or trip a witness.
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Count `[data-surface="veil"]` + `[data-surface="opaque"]` DECORATION blocks (a
// `{ … }` rule) in a css string. The shared seam has exactly one of each; any
// occurrence in ANOTHER partial is a forked axis.
function countSurfaceDecorationBlocks(css) {
    const veil = (css.match(/\[data-surface\s*=\s*["']veil["']\s*\]\s*\{/g) || [])
        .length;
    const opaque = (
        css.match(/\[data-surface\s*=\s*["']opaque["']\s*\]\s*\{/g) || []
    ).length;
    return { veil, opaque };
}

// BI.W-CLEAR-FOLD (W9) — extract the `Surface` union members from a comment-stripped
// useSurfaceAxis.ts source. `export type Surface = "glass" | "veil" | "opaque";` →
// ["glass","veil","opaque"]. Empty on a malformed source (the caller reds W9 on an
// empty member set only if it also finds no consumers — a benign no-op otherwise).
export function parseSurfaceUnion(ts) {
    const m = /export\s+type\s+Surface\s*=\s*([^;]+);/.exec(ts);
    if (!m) return [];
    return [...m[1].matchAll(/["']([a-z]+)["']/g)].map((x) => x[1]);
}

/**
 * The W-SURFACE-AXIS detector. Pure: takes the comment-stripped sources, returns
 * `{ facts, violations }`. Each witness pushes a falsifiable violation string.
 */
export function detectSurfaceAxis(sources) {
    const surfaceAxisCss = stripBlockComments(sources.surfaceAxisCss ?? "");
    const glassMonolith = stripBlockComments(sources.glassMonolith ?? "");
    const utilitiesMonolith = stripBlockComments(sources.utilitiesMonolith ?? "");
    const cardsCss = stripBlockComments(sources.cardsCss ?? "");
    const tokensMonolith = stripBlockComments(sources.tokensMonolith ?? "");
    const useSurfaceAxisTs = stripBlockComments(sources.useSurfaceAxisTs ?? "");
    const sharedIndexTs = stripBlockComments(sources.sharedIndexTs ?? "");
    const apiIndexTs = stripBlockComments(sources.apiIndexTs ?? "");
    const migrationMd = sources.migrationMd ?? "";

    const sfc = {};
    for (const [k, v] of Object.entries(sources.sfc ?? {})) {
        sfc[k] = stripHtmlComments(stripBlockComments(v ?? ""));
    }
    const selectTrigger = stripHtmlComments(
        stripBlockComments(sources.selectTrigger ?? ""),
    );
    const demoInkMarkConsumers = sources.demoInkMarkConsumers ?? [];

    const violations = [];

    // ── W1 — the axis is factored ONCE ────────────────────────────────────────
    // (a) The shared seam declares both decoration rungs over a base tier.
    const seamBlocks = countSurfaceDecorationBlocks(surfaceAxisCss);
    const seamHasVeil = seamBlocks.veil >= 1;
    const seamHasOpaque = seamBlocks.opaque >= 1;
    if (!seamHasVeil) {
        violations.push(
            "W1: src/styles/glass/surface-axis.css declares no `[data-surface=\"veil\"]` decoration rule.",
        );
    }
    if (!seamHasOpaque) {
        violations.push(
            "W1: src/styles/glass/surface-axis.css declares no `[data-surface=\"opaque\"]` decoration rule.",
        );
    }
    // (b) The veil rung composes the SAME --glass-bg-quiet + --glass-tint-* tokens
    //     (no veil-local recipe fork) and sets the opaque level escape.
    const veilReadsLadder =
        /--glass-bg-quiet/.test(surfaceAxisCss) &&
        /--glass-tint-(source|strength)/.test(surfaceAxisCss);
    if (seamHasVeil && !veilReadsLadder) {
        violations.push(
            "W1: the surface-axis veil rung does not read the shared --glass-bg-quiet + --glass-tint-* ladder (a veil-local recipe fork — the axis must route the same glass material).",
        );
    }
    const opaqueSetsLevel = /\[data-surface\s*=\s*["']opaque["']\s*\]\s*\{[^}]*--glass-level\s*:\s*0/.test(
        surfaceAxisCss,
    );
    if (seamHasOpaque && !opaqueSetsLevel) {
        violations.push(
            "W1: the surface-axis opaque rung does not set `--glass-level: 0` (the escape must ride the ONE level knob).",
        );
    }
    // (c) ANTI-EVASION — no second axis OUTSIDE the shared seam. Scan the other
    //     css authorities (the glass monolith MINUS the surface-axis partial, the
    //     utilities monolith, cards.css) for a forked `[data-surface=veil|opaque] {`
    //     decoration block. Card's own `[data-surface]` is an ATTR BINDING on its
    //     host (`:data-surface="surface"`), not a CSS decoration rule, so it does
    //     not match `\[data-surface="veil"\] {`. The glass monolith INCLUDES the
    //     surface-axis partial — subtract its own block count.
    const glassBlocks = countSurfaceDecorationBlocks(glassMonolith);
    const utilBlocks = countSurfaceDecorationBlocks(utilitiesMonolith);
    const cardsBlocks = countSurfaceDecorationBlocks(cardsCss);
    const forkVeil =
        glassBlocks.veil - seamBlocks.veil + utilBlocks.veil + cardsBlocks.veil;
    const forkOpaque =
        glassBlocks.opaque -
        seamBlocks.opaque +
        utilBlocks.opaque +
        cardsBlocks.opaque;
    const forkedAxis = forkVeil > 0 || forkOpaque > 0;
    if (forkedAxis) {
        violations.push(
            `W1: a SECOND {glass·veil·opaque} surface-axis decoration block exists OUTSIDE the shared seam (veil:${forkVeil} opaque:${forkOpaque}) — the DAG §5 second-axis prohibition; the axis must be factored ONCE.`,
        );
    }
    // (d) The resolver exists in EXACTLY one helper.
    const resolverDefined = /export\s+function\s+surfaceClass\b/.test(
        useSurfaceAxisTs,
    );
    if (!resolverDefined) {
        violations.push(
            "W1: _shared/useSurfaceAxis.ts does not export the `surfaceClass` resolver (the TS half of the ONE axis).",
        );
    }

    // ── W2 — the resolver is published ────────────────────────────────────────
    const unionExported = /export\s+type\s+Surface\b/.test(useSurfaceAxisTs);
    if (!unionExported) {
        violations.push(
            "W2: _shared/useSurfaceAxis.ts does not export the `Surface` union type.",
        );
    }
    const sharedReExports =
        /surfaceClass/.test(sharedIndexTs) &&
        /\bSurface\b/.test(sharedIndexTs) &&
        /useSurfaceAxis/.test(sharedIndexTs);
    if (!sharedReExports) {
        violations.push(
            "W2: _shared/index.ts does not re-export `surfaceClass` + `Surface` from ./useSurfaceAxis.",
        );
    }
    const apiPublishes =
        /\bSurface\b/.test(apiIndexTs) && /_shared/.test(apiIndexTs);
    if (!apiPublishes) {
        violations.push(
            "W2: src/api/index.ts does not publish the `Surface` type from ../components/ui/_shared (the discovery layer).",
        );
    }

    // ── W3 — every enrolled surface threads the axis ──────────────────────────
    // The POSITIVE assert: each SFC composes the axis (a `surfaceClass(` call OR a
    // `data-surface` binding) — a renamed/defaulted prop must still resolve the
    // shared decoration.
    const threadsAxis = (src) =>
        /surfaceClass\s*\(/.test(src) || /data-surface/.test(src);
    const ENROLLED = [
        ["Card", "card"],
        // BI.W-GLASS-DEDUP — GlassPanel RETIRED (FAM-10; folded onto <Surface>/
        // .glass-resting). The roster drops from eleven to TEN; the count floor below
        // tracks it (a re-freeze at nine still reds — Toast/Button stay enrolled).
        ["Dialog", "dialog"],
        // BI.W-DIALOG-PLACEMENT — Sheet FOLDED onto <DialogContent placement> (the
        // survivor threads the axis through the Dialog row above). Roster TEN -> NINE.
        ["Drawer", "drawer"],
        ["Popover", "popover"],
        ["Command", "command"],
        ["ExpandableContainer", "expandable"],
        ["Skeleton", "skeleton"],
        // BB.W-SURFACE-AXIS-COMPLETE — the R8-12 "buttons + toasts" close. The
        // roster stays at TEN (BI.W-GLASS-DEDUP dropped GlassPanel; the count fact
        // below reds a re-freeze at nine that would drop Toast/Button).
        ["Toast", "toast"],
        ["Button", "button"],
    ];
    const w3 = {};
    for (const [label, key] of ENROLLED) {
        const src = sfc[key] ?? "";
        const ok = threadsAxis(src);
        w3[key] = ok;
        if (!ok) {
            violations.push(
                `W3: ${label} does not thread the shared surface axis (no surfaceClass(…) call or data-surface binding).`,
            );
        }
    }
    // The anti-evasion roster-count floor: the enrollment is COMPLETE at NINE
    // (BB finished the two named-but-skipped surfaces; BI.W-GLASS-DEDUP retired
    // GlassPanel; BI.W-DIALOG-PLACEMENT folded Sheet onto DialogContent). A
    // re-freeze at eight (dropping Toast/Button) reds.
    const enrolledCount = ENROLLED.length;
    if (enrolledCount !== 9) {
        violations.push(
            `W3: the ENROLLED roster is ${enrolledCount}, not nine — the R8-12 "buttons + toasts" enrollment must stay complete (a re-freeze that drops Toast/Button dodges the work; GlassPanel retired at BI.W-GLASS-DEDUP, Sheet folded at BI.W-DIALOG-PLACEMENT).`,
        );
    }
    // ExpandableContainer fullscreen overlay carries glass-overlay, NOT bg-background.
    const expandableSrc = sfc.expandable ?? "";
    const expandableUnwalled =
        /glass-overlay/.test(expandableSrc) && !/bg-background/.test(expandableSrc);
    if (!expandableUnwalled) {
        violations.push(
            "W3: ExpandableContainer's fullscreen overlay is not un-walled (it must carry `glass-overlay`, NOT `bg-background`).",
        );
    }
    // Skeleton carries the --skeleton-glass-bg over-glass register.
    const skeletonSrc = sfc.skeleton ?? "";
    const skeletonOverGlass = /--skeleton-glass-bg/.test(skeletonSrc);
    if (!skeletonOverGlass) {
        violations.push(
            "W3: Skeleton does not carry the `--skeleton-glass-bg` over-glass register (the IG-C2 translucent block).",
        );
    }

    // ── W4 — the clean break landed ───────────────────────────────────────────
    const dialogSrc = sfc.dialog ?? "";
    // The binary `variant?: 'glass' | 'opaque'` prop must be GONE; a `surface` prop present.
    const dialogHasVariantProp = /variant\s*\?\s*:\s*['"]glass['"]\s*\|\s*['"]opaque['"]/.test(
        dialogSrc,
    );
    if (dialogHasVariantProp) {
        violations.push(
            "W4: DialogContent still declares the binary `variant?: 'glass' | 'opaque'` prop (the clean break onto `surface` did not land — no alias allowed, BA inv-7).",
        );
    }
    const dialogHasSurfaceProp =
        /surface\s*\?\s*:/.test(dialogSrc) || /surface/.test(dialogSrc);
    if (!dialogHasSurfaceProp) {
        violations.push(
            "W4: DialogContent does not declare a `surface` prop (the retire-onto-surface did not land).",
        );
    }
    const migrationRow =
        /variant/i.test(migrationMd) &&
        /surface/i.test(migrationMd) &&
        /Dialog/i.test(migrationMd);
    if (!migrationRow) {
        violations.push(
            "W4: MIGRATION.md carries no Dialog `variant`→`surface` clean-break row.",
        );
    }

    // ── W5 — the control REST tier is unified (scope 7) ───────────────────────
    const controlRegisterDefined =
        /--control-surface-bg\s*:/.test(tokensMonolith) &&
        /--control-surface-border\s*:/.test(tokensMonolith);
    if (!controlRegisterDefined) {
        violations.push(
            "W5: the `--control-surface-*` REST register is not declared in the tokens authority (the form family is not ONE material at rest).",
        );
    }
    // The input-pill reads the shared register (the glass surface authority).
    const inputReadsRegister = /\.input-pill\s*\{[^}]*var\(--control-surface-bg\)/s.test(
        glassMonolith,
    );
    if (!inputReadsRegister) {
        violations.push(
            "W5: `.input-pill` does not read `var(--control-surface-bg)` (the input control did not re-point onto the shared register).",
        );
    }
    // The Select default trigger no longer rides the `glass-wash` gray fork.
    const selectRidesGrayWash = /:\s*['"]glass-wash['"]/.test(selectTrigger);
    if (selectRidesGrayWash) {
        violations.push(
            "W5: SelectTrigger's default variant still rides the `glass-wash` gray fork (it must read the shared --control-surface register — the no-gray control-family seam).",
        );
    }

    // ── W6 — the paper-ink-mark register (scope 8) ────────────────────────────
    // The MARK register is declared ONCE in the surface-axis seam (or typography),
    // searched in the glass monolith (which includes surface-axis.css).
    const paperMarkDefined = /\.paper-ink-mark\s*\{/.test(glassMonolith);
    if (!paperMarkDefined) {
        violations.push(
            "W6: the `.paper-ink-mark` MARK register is not declared (the 2px --foreground ink hairline — scope 8).",
        );
    }
    // ≥2 consumers: a demo demonstration (the tabs paper-underline SHAPE, after the
    // math-paper section-RAIL demo retired — UF-K3) + the W-TABS underline indicator
    // (the shipping src register). The demo consumer is scanned across demo/stories so
    // it is never brittle to one page.
    const demoConsumes = demoInkMarkConsumers.length > 0;
    const tabsConsumes = /paper-ink-mark/.test(utilitiesMonolith) ||
        /paper-ink-mark/.test(sources.segmentedTabsCss ?? "");
    const consumerCount = (demoConsumes ? 1 : 0) + (tabsConsumes ? 1 : 0);
    if (paperMarkDefined && consumerCount < 2) {
        violations.push(
            `W6: the .paper-ink-mark register has <2 consumers (demo:${demoConsumes} [${demoInkMarkConsumers.length}] tabs:${tabsConsumes}) — the ≥2-consumer bar (a demo demonstration + the shipping tabs underline).`,
        );
    }

    // (BH.B5e: the ORIGINAL W7 — the doc-honesty clause reading the glass-system
    // canon for `<Toast/Button surface=…>` examples — was DROPPED. The functional
    // Toast/Button enrollment is asserted by W3; canon authoring rides
    // proof:claude-deletable. The W7 slot was thereby FREE. BI.W-SURFACE-EXTRACT
    // RE-MINTS W7 (decorationClass-single-source) + W8 (no-component-private-surface-
    // recipe) here — the "renumber + record" the 2026-07-12 marking pass ordered: the
    // old doc-honesty W7 is dropped/dead, so re-minting the number is honest (no live
    // collision), recorded here so a reader of an old artefact citing "W7 doc-honesty"
    // sees the supersession. W9 (member-consumption) is W-CLEAR-FOLD's.)

    // ── W7 — decorationClass is the SINGLE decoration source ──────────────────
    // (BI.W-SURFACE-EXTRACT). `decorationClass` is defined EXACTLY ONCE (in
    // useSurfaceAxis.ts), AND the `surfaceClass(x).replace(/^glass-\w+\s*/, "")` DRY
    // wart is DEFINITION-ABSENT across src/ — every reka-portaled overlay + Card reach
    // the decoration through the ONE regex-free function. RED at HEAD: the wart was
    // live at 7 sites (Card + 6 overlays); `decorationClass` did not exist.
    const decorationClassDefs = (
        useSurfaceAxisTs.match(/export\s+function\s+decorationClass\b/g) || []
    ).length;
    if (decorationClassDefs !== 1) {
        violations.push(
            `W7: expected EXACTLY ONE \`export function decorationClass\` in useSurfaceAxis.ts, found ${decorationClassDefs} (the single decoration source).`,
        );
    }
    const replaceWartHits = sources.replaceWartHits ?? [];
    if (replaceWartHits.length > 0) {
        violations.push(
            `W7: the \`surfaceClass(…).replace(/^glass-…/, …)\` DRY wart survives at ${replaceWartHits.length} site(s): ${replaceWartHits.join(", ")} — every decoration must resolve via decorationClass(), regex-free.`,
        );
    }

    // ── W8 — no component-private surface recipe ──────────────────────────────
    // (BI.W-SURFACE-EXTRACT). The extracted `<Surface>` primitive EXISTS (composes
    // `glass-${tier}` × `decorationClass`), AND no enrolled content-surface SFC
    // hand-rolls a bare tier×decoration recipe OFF the seam — a hardcoded
    // `veil-surface`/`glass-opaque`/`glass-clear` template CLASS string OR an inline
    // `--glass-level: 0` opaque recipe (bypassing `surface="opaque"`). The
    // `<Surface>`/`decorationClass` seam is the ONE door. RED at HEAD: `<Surface>`
    // did not exist.
    const surfaceComponentSrc = stripHtmlComments(
        stripBlockComments(sources.surfaceComponentSrc ?? ""),
    );
    const surfaceComponentExists =
        /decorationClass\s*\(/.test(surfaceComponentSrc) &&
        /glass-\$\{/.test(surfaceComponentSrc);
    if (!surfaceComponentExists) {
        violations.push(
            "W8: the extracted `<Surface>` plate primitive (surface/Surface.vue) does not compose `glass-${tier}` × `decorationClass(surface)` — the bare tier×decoration plate is the ONE door.",
        );
    }
    // Scan the enrolled content surfaces for a hand-rolled private recipe. Card +
    // the six reka-portaled overlays are the surfaces that MUST route through the
    // seam (a literal decoration class or an inline level-0 recipe bypasses it).
    const W8_SCAN = ["card", "dialog", "sheet", "popover", "command", "drawer", "expandable"];
    // A decoration class literal is a `veil-surface`/`glass-opaque`/`glass-clear`
    // token bounded by a quote OR whitespace on BOTH sides (a class string member) —
    // so `decorationClass(surface)` (the seam) never matches, but a hand-composed
    // `'glass-floating veil-surface'` does.
    const LITERAL_DECORATION = /['"\s](?:veil-surface|glass-opaque|glass-clear)['"\s]/;
    const INLINE_LEVEL_ZERO = /--glass-level\s*:\s*['"]?\s*0\b/;
    const w8Private = [];
    for (const key of W8_SCAN) {
        const src = sfc[key] ?? "";
        if (LITERAL_DECORATION.test(src)) w8Private.push(`${key} (literal decoration class)`);
        if (INLINE_LEVEL_ZERO.test(src)) w8Private.push(`${key} (inline --glass-level:0 recipe)`);
    }
    if (w8Private.length > 0) {
        violations.push(
            `W8: a component-private surface recipe survives OFF the <Surface>/decorationClass seam: ${w8Private.join(", ")} — the decoration must resolve via decorationClass(), the opaque escape via surface="opaque".`,
        );
    }

    // ── W9 — every Surface union member is CONSUMED (BI.W-CLEAR-FOLD) ──────────
    // The vacuous-green kill: this gate asserted the members EXIST (W1/W3) but never
    // that each is USED. A union member with ZERO real (non-demo, non-self) consumer
    // in src/ is DEAD substrate — the FAM-9 `clear` class: a full mechanism shipped
    // (the maximally-translucent plate + its mandatory scrim + a token rung), its
    // consumer retired, and the gate never noticed (the substrate-without-consumer
    // invariant J-inv-10 went un-enforced on the axis). Every member of the LIVE
    // `Surface` union must resolve ≥1 consumer OR be DEFINITION-ABSENT (off the union
    // entirely — the clean-break retire). A consumer is a `surface: "M"` / `surface="M"`
    // runtime prop/default OR a `[data-surface="M"]` CSS decoration rule (both matched
    // by the `surface[:=]"M"` scan), OUTSIDE the axis-DEFINITION files (the seam is the
    // definition, not a consumer) and demo/ (src-only). RED at HEAD pre-wave: `clear`
    // rode the union with 0 real consumers.
    const surfaceMembers = parseSurfaceUnion(useSurfaceAxisTs);
    const consumers = sources.surfaceConsumers ?? {};
    const w9Dead = [];
    for (const m of surfaceMembers) {
        const count = (consumers[m] ?? []).length;
        if (count < 1) w9Dead.push(`${m} (0 consumers)`);
    }
    if (w9Dead.length > 0) {
        violations.push(
            `W9: a Surface union member is DEAD substrate (no real non-demo/non-self consumer in src/): ${w9Dead.join(", ")} — every member must resolve ≥1 consumer OR be DEFINITION-ABSENT (the FAM-9 vacuous-green kill, J-inv-10).`,
        );
    }
    // Rung-census: the retired `clear` member's rungs are DEFINITION-ABSENT (the token
    // half of the clean break — a surviving `--glass-bg-clear`/`--glass-opacity-clear`
    // is a dead rung the member no longer reads).
    const clearBgAbsent = !/--glass-bg-clear\b/.test(tokensMonolith);
    const clearOpacityAbsent = !/--glass-opacity-clear\b/.test(tokensMonolith);
    if (!clearBgAbsent) {
        violations.push(
            "W9 rung-census: `--glass-bg-clear` survives in the tokens authority (the retired clear rung must be DEFINITION-ABSENT).",
        );
    }
    if (!clearOpacityAbsent) {
        violations.push(
            "W9 rung-census: `--glass-opacity-clear` survives in the tokens authority (the retired clear rung must be DEFINITION-ABSENT).",
        );
    }
    // The --glass-bg-* rung count for the record (informational — the clear retire
    // steps it down one; the exact count also tracks the well rung the extract minted).
    const bgRungCount = new Set(
        (tokensMonolith.match(/--glass-bg-([a-z]+)\s*:/g) || []).map((s) =>
            s.replace(/\s*:$/, ""),
        ),
    ).size;

    const facts = {
        w1: {
            seamHasVeil,
            seamHasOpaque,
            veilReadsLadder,
            opaqueSetsLevel,
            forkVeil,
            forkOpaque,
            resolverDefined,
        },
        w2: { unionExported, sharedReExports, apiPublishes },
        w3: { ...w3, expandableUnwalled, skeletonOverGlass, enrolledCount },
        w4: { dialogHasVariantProp, dialogHasSurfaceProp, migrationRow },
        w5: { controlRegisterDefined, inputReadsRegister, selectRidesGrayWash },
        w6: { paperMarkDefined, demoConsumes, demoInkMarkConsumers, tabsConsumes, consumerCount },
        w7: { decorationClassDefs, replaceWartHits: replaceWartHits.length },
        w8: { surfaceComponentExists, w8Private: w8Private.length },
        w9: {
            surfaceMembers,
            deadMembers: w9Dead,
            clearBgAbsent,
            clearOpacityAbsent,
            bgRungCount,
        },
    };

    return { facts, violations };
}

// BI.W-SURFACE-EXTRACT — the self-test bites: the detector must FLAG a synthetic
// re-added `.replace()` wart (W7) and a synthetic private tier recipe (W8), and must
// GREEN a clean synthetic tree. A hollow detector (one that greens a planted
// violation) reds the gate itself. Returns a violation string on any failed bite.
export function selfTestSurfaceAxis() {
    const clean = {
        surfaceAxisCss: `@layer components { [data-surface="veil"]{--veil-bg:color-mix(in oklab,var(--glass-bg-quiet),var(--glass-tint-source) var(--glass-tint-strength))} [data-surface="opaque"]{--glass-level:0} }`,
        useSurfaceAxisTs: `export type Surface="glass"|"veil"|"opaque"; export function surfaceClass(){} export function decorationClass(){}`,
        surfaceComponentSrc: `<Primitive :class="cn(\`glass-\${tier}\`, decorationClass(surface))" />`,
        replaceWartHits: [],
        sfc: { card: `decorationClass(surface)`, dialog: `decorationClass(props.surface)` },
        // W9 — a clean tree resolves a consumer for every member + no clear rung.
        surfaceConsumers: { glass: ["x.vue"], veil: ["y.css"], opaque: ["z.vue"] },
        tokensMonolith: "",
    };
    const bites = [];
    // Bite A — a re-added `.replace` wart REDs W7.
    const wartHit = detectSurfaceAxis({ ...clean, replaceWartHits: ["src/x.vue"] });
    if (!wartHit.violations.some((v) => v.startsWith("W7"))) {
        bites.push("SELF-TEST W7-wart: a re-added `.replace` wart did NOT red W7.");
    }
    // Bite B — a missing decorationClass def REDs W7.
    const noDef = detectSurfaceAxis({
        ...clean,
        useSurfaceAxisTs: `export function surfaceClass(){}`,
    });
    if (!noDef.violations.some((v) => v.startsWith("W7"))) {
        bites.push("SELF-TEST W7-def: a missing decorationClass definition did NOT red W7.");
    }
    // Bite C — a literal private decoration string REDs W8.
    const literalHit = detectSurfaceAxis({
        ...clean,
        sfc: { ...clean.sfc, popover: `:class="'glass-floating veil-surface'"` },
    });
    if (!literalHit.violations.some((v) => v.startsWith("W8"))) {
        bites.push("SELF-TEST W8-literal: a hardcoded `veil-surface` string did NOT red W8.");
    }
    // Bite D — an inline `--glass-level: 0` private recipe REDs W8.
    const levelHit = detectSurfaceAxis({
        ...clean,
        sfc: { ...clean.sfc, command: `style="--glass-level: 0"` },
    });
    if (!levelHit.violations.some((v) => v.startsWith("W8"))) {
        bites.push("SELF-TEST W8-level: an inline `--glass-level:0` recipe did NOT red W8.");
    }
    // Bite E — a missing <Surface> primitive REDs W8.
    const noSurface = detectSurfaceAxis({ ...clean, surfaceComponentSrc: "" });
    if (!noSurface.violations.some((v) => v.startsWith("W8"))) {
        bites.push("SELF-TEST W8-missing: an absent <Surface> primitive did NOT red W8.");
    }
    // Bite F — a synthetic re-added dead union member (no consumer) REDs W9 (the
    // vacuous-green kill: a future dead member cannot ride the union again).
    const deadMember = detectSurfaceAxis({
        ...clean,
        useSurfaceAxisTs: `export type Surface="glass"|"veil"|"opaque"|"phantom"; export function surfaceClass(){} export function decorationClass(){}`,
        surfaceConsumers: { glass: ["x.vue"], veil: ["y.css"], opaque: ["z.vue"], phantom: [] },
    });
    if (!deadMember.violations.some((v) => v.startsWith("W9"))) {
        bites.push("SELF-TEST W9-dead-member: a re-added consumer-less union member did NOT red W9.");
    }
    // Bite G — a surviving `--glass-bg-clear` rung REDs the W9 rung-census (the token
    // half of the clean break).
    const deadRung = detectSurfaceAxis({
        ...clean,
        tokensMonolith: "--glass-bg-clear: color-mix(in srgb, var(--card) 58%, transparent);",
    });
    if (!deadRung.violations.some((v) => v.startsWith("W9"))) {
        bites.push("SELF-TEST W9-dead-rung: a surviving --glass-bg-clear rung did NOT red the W9 rung-census.");
    }
    return bites;
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// BI.W-SURFACE-EXTRACT (W7) — scan src/ for the `surfaceClass(…).replace(/^glass-…/`
// DRY wart. Returns the repo-relative paths still carrying it (empty when the wart is
// DEFINITION-ABSENT). Comment-stripped so a commented-out wart never counts.
const WART = /surfaceClass\s*\([^)]*\)\s*\.replace\s*\(\s*\/\^glass-/;
function scanReplaceWart(dir, root, hits = []) {
    let entries;
    try {
        entries = readdirSync(dir);
    } catch {
        return hits;
    }
    for (const name of entries) {
        if (name === "node_modules" || name === "dist" || name.startsWith(".")) continue;
        const full = resolve(dir, name);
        let st;
        try {
            st = statSync(full);
        } catch {
            continue;
        }
        if (st.isDirectory()) {
            scanReplaceWart(full, root, hits);
        } else if (name.endsWith(".vue") || name.endsWith(".ts")) {
            const body = stripHtmlComments(stripBlockComments(safeRead(full)));
            if (WART.test(body)) hits.push(full.slice(root.length + 1).replace(/\\/g, "/"));
        }
    }
    return hits;
}

// BI.W-MATH-PAPER-REMOVE (W6) — the demo-tree consumers of the `.paper-ink-mark`
// register. The overfit math-paper.vue (the sole section-RAIL demo) was retired
// (UF-K3), so the demo demonstration of the register now rides the tabs paper-underline
// SHAPE: navigation/tabs renders it and the motion stories theme it via the
// `--paper-ink-mark-color` var. Counts any demo/stories `.vue` whose comment-stripped
// body carries the register token (a `.paper-ink-mark` class OR a `--paper-ink-mark-*`
// theming var) — robust to any single page moving, never brittle to one file. Returns
// the repo-relative paths.
function scanDemoInkMarkConsumers(dir, root, hits = []) {
    let entries;
    try {
        entries = readdirSync(dir);
    } catch {
        return hits;
    }
    for (const name of entries) {
        if (name === "node_modules" || name === "dist" || name.startsWith(".")) continue;
        const full = resolve(dir, name);
        let st;
        try {
            st = statSync(full);
        } catch {
            continue;
        }
        if (st.isDirectory()) {
            scanDemoInkMarkConsumers(full, root, hits);
        } else if (name.endsWith(".vue")) {
            const body = stripHtmlComments(stripBlockComments(safeRead(full)));
            if (/paper-ink-mark/.test(body)) {
                hits.push(full.slice(root.length + 1).replace(/\\/g, "/"));
            }
        }
    }
    return hits;
}

// BI.W-CLEAR-FOLD (W9) — the src/-walker that counts each Surface member's REAL
// consumers. A consumer is a `surface: "M"` / `surface="M"` runtime prop/default OR a
// `[data-surface="M"]` CSS decoration rule (both matched by `surface[:=]"M"`), in a
// .vue/.ts/.css file OUTSIDE the axis-DEFINITION files below (the seam is the
// definition, NOT a consumer — a member with ONLY a seam rule and no consumer is dead,
// exactly the retired `clear`) and OUTSIDE demo/ (src-only, non-demo). Comment-stripped
// so a prose `<Card surface="veil">` never counts. Returns { [member]: string[] }.
const CONSUMER_EXCLUDE = new Set([
    "src/components/ui/_shared/useSurfaceAxis.ts",
    "src/components/ui/_shared/axes.ts",
    "src/styles/glass/surface-axis.css",
    "src/styles/glass/material.css",
]);
function scanSurfaceConsumers(dir, root, members, acc) {
    let entries;
    try {
        entries = readdirSync(dir);
    } catch {
        return acc;
    }
    for (const name of entries) {
        if (name === "node_modules" || name === "dist" || name.startsWith(".")) continue;
        const full = resolve(dir, name);
        let st;
        try {
            st = statSync(full);
        } catch {
            continue;
        }
        if (st.isDirectory()) {
            scanSurfaceConsumers(full, root, members, acc);
            continue;
        }
        if (!/\.(vue|ts|css)$/.test(name)) continue;
        const rel = full.slice(root.length + 1).replace(/\\/g, "/");
        if (CONSUMER_EXCLUDE.has(rel)) continue;
        const body = stripHtmlComments(stripBlockComments(safeRead(full)));
        for (const m of members) {
            const re = new RegExp(`surface\\s*[:=]\\s*["']${m}["']`);
            if (re.test(body)) acc[m].push(rel);
        }
    }
    return acc;
}

function run() {
    const P = cliPaths();
    const { ROOT } = P;

    // BI.W-CLEAR-FOLD (W9) — parse the LIVE Surface union + scan src/ for each
    // member's real consumers (the member-consumption fence).
    const surfaceMembers = parseSurfaceUnion(
        stripBlockComments(safeRead(P.USE_SURFACE_AXIS_TS)),
    );
    const surfaceConsumers = {};
    for (const m of surfaceMembers) surfaceConsumers[m] = [];
    scanSurfaceConsumers(P.SRC_DIR, ROOT, surfaceMembers, surfaceConsumers);

    const { facts, violations } = detectSurfaceAxis({
        surfaceAxisCss: safeRead(P.SURFACE_AXIS_CSS),
        glassMonolith: readMonolith(ROOT, "glass"),
        utilitiesMonolith: readMonolith(ROOT, "utilities"),
        cardsCss: safeRead(resolve(ROOT, "src/styles/cards.css")),
        tokensMonolith: readMonolith(ROOT, "tokens"),
        segmentedTabsCss: safeRead(resolve(ROOT, "src/styles/segmented-tabs.css")),
        useSurfaceAxisTs: safeRead(P.USE_SURFACE_AXIS_TS),
        sharedIndexTs: safeRead(P.SHARED_INDEX_TS),
        apiIndexTs: safeRead(P.API_INDEX_TS),
        migrationMd: safeRead(P.MIGRATION_MD),
        sfc: {
            card: safeRead(P.CARD_VUE),
            dialog: safeRead(P.DIALOG_VUE),
            drawer: safeRead(P.DRAWER_VUE),
            popover: safeRead(P.POPOVER_VUE),
            command: safeRead(P.COMMAND_VUE),
            expandable: safeRead(P.EXPANDABLE_VUE),
            skeleton: safeRead(P.SKELETON_VUE),
            toast: safeRead(P.TOAST_VUE),
            button: safeRead(P.BUTTON_VUE),
        },
        selectTrigger: safeRead(P.SELECT_TRIGGER_VUE),
        demoInkMarkConsumers: scanDemoInkMarkConsumers(P.DEMO_STORIES_DIR, ROOT),
        // BI.W-SURFACE-EXTRACT — W7/W8 inputs.
        surfaceComponentSrc: safeRead(P.SURFACE_VUE),
        replaceWartHits: scanReplaceWart(P.SRC_DIR, ROOT),
        // BI.W-CLEAR-FOLD — W9 member-consumption input.
        surfaceConsumers,
    });

    // The self-test bites — a hollow detector reds the gate itself.
    for (const bite of selfTestSurfaceAxis()) violations.push(bite);

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:surface-axis",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:surface-axis — the shared {glass·veil·opaque} surface-decoration axis (BA.W-SURFACE-AXIS)",
    );
    console.log(
        `  W1 axis factored ONCE         : ${yn(
            facts.w1.seamHasVeil &&
                facts.w1.seamHasOpaque &&
                facts.w1.veilReadsLadder &&
                facts.w1.opaqueSetsLevel &&
                facts.w1.forkVeil === 0 &&
                facts.w1.forkOpaque === 0 &&
                facts.w1.resolverDefined,
        )}  (forks veil:${facts.w1.forkVeil} opaque:${facts.w1.forkOpaque})`,
    );
    console.log(
        `  W2 resolver published         : ${yn(
            facts.w2.unionExported &&
                facts.w2.sharedReExports &&
                facts.w2.apiPublishes,
        )}`,
    );
    console.log(
        `  W3 ten surfaces thread axis: ${yn(
            !violations.some((v) => v.startsWith("W3")),
        )}  (count:${facts.w3.enrolledCount} unwalled:${yn(
            facts.w3.expandableUnwalled,
        )} skel-glass:${yn(facts.w3.skeletonOverGlass)})`,
    );
    console.log(
        `  W4 Dialog clean break         : ${yn(
            !facts.w4.dialogHasVariantProp &&
                facts.w4.dialogHasSurfaceProp &&
                facts.w4.migrationRow,
        )}`,
    );
    console.log(
        `  W5 control REST tier unified  : ${yn(
            facts.w5.controlRegisterDefined &&
                facts.w5.inputReadsRegister &&
                !facts.w5.selectRidesGrayWash,
        )}`,
    );
    console.log(
        `  W6 paper-ink-mark register    : ${yn(
            facts.w6.paperMarkDefined && facts.w6.consumerCount >= 2,
        )}  (consumers:${facts.w6.consumerCount})`,
    );
    console.log(
        `  W7 decorationClass single-src : ${yn(
            facts.w7.decorationClassDefs === 1 && facts.w7.replaceWartHits === 0,
        )}  (defs:${facts.w7.decorationClassDefs} .replace-warts:${facts.w7.replaceWartHits})`,
    );
    console.log(
        `  W8 no private-surface recipe  : ${yn(
            facts.w8.surfaceComponentExists && facts.w8.w8Private === 0,
        )}  (<Surface>:${yn(facts.w8.surfaceComponentExists)} private:${facts.w8.w8Private})`,
    );
    console.log(
        `  W9 every member consumed      : ${yn(
            !violations.some((v) => v.startsWith("W9")),
        )}  (members:[${facts.w9.surfaceMembers.join(",")}] dead:${
            facts.w9.deadMembers.length
        } clear-rung-absent:${yn(
            facts.w9.clearBgAbsent && facts.w9.clearOpacityAbsent,
        )} bg-rungs:${facts.w9.bgRungCount})`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
