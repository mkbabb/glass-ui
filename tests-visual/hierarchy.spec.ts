// AZ.W-HIERARCHY — hierarchy.spec.ts, the π getComputedStyle readback of the
// canonical section-heading rung + the Configurator hierarchy vocabulary (the
// BINDING close criterion; G2).
//
// The fleet's D1 hierarchy set (D1-1..D1-10) + D6-3: story <h2>s were hand-rolled
// across three incompatible rungs (the canonical `text-subheading`, a below-body
// `text-sm font-semibold text-muted-foreground` caption, and a page-title-dup
// `text-heading`), and the Configurator column read flat. THE DEVICE-FREE SOURCE
// GATE (proof-hierarchy.mjs) proves the STRUCTURE — the canonical register is the
// only section rung in the enrolled set + the three vocabulary tokens are declared
// and consumed. THIS SPEC PROVES THE RENDER, the bite the source arm cannot give:
// an implementer could re-roll a fourth off-canon class (`text-[14px] …`) and green
// the source arm while the same below-body caption defect lives — only the resolved
// `getComputedStyle` font-size (20.4px, NOT 14/25.9) binds it, and it walks EVERY
// migrated route.
//
// It asserts:
//   H1 — every SECTION <h2> across the worst-offender routes resolves to
//        --type-subheading (20.4px) NOT 14px and NOT 25.9px (the uniform canonical
//        rung). "Section <h2>" = a section-organizing heading — NOT an <h2> nested
//        inside a Card specimen (e.g. the veil hero card's own heading), which is a
//        content heading, not a section organizer.
//   H2 — no child <h3> resolves LARGER than its parent section <h2> (the D1-2
//        inverted-scale guard).
//   H3 — the Configurator section label (.configurator-section-label) resolves
//        ABOVE the control-row body label rung (the D6-3 register differentiation),
//        AND the preset row's resolved block-padding resolves ABOVE a body
//        ConfiguratorRow's (the D6-3 "preset row tight" defect-alive guard — the
//        resolved spacing must INCREASE, not merely the token be present).
//
// THE BINDING ASSERTION IS THE RESOLVED-SIZE READBACK. It loads :5199 →
// auto-detected LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips,
// backstopped by proof:live-verified-ledger over the W-HIERARCHY DELTA.

import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/AZ/audit/visual", import.meta.url),
);

// The canonical section rung — --type-subheading = 1.272rem = 20.4px (√φ). The
// two OFF-canon rungs the migration killed: 14px (text-sm below-body caption)
// and 25.9px (text-heading page-title dup).
const SUBHEADING_PX = 20.4;
const TOL = 0.6; // sub-pixel rounding band

// The worst-offender routes the gate + π walk (the demo File Bounds set).
const ROUTES = [
    "/dock/overview",
    "/dock/layers",
    "/navigation/tabs",
    "/display/card",
    "/data/data-table",
];

const paired: Record<string, unknown> = {};

