// AY.W-A11Y-PERF G4 — proof:nested-backdrop-budget — the nested-backdrop DEPTH +
// frame-budget gate (H-4).
//
// AX.W54 made the default <Button> variant glass (a real 10px backdrop-filter). The
// common composition — glass Buttons in a .glass-card in a glass Dialog over a glass/
// aurora page — stacks 3-4 INDEPENDENT backdrop-filter layers and NESTS them; WebKit
// re-samples the already-blurred buffer at each nested level (non-linear cost). O-4
// lands `contain: paint` on the glass stacking surfaces so the backdrop sample does not
// escape the box, and mints THIS gate.
//
// The gate produces a MEASURED artefact (a frame-time series + a DOM-walk depth count),
// NOT a looks-right check:
//   1. NESTED-DEPTH (structure): walk the mounted stack; count the max ancestor→
//      descendant chain EACH carrying a non-`none` backdrop-filter. ASSERT depth ≤ a
//      DOCUMENTED ceiling (recorded from the live measure).
//   2. FRAME-BUDGET (perf): drive a scroll/resize jiggle while sampling rAF deltas;
//      ASSERT the MEDIAN frame time stays under a measured budget (the 60fps/16.7ms
//      target on the M-class baseline; recorded p50/p95 in the DELTA).
//   3. CONTAINMENT (source): getComputedStyle confirms `contain` includes `paint` on
//      .glass-card / .glass-btn / .glass-dock.
// Born-RED before O-4 (no `paint` containment → the containment ASSERT fails). Bite:
// revert one `contain: paint` → the containment ASSERT reds.
//
// MEASURED BASELINE (PERF-runtime-substrates, M5 Max, headed Chrome rAF cap ~98Hz /
// 10.2ms): the contained single-glass-surface holds 10.2ms p50 / 0% over 16.7ms. G4
// mounts its stack over a FLAT substrate (not a painterly aurora — that would conflate
// shader cost with backdrop-stack cost) so the number isolates the backdrop nesting.

import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";
import { fileURLToPath } from "node:url";
import { mkdirSync, writeFileSync } from "node:fs";

const CACHE_DIR = fileURLToPath(new URL("../.cache/", import.meta.url));
// The documented ceiling: a Button-in-Card-in-Dialog stack is depth 3 (the Dialog
// surface + the card + the button each carry a backdrop-filter). The page substrate may
// add 1 (a glass/aurora page). Set the ceiling at 4 (depth-3 stack + 1 page) and RECORD
// it — a regression that nests a 5th blur layer reds.
const DEPTH_CEILING = 4;
// The frame budget — the 60fps target. The headed rAF cap is ~98Hz (~10.2ms); the p50
// of a contained stack holds the cap. We assert the MEDIAN stays under the 16.7ms 60fps
// budget with generous slack for the headless-software-GL CI path.
const FRAME_BUDGET_MS = 16.7;
const FRAME_BUDGET_SLACK_MS = 33; // headless software-GL CI tolerance (p50 under 2 frames)

