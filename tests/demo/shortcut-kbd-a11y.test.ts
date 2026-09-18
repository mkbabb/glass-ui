// The keyboard-shortcut help kbd de-dup (W2-A11Y-LINKAGE, W2-C).
//
// The shortcut help <dl> renders each combo as a <dt> of per-key <kbd> parts. Before
// the fix EVERY <kbd> part carried the full combo as `:aria-label`, so a screen reader
// announced the whole combo once PER KEY ("Control K" → "Control K, Control K"). The
// combo is now named ONCE on the enclosing <dt>; the parts are unlabelled.
//
// A vitest-fs source assert (the band's demo-surface idiom, mirroring
// tests/demo/dock-stage-field-layout.test.ts): AppShell is the routed shell root and is
// not isolable for a rendered-attr mount, so the contract is asserted against the SFC
// source. RED at HEAD: the <kbd> loop carries the per-part aria-label and the <dt> does
// not.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("demo/shell/AppShell.vue", "utf8");

// The per-key <kbd> loop opening tag (through its closing `>`).
const kbdOpen = source.match(
    /<kbd\b[\s\S]*?v-for="part in formatComboParts\(shortcut\.raw\)"[\s\S]*?>/,
);

// The <dt> that opens the block containing that loop — the LAST <dt> before it.
const upToLoop = source.slice(
    0,
    source.indexOf("formatComboParts(shortcut.raw)"),
);
const dtOpen = upToLoop.match(/<dt\b[^>]*>(?![\s\S]*<dt\b)/);

describe("keyboard-shortcut help: combo labelled once, parts unlabelled (W2-C)", () => {
    it("locates the per-part kbd loop and its enclosing dt", () => {
        expect(kbdOpen, "the formatComboParts kbd loop is present").not.toBeNull();
        expect(dtOpen, "the enclosing <dt> is present").not.toBeNull();
    });

    it("does NOT stamp a per-part aria-label on the <kbd> parts", () => {
        expect(kbdOpen![0]).not.toMatch(/aria-label/);
    });

    it("labels the combo ONCE on the enclosing <dt>, in the SPOKEN form", () => {
        // `formatCombo` is the glyph string — punctuation read aloud. The accessible
        // name takes `formatComboLabel`, which speaks the modifiers and the alias a
        // glyph cannot show (a `delete` binding also answers to Backspace).
        expect(dtOpen![0]).toMatch(
            /:aria-label="formatComboLabel\(shortcut\.raw\)"/,
        );
    });
});
