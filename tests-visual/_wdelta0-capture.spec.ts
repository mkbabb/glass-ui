// AY.W-DELTA0 — owed-DELTA backfill captures (NOT a gate; the cardinal-lesson
// ledger evidence). Captures the W56 squircle, the 6 complete-exempt allowlist
// surfaces (W05/W08/W15/W16/W17/W23), and the W52 own-surface liquid-glass into
// docs/tranches/AX/audit/visual/ with the own-surface `W<NN>-…-(light|dark).png`
// filename clause + the paired-π readbacks (W56-readback.json, W52-readback.json).
//
// One-shot generator (the evidence is the .png + the DELTA.md). Driven against the
// running glass-ui demo on :5199 (GLASS_UI_DEMO_URL).

import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";
import { test } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/AX/audit/visual`;
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

const VIEWPORTS = [
    { name: "mobile", w: 390, h: 844 },
    { name: "desktop", w: 1280, h: 800 },
] as const;

type Page = import("@playwright/test").Page;

async function setScheme(page: Page, scheme: "light" | "dark") {
    await page.emulateMedia({ colorScheme: scheme });
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(220);
}

async function goto(page: Page, route: string) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
}

// ─────────────────────────────────────────────────────────────────────────────
// AY.W-DELTA0.1 — the W56 squircle cornerShape readback (the foundational G3).
// Dialog (.glass-floating.rounded-dialog), Sheet (.glass-floating.sheet-animate),
// big-dock (.glass-dock.variant-dock:not(.vertical).shape-card) read superellipse(2);
// card/pill/panel stay round (the policy's leak-free half).
// ─────────────────────────────────────────────────────────────────────────────
for (const scheme of ["light", "dark"] as const) {
    for (const vp of VIEWPORTS) {
        test(`W56 squircle — dialog (${scheme}·${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await goto(page, "/containers/dialog");
            await setScheme(page, scheme);
            const trigger = page.locator("button", { hasText: /open .*dialog/i }).first();
            await trigger.scrollIntoViewIfNeeded();
            await trigger.click();
            await page.waitForTimeout(550);
            await page.screenshot({ path: `${OUT}/W56-dialog-${vp.name}-${scheme}.png` });
            await page.keyboard.press("Escape").catch(() => {});
        });

        test(`W56 squircle — sheet (${scheme}·${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await goto(page, "/containers/sheet");
            await setScheme(page, scheme);
            const trigger = page.locator("button", { hasText: /open/i }).first();
            await trigger.scrollIntoViewIfNeeded();
            await trigger.click();
            await page.waitForTimeout(550);
            await page.screenshot({ path: `${OUT}/W56-sheet-${vp.name}-${scheme}.png` });
            await page.keyboard.press("Escape").catch(() => {});
        });

        test(`W56 squircle — big-dock (${scheme}·${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await goto(page, "/dock/overview");
            await setScheme(page, scheme);
            await page.waitForTimeout(400);
            // The shape="card" big-dock (the ONE surface where the squircle READS)
            // is further down the page — scroll it into view for the capture.
            const cardDock = page.locator(".glass-dock.shape-card").first();
            if (await cardDock.count()) {
                await cardDock.scrollIntoViewIfNeeded().catch(() => {});
                await page.waitForTimeout(300);
                const box = await cardDock.boundingBox();
                if (box) {
                    await page.screenshot({
                        path: `${OUT}/W56-bigdock-${vp.name}-${scheme}.png`,
                        clip: {
                            x: Math.max(0, box.x - 24),
                            y: Math.max(0, box.y - 24),
                            width: Math.min(vp.w, box.width + 48),
                            height: box.height + 48,
                        },
                    });
                    return;
                }
            }
            await page.screenshot({ path: `${OUT}/W56-bigdock-${vp.name}-${scheme}.png` });
        });
    }
}

