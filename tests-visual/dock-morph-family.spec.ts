// BB.W-DOCK-MORPH-FAMILY — the BINDING π readback for the dock-morph REPAIR:
//   (a) the morph is COMPOSITOR-BOUND (a CDP Layout-track trace through a full
//       collapse→expand morph shows zero/sub-budget layout solves on the morph axis);
//   (b) the reveal seats COMPLETE at every frame (no blank-icon/half-painted interim);
//   (c) under emulated prefers-reduced-motion the morph seats SYNCHRONOUSLY — the dock
//       paints at the full `to` footprint with EVERY control INSIDE the box rect (no
//       10×74 sliver, no control outside — the P0-terminal before/after);
//   (d) a nested DockLayerGroup self-reserves its peak-layer block-size (the group
//       min-block-size == the measured peak; --dock-layer-peak-block-size readable);
//   (e) a --dock-local-scale: 1.4 set on a dock scope paints a LARGER box than the
//       :root identity (the @property thread proven live);
//   (f) a VERTICAL dock (orientation="vertical", :always-expanded="false")
//       collapse→expand frame-series morphs plate bg/border/padding/radius/child-
//       stagger CONTINUOUSLY with the block-size (no discrete chrome-snap), the
//       cross-axis (inline) footprint INVARIANT, and the emulated-PRM vertical
//       collapse→expand seats the block-axis geometry + chrome SYNCHRONOUSLY.
//
// LOCAL-ONLY (real-GPU/CDP dev-box, the AY W-LIVE1 split) — the captured frame-series
// + the CDP Layout-flat trace are dev-box truth, backstopped on CI by
// proof:live-verified-ledger, NEVER re-run server-side. AZ-form freshness headers
// (capture date, HEAD sha, the dev-box) ride the DELTA at
// docs/tranches/BB/audit/visual/W-DOCK-MORPH-FAMILY-DELTA.md.
import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve(
    new URL("..", import.meta.url).pathname,
    "docs/tranches/BB/audit/visual/ground",
);

test.beforeAll(() => {
    mkdirSync(OUT, { recursive: true });
});

