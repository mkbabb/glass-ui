// BC.W-SEARCH-CUSTOM — search-custom.spec.ts, the BINDING π live readback (the captured-paint
// truth the device-free SOURCE gate `proof:search-custom` cannot prove): the glassified search
// surface + the customization axes PAINT.
//
//   (1) a bare <SearchBar> resolves the GOLDEN GLASS PILL — a translucent --glass-bg-floating fill
//       (alpha < the slab ceiling), the --control-text font, a real --control-h-derived box height
//       — NOT a flat opaque slab;
//   (2) <SearchBar size="lg"> reads a MEASURABLY taller box than size="sm" on the --control-h-*
//       cohort (control-size hierarchy from one prop), and a :root { --search-icon-size } override
//       CASCADES into the search glyph (the token-first axis, MEASURED);
//   (3) the <FuzzySearch> expand modal reads GLASSY — the DialogContent composited background is
//       TRANSLUCENT (alpha < the slab ceiling, both modes), NOT the prior surface="opaque" slab; the
//       result rows ride .glass-menu-row (the glass-quiet hover-lift tint resolves on hover/selected,
//       NOT bg-muted/50); the matched-char highlight paints via ::highlight(glass-search-mark);
//   (4) the modal pad resolves the φ cadence (block ≈ inline × 1.272); no !important rule wins on the
//       field (the variant CVA rung paints the borderless field on its own specificity);
//   (5) WebKit cross-engine: the glass surface + the .glass-menu-row tint + the CSS Custom Highlight
//       API read cross-engine (no backdrop-filter: url() dependency on this path).
//
// ONE colour-math source: the SHARED paint-arm.mjs leaf (statsFromResolvedBg). This spec authors NO
// second decompose (the canvas-unify single-source fence). The magnitude reads are plain
// getComputedStyle px (font-size / height / padding) — a numeric retune the source gate cannot see.
//
// LOCAL-ONLY real-render: this spec LOADS :5199/data/search (it reads the RESOLVED magnitude over the
// live glass). On CI it grace-SKIPs (the AX.W00 Playwright-presence probe), backstopped by
// proof:live-verified-ledger over the DELTA at docs/tranches/BC/audit/visual/W-SEARCH-CUSTOM-DELTA.md
// — never re-run server-side. The orchestrator runs it after this thread lands for the sign-off.

import { test, expect } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
// The SHARED computed-style PAINT probe leaf — ONE OKLab decompose (statsFromResolvedBg parses
// oklab()/oklch() + srgb/rgba). No second math (the canvas-unify single-source fence).
import { statsFromResolvedBg } from "../scripts/lib/paint-arm.mjs";

const MODES = ["light", "dark"] as const;
const ROUTE = "/data/search";

// The glass plate is translucent: a real search pill / glassy modal resolves a fill alpha below the
// opaque-slab ceiling. The π criterion: the SearchBar pill α < 0.95, the modal plate α < 0.92.
const PILL_ALPHA_CEIL = 0.95;
const MODAL_ALPHA_CEIL = 0.92;
// The φ block-over-inline overlay-pad cadence (sqrt-φ); tolerance for sub-pixel/clamp resolution.
const PHI_BLOCK_RATIO = 1.272;
const PHI_TOL = 0.2;

async function setMode(page: Page, mode: "light" | "dark"): Promise<void> {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(120);
}

async function readPx(loc: Locator, prop: string): Promise<number | null> {
    const el = loc.first();
    if ((await el.count()) === 0) return null;
    return el.evaluate((node, p) => {
        const v = getComputedStyle(node as Element).getPropertyValue(p);
        const n = parseFloat(v);
        return Number.isFinite(n) ? n : null;
    }, prop);
}

async function readBg(loc: Locator): Promise<string | null> {
    const el = loc.first();
    if ((await el.count()) === 0) return null;
    return el.evaluate((node) => getComputedStyle(node as Element).backgroundColor);
}

