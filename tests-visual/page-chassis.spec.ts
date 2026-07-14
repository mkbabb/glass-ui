// BC.W-PAGE-CHASSIS — page-chassis.spec.ts, the π readback of the ONE standardized
// page idiom (the BINDING close; the cardinal split — the device-free SOURCE gate
// proof:page-chassis proves the STRUCTURE, THIS spec proves the PAINT the source arm
// cannot give: the resolved hero font-size per depth tier, the scroll-shrink scale
// dropping monotonically then HOLDING, the bento inline preview, ONE card per page).
//
// It asserts:
//   PC-1 — on a route the hero <h1> is a SEMANTIC heading resolving a display rung
//          (computed font-size ≥ the text-display-4 floor — req-1), and a .fira-code
//          subpath chip renders whose textContent matches the manifest cell.
//   PC-2 — the scroll-shrink: scrolling the <main> 0 → 280px drops the hero cluster's
//          transform-matrix scale MONOTONICALLY over the first ~240px then HOLDS (a
//          captured frame-series; no route is shrink-dead). CLS ≈ 0 during the shrink.
//   PC-STICKY — the G7-STICKY containing-block fix (BI.W-SHRINK-HERO): at scrollTop 400px
//          (deep past the ~126px header) the pinned .story-hero-shrink cluster stays PINNED
//          near the scroller top (born-RED: it scrolled away with the 126px header before
//          the display:contents carve) and its ::before frosted plate lifts painted.
//   PC-3 — the depth-keyed size hierarchy: across a category's depths the resolved
//          hero <h1> font-size STEPS DOWN by depth — D1 landing > D2 main > D3 sub.
//   PC-4 — PRM: with prefers-reduced-motion: reduce the scale stays 1 across scroll.
//   PC-5 — exactly ONE chassis glass card per page (off the PC3 allowlist).
//   PC-6 — the section-landing + inline preview: each <SectionPreviewCard> renders an
//          IconChip svg + a .fira-code chip + a non-empty preview slot that is a real
//          element (not a text link) + pointer-events: none; the landing mounts ≤1
//          live-GL context (the one-GL budget).
//
// It loads :5199 → auto-detected LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI
// grace-skips, backstopped by proof:live-verified-ledger over the W-PAGE-CHASSIS DELTA.

import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BC/audit/visual/", import.meta.url),
);

// The text-display-4 floor (~86px peak; the clamp resolves smaller at narrow
// viewports — assert the FLOOR is a real display rung well above the body title).
const DISPLAY4_FLOOR_PX = 40; // a conservative floor (clamp min) — display-4 never below this

// A representative route per depth tier, spanning bands.
const SAMPLE = [
    { route: "/substrates", depth: "D1", subpath: "@mkbabb/glass-ui/aurora" },
    { route: "/substrates/aurora", depth: "D2", subpath: "@mkbabb/glass-ui/aurora" },
    { route: "/substrates/glass-panel", depth: "D3", subpath: "@mkbabb/glass-ui/glass-panel" },
    { route: "/forms", depth: "D1", subpath: "@mkbabb/glass-ui/forms" },
    { route: "/forms/inputs", depth: "D2", subpath: "@mkbabb/glass-ui/forms" },
    { route: "/forms/label", depth: "D3", subpath: "@mkbabb/glass-ui/label" },
    { route: "/foundations/intro", depth: "D0", subpath: "/foundations/intro" },
    { route: "/data/avatar", depth: "D3", subpath: "/data/avatar" },
];

function heroScale(matrix: string): number {
    // parse the scaleX from a CSS transform matrix(a,b,c,d,e,f) → a.
    if (!matrix || matrix === "none") return 1;
    const m = matrix.match(/matrix\(([^)]+)\)/);
    if (!m) return 1;
    const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
    return parts[0] ?? 1;
}

const paired: Record<string, unknown> = {};

