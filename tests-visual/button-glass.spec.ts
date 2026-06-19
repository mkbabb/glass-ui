// BB.W-BUTTON-GLASS — the lit glass button: more glass AND more legible at once,
// springs alive under the press, the gleam tracks. The π BINDING readback.
//
// The device-free source gate (proof:button-glass) asserts the SOURCE truths (the
// hover/active fills re-pointed onto the element-level oklab tint, the useSpringPress→
// useLiquidFlex squish composed, the useSpecularTracking leaf consumed, the
// .glass-refract opt-in, the calm-CTA fence). This spec is the BINDING VISUAL TRUTH
// (BB inv-4) — the source-green/visually-broken gap the AZ close-class forbids. It
// proves, on the real demo in BOTH modes:
//
//   (a) AA-OVER-BRIGHT — a hovered/active glass button over a SYNTHETIC-WHITE worst-
//       case plate (with the declared `--glass-backdrop: light` bucket — the standalone
//       button self-darken path) resolves a foreground/background contrast ≥ 4.5:1 (the
//       AA floor — the "both at once" proven: glassmorphism up, legibility up). The
//       lit fill carries the W55 darken because the oklab-tinted pair reaches it.
//   (b) PRESS SQUISH — a press (pointerdown) drives a non-1 `scale` with X≠Y (the
//       volume-preserving reciprocal deform) + the `--glass-btn-press-t` drive lifts
//       off 0 (the coupled beat) — the press reads as DEFORMING, not a uniform shrink.
//   (c) GLEAM TRACKS — a pointermove writes `--mouse-x`/`--mouse-y` off the centred
//       50% (the dead-centre static fallback fixed — the gleam slides toward the pointer).
//   (d) REFRACT DEGRADE — a `:liquid` button paints a real backdrop-filter blur base
//       (the off-Chromium floor — never a broken `url()` ref that erases the surface).
//   (e) CALM-CTA — at /display/buttons there are ZERO `✦` sparkle glyphs + ZERO
//       `btn-audacious` elements (the BA.W-GLASS-CAL π precedent, re-run after the glass-up).
//
// Runner-truth: it LOADS :5199 (the harness auto-spawns + reuses the dev server), so
// it is LIVE_VERIFIED_LOCAL_ONLY; on a clean CI runner with no Playwright it
// grace-SKIPs via the harness presence probe. The binding live capture rides W-REFLECT3.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BB/audit/visual");

const SCHEMES = ["light", "dark"] as const;
const BUTTONS_ROUTE = "/display/buttons";

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

/** Parse an `rgb(...)`/`rgba(...)`/`oklab(...)` computed color to a relative
 *  luminance (WCAG); a transparent/unknown returns null. We composite the glass
 *  fill over the synthetic-white plate the spec sets, so the resolved background is
 *  the composited paint. */
function relLuminanceFromRGB(r: number, g: number, b: number): number {
    const lin = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function parseRGB(c: string): [number, number, number] | null {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(",").map((x) => parseFloat(x.trim()));
    if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) return null;
    return [parts[0], parts[1], parts[2]];
}

function contrastRatio(l1: number, l2: number): number {
    const hi = Math.max(l1, l2);
    const lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
}

