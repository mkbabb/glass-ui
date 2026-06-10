// AY.W-UNDERLINE — the GlassUnderline unit suite. Locks the transposed contract:
// clock seeding, play() resolves, PRM snap, prop-color wins both grounds, the
// `active` edge semantics, the `paths` tuple re-derives the dash model, and the
// NO-`.dark`-block witness (DEC-4) + the FILTER-FREE invariant (the package source).

import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import GlassUnderline from "../../../../src/components/custom/underline/GlassUnderline.vue";

const PKG = resolve(import.meta.dirname, "../../../../src/components/custom/underline");

// matchMedia mock — drives the module-local prefersReducedMotion() one-shot read.
function setReducedMotion(reduce: boolean) {
    vi.stubGlobal(
        "matchMedia",
        (q: string) =>
            ({
                matches: q.includes("reduce") ? reduce : false,
                media: q,
                addEventListener() {},
                removeEventListener() {},
                addListener() {},
                removeListener() {},
                dispatchEvent() {
                    return false;
                },
                onchange: null,
            }) as unknown as MediaQueryList,
    );
}

beforeEach(() => setReducedMotion(false));
afterEach(() => vi.unstubAllGlobals());

function offOf(wrapper: ReturnType<typeof mount>): number {
    const svg = wrapper.get("svg.glass-underline__ink");
    const style = svg.attributes("style") ?? "";
    const m = /--gu-off:\s*([\d.]+)/.exec(style);
    return m ? Number(m[1]) : NaN;
}

describe("GlassUnderline — clock seeding", () => {
    it("clock='load' seeds FULLY UNDRAWN (offset = len) so play() can sweep to 0", () => {
        const w = mount(GlassUnderline, { props: { clock: "load" } });
        expect(offOf(w)).toBe(120); // GU_LEN
    });

    it("clock='static' seeds DRAWN (offset = 0)", () => {
        const w = mount(GlassUnderline, { props: { clock: "static" } });
        expect(offOf(w)).toBe(0);
    });

    it("clock='scroll' seeds DRAWN (the CSS keyframe owns the draw; base is its rest)", () => {
        const w = mount(GlassUnderline, { props: { clock: "scroll" } });
        expect(offOf(w)).toBe(0);
        // The scroll clock opts into the native view() keyframe via the data-attr.
        expect(w.get("span.glass-underline").attributes("data-gu-clock")).toBe("scroll");
    });

    it("under PRM the load clock seeds DRAWN (set-not-drawn — information parity)", () => {
        setReducedMotion(true);
        const w = mount(GlassUnderline, { props: { clock: "load" } });
        expect(offOf(w)).toBe(0);
        // Under PRM the scroll clock downgrades to static (the attr stays honest).
        const sc = mount(GlassUnderline, { props: { clock: "scroll" } });
        expect(sc.get("span.glass-underline").attributes("data-gu-clock")).toBe("static");
    });
});

describe("GlassUnderline — play() / snap()", () => {
    it("play() resolves a Promise and lands the offset at 0 (drawn)", async () => {
        const w = mount(GlassUnderline, { props: { clock: "load", drawMs: 20 } });
        const vm = w.vm as unknown as { play: () => Promise<void> };
        await vm.play();
        await nextTick();
        expect(offOf(w)).toBe(0);
    });

    it("under PRM play() snaps to drawn in one paint and resolves immediately", async () => {
        setReducedMotion(true);
        const w = mount(GlassUnderline, { props: { clock: "load" } });
        const vm = w.vm as unknown as { play: () => Promise<void> };
        await vm.play();
        expect(offOf(w)).toBe(0);
    });

    it("play() is a no-op for the scroll/static clocks (they rest drawn — CSS owns scroll)", async () => {
        const w = mount(GlassUnderline, { props: { clock: "static" } });
        const vm = w.vm as unknown as { play: () => Promise<void> };
        await vm.play();
        expect(offOf(w)).toBe(0);
    });
});

describe("GlassUnderline — the `active` declarative overlay (DEC-2)", () => {
    it("rising edge → play() (sweeps to drawn)", async () => {
        const w = mount(GlassUnderline, { props: { clock: "load", active: false, drawMs: 20 } });
        expect(offOf(w)).toBe(120); // undrawn while inactive
        await w.setProps({ active: true });
        await new Promise((r) => setTimeout(r, 60));
        await nextTick();
        expect(offOf(w)).toBe(0);
    });

    it("falling edge → reset to undrawn so a re-rise REPLAYS", async () => {
        const w = mount(GlassUnderline, { props: { clock: "load", active: true, drawMs: 20 } });
        await new Promise((r) => setTimeout(r, 60));
        await nextTick();
        expect(offOf(w)).toBe(0); // drawn
        await w.setProps({ active: false });
        await nextTick();
        expect(offOf(w)).toBe(120); // reset to undrawn
    });

    it("mount with active=true plays (seeds drawn-ready, draws on mount)", async () => {
        const w = mount(GlassUnderline, { props: { clock: "load", active: true, drawMs: 20 } });
        await new Promise((r) => setTimeout(r, 60));
        await nextTick();
        expect(offOf(w)).toBe(0);
    });

    it("under PRM a rising edge SNAPS (set-not-drawn)", async () => {
        setReducedMotion(true);
        const w = mount(GlassUnderline, { props: { clock: "load", active: false } });
        await w.setProps({ active: true });
        await nextTick();
        expect(offOf(w)).toBe(0);
    });
});