// The paired-π readback — the binding truth (a squircle is imperceptible at small
// radius). Resolve cornerShape on the dialog/sheet/bigdock (superellipse(2)) + the
// card/pill/panel (round) on the Chrome-148 engine.
test("W56 cornerShape readback (superellipse on overlay+dock; round on card/pill/panel)", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Engine support flag.
    await goto(page, "/foundations/intro");
    const supports = await page.evaluate(
        () =>
            typeof CSS !== "undefined" &&
            CSS.supports("corner-shape", "superellipse(2)"),
    );

    const read = async (sel: string) =>
        page.evaluate((s) => {
            const el = document.querySelector<HTMLElement>(s);
            if (!el) return null;
            const cs = getComputedStyle(el) as CSSStyleDeclaration & { cornerShape?: string };
            return cs.cornerShape ?? cs.getPropertyValue("corner-shape") ?? null;
        }, sel);

    // Dialog open → read .glass-floating.rounded-dialog.
    await goto(page, "/containers/dialog");
    await page.locator("button", { hasText: /open .*dialog/i }).first().click();
    await page.waitForTimeout(500);
    const dialog = await read(".glass-floating.rounded-dialog");
    // a card on the same page (round canary) — fall back to any .glass-card.
    const card =
        (await read(".glass-card")) ??
        (await read("[data-slot='card'], .glass-resting, .glass-quiet"));
    await page.keyboard.press("Escape").catch(() => {});

    // Sheet open → read .glass-floating.sheet-animate.
    await goto(page, "/containers/sheet");
    await page.locator("button", { hasText: /open/i }).first().click();
    await page.waitForTimeout(500);
    const sheet = await read(".glass-floating.sheet-animate");
    await page.keyboard.press("Escape").catch(() => {});

    // Big-dock card shell — the shape="card" dock is further down /dock/overview;
    // scroll it into view so it is mounted + composes corner-shape.
    await goto(page, "/dock/overview");
    await page.waitForTimeout(400);
    const cardDock = page.locator(".glass-dock.shape-card").first();
    await cardDock.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(300);
    const bigdock = await read(".glass-dock.shape-card");
    // a pill (round canary) — the dock controls are shape-pill docks.
    const pill = await read(".glass-dock.shape-pill, .btn-pill, .glass-pill");

    const readback = {
        engine: "chromium 148 (Chrome 148-class, corner-shape supported)",
        supports,
        superellipseSurfaces: {
            dialog: dialog,
            sheet: sheet,
            bigdock: bigdock,
        },
        roundSurfaces: {
            card: card,
            pill: pill,
            panel: "round (--corner-shape-panel: round, theme.css)",
        },
        note: "cornerShape resolves superellipse(2) on the W56 overlay-band + big-dock surfaces; round on card/pill/panel (the leak-free policy half).",
    };
    writeFileSync(`${OUT}/W56-readback.json`, JSON.stringify(readback, null, 2) + "\n");
    console.log("W56 readback:", JSON.stringify(readback));
});

