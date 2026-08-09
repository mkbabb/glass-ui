// The emitted component-utility bytes: EVERY custom property the shipped
// `dist/styles/components.css` reads must either be defined somewhere in the
// shipped cascade or carry a `var()` fallback. glass-ui emits no `:root{}` of
// Tailwind's defaults, so an un-fallbacked reference resolves to NOTHING in the
// consumer — that is how `transition-duration` shipped as 0s (weightless motion)
// and how the `--overlay-pad-*` readers shipped with no setter to read.
//
// The property scope is deliberately UNFILTERED. An earlier arm checked only
// Tailwind-owned properties (read from `tailwindcss/theme.css`), which made the
// gate blind by construction to glass-ui's own inline-set props — the class that
// shipped the overlay/card padding hole. The three runtime-set families below are
// the ONLY exemptions, named one by one.
//
// The supported consumer contract is a TAILWIND-BUILD consumer (see
// `vite.utility-emit.ts`): glass-ui's tokens ship as `@theme`, so definitions
// inside `@theme` blocks count as defined here — that is exactly what a Tailwind
// build emits to `:root`.
//
// Build ACCEPTANCE — with no `dist/` on disk there is nothing to accept, so it skips.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import postcss from "postcss";
import { describe, expect, it } from "vitest";

const DIST = join(process.cwd(), "dist");
const COMPONENTS = join(DIST, "styles/components.css");

function cssFilesUnder(directory: string): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory()
            ? cssFilesUnder(join(directory, entry.name))
            : entry.name.endsWith(".css")
              ? [join(directory, entry.name)]
              : [],
    );
}

/** Every `var(--x[, fallback])` reference, nested bodies included. */
function varReferences(css: string): Array<{ property: string; hasFallback: boolean }> {
    const references: Array<{ property: string; hasFallback: boolean }> = [];
    for (let index = 0; index < css.length; index++) {
        if (!css.startsWith("var(", index)) continue;
        let depth = 0;
        let end = index;
        for (; end < css.length; end++) {
            if (css[end] === "(") depth++;
            else if (css[end] === ")" && --depth === 0) break;
        }
        const body = css.slice(index + 4, end);
        const comma = body.indexOf(",");
        references.push({
            property: (comma === -1 ? body : body.slice(0, comma)).trim(),
            hasFallback: comma !== -1,
        });
    }
    return references;
}

function shippedProperties(): Set<string> {
    const defined = new Set<string>();
    for (const file of cssFilesUnder(DIST)) {
        const parsed = postcss.parse(readFileSync(file, "utf-8"));
        parsed.walkDecls((declaration) => {
            if (declaration.prop.startsWith("--")) defined.add(declaration.prop);
        });
        parsed.walkAtRules("property", (rule) => {
            defined.add(rule.params.trim());
        });
    }
    return defined;
}

/**
 * Set on the ELEMENT at runtime, never in a stylesheet: the Reka primitives'
 * measured values, the dock's live offset, and the easing picker's per-instance
 * curve tint. Nothing else is exempt.
 */
function isRuntimeSet(property: string): boolean {
    return (
        property.startsWith("--reka-") ||
        property === "--dock-pos" ||
        property === "--easing-curve-accent"
    );
}

