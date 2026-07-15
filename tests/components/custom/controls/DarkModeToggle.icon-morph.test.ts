// BA.W-ATLAS-RECONCILE A-3/B-3 (d6 2755ebbd port, re-anchored) — the
// DarkModeToggle icon morph must SURVIVE the theme-flip transition-suppression
// path. Ported VERBATIM from the d6 fork's 251-LOC born-RED gate, with ONE
// re-anchor: the split moved the `.no-transition` + PRM bytes from the retired
// monolithic `src/styles/utilities.css` into `src/styles/utilities/a11y-overrides.css`
// (the AY partials carve). A verbatim port would read the wrong file and the
// no-anchor gate would silently pass against drifted CSS — so the `UTILITIES`
// const points at the split partial. Every assert is unchanged.
//
// THE DEFECT (born RED on master HEAD before the carve). `useGlobalDark.toggleDark()`
// with `disableTransitions=true` adds `html.no-transition` on the SAME style recalc
// that lands `.dark` (useGlobalDark.ts), then rAF-removes it one frame later.
// glass-ui's `.no-transition` kill is a BLANKET `html.no-transition *` that forces
// `transition-duration: 0s !important` on EVERY descendant — including the
// toggle's OWN `.toggle-sun` / `.toggle-circle`, whose whole purpose is the 750ms
// half-turn spring. So on the recalc that adds `.dark` the icon's transform
// hard-cuts to its end state and the authored spring NEVER runs. On the dense
// dashboard routes the dock wires `disableTransitions: true` ALWAYS, so the icon
// is always dead there (the asymmetry that let the defect hide). This is the user's
// "dark mode still does not animate the icon."
//
// THE FIX (at the glass-ui ROOT — f6 §2(a) PREFERRED): the suppression path must
// not gag the toggle's OWN icon. The `data-allow-motion` carve (already minted for
// the reduced-motion utility) is GENERALIZED to a theme-flip exemption:
// `html.no-transition *:not([data-allow-motion])` — and the toggle's icon elements
// declare `data-allow-motion`. The page transition storm still dies; the toggle's
// authored spring survives. The carve is a GENERAL capability (any element may
// declare motion-allowed-during-theme-flip), not a toggle special case.
//
// PRM IS ABSOLUTE (f6 §3 GATE-A): under `prefers-reduced-motion: reduce` the icon
// must SNAP — the theme-flip carve is overridden by reduced-motion (an accessibility
// preference outranks any per-element motion-allow). The gate asserts both arms.
//
// WHY THE GATE INJECTS THE REAL AUTHORED CSS. happy-dom's `getComputedStyle` does
// NOT inject a Vue SFC's scoped `<style>` into the document during a unit mount
// (scoped styles ship only in dev/build), and it cannot expand a `transition:`
// shorthand into the `transition-duration` longhand. So a faithful DOM-cascade
// gate must (1) read the VERBATIM authored rules from source — the SFC's icon
// `<style>` block + a11y-overrides.css's `.no-transition` and PRM blocks — inject them,
// and (2) drive the REAL `useGlobalDark().toggleDark()` flip so the `.no-transition`
// add/remove window is exercised authentically. The gate then reads the cascaded
// `transition-duration` on a real `.toggle-sun` node. Reading from source (never a
// hand-copied rule) keeps the gate honest: it tracks the SAME bytes the component
// ships, so it cannot silently pass against drifted CSS. It also requires the icon
// transition to be authored as LONGHANDS (`transition-duration` explicit) — the
// idiomatic form the fix lands, which makes the authored 750ms computable.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { nextTick } from "vue";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { useGlobalDark } from "@glass/composables/dark/useGlobalDark";

// ── Read the VERBATIM authored CSS the component + utility actually ship ────────
// CWD is the project root under vitest; happy-dom's `import.meta.url` is not a
// file: URL (track-frost.test.ts precedent), so CWD is the stable anchor.
const SFC = resolve(
    process.cwd(),
    "src/components/controls/DarkModeToggle.vue",
);
// BA.W-ATLAS-RECONCILE re-anchor: the AY partials carve moved the `.no-transition`
// + PRM bytes here from the retired monolithic `src/styles/utilities.css`.
const UTILITIES = resolve(process.cwd(), "src/styles/utilities/a11y-overrides.css");

const sfcSrc = readFileSync(SFC, "utf8");
const utilSrc = readFileSync(UTILITIES, "utf8");

/** Extract the SFC's `<style scoped>` block body (the icon transition recipe). */
function sfcStyleBlock(src: string): string {
    const open = src.indexOf("<style");
    const gt = src.indexOf(">", open) + 1;
    const close = src.indexOf("</style>", gt);
    return src.slice(gt, close);
}

