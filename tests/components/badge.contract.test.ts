import { readFileSync } from "node:fs";
import { join } from "node:path";

import { mount } from "@vue/test-utils";
import { describe, expect, expectTypeOf, it } from "vitest";

import Badge from "@glass/components/badge/Badge.vue";
import { badgeVariants } from "@glass/components/badge";

/**
 * The register's own file, comments STRIPPED — mark.css's prose names every
 * declaration it states, so a raw grep would measure the documentation rather
 * than the cascade (the detector lesson, five bites in one seat).
 */
const markCss = (): string =>
    readFileSync(join(process.cwd(), "src/styles/glass/mark.css"), "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ");

type BadgeProps = InstanceType<typeof Badge>["$props"];
type BadgeHasCast = "cast" extends keyof BadgeProps ? true : false;
type BadgeHasSurface = "surface" extends keyof BadgeProps ? true : false;

describe("Badge static metadata contract", () => {
    it("keeps metadata axes and removes the cast API", () => {
        expectTypeOf<BadgeProps["variant"]>().toEqualTypeOf<
            "default" | "secondary" | "outline" | "bare" | null | undefined
        >();
        expectTypeOf<BadgeProps["tone"]>().toEqualTypeOf<
            | "neutral"
            | "destructive"
            | "success"
            | "warning"
            | "info"
            | null
            | undefined
        >();
        expectTypeOf<BadgeProps["size"]>().toEqualTypeOf<
            "sm" | "md" | "lg" | null | undefined
        >();
        // BK #87 W-MARKS — the `surface` axis is GONE. A badge is an inert mark,
        // and the register law is that a mark samples nothing; `surface="glass"`
        // composed `.glass-capsule`, which paints a real `backdrop-filter`.
        expectTypeOf<BadgeHasSurface>().toEqualTypeOf<false>();
        expectTypeOf<BadgeHasCast>().toEqualTypeOf<false>();
    });

    it("renders static phrasing content with no synthetic action anatomy", () => {
        const wrapper = mount(Badge, {
            props: { variant: "secondary", tone: "success", size: "lg" },
            slots: { default: "Synced" },
        });
        const badge = wrapper.get('[data-slot="badge"]');

        expect(badge.element.tagName).toBe("DIV");
        expect(badge.attributes("role")).toBeUndefined();
        expect(badge.attributes("tabindex")).toBeUndefined();
        expect(badge.attributes("data-cast")).toBeUndefined();
        expect(badge.find(".cartoon-cast").exists()).toBe(false);
        expect(badge.attributes("data-tone")).toBe("success");
        expect(badge.attributes("data-size")).toBe("lg");
        expect(badge.attributes("data-surface")).toBeUndefined();
    });

    // BORN-RED at HEAD (D8). `:data-variant="variant"` stamped the RAW prop, and
    // an unset prop stamps `undefined`, which Vue omits entirely — so 22 of 39
    // shipped badges carried no `data-variant` at all and
    // `.badge-atom--glass[data-variant="default"]` was a structurally unreachable
    // rule. HEAD reading: `mount(Badge).attributes("data-variant")` → undefined.
    it("stamps the RESOLVED axes, from the same defaulting the class map applies", () => {
        const bare = mount(Badge, { slots: { default: "New" } }).get(
            '[data-slot="badge"]',
        );

        expect(bare.attributes("data-variant")).toBe("default");
        expect(bare.attributes("data-tone")).toBe("neutral");
        expect(bare.attributes("data-size")).toBe("md");
        // The stamps and the class map read ONE source, so they cannot disagree.
        expect(bare.classes()).toEqual(
            expect.arrayContaining(badgeVariants().split(" ").filter(Boolean)),
        );
    });

    // BORN-RED at HEAD (D23/D24/A-22). The base authored `wrap-anywhere` on 39/39
    // badges — it breaks a word at ANY character, so "Paid" rendered as P/ai/d in
    // a narrow cel — and froze every glyph at `--ui-glyph-sm` while the label grew
    // around it. A-22's circular floor did not exist at all.
    it("keeps the annotation on one line and sizes its glyph by its own type", () => {
        const base = badgeVariants();

        expect(base).not.toContain("wrap-anywhere");
        expect(base).toContain("whitespace-nowrap");
        expect(base).not.toContain("--ui-glyph-sm");
        expect(base).toContain("size-[var(--mark-glyph)]");
        expect(markCss()).toMatch(/:where\(\.badge-atom\) \{[^}]*--mark-glyph: 1em;/);
    });

    // BORN-RED at the cure (A-22, 2026-08-08). The floor SHIPPED INERT: spelled as
    // a bare `min-w-[calc(1lh+<pad-block>×2)]` beside a bare `px-3`, it could never
    // bind, because the natural width of a one-character badge is that character
    // plus TWO inline legs and at md the legs (12px each) exceed the whole slack.
    // Measured pre-cure at the md rung: `7` → 32.49 × 23.99 (ratio 1.354). The
    // previous rows here asserted the class STRING — the exact mirror class this
    // row's own RECORD §4 condemns; a string can hold a floor nothing binds.
    //
    // What binds it is a PRECONDITION, and the precondition is the register's:
    // the inline leg is ceilinged at the slack the floor leaves over one character
    // cell. Both halves are asserted against the cascade that carries them, and a
    // floor without its ceiling (or a ceiling without its floor) REDS.
    it("states the circular floor WITH the pad ceiling that lets it bind", () => {
        const css = markCss();
        const badgeBox = css.match(/:where\(\.badge-atom\)\s*\{([^}]*)\}/);

        expect(badgeBox, "mark.css declares the badge box law").not.toBeNull();
        const box = badgeBox![1];

        // the floor IS the box height — one content line plus the two block legs
        expect(box).toMatch(
            /--mark-floor:\s*calc\(\s*1lh\s*\+\s*var\(--mark-pad-block\)\s*\*\s*2\s*\)/,
        );
        expect(box).toMatch(/min-inline-size:\s*var\(--mark-floor\)/);
        // the block leg the floor is derived FROM is the one actually painted
        expect(box).toMatch(/padding-block:\s*var\(--mark-pad-block\)/);
        // the ceiling: the inline leg never exceeds the floor's slack over 1ch
        expect(box).toMatch(
            /padding-inline:\s*min\(\s*var\(--mark-pad-inline\),\s*calc\(\s*\(\s*var\(--mark-floor\)\s*-\s*1ch\s*\)\s*\/\s*2\s*\)\s*\)/,
        );
        // and the rungs hand the register REQUESTS, never a painted leg of their
        // own — a `px-*` on a rung would win the utilities layer and un-bind it.
        for (const size of ["sm", "md", "lg"] as const) {
            const rung = badgeVariants({ size });
            expect(rung).toMatch(/\[--mark-pad-block:--spacing\(\d\)\]/);
            expect(rung).toMatch(/\[--mark-pad-inline:--spacing\(\d\)\]/);
            expect(rung).not.toMatch(/(?:^|\s)(?:px-\d|py-\d|min-w-)/);
        }
    });

    // BORN-RED at HEAD (D18). The rungs read `--control-text-sm` / `--control-text`
    // / `--type-body`×`--ui-scale`: control-box type on a thing that is not a
    // control, riding the scalar against §1.1's own law. They are ROLE rungs now —
    // caption (n=−3) · control-label (n=−2) · control-value (n=−1) — and the pad
    // is on the spacing series.
    it("takes the annotation type register, off the control-box scalar", () => {
        expect(badgeVariants({ size: "sm" })).toContain("var(--type-caption)");
        expect(badgeVariants({ size: "md" })).toContain("var(--control-label)");
        expect(badgeVariants({ size: "lg" })).toContain("var(--control-text)");
        expect(badgeVariants({ size: "lg" })).not.toContain("--ui-scale");
    });

    it("authors no hover, press, or focus affordance classes", () => {
        const classes = [
            badgeVariants(),
            badgeVariants({ variant: "secondary" }),
            badgeVariants({ variant: "outline" }),
            badgeVariants({ variant: "bare" }),
            badgeVariants({ tone: "destructive" }),
            badgeVariants({ tone: "success" }),
            badgeVariants({ tone: "warning" }),
            badgeVariants({ tone: "info" }),
        ].join(" ");

        expect(classes).not.toMatch(/(?:^|\s)(?:hover:|active:|focus(?:-visible)?:)/);
        expect(classes).not.toContain("focus-ring");
        expect(classes).not.toContain("transition-control");
    });
});

