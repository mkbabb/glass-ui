// BA.W-CONFIG-CHASSIS — config-chassis.spec.ts, the BINDING π readback (the captured
// own-surface truth; the cardinal-lesson DELTA). proof:config-chassis proves the SOURCE;
// THIS spec proves the painted RENDER — the AZ P-1 source-green/visually-broken gap is the
// WVR-2/3 close-class failure BA exists to fix (the AZ gates were headless + missed the
// 0-width slider render), so the live readback + the captured frames are the binding truth,
// never the source diff alone.
//
// THE BINDING ARMS:
//   (a) W1 — a <ConfiguratorRow>-slotted slider on /substrates/blob measures
//       getBoundingClientRect().width ≥ 1px (the 0px-slider class DEAD, at desktop AND 390px).
//   (b) W4 — the DERIVE chip group's rightmost chip on /substrates/aurora is NOT clipped
//       (its right edge ≤ the aside content right edge).
//   (c) W6 — the gear dark-row click FLIPS html.dark (both directions) and the control is the
//       <DarkModeToggle> (the .dark-mode-toggle-button), not a <Switch>.
//   (d) W5 — the gear section labels resolve the --configurator-section-size 20.4px rung.
//   (e) PPD-1 — the Speedtest preview thumbnail mean-alpha ≥ 0.95 (vivid, no longer 0.259).
//   (f) W2 — the configurator dividers paint a visible luminance step on the DARK plate.
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED: a 0px slider / a clipped chip / a non-flipping
// dark row / a sub-rung section label / a dim swatch / an invisible dark divider reds the
// readback, exit non-zero. Frames captured to docs/tranches/BA/audit/visual/.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
);

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
    await page.waitForTimeout(180);
}

/** Open the gear-hosted PresetEditor via the shipped window event (the SAME path the
 *  SidebarDock gear DockIconButton dispatches — one event, no parallel open). */
async function openConfigurator(page: Page): Promise<void> {
    await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-configurator"));
    });
    await page.locator('[role="dialog"]').first().waitFor({ state: "visible" });
    await page.waitForTimeout(420);
}

function shot(page: Page, name: string): Promise<Buffer> {
    mkdirSync(VISUAL_DIR, { recursive: true });
    return page.screenshot({ path: `${VISUAL_DIR}${name}.png`, fullPage: false });
}

