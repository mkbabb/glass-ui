// BI.W-SHEET-RADIUS — sheet-radius.spec.ts, the π rounded-corner readback (the
// BINDING close; §π/DELTA).
//
// The defect (UF-A3 / ss-23, "the drawer is not rounded"): `sheetVariants` set
// `border-l/-r` per side but NO `border-radius` → the Sheet renders fully SQUARE at
// the screen edge, and the shipped `.glass-floating.sheet-animate` `corner-shape`
// @supports coupling is DEAD on a 0-radius box (a superellipse needs a base radius —
// the vacuous-gate GEO-2).
//
// THE DEVICE-FREE SOURCE GATE (proof-sheet-radius.mjs) proves the STRUCTURE — each
// side arm rounds its inner edge, the flush edge stays square, the squircle host
// resolves a non-zero radius, the Law-1 relay is published. THIS SPEC PROVES THE
// RENDER the source arm cannot:
//   S-π1 — per side, the INNER corners resolve ≈ --radius-dialog (16px) and the
//          viewport-flush corners resolve ≈ 0 (square where it meets the screen edge).
//   S-π2 — the squircle `corner-shape` reads (a `superellipse(…)` value within the
//          radius box) WHERE the engine supports corner-shape (Chrome 139+ / the real
//          WebKit run); on a non-supporting engine the round `border-radius` contract
//          stands (the @supports-gated PE — never a false-fail).
//   S-π3 — the Law-1 relay resolves on the content root: --radius-ctx = --radius-dialog
//          (16px) so a nested Configurator section derives its corner concentric.
//
// BOTH modes. It loads :5199 → LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI
// grace-skips, backstopped by proof:live-verified-ledger over the DELTA.

import { test, expect, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BI/audit/visual/", import.meta.url),
);

// --radius-dialog → --radius-2xl → 1rem = 16px. TOL carries sub-px bounding + the
// glass edge hairline; a genuine square (0px) vs a genuine round (16px) is a wide gap.
const RADIUS_EXPECT = 16;
const RADIUS_TOL = 3;
const SQUARE_TOL = 1.5;

type Side = "top" | "right" | "bottom" | "left";
const SIDES: readonly Side[] = ["top", "right", "bottom", "left"] as const;

// Per side, which corners are INNER (round to --radius-dialog) and which are FLUSH
// against the viewport edge (stay square).
const SIDE_CORNERS: Record<Side, { inner: readonly string[]; flush: readonly string[] }> = {
    right: { inner: ["tl", "bl"], flush: ["tr", "br"] },
    left: { inner: ["tr", "br"], flush: ["tl", "bl"] },
    top: { inner: ["bl", "br"], flush: ["tl", "tr"] },
    bottom: { inner: ["tl", "tr"], flush: ["bl", "br"] },
};
const CORNER_PROP: Record<string, string> = {
    tl: "borderTopLeftRadius",
    tr: "borderTopRightRadius",
    bl: "borderBottomLeftRadius",
    br: "borderBottomRightRadius",
};

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(120);
}

// Read the open sheet's four corner radii (px), its resolved corner-shape (or "" when
// the engine has no corner-shape property), and the published --radius-ctx (px).
async function readSheet(page: Page, side: Side) {
    return page.evaluate((s: string) => {
        const round = (v: number) => Math.round(v * 100) / 100;
        const el = document.querySelector<HTMLElement>(
            `[data-slot="sheet-content"][data-side="${s}"]`,
        );
        if (!el) return null;
        const cs = getComputedStyle(el);
        const px = (v: string) => parseFloat(v) || 0;
        const cornerShape = cs.getPropertyValue("corner-shape").trim();
        const ctxRaw = cs.getPropertyValue("--radius-ctx").trim();
        // Resolve --radius-ctx to px via a probe element (it may be a var()/rem chain).
        let ctxPx = NaN;
        if (ctxRaw) {
            const probe = document.createElement("div");
            probe.style.width = ctxRaw;
            probe.style.position = "absolute";
            probe.style.visibility = "hidden";
            el.appendChild(probe);
            ctxPx = probe.getBoundingClientRect().width;
            probe.remove();
        }
        return {
            tl: round(px(cs.borderTopLeftRadius)),
            tr: round(px(cs.borderTopRightRadius)),
            bl: round(px(cs.borderBottomLeftRadius)),
            br: round(px(cs.borderBottomRightRadius)),
            cornerShape,
            ctxRaw,
            ctxPx: round(ctxPx),
        };
    }, side);
}

