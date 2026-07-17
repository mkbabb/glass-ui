import { describe, expect, it } from "vitest";

import { cn } from "@glass/components/_shared/class-names";

describe("cn — variadic + clsx normalisation", () => {
    it("joins string args separated by spaces", () => {
        expect(cn("a", "b", "c")).toBe("a b c");
    });

    it("filters nullish and false values (clsx behaviour)", () => {
        expect(cn("base", null, false, undefined, "actual")).toBe("base actual");
    });

    it("flattens nested arrays (clsx behaviour)", () => {
        expect(cn(["a", "b"], "c")).toBe("a b c");
    });

    it("evaluates conditional object arguments", () => {
        expect(cn("base", { active: true, disabled: false })).toBe("base active");
    });

    it("returns an empty string for no inputs", () => {
        expect(cn()).toBe("");
    });
});

describe("cn — conflict-pair deduplication (last-write-wins)", () => {
    it("font-size — text-sm beaten by text-lg", () => {
        expect(cn("text-sm", "text-lg")).toBe("text-lg");
    });

    it("font-weight — font-normal beaten by font-bold", () => {
        expect(cn("font-normal", "font-bold")).toBe("font-bold");
    });

    it("text colour — text-red-500 beaten by text-blue-500", () => {
        expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("text colour does NOT shadow font-size — text-sm + text-blue-500 coexist", () => {
        // Different buckets (font-size vs text-color); both survive.
        const out = cn("text-sm", "text-blue-500");
        expect(out).toContain("text-sm");
        expect(out).toContain("text-blue-500");
    });

    it("background colour — bg-red-500 beaten by bg-blue-500", () => {
        expect(cn("bg-red-500 p-2", "bg-blue-500 p-4")).toBe("bg-blue-500 p-4");
    });

    it("padding shorthand and per-axis live in different buckets", () => {
        // p-2 → padding bucket; px-4 → padding-x bucket. Both survive.
        const out = cn("p-2", "px-4");
        expect(out).toContain("p-2");
        expect(out).toContain("px-4");
    });

    it("padding p-2 beaten by p-4", () => {
        expect(cn("p-2", "p-4")).toBe("p-4");
    });

    it("margin negative variants share the bucket", () => {
        expect(cn("mt-2", "-mt-4")).toBe("-mt-4");
    });

    it("gap-x and gap-y are independent buckets", () => {
        const out = cn("gap-x-2", "gap-y-4");
        expect(out).toContain("gap-x-2");
        expect(out).toContain("gap-y-4");
    });

    it("flex value bucket — flex-1 beaten by flex-auto", () => {
        expect(cn("flex-1", "flex-auto")).toBe("flex-auto");
    });

    it("rounded — rounded-md beaten by rounded-lg", () => {
        expect(cn("rounded-md", "rounded-lg")).toBe("rounded-lg");
    });

    it("width — w-4 beaten by w-8", () => {
        expect(cn("w-4 h-4", "w-8")).toBe("h-4 w-8");
    });

    it("items-* — items-start beaten by items-center", () => {
        expect(cn("items-start", "items-center")).toBe("items-center");
    });

    it("justify-* — justify-start beaten by justify-between", () => {
        expect(cn("justify-start", "justify-between")).toBe("justify-between");
    });

    it("variant prefixes scope the bucket — md:text-sm + text-lg coexist", () => {
        const out = cn("md:text-sm", "text-lg");
        expect(out).toContain("md:text-sm");
        expect(out).toContain("text-lg");
    });

    it("hover:text-red-500 + hover:text-blue-500 → last wins under same scope", () => {
        expect(cn("hover:text-red-500", "hover:text-blue-500")).toBe(
            "hover:text-blue-500",
        );
    });

    it("preserves arbitrary-value classes outside the conflict table", () => {
        const out = cn("[&::after]:hidden", "shadow-[var(--shadow-card)]");
        expect(out).toContain("[&::after]:hidden");
        expect(out).toContain("shadow-[var(--shadow-card)]");
    });

    it("real-world combo — base classes + override (preserves original order)", () => {
        // Survivors keep their original index; only beaten tokens drop.
        expect(cn("rounded-md p-2 text-sm bg-white", "p-4 bg-slate-900 text-lg")).toBe(
            "rounded-md p-4 bg-slate-900 text-lg",
        );
    });
});

describe("cn — AJ.W3-η typography utility ≠ text-color bucket", () => {
    // Regression suite — dashboard map "DL" chip text
    // invisibility. The Button `default` variant emits
    // `text-primary-foreground`; the consumer adds `text-micro` (a
    // glass-ui typography utility, NOT a colour). If both
    // matched the catch-all `^text-/` rule under one `text-color`
    // bucket, `text-micro` (later token) would shadow the colour →
    // bg-primary on bg-primary → invisible. The typography
    // utilities live in a separate `font-size` bucket so colour
    // coexists with size.
    it("text-micro does NOT shadow text-primary-foreground", () => {
        const out = cn("bg-primary text-primary-foreground", "text-micro");
        expect(out).toContain("text-primary-foreground");
        expect(out).toContain("text-micro");
        expect(out).toContain("bg-primary");
    });

    it("Button-default variant + consumer text-micro (the §5.D-11 shape)", () => {
        // Mirrors the cn() call inside Button.vue:
        //   cn('h-(--control-h-md)', 'h-7 px-1 text-micro')
        const variantClasses =
            "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80";
        const consumerClasses = "h-7 px-1 text-micro";
        const out = cn(variantClasses, consumerClasses);
        expect(out).toContain("text-primary-foreground");
        expect(out).toContain("text-micro");
    });

    it("text-display utilities don't shadow colour utilities either", () => {
        const out = cn("text-foreground", "text-display");
        expect(out).toContain("text-foreground");
        expect(out).toContain("text-display");
    });

    it("text-body coexists with text-muted-foreground", () => {
        const out = cn("text-muted-foreground", "text-body");
        expect(out).toContain("text-muted-foreground");
        expect(out).toContain("text-body");
    });

    it("two typography utilities still last-write-wins (text-micro → text-body)", () => {
        // Same bucket (`font-size`); later token wins.
        expect(cn("text-micro", "text-body")).toBe("text-body");
    });

    it("text-sm (standard tw font-size) still coexists with text-primary-foreground", () => {
        // Regression of the original `font-size` rule — must not regress.
        const out = cn("text-primary-foreground", "text-sm");
        expect(out).toContain("text-primary-foreground");
        expect(out).toContain("text-sm");
    });

    it("text-mono-caption (mono variant typography) coexists with colour", () => {
        const out = cn("text-foreground/70", "text-mono-caption");
        expect(out).toContain("text-foreground/70");
        expect(out).toContain("text-mono-caption");
    });
});
