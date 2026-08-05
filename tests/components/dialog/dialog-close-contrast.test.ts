// Dialog close-✕ ink contrast (W3-B).
//
// AMENDED by W-DIALOG. The seat this originally re-inked was `data-[state=open]:*` on the
// ✕, and the whole open-state PAIR was dead: the close button never carries a
// `data-state` attribute, so the accent plate and its ink were unreachable in paint. The
// cure was re-inking one of two colours nothing could ever show. Both classes are struck
// with the third dead class beside them (`disabled:pointer-events-none` — the button is
// never disabled), and the invariant re-points onto the ink that IS painted.
//
// The compounding `opacity-70` that halved every effective ratio is gone with them: the
// ✕ rests at `--foreground` and its three states are real material changes, not one wash.
// Bite: put the muted ink or the blanket opacity back and this reddens.

import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it } from "vitest";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog";

function mountDialog() {
    const Host = defineComponent({
        setup() {
            return () =>
                h(Dialog, { open: true }, () => [
                    h(DialogTrigger, () => "open"),
                    h(DialogContent, { class: "test-dialog" }, () => [
                        h(DialogTitle, { class: "sr-only" }, () => "Test dialog"),
                        h(DialogDescription, { class: "sr-only" }, () => "Close-contrast fixture."),
                        h("p", "body"),
                    ]),
                ]);
        },
    });
    return mount(Host, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
}

function findCloseButton(): HTMLElement | null {
    const portal = document.querySelector(".test-dialog") as HTMLElement | null;
    if (!portal) return null;
    const label = Array.from(portal.querySelectorAll(".sr-only")).find(
        (el) => el.textContent === "Close",
    );
    return (label?.closest("button") as HTMLElement | null) ?? null;
}

const dialogCss = (): string =>
    readFileSync("src/components/dialog/styles.css", "utf8");

describe("DialogContent — close-✕ ink (W3-B)", () => {
    it("carries no unreachable state ink and no compounding opacity wash", async () => {
        const wrapper = mountDialog();
        await nextTick();
        await nextTick();
        const close = findCloseButton();
        expect(close, "close button rendered").not.toBeNull();
        expect(close!.className).not.toContain("text-muted-foreground");
        // The three dead classes: an open-state pair on a node that never carries
        // `data-state`, and a disabled guard on a button that is never disabled.
        expect(close!.className).not.toContain("data-[state=open]");
        expect(close!.className).not.toContain("disabled:pointer-events-none");
        expect(close!.className).not.toMatch(/\bopacity-70\b/);
        wrapper.unmount();
    });

    it("rests on the full-strength ink that the plate actually paints", () => {
        const block = dialogCss().match(
            /:where\(\[data-slot="dialog-close"\]\)\s*\{([^}]*)\}/,
        );
        expect(block).not.toBeNull();
        expect(block![1]).toMatch(/color:\s*var\(--foreground\);/);
        // Hover and press change the MATERIAL under the glyph, so neither state has to
        // dim the ink to register.
        expect(dialogCss()).toMatch(
            /:hover::before\s*\{[^}]*background:\s*color-mix\(in oklab, var\(--foreground\) 5%/,
        );
        expect(dialogCss()).toMatch(
            /:active::before\s*\{[^}]*background:\s*color-mix\(in oklab, var\(--foreground\) 12%/,
        );
    });
});
