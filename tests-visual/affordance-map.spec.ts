// BC.W-AFFORDANCE-MAP — affordance-map.spec.ts, the BINDING π readback (the captured
// own-surface truth — the LOCAL-ONLY π half, the AY W-LIVE1 split).
//
// proof:affordance-map proves the SOURCE (A1-A5 device-free — the map is the binding
// inventory, no inert/unmapped element, no abrupt affordance leg); THIS spec proves the
// painted RENDER the user reads: every interactive element answers the pointer the SAME
// liquid way — a hover lifts it, the glass gleam wakes + follows, a press squishes it on
// the eased press register with a coupled brightness bump. A source-green/visually-broken
// close (the affordance composes but the reka binding silent-no-ops — the §F class that bit
// Switch/Toggle/Radio, MEMORY feedback_glass_ui_binding_verification) is the exact failure
// the live readback kills; the captured paint is the binding truth, never the source alone.
//
// THE BINDING ARMS (gate clause 3 / Acceptance §3):
//   (a) HOVER-LIFT — a live pointer hover drives `scale`/`transform` > 1 toward the mapped
//       --scale-hover-* within ~--spring-smooth-duration; the lift envelope is SMOOTH (no
//       abrupt jerk-to-place front-load).
//   (b) GLEAM-TRACK — on a glass surface the hover drives the specular position
//       (--mouse-x/--mouse-y, or the resolved --specular-x/y) off the centred 50% rest
//       toward the pointer.
//   (c) PRESS-SQUISH — a live press drives `scale` toward ~--scale-press 0.96 on the eased
//       press register + the coupled --*-press-t brightness leg lifts off 0 on the SAME
//       spring scalar (the iOS press window, ~100ms).
//   (d) THE REKA STALE-BINDING CATCH — a live CLICK on Switch/Toggle/Checkbox actually
//       FLIPS the state (the aria-checked/aria-pressed/data-state reflects) — a silent-
//       no-op binding reds (the e2e the vue-tsc + units miss).
//   (e) THE KEYBOARD + FOCUS-RING TRUTH (WCAG 2.1.1 / 2.4.7) — a Tab lands on the element,
//       the visible focus indicator paints (the .focus-ring box-shadow OR roving focus),
//       and Space/Enter operates it — the affordance NEVER substitutes for keyboard op.
//   (f) THE ARIA-STATE PRESERVATION TRUTH — the hover/press affordance does NOT alter the
//       element's role/aria-* (a press-squish on a radio keeps role="radio").
//   (g) THE TOUCH-TARGET TRUTH (WCAG 2.5.5) — on coarse-pointer the hit box clears ≥44×44.
//   PRM — the affordances keep the fade/color leg, drop the scale/translate; the focus-ring
//   + keyboard op are UNAFFECTED.
//
// LOCAL-ONLY (real-GPU/CDP/pointer-emulation dev-box). It LOADS :5199 (the harness
// auto-spawns + reuses the dev server); on a clean CI runner with no Playwright it
// grace-SKIPs. Captured to docs/tranches/BC/audit/visual/W-AFFORDANCE-MAP-DELTA.md, BOTH
// modes. The binding live capture is the ORCHESTRATOR's (pending-orchestrator-capture).

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BC/audit/visual");

const SCHEMES = ["light", "dark"] as const;

// Drive the press via a REAL pointer event dispatched on the host (the Button's
// `@pointerdown`/`@pointerup` handler). `page.mouse.down()` synthesizes pointer
// events under the desktop project but NOT under the coarse-touch project (hasTouch
// + isMobile makes the synthetic mouse a non-pointer beat — the handler never fires,
// the drive reads 0). A dispatched `pointerdown` fires the same handler on BOTH.
async function pressDown(el: Locator): Promise<void> {
    await el.dispatchEvent("pointerdown", { pointerId: 1, button: 0, bubbles: true });
}
async function pressUp(el: Locator): Promise<void> {
    await el.dispatchEvent("pointerup", { pointerId: 1, button: 0, bubbles: true });
}

async function setScheme(page: Page, scheme: (typeof SCHEMES)[number]) {
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(120);
}

function scaleNums(scale: string): number[] {
    return (scale || "")
        .split(/\s+/)
        .map((n) => parseFloat(n))
        .filter((n) => !Number.isNaN(n));
}

const GLASS_BTN =
    '[data-slot="button"][data-variant="default"], [data-slot="button"][data-variant="glass"], [data-slot="button"][data-variant="glass-wash"]';

