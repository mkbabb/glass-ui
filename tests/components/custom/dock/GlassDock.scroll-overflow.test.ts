import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassDock from "@glass/components/dock/GlassDock.vue";

/**
 * A capped axis is ALWAYS a scroll axis — and after
 * [2026-08-24 · BK #47 W3 LATTICE] there is no longer a CLASS that says which axis.
 *
 * ~~The `scrollClass` computed (useDockShellProps) emits `dock-scroll-x` on EVERY
 * horizontal dock and `null` on a vertical dock, whose block-axis scroll folds into
 * the unconditional `.glass-dock.vertical…:not([data-morphing])` rule in shell.css~~ —
 * STRUCK with its subject. That class was an AXIS SELECTOR for a port that lived in
 * two homes: `overflow.css` opened the inline track under `.dock-scroll-x` and
 * `shell.css` opened the block one on the dock ROOT. Under the lattice there is ONE
 * port on ONE element — `.dock-run`, which rides the same box as `.dock-layer--full`
 * — and it opens on both axes from the orientation already on the root, so the class
 * selected between two things that no longer differ.
 *
 * The scroll-port contract is therefore asserted on the PORT'S IDENTITY rather than on
 * a class that named it indirectly. GF-DOCK §9 routed these rows to the execution
 * wave's listed close battery precisely so they would be re-pointed here rather than
 * arrive as an unlisted RED at `release.yml`'s pre-publish `npm test`.
 *
 * The falsifiers: move `dock-run` off the full face, put it on a second element, or
 * let either axis class come back, and this REDs.
 */
describe("GlassDock lattice port — one run, both axes", () => {
    it("the run rides the FULL face itself — zero new DOM, on both orientations", () => {
        for (const orientation of ["horizontal", "vertical"] as const) {
            const wrapper = mount(GlassDock, { props: { orientation } });
            const runs = wrapper.findAll(".dock-run");
            // Exactly one port. A second `.dock-run` would give the lattice two
            // scrollers, two snap axes and two timelines to disagree over.
            expect(runs).toHaveLength(1);
            // …and it IS the full layer, not a wrapper interposed inside it.
            expect(runs[0]!.classes()).toContain("dock-layer--full");
            wrapper.unmount();
        }
    });

    it("the run declares the toolbar semantics its roving tabindex promises", () => {
        for (const orientation of ["horizontal", "vertical"] as const) {
            const run = mount(GlassDock, { props: { orientation } }).get(".dock-run");
            expect(run.attributes("role")).toBe("toolbar");
            // The arrow-key pair `useDockRun` binds follows this attribute; announcing
            // a horizontal toolbar that answers ArrowUp/Down is the defect it prevents.
            expect(run.attributes("aria-orientation")).toBe(orientation);
        }
    });

    it("no dock emits an axis scroll class on either axis any more", () => {
        for (const orientation of ["horizontal", "vertical"] as const) {
            const root = mount(GlassDock, { props: { orientation } }).get(".glass-dock");
            expect(root.classes()).not.toContain("dock-scroll-x");
            expect(root.classes()).not.toContain("dock-scroll-y");
            // The retired intrinsic-reflow hook stays retired.
            expect(root.classes()).not.toContain("dock-overflow-wrap");
        }
    });

    it("reach announces through a live region that is NOT a lattice seat", () => {
        const wrapper = mount(GlassDock);
        const status = wrapper.get(".dock-run-status");
        expect(status.attributes("role")).toBe("status");
        expect(status.attributes("aria-live")).toBe("polite");
        // Every direct child of the run is a snap target (`scroll-snap-align: start`,
        // run.css). A zero-width announcement node inside it would be a snap point the
        // user can scroll to and land on, so it sits outside — asserted, not assumed.
        expect(wrapper.get(".dock-run").element.contains(status.element)).toBe(false);
    });

    it("projects shape on the dock surface", () => {
        const root = mount(GlassDock, {
            props: { orientation: "vertical", shape: "rounded" },
        }).get(".glass-dock");
        expect(root.classes()).toEqual(
            expect.arrayContaining(["vertical", "shape-rounded"]),
        );
    });
});
