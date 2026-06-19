// BC.W-AX-DOCK-CTA-SEAT — the CTA-receive landing-SEAT π arm (the binding PAINT
// readback for the seat, LOCAL real-render, both modes). This wave's OWN gestalt-first
// paint (NO forward deferral): the seat arm here + the dock-CTA-seat roster row + the
// proof:ba-gestalt DOCK verdict on a fresh :5199 capture close the CTA-seat paint AT
// this wave's close.
//
// THE SEAT, NOT THE MORPH. The CTA fly+reshape frame-series (R1's morph half) is
// already locked by proof:dockmorph-cta R1-R5; this spec carries the NET-NEW seat
// surface:
//   - the dim [data-cta-pending] ghost SHOWS (the control awaits its arrival) and is
//     SIZED off --dock-control-size (the resting reserve — frame 0);
//   - the seat REVEALS with an opacity FLIP (NOT a box morph): on clearPending() the
//     dock-control content fades back to opacity 1;
//   - THE BINDING NO-BOX-JUMP WITNESS: the dock ROOT's getBoundingClientRect().width is
//     CONSTANT from setPending (pending ghost) through clearPending (revealed) — the
//     CTA lands into an already-sized hole, the box never grows;
//   - PRM → instant content swap (the seat snaps to content, the transition is off).
//
// The route arms the seat onMounted (setPending), so the target dock control carries
// [data-cta-pending] at first paint; the "Add to dock" CTA flies in and the default
// onReceived hand-off clearPending()s, revealing the seat.

import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

const TARGET_SEL = ".cta-receive-target"; // the receive TARGET dock control (the seat)
const CTA_SEL = ".cta-receive-vehicle"; // the external CTA (the morph vehicle)
const DOCK_SEL = ".glass-dock"; // the dock root whose box-width must stay constant

async function gotoCtaReceive(page: import("@playwright/test").Page) {
    // The CTA-receive demo route, RE-SOURCED from the manifest source-of-truth (never
    // a hard-coded route — resolveScene reds if the story is renamed/removed).
    const scene = resolveScene("dock", "cta-receive");
    await page.goto(scene.path);
    await page.waitForSelector(TARGET_SEL, { timeout: 15_000 });
}

