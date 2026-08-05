import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { describe, expect, it } from "vitest";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@glass/components/dialog";
import type { Backdrop } from "@glass/components/_shared/axes";

const placementStyles = readFileSync("src/components/dialog/placement.css", "utf8");
const drawerStyles = readFileSync("src/components/drawer/styles.css", "utf8");

// BK #24 W-GRADIENT-BLUR: FORM 2's recipe is no longer Dialog-private. It WAS the
// gradient-blur focus primitive, built once and hidden here; it now lives at
// `styles/glass/focus-veil.css` as `.glass-focus-veil` and this component BINDS it.
// So this file asserts the BINDING and the Dialog-side behaviour, and the recipe's own
// invariants (one plate · intersect double-ramp · opacity-only clock · the token cohort ·
// the plain `.dark` dim arm) are asserted once, at their new home, by
// `tests/styles/focus-veil.test.ts` — the G-RUNG-ONLY GRADIENT-BLUR arm. Restating them
// here would be the duplicated-derived-data class.
const veilStyles = readFileSync("src/styles/glass/focus-veil.css", "utf8");

function mountCentred(backdrop: Backdrop) {
    const value = ref<Backdrop>(backdrop);
    const Harness = defineComponent({
        components: { Dialog, DialogContent, DialogDescription, DialogTitle },
        setup: () => ({ value }),
        template: `
            <Dialog :open="true">
                <DialogContent stage="immersive" :backdrop="value">
                    <DialogTitle>Spotlight</DialogTitle>
                    <DialogDescription>Graded backdrop fixture</DialogDescription>
                </DialogContent>
            </Dialog>
        `,
    });
    return mount(Harness, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
}

describe("DialogContent graded backdrop halo", () => {
    it("default scrim is the byte-identical no-op floor — no halo, no data-backdrop", async () => {
        const wrapper = mountCentred("scrim");
        await nextTick();
        await nextTick();

        // A centred, default-scrim dialog mounts NEITHER a halo child nor the
        // graded marker — the paint path is untouched from today.
        expect(document.querySelector('[data-slot="glass-graded-halo"]')).toBeNull();
        expect(document.querySelector('[data-backdrop="graded"]')).toBeNull();

        wrapper.unmount();
    });

    it("the graded opt-in mounts ONE box-following halo between page and surface", async () => {
        const wrapper = mountCentred("graded");
        await nextTick();
        await nextTick();

        const overlay = document.querySelector<HTMLElement>('[data-backdrop="graded"]');
        expect(overlay).not.toBeNull();

        const halo = overlay!.querySelector<HTMLElement>(
            ':scope > [data-slot="glass-graded-halo"]',
        );
        expect(halo).not.toBeNull();
        // Non-interactive, out of the a11y tree — a decorative plate only.
        expect(halo!.getAttribute("aria-hidden")).toBe("true");
        // Exactly ONE halo (a Δ0-count scrim swap, not a stacked band).
        expect(document.querySelectorAll('[data-slot="glass-graded-halo"]').length).toBe(1);

        wrapper.unmount();
    });

    it("BINDS the shared focus veil — the recipe left the component entire", () => {
        // The Dialog-private FORM 2 recipe is GONE from placement.css. Not aliased, not
        // wrapped — the whole `[data-backdrop="graded"] >` arm, its mask, its dim arm and
        // the `--glass-halo-*` cohort it read are struck, with no compatibility shim.
        expect(placementStyles).not.toContain('[data-backdrop="graded"] >');
        expect(placementStyles).not.toContain("mask-composite: intersect");
        expect(placementStyles).not.toContain("--glass-halo-");

        // What replaced it: the shared class, carrying the same geometry against the
        // veil's own centre (50% by default — the centred modal's own case).
        expect(veilStyles).toMatch(/\.glass-focus-veil\s*{/);
        expect(veilStyles).toMatch(/mask-composite:\s*intersect/);
    });

    it("puts the shared class on the SAME halo child, marked engaged", async () => {
        const wrapper = mountCentred("graded");
        await nextTick();
        await nextTick();

        const halo = document.querySelector<HTMLElement>(
            '[data-backdrop="graded"] > [data-slot="glass-graded-halo"]',
        );
        expect(halo).not.toBeNull();
        // The binding: one class, no second element, no wrapper.
        expect(halo!.classList.contains("glass-focus-veil")).toBe(true);
        // Static `data-engaged` — the halo exists only while the graded dialog is open,
        // and the overlay's own fade carries the exit.
        expect(halo!.hasAttribute("data-engaged")).toBe(true);
        // The Dialog writes NO centre: the veil's registered 50%/50% rest IS the
        // centred modal, so the geometry transfers byte-for-byte.
        expect(halo!.style.getPropertyValue("--veil-x")).toBe("");
        expect(halo!.style.getPropertyValue("--veil-y")).toBe("");

        wrapper.unmount();
    });

    it("disables the halo under reduced-transparency AND forced-colors (a11y)", () => {
        // FORM 1 (the side sheet's per-edge graded edge) keeps its own arm here; FORM 2
        // inherits the same suppression from the shared class at its own home.
        const a11y = placementStyles.match(
            /@media\s*\(prefers-reduced-transparency:\s*reduce\),\s*\(forced-colors:\s*active\)\s*{[\s\S]*?}/,
        )?.[0];
        expect(a11y).toBeTruthy();
        expect(a11y).toMatch(
            /\[data-slot="glass-graded-halo"\][\s\S]*?display:\s*none/,
        );
        expect(veilStyles).toMatch(
            /@media\s*\(prefers-reduced-transparency:\s*reduce\),\s*\(forced-colors:\s*active\)[\s\S]*?\.glass-focus-veil[\s\S]*?display:\s*none/,
        );
    });

    it("keeps the side-sheet graded edge byte-stable at 34px (the row-10 value)", () => {
        // The generalised slot name, the per-edge form, and the 34px sample are all
        // preserved — the rename does not perturb the shipped side-sheet material.
        expect(placementStyles).toMatch(
            /\[data-slot="dialog-content"\]\[data-placement\]\s*>\s*\[data-slot="glass-graded-halo"\]/,
        );
        expect(placementStyles).toContain(
            "blur(calc(34px * var(--glass-level)))",
        );
    });

    it("gates the flat immersive scrim off under graded (the Δ0 swap, Drawer untouched)", () => {
        expect(drawerStyles).toContain(
            '[data-stage-scrim][data-stage-immersive]:not([data-backdrop="graded"])',
        );
        expect(drawerStyles).toContain(
            '[data-stage-scrim]:not([data-backdrop="graded"])',
        );
    });
});
