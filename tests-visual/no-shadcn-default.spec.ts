// BC.W-DESHADCN — no-shadcn-default.spec.ts, the BINDING π live readback (the captured-paint
// truth a source gate cannot prove): getComputedStyle over the RESKINNED `ui/` surfaces
// resolves the GLASS / PAPER material — a translucent `--glass-bg-*` fill + a warm rim — NOT
// the shadcn-neutral token (the flat `bg-background` slab, the cold `ring-ring` halo, the
// neutral `bg-secondary`/`bg-accent` fill), in BOTH modes.
//
// THE PRINCIPLE (DESHADCN-BRAINSTORM §0): reka = BEHAVIOR, glass-ui = 100% of the MATERIAL.
// The device-free source gate (`proof:no-shadcn-default`) reds the residual shadcn-neutral
// TOKEN vocabulary in the class strings; THIS spec is its captured-paint twin — it proves the
// RESOLVED paint reads the house glass/paper material on the live :5199 surface (the cardinal
// AX lesson: a green source gate over a still-neutral live render is the headless-green trap).
//
// THE RESKIN OWNERS: the per-component re-points land in the OWNING band waves
// (`BC.W-BUTTON-GLASS-IOS` → Button outline/secondary/accent; `BC.W-CONTROL-SMOOTH` → Toggle
// outline + TagsInput active ring + Switch thumb). This spec is born to read the RESKINNED
// material — it is GREEN once the owners land. Before then it reads the HEAD shadcn-neutral
// residual and FAILS (the binding pressure that keeps the owners honest); the orchestrator runs
// it after the owners land for the captured-paint sign-off (paired with the W-DESHADCN-DELTA).
//
// ONE colour-math source: the SHARED paint-arm.mjs leaf (statsFromResolvedBg → reflect-capture-
// verify's oklabFromRgb). This spec authors NO second decompose (the canvas-unify single-source
// fence). The warm-cream glass tokens resolve to oklab() on the live surface; statsFromResolvedBg
// parses both oklab()/oklch() and the srgb/rgba forms (the exact warm-cream computed form).
//
// WebKit/Safari: the reskins are `background` / `backdrop-filter: blur()+saturate()` /
// `box-shadow` (cross-engine — NO `backdrop-filter: url()` dependency), so the material reads
// identically on Safari (apple-ios27.md §6). The cross-engine assertion is the SOURCE form (the
// no-url() fence the device-free gate reaches), carried by the two viewport projects
// (chromium-headless-new + coarse-touch); not a separate browser project.
//
// LOCAL-ONLY real-render: this spec LOADS :5199 (it reads PAINTED material over the live glass).
// On CI it grace-SKIPs (the AX.W00 Playwright-presence probe), backstopped by proof:live-verified-
// ledger over the DELTA — never re-run server-side (no real-GPU compositing on a headless runner).

