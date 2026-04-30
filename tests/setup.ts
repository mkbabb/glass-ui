import { config } from "@vue/test-utils";
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

afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
    document.documentElement.className = "";
    document.documentElement.removeAttribute("style");
    TestIntersectionObserver.instances.length = 0;
});

export { TestIntersectionObserver, TestResizeObserver };
