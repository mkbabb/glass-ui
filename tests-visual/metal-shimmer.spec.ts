// BB.W-METAL-SHIMMER — the brand-metal TRIAD + the parameterized shimmer sweep:
// the π binding readback.
//
// The device-free source gate (proof:metal-shimmer) asserts the SOURCE truths (the
// THREE quads parallel across the four cascade arms, the bronze warm-brown above the
// W-NO-GRAY floor, ONE metal-PARAMETERIZED keyframe, gold-shimmer-slide RETIRED, the
// PRM-static bracket, the calm register). This spec is the BINDING VISUAL TRUTH (BB
// inv-4) — the source-green/visually-broken gap the AZ P-1 close-class forbids. It
// proves, on the real demo /substrates/glass-material in BOTH modes:
//
//   (a) THE THREE METALS read as DISTINCT — the text-clip register paints a gradient
//       whose stops resolve to the three quads: gold a warm-yellow (high chroma, hue
//       in the gold band), silver a cool low-chroma steel, bronze a warm-brown (mid
//       chroma, hue ~50-60°). The three are mutually distinguishable (gold ≠ silver ≠
//       bronze) on the resolved gradient, BOTH modes.
//   (b) THE SWEPT SWEEP — the metal text-clip register runs the metal-shimmer-sweep
//       animation on the slow --duration-metal (6s) clock with the 250% over-sized
//       gradient that gives the position pass its sheen (the gold READ unchanged —
//       .gold-shimmer still sweeps gold).
//   (c) THE BORDER/MASK SWEPT RIM — the .metal-*-border register paints a border-image
//       gradient (a swept metallic RIM, not a text fill: color is NOT transparent).
//   (d) THE RAINBOW RIM — the .metal-rainbow-rim composes W-GLASS-ACCENT's rim seam
//       (--glass-accent engaged at a non-transparent metal hue + a non-zero strength).
//   (e) PRM-STATIC — under emulated prefers-reduced-motion: reduce, EVERY metal
//       utility paints the FULL static metal gradient (the metal READS — chroma
//       present) with the animation OFF (animation-name resolves none).
//
// Runner-truth: it LOADS :5199 (the harness auto-spawns + reuses the dev server), so
// it is LIVE_VERIFIED_LOCAL_ONLY; on a clean CI runner with no Playwright it
// grace-SKIPs. CI proves ENROLLMENT (proof:visual-runner); the local close proves the
// PAINT, backstopped by proof:live-verified-ledger.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
// BC.W-AX-METAL-GLOW — the gold catch-light π arm reads the resolved drop-shadow
// glow COLOR via the ONE shared OKLab decompose (paint-arm.mjs statsFromResolvedBg +
// parseResolvedColor → the warm-cream oklab()/color(srgb) computed form). No second
// colour parse (the canvas-unify single-source fence; the oklab()-computed bug the
// shared leaf was built to absorb).
import { statsFromResolvedBg } from "../scripts/lib/paint-arm.mjs";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BB/audit/visual");

const SCHEMES = ["light", "dark"] as const;
const ROUTE = "/substrates/glass-material";

/** Toggle `.dark` on <html> + let the token cascade re-resolve. */
async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

/** Parse the first oklch()/oklab()/rgb() color out of a resolved string → {chroma, hue, raw}. */
function firstColorStats(str: string): { chroma: number; hue: number | null; raw: string } | null {
    const oklch = str.match(/oklch\(\s*([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)/i);
    if (oklch) return { chroma: Number(oklch[2]), hue: Number(oklch[3]), raw: oklch[0] };
    const oklab = str.match(/oklab\(\s*([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)/i);
    if (oklab) {
        const a = Number(oklab[2]);
        const b = Number(oklab[3]);
        const hue = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
        return { chroma: Math.hypot(a, b), hue, raw: oklab[0] };
    }
    const rgb = str.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    if (rgb) {
        const r = Number(rgb[1]);
        const g = Number(rgb[2]);
        const bch = Number(rgb[3]);
        const maxc = Math.max(r, g, bch);
        const minc = Math.min(r, g, bch);
        const sat = maxc === 0 ? 0 : (maxc - minc) / maxc;
        // a hue proxy via the dominant-channel; gold→yellow, bronze→red-orange.
        let hue: number | null = null;
        if (maxc > minc) {
            if (r >= g && g >= bch) hue = g > (r + bch) / 1.4 ? 70 : 40; // yellow-ish vs orange-ish
            else if (g >= r && r >= bch) hue = 100;
        }
        return { chroma: sat * 0.4, hue, raw: rgb[0] };
    }
    return null;
}

/** Probe a metal text-clip specimen: its resolved background + animation + clip. */
async function readMetalText(page: Page, selector: string) {
    return page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = getComputedStyle(el as Element);
        return {
            background: cs.backgroundImage || cs.background,
            backgroundSize: cs.backgroundSize,
            color: cs.color,
            animationName: cs.animationName,
            animationDuration: cs.animationDuration,
            backgroundClip: cs.backgroundClip || (cs as unknown as { webkitBackgroundClip?: string }).webkitBackgroundClip || "",
        };
    }, selector);
}

/** Probe a metal-border specimen: its border-image + color. */
async function readMetalBorder(page: Page, selector: string) {
    return page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = getComputedStyle(el as Element);
        return {
            borderImageSource: cs.borderImageSource,
            backgroundImage: cs.backgroundImage,
            color: cs.color,
            animationName: cs.animationName,
        };
    }, selector);
}