test.describe("dockmorph-cta — the CTA-receive landing SEAT (π lane, LOCAL)", () => {
    test("the seat reserves its box (no jump) and reveals with an opacity FLIP", async ({
        page,
    }) => {
        await gotoCtaReceive(page);

        // (1) PENDING — the seat is armed onMounted: the target carries data-cta-pending,
        // shows the dim ghost (opacity ≈ --cta-seat-ghost-opacity 0.35), and the dock
        // root has shrink-wrapped to the SEATED width (the reserve is live from frame 0).
        const pending = await page.evaluate(
            ({ targetSel, dockSel }) => {
                const target = document.querySelector(targetSel) as HTMLElement | null;
                const dock = document.querySelector(dockSel) as HTMLElement | null;
                if (!target || !dock) return null;
                const cs = getComputedStyle(target);
                return {
                    hasPendingAttr: target.hasAttribute("data-cta-pending"),
                    ghostOpacity: parseFloat(cs.opacity),
                    // The static reserve must be present (min-*-size off the control box).
                    minInline: cs.minInlineSize,
                    minBlock: cs.minBlockSize,
                    dockWidth: dock.getBoundingClientRect().width,
                };
            },
            { targetSel: TARGET_SEL, dockSel: DOCK_SEL },
        );
        expect(pending, "the seat target / dock root were not found").not.toBeNull();
        expect(
            pending!.hasPendingAttr,
            "the target dock control does NOT carry [data-cta-pending] while pending — setPending() did not arm the seat",
        ).toBe(true);
        expect(
            pending!.ghostOpacity,
            `the pending ghost opacity (${pending!.ghostOpacity}) is not dimmed (< 1) — the [data-cta-pending] placeholder is not showing the dim ghost`,
        ).toBeLessThan(1);
        // The static resting-geometry reserve — a non-zero min-*-size (the no-box-jump).
        const reserveInline = parseFloat(pending!.minInline) || 0;
        const reserveBlock = parseFloat(pending!.minBlock) || 0;
        expect(
            reserveInline > 0 || reserveBlock > 0,
            `the seat declares no static min-*-size reserve (min-inline-size="${pending!.minInline}", min-block-size="${pending!.minBlock}") — the resting geometry is not un-gated; the box will jump when the CTA lands`,
        ).toBe(true);

        // (2) REVEAL — fly the CTA in. The default onReceived hand-off clearPending()s,
        // so the target drops [data-cta-pending] and the content fades back to opacity 1
        // on the opacity FLIP. Click the CTA, then settle.
        await page.locator(CTA_SEL).click();
        // Wait for the seat to reveal (the attribute clears on hand-off).
        await page.waitForFunction(
            (sel) => {
                const el = document.querySelector(sel) as HTMLElement | null;
                return el != null && !el.hasAttribute("data-cta-pending");
            },
            TARGET_SEL,
            { timeout: 5_000 },
        );
        // Let the opacity FLIP settle.
        await page.waitForTimeout(500);

        const revealed = await page.evaluate(
            ({ targetSel, dockSel }) => {
                const target = document.querySelector(targetSel) as HTMLElement | null;
                const dock = document.querySelector(dockSel) as HTMLElement | null;
                if (!target || !dock) return null;
                const cs = getComputedStyle(target);
                return {
                    stillPending: target.hasAttribute("data-cta-pending"),
                    revealedOpacity: parseFloat(cs.opacity),
                    dockWidth: dock.getBoundingClientRect().width,
                };
            },
            { targetSel: TARGET_SEL, dockSel: DOCK_SEL },
        );
        expect(revealed, "the seat target / dock root vanished after reveal").not.toBeNull();
        expect(
            revealed!.stillPending,
            "the seat is STILL [data-cta-pending] after the CTA landed — clearPending() did not fire on the hand-off",
        ).toBe(false);
        expect(
            revealed!.revealedOpacity,
            `the revealed seat opacity (${revealed!.revealedOpacity}) did not return to ~1 — the FLIP reveal did not complete`,
        ).toBeGreaterThan(0.9);

        // ── THE BINDING NO-BOX-JUMP WITNESS ─────────────────────────────────────────
        // The dock ROOT's box width is CONSTANT from the pending (ghost) state through
        // the revealed state — the CTA landed into an already-sized hole, the box never
        // grew. A jump here is the exact defect the reserve un-gate kills.
        const widthDelta = Math.abs(revealed!.dockWidth - pending!.dockWidth);
        expect(
            widthDelta,
            `the dock root box width JUMPED by ${widthDelta.toFixed(2)}px from setPending (${pending!.dockWidth.toFixed(2)}px) to clearPending (${revealed!.dockWidth.toFixed(2)}px) — the resting geometry was NOT reserved; the box grew when the CTA landed`,
        ).toBeLessThanOrEqual(1);
    });

    test("PRM — the seat reveal is an INSTANT opacity swap (transition off)", async ({
        page,
    }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await gotoCtaReceive(page);

        // Under reduce, the seat's transition is `none` — the ghost→content reveal is an
        // instant opacity swap (the vestibular floor; the reserve is unchanged, static).
        const prm = await page.evaluate((targetSel) => {
            const target = document.querySelector(targetSel) as HTMLElement | null;
            if (!target) return null;
            const cs = getComputedStyle(target);
            return {
                transition: cs.transition,
                transitionDuration: cs.transitionDuration,
                hasPendingAttr: target.hasAttribute("data-cta-pending"),
            };
        }, TARGET_SEL);
        expect(prm, "the seat target was not found under PRM").not.toBeNull();
        // The transition is off (none / 0s) — no animated reveal frames.
        const durs = (prm!.transitionDuration || "")
            .split(",")
            .map((d) => parseFloat(d) || 0);
        const anyAnimated = durs.some((d) => d > 0);
        expect(
            anyAnimated,
            `under prefers-reduced-motion the seat reveal still has a non-zero transition-duration ("${prm!.transitionDuration}") — the FLIP must be an INSTANT swap (the vestibular floor)`,
        ).toBe(false);
    });
});
