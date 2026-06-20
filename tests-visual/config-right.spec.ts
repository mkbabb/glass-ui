// BC.W-CONFIG-RIGHT — config-right.spec.ts, the BINDING π readback (the captured
// own-surface truth; the cardinal-lesson DELTA). proof:config-right proves the SOURCE
// (the precompiled rule + the deleted dead utility + the data-attr side + the census);
// THIS spec proves the painted RENDER — the desktop two-column-controls-RIGHT layout the
// dead arbitrary utility silently failed to paint (the live probe found a single 1131px
// column, the aside stacked below the stage, sameRow:false). The source diff alone cannot
// prove the grid ENGAGES (the BA.W-EMISSION self-emission class is exactly the bug a
// headless source read misses), so the live getComputedStyle readback + the captured
// frames are the binding truth.
//
// THE BINDING ARMS (acceptance #3):
//   (a) DESKTOP two-column — at ≥1280px every studio's [data-slot=configurator] resolves
//       grid-template-columns to TWO tracks (a 1fr stage + a 280-360px aside), the aside's
//       left > the stage's left (controls on the RIGHT), AND |stage.top - aside.top| < 50
//       (same row). Born-RED on HEAD's single 1131px column + sameRow:false.
//   (b) NARROW single-column — at ≤900px the layout resolves ONE column with the stage row
//       ABOVE the aside row (the correct mobile stack). No regression.
//   (c) ROUNDED panel — the inline (non-fullscreen) studio root resolves border-radius
//       var(--radius-panel) (12px) AND the corner cell is clipped (no child overrun past
//       the radius). The "not rounded" rider closed.
//   (d) READING ORDER (WCAG 1.3.2 / 2.4.3) — the DOM order is stage→aside (source order);
//       the grid + data-aside-side place the aside VISUALLY-right via grid placement, never
//       an order:/row-reverse. The aside element follows the stage element in DOM at the
//       desktop width (a left-aside opt-in flips the VISUAL side but NOT DOM/tab order).
//
// At a desktop + a narrow viewport, BOTH modes. Safari/WebKit: grid + @media +
// border-radius are core CSS (no backdrop-filter:url()) — the layout paints identically.
// Fail-CLOSED: a single column on desktop / controls on the left / a non-rounded corner /
// a reversed DOM order reds the readback, exit non-zero. Frames captured to
// docs/tranches/BC/audit/visual/.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BC/audit/visual/", import.meta.url),
);

// Every studio that composes the <Configurator> chassis (the census two-column list).
const STUDIOS = [
    { route: "/substrates/aurora", id: "aurora" },
    { route: "/substrates/blob", id: "blob" },
    // BC.W-VIZ-CONFIGURATOR-SUITE — the ONE merged fourier view (proof:fourier-field
    // U1 retired the duplicate fourier-studio); the π roster names the live route.
    { route: "/substrates/fourier-field", id: "fourier-field" },
    { route: "/compositions/configurator", id: "configurator" },
] as const;

const DESKTOP = { width: 1280, height: 900 } as const;
const NARROW = { width: 880, height: 1000 } as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
    await page.waitForTimeout(180);
}

function shot(page: Page, name: string): Promise<Buffer> {
    mkdirSync(VISUAL_DIR, { recursive: true });
    return page.screenshot({ path: `${VISUAL_DIR}${name}.png`, fullPage: false });
}

/** Read the FIRST [data-slot=configurator]'s layout truth on the live page: its resolved
 *  grid-template-columns, the stage/aside bounding rects, the root border-radius, and the
 *  DOM order of the stage vs the aside (does the aside element follow the stage in source
 *  order — the reading-order floor). null when no configurator is on the route. */
async function readLayout(page: Page) {
    return page.evaluate(() => {
        const cfg = document.querySelector(
            '[data-slot="configurator"]',
        ) as HTMLElement | null;
        if (!cfg) return null;
        const stage = cfg.querySelector(".configurator-stage") as HTMLElement | null;
        const aside = cfg.querySelector(".configurator-aside") as HTMLElement | null;
        const cs = getComputedStyle(cfg);
        const cfgRect = cfg.getBoundingClientRect();
        const stageRect = stage?.getBoundingClientRect() ?? null;
        const asideRect = aside?.getBoundingClientRect() ?? null;
        // DOM order: does the aside element come AFTER the stage element in source order?
        // compareDocumentPosition FOLLOWING bit (4) — stage precedes aside in the DOM.
        let domStageBeforeAside: boolean | null = null;
        if (stage && aside) {
            domStageBeforeAside = Boolean(
                stage.compareDocumentPosition(aside) &
                    Node.DOCUMENT_POSITION_FOLLOWING,
            );
        }
        // Track count: split the resolved template on whitespace OUTSIDE parens. A
        // single-track value is one length (the broken 1131px); two tracks is the
        // engaged grid.
        const gtc = cs.gridTemplateColumns;
        let depth = 0;
        let trackCount = gtc.trim() ? 1 : 0;
        for (const ch of gtc) {
            if (ch === "(") depth++;
            else if (ch === ")") depth--;
            else if (ch === " " && depth === 0) trackCount++;
        }
        // Collapse runs of spaces (a "1fr 320px" splits to 2; guard double-spaces).
        const cleaned = gtc.replace(/\s+/g, " ").trim();
        const tracks = (() => {
            const out: string[] = [];
            let d = 0;
            let cur = "";
            for (const ch of cleaned) {
                if (ch === "(") {
                    d++;
                    cur += ch;
                } else if (ch === ")") {
                    d--;
                    cur += ch;
                } else if (ch === " " && d === 0) {
                    out.push(cur);
                    cur = "";
                } else cur += ch;
            }
            if (cur) out.push(cur);
            return out;
        })();
        return {
            gridTemplateColumns: gtc,
            trackCount: tracks.length || trackCount,
            tracks,
            borderRadius: cs.borderTopLeftRadius,
            overflow: cs.overflow,
            cfg: { left: cfgRect.left, top: cfgRect.top, width: cfgRect.width },
            stage: stageRect
                ? { left: stageRect.left, top: stageRect.top, width: stageRect.width }
                : null,
            aside: asideRect
                ? { left: asideRect.left, top: asideRect.top, width: asideRect.width }
                : null,
            domStageBeforeAside,
        };
    });
}