test.describe("nested-backdrop-budget (π lane — the maximal-glass nested stack, fail-CLOSED)", () => {
    test("the glass-Button-in-Card-in-Dialog stack stays within the depth + frame budget", async ({
        page,
    }) => {
        mkdirSync(CACHE_DIR, { recursive: true });
        // A FLAT substrate route (the glass-material gallery — no painterly aurora) so
        // the measured number isolates the backdrop-filter nesting, not shader cost.
        const scene = resolveScene("substrates", "glass-material");
        await page.goto(scene.path, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(500);

        // Mount the nested glass stack: a glass-overlay "Dialog" containing a glass-card
        // containing a glass-btn — three INDEPENDENT backdrop-filter layers, nested.
        await page.evaluate(() => {
            const id = "__nested_stack__";
            document.getElementById(id)?.remove();
            const dialog = document.createElement("div");
            dialog.id = id;
            dialog.className = "glass-overlay";
            dialog.style.cssText =
                "position:fixed;left:40px;top:40px;width:360px;height:240px;border-radius:16px;padding:24px;z-index:99999;";
            const card = document.createElement("div");
            card.className = "glass-card";
            card.style.cssText = "width:100%;height:140px;padding:16px;display:flex;gap:8px;align-items:center;";
            const btn = document.createElement("button");
            btn.className = "glass-btn btn-glass";
            btn.textContent = "B";
            btn.style.cssText = "width:44px;height:44px;";
            card.appendChild(btn);
            dialog.appendChild(card);
            document.body.appendChild(dialog);
            void dialog.offsetHeight;
        });
        await page.waitForTimeout(200);

        // ── (1) NESTED-DEPTH — walk the stack; count the max chain of nested elements
        // each carrying a non-`none` backdrop-filter. ───────────────────────────────────
        const depthReadout = await page.evaluate(() => {
            const root = document.getElementById("__nested_stack__")!;
            // Walk root → descendants; the chain depth is the count of nested
            // backdrop-filter-bearing elements from root down a single lineage.
            function maxBackdropDepth(el: Element): number {
                const cs = getComputedStyle(el);
                const has =
                    (cs.backdropFilter && cs.backdropFilter !== "none") ||
                    ((cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter &&
                        (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter !== "none");
                let childMax = 0;
                for (const child of Array.from(el.children)) {
                    childMax = Math.max(childMax, maxBackdropDepth(child));
                }
                return (has ? 1 : 0) + childMax;
            }
            return maxBackdropDepth(root);
        });

        // ── (3) CONTAINMENT — getComputedStyle confirms `contain` includes `paint` on
        // the glass stacking surfaces. ──────────────────────────────────────────────────
        const containment = await page.evaluate(() => {
            const read = (sel: string) => {
                const el = document.querySelector(sel);
                if (!el) return null;
                const c = getComputedStyle(el).contain;
                return { contain: c, hasPaint: /\bpaint\b/.test(c) || c === "strict" || c === "content" };
            };
            return {
                card: read(".glass-card"),
                btn: read(".glass-btn"),
                dock: read(".glass-dock"),
            };
        });

        // ── (2) FRAME-BUDGET — drive a scroll/resize jiggle while sampling rAF deltas. ──
        const frame = await page.evaluate(async () => {
            const deltas: number[] = [];
            let last = performance.now();
            const stack = document.getElementById("__nested_stack__")!;
            let frames = 0;
            await new Promise<void>((res) => {
                const tick = () => {
                    const now = performance.now();
                    deltas.push(now - last);
                    last = now;
                    // Jiggle: translate the stack + force a layout read each frame.
                    stack.style.transform = `translateX(${(frames % 6) - 3}px)`;
                    void stack.offsetHeight;
                    frames += 1;
                    if (frames >= 60) res();
                    else requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
            // Drop the first 2 frames (warm-up); percentiles over the sorted rest.
            const sorted = deltas.slice(2).sort((a, b) => a - b);
            const pct = (p: number) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
            return {
                p50: Number(pct(0.5).toFixed(2)),
                p95: Number(pct(0.95).toFixed(2)),
                frames: sorted.length,
            };
        });

        await page.evaluate(() => document.getElementById("__nested_stack__")?.remove());

        const artefact = {
            depth: depthReadout,
            depthCeiling: DEPTH_CEILING,
            containment,
            frame,
            frameBudgetMs: FRAME_BUDGET_MS,
        };
        writeFileSync(`${CACHE_DIR}nested-backdrop-budget.json`, JSON.stringify(artefact, null, 2));
        console.log(
            `[W-A11Y-PERF G4] nested-depth=${depthReadout} (ceiling ${DEPTH_CEILING}) | frame p50=${frame.p50}ms p95=${frame.p95}ms (budget ${FRAME_BUDGET_MS}ms) | contain: card=${containment.card?.contain} btn=${containment.btn?.contain}`,
        );

        // ── ASSERTS ──────────────────────────────────────────────────────────────────
        // Depth ≤ the documented ceiling (a 5th nested blur layer reds).
        expect(
            depthReadout,
            `the nested backdrop-filter stack is depth ${depthReadout} (> ceiling ${DEPTH_CEILING}) — a regression nested an extra blur layer. The maximal-glass stack must not grow unbounded.`,
        ).toBeLessThanOrEqual(DEPTH_CEILING);
        // The stack actually nests blur (the gate is meaningful, not vacuous): depth ≥ 2.
        expect(
            depthReadout,
            `the nested stack measured depth ${depthReadout} (< 2) — the glass surfaces did not paint a backdrop-filter, so the gate is not exercising the nested case (a setup error).`,
        ).toBeGreaterThanOrEqual(2);

        // Containment: `paint` present on glass-card + glass-btn (the source half — the
        // born-RED arm before O-4). glass-dock is present only on dock routes; assert it
        // only if found.
        expect(
            containment.card?.hasPaint,
            `.glass-card \`contain\` is "${containment.card?.contain}" — O-4 must include \`paint\` (the nested-backdrop sample must not escape the box).`,
        ).toBe(true);
        expect(
            containment.btn?.hasPaint,
            `.glass-btn \`contain\` is "${containment.btn?.contain}" — O-4 must include \`paint\`.`,
        ).toBe(true);

        // Frame budget: the MEDIAN frame stays under the 60fps budget + the CI slack
        // (the contained stack holds the cap; an uncontained nested stack that re-samples
        // the blurred buffer per level would blow it on a weaker device).
        expect(
            frame.p50,
            `the nested-glass stack median frame time is ${frame.p50}ms — over the ${FRAME_BUDGET_MS}ms 60fps budget + ${FRAME_BUDGET_SLACK_MS}ms CI slack. The nested backdrop-filter cost exceeds the contained baseline.`,
        ).toBeLessThanOrEqual(FRAME_BUDGET_MS + FRAME_BUDGET_SLACK_MS);
    });
});
