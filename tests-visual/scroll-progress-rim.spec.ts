import { expect, test } from "@playwright/test";

const ROUTE = "/feedback/progress";

async function readRim(page: import("@playwright/test").Page, label: string) {
    const root = page.getByRole("progressbar", { name: label });
    const track = root.locator(".scroll-progress-rim__track");
    await expect(root).toBeVisible();
    return {
        root,
        paint: await track.evaluate((element) => {
            const style = getComputedStyle(element);
            return {
                background: style.backgroundImage,
                spectrum: style.getPropertyValue("--scroll-progress-rim-spectrum"),
                width: parseFloat(style.borderTopWidth),
                radius: parseFloat(style.borderTopLeftRadius),
                mask:
                    style.maskComposite ||
                    (style as CSSStyleDeclaration & { webkitMaskComposite?: string })
                        .webkitMaskComposite ||
                    "",
            };
        }),
    };
}

test("aggregate and segmented progress share one thin radius-following masked rim", async ({
    page,
}) => {
    await page.goto(ROUTE, { waitUntil: "networkidle" });

    const aggregate = await readRim(page, "Example scroll progress");
    expect(await aggregate.root.getAttribute("aria-valuenow")).toBe("42");
    expect(aggregate.paint.background).toContain("conic-gradient");
    expect(aggregate.paint.spectrum.split(",").length).toBeGreaterThanOrEqual(4);
    expect(aggregate.paint.width).toBeGreaterThanOrEqual(3);
    expect(aggregate.paint.width).toBeLessThanOrEqual(4);
    expect(aggregate.paint.radius).toBeGreaterThan(0);
    expect(aggregate.paint.mask).not.toBe("none");

    const segmented = await readRim(page, "Segment progress");
    expect(await segmented.root.getAttribute("aria-valuenow")).toBe("2.07");
    expect(await segmented.root.getAttribute("style")).toContain(
        "--scroll-progress-rim-fill: 100%",
    );
    expect(segmented.paint.background).toContain("conic-gradient");
    expect(segmented.paint.spectrum).toContain("transparent");
    expect(segmented.paint.width).toBe(4);
    expect(segmented.paint.radius).toBeGreaterThan(0);
    expect(segmented.paint.mask).not.toBe("none");

    const heading = page.getByText("scroll progress rim", { exact: true });
    await heading.scrollIntoViewIfNeeded();
    await test.info().attach("scroll-progress-rim", {
        body: await heading
            .locator("xpath=../..")
            .screenshot({ animations: "disabled" }),
        contentType: "image/png",
    });
});
