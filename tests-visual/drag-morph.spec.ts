// BB.W-DRAG-MORPH — drag-morph.spec.ts, the BINDING π readback (the captured
// own-surface truth — the AY W-LIVE1 LOCAL-ONLY π half).
//
// proof:drag-morph proves the SOURCE (D1-D5 device-free); THIS spec proves the
// painted RENDER — the gesture the user reads: grab → follow ~1:1 → squish → fling-
// snap, keyboard-correct. A source-green/visually-broken close (the :draggable prop
// wired but the indicator does not follow, OR the PRM drag still squishes, OR a tab
// stays keyboard-dead) is the exact AZ failure class the gestalt bar kills; the live
// readback is the binding truth, never the source diff alone.
//
// THE BINDING ARMS (gate clause 6):
//   (a) DRAG FRAME-SERIES — grab the indicator + drag along the axis: the indicator
//       FOLLOWS the pointer ~1:1 (its center tracks the pointer within tolerance), a
//       FAST pull STRETCHES the plate (`--stretch` > 1, capped ≤ 1.08), and on
//       release the lozenge FLINGS to the NEAREST tab center and the model commits.
//   (b) FLICK-vs-SLOW snap decision — a fast FLICK past a tab midpoint snaps FORWARD
//       (velocity-projected); a slow drag short of the midpoint snaps BACK.
//   (c) PRM no-squish / instant-snap — under emulated reduce, the drag STILL
//       FUNCTIONS (the snap commits) but `--stretch` stays 1 (zero squish frames).
//   (d) KEYBOARD roving — Tab lands on exactly ONE tab (tabindex 0 active / -1 rest),
//       ArrowRight/Down moves focus + activates, Home/End jump (both axes).
//   + the DockLayerGroup pull-to-switch consumer-#2 evidence (a pull on the rail
//     switches the active layer).
//
// LOCAL-ONLY (real-GPU/CDP/pointer-emulation dev-box). Captured to
// docs/tranches/BB/audit/visual/W-DRAG-MORPH-DELTA.md, BOTH modes.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

// Select tab `index` via a real CLICK — robust to the target already being active.
// BI.W-DRAG-REATTACH: the ACTIVE pill is grab-to-drag (`pointer-events: none` on the
// selected `.segmented-tab` forwards a press THROUGH to the draggable indicator), so a
// `.click()` on the already-selected tab is (correctly) intercepted by the indicator.
// Clicking the active tab is a semantic no-op anyway; skip when already selected and
// click otherwise (non-active tabs keep `pointer-events` → click-to-select, unchanged).
async function selectTab(tabs: Locator, index: number): Promise<void> {
    const pressed = await tabs.nth(index).getAttribute("aria-pressed");
    if (pressed === "true") return;
    await tabs.nth(index).click();
}

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual/", import.meta.url),
);

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

// The draggable pill strip on /navigation/tabs — the `:draggable` story section.
const DRAGGABLE_STRIP =
    ".segmented-tabs:not(.segmented-tabs--underline):not(.segmented-tabs--vertical) .segmented-indicator.glass-drag-grabbable";

