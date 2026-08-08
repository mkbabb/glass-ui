import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// BK #59 W-LAYOUT — the static half of the four LAYOUT seats.
//
// SEATS (TR §B.5 LAYOUT family, 4 — this file MINTS NOTHING and BINDS NOTHING;
// the register receipt is byte-identical pre and post, and every seat below stays
// ABSENT until #9/#65 wire C-13):
//   G1 no-H-overflow (+G2 occlusion arm +`viewport-fit` arm)
//   G-MEASURE-LAW (≡G3+G4+G5)
//   G6 transposition-singleton
//   G-FORK-CENSUS (≡G7+G8)
//
// WHAT THIS FILE CAN AND CANNOT PROVE, stated rather than blurred. G1's overflow
// matrix, G2's occlusion rects, G4's cel-count matrix and G5's banded `hu` are
// MEASUREMENTS — they need a laid-out page at eight viewports on two engines, which
// is π, which is #10's protocol and #10's browser seat. Those cells are OWED, not
// asserted here. What a source-reading gate can prove is the MECHANISM each of
// those measurements depends on: that the meta switch which makes `env()` resolve
// is present, that the four measures exist with their derivations and are the only
// inline-size caps in the chassis, that exactly one width-conditional spacing block
// exists in the whole demo, and that no JS or duplicated-subtree fork survives. A
// mechanism gate that pretended to be the measurement would be the contrivance this
// tranche keeps striking.
//
// BORN-RED. Every ordinary case below fails on the pre-cut bytes; the RED evidence
// is recorded verbatim in
// `docs/tranches/BK/execution/2026-08-07-row59-layout/RECORD.md` §BORN-RED, derived
// by running each detector against `git show <pre-cut>:<path>`. The three `it.fails`
// cases are the ROUTED residue: they are RED right now, on purpose, and each names
// the row that owns the bytes. When that row lands, the case goes GREEN and the
// `.fails` must come off in the same commit — a residue list that cannot shrink is a
// permission slip.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A missing sheet is a MISSING LAW, not a broken harness. Reading it as empty is
 * what lets each case name the law it could not find; an unguarded `readFileSync`
 * throws at module load and the whole file reports "0 tests", which is the least
 * informative possible answer to "is the layout canon on disk". It is also what
 * makes the born-RED run legible: at the pre-cut bytes `demo/chassis/layout.css`
 * does not exist, and every measure/ladder case has to say so out loud.
 */
const read = (rel: string): string => {
    try {
        return readFileSync(join(process.cwd(), rel), "utf8");
    } catch {
        return "";
    }
};

/** Comments are prose, not code: a detector that counts them is counting itself. */
const strip = (src: string): string =>
    src
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");

function walk(dir: string, out: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
        const abs = join(dir, entry);
        if (statSync(abs).isDirectory()) walk(abs, out);
        else if (/\.(vue|ts|css)$/.test(entry)) out.push(abs);
    }
    return out;
}

const DEMO_FILES = walk(join(process.cwd(), "demo")).map((abs) =>
    abs.slice(process.cwd().length + 1),
);
const CHASSIS = DEMO_FILES.filter(
    (f) => f.startsWith("demo/chassis/") || f.startsWith("demo/shell/"),
);

const layout = read("demo/chassis/layout.css");
const dockNav = read("demo/shell/dock-nav.css");
const shell = read("demo/shell/AppShell.vue");
const storyPage = read("demo/chassis/page/StoryPage.vue");
const html = read("index.html");

/** Value of a `--token: …;` declaration, comments stripped. */
const decl = (css: string, token: string): string | undefined => {
    const m = strip(css).match(new RegExp(`${token}\\s*:\\s*([^;]+);`));
    return m ? m[1].replace(/\s+/g, " ").trim() : undefined;
};

/** rem → px at the 16px root the whole spec derives against. */
const rem = (value: string): number => Number.parseFloat(value) * 16;