import { test, expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
// The SHARED computed-style PAINT probe leaf — ONE OKLab decompose (paint-arm.mjs re-exports
// reflect-capture-verify's oklabFromRgb; parses oklab()/oklch() + srgb/rgba). No second math.
import { statsFromResolvedBg } from "../scripts/lib/paint-arm.mjs";

// The reskinned-material band: a translucent fill (alpha < 0.95 — NOT a flat opaque slab) with a
// warm hue (oklab-chroma > 0 — NOT a cold neutral grey). The asymmetry is load-bearing: chroma is
// a FLOOR (warm, not neutral), alpha is a CEILING (translucent/material, not an opaque page slab).
// A shadcn-neutral `bg-background`/`bg-secondary` slab resolves opaque (alpha = 1) AND ~neutral
// (chroma ≈ 0) — it fails BOTH; the warm-cream glass / warm-paper material passes BOTH.
const MATERIAL_ALPHA_CEIL = 0.95;
const MATERIAL_CHROMA_FLOOR = 0; // strictly warm: chroma > 0 (NOT a flat cold neutral)

const MODES = ["light", "dark"] as const;

async function setMode(page: Page, mode: "light" | "dark"): Promise<void> {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(120);
}

/**
 * Read the FIRST visible match's resolved background + border + box-shadow. Returns null when no
 * element matches (the caller treats null as a degenerate read, not a pass — a missing surface
 * fails the spec rather than vacuously passing).
 */
async function readSurface(
    loc: Locator,
): Promise<{ bg: string; borderColor: string; boxShadow: string } | null> {
    const el = loc.first();
    if ((await el.count()) === 0) return null;
    return el.evaluate((node) => {
        const cs = getComputedStyle(node as Element);
        return {
            bg: cs.backgroundColor,
            borderColor: cs.borderColor || cs.borderTopColor,
            boxShadow: cs.boxShadow,
        };
    });
}

/**
 * Assert a surface reads the GLASS/PAPER material, not the shadcn-neutral slab: its resolved bg
 * decomposes to a warm (chroma > floor) translucent (alpha < ceil) material, AND it carries a
 * warm rim (a non-`none` box-shadow / a chromatic border — the de-shadcn rim answer, NOT the
 * cold `ring-ring` halo). The `bg` MUST be parseable by the ONE shared decompose (a degenerate
 * `transparent`/unreadable read fails — the surface must paint a real material).
 */
function assertMaterial(
    label: string,
    surf: { bg: string; borderColor: string; boxShadow: string } | null,
): void {
    expect(surf, `${label}: no element matched (the reskinned surface must render on this route)`).not.toBeNull();
    const s = surf!;
    const stats = statsFromResolvedBg(s.bg);
    expect(
        stats,
        `${label}: could not decompose surface bg "${s.bg}" to OKLab (the reskinned material read is degenerate — a real translucent fill must resolve)`,
    ).not.toBeNull();
    // translucent material, not an opaque page-token slab
    expect(
        stats!.alpha,
        `${label}: surface bg "${s.bg}" is OPAQUE (alpha ${stats!.alpha.toFixed(3)} ≥ ${MATERIAL_ALPHA_CEIL}) — it reads as a flat shadcn-neutral slab, not the translucent glass/paper material`,
    ).toBeLessThan(MATERIAL_ALPHA_CEIL);
    // warm, not a cold neutral grey (the warm-cream / warm-paper identity floor)
    expect(
        stats!.chroma,
        `${label}: surface bg "${s.bg}" is a COLD NEUTRAL (chroma ${stats!.chroma.toFixed(4)} ≤ ${MATERIAL_CHROMA_FLOOR}) — it reads as the shadcn neutral grey, not the warm-cream/warm-paper material`,
    ).toBeGreaterThan(MATERIAL_CHROMA_FLOOR);
    // a warm rim (the de-shadcn rim answer) — a non-`none` box-shadow OR a chromatic border.
    // NOT the cold `ring-ring` halo (that resolves as a box-shadow too, but the chroma floor +
    // the warm-rim source form distinguish — the catch-light rim is warm).
    const hasRim = s.boxShadow !== "none" || (statsFromResolvedBg(s.borderColor)?.alpha ?? 0) > 0;
    expect(
        hasRim,
        `${label}: surface carries NO warm rim (box-shadow="${s.boxShadow}", border="${s.borderColor}") — the de-shadcn material's edge is the warm rim / catch-light, not a bare flat edge`,
    ).toBe(true);
}

test.describe("no-shadcn-default (the reskinned ui/ surfaces read the glass/paper material, NOT shadcn-neutral)", () => {
    for (const mode of MODES) {
        // ── Button outline/secondary/accent → the glass register (BC.W-BUTTON-GLASS-IOS) ──────
        test(`${mode}: Button outline/secondary/accent resolve a translucent warm glass fill — /display/buttons`, async ({
            page,
        }) => {
            await page.goto("/display/buttons", { waitUntil: "networkidle" });
            await setMode(page, mode);
            // The reskinned-tail variants. Once BC.W-BUTTON-GLASS-IOS lands, each resolves a
            // `--glass-bg-*` translucent fill + the warm rim — NOT a flat bg-background/bg-secondary
            // opaque slab. Selected by the rendered variant button text in the buttons story.
            for (const variant of ["outline", "secondary", "accent"]) {
                const btn = page.getByRole("button", { name: variant, exact: true });
                const surf = await readSurface(btn);
                assertMaterial(`Button variant="${variant}" (${mode})`, surf);
            }
        });

        // ── Toggle outline → the glass-well register (BC.W-CONTROL-SMOOTH) ────────────────────
        test(`${mode}: Toggle outline resolves the glass-well material — /forms/toggle`, async ({
            page,
        }) => {
            await page.goto("/forms/toggle", { waitUntil: "networkidle" });
            await setMode(page, mode);
            // The toggle outline well. Once BC.W-CONTROL-SMOOTH lands it resolves the
            // .control-surface / --glass-bg-quiet well + warm rim, NOT the border-input hairline.
            const toggle = page.locator('[data-slot="toggle"], button[type="button"][aria-pressed], [role="button"]').first();
            const surf = await readSurface(toggle);
            assertMaterial(`Toggle outline (${mode})`, surf);
        });

        // ── TagsInput active item → the warm .focus-ring, NOT the cold ring-ring ──────────────
        test(`${mode}: TagsInput active item resolves the warm focus ring (NOT cold ring-ring) — /data/tags-input`, async ({
            page,
        }) => {
            await page.goto("/data/tags-input", { waitUntil: "networkidle" });
            await setMode(page, mode);
            // Focus a tag item so its active ring paints; once BC.W-CONTROL-SMOOTH lands, the
            // active ring resolves the warm --focus-ring-shadow box-shadow, NOT the cold ring-ring
            // outline + ring-offset. The item chip itself resolves the glass-well register.
            const item = page.locator('[role="listitem"], [data-tags-input-item], li').first();
            const surf = await readSurface(item);
            // The chip material (warm, translucent) — the active-ring colour is asserted via the
            // warm rim (the box-shadow must be the warm --focus-ring-shadow, non-none).
            assertMaterial(`TagsInput item (${mode})`, surf);
        });

        // ── Switch thumb → the warm material, NOT the page-background neutral ─────────────────
        test(`${mode}: Switch thumb resolves the warm material (NOT the page-background neutral) — /forms/checks`, async ({
            page,
        }) => {
            await page.goto("/forms/checks", { waitUntil: "networkidle" });
            await setMode(page, mode);
            // The thumb is the inner block of the switch. Once BC.W-CONTROL-SMOOTH lands it
            // resolves the --card warm-cream / --control-surface material (a thumb reads the
            // material, not the page token), oklab-chroma > 0.
            const thumb = page
                .locator('[role="switch"] > *, button[role="switch"] span, [data-slot="switch-thumb"]')
                .first();
            const surf = await readSurface(thumb);
            expect(
                surf,
                `Switch thumb (${mode}): no thumb element matched (the switch must render its thumb)`,
            ).not.toBeNull();
            const stats = statsFromResolvedBg(surf!.bg);
            expect(
                stats,
                `Switch thumb (${mode}): could not decompose thumb bg "${surf!.bg}" (degenerate read)`,
            ).not.toBeNull();
            // The thumb is a small control affordance — assert the WARM material (chroma > 0) +
            // translucency-or-material (alpha < ceil). The page-background neutral resolves
            // ~chroma 0 (a cold/near-neutral page token) — the reskin must read warm.
            expect(
                stats!.chroma,
                `Switch thumb (${mode}): bg "${surf!.bg}" is a COLD NEUTRAL (chroma ${stats!.chroma.toFixed(4)} ≤ ${MATERIAL_CHROMA_FLOOR}) — it reads the page-background token, not the warm --card/--control-surface material`,
            ).toBeGreaterThan(MATERIAL_CHROMA_FLOOR);
        });
    }
});
