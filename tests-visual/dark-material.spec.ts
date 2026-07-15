// BA.W-DARK-MATERIAL — dark-material.spec.ts, the BINDING π readback (the captured
// own-surface DARK truth; the cardinal-lesson DELTA). proof:dark-material proves the
// recipe STRUCTURE; THIS spec proves the painted DARK RENDER — the A1-1/P-1 source-green/
// visually-broken gap is exactly the AZ close-class failure BA exists to fix, so the live
// DARK render is the binding truth, never the source diff alone.
//
// THE FIVE BINDING ARMS (all in DARK mode, the register's home; the spec injects synthetic
// fixtures onto a live demo route — which loads the global `/styles` cascade so the
// `.glass-*` classes + the dark token arms resolve — mirroring adaptive-glass.spec.ts):
//
//   (a) THE ELEVATION LADDER — the composited five-rung luminance band over the deepened
//       dark page spans a perceptible ΔL ladder (the HEAD 0.003-luma collapse → a real
//       range; the card sits clearly above the page; each rung above the one below).
//   (b) THE TRANSMISSIVE READ — a glass tier over a SYNTHETIC AURORA-gradient backdrop
//       transmits (translucent + the saturate/brightness glow companion — the mirror of
//       the light register's richness, the occluded-slab gone).
//   (c) SELECTED > UNSELECTED — a selection control (active reads --foreground, inactive
//       reads --muted-foreground) inside a glass card reads the ACTIVE register ≥ the
//       INACTIVE (the contrast-color inversion gone).
//   (d) THE BUSY-BRIGHT AA (W7 arm i) — over a synthetic-white worst-case plate WITH the
//       bright signal declared, the content tier still clears 4.5:1 (the G2 floor survives
//       the scope-7 recalibration).
//   (e) THE CALM-LIGHT NO-GRAY (W7 arm ii) — a .glass-card over a plain LIGHT page (no
//       bright bucket) composites translucent WARM (L > ~0.93, NOT the oklab(0.785) gray
//       slab) and the caption keeps the muted register, not force-lifted ink.
//
// + the captured DELTA frames (DARK whole-fixture) written to the DELTA dir.
//
// At ≥2 viewports. Fail-CLOSED: a near-black collapsed ladder / an occluded slab / an
// inverted selection / a failed AA / a gray calm-card reds the recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual", import.meta.url),
);

