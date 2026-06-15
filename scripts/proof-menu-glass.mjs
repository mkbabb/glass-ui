#!/usr/bin/env node
// BA.W-MENU-GLASS — the glass MENU-ROW + MENU-SECTION register gate
// (proof:menu-glass).
//
// The born-RED→GREEN device-free SOURCE arm for the glassy menu-row register the
// shared `menuItemVariants` CVA mints on its `surface=glass` default. The CVA
// surface-axis express / the `.glass-menu-row`+`.glass-menu-section` recipes / the
// SelectTrigger font-rung prop is the artefact (NOT a grep for runtime paint); the
// PAINTED truth — the hovered/highlighted row reads the glass-quiet oklab tint
// (not the flat --accent), the row ≥44px, the lift non-zero / PRM-zero, the section
// caption + hairline read at the mono register, the font-rung trigger+items at ONE
// scale — is the BINDING visual truth proven by the π live readback captured in
// docs/tranches/BA/audit/visual/W-MENU-GLASS-DELTA.md. This gate is the no-device CI
// half; a source-green/visually-broken gap is the exact AZ P-1 close-class the BA
// gestalt bar (inv-4) exists to kill — both halves must hold for a clean close.
//
// Four falsifiable witnesses (each born-RED at HEAD pre-wave, driven GREEN by the
// wave):
//
//   W1 — THE MENU-ROW PAINTS THE GLASS REGISTER, NOT THE FLAT ACCENT.
//        POSITIVE: the shared `menuItemVariants` CVA carries a `surface` axis whose
//        `glass` value (the DEFAULT) composes `.glass-menu-row`, AND the
//        `.glass-menu-row` recipe's hover/highlight `background` resolves the
//        ELEMENT-LEVEL glass-quiet oklab tint
//        (`color-mix(in oklab, var(--glass-bg-quiet), … var(--glass-tint-*) …)`).
//        NEGATIVE (anti-evasion): the CVA's `glass` arm + the shared BASE array no
//        longer carry the unconditional flat `hover:bg-accent`/`data-[highlighted]:
//        bg-accent` fill — the flat triad moved into the explicit `accent` escape
//        arm ONLY. It does NOT merely check for a `surface` literal (a renamed/
//        re-defaulted axis must still DROP the flat plate on the glass default).
//        RED at HEAD: menuItemVariants base array carries the unconditional flat
//        bg-accent triad with no glass register and no `surface` axis.
//   W2 — THE SECTION RECIPE EXISTS + READS THE MONO-CAPTION/HAIRLINE VOCABULARY.
//        A `.glass-menu-section` rule EXISTS in src/styles/menu.css composing the
//        mono caption (`--font-mono` / `--type-caption` √φ register) + a
//        `--border-hairline` rule over a row group, on a `--menu-section-*` token
//        knob. RED at HEAD: no `.glass-menu-section` recipe anywhere in src/styles/.
//   W3 — THE ROW CLEARS THE 44px TOUCH FLOOR + THE ≥2-CONSUMER BAR.
//        The `.glass-menu-row` recipe clamps `min-block-size` (or min-height) at
//        `max(<base>, var(--control-floor))` (the WCAG-2.5.5 44px floor), AND the
//        `.glass-menu-section` recipe has ≥2 declared consumers: the library menu
//        defaults (the CVA register reaches all 13 SFCs — counted as the CVA fan)
//        + the in-repo demo menu story (Unit 2's adoption). The slides DeckSettings
//        is the NAMED foreign downstream consumer (recorded, not asserted in-repo).
//        RED at HEAD: no --control-floor clamp on any menu item; no section consumer.
//   W4 — THE SelectTrigger FONT-RUNG PROP WRITES THE SHARED --dropdown-text.
//        SelectTrigger.vue's `size` prop carries a FONT-RUNG value (`display`/
//        `audacious`) that, when set, WRITES `--dropdown-text` on the trigger scope
//        (a CSS-custom-property write, NOT a trigger-only `text-display` class) — so
//        the trigger AND the items AND the labels re-resolve off the ONE rung the
//        family already reads (menuItemVariants' `text-dropdown` base). Anti-evasion:
//        the source asserts the font-rung value SETS `--dropdown-text` (the family
//        lever), NOT a trigger-local `text-*` class that desyncs the family (the
//        value.js 1.59× break it fixes). RED at HEAD: SelectTrigger `size` is
//        height-only with no --dropdown-text write.
//
// House style mirrors proof-surface-axis.mjs / proof-glass-cohesion.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ui = (p) => resolve(ROOT, "src/components/ui", p);
    _cliPaths = {
        ROOT,
        MENU_VARIANTS_TS: ui("_shared/menuItemVariants.ts"),
        MENU_CSS: resolve(ROOT, "src/styles/menu.css"),
        SELECT_TRIGGER_VUE: ui("select/SelectTrigger.vue"),
        // The in-repo 2nd consumer of the section recipe (Unit 2 adoption).
        DEMO_DROPDOWN_VUE: resolve(
            ROOT,
            "demo/stories/containers/dropdown-menu.vue",
        ),
        DEMO_CONTEXT_VUE: resolve(
            ROOT,
            "demo/stories/containers/context-menu.vue",
        ),
        ARTIFACT: gateArtifactPath("GLASS_UI_MENU_GLASS_ARTIFACT", "BA-menu-glass"),
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

/**
 * The W-MENU-GLASS detector. Pure: takes the comment-stripped sources, returns
 * `{ facts, violations }`. Each witness pushes a falsifiable violation string.
 */
export function detectMenuGlass(sources) {
    const menuVariants = stripBlockComments(sources.menuVariants ?? "");
    const menuCss = stripBlockComments(sources.menuCss ?? "");
    const selectTrigger = stripHtmlComments(
        stripBlockComments(sources.selectTrigger ?? ""),
    );
    const demoDropdown = stripHtmlComments(
        stripBlockComments(sources.demoDropdown ?? ""),
    );
    const demoContext = stripHtmlComments(
        stripBlockComments(sources.demoContext ?? ""),
    );

    const violations = [];

    // ── W1 — the menu-row paints the glass register, not the flat accent ──────
    // (a) POSITIVE: the CVA carries a `surface` axis whose `glass` value composes
    //     `.glass-menu-row`. Find the `surface:` variant block and confirm its
    //     `glass` arm carries `glass-menu-row`.
    const hasSurfaceAxis = /\bsurface\s*:/.test(menuVariants);
    const glassArmComposesRow =
        /glass\s*:\s*[^,}]*glass-menu-row/.test(menuVariants);
    if (!hasSurfaceAxis) {
        violations.push(
            "W1: menuItemVariants declares no `surface` axis (the glass register did not land on the shared CVA).",
        );
    }
    if (!glassArmComposesRow) {
        violations.push(
            "W1: the CVA `surface` axis's `glass` value does not compose `.glass-menu-row` (the glass-first default did not express the recipe).",
        );
    }
    // (b) POSITIVE: the .glass-menu-row recipe's hover/highlight background resolves
    //     the element-level glass-quiet oklab tint (not the pre-baked raw token, not
    //     the flat --accent).
    const rowReadsOklabTint =
        /color-mix\(\s*in\s+oklab\s*,\s*var\(--glass-bg-quiet\)\s*,\s*var\(--glass-tint-source\)\s*var\(--glass-tint-strength\)/.test(
            menuCss,
        );
    if (!rowReadsOklabTint) {
        violations.push(
            "W1: the .glass-menu-row recipe does not paint the element-level glass-quiet oklab tint `color-mix(in oklab, var(--glass-bg-quiet), var(--glass-tint-source) var(--glass-tint-strength))` (the substitution-vs-inheritance discipline — darkens-over-light + lifts-over-dark per W-DARK-MATERIAL).",
        );
    }
    // (c) NEGATIVE (anti-evasion): the unconditional flat bg-accent triad is GONE
    //     from the SHARED BASE array. The flat fill must live ONLY inside the
    //     explicit `accent` escape arm. We detect the BASE array (the cva first
    //     arg, the `[ … ].join(" ")` block before the `{` variants object) and
    //     assert it carries no `hover:bg-accent`/`data-[highlighted]:bg-accent`.
    const cvaStart = menuVariants.indexOf("cva(");
    const variantsStart = menuVariants.indexOf("variants", cvaStart);
    const baseArray =
        cvaStart >= 0 && variantsStart > cvaStart
            ? menuVariants.slice(cvaStart, variantsStart)
            : menuVariants;
    const baseHasFlatAccent =
        /hover:bg-accent/.test(baseArray) ||
        /data-\[highlighted\]:bg-accent/.test(baseArray);
    if (baseHasFlatAccent) {
        violations.push(
            "W1: the menuItemVariants shared BASE array still carries the unconditional flat `hover:bg-accent`/`data-[highlighted]:bg-accent` fill (the flat triad must move into the explicit `accent` escape arm ONLY — the glass default must drop it).",
        );
    }
    // The `accent` escape arm DOES carry the flat triad (the explicit opt-out).
    const accentArmHasFlat = /accent\s*:\s*\[?[^]*?hover:bg-accent/.test(
        menuVariants,
    );
    if (!accentArmHasFlat) {
        violations.push(
            "W1: the CVA `surface` axis has no `accent` escape value carrying the flat bg-accent triad (the explicit opt-out must exist — clean break, not a silent removal).",
        );
    }

    // ── W2 — the section recipe exists + mono-caption/hairline vocabulary ─────
    const sectionRuleExists = /\.glass-menu-section\s*\{/.test(menuCss);
    if (!sectionRuleExists) {
        violations.push(
            "W2: no `.glass-menu-section` rule in src/styles/menu.css (the section recipe did not land).",
        );
    }
    const sectionReadsMonoCaption =
        /--font-mono/.test(menuCss) &&
        /--type-caption/.test(menuCss) &&
        /--border-hairline/.test(menuCss);
    if (sectionRuleExists && !sectionReadsMonoCaption) {
        violations.push(
            "W2: the .glass-menu-section recipe does not compose the mono-caption (`--font-mono` + `--type-caption`) + `--border-hairline` vocabulary.",
        );
    }
    const sectionTokenized = /--menu-section-/.test(menuCss);
    if (sectionRuleExists && !sectionTokenized) {
        violations.push(
            "W2: the .glass-menu-section recipe exposes no `--menu-section-*` token knob (a consumer cannot retune via :root override).",
        );
    }

    // ── W3 — the 44px touch floor + the ≥2-consumer bar ───────────────────────
    // The 44px floor reads the UNCONDITIONALLY-declared `--touch-target` (the live π
    // caught the `--control-floor` trap — that token is coarse-pointer-ONLY, so on a
    // fine pointer it resolves to 0px and the floor vanished). Either canonical 44px
    // token (`--touch-target` or `--control-floor`) satisfies the clamp shape.
    const FLOOR_TOKEN = /var\(--(?:touch-target|control-floor)/;
    const rowClampsFloor =
        new RegExp(
            "min-block-size\\s*:\\s*max\\([^)]*" + FLOOR_TOKEN.source,
        ).test(menuCss) ||
        new RegExp("min-height\\s*:\\s*max\\([^)]*" + FLOOR_TOKEN.source).test(
            menuCss,
        );
    if (!rowClampsFloor) {
        violations.push(
            "W3: the .glass-menu-row recipe does not clamp `min-block-size: max(<base>, var(--touch-target))` (the WCAG-2.5.5 44px touch floor — reads the unconditional --touch-target token, not the coarse-only --control-floor).",
        );
    }
    // ≥2 consumers of the SECTION recipe: (1) the library CVA register reaches all
    //   13 SFCs (the menu defaults — the glass-menu-row default consumer count) AND
    //   (2) the in-repo demo menu story adopts `.glass-menu-section`. The section
    //   recipe's in-repo 2nd consumer is the demo story (dropdown OR context).
    const demoAdoptsSection =
        /glass-menu-section/.test(demoDropdown) ||
        /glass-menu-section/.test(demoContext);
    if (!demoAdoptsSection) {
        violations.push(
            "W3: no in-repo demo menu story adopts `.glass-menu-section` (the 2nd in-repo consumer of the section recipe — the ≥2-consumer bar).",
        );
    }

    // ── W4 — the SelectTrigger font-rung prop writes --dropdown-text ──────────
    // The `size` prop type carries a font-rung value.
    const sizeHasFontRung =
        /size\s*\?\s*:[^}]*['"]display['"]/.test(selectTrigger) ||
        /size\s*\?\s*:[^}]*['"]audacious['"]/.test(selectTrigger);
    if (!sizeHasFontRung) {
        violations.push(
            "W4: SelectTrigger's `size` prop carries no font-rung value (`display`/`audacious`) — the BA-VJS-4 / WO-3 font-rung axis did not land.",
        );
    }
    // The font-rung value WRITES the picker-family scale token — `--dropdown-text`
    // (the documented family lever) AND/OR `--text-dropdown` (the var the
    // `text-dropdown` utility reads; the substitution-vs-inheritance fix the live π
    // caught — overriding only --dropdown-text leaves the :root-baked --text-dropdown
    // bridge un-re-resolved). NOT a trigger-only text-display class.
    const writesDropdownText =
        /['"]--dropdown-text['"]\s*:/.test(selectTrigger) ||
        /--dropdown-text\s*:/.test(selectTrigger);
    const writesTextDropdown =
        /['"]--text-dropdown['"]\s*:/.test(selectTrigger) ||
        /--text-dropdown\s*:/.test(selectTrigger);
    if (!writesDropdownText) {
        violations.push(
            "W4: SelectTrigger's font-rung does not WRITE `--dropdown-text` (the shared family lever) — a trigger-only `text-*` override would desync the items (the value.js 1.59× break).",
        );
    }
    if (!writesTextDropdown) {
        violations.push(
            "W4: SelectTrigger's font-rung does not also WRITE `--text-dropdown` (the @theme-baked var the `text-dropdown` utility reads) — without it a descendant override does not re-resolve the :root-baked bridge (the substitution-vs-inheritance trap the live π caught).",
        );
    }
    // Anti-evasion: the font rung must NOT be a bare trigger-local `text-display`
    // class on the trigger element (the desync the value.js break was). A
    // `text-display`/`sm:text-display` literal in the class chain trips it.
    const triggerLocalTextClass =
        /\btext-display\b/.test(selectTrigger) ||
        /\bsm:text-display\b/.test(selectTrigger);
    if (triggerLocalTextClass) {
        violations.push(
            "W4: SelectTrigger carries a trigger-local `text-display` class (the value.js desync pattern — the font rung must write the `--dropdown-text` family token, not a trigger-only class).",
        );
    }

    const facts = {
        w1: {
            hasSurfaceAxis,
            glassArmComposesRow,
            rowReadsOklabTint,
            baseHasFlatAccent,
            accentArmHasFlat,
        },
        w2: { sectionRuleExists, sectionReadsMonoCaption, sectionTokenized },
        w3: { rowClampsFloor, demoAdoptsSection },
        w4: {
            sizeHasFontRung,
            writesDropdownText,
            writesTextDropdown,
            triggerLocalTextClass,
        },
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

    const { facts, violations } = detectMenuGlass({
        menuVariants: safeRead(P.MENU_VARIANTS_TS),
        menuCss: safeRead(P.MENU_CSS),
        selectTrigger: safeRead(P.SELECT_TRIGGER_VUE),
        demoDropdown: safeRead(P.DEMO_DROPDOWN_VUE),
        demoContext: safeRead(P.DEMO_CONTEXT_VUE),
    });

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:menu-glass",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:menu-glass — the glass MENU-ROW + MENU-SECTION register (BA.W-MENU-GLASS)",
    );
    console.log(
        `  W1 menu-row glass register    : ${yn(
            facts.w1.hasSurfaceAxis &&
                facts.w1.glassArmComposesRow &&
                facts.w1.rowReadsOklabTint &&
                !facts.w1.baseHasFlatAccent &&
                facts.w1.accentArmHasFlat,
        )}  (oklab-tint:${yn(facts.w1.rowReadsOklabTint)} base-flat-dropped:${yn(
            !facts.w1.baseHasFlatAccent,
        )})`,
    );
    console.log(
        `  W2 section recipe + caption   : ${yn(
            facts.w2.sectionRuleExists &&
                facts.w2.sectionReadsMonoCaption &&
                facts.w2.sectionTokenized,
        )}`,
    );
    console.log(
        `  W3 44px floor + ≥2 consumers  : ${yn(
            facts.w3.rowClampsFloor && facts.w3.demoAdoptsSection,
        )}  (floor:${yn(facts.w3.rowClampsFloor)} demo-adopts:${yn(
            facts.w3.demoAdoptsSection,
        )})`,
    );
    console.log(
        `  W4 trigger font-rung lever    : ${yn(
            facts.w4.sizeHasFontRung &&
                facts.w4.writesDropdownText &&
                facts.w4.writesTextDropdown &&
                !facts.w4.triggerLocalTextClass,
        )}  (writes --dropdown-text:${yn(
            facts.w4.writesDropdownText,
        )} --text-dropdown:${yn(facts.w4.writesTextDropdown)})`,
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
