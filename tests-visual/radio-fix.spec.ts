// BC.W-RADIO-FIX — radio-fix.spec.ts, the live π readback for the §F "ALL radio
// buttons don't work + no proper toggle states" headline bug. Drives the REAL
// /forms/checks story (which binds the published `<RadioGroup v-model>` +
// `<RadioGroupItem :value>`) — no demo fork.
//
// THE BINDING TRUTH (the chronic-killer — MEMORY feedback_glass_ui_binding_verification:
// "stale reka prop/emit bindings silently no-op; vue-tsc+units miss them, only e2e
// catches"). The spec drives a REAL mouse click + a REAL keyboard ArrowDown and asserts
// `aria-checked` flips true on the target / false on the prior, and EXACTLY ONE item per
// group is checked. The `aria-checked` flip IS the a11y-state truth (a screen reader
// announces "selected" off aria-checked, not the dot paint) — so the binding π doubles as
// the WCAG-state verification. Born-RED on HEAD's bare-click no-op (the touch-hit-area
// pseudo swallowed the pointer); GREEN at the swallow-fix (pointer-events:none).
//
// THE SELECTED-STATE TRUTH (the "proper toggle states" half, MEASURED): the checked ring's
// resolved background is the glass-`--primary` fill (`--control-checked-bg`, translucent —
// α between the unchecked outline and a solid plate) AND the centre dot resolves
// `--primary-foreground` (the contrast pair, both modes); the unchecked ring resolves a
// visible `--control-ring` outline. The fill goes outline → filled glass disc — a real
// material step, not the HEAD dot-present/absent delta.
//
// ONE colour-math source: the SHARED paint-arm.mjs leaf (statsFromResolvedBg →
// reflect-capture-verify's oklabFromRgb). This spec authors NO second decompose (the
// canvas-unify single-source fence — rule 3).
//
// WebKit/Safari: the radio is a plain reka button + CSS fill (no `backdrop-filter:url()`,
// no WebGL) → the toggle + the fill paint identically cross-engine. The two viewport
// projects (chromium-headless-new + coarse-touch) carry the readback.

