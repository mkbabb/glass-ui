// BI.W-BADGE-ALIGN — badge-align.spec.ts, the π baseline/optical-centering readback
// (the BINDING close; §π/DELTA).
//
// The defect (UF-A6 / ss-12, "rose" badge glyph baseline sits low, "doesn't seem to
// be aligned properly"): the badge `size` rungs pinned a FIXED px line-height
// (`leading-4/5/6` = 16/20/24px) while the font tracks `--ui-scale`
// (--control-text-sm/--control-text/--type-body×--ui-scale = 12/14/16px at rest,
// ~18/21/24px at coarse 1.5×). A fixed line-box cannot grow with the font — at
// coarse the font OVERFLOWS the box; at rest the taller-than-font line-box drifts
// the glyph optical center low against the smaller --ui-glyph-sm glyph.
//
// THE DEVICE-FREE SOURCE GATE (proof-badge-align.mjs) proves the STRUCTURE — no
// fixed leading px on the rungs, a relative line-height present, the base
// items-center + scaled-glyph contract intact. THIS SPEC PROVES THE RENDER, the
// bites the source arm cannot give:
//   B-π1 — per size rung, on a badge bearing an svg glyph + text, the glyph
//          geometric center vs the text CAP center delta is ≤ ~1px (a face-metric +
//          sub-px slack tolerance), at REST (--ui-scale 1) AND at emulated coarse
//          pointer (--ui-scale 1.5) — the glyph + text share ONE optical center.
//   B-π2 — at coarse, the resolved line-height (px) is ≥ the resolved font-size (px)
//          per rung: the line-box tracks the font, so the coarse-scaled font no
//          longer overflows a fixed line-box (the crisp GEO-8 bite — the HEAD
//          fixed leading-4=16px < the 18px coarse-sm font would FAIL this).
//   B-π3 — the "rose" badge (ss-12 surface) text reads vertically centered in its
//          pill (|text-ink-center − pill-center| ≤ tol).
//
// BOTH modes. It loads :5199 → LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI
// grace-skips, backstopped by proof:live-verified-ledger over the DELTA.

import { test, expect, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BI/audit/visual/", import.meta.url),
);

// The optical-center delta ceiling. The spec target is ≤ ~1px; the tolerance carries
// face-metric asymmetry (the cap-band vs em-box offset is intrinsic to the font, ~
// 0.05em → ~1.2px at the coarse-lg 24px font) + sub-px bounding-box rounding. It is a
// CEILING, not a target — a genuine mis-centre (the HEAD low-baseline drift) blows it.
const CENTER_TOL = 2.0;
const RUNGS = ["sm", "md", "lg"] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(120);
}

// Inject / clear the coarse comfort register (the @media (pointer: coarse) block sets
// :root --ui-scale to 1.5; a fine-pointer headless run does not fire it, so we set the
// token directly — the spec's "emulated coarse pointer (--ui-scale: 1.5)").
async function setUiScale(page: Page, scale: number | null): Promise<void> {
    await page.evaluate((s) => {
        if (s == null) document.documentElement.style.removeProperty("--ui-scale");
        else document.documentElement.style.setProperty("--ui-scale", String(s));
    }, scale);
    await page.waitForTimeout(120);
}

// Per rung (a badge bearing an svg glyph + text): the glyph geometric center Y, the
// text CAP center Y (a Range over the first uppercase char → the cap-top..baseline
// band), the resolved font-size + line-height (px), and the pill center Y.
async function readOptical(page: Page) {
    return page.evaluate((rungs: readonly string[]) => {
        const round = (v: number) => Math.round(v * 1000) / 1000;
        const out: Record<
            string,
            {
                glyphCenterY: number;
                capCenterY: number;
                delta: number;
                fontSize: number;
                lineHeight: number;
                pillCenterY: number;
                textInkCenterY: number;
            } | null
        > = {};
        const root = document.querySelector("[data-badge-optical]");
        for (const rung of rungs) {
            const el = root?.querySelector<HTMLElement>(
                `[data-slot="badge"][data-size="${rung}"]`,
            );
            if (!el) {
                out[rung] = null;
                continue;
            }
            const pill = el.getBoundingClientRect();
            const svg = el.querySelector("svg");
            const svgRect = svg?.getBoundingClientRect();

            // The first non-empty text node inside the badge (the label run).
            let textNode: Text | null = null;
            const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            for (let n = walk.nextNode(); n; n = walk.nextNode()) {
                if ((n.textContent ?? "").trim().length > 0) {
                    textNode = n as Text;
                    break;
                }
            }
            let capCenterY = NaN;
            let textInkCenterY = NaN;
            if (textNode) {
                const raw = textNode.textContent ?? "";
                const lead = raw.length - raw.replace(/^\s+/, "").length; // leading ws
                // CAP band: a Range over the first VISIBLE character (the label's
                // leading uppercase glyph — "Verified" → "V", cap-top..baseline).
                const capR = document.createRange();
                capR.setStart(textNode, lead);
                capR.setEnd(textNode, lead + 1);
                const capRect = capR.getBoundingClientRect();
                capCenterY = capRect.top + capRect.height / 2;
                // Text INK band: a Range over the whole label (for the pill-centre read).
                const inkR = document.createRange();
                inkR.setStart(textNode, lead);
                inkR.setEnd(textNode, raw.replace(/\s+$/, "").length);
                const inkRect = inkR.getBoundingClientRect();
                textInkCenterY = inkRect.top + inkRect.height / 2;
            }
            const cs = getComputedStyle(el);
            const fontSize = parseFloat(cs.fontSize);
            const lhRaw = cs.lineHeight;
            const lineHeight = lhRaw === "normal" ? fontSize * 1.2 : parseFloat(lhRaw);
            const glyphCenterY = svgRect ? svgRect.top + svgRect.height / 2 : NaN;
            out[rung] = {
                glyphCenterY: round(glyphCenterY),
                capCenterY: round(capCenterY),
                delta: round(Math.abs(glyphCenterY - capCenterY)),
                fontSize: round(fontSize),
                lineHeight: round(lineHeight),
                pillCenterY: round(pill.top + pill.height / 2),
                textInkCenterY: round(textInkCenterY),
            };
        }
        return out;
    }, RUNGS);
}

