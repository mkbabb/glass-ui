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
const glassTokens = readFileSync("src/styles/tokens/glass.css", "utf8");
const drawerStyles = readFileSync("src/components/drawer/styles.css", "utf8");

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

    it("FORM 2 resolves the halo tokens via the INTERSECT double-ramp product", () => {
        const form2 = placementStyles.match(
            /\[data-backdrop="graded"\]\s*>\s*\[data-slot="glass-graded-halo"\][\s\S]*?mask-composite:\s*intersect;\s*}/,
        )?.[0];
        expect(form2).toBeTruthy();

        // The plate: blur token + the overlay saturate companion.
        expect(form2).toMatch(
            /backdrop-filter:\s*blur\(var\(--glass-halo-blur\)\)\s*saturate\(var\(--glass-saturate\)\)/,
        );
        // The intersect product of an x + a y double-ramp — core (full-black hold)
        // and bloom (the fade band) as centre-distances, on BOTH axes.
        expect(form2).toMatch(/linear-gradient\(\s*to right,/);
        expect(form2).toMatch(/linear-gradient\(\s*to bottom,/);
        expect(form2).toContain("var(--glass-halo-core)");
        expect(form2).toContain("var(--glass-halo-bloom)");
        expect(form2).toMatch(/mask-composite:\s*intersect/);
        // The source-authored WebKit arm (only backdrop-filter is build-injected).
        expect(form2).toMatch(/-webkit-mask-composite:\s*source-in/);
        // The cross-engine floor: plain blur()+saturate under a mask, NEVER url().
        expect(form2).not.toContain("url(");

        // The dim rides the proven `--glass-plate-overlay` mix, NOT `--overlay-scrim`.
        expect(form2).toContain(
            "color-mix(in oklab, var(--glass-plate-overlay) 50%, transparent)",
        );
        expect(form2).not.toContain("--overlay-scrim");
    });

    it("dims per-mode via a plain .dark arm — light ~50% / dark ~40%, never light-dark()", () => {
        const darkArm = placementStyles.match(
            /\.dark\s+:where\(\[data-backdrop="graded"\][\s\S]*?}/,
        )?.[0];
        expect(darkArm).toBeTruthy();
        expect(darkArm).toContain(
            "color-mix(in oklab, var(--glass-plate-overlay) 40%, transparent)",
        );
        // The whole FORM 2 dim register is per-mode arms, no light-dark() fragment.
        const form2Region = placementStyles.slice(
            placementStyles.indexOf('[data-backdrop="graded"]'),
        );
        expect(form2Region).not.toContain("light-dark(");
    });

    it("disables the halo under reduced-transparency AND forced-colors (a11y)", () => {
        const a11y = placementStyles.match(
            /@media\s*\(prefers-reduced-transparency:\s*reduce\),\s*\(forced-colors:\s*active\)\s*{[\s\S]*?}/,
        )?.[0];
        expect(a11y).toBeTruthy();
        expect(a11y).toMatch(
            /\[data-slot="glass-graded-halo"\][\s\S]*?display:\s*none/,
        );
    });

    it("mints the bounded --glass-halo-* cohort (blur / core / bloom)", () => {
        expect(glassTokens).toMatch(/--glass-halo-blur:\s*20px;/);
        expect(glassTokens).toMatch(/--glass-halo-core:\s*13rem;/);
        expect(glassTokens).toMatch(/--glass-halo-bloom:\s*7rem;/);
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
