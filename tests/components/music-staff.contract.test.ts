import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { MusicStaff, type MusicStaffNoteEvent } from "@glass/components/music-staff";

const notes: MusicStaffNoteEvent[] = [
    { id: "one", midi: 64, start: 0, duration: 1 },
    { id: "two", midi: 67, start: 1, duration: 0.5 },
];

describe("MusicStaff", () => {
    it("renders one labelled image with vector note identities and clamped progress", () => {
        const wrapper = mount(MusicStaff, {
            props: { notes, label: "Archive quotation", progress: 4, phase: "rest" },
        });
        const viewport = wrapper.get(".music-staff__viewport");

        expect(viewport.attributes("role")).toBe("img");
        expect(viewport.attributes("tabindex")).toBe("0");
        expect(viewport.attributes("aria-label")).toContain("Archive quotation");
        expect(viewport.attributes("aria-label")).toContain("E4, G4");
        expect(wrapper.findAll("[data-note-id]").map((note) => note.attributes("data-note-id")))
            .toEqual(["one", "two"]);
        expect(wrapper.get(".music-staff__playhead").attributes("transform"))
            .toBe("translate(832 0)");
    });

    it("removes decorative notation from focus and the accessibility tree", () => {
        const wrapper = mount(MusicStaff, {
            props: { notes: [], label: "Neutral staff", decorative: true, phase: "rest" },
        });

        expect(wrapper.get("figure").attributes("aria-hidden")).toBe("true");
        expect(wrapper.get(".music-staff__viewport").attributes("role")).toBeUndefined();
        expect(wrapper.get(".music-staff__viewport").attributes("tabindex")).toBeUndefined();
    });

    it("pages an overflowing score with Arrow keys and Home/End", async () => {
        const wrapper = mount(MusicStaff, {
            props: { notes, label: "Keyboard score", phase: "rest" },
        });
        const viewport = wrapper.get<HTMLElement>(".music-staff__viewport");
        Object.defineProperties(viewport.element, {
            scrollWidth: { configurable: true, value: 1000 },
            clientWidth: { configurable: true, value: 400 },
            scrollLeft: { configurable: true, writable: true, value: 100 },
        });
        const scrollTo = vi.fn();
        viewport.element.scrollTo = scrollTo;

        await viewport.trigger("keydown", { key: "ArrowRight" });
        await viewport.trigger("keydown", { key: "Home" });
        await viewport.trigger("keydown", { key: "End" });

        expect(scrollTo).toHaveBeenNthCalledWith(1, { left: 388, behavior: "auto" });
        expect(scrollTo).toHaveBeenNthCalledWith(2, { left: 0, behavior: "auto" });
        expect(scrollTo).toHaveBeenNthCalledWith(3, { left: 1000, behavior: "auto" });
    });
});