describe.skipIf(!existsSync(COMPONENTS))("emitted component utilities", () => {
    it("resolves every var it reads in-cascade, through a fallback, or at runtime", () => {
        const defined = shippedProperties();
        const references = varReferences(readFileSync(COMPONENTS, "utf-8"));
        expect(references.length).toBeGreaterThan(0);
        const weightless = [
            ...new Set(
                references
                    .filter(
                        ({ property, hasFallback }) =>
                            !hasFallback && !defined.has(property) && !isRuntimeSet(property),
                    )
                    .map(({ property }) => property),
            ),
        ].sort();
        expect(weightless).toEqual([]);
    });

    // PKT-1 — the felt-duration axis every `.transition-*` utility reads is routed
    // through the HOUSE clock (`--duration-fast`), with Tailwind's 150ms as the
    // terminal fallback, so a consumer retuning the clock governs the emitted
    // utilities instead of fighting a hardcoded literal. Asserted on emitted BYTES:
    // deleting the `houseAlias` entry in `vite.utility-emit.ts` REDs this.
    //
    // [2026-08-09 · BK #66 CLOSE · RT-40-B — EXECUTED HERE AS A COMPLETION ACT
    //  ATTRIBUTED TO #85, whose `W-EASING` landing (`1bc09dde`) is what made the
    //  single arm below RED and left it RED on the release path.]
    //
    //  THE ARM WAS OVERFIT TO THE MOMENT IT WAS AUTHORED. It asserted that EVERY
    //  emitted `transition-duration` contains `var(--duration-fast` — true only while
    //  the default chain was the sole emission. `EasingCurve.vue:89-90` now also emits
    //  `.duration-slow` and `.duration-0`, and BOTH are correct:
    //    · `var(--duration-slow)` is a REAL house token (`tokens/scheme-motion.css:102`,
    //      0.45s) — the exact opposite of the hardcoded literal this gate exists to
    //      catch. The curve's draw is deliberately slower than the house fast rung.
    //    · `0s` is the deliberate UN-draw, and zero is the one duration that cannot be
    //      a token: a clock has no name for "no time".
    //  Relaxing to "contains any var()" would have been the mask. Instead the law is
    //  SPLIT into what it actually means, and the second arm gives the file MORE bite
    //  than it had: previously any non-default emission was simply forbidden (which is
    //  why a correct one turned it RED); now a bare literal like `150ms` or `.3s` is
    //  forbidden BY NAME, which is the defect that was always the point.
    //
    //  Two ARMS of an already-seated describe, in its existing file. SEATS +0, zero new
    //  test files, nothing minted. The source fix was REFUSED with grounds: moving
    //  `EasingCurve.vue` off Tailwind's duration utilities onto a component stylesheet
    //  fights the Tailwind-first law and would have re-authored two live contract
    //  assertions (`easing.contract.test.ts:695`/`:727`) to make a gate stop
    //  complaining — the tail wagging the dog.
    const emittedDurations = (): string[] =>
        [...readFileSync(COMPONENTS, "utf-8").matchAll(/transition-duration:([^;}]*)/g)]
            .map(([, value]) => value.trim());

    it("routes the emitted DEFAULT transition-duration chain through --duration-fast", () => {
        // The default chain is the one `houseAlias` governs: it is the emission that
        // carries `--default-transition-duration`, Tailwind's own axis. THIS is the arm
        // whose stated bite — delete `houseAlias` in `vite.utility-emit.ts` → RED —
        // survives the split untouched.
        const defaults = emittedDurations().filter((value) =>
            value.includes("--default-transition-duration"),
        );
        expect(defaults.length).toBeGreaterThan(0);
        for (const value of defaults) expect(value).toContain("var(--duration-fast");
    });

    it("emits no duration LITERAL — every other transition-duration is a house token or 0s", () => {
        // The whole point of the gate, stated over the whole emission rather than over
        // the one emission that existed when it was written: a duration in the shipped
        // bytes is either read from the house clock family or it is the un-draw. A
        // hardcoded `150ms`/`.3s`/`400ms` is the defect.
        const others = emittedDurations().filter(
            (value) => !value.includes("--default-transition-duration"),
        );
        // [2026-08-09 · CURE-66-5] NON-VACUITY. A forbidding arm passes trivially over an
        // empty set: if the emission ever stops carrying non-default durations — a build
        // regression, a changed regex, a stylesheet that fails to emit at all — `offenders`
        // is empty for the wrong reason and this case greens over nothing. Assert there is
        // a subject before judging it.
        expect(others.length).toBeGreaterThan(0);
        const offenders = others.filter(
            (value) => value !== "0s" && !/^var\(--duration-[a-z-]+\)$/.test(value),
        );
        expect(offenders).toEqual([]);
    });
});