test.describe("AZ.W-HIERARCHY — the canonical section rung + Configurator vocabulary (π)", () => {
    test("H1+H2 — every section <h2> resolves to 20.4px; no child <h3> > parent <h2>", async ({
        page,
    }) => {
        const perRoute: Record<string, unknown> = {};
        for (const route of ROUTES) {
            await page.goto(route, { waitUntil: "domcontentloaded" });
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(500);

            const readback = await page.evaluate(() => {
                const px = (v: string) => Math.round(parseFloat(v) * 100) / 100;
                // A SECTION <h2> organizes a <section> block. A CONTENT <h2> lives
                // inside a Card SPECIMEN (the veil hero card's own heading, a
                // configurator stage heading). The page body itself sits inside the
                // StoryHero PAGE CARD ([data-slot=card] wrapping the whole article
                // body), so "any card ancestor" over-filters — every section sits in
                // the page card. The right discriminator: walk up to the FIRST
                // ancestor matching `section` OR an INNER `[data-slot=card]` (a card
                // that is itself inside a <section> — i.e. a content specimen, not the
                // page shell). If that first organizer is a <section>, it is a section
                // heading; if it is a content card, it is excluded.
                const isSectionHeading = (el: Element): boolean => {
                    let n: Element | null = el.parentElement;
                    while (n && n.tagName !== "ARTICLE") {
                        if (n.tagName === "SECTION") return true;
                        // an INNER content card: a card whose own ancestor chain hits a
                        // <section> before the <article> (excludes the StoryHero page card).
                        if (n.matches("[data-slot=card],[data-slot=configurator]")) {
                            let p: Element | null = n.parentElement;
                            while (p && p.tagName !== "ARTICLE") {
                                if (p.tagName === "SECTION") return false; // content card inside a section
                                p = p.parentElement;
                            }
                            // card directly under article (the page shell) — keep walking
                            // up past it to find the organizing <section>.
                        }
                        n = n.parentElement;
                    }
                    return false;
                };
                const sectionH2 = [...document.querySelectorAll("article h2")].filter(
                    (h) => isSectionHeading(h),
                );
                const h2s = sectionH2.map((h) => ({
                    t: (h.textContent || "").trim().slice(0, 32),
                    fs: px(getComputedStyle(h).fontSize),
                    fw: getComputedStyle(h).fontWeight,
                }));
                // child <h3> vs nearest preceding/containing section <h2>: for the
                // inverted-scale guard, take the max <h3> font-size and compare to the
                // min section-<h2> font-size (if any child outweighs ANY parent it reds).
                const h3s = [...document.querySelectorAll("article h3")].map((h) => ({
                    t: (h.textContent || "").trim().slice(0, 24),
                    fs: px(getComputedStyle(h).fontSize),
                    fw: getComputedStyle(h).fontWeight,
                }));
                return { h2s, h3s };
            });

            perRoute[route] = readback;

            const h2s = readback.h2s as { t: string; fs: number; fw: string }[];
            const h3s = readback.h3s as { t: string; fs: number; fw: string }[];

            // H1 — every section <h2> resolves to the canonical 20.4px rung.
            expect(h2s.length, `${route} has section <h2>s`).toBeGreaterThan(0);
            for (const h of h2s) {
                expect(
                    Math.abs(h.fs - SUBHEADING_PX),
                    `${route} section <h2> "${h.t}" resolves ${h.fs}px — must be the canonical ${SUBHEADING_PX}px (not 14px caption / 25.9px page-title dup)`,
                ).toBeLessThanOrEqual(TOL);
            }

            // H2 — no child <h3> resolves LARGER than the smallest section <h2>.
            if (h3s.length > 0) {
                const minH2 = Math.min(...h2s.map((h) => h.fs));
                const maxH3 = Math.max(...h3s.map((h) => h.fs));
                expect(
                    maxH3,
                    `${route} largest child <h3> (${maxH3}px) must NOT exceed the smallest section <h2> (${minH2}px) — D1-2 inverted-scale guard`,
                ).toBeLessThanOrEqual(minH2 + TOL);
            }
        }
        paired.routes = perRoute;
        mkdirSync(VISUAL_DIR, { recursive: true });
    });

    test("H3 — Configurator section label > row label; preset-row block-padding > body-row's", async ({
        page,
    }) => {
        await page.goto("/containers/configurator", {
            waitUntil: "domcontentloaded",
        });
        await page
            .waitForSelector("[data-slot=configurator]", { timeout: 8000 })
            .catch(() => {});
        await page.waitForTimeout(700);

        const cfg = await page.evaluate(() => {
            const px = (v: string | undefined) =>
                v == null ? null : Math.round(parseFloat(v) * 100) / 100;
            const sectionLabel = document.querySelector(".configurator-section-label");
            const rowLabel = document.querySelector(
                "[data-slot=configurator-row] label",
            );
            const presets = document.querySelector(".configurator-presets");
            const bodyRow = document.querySelector("[data-slot=configurator-row]");
            const fs = (el: Element | null) =>
                el ? px(getComputedStyle(el).fontSize) : null;
            const padBlock = (el: Element | null) =>
                el
                    ? (px(getComputedStyle(el).paddingTop) ?? 0) +
                      (px(getComputedStyle(el).paddingBottom) ?? 0)
                    : null;
            return {
                sectionLabelFs: fs(sectionLabel),
                rowLabelFs: fs(rowLabel),
                presetsPadBlock: padBlock(presets),
                bodyRowPadBlock: padBlock(bodyRow),
            };
        });

        paired.configurator = cfg;

        // The section label resolves ABOVE the control-row body label rung.
        expect(cfg.sectionLabelFs, "section label resolved").not.toBeNull();
        expect(cfg.rowLabelFs, "row label resolved").not.toBeNull();
        expect(
            cfg.sectionLabelFs!,
            `Configurator section label (${cfg.sectionLabelFs}px) must resolve ABOVE the row body label (${cfg.rowLabelFs}px) — the D6-3 register differentiation`,
        ).toBeGreaterThan(cfg.rowLabelFs! + 1);

        // The preset row's resolved block-padding resolves ABOVE a body ConfiguratorRow's.
        expect(cfg.presetsPadBlock, "preset row padding resolved").not.toBeNull();
        expect(cfg.bodyRowPadBlock, "body row padding resolved").not.toBeNull();
        expect(
            cfg.presetsPadBlock!,
            `the preset row's resolved block-padding (${cfg.presetsPadBlock}px) must resolve ABOVE a body ConfiguratorRow's (${cfg.bodyRowPadBlock}px) — the D6-3 "preset row tight" defect-alive guard (the SPATIAL rhythm increased, not just the token present)`,
        ).toBeGreaterThan(cfg.bodyRowPadBlock! + 0.5);

        writeFileSync(
            `${VISUAL_DIR}/W-HIERARCHY-readback.json`,
            `${JSON.stringify(paired, null, 2)}\n`,
        );
    });
});

