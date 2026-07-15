import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ConstellationField } from "@glass/components/constellation";

const substrate = vi.hoisted(() => ({
    render: undefined as
        | ((ctx: CanvasRenderingContext2D, now: number) => void)
        | undefined,
    dispose: vi.fn(),
    wake: vi.fn(),
    suspend: vi.fn(),
    resume: vi.fn(),
}));

const useCanvas2D = vi.hoisted(() =>
    vi.fn(
        (options: {
            setup: (ctx: CanvasRenderingContext2D) => {
                render: (ctx: CanvasRenderingContext2D, now: number) => void;
            };
        }) => {
            substrate.render = options.setup({} as CanvasRenderingContext2D).render;
            return {
                reducedMotion: false,
                dispose: substrate.dispose,
                wake: substrate.wake,
                suspend: substrate.suspend,
                resume: substrate.resume,
            };
        },
    ),
);

vi.mock("@glass/composables/glass/canvas2d", () => ({ useCanvas2D }));

import Constellation from "@glass/components/constellation/Constellation.vue";

function context(events: string[] = []): CanvasRenderingContext2D {
    return {
        clearRect: vi.fn(() => events.push("clear")),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(() => events.push("neutral")),
        arc: vi.fn(),
        fill: vi.fn(() => events.push("neutral")),
        save: vi.fn(),
        restore: vi.fn(),
        globalAlpha: 1,
        lineWidth: 1,
        strokeStyle: "",
        fillStyle: "",
    } as unknown as CanvasRenderingContext2D;
}

describe("Constellation Canvas2D lifecycle", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        substrate.render = undefined;
    });

    it("uses the shared Canvas2D lifecycle and releases it after the theme observer", async () => {
        const wrapper = mount(Constellation, { attachTo: document.body });
        expect(useCanvas2D).toHaveBeenCalledOnce();
        substrate.wake.mockClear();

        document.documentElement.classList.add("dark");
        await vi.waitFor(() => expect(substrate.wake).toHaveBeenCalledTimes(1));

        wrapper.unmount();
        expect(substrate.dispose).toHaveBeenCalledTimes(1);
        substrate.wake.mockClear();

        document.documentElement.classList.remove("dark");
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(substrate.wake).not.toHaveBeenCalled();
    });

    it("invokes drawOverlay exactly once as the final pass with frozen time", async () => {
        const events: string[] = [];
        const overlay = vi.fn(
            (_ctx: CanvasRenderingContext2D, _field: ConstellationField, now: number) =>
                events.push("overlay"),
        );
        const wrapper = mount(Constellation, {
            props: { freeze: true, seed: "static", drawOverlay: overlay },
        });

        substrate.render?.(context(events), 4321);
        expect(overlay).toHaveBeenCalledOnce();
        expect(overlay.mock.calls[0][2]).toBe(0);
        expect(events.at(-1)).toBe("overlay");
        await Promise.resolve();
        expect(substrate.suspend).toHaveBeenCalledWith("manual");
        wrapper.unmount();
    });

    it("makes retained warp and well input keyboard-operable through one host", () => {
        const wrapper = mount(Constellation, {
            props: {
                seed: "interaction",
                pointerReactive: false,
                warpOnClick: true,
                gravityWell: true,
            },
        });
        substrate.render?.(context(), 100);

        const host = wrapper.get(".constellation");
        expect(host.attributes("role")).toBe("button");
        expect(host.attributes("tabindex")).toBe("0");
        host.element.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

        const exposed = wrapper.vm as unknown as {
            field: { warp: { targetIdx: number }; well?: { target: number } };
        };
        expect(exposed.field.warp.targetIdx).toBeGreaterThanOrEqual(0);
        expect(exposed.field.well?.target).toBe(1);

        host.element.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
        expect(exposed.field.well?.target).toBe(0);
        wrapper.unmount();
    });
});
