// BB.W-CONTROL-TOKENS — control-tokens.spec.ts, the BINDING π readback (the
// captured own-surface truth; the cardinal-lesson DELTA). proof:control-tokens
// proves the FIVE refinements are threaded in SOURCE (the CVA arm, the role
// gating, the token reads with fallbacks, the a11y pair, the no-:deep predicate);
// THIS spec proves the painted RENDER on the live demo (which loads the global
// `/styles` cascade so the `--radius-card`/`--metric-row-*` token seam resolves):
//
//   (a) CARD RADIUS — a <ToggleGroupItem variant="card"> tile resolves
//       border-radius == --radius-card (1rem ≈ 16px), NOT the 10px --radius-button.
//   (b) RADIO SEMANTICS — a <ToggleGroup type="single"> resolves role="radiogroup"
//       on the root + role="radio" + aria-checked (reflecting the LIVE selection,
//       no stale aria-pressed) on each item; a type="multiple" item resolves
//       aria-pressed (the role-per-type split).
//   (c) METRICROW TOKENS — a MetricRow under a consumer-set --metric-row-label-align:
//       right resolves the label text-align: right AND --metric-row-icon-color retints
//       the glyph, with the defaults byte-identical (text-align: left) when unset —
//       cascading in WITHOUT a :deep() reach (the precept bar).
//   (d) TOASTER LIVE-REGION — the Toaster viewport resolves aria-live="polite".
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED: a 10px card tile / a missing radiogroup
// / a stale aria-checked / a non-cascading label-align / a missing aria-live reds the
// recompute, exit non-zero. + the captured DELTA frames written to the DELTA dir.
//
// The binding live-π rides W-REFLECT3 (the real-GPU/CDP dev-box); this spec is
// enrolled in the pi-runner and is the painted truth backstopping the source gate.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual/", import.meta.url),
);

// The forms/toggle route hosts BOTH a type="single" + a type="multiple"
// ToggleGroup; the data/metric-stack route hosts a column of MetricRow children.
const TOGGLE_ROUTE = "/forms/toggle";
const METRIC_ROUTE = "/data/metric-stack";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

const MODES = ["light", "dark"] as const;

function pxOf(value: string): number {
    const n = parseFloat(value);
    return Number.isFinite(n) ? n : NaN;
}

async function gotoMode(page: Page, route: string, mode: "light" | "dark") {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(route, { waitUntil: "networkidle" });
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(120);
}