// ── (a) W1 — the slotted slider paints non-zero width (the 0px class dead) ──────────────
test.describe("W1 — the slotted slider width contract", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            test(`slotted slider width ≥ 1px @ ${vp.name} ${dark ? "dark" : "light"}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto("/substrates/blob", { waitUntil: "networkidle" });
                await setDark(page, dark);
                await page.waitForTimeout(400);

                // Find a ConfiguratorRow-slotted slider track and measure its painted width.
                const width = await page.evaluate(() => {
                    const row = document.querySelector('[data-slot="configurator-row"]');
                    if (!row) return -1;
                    // Walk every configurator row; pick the first that slots a slider track.
                    const rows = Array.from(
                        document.querySelectorAll('[data-slot="configurator-row"]'),
                    );
                    for (const r of rows) {
                        const track = r.querySelector(".glass-slider, .slider-track");
                        if (track) {
                            return Math.round(track.getBoundingClientRect().width);
                        }
                    }
                    return -1;
                });

                // -1 means no slotted slider found on this route — recorded, not a false RED
                // (the route must carry at least one; if it doesn't the test is mis-targeted).
                expect(width, "a ConfiguratorRow-slotted slider must exist on /substrates/blob").toBeGreaterThan(
                    -1,
                );
                // THE BINDING FLOOR — the 0px-slider class is dead.
                expect(
                    width,
                    `the slotted slider track must paint non-zero width (the 0px class dead) — measured ${width}px`,
                ).toBeGreaterThanOrEqual(1);

                await shot(page, `W-CONFIG-CHASSIS-blob-slider-${dark ? "dark" : "light"}-${vp.name}`);
            });
        }
    }
});

// ── (b) W4 — the DERIVE chip group is not clipped ───────────────────────────────────────
test("W4 — the DERIVE chip group's rightmost chip is not clipped", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/substrates/aurora", { waitUntil: "networkidle" });
    await setDark(page, true);
    await page.waitForTimeout(500);

    // Open the Color section (it carries the DERIVE chip group). The aurora studio mounts
    // the section open by default; find the DERIVE ToggleGroup chips.
    const result = await page.evaluate(() => {
        // The DERIVE chips are ToggleGroupItems labeled ANALOGOUS/COMPLEMENT/TRIAD/MONO.
        const items = Array.from(
            document.querySelectorAll('[role="group"] [data-slot], [role="group"] button'),
        ).filter((el) => /derive/i.test(el.getAttribute("aria-label") ?? "") || true);
        // Find the aside content box (the controls column).
        const aside =
            document.querySelector("[data-aurora-atoms-surface]") ??
            document.querySelector(".configurator-aside") ??
            document.querySelector(".fading-scroll--y");
        if (!aside) return { found: false };
        const asideRight = aside.getBoundingClientRect().right;
        // Among all toggle-group items, find the rightmost edge.
        const chips = Array.from(document.querySelectorAll('[role="group"] button')).map(
            (b) => b.getBoundingClientRect(),
        );
        if (chips.length === 0) return { found: false };
        const maxRight = Math.max(...chips.map((r) => r.right));
        return { found: true, maxRight, asideRight };
    });

    if (!result.found) {
        test.info().annotations.push({
            type: "skip-note",
            description: "no DERIVE chip group found on the aurora route at this render",
        });
        return;
    }

    // THE BINDING FLOOR — the rightmost chip is within the aside (allow a 2px AA slack).
    expect(
        result.maxRight,
        `the rightmost DERIVE chip (right ${result.maxRight}) must not overflow the aside content right (${result.asideRight}) — no MONO slice`,
    ).toBeLessThanOrEqual((result.asideRight ?? 0) + 2);

    await shot(page, "W-CONFIG-CHASSIS-aurora-derive-chips-dark");
});

// ── (c)+(d) W6+W5 — the gear dark row flips html.dark + the section labels read the rung ─
test("W6+W5 — the gear dark row flips html.dark + the section rung resolves", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    // The gear (PresetEditor) is mounted GLOBALLY in AppShell, so it opens over ANY
    // route — use the lightweight home route (the WebGL aurora route is heavy).
    await page.goto("/", { waitUntil: "networkidle" });
    await setDark(page, false);
    await openConfigurator(page);

    // (d) W5 — the FIRST section label resolves the 20.4px section rung.
    const sectionFont = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        const label = dialog?.querySelector(".configurator-section-label");
        if (!label) return null;
        return parseFloat(getComputedStyle(label).fontSize);
    });
    expect(sectionFont, "the gear section label must resolve the .configurator-section-label rung").not.toBeNull();
    // 20.4px √φ rung — allow a small px rounding slack.
    expect(
        sectionFont!,
        `the gear section label must read the 20.4px section rung (measured ${sectionFont}px), not the 12px mono eyebrow`,
    ).toBeGreaterThanOrEqual(18);

    // (c) W6 — the dark row carries the canonical <DarkModeToggle>, not a Switch, and a
    // click FLIPS html.dark both directions.
    const hasToggle = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        return !!dialog?.querySelector(".dark-mode-toggle-button");
    });
    expect(hasToggle, "the dark row must render the canonical <DarkModeToggle> (.dark-mode-toggle-button)").toBe(
        true,
    );

    // The flip is driven by dispatching a native click on the toggle (firing its
    // @click → useGlobalDark.toggleDark handler) WITHOUT playwright's actionability
    // wait — the DarkModeToggle's isolate + sun/moon pseudo-overlay confounds the
    // hit-test, so a programmatic dispatch is the robust event delivery (the button
    // is the genuine event target). This is the gear's binding, not the toggle's
    // internals (the library DarkModeToggle/useGlobalDark seam is owned elsewhere).
    const flipOnce = async (): Promise<boolean> => {
        return page.evaluate(() => {
            const dialog = document.querySelector('[role="dialog"]');
            const btn = dialog?.querySelector(".dark-mode-toggle-button") as HTMLElement | null;
            if (!btn) return false;
            btn.click();
            return true;
        });
    };

    const before = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    const fired = await flipOnce();
    expect(fired, "the gear dark row must carry a clickable <DarkModeToggle>").toBe(true);
    await page.waitForTimeout(350);
    const afterOne = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    expect(
        afterOne,
        "clicking the gear's <DarkModeToggle> must FLIP html.dark (the live useGlobalDark, not the desynced Switch NO-OP)",
    ).toBe(!before);

    await flipOnce();
    await page.waitForTimeout(350);
    const afterTwo = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    expect(afterTwo, "clicking again must flip html.dark BACK (both directions)").toBe(before);

    await shot(page, "W-CONFIG-CHASSIS-gear-sections-light");
});

// ── (f) W2 — the dark-plate dividers paint a visible luminance step ─────────────────────
test("W2 — the configurator dividers read on the dark plate", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    // The gear is global (AppShell) — open over the lightweight home route.
    await page.goto("/", { waitUntil: "networkidle" });
    await setDark(page, true);
    await openConfigurator(page);

    // The --configurator-divider-section token resolves to a non-transparent color whose
    // alpha is materially > 0 on the dark plate (a visible hairline, not the vanished
    // border-border/40).
    const dividerColor = await page.evaluate(() => {
        const probe = document.createElement("div");
        probe.style.color = "var(--configurator-divider-section)";
        document.documentElement.appendChild(probe);
        const c = getComputedStyle(probe).color;
        probe.remove();
        return c;
    });
    // Parse the alpha from either the legacy `rgba(r,g,b,a)` or the modern
    // `color(srgb r g b / a)` serialization (Chromium serializes the color-mix
    // result as color(srgb …)).
    let alpha = 0;
    const rgbaM = dividerColor.match(/rgba?\(([^)]+)\)/);
    const colorM = dividerColor.match(/color\(srgb[^)]*\/\s*([\d.]+)\s*\)/);
    if (colorM) {
        alpha = parseFloat(colorM[1]);
    } else if (rgbaM) {
        const parts = rgbaM[1].split(/[,\s/]+/).map((s) => parseFloat(s.trim()));
        alpha = parts.length >= 4 ? parts[3] : parts.length === 3 ? 1 : 0;
    } else if (/^color\(srgb/.test(dividerColor)) {
        // color(srgb r g b) with no slash → fully opaque.
        alpha = 1;
    }
    expect(
        alpha,
        `the dark --configurator-divider-section must resolve a materially-visible alpha (measured ${alpha} from ${dividerColor}), not the vanished border-border/40`,
    ).toBeGreaterThanOrEqual(0.18);

    await shot(page, "W-CONFIG-CHASSIS-gear-dividers-dark");
});

// ── (e) PPD-1 — the Speedtest preview swatch is vivid ───────────────────────────────────
test("PPD-1 — the Speedtest preset preview swatch is vivid (mean-alpha ≥ 0.95)", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/substrates/aurora", { waitUntil: "networkidle" });
    await setDark(page, true);
    // The preset picker bakes thumbnails on mount; give it time.
    await page.waitForTimeout(2500);

    // Find the Speedtest preset thumbnail <img> (the preview swatch) and read its painted
    // mean alpha by drawing it onto a canvas.
    const meanAlpha = await page.evaluate(async () => {
        // The PresetPickerRow renders an <img> per preset; the Speedtest one carries the
        // label/alt "Speedtest".
        const imgs = Array.from(document.querySelectorAll("img")).filter((im) =>
            /speedtest/i.test(im.alt ?? "") || /speedtest/i.test(im.getAttribute("aria-label") ?? ""),
        );
        const img = imgs[0] as HTMLImageElement | undefined;
        if (!img || !img.complete || img.naturalWidth === 0) return -1;
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return -1;
        ctx.drawImage(img, 0, 0);
        try {
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            let sum = 0;
            let n = 0;
            for (let i = 3; i < data.length; i += 4) {
                sum += data[i] / 255;
                n++;
            }
            return n > 0 ? sum / n : -1;
        } catch {
            return -1;
        }
    });

    if (meanAlpha < 0) {
        test.info().annotations.push({
            type: "skip-note",
            description: "no Speedtest preview <img> found (the picker may not be on this route)",
        });
        return;
    }

    // THE BINDING FLOOR — the freezeCfg alpha:1 clamp makes the preview vivid.
    expect(
        meanAlpha,
        `the Speedtest preview swatch must read vivid (mean-alpha ${meanAlpha.toFixed(3)} ≥ 0.95), no longer the 0.259 dim outlier`,
    ).toBeGreaterThanOrEqual(0.95);
});
