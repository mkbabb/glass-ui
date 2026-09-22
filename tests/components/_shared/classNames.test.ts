import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { cn } from "@glass/components/_shared/class-names";

/**
 * O-20 B-3 (1) — the ghost rung in the font-size bucket.
 *
 * `class-names.ts`'s font-size regex listed `admin-label` long after the
 * library stopped shipping a `text-admin-label` utility (`6b450f22`, in
 * 8.0.0 — 0 `@utility` declarations in the 9.0.0 dist, the only one of the
 * 24 names in that regex with none). `cn()` is a bucketed last-write-wins
 * deduper, so the dead name COLLIDED with the live rungs and EVICTED them:
 * a consumer writing `cn("text-caption", "text-admin-label")` got back
 * `"text-admin-label"` — a class that paints nothing — and lost the one
 * that paints.
 */
describe("cn — the font-size bucket", () => {
    it("does not let the dead `text-admin-label` evict a live typography rung", () => {
        expect(cn("text-caption", "text-admin-label")).toBe(
            "text-caption text-admin-label",
        );
    });

    it("still dedupes a pair that really does collide — last write wins", () => {
        expect(cn("text-caption", "text-body")).toBe("text-body");
    });
});

/**
 * O-32 §4.2 + O-23 L-2 — the table against the published vocabulary.
 *
 * The fixture is `.published-roster` itself (read-only): every `text-*` and
 * `shadow-*` name glass-ui publishes, so a future `--text-*` / `--shadow-*` key or
 * `@utility` that lands in the wrong bucket turns this RED instead of silently
 * evicting a consumer's class. Two faults are pinned: a size/shadow recipe caught by
 * the `^text-` colour catch-all (it evicted a real colour class — `text-dropdown`,
 * `text-display-1`, the proportional pair, the `text-shadow-*` family), and a shadow
 * COLOUR sharing one bucket with a shadow SIZE (they write different properties —
 * `--tw-shadow-color` vs `--tw-shadow` — so neither may evict the other).
 */