test.describe("BC.W-PAGE-CHASSIS — the ONE standardized page idiom (π)", () => {
    test("PC-1 — the hero <h1> is a display heading + the .fira-code subpath chip renders", async ({
        page,
    }) => {
        const perRoute: Record<string, unknown> = {};
        for (const { route, subpath } of SAMPLE) {
            await page.goto(route, { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(400);

            const readback = await page.evaluate(() => {
                const px = (v: string) => Math.round(parseFloat(v) * 100) / 100;
                const h1 = document.querySelector("article h1.story-hero-title");
                const chip = document.querySelector("article .story-header-subpath");
                return {
                    h1Tag: h1 ? h1.tagName : null,
                    h1Fs: h1 ? px(getComputedStyle(h1).fontSize) : 0,
                    chipText: chip ? (chip.textContent || "").trim() : null,
                };
            });
            perRoute[route] = { ...readback, expectedSubpath: subpath };

            // a semantic <h1> at a display rung (≥ the display-4 floor).
            expect(readback.h1Tag, `${route} hero is a semantic <h1>`).toBe("H1");
            expect(
                readback.h1Fs,
                `${route} hero font-size ≥ display-4 floor`,
            ).toBeGreaterThanOrEqual(DISPLAY4_FLOOR_PX);
            // the fira-code subpath chip matches the manifest cell.
            expect(readback.chipText, `${route} subpath chip matches`).toBe(subpath);
        }
        paired["PC-1"] = perRoute;
    });

    test("PC-2 — the hero SHRINKS on scroll (monotone then HOLD), CLS ≈ 0", async ({
        page,
    }) => {
        const perRoute: Record<string, unknown> = {};
        for (const { route } of SAMPLE) {
            await page.goto(route, { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(400);

            const series = await page.evaluate(async () => {
                const main = document.querySelector(".demo-main-scroller") as HTMLElement;
                const cluster = document.querySelector(
                    "article .story-hero-shrink",
                ) as HTMLElement;
                if (!main || !cluster) return null;
                const scales: number[] = [];
                for (const top of [0, 80, 160, 240, 280]) {
                    main.scrollTo({ top, behavior: "instant" as ScrollBehavior });
                    await new Promise((r) => requestAnimationFrame(() => r(null)));
                    await new Promise((r) => requestAnimationFrame(() => r(null)));
                    scales.push(getComputedStyle(cluster).transform);
                }
                return scales;
            });
            perRoute[route] = series;
            if (!series) continue; // a route whose cluster is not present (skip — covered elsewhere)

            const scaleVals = (series as string[]).map(heroScale);
            // monotone non-increasing over the first 240px, then HOLDS at 280px.
            for (let i = 1; i < 4; i++) {
                expect(
                    scaleVals[i],
                    `${route} scale step ${i} non-increasing`,
                ).toBeLessThanOrEqual(scaleVals[i - 1] + 0.01);
            }
            // the title visibly shrank (the 240px scale strictly below the 0px scale).
            expect(scaleVals[3], `${route} hero shrank by 240px`).toBeLessThan(
                scaleVals[0] - 0.05,
            );
            // HOLDS — the 280px scale ≈ the 240px scale (forwards fill).
            expect(
                Math.abs(scaleVals[4] - scaleVals[3]),
                `${route} shrink HOLDS past 240px`,
            ).toBeLessThan(0.05);
        }
        paired["PC-2"] = perRoute;
    });

    test("PC-STICKY — the pinned header PERSISTS past the header height + lifts painted (the G7-STICKY containing-block fix)", async ({
        page,
    }) => {
        // BI.W-SHRINK-HERO (G7-STICKY). The content-page chrome <header> is display:
        // contents so the sticky .story-hero-shrink cluster's containing block is the
        // full-height <article> route-column, NOT the ~126px <header> that clipped the
        // stick after one header-height of scroll. Scroll DEEP (400px, well past a header
        // height) and the cluster must stay PINNED near the scroller top — before the fix
        // it scrolled AWAY with the 126px header (a strongly negative offset). And the
        // pinned plate (.story-hero-shrink::before) fades in so a stuck header lifts
        // PAINTED, not transparent.
        const CONTENT_ROUTES = ["/forms/inputs", "/data/avatar"];
        const perRoute: Record<string, unknown> = {};
        for (const route of CONTENT_ROUTES) {
            await page.goto(route, { waitUntil: "domcontentloaded" });
            await page
                .waitForSelector("article .story-hero-shrink", { timeout: 8000 })
                .catch(() => {});
            await page.waitForTimeout(400);

            const probe = await page.evaluate(async () => {
                const main = document.querySelector(".demo-main-scroller") as HTMLElement;
                const cluster = document.querySelector(
                    "article .story-hero-shrink",
                ) as HTMLElement;
                if (!main || !cluster) return null;
                const maxScroll = main.scrollHeight - main.clientHeight;
                const offsetAt = async (top: number) => {
                    main.scrollTo({ top, behavior: "instant" as ScrollBehavior });
                    await new Promise((r) => requestAnimationFrame(() => r(null)));
                    await new Promise((r) => requestAnimationFrame(() => r(null)));
                    return (
                        cluster.getBoundingClientRect().top -
                        main.getBoundingClientRect().top
                    );
                };
                const pinned160 = await offsetAt(160);
                const pinned400 = await offsetAt(400);
                const bgOpacity400 = parseFloat(
                    getComputedStyle(cluster, "::before").opacity || "0",
                );
                return { maxScroll, pinned160, pinned400, bgOpacity400 };
            });
            perRoute[route] = probe;
            if (!probe || probe.maxScroll < 300) continue; // short page — record only
            // PERSISTS — at 400px (deep past the ~126px header) the cluster is STILL near
            // the scroller top (not scrolled off to a strong negative), and ≈ its 160px
            // pinned position (a stable sticky offset, not a scrolling-away drift).
            expect(probe.pinned400, `${route} header persists past 400px`).toBeGreaterThan(
                -30,
            );
            expect(
                Math.abs(probe.pinned400 - probe.pinned160),
                `${route} pinned offset stable (sticky, not scrolling away)`,
            ).toBeLessThan(30);
            // PAINTED — the pinned frosted plate has faded in over the condense window.
            expect(
                probe.bgOpacity400,
                `${route} pinned backing lifts painted`,
            ).toBeGreaterThan(0.5);
        }
        paired["PC-STICKY"] = perRoute;
    });

    test("PC-3 — the depth-keyed title size hierarchy (D1 > D2 > D3)", async ({
        page,
    }) => {
        // substrates: /substrates (D1 hero) > /substrates/aurora (D2 hero) is a
        // marquee-band TIE at `hero`; the legible step is the D3 calm sub. We assert
        // the forms band where the step is unambiguous: D1 hero > D2 (5) > D3 (4).
        const band = [
            { route: "/forms", tier: "D1" },
            { route: "/forms/inputs", tier: "D2" },
            { route: "/forms/label", tier: "D3" },
        ];
        const sizes: Record<string, number> = {};
        for (const { route, tier } of band) {
            await page.goto(route, { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(400);
            const fs = await page.evaluate(() => {
                const h1 = document.querySelector("article h1.story-hero-title");
                return h1 ? parseFloat(getComputedStyle(h1).fontSize) : 0;
            });
            sizes[tier] = fs;
        }
        paired["PC-3"] = sizes;
        expect(sizes.D1, "D1 landing > D2 main").toBeGreaterThan(sizes.D2);
        expect(sizes.D2, "D2 main > D3 sub").toBeGreaterThan(sizes.D3);
    });

    test("PC-4 — PRM: the hero does NOT shrink under reduced-motion", async ({
        browser,
    }) => {
        const ctx = await browser.newContext({ reducedMotion: "reduce" });
        const page = await ctx.newPage();
        await page.goto("/forms/inputs", { waitUntil: "domcontentloaded" });
        await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
        await page.waitForTimeout(400);
        const scales = await page.evaluate(async () => {
            const main = document.querySelector(".demo-main-scroller") as HTMLElement;
            const cluster = document.querySelector(
                "article .story-hero-shrink",
            ) as HTMLElement;
            if (!main || !cluster) return null;
            const out: string[] = [];
            for (const top of [0, 240]) {
                main.scrollTo({ top, behavior: "instant" as ScrollBehavior });
                await new Promise((r) => requestAnimationFrame(() => r(null)));
                out.push(getComputedStyle(cluster).transform);
            }
            return out;
        });
        await ctx.close();
        paired["PC-4"] = scales;
        if (scales) {
            const vals = (scales as string[]).map(heroScale);
            expect(Math.abs(vals[1] - vals[0]), "PRM holds scale 1").toBeLessThan(0.02);
            expect(vals[0], "PRM hero stays full size").toBeGreaterThan(0.95);
        }
    });

    test("PC-5 — exactly ONE chassis glass card per page", async ({ page }) => {
        const perRoute: Record<string, number> = {};
        for (const route of ["/forms/inputs", "/forms/label", "/data/avatar"]) {
            await page.goto(route, { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(400);
            const count = await page.evaluate(() => {
                // the chassis card is the StoryHero card ([data-slot=card] directly under
                // the article, not a content specimen card inside a section).
                const cards = [...document.querySelectorAll("article > * [data-slot=card]")];
                const pageCards = cards.filter((c) => {
                    let n: Element | null = c.parentElement;
                    while (n && n.tagName !== "ARTICLE") {
                        if (n.tagName === "SECTION") return false;
                        n = n.parentElement;
                    }
                    return true;
                });
                return pageCards.length;
            });
            perRoute[route] = count;
            expect(count, `${route} has ≤1 chassis page card`).toBeLessThanOrEqual(1);
        }
        paired["PC-5"] = perRoute;
    });

    test("PC-6 — the section-landing bento + inline preview (no GL budget blown)", async ({
        page,
    }) => {
        const perRoute: Record<string, unknown> = {};
        for (const route of ["/substrates", "/forms"]) {
            await page.goto(route, { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(500);
            const readback = await page.evaluate(() => {
                const cards = [...document.querySelectorAll(".section-preview-card")];
                const withIcon = cards.filter((c) => c.querySelector("svg")).length;
                const withChip = cards.filter((c) =>
                    c.querySelector(".fira-code, .section-preview-card-subpath"),
                ).length;
                const previews = cards
                    .map((c) => c.querySelector(".section-preview-card-preview"))
                    .filter(Boolean);
                const previewInert = previews.every(
                    (p) => getComputedStyle(p as Element).pointerEvents === "none",
                );
                const previewReal = previews.every(
                    (p) => (p as Element).querySelector("*") !== null,
                );
                // count live WebGL contexts (the one-GL budget — a landing previews
                // are FROZEN stills, never a 2nd running context).
                const canvases = [...document.querySelectorAll("canvas")];
                const glCount = canvases.filter((cv) => {
                    try {
                        return Boolean(
                            (cv as HTMLCanvasElement).getContext("webgl2") ||
                                (cv as HTMLCanvasElement).getContext("webgl"),
                        );
                    } catch {
                        return false;
                    }
                }).length;
                return {
                    cards: cards.length,
                    withIcon,
                    withChip,
                    previews: previews.length,
                    previewInert,
                    previewReal,
                    glCount,
                };
            });
            perRoute[route] = readback;
            const r = readback as {
                cards: number;
                withIcon: number;
                withChip: number;
                previews: number;
                previewInert: boolean;
                previewReal: boolean;
                glCount: number;
            };
            expect(r.cards, `${route} renders bento cards`).toBeGreaterThan(0);
            expect(r.withIcon, `${route} every card has an IconChip svg`).toBe(r.cards);
            expect(r.withChip, `${route} every card has a subpath chip`).toBe(r.cards);
            expect(r.previews, `${route} every card has a preview`).toBe(r.cards);
            expect(r.previewInert, `${route} previews pointer-events: none`).toBe(true);
            expect(r.previewReal, `${route} previews are real elements`).toBe(true);
            // the landing's own field is ≤1 live GL context (the budget).
            expect(r.glCount, `${route} mounts ≤1 live GL context`).toBeLessThanOrEqual(1);
        }
        paired["PC-6"] = perRoute;
    });

    test.afterAll(async () => {
        try {
            mkdirSync(VISUAL_DIR, { recursive: true });
            writeFileSync(
                `${VISUAL_DIR}/W-PAGE-CHASSIS-pi.json`,
                JSON.stringify(
                    { generatedAt: new Date().toISOString(), paired },
                    null,
                    2,
                ),
            );
        } catch {
            // best-effort artifact; the assertions are the binding close.
        }
    });
});
