import { createApp, defineComponent, h, type App } from "vue";
import { flushPromises } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const runtime = vi.hoisted(() => ({
    arm: vi.fn(),
    armAsync: vi.fn(),
    create: vi.fn(),
    dispose: vi.fn(),
    setScrollProgress: vi.fn(),
}));

vi.mock("@glass/components/aurora/composables/runtime", () => ({
    createAurora: runtime.create,
}));

import Aurora from "@glass/components/aurora/Aurora.vue";

const initError = new Error("shader link failed");
const mountedApps: App[] = [];
type VueErrorHandler = NonNullable<App["config"]["errorHandler"]>;

function mountAurora(options: {
    errorHandler: VueErrorHandler;
    onInitError?: (error: Error) => void;
    runtimeOnInitError?: (error: Error) => void;
}) {
    const app = createApp(
        defineComponent({
            render: () =>
                h(Aurora, {
                    renderMode: "webgl",
                    onInitError: options.onInitError,
                    runtimeOptions: {
                        forceWebGLUnderSoftwareRaster: true,
                        onInitError: options.runtimeOnInitError,
                    },
                }),
        }),
    );
    app.config.errorHandler = options.errorHandler;
    const host = document.createElement("div");
    app.mount(host);
    mountedApps.push(app);
    return { app, host };
}

describe("Aurora initialization error ownership", () => {
    beforeEach(() => {
        vi.spyOn(console, "warn").mockImplementation(() => undefined);
        vi.stubGlobal(
            "requestIdleCallback",
            vi.fn((callback: IdleRequestCallback) => {
                callback({ didTimeout: false, timeRemaining: () => 50 });
                return 1;
            }),
        );
        vi.stubGlobal("cancelIdleCallback", vi.fn());
        runtime.armAsync.mockRejectedValue(initError);
        runtime.create.mockReturnValue({
            arm: runtime.arm,
            armAsync: runtime.armAsync,
            update: vi.fn(),
            dispose: runtime.dispose,
            pause: vi.fn(),
            resume: vi.fn(),
            setScrollProgress: runtime.setScrollProgress,
        });
    });

    afterEach(() => {
        for (const app of mountedApps.splice(0)) app.unmount();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("routes deferred failures to the owning app handler without warning", async () => {
        const errorHandler = vi.fn();
        mountAurora({ errorHandler });
        await flushPromises();

        expect(errorHandler).toHaveBeenCalledWith(
            initError,
            expect.any(Object),
            "Aurora initialization",
        );
        expect(console.warn).not.toHaveBeenCalled();
    });

    it("prefers the component prop over runtime and app handlers", async () => {
        const errorHandler = vi.fn();
        const runtimeOnInitError = vi.fn();
        const onInitError = vi.fn();
        mountAurora({ errorHandler, onInitError, runtimeOnInitError });
        await flushPromises();

        expect(onInitError).toHaveBeenCalledOnce();
        expect(onInitError).toHaveBeenCalledWith(initError);
        expect(runtimeOnInitError).not.toHaveBeenCalled();
        expect(errorHandler).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
    });

    it("prefers the runtime handler over the app handler", async () => {
        const errorHandler = vi.fn();
        const runtimeOnInitError = vi.fn();
        mountAurora({ errorHandler, runtimeOnInitError });
        await flushPromises();

        expect(runtimeOnInitError).toHaveBeenCalledOnce();
        expect(runtimeOnInitError).toHaveBeenCalledWith(initError);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
    });

    it("keeps the live canvas hidden until backend readiness resolves", async () => {
        let resolveReady!: () => void;
        runtime.armAsync.mockReturnValue(
            new Promise<void>((resolve) => {
                resolveReady = resolve;
            }),
        );
        const { host } = mountAurora({ errorHandler: vi.fn() });
        const canvas = host.querySelector("canvas")!;

        expect(canvas.classList.contains("aurora-canvas--armed")).toBe(false);
        resolveReady();
        await flushPromises();
        expect(canvas.classList.contains("aurora-canvas--armed")).toBe(true);
    });
});
