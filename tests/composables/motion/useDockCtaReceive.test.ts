import { afterEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useDockCtaReceive } from "@glass/composables/motion/morph/useDockCtaReceive";
import { springPreset } from "@glass/composables/motion/spring/springPresets";
import { mountComposable } from "../../utils/mountComposable";

function rect(x: number, y: number, width: number, height: number): DOMRect {
    return {
        x,
        y,
        top: y,
        left: x,
        right: x + width,
        bottom: y + height,
        width,
        height,
        toJSON: () => ({}),
    } as DOMRect;
}

function media(reduced = false, coarse = false): void {
    vi.stubGlobal("matchMedia", (query: string) => ({
        matches: query.includes("reduced-motion") ? reduced : coarse,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    }));
}

function elements() {
    const cta = document.createElement("button");
    const target = document.createElement("button");
    cta.getBoundingClientRect = () => rect(20, 20, 120, 44);
    target.getBoundingClientRect = () => rect(180, 140, 44, 44);
    document.body.append(cta, target);
    return { cta, target };
}

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.body.replaceChildren();
});

describe("useDockCtaReceive observables", () => {
    it("completes PRM with measured lifecycle and zero painted magnitude", () => {
        media(true);
        const { cta, target } = elements();
        let clock = 100;
        vi.spyOn(performance, "now").mockImplementation(() => clock++);
        const onReceived = vi.fn();
        const { result, unmount } = mountComposable(() =>
            useDockCtaReceive(ref(cta), { dockControl: ref(target), onReceived }),
        );

        result.receive();

        expect(result.observables.value).toMatchObject({
            phase: "completed",
            path: "reduced-motion",
            run: 1,
            travelPx: 0,
            scaleRatio: 1,
            withinBand: true,
            supportsReverse: false,
        });
        expect(result.observables.value.settledAtMs).not.toBeNull();
        expect(result.observables.value.handedOffAtMs).not.toBeNull();
        expect(result.observables.value.completedAtMs).not.toBeNull();
        expect(result.progress.value).toBe(1);
        expect(onReceived).toHaveBeenCalledOnce();
        unmount();
    });

    it("counts restart interruption and reset without inventing reverse playback", () => {
        media(false, true);
        const { cta, target } = elements();
        let raf = 0;
        vi.stubGlobal(
            "requestAnimationFrame",
            vi.fn(() => ++raf),
        );
        vi.stubGlobal("cancelAnimationFrame", vi.fn());
        const { result, unmount } = mountComposable(() =>
            useDockCtaReceive(ref(cta), { dockControl: ref(target) }),
        );

        result.receive();
        result.receive();
        expect(result.observables.value).toMatchObject({
            phase: "receiving",
            path: "coarse",
            run: 2,
            interruptions: 1,
            supportsReverse: false,
        });

        result.reset();
        expect(result.observables.value).toMatchObject({
            phase: "reset",
            interruptions: 2,
            resets: 1,
            withinBand: null,
        });
        expect(result.playing.value).toBe(false);
        unmount();
    });

    it("reports fine-path geometry and completion inside the selected spring band", async () => {
        media();
        const { cta, target } = elements();
        const frames: FrameRequestCallback[] = [];
        vi.stubGlobal(
            "requestAnimationFrame",
            vi.fn((cb: FrameRequestCallback) => {
                frames.push(cb);
                return frames.length;
            }),
        );
        vi.stubGlobal("cancelAnimationFrame", vi.fn());
        let clock = 1000;
        vi.spyOn(performance, "now").mockImplementation(() => clock);
        const { result, unmount } = mountComposable(() =>
            useDockCtaReceive(ref(cta), { dockControl: ref(target) }),
        );

        // The clock is DERIVED from the register the receive rides — the runner's
        // horizon is `response * 4`, and the default register is the coordinated-travel
        // `dock` row. A frozen millisecond literal here would be a second authority on
        // the spring table, wrong the moment the row is retuned (it was).
        const horizonMs = springPreset("dock").response * 4 * 1000;
        result.receive();
        frames.shift()?.(100);
        clock = 1000 + horizonMs;
        frames.shift()?.(100 + horizonMs);
        await Promise.resolve();
        await Promise.resolve();

        expect(result.observables.value).toMatchObject({
            phase: "completed",
            path: "fine",
            latencyMs: horizonMs,
            withinBand: true,
        });
        expect(result.observables.value.travelPx).toBeGreaterThan(16);
        expect(result.observables.value.scaleRatio).toBeGreaterThan(0.2);
        expect(result.observables.value.latencyBandMs).toEqual([
            horizonMs * 0.9,
            horizonMs * 1.2,
        ]);
        unmount();
    });
});
