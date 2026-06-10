// E23 (d-glassui M3) — the FROSTED slider TRACK (E1 §2h).
//
// The defect this guards: `.glass-slider` carried the glass class but the TRACK
// rendered FLAT — `background: var(--slider-track-bg, …)` with NO `backdrop-filter`
// (the `glass-slider class exists but the track renders flat` finding). The fix
// frosts the STANDARD track into a recessive glass CHANNEL (one rung quieter than
// the host — the wash blur rung) while the SPECTRUM track (the value.js gradient
// color-picker channel) stays OPAQUE by identity.
//
// jsdom does not compute a real `backdrop-filter` from scoped CSS, so this is a
// static-source proof of the track recipe (the repo's `proof:components-css` /
// `proof:slider-two-only` static-grep culture — clause 3 already grasps the
// RANGE's backdrop; this adds the TRACK's).

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Resolved from the project root (CWD under vitest) — happy-dom's `import.meta.url`
// is not a file: URL, so `fileURLToPath` rejects it; CWD is the stable anchor.
const SLIDER_SFC = resolve(
    process.cwd(),
    "src/components/ui/slider/Slider.vue",
);
const src = readFileSync(SLIDER_SFC, "utf8");

/** Extract a CSS rule body for a selector (first match, naive brace-balanced). */
function ruleBody(selector: string): string {
    const at = src.indexOf(selector);
    if (at === -1) return "";
    const open = src.indexOf("{", at);
    const close = src.indexOf("}", open);
    return src.slice(open, close);
}

describe("Slider — the frosted TRACK channel (§2h)", () => {
    it("the STANDARD .slider-track carries a backdrop-filter (the frosted channel)", () => {
        const body = ruleBody(".slider-track {");
        expect(body).toMatch(/backdrop-filter:\s*var\(--slider-track-blur/);
        // It routes the WASH rung (one rung quieter than the range's quiet rung —
        // the proportion law: a control never out-frosts its host/the fill).
        expect(body).toContain("--glass-blur-wash");
        // And carries the unified edge rim so the groove reads as glass.
        expect(body).toMatch(/box-shadow:\s*var\(--slider-track-rim/);
    });

    it("the SPECTRUM track CLEARS the frost (the gradient color-picker channel is opaque)", () => {
        const body = ruleBody('.glass-slider[data-variant="spectrum"] .slider-track');
        expect(body).toMatch(/backdrop-filter:\s*none/);
        expect(body).toMatch(/box-shadow:\s*none/);
    });

    it("the consumer override hook (--slider-track-blur) is honored over the default", () => {
        // The recipe is `var(--slider-track-blur, var(--glass-blur-wash))` — a
        // consumer's explicit blur wins; the wash rung is only the fallback.
        const body = ruleBody(".slider-track {");
        expect(body).toMatch(
            /backdrop-filter:\s*var\(--slider-track-blur,\s*var\(--glass-blur-wash\)\)/,
        );
    });
});
