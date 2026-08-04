import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { MusicStaff, type MusicStaffNoteEvent } from "@glass/components/music-staff";
import { engraveMusicStaff, LOADING_BEATS, LOADING_MOTIF }
    from "@glass/components/music-staff/staffGeometry";

// `import.meta.url` is non-file under the test environment, so `process.cwd()` is
// the house idiom (tests/gates/token-graph.test.ts).
const source = (file: string) => readFileSync(
    join(process.cwd(), "src/components/music-staff", file),
    "utf8",
);

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

        const reel = engraveMusicStaff(LOADING_MOTIF, { loopBeats: LOADING_BEATS });
        expect(ids).toHaveLength(14);
        expect(ids).not.toContain("one");
        // One copy per period the reel spans, plus the drawn original: the count
        // that keeps the far edge inked at the end of every cycle.
        expect(wrapper.findAll(".music-staff__reel > use")).toHaveLength(reel.reelCopies);
        expect(reel.noteX0 + reel.reelCopies * reel.period).toBeGreaterThanOrEqual(reel.widthSp);
        expect(wrapper.find(".music-staff__reading").exists()).toBe(true);
        expect(wrapper.find(".music-staff__beam").exists()).toBe(true);
    });

    it("rules the whole window, and keeps the staff furniture out of the ink", () => {
        const wrapper = mount(MusicStaff, { props: { label: "Loading", mode: "loading" } });
        const furniture = wrapper.get(".music-staff__furniture");

        expect(furniture.findAll(".music-staff__line")).toHaveLength(5);
        expect(furniture.findAll(".music-staff__barline")).toHaveLength(1);
        expect(furniture.find(".music-staff__reading").exists()).toBe(true);
        // The SVG carries ink only — every rule the reel rides past is window space.
        expect(wrapper.find("svg .music-staff__line").exists()).toBe(false);
        expect(wrapper.find("svg .music-staff__barline").exists()).toBe(false);
        // And the transport is masked, so ink never crosses the parked clef.
        expect(wrapper.get(".music-staff__transport").attributes("mask"))
            .toMatch(/^url\(#music-staff-mask-/);
    });

    it("stops when it seals: no strike, no busy state, one final barline", () => {
        const sealed = mount(MusicStaff, {
            props: { label: "Loading", mode: "loading", progress: 1 },
        });
        expect(windowOf(sealed).attributes("aria-busy")).toBeUndefined();
        expect(windowOf(sealed).attributes("aria-valuenow")).toBe("1");
        expect(sealed.find(".music-staff__seal").exists()).toBe(true);

        const running = mount(MusicStaff, {
            props: { label: "Loading", mode: "loading", progress: 0.5 },
        });
        expect(windowOf(running).attributes("aria-busy")).toBe("true");
        expect(running.find(".music-staff__seal").exists()).toBe(false);

        // The strike is cleared, not paused: a paused strike freezes one note
        // mid-accent under a score that has finished.
        expect(source("styles.css")).toMatch(
            /\.music-staff\[data-sealed\] \.music-staff__note \{ animation: none; \}/,
        );
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

describe("MusicStaff public tokens", () => {
    const PUBLIC = ["space", "ink", "accent", "folio", "loop-duration"];

    it("reads all five with a fallback and declares not one of them", () => {
        const styles = source("styles.css").replace(/\s+/g, "");
        for (const token of PUBLIC) {
            expect(styles, `--music-staff-${token} is never read`)
                .toContain(`var(--music-staff-${token},`);
        }
        for (const file of ["styles.css", "MusicStaff.vue"]) {
            // Strip every var() READ; anything left is a DECLARATION on the
            // element, and an element declaration beats every ancestor override —
            // which is the whole wrapper idiom the README documents.
            const declarations = source(file)
                .replace(/\s+/g, "")
                .replace(/var\(--music-staff-[a-z-]+/g, "");
            expect(declarations, `${file} declares a public token on the element`)
                .not.toMatch(/--music-staff-[a-z]/);
        }
    });

    it("writes only private vars inline, in every mode", () => {
        for (const props of [
            { notes, label: "Score" },
            { label: "Loading", mode: "loading" as const, progress: 0.5 },
        ]) {
            const wrapper = mount(MusicStaff, { props });
            const inline = wrapper.get("figure").attributes("style") ?? "";
            for (const token of PUBLIC) {
                expect(inline).not.toContain(`--music-staff-${token}:`);
            }
            const note = wrapper.find("[data-note-id]").attributes("style") ?? "";
            expect(note).not.toMatch(/(^|[^_])--music-staff-[a-z]+:/);
        }
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

    it("writes no pseudo-element onto the glass rung it borrows", () => {
        // The rung owns its ::before and ::after — the specular and the paper
        // grain, declared sole writers upstream. A component pseudo on the same
        // element replaces them and paints inside their blend and opacity, which
        // is how the progress ink landed at 0.025 and the seal at the left edge.
        // Both are the component's OWN elements now.
        const declarations = source("styles.css").replace(/\/\*[\s\S]*?\*\//g, "");
        expect(declarations).not.toMatch(/::(before|after)/);

        const sealed = mount(MusicStaff, {
            props: { label: "Loading", mode: "loading", progress: 1 },
        });
        expect(sealed.get(".music-staff__seal").element.parentElement)
            .toBe(windowOf(sealed).element);

        const running = mount(MusicStaff, {
            props: { label: "Loading", mode: "loading", progress: 0.5 },
        });
        expect(running.find(".music-staff__progress-ink").exists()).toBe(true);
        expect(running.find(".music-staff__seal").exists()).toBe(false);
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

        expect(style).toContain("--_music-staff-width:");
        expect(style).toContain("--_music-staff-height:");
        expect(wrapper.get("svg").attributes("preserveAspectRatio")).toBeUndefined();
        expect(Object.keys(MusicStaff.props ?? {})).toEqual(
            expect.not.arrayContaining([
                "phase", "width", "height", "windowStart", "windowEnd", "maxNotes",
                "describedNoteLimit",
            ]),
        );
    });
});