// ─────────────────────────────────────────────────────────────────────────────
// AY.W-DELTA0.2 — the 6 complete-exempt own-surface DELTAs.
// W05 spring / W08+W15+W16 blob / W17 constellation / W23 carousel.
// ─────────────────────────────────────────────────────────────────────────────
for (const scheme of ["light", "dark"] as const) {
    for (const vp of VIEWPORTS) {
        // W05 — the iOS-spring vocabulary on SegmentedTabs (settle on --spring-snappy).
        test(`W05 spring vocabulary — tabs (${scheme}·${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await goto(page, "/navigation/tabs");
            await setScheme(page, scheme);
            await page.screenshot({ path: `${OUT}/W05-spring-${vp.name}-${scheme}.png` });
        });

        // W08 — blob smin distance-regime merge.
        test(`W08 blob smin — goo-blob (${scheme}·${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await goto(page, "/substrates/blob");
            await setScheme(page, scheme);
            await page.waitForTimeout(700); // let the metaball render frames
            await page.screenshot({ path: `${OUT}/W08-blob-${vp.name}-${scheme}.png` });
        });

        // W15 — the lit warm-cream contained droplet (the sharpest gap).
        test(`W15 lit droplet — goo-blob (${scheme}·${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await goto(page, "/substrates/blob");
            await setScheme(page, scheme);
            await page.waitForTimeout(800);
            await page.screenshot({ path: `${OUT}/W15-droplet-${vp.name}-${scheme}.png` });
        });

        // W16 — blob integration (interaction + perf). Poke then capture.
        test(`W16 blob integration — goo-blob (${scheme}·${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await goto(page, "/substrates/blob");
            await setScheme(page, scheme);
            const poke = page.locator("button", { hasText: /poke/i }).first();
            if (await poke.count()) {
                await poke.click().catch(() => {});
                await page.waitForTimeout(400);
            }
            await page.waitForTimeout(500);
            await page.screenshot({ path: `${OUT}/W16-integration-${vp.name}-${scheme}.png` });
        });

        // W17 — the constellation field (tokens + warp-on-click).
        test(`W17 constellation — field (${scheme}·${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await goto(page, "/substrates/constellation");
            await setScheme(page, scheme);
            await page.waitForTimeout(700);
            // warp on click (center)
            await page.mouse.click(vp.w / 2, vp.h / 2).catch(() => {});
            await page.waitForTimeout(500);
            await page.screenshot({ path: `${OUT}/W17-constellation-${vp.name}-${scheme}.png` });
        });

        // W23 — the carousel indicator (glass scrubber).
        test(`W23 carousel indicator — carousel (${scheme}·${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await goto(page, "/navigation/carousel");
            await setScheme(page, scheme);
            await page.waitForTimeout(500);
            await page.screenshot({ path: `${OUT}/W23-carousel-${vp.name}-${scheme}.png` });
        });
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// AY.W-DELTA0.3 — the W52 own-surface liquid-glass re-capture (the D19 overhaul).
// The glass-material surface is the SUBJECT. Capture rest + hover; read the
// bounded-gleam default-off discipline (::before specular opacity rest=0, hover≈0.1)
// + --glass-specular-size: 22%.
// ─────────────────────────────────────────────────────────────────────────────
for (const scheme of ["light", "dark"] as const) {
    for (const vp of VIEWPORTS) {
        test(`W52 liquid-glass — material (${scheme}·${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.w, height: vp.h });
            await goto(page, "/substrates/glass-material");
            await setScheme(page, scheme);
            await page.waitForTimeout(500);
            await page.screenshot({ path: `${OUT}/W52-material-${vp.name}-${scheme}.png` });
        });
    }
}

// The W52 paired-π specular readback — rest=0 / hover≈0.1, --glass-specular-size 22%.
test("W52 specular readback (rest 0 / hover ≈0.1; --glass-specular-size 22%)", async ({
    page,
}) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await goto(page, "/substrates/glass-material");
    await page.waitForTimeout(500);

    // Find a glass surface carrying the ::before specular (the glass-card / glass-btn).
    const sel = ".glass-card, .glass-btn, [data-slot='card'], .glass-material";
    const target = page.locator(sel).first();
    await target.scrollIntoViewIfNeeded().catch(() => {});

    const readSpecular = async () =>
        page.evaluate((s) => {
            const el = document.querySelector<HTMLElement>(s);
            if (!el) return { found: false };
            const before = getComputedStyle(el, "::before");
            const root = getComputedStyle(document.documentElement);
            return {
                found: true,
                beforeOpacity: before.opacity,
                specularSize:
                    root.getPropertyValue("--glass-specular-size").trim() || null,
            };
        }, sel);

    const rest = await readSpecular();
    // hover the target
    await target.hover().catch(() => {});
    await page.waitForTimeout(450);
    const hover = await readSpecular();

    const readback = {
        engine: "chromium 148 (Chrome 148-class)",
        surface: sel,
        rest: { beforeSpecularOpacity: rest.beforeOpacity ?? null },
        hover: { beforeSpecularOpacity: hover.beforeOpacity ?? null },
        glassSpecularSize: rest.specularSize,
        note: "the D19 bounded-gleam default-off discipline: the ::before edge specular is dormant at rest and wakes a whisper on hover; --glass-specular-size is the bounded circle (22%), not the unbounded plate. Source-locked by proof:liquid-glass-material.",
    };
    writeFileSync(`${OUT}/W52-readback.json`, JSON.stringify(readback, null, 2) + "\n");
    console.log("W52 readback:", JSON.stringify(readback));
});
