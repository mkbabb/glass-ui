// AY.W-GLASS — glass-cohesion.spec.ts, the π render readback (the W00 workspace
// member; the BINDING render-side close for the cohesion BLOCKER).
//
// THE DEFECTS (from H-glass-cohesion): the one surface the library CALLS "glass" that
// painted NO glass — the Drawer (D1, an opaque `--background` plate); the Slider range
// blur literal that did NOT flatten with the band (D2, `blur(2px)` off the
// `--glass-level` knob); the Notification on the lightest wash rung instead of the
// floating-chrome tier (D4). The source gate (proof-glass-cohesion.mjs) proves the
// RECIPE STRUCTURE; THIS SPEC PROVES THE RENDER — it mounts each surface over a BUSY
// high-frequency backdrop, reads the RESOLVED paint off the LIVE DOM, and asserts:
//
//   - GLASS-PAINTED: each surface resolves a real non-`none` backdrop-filter blur AND
//     its resolved background carries alpha < 1 (the busy backdrop shows through — it
//     is translucent glass, not an opaque plate). Born-RED on the HEAD Drawer (opaque
//     `--background`, alpha 1).
//   - LEVEL-0 FLATTEN: with `--glass-level: 0` on `:root`, each surface's
//     backdrop-filter resolves to `blur(0)`/`none` AND its background alpha → 1 (solid
//     `--card`). Born-RED on the HEAD Slider range (the literal `blur(2px)` does NOT
//     flatten).
//
// THE BINDING ASSERTION IS THE getComputedStyle READBACK (axe-independent — the
// workspace carries no axe dep). Synthetic fixtures are injected onto the live demo
// (which loads the `/styles` cascade globally, so the `.glass-*` classes + the Slider's
// scoped `.slider-range`/`.slider-thumb` SFC CSS resolve). At ≥2 viewports
// (375×667, 1280×800) × {light, dark}. Fail-CLOSED: an un-flattening or opaque-glass
// surface reds the recompute, exit non-zero (never SKIP-with-EXIT=0).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

const VIEWPORTS = [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

/** A high-frequency multi-stop conic+repeating-linear backdrop — the "busy" field a
 *  translucent glass plate is supposed to let through (so alpha < 1 reads as glass). */
const BUSY_BG =
    "repeating-linear-gradient(45deg, #1d4ed8 0 10px, #f59e0b 10px 20px, #10b981 20px 30px, #ef4444 30px 40px)";

/** Toggle `.dark` on <html> + let the token cascade re-resolve. */
async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(120);
}

interface SurfaceReadout {
    /** The resolved backdrop-filter (e.g. "blur(15px) saturate(1.2)" or "none"). */
    backdropFilter: string;
    /** The resolved background (a translucent glass mix, or an opaque solid). */
    background: string;
    /** Whether the resolved background carries alpha < 1 (the translucency tell). */
    translucent: boolean;
}

/** Parse the alpha out of a serialized color (rgba/oklab/color(srgb …)); default 1. */
function alphaOf(bg: string): number {
    const slash = bg.match(/\/\s*([\d.]+%?)\s*\)/);
    if (slash) {
        const v = slash[1]!;
        return v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v);
    }
    const rgba = bg.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
    if (rgba) return Number(rgba[1]);
    // No alpha channel serialized → opaque.
    return 1;
}

/**
 * Whether a resolved backdrop-filter is a REAL glass blur (non-`none`, non-zero radius).
 * `blur(0px)` (the flattened level-0 state) reads as NO glass.
 */
function isRealBlur(filter: string): boolean {
    if (!filter || filter === "none") return false;
    const m = filter.match(/blur\(\s*([\d.]+)px\s*\)/);
    if (!m) return filter.includes("blur"); // a blur() with a non-px unit still counts
    return Number(m[1]) > 0.5;
}

/**
 * Inject a synthetic fixture for one cohesion surface over the BUSY backdrop, optionally
 * with `--glass-level: 0` on the fixture root (the opaque escape), then read back the
 * surface's resolved backdrop-filter + background off the LIVE painted DOM.
 *
 * `kind`:
 *   - "drawer"       → a `.glass-drawer` sheet (D1)
 *   - "slider-range" → a `.slider-range` (mounted inside a `.glass-slider` track so the
 *                       Slider SFC scoped CSS — compiled into `/styles` per AN.W1 —
 *                       resolves)
 *   - "notification" → a `.glass-floating` notification surface (D4)
 */
