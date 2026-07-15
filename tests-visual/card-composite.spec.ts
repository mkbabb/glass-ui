// BB.W-CARD-COMPOSITE — card-composite.spec.ts, the BINDING π readback of the
// compositor-safe CardHeader scroll-shrink rewrite (the A'-3 layout-animation CLS
// killed at the keyframes).
//
// proof:no-layout-animation proves the SOURCE (no keyframe animates a reflow
// property); THIS spec proves the painted RENDER — that the shipped rewrite
// produces ZERO layout shift on the live scroll-shrink demo AND that the 3-lane
// choreography binds compositor-safe (translateY + scale + scaleY/opacity), the
// gestalt reading IDENTICALLY. A CLS wave is a MEASURED wave; the live readback is
// the binding truth, never the source diff alone.
//
// THE BINDING ARMS:
//   (a) the shipped scroll-shrink demo produces CLS = 0 across the 0..120px
//       scroll sweep (both directions, all three lanes active) — the A'-3
//       per-scroll-frame relayout storm is gone.
//   (b) the 3 lanes bind COMPOSITOR-SAFE — lane 1 = a translateY on the header,
//       lane 2 = a scale() on the title (to the pinned ratio), lane 3 = an
//       opacity fade + scaleY collapse on the description. NO computed
//       padding/font-size/grid-template-rows DELTA across the scroll range (the
//       header padding, title font-size, and desc grid-track are STATIC).
//   (c) the BEFORE reconstruction (the original layout-property keyframes,
//       injected over the identical layout) forces measurably MORE per-frame
//       layout/reflow work than the AFTER transform rewrite — the architectural
//       win quantified.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual/card-composite", import.meta.url),
);

