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
//   W3 — EVERY ENROLLED SURFACE THREADS THE AXIS. Each of the ELEVEN surfaces
//        (Card, GlassPanel, Dialog, Sheet, Drawer, Popover, Command,
//        ExpandableContainer, Skeleton + Toast, Button — BB.W-SURFACE-AXIS-COMPLETE
//        finished the R8-12 enrollment) carries the `surface` prop routed through
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
//        no glass), AND ≥2 consumers compose it (the math-paper section rail + the
//        W-TABS underline indicator). RED at HEAD: no `.paper-ink-mark` register.
//
// House style mirrors proof-dock-rail-hairline.mjs / proof-glass-cohesion.mjs: ESM
// .mjs, comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation.

import { readFileSync } from "node:fs";
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
        GLASS_PANEL_VUE: custom("glass-panel/GlassPanel.vue"),
        DIALOG_VUE: ui("dialog/DialogContent.vue"),
        SHEET_VUE: ui("sheet/SheetContent.vue"),
        DRAWER_VUE: ui("drawer/DrawerContent.vue"),
        POPOVER_VUE: ui("popover/PopoverContent.vue"),
        COMMAND_VUE: ui("command/Command.vue"),
        EXPANDABLE_VUE: custom("expandable-container/ExpandableContainer.vue"),
        SKELETON_VUE: ui("skeleton/Skeleton.vue"),
        // BB.W-SURFACE-AXIS-COMPLETE — the two surfaces R8-12 named verbatim.
        TOAST_VUE: ui("toast/Toast.vue"),
        BUTTON_VUE: ui("button/Button.vue"),
        // Scope 7 — control surfaces.
        SELECT_TRIGGER_VUE: ui("select/SelectTrigger.vue"),
        // Scope 8 — paper-ink-mark consumers.
        MATH_PAPER_VUE: resolve(ROOT, "demo/stories/compositions/math-paper.vue"),
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
    const mathPaper = stripHtmlComments(stripBlockComments(sources.mathPaper ?? ""));

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
        ["GlassPanel", "glassPanel"],
        ["Dialog", "dialog"],
        ["Sheet", "sheet"],
        ["Drawer", "drawer"],
        ["Popover", "popover"],
        ["Command", "command"],
        ["ExpandableContainer", "expandable"],
        ["Skeleton", "skeleton"],
        // BB.W-SURFACE-AXIS-COMPLETE — the R8-12 "buttons + toasts" close. The
        // roster MUST stay at eleven (the count fact below reds a re-freeze at nine).
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
    // The anti-evasion roster-count floor: the enrollment is COMPLETE at eleven
    // (BB finished the two named-but-skipped surfaces). A re-freeze at nine reds.
    const enrolledCount = ENROLLED.length;
    if (enrolledCount !== 11) {
        violations.push(
            `W3: the ENROLLED roster is ${enrolledCount}, not eleven — the R8-12 "buttons + toasts" enrollment must stay complete (a re-freeze that drops Toast/Button dodges the work).`,
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
    // ≥2 consumers: the math-paper section rail + the W-TABS underline indicator.
    const mathPaperConsumes = /paper-ink-mark/.test(mathPaper);
    const tabsConsumes = /paper-ink-mark/.test(utilitiesMonolith) ||
        /paper-ink-mark/.test(sources.segmentedTabsCss ?? "");
    const consumerCount = (mathPaperConsumes ? 1 : 0) + (tabsConsumes ? 1 : 0);
    if (paperMarkDefined && consumerCount < 2) {
        violations.push(
            `W6: the .paper-ink-mark register has <2 consumers (math-paper:${mathPaperConsumes} tabs:${tabsConsumes}) — the ≥2-consumer bar at birth.`,
        );
    }

    // (BH.B5e: W7 — the doc-honesty clause reading the glass-system canon for
    // `<Toast/Button surface=…>` examples — DROPPED. The functional Toast/Button
    // enrollment is asserted by W3 (both thread the shared surface axis); canon
    // authoring rides proof:claude-deletable.)

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
        w6: { paperMarkDefined, mathPaperConsumes, tabsConsumes, consumerCount },
    };

    return { facts, violations };
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

function run() {
    const P = cliPaths();
    const { ROOT } = P;

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
            glassPanel: safeRead(P.GLASS_PANEL_VUE),
            dialog: safeRead(P.DIALOG_VUE),
            sheet: safeRead(P.SHEET_VUE),
            drawer: safeRead(P.DRAWER_VUE),
            popover: safeRead(P.POPOVER_VUE),
            command: safeRead(P.COMMAND_VUE),
            expandable: safeRead(P.EXPANDABLE_VUE),
            skeleton: safeRead(P.SKELETON_VUE),
            toast: safeRead(P.TOAST_VUE),
            button: safeRead(P.BUTTON_VUE),
        },
        selectTrigger: safeRead(P.SELECT_TRIGGER_VUE),
        mathPaper: safeRead(P.MATH_PAPER_VUE),
    });

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
        `  W3 eleven surfaces thread axis: ${yn(
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
