// Placeholder contrast floor (W1-A11Y-STATE, W1-D).
//
// Every page-opaque input placeholder resolved through a sub-floor register (35%
// foreground tint, `opacity:0.68` over muted, a 50% color-mix of muted) — all under
// the 4.5:1 text floor. They repoint onto the ONE ≥4.5:1 token: bare
// `var(--muted-foreground)` (the `.command__input` exemplar, documented 5.21:1), no
// alpha, no opacity. The now-orphaned `--surface-tint-35` register is deleted
// (definition + dark arm + `@theme` bridge) — no-backwards-compat.
//
// The dock-search `--on-glass-muted` register is KEEP (documented translucent-plate
// calibration) and is intentionally NOT in this scan.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// selector → source partial. The four page-opaque placeholder registers.
const REGISTERS: Array<[string, string]> = [
    [".input-pill::placeholder", "src/styles/glass/control-surfaces.css"],
    [".field-control::placeholder", "src/components/_shared/field/field-control.css"],
    [".input-bar-field::placeholder", "src/styles/utilities/components.css"],
    [".tags-input__input::placeholder", "src/components/tags-input/styles.css"],
];

function ruleBlock(src: string, selector: string): string | null {
    const at = src.indexOf(selector);
    if (at < 0) return null;
    const open = src.indexOf("{", at);
    const close = src.indexOf("}", open);
    if (open < 0 || close < 0) return null;
    return src.slice(open + 1, close);
}

describe("placeholder contrast floor (W1-D)", () => {
    for (const [selector, file] of REGISTERS) {
        it(`${selector} resolves onto bare var(--muted-foreground)`, () => {
            const block = ruleBlock(readFileSync(file, "utf8"), selector);
            expect(block, `${selector} present in ${file}`).not.toBeNull();
            expect(block!).toMatch(/color:\s*var\(--muted-foreground\)\s*;/);
            // No sub-floor mechanisms in the placeholder block.
            expect(block!).not.toMatch(/surface-tint/);
            expect(block!).not.toMatch(/opacity/);
            expect(block!).not.toMatch(/color-mix/);
        });
    }

    it("deletes the orphaned --surface-tint-35 register (def + dark arm + bridge)", () => {
        const light = readFileSync("src/styles/tokens/color-radius.css", "utf8");
        const dark = readFileSync("src/styles/tokens/dark-arm.css", "utf8");
        const bridge = readFileSync("src/styles/theme/bridges.css", "utf8");
        expect(light).not.toMatch(/--surface-tint-35\s*:/);
        expect(dark).not.toMatch(/--surface-tint-35\s*:/);
        expect(bridge).not.toMatch(/--color-surface-tint-35\s*:/);
    });
});
