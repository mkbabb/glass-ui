// BC.W-AX-METRIC-HOVER — metric-hover.spec.ts, the BINDING π live readback (the
// captured-paint truth a SOURCE gate cannot prove): the metric-badge hover VALUE-LIFT
// paints, both modes.
//
//   (1) a hovered `.metric-badge` NUDGES UP ~2px (a measured translateY ≈ -2px) and
//       scales 1.04 (a measured transform matrix scale ≈ 1.04) — the tactile rise the
//       source gate can only see in the CSS slot, not in the rendered transform;
//   (2) the hovered badge casts the cartoon-sticker offset shadow (the box-shadow
//       carries a NEGATIVE x-offset — the `--shadow-cartoon-sm` left-stamp, NOT the
//       HEAD centred `0 2px 10px` soft glow);
//   (3) a `:root { --metric-badge-hover-translate: 0 }` override keeps the badge FLAT
//       on hover (translateY ≈ 0) — the token-first floor (a consumer zeroes the lift);
//   (4) the cartoon shadow RE-TINTS under `.dark` — `--shadow-cartoon-sm` rides
//       `--shadow-color: var(--foreground)`, so the resolved shadow color differs
//       light vs dark (the token-adaptive arm, no `.dark` re-declaration owed).
//
// THE PRINCIPLE: the metric pill reads as a tactile, liftable affordance — it lifts
// when hovered (a small, lively nudge up, the cartoon shadow casting under it), not a
// static plate. The device-free source gate (`proof:metric-hover`) reds the missing
// translate slot / the un-lifted 1.02 scale / the soft-shadow default (MH1-MH4); THIS
// spec is its captured-paint twin — it proves the RESOLVED transform + shadow on the
// live :5199 render (the cardinal AX lesson: a green source gate over a still-flat live
// render is the headless-green trap). The binding PAINT verdict rides the
// proof:ba-gestalt data/custom verdict.
//
// LOCAL-ONLY real-render: this spec LOADS :5199 (it reads the RESOLVED transform/shadow
// over the live glass). On CI it grace-SKIPs (Playwright/server absent), backstopped by
// proof:live-verified-ledger over the DELTA — never re-run server-side.