// A stable light demo route that loads the global `/styles` cascade so the tokens resolve.
const HOST_ROUTE = "/dock/overview";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// ── WCAG plumbing (axe-independent; mirrors adaptive-glass.spec.ts) ──────────────────
function gammaEncode(c: number): number {
    const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, x)) * 255);
}
function oklabToRgba(L: number, a: number, b: number, alpha: number): [number, number, number, number] {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;
    const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    return [gammaEncode(r), gammaEncode(g), gammaEncode(bl), alpha];
}
function parseColor(str: string): [number, number, number, number] | null {
    if (!str) return null;
    const oklab = str.match(
        /oklab\(\s*(-?[\d.]+%?)\s+(-?[\d.]+%?)\s+(-?[\d.]+%?)(?:\s*\/\s*([\d.]+%?))?\s*\)/i,
    );
    if (oklab) {
        const num = (v: string, scale = 1) =>
            v.endsWith("%") ? (Number(v.slice(0, -1)) / 100) * scale : Number(v);
        return oklabToRgba(num(oklab[1]!), num(oklab[2]!), num(oklab[3]!), oklab[4] === undefined ? 1 : num(oklab[4]!, 1));
    }
    const srgb = str.match(
        /color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i,
    );
    if (srgb) {
        return [
            Math.round(Number(srgb[1]) * 255),
            Math.round(Number(srgb[2]) * 255),
            Math.round(Number(srgb[3]) * 255),
            srgb[4] === undefined ? 1 : Number(srgb[4]),
        ];
    }
    const rgb = str.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/i);
    if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3]), rgb[4] === undefined ? 1 : Number(rgb[4])];
    return null;
}
function composite(over: [number, number, number, number], base: [number, number, number]): [number, number, number] {
    const a = over[3];
    return [
        Math.round(over[0] * a + base[0] * (1 - a)),
        Math.round(over[1] * a + base[1] * (1 - a)),
        Math.round(over[2] * a + base[2] * (1 - a)),
    ];
}
function linearize(c: number): number {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
function relLuminance([r, g, b]: [number, number, number]): number {
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}
function contrastRatio(a: [number, number, number], b: [number, number, number]): number {
    const lA = relLuminance(a);
    const lB = relLuminance(b);
    const hi = Math.max(lA, lB);
    const lo = Math.min(lA, lB);
    return (hi + 0.05) / (lo + 0.05);
}
function effectiveOverBase(bgStr: string, base: [number, number, number]): [number, number, number] | null {
    const bg = parseColor(bgStr);
    if (!bg) return null;
    return composite(bg, base);
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.waitForTimeout(150);
}

/**
 * Read the resolved background of synthetic `.glass-<rung>` surfaces mounted over a known
 * opaque base color (the dark page). Returns each rung's resolved background string.
 */
async function readDarkRungBand(page: Page, baseColor: string): Promise<{ rung: string; bg: string }[]> {
    return page.evaluate((base) => {
        const FIXTURE_ID = "__dm_rungs__";
        document.getElementById(FIXTURE_ID)?.remove();
        const host = document.createElement("div");
        host.id = FIXTURE_ID;
        host.style.cssText = `position:fixed;left:0;top:0;width:480px;height:320px;background:${base};z-index:99999;padding:16px;display:flex;flex-direction:column;gap:8px;`;
        const RUNGS = ["glass-wash", "glass-quiet", "glass-resting", "glass-floating", "glass-overlay"];
        for (const r of RUNGS) {
            const s = document.createElement("div");
            s.className = r;
            s.style.cssText = "width:100%;height:48px;border-radius:8px;";
            host.appendChild(s);
        }
        document.body.appendChild(host);
        void host.offsetHeight;
        const out: { rung: string; bg: string }[] = [];
        for (const child of Array.from(host.children)) {
            out.push({ rung: (child as HTMLElement).className, bg: getComputedStyle(child).backgroundColor });
        }
        host.remove();
        return out;
    }, baseColor);
}

test.describe("dark-material (π — the luminous-dark transmissive material, fail-CLOSED)", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
    });

    // ── (a) THE ELEVATION LADDER — the composited rung band spans a perceptible ΔL ──────
    for (const vp of VIEWPORTS) {
        test(`(a) the dark five-rung band spans a perceptible ΔL ladder @ ${vp.name}`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await setDark(page, true);

            // Read the dark page + card token values off the live cascade.
            const { pageColor, cardColor } = await page.evaluate(() => {
                const probe = document.createElement("div");
                document.body.appendChild(probe);
                probe.style.color = "var(--neutral-0)";
                const p = getComputedStyle(probe).color;
                probe.style.color = "var(--card)";
                const c = getComputedStyle(probe).color;
                probe.remove();
                return { pageColor: p, cardColor: c };
            });
            const pageRgb = parseColor(pageColor);
            const cardRgb = parseColor(cardColor);
            expect(pageRgb, `could not parse dark --neutral-0 "${pageColor}"`).not.toBeNull();
            expect(cardRgb, `could not parse dark --card "${cardColor}"`).not.toBeNull();
            const pageBase: [number, number, number] = [pageRgb![0], pageRgb![1], pageRgb![2]];
            const pageL = relLuminance(pageBase);
            const cardL = relLuminance([cardRgb![0], cardRgb![1], cardRgb![2]]);

            // The KEYSTONE — the page↔card gap is a real elevation step (card ≥ 3.5× page
            // relL; HEAD was ≈ 2.0× in a 0.003-luma band).
            expect(
                cardL / pageL,
                `dark --card relL ${cardL.toFixed(4)} / --neutral-0 relL ${pageL.toFixed(4)} = ${(cardL / pageL).toFixed(2)}× — under 3.5× (the page↔card elevation gap did not widen)`,
            ).toBeGreaterThanOrEqual(3.5);

            // The composited five-rung band over the dark page. Each rung reads ABOVE the
            // page, and the band (wash→overlay) spans a perceptible range.
            const band = await readDarkRungBand(page, pageColor);
            const lumas = band.map((b) => {
                const eff = effectiveOverBase(b.bg, pageBase);
                return { rung: b.rung, luma: eff ? relLuminance(eff) : null };
            });
            for (const r of lumas) {
                expect(r.luma, `${r.rung}: could not resolve composited bg`).not.toBeNull();
                expect(
                    r.luma!,
                    `${r.rung}: composited relL ${r.luma!.toFixed(4)} is not above the page relL ${pageL.toFixed(4)} (the rung vanishes into the void)`,
                ).toBeGreaterThan(pageL);
            }
            const washL = lumas[0]!.luma!;
            const overlayL = lumas[4]!.luma!;
            expect(
                overlayL / washL,
                `the dark rung band span (overlay ${overlayL.toFixed(4)} / wash ${washL.toFixed(4)}) = ${(overlayL / washL).toFixed(2)}× — under 1.6× (the rungs do not separate — the HEAD 0.003-luma collapse persists)`,
            ).toBeGreaterThanOrEqual(1.6);
        });
    }

    // ── (b) THE TRANSMISSIVE READ — the dark plate transmits its backdrop ───────────────
    for (const vp of VIEWPORTS) {
        test(`(b) a dark glass tier transmits a synthetic aurora backdrop @ ${vp.name}`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await setDark(page, true);

            const readout = await page.evaluate(() => {
                const host = document.createElement("div");
                host.style.cssText =
                    "position:fixed;left:0;top:0;width:360px;height:200px;z-index:99999;" +
                    "background:linear-gradient(120deg, oklch(0.45 0.16 300), oklch(0.55 0.14 200), oklch(0.5 0.15 30));";
                const s = document.createElement("div");
                s.className = "glass-resting";
                s.style.cssText = "position:absolute;inset:32px;border-radius:12px;";
                host.appendChild(s);
                document.body.appendChild(host);
                void s.offsetHeight;
                const cs = getComputedStyle(s);
                const bg = cs.backgroundColor;
                const filter =
                    cs.backdropFilter ||
                    (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter ||
                    "";
                host.remove();
                const alphaMatch = bg.match(/\/\s*([\d.]+)\s*\)/) ?? bg.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
                const alpha = alphaMatch ? Number(alphaMatch[1]) : 1;
                return { bg, filter, translucent: alpha < 0.995 };
            });
            // (1) the plate is TRANSLUCENT (the aurora shows through — the occluded slab gone).
            expect(
                readout.translucent,
                `the dark glass-resting plate went OPAQUE (bg ${readout.bg}) — the backdrop cannot transmit (the occluded-slab defect)`,
            ).toBe(true);
            // (2) the backdrop-filter carries the luminosity LIFT (saturate ≥ 1.2 — the glow
            // companion so the transmitted aurora reads with chroma, not a deadened wash).
            const sat = Number((readout.filter.match(/saturate\(\s*([\d.]+)\s*\)/) ?? [])[1] ?? "0");
            expect(
                sat,
                `the dark glass-resting backdrop-filter saturate is ${sat || "absent"} (filter "${readout.filter}") — under 1.2 (no transmissive luminosity lift; the dark glass deadens its backdrop)`,
            ).toBeGreaterThanOrEqual(1.2);
        });
    }

    // ── (c) SELECTED > UNSELECTED inside a glass card (the inversion gone) ──────────────
    for (const vp of VIEWPORTS) {
        test(`(c) a selection control inside a glass card reads selected ≥ unselected @ ${vp.name}`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await setDark(page, true);

            const r = await page.evaluate(() => {
                function read(bucket: string | null): { active: string; inactive: string } {
                    const host = document.createElement("div");
                    host.style.cssText = "position:fixed;left:0;top:0;width:320px;height:160px;z-index:99999;padding:16px;background:#fff;";
                    if (bucket) host.style.setProperty("--glass-backdrop", bucket);
                    const card = document.createElement("div");
                    card.className = "glass-card";
                    card.style.cssText = "padding:16px;border-radius:12px;display:flex;gap:12px;";
                    const active = document.createElement("span");
                    active.textContent = "Selected";
                    active.style.color = "var(--foreground)";
                    const inactive = document.createElement("span");
                    inactive.textContent = "Unselected";
                    inactive.style.color = "var(--muted-foreground)";
                    card.appendChild(active);
                    card.appendChild(inactive);
                    host.appendChild(card);
                    document.body.appendChild(host);
                    void card.offsetHeight;
                    const a = getComputedStyle(active).color;
                    const i = getComputedStyle(inactive).color;
                    host.remove();
                    return { active: a, inactive: i };
                }
                const lum = (s: string) => {
                    const m = s.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
                    if (!m) return null;
                    const lin = (c: number) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
                    return 0.2126 * lin(+m[1]!) + 0.7152 * lin(+m[2]!) + 0.0722 * lin(+m[3]!);
                };
                const calm = read(null);
                const bucket = read("light");
                return {
                    activeLuma: lum(calm.active),
                    inactiveLuma: lum(calm.inactive),
                    bucketActiveLuma: lum(bucket.active),
                    bucketInactiveLuma: lum(bucket.inactive),
                };
            });
            expect(r.activeLuma, "calm: could not read active luma").not.toBeNull();
            expect(r.inactiveLuma, "calm: could not read inactive luma").not.toBeNull();
            expect(
                r.activeLuma!,
                `calm card: active (--foreground) luma ${r.activeLuma!.toFixed(3)} < inactive (--muted-foreground) luma ${r.inactiveLuma!.toFixed(3)} — selection INVERTED`,
            ).toBeGreaterThanOrEqual(r.inactiveLuma! - 0.001);
            expect(r.bucketActiveLuma, "bucket: could not read active luma").not.toBeNull();
            expect(r.bucketInactiveLuma, "bucket: could not read inactive luma").not.toBeNull();
            expect(
                r.bucketActiveLuma!,
                `bright-bucket card: active (--foreground) luma ${r.bucketActiveLuma!.toFixed(3)} < inactive (--muted-foreground) luma ${r.bucketInactiveLuma!.toFixed(3)} — the contrast-color() inversion persists (active must lift in lockstep with muted)`,
            ).toBeGreaterThanOrEqual(r.bucketInactiveLuma! - 0.001);
        });
    }

    // ── (d) THE BUSY-BRIGHT AA (W7 arm i) — over white WITH the bright bucket, AA holds ──
    for (const vp of VIEWPORTS) {
        test(`(d) W7-i: content tier clears 4.5:1 over white WITH the bright bucket @ ${vp.name}`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await setDark(page, false); // the busy-bright case is a LIGHT-mode concern (white backdrop)

            const readout = await page.evaluate(() => {
                const host = document.createElement("div");
                host.style.cssText = "position:fixed;left:0;top:0;width:320px;height:160px;z-index:99999;padding:16px;background:#ffffff;";
                host.style.setProperty("--glass-backdrop", "light"); // the DECLARED bright signal
                const card = document.createElement("div");
                card.className = "glass-card";
                card.style.cssText = "padding:16px;border-radius:12px;";
                const body = document.createElement("span");
                body.textContent = "Body copy on a bright-backdrop glass card";
                body.style.color = "var(--muted-foreground)"; // the body register (lifted under the bucket)
                card.appendChild(body);
                host.appendChild(card);
                document.body.appendChild(host);
                void card.offsetHeight;
                const bg = getComputedStyle(card).backgroundColor;
                const ink = getComputedStyle(body).color;
                const alphaMatch = bg.match(/\/\s*([\d.]+)\s*\)/) ?? bg.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
                const alpha = alphaMatch ? Number(alphaMatch[1]) : 1;
                host.remove();
                return { bg, ink, translucent: alpha < 0.995 };
            });
            const effBg = effectiveOverBase(readout.bg, [255, 255, 255]);
            const ink = parseColor(readout.ink);
            expect(effBg, `could not resolve bright-bucket card bg "${readout.bg}"`).not.toBeNull();
            expect(ink, `could not parse body ink "${readout.ink}"`).not.toBeNull();
            const ratio = contrastRatio([ink![0], ink![1], ink![2]], effBg!);
            expect(
                ratio,
                `bright-bucket body is ${ratio.toFixed(2)}:1 over white (ink ${readout.ink}, bg ${readout.bg}) — under 4.5:1 (the scope-7 recalibration regressed the G2 floor)`,
            ).toBeGreaterThanOrEqual(4.5);
            expect(readout.translucent, `bright-bucket card went opaque (${readout.bg}) — AA by losing the glass`).toBe(true);
        });
    }

    // ── (e) THE CALM-LIGHT NO-GRAY (W7 arm ii) — a plain light card stays warm ──────────
    for (const vp of VIEWPORTS) {
        test(`(e) W7-ii: a calm-light card composites translucent warm, NOT gray @ ${vp.name}`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await setDark(page, false);

            const readout = await page.evaluate(() => {
                // A plain LIGHT page — NO --glass-backdrop bucket (the calm-light case).
                const host = document.createElement("div");
                host.style.cssText = "position:fixed;left:0;top:0;width:320px;height:160px;z-index:99999;padding:16px;background:hsl(48 12% 98%);";
                const card = document.createElement("div");
                card.className = "glass-card";
                card.style.cssText = "padding:16px;border-radius:12px;";
                const caption = document.createElement("span");
                caption.textContent = "Caption";
                caption.style.color = "var(--muted-foreground)";
                card.appendChild(caption);
                host.appendChild(card);
                document.body.appendChild(host);
                void card.offsetHeight;
                const bg = getComputedStyle(card).backgroundColor;
                const captionColor = getComputedStyle(caption).color;
                const fgProbe = document.createElement("span");
                fgProbe.style.color = "var(--foreground)";
                card.appendChild(fgProbe);
                const fg = getComputedStyle(fgProbe).color;
                host.remove();
                return { bg, captionColor, fg };
            });
            // The calm-light card composites translucent WARM, NOT the oklab(0.785) gray slab
            // the unconditional 20% darken produced. The spec's live anchors (the R9-1 slides
            // readback, measured in OKLAB L — the perceptual lightness the eye reads, NOT the
            // WCAG relLuminance): 0% → oklab(0.977) warm cream, 8% → oklab(0.897) viable
            // middle, 20% → oklab(0.785) gray. So the binding metric is the plate's resolved
            // OKLAB L (Chrome serializes the in-oklab glass mix as oklab(L …)). Assert the
            // calm-light plate's oklab L sits in the WARM band (≥ 0.90 — clearly above the
            // 0.785 gray; the 4% floor lands ~0.93+). A WCAG-relLuminance recompute is the
            // wrong metric here (it under-reads the perceptual lightness of the warm plate).
            const oklabL = Number((readout.bg.match(/oklab\(\s*([\d.]+)/) ?? [])[1] ?? "0");
            expect(
                oklabL,
                `calm-light card plate oklab L ${oklabL.toFixed(3)} — under 0.90 (the card grayed toward the oklab(0.785) slab; the slides gray-slab defect persists). bg "${readout.bg}"`,
            ).toBeGreaterThanOrEqual(0.9);
            // The caption KEEPS the muted register (it is NOT force-lifted to --foreground).
            const captionRgb = parseColor(readout.captionColor);
            const fgRgb = parseColor(readout.fg);
            expect(captionRgb, "could not parse caption color").not.toBeNull();
            expect(fgRgb, "could not parse --foreground").not.toBeNull();
            const captionL = relLuminance([captionRgb![0], captionRgb![1], captionRgb![2]]);
            const fgL = relLuminance([fgRgb![0], fgRgb![1], fgRgb![2]]);
            expect(
                Math.abs(captionL - fgL),
                `calm-light caption luma ${captionL.toFixed(3)} ≈ --foreground luma ${fgL.toFixed(3)} — the caption was force-lifted to the full ink (the muted register must survive on a calm-light card)`,
            ).toBeGreaterThan(0.01);
        });
    }

    // ── THE CAPTURED DELTA — DARK whole-fixture frames (the cardinal-lesson artefact) ────
    for (const vp of VIEWPORTS) {
        test(`DELTA capture — the dark luminous-material fixture @ ${vp.name}`, async ({ page }) => {
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await setDark(page, true);
            await page.evaluate(() => {
                const id = "__dm_capture__";
                document.getElementById(id)?.remove();
                const host = document.createElement("div");
                host.id = id;
                host.style.cssText =
                    "position:fixed;inset:0;z-index:99999;background:var(--neutral-0);display:flex;flex-direction:column;gap:14px;padding:28px;font-family:system-ui;";
                const ladder = document.createElement("div");
                ladder.style.cssText = "display:flex;gap:10px;";
                for (const rung of ["glass-wash", "glass-quiet", "glass-resting", "glass-floating", "glass-overlay"]) {
                    const s = document.createElement("div");
                    s.className = rung;
                    s.style.cssText = "flex:1;height:64px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--foreground);font-size:11px;";
                    s.textContent = rung.replace("glass-", "");
                    ladder.appendChild(s);
                }
                host.appendChild(ladder);
                const auroraWrap = document.createElement("div");
                auroraWrap.style.cssText = "position:relative;height:140px;border-radius:14px;overflow:hidden;background:linear-gradient(120deg, oklch(0.45 0.16 300), oklch(0.5 0.15 200), oklch(0.5 0.15 30));";
                const card = document.createElement("div");
                card.className = "glass-floating";
                card.style.cssText = "position:absolute;inset:20px;border-radius:12px;display:flex;flex-direction:column;gap:6px;padding:16px;color:var(--foreground);";
                const t = document.createElement("div");
                t.textContent = "Dark glass transmits its backdrop";
                t.style.cssText = "font-size:15px;font-weight:600;";
                const b = document.createElement("div");
                b.textContent = "The aurora glows through the luminous-dark plate.";
                b.style.cssText = "font-size:12px;color:var(--muted-foreground);";
                card.appendChild(t);
                card.appendChild(b);
                auroraWrap.appendChild(card);
                host.appendChild(auroraWrap);
                const row = document.createElement("div");
                row.style.cssText = "display:flex;gap:12px;align-items:center;";
                const chip = document.createElement("div");
                chip.style.cssText = "padding:10px 18px;border-radius:10px;background:var(--primary);color:var(--primary-foreground);font-size:13px;font-weight:600;";
                chip.textContent = "Primary";
                const sel = document.createElement("div");
                sel.className = "glass-card";
                sel.style.cssText = "padding:10px 16px;border-radius:10px;display:flex;gap:14px;";
                const a = document.createElement("span");
                a.textContent = "Selected";
                a.style.color = "var(--foreground)";
                const ina = document.createElement("span");
                ina.textContent = "Unselected";
                ina.style.color = "var(--muted-foreground)";
                sel.appendChild(a);
                sel.appendChild(ina);
                row.appendChild(chip);
                row.appendChild(sel);
                host.appendChild(row);
                document.body.appendChild(host);
            });
            await page.waitForTimeout(250);
            await page.screenshot({ path: `${VISUAL_DIR}W-DARK-MATERIAL-after-dark-${vp.name}.png` });
            await page.evaluate(() => document.getElementById("__dm_capture__")?.remove());
        });
    }
});
