// BA.W-SURFACE-AXIS — surface-axis.spec.ts, the BINDING π readback (the captured
// own-surface truth; the cardinal-lesson DELTA). proof:surface-axis proves the axis
// is FACTORED + every surface THREADS it (the source structure); THIS spec proves the
// painted RENDER — each rung paints translucent-where-glass/solid-where-opaque/frosted-
// where-veil over a busy backdrop, BOTH modes, over the W-DARK-MATERIAL-corrected dark
// register. The A1-1/P-1 source-green/visually-broken gap is the exact AZ close-class
// failure BA exists to fix, so the live render is the binding truth, never the source
// diff alone.
//
// THE BINDING ARMS (synthetic fixtures injected onto a live demo route, which loads the
// global `/styles` cascade so the `.glass-*` + `[data-surface]` seam resolves; mirrors
// dark-material.spec.ts / adaptive-glass.spec.ts):
//
//   (a) GLASS + VEIL TRANSLUCENT — over a busy backdrop, a tier with `[data-surface="glass"]`
//       AND a tier with `[data-surface="veil"]` resolve a TRANSLUCENT background (alpha < 1)
//       — the floating-tier-collapse case now reads as glass, NOT a flat opaque slab.
//   (b) OPAQUE SOLID — a tier with `[data-surface="opaque"]` resolves a SOLID background
//       (alpha = 1; `--glass-level:0` → the `--card` plate) — the explicit opt-out paints.
//   (c) VEIL STRIPS THE BORDER/RIM — the veil rung resolves `border-style: none` (the
//       borderless text-legibility plate; the boxed look gone).
//   (d) SKELETON OVER-GLASS — `<Skeleton surface="glass">` resolves a TRANSLUCENT base
//       block (alpha < 1) while the default `surface="opaque"` stays solid (the IG-C2
//       register: the frosted plate reads through; the opaque default unchanged).
//   (e) CONTROL REST TIER UNIFIED — the `--control-surface-bg` register resolves the SAME
//       background for `.input-pill` and `.control-surface` (the form family is ONE
//       material at rest; the no-gray seam — input ≈ select, no gray fork).
//
// + the captured DELTA frames written to the DELTA dir.
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED: an opaque glass/veil rung / a translucent
// opaque rung / a bordered veil / an opaque skeleton-glass / a diverged control tier
// reds the recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual", import.meta.url),
);

// A stable demo route that loads the global `/styles` cascade so the tokens resolve.
const HOST_ROUTE = "/containers/dialog";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// A busy backdrop (a multi-stop gradient — the floating-tier-collapse case).
const BUSY_BG =
    "linear-gradient(135deg, #1b2a4a 0%, #7a3b8f 38%, #c14b3a 72%, #d8c14a 100%)";

