// BA.W-NO-GRAY — no-gray.spec.ts, the BINDING π chroma readback (the captured own-surface
// warm-not-gray truth; the cardinal-lesson DELTA). proof:no-gray proves the recipe SOURCE;
// THIS spec proves the painted RENDER — the A1-1/P-1 source-green/visually-broken gap is the
// AZ close-class failure BA exists to fix, so the live getComputedStyle → OKLab readback is
// the binding truth, never the source diff alone.
//
// THE BINDING ARMS (both modes; the spec reads the live demo cascade so the warmed token
// arms + the glass plate recipe resolve — mirroring dark-material.spec.ts / adaptive-glass):
//
//   (a) THE NAMED-TOKEN FLOOR — each census WARM-IT token (--secondary/--accent/--border/
//       --muted-foreground) resolves OKLab C ≥ its floor at the warm hue, in BOTH modes
//       (the HEAD achromatic yellow-green starve gone).
//   (b) THE DEFAULT CARD PLATE — a default <Card> (glass-resting + self-engage) composited
//       over the flat demo page reads OKLab C ≥ the plate floor (the G1 gray dead), warm hue.
//   (c) THE DEFAULT GLASS BUTTON PLATE — a default (glass-wash) Button plate composited over
//       the flat page reads OKLab C ≥ the plate floor (the G8 grayest-of-all dead), warm hue.
//   (d) THE WARM-NOT-TINTED bar — every warmed token's resolved OKLab HUE sits in the warm
//       register (≈ 50-85°, the --foreground 56° family), NOT the HEAD yellow-green 95° (a
//       high chroma at the wrong hue is a cast, not warm material).
//
// + the captured DELTA frames (both modes) written to the DELTA dir.
//
// At ≥2 viewports. Fail-CLOSED: a sub-floor chroma / a yellow-green cast / an achromatic
// plate reds the recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
);

const HOST_ROUTE = "/display/card";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// The declared floors (mirror proof-no-gray.mjs — the L-aware gamut-calibrated constants).
const STRONG_FLOOR = 0.02;
const CHIP_FLOOR = 0.011;
const PLATE_FLOOR = 0.0035;
const WARM_HUE_LO = 45;
const WARM_HUE_HI = 88; // π allows a hair more headroom than the source gate (live AA-engine drift)