// ══════════════════════════════════════════════════════════════════════════════
// BB.W-HIERARCHY2 — the StoryHeader cluster reading-order + the GRAVITY entrance +
// the content-side gutter (the BINDING π readback; LOCAL-ONLY, real-render dev-box,
// backstopped on CI by proof:live-verified-ledger).
// ══════════════════════════════════════════════════════════════════════════════

const BB_VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual", import.meta.url),
);

// The substrate hero pages that route through the <StoryPage> chassis (so they wear
// the re-homed StoryHeader cluster) — the inversion baselines. Each renders the
// ordered cluster eyebrow → title → blurb. NOTE (W-HIERARCHY2 §0 RE-GROUND drift):
// `/substrates/aurora` is a BESPOKE studio page that hand-authors its OWN layout (it
// does NOT compose <StoryPage>), so the chassis cluster does not apply there; the
// three StoryPage-using substrate heroes (glass-material / constellation /
// fourier-field) are the cluster surfaces. The aurora studio's own header is its
// bespoke craft (the :hero-title="false"-class front-door pattern).
const HERO_ROUTES = [
    "/substrates/glass-material",
    "/substrates/constellation",
    "/substrates/fourier-field",
];

const bbPaired: Record<string, unknown> = {};

test.describe("BB.W-HIERARCHY2 — the StoryHeader cluster (reading order + GRAVITY entrance + gutter) (π)", () => {
    test("H2-ORDER — the cluster renders eyebrow→title→blurb top-to-bottom, one dominant focal", async ({
        page,
    }) => {
        const perRoute: Record<string, unknown> = {};
        for (const route of HERO_ROUTES) {
            await page.goto(route, { waitUntil: "domcontentloaded" });
            await page
                .waitForSelector(".story-header-cluster", { timeout: 8000 })
                .catch(() => {});
            await page.waitForTimeout(900); // let the 3-stage entrance settle

            const r = await page.evaluate(() => {
                const cluster = document.querySelector(".story-header-cluster");
                if (!cluster) return null;
                const eyebrow = cluster.querySelector(".story-header-eyebrow");
                const h1 = cluster.querySelector("h1");
                const blurb = cluster.querySelector(".story-header-blurb");
                const top = (el: Element | null) =>
                    el ? Math.round(el.getBoundingClientRect().top * 10) / 10 : null;
                const fs = (el: Element | null) =>
                    el
                        ? Math.round(parseFloat(getComputedStyle(el).fontSize) * 10) / 10
                        : null;
                // The dominant focal — the display <h1> the largest type mass in the
                // band (vs the eyebrow + blurb).
                const h1Fs = fs(h1) ?? 0;
                const eyebrowFs = fs(eyebrow) ?? 0;
                const blurbFs = fs(blurb) ?? 0;
                return {
                    eyebrowTop: top(eyebrow),
                    h1Top: top(h1),
                    blurbTop: top(blurb),
                    h1Fs,
                    eyebrowFs,
                    blurbFs,
                    h1DominatesEyebrow: h1Fs > eyebrowFs,
                    h1DominatesBlurb: h1Fs > blurbFs,
                };
            });

            perRoute[route] = r;
            expect(r, `${route} has a .story-header-cluster`).not.toBeNull();
            const rr = r as {
                eyebrowTop: number | null;
                h1Top: number | null;
                blurbTop: number | null;
                h1DominatesEyebrow: boolean;
                h1DominatesBlurb: boolean;
            };
            // The baseline order: eyebrow.top < h1.top < blurb.top (reading order).
            if (rr.eyebrowTop != null && rr.h1Top != null) {
                expect(
                    rr.eyebrowTop,
                    `${route} eyebrow.top (${rr.eyebrowTop}) must be ABOVE the title h1.top (${rr.h1Top}) — A4-INVERSION (descriptor never above the name)`,
                ).toBeLessThan(rr.h1Top);
            }
            if (rr.h1Top != null && rr.blurbTop != null) {
                expect(
                    rr.h1Top,
                    `${route} title h1.top (${rr.h1Top}) must be ABOVE the blurb.top (${rr.blurbTop}) — the blurb is the subordinate rung UNDER the title`,
                ).toBeLessThan(rr.blurbTop);
            }
            // The single dominant focal — the display <h1> is the largest type mass.
            expect(
                rr.h1DominatesEyebrow && rr.h1DominatesBlurb,
                `${route} the display <h1> must be the single dominant focal (largest type mass) over the eyebrow + blurb`,
            ).toBe(true);
        }
        bbPaired.order = perRoute;
        mkdirSync(BB_VISUAL_DIR, { recursive: true });
    });

    test("H2-GRAVITY — the title arrives NO-overshoot (translateY monotone to 0, never past)", async ({
        page,
    }) => {
        // Capture the title's translateY across the entrance frame-series; assert it
        // is monotone-decreasing toward 0 and NEVER negative (the no-overshoot floor —
        // a --spring leaked onto the audacious title would push translateY past 0).
        await page.goto("/substrates/glass-material", { waitUntil: "domcontentloaded" });
        const frames = await page.evaluate(async () => {
            const ty = () => {
                const h1 = document.querySelector(
                    ".story-header-cluster h1.story-hero-title",
                );
                if (!h1) return null;
                const m = new DOMMatrixReadOnly(getComputedStyle(h1).transform);
                return Math.round(m.m42 * 100) / 100; // translateY in px
            };
            const samples: (number | null)[] = [];
            // sample across ~700ms (the 0.62s title clock + the 60ms stage delay).
            for (let i = 0; i < 14; i++) {
                samples.push(ty());
                await new Promise((res) => setTimeout(res, 55));
            }
            return samples;
        });
        bbPaired.titleFrames = frames;
        const nums = frames.filter((v): v is number => v != null);
        // No-overshoot: every sampled translateY ≥ -0.5px (never past 0 toward
        // negative — GRAVITY, not bounce). A spring overshoot would dip below 0.
        for (const v of nums) {
            expect(
                v,
                `title translateY (${v}px) must never overshoot past 0 (≥ -0.5px) — the GRAVITY-not-bounce floor (no --spring on the audacious title)`,
            ).toBeGreaterThanOrEqual(-0.5);
        }
        // It settles to ≈0 by the end (the entrance completes).
        if (nums.length > 0) {
            expect(
                Math.abs(nums[nums.length - 1]),
                "the title settles to translateY ≈ 0 by the end of the entrance",
            ).toBeLessThanOrEqual(1.0);
        }
    });

    test("H2-PRM — under reduce the cluster paints its static terminal (no rise)", async ({
        page,
    }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto("/substrates/glass-material", { waitUntil: "domcontentloaded" });
        await page
            .waitForSelector(".story-header-cluster h1.story-hero-title", {
                timeout: 8000,
            })
            .catch(() => {});
        await page.waitForTimeout(200);
        const prm = await page.evaluate(() => {
            const h1 = document.querySelector(
                ".story-header-cluster h1.story-hero-title",
            );
            const eyebrow = document.querySelector(".story-header-eyebrow");
            const readTy = (el: Element | null) => {
                if (!el) return null;
                const t = getComputedStyle(el).transform;
                if (t === "none") return 0;
                const m = new DOMMatrixReadOnly(t);
                return Math.round(m.m42 * 100) / 100;
            };
            const opacity = (el: Element | null) =>
                el ? Math.round(parseFloat(getComputedStyle(el).opacity) * 100) / 100 : null;
            return {
                h1Ty: readTy(h1),
                h1Opacity: opacity(h1),
                eyebrowOpacity: opacity(eyebrow),
            };
        });
        bbPaired.prm = prm;
        await page.emulateMedia({ reducedMotion: null });
        // Static terminal: translateY 0 (no rise), opacity 1 (fully painted).
        if (prm.h1Ty != null) {
            expect(
                Math.abs(prm.h1Ty),
                `under reduce the title sits at its terminal translateY ≈ 0 (got ${prm.h1Ty}px) — no rise, no in-between frames`,
            ).toBeLessThanOrEqual(0.5);
        }
        if (prm.h1Opacity != null) {
            expect(
                prm.h1Opacity,
                "under reduce the cluster paints at full opacity (the static terminal)",
            ).toBeGreaterThanOrEqual(0.95);
        }
    });

    test("H2-GUTTER — the <main> reserves the --dock-content-safe-inset gutter", async ({
        page,
    }) => {
        await page.goto("/substrates/glass-material", { waitUntil: "domcontentloaded" });
        await page.waitForSelector(".demo-main-scroller", { timeout: 8000 }).catch(() => {});
        await page.waitForTimeout(300);
        const gutter = await page.evaluate(() => {
            const main = document.querySelector(".demo-main-scroller");
            if (!main) return null;
            const cs = getComputedStyle(main);
            const px = (v: string) => Math.round(parseFloat(v) * 10) / 10;
            return {
                scrollPaddingBlockStart: px(cs.scrollPaddingTop),
                scrollPaddingInlineStart: px(cs.scrollPaddingLeft),
            };
        });
        bbPaired.gutter = gutter;
        writeFileSync(
            `${BB_VISUAL_DIR}/W-HIERARCHY2-readback.json`,
            `${JSON.stringify(bbPaired, null, 2)}\n`,
        );
        expect(gutter, "the .demo-main-scroller content column exists").not.toBeNull();
        const g = gutter as {
            scrollPaddingBlockStart: number;
            scrollPaddingInlineStart: number;
        };
        // The gutter is reserved (non-zero) — the content-side anti-collision gutter.
        expect(
            g.scrollPaddingBlockStart,
            `the <main> reserves a non-zero --dock-content-safe-inset block-start gutter (got ${g.scrollPaddingBlockStart}px)`,
        ).toBeGreaterThan(0);
        expect(
            g.scrollPaddingInlineStart,
            `the <main> reserves a non-zero --dock-content-safe-inset inline-start gutter (got ${g.scrollPaddingInlineStart}px)`,
        ).toBeGreaterThan(0);
    });
});
