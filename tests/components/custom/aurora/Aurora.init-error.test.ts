import { createApp, defineComponent, h, type App } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const runtime = vi.hoisted(() => ({
    arm: vi.fn(),
    create: vi.fn(),
    dispose: vi.fn(),
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
    app.mount(document.createElement("div"));
    mountedApps.push(app);
    return app;
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
        runtime.arm.mockImplementation(() => {
            throw initError;
        });
        runtime.create.mockReturnValue({
            arm: runtime.arm,
            dispose: runtime.dispose,
            pause: vi.fn(),
            resume: vi.fn(),
        });
    });

    afterEach(() => {
        for (const app of mountedApps.splice(0)) app.unmount();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("routes deferred failures to the owning app handler without warning", () => {
        const errorHandler = vi.fn();
        mountAurora({ errorHandler });

        expect(errorHandler).toHaveBeenCalledWith(
            initError,
            expect.any(Object),
            "Aurora initialization",
        );
        expect(console.warn).not.toHaveBeenCalled();
    });

    it("prefers the component prop over runtime and app handlers", () => {
        const errorHandler = vi.fn();
        const runtimeOnInitError = vi.fn();
        const onInitError = vi.fn();
        mountAurora({ errorHandler, onInitError, runtimeOnInitError });

        expect(onInitError).toHaveBeenCalledOnce();
        expect(onInitError).toHaveBeenCalledWith(initError);
        expect(runtimeOnInitError).not.toHaveBeenCalled();
        expect(errorHandler).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
    });

    it("prefers the runtime handler over the app handler", () => {
        const errorHandler = vi.fn();
        const runtimeOnInitError = vi.fn();
        mountAurora({ errorHandler, runtimeOnInitError });

        expect(runtimeOnInitError).toHaveBeenCalledOnce();
        expect(runtimeOnInitError).toHaveBeenCalledWith(initError);
        expect(errorHandler).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
    });
});
