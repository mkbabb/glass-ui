import { effectScope } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useBreakpoint } from "../dom/useBreakpoint";

type FakeMql = {
    matches: boolean;
    media: string;
    onchange: ((ev: MediaQueryListEvent) => void) | null;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
    addListener: ReturnType<typeof vi.fn>;
    removeListener: ReturnType<typeof vi.fn>;
    dispatchEvent: ReturnType<typeof vi.fn>;
    trigger(matches: boolean): void;
};

let liveMqls: FakeMql[] = [];

function installMatchMedia(initialMatches = false): void {
    liveMqls = [];
    (window as Window & { matchMedia: (q: string) => MediaQueryList }).matchMedia
        = (query: string) => {
            const listeners = new Set<(ev: MediaQueryListEvent) => void>();
            const mql: FakeMql = {
                matches: initialMatches,
                media: query,
                onchange: null,
                addEventListener: vi.fn((_: string, cb: EventListener) =>
                    listeners.add(cb as (ev: MediaQueryListEvent) => void),
                ),
                removeEventListener: vi.fn((_: string, cb: EventListener) =>
                    listeners.delete(cb as (ev: MediaQueryListEvent) => void),
                ),
                addListener: vi.fn(),
                removeListener: vi.fn(),
                dispatchEvent: vi.fn(),
                trigger(next: boolean) {
                    mql.matches = next;
                    const ev = { matches: next, media: query } as MediaQueryListEvent;
                    for (const cb of listeners) cb(ev);
                },
            };
            liveMqls.push(mql);
            return mql as unknown as MediaQueryList;
        };
}

describe("useBreakpoint", () => {
    beforeEach(() => {
        installMatchMedia(false);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        // Restore happy-dom's stock matchMedia by deleting our override.
        delete (window as unknown as { matchMedia?: unknown }).matchMedia;
        liveMqls = [];
    });

    it("mirrors the initial matchMedia matches value", () => {
        installMatchMedia(true);
        const { matches } = useBreakpoint("(min-width: 720px)");
        expect(matches.value).toBe(true);
    });

    it("updates reactively on `change` events", () => {
        const { matches } = useBreakpoint("(min-width: 720px)");
        expect(matches.value).toBe(false);

        liveMqls[0]?.trigger(true);
        expect(matches.value).toBe(true);

        liveMqls[0]?.trigger(false);
        expect(matches.value).toBe(false);
    });

    it("tears down the listener on stop()", () => {
        const { stop } = useBreakpoint("(min-width: 1024px)");
        expect(liveMqls[0]?.addEventListener).toHaveBeenCalledTimes(1);

        stop();
        expect(liveMqls[0]?.removeEventListener).toHaveBeenCalledTimes(1);
    });

    it("auto-cleans on scope dispose", () => {
        const scope = effectScope();
        scope.run(() => {
            useBreakpoint("(prefers-color-scheme: dark)");
        });
        expect(liveMqls[0]?.addEventListener).toHaveBeenCalledTimes(1);

        scope.stop();
        expect(liveMqls[0]?.removeEventListener).toHaveBeenCalledTimes(1);
    });

    it("returns a permanently-false ref when matchMedia is unavailable", () => {
        delete (window as unknown as { matchMedia?: unknown }).matchMedia;
        const { matches } = useBreakpoint("(min-width: 720px)");
        expect(matches.value).toBe(false);
    });
});
