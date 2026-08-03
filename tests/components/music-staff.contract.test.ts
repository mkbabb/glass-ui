import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { MusicStaff, type MusicStaffNoteEvent } from "@glass/components/music-staff";

const notes: MusicStaffNoteEvent[] = [
    { id: "one", midi: 64, beat: 0, beats: 1 },
    { id: "two", midi: 67, beat: 1, beats: 0.5 },
];

const windowOf = (wrapper: ReturnType<typeof mount>) => wrapper.get(".music-staff__window");

describe("MusicStaff score mode", () => {
    it("names the staff with pitch and rhythm, and identifies every note", () => {
        const wrapper = mount(MusicStaff, { props: { notes, label: "Archive quotation" } });
        const target = windowOf(wrapper);

        expect(target.attributes("role")).toBe("img");
        expect(target.attributes("tabindex")).toBe("0");
        expect(target.attributes("aria-label"))
            .toBe("Archive quotation. Treble staff, 2 notes: E4 quarter, G4 eighth.");
        expect(wrapper.findAll("[data-note-id]").map((note) => note.attributes("data-note-id")))
            .toEqual(["one", "two"]);
    });

    it("renders no playhead and no clip until progress is reported", () => {
        const wrapper = mount(MusicStaff, { props: { notes, label: "Unreported" } });
        expect(wrapper.find(".music-staff__playhead").exists()).toBe(false);
        expect(wrapper.find(".music-staff__layer--accent").exists()).toBe(false);
    });

    it("clamps progress and seats the playhead on the clip's leading edge", () => {
        const wrapper = mount(MusicStaff, { props: { notes, label: "Played", progress: 4 } });
        const playhead = wrapper.get(".music-staff__playhead").attributes("style");
        const edge = wrapper.get(".music-staff__clip-edge").attributes("style");

        expect(playhead).toBe(edge);
        expect(playhead).toContain("translateX(");
        expect(wrapper.get(".music-staff__layer--accent").attributes("clip-path"))
            .toMatch(/^url\(#music-staff-clip-/);
    });

    it("carries no hand-rolled keyboard contract", () => {
        const wrapper = mount(MusicStaff, { props: { notes, label: "Keyboard" } });
        expect(wrapper.find("[aria-keyshortcuts]").exists()).toBe(false);
    });
});

describe("MusicStaff loading mode", () => {
    it("is an indeterminate progressbar that omits aria-valuenow", () => {
        const wrapper = mount(MusicStaff, { props: { label: "Loading the archive", mode: "loading" } });
        const target = windowOf(wrapper);

        expect(target.attributes("role")).toBe("progressbar");
        expect(target.attributes("aria-busy")).toBe("true");
        expect(target.attributes("aria-label")).toBe("Loading the archive");
        expect(target.attributes("aria-valuemin")).toBe("0");
        expect(target.attributes("aria-valuemax")).toBe("1");
        expect(target.attributes("aria-valuenow")).toBeUndefined();
        expect(target.attributes("tabindex")).toBeUndefined();
    });

    it("streams its own composed motif regardless of the notes it is given", () => {
        const wrapper = mount(MusicStaff, { props: { notes, label: "Loading", mode: "loading" } });
        const ids = wrapper.findAll("[data-note-id]").map((note) => note.attributes("data-note-id"));

        expect(ids).toHaveLength(14);
        expect(ids).not.toContain("one");
        expect(wrapper.findAll(".music-staff__reel > use")).toHaveLength(3);
        expect(wrapper.find(".music-staff__reading").exists()).toBe(true);
        expect(wrapper.find(".music-staff__beam").exists()).toBe(true);
    });

    it("reports a determinate value and seals at one", () => {
        const wrapper = mount(MusicStaff, {
            props: { label: "Loading", mode: "loading", progress: 0.5 },
        });
        expect(windowOf(wrapper).attributes("aria-valuenow")).toBe("0.5");
        expect(windowOf(wrapper).attributes("aria-valuetext")).toBe("50%");
        expect(wrapper.get("figure").attributes("data-sealed")).toBeUndefined();

        const sealed = mount(MusicStaff, {
            props: { label: "Loading", mode: "loading", progress: 1 },
        });
        expect(sealed.get("figure").attributes("data-sealed")).toBe("true");
    });
});

describe("MusicStaff surface", () => {
    it("takes the glass rung only for the folio material", () => {
        const folio = mount(MusicStaff, { props: { notes, label: "Folio" } });
        expect(windowOf(folio).classes()).toContain("glass-resting");
        expect(folio.get("figure").attributes("data-material")).toBe("folio");

        const bare = mount(MusicStaff, { props: { notes, label: "Bare", material: "bare" } });
        expect(windowOf(bare).classes()).not.toContain("glass-resting");
    });

    it("removes decorative notation from focus and the accessibility tree", () => {
        const wrapper = mount(MusicStaff, {
            props: { notes: [], label: "Neutral staff", decorative: true },
        });

        expect(wrapper.get("figure").attributes("aria-hidden")).toBe("true");
        expect(windowOf(wrapper).attributes("role")).toBeUndefined();
        expect(windowOf(wrapper).attributes("tabindex")).toBeUndefined();
        expect(windowOf(wrapper).attributes("aria-label")).toBeUndefined();
    });

    it("sizes from the one space knob, never from a width or height prop", () => {
        const wrapper = mount(MusicStaff, { props: { notes, label: "Sized" } });
        const style = wrapper.get("figure").attributes("style") ?? "";

        expect(style).toContain("--music-staff-width:");
        expect(style).toContain("--music-staff-height:");
        expect(wrapper.get("svg").attributes("preserveAspectRatio")).toBeUndefined();
        expect(Object.keys(MusicStaff.props ?? {})).toEqual(
            expect.not.arrayContaining([
                "phase", "width", "height", "windowStart", "windowEnd", "maxNotes",
                "describedNoteLimit",
            ]),
        );
    });
});
