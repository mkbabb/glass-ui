import { expect, test, type Locator, type Page } from "@playwright/test";

const ROUTE = "/data/sortable-list";

async function openStory(page: Page): Promise<void> {
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await expect(page.locator('ul[aria-label="Tasks"]')).toBeVisible();
}

async function dispatchTouchDrag(
    page: Page,
    handle: Locator,
    target: Locator,
    pointerType = "touch",
): Promise<void> {
    const from = await handle.boundingBox();
    const to = await target.boundingBox();
    expect(from).not.toBeNull();
    expect(to).not.toBeNull();
    const start = { x: from!.x + from!.width / 2, y: from!.y + from!.height / 2 };
    const end = { x: to!.x + to!.width / 2, y: to!.y + to!.height - 2 };

    await handle.dispatchEvent("pointerdown", {
        bubbles: true,
        button: 0,
        buttons: 1,
        pointerId: 7,
        pointerType,
        clientX: start.x,
        clientY: start.y,
    });
    await page.evaluate(({ x, y, pointerType }) => {
        document.dispatchEvent(new PointerEvent("pointermove", {
            bubbles: true,
            buttons: 1,
            pointerId: 7,
            pointerType,
            clientX: x,
            clientY: y,
        }));
        document.dispatchEvent(new PointerEvent("pointerup", {
            bubbles: true,
            button: 0,
            pointerId: 7,
            pointerType,
            clientX: x,
            clientY: y,
        }));
    }, { ...end, pointerType });
}

async function mouseDrag(page: Page, handle: Locator, target: Locator): Promise<void> {
    const from = await handle.boundingBox();
    const to = await target.boundingBox();
    expect(from).not.toBeNull();
    expect(to).not.toBeNull();
    await page.mouse.move(from!.x + from!.width / 2, from!.y + from!.height / 2);
    await page.mouse.down();
    await page.mouse.move(to!.x + to!.width / 2, to!.y + to!.height - 2, { steps: 8 });
    await page.mouse.up();
}

test.describe("SortableList public transaction contract", () => {
    test.beforeEach(async ({ page }) => openStory(page));

    test("native semantics, disabled exclusion, and coarse target floor", async ({ page }, testInfo) => {
        const lists = page.locator("ul[data-sortable-container]");
        await expect(lists.first()).toHaveAttribute("aria-label", "Tasks");
        expect(await page.locator('[role="application"]').count()).toBe(0);
        expect(await lists.first().locator(":scope > li").count()).toBe(5);

        const handles = page.locator("button[data-sortable-handle]");
        expect(await handles.count()).toBeGreaterThan(0);
        await expect(page.getByRole("button", { name: "Drag Verify handle selector" }))
            .toBeDisabled();

        if (testInfo.project.name === "coarse-touch") {
            const boxes = await handles.evaluateAll((nodes) => nodes.map((node) => {
                const rect = node.getBoundingClientRect();
                return { width: rect.width, height: rect.height };
            }));
            for (const box of boxes) {
                expect(box.width).toBeGreaterThanOrEqual(44);
                expect(box.height).toBeGreaterThanOrEqual(44);
            }
        }

        await page.emulateMedia({ reducedMotion: "reduce" });
        await expect(lists.first()).toBeVisible();
        await page.screenshot({ path: testInfo.outputPath("sortable-list.png"), fullPage: true });
    });

    test("keyboard lift, travel, drop, cancel, and focus retention", async ({ page }) => {
        const list = page.locator('ul[aria-label="Tasks"]');
        const live = page.locator('ul[aria-label="Tasks"] + span[aria-live]');
        const alpha = page.getByRole("button", { name: "Reorder Draft spec" });
        await alpha.focus();
        await alpha.press("Space");
        await expect(live).toContainText(
            "Lifted Draft spec, position 1 of 5",
        );
        await alpha.press("End");
        await expect(live).toContainText(
            "proposed position 5 of 5",
        );
        await alpha.press("Enter");
        await expect(list.locator(":scope > li").last()).toHaveAttribute("data-sortable-id", "t1");
        await expect(page.getByRole("button", { name: "Reorder Draft spec" })).toBeFocused();
        await expect(live).toContainText(
            "Dropped Draft spec, position 5 of 5",
        );

        const review = page.getByRole("button", { name: "Reorder Review pull requests" });
        await review.press("Enter");
        await review.press("Home");
        await review.press("Escape");
        await expect(live).toContainText(
            "Cancelled moving Review pull requests",
        );
        await expect(review).toBeFocused();
    });

    test("pointer and touch commit through the same reorder transaction", async ({ page }, testInfo) => {
        const list = page.locator('ul[aria-label="Tasks"]');
        const live = page.locator('ul[aria-label="Tasks"] + span[aria-live]');
        const first = page.getByRole("button", { name: "Reorder Draft spec" });
        const lastRow = list.locator(":scope > li").last();

        if (testInfo.project.name === "coarse-touch") {
            await dispatchTouchDrag(page, first, lastRow);
        } else {
            await mouseDrag(page, first, lastRow);
        }

        await expect(list.locator(":scope > li").last()).toHaveAttribute("data-sortable-id", "t1");
        await expect(live).toContainText("Dropped Draft spec");
    });

    test("cross-list drop retains insertion and names source and destination", async ({ page }, testInfo) => {
        const source = page.locator('ul[aria-label="Todo"]');
        const target = page.locator('ul[aria-label="Doing"]');
        const handle = source.getByRole("button", { name: "Reorder Audit token cascade" });

        await dispatchTouchDrag(
            page,
            handle,
            target,
            testInfo.project.name === "coarse-touch" ? "touch" : "mouse",
        );

        await expect(source.locator('[data-sortable-id="k1"]')).toHaveCount(0);
        await expect(target.locator('[data-sortable-id="k1"]')).toHaveCount(1);
        await expect(page.locator('ul[aria-label="Todo"] + span[aria-live]')).toContainText(
            "Moved Audit token cascade from Todo to Doing",
        );
        await expect(target.getByRole("button", { name: "Reorder Audit token cascade" }))
            .toBeFocused();
    });
});