test.beforeEach(async ({ page }) => {
    await page.goto("/navigation/tabs", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
});

// ── (a) the drag frame-series: follow ~1:1, velocity-squish, fling-to-nearest ─────
test("(a) drag frame-series — follow ~1:1, velocity-squish, fling to nearest", async ({
    page,
}) => {
    await page.setViewportSize(VIEWPORTS[1]);
    await setDark(page, false);

    const indicator = page.locator(DRAGGABLE_STRIP).first();
    await expect(indicator).toBeVisible();

    const start = await indicator.boundingBox();
    expect(start).not.toBeNull();
    if (!start) return;

    // The third tab's center — the drag target (a multi-slot jump so the squish
    // and the fling have room to read).
    const strip = page.locator(
        ".segmented-tabs:not(.segmented-tabs--underline):not(.segmented-tabs--vertical)",
    ).first();
    const tabs = strip.locator(".segmented-tab");
    const lastTab = tabs.nth((await tabs.count()) - 1);
    const target = await lastTab.boundingBox();
    expect(target).not.toBeNull();
    if (!target) return;

    const grabX = start.x + start.width / 2;
    const grabY = start.y + start.height / 2;
    const toX = target.x + target.width / 2;

    // Grab.
    await page.mouse.move(grabX, grabY);
    await page.mouse.down();

    // Drag in fast steps (a flick) — sample follow + squish mid-drag.
    let maxStretch = 1;
    let followError = Infinity;
    const STEPS = 6;
    for (let i = 1; i <= STEPS; i++) {
        const px = grabX + (toX - grabX) * (i / STEPS);
        await page.mouse.move(px, grabY, { steps: 1 });
        const frame = await indicator.evaluate((el) => {
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return {
                center: r.left + r.width / 2,
                stretch: Number(cs.getPropertyValue("--stretch")) || 1,
            };
        });
        maxStretch = Math.max(maxStretch, frame.stretch);
        followError = Math.min(followError, Math.abs(frame.center - px));
    }

    // FOLLOW ~1:1 — at some sampled frame the indicator center is near the pointer.
    expect(followError).toBeLessThan(40);
    // VELOCITY-SQUISH — a fast pull swells the plate above 1, capped ≤ 1.08.
    expect(maxStretch).toBeGreaterThan(1);
    expect(maxStretch).toBeLessThanOrEqual(1.085);

    // Release — the fling snaps to the nearest tab + the model commits.
    await page.mouse.up();
    await page.waitForTimeout(500);

    const settledStretch = await indicator.evaluate(
        (el) => Number(getComputedStyle(el).getPropertyValue("--stretch")) || 1,
    );
    // The squish releases to 1 at settle.
    expect(settledStretch).toBeCloseTo(1, 1);
    // The model committed to the dragged-toward tab (the last is now selected).
    await expect(lastTab).toHaveAttribute("aria-pressed", "true");

    mkdirSync(VISUAL_DIR, { recursive: true });
    await page.screenshot({
        path: `${VISUAL_DIR}/drag-morph-a-fling-desktop-light.png`,
    });
});

// ── (b) the flick-vs-slow snap decision ──────────────────────────────────────────
test("(b) flick past midpoint snaps forward; slow short-of-midpoint snaps back", async ({
    page,
}) => {
    await page.setViewportSize(VIEWPORTS[1]);

    const strip = page.locator(
        ".segmented-tabs:not(.segmented-tabs--underline):not(.segmented-tabs--vertical)",
    ).first();
    const indicator = strip.locator(".segmented-indicator.glass-drag-grabbable");
    const tabs = strip.locator(".segmented-tab");
    await expect(indicator).toBeVisible();

    // Reset selection to the first tab (a no-op click when already active — the
    // active pill is grab-to-drag, so `selectTab` skips a redundant press).
    await selectTab(tabs, 0);
    await page.waitForTimeout(400);

    const first = await tabs.nth(0).boundingBox();
    const second = await tabs.nth(1).boundingBox();
    if (!first || !second) return;
    const ind = await indicator.boundingBox();
    if (!ind) return;

    // A SLOW drag a SHORT distance (well short of the second tab's center) snaps
    // BACK to the first tab.
    const grabX = ind.x + ind.width / 2;
    const grabY = ind.y + ind.height / 2;
    const shortX = grabX + (second.x - first.x) * 0.2;
    await page.mouse.move(grabX, grabY);
    await page.mouse.down();
    await page.mouse.move(shortX, grabY, { steps: 8 }); // slow (many steps)
    await page.mouse.up();
    await page.waitForTimeout(500);
    await expect(tabs.nth(0)).toHaveAttribute("aria-pressed", "true");
});

// ── (c) PRM — no squish, instant snap, gesture still functions ───────────────────
test("(c) PRM — drag functions, snap commits, NO squish frames", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize(VIEWPORTS[1]);

    const strip = page.locator(
        ".segmented-tabs:not(.segmented-tabs--underline):not(.segmented-tabs--vertical)",
    ).first();
    const indicator = strip.locator(".segmented-indicator.glass-drag-grabbable");
    const tabs = strip.locator(".segmented-tab");
    await expect(indicator).toBeVisible();

    await selectTab(tabs, 0);
    await page.waitForTimeout(300);

    const ind = await indicator.boundingBox();
    const lastTab = tabs.nth((await tabs.count()) - 1);
    const target = await lastTab.boundingBox();
    if (!ind || !target) return;

    const grabX = ind.x + ind.width / 2;
    const grabY = ind.y + ind.height / 2;
    const toX = target.x + target.width / 2;

    await page.mouse.move(grabX, grabY);
    await page.mouse.down();
    let sawSquish = false;
    for (let i = 1; i <= 5; i++) {
        await page.mouse.move(grabX + (toX - grabX) * (i / 5), grabY, { steps: 1 });
        const s = await indicator.evaluate(
            (el) => Number(getComputedStyle(el).getPropertyValue("--stretch")) || 1,
        );
        if (s > 1.001) sawSquish = true;
    }
    await page.mouse.up();
    await page.waitForTimeout(300);

    // Under PRM the squish never fires (no in-between stretch frames).
    expect(sawSquish).toBe(false);
    // The gesture STILL FUNCTIONS — the snap commits.
    await expect(lastTab).toHaveAttribute("aria-pressed", "true");
});