import { test, expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
// The SHARED computed-style PAINT probe leaf — ONE OKLab decompose. No second colour math (rule 3).
import { statsFromResolvedBg } from "../scripts/lib/paint-arm.mjs";

const ROUTE = "/forms/checks";

async function setMode(page: Page, mode: "light" | "dark"): Promise<void> {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(120);
}

/** The first RadioGroup on the page (the `plan` group — solo/team/org, all enabled). */
function firstGroup(page: Page): Locator {
    return page.locator('[role="radiogroup"]').first();
}

/** Read each radio item's live `aria-checked` (the a11y-state truth) in DOM order. */
async function readAriaChecked(group: Locator): Promise<boolean[]> {
    return group.locator('[role="radio"]').evaluateAll((nodes) =>
        nodes.map((n) => (n as Element).getAttribute("aria-checked") === "true"),
    );
}

/** Resolve a radio item's checked-fill background + centre-dot ink via the shared decompose. */
async function readItemPaint(item: Locator): Promise<{ fillBg: string; dotColor: string } | null> {
    if ((await item.count()) === 0) return null;
    return item.first().evaluate((node) => {
        const cs = getComputedStyle(node as Element);
        // The dot is the indicator's <Circle> (an svg with fill-current inheriting the host
        // checked ink). Read its resolved fill/color.
        const dot = (node as Element).querySelector("svg, [data-slot='radio-group-indicator'] *");
        const dotCs = dot ? getComputedStyle(dot) : null;
        return {
            fillBg: cs.backgroundColor,
            dotColor: dotCs ? dotCs.fill || dotCs.color : cs.color,
        };
    });
}

test.describe("BC.W-RADIO-FIX — the radio toggles on every input path + the glass selected-state", () => {
    for (const mode of ["light", "dark"] as const) {
        // ── The binding truth: a REAL mouse click flips aria-checked (the chronic-killer) ──
        test(`${mode}: a real mouse click toggles the radio (aria-checked flips, exactly one checked) — ${ROUTE}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);

            const group = firstGroup(page);
            await expect(group, `${mode}: no radiogroup rendered on ${ROUTE}`).toHaveCount(1);
            const items = group.locator('[role="radio"]');
            const count = await items.count();
            expect(count, `${mode}: the group must render ≥2 radio items`).toBeGreaterThanOrEqual(2);

            // Click the SECOND item by a real pointer (the bare-click path HEAD's swallow no-op'd).
            await items.nth(1).click();
            await page.waitForTimeout(80);
            let states = await readAriaChecked(group);
            expect(
                states[1],
                `${mode}: a real click on item[1] did NOT flip aria-checked → true (the §F "radios don't work" no-op — the touch-hit-area pseudo swallowed the pointer before reka)`,
            ).toBe(true);
            expect(
                states.filter(Boolean).length,
                `${mode}: more than ONE item checked after the click (the toggle must release the prior — exactly one filled dot per group)`,
            ).toBe(1);

            // Click the FIRST item — the prior (item[1]) must RELEASE.
            await items.nth(0).click();
            await page.waitForTimeout(80);
            states = await readAriaChecked(group);
            expect(states[0], `${mode}: click on item[0] did not select it`).toBe(true);
            expect(states[1], `${mode}: the prior item[1] did not RELEASE on re-select`).toBe(false);
            expect(states.filter(Boolean).length, `${mode}: not exactly one checked after re-select`).toBe(1);
        });

        // ── The keyboard truth: ArrowDown moves roving focus AND selects (a binding input path) ──
        test(`${mode}: ArrowDown moves+selects the adjacent item (the keyboard input path) — ${ROUTE}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);

            const group = firstGroup(page);
            const items = group.locator('[role="radio"]');

            // Select the first item, then ArrowDown — reka's roving radio-group pattern moves
            // focus to the next enabled item AND checks it (the §F "don't work" must be false on
            // keyboard too). Start from a DETERMINISTIC selection (item[0] checked) so the
            // ArrowDown→item[1] move is unconfounded by the default-checked item[1].
            await items.nth(0).click();
            await page.waitForTimeout(60);
            await items.nth(0).focus();

            // reka's select-on-arrow is a focus side-effect gated on the key being HELD:
            // RadioGroupItem's `handleFocus` re-checks `isArrowKeyPressed` inside a setTimeout(0)
            // (node_modules/reka-ui/src/RadioGroup/RadioGroupItem.vue:64-82). A real user holds the
            // key for tens of ms — the keyup lands well after that macrotask. Playwright's
            // `keyboard.press` fires keydown+keyup back-to-back, so the keyup flips the flag false
            // BEFORE the setTimeout runs → the select-on-focus never fires (a sim artefact, not a
            // wiring defect). Simulate the real key-HOLD (down → settle → up) so the keyboard path
            // is exercised honestly.
            await page.keyboard.down("ArrowDown");
            await page.waitForTimeout(80);
            await page.keyboard.up("ArrowDown");
            await page.waitForTimeout(60);

            // The roving focus MOVED (the WAI-ARIA radio-group pattern — tabindex 0 follows the
            // active item to the adjacent enabled one).
            const focusedIdx = await group.evaluate((g) => {
                const radios = [...g.querySelectorAll('[role="radio"]')];
                return radios.indexOf(document.activeElement as Element);
            });
            expect(
                focusedIdx,
                `${mode}: ArrowDown did not move roving focus to the adjacent item (the WAI-ARIA radio-group roving pattern is broken)`,
            ).toBe(1);

            const states = await readAriaChecked(group);
            expect(
                states[1],
                `${mode}: ArrowDown did not move+select the adjacent item (reka roving radio-group pattern — the keyboard input path is not optional)`,
            ).toBe(true);
            expect(states[0], `${mode}: the prior item[0] did not RELEASE on ArrowDown-select`).toBe(false);
            expect(states.filter(Boolean).length, `${mode}: not exactly one checked after ArrowDown`).toBe(1);
        });

        // ── The selected-state truth: the checked ring is a glass fill, the dot a contrast ink ──
        test(`${mode}: the checked ring resolves the glass --primary fill + the dot the contrast ink — ${ROUTE}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);

            const group = firstGroup(page);
            const items = group.locator('[role="radio"]');
            await items.nth(0).click();
            await page.waitForTimeout(120);

            // The CHECKED item: its background is the glass-`--primary` fill (the
            // `--control-checked-bg` recipe = color-mix(in srgb, var(--primary) 88%,
            // var(--glass-bg-floating))), the dot a DIFFERENT (contrast) ink.
            const checked = await readItemPaint(items.nth(0));
            expect(checked, `${mode}: could not read the checked item paint`).not.toBeNull();
            const fillStats = statsFromResolvedBg(checked!.fillBg);
            expect(
                fillStats,
                `${mode}: the checked ring bg "${checked!.fillBg}" is degenerate (transparent / unparseable) — it must paint the glass --control-checked-bg fill`,
            ).not.toBeNull();
            // The fill carries the GLASS MIX — NOT a raw opaque `--primary` slab. The gate-locked
            // recipe is 88% opaque `--primary` + 12% `--glass-bg-floating`, so the resolved alpha
            // is bounded BELOW 1.0 by the floating tier's own translucency (the glass-floating
            // contribution); a raw `background: var(--primary)` slab resolves α exactly 1.0. The
            // 16px atom reads opaque-ish over a flat substrate BY DESIGN (the wave's ARM B
            // rationale — a glass-TINTED fill, not a glass PLATE), so the anti-disease guard here
            // is "the fill is the glass-MIX recipe, never the raw opaque ink", not a plate-grade
            // translucency the atom was deliberately not built for. The legible material step
            // (outline → filled contrast disc) is the lDelta assertion below.
            expect(
                fillStats!.alpha,
                `${mode}: the checked ring alpha ${fillStats!.alpha.toFixed(3)} is a RAW opaque --primary slab (≥1.0) — it must read the glass-MIX --control-checked-bg recipe (the floating-tier contribution keeps it below a solid stamp)`,
            ).toBeLessThan(1.0);
            expect(
                fillStats!.alpha,
                `${mode}: the checked ring alpha ${fillStats!.alpha.toFixed(3)} is ~0 (no fill painted) — the selected state must read a filled glass disc`,
            ).toBeGreaterThan(0.1);

            // The dot ink (--primary-foreground) must DIFFER from the fill (the contrast pair —
            // a same-hue dot vanishes on the disc).
            const dotStats = statsFromResolvedBg(checked!.dotColor);
            expect(dotStats, `${mode}: could not decompose the dot ink "${checked!.dotColor}"`).not.toBeNull();
            const lDelta = Math.abs((dotStats!.oklabL ?? 0) - (fillStats!.oklabL ?? 0));
            expect(
                lDelta,
                `${mode}: the checked dot ink (L ${dotStats!.oklabL?.toFixed(3)}) reads the SAME lightness as the fill (L ${fillStats!.oklabL?.toFixed(3)}) — the dot vanishes; assert the --primary / --primary-foreground contrast pair`,
            ).toBeGreaterThan(0.2);
        });

        // ── The unchecked ring resolves a VISIBLE --control-ring outline (not the dark hairline) ──
        test(`${mode}: the unchecked ring resolves a visible --control-ring outline — ${ROUTE}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);

            // Read the resolved --control-ring token + an unchecked item's border-color. The
            // unchecked ring must be a DEFINED circle (a non-transparent warm outline), not the
            // near-invisible ≤4% rim.
            const ring = await firstGroup(page)
                .locator('[role="radio"]')
                .first()
                .evaluate((node) => {
                    const cs = getComputedStyle(node as Element);
                    const token = cs.getPropertyValue("--control-ring").trim();
                    return { borderColor: cs.borderTopColor || cs.borderColor, token };
                });
            expect(
                ring.token,
                `${mode}: --control-ring is not declared (the named selection-atom outline register is missing)`,
            ).not.toBe("");
            // The border resolves a non-transparent outline.
            const borderStats = statsFromResolvedBg(ring.borderColor);
            expect(borderStats, `${mode}: the unchecked border "${ring.borderColor}" is unparseable`).not.toBeNull();
            expect(
                borderStats!.alpha,
                `${mode}: the unchecked ring border alpha ${borderStats!.alpha.toFixed(3)} is ~0 — the rest circle is invisible; --control-ring must read a defined outline`,
            ).toBeGreaterThan(0.05);
        });
    }

    // ── The touch-target truth (WCAG 2.5.5): the hit box ≥44px while the visual ring stays 16px ──
    // (Runs on the coarse-pointer project; the visual ring + the hit box decouple by construction.)
    test(`the radio hit box clears 44px (coarse) while the visual ring stays 16px — ${ROUTE}`, async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        const item = firstGroup(page).locator('[role="radio"]').first();
        const box = await item.evaluate((node) => {
            const cs = getComputedStyle(node as Element);
            const before = getComputedStyle(node as Element, "::before");
            return {
                visualW: parseFloat(cs.width),
                hitMinW: parseFloat(before.minWidth) || 0,
                hitMinH: parseFloat(before.minHeight) || 0,
                pointerEvents: before.pointerEvents,
            };
        });
        // The visual ring is the 16px atom.
        expect(box.visualW, `the visual radio ring grew past 16px (it must stay the small atom)`).toBeLessThanOrEqual(20);
        // On the coarse project the hit pseudo floors at 44px (geometry), and is pointer-transparent
        // (the swallow-fix — the pointer falls through to reka's host listener).
        if (box.hitMinW > 0) {
            expect(box.hitMinW, `the coarse hit box min-width is below the WCAG 2.5.5 44px floor`).toBeGreaterThanOrEqual(44);
            expect(box.hitMinH, `the coarse hit box min-height is below the WCAG 2.5.5 44px floor`).toBeGreaterThanOrEqual(44);
            expect(
                box.pointerEvents,
                `the coarse hit pseudo is pointer-events:${box.pointerEvents} — it must be 'none' (the swallow-fix: the pointer falls through to reka's host listener)`,
            ).toBe("none");
        }
    });
});