// The "rose" badge (ss-12 surface) — text center vs pill center.
async function readRose(page: Page) {
    return page.evaluate(() => {
        const round = (v: number) => Math.round(v * 1000) / 1000;
        const badges = Array.from(
            document.querySelectorAll<HTMLElement>('[data-slot="badge"]'),
        );
        const rose = badges.find((b) => (b.textContent ?? "").trim() === "rose");
        if (!rose) return null;
        const pill = rose.getBoundingClientRect();
        const walk = document.createTreeWalker(rose, NodeFilter.SHOW_TEXT);
        let textNode: Text | null = null;
        for (let n = walk.nextNode(); n; n = walk.nextNode()) {
            if ((n.textContent ?? "").trim().length > 0) {
                textNode = n as Text;
                break;
            }
        }
        if (!textNode) return null;
        const raw = textNode.textContent ?? "";
        const lead = raw.length - raw.replace(/^\s+/, "").length;
        const r = document.createRange();
        r.setStart(textNode, lead);
        r.setEnd(textNode, raw.replace(/\s+$/, "").length);
        const ink = r.getBoundingClientRect();
        return {
            pillCenterY: round(pill.top + pill.height / 2),
            textInkCenterY: round(ink.top + ink.height / 2),
            delta: round(Math.abs(pill.top + pill.height / 2 - (ink.top + ink.height / 2))),
        };
    });
}

const paired: Record<string, unknown> = {};

test.describe("BI.W-BADGE-ALIGN — the badge leading tracks the scaled font (π)", () => {
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";

        test(`glyph + text share ONE optical center, rest AND coarse; coarse no-overflow; rose centred (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/display/badge", { waitUntil: "domcontentloaded" });
            await page.waitForSelector('[data-badge-optical] [data-slot="badge"]', {
                timeout: 8000,
            });
            await page.waitForTimeout(300);
            await setDark(page, dark);

            // ── REST (--ui-scale: 1) ────────────────────────────────────────────
            await setUiScale(page, null);
            const rest = await readOptical(page);
            paired[`optical-rest-${mode}`] = rest;
            for (const rung of RUNGS) {
                const r = rest[rung];
                expect(r, `${mode} ${rung}: badge with glyph + text renders`).not.toBeNull();
                expect(
                    r!.delta,
                    `${mode} ${rung} REST: glyph-center (${r!.glyphCenterY}) vs text-cap-center (${r!.capCenterY}) delta ${r!.delta}px must be ≤ ${CENTER_TOL}px (ONE optical center)`,
                ).toBeLessThanOrEqual(CENTER_TOL);
            }

            // ── COARSE (--ui-scale: 1.5) — the font grows; the line-box tracks it ─
            await setUiScale(page, 1.5);
            const coarse = await readOptical(page);
            paired[`optical-coarse-${mode}`] = coarse;
            for (const rung of RUNGS) {
                const r = coarse[rung];
                expect(r, `${mode} ${rung}: badge renders at coarse scale`).not.toBeNull();
                // B-π1 coarse: still one optical center.
                expect(
                    r!.delta,
                    `${mode} ${rung} COARSE: glyph-center (${r!.glyphCenterY}) vs cap-center (${r!.capCenterY}) delta ${r!.delta}px must be ≤ ${CENTER_TOL}px at --ui-scale 1.5`,
                ).toBeLessThanOrEqual(CENTER_TOL);
                // B-π2: the line-box tracks the scaled font — no overflow.
                expect(
                    r!.lineHeight,
                    `${mode} ${rung} COARSE: line-height (${r!.lineHeight}px) must be ≥ the coarse-scaled font-size (${r!.fontSize}px) — the font no longer overflows a fixed line-box (GEO-8)`,
                ).toBeGreaterThanOrEqual(r!.fontSize);
            }

            // ── B-π3 — the "rose" badge reads centred ────────────────────────────
            await setUiScale(page, null);
            const rose = await readRose(page);
            paired[`rose-${mode}`] = rose;
            expect(rose, `${mode}: the "rose" badge renders`).not.toBeNull();
            expect(
                rose!.delta,
                `${mode} rose: text-ink-center (${rose!.textInkCenterY}) vs pill-center (${rose!.pillCenterY}) delta ${rose!.delta}px must be ≤ ${CENTER_TOL}px (reads centred, ss-12)`,
            ).toBeLessThanOrEqual(CENTER_TOL);
        });
    }

    test.afterAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        writeFileSync(
            `${VISUAL_DIR}/W-BADGE-ALIGN-readback.json`,
            `${JSON.stringify(paired, null, 2)}\n`,
        );
    });
});