describe("cn — the published text-* and shadow-* vocabulary", () => {
    const roster = readFileSync(join(process.cwd(), ".published-roster"), "utf8")
        .split("\n")
        .filter(Boolean);
    const themeKeys = (namespace: string) =>
        roster
            .filter((line) => line.startsWith(`theme --${namespace}-`))
            .map((line) => line.slice(`theme --${namespace}-`.length));
    const utilities = (prefix: string) =>
        roster
            .filter((line) => line.startsWith(`utility ${prefix}-`))
            .map((line) => line.slice("utility ".length));

    const textNames = [
        ...themeKeys("text").map((key) => `text-${key}`),
        ...utilities("text"),
    ];
    const shadowRungs = [
        ...themeKeys("shadow").map((key) => `shadow-${key}`),
        ...utilities("shadow"),
    ];
    const textShadowRungs = themeKeys("text-shadow").map((key) => `text-shadow-${key}`);
    const colours = themeKeys("color");

    it("reads a non-empty fixture", () => {
        expect(textNames.length).toBeGreaterThan(30);
        expect(shadowRungs.length).toBeGreaterThan(5);
        expect(textShadowRungs.length).toBeGreaterThan(5);
    });

    it("no published text-* size or text-shadow recipe evicts a text colour", () => {
        const evicting = textNames.filter(
            (name) => cn("text-foreground", name) !== `text-foreground ${name}`,
        );
        expect(evicting).toEqual([]);
    });

    it("the producer's own size rungs still dedupe against each other", () => {
        expect(cn("text-small", "text-dropdown")).toBe("text-dropdown");
        expect(cn("text-display-1", "text-proportional-headline")).toBe(
            "text-proportional-headline",
        );
        expect(cn("text-shadow-sm", "text-shadow-engraved")).toBe(
            "text-shadow-engraved",
        );
    });

    it("every published text colour still collides with `text-foreground`", () => {
        const kept = colours.filter(
            (colour) => cn("text-foreground", `text-${colour}`) !== `text-${colour}`,
        );
        expect(kept).toEqual([]);
    });

    it("a shadow colour never evicts a published shadow size rung", () => {
        const evicted = shadowRungs.filter(
            (rung) => cn(rung, "shadow-primary") !== `${rung} shadow-primary`,
        );
        expect(evicted).toEqual([]);
        const colourShadows = colours.filter(
            (colour) => !shadowRungs.includes(`shadow-${colour}`),
        );
        const evictedByColour = colourShadows.filter(
            (colour) =>
                cn("shadow-lg", `shadow-${colour}`) !== `shadow-lg shadow-${colour}`,
        );
        expect(evictedByColour).toEqual([]);
    });

    it("a text-shadow colour never evicts a published text-shadow size rung", () => {
        const evicted = textShadowRungs.filter(
            (rung) => cn(rung, "text-shadow-primary") !== `${rung} text-shadow-primary`,
        );
        expect(evicted).toEqual([]);
    });

    it("sizes dedupe with sizes and colours with colours", () => {
        for (const rung of shadowRungs) expect(cn("shadow-lg", rung)).toBe(rung);
        expect(cn("shadow-primary", "shadow-black/20")).toBe("shadow-black/20");
        expect(cn("shadow-sm", "shadow-lg/20")).toBe("shadow-lg/20");
        expect(cn("text-shadow-primary", "text-shadow-foreground")).toBe(
            "text-shadow-foreground",
        );
        // An arbitrary value is a colour only by marker: a `color:` hint, a `#` literal
        // or a colour function; a length list or a bare `(--var)` is a size. A named
        // colour (`shadow-[red]`) is not recognised and buckets as a size.
        expect(cn("shadow-lg", "shadow-(--x)")).toBe("shadow-(--x)");
        expect(cn("shadow-lg", "shadow-[0_0_1px_red]")).toBe("shadow-[0_0_1px_red]");
        expect(cn("shadow-lg", "shadow-(color:--x)")).toBe(
            "shadow-lg shadow-(color:--x)",
        );
        expect(cn("shadow-lg", "shadow-[#fff]")).toBe("shadow-lg shadow-[#fff]");
        // A colon inside an arbitrary value is part of the value, not a variant.
        expect(cn("shadow-(color:--x)", "shadow-(color:--y)")).toBe(
            "shadow-(color:--y)",
        );
        // Bare `text-shadow` is the `--color-shadow` TEXT colour, not a text-shadow.
        expect(cn("text-foreground", "text-shadow")).toBe("text-shadow");
    });

    it("a type-hinted arbitrary value keeps its hint's family", () => {
        // Tailwind's inference, compile-probed at 4.3.3: a `length` / `percentage` /
        // `absolute-size` / `relative-size` hint on `text-` is a font-size; on `bg-`,
        // `image:` / `url(` is background-image, `length:` / `size:` / `bg-size:` is
        // background-size, `position:` / `percentage:` is background-position; a
        // `color:` hint is the colour.
        expect(cn("text-primary-foreground", "text-[length:var(--type-caption)]")).toBe(
            "text-primary-foreground text-[length:var(--type-caption)]",
        );
        expect(cn("text-foreground", "text-(length:--x)")).toBe(
            "text-foreground text-(length:--x)",
        );
        expect(cn("text-small", "text-[length:var(--x)]")).toBe(
            "text-[length:var(--x)]",
        );
        expect(cn("text-foreground", "text-[color:var(--x)]")).toBe(
            "text-[color:var(--x)]",
        );
        expect(
            cn(
                "bg-card",
                "bg-[length:200%_100%]",
                "bg-[position:center]",
                "bg-(image:--x)",
            ),
        ).toBe("bg-card bg-[length:200%_100%] bg-[position:center] bg-(image:--x)");
        expect(cn("bg-card", "bg-[url(/a.png)]")).toBe("bg-card bg-[url(/a.png)]");
        expect(cn("bg-[position:center]", "bg-[percentage:50%]")).toBe(
            "bg-[percentage:50%]",
        );
        expect(cn("bg-card", "bg-[color:var(--x)]")).toBe("bg-[color:var(--x)]");
    });
});