// ── (a)+(c)+(d) DESKTOP — two-column, controls RIGHT, rounded, stage→aside DOM order ────
test.describe("desktop — controls on the RIGHT (the standardized two-column)", () => {
    for (const studio of STUDIOS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`${studio.id} ${mode}: two-column, aside right, rounded, DOM stage→aside`, async ({
                page,
            }) => {
                await page.setViewportSize(DESKTOP);
                await page.goto(studio.route, { waitUntil: "networkidle" });
                await setDark(page, dark);
                await page.waitForTimeout(300);

                const L = await readLayout(page);
                expect(
                    L,
                    `a [data-slot=configurator] must render on ${studio.route}`,
                ).not.toBeNull();
                if (!L) return;

                await shot(page, `W-CONFIG-RIGHT-${studio.id}-desktop-${mode}`);

                // (a) TWO tracks (1fr stage + 280-360px aside) — not the broken single column.
                expect(
                    L.trackCount,
                    `${studio.id}: desktop grid-template-columns must resolve TWO tracks (was "${L.gridTemplateColumns}")`,
                ).toBe(2);

                // The aside track is in the 280-360px band (the --configurator-aside-{min,max}).
                expect(L.aside, `${studio.id}: aside must render`).not.toBeNull();
                expect(L.stage, `${studio.id}: stage must render`).not.toBeNull();
                if (!L.aside || !L.stage) return;
                expect(
                    L.aside.width,
                    `${studio.id}: the aside width sits in the 280-360px band`,
                ).toBeGreaterThanOrEqual(270);
                expect(L.aside.width).toBeLessThanOrEqual(380);

                // controls on the RIGHT: the aside's left edge is right of the stage's.
                expect(
                    L.aside.left,
                    `${studio.id}: the aside (controls) must sit RIGHT of the stage (aside.left ${L.aside.left} > stage.left ${L.stage.left})`,
                ).toBeGreaterThan(L.stage.left);

                // same row: |stage.top - aside.top| < 50 (side-by-side, not stacked).
                expect(
                    Math.abs(L.stage.top - L.aside.top),
                    `${studio.id}: the stage + aside must be on the SAME ROW (side-by-side), not stacked`,
                ).toBeLessThan(50);

                // (c) ROUNDED panel — the inline root resolves --radius-panel (12px) AND
                // clips (overflow-hidden) so a child stage cannot overrun the corner.
                const radius = parseFloat(L.borderRadius);
                expect(
                    radius,
                    `${studio.id}: the inline studio root must read a rounded corner (--radius-panel ≈ 12px); was ${L.borderRadius}`,
                ).toBeGreaterThanOrEqual(8);
                expect(
                    L.overflow,
                    `${studio.id}: the root must clip (overflow-hidden) so the corner is not overrun`,
                ).toMatch(/hidden|clip/);

                // (d) READING ORDER — the stage element precedes the aside in the DOM
                // (the source order); the visual-right placement is grid-cell, never a
                // DOM reorder. The screen-reader (DOM) + sighted (visual) orders agree.
                expect(
                    L.domStageBeforeAside,
                    `${studio.id}: the stage must precede the aside in DOM order (WCAG 1.3.2/2.4.3 — the visual-right aside is grid placement, never a row-reverse/order reorder)`,
                ).toBe(true);
            });
        }
    }
});

// ── (b) NARROW — the single-column stack (stage ABOVE aside), no regression ─────────────
test.describe("narrow — the single-column stack (stage above controls below lg)", () => {
    for (const studio of STUDIOS) {
        test(`${studio.id}: ≤900px resolves ONE column, stage above aside`, async ({
            page,
        }) => {
            await page.setViewportSize(NARROW);
            await page.goto(studio.route, { waitUntil: "networkidle" });
            await page.waitForTimeout(300);

            const L = await readLayout(page);
            expect(
                L,
                `a [data-slot=configurator] must render on ${studio.route}`,
            ).not.toBeNull();
            if (!L) return;

            await shot(page, `W-CONFIG-RIGHT-${studio.id}-narrow-light`);

            // ONE column below lg.
            expect(
                L.trackCount,
                `${studio.id}: below lg the grid must be a SINGLE column (was "${L.gridTemplateColumns}")`,
            ).toBe(1);

            // The stage row sits ABOVE the aside row (the correct mobile stack).
            if (L.stage && L.aside) {
                expect(
                    L.stage.top,
                    `${studio.id}: the stage must stack ABOVE the aside on a narrow viewport`,
                ).toBeLessThan(L.aside.top);
                // DOM order is the SAME across the breakpoint (no a11y delta).
                expect(
                    L.domStageBeforeAside,
                    `${studio.id}: the DOM order stays stage→aside across the breakpoint`,
                ).toBe(true);
            }
        });
    }
});