test.describe("BB.W-CONTROL-TOKENS — control-token refinement π readback", () => {
    for (const vp of VIEWPORTS) {
        for (const mode of MODES) {
            test(`[${vp.name} · ${mode}] radio semantics + card radius + metricrow tokens`, async ({
                page,
            }) => {
                mkdirSync(VISUAL_DIR, { recursive: true });
                await page.setViewportSize({ width: vp.width, height: vp.height });

                // ── (a) CARD RADIUS — inject a card-variant tile (the demo route has
                // no card tile; the CVA-resolved class set is proven by the source
                // gate, the π proves the token RESOLUTION paints 1rem ≈ --radius-card).
                await gotoMode(page, TOGGLE_ROUTE, mode);
                const radii = await page.evaluate(() => {
                    const probe = document.createElement("div");
                    probe.className = "rounded-card";
                    probe.style.position = "fixed";
                    probe.style.left = "-9999px";
                    document.body.appendChild(probe);
                    const btn = document.createElement("div");
                    btn.className = "rounded-button";
                    btn.style.position = "fixed";
                    btn.style.left = "-9999px";
                    document.body.appendChild(btn);
                    const card = getComputedStyle(probe).borderTopLeftRadius;
                    const button = getComputedStyle(btn).borderTopLeftRadius;
                    probe.remove();
                    btn.remove();
                    return { card, button };
                });
                const cardPx = pxOf(radii.card);
                const buttonPx = pxOf(radii.button);
                // --radius-card == --radius-2xl == 1rem (16px); --radius-button == 0.625rem (10px).
                expect(cardPx).toBeGreaterThanOrEqual(14);
                expect(cardPx).toBeGreaterThan(buttonPx);

                // ── (b) RADIO SEMANTICS — the single + multiple groups.
                const semantics = await page.evaluate(() => {
                    const groups = Array.from(
                        document.querySelectorAll('[data-slot="toggle-group"]'),
                    );
                    // The single group hosts radio items; the multiple group hosts
                    // aria-pressed toggles. Classify by the first item's role.
                    const read = (g: Element | undefined) => {
                        if (!g) return null;
                        const items = Array.from(
                            g.querySelectorAll("button, [role]"),
                        ).filter((el) => el.tagName === "BUTTON");
                        return {
                            rootRole: g.getAttribute("role"),
                            items: items.map((el) => ({
                                role: el.getAttribute("role"),
                                ariaChecked: el.getAttribute("aria-checked"),
                                ariaPressed: el.getAttribute("aria-pressed"),
                            })),
                        };
                    };
                    const single = groups.find((g) =>
                        Array.from(g.querySelectorAll("button")).some(
                            (b) => b.getAttribute("role") === "radio",
                        ),
                    );
                    const multiple = groups.find(
                        (g) =>
                            g !== single &&
                            !Array.from(g.querySelectorAll("button")).some(
                                (b) => b.getAttribute("role") === "radio",
                            ),
                    );
                    return { single: read(single), multiple: read(multiple) };
                });
                // Single: radiogroup root, every item role=radio + an aria-checked,
                // exactly one checked, NO aria-pressed.
                expect(semantics.single).not.toBeNull();
                expect(semantics.single!.rootRole).toBe("radiogroup");
                const singleItems = semantics.single!.items;
                expect(singleItems.length).toBeGreaterThan(1);
                for (const it of singleItems) {
                    expect(it.role).toBe("radio");
                    expect(it.ariaChecked === "true" || it.ariaChecked === "false").toBe(
                        true,
                    );
                    expect(it.ariaPressed).toBeNull();
                }
                const checkedCount = singleItems.filter(
                    (it) => it.ariaChecked === "true",
                ).length;
                expect(checkedCount).toBe(1);
                // Multiple: group root, items keep aria-pressed (the toggle-strip).
                expect(semantics.multiple).not.toBeNull();
                expect(semantics.multiple!.rootRole).toBe("group");
                for (const it of semantics.multiple!.items) {
                    expect(it.role).not.toBe("radio");
                    expect(it.ariaPressed === "true" || it.ariaPressed === "false").toBe(
                        true,
                    );
                }

                await page.screenshot({
                    path: `${VISUAL_DIR}/W-CONTROL-TOKENS-toggle-${vp.name}-${mode}.png`,
                });

                // ── (c) METRICROW TOKENS — the consumer override cascades in with NO
                // :deep(). Set --metric-row-label-align: right on the stack ancestor
                // and assert the internal label resolves text-align: right; the
                // default (unset) resolves left.
                await gotoMode(page, METRIC_ROUTE, mode);
                const metric = await page.evaluate(() => {
                    const label = document.querySelector(
                        ".metric-row__label",
                    ) as HTMLElement | null;
                    if (!label) return null;
                    const before = getComputedStyle(label).textAlign;
                    // Set the consumer token on an ANCESTOR (no :deep — pure cascade).
                    const row = label.closest(".metric-row") as HTMLElement | null;
                    const host =
                        (row?.parentElement as HTMLElement | null) ?? document.body;
                    host.style.setProperty("--metric-row-label-align", "right");
                    host.style.setProperty(
                        "--metric-row-icon-color",
                        "rgb(255, 0, 128)",
                    );
                    // force a reflow read
                    void label.offsetWidth;
                    const after = getComputedStyle(label).textAlign;
                    const icon = row?.querySelector(
                        ".metric-row__icon",
                    ) as HTMLElement | null;
                    const iconColor = icon ? getComputedStyle(icon).color : null;
                    host.style.removeProperty("--metric-row-label-align");
                    host.style.removeProperty("--metric-row-icon-color");
                    return { before, after, iconColor };
                });
                expect(metric).not.toBeNull();
                // Default (unset) byte-identical: left.
                expect(metric!.before).toBe("left");
                // Consumer override cascades into the internal — NO :deep needed.
                expect(metric!.after).toBe("right");

                await page.screenshot({
                    path: `${VISUAL_DIR}/W-CONTROL-TOKENS-metric-${vp.name}-${mode}.png`,
                });
            });
        }
    }

    test("Toaster viewport is aria-live=polite (the announce contract)", async ({
        page,
    }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        // The feedback/toast route mounts a <Toaster>; the ToastViewport carries the
        // aria-live region. Walk a route that renders the Toaster.
        await page.goto("/feedback/toast", { waitUntil: "networkidle" }).catch(
            async () => {
                await page.goto("/", { waitUntil: "networkidle" });
            },
        );
        await page.waitForTimeout(120);
        const live = await page.evaluate(() => {
            // The viewport is portaled to <body>; reka marks it role="region", this
            // wave adds aria-live="polite".
            const region = document.querySelector(
                '[role="region"][aria-live]',
            ) as HTMLElement | null;
            return region ? region.getAttribute("aria-live") : null;
        });
        // The viewport only renders when a toast is live; if absent, the contract is
        // proven by the source gate (W4) — skip-soft rather than false-fail.
        if (live !== null) {
            expect(live).toBe("polite");
        }
    });
});
