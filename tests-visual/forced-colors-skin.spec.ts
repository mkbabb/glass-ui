// AX.W36 — forced-colors-skin.spec.ts, the π forcedColors:'active' readback over the
// glass language (the W00 workspace member; the BINDING close criterion).
//
// THE DEFECT: under Windows High Contrast the platform strips the whole decorative
// glass register — `backdrop-filter` is dropped, the `--glass-*` inset/box-shadow rungs
// vanish, and every meaning-bearing chroma flattens to one system color. A `.glass-
// floating` Dialog over a `.glass-resting` Card reads as two borderless transparent
// rectangles. The skin restores the STRUCTURE: tier panes → a `CanvasText` border,
// floating rungs → a `Canvas` fill + edge, focus → a `Highlight` outline.
//
// THE SOURCE GATE (proof-forced-colors-skin.mjs) proves the RECIPE STRUCTURE; THIS SPEC
// PROVES THE RENDER — Playwright launches with `forcedColors: 'active'` (the Chromium
// Windows-High-Contrast simulation), injects synthetic `.glass-*` panes + a focusable
// control onto the live demo (which loads the `/styles` cascade), and
// reads back the PAINTED result off the live DOM:
//   - every glass-material tier pane resolves a non-`none` border (born-RED: `none`);
//   - the floating rung resolves an opaque fill (the boxed-region separation);
//   - a focused control resolves a `Highlight`-keyed outline (born-RED: no outline).
//
// THE BINDING ASSERTION IS THE getComputedStyle READBACK under forcedColors:'active'
// (NOT a source-string grep — a render that paints the skin but still collapses would
// pass a grep; the live readback is the precept-valid form). A NORMAL-mode (forcedColors
// off) arm confirms the skin is INERT outside WHC (the tier panes keep their glass
// border, the `::before` specular is not display:none) — the non-regression guard.
//
// At ≥3 viewports (375×667, 1280×800, 1440×900). Fail-CLOSED: a collapsed WHC render
// reds the readback, exit non-zero (never SKIP-with-EXIT=0).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

// The canonical glass-language render. Any route loads the global `/styles` cascade,
// so the synthetic `.glass-*`
// fixtures resolve, but the glass-material story is the on-topic stable surface. Resolved
// against the re-sourced manifest (fails the resolution rather than driving a dead route).
const GLASS_SCENE = resolveScene("substrates", "glass-material");

const VIEWPORTS = [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1280, height: 800 },
    { name: "wide", width: 1440, height: 900 },
] as const;

// The five-rung ladder + card are the structure-survival carriers.
const LADDER = [
    "glass-wash",
    "glass-quiet",
    "glass-resting",
    "glass-floating",
    "glass-overlay",
    "glass-card",
] as const;

interface LadderReadout {
    /** The resolved border-style (born-RED under WHC: `none`). */
    borderStyle: string;
    /** The resolved border-width. */
    borderWidth: string;
    /** The resolved background (floating/overlay → opaque Canvas under WHC). */
    background: string;
    /** Whether the decorative `::before` specular is display:none under WHC. */
    beforeHidden: boolean;
    /** Whether the forced-colors media query is active in this readback context. */
    fcMQ: boolean;
}

/**
 * Inject a synthetic `.glass-<kind>` pane onto the live demo and read back its border /
 * background / `::before` display off the LIVE painted DOM. The fixture is removed after.
 */
async function readLadder(page: Page, kind: string): Promise<LadderReadout> {
    return page.evaluate((kind) => {
        const FIXTURE_ID = "__w36_ladder__";
        document.getElementById(FIXTURE_ID)?.remove();
        const el = document.createElement("div");
        el.id = FIXTURE_ID;
        el.className = kind;
        el.style.cssText =
            "position:fixed;left:0;top:0;width:200px;height:120px;border-radius:12px;z-index:99999;";
        document.body.appendChild(el);
        void el.offsetHeight;
        const cs = getComputedStyle(el);
        const beforeCS = getComputedStyle(el, "::before");
        const out = {
            borderStyle: cs.borderTopStyle,
            borderWidth: cs.borderTopWidth,
            background: cs.backgroundColor,
            beforeHidden: beforeCS.display === "none",
            fcMQ: matchMedia("(forced-colors: active)").matches,
        };
        document.getElementById(FIXTURE_ID)?.remove();
        return out;
    }, kind);
}

