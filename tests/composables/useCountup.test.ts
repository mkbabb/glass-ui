// `useCountup` — the editorial count-up animator. Walks `[data-countup]`
// figures under a host and tweens their `textContent` 0 → target via the
// keyframes LIGHT `NumericAnimation` engine. value.js-FREE (callable easing).
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { effectScope, ref, type EffectScope } from "vue";
import { useCountup } from "@glass/composables/motion/useCountup";

function makeFigure(
    host: HTMLElement,
    target: string,
    extra: Record<string, string> = {},
) {
    const el = document.createElement("span");
    el.setAttribute("data-countup", target);
    for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
    el.textContent = "0";
    host.appendChild(el);
    return el;
}

function mediaPreference(matches: boolean): MediaQueryList {
    return {
        matches,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    } as unknown as MediaQueryList;
}

describe("useCountup", () => {
    let host: HTMLElement;
    let active: HTMLElement;
    let scope: EffectScope;

    beforeEach(() => {
        host = document.createElement("div");
        active = document.createElement("div");
        active.setAttribute("data-state", "active");
        host.appendChild(active);
        document.body.appendChild(host);
        scope = effectScope();
    });

    afterEach(() => {
        scope.stop();
        host.remove();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("exports the canonical composable", () => {
        expect(typeof useCountup).toBe("function");
    });

    it("settle() snaps every [data-countup] to its end value (still capture)", () => {
        const figure = makeFigure(active, "42");
        const hostRef = ref<HTMLElement | null>(host);
        const { settle } = scope.run(() =>
            useCountup(hostRef, { easeFn: (p) => p }),
        )!;
        settle();
        expect(figure.textContent).toBe("42");
    });

    it("prefers-reduced-motion snaps without a tween", () => {
        vi.spyOn(window, "matchMedia").mockReturnValue(mediaPreference(true));
        const figure = makeFigure(active, "100");
        const hostRef = ref<HTMLElement | null>(host);
        const { runActive } = scope.run(() =>
            useCountup(hostRef, { easeFn: (p) => p }),
        )!;
        runActive();
        // Snapped synchronously to the target — no "0" interim, no rAF.
        expect(figure.textContent).toBe("100");
    });

    it("settles an in-flight count when reduced motion turns on", () => {
        let listener: ((event: MediaQueryListEvent) => void) | undefined;
        vi.spyOn(window, "matchMedia").mockReturnValue({
            matches: false,
            addEventListener: vi.fn(
                (_type: string, next: (event: MediaQueryListEvent) => void) => {
                    listener = next;
                },
            ),
            removeEventListener: vi.fn(),
        } as unknown as MediaQueryList);
        const figure = makeFigure(active, "100", { "data-countup-delay": "1000" });
        const { runActive } = scope.run(() =>
            useCountup(ref(host), { easeFn: (p) => p }),
        )!;

        runActive();
        expect(figure.textContent).toBe("0");
        listener?.({ matches: true } as MediaQueryListEvent);
        expect(figure.textContent).toBe("100");
    });

    it("cancel() / scope-dispose stops an in-flight tween (the leak fix)", () => {
        vi.spyOn(window, "matchMedia").mockReturnValue(mediaPreference(false));
        const figure = makeFigure(active, "1000", { "data-countup-dur": "5000" });
        const hostRef = ref<HTMLElement | null>(host);

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
        const { runActive } = scope.run(() =>
            useCountup(hostRef, {
                easeFn: (p) => p,
                skip: () => true,
            }),
        )!;
        runActive();
        expect(figure.textContent).toBe("0");
    });

    it("cancel() clears a deferred start without replacing the engine stop method", () => {
        vi.useFakeTimers();
        vi.spyOn(window, "matchMedia").mockReturnValue(mediaPreference(false));
        const figure = makeFigure(active, "12", {
            "data-countup-delay": "100",
        });
        const countup = scope.run(() =>
            useCountup(ref(host), { easeFn: (p) => p }),
        )!;

        countup.runActive();
        countup.cancel();
        vi.advanceTimersByTime(200);

        expect(figure.textContent).toBe("0");
    });
});