/** Extract the `.no-transition` rule (the blanket theme-flip kill / its carve). */
function noTransitionRule(src: string): string {
    const at = src.indexOf("html.no-transition");
    const close = src.indexOf("}", at) + 1;
    return src.slice(at, close);
}

/**
 * Extract the `@media (prefers-reduced-motion: reduce)` block that carries the
 * `[data-allow-motion]` override (a11y-overrides.css has SEVERAL PRM blocks; the one
 * the icon-snap contract lives in is the one mentioning the carve attribute).
 * Brace-balanced extraction so nested rules are captured whole.
 */
function prmBlock(src: string): string {
    let from = 0;
    for (;;) {
        const at = src.indexOf("@media (prefers-reduced-motion: reduce)", from);
        if (at === -1) return "";
        const open = src.indexOf("{", at);
        let depth = 0;
        let i = open;
        for (; i < src.length; i++) {
            if (src[i] === "{") depth++;
            else if (src[i] === "}") {
                depth--;
                if (depth === 0) break;
            }
        }
        const block = src.slice(at, i + 1);
        if (block.includes("[data-allow-motion]")) return block;
        from = i + 1;
    }
}

/**
 * Build a real `.dark-mode-toggle-button` host carrying a `.toggle-sun`. The icon
 * declares whatever `data-allow-motion` the SFC's template assigns — so the gate
 * reflects the SHIPPED markup, not a fabricated one. We mirror the SFC's icon
 * markup contract: if the SFC marks the icon `data-allow-motion`, so do we.
 */
function buildToggleDom(opts: { dark: boolean; noTransition: boolean }): HTMLElement {
    const root = document.createElement("button");
    root.className = "dark-mode-toggle-button";

    const sun = document.createElementNS("http://www.w3.org/2000/svg", "g");
    sun.setAttribute("class", "toggle-sun");
    // The shipped markup's motion-allow contract (mirrors the SFC template; the
    // SFC source is asserted to carry it in the markup-contract test below).
    if (/class="toggle-sun"[^>]*data-allow-motion|data-allow-motion[^>]*class="toggle-sun"/.test(sfcSrc) ||
        /toggle-sun[\s\S]{0,120}data-allow-motion/.test(sfcSrc)) {
        sun.setAttribute("data-allow-motion", "");
    }
    root.appendChild(sun);
    document.body.appendChild(root);

    document.documentElement.className = `${opts.noTransition ? "no-transition " : ""}${opts.dark ? "dark" : ""}`.trim();
    return sun as unknown as HTMLElement;
}

function injectAuthoredCss(extra = ""): void {
    document.head.innerHTML = `<style>
        ${sfcStyleBlock(sfcSrc)}
        ${noTransitionRule(utilSrc)}
        ${prmBlock(utilSrc)}
        ${extra}
    </style>`;
}

