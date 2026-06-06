// `vReveal` — the dependency-free entrance directive. Writes the
// `[data-reveal]` hook + the `--d` stagger-step the consumer CSS reads.
import { describe, expect, it } from "vitest";
import type { DirectiveBinding } from "vue";
import { vReveal } from "../motion/vReveal";

function bind(
    el: HTMLElement,
    value: number,
    arg?: string,
): DirectiveBinding<number> {
    return {
        value,
        oldValue: null,
        arg,
        modifiers: {},
        instance: null,
        dir: vReveal,
    } as DirectiveBinding<number>;
}

describe("vReveal", () => {
    it("is a Vue directive with mounted + updated", () => {
        expect(typeof vReveal.mounted).toBe("function");
        expect(typeof vReveal.updated).toBe("function");
    });

    it('v-reveal="3" sets data-reveal="" + --d:3', () => {
        const el = document.createElement("div");
        vReveal.mounted!(el, bind(el, 3), null as never, null as never);
        expect(el.getAttribute("data-reveal")).toBe("");
        expect(el.style.getPropertyValue("--d")).toBe("3");
    });

    it('v-reveal:fade="6" sets data-reveal="fade" + --d:6', () => {
        const el = document.createElement("div");
        vReveal.mounted!(el, bind(el, 6, "fade"), null as never, null as never);
        expect(el.getAttribute("data-reveal")).toBe("fade");
        expect(el.style.getPropertyValue("--d")).toBe("6");
    });

    it("updated re-applies on value change", () => {
        const el = document.createElement("div");
        vReveal.mounted!(el, bind(el, 1), null as never, null as never);
        expect(el.style.getPropertyValue("--d")).toBe("1");
        vReveal.updated!(el, bind(el, 9), null as never, null as never);
        expect(el.style.getPropertyValue("--d")).toBe("9");
    });

    it("defaults --d to 0 on a nullish value", () => {
        const el = document.createElement("div");
        vReveal.mounted!(
            el,
            bind(el, undefined as unknown as number),
            null as never,
            null as never,
        );
        expect(el.style.getPropertyValue("--d")).toBe("0");
    });
});