async function readSurface(
    page: Page,
    kind: "drawer" | "slider-range" | "notification",
    level0: boolean,
): Promise<SurfaceReadout> {
    return page.evaluate(
        ({ kind, level0, BUSY_BG }) => {
            const FIXTURE_ID = "__wglass_fixture__";
            document.getElementById(FIXTURE_ID)?.remove();

            const host = document.createElement("div");
            host.id = FIXTURE_ID;
            host.style.cssText =
                "position:fixed;left:0;top:0;width:360px;height:200px;z-index:99999;padding:24px;";
            host.style.background = BUSY_BG;
            if (level0) host.style.setProperty("--glass-level", "0");

            let target: HTMLElement;
            if (kind === "slider-range") {
                // The Slider's scoped `.slider-range` recipe is data-slot-agnostic; mount
                // it inside a `[data-slot="slider"].glass-slider` track so the SFC CSS
                // (compiled into the /styles cascade) matches the selectors.
                const root = document.createElement("div");
                root.className = "glass-slider";
                root.setAttribute("data-slot", "slider");
                root.setAttribute("data-variant", "standard");
                root.style.cssText = "position:relative;width:100%;height:24px;";
                const track = document.createElement("div");
                track.className = "slider-track";
                const range = document.createElement("div");
                range.className = "slider-range";
                range.style.cssText = "left:0;right:30%;";
                track.appendChild(range);
                root.appendChild(track);
                host.appendChild(root);
                target = range;
            } else {
                target = document.createElement("div");
                target.className = kind === "drawer" ? "glass-drawer" : "glass-floating";
                target.style.cssText =
                    "position:relative;width:100%;height:100%;border-radius:12px;";
                host.appendChild(target);
            }
            document.body.appendChild(host);

            // Force a layout/paint so the token cascade + color-mix resolve.
            void target.offsetHeight;

            const cs = getComputedStyle(target);
            const backdropFilter =
                cs.backdropFilter || (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter || "none";
            const background = cs.backgroundColor || cs.background;

            const slash = background.match(/\/\s*([\d.]+%?)\s*\)/);
            const rgba = background.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
            let alpha = 1;
            if (slash) {
                const v = slash[1]!;
                alpha = v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v);
            } else if (rgba) {
                alpha = Number(rgba[1]);
            }

            document.getElementById(FIXTURE_ID)?.remove();
            return { backdropFilter, background, translucent: alpha < 0.995 };
        },
        { kind, level0, BUSY_BG },
    );
}

const KINDS = ["drawer", "slider-range", "notification"] as const;

test.describe("glass-cohesion (π lane — the cohesion surfaces paint glass + flatten at level:0, fail-CLOSED)", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`Drawer + Slider + Notification paint glass and flatten @ ${vp.name} (${mode})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                // Any demo route loads the global `/styles` cascade so the `.glass-*`
                // classes + the Slider SFC scoped CSS resolve; the dock route is stable.
                await page.goto(PI_TARGETS.dock.path, { waitUntil: "networkidle" });
                await setDark(page, dark);

                for (const kind of KINDS) {
                    // ── (1) GLASS-PAINTED — a real blur + a translucent plate ──────────
                    const glassed = await readSurface(page, kind, false);
                    expect(
                        isRealBlur(glassed.backdropFilter),
                        `${kind} (${mode}) painted NO real backdrop-filter blur: "${glassed.backdropFilter}" — it is not glass (the D1/D2/D4 collapse)`,
                    ).toBe(true);
                    expect(
                        glassed.translucent,
                        `${kind} (${mode}) background is OPAQUE ("${glassed.background}", alpha 1) — the busy backdrop cannot show through, it is a solid plate not translucent glass`,
                    ).toBe(true);

                    // ── (2) LEVEL-0 FLATTEN — solid --card + blur(0) ───────────────────
                    const flat = await readSurface(page, kind, true);
                    expect(
                        isRealBlur(flat.backdropFilter),
                        `${kind} (${mode}) did NOT flatten its blur at --glass-level:0: "${flat.backdropFilter}" still a real blur — the surface is OFF the level knob (the literal-blur defeat)`,
                    ).toBe(false);
                    expect(
                        flat.translucent,
                        `${kind} (${mode}) did NOT go opaque at --glass-level:0 (bg "${flat.background}", still alpha < 1) — the opacity seam did not invert to solid --card`,
                    ).toBe(false);
                }
            });
        }
    }
});