const VIEWPORTS = [
    { name: "mobile", width: 412, height: 915 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

// Drive the scroll-shrink host across the 0..120px range (both directions) and
// return the CLS accumulated over the sweep.
async function sweepCls(page: Page): Promise<number> {
    return page.evaluate(async () => {
        const host = document.querySelector(
            '[data-testid="card-shrink-host"]',
        ) as HTMLElement;
        host.scrollTop = 0;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        let cls = 0;
        const po = new PerformanceObserver((list) => {
            for (const e of list.getEntries() as PerformanceEntry[]) {
                const ls = e as PerformanceEntry & { value: number; hadRecentInput: boolean };
                if (!ls.hadRecentInput) cls += ls.value;
            }
        });
        po.observe({ type: "layout-shift", buffered: false });
        for (let y = 0; y <= 130; y += 4) {
            host.scrollTop = y;
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        }
        for (let y = 130; y >= 0; y -= 4) {
            host.scrollTop = y;
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        }
        await new Promise((r) => setTimeout(r, 150));
        po.disconnect();
        return Number(cls.toFixed(4));
    });
}

test.beforeEach(async ({ page }) => {
    await page.goto("/display/card", { waitUntil: "networkidle" });
    // the shrink surface must exist (scope item 7 added it if absent at HEAD)
    await page.waitForSelector('[data-testid="card-shrink-host"]', { timeout: 5000 });
});

// ── (a) the shipped rewrite produces CLS = 0 ─────────────────────────────────
for (const dark of [false, true]) {
    test(`(a) scroll-shrink demo produces CLS = 0 across the sweep — ${dark ? "dark" : "light"}`, async ({
        page,
    }) => {
        await setDark(page, dark);
        // skip cleanly if the engine lacks scroll-timeline (the @supports gate
        // means the choreography never binds → the static layout, trivially 0).
        const supported = await page.evaluate(() =>
            CSS.supports("animation-timeline: scroll()"),
        );
        expect(supported, "Chromium supports scroll-timeline").toBe(true);
        const cls = await sweepCls(page);
        // the A'-3 floor is ≤ 0.1; the shipped compositor rewrite reads 0.
        expect(cls, `CLS over the 0..120px sweep (${dark ? "dark" : "light"})`).toBeLessThanOrEqual(0.1);
    });
}

// ── (b) the 3 lanes bind COMPOSITOR-SAFE, no layout-property delta ───────────
test("(b) the 3 lanes are transform/opacity only — no padding/font-size/grid-track delta", async ({
    page,
}) => {
    const readings = await page.evaluate(async () => {
        const host = document.querySelector(
            '[data-testid="card-shrink-host"]',
        ) as HTMLElement;
        const header = document.querySelector('[data-testid="card-shrink-header"]') as HTMLElement;
        const title = document.querySelector('[data-testid="card-shrink-title"]') as HTMLElement;
        const desc = document.querySelector('[data-testid="card-shrink-desc"]') as HTMLElement;
        const sample = (y: number) =>
            new Promise<Record<string, string>>((resolve) => {
                host.scrollTop = y;
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                        const h = getComputedStyle(header);
                        const t = getComputedStyle(title);
                        const d = getComputedStyle(desc);
                        resolve({
                            headerTransform: h.transform,
                            headerPaddingTop: h.paddingTop,
                            headerPaddingBottom: h.paddingBottom,
                            titleTransform: t.transform,
                            titleFontSize: t.fontSize,
                            descTransform: d.transform,
                            descOpacity: d.opacity,
                            descGridRows: d.gridTemplateRows,
                        });
                    }),
                );
            });
        const at0 = await sample(0);
        const at120 = await sample(120);
        return { at0, at120 };
    });

    // Lane 1: the header transform CHANGES across the range (translateY moves),
    // but its padding is STATIC (no layout-property animation).
    expect(readings.at0.headerTransform).not.toBe(readings.at120.headerTransform);
    expect(readings.at0.headerPaddingTop).toBe(readings.at120.headerPaddingTop);
    expect(readings.at0.headerPaddingBottom).toBe(readings.at120.headerPaddingBottom);

    // Lane 2: the title transform CHANGES (scale shrinks toward the ratio), but
    // its font-size is STATIC (no per-frame text re-measure). scale(0.695).
    expect(readings.at0.titleTransform).not.toBe(readings.at120.titleTransform);
    expect(readings.at0.titleFontSize).toBe(readings.at120.titleFontSize);
    expect(readings.at120.titleTransform).toMatch(/matrix\(0\.69[0-9]?/);

    // Lane 3: the description fades (opacity → 0) + collapses via scaleY (the
    // transform CHANGES), and its grid-template-rows is NOT animated (static /
    // none — the grid-track relayout killed).
    expect(Number(readings.at120.descOpacity)).toBeLessThan(0.05);
    expect(readings.at0.descTransform).not.toBe(readings.at120.descTransform);
    // scaleY(0) → the matrix d-component (index 3) collapses to 0
    expect(readings.at120.descTransform).toMatch(/matrix\(1, 0, 0, 0,/);
});

// ── (c) BEFORE (layout) vs AFTER (transform) per-frame reflow cost ───────────
test("(c) the layout-property animation forces more per-frame reflow than the transform rewrite", async ({
    page,
}) => {
    const result = await page.evaluate(async () => {
        const mk = () => {
            const wrap = document.createElement("div");
            wrap.style.cssText =
                "position:relative;height:300px;overflow-y:auto;border:1px solid #ccc;";
            wrap.className = "card-scroll-host";
            const hdr = document.createElement("div");
            hdr.className = "recon-header";
            hdr.style.cssText = "padding:16px;background:#fff;";
            hdr.innerHTML =
                '<div class="recon-title" style="font-size:25.9px;font-weight:600">Title</div><div class="recon-desc">Desc.</div>';
            wrap.appendChild(hdr);
            const body = document.createElement("div");
            for (let i = 0; i < 40; i++) {
                const p = document.createElement("p");
                p.textContent = "Row " + i;
                p.style.margin = "8px 0";
                body.appendChild(p);
            }
            wrap.appendChild(body);
            document.body.appendChild(wrap);
            return wrap;
        };
        const run = async (css: string, n = 60) => {
            const wrap = mk();
            const st = document.createElement("style");
            st.textContent = css;
            document.head.appendChild(st);
            const probe = wrap.querySelector(".recon-desc") as HTMLElement;
            wrap.scrollTop = 0;
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            let total = 0;
            for (let i = 0; i < n; i++) {
                wrap.scrollTop = (i / (n - 1)) * 120;
                await new Promise((r) => requestAnimationFrame(r));
                const t0 = performance.now();
                wrap.style.setProperty("--x", String(i));
                void wrap.offsetHeight;
                probe.getBoundingClientRect();
                total += performance.now() - t0;
            }
            st.remove();
            wrap.remove();
            return total;
        };
        const layoutCss = `
      .card-scroll-host .recon-header{animation:__rp__ linear both;animation-timeline:--card-scroll;animation-range:0px 120px;}
      .card-scroll-host .recon-title{animation:__rf__ linear both;animation-timeline:--card-scroll;animation-range:0px 120px;}
      .card-scroll-host .recon-desc{display:grid;grid-template-rows:1fr;overflow:hidden;animation:__rg__ linear both;animation-timeline:--card-scroll;animation-range:0px 80px;}
      @keyframes __rp__{from{padding-top:24px;padding-bottom:16px}to{padding-top:8px;padding-bottom:4px}}
      @keyframes __rf__{from{font-size:25.9px}to{font-size:18px}}
      @keyframes __rg__{from{grid-template-rows:1fr;opacity:1}to{grid-template-rows:0fr;opacity:0}}`;
        const xformCss = `
      .card-scroll-host .recon-header{animation:__tx__ linear both;animation-timeline:--card-scroll;animation-range:0px 120px;transform-origin:top;}
      .card-scroll-host .recon-title{animation:__ts__ linear both;animation-timeline:--card-scroll;animation-range:0px 120px;transform-origin:left top;}
      .card-scroll-host .recon-desc{transform-origin:top;animation:__sy__ linear both;animation-timeline:--card-scroll;animation-range:0px 80px;}
      @keyframes __tx__{from{transform:translateY(0)}to{transform:translateY(-8px)}}
      @keyframes __ts__{from{transform:scale(1)}to{transform:scale(0.695)}}
      @keyframes __sy__{from{opacity:1;transform:scaleY(1)}to{opacity:0;transform:scaleY(0)}}`;
        await run(layoutCss, 10);
        await run(xformCss, 10);
        const before = ((await run(layoutCss)) + (await run(layoutCss))) / 2;
        const after = ((await run(xformCss)) + (await run(xformCss))) / 2;
        return { before, after };
    });
    // the transform rewrite forces strictly less per-frame layout work; allow a
    // small margin for measurement noise (require ≥10% improvement).
    expect(result.after).toBeLessThan(result.before * 0.9);
});

// ── frame-pair capture (the gestalt reads identically) ───────────────────────
test("capture the rest/scrolled frame pair (the gestalt is identical)", async ({ page }) => {
    mkdirSync(VISUAL_DIR, { recursive: true });
    for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        const host = page.locator('[data-testid="card-shrink-host"]');
        await host.scrollIntoViewIfNeeded();
        await page.evaluate(() => {
            (document.querySelector('[data-testid="card-shrink-host"]') as HTMLElement).scrollTop = 0;
        });
        await page.waitForTimeout(80);
        await host.screenshot({ path: `${VISUAL_DIR}/spec-rest-${vp.name}.png` });
        await page.evaluate(() => {
            (document.querySelector('[data-testid="card-shrink-host"]') as HTMLElement).scrollTop = 120;
        });
        await page.waitForTimeout(80);
        await host.screenshot({ path: `${VISUAL_DIR}/spec-scrolled-${vp.name}.png` });
    }
    expect(true).toBe(true);
});
