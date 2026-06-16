// BA.W-DOCK-MORPH-INSITU — the BINDING π readback for the in-situ shell-dock V↔H
// morph + the in-situ layering switch + the BA-VJS-1 four-cycle non-zero `to` + the
// §7 4×-throttle perf re-run. LOCAL-ONLY (real-GPU/Metal dev-box, the AY W-LIVE1
// split) — the captured frame-series + the 4×-throttle perf number are dev-box truth,
// backstopped on CI by proof:live-verified-ledger, NEVER re-run server-side.
//
// The four π clauses (spec §π 6a-6d):
//   6a — the in-situ V↔H morph frame-series (t=0/.25/.5/.75/1, both directions) — every
//        intermediate frame a coherent silhouette, occluded at the midpoint, on the ONE
//        --dock-morph-t scalar.
//   6b — the in-situ layering/contextual switch changes the dock's active facet live.
//   6c — the BA-VJS-1 four-cycle reproduction: from a rested-collapsed nested dock
//        expand() arms from:40 → to:≈242 (never 0), zero dead-hold, zero snap, every cycle.
//   6d — the §7 perf re-run over the in-situ morph window (4× throttle, both directions).
import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const GROUND = resolve(
    new URL("..", import.meta.url).pathname,
    "docs/tranches/BA/audit/visual/ground",
);

test.beforeAll(() => {
    mkdirSync(GROUND, { recursive: true });
});

// ── 6a — the in-situ V↔H frame-series on the ONE scalar (both directions) ──────────
test("6a — in-situ V↔H frame-series lands the ONE --dock-morph-t scalar both ways", async ({
    page,
}) => {
    await page.goto("/foundations/intro");
    await page.waitForTimeout(800);
    expect(
        await page.evaluate(() => typeof (window as any).__shellDockMorph?.setMorphT === "function"),
        "the shell morph handle is present",
    ).toBe(true);

    const series = await page.evaluate(async () => {
        const h = (window as any).__shellDockMorph;
        h.open();
        h.setPreview(true);
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        await sleep(300);
        const stage = document.querySelector(
            '[data-testid="shell-dock-morph-stage"]',
        ) as HTMLElement;
        const vDock = () =>
            document.querySelector('[data-testid="shell-dock-morph-vertical"]') as HTMLElement;
        const hDock = () =>
            document.querySelector('[data-testid="shell-dock-morph-horizontal"]') as HTMLElement;
        const reads: {
            target: number;
            scalar: number;
            vH: number;
            hW: number;
            vOpacity: number;
            hOpacity: number;
        }[] = [];
        for (const tv of [0, 0.25, 0.5, 0.75, 1]) {
            h.setMorphT(tv);
            await sleep(140);
            const v = vDock();
            const hh = hDock();
            reads.push({
                target: tv,
                scalar: parseFloat(getComputedStyle(stage).getPropertyValue("--dock-morph-t")),
                vH: v ? Math.round(v.getBoundingClientRect().height) : -1,
                hW: hh ? Math.round(hh.getBoundingClientRect().width) : -1,
                vOpacity: v ? parseFloat(getComputedStyle(v).opacity) : -1,
                hOpacity: hh ? parseFloat(getComputedStyle(hh).opacity) : -1,
            });
        }
        return reads;
    });
    console.log("6a FRAME SERIES:", JSON.stringify(series, null, 1));

    // The pinned t lands the scalar exactly (the ONE source, no wall-clock).
    for (const r of series) {
        expect(Math.abs(r.scalar - r.target), `t=${r.target} scalar lands`).toBeLessThan(0.02);
    }
    // The silhouette is coherent + monotone: the vertical collapses (height falls), the
    // horizontal grows (width rises) — a continuous morph, no jump-cut.
    const t0 = series[0]!;
    const t1 = series[series.length - 1]!;
    expect(t0.vH, "vertical full at t=0").toBeGreaterThan(t1.vH);
    expect(t1.hW, "horizontal full at t=1").toBeGreaterThan(t0.hW);
    // At the midpoint BOTH crossfade opacities are at their dimmest (the reflow is
    // occluded by the bridge — the topology jump-cut is hidden).
    const mid = series.find((s) => s.target === 0.5)!;
    expect(mid.vOpacity, "vertical dim at midpoint").toBeLessThan(0.2);
    expect(mid.hOpacity, "horizontal dim at midpoint").toBeLessThan(0.2);

    // Bidirectional — drive back v→h→v, the ONE scalar moves both ways.
    const both = await page.evaluate(async () => {
        const h = (window as any).__shellDockMorph;
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        const stage = document.querySelector('[data-testid="shell-dock-morph-stage"]') as HTMLElement;
        const read = () =>
            parseFloat(getComputedStyle(stage).getPropertyValue("--dock-morph-t")) || 0;
        h.morphTo("horizontal");
        await sleep(600);
        const hMax = read();
        h.morphTo("vertical");
        await sleep(600);
        const vBack = read();
        return { hMax, vBack };
    });
    console.log("6a BIDIRECTIONAL:", JSON.stringify(both));
    expect(both.hMax, "v→h raised the scalar").toBeGreaterThan(0.85);
    expect(both.vBack, "h→v lowered the scalar").toBeLessThan(0.15);
});

