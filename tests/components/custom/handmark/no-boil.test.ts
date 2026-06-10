// E1.2b — proof: NO BOIL FOR NON-BOIL MARKS (E4's second arm, structural).
//
// The E4 root: every hand-mark on a page subscribed the singleton rAF scheduler on
// mount — even DRAW-ON / STATIC marks that animate nothing — pinning the main thread
// at ~99% CPU. The pencil-boil §1 fix gates the SUBSCRIPTION on frameCount>1; THIS
// fix is the second, structural grain: a non-boiling mark never even CONSTRUCTS the
// `useLineBoil` composable. No clock instance ⇒ no `watchEffect`, no subscriber, no
// cost — the zero-cost-when-static invariant made structural, not merely scheduled-away.
//
// We spy on the pencil-boil `useLineBoil` export and assert it is CONSTRUCTED only
// for the marks whose resolved animation actually boils (`boil` / `draw-then-boil`),
// and NEVER for `none` / `draw-on`.

import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Spy on the real composable: it must be called ONLY when the mark boils.
const useLineBoilSpy = vi.fn();
vi.mock("@mkbabb/pencil-boil", async (importOriginal) => {
    const actual = await importOriginal<typeof import("@mkbabb/pencil-boil")>();
    return {
        ...actual,
        useLineBoil: (...args: Parameters<typeof actual.useLineBoil>) => {
            useLineBoilSpy(...args);
            return actual.useLineBoil(...args);
        },
    };
});

// import AFTER the mock is registered so the SFC binds the spied export.
import HandMark from "../../../../src/components/custom/handmark/HandMark.vue";

function mockPRM(matches: boolean): void {
    Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: (query: string) =>
            ({
                matches: query.includes("prefers-reduced-motion") ? matches : false,
                media: query,
                onchange: null,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                addListener: vi.fn(),
                removeListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }) as unknown as MediaQueryList,
    });
}

beforeEach(() => {
    mockPRM(false);
    useLineBoilSpy.mockClear();
});
afterEach(() => vi.restoreAllMocks());

describe("E1.2b — useLineBoil is constructed ONLY for boiling marks", () => {
    it("a STATIC mark (animation=none) NEVER constructs useLineBoil", () => {
        const w = mount(HandMark, {
            props: { brush: "crayon", animation: "none" },
            slots: { default: "static" },
        });
        expect(useLineBoilSpy).not.toHaveBeenCalled();
        w.unmount();
    });

    it("a DRAW-ON mark NEVER constructs useLineBoil (the USF case — zero frames)", () => {
        const w = mount(HandMark, {
            props: { brush: "crayon", animation: "draw-on", appear: "manual" },
            slots: { default: "who pays in" },
        });
        expect(useLineBoilSpy).not.toHaveBeenCalled();
        // and the no-op boil clock's start() is harmless (never throws, never ticks).
        const vm = w.vm as unknown as { play: () => void };
        expect(() => vm.play()).not.toThrow();
        w.unmount();
    });

    it("a BOIL mark DOES construct useLineBoil (the clock the boil genuinely needs)", () => {
        const w = mount(HandMark, {
            props: { brush: "crayon", animation: "boil" },
            slots: { default: "alive" },
        });
        expect(useLineBoilSpy).toHaveBeenCalledTimes(1);
        w.unmount();
    });

    it("a DRAW-THEN-BOIL mark DOES construct useLineBoil (it settles into a boil)", () => {
        const w = mount(HandMark, {
            props: { brush: "crayon", animation: "draw-then-boil", appear: "manual" },
            slots: { default: "alive" },
        });
        expect(useLineBoilSpy).toHaveBeenCalledTimes(1);
        w.unmount();
    });
});
