import { ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TestIntersectionObserver } from "../setup";
import { useIntersectionPause } from "@glass/composables/motion/core";

function setDocumentHidden(hidden: boolean): void {
    Object.defineProperty(document, "hidden", {
        configurable: true,
        value: hidden,
    });
    document.dispatchEvent(new Event("visibilitychange"));
}

describe("useIntersectionPause", () => {
    afterEach(() => {
        setDocumentHidden(false);
        vi.restoreAllMocks();
    });

    it("pauses and resumes a runtime from intersection and document visibility", () => {
        const element = document.createElement("div");
        document.body.appendChild(element);
        const target = ref<Element | null>(element);
        const runtime = {
            pause: vi.fn(),
            resume: vi.fn(),
        };

        const controls = useIntersectionPause(target, runtime);
        const observer = TestIntersectionObserver.instances.at(-1);

        expect(observer).toBeDefined();
        expect(observer?.observe).toHaveBeenCalledWith(element);
        expect(runtime.resume).toHaveBeenCalledTimes(1);
        expect(controls.isPaused.value).toBe(false);

        observer?.trigger(element, false);
        expect(runtime.pause).toHaveBeenCalledTimes(1);
        expect(controls.isPaused.value).toBe(true);

        setDocumentHidden(true);
        expect(runtime.pause).toHaveBeenCalledTimes(1);
        expect(controls.isDocumentVisible.value).toBe(false);

        setDocumentHidden(false);
        expect(runtime.resume).toHaveBeenCalledTimes(1);
        expect(controls.isPaused.value).toBe(true);

        observer?.trigger(element, true);
        expect(runtime.resume).toHaveBeenCalledTimes(2);
        expect(controls.isPaused.value).toBe(false);

        setDocumentHidden(true);
        expect(runtime.pause).toHaveBeenCalledTimes(2);
        expect(controls.isPaused.value).toBe(true);

        setDocumentHidden(false);
        expect(runtime.resume).toHaveBeenCalledTimes(3);
        expect(controls.isPaused.value).toBe(false);

        controls.dispose();
        expect(observer?.disconnect).toHaveBeenCalledTimes(1);
    });
});