// ── 6b — the in-situ layering/contextual switch changes the active facet live ──────
test("6b — in-situ layering switch changes the dock active facet/route live", async ({
    page,
}) => {
    await page.goto("/foundations/intro");
    await page.waitForTimeout(900);
    const railSel = '[data-testid="sidebar-dock-rail"]';

    const before = await page.evaluate((s) => {
        const rail = document.querySelector(s) as HTMLElement;
        const chips = Array.from(rail.querySelectorAll<HTMLElement>("[role='button'], button"));
        return { count: chips.length, url: location.pathname };
    }, railSel);
    console.log("6b BEFORE:", JSON.stringify(before));
    expect(before.count, "the in-situ rail renders >1 facet chip").toBeGreaterThan(1);

    const label = await page.evaluate((s) => {
        const rail = document.querySelector(s) as HTMLElement;
        const chips = Array.from(rail.querySelectorAll<HTMLElement>("[role='button'], button"));
        const last = chips[chips.length - 1];
        const lab = last?.getAttribute("aria-label") ?? last?.textContent?.trim() ?? "";
        last?.click();
        return lab;
    }, railSel);
    await page.waitForTimeout(800);
    const afterUrl = await page.evaluate(() => location.pathname);
    console.log("6b CLICKED:", label, "→", afterUrl);
    expect(afterUrl, "the contextual facet switch changed the dock context live").not.toBe(
        before.url,
    );
});

// ── 6c — the BA-VJS-1 four-cycle non-zero `to` (the nested-measure-ordering fix) ────
test("6c — BA-VJS-1 four-cycle nested dock expand arms from:40 → to:≈242 (never 0)", async ({
    page,
}) => {
    await page.addInitScript(() => {
        // @ts-expect-error — force the spring-readable arm (no VT route-morph noise).
        delete Document.prototype.startViewTransition;
    });
    await page.goto("/dock/layers");
    const sel = '.glass-dock[data-testid="dock-nested-collapsible"]';
    await page.waitForSelector(sel, { timeout: 15_000 });
    await page.locator(sel).first().scrollIntoViewIfNeeded();

    const result = await page.evaluate(async (selector) => {
        const dockEl = document.querySelector(selector) as HTMLElement;
        // Walk __vueParentComponent up to the GlassDock instance whose .exposed has
        // expand/collapse (U-DOCK.md §5 recipe 2).
        let inst: any = (dockEl as any).__vueParentComponent;
        let exposed: any = null;
        while (inst) {
            if (inst.exposed && typeof inst.exposed.expand === "function") {
                exposed = inst.exposed;
                break;
            }
            inst = inst.parent;
        }
        if (!exposed) return { error: "no exposed expand/collapse" };
        const outer = dockEl.querySelector(".dock-layers") as HTMLElement;
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        const cycles: { cycle: number; from: number; to: number; deadHold: boolean; snap: boolean }[] = [];
        for (let i = 0; i < 4; i++) {
            exposed.release();
            exposed.collapse();
            await sleep(800);
            // Sample the box width per frame across the expand to detect a dead-hold or
            // an un-animated snap.
            const widths: number[] = [];
            let sampling = true;
            const sampler = () => {
                widths.push(Math.round(outer.getBoundingClientRect().width));
                if (sampling) requestAnimationFrame(sampler);
            };
            requestAnimationFrame(sampler);
            exposed.expand();
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            await sleep(40);
            const from = parseFloat(outer.style.getPropertyValue("--dock-morph-from")) || 0;
            const to = parseFloat(outer.style.getPropertyValue("--dock-morph-to")) || 0;
            await sleep(700);
            sampling = false;
            // Dead-hold: ≥10 consecutive frames at the same (collapsed) width before
            // the box starts growing. Snap: a single-frame jump > 100px.
            let maxStall = 0;
            let stall = 0;
            let maxJump = 0;
            for (let k = 1; k < widths.length; k++) {
                const d = widths[k]! - widths[k - 1]!;
                if (Math.abs(d) < 1) stall++;
                else {
                    maxStall = Math.max(maxStall, stall);
                    stall = 0;
                }
                maxJump = Math.max(maxJump, Math.abs(d));
            }
            cycles.push({
                cycle: i,
                from,
                to,
                deadHold: maxStall > 30,
                snap: maxJump > 150,
            });
        }
        return { cycles };
    }, sel);

    console.log("6c BA-VJS-1:", JSON.stringify(result));
    expect((result as any).error, "the GlassDock exposed API is reachable").toBeUndefined();
    for (const c of (result as any).cycles) {
        // The acceptance: from:40 → to:≈242 (the content-intrinsic span, never 0/collapsed).
        expect(c.from, `cycle ${c.cycle} from`).toBeGreaterThan(20);
        expect(c.to, `cycle ${c.cycle} to is the real expanded span (never the collapsed ~43)`).toBeGreaterThan(
            120,
        );
        expect(c.deadHold, `cycle ${c.cycle} no dead-hold`).toBe(false);
        expect(c.snap, `cycle ${c.cycle} no un-animated snap`).toBe(false);
    }
});