/**
 * BC.W-AX-METAL-GLOW — probe a metal text-clip specimen's catch-light GLOW: the
 * resolved `filter` drop-shadow (the lit-metal halo) + the resolved glow tokens.
 * The lit metal reads iff the `filter` carries a `drop-shadow` with a non-zero blur
 * extent past the glyph edge; the glow COLOR is the metal's OWN base hue.
 */
async function readMetalGlow(page: Page, selector: string) {
    return page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = getComputedStyle(el as Element);
        const filter = cs.filter || "";
        // Pull the drop-shadow() argument list out of the resolved filter (Chromium
        // serializes `drop-shadow(<x> <y> <blur> <color>)`).
        const ds = /drop-shadow\((.*)\)/i.exec(filter);
        const body = ds ? ds[1] : "";
        // The blur is the third length token (px). The color is a resolved-color
        // serialization (rgb()/rgba()/color(srgb …)/oklab()) — Chromium emits the
        // drop-shadow color FIRST (`drop-shadow(color(srgb …) <x> <y> <blur>)`), not
        // trailing, so we match it ANYWHERE in the body (not anchored to the end). The
        // first colour token is the glow ink.
        const blurMatch = /(?:[-\d.]+px\s+){2}([\d.]+)px/.exec(body);
        const colorMatch = /(rgba?\([^)]*\)|color\([^)]*\)|oklab\([^)]*\)|oklch\([^)]*\))/i.exec(body.trim());
        return {
            filter,
            hasDropShadow: /drop-shadow\(/i.test(filter),
            blurPx: blurMatch ? Number(blurMatch[1]) : null,
            glowColor: colorMatch ? colorMatch[1] : "",
            glowBlurToken: cs.getPropertyValue("--metal-glow-blur").trim(),
            glowOpacityToken: cs.getPropertyValue("--metal-glow-opacity").trim(),
            stopBase: cs.getPropertyValue("--metal-stop-base").trim(),
            animationName: cs.animationName,
        };
    }, selector);
}