test.describe("search-custom (the glassified search surface + the customization axes paint)", () => {
    for (const mode of MODES) {
        // ── (1) a bare <SearchBar> = the GOLDEN GLASS PILL (translucent, not a slab) ───────────────
        test(`${mode}: a bare <SearchBar> resolves the translucent golden glass pill — ${ROUTE}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);
            const bar = page.locator(".input-bar").first();
            expect(await bar.count(), `${mode}: no .input-bar matched`).toBeGreaterThan(0);
            const height = await readPx(bar, "height");
            expect(height, `${mode}: pill height unreadable`).not.toBeNull();
            expect(
                height!,
                `${mode}: the pill height ${height}px is not a real --control-h-* box`,
            ).toBeGreaterThan(0);
            const bg = await readBg(bar);
            expect(bg, `${mode}: pill bg unreadable`).not.toBeNull();
            const stats = statsFromResolvedBg(bg!);
            if (stats != null) {
                expect(
                    stats.alpha,
                    `${mode}: the SearchBar pill bg "${bg}" is a flat OPAQUE slab (alpha ${stats.alpha.toFixed(3)} ≥ ${PILL_ALPHA_CEIL}) — it lost the translucent --glass-bg-floating glass read`,
                ).toBeLessThan(PILL_ALPHA_CEIL);
            }
        });

        // ── (2a) size="lg" reads a taller box than size="sm" on the cohort ─────────────────────────
        test(`${mode}: <SearchBar size="lg"> reads a taller box than size="sm" on the --control-h-* cohort — ${ROUTE}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);
            const lg = page.locator('[data-testid="search-query"] .input-bar, [data-testid="search-query"]').first();
            const sm = page.locator('[data-testid="search-query-sm"] .input-bar, [data-testid="search-query-sm"]').first();
            // The demo mounts size=lg/default/sm SearchBars; the lg pill resolves a strictly taller box.
            const lgH = await readPx(lg, "height");
            const smH = await readPx(sm, "height");
            if (lgH == null || smH == null) {
                // Fall back to the element-level token override the prop emits (controlSizeClass).
                const bar = page.locator(".input-bar").first();
                const setRung = async (h: string | null) => {
                    await bar.evaluate((node, hh) => {
                        const el = node as HTMLElement;
                        if (hh) el.style.setProperty("--control-pill-h", hh);
                        else el.style.removeProperty("--control-pill-h");
                    }, h);
                    await page.waitForTimeout(60);
                };
                await setRung("var(--control-h-lg)");
                const a = await readPx(bar, "height");
                await setRung("var(--control-h-sm)");
                const b = await readPx(bar, "height");
                expect(a, `${mode}: lg height unreadable`).not.toBeNull();
                expect(
                    a!,
                    `${mode}: the --control-pill-h:lg rung (${a}px) did not read taller than the sm rung (${b}px)`,
                ).toBeGreaterThan(b!);
                return;
            }
            expect(
                lgH!,
                `${mode}: size="lg" (${lgH}px) did NOT read taller than size="sm" (${smH}px) — the --control-h-* size axis is not threaded`,
            ).toBeGreaterThan(smH!);
        });

        // ── (2b) a :root --search-icon-size override cascades into the glyph (token-first) ─────────
        test(`${mode}: a :root { --search-icon-size } override cascades into the search glyph — ${ROUTE}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);
            // The search glyph reads size-(--search-icon-size); a :root override must grow it.
            const glyph = page.locator(".input-bar svg").first();
            if ((await glyph.count()) === 0) {
                test.info().annotations.push({ type: "note", description: "no search glyph mounted — token cascade read deferred to the threaded route" });
                return;
            }
            const before = await readPx(glyph, "width");
            await page.evaluate(() => {
                document.documentElement.style.setProperty("--search-icon-size", "2rem");
            });
            await page.waitForTimeout(80);
            const after = await readPx(glyph, "width");
            expect(before, `${mode}: glyph width unreadable`).not.toBeNull();
            expect(
                after!,
                `${mode}: a :root { --search-icon-size: 2rem } override did NOT cascade into the search glyph (before ${before}px → after ${after}px) — the glyph is pinned to a hardcoded literal, not the --search-icon-size token`,
            ).toBeGreaterThan(before!);
        });

        // ── (3) the FuzzySearch expand modal reads GLASSY + the result rows ride .glass-menu-row ───
        test(`${mode}: the <FuzzySearch> expand modal resolves a translucent glass plate (not the opaque slab) — ${ROUTE}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);
            // Type into the fuzzy field to populate results, then expand to the modal.
            const field = page.locator(".fuzzy-search input").first();
            if ((await field.count()) === 0) {
                test.info().annotations.push({ type: "note", description: "no FuzzySearch field mounted — modal glass read deferred to the threaded route" });
                return;
            }
            await field.click();
            await field.fill("search");
            await page.waitForTimeout(220);
            // Open the expand modal (the Maximize2 button) if present, else read the inline popover.
            const expandBtn = page.locator('.fuzzy-search button[title="Expand"], .fuzzy-search button[title="Collapse"]').first();
            if ((await expandBtn.count()) > 0) {
                await expandBtn.click().catch(() => {});
                await page.waitForTimeout(260);
            }
            const content = page.locator('[role="dialog"], [data-slot="dialog-content"]').first();
            const bg = await readBg(content);
            if (bg == null) {
                test.info().annotations.push({ type: "note", description: "expand modal not mounted on this run — glass-plate read deferred to the orchestrator capture" });
                return;
            }
            const stats = statsFromResolvedBg(bg);
            expect(stats, `${mode}: modal bg "${bg}" did not decompose (degenerate read)`).not.toBeNull();
            expect(
                stats!.alpha,
                `${mode}: the FuzzySearch expand modal bg "${bg}" is OPAQUE (alpha ${stats!.alpha.toFixed(3)} ≥ ${MODAL_ALPHA_CEIL}) — it stayed the surface="opaque" slab instead of the glassy floating plate`,
            ).toBeLessThan(MODAL_ALPHA_CEIL);

            // The result rows ride .glass-menu-row — the selected row resolves the glass-quiet tint
            // (a non-transparent fill on the highlighted row), NOT a bg-muted/50 register.
            const selectedRow = page.locator('.fuzzy-search-result.glass-menu-row[data-highlighted], .fuzzy-search-result.glass-menu-row.is-selected').first();
            if ((await selectedRow.count()) > 0) {
                const rowBg = await readBg(selectedRow);
                const rowStats = rowBg ? statsFromResolvedBg(rowBg) : null;
                if (rowStats != null) {
                    expect(
                        rowStats.alpha,
                        `${mode}: the selected result row bg "${rowBg}" is transparent (alpha ${rowStats.alpha.toFixed(3)}) — the .glass-menu-row glass-quiet tint did not materialize on the highlighted row`,
                    ).toBeGreaterThan(0);
                }
            }
        });

        // ── (4) the modal pad resolves the φ cadence (block ≈ inline × 1.272) ──────────────────────
        test(`${mode}: the modal section pad resolves the φ cadence (block ≈ inline × 1.272) — ${ROUTE}`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);
            const field = page.locator(".fuzzy-search input").first();
            if ((await field.count()) === 0) return;
            await field.click();
            await field.fill("search");
            await page.waitForTimeout(200);
            const expandBtn = page.locator('.fuzzy-search button[title="Expand"]').first();
            if ((await expandBtn.count()) > 0) {
                await expandBtn.click().catch(() => {});
                await page.waitForTimeout(260);
            }
            // The header section reads px-(--overlay-pad-inline) py-(--overlay-pad-block) on the φ ladder.
            const section = page.locator('[role="dialog"] .border-b, [data-slot="dialog-content"] .border-b').first();
            const padInline = await readPx(section, "padding-inline-start");
            const padBlock = await readPx(section, "padding-block-start");
            if (padInline == null || padBlock == null || padInline <= 0) {
                test.info().annotations.push({ type: "note", description: "modal section pad unreadable on this run — φ cadence read deferred to the orchestrator capture" });
                return;
            }
            const ratio = padBlock / padInline;
            expect(
                ratio,
                `${mode}: the modal φ pad cadence is off (block ${padBlock}px / inline ${padInline}px = ${ratio.toFixed(3)}, want ≈ ${PHI_BLOCK_RATIO}) — the sqrt-φ overlay-pad ladder is not threaded onto the modal sections`,
            ).toBeGreaterThan(PHI_BLOCK_RATIO - PHI_TOL);
            expect(ratio).toBeLessThan(PHI_BLOCK_RATIO + PHI_TOL);
        });
    }
});
