// AZ.R4-SHELL — live capture on the DEMO SHELL (the user's truth surface, :5199).
// Proves R4-3 (the gear opens the PresetEditor as its content; the dark toggle is
// at the TOP), R4-4 (every editor row composes the house glass register — the
// Preset + Density rows are SegmentedTabs, no bare radios/buttons), and R5-4 (the
// floating-panel/dropdown content padding reads comfortable via the --panel-padding
// rung). One-shot generator — the evidence is the .png set + the readback JSON.
//
// Surface-hash header (the surfaces under test at capture time):
//   demo/shell/configurator/PresetEditor.vue      57a9d0cb73cf4eb6
//   src/styles/floating-panel.css                 a0ec1245796189c2
//   src/styles/tokens/offsets-sizing.css          3e8a0a762859de6c
//   src/components/dropdown-menu/DropdownMenuContent.vue  584a36444a1a255c
//   demo/shell/SidebarDock.vue                   dd2eb316d11c2fcc

import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/AZ/audit/visual`;
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

type Page = import("@playwright/test").Page;

/** Open the gear-hosted PresetEditor via the shipped window event (the SAME path
 *  the SidebarDock gear DockIconButton dispatches — one event, no parallel open). */
async function openConfigurator(page: Page) {
    await page.evaluate(() => {
        window.dispatchEvent(
            new CustomEvent("glass-ui-demo:toggle-configurator"),
        );
    });
    // Wait for the Sheet to portal + settle.
    await page.locator('[role="dialog"]').first().waitFor({ state: "visible" });
    await page.waitForTimeout(420);
}

/** Read the structural facts the user audit binds:
 *   - the gear trigger carries aria-expanded reflecting the open state;
 *   - the FIRST control row in the editor is "Dark mode" (dark-at-TOP, R4-3);
 *   - the Preset + Density rows render a SegmentedTabs strip (role=group), NOT a
 *     radiogroup or bare buttons (R4-4). */
async function readEditorContract(page: Page) {
    return page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        if (!dialog) return { present: false } as Record<string, unknown>;

        // Every section header text in document order.
        const sectionHeaders = Array.from(
            dialog.querySelectorAll("h3"),
        ).map((h) => (h.textContent ?? "").trim());

        // The FIRST field row label (dark-at-TOP).
        const firstLabel = (
            dialog.querySelector("label")?.textContent ?? ""
        ).trim();

        // Does the dialog still contain ANY radiogroup? (R4-4 — must be zero.)
        const radioGroups = dialog.querySelectorAll('[role="radiogroup"]').length;

        // The SegmentedTabs strips present (role=group with the segmented-tabs class).
        const segmentedStrips = Array.from(
            dialog.querySelectorAll('.segmented-tabs[role="group"]'),
        ).map((s) =>
            Array.from(s.querySelectorAll(".segmented-tab")).map((b) =>
                (b.textContent ?? "").trim(),
            ),
        );

        // The gear trigger's aria-expanded (the a11y contract — the trigger, not
        // the presentational dock root, carries it).
        const gear = document.querySelector(".demo-sidebar-gear");
        const gearExpanded = gear?.getAttribute("aria-expanded") ?? null;

        return {
            present: true,
            sectionHeaders,
            firstLabel,
            radioGroups,
            segmentedStrips,
            gearExpanded,
        };
    });
}

async function captureMode(page: Page, mode: "light" | "dark") {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(250);

    await openConfigurator(page);
    const contract = await readEditorContract(page);

    // The full editor panel (right Sheet) — the gear view.
    const panel = page.locator('[role="dialog"]').first();
    await panel.screenshot({
        path: `${OUT}/R4-SHELL-preset-editor-${mode}.png`,
    });

    // The Preset + Density glassy rows, zoomed (R4-4 evidence). Scroll the Preset
    // section into view first.
    const presetStrip = page
        .locator('.segmented-tabs[role="group"]')
        .first();
    await presetStrip.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await presetStrip.screenshot({
        path: `${OUT}/R4-SHELL-preset-segmented-${mode}.png`,
    });

    return contract;
}

test("AZ.R4-SHELL — gear→PresetEditor, glassy rows, panel padding (shell)", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1280, height: 860 });
    await page.goto(BASE + "/foundations/intro", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    const light = await captureMode(page, "light");

    // ── End-to-end: open → edit → live-apply (R4-SHELL item 5). The editor is
    // already open (captureMode left it open). Read the baseline --density-* ,
    // click the "Compact" Density segment, and confirm the token live-applies to
    // :root through the SegmentedTabs model (no re-render, no reload). ──
    const densityBefore = await page.evaluate(() => {
        const r = getComputedStyle(document.documentElement);
        return {
            pad: r.getPropertyValue("--density-pad").trim(),
            gap: r.getPropertyValue("--density-gap").trim(),
        };
    });
    // The Density strip is the SECOND segmented strip in the editor; click its
    // "Compact" segment.
    const densityStrip = page.locator('.segmented-tabs[role="group"]').nth(1);
    await densityStrip.scrollIntoViewIfNeeded();
    const compactSeg = densityStrip.locator(".segmented-tab", {
        hasText: "Compact",
    });
    await compactSeg.click();
    await page.waitForTimeout(300);
    const compactPressed = await compactSeg.getAttribute("aria-pressed");
    const densityTokens = await page.evaluate(() => {
        const r = getComputedStyle(document.documentElement);
        return {
            pad: r.getPropertyValue("--density-pad").trim(),
            gap: r.getPropertyValue("--density-gap").trim(),
        };
    });
    const densityAfter = {
        ...densityTokens,
        pressedLabel: compactPressed === "true" ? "Compact" : "",
    };
    const liveApply = {
        densityBefore,
        densityAfter,
        changed:
            densityBefore.pad !== densityAfter.pad ||
            densityBefore.gap !== densityAfter.gap,
    };

    // Close, then re-open in dark.
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const dark = await captureMode(page, "dark");

    // ── R5-4 — the dropdown padding rung. Read the --panel-padding token + the
    // COMPUTED inner padding of a LIVE demo DropdownMenu content surface (the
    // binding observable — the user's "the popover reads tight"). Capture the
    // open menu both modes. ──
    await page.keyboard.press("Escape");
    await page.waitForTimeout(250);

    async function measureDropdown(mode: "light" | "dark") {
        await page.evaluate((m) => {
            document.documentElement.classList.toggle("dark", m === "dark");
        }, mode);
        await page.goto(BASE + "/containers/dropdown-menu", {
            waitUntil: "networkidle",
        });
        await page.waitForTimeout(350);
        // Open the first dropdown trigger on the story.
        const trigger = page
            .locator('button[aria-haspopup="menu"]')
            .first();
        await trigger.click();
        const content = page.locator(".dropdown-menu-content").first();
        await content.waitFor({ state: "visible" });
        await page.waitForTimeout(250);
        const padding = await content.evaluate((el) => {
            const cs = getComputedStyle(el as HTMLElement);
            return {
                paddingTop: cs.paddingTop,
                paddingLeft: cs.paddingLeft,
            };
        });
        await content.screenshot({
            path: `${OUT}/R4-SHELL-dropdown-padding-${mode}.png`,
        });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(200);
        return padding;
    }

    const dropdownLight = await measureDropdown("light");
    const dropdownDark = await measureDropdown("dark");

    const tokens = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        return {
            tokenPanelPadding: root.getPropertyValue("--panel-padding").trim(),
            tokenPanelPaddingRoomy: root
                .getPropertyValue("--panel-padding-roomy")
                .trim(),
        };
    });
    const panelPadding = {
        ...tokens,
        // The computed dropdown content inner padding both modes (R5-4 — the
        // 0.375rem rung resolves to 6px, up from the prior tight 4px p-1).
        dropdownContentPadding: { light: dropdownLight, dark: dropdownDark },
    };

    const readback = {
        wave: "AZ.R4-SHELL",
        base: BASE,
        clause:
            "R4-3 gear→PresetEditor + dark-at-TOP; R4-4 glassy SegmentedTabs rows; R5-4 panel-padding rung; item5 open→edit→live-apply",
        light,
        dark,
        liveApply,
        panelPadding,
    };
    writeFileSync(
        `${OUT}/R4-SHELL-readback.json`,
        JSON.stringify(readback, null, 2) + "\n",
    );

    // ── Binding assertions ──
    // R4-3: the gear opens the editor, and the FIRST row is Dark mode (dark-at-TOP).
    expect(light.present, "the PresetEditor opens on the shell").toBe(true);
    expect(light.firstLabel, "the first editor row is Dark mode (dark-at-TOP)").toContain(
        "Dark mode",
    );
    // R4-4: zero radiogroups remain; the Preset + Density rows are SegmentedTabs.
    expect(light.radioGroups, "no bare radiogroups remain in the editor").toBe(0);
    expect(
        (light.segmentedStrips as string[][]).length,
        "the editor renders >= 2 SegmentedTabs strips (Preset + Density)",
    ).toBeGreaterThanOrEqual(2);
    // Item 5: the SegmentedTabs edit LIVE-APPLIES to :root (the --density tokens
    // change through the model — open → edit → live-apply).
    expect(
        liveApply.changed,
        "editing the Density SegmentedTabs live-applies the --density-* tokens to :root",
    ).toBe(true);
    expect(
        liveApply.densityAfter.pressedLabel,
        "the Compact density segment is the pressed (active) one after the click",
    ).toContain("Compact");
    // R5-4: the panel-padding rung is the comfortable 0.375rem default, and a
    // LIVE demo dropdown content surface resolves it to 6px (up from the prior
    // tight 4px p-1) — comfortable both modes.
    expect(
        panelPadding.tokenPanelPadding,
        "--panel-padding rung is minted",
    ).toBe("0.375rem");
    expect(
        panelPadding.dropdownContentPadding.light.paddingTop,
        "the live dropdown content reads the comfortable 6px pad (light)",
    ).toBe("6px");
    expect(
        panelPadding.dropdownContentPadding.dark.paddingTop,
        "the live dropdown content reads the comfortable 6px pad (dark)",
    ).toBe("6px");
});
