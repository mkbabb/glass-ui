#!/usr/bin/env node
// proof:dropdown-fix — BC.W-DROPDOWN-FIX: the picker opens without shifting the
// trigger, aligns to it, and the selected dot reads (never occluded).
//
// USER-DEFECTS §F: "the DROPDOWN: clicking it shifts the trigger left + right; the
// dropdown is not spaced/aligned; the dropdown dot is totally wrong + occluded."
// THREE coordinated roots (all live-probed at /forms/select, GPU Playwright):
//   1. the trigger SHIFTS — the body scroll-lock removes a classic scrollbar with
//      no gutter compensation, the centred content reflows wider → the trigger
//      twitches. FIX: `scrollbar-gutter: stable` on the route scroller (RESERVE
//      the gutter whether or not the bar is present).
//   2. the panel is MISALIGNED + narrower than the trigger — `align: 'center'`
//      floats a narrow panel off-axis. FIX: `align: 'start'` (the panel's left
//      edge tracks the trigger's left edge) + the trigger-width floor.
//   3. the selected dot has NO reserved gutter — it sits over the label. FIX: the
//      dot `<span>` renders IFF the resolved indicator !== 'none' (the `pl-7`
//      28px gutter), structurally coupled so a dot is never painted without its
//      lane.
//
// This is the device-free SOURCE arm (`["local","ci","release"]`). The PAINTED
// truth — the trigger does NOT move on open, the panel drops flush-left under the
// trigger at its width, each option's dot sits in a clear left gutter, the reka
// combobox/listbox/option aria contract intact — is the π readback
// tests-visual/dropdown-fix.spec.ts (orchestrator-driven), NEVER this gate alone
// (the cardinal split). proof:no-layout-animation stays GREEN; proof:menu-glass
// stays GREEN (the row material is untouched).
//
// FIVE falsifiable witnesses (each born-RED at HEAD pre-wave, GREEN at the fix):
//   D1 — picker alignment is `start` on BOTH picker Content SFCs.
//   D2 — the dot gutter is structurally coupled (dot renders IFF indicator !==
//        'none'; the dot is decorative aria-hidden, never hijacking role=option).
//   D3 — the no-shift discipline is present (the demo scroller + the library util
//        + the canon note).
//   D4 — the picker panel reads the trigger width (the floor survives the align
//        change).
//   D5 — the reka picker aria contract is intact (no conflicting aria-expanded on
//        a presentational wrapper; the dot stays decorative; the no-shift fix is a
//        pure layout reservation, never an overflow/position change that breaks
//        the focus trap).
//   + a self-test bite per clause (--self-test): a center default reds, a
//     dot-without-gutter reds, a missing scroll-gutter reds, a planted
//     aria-expanded on the panel wrapper reds, a non-decorative dot reds.
//
// House style mirrors proof-menu-glass.mjs / proof-no-shadcn-default.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, exit(1) on violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";
import { readCanon } from "./lib/canon-doc.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ui = (p) => resolve(ROOT, "src/components/ui", p);
    _cliPaths = {
        ROOT,
        SELECT_CONTENT: ui("select/SelectContent.vue"),
        SELECT_ITEM: ui("select/SelectItem.vue"),
        DROPDOWN_CONTENT: ui("dropdown-menu/DropdownMenuContent.vue"),
        MENU_VARIANTS: ui("_shared/menuItemVariants.ts"),
        BASE_MISC_CSS: resolve(ROOT, "src/styles/utilities/base-misc.css"),
        DOCK_NAV_CSS: resolve(ROOT, "demo/shell/dock-nav.css"),
        ARTIFACT: gateArtifactPath(
            "GATE_DROPDOWN_FIX_OUT",
            "BC-dropdown-fix",
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

// Strip Vue SFC `<!-- … -->` HTML comments — a commented-out template must not
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

// HTML comments are stripped FIRST so a `/* … */` or `//` sequence INSIDE an
// SFC `<!-- … -->` comment (e.g. the `dist/*.js` mention in SelectContent's
// BA.W-EMISSION note) cannot be mis-read as a JS block/line comment that swallows
// the live template below it.
const stripVue = (s) => stripBlockComments(stripHtmlComments(s));

/**
 * The W-DROPDOWN-FIX detector. Pure: takes the comment-stripped sources, returns
 * `{ facts, violations }`. Each witness pushes a falsifiable violation string.
 */
export function detectDropdownFix(sources) {
    const selectContent = stripVue(sources.selectContent ?? "");
    const selectItem = stripVue(sources.selectItem ?? "");
    const dropdownContent = stripVue(sources.dropdownContent ?? "");
    const menuVariants = stripBlockComments(sources.menuVariants ?? "");
    const baseMiscCss = stripBlockComments(sources.baseMiscCss ?? "");
    const dockNavCss = stripBlockComments(sources.dockNavCss ?? "");
    const claudeMd = sources.claudeMd ?? "";

    const violations = [];

    // ── D1 — picker alignment is `start` on BOTH picker Content SFCs ──────────
    // The `align` default in the withDefaults block resolves to 'start' (not
    // 'center', not unset → reka's center). Match the literal `align: 'start'` /
    // `align: "start"` in the SOURCE (the withDefaults object).
    const selectAlignStart = /\balign\s*:\s*['"]start['"]/.test(selectContent);
    const selectAlignCenter = /\balign\s*:\s*['"]center['"]/.test(selectContent);
    const dropdownAlignStart =
        /\balign\s*:\s*['"]start['"]/.test(dropdownContent);
    const dropdownAlignCenter =
        /\balign\s*:\s*['"]center['"]/.test(dropdownContent);
    if (!selectAlignStart) {
        violations.push(
            "D1: SelectContent.vue's `withDefaults` does not default `align: 'start'` (HEAD was `align: 'center'` — the panel floats centred + off-axis under a wide trigger; the panel's left edge must track the trigger's left edge).",
        );
    }
    if (selectAlignCenter) {
        violations.push(
            "D1: SelectContent.vue still carries an `align: 'center'` DEFAULT (the off-axis float — clean break, the default flips to 'start'; a consumer wanting centre passes the prop explicitly).",
        );
    }
    if (!dropdownAlignStart) {
        violations.push(
            "D1: DropdownMenuContent.vue's `withDefaults` does not add `align: 'start'` (HEAD left it unset → reka's `center` default applied — the same off-axis float; mirror the Select default, one alignment grammar across the picker family).",
        );
    }
    if (dropdownAlignCenter) {
        violations.push(
            "D1: DropdownMenuContent.vue carries an `align: 'center'` DEFAULT (the off-axis float — the picker family aligns 'start').",
        );
    }

    // ── D2 — the dot gutter is structurally coupled ───────────────────────────
    // The resolved indicator value drives BOTH the gutter (menuItemVariants) AND
    // the dot `<span>` render. POSITIVE: the indicator-bearing default resolves
    // `menuItemVariants({ indicator: 'start' })` (the pl-7 gutter — reserved when
    // a dot renders). We assert the SFC composes `menuItemVariants` with an
    // `indicator` arg that resolves to 'start' on the default (not hard-'none').
    const itemComposesIndicatorStart =
        // the computed `indicator` is wired to 'start' on the default
        /['"]start['"]/.test(selectItem) &&
        /menuItemVariants\(\{\s*indicator\b/.test(selectItem);
    if (!itemComposesIndicatorStart) {
        violations.push(
            "D2: SelectItem.vue does not resolve `menuItemVariants({ indicator: 'start' })` on the dot-bearing default (the pl-7 28px gutter — the dot must always reserve its lane; HEAD's live `padding-left: 0px` was the gutter collapsed).",
        );
    }
    // The pl-7 gutter exists on the `start` arm of the shared CVA (the gutter
    // magnitude the dot sits inside). The dot at left-2 (8px) clears the label
    // that starts at the pl-7 (28px) gutter.
    const cvaStartReservesGutter =
        /start\s*:\s*['"]pl-7\b/.test(menuVariants) ||
        /start\s*:\s*\[?\s*['"]pl-7\b/.test(menuVariants);
    if (!cvaStartReservesGutter) {
        violations.push(
            "D2: menuItemVariants' `indicator: 'start'` arm does not reserve `pl-7` (the 28px dot gutter the SelectItem dot sits inside — the structural lane).",
        );
    }
    // STRUCTURAL COUPLING (the anti-evasion bite): the dot `<span>` renders ONLY
    // when the resolved indicator !== 'none' — NOT a sibling that paints
    // unconditionally. The dot `<span>` carries a `v-if` gated on the same
    // resolved indicator (or its `hideIndicator` source). A dot painted while the
    // gutter collapses is the occlusion class — forbidden by construction.
    const dotGatedOnIndicator =
        /v-if\s*=\s*"indicator\s*!==\s*['"]none['"]"/.test(selectItem) ||
        /v-if\s*=\s*"!hideIndicator"/.test(selectItem);
    if (!dotGatedOnIndicator) {
        violations.push(
            "D2: the dot `<span>` is not gated on the resolved indicator (`v-if=\"indicator !== 'none'\"`) — a dot painted without its reserved gutter is the occlusion class; the dot-render and the pl-7 gutter must be STRUCTURALLY coupled.",
        );
    }
    // The dot is DECORATIVE (aria-hidden) — the selected state is reka's
    // aria-selected on the role=option row, not the dot paint (AN.W4 discipline).
    const dotIsDecorative =
        /<span[^>]*v-if\s*=\s*"[^"]*indicator[^"]*"[^>]*aria-hidden/.test(
            selectItem,
        ) ||
        /aria-hidden\s*=\s*"true"[^>]*>\s*<SelectItemIndicator/.test(selectItem) ||
        /v-if\s*=\s*"indicator[^"]*"\s+aria-hidden/.test(selectItem);
    if (!dotIsDecorative) {
        violations.push(
            "D2: the dot `<span>` is not marked `aria-hidden` (it must be DECORATIVE — the a11y selected-state is reka's `aria-selected` on the role=option row, not the dot paint; AN.W4 decorative-glyph discipline).",
        );
    }

    // ── D3 — the no-shift discipline is present ───────────────────────────────
    // The demo route scroller carries `scrollbar-gutter: stable`.
    const scrollerHasGutter =
        /\.demo-main-scroller\s*\{[^}]*scrollbar-gutter\s*:\s*stable/.test(
            dockNavCss,
        );
    if (!scrollerHasGutter) {
        violations.push(
            "D3: the `.demo-main-scroller` route scroller does not carry `scrollbar-gutter: stable` (the no-shift discipline — without the reserved gutter the body scroll-lock removes a classic scrollbar and the centred content reflows, the trigger twitches).",
        );
    }
    // The library ships the named `.scroll-gutter-stable` utility (the durable
    // contribution — a consumer app-shell inherits the no-shift discipline).
    const libUtilExists =
        /\.scroll-gutter-stable\s*\{[^}]*scrollbar-gutter\s*:\s*stable/.test(
            baseMiscCss,
        );
    if (!libUtilExists) {
        violations.push(
            "D3: the library does not ship the `.scroll-gutter-stable` utility (`scrollbar-gutter: stable`) in utilities/base-misc.css (the durable presets-in-consumers contribution — a consumer app-shell opts in, not just the demo).",
        );
    }
    // The canon note exists (the consumer-facing discipline is documented).
    const canonNoteExists =
        /scroll-gutter-stable/.test(claudeMd) &&
        /scrollbar-gutter:\s*stable/.test(claudeMd);
    if (!canonNoteExists) {
        violations.push(
            "D3: the consumer-wiring canon (docs/canon/consumer-wiring.md) does not document the `.scroll-gutter-stable` discipline (the consumer-facing presets-in-consumers note — a portaled-overlay-hosting app-shell scroller opts into stable gutter).",
        );
    }

    // ── D4 — the picker panel reads the trigger width ─────────────────────────
    // The SelectContent viewport reads `min-w-(--reka-select-trigger-width)` (the
    // panel is AT LEAST trigger-width — the floor survives the `align` change so
    // the start-aligned panel drops at the trigger's width, not narrower).
    const panelReadsTriggerWidth = /min-w-\(--reka-select-trigger-width\)/.test(
        selectContent,
    );
    if (!panelReadsTriggerWidth) {
        violations.push(
            "D4: SelectContent's viewport no longer reads `min-w-(--reka-select-trigger-width)` (the trigger-width floor must survive the align change — the start-aligned panel drops at the trigger's width, not a narrow box).",
        );
    }

    // ── D5 — the reka picker aria contract is intact ──────────────────────────
    // The align/gutter changes are POSITIONING + LAYOUT only. The SFC must add NO
    // conflicting `aria-expanded` on a non-interactive panel wrapper (the AM.W0
    // GlassDock-gap-3 lesson — aria-expanded belongs on the reka trigger, never a
    // presentational <div>). Neither Content SFC writes aria-expanded.
    const selectNoAriaExpanded = !/aria-expanded/.test(selectContent);
    const dropdownNoAriaExpanded = !/aria-expanded/.test(dropdownContent);
    if (!selectNoAriaExpanded) {
        violations.push(
            "D5: SelectContent.vue writes an `aria-expanded` (forbidden — the expand state belongs on reka's role=combobox SelectTrigger, never a presentational panel wrapper; the AM.W0 lesson). The align re-default is positioning only, never an aria change.",
        );
    }
    if (!dropdownNoAriaExpanded) {
        violations.push(
            "D5: DropdownMenuContent.vue writes an `aria-expanded` (forbidden — the expand state belongs on reka's DropdownMenuTrigger).",
        );
    }
    // The no-shift fix is a PURE LAYOUT RESERVATION — `scrollbar-gutter`, never an
    // `overflow`/`position` change on the scroller that would break reka's
    // FocusScope trap. The scroller rule carries scrollbar-gutter, not a new
    // overflow/position override introduced by THIS wave (the demo-main-scroller
    // already declares overflow-y-auto via its utility class, NOT a CSS-rule
    // override added here). Assert the no-shift mechanism is `scrollbar-gutter`.
    const noShiftIsGutterReservation =
        scrollerHasGutter &&
        // the scroller rule does NOT introduce a `position:` change as the
        // no-shift mechanism (the gutter is the fix, never a positioning hack).
        !/\.demo-main-scroller\s*\{[^}]*position\s*:/.test(dockNavCss);
    if (!noShiftIsGutterReservation) {
        violations.push(
            "D5: the no-shift fix is not a pure `scrollbar-gutter` layout reservation (it must NEVER be an overflow/position change on the scroller that would break reka's FocusScope trap — the gutter reservation does not touch focus management).",
        );
    }

    const facts = {
        d1: {
            selectAlignStart,
            selectAlignCenter,
            dropdownAlignStart,
            dropdownAlignCenter,
        },
        d2: {
            itemComposesIndicatorStart,
            cvaStartReservesGutter,
            dotGatedOnIndicator,
            dotIsDecorative,
        },
        d3: { scrollerHasGutter, libUtilExists, canonNoteExists },
        d4: { panelReadsTriggerWidth },
        d5: {
            selectNoAriaExpanded,
            dropdownNoAriaExpanded,
            noShiftIsGutterReservation,
        },
    };

    return { facts, violations };
}

// ── The self-test (--self-test) — each clause's bite has teeth ────────────────
// A planted defect of each class MUST flag. Runs over synthetic fixtures (no live
// page, no real files) so the bite is provable every run.
function selfTest() {
    const failures = [];
    const expectViolation = (label, sources, needle) => {
        const { violations } = detectDropdownFix(sources);
        const hit = violations.some((v) => v.includes(needle));
        if (!hit) failures.push(`${label}: expected a violation containing "${needle}" — none fired`);
    };
    const expectClean = (label, sources) => {
        const { violations } = detectDropdownFix(sources);
        if (violations.length > 0)
            failures.push(`${label}: expected ZERO violations, got ${violations.length} (${violations[0]})`);
    };

    // The CLEAN fixture — every clause satisfied (the GREEN state).
    const clean = {
        selectContent:
            "withDefaults(p, { position: 'popper', align: 'start', collisionPadding: 16 }) min-w-(--reka-select-trigger-width)",
        selectItem:
            "const indicator = computed(() => props.hideIndicator ? 'none' : 'start'); menuItemVariants({ indicator }) <span v-if=\"indicator !== 'none'\" aria-hidden=\"true\"><SelectItemIndicator>",
        dropdownContent: "withDefaults(p, { sideOffset: 4, align: 'start' })",
        menuVariants: "indicator: { none: 'px-2', start: 'pl-7 pr-2' }",
        baseMiscCss: ".scroll-gutter-stable { scrollbar-gutter: stable; }",
        dockNavCss: ".demo-main-scroller { scroll-timeline-name: --x; scrollbar-gutter: stable; }",
        claudeMd: "`.scroll-gutter-stable` — scrollbar-gutter: stable on the route scroller",
    };
    expectClean("clean-fixture", clean);

    // D1 bite — a planted `align: 'center'` default reds.
    expectViolation(
        "d1-center-default",
        { ...clean, selectContent: "withDefaults(p, { align: 'center' }) min-w-(--reka-select-trigger-width)" },
        "align: 'center'",
    );
    // D2 bite — a dot painted without its gutter (unconditional `<span>`, no v-if).
    expectViolation(
        "d2-dot-without-gutter",
        { ...clean, selectItem: "menuItemVariants({ indicator: 'none' }) <span aria-hidden=\"true\"><SelectItemIndicator>" },
        "STRUCTURALLY coupled",
    );
    // D2 bite — a non-decorative dot (no aria-hidden — would hijack role=option).
    expectViolation(
        "d2-non-decorative-dot",
        { ...clean, selectItem: "const indicator = 'start'; menuItemVariants({ indicator }) <span v-if=\"indicator !== 'none'\"><SelectItemIndicator>" },
        "DECORATIVE",
    );
    // D3 bite — a missing scroll-gutter on the scroller reds.
    expectViolation(
        "d3-missing-scroll-gutter",
        { ...clean, dockNavCss: ".demo-main-scroller { scroll-timeline-name: --x; }" },
        "scrollbar-gutter: stable",
    );
    // D5 bite — a planted aria-expanded on the panel wrapper reds.
    expectViolation(
        "d5-planted-aria-expanded",
        { ...clean, selectContent: "withDefaults(p, { align: 'start' }) min-w-(--reka-select-trigger-width) aria-expanded=\"true\"" },
        "aria-expanded",
    );

    return failures;
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
    const wantSelfTest = process.argv.includes("--self-test");

    const { facts, violations } = detectDropdownFix({
        selectContent: safeRead(P.SELECT_CONTENT),
        selectItem: safeRead(P.SELECT_ITEM),
        dropdownContent: safeRead(P.DROPDOWN_CONTENT),
        menuVariants: safeRead(P.MENU_VARIANTS),
        baseMiscCss: safeRead(P.BASE_MISC_CSS),
        dockNavCss: safeRead(P.DOCK_NAV_CSS),
        claudeMd: readCanon("consumer-wiring", "soft"), // BH.B5c re-home off CLAUDE.md
    });

    const selfTestFailures = wantSelfTest ? selfTest() : [];
    const allViolations = [
        ...violations,
        ...selfTestFailures.map((f) => `SELF-TEST ${f}`),
    ];
    const status = allViolations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        gate: "proof:dropdown-fix",
        command: "npm run proof:dropdown-fix",
        note: "SOURCE arm only — the captured-paint truth (the trigger does NOT shift on open, the panel drops flush-left under the trigger at its width, each option's dot sits in a clear left gutter, the reka combobox/listbox/option aria contract intact, BOTH modes + WebKit, with a forced classic scrollbar) is tests-visual/dropdown-fix.spec.ts (the π arm, orchestrator-driven), never this gate alone.",
        facts,
        violations: allViolations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:dropdown-fix — the picker no-shift + aligned + dot-not-occluded (BC.W-DROPDOWN-FIX)",
    );
    console.log(
        `  D1 picker alignment is 'start'  : ${yn(
            facts.d1.selectAlignStart &&
                !facts.d1.selectAlignCenter &&
                facts.d1.dropdownAlignStart &&
                !facts.d1.dropdownAlignCenter,
        )}  (select:${yn(facts.d1.selectAlignStart)} dropdown:${yn(
            facts.d1.dropdownAlignStart,
        )})`,
    );
    console.log(
        `  D2 dot gutter coupled + aria-hid: ${yn(
            facts.d2.itemComposesIndicatorStart &&
                facts.d2.cvaStartReservesGutter &&
                facts.d2.dotGatedOnIndicator &&
                facts.d2.dotIsDecorative,
        )}  (gated:${yn(facts.d2.dotGatedOnIndicator)} decorative:${yn(
            facts.d2.dotIsDecorative,
        )})`,
    );
    console.log(
        `  D3 no-shift discipline present  : ${yn(
            facts.d3.scrollerHasGutter &&
                facts.d3.libUtilExists &&
                facts.d3.canonNoteExists,
        )}  (scroller:${yn(facts.d3.scrollerHasGutter)} util:${yn(
            facts.d3.libUtilExists,
        )} canon:${yn(facts.d3.canonNoteExists)})`,
    );
    console.log(
        `  D4 panel reads trigger width    : ${yn(facts.d4.panelReadsTriggerWidth)}`,
    );
    console.log(
        `  D5 reka aria contract intact    : ${yn(
            facts.d5.selectNoAriaExpanded &&
                facts.d5.dropdownNoAriaExpanded &&
                facts.d5.noShiftIsGutterReservation,
        )}  (no-panel-aria-expanded:${yn(
            facts.d5.selectNoAriaExpanded && facts.d5.dropdownNoAriaExpanded,
        )} gutter-reservation:${yn(facts.d5.noShiftIsGutterReservation)})`,
    );
    if (wantSelfTest) {
        console.log(
            `  self-test bites                 : ${yn(
                selfTestFailures.length === 0,
            )}  (${selfTestFailures.length} failure(s))`,
        );
    }

    if (allViolations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of allViolations) console.log(`  ✗ ${v}`);
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