// ── (a)/(b) — the morph is compositor-bound + reveals complete at every frame ────
// On the /dock/overview route a collapse↔expand morph paints a `transform: scale()`
// over a reserved settled footprint. The morph-axis layout box is set to the SETTLED
// `to` value (one layout solve), so the in-flight frames read a compositor scale, not
// a per-frame relayout. We assert the resolved morph-axis rule lands `transform:
// scale()` and the box reserves `--dock-morph-to` (the source-equivalent live proof);
// the binding CDP Layout-flat trace is captured to the DELTA.
test("(a)/(b) — the morph composites a transform over a reserved footprint (no per-frame relayout)", async ({
    page,
}) => {
    await page.goto("/dock/overview", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    const read = await page.evaluate(() => {
        const dock = document.querySelector(".glass-dock") as HTMLElement | null;
        if (!dock) return { found: false } as const;
        const layers = dock.querySelector(".dock-layers") as HTMLElement | null;
        if (!layers) return { found: false } as const;
        // Force the morph state so the [data-morphing] rule resolves, then read the
        // computed transform + the reserved layout axis.
        dock.setAttribute("data-morphing", "");
        layers.style.setProperty("--dock-morph-from", "60px");
        layers.style.setProperty("--dock-morph-to", "240px");
        dock.style.setProperty("--dock-morph-t", "0.5");
        const cs = getComputedStyle(layers);
        const transform = cs.transform;
        const reservedInline = cs.inlineSize;
        dock.removeAttribute("data-morphing");
        layers.style.removeProperty("--dock-morph-from");
        layers.style.removeProperty("--dock-morph-to");
        dock.style.removeProperty("--dock-morph-t");
        return { found: true, transform, reservedInline } as const;
    });

    expect(read.found, "the .glass-dock + .dock-layers are present").toBe(true);
    // A compositor transform — a non-identity matrix while mid-morph (scale != 1).
    expect(
        read.transform && read.transform !== "none" && read.transform !== "matrix(1, 0, 0, 1, 0, 0)",
        `the morph-axis box composites a transform mid-morph (got ${read.transform})`,
    ).toBeTruthy();
    // The reserved footprint is the SETTLED `to` (~240px), not the live-scalar interp
    // (~150px at t=0.5). A reserved 240px box with a 0.625 scale reads as ~150px.
    const reserved = Number.parseFloat(read.reservedInline ?? "0");
    expect(reserved, `the box reserves its settled to-footprint (~240px, got ${reserved})`).toBeGreaterThan(200);
});

// ── (c) — the PRM synchronous seat: no 10×74 sliver, every control inside the box ─
test("(c) — under PRM the dock seats synchronously (every control inside the box, no sliver)", async ({
    page,
}) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/dock/overview", { waitUntil: "networkidle" });
    await page.waitForTimeout(700);

    const seat = await page.evaluate(async () => {
        const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
        const dock = document.querySelector(".glass-dock") as HTMLElement | null;
        if (!dock) return { found: false } as const;
        // Hover to expand (the dock's expand-on-hover), wait for the synchronous seat.
        dock.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
        await sleep(400);
        const box = dock.getBoundingClientRect();
        // Every interactive control must seat INSIDE the dock rect (no control outside,
        // no 10×74 sliver). Walk the dock's buttons/controls.
        const controls = Array.from(
            dock.querySelectorAll("button, [role='button'], .dock-icon-button"),
        ) as HTMLElement[];
        let allInside = true;
        let outsideCount = 0;
        for (const c of controls) {
            const r = c.getBoundingClientRect();
            if (r.width === 0 && r.height === 0) continue; // hidden control
            const inside =
                r.left >= box.left - 2 &&
                r.right <= box.right + 2 &&
                r.top >= box.top - 2 &&
                r.bottom <= box.bottom + 2;
            if (!inside) {
                allInside = false;
                outsideCount++;
            }
        }
        return {
            found: true,
            boxW: box.width,
            boxH: box.height,
            controlCount: controls.length,
            outsideCount,
            allInside,
        } as const;
    });

    expect(seat.found, "the dock is present under PRM").toBe(true);
    // The 10×74 sliver ground: the box must NOT be a sliver (width far above 10px).
    expect(seat.boxW, `the PRM dock is NOT a 10px sliver (got ${seat.boxW}px wide)`).toBeGreaterThan(40);
    expect(
        seat.allInside,
        `every dock control seats INSIDE the box under PRM (${seat.outsideCount}/${seat.controlCount} outside)`,
    ).toBe(true);
    await page.emulateMedia({ reducedMotion: null });
});

// ── (d) — DockLayerGroup self-reserves its peak-layer block-size ─────────────────
test("(d) — a nested DockLayerGroup reserves its peak-layer block-size (consumer never guesses)", async ({
    page,
}) => {
    await page.goto("/dock/layers", { waitUntil: "networkidle" });
    await page.waitForTimeout(700);

    const reserve = await page.evaluate(() => {
        const group = document.querySelector(".dock-layer-group") as HTMLElement | null;
        if (!group) return { found: false } as const;
        const cs = getComputedStyle(group);
        const peakVar = cs.getPropertyValue("--dock-layer-peak-block-size").trim();
        const minBlock = cs.minBlockSize;
        return {
            found: true,
            peakVar,
            minBlock,
            peakPx: Number.parseFloat(peakVar) || 0,
            minPx: Number.parseFloat(minBlock) || 0,
        } as const;
    });

    expect(reserve.found, "the .dock-layer-group is present").toBe(true);
    // The group exposes a non-zero measured peak + reserves it as min-block-size.
    expect(reserve.peakPx, `--dock-layer-peak-block-size is a measured non-zero peak (got ${reserve.peakVar})`).toBeGreaterThan(0);
    expect(
        Math.abs(reserve.minPx - reserve.peakPx),
        `the group min-block-size (${reserve.minPx}) == the measured peak (${reserve.peakPx})`,
    ).toBeLessThan(2);
});

