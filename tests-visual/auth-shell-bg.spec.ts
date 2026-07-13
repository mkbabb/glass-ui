// auth-shell-bg (π lane) — BI.W-AUTH-SHELL-BG (PERF-2 / UF-K4 / FAM-5).
//
// The auth-shell mounted the library's HEAVIEST shader (a 4.87MP live Fourier SDF)
// as a decorative page-background wash BEHIND the form, PLUS a brand-panel aurora,
// PLUS the recessive shell aurora — THREE live GL contexts on one route (the
// "miserable" performance UF-K4). The wave retires the fourier page-wash (a teaching
// SDF is NEVER an ambient background) and holds the one-GL budget: the auth-shell
// drops to ONE live GL context (the brand-panel aurora), the page declares a zero-GL
// `grid` wash, and the route is enrolled in SELF_STAGES_GL so the shell stands down.
//
// This is the BINDING runtime census the device-free `proof:one-gl-per-route` gate
// cannot see (the source gate proves the enumeration; only a LIVE canvas count proves
// the paint). The `getContext` instrumentation records ACTUAL GPU-context allocations
// (webgl / webgl2 / webgpu) with NO side-effect (a bare `canvas.getContext("webgl2")`
// count would ALLOCATE a context on an un-armed canvas — a false positive).
//
// Assertions (born-RED at the pre-wave HEAD — 3 GL contexts + a live fourier field):
//   1. ONE-GL — /compositions/auth-shell mounts <= 1 live GPU context (down from 3),
//      in BOTH modes.
//   2. NO-FOURIER — no full-bleed FourierField canvas survives as a page background
//      (the 4.87MP field is gone; the brand aurora is a contained left-panel canvas).
//   3. FORM-CLEAN — the auth form reads clean over the calm backdrop (the email +
//      password inputs + the sign-in button are present and interactive).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const ROUTE = "/compositions/auth-shell";

// Instrument getContext BEFORE any page script runs so we record every GPU context
// the page ACTUALLY allocates (no side-effect count). A context whose canvas is later
// removed from the DOM (disposed on route swap) is filtered out by `isConnected`.
async function instrumentGpuContexts(page: Page): Promise<void> {
    await page.addInitScript(() => {
        const w = window as unknown as { __glCanvases?: Set<HTMLCanvasElement> };
        const glCanvases = new Set<HTMLCanvasElement>();
        w.__glCanvases = glCanvases;
        const origGet = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (
            this: HTMLCanvasElement,
            type: string,
            ...args: unknown[]
        ) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const ctx = (origGet as any).call(this, type, ...args);
            if (
                ctx &&
                (type === "webgl" ||
                    type === "webgl2" ||
                    type === "experimental-webgl" ||
                    type === "webgpu")
            ) {
                glCanvases.add(this);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return ctx as any;
        } as typeof HTMLCanvasElement.prototype.getContext;
    });
}

async function readCensus(page: Page): Promise<{
    liveGl: number;
    canvasCount: number;
    fullBleedGl: number;
    hasEmail: boolean;
    hasPassword: boolean;
    hasSignIn: boolean;
}> {
    return page.evaluate(() => {
        const w = window as unknown as { __glCanvases?: Set<HTMLCanvasElement> };
        // The authoritative count: canvases the page ACTUALLY allocated a GPU context
        // on (instrumented, no side-effect), still connected to the DOM.
        const allocated = [...(w.__glCanvases ?? [])].filter((c) => c.isConnected);
        const liveGl = allocated.length;
        const canvasCount = document.querySelectorAll("canvas").length;

        // A FULL-BLEED GL field is a viewport-sized GPU canvas (the retired fourier
        // page-wash / a leaked shell aurora). The brand aurora is a CONTAINED
        // left-panel canvas (< 90% of the viewport), so it is not full-bleed.
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const fullBleedGl = allocated.filter((c) => {
            const r = c.getBoundingClientRect();
            return r.width >= vw * 0.9 && r.height >= vh * 0.9;
        }).length;

        const hasEmail = Boolean(document.querySelector("#auth-email"));
        const hasPassword = Boolean(document.querySelector("#auth-password"));
        const hasSignIn = [...document.querySelectorAll("button")].some((b) =>
            /sign in/i.test(b.textContent ?? ""),
        );

        return { liveGl, canvasCount, fullBleedGl, hasEmail, hasPassword, hasSignIn };
    });
}

async function gotoAuthShell(page: Page, dark: boolean): Promise<void> {
    await instrumentGpuContexts(page);
    if (dark) await page.emulateMedia({ colorScheme: "dark" });
    await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
    if (dark) {
        await page.evaluate(() => document.documentElement.classList.add("dark"));
    }
    await page.waitForSelector("#auth-email", { timeout: 10_000 }).catch(() => {});
    // Let the aurora arm its GPU context + any late canvas mount settle.
    await page.waitForTimeout(1200);
}

for (const dark of [false, true]) {
    const mode = dark ? "dark" : "light";
    test.describe(`auth-shell-bg (π lane — one-GL budget, ${mode})`, () => {
        test(`ONE-GL + NO-FOURIER + FORM-CLEAN (${mode})`, async ({ page }) => {
            await gotoAuthShell(page, dark);
            const census = await readCensus(page);
            console.log(`[auth-shell-bg ${mode}] census`, JSON.stringify(census));

            // 1. ONE-GL — <= 1 live GPU context (the brand aurora; shell suppressed,
            //    fourier page-wash retired). Born-RED at HEAD: 3 contexts.
            expect(
                census.liveGl,
                `/compositions/auth-shell should mount <= 1 live GPU context (${mode}); got ${census.liveGl}`,
            ).toBeLessThanOrEqual(1);

            // 2. NO-FOURIER — no full-bleed GPU page-wash survives (the 4.87MP fourier
            //    field is gone; the brand aurora is a contained left-panel canvas).
            expect(
                census.fullBleedGl,
                `no full-bleed GPU page-wash should survive (${mode}); got ${census.fullBleedGl}`,
            ).toBe(0);

            // 3. FORM-CLEAN — the auth form reads clean over the calm backdrop.
            expect(census.hasEmail, "the email input is present").toBe(true);
            expect(census.hasPassword, "the password input is present").toBe(true);
            expect(census.hasSignIn, "the sign-in button is present").toBe(true);
        });
    });
}