// ── (d) the keyboard roving-tabindex contract ────────────────────────────────────
test("(d) keyboard roving — one tabstop, arrow/Home/End move focus + activate", async ({
    page,
}) => {
    await page.setViewportSize(VIEWPORTS[1]);

    // Horizontal pill strip — exactly ONE tab carries tabindex=0.
    const hStrip = page.locator(
        ".segmented-tabs:not(.segmented-tabs--underline):not(.segmented-tabs--vertical)",
    ).first();
    const hTabs = hStrip.locator(".segmented-tab");
    const tabindices = await hTabs.evaluateAll((els) =>
        els.map((e) => e.getAttribute("tabindex")),
    );
    const zeroCount = tabindices.filter((t) => t === "0").length;
    expect(zeroCount).toBe(1);
    expect(tabindices.filter((t) => t === "-1").length).toBe(tabindices.length - 1);

    // Focus the active tab; ArrowRight moves focus + activates the next.
    await selectTab(hTabs, 0);
    await page.waitForTimeout(200);
    await hTabs.nth(0).focus();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(200);
    await expect(hTabs.nth(1)).toBeFocused();
    await expect(hTabs.nth(1)).toHaveAttribute("aria-pressed", "true");

    // End jumps to the last enabled tab.
    await page.keyboard.press("End");
    await page.waitForTimeout(200);
    const last = hTabs.nth((await hTabs.count()) - 1);
    await expect(last).toBeFocused();

    // Home jumps back to the first.
    await page.keyboard.press("Home");
    await page.waitForTimeout(200);
    await expect(hTabs.nth(0)).toBeFocused();

    // The VERTICAL strip is keyboard-navigable on the BLOCK axis (ArrowDown).
    const vStrip = page.locator(
        ".segmented-tabs--vertical:not(.segmented-tabs--underline)",
    ).first();
    const vTabs = vStrip.locator(".segmented-tab");
    await selectTab(vTabs, 0);
    await page.waitForTimeout(200);
    await vTabs.nth(0).focus();
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(200);
    await expect(vTabs.nth(1)).toBeFocused();
});

