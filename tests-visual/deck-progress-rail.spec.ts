// AX.W24 — proof:deck-progress-rail, the π-lane DOM-cascade computed-style readback.
//
// The cardinal AX instrument for W24 (the AW string-scan blindspot's closure): the
// prior gate string-asserted the `.glass-progress-rail` recipe READS the
// `--progress-rail-*` tokens — GREEN while the colour retint was a SILENT NO-OP (the
// `@layer utilities` `bg-primary` ALWAYS outranked the `@layer components` recipe) and
// the rightward box-shadow glow was EATEN by the ProgressRoot's `overflow-hidden` clip.
// This spec RENDERS the live deck-progress story under a `:root { --progress-rail-fill }`
// override and reads back the painted computed style — the precept-valid runtime form.
//
// READBACK MECHANISM: this is NOT a GPU readPixels gate (the deck rail is a DOM-cascade
// recipe, not a WebGL canvas). The harden critique (constellation result[30]) names
// DeckProgress as one of the FOUR π-lane consumers that need COMPUTED-STYLE readback,
// NOT GPU readPixels. So this spec reads `getComputedStyle(indicator).backgroundColor`
// and `.boxShadow` and `getComputedStyle(rail).height` — the browser's resolved cascade,
// which is the truth the string-scan could never see.
//
// DEVICE: a real browser (the orchestrator's real-GPU lane) or a headless Chromium — the
// cascade resolution is device-independent (no GPU needed for getComputedStyle), so this
// arm is robust on EVERY runner that carries the workspace + a live demo dev server.
//
// THE THREE ASSERTIONS (born-RED at HEAD eaba94f):
//   (a) the `--progress-rail-fill` override hue WINS the indicator's computed
//       `background-color` (the F1 cascade fix — at HEAD it painted --primary, a
//       near-black warm ink, IGNORING the override; the override is a distinct GREEN).
//   (b) the indicator carries an `inset` box-shadow glow (the F2 inset-glow fix — at
//       HEAD the glow was an OUTSET rightward shadow eaten by the clip; the new form is
//       a trailing inset edge inside the clip).
//   (c) the rail root reads as the hairline `--progress-rail-h` (≤ a few px, NOT the
//       16px default Progress bar) — the rail is a thin sliver.

import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

// The distinct override hue — a saturated GREEN, far from glass-ui's warm-ink
// `--primary` (`hsl(24 10% 10%)`, a near-black). A pass requires the painted fill to
// read as THIS green, proving the override flowed through --progress-rail-fill →
// --progress-fill → the indicator's token-read background (the cascade fix).
const OVERRIDE_FILL = "rgb(0, 200, 0)";

/** Parse a CSS `rgb(...)`/`rgba(...)` string to [r,g,b]. */
function parseRGB(s: string): [number, number, number] | null {
    const m = s.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

test.describe("deck-progress-rail (π lane — DOM-cascade computed-style, fail-CLOSED)", () => {
    test("the --progress-rail-fill override WINS + the inset glow + the hairline height", async ({
        page,
    }) => {
        const scene = resolveScene("navigation", "deck-progress");
        await page.goto(scene.path);

        // The ProgressRoot carries `data-slot="progress"` + the `.glass-progress-rail`
        // class; the indicator is its first element child (the ProgressIndicator).
        const rail = page.locator(".glass-progress-rail").first();
        await rail.waitFor({ state: "visible", timeout: 30_000 });
        const indicator = rail.locator(":scope > *").first();
        await indicator.waitFor({ state: "attached", timeout: 30_000 });

        // Inject the override AFTER the SPA has mounted, into `document.head` — a
        // `<style>` appended to `document.documentElement` before boot is wiped by the
        // Vue app's head management (it does not survive the mount), so the robust
        // point is post-mount into `<head>`. This sets the consumer-facing
        // `--progress-rail-fill` axis the rail recipe routes through (→ --progress-fill
        // → the indicator's token-read background).
        await page.evaluate((fill) => {
            const style = document.createElement("style");
            style.setAttribute("data-pi-deck-override", "");
            style.textContent = `:root { --progress-rail-fill: ${fill}; }`;
            document.head.appendChild(style);
        }, OVERRIDE_FILL);
        // Let the style apply + the indicator re-resolve its computed background.
        await page.waitForTimeout(100);

        // ── (a) the override hue WINS the indicator's computed background-color.
        const bg = await indicator.evaluate((el) =>
            getComputedStyle(el).backgroundColor,
        );
        const rgb = parseRGB(bg);
        expect(rgb, `indicator background-color "${bg}" did not parse as rgb`).not.toBeNull();
        const [r, g, b] = rgb!;
        // The override is rgb(0,200,0): green dominant, red/blue low. The HEAD default
        // (--primary, a warm near-black) would read as a dark low-saturation colour with
        // green NOT dominant. Assert the override won: g is high AND clearly dominates.
        expect(g, `indicator green channel ${g} — the override (g≈200) did not win`).toBeGreaterThan(120);
        expect(g, `indicator green ${g} does not dominate red ${r} — override lost to --primary`).toBeGreaterThan(r + 60);
        expect(g, `indicator green ${g} does not dominate blue ${b} — override lost to --primary`).toBeGreaterThan(b + 60);

        // ── (b) the inset glow renders (the F2 fix — a trailing inset edge inside the
        // clip, NOT the eaten outset shadow).
        const shadow = await indicator.evaluate((el) => getComputedStyle(el).boxShadow);
        expect(shadow, "indicator has no box-shadow glow").not.toBe("none");
        expect(shadow, `indicator box-shadow "${shadow}" is not an inset glow (an outset shadow is eaten by the overflow-hidden clip)`).toContain("inset");

        // ── (c) the rail reads as the hairline --progress-rail-h, NOT a 16px bar.
        const height = await rail.evaluate((el) => getComputedStyle(el).height);
        const px = parseFloat(height);
        expect(px, `rail height "${height}" did not parse`).not.toBeNaN();
        expect(px, `rail height ${px}px is not a hairline (the 16px default Progress bar leaked — the recipe height did not apply)`).toBeLessThanOrEqual(8);
        expect(px, `rail height ${px}px is degenerate (zero)`).toBeGreaterThan(0);
    });
});
