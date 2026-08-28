import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// BK #73 W-SCROLL-SHRINK — the page chrome that shrinks.
//
// SEATS +0. This file MINTS NOTHING and BINDS NOTHING: it files as a close-battery
// row the way #29's route-grammar arms and #59's layout canon do, and
// `node scripts/gate-register.mjs` is byte-identical pre and post.
//
// WHY THE ROW EXISTS. The ≥50-say page edict names five clauses — title, subtitle,
// scroll-to-shrink, glass-card, procedural background — and hid one dead clause
// inside a sentence whose other four had landed. Scroll-to-shrink had ZERO sites;
// the only near-hit in the repo was a COMMENT in the dock's density sheet, which is
// prose, not a site.
//
// WHAT THIS FILE CAN AND CANNOT PROVE. The shrink is a paint: whether the title is
// actually smaller at 400px of scroll, and by how much, is a MEASUREMENT that needs
// a laid-out page in a real engine — that is π, and it is ENQUEUED, not asserted
// here. What a source-reading gate can prove is the MECHANISM the measurement
// depends on: that a real site exists, that it is wired to the machine rather than
// merely wearing its class, that it can stick (a header that scrolls away has
// nothing to shrink), that it restates none of the library's ruled figures, and
// that its weight names a spring row instead of minting a clock. A mechanism gate
// pretending to be the measurement is the contrivance this tranche keeps striking.
//
// BORN-RED. Every case below fails on the pre-cut bytes, and each failure is the
// same one: at `4a86570b` the class `.scroll-chrome` appears in `src/` prose four
// times and in a demo TEMPLATE zero times. The RED evidence is recorded verbatim in
// `docs/tranches/BK/execution/2026-08-10-lanedelta-unit3/RECORD.md` §BORN-RED,
// derived by running each detector against `git show 4a86570b:<path>`.
// ─────────────────────────────────────────────────────────────────────────────

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

const storyPage = read("demo/chassis/page/StoryPage.vue");
const heroSheet = read("demo/chassis/hero/story-hero.css");

/** The body of a CSS rule, comments stripped, or undefined if the rule is absent. */
const rule = (css: string, selector: string): string | undefined =>
    strip(css).match(
        new RegExp(`(?:^|\\n)${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([\\s\\S]*?)\\n\\}`),
    )?.[1];

describe("#73 — the clause has a real site", () => {
    it("the chassis MOUNTS `.scroll-chrome`, on the ordinary story's own header", () => {
        // The born-RED assertion, stated as the wave states it: the recipe existed
        // and nothing wore it. `class="…"` in a template, not a mention in prose.
        const mounted = strip(storyPage).match(/class="[^"]*\bscroll-chrome\b[^"]*"/);
        expect(mounted, "StoryPage mounts the .scroll-chrome recipe").not.toBeNull();
        expect(mounted![0]).toContain("story-page-chrome");
    });

    it("it is the CHASSIS site, so no story is bespoke about it", () => {
        // One site in the chassis is 104 ordinary stories; one site in a story is
        // one story, and the next page is a re-implementation waiting to happen.
        expect(storyPage).toContain("useScrollChrome");
    });
});

