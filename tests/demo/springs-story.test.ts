import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import SpringsStory from "../../demo/stories/motion/springs.vue";
import { springProjection } from "@glass/composables/motion/spring/springProjection";
import { springPreset } from "@glass/composables/motion/spring/springPresets";

function readVar(style: string | undefined, name: string): string {
    const match = new RegExp(`${name}:\\s*([^;]+)`).exec(style ?? "");
    return match ? match[1].trim() : "";
}

const PassThrough = { template: "<div><slot /></div>" };
const STUBS = {
    StoryPage: PassThrough,
    StorySection: PassThrough,
    StoryPlayButton: true,
    Button: PassThrough,
    Label: true,
    LabeledSlider: true,
    Select: PassThrough,
    SelectContent: PassThrough,
    SelectItem: PassThrough,
    SelectTrigger: PassThrough,
    SelectValue: true,
    Check: true,
    Copy: true,
};

function mountStory() {
    return mount(SpringsStory, { global: { stubs: STUBS } });
}

function installClipboard(writeText: (text: string) => Promise<void>): void {
    Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: vi.fn(writeText) },
    });
}

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: undefined,
    });
});

describe("Springs story", () => {
    it("projects both previews from stage-owned responsive geometry", () => {
        const wrapper = mountStory();
        const stages = wrapper
            .findAll("div")
            .filter((node) => node.attributes("style")?.includes("--preview-cap:"));

        expect(stages).toHaveLength(2);
        expect(stages[0].attributes("style")).toContain("--preview-start: 1.5rem");
        expect(stages[0].attributes("style")).toContain("--preview-end: 1.5rem");
        expect(stages[0].attributes("style")).toContain("--preview-inline-size: 7rem");
        expect(stages[0].attributes("style")).toContain("--preview-block-size: 5rem");
        expect(stages[1].attributes("style")).toContain("--preview-start: 0.5rem");
        expect(stages[1].attributes("style")).toContain("--preview-end: 0.5rem");

        const previews = stages.map((stage) => stage.get("div"));
        for (const preview of previews) {
            expect(preview.attributes("style")).toContain(
                "inset-inline-start: var(--preview-start)",
            );
            expect(preview.attributes("style")).toContain(
                "inline-size: var(--preview-inline-size)",
            );
            expect(preview.attributes("style")).not.toContain("will-change");
        }
    });

    it("carries the containment mechanism vars on both stages", () => {
        // --preview-envelope and --preview-peak ARE the clipping guard: travel is
        // divided by the projected overshoot peak so even the peak frame stays
        // inside available width. A regression that drops either re-opens clipping.
        const wrapper = mountStory();
        const stages = wrapper
            .findAll("div")
            .filter((node) => node.attributes("style")?.includes("--preview-cap:"));
        expect(stages).toHaveLength(2);

        for (const stage of stages) {
            const envelope = readVar(stage.attributes("style"), "--preview-envelope");
            expect(envelope.length).toBeGreaterThan(0);

            const peak = Number(readVar(stage.attributes("style"), "--preview-peak"));
            expect(Number.isFinite(peak)).toBe(true);
            expect(peak).toBeGreaterThanOrEqual(1);
        }

        // The rendered peak equals the owning projection's peak (read from the
        // SpringProjection owner, not a re-sampled copy): named stage from its
        // default preset, playground stage from its default response/damping pair.
        const namedPeak = Number(readVar(stages[0].attributes("style"), "--preview-peak"));
        expect(namedPeak).toBeCloseTo(springProjection(springPreset("smooth")).peak, 6);

        const playgroundPeak = Number(
            readVar(stages[1].attributes("style"), "--preview-peak"),
        );
        expect(playgroundPeak).toBeCloseTo(
            springProjection({ response: 0.5, dampingFraction: 0.86 }).peak,
            6,
        );
    });

    it("announces pending and successful copy feedback", async () => {
        vi.useFakeTimers();
        let resolveCopy!: () => void;
        installClipboard(
            () =>
                new Promise<void>((resolve) => {
                    resolveCopy = resolve;
                }),
        );
        const wrapper = mountStory();
        const button = wrapper.get('button[aria-label="Copy linear() stops"]');

        await button.trigger("click");
        expect(button.attributes("aria-disabled")).toBe("true");
        expect(button.attributes("disabled")).toBeUndefined();
        expect(wrapper.text()).toContain("Copying stops…");

        resolveCopy();
        await flushPromises();
        expect(button.attributes("aria-label")).toBe("Copied");
        expect(wrapper.text()).toContain("Stops copied.");

        await vi.advanceTimersByTimeAsync(1400);
        await nextTick();
        expect(button.attributes("aria-label")).toBe("Copy linear() stops");
    });

    it("invalidates copy feedback when the displayed stops change", async () => {
        let resolveCopy!: () => void;
        installClipboard(
            () =>
                new Promise<void>((resolve) => {
                    resolveCopy = resolve;
                }),
        );
        const wrapper = mountStory();
        const button = wrapper.get('button[aria-label="Copy linear() stops"]');

        await button.trigger("click");
        expect(button.attributes("aria-disabled")).toBe("true");

        const smooth = wrapper
            .findAll("button")
            .find((candidate) => candidate.text().trim() === "smooth");
        expect(smooth).toBeTruthy();
        await smooth!.trigger("click");
        await nextTick();

        expect(button.attributes("aria-label")).toBe("Copy linear() stops");
        expect(button.attributes("aria-disabled")).toBeUndefined();
        expect(wrapper.text()).not.toContain("Copying stops…");

        resolveCopy();
        await flushPromises();
        expect(button.attributes("aria-label")).toBe("Copy linear() stops");
        expect(wrapper.text()).not.toContain("Stops copied.");
    });

    it("keeps a useful retry state after copy failure", async () => {
        installClipboard(async () => {
            throw new Error("denied");
        });
        const wrapper = mountStory();
        const button = wrapper.get('button[aria-label="Copy linear() stops"]');

        await button.trigger("click");
        await flushPromises();

        expect(button.attributes("aria-label")).toBe("Retry copying linear() stops");
        expect(wrapper.text()).toContain(
            "Copy failed. Select the stops above and copy manually.",
        );
        expect(button.attributes("aria-disabled")).toBeUndefined();
    });
});