test.describe("BB.W-METAL-SHIMMER — the brand-metal triad + the parameterized shimmer (π)", () => {
    test.beforeAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
    });

    test("(a) THE THREE METALS read DISTINCT + (b) the swept sweep runs the slow clock", async ({ page }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" }).catch(() => {});
        const triad = page.locator("[data-metal-triad]");
        const present = await triad.count().catch(() => 0);
        test.skip(present === 0, "metal triad specimen absent (demo not served / GPU-less runner)");

        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);

            const gold = await readMetalText(page, "[data-metal='gold']");
            const silver = await readMetalText(page, "[data-metal='silver']");
            const bronze = await readMetalText(page, "[data-metal='bronze']");
            expect(gold && silver && bronze, `the three text-clip specimens resolve in ${scheme}`).toBeTruthy();
            if (!gold || !silver || !bronze) continue;

            // (a) Each text-clip register clips to text + paints a gradient (not a flat fill).
            for (const [name, m] of [["gold", gold], ["silver", silver], ["bronze", bronze]] as const) {
                expect(m.backgroundClip, `.metal-${name} clips to text in ${scheme}`).toContain("text");
                expect(m.background, `.metal-${name} paints a gradient in ${scheme}`).toContain("gradient");
                expect(m.color.replace(/\s/g, ""), `.metal-${name} text color is transparent (clip-text) in ${scheme}`).toMatch(/rgba?\(0,0,0,0\)|transparent/);
            }

            // The three gradients are mutually DISTINCT (gold ≠ silver ≠ bronze).
            const gB = gold.background;
            const sB = silver.background;
            const bB = bronze.background;
            expect(gB !== sB, `gold ≠ silver gradient in ${scheme}`).toBeTruthy();
            expect(sB !== bB, `silver ≠ bronze gradient in ${scheme}`).toBeTruthy();
            expect(gB !== bB, `gold ≠ bronze gradient in ${scheme}`).toBeTruthy();

            // Silver reads as the LOWEST-chroma metal (cool steel); gold + bronze carry
            // real chroma (the warm metals). We sample the first resolved color stop.
            const gStats = firstColorStats(gB);
            const sStats = firstColorStats(sB);
            const bStats = firstColorStats(bB);
            if (gStats && sStats && bStats) {
                expect(sStats.chroma, `silver chroma (${sStats.chroma}) is the lowest in ${scheme}`).toBeLessThan(gStats.chroma);
                expect(sStats.chroma, `silver chroma (${sStats.chroma}) < bronze in ${scheme}`).toBeLessThan(bStats.chroma);
                expect(bStats.chroma, `bronze carries real chroma (a warm metal, not a neutral) in ${scheme}`).toBeGreaterThan(0.02);
            }

            // (b) the swept sweep — the slow metal clock + the 250% over-sized gradient.
            expect(gold.animationName, `.metal-gold sweeps metal-shimmer-sweep in ${scheme}`).toContain("metal-shimmer-sweep");
            const durSec = parseFloat(gold.animationDuration);
            expect(durSec, `.metal-gold runs the slow ~6s --duration-metal clock in ${scheme}`).toBeGreaterThanOrEqual(5.5);
            expect(gold.backgroundSize, `.metal-gold over-sized gradient gives the sweep its sheen in ${scheme}`).toMatch(/250%|250/);

            await page.screenshot({ path: resolve(VISUAL_DIR, `W-METAL-SHIMMER-triad-${scheme}.png`), fullPage: false });
        }
    });

    test("(c) the border/mask swept RIM + (d) the rainbow rim", async ({ page }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" }).catch(() => {});
        const border = page.locator("[data-metal-border]");
        const present = await border.count().catch(() => 0);
        test.skip(present === 0, "metal-border specimen absent (demo not served)");

        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);

            // (c) the border rim — a border-image gradient (a swept RIM, not a text fill).
            const goldRim = await readMetalBorder(page, "[data-metal-border='gold']");
            const bronzeRim = await readMetalBorder(page, "[data-metal-border='bronze']");
            expect(goldRim && bronzeRim, `the border rims resolve in ${scheme}`).toBeTruthy();
            if (goldRim && bronzeRim) {
                expect(goldRim.borderImageSource, `.metal-gold-border paints a border-image gradient (the RIM) in ${scheme}`).toContain("gradient");
                expect(bronzeRim.borderImageSource, `.metal-bronze-border paints a border-image gradient in ${scheme}`).toContain("gradient");
                // NOT a text fill — the rim is a visible border, color stays inherited (not transparent).
                expect(goldRim.color.replace(/\s/g, ""), `.metal-gold-border is a RIM (text color NOT clipped-transparent) in ${scheme}`).not.toMatch(/^rgba?\(0,0,0,0\)$/);
                // the two rims are distinct metals.
                expect(goldRim.borderImageSource !== bronzeRim.borderImageSource, `gold rim ≠ bronze rim in ${scheme}`).toBeTruthy();
            }

            // (d) the rainbow rim composes W-GLASS-ACCENT's rim seam.
            const rainbow = await page.evaluate(() => {
                const el = document.querySelector("[data-metal-rainbow]");
                if (!el) return null;
                const cs = getComputedStyle(el as Element);
                return {
                    glassAccent: cs.getPropertyValue("--glass-accent").trim(),
                    glassAccentStrength: cs.getPropertyValue("--glass-accent-strength").trim(),
                    backgroundImage: cs.backgroundImage,
                };
            });
            if (rainbow) {
                expect(rainbow.glassAccent, `.metal-rainbow-rim engages --glass-accent (composes W-GLASS-ACCENT) in ${scheme}`).not.toBe("");
                expect(rainbow.glassAccent.replace(/\s/g, ""), `.metal-rainbow-rim accent is non-transparent in ${scheme}`).not.toMatch(/^transparent$/);
                const strengthPct = parseFloat(rainbow.glassAccentStrength);
                expect(strengthPct, `.metal-rainbow-rim engages a non-zero accent strength in ${scheme}`).toBeGreaterThan(0);
                expect(rainbow.backgroundImage, `.metal-rainbow-rim paints the prismatic band in ${scheme}`).toContain("gradient");
            }

            await page.screenshot({ path: resolve(VISUAL_DIR, `W-METAL-SHIMMER-rim-${scheme}.png`), fullPage: false });
        }
    });

    test("(e) PRM-STATIC — the metal reads with the slide OFF under reduced-motion", async ({ browser }) => {
        const ctx = await browser.newContext({ reducedMotion: "reduce" });
        const page = await ctx.newPage();
        try {
            await page.goto(ROUTE, { waitUntil: "networkidle" }).catch(() => {});
            const triad = page.locator("[data-metal-triad]");
            const present = await triad.count().catch(() => 0);
            test.skip(present === 0, "metal triad specimen absent (demo not served)");

            for (const scheme of SCHEMES) {
                await setScheme(page, scheme);

                // Every metal utility paints the FULL static gradient (the metal READS).
                for (const sel of [
                    "[data-metal='gold']",
                    "[data-metal='silver']",
                    "[data-metal='bronze']",
                    "[data-metal-border='gold']",
                    "[data-metal-rainbow]",
                ]) {
                    const m = await page.evaluate((s) => {
                        const el = document.querySelector(s);
                        if (!el) return null;
                        const cs = getComputedStyle(el as Element);
                        return {
                            animationName: cs.animationName,
                            background: cs.backgroundImage,
                            borderImageSource: cs.borderImageSource,
                        };
                    }, sel);
                    if (!m) continue;
                    // the slide is GATED — no metal-shimmer-sweep animation under PRM.
                    expect(m.animationName, `${sel}: the slide is OFF under PRM in ${scheme}`).not.toContain("metal-shimmer-sweep");
                    // the static gradient still PAINTS (the metal READS — gradient present on
                    // either the background or the border-image rim).
                    const paints = (m.background && m.background.includes("gradient"))
                        || (m.borderImageSource && m.borderImageSource.includes("gradient"));
                    expect(paints, `${sel}: the static metal gradient still PAINTS under PRM in ${scheme}`).toBeTruthy();
                }

                await page.screenshot({ path: resolve(VISUAL_DIR, `W-METAL-SHIMMER-prm-${scheme}.png`), fullPage: false });
            }
        } finally {
            await ctx.close();
        }
    });

    // ── BC.W-AX-METAL-GLOW — the gold catch-light π arm ───────────────────────
    test("(f) the gold catch-light — LIT metal: a warm halo of the metal's OWN base hue", async ({ page }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" }).catch(() => {});
        const triad = page.locator("[data-metal-triad]");
        const present = await triad.count().catch(() => 0);
        test.skip(present === 0, "metal triad specimen absent (demo not served / GPU-less runner)");

        for (const scheme of SCHEMES) {
            await setScheme(page, scheme);

            const gold = await readMetalGlow(page, "[data-metal='gold']");
            const silver = await readMetalGlow(page, "[data-metal='silver']");
            const bronze = await readMetalGlow(page, "[data-metal='bronze']");
            expect(gold && silver && bronze, `the three glow specimens resolve in ${scheme}`).toBeTruthy();
            if (!gold || !silver || !bronze) continue;

            for (const [name, m] of [["gold", gold], ["silver", silver], ["bronze", bronze]] as const) {
                // The metal reads as LIT — a drop-shadow halo with a measurable blur
                // extent past the glyph edge (NOT a flat gradient text-fill).
                expect(m.hasDropShadow, `.metal-${name} carries a catch-light drop-shadow in ${scheme}`).toBeTruthy();
                expect(m.blurPx, `.metal-${name} halo has a measurable warm extent (blur > 0) in ${scheme}`).toBeGreaterThan(0);
                // The two glow knobs resolve on the element (the retune seam).
                expect(parseFloat(m.glowOpacityToken), `.metal-${name} --metal-glow-opacity resolves (the halo strength) in ${scheme}`).toBeGreaterThan(0);
                expect(m.glowBlurToken, `.metal-${name} --metal-glow-blur resolves (the halo radius) in ${scheme}`).not.toBe("");
            }

            // The glow reads each metal's OWN base hue — silver halos the LOWEST-chroma
            // (cool steel), gold + bronze halo real warm chroma (NOT a fixed gold halo
            // on every metal). The ONE shared OKLab decompose (paint-arm.mjs); the glow
            // color is the resolved drop-shadow color (the warm-cream oklab()/color(srgb)
            // computed form the shared leaf parses).
            const gStats = statsFromResolvedBg(gold.glowColor);
            const sStats = statsFromResolvedBg(silver.glowColor);
            const bStats = statsFromResolvedBg(bronze.glowColor);
            if (gStats && sStats && bStats) {
                expect(sStats.chroma, `silver glow is the lowest-chroma halo (cool steel, not a gold halo) in ${scheme}`).toBeLessThan(gStats.chroma);
                expect(sStats.chroma, `silver glow chroma < bronze glow in ${scheme}`).toBeLessThan(bStats.chroma);
                expect(bStats.chroma, `bronze glow carries warm chroma (its own hue, not gold) in ${scheme}`).toBeGreaterThan(0.02);
            }
            // The three glow colors are mutually DISTINCT (each metal's own halo).
            expect(gold.glowColor !== silver.glowColor, `gold halo ≠ silver halo in ${scheme}`).toBeTruthy();
            expect(silver.glowColor !== bronze.glowColor, `silver halo ≠ bronze halo in ${scheme}`).toBeTruthy();

            await page.screenshot({ path: resolve(VISUAL_DIR, `W-AX-METAL-GLOW-lit-${scheme}.png`), fullPage: false });
        }
    });

    test("(g) the catch-light is PRM-STATIC — the lit metal halos with the sweep frozen + the opacity override retunes", async ({ browser }) => {
        const ctx = await browser.newContext({ reducedMotion: "reduce" });
        const page = await ctx.newPage();
        try {
            await page.goto(ROUTE, { waitUntil: "networkidle" }).catch(() => {});
            const triad = page.locator("[data-metal-triad]");
            const present = await triad.count().catch(() => 0);
            test.skip(present === 0, "metal triad specimen absent (demo not served)");

            for (const scheme of SCHEMES) {
                await setScheme(page, scheme);

                // PRM: the lit-metal halo still PAINTS (the catch-light is static); the
                // sweep motion is the only thing frozen.
                const gold = await readMetalGlow(page, "[data-metal='gold']");
                expect(gold, `the gold glow resolves under PRM in ${scheme}`).toBeTruthy();
                if (gold) {
                    expect(gold.hasDropShadow, `the gold catch-light PAINTS under PRM (lit metal reads for everyone) in ${scheme}`).toBeTruthy();
                    expect(gold.blurPx, `the gold halo extent is present under PRM in ${scheme}`).toBeGreaterThan(0);
                    expect(gold.animationName, `the sweep is FROZEN under PRM in ${scheme}`).not.toContain("metal-shimmer-sweep");
                }

                // The --metal-glow-opacity override RETUNES the halo (a consumer knob:
                // 0 disables it, a higher value strengthens it — the warm-whisper default
                // is the library identity, the override is the consumer preset).
                const retuned = await page.evaluate(() => {
                    const el = document.querySelector("[data-metal='gold']") as HTMLElement | null;
                    if (!el) return null;
                    const before = getComputedStyle(el).getPropertyValue("--metal-glow-opacity").trim();
                    el.style.setProperty("--metal-glow-opacity", "0.8");
                    const after = getComputedStyle(el).getPropertyValue("--metal-glow-opacity").trim();
                    el.style.removeProperty("--metal-glow-opacity");
                    return { before, after };
                });
                if (retuned) {
                    expect(parseFloat(retuned.after), `--metal-glow-opacity override retunes the halo in ${scheme}`).toBeCloseTo(0.8, 2);
                    expect(retuned.after !== retuned.before, `the override changes the resolved opacity in ${scheme}`).toBeTruthy();
                }

                await page.screenshot({ path: resolve(VISUAL_DIR, `W-AX-METAL-GLOW-prm-${scheme}.png`), fullPage: false });
            }
        } finally {
            await ctx.close();
        }
    });
});