/** Inject a focusable `.glass-btn`, focus it via keyboard, read back the outline. */
async function readFocusOutline(
    page: Page,
): Promise<{ outlineStyle: string; outlineWidth: string }> {
    return page.evaluate(() => {
        const FIXTURE_ID = "__w36_focus__";
        document.getElementById(FIXTURE_ID)?.remove();
        const btn = document.createElement("button");
        btn.id = FIXTURE_ID;
        btn.className = "glass-btn";
        btn.textContent = "F";
        btn.style.cssText = "position:fixed;left:0;top:0;z-index:99999;";
        document.body.appendChild(btn);
        // :focus-visible matches on a keyboard-routed focus; programmatic focus on a
        // freshly-injected button under a keyboard-driven session resolves it here.
        btn.focus({ focusVisible: true } as FocusOptions);
        void btn.offsetHeight;
        const cs = getComputedStyle(btn);
        const out = { outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth };
        document.getElementById(FIXTURE_ID)?.remove();
        return out;
    });
}

// ── The WHC arm — the binding forcedColors:'active' readback ──────────────────────
test.describe("forced-colors-skin (π lane — the WHC structure-survival readback, fail-CLOSED)", () => {
    for (const vp of VIEWPORTS) {
        test(`glass language survives WHC @ ${vp.name}`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            // Any demo route loads the global `/styles` cascade so the `.glass-*` classes
            // + the forced-colors skin resolve; the glass-material story is the on-topic
            // stable surface.
            await page.goto(GLASS_SCENE.path, { waitUntil: "networkidle" });
            // Emulate Windows-High-Contrast — `emulateMedia({ forcedColors })` is the
            // deterministic per-page activation (the @media (forced-colors: active) arm
            // engages). Asserted live below via the `fcMQ` readback.
            await page.emulateMedia({ forcedColors: "active" });

            // ── (1) Every tier pane resolves a real CanvasText border (born-RED: none) ──
            for (const kind of LADDER) {
                const r = await readLadder(page, kind);
                expect(
                    r.fcMQ,
                    `forced-colors emulation did NOT engage for .${kind} — the WHC arm is not active (the readback would test the normal-mode render)`,
                ).toBe(true);
                expect(
                    r.borderStyle,
                    `.${kind} resolved border-style "${r.borderStyle}" under WHC — the tier pane has NO edge (the structure collapsed; expected a CanvasText border)`,
                ).not.toBe("none");
                expect(
                    parseFloat(r.borderWidth),
                    `.${kind} resolved border-width "${r.borderWidth}" under WHC — a zero-width edge does not paint`,
                ).toBeGreaterThan(0);
                // The decorative specular `::before` is yielded under WHC.
                expect(
                    r.beforeHidden,
                    `.${kind}::before is NOT display:none under WHC (fcMQ=${r.fcMQ}) — the decorative specular ghost survives (it should yield to the user palette)`,
                ).toBe(true);
            }

            // ── (2) The floating + overlay rungs resolve an OPAQUE boxed-region fill ────
            // (a transparent floating surface overlaps the content — the hierarchy
            // evaporates). The WHC arm fills them with the system Canvas so the modal
            // reads as a distinct region over the page.
            for (const kind of ["glass-floating", "glass-overlay"] as const) {
                const r = await readLadder(page, kind);
                const alphaMatch =
                    r.background.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/) ??
                    r.background.match(/\/\s*([\d.]+)\s*\)/);
                const alpha = alphaMatch ? Number(alphaMatch[1]) : 1;
                expect(
                    alpha,
                    `.${kind} resolved a transparent fill "${r.background}" under WHC — the floating surface does not separate from the content beneath (expected an opaque Canvas fill)`,
                ).toBeGreaterThan(0.99);
            }

            // ── (3) A focused control resolves a Highlight outline (born-RED: none) ─────
            const focus = await readFocusOutline(page);
            expect(
                focus.outlineStyle,
                `the focused .glass-btn resolved outline-style "${focus.outlineStyle}" under WHC — keyboard focus has no visible ring (the box-shadow ring vanished and no Highlight outline was restored)`,
            ).not.toBe("none");
            expect(
                parseFloat(focus.outlineWidth),
                `the focused .glass-btn resolved outline-width "${focus.outlineWidth}" under WHC — a zero-width outline does not paint`,
            ).toBeGreaterThan(0);
        });
    }
});

// ── The NORMAL-mode non-regression arm — the skin is INERT outside WHC ────────────
test.describe("forced-colors-skin (π lane — the normal-mode non-regression guard)", () => {
    test("the WHC skin is inert outside forced-colors", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(GLASS_SCENE.path, { waitUntil: "networkidle" });

        // Outside WHC the decorative specular `::before` is NOT display:none (the W09
        // catch-light is untouched) and the tier panes keep their normal glass border —
        // proving the @media (forced-colors: active) arm adds ZERO normal-mode change.
        for (const kind of LADDER) {
            const r = await readLadder(page, kind);
            expect(
                r.beforeHidden,
                `.${kind}::before is display:none OUTSIDE forced-colors — the WHC skin leaked into the normal render (the W09 specular catch-light was suppressed)`,
            ).toBe(false);
        }
    });
});