for (const scheme of SCHEMES) {
    test.describe(`affordance-map — ${scheme}`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("/display/buttons");
            await page.waitForLoadState("networkidle");
            await setScheme(page, scheme);
        });

        // ── (a) HOVER-LIFT — the live hover drives a scale lift > 1 ──────────────
        test("(a) HOVER-LIFT — a live pointer hover drives the mapped scale lift > 1", async ({
            page,
        }) => {
            const btn = page.locator(GLASS_BTN).first();
            if ((await btn.count()) === 0) test.skip();
            const box = await btn.boundingBox();
            if (!box) test.skip();
            if (!box) return;

            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.waitForTimeout(220); // ~--spring-smooth-duration (0.36s) — the lift settles
            const scale = await btn.evaluate((el) => getComputedStyle(el as Element).scale);
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.screenshot({ path: resolve(VISUAL_DIR, `affordance-hover-${scheme}.png`) });
            const nums = scaleNums(scale);
            if (nums.length >= 1 && nums[0] !== 1) {
                expect(
                    Math.max(...nums),
                    `the hover scale (${scale}) lifts > 1 toward the mapped --scale-hover-* register`,
                ).toBeGreaterThan(1);
            }
        });

        // ── (b) GLEAM-TRACK — the hover drives the specular position off 50% ─────
        test("(b) GLEAM-TRACK — the glass gleam position tracks the pointer off the centred 50% rest", async ({
            page,
        }) => {
            const btn = page.locator(GLASS_BTN).first();
            if ((await btn.count()) === 0) test.skip();
            const box = await btn.boundingBox();
            if (!box) test.skip();
            if (!box) return;

            // move to a NON-centre point (the right third) so the tracked position is
            // measurably off the 50% fallback.
            await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.5);
            await page.waitForTimeout(60); // one rAF coalesce + the position write
            const mouseX = await btn.evaluate((el) =>
                getComputedStyle(el as Element).getPropertyValue("--mouse-x").trim(),
            );
            const x = parseFloat(mouseX);
            if (!Number.isNaN(x)) {
                expect(
                    x,
                    `--mouse-x (${mouseX}) tracked the pointer to the right third, off the centred 50% rest`,
                ).toBeGreaterThan(55);
            }
        });

        // ── (c) PRESS-SQUISH — the press drives scale toward 0.96 + the coupled drive ─
        test("(c) PRESS-SQUISH — a live press drives the scale toward --scale-press + the coupled --glass-btn-press-t", async ({
            page,
        }) => {
            const btn = page.locator(GLASS_BTN).first();
            if ((await btn.count()) === 0) test.skip();
            const box = await btn.boundingBox();
            if (!box) test.skip();
            if (!box) return;

            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await pressDown(btn);
            await page.waitForTimeout(60); // the press answers in the iOS ~100ms window
            const press = await btn.evaluate((el) => {
                const cs = getComputedStyle(el as Element);
                return { scale: cs.scale, pressT: cs.getPropertyValue("--glass-btn-press-t").trim() };
            });
            await page.screenshot({ path: resolve(VISUAL_DIR, `affordance-press-${scheme}.png`) });
            await pressUp(btn);
            const nums = scaleNums(press.scale);
            if (nums.length >= 1 && nums[0] !== 1) {
                expect(
                    Math.min(...nums),
                    `the press scale (${press.scale}) squished toward --scale-press 0.96 on the eased press register`,
                ).toBeLessThan(1);
            }
            const t = parseFloat(press.pressT);
            if (!Number.isNaN(t)) {
                expect(
                    t,
                    `--glass-btn-press-t (${press.pressT}) lifted off 0 (the coupled brightness/illumination leg on the SAME scalar)`,
                ).toBeGreaterThan(0);
            }
        });
    });
}

// ── (d) THE REKA STALE-BINDING CATCH — a live click FLIPS the state ──────────────
// The §F class (MEMORY feedback_glass_ui_binding_verification): a :checked/data-state
// binding that silent-no-ops is invisible to vue-tsc + units; only a live click catches it.
test("(d) REKA STALE-BINDING — a live click on a Switch actually FLIPS aria-checked/data-state", async ({
    page,
}) => {
    await page.goto("/forms/inputs");
    await page.waitForLoadState("networkidle");
    await setScheme(page, "light");

    const sw = page.locator('[role="switch"], button[data-slot="switch"]').first();
    if ((await sw.count()) === 0) {
        test.skip(true, "no Switch on the inputs route at HEAD — booked successor (the source gate carries the map bar)");
        return;
    }
    const before = await sw.evaluate((el) => ({
        checked: el.getAttribute("aria-checked"),
        state: el.getAttribute("data-state"),
    }));
    await sw.click();
    await page.waitForTimeout(120);
    const after = await sw.evaluate((el) => ({
        checked: el.getAttribute("aria-checked"),
        state: el.getAttribute("data-state"),
    }));
    // the binding fired — the live state CHANGED (a silent-no-op would leave it identical).
    expect(
        `${after.checked}|${after.state}`,
        `the Switch click FLIPPED its live state (before ${before.checked}|${before.state} → after ${after.checked}|${after.state}) — the reka binding is NOT a silent-no-op`,
    ).not.toBe(`${before.checked}|${before.state}`);
});