describe("DarkModeToggle — the icon morph survives the theme-flip suppression (GATE-A)", () => {
    beforeEach(() => {
        document.documentElement.className = "";
        document.head.innerHTML = "";
        document.body.innerHTML = "";
    });
    afterEach(() => {
        document.documentElement.className = "";
        document.documentElement.removeAttribute("style");
    });

    it("the authored .toggle-sun transition is 750ms — NOT 0s — while .no-transition is up", () => {
        // The negative control IS the defect: with `.no-transition` on <html> (the
        // suppression window), the icon's computed transition-duration must still be
        // the authored 750ms spring. Before the carve the blanket `html.no-transition *`
        // forces `0s !important` here → this assertion is RED. After the carve it is
        // 750ms → GREEN. (No PRM: matchMedia defaults to non-matching.)
        injectAuthoredCss();
        const sun = buildToggleDom({ dark: true, noTransition: true });

        const dur = getComputedStyle(sun).transitionDuration;
        expect(dur).toBe("750ms");
    });

    it("NEGATIVE CONTROL — a plain descendant IS still suppressed (the storm dies)", () => {
        // The carve must be SURGICAL: an element that does NOT declare the
        // motion-allow exemption must still be killed by `.no-transition` (the page
        // transition storm the flag exists to suppress must still die). This guards
        // against an over-broad fix that simply deletes the kill.
        injectAuthoredCss(`.incidental { transition-duration: 600ms; }`);
        const plain = document.createElement("div");
        plain.className = "incidental";
        document.body.appendChild(plain);
        document.documentElement.className = "no-transition dark";

        expect(getComputedStyle(plain).transitionDuration).toBe("0s");
    });

    it("the REAL toggleDark() flip leaves the icon's authored transition intact", async () => {
        // Drive the genuine flip path: `setDisableTransitions(true)` then
        // `toggleDark()` adds `.no-transition` SYNCHRONOUSLY, flips `isDark` (vueuse's
        // `useDark` watcher writes `.dark` on the reactive flush — `await nextTick()`
        // lands it, a microtask), and schedules the `.no-transition` removal on rAF
        // (a macrotask — so it is STILL up after nextTick). That is the exact window
        // the icon must animate through: `.dark` landed, `.no-transition` still up.
        injectAuthoredCss();
        const sun = document.createElementNS("http://www.w3.org/2000/svg", "g");
        sun.setAttribute("class", "toggle-sun");
        if (/toggle-sun[\s\S]{0,120}data-allow-motion/.test(sfcSrc)) {
            sun.setAttribute("data-allow-motion", "");
        }
        const root = document.createElement("button");
        root.className = "dark-mode-toggle-button";
        root.appendChild(sun);
        document.body.appendChild(root);

        const { isDark, toggleDark, setDisableTransitions } = useGlobalDark();
        // Normalize to light first (no flip animation asserted on the seed).
        if (isDark.value) isDark.value = false;
        await nextTick();
        document.documentElement.classList.remove("no-transition");

        setDisableTransitions(true);
        toggleDark(); // adds .no-transition, flips to dark — the suppression window
        await nextTick(); // vueuse's watcher writes `.dark`; rAF removal not yet fired

        expect(document.documentElement.classList.contains("no-transition")).toBe(true);
        expect(document.documentElement.classList.contains("dark")).toBe(true);
        expect(getComputedStyle(sun as unknown as HTMLElement).transitionDuration).toBe("750ms");
    });

    it("PRM SNAP — reduced-motion OVERRIDES the carve so the icon does NOT spring", () => {
        // Reduced-motion is ABSOLUTE: it overrides the theme-flip motion-allow carve,
        // so a `data-allow-motion` icon SNAPS under `prefers-reduced-motion`. happy-dom's
        // `getComputedStyle` does NOT evaluate `@media (prefers-reduced-motion)` rules
        // at all (verified: setting `happyDOM.settings.device.prefersReducedMotion` +
        // a matching `matchMedia` still leaves the media block UNAPPLIED) — so this arm
        // is gated as a CSS-contract proof against the VERBATIM authored block (the
        // repo's `proof:components-css` / track-frost static-source culture for exactly
        // this "jsdom can't compute X" class). The LIVE-browser confirmation of the snap
        // rides the π render-matrix; here we prove the cascade is AUTHORED to snap.
        const prm = prmBlock(utilSrc);

        // The override rule must exist: under PRM, `[data-allow-motion]` (the icon's
        // own carve) has its spatial transition snapped to the reduced register — the
        // theme-flip carve does NOT survive reduced-motion.
        const overrideMatch = /\[data-allow-motion\]\s*\{[^}]*transition-duration:\s*0(?:\.\d+)?m?s\s*!important/s.exec(prm);
        expect(overrideMatch, "PRM block must snap [data-allow-motion] transition-duration").not.toBeNull();

        // It snaps to a near-zero register, never the 750ms spring.
        expect(overrideMatch?.[0]).not.toMatch(/750ms/);

        // And the carve attribute the override targets is the SAME one the .no-transition
        // exemption uses (one capability, two clocks — flip-allow vs PRM-absolute).
        expect(noTransitionRule(utilSrc)).toMatch(/\[data-allow-motion\]/);
    });

    it("MARKUP CONTRACT — the SFC declares the motion-allow carve on its icon", () => {
        // The carve is only live if the SHIPPED template marks the icon
        // `data-allow-motion`. Assert the SFC source carries it on the toggle's icon
        // group(s) — so the CSS exemption has a real consumer (no dead carve).
        expect(sfcSrc).toMatch(/data-allow-motion/);
        // It rides the icon, not some unrelated node.
        expect(/toggle-sun[\s\S]{0,200}data-allow-motion|data-allow-motion[\s\S]{0,200}toggle-sun/.test(sfcSrc)).toBe(true);
    });

    it("CSS CONTRACT — the .no-transition kill honors the motion-allow carve", () => {
        // The general capability: the theme-flip suppression selector exempts
        // `[data-allow-motion]`. Assert the authored rule carries the carve (so the
        // fix is the GENERAL one, not a toggle-special-case `!important` re-enable).
        const rule = noTransitionRule(utilSrc);
        expect(rule).toMatch(/:not\(\[data-allow-motion\]\)/);
    });
});