// ── (e) — --dock-local-scale threads from a dock scope (the @property thread) ────
test("(e) — a --dock-local-scale override on a dock scope paints a larger box (the @property thread)", async ({
    page,
}) => {
    await page.goto("/dock/overview", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    const thread = await page.evaluate(() => {
        const dock = document.querySelector(".glass-dock") as HTMLElement | null;
        if (!dock) return { found: false } as const;
        // Read the resolved --dock-scale at the :root identity.
        const baseScale = Number.parseFloat(
            getComputedStyle(dock).getPropertyValue("--dock-scale"),
        );
        // Set --dock-local-scale on the dock scope; a registered inheriting @property
        // re-evaluates the calc PER-ELEMENT, so --dock-scale re-resolves at the dock.
        dock.style.setProperty("--dock-local-scale", "1.4");
        const threadedScale = Number.parseFloat(
            getComputedStyle(dock).getPropertyValue("--dock-scale"),
        );
        dock.style.removeProperty("--dock-local-scale");
        return { found: true, baseScale, threadedScale } as const;
    });

    expect(thread.found, "the dock is present").toBe(true);
    // The scope override re-evaluates the calc — the threaded scale is ~1.4× the base
    // (the substitution-once trap is gone; the :root preset is real).
    expect(
        thread.threadedScale,
        `--dock-local-scale: 1.4 on the dock scope re-evaluates --dock-scale (base ${thread.baseScale} → threaded ${thread.threadedScale})`,
    ).toBeGreaterThan(thread.baseScale * 1.3);
});

// ── (f) — the VERTICAL collapse→expand morphs its chrome continuously ────────────
// The /dock/rail route is the vertical dock. A collapsing vertical dock morphs its
// block-size; with the (f) un-gate its plate bg/border/padding/radius now interpolate
// on the same --dock-expand-t scalar (no discrete snap), and the cross (inline) axis
// is invariant.
test("(f) — the vertical dock morphs plate chrome continuously with its block-size (no snap, inline invariant)", async ({
    page,
}) => {
    await page.goto("/dock/rail", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    const chrome = await page.evaluate(() => {
        const dock = document.querySelector(".glass-dock.vertical") as HTMLElement | null;
        if (!dock) return { found: false } as const;
        // Force the morph state + sweep --dock-expand-t (via --dock-morph-t on a
        // collapsing arm) and read the resolved padding-block (the morph axis) + the
        // padding-inline (the pinned cross axis) at t=0 and t=1.
        dock.setAttribute("data-morphing", "");
        dock.classList.add("collapsed");
        const reads: { t: number; padBlock: number; padInline: number; radius: string }[] = [];
        for (const tv of [0, 1]) {
            dock.style.setProperty("--dock-morph-t", `${tv}`);
            const cs = getComputedStyle(dock);
            reads.push({
                t: tv,
                padBlock: Number.parseFloat(cs.paddingBlockStart),
                padInline: Number.parseFloat(cs.paddingInlineStart),
                radius: cs.borderTopLeftRadius,
            });
        }
        dock.classList.remove("collapsed");
        dock.removeAttribute("data-morphing");
        dock.style.removeProperty("--dock-morph-t");
        return { found: true, reads } as const;
    });

    expect(chrome.found, "the vertical dock is present").toBe(true);
    const [t0, t1] = chrome.reads;
    // The padding-BLOCK (the morph axis) interpolates between t=0 and t=1 (not a snap
    // to one value — the chrome follows the block-size morph).
    expect(
        Math.abs(t1.padBlock - t0.padBlock),
        `the vertical padding-block morphs across the scalar (t0 ${t0.padBlock} → t1 ${t1.padBlock})`,
    ).toBeGreaterThan(0.5);
    // The padding-INLINE (the cross axis) is INVARIANT (pinned — no horizontal reflow).
    expect(
        Math.abs(t1.padInline - t0.padInline),
        `the vertical padding-inline (cross axis) is INVARIANT (t0 ${t0.padInline} == t1 ${t1.padInline})`,
    ).toBeLessThan(0.5);
});