const paired: Record<string, unknown> = {};

test.describe("BI.W-SHEET-RADIUS — the Sheet reads rounded; the squircle rule live (π)", () => {
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";

        test(`per-side inner corners round to --radius-dialog, flush edge square; squircle reads; relay resolves (${mode})`, async ({
            page,
            browserName,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/containers/sheet", { waitUntil: "domcontentloaded" });
            await page.waitForSelector("text=Open right", { timeout: 8000 });
            await page.waitForTimeout(200);
            await setDark(page, dark);

            for (const side of SIDES) {
                const label = `Open ${side}`;
                await page.getByRole("button", { name: label }).first().click();
                await page.waitForSelector(
                    `[data-slot="sheet-content"][data-side="${side}"]`,
                    { timeout: 8000 },
                );
                await page.waitForTimeout(200);

                const r = await readSheet(page, side);
                paired[`${side}-${mode}`] = r;
                expect(r, `${mode} ${side}: sheet content renders`).not.toBeNull();

                const cfg = SIDE_CORNERS[side];

                // S-π1 — inner corners ≈ --radius-dialog.
                for (const c of cfg.inner) {
                    const v = (r as Record<string, number>)[c];
                    expect(
                        Math.abs(v - RADIUS_EXPECT),
                        `${mode} ${side}: INNER corner ${c} (${CORNER_PROP[c]}) resolved ${v}px — must be ≈ ${RADIUS_EXPECT}px (the Sheet reads ROUNDED, UF-A3)`,
                    ).toBeLessThanOrEqual(RADIUS_TOL);
                }
                // S-π1 — flush corners square.
                for (const c of cfg.flush) {
                    const v = (r as Record<string, number>)[c];
                    expect(
                        v,
                        `${mode} ${side}: FLUSH corner ${c} (${CORNER_PROP[c]}) resolved ${v}px — must be ≈ 0 (square where it meets the screen edge)`,
                    ).toBeLessThanOrEqual(SQUARE_TOL);
                }

                // S-π2 — the squircle corner-shape reads WHERE supported (PE over the
                // round contract; a non-supporting engine returns "" → the round
                // border-radius stands, no false-fail).
                if (r!.cornerShape && r!.cornerShape !== "round") {
                    expect(
                        r!.cornerShape,
                        `${mode} ${side}: corner-shape resolved '${r!.cornerShape}' — where the engine (${browserName}) supports corner-shape the squircle @supports rule applies (superellipse within the radius box)`,
                    ).toContain("superellipse");
                }

                // S-π3 — the Law-1 relay resolves: --radius-ctx = --radius-dialog.
                expect(
                    Math.abs(r!.ctxPx - RADIUS_EXPECT),
                    `${mode} ${side}: --radius-ctx resolved ${r!.ctxPx}px (from '${r!.ctxRaw}') — must be ≈ ${RADIUS_EXPECT}px so a nested Configurator section derives its corner concentric (Law-1 relay, site #3)`,
                ).toBeLessThanOrEqual(RADIUS_TOL);

                await page.keyboard.press("Escape");
                await page.waitForSelector(
                    `[data-slot="sheet-content"][data-side="${side}"]`,
                    { state: "detached", timeout: 8000 },
                );
                await page.waitForTimeout(120);
            }
        });
    }

    test.afterAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        writeFileSync(
            `${VISUAL_DIR}/W-SHEET-RADIUS-readback.json`,
            `${JSON.stringify(paired, null, 2)}\n`,
        );
    });
});