// ── G1 · the `viewport-fit` arm ──────────────────────────────────────────────
describe("G1 no-H-overflow — the `viewport-fit` arm (BK #59)", () => {
    it("the viewport meta carries `viewport-fit=cover`, so `env(safe-area-*)` is not inert", () => {
        const meta = strip(html).match(/<meta\s+name="viewport"[\s\S]*?\/>/)?.[0];
        expect(meta, "index.html declares a viewport meta").toBeDefined();
        expect(meta).toContain("viewport-fit=cover");
    });

    it("the route scroller pays the safe area through `max(rung, env(...))`, not a bare rung", () => {
        const scroller = strip(dockNav).match(
            /^\.demo-main-scroller\s*\{([\s\S]*?)\n\}/m,
        )?.[1];
        expect(scroller, "dock-nav.css declares .demo-main-scroller").toBeDefined();
        expect(scroller).toMatch(/padding-inline:[\s\S]*?max\(/);
        expect(scroller).toContain("env(safe-area-inset-left, 0px)");
        expect(scroller).toContain("env(safe-area-inset-right, 0px)");
    });

    it("no `sm:col-span-2` survives — a 2-track span on a 1-track grid is the overflow", () => {
        const offenders = CHASSIS.filter((f) => /:col-span-/.test(strip(read(f))));
        expect(offenders).toEqual([]);
    });
});

// ── G1's G2 occlusion arm (the structural half; the rects are π) ─────────────
describe("G1 → G2 occlusion arm — the shell grid (BK #59)", () => {
    it("the shell is a two-by-two grid measured in `dvh`, not a `100vh` flex stack", () => {
        const rule = strip(dockNav).match(/\.demo-app-shell\s*\{([\s\S]*?)\n\}/)?.[1];
        expect(rule, "dock-nav.css declares .demo-app-shell").toBeDefined();
        expect(rule).toContain("display: grid");
        expect(rule).toContain("block-size: 100dvh");
        expect(rule).toMatch(/grid-template-areas:\s*\n?\s*"rail main"\s*\n?\s*"rail dock"/);
        // `vh` measures the LARGEST viewport: with a dynamic mobile toolbar showing,
        // a `100vh` shell is taller than the screen and the dock row falls off it.
        expect(rule).not.toContain("100vh");
    });

    it("`h-screen` and the flex-column wrapper are gone from the shell", () => {
        expect(strip(shell)).not.toContain("h-screen");
        expect(strip(shell)).not.toContain("flex-1 flex-col");
    });

    it("the three shell regions are seated by grid area — no region is positioned twice", () => {
        for (const [selector, area] of [
            [".demo-sidebar-rail", "rail"],
            [".demo-main-scroller", "main"],
            [".demo-bottom-dock", "dock"],
        ] as const) {
            const rule = strip(dockNav).match(
                new RegExp(`^\\${selector}\\s*\\{([\\s\\S]*?)\\n\\}`, "m"),
            )?.[1];
            expect(rule, `${selector} is declared`).toBeDefined();
            expect(rule).toContain(`grid-area: ${area}`);
        }
    });

    it("`scroll-padding-block-start` is gone — an in-flow dock row has nothing to reserve against", () => {
        expect(strip(dockNav)).not.toContain("scroll-padding-block-start");
        // The INLINE reserve survives: its doc-record ties it to the rail's transient
        // hover fan, and the §9 fan-open probe that would retire it is OWED (#10).
        expect(strip(dockNav)).toContain("scroll-padding-inline-start");
    });
});

// ── G-MEASURE-LAW (≡ G3 + G4 + G5), the static half ─────────────────────────
describe("G-MEASURE-LAW — the four measures (BK #59)", () => {
    const MEASURES = {
        "--measure-prose": "66ch",
        "--measure-cel": "21rem",
        "--measure-wide": "34rem",
        "--article-max": "96rem",
    } as const;

    it("all four measures are declared, once, in the one layout sheet", () => {
        for (const [token, value] of Object.entries(MEASURES)) {
            expect(decl(layout, token), token).toBe(value);
            const declarations = strip(layout).match(
                new RegExp(`${token}\\s*:`, "g"),
            )?.length;
            expect(declarations, `${token} is declared exactly once`).toBe(1);
        }
        const elsewhere = DEMO_FILES.filter(
            (f) =>
                f !== "demo/chassis/layout.css" &&
                Object.keys(MEASURES).some((t) =>
                    new RegExp(`${t}\\s*:`).test(strip(read(f))),
                ),
        );
        expect(elsewhere, "no second definition of a measure").toEqual([]);
    });

    it("`--article-max` IS 2× the 48rem seat threshold, and sits in the 4-up band", () => {
        // Derived, not chosen: content stops growing at twice the width where nav
        // earns a rail. The band check is the constraint that made 96rem survivable —
        // [4c+3g, 5c+4g) with c = --measure-cel and g = --sp-4's desktop rung.
        const seat = 48;
        const cel = Number.parseFloat(MEASURES["--measure-cel"]);
        const gap = Number.parseFloat(decl(layout, "--sp-4")!);
        expect(Number.parseFloat(MEASURES["--article-max"])).toBe(2 * seat);
        const lower = 4 * cel + 3 * gap;
        const upper = 5 * cel + 4 * gap;
        expect(2 * seat).toBeGreaterThanOrEqual(lower);
        expect(2 * seat).toBeLessThan(upper);
    });

    it("`--measure-cel` stays ≥2-up at the binding 852×393 landscape census cell", () => {
        // rail 88 + scroller gutters 2×--sp-5 = 700px of main; two cels plus one gap
        // must fit inside it. This is the arithmetic that falsified 22rem.
        const main = 852 - 88 - 2 * rem(decl(layout, "--sp-5")!);
        const cel = rem(MEASURES["--measure-cel"]);
        const gap = rem(decl(layout, "--sp-4")!);
        expect(2 * cel + gap).toBeLessThanOrEqual(main);
    });

    it("the cel field self-packs — auto-fit tracks, never a counted column", () => {
        const field = strip(layout).match(
            /\.story-cels,[\s\S]*?\{([\s\S]*?)\n\}/,
        )?.[1];
        expect(field, "layout.css declares the cel field").toBeDefined();
        expect(field).toContain("display: grid");
        expect(field).toContain(
            "repeat(auto-fit, minmax(min(var(--measure-cel), 100%), 1fr))",
        );
        // `min(X, 100%)` is the whole trap: without it the track overflows a
        // container narrower than one cel, which is every phone.
    });

    it("the article law caps the THING and the prose rule caps the LINE", () => {
        expect(strip(layout)).toMatch(
            /\.story-article,\s*\n\.optical-bench\s*\{[\s\S]*?max-inline-size: var\(--article-max\)/,
        );
        expect(strip(layout)).toMatch(
            /\.story-article :where\(p\)\s*\{[\s\S]*?max-inline-size: var\(--measure-prose\)/,
        );
    });

    it("StoryPage caps nothing inline — an inline style is a width no sheet can reach", () => {
        expect(strip(storyPage)).not.toContain("maxInlineSize");
        expect(strip(storyPage)).not.toContain("--story-article-w");
        expect(strip(storyPage)).not.toContain("--story-page-max-inline");
        expect(strip(storyPage)).not.toContain("--story-page-section-gap");
        expect(strip(storyPage)).not.toMatch(/story-cels[^"]*flex/);
        expect(strip(storyPage)).not.toMatch(/story-sections[^"]*flex/);
    });

    it("no chassis file caps an inline size with a Tailwind width literal", () => {
        // `max-w-6xl` ×2 and `max-w-2xl`/`max-w-sm` were four more widths in a demo
        // whose only legal widths are the four measures.
        const OVERLAY_EXEMPT = [
            "demo/shell/AppShell.vue",
            "demo/shell/configurator/PresetEditor.vue",
        ];
        const offenders = CHASSIS.filter((f) => !OVERLAY_EXEMPT.includes(f)).flatMap((f) => {
            const hits =
                strip(read(f)).match(/max-w-(?!\(--)[a-z0-9]+(?:xl)?\b/g) ?? [];
            return hits.map((h) => `${f}: ${h}`);
        }).filter((h) => !/max-w-prose|max-w-fit|max-w-full|max-w-none/.test(h));
        expect(offenders).toEqual([]);
    });
});

// ── G6 transposition singleton ──────────────────────────────────────────────
describe("G6 transposition-singleton — one ladder, one arm (BK #59)", () => {
    it("the six rungs are declared on `:root`, where a teleported overlay can see them", () => {
        // Not on `.demo-app-shell`: Sheet/Dialog/Toaster portal to <body>, outside
        // the shell, and a ladder an overlay cannot see is a second silent ladder.
        const root = strip(layout).match(/^:root\s*\{([\s\S]*?)\n\}/m)?.[1];
        expect(root, "layout.css declares :root").toBeDefined();
        for (const rung of ["--sp-1", "--sp-2", "--sp-3", "--sp-4", "--sp-5", "--sp-6"]) {
            expect(root, rung).toContain(`${rung}:`);
        }
    });

    it("the ladder steps DOWN and only down — the mobile arm is never a promotion", () => {
        const arm = strip(layout).match(
            /@media \(width <= 768px\)\s*\{([\s\S]*?)\n\s*\}\n\}/,
        )?.[1];
        expect(arm, "the one transposition arm exists").toBeDefined();
        for (const rung of ["--sp-2", "--sp-3", "--sp-4", "--sp-5", "--sp-6"]) {
            const base = rem(decl(layout, rung)!);
            const mobile = rem(arm!.match(new RegExp(`${rung}\\s*:\\s*([^;]+);`))![1]);
            expect(mobile, `${rung} steps down`).toBeLessThan(base);
        }
        // `--sp-1` is deliberately absent from the arm: a hairline is a hairline.
        expect(arm).not.toContain("--sp-1");
    });

    it("EXACTLY ONE width-conditional spacing block exists in the whole demo", () => {
        const blocks = DEMO_FILES.flatMap((file) => {
            const src = strip(read(file));
            const media =
                src.match(/@media[^{]*\((?:min-width|max-width|width)[^{]*\{[\s\S]*?\n\}/g) ??
                [];
            return media
                .filter((block) => /--sp-[1-6]\s*:/.test(block))
                .map(() => file);
        });
        expect(blocks).toEqual(["demo/chassis/layout.css"]);
    });

    it("the chassis pad and gap maps read rungs, not the off-series Tailwind scale", () => {
        // `p-4`/`p-6`/`p-10` and `gap-6` sat on none of the six rungs AND, being
        // static utilities, never transposed: a frame kept desktop padding on a
        // 390px phone while the page around it stepped down.
        for (const file of [
            "demo/chassis/showcase/ShowcaseFrame.vue",
            "demo/chassis/section/StorySection.vue",
        ]) {
            const src = strip(read(file));
            expect(src, `${file} reads rungs`).toMatch(/-\(--sp-[1-6]\)/);
            expect(src, `${file} has no numeric pad/gap utility`).not.toMatch(
                /["'\s](?:p|gap)-(?!0\b)\d/,
            );
        }
    });
});

// ── G-FORK-CENSUS (≡ G7 + G8) ───────────────────────────────────────────────
describe("G-FORK-CENSUS — the seat law and the fork rubric (BK #59)", () => {
    it("the rail seat is orientation-keyed with a STRICT width term", () => {
        // Width alone cannot separate 810 (tablet portrait, wants the field) from
        // 852 (landscape phone, wants the rail) — they are 42px apart and want
        // opposite answers. `>` not `>=`: at exactly 768px an inclusive arm handed
        // the viewport a rail AND the mobile ladder rungs in the same frame.
        expect(strip(dockNav)).toContain(
            "@media (width > 48rem) and (orientation: landscape)",
        );
        expect(strip(dockNav)).not.toMatch(/@media \(min-width: 48rem\)/);
        const rail = strip(dockNav).match(/\.demo-sidebar-rail\s*\{([\s\S]*?)\n\}/)?.[1];
        expect(rail, "the rail's BASE arm is off — portrait has no rail").toContain(
            "display: none",
        );
    });

    it("the dock sheds on the short-wide cell, where it costs 18% of the scarce axis", () => {
        expect(strip(dockNav)).toContain(
            "@media (width > 48rem) and (orientation: landscape) and (height <= 30rem)",
        );
    });

    it("the demo's height thresholds are exactly one numeral: 30rem", () => {
        const heights = new Set(
            DEMO_FILES.flatMap(
                (f) =>
                    [
                        ...strip(read(f)).matchAll(
                            /\((?:min-height|max-height|height)\s*[<>=:]*\s*([\d.]+(?:rem|px))\s*\)/g,
                        ),
                    ].map((m) => m[1]),
            ),
        );
        expect([...heights].sort()).toEqual(["30rem"]);
    });

    it("no duplicated DOM tree survives — the family switcher is ONE control", () => {
        // `responsive` swapped the mounted strip for a <Select> below a width: a
        // second subtree for one control, and a different interaction model besides.
        const offenders = DEMO_FILES.filter((f) =>
            /<SegmentedTabs[\s\S]*?\sresponsive[\s\n>]/.test(strip(read(f))),
        );
        expect(offenders).toEqual([]);
    });

    it("the chassis and the shell carry ZERO viewport-keyed Tailwind variants", () => {
        // The overlay class is exempt by enumeration and by mechanism — a portaled
        // Sheet's container IS the viewport, so a viewport variant on it is not a
        // fork. It is listed here so the exemption is a decision, not a hole.
        const OVERLAY_EXEMPT = ["demo/shell/configurator/PresetEditor.vue"];
        const offenders = CHASSIS.filter(
            (f) =>
                !OVERLAY_EXEMPT.includes(f) &&
                /(?<![\w:-])(sm|md|lg|xl|2xl):[a-zA-Z0-9:[\]/._()-]+/.test(strip(read(f))),
        );
        expect(offenders).toEqual([]);
    });
});

// ── ROUTED RESIDUE — born-RED, each with the row that owns the bytes ────────
describe("BK #59 routed residue — RED until its owner lands", () => {
    it.fails(
        "kill #7: demo/stories carries ZERO viewport-keyed variants (75 hits / 35 files at this cut)",
        () => {
            // The per-site triage (T-B10: field-replaceable → cel field; deliberate
            // arity → explicit tracks under `@container`) is ORDERED AFTER this cut,
            // not deferred by preference: an arm-inverted `@container` re-key needs
            // the container, and `StorySection`'s `container: cel / inline-size` is
            // a byte this commit creates. Owner: #59's own remaining half.
            const offenders = DEMO_FILES.filter(
                (f) =>
                    f.startsWith("demo/stories/") &&
                    /(?<![\w:-])(sm|md|lg|xl|2xl):[a-zA-Z0-9:[\]/._()-]+/.test(
                        strip(read(f)),
                    ),
            );
            expect(offenders).toEqual([]);
        },
    );

    it.fails("kill #10: no width-keyed `matchMedia` survives in the demo", () => {
        // ONE site: `demo/stories/containers/configurator.vue` — the studio fork's
        // `matchMedia("(max-width: 720px)")` → prop plumbing, which the container
        // must replace by SETTING `--configurator-size` for the shipped
        // `@container style(--configurator-size)` contract to consume. The file
        // carries another lane's uncommitted bytes at this cut, so it is not this
        // seat's to touch. Owner: #59 kill #10/#14, behind that lane's commit.
        const offenders = DEMO_FILES.filter((f) =>
            /matchMedia\(\s*["'`]\([^"'`]*width/.test(strip(read(f))),
        );
        expect(offenders).toEqual([]);
    });

    it.fails("kill #15: no raw `vh` envelope survives in the demo", () => {
        // FOUR of seven landed on `--stage-block` in this cut (VizStudio's default,
        // aurora, springs, NotFound). The three left — blob, fourier-field,
        // configurator — sit in files carrying another lane's uncommitted bytes.
        // Owner: #59 kill #15, behind those lanes' commits.
        const offenders = DEMO_FILES.filter((f) => /\d+vh\b/.test(strip(read(f))));
        expect(offenders).toEqual([]);
    });
});