import { test, expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";

const MODES = ["light", "dark"] as const;
const ROUTE = "/display/metric-badge";

async function setMode(page: Page, mode: "light" | "dark"): Promise<void> {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(120);
}

/** The first rendered `.metric-badge` on the route. */
function firstBadge(page: Page): Locator {
    return page.locator(".metric-badge").first();
}

/** Read the rendered translateY (px) off the live computed transform.
 *
 * The badge lift rides the INDIVIDUAL `translate` property (`.metric-badge:hover {
 * translate: 0 var(--metric-badge-hover-translate, -2px) }`), NOT the `transform`
 * shorthand — so getComputedStyle().transform stays `none` even when the rise is
 * painting. We read the individual `translate` (a `"<x> <y>"` px pair, the y is the
 * rise) and fall back to the `transform` matrix's m42 if a consumer expresses the
 * lift through `transform` instead. */
async function translateY(loc: Locator): Promise<number | null> {
    if ((await loc.count()) === 0) return null;
    return loc.evaluate((node) => {
        const cs = getComputedStyle(node as Element);
        // The individual `translate` property — `"none"` / `"<x>"` / `"<x> <y>"`.
        const tr = cs.translate;
        if (tr && tr !== "none") {
            const parts = tr.trim().split(/\s+/);
            // One value => x only (y is 0); two+ => the second is the y rise.
            const y = parts.length >= 2 ? parseFloat(parts[1]) : 0;
            if (Number.isFinite(y)) return y;
        }
        // Fallback: the `transform` shorthand matrix.
        const t = cs.transform;
        if (!t || t === "none") return 0; // no transform => no rise
        const m = new DOMMatrixReadOnly(t);
        return m.m42; // the translateY component
    });
}

/** Read the rendered uniform scale off the live computed transform.
 *
 * The badge scale rides the INDIVIDUAL `scale` property (`.metric-badge:hover {
 * scale: var(--metric-badge-hover-scale, 1.04) }`), so we read the individual
 * `scale` (a single value or an `"<x> <y>"` pair — the x is the uniform scale) and
 * fall back to the `transform` matrix's `a` if expressed through `transform`. */
async function scaleOf(loc: Locator): Promise<number | null> {
    if ((await loc.count()) === 0) return null;
    return loc.evaluate((node) => {
        const cs = getComputedStyle(node as Element);
        // The individual `scale` property — `"none"` / `"<x>"` / `"<x> <y>"`.
        const sc = cs.scale;
        if (sc && sc !== "none") {
            const x = parseFloat(sc.trim().split(/\s+/)[0]);
            if (Number.isFinite(x)) return x;
        }
        // Fallback: the `transform` shorthand matrix.
        const t = cs.transform;
        if (!t || t === "none") return 1;
        const m = new DOMMatrixReadOnly(t);
        return m.a; // the scaleX component (uniform scale => a ≈ d)
    });
}

/** Read the live computed box-shadow string. */
async function boxShadow(loc: Locator): Promise<string | null> {
    if ((await loc.count()) === 0) return null;
    return loc.evaluate((node) => getComputedStyle(node as Element).boxShadow);
}

test.describe("metric-badge hover value-lift (the tactile rise + cartoon shadow paints)", () => {
    for (const mode of MODES) {
        // ── (1)+(2) the hover lift: nudge up ~2px, scale 1.04, cartoon-sticker shadow ──
        test(`${mode}: a hovered .metric-badge nudges up ~-2px, scales 1.04, casts the cartoon shadow`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);
            const badge = firstBadge(page);
            expect(await badge.count(), `${mode}: no .metric-badge rendered on ${ROUTE}`).toBeGreaterThan(0);

            // Resting: no rise, scale ≈ 1, the soft resting shadow (centred).
            const restY = await translateY(badge);
            expect(restY, `${mode}: resting badge has a translateY (${restY}px) — it should sit flat`).not.toBeNull();
            expect(Math.abs(restY!), `${mode}: resting badge already lifted ${restY}px`).toBeLessThan(0.5);

            await badge.hover();
            await page.waitForTimeout(220); // ride the --duration-fast transition out

            const ty = await translateY(badge);
            const sc = await scaleOf(badge);
            const shadow = await boxShadow(badge);

            // (1) the value-lift rise — the badge nudges UP ~2px (negative translateY).
            expect(ty, `${mode}: hovered badge translateY unreadable`).not.toBeNull();
            expect(
                ty!,
                `${mode}: hovered badge did NOT nudge UP (translateY ${ty}px, expected ≈ -2px) — the value-lift rise is missing`,
            ).toBeLessThan(-1);
            expect(ty!, `${mode}: hovered badge rise ${ty}px is too large (expected ≈ -2px)`).toBeGreaterThan(-4);

            // (1) the scale lift — ~1.04 (a hair more than the HEAD 1.02).
            expect(sc, `${mode}: hovered badge scale unreadable`).not.toBeNull();
            expect(
                sc!,
                `${mode}: hovered badge scale ${sc} did not lift above 1.02 (expected ≈ 1.04)`,
            ).toBeGreaterThan(1.025);

            // (2) the cartoon-sticker offset shadow — a NEGATIVE x-offset stamp (the
            // `--shadow-cartoon-sm` left-stamp), NOT the HEAD centred `0 2px 10px` glow.
            expect(shadow, `${mode}: hovered badge box-shadow unreadable`).not.toBeNull();
            const hasNegativeXOffset = /(?:^|,)\s*[^,]*?\s-\d/.test(shadow!) || /-\d+(?:\.\d+)?px/.test(shadow!);
            expect(
                hasNegativeXOffset,
                `${mode}: hovered badge shadow "${shadow}" carries no negative-x offset stamp — it lost the --shadow-cartoon-sm cartoon shadow`,
            ).toBe(true);
        });

        // ── (3) the token-first floor: --metric-badge-hover-translate: 0 keeps it flat ──
        test(`${mode}: a :root { --metric-badge-hover-translate: 0 } override keeps the badge flat on hover`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);
            await page.evaluate(() => {
                document.documentElement.style.setProperty("--metric-badge-hover-translate", "0px");
            });
            const badge = firstBadge(page);
            expect(await badge.count(), `${mode}: no .metric-badge rendered`).toBeGreaterThan(0);

            await badge.hover();
            await page.waitForTimeout(220);
            const ty = await translateY(badge);
            expect(ty, `${mode}: badge translateY unreadable after the override`).not.toBeNull();
            expect(
                Math.abs(ty!),
                `${mode}: a :root { --metric-badge-hover-translate: 0 } override did NOT zero the rise (translateY ${ty}px) — the lift is not token-first`,
            ).toBeLessThan(0.5);
            // scale still lifts (the override zeroes ONLY the rise, not the whole lift).
            const sc = await scaleOf(badge);
            expect(sc!, `${mode}: zeroing the rise should leave the scale lift intact`).toBeGreaterThan(1.025);
        });
    }

    // ── (4) the cartoon shadow re-tints under .dark (token-adaptive, both modes read) ──
    test("the cartoon hover shadow re-tints between light and dark (--shadow-color adaptive)", async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });

        await setMode(page, "light");
        const badgeL = firstBadge(page);
        await badgeL.hover();
        await page.waitForTimeout(220);
        const shadowLight = await boxShadow(badgeL);

        // Move the pointer off, flip to dark, re-hover.
        await page.mouse.move(0, 0);
        await page.waitForTimeout(120);
        await setMode(page, "dark");
        const badgeD = firstBadge(page);
        await badgeD.hover();
        await page.waitForTimeout(220);
        const shadowDark = await boxShadow(badgeD);

        expect(shadowLight, "light cartoon shadow unreadable").not.toBeNull();
        expect(shadowDark, "dark cartoon shadow unreadable").not.toBeNull();
        expect(
            shadowDark,
            `the cartoon hover shadow did NOT re-tint dark vs light (both "${shadowLight}") — --shadow-color: var(--foreground) is not flipping`,
        ).not.toBe(shadowLight);
    });
});
