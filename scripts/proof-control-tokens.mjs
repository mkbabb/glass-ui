#!/usr/bin/env node
// BB.W-CONTROL-TOKENS — the P2 control-token refinement cluster gate
// (proof:control-tokens).
//
// The born-RED→GREEN device-free SOURCE arm for the five control-register
// refinements speedtest AW v2.1 names as P2: (W1) the ToggleGroupItem `card`
// variant paints `--radius-card`, not the base `rounded-button`; (W2) the
// single-select ToggleGroup chooser threads `role="radiogroup"`/`role="radio"`/
// `:aria-checked` on the `type="single"` arm (the `multiple` arm keeps reka's
// native `aria-pressed`); (W3) MetricRow exposes `--metric-row-label-align` +
// `--metric-row-icon-color` consumer tokens WITH fallbacks; (W4) the a11y pair
// ships — the Toaster viewport region is `aria-live="polite"` + a `<FocusScope>`
// primitive is published composing reka's FocusScope; (W5) the no-`:deep`-needed
// predicate holds — the MetricRow tokens are read with a fallback so a consumer
// override cascades into the internal without a `:deep()` reach.
//
// The seam across all five: a control a consumer must reach is exposed as a
// token / prop / published primitive, never an internal a `:deep()` overrides
// (Design Axis 2 — "component over CSS class"). The PAINTED truth — the rendered
// `--radius-card` corner, the resolved `role`/`aria-checked`, the consumer-set
// label-align/icon-color cascading into the internal, the `aria-live` viewport —
// is the BINDING visual truth proven by the π live readback captured in
// docs/tranches/BB/audit/visual/W-CONTROL-TOKENS-DELTA.md (rides W-REFLECT3).
// This gate is the no-device CI half; both halves must hold for a clean close.
//
// House style mirrors proof-menu-glass.mjs / proof-button-glass.mjs: ESM .mjs,
// comment-strip first (false-witness discipline — a commented-out class/role must
// not satisfy a witness), a pure exported detector, a byte-stable JSON artefact,
// a human summary, process.exit(1) on any violation, + a `--self-test` bite.

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
        TOGGLE_TS: ui("toggle/index.ts"),
        TOGGLE_GROUP_VUE: ui("toggle-group/ToggleGroup.vue"),
        TOGGLE_GROUP_ITEM_VUE: ui("toggle-group/ToggleGroupItem.vue"),
        METRIC_ROW_VUE: resolve(
            ROOT,
            "src/components/custom/metric-stack/MetricRow.vue",
        ),
        SCALE_PAPER_CSS: resolve(ROOT, "src/styles/tokens/scale-paper.css"),
        TOASTER_VUE: ui("toast/Toaster.vue"),
        FOCUS_SCOPE_VUE: ui("focus-scope/FocusScope.vue"),
        FOCUS_SCOPE_INDEX: ui("focus-scope/index.ts"),
        FOCUS_SCOPE_SUBPATH: resolve(ROOT, "src/subpaths/focus-scope.ts"),
        UI_INDEX: ui("index.ts"),
        DEMO_METRIC_STACK: resolve(ROOT, "demo/stories/data/metric-stack.vue"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_CONTROL_TOKENS_ARTIFACT",
            "BB-control-tokens",
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
 * Extract the `card:` variant arm string from a comment-stripped toggleVariants
 * CVA source. Returns the quoted class string for the card arm (the value after
 * `card:` up to the closing quote-group), or "".
 */
function extractCardArm(toggleSrc) {
    // The `card:` key inside the `variant:` object. The value may be a plain
    // quoted string OR a `card: 'a' + 'b'` concat; we slice from `card:` to the
    // next variant key (`size:`) or the close of the `variant` object.
    const idx = toggleSrc.indexOf("card:");
    if (idx === -1) return "";
    // The card arm ends at the next top-level `size:` key (the next variant arm)
    // — a robust cut that captures multi-quote concatenations.
    const sizeIdx = toggleSrc.indexOf("size:", idx);
    const end = sizeIdx === -1 ? toggleSrc.length : sizeIdx;
    return toggleSrc.slice(idx, end);
}

/**
 * Extract the CVA BASE array (the first cva() argument, before the `variants`
 * object) — where `default`/`outline` inherit the base `rounded-button`.
 */
function extractBaseString(toggleSrc) {
    const cvaStart = toggleSrc.indexOf("cva(");
    if (cvaStart === -1) return toggleSrc;
    const variantsStart = toggleSrc.indexOf("variants", cvaStart);
    return variantsStart > cvaStart
        ? toggleSrc.slice(cvaStart, variantsStart)
        : toggleSrc;
}

/**
 * The W-CONTROL-TOKENS detector. Pure: takes the comment-stripped sources,
 * returns `{ facts, violations }`. Each witness pushes a falsifiable violation.
 */
export function detectControlTokens(sources) {
    const toggle = stripBlockComments(sources.toggle ?? "");
    const toggleGroup = stripHtmlComments(
        stripBlockComments(sources.toggleGroup ?? ""),
    );
    const toggleItem = stripHtmlComments(
        stripBlockComments(sources.toggleItem ?? ""),
    );
    const metricRow = stripHtmlComments(
        stripBlockComments(sources.metricRow ?? ""),
    );
    const scalePaper = stripBlockComments(sources.scalePaper ?? "");
    const toaster = stripHtmlComments(
        stripBlockComments(sources.toaster ?? ""),
    );
    const focusScope = stripHtmlComments(
        stripBlockComments(sources.focusScope ?? ""),
    );
    const focusIndex = stripBlockComments(sources.focusIndex ?? "");
    const focusSubpath = stripBlockComments(sources.focusSubpath ?? "");
    const uiIndex = stripBlockComments(sources.uiIndex ?? "");
    const demoMetricStack = stripHtmlComments(
        stripBlockComments(sources.demoMetricStack ?? ""),
    );

    const violations = [];

    // ── W1 — the card variant resolves `rounded-card`, not `rounded-button` ──
    const cardArm = extractCardArm(toggle);
    const baseStr = extractBaseString(toggle);
    const cardHasRoundedCard = /\brounded-card\b/.test(cardArm);
    // Anti-evasion: the card arm must NOT also leave the tile on rounded-button
    // (a stray rounded-button survivor on the card arm REDS).
    const cardHasRoundedButton = /\brounded-button\b/.test(cardArm);
    // The base still carries rounded-button (so default/outline keep the button
    // radius — a wholesale base swap that broke the button-shape variants REDS).
    const baseHasRoundedButton = /\brounded-button\b/.test(baseStr);

    const w1 = {
        cardHasRoundedCard,
        cardHasRoundedButton,
        baseHasRoundedButton,
    };
    if (!cardHasRoundedCard) {
        violations.push(
            "W1: the toggleVariants `card` arm does not carry `rounded-card` (the p-8 card tile still inherits the base 10px rounded-button — the N11 defect).",
        );
    }
    if (cardHasRoundedButton) {
        violations.push(
            "W1: the toggleVariants `card` arm carries a `rounded-button` survivor (the card radius is not the resolved corner — a stray base radius wins the source-order race).",
        );
    }
    if (!baseHasRoundedButton) {
        violations.push(
            "W1: the toggleVariants base CVA no longer carries `rounded-button` (a wholesale base swap broke the default/outline button-shape variants).",
        );
    }

    // ── W2 — the single-select radio semantics are threaded ───────────────────
    // ToggleGroup.vue routes role="radiogroup" GATED on type === "single" (via
    // the `groupRole` computed) and binds it through a :role / v-bind (reka
    // hardcodes role="group" on the Slot child, so the override rides `as-child`
    // over our own root element where the explicit :role wins).
    const rootRoutesRadiogroup =
        /['"]radiogroup['"]/.test(toggleGroup) &&
        /type\s*===?\s*['"]single['"]/.test(toggleGroup) &&
        /:role=|v-bind:role=/.test(toggleGroup) &&
        /\bas-child\b/.test(toggleGroup);
    // ToggleGroupItem.vue carries role="radio" GATED on the single arm. The role
    // rides a v-bound attr object (reka's Slot merges the child props over attrs,
    // so a merged object is the override seam), so match the `role: 'radio'`
    // object form OR a `:role` bind.
    const itemRoutesRadioRole =
        /['"]radio['"]/.test(toggleItem) &&
        (/:role=|v-bind:role=/.test(toggleItem) ||
            /\brole\s*:\s*['"]radio['"]/.test(toggleItem));
    const itemGatesOnSingle = /isSingle/.test(toggleItem);
    // The aria-checked is bound (a `:aria-checked` attr OR an `'aria-checked':`
    // key in the v-bound object).
    const itemBindsAriaChecked =
        /:aria-checked=|v-bind:aria-checked=/.test(toggleItem) ||
        /['"]aria-checked['"]\s*:/.test(toggleItem);
    // Anti-evasion: NOT a static aria-checked="false"/"true" on every item (a
    // hardcoded literal REDS — the binding must read the live selection). Match
    // both the template-attr form and a `'aria-checked': false` literal object key.
    const itemHasStaticAriaChecked =
        /\baria-checked\s*=\s*["'](?:true|false)["']/.test(toggleItem) ||
        /['"]aria-checked['"]\s*:\s*(?:true|false)\b/.test(toggleItem);
    // The item reads the LIVE selection (reka modelValue or an item-state read).
    const itemReadsLiveSelection =
        /modelValue|injectToggleGroupRootContext/.test(toggleItem);
    // Anti-evasion: the radio arm suppresses reka's inner aria-pressed (invalid
    // on a role="radio"); the source carries an `aria-pressed: undefined` removal.
    const itemSuppressesAriaPressed =
        /['"]aria-pressed['"]\s*:\s*undefined/.test(toggleItem);

    const w2 = {
        rootRoutesRadiogroup,
        itemRoutesRadioRole,
        itemGatesOnSingle,
        itemBindsAriaChecked,
        itemHasStaticAriaChecked,
        itemReadsLiveSelection,
        itemSuppressesAriaPressed,
    };
    if (!rootRoutesRadiogroup) {
        violations.push(
            "W2: ToggleGroup.vue does not route role=\"radiogroup\" GATED on type===\"single\" via a :role bind over `as-child` (the single-select chooser is not announced as a radio group).",
        );
    }
    if (!itemRoutesRadioRole) {
        violations.push(
            "W2: ToggleGroupItem.vue does not thread role=\"radio\" (the per-item radio semantic is missing).",
        );
    }
    if (!itemSuppressesAriaPressed) {
        violations.push(
            "W2: ToggleGroupItem.vue does not suppress reka's aria-pressed on the radio arm (aria-pressed on a role=\"radio\" is invalid per axe aria-allowed-attr).",
        );
    }
    if (!itemGatesOnSingle) {
        violations.push(
            "W2: ToggleGroupItem.vue does not GATE the radio role on the single arm (isSingle) — a hardcoded role=\"radio\" on EVERY toggle item (incl. the multiple strip) breaks the aria-pressed toggle-strip semantic.",
        );
    }
    if (!itemBindsAriaChecked) {
        violations.push(
            "W2: ToggleGroupItem.vue does not bind :aria-checked (the radio's checked state is not exposed).",
        );
    }
    if (itemHasStaticAriaChecked) {
        violations.push(
            "W2: ToggleGroupItem.vue carries a STATIC aria-checked=\"true|false\" literal (the binding must read the live selection, not a frozen value).",
        );
    }
    if (!itemReadsLiveSelection) {
        violations.push(
            "W2: ToggleGroupItem.vue does not read the live reka selection (modelValue / injectToggleGroupRootContext) — aria-checked cannot reflect the chosen item.",
        );
    }

    // ── W3 — the MetricRow consumer tokens exist WITH fallbacks ───────────────
    // .metric-row__label reads text-align: var(--metric-row-label-align, left).
    const labelReadsAlignToken =
        /text-align:\s*var\(\s*--metric-row-label-align\s*,/.test(metricRow);
    // The leading glyph reads var(--metric-row-icon-color, <fallback>).
    const iconReadsColorToken =
        /color:\s*var\(\s*--metric-row-icon-color\s*,/.test(metricRow);
    // Anti-evasion: NO bare token without a fallback (a bare var() would erase
    // the default for un-setting consumers — breaking back-compat).
    const bareLabelAlign =
        /var\(\s*--metric-row-label-align\s*\)/.test(metricRow);
    const bareIconColor =
        /var\(\s*--metric-row-icon-color\s*\)/.test(metricRow);
    // The two tokens are recorded in the documented --metric-row-* home.
    const tokenHomeNamesLabelAlign = /--metric-row-label-align/.test(scalePaper);
    const tokenHomeNamesIconColor = /--metric-row-icon-color/.test(scalePaper);

    const w3 = {
        labelReadsAlignToken,
        iconReadsColorToken,
        bareLabelAlign,
        bareIconColor,
        tokenHomeNamesLabelAlign,
        tokenHomeNamesIconColor,
    };
    if (!labelReadsAlignToken) {
        violations.push(
            "W3: .metric-row__label does not read text-align: var(--metric-row-label-align, left) (the label-align consumer knob is missing).",
        );
    }
    if (!iconReadsColorToken) {
        violations.push(
            "W3: the leading glyph does not read color: var(--metric-row-icon-color, …) (the icon-color consumer knob is missing).",
        );
    }
    if (bareLabelAlign) {
        violations.push(
            "W3: --metric-row-label-align is read WITHOUT a fallback (a bare var() erases the default `left` for un-setting consumers — back-compat break).",
        );
    }
    if (bareIconColor) {
        violations.push(
            "W3: --metric-row-icon-color is read WITHOUT a fallback (a bare var() erases the inherited-cascade default — back-compat break).",
        );
    }
    if (!tokenHomeNamesLabelAlign || !tokenHomeNamesIconColor) {
        violations.push(
            "W3: the --metric-row-* documented home (tokens/scale-paper.css §METRIC) does not name BOTH --metric-row-label-align + --metric-row-icon-color (the tokens are not discoverable).",
        );
    }

    // ── W4 — the a11y pair ships (Toaster aria-live + FocusScope published) ────
    const toasterAriaLive = /aria-live\s*=\s*["']polite["']/.test(toaster);
    const focusScopeComposesReka =
        /from\s*['"]reka-ui['"]/.test(focusScope) &&
        /\bFocusScope\b/.test(focusScope) &&
        /<FocusScope/.test(focusScope);
    const focusScopeExported = /\bFocusScope\b/.test(focusIndex);
    const focusSubpathMirrors = /focus-scope/.test(focusSubpath);
    const focusScopeOnUiBarrel = /focus-scope/.test(uiIndex);

    const w4 = {
        toasterAriaLive,
        focusScopeComposesReka,
        focusScopeExported,
        focusSubpathMirrors,
        focusScopeOnUiBarrel,
    };
    if (!toasterAriaLive) {
        violations.push(
            "W4: the Toaster viewport region is not marked aria-live=\"polite\" (no announce-on-toast contract).",
        );
    }
    if (!focusScopeComposesReka) {
        violations.push(
            "W4: the published FocusScope.vue does not compose reka's FocusScope primitive (a hand-rolled focus-trap REDS — the substrate-single discipline).",
        );
    }
    if (!focusScopeExported) {
        violations.push(
            "W4: the focus-scope barrel does not export FocusScope (the primitive is not published).",
        );
    }
    if (!focusSubpathMirrors) {
        violations.push(
            "W4: the /focus-scope subpath mirror does not re-export the focus-scope family (the subpath publication is missing).",
        );
    }
    if (!focusScopeOnUiBarrel) {
        violations.push(
            "W4: the ui barrel does not re-export the focus-scope family (the published surface is unreachable from the root barrel).",
        );
    }

    // ── W5 — the no-`:deep`-needed predicate (the precept-2 bar) ──────────────
    // POSITIVE: the MetricRow tokens are read WITH a fallback (so a consumer
    // :root/per-row override cascades into the internal — proven by W3's
    // *ReadsToken + !bare* facts). NEGATIVE: the canonical consumer path needs
    // NO :deep(.metric-row__label|__icon) for the label-align/icon-color cases.
    const consumerNeedsDeep =
        /:deep\(\s*\.metric-row__(label|icon)/.test(demoMetricStack);
    const tokensCascadeWithoutDeep =
        labelReadsAlignToken &&
        iconReadsColorToken &&
        !bareLabelAlign &&
        !bareIconColor;

    const w5 = {
        consumerNeedsDeep,
        tokensCascadeWithoutDeep,
    };
    if (consumerNeedsDeep) {
        violations.push(
            "W5: the canonical consumer (demo metric-stack) REQUIRES a :deep(.metric-row__label|__icon) for the label-align/icon-color cases — the precept-2 component-over-class bar fails.",
        );
    }
    if (!tokensCascadeWithoutDeep) {
        violations.push(
            "W5: the MetricRow tokens are not read with a cascading fallback — a consumer :root/per-row override cannot reach the internal without a :deep().",
        );
    }

    const facts = { w1, w2, w3, w4, w5 };
    return { facts, violations };
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// ── The self-test bite ─────────────────────────────────────────────────────
// Each clause is falsifiable. The bite mutates the GOOD corpus to demonstrate
// each witness REDs on a regression, and confirms the good corpus passes.
function selfTest() {
    const P = cliPaths();
    const good = {
        toggle: safeRead(P.TOGGLE_TS),
        toggleGroup: safeRead(P.TOGGLE_GROUP_VUE),
        toggleItem: safeRead(P.TOGGLE_GROUP_ITEM_VUE),
        metricRow: safeRead(P.METRIC_ROW_VUE),
        scalePaper: safeRead(P.SCALE_PAPER_CSS),
        toaster: safeRead(P.TOASTER_VUE),
        focusScope: safeRead(P.FOCUS_SCOPE_VUE),
        focusIndex: safeRead(P.FOCUS_SCOPE_INDEX),
        focusSubpath: safeRead(P.FOCUS_SCOPE_SUBPATH),
        uiIndex: safeRead(P.UI_INDEX),
        demoMetricStack: safeRead(P.DEMO_METRIC_STACK),
    };

    const cases = [
        {
            name: "good corpus passes",
            mutate: (s) => s,
            expectViolation: false,
        },
        {
            name: "W1 — strip rounded-card from the card arm REDS",
            mutate: (s) => ({
                ...s,
                toggle: s.toggle.replace(/rounded-card /, ""),
            }),
            expectViolation: true,
        },
        {
            name: "W1 — re-add rounded-button to the card arm REDS",
            mutate: (s) => ({
                ...s,
                toggle: s.toggle.replace(
                    /'rounded-card glass-card/,
                    "'rounded-card rounded-button glass-card",
                ),
            }),
            expectViolation: true,
        },
        {
            name: "W2 — a STATIC aria-checked literal REDS",
            mutate: (s) => ({
                ...s,
                toggleItem: s.toggleItem.replace(
                    /'aria-checked': itemChecked\.value/,
                    "'aria-checked': false",
                ),
            }),
            expectViolation: true,
        },
        {
            name: "W2 — drop the aria-pressed suppression REDS",
            mutate: (s) => ({
                ...s,
                toggleItem: s.toggleItem.replace(
                    /, 'aria-pressed': undefined/,
                    "",
                ),
            }),
            expectViolation: true,
        },
        {
            name: "W3 — drop the label-align fallback REDS",
            mutate: (s) => ({
                ...s,
                metricRow: s.metricRow.replace(
                    /text-align: var\(--metric-row-label-align, left\);/,
                    "text-align: var(--metric-row-label-align);",
                ),
            }),
            expectViolation: true,
        },
        {
            name: "W4 — strip the Toaster aria-live REDS",
            mutate: (s) => ({
                ...s,
                // Replace EVERY occurrence (the doc comment names it too — the
                // comment-strip removes the comment, so the real attr is the only
                // live witness; strip both so the detector sees none).
                toaster: s.toaster.replaceAll('aria-live="polite"', ""),
            }),
            expectViolation: true,
        },
        {
            name: "W4 — a hand-rolled FocusScope (no reka import) REDS",
            mutate: (s) => ({
                ...s,
                focusScope: '<template><div class="focus-scope"><slot /></div></template>',
            }),
            expectViolation: true,
        },
        {
            name: "W5 — a consumer :deep(.metric-row__label) REDS",
            mutate: (s) => ({
                ...s,
                demoMetricStack:
                    s.demoMetricStack +
                    "\n<style>:deep(.metric-row__label){text-align:right}</style>",
            }),
            expectViolation: true,
        },
    ];

    let allPass = true;
    console.log("proof:control-tokens --self-test\n");
    for (const c of cases) {
        const { violations } = detectControlTokens(c.mutate(good));
        const hasViolation = violations.length > 0;
        const ok = hasViolation === c.expectViolation;
        allPass = allPass && ok;
        console.log(
            `  ${ok ? "✓" : "✗"} ${c.name} — ${
                hasViolation ? `${violations.length} violation(s)` : "clean"
            }${ok ? "" : "  [UNEXPECTED]"}`,
        );
    }
    console.log(`\n  self-test: ${allPass ? "PASS" : "FAIL"}`);
    process.exit(allPass ? 0 : 1);
}

function run() {
    const P = cliPaths();
    const { ROOT } = P;

    const { facts, violations } = detectControlTokens({
        toggle: safeRead(P.TOGGLE_TS),
        toggleGroup: safeRead(P.TOGGLE_GROUP_VUE),
        toggleItem: safeRead(P.TOGGLE_GROUP_ITEM_VUE),
        metricRow: safeRead(P.METRIC_ROW_VUE),
        scalePaper: safeRead(P.SCALE_PAPER_CSS),
        toaster: safeRead(P.TOASTER_VUE),
        focusScope: safeRead(P.FOCUS_SCOPE_VUE),
        focusIndex: safeRead(P.FOCUS_SCOPE_INDEX),
        focusSubpath: safeRead(P.FOCUS_SCOPE_SUBPATH),
        uiIndex: safeRead(P.UI_INDEX),
        demoMetricStack: safeRead(P.DEMO_METRIC_STACK),
    });

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(P.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:control-tokens",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:control-tokens — the P2 control-token refinement cluster (BB.W-CONTROL-TOKENS)",
    );
    console.log(
        `  W1 card variant → rounded-card : ${yn(
            facts.w1.cardHasRoundedCard &&
                !facts.w1.cardHasRoundedButton &&
                facts.w1.baseHasRoundedButton,
        )}  (card-radius:${yn(facts.w1.cardHasRoundedCard)} base-button-kept:${yn(
            facts.w1.baseHasRoundedButton,
        )})`,
    );
    console.log(
        `  W2 single-select radio semantics: ${yn(
            facts.w2.rootRoutesRadiogroup &&
                facts.w2.itemRoutesRadioRole &&
                facts.w2.itemGatesOnSingle &&
                facts.w2.itemBindsAriaChecked &&
                !facts.w2.itemHasStaticAriaChecked &&
                facts.w2.itemReadsLiveSelection &&
                facts.w2.itemSuppressesAriaPressed,
        )}  (radiogroup:${yn(facts.w2.rootRoutesRadiogroup)} role-gated:${yn(
            facts.w2.itemGatesOnSingle,
        )} live-checked:${yn(facts.w2.itemReadsLiveSelection)} pressed-suppressed:${yn(
            facts.w2.itemSuppressesAriaPressed,
        )})`,
    );
    console.log(
        `  W3 MetricRow consumer tokens   : ${yn(
            facts.w3.labelReadsAlignToken &&
                facts.w3.iconReadsColorToken &&
                !facts.w3.bareLabelAlign &&
                !facts.w3.bareIconColor &&
                facts.w3.tokenHomeNamesLabelAlign &&
                facts.w3.tokenHomeNamesIconColor,
        )}  (label-align:${yn(facts.w3.labelReadsAlignToken)} icon-color:${yn(
            facts.w3.iconReadsColorToken,
        )} with-fallback:${yn(!facts.w3.bareLabelAlign && !facts.w3.bareIconColor)})`,
    );
    console.log(
        `  W4 a11y pair (live-region+trap): ${yn(
            facts.w4.toasterAriaLive &&
                facts.w4.focusScopeComposesReka &&
                facts.w4.focusScopeExported &&
                facts.w4.focusSubpathMirrors &&
                facts.w4.focusScopeOnUiBarrel,
        )}  (toaster-live:${yn(facts.w4.toasterAriaLive)} focus-scope-published:${yn(
            facts.w4.focusScopeComposesReka && facts.w4.focusScopeExported,
        )})`,
    );
    console.log(
        `  W5 no-:deep-needed predicate    : ${yn(
            !facts.w5.consumerNeedsDeep && facts.w5.tokensCascadeWithoutDeep,
        )}  (no-consumer-deep:${yn(!facts.w5.consumerNeedsDeep)} tokens-cascade:${yn(
            facts.w5.tokensCascadeWithoutDeep,
        )})`,
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
    if (process.argv.includes("--self-test")) selfTest();
    else run();
}