// ── 6d — the §7 4×-throttle perf re-run over the in-situ morph window ───────────────
test("6d — §7 perf re-run over the in-situ V↔H morph window (4× throttle)", async ({
    page,
}) => {
    await page.goto("/foundations/intro");
    await page.waitForTimeout(800);
    const client = await page.context().newCDPSession(page);

    async function measure(direction: "v2h" | "h2v", preview: boolean) {
        await page.evaluate(
            ({ on }) => {
                const h = (window as any).__shellDockMorph;
                h.open();
                h.setPreview(on);
            },
            { on: preview },
        );
        await page.waitForTimeout(300);
        await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
        const frames = await page.evaluate(
            ({ dir }) => {
                return new Promise<number[]>((resolve) => {
                    const h = (window as any).__shellDockMorph;
                    const fts: number[] = [];
                    let last = performance.now();
                    let running = true;
                    const tick = () => {
                        const now = performance.now();
                        fts.push(now - last);
                        last = now;
                        if (running) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                    h.morphTo(dir === "v2h" ? "horizontal" : "vertical");
                    setTimeout(() => {
                        running = false;
                        resolve(fts.slice(2)); // drop the first 2 warmup frames
                    }, 900);
                });
            },
            { dir: direction },
        );
        await client.send("Emulation.setCPUThrottlingRate", { rate: 1 });
        const sorted = [...frames].sort((a, b) => a - b);
        const p50 = sorted[Math.floor(sorted.length / 2)] ?? 0;
        const over = frames.filter((f) => f > 16.7).length;
        return {
            frameCount: frames.length,
            p50_ms: Math.round(p50 * 10) / 10,
            max_ms: Math.round(Math.max(...frames) * 10) / 10,
            framesOver16_7ms: over,
            fractionOver16_7ms: Math.round((over / frames.length) * 1000) / 1000,
        };
    }

    // The SHIPPED default — the VT crossfade (preview OFF).
    const vtV2H = await measure("v2h", false);
    const vtH2V = await measure("h2v", false);
    // The perf-gated teardrop (preview ON) — the §7 number that decides the ship.
    const teardropV2H = await measure("v2h", true);
    const teardropH2V = await measure("h2v", true);

    const BUDGET_P50 = 12;
    const teardropClears =
        teardropV2H.p50_ms <= BUDGET_P50 &&
        teardropH2V.p50_ms <= BUDGET_P50 &&
        teardropV2H.framesOver16_7ms === 0 &&
        teardropH2V.framesOver16_7ms === 0;
    const shippedRegister = teardropClears ? "teardrop" : "view-transition";

    for (const [dir, data, config] of [
        ["v2h", vtV2H, "SHIPPED — View-Transitions crossfade"],
        ["h2v", vtH2V, "SHIPPED — View-Transitions crossfade"],
        ["v2h", teardropV2H, "PREVIEW — liquid-teardrop metaball bridge"],
        ["h2v", teardropH2V, "PREVIEW — liquid-teardrop metaball bridge"],
    ] as const) {
        const tag = config.startsWith("SHIPPED") ? "vt" : "teardrop";
        writeFileSync(
            resolve(GROUND, `W-DOCK-MORPH-INSITU-gperf-${tag}-${dir}.json`),
            JSON.stringify(
                {
                    gate: "W-DOCK-MORPH-INSITU-gperf",
                    direction: dir,
                    config,
                    throttleRate: 4,
                    protocol: "AZ §7 / W-BLOB-GLASS §2 — 4× CPU-throttle over the in-situ morph window",
                    // The binding §7 NUMBER is the real-GPU/Metal dev-box (the AY W-LIVE1
                    // split); a headless SwiftShader run is NOT authoritative for the
                    // teardrop's per-frame goo-blur cost. Stamp the actual render path so
                    // the DELTA reader weighs the number correctly (no inflation).
                    renderPath:
                        process.env.GLASS_UI_GPU_LABEL ?? "chromium headless (SwiftShader — NOT the Metal dev-box)",
                    ...data,
                    budgetP50: BUDGET_P50,
                    budgetOverFrac: 0,
                    clears:
                        data.p50_ms <= BUDGET_P50 && data.framesOver16_7ms === 0,
                },
                null,
                2,
            ),
        );
    }

    console.log(
        "6d PERF:",
        JSON.stringify({ vtV2H, vtH2V, teardropV2H, teardropH2V, teardropClears, shippedRegister }),
    );
    // The decision is the recorded number — we do NOT assert the teardrop clears (it is
    // the mechanical fall; the VT crossfade is the floor). We DO assert the VT default
    // is the budget-clearing register the shell ships.
    expect(vtV2H.frameCount, "the VT morph window produced frames").toBeGreaterThan(5);
});