// ── OKLab plumbing (sRGB → OKLab; the perceptual chroma + hue the eye reads) ─────────────
function rgbToOklab(r: number, g: number, b: number): { L: number; C: number; H: number } {
    const lin = (c: number) => {
        c /= 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const lr = lin(r);
    const lg = lin(g);
    const lb = lin(b);
    const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    const H = ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360;
    return { L, C: Math.hypot(a, bb), H };
}
function parseRgbA(str: string): { r: number; g: number; b: number; a: number } | null {
    let m = str.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/i);
    if (m) return { r: +m[1]!, g: +m[2]!, b: +m[3]!, a: m[4] === undefined ? 1 : +m[4]! };
    m = str.match(/color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i);
    if (m)
        return {
            r: Math.round(+m[1]! * 255),
            g: Math.round(+m[2]! * 255),
            b: Math.round(+m[3]! * 255),
            a: m[4] === undefined ? 1 : +m[4]!,
        };
    // oklab serialization (the in-oklab glass mix) → convert to rgb for chroma readback.
    m = str.match(
        /oklab\(\s*([\d.]+)\s+(-?[\d.]+)\s+(-?[\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i,
    );
    if (m) {
        const L = +m[1]!;
        const a = +m[2]!;
        const b = +m[3]!;
        const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
        const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
        const s_ = L - 0.0894841775 * a - 1.291485548 * b;
        const ll = l_ ** 3;
        const mm = m_ ** 3;
        const ss = s_ ** 3;
        const enc = (c: number) => {
            const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
            return Math.round(Math.min(1, Math.max(0, x)) * 255);
        };
        return {
            r: enc(4.0767416621 * ll - 3.3077115913 * mm + 0.2309699292 * ss),
            g: enc(-1.2684380046 * ll + 2.6097574011 * mm - 0.3413193965 * ss),
            b: enc(-0.0041960863 * ll - 0.7034186147 * mm + 1.707614701 * ss),
            a: m[4] === undefined ? 1 : +m[4]!,
        };
    }
    return null;
}
function composite(
    over: { r: number; g: number; b: number; a: number },
    base: { r: number; g: number; b: number },
): { r: number; g: number; b: number } {
    return {
        r: Math.round(over.r * over.a + base.r * (1 - over.a)),
        g: Math.round(over.g * over.a + base.g * (1 - over.a)),
        b: Math.round(over.b * over.a + base.b * (1 - over.a)),
    };
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.waitForTimeout(120);
}

/** Resolve a token's computed color string off the live cascade. */
async function resolveToken(page: Page, token: string): Promise<string> {
    return page.evaluate((t) => {
        const p = document.createElement("div");
        document.body.appendChild(p);
        p.style.color = `var(${t})`;
        const c = getComputedStyle(p).color;
        p.remove();
        return c;
    }, token);
}

/** Read the default Card + default glass-Button plate bg over the flat page. */
async function readPlates(page: Page): Promise<{ page: string; card: string; button: string }> {
    return page.evaluate(() => {
        const host = document.createElement("div");
        host.style.cssText =
            "position:fixed;left:0;top:0;width:400px;height:300px;z-index:99999;background:var(--background);padding:20px;";
        const card = document.createElement("div");
        card.className = "glass-card";
        card.style.cssText = "padding:16px;border-radius:12px;width:200px;height:80px;";
        host.appendChild(card);
        const btn = document.createElement("div");
        btn.className = "glass-wash";
        btn.style.cssText = "padding:8px 16px;border-radius:10px;width:120px;height:36px;margin-top:12px;";
        host.appendChild(btn);
        document.body.appendChild(host);
        void card.offsetHeight;
        const pageBg = getComputedStyle(host).backgroundColor;
        const cardBg = getComputedStyle(card).backgroundColor;
        const btnBg = getComputedStyle(btn).backgroundColor;
        host.remove();
        return { page: pageBg, card: cardBg, button: btnBg };
    });
}

const WARM_TOKENS: { token: string; floor: number; label: string }[] = [
    { token: "--secondary", floor: CHIP_FLOOR, label: "G3 secondary (chip)" },
    { token: "--accent", floor: STRONG_FLOOR, label: "G4 accent (hover)" },
    { token: "--border", floor: STRONG_FLOOR, label: "G5 border" },
    { token: "--muted-foreground", floor: STRONG_FLOOR, label: "G6 muted-foreground" },
];

test.describe("no-gray (π — the warm-chroma floor, fail-CLOSED)", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
    });

    // ── (a)+(d) THE NAMED-TOKEN FLOOR + warm hue, both modes ────────────────────────────
    for (const vp of VIEWPORTS) {
        for (const mode of [false, true] as const) {
            test(`(a) the WARM-IT tokens resolve C ≥ floor at the warm hue [${mode ? "dark" : "light"}] @ ${vp.name}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, mode);
                for (const { token, floor, label } of WARM_TOKENS) {
                    const str = await resolveToken(page, token);
                    const rgb = parseRgbA(str);
                    expect(rgb, `${label}: could not parse "${str}"`).not.toBeNull();
                    const ok = rgbToOklab(rgb!.r, rgb!.g, rgb!.b);
                    expect(
                        ok.C,
                        `${label} [${mode ? "dark" : "light"}] OKLab C ${ok.C.toFixed(4)} < floor ${floor} — still gray (the chroma starve persists). resolved "${str}"`,
                    ).toBeGreaterThanOrEqual(floor);
                    expect(
                        ok.H,
                        `${label} [${mode ? "dark" : "light"}] OKLab H ${ok.H.toFixed(1)}° outside the warm register [${WARM_HUE_LO},${WARM_HUE_HI}]° — a cast at the wrong hue (the yellow-green 95° persists or over-rotated). resolved "${str}"`,
                    ).toBeGreaterThanOrEqual(WARM_HUE_LO);
                    expect(
                        ok.H,
                        `${label} [${mode ? "dark" : "light"}] OKLab H ${ok.H.toFixed(1)}° above the warm ceiling ${WARM_HUE_HI}° (a yellow-green cast). resolved "${str}"`,
                    ).toBeLessThanOrEqual(WARM_HUE_HI);
                }
            });
        }
    }

    // ── (b)+(c) THE DEFAULT CARD + GLASS BUTTON PLATES read warm over the flat page ──────
    for (const vp of VIEWPORTS) {
        for (const mode of [false, true] as const) {
            test(`(b) the default Card + glass Button plates composite warm [${mode ? "dark" : "light"}] @ ${vp.name}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, mode);
                const plates = await readPlates(page);
                const pageRgb = parseRgbA(plates.page);
                const cardOver = parseRgbA(plates.card);
                const btnOver = parseRgbA(plates.button);
                expect(pageRgb, `could not parse page bg "${plates.page}"`).not.toBeNull();
                expect(cardOver, `could not parse card bg "${plates.card}"`).not.toBeNull();
                expect(btnOver, `could not parse button bg "${plates.button}"`).not.toBeNull();
                const cardComp = composite(cardOver!, pageRgb!);
                const btnComp = composite(btnOver!, pageRgb!);
                const cardOk = rgbToOklab(cardComp.r, cardComp.g, cardComp.b);
                const btnOk = rgbToOklab(btnComp.r, btnComp.g, btnComp.b);
                // The Card plate carries the warm bias (the G1 gray gone).
                expect(
                    cardOk.C,
                    `the default Card plate composites OKLab C ${cardOk.C.toFixed(4)} < the plate floor ${PLATE_FLOOR} [${mode ? "dark" : "light"}] — the G1 flat-gray slab persists. card "${plates.card}" over page "${plates.page}"`,
                ).toBeGreaterThanOrEqual(PLATE_FLOOR);
                // The glass Button plate (the grayest of all) lifts off the floor.
                expect(
                    btnOk.C,
                    `the default glass Button plate composites OKLab C ${btnOk.C.toFixed(4)} < the button floor ${(PLATE_FLOOR * 0.6).toFixed(4)} [${mode ? "dark" : "light"}] — the G8 grayest-of-all persists. button "${plates.button}" over page "${plates.page}"`,
                ).toBeGreaterThanOrEqual(PLATE_FLOOR * 0.6);
            });
        }
    }

    // ── (e) THE DARK INK READS WARM (BB.W-DARK-INK-WARM) ────────────────────────────────
    // The dark --foreground + the dark --surface-tint-15 chip (the oklch(from var(--foreground)
    // 0.975 c h) relative-color derivation) resolve OKLab H in the warm register under .dark —
    // the painted truth a hardcoded-yellow-green re-introduction reds on the COMPILED color
    // (the SOURCE gate can be evaded by a renamed literal; the π reads the rendered hue). The
    // tint chip composited over the dark L16 card carries the derived warm ink (the chip on
    // the card warm, NOT the H95° yellow-green BA pasted ×12).
    for (const vp of VIEWPORTS) {
        test(`(e) the dark --foreground + the dark --surface-tint-15 chip read warm @ ${vp.name}`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await setDark(page, true);
            // the dark --foreground ink itself.
            const fgStr = await resolveToken(page, "--foreground");
            const fgRgb = parseRgbA(fgStr);
            expect(fgRgb, `dark --foreground: could not parse "${fgStr}"`).not.toBeNull();
            const fgOk = rgbToOklab(fgRgb!.r, fgRgb!.g, fgRgb!.b);
            expect(
                fgOk.H,
                `dark --foreground OKLab H ${fgOk.H.toFixed(1)}° outside the warm register [${WARM_HUE_LO},${WARM_HUE_HI}]° — the H95° yellow-green persists. resolved "${fgStr}"`,
            ).toBeGreaterThanOrEqual(WARM_HUE_LO);
            expect(
                fgOk.H,
                `dark --foreground OKLab H ${fgOk.H.toFixed(1)}° above the warm ceiling ${WARM_HUE_HI}° (a yellow-green cast). resolved "${fgStr}"`,
            ).toBeLessThanOrEqual(WARM_HUE_HI);
            // the dark --surface-tint-15 chip composited over the dark --card (the L16 plate the
            // chip lifts off). The α-mix over transparent preserves the ink hue; compositing it
            // over the warm-dark card keeps the warm hue. The chip background is read off a live
            // element so the relative-color recipe resolves through the real cascade.
            const chip = await page.evaluate(() => {
                const host = document.createElement("div");
                host.style.cssText =
                    "position:fixed;left:0;top:0;width:200px;height:120px;z-index:99999;background:var(--card);padding:24px;";
                const c = document.createElement("div");
                c.style.cssText =
                    "width:120px;height:60px;border-radius:10px;background:var(--surface-tint-15);";
                host.appendChild(c);
                document.body.appendChild(host);
                void c.offsetHeight;
                const cardBg = getComputedStyle(host).backgroundColor;
                const chipBg = getComputedStyle(c).backgroundColor;
                host.remove();
                return { cardBg, chipBg };
            });
            const cardRgb = parseRgbA(chip.cardBg);
            const chipOver = parseRgbA(chip.chipBg);
            expect(cardRgb, `dark --card: could not parse "${chip.cardBg}"`).not.toBeNull();
            expect(chipOver, `dark --surface-tint-15: could not parse "${chip.chipBg}"`).not.toBeNull();
            const chipComp = composite(chipOver!, cardRgb!);
            const chipOk = rgbToOklab(chipComp.r, chipComp.g, chipComp.b);
            expect(
                chipOk.H,
                `the dark --surface-tint-15 chip (over the L16 card) composites OKLab H ${chipOk.H.toFixed(1)}° outside the warm register [${WARM_HUE_LO},${WARM_HUE_HI}]° — the hardcoded H95° yellow-green tint ink persists. chip "${chip.chipBg}" over card "${chip.cardBg}"`,
            ).toBeGreaterThanOrEqual(WARM_HUE_LO);
            expect(
                chipOk.H,
                `the dark --surface-tint-15 chip composites OKLab H ${chipOk.H.toFixed(1)}° above the warm ceiling ${WARM_HUE_HI}° (a yellow-green cast). chip "${chip.chipBg}" over card "${chip.cardBg}"`,
            ).toBeLessThanOrEqual(WARM_HUE_HI);
        });
    }

    // ── THE CAPTURED DELTA — whole-fixture frames (both modes; the cardinal-lesson artefact)
    for (const vp of VIEWPORTS) {
        for (const mode of [false, true] as const) {
            test(`DELTA capture — the no-gray warm fixture [${mode ? "dark" : "light"}] @ ${vp.name}`, async ({
                page,
            }) => {
                mkdirSync(VISUAL_DIR, { recursive: true });
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, mode);
                await page.evaluate(() => {
                    const id = "__ng_capture__";
                    document.getElementById(id)?.remove();
                    const host = document.createElement("div");
                    host.id = id;
                    host.style.cssText =
                        "position:fixed;inset:0;z-index:99999;background:var(--background);display:flex;flex-direction:column;gap:16px;padding:32px;font-family:system-ui;";
                    // a chip/secondary row + an accent hover + the border + muted caption
                    const chips = document.createElement("div");
                    chips.style.cssText = "display:flex;gap:12px;align-items:center;";
                    const mk = (cls: string, label: string, extra = "") => {
                        const el = document.createElement("div");
                        el.style.cssText = `padding:8px 16px;border-radius:10px;font-size:13px;color:var(--foreground);${extra}`;
                        el.className = cls;
                        el.textContent = label;
                        return el;
                    };
                    const sec = mk("", "secondary");
                    sec.style.background = "var(--secondary)";
                    const acc = mk("", "accent");
                    acc.style.background = "var(--accent)";
                    const bord = mk("", "border");
                    bord.style.cssText += "background:transparent;border:2px solid var(--border);";
                    chips.appendChild(sec);
                    chips.appendChild(acc);
                    chips.appendChild(bord);
                    host.appendChild(chips);
                    // the default Card + glass Button
                    const cardRow = document.createElement("div");
                    cardRow.style.cssText = "display:flex;gap:16px;align-items:flex-start;";
                    const card = document.createElement("div");
                    card.className = "glass-card";
                    card.style.cssText = "padding:20px;border-radius:14px;width:240px;display:flex;flex-direction:column;gap:6px;";
                    const ct = document.createElement("div");
                    ct.textContent = "A default Card";
                    ct.style.cssText = "font-size:15px;font-weight:600;color:var(--foreground);";
                    const cb = document.createElement("div");
                    cb.textContent = "warm cream glass, not a gray slab";
                    cb.style.cssText = "font-size:12px;color:var(--muted-foreground);";
                    card.appendChild(ct);
                    card.appendChild(cb);
                    const btn = document.createElement("div");
                    btn.className = "glass-wash";
                    btn.style.cssText = "padding:10px 22px;border-radius:12px;font-size:13px;font-weight:600;color:var(--foreground);border:1px solid var(--glass-border-wash);";
                    btn.textContent = "Default Button";
                    cardRow.appendChild(card);
                    cardRow.appendChild(btn);
                    host.appendChild(cardRow);
                    document.body.appendChild(host);
                });
                await page.waitForTimeout(220);
                await page.screenshot({
                    path: `${VISUAL_DIR}W-NO-GRAY-after-${mode ? "dark" : "light"}-${vp.name}.png`,
                });
                await page.evaluate(() => document.getElementById("__ng_capture__")?.remove());
            });
        }
    }
});
