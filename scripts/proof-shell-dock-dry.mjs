#!/usr/bin/env node
// proof:shell-dock-dry (BG.W-SHELL-DOCK-DRY) — the demo shell-dock DRY gate.
//
// The two demo shell docks (demo/shell/SidebarDock.vue + demo/shell/BottomDock.vue)
// byte-DUPLICATED the shared FACET-RAIL loop — the route→facet resolver wire, the
// `railItems` map, the SHELL-HOLD `railContext` writable computed (the equality
// short-circuit that navigates ONLY on a genuine user chip activation), the
// arrow-roving `onFacetKeydown` — AND the MORPH-BUTTON wiring (the
// `glass-ui-demo:toggle-dock-morph` window-event dispatch). This wave factors that
// ONCE into `demo/shell/useShellNavDock.ts` over two thin SFCs.
//
// THE FENCE (SHELL-DOCK-DRY re-scope, SPEC-pass3): the desktop SidebarDock ↔ mobile
// BottomDock is a CSS media-query SWAP (`dock-nav.css`), a SEPARATE axis from the
// user-driven V↔H morph. The DRY folds ONLY the shared category-facet loop + the
// morph-button wiring; the responsive swap stays a pure media query (the composable
// stays ⟂ to it — it must not fight the 768px breakpoint), and the mobile off-canvas
// Sheet trigger is PRESERVED.
//
// P1 — the composable EXISTS + owns the shared loop (railItems + the SHELL-HOLD
//      railContext guard + onFacetKeydown roving + the openDockMorph dispatch + the
//      resolver wire).
// P2 — BOTH shell SFCs CONSUME it (import + call) AND carry ZERO duplicated inline
//      facet-rail/morph logic (no second `railContext = computed` writable computed,
//      no second toggle-dock-morph dispatch, no direct useContextualDockLayers wire).
// P3 — the composable stays ⟂ to the responsive SWAP (no matchMedia/breakpoint/
//      orientation logic) AND the dock-nav.css media query is PRESERVED.
// P4 — the mobile off-canvas Sheet trigger is PRESERVED in BottomDock.
//
// Born-RED on HEAD (composable absent + the duplication present in both SFCs) → GREEN
// on the DRY. Device-free FS scan (paint-class P — the binding paint is the P1
// landing-semantics live π; this gate is the DRY/structure floor). `--self-test`
// runs the clause predicates over synthetic sabotage strings (each MUST flag).

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const COMPOSABLE = "demo/shell/useShellNavDock.ts";
const SIDEBAR = "demo/shell/SidebarDock.vue";
const BOTTOM = "demo/shell/BottomDock.vue";
const NAVCSS = "demo/shell/dock-nav.css";

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : null;
}