describe("GlassUnderline — color prop (DEC-4 — wins both grounds, no .dark block)", () => {
    // The stroke colour rides a scoped-style `v-bind('props.color ?? "var(--primary)"')`,
    // which compiles to a hashed CSS custom property on the element at runtime — so the
    // binding is witnessed at the SOURCE (the v-bind expression) + the rendered element
    // carrying the hashed style var, not a literal `var(--primary)` in the markup.
    it("the source binds the default stroke to var(--primary) via v-bind", () => {
        const src = readFileSync(resolve(PKG, "GlassUnderline.vue"), "utf8");
        expect(src).toContain('props.color ?? "var(--primary)"');
    });

    it("an explicit color prop rides the SAME v-bind seam (wins both grounds — DEC-4)", () => {
        // The default and the prop share ONE seam: `v-bind('props.color ?? "var(--primary)"')`.
        // A `color` prop therefore wins on BOTH light and dark grounds (there is no
        // `.dark` re-declaration to override it). Witnessed at the source — the
        // scoped-style v-bind compiles to a hashed CSS var jsdom does not reflect onto
        // the element's inline style, so the binding seam is the falsifiable truth.
        const src = readFileSync(resolve(PKG, "GlassUnderline.vue"), "utf8");
        // ONE v-bind seam carries both — `props.color ?? <default>` (not two branches).
        const seams = src.match(/v-bind\(\s*['"]props\.color\s*\?\?/g) ?? [];
        expect(seams.length).toBe(1);
        // And the component accepts + mounts a color prop without error.
        const w = mount(GlassUnderline, { props: { clock: "static", color: "var(--ncsu-red)" } });
        expect(w.get("span.glass-underline").exists()).toBe(true);
    });

    it("the package source carries NO `:where(.dark)` / `.dark` stroke block (DEC-4 witness)", () => {
        const src = readFileSync(resolve(PKG, "GlassUnderline.vue"), "utf8");
        // No dark-arm re-declaration of the stroke colour (the source's NCSU lift deletes).
        expect(/:where\(\.dark\)\s+\.glass-underline__stroke/.test(src)).toBe(false);
        expect(/\.dark\s+\.glass-underline__stroke\s*\{/.test(src)).toBe(false);
    });
});

describe("GlassUnderline — the FILTER-FREE invariant", () => {
    // Strip comments (block + line) so the package's own prose EXPLAINING the
    // filter-free invariant ("NOT a feTurbulence filter") is never a false witness —
    // the assertion is on real `filter:` declarations / `<feTurbulence>` elements.
    function stripComments(src: string): string {
        const noBlock = src.replace(/\/\*[\s\S]*?\*\//g, "");
        return noBlock
            .split("\n")
            .map((line) => {
                const i = line.indexOf("//");
                if (i > 0 && line[i - 1] === ":") return line; // URL guard
                return i === -1 ? line : line.slice(0, i);
            })
            .join("\n");
    }
    it("the package source has no real filter: / <feTurbulence> (the Δ4 invariant; prose-stripped)", () => {
        for (const f of ["GlassUnderline.vue", "index.ts", "types.ts"]) {
            const src = stripComments(readFileSync(resolve(PKG, f), "utf8"));
            expect(/<\s*feTurbulence/i.test(src)).toBe(false);
            expect(/\bfilter\s*:/.test(src)).toBe(false);
        }
    });
});

describe("GlassUnderline — the `paths` geometry escape (DEC-7)", () => {
    it("re-derives the dash model from the escaped tuple (viewBox + len)", () => {
        const w = mount(GlassUnderline, {
            props: {
                clock: "static",
                paths: {
                    stroke: "M0,5 L100,5",
                    ghost: "M0,6 L100,6",
                    viewBox: "0 0 100 12",
                    len: 260,
                },
            },
        });
        const svg = w.get("svg.glass-underline__ink");
        expect(svg.attributes("viewBox")).toBe("0 0 100 12");
        // The dasharray length is the escaped len (260), not the canonical 120.
        expect((svg.attributes("style") ?? "").includes("--gu-len: 260")).toBe(true);
        // The escaped stroke d is rendered.
        expect(w.html()).toContain("M0,5 L100,5");
    });

    it("clock='load' with an escaped len seeds undrawn at that len", () => {
        const w = mount(GlassUnderline, {
            props: { clock: "load", paths: { stroke: "M0,5 L100,5", len: 260 } },
        });
        expect(offOf(w)).toBe(260);
    });
});
