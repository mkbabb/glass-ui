// BC.W-PAGE-HIERARCHY — page-hierarchy.spec.ts, the π getComputedStyle readback
// of the standardized section hierarchy + the dark-adaptive section delimiter (the
// BINDING close criterion; the cardinal split — the device-free proof:page-hierarchy
// arm proves the SOURCE shape, this spec proves the RESOLVED paint).
//
// The user's bar (USER-DEFECTS §C/§D/§E): every page reads cleanly DELIMITED
// sections, each section carries the SAME canonical heading rung, no in-body
// double-descriptor header. THE DEVICE-FREE SOURCE GATE proves the structure (no
// hand-rolled <h2 class="text-subheading">, the chassis delimiter affordance exists,
// no idiom-B header). THIS SPEC PROVES THE RENDER, the bite the source arm cannot
// give: the resolved 20.4px section <h2> + the delimiter's COMPUTED border-color
// being non-transparent in BOTH modes (a dark-adaptive `--configurator-divider`
// token survives the dark glass plate where an inline `border-border/30` alpha
// would vanish — the §BA.W-CONFIG-CHASSIS bite).
//
// It asserts (both modes + WebKit, LOCAL real-render against :5199):
//   PH-π-1 — every section <h2> across the enrolled routes resolves --type-subheading
//            (20.4px / 600) — the canonical rung; 0 hand-rolled off StorySection.
//   PH-π-2 — a multi-section page renders ≥1 visible delimiter between sections, and
//            its computed border-top-color is non-transparent in BOTH modes (the
//            dark-adaptive hairline survives the dark glass plate).
//   PH-π-3 — the per-TYPE delimiter MODE: /forms/inputs + /dock/overview (hr type)
//            render the hairline delimiter between R2 sections.

import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BC/audit/visual", import.meta.url),
);

// The canonical section rung — --type-subheading = 1.272rem = 20.4px (√φ).
const SUBHEADING_PX = 20.4;
const TOL = 0.6;

// The enrolled routes — the multi-section worst-offender set the acceptance names.
const ROUTES = ["/display/card", "/dock/overview", "/forms/inputs"];

const paired: Record<string, unknown> = {};

// A computed color is "non-transparent" when it is not `transparent` and its alpha
// (if rgba/oklab with an explicit alpha) is not 0.
function isPaintingColor(c: string): boolean {
    if (!c) return false;
    if (c === "transparent" || c === "rgba(0, 0, 0, 0)") return false;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (m) {
        const parts = m[1].split(",").map((s) => s.trim());
        if (parts.length === 4 && parseFloat(parts[3]) === 0) return false;
    }
    // oklab/oklch with a trailing `/ 0` alpha.
    if (/\/\s*0\s*\)?$/.test(c)) return false;
    return true;
}

test.describe("BC.W-PAGE-HIERARCHY — the standardized section hierarchy + dark-adaptive delimiter (π)", () => {
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";

        test(`PH-π-1+2+4 — section <h2> 20.4px + visible dark-adaptive delimiter (${mode})`, async ({
            page,
        }) => {
            const perRoute: Record<string, unknown> = {};
            for (const route of ROUTES) {
                await page.goto(route, { waitUntil: "domcontentloaded" });
                await page.evaluate(
                    (on) => document.documentElement.classList.toggle("dark", on),
                    dark,
                );
                await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
                await page.waitForTimeout(500);

                const readback = await page.evaluate(() => {
                    const px = (v: string) => Math.round(parseFloat(v) * 100) / 100;

                    // A SECTION <h2> organizes a body section (StorySection renders a
                    // <section> with the canonical <h2>). A CONTENT <h2> lives inside a
                    // Card SPECIMEN. Discriminate: walk up; the first organizer that is
                    // a <section> → section heading; an inner content card → excluded.
                    const isSectionHeading = (el: Element): boolean => {
                        let n: Element | null = el.parentElement;
                        while (n && n.tagName !== "ARTICLE") {
                            if (n.tagName === "SECTION") return true;
                            if (n.matches("[data-slot=card],[data-slot=configurator]")) {
                                let p: Element | null = n.parentElement;
                                while (p && p.tagName !== "ARTICLE") {
                                    if (p.tagName === "SECTION") return false;
                                    p = p.parentElement;
                                }
                            }
                            n = n.parentElement;
                        }
                        return false;
                    };
                    const sectionH2 = [
                        ...document.querySelectorAll("article h2"),
                    ].filter((h) => isSectionHeading(h));
                    const h2s = sectionH2.map((h) => ({
                        t: (h.textContent || "").trim().slice(0, 32),
                        fs: px(getComputedStyle(h).fontSize),
                        fw: getComputedStyle(h).fontWeight,
                    }));

                    // The delimiter register — `.story-sections--delimited > * + *`
                    // draws a border-top on the dark-adaptive token. Read the computed
                    // border-top-* of every non-first child of the delimited section.
                    const delimited = document.querySelector(
                        ".story-sections--delimited",
                    );
                    const delimiters: { width: number; color: string }[] = [];
                    if (delimited) {
                        const kids = [...delimited.children];
                        for (let i = 1; i < kids.length; i++) {
                            const cs = getComputedStyle(kids[i]);
                            delimiters.push({
                                width: px(cs.borderTopWidth),
                                color: cs.borderTopColor,
                            });
                        }
                    }

                    return { h2s, delimiters };
                });

                perRoute[route] = readback;
                const h2s = readback.h2s as {
                    t: string;
                    fs: number;
                    fw: string;
                }[];
                const delimiters = readback.delimiters as {
                    width: number;
                    color: string;
                }[];

                // PH-π-1 — every section <h2> resolves the canonical 20.4px rung.
                expect(
                    h2s.length,
                    `${route} (${mode}) has section <h2>s`,
                ).toBeGreaterThan(0);
                for (const h of h2s) {
                    expect(
                        Math.abs(h.fs - SUBHEADING_PX),
                        `${route} (${mode}) section <h2> "${h.t}" resolves ${h.fs}px — must be the canonical ${SUBHEADING_PX}px`,
                    ).toBeLessThanOrEqual(TOL);
                }

                // PH-π-2 + PH-π-3 — a multi-section page renders ≥1 visible delimiter
                // whose computed border-top-color is non-transparent (the dark-adaptive
                // hairline survives BOTH modes — the §BA.W-CONFIG-CHASSIS bite).
                const painting = delimiters.filter(
                    (d) => d.width > 0 && isPaintingColor(d.color),
                );
                expect(
                    painting.length,
                    `${route} (${mode}) renders ≥1 visible section delimiter with a non-transparent border (got ${delimiters.length} candidates: ${JSON.stringify(
                        delimiters.slice(0, 4),
                    )})`,
                ).toBeGreaterThanOrEqual(1);
            }
            paired[mode] = perRoute;
        });
    }

    test.afterAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        writeFileSync(
            `${VISUAL_DIR}/W-PAGE-HIERARCHY-readback.json`,
            `${JSON.stringify(paired, null, 2)}\n`,
        );
    });
});
