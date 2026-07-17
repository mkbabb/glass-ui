import { config, enableAutoUnmount } from "@vue/test-utils";
import { afterEach, vi } from "vitest";

config.global.stubs = {
    teleport: true,
};

class TestResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}

class TestIntersectionObserver {
    static instances: TestIntersectionObserver[] = [];
    readonly observe = vi.fn();
    readonly unobserve = vi.fn();
    readonly disconnect = vi.fn();

    constructor(
        private readonly callback: IntersectionObserverCallback,
        readonly options?: IntersectionObserverInit,
    ) {
        TestIntersectionObserver.instances.push(this);
    }

    trigger(target: Element, isIntersecting = true): void {
        this.callback(
            [
                {
                    target,
                    isIntersecting,
                    intersectionRatio: isIntersecting ? 1 : 0,
                    boundingClientRect: target.getBoundingClientRect(),
                    intersectionRect: target.getBoundingClientRect(),
                    rootBounds: null,
                    time: performance.now(),
                } as IntersectionObserverEntry,
            ],
            this as unknown as IntersectionObserver,
        );
    }
}

Object.defineProperty(globalThis, "ResizeObserver", {
    configurable: true,
    writable: true,
    value: TestResizeObserver,
});

Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    writable: true,
    value: TestIntersectionObserver,
});

Object.defineProperty(globalThis, "requestAnimationFrame", {
    configurable: true,
    writable: true,
    value: (cb: FrameRequestCallback) =>
        window.setTimeout(() => cb(performance.now()), 0),
});

Object.defineProperty(globalThis, "cancelAnimationFrame", {
    configurable: true,
    writable: true,
    value: (id: number) => window.clearTimeout(id),
});

Object.defineProperty(globalThis, "CSS", {
    configurable: true,
    writable: true,
    value: {
        supports: vi.fn(() => true),
    },
});

Object.defineProperty(window, "chrome", {
    configurable: true,
    writable: true,
    value: {},
});

if (!("PointerEvent" in window)) {
    Object.defineProperty(globalThis, "PointerEvent", {
        configurable: true,
        writable: true,
        value: MouseEvent,
    });
}

// happy-dom lacks `document.elementsFromPoint` (the hit-test stack-walk). The
// adaptive-glass backdrop sampler (`useGlassBackdropLuminance`, wired ON by
// default for the dock via the `autoLuminance` default-TRUE
// signal) calls it on mount; without the stub every dock unit test crashes at the
// first sample. The product path is CORRECT and unchanged — a happy-dom stub is
// HONEST (the test env genuinely has no painted stack to hit-test), NOT a product
// fallback that would hide a dead primary (the NO-MASKING-FALLBACK edict). An
// empty stack degrades to the static-ground floor exactly as an SSR/no-paint env would.
// happy-dom's `document` is an `HTMLDocument` instance whose resolved prototype is
// NOT the global `Document.prototype`, so the stub lands on the live instance's own
// prototype (covers every `document` in the file) + the instance as a belt-and-braces.
const elementsFromPointStub = () => [] as Element[];
for (const target of [
    Object.getPrototypeOf(document) as object,
    document as unknown as object,
]) {
    Object.defineProperty(target, "elementsFromPoint", {
        configurable: true,
        writable: true,
        value: elementsFromPointStub,
    });
}

HTMLElement.prototype.scrollIntoView = vi.fn();
HTMLElement.prototype.animate = vi.fn(() => ({
    cancel: vi.fn(),
    play: vi.fn(),
    finished: Promise.resolve(),
})) as unknown as typeof HTMLElement.prototype.animate;
HTMLElement.prototype.getAnimations = vi.fn(() => []);

HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    createImageData: (width: number, height: number) => ({
        width,
        height,
        data: new Uint8ClampedArray(width * height * 4),
    }),
    putImageData: vi.fn(),
    createRadialGradient: () => ({ addColorStop: vi.fn() }),
    createLinearGradient: () => ({ addColorStop: vi.fn() }),
    fillRect: vi.fn(),
    fillStyle: "",
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;

HTMLCanvasElement.prototype.toDataURL = vi.fn(() => "data:image/png;base64,AA==");

// Every mounted wrapper unmounts after its test — component scopes dispose, so
// composable rAF/timer loops (useLeadTrail et al.) cancel instead of firing into a
// torn-down environment (the post-teardown ReferenceError leak class).
enableAutoUnmount(afterEach);

afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
    document.documentElement.className = "";
    document.documentElement.removeAttribute("style");
    TestIntersectionObserver.instances.length = 0;
});

export { TestIntersectionObserver, TestResizeObserver };
