// BK #80 W-BUTTON — the button lane's executable.
//
// TWO HOMES BECOME ONE. This file used to live at `tests/components/ui/button/`, a
// directory hop nothing in the tree explains and no other component's contract uses.
// It is here now, beside `tests/components/card/`, which is where a component's
// contract lives.
//
// SEATS +0. The lane's five §5 clauses (MATERIAL · FOCUS · STATE · RUNG · TONE) are
// EXECUTION-TIME PROBES, not gate seats: what a node runner can decide about them it
// decides here as ordinary cases over the component's own bytes, and what only paint
// can decide (resolved blur, resolved α, contrast ratios, pairwise pixel deltas) is
// owed to the π battery at #10 and is not faked with a jsdom `getComputedStyle` that
// applies no stylesheet. The register receipt is byte-identical across this cut.

import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import * as buttonModule from "@glass/components/button";
import { Button } from "@glass/components/button";

const STYLES = "src/components/button/styles.css";
const BASE = "src/styles/utilities/base.css";
const read = (path: string): string => readFileSync(path, "utf8");
/** The declarations only — a rule quoted inside a comment is not a rule. */
const live = (path: string): string => read(path).replace(/\/\*[\s\S]*?\*\//g, "");

describe("Button — the command contract", () => {
    it("defaults to an ordinary native command", () => {
        const wrapper = mount(Button, { slots: { default: "Save" } });
        const button = wrapper.get("button");

        expect(button.attributes("type")).toBe("button");
        expect(button.attributes("data-emphasis")).toBe("secondary");
        expect(button.attributes("data-tone")).toBe("neutral");
        expect(button.attributes("data-size")).toBe("md");
        expect(button.classes()).toContain("button");
        expect(button.find(".cartoon-cast").exists()).toBe(false);
        expect("buttonVariants" in buttonModule).toBe(false);
    });

    it("publishes semantic emphasis, tone, size, and icon geometry", () => {
        const wrapper = mount(Button, {
            props: {
                emphasis: "primary",
                tone: "destructive",
                size: "sm",
                iconOnly: true,
            },
            attrs: { "aria-label": "Delete item" },
            slots: { default: "×" },
        });
        const button = wrapper.get("button");

        expect(button.attributes("data-emphasis")).toBe("primary");
        expect(button.attributes("data-tone")).toBe("destructive");
        expect(button.attributes("data-size")).toBe("sm");
        expect(button.attributes("data-icon-only")).toBe("true");
        expect(button.attributes("aria-label")).toBe("Delete item");
    });

    it("hands pointer and keyboard feedback to one hydrated press owner", async () => {
        vi.useFakeTimers();
        const wrapper = mount(Button, { slots: { default: "Save" } });
        const button = wrapper.get("button");

        try {
            expect(button.attributes("data-press-armed")).toBe("");
            await button.trigger("keydown", { key: "Enter" });
            await vi.advanceTimersByTimeAsync(400);
            expect(
                Number(
                    (button.element as HTMLElement).style.getPropertyValue(
                        "--glass-btn-press-t",
                    ),
                ),
            ).toBeGreaterThan(0.9);

            await button.trigger("blur");
            await vi.advanceTimersByTimeAsync(600);
            expect(
                Number(
                    (button.element as HTMLElement).style.getPropertyValue(
                        "--glass-btn-press-t",
                    ),
                ),
            ).toBeLessThan(0.1);
        } finally {
            wrapper.unmount();
            vi.useRealTimers();
        }
    });

    it("normalizes native disabled Booleanish values", async () => {
        const wrapper = mount(Button, {
            props: { disabled: "true" },
            slots: { default: "Save" },
        });
        expect((wrapper.get("button").element as HTMLButtonElement).disabled).toBe(
            true,
        );

        await wrapper.setProps({ disabled: "false" });
        expect((wrapper.get("button").element as HTMLButtonElement).disabled).toBe(
            false,
        );
    });

    it("preserves an asChild link and suppresses disabled activation", () => {
        const active = mount({
            components: { Button },
            template: '<Button as-child><a href="/docs">Docs</a></Button>',
        });
        const link = active.get("a");
        expect(link.attributes("href")).toBe("/docs");
        expect(link.attributes("data-slot")).toBe("button");
        expect(link.attributes("type")).toBeUndefined();
        expect(link.classes()).toContain("glass-capsule-hover");

        const disabled = mount({
            components: { Button },
            template: '<Button as-child disabled><a href="/docs">Docs</a></Button>',
        });
        const disabledLink = disabled.get("a");
        const event = new MouseEvent("click", { bubbles: true, cancelable: true });
        disabledLink.element.dispatchEvent(event);
        expect(disabledLink.attributes("aria-disabled")).toBe("true");
        expect(disabledLink.classes()).not.toContain("glass-capsule-hover");
        expect(event.defaultPrevented).toBe(true);
    });
});

describe("Button §5 MATERIAL — one owner, one attribute", () => {
    it("declares no backdrop-filter of its own", () => {
        // The material is `.glass-capsule`'s. A second declaration here is a second
        // owner, and on HEAD the louder rung's own declaration resolved to `none`
        // (`--glass-blur-deep` is scoped to `.glass-deep`, which the host did not
        // carry) while beating the capsule's working fallback on specificity.
        expect(live(STYLES)).not.toMatch(/backdrop-filter/);
    });

    it("never writes a BARE plate token into the capsule's fill", () => {
        const writes = live(STYLES).match(/--glass-capsule-fill:[\s\S]*?;/g) ?? [];
        expect(writes.length).toBeGreaterThan(0);
        for (const write of writes) {
            // Every write COMPOSES over `--glass-veil` — the element-composed plate,
            // so the tier, the earned-darken clamp and `--glass-level` all survive
            // inside the mix instead of being replaced by a `:root`-baked literal.
            expect(write).toMatch(/color-mix\(/);
            expect(write).toMatch(/var\(--glass-veil\)/);
            expect(write).not.toMatch(/var\(--glass-plate-[a-z]+\)/);
        }
    });

    it("mounts exactly one plate class, and it is not a ladder rung", () => {
        for (const emphasis of ["primary", "secondary"] as const) {
            const classes = mount(Button, {
                props: { emphasis },
                slots: { default: "Save" },
            }).classes();
            expect(classes).toContain("glass-capsule");
            expect(classes).toContain("glass-specular-track");
            for (const rung of [
                "glass-wash",
                "glass-quiet",
                "glass-resting",
                "glass-floating",
                "glass-overlay",
            ]) {
                expect(classes).not.toContain(rung);
            }
        }
    });

    it("primary carries `.glass-deep` AND the depth grade that makes it a button", () => {
        // Without the grade the registered `initial-value: 1` paints the 16px MENU
        // ceiling on a button: the tier map keys on the ladder classes this host
        // deliberately does not carry, so nothing else can supply it.
        expect(
            mount(Button, { props: { emphasis: "primary" } }).classes(),
        ).toContain("glass-deep");
        expect(live(STYLES)).toMatch(
            /\[data-emphasis="primary"\]\s*\{[^}]*--glass-depth:\s*var\(--glass-depth-content\)/,
        );
        // …and the two rungs it separates from are DIFFERENT rungs on both axes.
        expect(live(STYLES)).toMatch(
            /\[data-emphasis="secondary"\]\s*\{[^}]*--glass-veil-tier:\s*var\(--glass-veil-quiet\)[^}]*--glass-blur-floating:\s*var\(--glass-blur-quiet\)/,
        );
    });

    it("glass is decided by emphasis alone — a destructive command is still glass", () => {
        const classes = mount(Button, {
            props: { emphasis: "secondary", tone: "destructive" },
        }).classes();
        expect(classes).toContain("glass-capsule");
    });
});

describe("Button §5 FOCUS — an indicator that exists and mutates nothing", () => {
    it("the shared ring is an outline, and writes neither box-shadow nor radius", () => {
        const rule = live(BASE).match(/\.focus-ring:focus-visible\s*\{([\s\S]*?)\}/);
        expect(rule).not.toBeNull();
        expect(rule![1]).toMatch(/outline:\s*var\(--focus-ring-width\)\s*solid/);
        expect(rule![1]).toMatch(/var\(--ink-perimeter\)/);
        expect(rule![1]).not.toMatch(/box-shadow/);
        expect(rule![1]).not.toMatch(/border-radius/);
    });

    it("`.interactive-item` takes the same inversion", () => {
        const rule = live(BASE).match(
            /\.interactive-item:focus-visible\s*\{([\s\S]*?)\}/,
        );
        expect(rule).not.toBeNull();
        expect(rule![1]).toMatch(/outline:\s*var\(--focus-ring-width\)\s*solid/);
        expect(rule![1]).not.toMatch(/box-shadow/);
    });

    it("every mounted cell composes the ring — no cell is left without one", () => {
        for (const emphasis of ["primary", "secondary", "quiet", "text"] as const) {
            for (const tone of ["neutral", "destructive"] as const) {
                expect(
                    mount(Button, { props: { emphasis, tone } }).classes(),
                ).toContain("focus-ring");
            }
        }
    });
});

describe("Button §5 STATE — three states that differ", () => {
    it("a loading command keeps its focus seat and its own cursor", async () => {
        const wrapper = mount(Button, {
            props: { loading: true },
            slots: { default: "Saving" },
        });
        const button = wrapper.get("button");

        // NOT natively disabled: `disabled` takes it out of the tab order and puts
        // `pointer-events: none` in front of the cursor that explains the state.
        expect((button.element as HTMLButtonElement).disabled).toBe(false);
        expect(button.attributes("data-loading")).toBe("true");
        expect(button.attributes("aria-busy")).toBe("true");
        // …and it shows the library's ONE work-in-flight mark.
        expect(button.find(".glass-dot-ring").exists()).toBe(true);

        await wrapper.setProps({ loading: false });
        expect(button.attributes("aria-busy")).toBeUndefined();
        expect(button.find(".glass-dot-ring").exists()).toBe(false);
    });

    it("a loading command still refuses to activate — including a form submit", () => {
        const onSubmit = vi.fn();
        const wrapper = mount({
            components: { Button },
            setup: () => ({ onSubmit }),
            template:
                '<form @submit.prevent="onSubmit"><Button type="submit" loading>Saving</Button></form>',
        });
        (wrapper.get("button").element as HTMLButtonElement).click();
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it("disabled dims the INK and nothing else — no blanket opacity, no pointer kill", () => {
        const rule = live(STYLES).match(
            /\.button:disabled,\s*\.button\[aria-disabled="true"\]\s*\{([\s\S]*?)\}/,
        );
        expect(rule).not.toBeNull();
        expect(rule![1]).not.toMatch(/(^|[^-])opacity:/);
        expect(rule![1]).not.toMatch(/pointer-events/);
        expect(rule![1]).toMatch(/--button-ink:\s*oklch\(from/);
        expect(rule![1]).toMatch(/cursor:\s*not-allowed/);
    });

    it("the surface cross-fade survives reduced motion", () => {
        // HEAD zeroed the WHOLE list under PRM on a component that declared no
        // transition of its own, so the rule existed only to clobber the composed
        // surface legs that `base.css`'s own doctrine says survive PRM.
        expect(live(STYLES)).not.toMatch(/prefers-reduced-motion/);
        const base = live(STYLES).match(/\.button\s*\{([\s\S]*?)\n    \}/);
        expect(base![1]).toMatch(/transition:[\s\S]*background-color/);
        expect(base![1]).toMatch(/scale var\(--spring-press-duration\)/);
    });
});

describe("Button §5 RUNG — four boxes, two pads, one gap pair, three faces", () => {
    it("`size` is exactly four members and every one is a real rung", () => {
        const sizes = ["xs", "sm", "md", "lg"] as const;
        for (const size of sizes) {
            expect(mount(Button, { props: { size } }).attributes("data-size")).toBe(
                size,
            );
        }
        const css = live(STYLES);
        expect(css.match(/\[data-size="[a-z]+"\]/g)?.length).toBe(3); // md is the base
        expect(css).not.toMatch(/\[data-size="(xl|icon|default)"\]/);
    });

    it("pads and gaps read the rank series — no local literal, no local breakpoint", () => {
        const css = live(STYLES);
        expect(css).not.toMatch(/padding-inline:\s*calc\(/);
        expect(css).not.toMatch(/@media\s*\(max-width/);
        for (const decl of css.match(/(padding-inline|gap):[^;]*;/g) ?? []) {
            expect(decl).toMatch(/var\(--space-(residue|atom|body)\)/);
        }
    });

    it("three distinct font-sizes across the four boxes", () => {
        const faces = new Set(
            (live(STYLES).match(/font-size:\s*var\((--[a-z-]+)\)/g) ?? []).map((d) =>
                d.replace(/font-size:\s*/, ""),
            ),
        );
        expect(faces).toEqual(
            new Set(["var(--control-text)", "var(--control-text-sm)", "var(--type-body)"]),
        );
    });

    it("the coarse-pointer floor is claimed by every command, not only the square one", () => {
        // The HEAD form stamped `data-control-target` on the `iconOnly` arm alone —
        // the exact inversion. `responsive.css`'s `min-inline-size` leg is live on a
        // NARROW-LABEL command under coarse; an icon button is already square.
        expect(mount(Button, { props: { iconOnly: true } }).attributes("data-control-target")).toBe("");
        expect(mount(Button, { slots: { default: "Ok" } }).attributes("data-control-target")).toBe("");
    });
});

describe("Button §5 TONE — it tints, it never replaces", () => {
    it("`tone` is exactly two members", () => {
        const source = read("src/components/button/Button.vue");
        expect(source).toMatch(
            /export type ButtonTone = Extract<Tone, "neutral" \| "destructive">/,
        );
        expect(source).not.toMatch(/"(success|warning|info)"/);
    });

    it("the toned arm paints no background, border or shadow of its own", () => {
        const blocks =
            live(STYLES).match(
                /\.button\[data-tone="destructive"\][^{]*\{([\s\S]*?)\n    \}/g,
            ) ?? [];
        expect(blocks.length).toBe(1);
        // Not `background:` — the fill rides the capsule's own knob; not `box-shadow:`
        // — the capsule's rim and lift ARE the elevation channel; not a fourth
        // boundary ink — the edge is the perimeter rung at the tone's hue.
        expect(blocks[0]).not.toMatch(/\n\s*background:/);
        expect(blocks[0]).not.toMatch(/\n\s*box-shadow:/);
        expect(blocks[0]).not.toMatch(/--shadow-sm/);
        expect(blocks[0]).toMatch(/var\(--feedback-tone-strength\)/);
        expect(blocks[0]).toMatch(/var\(--ink-perimeter\)/);
    });

    it("emphasis stays live under tone — no rule keys on two axes at once", () => {
        expect(live(STYLES)).not.toMatch(/\[data-emphasis="[a-z]+"\]\[data-tone=/);
        expect(live(STYLES)).not.toMatch(/\[data-tone="[a-z]+"\]\[data-emphasis=/);
        expect(live(STYLES)).not.toMatch(/font-weight:\s*650/);
    });
});
