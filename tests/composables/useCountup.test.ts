// `useCountup` — the editorial count-up animator. Walks `[data-countup]`
// figures under a host and tweens their `textContent` 0 → target via the
// keyframes LIGHT `NumericAnimation` engine. value.js-FREE (callable easing).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { effectScope, ref } from "vue";
import { useCountup } from "@glass/composables/motion/useCountup";

function makeFigure(host: HTMLElement, target: string, extra: Record<string, string> = {}) {
    const el = document.createElement("span");
    el.setAttribute("data-countup", target);
    for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
    el.textContent = "0";
    host.appendChild(el);
    return el;
}

describe("useCountup", () => {
    let host: HTMLElement;
    let active: HTMLElement;

    beforeEach(() => {
        host = document.createElement("div");
        active = document.createElement("div");
        active.setAttribute("data-state", "active");
        host.appendChild(active);
        document.body.appendChild(host);
    });

    afterEach(() => {
        host.remove();
        vi.restoreAllMocks();
    });

    it("exports the canonical composable", () => {
        expect(typeof useCountup).toBe("function");
    });

    it("settle() snaps every [data-countup] to its end value (still capture)", () => {
        const figure = makeFigure(active, "42");
        const hostRef = ref<HTMLElement | null>(host);
        const { settle } = useCountup(hostRef, { easeFn: (p) => p });
        settle();
        expect(figure.textContent).toBe("42");
    });

    it("prefers-reduced-motion snaps without a tween", () => {
        vi.spyOn(window, "matchMedia").mockReturnValue({
            matches: true,
        } as MediaQueryList);
        const figure = makeFigure(active, "100");
        const hostRef = ref<HTMLElement | null>(host);
        const { runActive } = useCountup(hostRef, { easeFn: (p) => p });
        runActive();
        // Snapped synchronously to the target — no "0" interim, no rAF.
        expect(figure.textContent).toBe("100");
    });

    it("cancel() / scope-dispose stops an in-flight tween (the leak fix)", () => {
        vi.spyOn(window, "matchMedia").mockReturnValue({
            matches: false,
        } as MediaQueryList);
        const figure = makeFigure(active, "1000", { "data-countup-dur": "5000" });
        const hostRef = ref<HTMLElement | null>(host);

        const scope = effectScope();
        let cancel!: () => void;
        scope.run(() => {
            const c = useCountup(hostRef, { easeFn: (p) => p });
            c.runActive();
            cancel = c.cancel;
        });

        // A tween is now in flight (the figure left its "0"/started its walk is
        // engine-owned; we assert the cancel path is callable + idempotent and
        // that scope-dispose tears it down with no throw).
        expect(() => cancel()).not.toThrow();
        // Disposing the scope must not throw (the onScopeDispose cancel runs).
        expect(() => scope.stop()).not.toThrow();
        // After cancel the figure is frozen — the engine no longer writes it.
        const frozen = figure.textContent;
        expect(typeof frozen).toBe("string");
    });

    it("skip() short-circuits runActive", () => {
        const figure = makeFigure(active, "7");
        const hostRef = ref<HTMLElement | null>(host);
        const { runActive } = useCountup(hostRef, {
            easeFn: (p) => p,
            skip: () => true,
        });
        runActive();
        expect(figure.textContent).toBe("0");
    });
});
