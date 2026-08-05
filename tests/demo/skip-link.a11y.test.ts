// BK row #31 (W-A11Y) — W1-E (the skip link) + W1-F (the composition heading
// outlines). Both are demo-surface contracts, so both take the band's demo idiom: a
// vitest-fs source assert against the SFC (the routed AppShell is not isolable for a
// rendered mount — the sibling `sidebar-nav-landmark.a11y.test.ts` is the precedent).
//
// W1-E, RED at HEAD: `grep -rn "skip" demo/ src/` returned nothing. A keyboard visitor
// tabbed the whole persistent SidebarDock on first load, every load. The shell's
// route-settle focus move (`AppShell.vue`'s `route.path` watch) covers NAVIGATIONS and
// covers first load not at all — which is the one arrival every visitor makes.
//
// W1-F, RED at HEAD: two compositions skipped a heading level —
// `empty-states.vue` rendered an h3 under the StoryPage chassis h1 with no h2 between,
// and `auth-shell.vue` did the same under its own authored h1.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string): string => readFileSync(path, "utf8");
const appShell = read("demo/shell/AppShell.vue");

/** The template only, with comments blanked — prose about a tag is not a tag. */
const template = appShell
    .slice(appShell.indexOf("<template>"))
    .replace(/<!--[\s\S]*?-->/g, "");

describe("W1-E — the shell offers a skip link before it offers the dock", () => {
    it("renders a skip link", () => {
        expect(template).toMatch(/<a\b[^>]*href="#demo-main"/);
        expect(template).toMatch(/Skip to content/);
    });

    it("it is FIRST — no focusable element is authored ahead of it", () => {
        // Tab order follows DOM order here (nothing in the shell sets a positive
        // `tabindex`), so "first tabbable" reduces to "first focusable in the
        // template" — and a skip link that is second is a skip link that skips
        // nothing.
        const anchor = template.match(/<a\b[^>]*href="#demo-main"/);
        expect(anchor).not.toBeNull();
        const before = template.slice(0, anchor!.index!);
        expect(before).not.toMatch(/<(a|button|input|select|textarea)\b/);
        expect(before, "no component renders a control ahead of it").not.toMatch(
            /<(SidebarDock|BottomDock|PresetEditor)\b/,
        );
        expect(before).not.toMatch(/tabindex="0"/);
    });

    it("its target is the <main> the shell already focuses, and that main has the id", () => {
        expect(template).toMatch(/<main\b[^>]*id="demo-main"/s);
        expect(template).toMatch(/<main\b[^>]*tabindex="-1"/s);
    });

    it("activation runs the shell's ONE focus-the-body path", () => {
        // Two mechanisms for one intent is how a shell ends up with two disagreeing
        // definitions of "the top of the page"; the skip handler and the route-settle
        // watch call the same function.
        expect(appShell).toMatch(/function focusMain\(\)/);
        expect(appShell).toMatch(/void nextTick\(focusMain\)/);
        expect(appShell).toMatch(/function onSkipToContent\(\)[\s\S]*?focusMain\(\)/);
        expect(template).toMatch(/@click\.prevent="onSkipToContent"/);
    });

    it("it is hidden until focused — it costs the pointer visitor nothing", () => {
        const anchor = template.match(/<a\b[^>]*href="#demo-main"[\s\S]*?>/)![0];
        expect(anchor).toMatch(/\bsr-only\b/);
        expect(anchor).toMatch(/focus-visible:not-sr-only/);
    });
});

describe("W1-F — no composition skips a heading level", () => {
    // The LIVE composition set. `gate-pattern` left the tree at BK #38 (W-DIALOG
    // discharged RT-18C by deleting the story it duplicated the dismissal grammar in);
    // a name kept here after its file is deleted reds this gate on an ENOENT, which
    // says nothing about heading outlines.
    const COMPOSITIONS = [
        "auth-shell",
        "chassis",
        "empty-states",
        "form-validation",
        "settings",
    ];

    for (const name of COMPOSITIONS) {
        it(`${name}.vue renders a contiguous outline`, () => {
            const source = read(`demo/stories/compositions/${name}.vue`);
            // Comments blanked FIRST: `auth-shell.vue` mentions `<h1>` in prose and a
            // `<h2>` inside a CSS comment, and a scanner that counts those measures
            // the documentation instead of the page.
            const body = source
                .replace(/<!--[\s\S]*?-->/g, "")
                .replace(/\/\*[\s\S]*?\*\//g, "");
            const levels = [...body.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
            if (levels.length === 0) return;

            // The StoryPage chassis renders the page h1 unless the story opts out with
            // `hero-title="false"`, in which case the story authors its own.
            const chassisH1 = !/hero-title="false"/.test(body);
            const outline = chassisH1 ? [1, ...levels] : levels;

            let deepest = outline[0];
            for (const level of outline) {
                expect(
                    level,
                    `${name}.vue: h${level} follows h${deepest} — a level is skipped`,
                ).toBeLessThanOrEqual(deepest + 1);
                deepest = Math.max(deepest, level);
            }
            expect(outline[0], `${name}.vue starts at h1`).toBe(1);
        });
    }

    it("exactly one h1 per composition (the chassis seam is family D's, the count is ours)", () => {
        for (const name of COMPOSITIONS) {
            const body = read(`demo/stories/compositions/${name}.vue`)
                .replace(/<!--[\s\S]*?-->/g, "")
                .replace(/\/\*[\s\S]*?\*\//g, "");
            const own = [...body.matchAll(/<h1\b/g)].length;
            const chassis = /hero-title="false"/.test(body) ? 0 : 1;
            expect(own + chassis, `${name}.vue h1 count`).toBe(1);
        }
    });
});
