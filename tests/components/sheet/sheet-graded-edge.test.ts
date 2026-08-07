import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { describe, expect, it } from "vitest";

import {
    Dialog,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "@glass/components/dialog";
import { SheetContent } from "@glass/components/sheet";
import type { Surface } from "@glass/components/_shared/axes";
import type { SidePlacement } from "@glass/components/sheet";

// RELOCATED with the component by W-DIALOG: the side surface is `SheetContent` again,
// its geometry lives at `sheet/styles.css`, and its slot names are its own. The "belongs
// only to glass" / "sampler stays on the plate" / "bounded side child" substance is
// unchanged — only the subject's name is.
const sheetStyles = readFileSync("src/components/sheet/styles.css", "utf8");
const presetEditor = readFileSync("demo/shell/configurator/PresetEditor.vue", "utf8");

describe("SheetContent graded edge", () => {
    // ── π-39 CURE II · R2-5 — THE MATERIAL, WHERE IT ACTUALLY PAINTS ──────────────
    //
    // The sampler shipped as a CHILD of the surface and its `backdrop-filter` landed
    // NOTHING. The cause is the plate's own material: `.glass-floating` carries a
    // `plus-lighter` specular pseudo and a `soft-light` grain pseudo, and a descendant with
    // a blend mode MAKES ITS PARENT AN ISOLATED GROUP — a backdrop root. A child's backdrop
    // sample therefore reaches the plate it sits on and never the page, so what painted was
    // a masked gradient tint wearing the computed style of frost. Measured as the 24px bin
    // of each row's luminance over a 24px-period field behind the sheet, 1440×900 dark:
    //
    //   bare field                                162.45
    //   plate, no sampler                         120.41
    //   sampler AS A CHILD (shipped)   86.64 →  81.55   FLAT — the disease
    //   …with the plate's blend pseudos normal      0.16 →   0.14   (the cause, isolated)
    //   sampler AS A SIBLING (cured)   79.57 →   0.00   the designed ramp, in paint
    //
    // `contain`, `isolation` and `z-index` were each released and each changed nothing —
    // the isolation is the plate's own, and no child can escape it. So the sampler is a
    // SIBLING and takes the surface's box by anchor positioning, which tracks it at every
    // rung and through the slide with no second size law and no geometry read in JS.
    it("keeps the sampler OUT of the surface — a child of the plate cannot sample the page", async () => {
        const Harness = defineComponent({
            components: { Dialog, SheetContent, DialogDescription, DialogTitle },
            template: `
                <Dialog :open="true">
                    <SheetContent side="bottom" :detents="[0.25, 1]">
                        <DialogTitle>Material sheet</DialogTitle>
                        <DialogDescription>Graded edge fixture</DialogDescription>
                    </SheetContent>
                </Dialog>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        const halo = document.querySelector<HTMLElement>(
            '[data-slot="glass-graded-halo"]',
        );
        const plate = document.querySelector<HTMLElement>(
            '[data-slot="sheet-content"]',
        );
        expect(halo, "the sampler must render").not.toBeNull();
        expect(plate).not.toBeNull();
        expect(
            plate!.contains(halo!),
            "a sampler inside the plate is inside the plate's own isolated group",
        ).toBe(false);
        // it carries its own keys, since it no longer has the surface as a parent to read
        expect(halo!.dataset.side).toBe("bottom");
        expect(halo!.dataset.detents).toBe("");

        // and the CSS binds the two boxes together rather than duplicating a size law
        expect(sheetStyles).toMatch(
            /\[data-slot="sheet-content"\][^{]*\{[^}]*anchor-name:\s*--[\w-]+/,
        );
        const sampler = sheetStyles.match(
            /:where\(\[data-slot="glass-graded-halo"\]\)\s*\{[^}]*\}/,
        )?.[0];
        expect(sampler, "the sampler needs its own base rule").toBeTruthy();
        expect(sampler).toMatch(/position:\s*fixed/);
        expect(sampler).toMatch(/position-anchor:\s*--[\w-]+/);
        expect(sampler).toMatch(/backdrop-filter:\s*blur\(/);
        for (const side of ["top", "right", "bottom", "left"] as const)
            expect(sampler, `the sampler takes the surface's ${side}`).toMatch(
                new RegExp(`${side}:\\s*anchor\\(${side}\\)`),
            );

        // the surface itself stays the non-sampler it says it is
        expect(sheetStyles).toMatch(
            /\[data-surface="glass"\]\)\s*\{[^}]*backdrop-filter:\s*none/,
        );
        wrapper.unmount();
    });

    it("belongs only to glass across all four sides", async () => {
        const side = ref<SidePlacement>("right");
        const surface = ref<Surface>("glass");
        const Harness = defineComponent({
            components: { Dialog, SheetContent, DialogDescription, DialogTitle },
            setup: () => ({ side, surface }),
            template: `
                <Dialog :open="true">
                    <SheetContent :side="side" :surface="surface">
                        <DialogTitle>Material sheet</DialogTitle>
                        <DialogDescription>Graded edge fixture</DialogDescription>
                    </SheetContent>
                </Dialog>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        for (const edgeSide of ["top", "right", "bottom", "left"] as const) {
            side.value = edgeSide;
            for (const rung of ["glass", "veil", "opaque"] as const) {
                surface.value = rung;
                await nextTick();
                // [CURE II · R2-5] the sampler is the surface's SIBLING now, so it carries
                // the side itself rather than reading it off a parent it no longer has.
                const edge = document.querySelector<HTMLElement>(
                    '[data-slot="glass-graded-halo"]',
                );
                if (rung === "glass") {
                    expect(edge?.getAttribute("aria-hidden")).toBe("true");
                    expect(edge?.dataset.side).toBe(edgeSide);
                } else {
                    expect(edge).toBeNull();
                }
                expect(
                    document.querySelector(
                        '[data-slot="sheet-content"] > [data-slot="sheet-content-region"]',
                    ),
                ).not.toBeNull();
            }
        }

        wrapper.unmount();
    });

    it("keeps the sampler beside the plate and delegates the scrolling", async () => {
        const side = ref<SidePlacement>("right");
        const scroll = ref(false);
        const Harness = defineComponent({
            components: {
                Dialog,
                SheetContent,
                DialogDescription,
                DialogFooter,
                DialogTitle,
            },
            setup: () => ({ side, scroll }),
            template: `
                <Dialog :open="true">
                    <SheetContent :side="side" :scroll="scroll">
                        <DialogTitle>Scrollable sheet</DialogTitle>
                        <DialogDescription>Scrollable body</DialogDescription>
                        <DialogFooter>Actions</DialogFooter>
                    </SheetContent>
                </Dialog>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        const plate = document.querySelector<HTMLElement>(
            '[data-slot="sheet-content"]',
        )!;
        const edge = document.querySelector<HTMLElement>(
            '[data-slot="glass-graded-halo"]',
        );
        const region = plate.querySelector<HTMLElement>(
            ':scope > [data-slot="sheet-content-region"]',
        );
        expect(plate.className).not.toContain("content-start");
        expect(plate.className).not.toContain("overflow-y-auto");
        expect(edge).not.toBeNull();
        expect(plate.contains(edge!)).toBe(false);
        expect(region?.textContent).toContain("Scrollable sheet");
        expect(region?.querySelector('[data-slot="glass-graded-halo"]')).toBeNull();
        expect(region?.lastElementChild?.getAttribute("data-slot")).toBe(
            "dialog-footer",
        );

        scroll.value = true;
        await nextTick();
        expect(plate.getAttribute("data-scroll")).toBe("");
        expect(plate.querySelector(':scope > [data-slot="sheet-content-region"]')).toBe(
            region,
        );

        side.value = "left";
        await nextTick();
        expect(plate.dataset.side).toBe("left");
        expect(plate.querySelector(':scope > [data-slot="sheet-content-region"]')).toBe(
            region,
        );

        expect(sheetStyles).toMatch(
            /\[data-slot="sheet-content-region"\][\s\S]*?align-content:\s*start/,
        );
        expect(sheetStyles).toMatch(
            /\[data-scroll\][\s\S]*?\[data-slot="sheet-content-region"\][\s\S]*?overflow-y:\s*auto/,
        );
        expect(sheetStyles).toMatch(
            /\[data-side="left"\][\s\S]*?\[data-slot="sheet-content-region"\][\s\S]*?block-size:\s*100%/,
        );
        expect(sheetStyles).toMatch(
            /\[data-side="left"\][\s\S]*?\[data-side="right"\][\s\S]*?display:\s*flex;[\s\S]*?flex-direction:\s*column;[\s\S]*?min-block-size:\s*0/,
        );

        wrapper.unmount();
    });

    it("bounds a full-height side child while top and bottom stay intrinsic", () => {
        const content = presetEditor.match(/<SheetContent[\s\S]*?>/)?.[0];
        const frame = presetEditor.match(/<div class="flex h-full flex-col">/)?.[0];
        const body = presetEditor.match(
            /<div\s+class="configurator-sheet-body[^"]*"\s*>/,
        )?.[0];
        const boundedSideRegionRule = sheetStyles.match(
            /:where\(\s*\[data-slot="sheet-content"\]\[data-side="left"\][\s\S]*?display:\s*flex;[\s\S]*?min-block-size:\s*0;\s*}/,
        )?.[0];

        expect(content).not.toContain("overflow-y-auto");
        expect(frame).toContain("h-full");
        expect(body).toContain("min-h-0");
        expect(body).toContain("overflow-y-auto");
        expect(boundedSideRegionRule).toContain('data-side="left"');
        expect(boundedSideRegionRule).toContain('data-side="right"');
        expect(boundedSideRegionRule).not.toContain('data-side="top"');
        expect(boundedSideRegionRule).not.toContain('data-side="bottom"');
    });

    // THE VEIL IS NOT A SHEET'S. `.glass-focus-veil` is a centre-weighted mask with a
    // FIXED 13rem core at `--veil-x`/`--veil-y`'s 50% rest, so composing it here paints a
    // ~640×640 frost pool in the middle of the viewport with nothing engaged inside it —
    // measured against a 384-wide sheet at the right edge of 1440×900. `slideT` cannot
    // gate it either: the sheet is the arm that SETS `slideT`, so a null-check would
    // veil exactly the wrong one of the two. `DialogContent` passes `veil`; this passes
    // nothing, and the assertion is over all four sides.
    it("paints no focus veil behind an edge-anchored surface", async () => {
        const side = ref<SidePlacement>("right");
        const Harness = defineComponent({
            components: { Dialog, SheetContent, DialogDescription, DialogTitle },
            setup: () => ({ side }),
            template: `
                <Dialog :open="true">
                    <SheetContent :side="side">
                        <DialogTitle>Veilless sheet</DialogTitle>
                        <DialogDescription>Dim only</DialogDescription>
                    </SheetContent>
                </Dialog>
            `,
        });
        const wrapper = mount(Harness, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        for (const edgeSide of ["top", "right", "bottom", "left"] as const) {
            side.value = edgeSide;
            await nextTick();
            expect(
                document.querySelector('[data-slot="sheet-content"]'),
            ).not.toBeNull();
            expect(document.querySelector(".glass-focus-veil"), edgeSide).toBeNull();
        }
        // The dim itself is untouched — this removes a mask, not the scrim.
        expect(
            document.querySelector(".bg-overlay-scrim, [class*='bg-overlay-scrim']"),
        ).not.toBeNull();

        wrapper.unmount();
    });
});