function alphaOf(bg: string): number | null {
    // Parse the alpha out of an rgba()/color(srgb …/α)/oklab(… /α) background.
    const rgba = bg.match(/rgba?\(\s*[\d.]+[,\s]+[\d.]+[,\s]+[\d.]+(?:[,\s/]+([\d.]+))?/i);
    if (rgba) return rgba[1] === undefined ? 1 : Number(rgba[1]);
    const fn = bg.match(/(?:color\(\s*srgb\s+[\d.]+\s+[\d.]+\s+[\d.]+|oklab\(\s*[-\d.%]+\s+[-\d.%]+\s+[-\d.%]+)\s*\/\s*([\d.]+%?)\s*\)/i);
    if (fn) {
        const v = fn[1]!;
        return v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v);
    }
    // No explicit alpha → opaque.
    if (/^(color\(srgb|oklab\(|rgb\()/i.test(bg)) return 1;
    return null;
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.waitForTimeout(150);
}

/**
 * Mount synthetic surfaces composing a base tier + each `[data-surface]` rung over a
 * busy backdrop, read the resolved background + border-style per rung.
 */
async function readSurfaceRungs(
    page: Page,
    busyBg: string,
): Promise<{ surface: string; bg: string; borderStyle: string }[]> {
    return page.evaluate((bg) => {
        const FIXTURE_ID = "__sa_rungs__";
        document.getElementById(FIXTURE_ID)?.remove();
        const host = document.createElement("div");
        host.id = FIXTURE_ID;
        host.style.cssText = `position:fixed;left:0;top:0;width:480px;height:360px;background:${bg};z-index:99999;padding:16px;display:flex;flex-direction:column;gap:8px;`;
        const SURFACES = ["glass", "veil", "opaque"];
        for (const s of SURFACES) {
            const el = document.createElement("div");
            // The floating tier (the Dialog/Sheet/Popover band) + the shared decoration.
            el.className = "glass-floating";
            el.setAttribute("data-surface", s);
            el.style.cssText = "width:100%;height:64px;border-radius:8px;";
            host.appendChild(el);
        }
        document.body.appendChild(host);
        void host.offsetHeight;
        const out: { surface: string; bg: string; borderStyle: string }[] = [];
        for (const child of Array.from(host.children)) {
            const cs = getComputedStyle(child as HTMLElement);
            out.push({
                surface: (child as HTMLElement).getAttribute("data-surface")!,
                bg: cs.backgroundColor,
                borderStyle: cs.borderTopStyle,
            });
        }
        host.remove();
        return out;
    }, busyBg);
}

/**
 * BB.W-SURFACE-AXIS-COMPLETE — mount synthetic Toast/Button surfaces composing
 * exactly what the SFCs render and read the resolved background + border-style per
 * rung. Toast paints `surfaceClass(surface, "floating")` (the `glass-floating` base
 * + the veil/opaque decoration class) + `:data-surface`; Button paints its glass
 * variant register (`glass-wash btn-glass`) + the bare decoration class + the
 * `:data-surface` attr. The translucent-where-glass / solid-where-opaque /
 * frosted-where-veil truth must hold for both — the eleven-surface enrollment reads
 * as ONE material grammar.
 */
async function readComponentRungs(
    page: Page,
    busyBg: string,
    component: "toast" | "button",
): Promise<{ surface: string; bg: string; borderStyle: string }[]> {
    return page.evaluate(
        ({ bg, component }) => {
            const FIXTURE_ID = `__sa_${component}__`;
            document.getElementById(FIXTURE_ID)?.remove();
            const host = document.createElement("div");
            host.id = FIXTURE_ID;
            host.style.cssText = `position:fixed;left:0;top:0;width:480px;height:360px;background:${bg};z-index:99999;padding:16px;display:flex;flex-direction:column;gap:8px;`;
            const SURFACES = ["glass", "veil", "opaque"] as const;
            for (const s of SURFACES) {
                const el = document.createElement(
                    component === "button" ? "button" : "div",
                );
                if (component === "toast") {
                    // surfaceClass(s, "floating") — the Toast base + decoration.
                    el.className = "glass-floating";
                    if (s === "veil") el.classList.add("veil-surface");
                    if (s === "opaque") el.classList.add("glass-opaque");
                } else {
                    // Button's glass variant register + the bare decoration class
                    // (the `surfaceDecoration` computed — NOT a forced base tier).
                    el.className = "glass-wash btn-glass";
                    if (s === "veil") el.classList.add("veil-surface");
                    if (s === "opaque") el.classList.add("glass-opaque");
                }
                el.setAttribute("data-surface", s);
                el.style.cssText = "width:100%;height:64px;border-radius:8px;";
                host.appendChild(el);
            }
            document.body.appendChild(host);
            void host.offsetHeight;
            const out: { surface: string; bg: string; borderStyle: string }[] = [];
            for (const child of Array.from(host.children)) {
                const cs = getComputedStyle(child as HTMLElement);
                out.push({
                    surface: (child as HTMLElement).getAttribute("data-surface")!,
                    bg: cs.backgroundColor,
                    borderStyle: cs.borderTopStyle,
                });
            }
            host.remove();
            return out;
        },
        { bg: busyBg, component },
    );
}

/** Read the resolved Skeleton over-glass vs opaque base block backgrounds. */
async function readSkeletonRungs(
    page: Page,
): Promise<{ glassBg: string; opaqueBg: string }> {
    return page.evaluate(() => {
        const FIXTURE_ID = "__sa_skel__";
        document.getElementById(FIXTURE_ID)?.remove();
        const host = document.createElement("div");
        host.id = FIXTURE_ID;
        host.style.cssText = "position:fixed;left:0;top:0;width:240px;z-index:99999;";
        const g = document.createElement("div");
        g.className = "skeleton-over-glass";
        const o = document.createElement("div");
        o.className = "bg-muted";
        for (const el of [g, o]) {
            el.style.cssText = "width:100%;height:24px;";
            host.appendChild(el);
        }
        document.body.appendChild(host);
        void host.offsetHeight;
        const glassBg = getComputedStyle(g).backgroundColor;
        const opaqueBg = getComputedStyle(o).backgroundColor;
        host.remove();
        return { glassBg, opaqueBg };
    });
}

/** Read the resolved `--control-surface-bg` register vs `.input-pill` / `.control-surface`. */
async function readControlTier(
    page: Page,
): Promise<{ registerBg: string; inputBg: string; controlBg: string }> {
    return page.evaluate(() => {
        const FIXTURE_ID = "__sa_ctrl__";
        document.getElementById(FIXTURE_ID)?.remove();
        const host = document.createElement("div");
        host.id = FIXTURE_ID;
        host.style.cssText = "position:fixed;left:0;top:0;width:240px;z-index:99999;";
        const probe = document.createElement("div");
        probe.style.background = "var(--control-surface-bg)";
        const input = document.createElement("input");
        input.className = "input-pill";
        const control = document.createElement("div");
        control.className = "control-surface";
        for (const el of [probe, input, control]) {
            (el as HTMLElement).style.cssText += ";width:100%;height:24px;";
            host.appendChild(el);
        }
        document.body.appendChild(host);
        void host.offsetHeight;
        const registerBg = getComputedStyle(probe).backgroundColor;
        const inputBg = getComputedStyle(input).backgroundColor;
        const controlBg = getComputedStyle(control).backgroundColor;
        host.remove();
        return { registerBg, inputBg, controlBg };
    });
}

test.describe("surface-axis (π — the shared {glass·veil·opaque} surface decoration, fail-CLOSED)", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
    });

    for (const vp of VIEWPORTS) {
        for (const dark of [false, true] as const) {
            const mode = dark ? "dark" : "light";

            test(`(a-c) glass/veil translucent · opaque solid · veil borderless @ ${vp.name} ${mode}`, async ({ page }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);

                const rungs = await readSurfaceRungs(page, BUSY_BG);
                const byKey = Object.fromEntries(rungs.map((r) => [r.surface, r]));

                // (a) glass + veil translucent (alpha < 1 — the backdrop reads through).
                const glassA = alphaOf(byKey.glass!.bg);
                const veilA = alphaOf(byKey.veil!.bg);
                expect(glassA, `glass bg "${byKey.glass!.bg}"`).not.toBeNull();
                expect(veilA, `veil bg "${byKey.veil!.bg}"`).not.toBeNull();
                expect(glassA!, "glass surface must be translucent (alpha < 1)").toBeLessThan(0.999);
                expect(veilA!, "veil surface must be translucent (alpha < 1)").toBeLessThan(0.999);

                // (b) opaque solid (alpha = 1 — the --glass-level:0 --card plate).
                const opaqueA = alphaOf(byKey.opaque!.bg);
                expect(opaqueA, `opaque bg "${byKey.opaque!.bg}"`).not.toBeNull();
                expect(opaqueA!, "opaque surface must be solid (alpha = 1)").toBeGreaterThan(0.999);

                // (c) veil strips the border/rim (the borderless text plate).
                expect(
                    byKey.veil!.borderStyle,
                    "veil surface must be borderless (border-style: none)",
                ).toBe("none");
            });

            // BB.W-SURFACE-AXIS-COMPLETE — Toast + Button now thread the axis. Each
            // must paint translucent-where-glass / solid-where-opaque / frosted-
            // borderless-where-veil over the busy backdrop, BOTH modes (the R8-12
            // "buttons + toasts" close reads as ONE material with the other nine).
            for (const component of ["toast", "button"] as const) {
                test(`(f-${component}) ${component} glass/veil translucent · opaque solid · veil borderless @ ${vp.name} ${mode}`, async ({ page }) => {
                    await page.setViewportSize({ width: vp.width, height: vp.height });
                    await setDark(page, dark);

                    const rungs = await readComponentRungs(page, BUSY_BG, component);
                    const byKey = Object.fromEntries(rungs.map((r) => [r.surface, r]));

                    // glass + veil translucent (the backdrop reads through).
                    const glassA = alphaOf(byKey.glass!.bg);
                    const veilA = alphaOf(byKey.veil!.bg);
                    expect(glassA, `${component} glass bg "${byKey.glass!.bg}"`).not.toBeNull();
                    expect(veilA, `${component} veil bg "${byKey.veil!.bg}"`).not.toBeNull();
                    expect(glassA!, `${component} surface=glass must be translucent`).toBeLessThan(0.999);
                    expect(veilA!, `${component} surface=veil must be translucent`).toBeLessThan(0.999);

                    // opaque solid (the --glass-level:0 --card plate).
                    const opaqueA = alphaOf(byKey.opaque!.bg);
                    expect(opaqueA, `${component} opaque bg "${byKey.opaque!.bg}"`).not.toBeNull();
                    expect(opaqueA!, `${component} surface=opaque must be solid (alpha = 1)`).toBeGreaterThan(0.999);

                    // veil strips the border/rim (the borderless plate).
                    expect(
                        byKey.veil!.borderStyle,
                        `${component} surface=veil must be borderless (border-style: none)`,
                    ).toBe("none");
                });
            }

            // BB.W-SURFACE-AXIS-COMPLETE — the tone⊥surface composition: a TONED
            // toast (`variant="destructive"` → `feedback-tone-destructive`) over
            // `surface="glass"` reads as colored GLASS — the tone tint rides ON the
            // resolved translucent surface (the W-FEEDBACK-TONE register intact under
            // the new axis), NOT an opaque tone slab.
            test(`(g) toned toast over glass reads as colored GLASS (tone⊥surface) @ ${vp.name} ${mode}`, async ({ page }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);
                const tonedBg = await page.evaluate((bg) => {
                    const FIXTURE_ID = "__sa_toned__";
                    document.getElementById(FIXTURE_ID)?.remove();
                    const host = document.createElement("div");
                    host.id = FIXTURE_ID;
                    host.style.cssText = `position:fixed;left:0;top:0;width:360px;height:120px;background:${bg};z-index:99999;padding:16px;`;
                    const el = document.createElement("div");
                    // The Toast destructive tone arm over the resolved glass surface.
                    el.className = "glass-floating feedback-tone feedback-tone-destructive";
                    el.setAttribute("data-surface", "glass");
                    el.style.cssText = "width:100%;height:64px;border-radius:8px;";
                    host.appendChild(el);
                    document.body.appendChild(host);
                    void host.offsetHeight;
                    const out = getComputedStyle(el).backgroundColor;
                    host.remove();
                    return out;
                }, BUSY_BG);
                const a = alphaOf(tonedBg);
                expect(a, `toned-toast bg "${tonedBg}"`).not.toBeNull();
                expect(a!, "toned toast over glass must stay translucent (colored glass)").toBeLessThan(0.999);
            });

            test(`(d) skeleton over-glass translucent, opaque default solid @ ${vp.name} ${mode}`, async ({ page }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);
                const { glassBg, opaqueBg } = await readSkeletonRungs(page);
                const glassA = alphaOf(glassBg);
                const opaqueA = alphaOf(opaqueBg);
                expect(glassA, `skeleton-over-glass bg "${glassBg}"`).not.toBeNull();
                expect(glassA!, "Skeleton surface=glass must be translucent").toBeLessThan(0.999);
                expect(opaqueA, `skeleton opaque bg "${opaqueBg}"`).not.toBeNull();
                expect(opaqueA!, "Skeleton default (bg-muted) stays solid").toBeGreaterThan(0.999);
            });

            test(`(e) control REST tier unified (input ≈ control register, no gray fork) @ ${vp.name} ${mode}`, async ({ page }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);
                const { registerBg, inputBg, controlBg } = await readControlTier(page);
                // The input-pill and the .control-surface class both resolve the SAME
                // register background — ONE material at rest.
                expect(inputBg, "input-pill reads the shared register").toBe(registerBg);
                expect(controlBg, ".control-surface reads the shared register").toBe(registerBg);
            });
        }
    }

    // ── The captured DELTA frame (whole-fixture, both modes, desktop) ────────────────
    test("DELTA capture — the surface-axis rungs over a busy backdrop", async ({ page }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.setViewportSize({ width: 1280, height: 800 });
        for (const dark of [false, true] as const) {
            await setDark(page, dark);
            await readSurfaceRungs(page, BUSY_BG);
            // Re-mount persistently for the capture (readSurfaceRungs removes its host).
            await page.evaluate((bg) => {
                const host = document.createElement("div");
                host.id = "__sa_capture__";
                host.style.cssText = `position:fixed;left:24px;top:24px;width:520px;background:${bg};z-index:99999;padding:20px;display:flex;flex-direction:column;gap:12px;border-radius:16px;`;
                for (const s of ["glass", "veil", "opaque"]) {
                    const el = document.createElement("div");
                    el.className = "glass-floating";
                    el.setAttribute("data-surface", s);
                    el.style.cssText =
                        "width:100%;height:72px;border-radius:10px;display:flex;align-items:center;justify-content:center;font:600 14px system-ui;color:var(--foreground);";
                    el.textContent = `surface="${s}"`;
                    host.appendChild(el);
                }
                document.body.appendChild(host);
            }, BUSY_BG);
            await page.waitForTimeout(200);
            await page.screenshot({
                path: `${VISUAL_DIR}W-SURFACE-AXIS-rungs-${dark ? "dark" : "light"}.png`,
            });
            await page.evaluate(() => document.getElementById("__sa_capture__")?.remove());
        }
    });
});