// Strip comments so a FORBIDDEN-mention check reads CODE, not prose (a doc/template
// comment legitimately NAMES the folded-away wire — e.g. the composable's own comment
// says it owns NO `matchMedia`, and the SFC template comments still describe the
// `useContextualDockLayers` resolver by name). HTML (Vue template) + block + line
// comments, URL-safe (`(^|[^:])//` never eats a `://`).
function stripComments(src) {
    if (src == null) return src;
    return src
        .replace(/<!--[\s\S]*?-->/g, " ")
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

// ── clause predicates (content-string based; shared by main + self-test) ─────────

// P1 — the composable owns the shared facet-rail loop + the morph-button wiring.
function checkComposable(src) {
    if (src == null) return { ok: false, reason: `${COMPOSABLE} is absent` };
    const needs = [
        [/export\s+(?:function|const)\s+useShellNavDock\b/, "export useShellNavDock"],
        [/useContextualDockLayers\s*\(/, "the route→facet resolver wire (useContextualDockLayers)"],
        [/contextLayers\.value\.length\s*>\s*1/, "the >1-facet railItems guard"],
        [/accent:\s*l\.accent/, "the per-facet accent map (railItems)"],
        [/id\s*===\s*railContext\.value/, "the SHELL-HOLD equality short-circuit (railContext.set)"],
        [/router\.push\(/, "the facet-nav router.push"],
        [/railContext\.value\s*=\s*items\[/, "the arrow-roving onFacetKeydown write"],
        [/glass-ui-demo:toggle-dock-morph/, "the openDockMorph window-event dispatch"],
    ];
    for (const [re, label] of needs) {
        if (!re.test(src)) return { ok: false, reason: `${COMPOSABLE} missing ${label}` };
    }
    return { ok: true };
}

// P2 — an SFC CONSUMES the composable + carries ZERO duplicated inline logic (the DRY).
function checkSfcConsumes(src, name) {
    if (src == null) return { ok: false, reason: `${name} is absent` };
    // Accept either the colocated `./useShellNavDock` (BH.B3 δ34 — the shell docks
    // now live IN demo/shell/ beside the composable) OR the pre-colocation
    // `../shell/useShellNavDock` (a shell-adjacent consumer).
    if (!/from\s+["']\.{1,2}\/(?:shell\/)?useShellNavDock["']/.test(src))
        return {
            ok: false,
            reason: `${name} does not import useShellNavDock from ./useShellNavDock (or ../shell/useShellNavDock)`,
        };
    if (!/useShellNavDock\s*\(/.test(src))
        return { ok: false, reason: `${name} does not call useShellNavDock()` };
    // The DRY floor: the folded logic must NOT survive inline in the SFC CODE (a
    // template/doc comment naming the folded wire is not a duplication).
    const code = stripComments(src);
    if (/const\s+railContext\s*=\s*computed\s*[<(]/.test(code))
        return {
            ok: false,
            reason: `${name} still declares an inline railContext writable computed (duplication not folded)`,
        };
    if (/glass-ui-demo:toggle-dock-morph/.test(code))
        return {
            ok: false,
            reason: `${name} still dispatches glass-ui-demo:toggle-dock-morph inline (morph wiring not folded)`,
        };
    if (/useContextualDockLayers/.test(code))
        return {
            ok: false,
            reason: `${name} still wires useContextualDockLayers directly (the resolver belongs in the composable)`,
        };
    return { ok: true };
}

// P3 — the composable stays ⟂ to the responsive swap (no breakpoint/orientation logic).
function checkOrthogonal(rawSrc) {
    if (rawSrc == null) return { ok: false, reason: `${COMPOSABLE} is absent` };
    // Read CODE, not prose (the composable's own doc comment NAMES the swap it must
    // NOT own — `matchMedia`, `768px`, `max-width` — to record the ⟂ fence).
    const src = stripComments(rawSrc);
    const forbidden = [
        [/matchMedia/, "matchMedia"],
        [/innerWidth/, "window.innerWidth"],
        [/\b767\b|\b768\b/, "a 767/768 breakpoint literal"],
        [/max-width\s*:/, "a max-width media-query"],
    ];
    for (const [re, label] of forbidden) {
        if (re.test(src))
            return {
                ok: false,
                reason: `${COMPOSABLE} owns ${label} — the desktop↔mobile swap must stay the dock-nav.css media query (⟂ to the morph axis, no 768px collision)`,
            };
    }
    return { ok: true };
}

// P3b — the responsive media-query swap is PRESERVED in dock-nav.css.
function checkSwapPreserved(css) {
    if (css == null) return { ok: false, reason: `${NAVCSS} is absent` };
    if (!/@media\s*\(max-width:\s*767px\)/.test(css) || !/\.demo-sidebar-rail/.test(css))
        return {
            ok: false,
            reason: `${NAVCSS} no longer carries the desktop↔mobile media-query swap`,
        };
    return { ok: true };
}

// P4 — the mobile off-canvas Sheet category trigger is PRESERVED in BottomDock.
function checkSheetPreserved(src) {
    if (src == null) return { ok: false, reason: `${BOTTOM} is absent` };
    const needs = [/<Sheet\b/, /SheetTrigger/, /<SidebarDock\b/];
    if (!needs.every((re) => re.test(src)))
        return {
            ok: false,
            reason: `${BOTTOM} lost the mobile off-canvas Sheet category trigger`,
        };
    return { ok: true };
}

// ── main ─────────────────────────────────────────────────────────────────────────

function runMain() {
    const composable = read(COMPOSABLE);
    const sidebar = read(SIDEBAR);
    const bottom = read(BOTTOM);
    const css = read(NAVCSS);
    const clauses = [
        ["P1 composable-owns-shared-loop", checkComposable(composable)],
        ["P2a SidebarDock consumes + no-dup", checkSfcConsumes(sidebar, SIDEBAR)],
        ["P2b BottomDock consumes + no-dup", checkSfcConsumes(bottom, BOTTOM)],
        ["P3 composable-⟂-responsive-swap", checkOrthogonal(composable)],
        ["P3b dock-nav.css-swap-preserved", checkSwapPreserved(css)],
        ["P4 mobile-Sheet-trigger-preserved", checkSheetPreserved(bottom)],
    ];
    let ok = true;
    for (const [id, res] of clauses) {
        if (res.ok) console.log(`  ✓ ${id}`);
        else {
            ok = false;
            console.error(`  ✗ ${id} — ${res.reason}`);
        }
    }
    return ok;
}

// ── self-test bite (each synthetic sabotage MUST flag its clause) ──────────────────

function runSelfTest() {
    const GOOD_COMPOSABLE = `
export function useShellNavDock(options = {}) {
    const { layers: contextLayers } = useContextualDockLayers(route);
    const railItems = computed(() =>
        contextLayers.value.length > 1
            ? contextLayers.value.map((l) => ({ id: l.id, accent: l.accent })) : []);
    const railContext = computed({
        set: (id) => { if (id === railContext.value) return; router.push(\`/x/\${id}\`); },
    });
    function onFacetKeydown(e, index) { railContext.value = items[next]?.id; }
    function openDockMorph() {
        window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-dock-morph"));
    }
}`;
    const GOOD_SFC = `
import { useShellNavDock } from "../shell/useShellNavDock";
const { railItems, railContext, onFacetKeydown, openDockMorph } = useShellNavDock();
`;
    const GOOD_BOTTOM = GOOD_SFC + `<Sheet><SheetTrigger /></Sheet><SidebarDock />`;
    const GOOD_CSS = `@media (max-width: 767px) { .demo-sidebar-rail { display: none; } }`;

    const cases = [];
    const expect = (label, cond) => cases.push([label, cond]);

    // The good baseline passes every clause.
    expect("good composable passes P1", checkComposable(GOOD_COMPOSABLE).ok);
    expect("good composable passes P3", checkOrthogonal(GOOD_COMPOSABLE).ok);
    expect("good SFC passes P2", checkSfcConsumes(GOOD_SFC, "x").ok);
    expect("good BottomDock passes P4", checkSheetPreserved(GOOD_BOTTOM).ok);
    expect("good css passes P3b", checkSwapPreserved(GOOD_CSS).ok);

    // Sabotage 1 — the SHELL-HOLD guard removed → P1 RED.
    expect(
        "bite: SHELL-HOLD guard removed → P1 flags",
        !checkComposable(GOOD_COMPOSABLE.replace("id === railContext.value", "false")).ok,
    );
    // Sabotage 2 — an inline railContext writable computed survives → P2 RED.
    expect(
        "bite: inline railContext survives → P2 flags",
        !checkSfcConsumes(GOOD_SFC + `\nconst railContext = computed({});`, "x").ok,
    );
    // Sabotage 3 — the composable import missing → P2 RED.
    expect(
        "bite: useShellNavDock import missing → P2 flags",
        !checkSfcConsumes(
            GOOD_SFC.replace('from "../shell/useShellNavDock"', 'from "./nope"'),
            "x",
        ).ok,
    );
    // Sabotage 4 — a toggle-dock-morph dispatch survives inline → P2 RED.
    expect(
        "bite: inline toggle-dock-morph survives → P2 flags",
        !checkSfcConsumes(
            GOOD_SFC + `\nwindow.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-dock-morph"));`,
            "x",
        ).ok,
    );
    // Sabotage 5 — a breakpoint literal creeps into the composable → P3 RED.
    expect(
        "bite: matchMedia/768 in composable → P3 flags",
        !checkOrthogonal(GOOD_COMPOSABLE + `\nconst m = matchMedia("(max-width: 768px)");`).ok,
    );
    // Sabotage 6 — the mobile Sheet trigger dropped → P4 RED.
    expect(
        "bite: Sheet trigger dropped → P4 flags",
        !checkSheetPreserved(GOOD_SFC).ok,
    );
    // Sabotage 7 — the dock-nav.css swap deleted → P3b RED.
    expect(
        "bite: dock-nav.css swap deleted → P3b flags",
        !checkSwapPreserved(`.demo-sidebar-rail { color: red; }`).ok,
    );

    let ok = true;
    for (const [label, cond] of cases) {
        if (cond) console.log(`  ✓ self-test: ${label}`);
        else {
            ok = false;
            console.error(`  ✗ self-test FAILED: ${label}`);
        }
    }
    return ok;
}

// ── entry ─────────────────────────────────────────────────────────────────────────

const selfTest = process.argv.includes("--self-test");
console.log(
    `proof:shell-dock-dry — the demo shell-dock DRY gate (BG.W-SHELL-DOCK-DRY)${
        selfTest ? " [self-test]" : ""
    }`,
);
const ok = selfTest ? runSelfTest() : runMain();
if (ok) {
    console.log("proof:shell-dock-dry PASS");
    process.exit(0);
} else {
    console.error("proof:shell-dock-dry FAIL");
    process.exit(1);
}