// The bare form (value.js asked for it on phone-width cards): one more value on the
// variant axis, not a parallel component. Its box rules are glass-atom.css's.
describe("Badge bare variant", () => {
    const atomCss = (): string =>
        readFileSync(join(process.cwd(), "src/styles/glass/glass-atom.css"), "utf8")
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\s+/g, " ");

    it("stamps the variant and carries no plate classes", () => {
        const wrapper = mount(Badge, { props: { variant: "bare" }, slots: { default: "<svg></svg><span>Featured</span>" } });
        expect(wrapper.attributes("data-variant")).toBe("bare");
        expect(wrapper.classes()).toContain("badge-atom--bare");
        expect(wrapper.classes().some((c) => c.startsWith("bg-"))).toBe(false);
        expect(wrapper.text()).toBe("Featured");
    });

    it("drops the plate, rim, floor and pad, sizes the glyph to the cap height, and keeps the label for assistive tech", () => {
        const css = atomCss();
        const rule = css.match(/\.badge-atom--bare \{([^}]*)\}/)?.[1] ?? "";
        expect(rule).toContain("--mark-glyph: 1cap");
        expect(rule).toContain("min-inline-size: 0");
        expect(rule).toContain("padding: 0");
        expect(rule).toContain("background: none");
        expect(rule).toContain("box-shadow: none");
        const label = css.match(/\.badge-atom--bare > :not\(svg, :has\(svg\)\) \{([^}]*)\}/)?.[1] ?? "";
        expect(label).toContain("clip-path: inset(50%)");
        expect(label).not.toContain("display: none");
        // after the contrast arm, which re-writes `.badge-atom`'s box-shadow at the same specificity
        expect(css.indexOf(".badge-atom--bare {")).toBeGreaterThan(css.indexOf("@media (prefers-contrast: more)"));
    });
});