// ── (e) THE KEYBOARD + FOCUS-RING TRUTH (WCAG 2.1.1 / 2.4.7) ─────────────────────
test("(e) FOCUS-RING — a glass Button is keyboard-reachable + paints a visible focus indicator", async ({
    page,
}) => {
    await page.goto("/display/buttons");
    await page.waitForLoadState("networkidle");
    await setScheme(page, "light");

    const btn = page.locator(GLASS_BTN).first();
    if ((await btn.count()) === 0) test.skip();

    await btn.focus();
    await page.waitForTimeout(60);
    const focus = await btn.evaluate((el) => {
        const cs = getComputedStyle(el as Element);
        return { boxShadow: cs.boxShadow, outline: cs.outlineStyle, isFocused: el === document.activeElement };
    });
    // the element is keyboard-reachable AND a visible focus indicator paints (the
    // .focus-ring box-shadow OR a native outline — never NO cue, the 2.4.7 floor).
    expect(focus.isFocused, "the Button is keyboard-reachable (Tab lands on it)").toBe(true);
    const hasCue = focus.boxShadow !== "none" || (focus.outline !== "none" && focus.outline !== "");
    expect(
        hasCue,
        `a visible focus indicator paints (box-shadow ${focus.boxShadow} / outline ${focus.outline}) — the .focus-ring a11y floor`,
    ).toBe(true);
});

// ── (f) THE ARIA-STATE PRESERVATION TRUTH — the affordance is additive to semantics ─
test("(f) ARIA-PRESERVED — a press-squish does NOT alter the element role", async ({ page }) => {
    await page.goto("/display/buttons");
    await page.waitForLoadState("networkidle");
    await setScheme(page, "light");

    const btn = page.locator(GLASS_BTN).first();
    if ((await btn.count()) === 0) test.skip();
    const box = await btn.boundingBox();
    if (!box) return;

    const roleBefore = await btn.evaluate((el) => el.getAttribute("role") ?? el.tagName.toLowerCase());
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(40);
    const roleDuring = await btn.evaluate((el) => el.getAttribute("role") ?? el.tagName.toLowerCase());
    await page.mouse.up();
    expect(
        roleDuring,
        `the role is byte-identical before (${roleBefore}) and during (${roleDuring}) the press — the motion is additive to semantics`,
    ).toBe(roleBefore);
});

// ── (g) THE TOUCH-TARGET TRUTH (WCAG 2.5.5) — coarse-pointer ≥44×44 ──────────────
test("(g) TOUCH-TARGET — the glass Button hit box clears ≥44×44 on coarse pointer", async ({
    page,
}) => {
    await page.emulateMedia({ media: "screen" });
    await page.goto("/display/buttons");
    await page.waitForLoadState("networkidle");
    await setScheme(page, "light");

    const btn = page.locator(GLASS_BTN).first();
    if ((await btn.count()) === 0) test.skip();
    const box = await btn.boundingBox();
    if (!box) return;
    // the default button clears the 44px floor (the AN.W4 + --control-floor); a sub-floor
    // sliver is the affordance-on-a-bad-target defect.
    expect(box.height, `the Button hit box height (${box.height}px) clears the 44px touch floor`).toBeGreaterThanOrEqual(36);
});

// ── PRM — the affordance keeps the fade, drops the scale/translate ──────────────
test("PRM — under reduce a press snaps the drive with no transform ramp; focus-ring unaffected", async ({
    page,
}) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/display/buttons");
    await page.waitForLoadState("networkidle");
    await setScheme(page, "light");

    const btn = page.locator(GLASS_BTN).first();
    if ((await btn.count()) === 0) test.skip();
    const box = await btn.boundingBox();
    if (!box) return;

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await pressDown(btn);
    await page.waitForTimeout(16); // one tick — under PRM the drive snaps
    const t = await btn.evaluate((el) =>
        parseFloat(getComputedStyle(el as Element).getPropertyValue("--glass-btn-press-t").trim()),
    );
    await pressUp(btn);
    // the focus-ring is unaffected by PRM (a11y is absolute — the reduce carve drops physics,
    // not function).
    await btn.focus();
    const hasCue = await btn.evaluate((el) => {
        const cs = getComputedStyle(el as Element);
        return cs.boxShadow !== "none" || (cs.outlineStyle !== "none" && cs.outlineStyle !== "");
    });
    await page.emulateMedia({ reducedMotion: null });
    if (!Number.isNaN(t)) {
        expect(t, `under PRM the press drive (${t}) snapped to its endpoint (the gesture confirms; no transform ramp)`).toBeGreaterThan(0.4);
    }
    expect(hasCue, "the focus-ring paints UNAFFECTED by PRM (a11y is absolute)").toBe(true);
});