describe("#73 — the site is WIRED, not merely dressed", () => {
    const script = strip(storyPage).split("</script>")[0] ?? "";

    it("the machine is opted IN — it is persistent by default and would rest at 0", () => {
        expect(script).toMatch(/useScrollChrome\([\s\S]*?collapseOnScroll:\s*true/);
    });

    it("the machine is handed the chrome element, so the scalar reaches the paint", () => {
        // Without `chromeRef` the composable hands back a ref and writes nothing;
        // the recipe then reads the @property initial value forever — a dead
        // primary wearing a live class.
        expect(script).toMatch(/useScrollChrome\([\s\S]*?chromeRef:\s*chromeEl/);
        expect(script).toMatch(/chromeEl\s*=\s*ref</);
    });

    it("the scroll port is the route scroller, resolved by element and not by class", () => {
        // `.demo-main-scroller` is a shell-private name; `<main>` is the law both
        // the shell and the layout canon already state.
        expect(script).toContain('closest("main")');
        expect(script, "the chassis does not learn a shell-private class").not.toContain(
            "demo-main-scroller",
        );
    });

    it("the consumer restates NONE of the library's ruled collapse figures", () => {
        // ANCHORED ON THE SUBJECT. Every clause below is a NEGATIVE, and a negative
        // read against an absent call site passes for the wrong reason — it was one
        // of the three cases that went green on the pre-cut bytes, which is how the
        // defect was caught. The call site is asserted present first, so "restates
        // nothing" can only mean "the call restates nothing".
        expect(script, "there is a call to restate figures IN").toContain(
            "useScrollChrome(",
        );
        // The collapse range, the snap midpoint, the flip delta and the velocity
        // gate are all decided in the library. A second copy here is a second
        // definition, and it drifts the first time either is retuned.
        for (const option of [
            "collapseRangePx",
            "snapMidpoint",
            "flipDeltaPx",
            "velocityGate",
        ]) {
            expect(script, `${option} stays the library's`).not.toContain(option);
        }
    });
});

describe("#73 — the chrome can actually shrink where it is", () => {
    const chrome = rule(heroSheet, ".story-page-chrome");

    it("the header STICKS — one that scrolls away has nothing to shrink", () => {
        expect(chrome, "the chassis declares .story-page-chrome").toBeDefined();
        expect(chrome).toContain("position: sticky");
        expect(chrome).toContain("inset-block-start: 0");
    });

    it("it stacks on the house `--z-header` rung, never on a local number", () => {
        // A local `z-index: 1` puts the page's OWN chrome under any story ornament
        // sitting on `--z-content` (10) — `motion/scroll.vue`'s sticky progress rail
        // is exactly that, and it would have hairlined across the collapsed title.
        // The scale already names this rung; the chassis reads it.
        expect(chrome).toContain("z-index: var(--z-header)");
        expect(chrome, "no bare z-index literal").not.toMatch(/z-index:\s*\d/);
    });

    it("the origin is re-pointed off the recipe's dock seat", () => {
        // `top center` scales a left-aligned title INWARD, and the drift is what
        // the eye reads instead of the size.
        expect(chrome).toContain("transform-origin: top left");
    });

    it("the page's own h1 never dims — the quiet is retuned to zero, not floored", () => {
        expect(chrome).toMatch(/--chrome-fade-depth:\s*0\s*;/);
    });

    it("the plate rides OPACITY, and never the blur", () => {
        const plate = rule(heroSheet, ".story-page-chrome::before");
        expect(plate, "the chassis declares the plate").toBeDefined();
        expect(plate).toContain("opacity: var(--chrome-collapse-t)");
        // The recipe's crisp-glass fence, held at the consumer: a shrunken bar is
        // crisp glass, not a blurry mess.
        expect(plate).not.toContain("backdrop-filter");
    });

    it("the plate's wash is the PLATE's, with a dark arm that occludes", () => {
        // π band δ, cell δ4-π-3, defect D2. The plate read `--story-paper-wash`, whose
        // dark arm is `--foreground` at 7% — seven per cent of the INK. A film that
        // lifts is not a film that covers, so in dark the content passing beneath
        // stopped reading as a ghost and started cutting through the h1. The paper
        // field's job is to TINT the page and the plate's is to OCCLUDE; they coincide
        // in light only because `--card` and the page are the same near-white there.
        const plate = rule(heroSheet, ".story-page-chrome::before");
        expect(plate).toContain("var(--story-chrome-plate-wash)");
        expect(plate, "the plate no longer reads the paper field's wash").not.toContain(
            "var(--story-paper-wash)",
        );

        const dark = rule(heroSheet, ".dark");
        expect(dark, "the chassis declares a dark arm").toBeDefined();
        // The dark plate is CARD-derived, like the light one — the same semantics at an
        // alpha of its own — and never the ink film the paper field wears.
        expect(dark).toMatch(
            /--story-chrome-plate-wash:\s*color-mix\(in srgb, var\(--card\) \d+%, transparent\)/,
        );
        expect(dark).toMatch(
            /--story-paper-wash:\s*color-mix\(in srgb, var\(--foreground\) \d+%, transparent\)/,
        );
    });
});

describe("#73 — the shrink carries weight, and the weight names a row", () => {
    it("the collapse scalar is transitioned on the DOCK row, by name", () => {
        // #29's grammar law: a row names the spring row that owns its job and mints
        // no figure. A literal `0.21s` here would be that figure's second home.
        const arm = strip(heroSheet).match(
            /@media \(prefers-reduced-motion: no-preference\)\s*\{([\s\S]*?)\n\}/,
        )?.[1];
        expect(arm, "the weight sits inside the PRM no-preference gate").toBeDefined();
        expect(arm).toContain("--chrome-collapse-t var(--spring-dock-duration)");
        expect(arm).toContain("var(--spring-dock)");
    });

    it("no duration, delay or bezier literal is minted anywhere in the chrome block", () => {
        // ANCHORED: `indexOf` returns -1 when the block is absent and `slice(-1)`
        // then searches one character, which is how this case went green on the
        // pre-cut bytes. The index is asserted real before anything is read from it.
        const sheet = strip(heroSheet);
        const at = sheet.indexOf(".story-page-chrome");
        expect(at, "there is a chrome block to search").toBeGreaterThanOrEqual(0);
        const block = sheet.slice(at);
        expect(block).not.toMatch(/\b\d+(?:\.\d+)?m?s\b/);
        expect(block).not.toMatch(/cubic-bezier\(/);
    });

    it("the weight is PRM-gated — under reduce the machine's discrete snap survives", () => {
        // The unguarded transition would re-introduce the very interpolation the
        // machine drops for a reduced-motion reader.
        //
        // ANCHORED: a for-loop over an empty match list asserts nothing at all, and
        // that vacuum was the third pre-cut false green. The bare rule is asserted
        // to exist, and only then is it asserted to carry no transition.
        const bare = strip(heroSheet).match(
            /(^|\n)\.story-page-chrome\s*\{([\s\S]*?)\n\}/g,
        );
        expect(bare?.length, "the bare chrome rule exists to be checked").toBe(1);
        for (const rules of bare!) {
            expect(rules, "no transition outside the PRM gate").not.toContain(
                "transition:",
            );
        }
    });
});