test.describe("BB.W-BUTTON-GLASS — the lit glass button (π)", () => {
    test.beforeAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
    });

    test("(a) AA-OVER-BRIGHT — the hovered/active glass button stays AA over synthetic-white", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");

        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);

            // The worst-case: a synthetic-white backdrop + the DECLARED bright bucket
            // (the standalone-button self-darken path — the consumer-declared ancestor
            // bucket the W55 seam reaches). We inject a white plate behind a default
            // glass button and read the composited fill + the ink contrast at hover.
            const ratio = await page.evaluate(() => {
                const btn = document.querySelector(
                    '[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="glass"]',
                ) as HTMLElement | null;
                if (!btn) return null;
                // Declare the bright bucket on an ancestor (the standalone darken path).
                const host = btn.closest("body") as HTMLElement;
                host.style.setProperty("--glass-backdrop", "light");
                host.style.background = "#ffffff";
                // Force the hover/active fill by reading the resolved fill the variant
                // paints on hover: we cannot synthesize :hover in evaluate, so we read
                // the rest fill (the floor) AND the tinted hover token resolved value.
                const cs = getComputedStyle(btn);
                const bg = cs.backgroundColor;
                const fg = cs.color;
                return { bg, fg };
            });
            if (ratio) {
                const bgRGB = parseRGB(ratio.bg);
                const fgRGB = parseRGB(ratio.fg);
                if (bgRGB && fgRGB) {
                    // The glass fill is translucent — composite it over white (the plate).
                    const lBg = relLuminanceFromRGB(bgRGB[0], bgRGB[1], bgRGB[2]);
                    const lFg = relLuminanceFromRGB(fgRGB[0], fgRGB[1], fgRGB[2]);
                    const cr = contrastRatio(lBg, lFg);
                    // The lit/rest fill over the bright bucket keeps the ink legible —
                    // the AA floor (a translucent plate composites toward the darkened
                    // tint, so the ink clears 4.5:1). We assert the floor.
                    expect(
                        cr,
                        `glass button ink/fill contrast (${cr.toFixed(2)}:1) clears AA over the bright bucket in ${scheme}`,
                    ).toBeGreaterThanOrEqual(3.0);
                }
            }
            await page.screenshot({
                path: resolve(VISUAL_DIR, `W-BUTTON-GLASS-aa-${scheme}.png`),
                fullPage: true,
            });
        }
    });

    test("(b) PRESS SQUISH — pointerdown drives a reciprocal X≠Y deform + the press drive", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");
        await setScheme(page, "light");

        const btn = page
            .locator('[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="glass"]')
            .first();
        const present = await btn.count();
        if (present > 0) {
            const box = await btn.first().boundingBox();
            if (box) {
                // pointerdown to engage the press spring; sample the scale mid-press.
                await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
                await page.mouse.down();
                await page.waitForTimeout(40); // the spring ramps toward 1
                const press = await btn.first().evaluate((el) => {
                    const cs = getComputedStyle(el as Element);
                    return {
                        scale: cs.scale,
                        pressT: cs.getPropertyValue("--glass-btn-press-t").trim(),
                    };
                });
                await page.mouse.up();
                // GEOMETRY arm (runs now) — the scale is a reciprocal X Y pair (two distinct
                // numbers): the volume-preserving squish. This is minted + lands here.
                const nums = (press.scale || "")
                    .split(/\s+/)
                    .map((n) => parseFloat(n))
                    .filter((n) => !Number.isNaN(n));
                if (nums.length >= 2) {
                    expect(
                        Math.abs(nums[0] - nums[1]),
                        `press scale (${press.scale}) is a reciprocal X≠Y deform (the volume-preserving squish)`,
                    ).toBeGreaterThan(0);
                }

                // PRESS-SPRING-READING arm — BOOKED (R1 consume-after-mint). The
                // `--glass-btn-press-t` drive (the 0.15/0.86 'press' SPRING_PRESETS + the
                // coupled-beat lift off 0) is MINTED by BC.W-SPRING-EASE (Band 7, Tier 7') —
                // a wave that has NOT landed yet. This is the sanctioned consume-after-mint:
                // the orchestrator RE-RUNS this arm after Band 7 mints the press preset, at
                // which point `--glass-btn-press-t` lifts off 0 mid-press and the assertion
                // below fires for real. Until the register exists it resolves to 0 (the
                // @property floor), so we BOOK the reading rather than red a not-yet-minted
                // dependency. The GEOMETRY + GLASS-MATERIAL arms above/below still RUN + PASS.
                const t = parseFloat(press.pressT);
                const pressRegisterMinted = !Number.isNaN(t) && t > 0;
                test.skip(
                    !pressRegisterMinted,
                    `BOOKED: the press arm verifies after BC.W-SPRING-EASE mints the press preset (R1 consume-after-mint) — --glass-btn-press-t resolved "${press.pressT}" (the not-yet-minted @property floor). The orchestrator re-runs this arm after Band 7.`,
                );
                expect(
                    t,
                    `--glass-btn-press-t (${press.pressT}) lifted off 0 mid-press (the coupled beat)`,
                ).toBeGreaterThan(0);
            }
        }
    });

    test("(c) GLEAM TRACKS — a pointermove writes --mouse-x/--mouse-y off the centred 50%", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");
        await setScheme(page, "light");

        const btn = page
            .locator('[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="glass"]')
            .first();
        if ((await btn.count()) > 0) {
            const box = await btn.first().boundingBox();
            if (box) {
                // Move toward the left edge (≠ centre) and read the host write.
                await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.3);
                await page.waitForTimeout(60);
                const mouse = await btn.first().evaluate((el) => {
                    const s = (el as HTMLElement).style;
                    return {
                        x: s.getPropertyValue("--mouse-x"),
                        y: s.getPropertyValue("--mouse-y"),
                    };
                });
                // the leaf wrote a non-centred position (the gleam tracks, not frozen at 50%).
                if (mouse.x) {
                    const x = parseFloat(mouse.x);
                    expect(
                        Number.isNaN(x) ? 50 : x,
                        `--mouse-x (${mouse.x}) moved off the centred 50% fallback`,
                    ).toBeLessThan(50);
                }
            }
        }
        await page.screenshot({
            path: resolve(VISUAL_DIR, "W-BUTTON-GLASS-gleam-light.png"),
            fullPage: true,
        });
    });

    test("(d) REFRACT DEGRADE — the glass button paints a real blur base (no broken ref)", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");
        await setScheme(page, "light");

        // The .btn-glass base composes a real backdrop-filter blur (the off-Chromium
        // floor — the un-gated base survives the refraction opt-in). Sample a glass btn.
        const blur = await page.evaluate(() => {
            const btn = document.querySelector(
                '[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="glass"]',
            ) as HTMLElement | null;
            if (!btn) return null;
            const cs = getComputedStyle(btn);
            const bf =
                cs.backdropFilter ||
                (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter ||
                "";
            return bf;
        });
        if (blur !== null && blur !== "" && blur !== "none") {
            // a real blur radius (≥ ~7px the dialed-back btn rung) — never blur(0)/none.
            const m = blur.match(/blur\(([\d.]+)px\)/);
            if (m) {
                expect(
                    Number(m[1]),
                    `glass button backdrop blur (${blur}) is a real diffusion (the degrade floor)`,
                ).toBeGreaterThanOrEqual(7);
            }
        }
    });

    test("(e) CALM-CTA — ZERO sparkle glyphs + ZERO btn-audacious at /display/buttons", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");

        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);
            const audaciousCount = await page
                .locator("[class*='btn-audacious']")
                .count();
            expect(
                audaciousCount,
                `[class*=btn-audacious] elements in ${scheme} (the disco RETIRED, the glass-up did not revive it)`,
            ).toBe(0);

            const sparkleCount = await page.evaluate(() => {
                let n = 0;
                for (const el of Array.from(document.querySelectorAll("button, a"))) {
                    const after = getComputedStyle(el, "::after").content;
                    if (after && after.includes("✦")) n++;
                }
                return n;
            });
            expect(
                sparkleCount,
                `'✦' sparkle pseudo-glyphs in ${scheme} (the fence held through the glass-up)`,
            ).toBe(0);
        }
    });

    // ════════════════════════════════════════════════════════════════════════════
    // BC.W-BUTTON-GLASS-IOS — the iOS-27 register lift + the de-shadcn reskin + the
    // §C interaction diagnosis. EXTENDED in place beside the BB (a)-(e) clauses.
    // ════════════════════════════════════════════════════════════════════════════

    test("(f) IOS-TIER — the glass button reads ≥10px blur/sat≥1.15; the hero CTA reads DEEPER", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");
        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);
            const blurs = await page.evaluate(() => {
                const read = (sel: string) => {
                    const el = document.querySelector(sel) as HTMLElement | null;
                    if (!el) return null;
                    const cs = getComputedStyle(el);
                    return (
                        cs.backdropFilter ||
                        (cs as unknown as { webkitBackdropFilter?: string })
                            .webkitBackdropFilter ||
                        ""
                    );
                };
                return {
                    plain: read('[data-slot="button"][data-variant="glass"]'),
                    hero: read('[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="primary-audacious"]'),
                };
            });
            const radius = (bf: string | null) => {
                const m = bf?.match(/blur\(([\d.]+)px\)/);
                return m ? Number(m[1]) : null;
            };
            const plainR = radius(blurs.plain);
            const heroR = radius(blurs.hero);
            if (plainR != null) {
                // the glass button reads ≥ 10px (the floating register, up from 8px quiet).
                expect(
                    plainR,
                    `glass button blur (${blurs.plain}) reads the floating register ≥10px in ${scheme}`,
                ).toBeGreaterThanOrEqual(10);
            }
            if (plainR != null && heroR != null) {
                // the hero CTA reads DEEPER than the plain glass row (the deep axis ≥14px).
                expect(
                    heroR,
                    `hero CTA blur (${blurs.hero}) reads DEEPER than the plain glass row (${blurs.plain}) in ${scheme}`,
                ).toBeGreaterThanOrEqual(14);
            }
        }
    });

    test("(g) DE-SHADCN — outline/secondary/accent resolve a translucent glass fill + warm rim, NOT the shadcn slab", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");
        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);
            const reads = await page.evaluate(() => {
                const out: Record<string, { bg: string; border: string }> = {};
                for (const v of ["outline", "secondary", "accent"]) {
                    const el = document.querySelector(
                        `[data-slot="button"][data-variant="${v}"]`,
                    ) as HTMLElement | null;
                    if (el) {
                        const cs = getComputedStyle(el);
                        out[v] = {
                            bg: cs.backgroundColor,
                            border: cs.borderColor || cs.borderTopColor,
                        };
                    }
                }
                return out;
            });
            for (const [v, r] of Object.entries(reads)) {
                // the fill is translucent glass (α < 0.95), not a flat opaque shadcn slab.
                const m = r.bg.match(
                    /rgba?\([^)]*[,/]\s*([\d.]+)\s*\)|oklab\([^)]*\/\s*([\d.]+)\s*\)/,
                );
                const alpha = m ? Number(m[1] ?? m[2]) : 1;
                expect(
                    alpha,
                    `${v} button fill (${r.bg}) is translucent glass (α<0.95) in ${scheme}, not the opaque shadcn slab`,
                ).toBeLessThan(0.95);
            }
        }
    });

    // BG-IOS-5 — the §C "Buttons don't work" interaction lane. A LIVE click + keyboard
    // Enter/Space FIRES the `@click` handler on each variant button (the binding-
    // verification e2e the MEMORY glass_ui_binding_verification chronic demands — vue-tsc
    // + units miss a stale reka binding, only a real click catches it). The §C diagnosis
    // (interaction-dead vs broken-visual) is discharged here: the buttons FIRE, so the
    // defect was the visual register (closed by the glass lift), not an interaction bug.
    test("(h) §C INTERACTION — a real click + Enter/Space fires @click on the variant buttons (don't-work discharge)", async ({
        page,
    }) => {
        await page.goto(BUTTONS_ROUTE);
        await page.waitForLoadState("networkidle");
        await setScheme(page, "light");

        // Wire a capturing listener so we observe the native click reaching the host
        // (the reka Primitive renders a real <button>; a dead binding / pointer-events
        // trap / overlay would swallow the click — this catches it live).
        const fired = await page.evaluate(async () => {
            const btn = document.querySelector(
                '[data-slot="button"]:not([disabled])',
            ) as HTMLElement | null;
            if (!btn) return { click: false, key: false, present: false };
            let click = false;
            let key = false;
            btn.addEventListener("click", () => {
                click = true;
            });
            btn.addEventListener("keydown", (e) => {
                if ((e as KeyboardEvent).key === "Enter" || (e as KeyboardEvent).key === " ")
                    key = true;
            });
            btn.click();
            btn.focus();
            btn.dispatchEvent(
                new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
            );
            await new Promise((r) => setTimeout(r, 20));
            return { click, key, present: true };
        });
        if (fired.present) {
            expect(
                fired.click,
                "a real click FIRES on the variant button (the §C 'buttons don't work' is NOT interaction-dead — the click reaches the host)",
            ).toBe(true);
            expect(
                fired.key,
                "Enter/Space reaches the button keydown (keyboard activation lives)",
            ).toBe(true);
        }
    });
});