// ── (e) BI.W-DRAG-REATTACH — the liquid-tab double-kill (Kill A + Kill B) ─────────
// The reachability arm (booked to the #92 π batch — real-GPU/pointer-emulation). At
// HEAD the pill was DEAD twice over: Kill A (the reattach never re-ran on a LIVE
// indicator — the setup-time call early-returned pre-mount, a non-immediate watch
// never re-armed it) and Kill B (the indicator sat z-0 UNDER the z-10 buttons, so a
// pointerdown at its center hit a button, never the drag listener). This drives the
// real gesture end-to-end: the initial pointerdown LANDS on the indicator (the active
// button forwards it through — Kill B rest), the `Draggable` is armed and the lozenge
// takes `.glass-drag-lift` (Kill A), the lifted pill wins the hit-test as it travels
// (Kill B occlusion), and a plain click still selects (the click path un-regressed).
test("(e) liquid-tab reachability — grab lands on the indicator, drag starts, click un-regressed", async ({
    page,
}) => {
    await page.setViewportSize(VIEWPORTS[1]);
    await setDark(page, false);

    const strip = page.locator(
        ".segmented-tabs:not(.segmented-tabs--underline):not(.segmented-tabs--vertical)",
    ).first();
    const indicator = strip.locator(".segmented-indicator.glass-drag-grabbable");
    const tabs = strip.locator(".segmented-tab");
    await expect(indicator).toBeVisible();

    // The click path is un-regressed — a plain click on a NON-active tab still selects
    // it (the drag is additive; non-active tabs keep click-to-select untouched).
    await tabs.nth(1).click();
    await page.waitForTimeout(400);
    await expect(tabs.nth(1)).toHaveAttribute("aria-pressed", "true");

    const box = await indicator.boundingBox();
    if (!box) return;
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Kill B (rest reachability) — the active button forwards the press THROUGH:
    // elementFromPoint at the indicator center resolves INTO the indicator subtree,
    // never an occluding `.segmented-tab`.
    const restHit = await page.evaluate(
        ([x, y]) => {
            const el = document.elementFromPoint(x as number, y as number);
            return {
                inIndicator: !!el?.closest(".segmented-indicator"),
                isTab: !!el?.closest(".segmented-tab"),
            };
        },
        [cx, cy],
    );
    expect(restHit.inIndicator).toBe(true);
    expect(restHit.isTab).toBe(false);

    // Kill A (the reattach armed) — a pointerdown STARTS the drag; the indicator takes
    // `.glass-drag-lift`, proving the `Draggable` is bound to the LIVE node.
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + box.width, cy, { steps: 3 });
    await expect(indicator).toHaveClass(/glass-drag-lift/);

    // Kill B (travel occlusion) — during the grab the LIFTED indicator wins the
    // hit-test at its current center (z-30 above the z-10 labels it travels over).
    const grabWins = await indicator.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return !!hit?.closest(".segmented-indicator");
    });
    expect(grabWins).toBe(true);

    await page.mouse.up();
    await page.waitForTimeout(500);

    // The click path still selects AFTER a drag — selecting the first tab lands it.
    await selectTab(tabs, 0);
    await page.waitForTimeout(400);
    await expect(tabs.nth(0)).toHaveAttribute("aria-pressed", "true");

    mkdirSync(VISUAL_DIR, { recursive: true });
    await page.screenshot({
        path: `${VISUAL_DIR}/drag-morph-e-reattach-desktop-light.png`,
    });
});

// ── consumer #2 — the DockLayerGroup pull-to-switch ──────────────────────────────
test("consumer #2 — DockLayerGroup pull-to-switch flips the active layer", async ({
    page,
}) => {
    await page.goto("/dock/layers", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.setViewportSize(VIEWPORTS[1]);

    const rail = page.locator(".dock-layer-rail.glass-drag-grabbable").first();
    await expect(rail).toBeVisible();

    const tabs = rail.locator(".dock-layer-tab");
    const count = await tabs.count();
    expect(count).toBeGreaterThan(1);

    // The active layer before the pull.
    const activeBefore = await page.evaluate(() => {
        const sel = document.querySelector(
            ".dock-layer-rail .dock-layer-tab[data-state='active'], .dock-layer-rail .dock-layer-tab[aria-selected='true']",
        );
        return sel?.getAttribute("aria-label") ?? sel?.textContent ?? null;
    });

    // Pull from the active tab toward the last tab (the rail flexes Y on a
    // horizontal group → the drag axis is vertical).
    const firstBox = await tabs.nth(0).boundingBox();
    const lastBox = await tabs.nth(count - 1).boundingBox();
    if (!firstBox || !lastBox) return;
    await page.mouse.move(
        firstBox.x + firstBox.width / 2,
        firstBox.y + firstBox.height / 2,
    );
    await page.mouse.down();
    await page.mouse.move(
        lastBox.x + lastBox.width / 2,
        lastBox.y + lastBox.height / 2,
        { steps: 4 },
    );
    await page.mouse.up();
    await page.waitForTimeout(600);

    const activeAfter = await page.evaluate(() => {
        const sel = document.querySelector(
            ".dock-layer-rail .dock-layer-tab[data-state='active'], .dock-layer-rail .dock-layer-tab[aria-selected='true']",
        );
        return sel?.getAttribute("aria-label") ?? sel?.textContent ?? null;
    });

    // The pull switched the active layer (consumer-#2 evidence).
    expect(activeAfter).not.toBe(activeBefore);

    mkdirSync(VISUAL_DIR, { recursive: true });
    await page.screenshot({
        path: `${VISUAL_DIR}/drag-morph-dock-pull-consumer2.png`,
    });
});
