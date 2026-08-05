// G-DLG-DISMISS — one dismissal axis, no duplicate names, no consumer-side guards.
//
// CLOSE-BATTERY ROW, seats +0. It files against the seated OVERFIT register; it mints no
// gate seat and the register receipt is byte-identical across this wave.
//
// THE INVARIANT. `dismiss` is the ONE knob: free · deliberate · locked. The four knobs it
// replaces (`showClose`, `stage`, `backdrop`, `springPreset`) are gone from the component
// tree, and no CONSUMER re-implements dismissal by binding reka's dismiss intents — that
// hand-rolled guarding is what produced two duplicate stories whose plates were identical
// in all six of blur / bg / radius / padding / gap / border and differed only by seven
// hand-rolled bindings.
//
// SCOPE, and why it is scoped (the correction this row owes its spec). The spec's clause
// greps `escape-key-down|interact-outside|pointer-down-outside` over `src/components/
// dialog` AND `demo/` for a total of 0. Over `src/components/dialog` that clause is
// SELF-CONTRADICTORY: `locked` cannot rebuff what it never observes, so the library's own
// implementation must bind those intents, and the spec says so itself one section earlier
// — "Reka's dismiss-intent emits STAY — observing is legitimate; guarding is what the gate
// forbids." The consumer half is the checkable one and is asserted at 0. The library half
// is asserted as a CONFINEMENT: the binding exists in exactly ONE file, so the mechanism
// cannot sprawl back into the components that used to hand-roll it.
//
// BORN-RED at HEAD, measured on a pristine `git archive HEAD` tree:
//   `showClose` at DialogContent.vue:46 · `stage` at :48 · `backdrop` at :55 ·
//   `springPreset` at :45 · no `dismiss` anywhere · 7 demo guard bindings across
//   `compositions/gate-pattern.vue:123-125`, `feedback/confirm-dialog.vue:99,100`,
//   `containers/dialog.vue:407,408`.
//
// MUTATION: re-introduce any of the four knobs, or any consumer-side guard → RED.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        return statSync(full).isDirectory() ? walk(full) : [full];
    });

const DISMISS_INTENTS = /escape-key-down|interact-outside|pointer-down-outside/;

// Walked LAZILY, inside each clause: a module-scope read turns a missing file into one
// load error and "no tests", and every clause must be able to red on its own subject.
const dialogFiles = () => walk("src/components/dialog");
const demoFiles = () => walk("demo").filter((f) => /\.(vue|ts)$/.test(f));

describe("G-DLG-DISMISS · one axis", () => {
    it("declares `dismiss` with its three rungs", () => {
        const content = () =>
            readFileSync("src/components/dialog/DialogContent.vue", "utf8");
        expect(content()).toMatch(
            /export type DialogDismiss = "free" \| "deliberate" \| "locked";/,
        );
        expect(content()).toMatch(/dismiss\?: DialogDismiss;/);
    });

    it("declares none of the four knobs it replaces", () => {
        // `(?!-)` excludes hyphenated CSS property names — `backdrop-filter` is a
        // declaration, `backdrop` was a knob, and only the second is forbidden. The rest
        // of the word boundary is intact, so a re-introduced prop still reds.
        for (const knob of ["showClose", "stage", "backdrop", "springPreset"]) {
            for (const file of dialogFiles()) {
                expect(readFileSync(file, "utf8"), `${knob} in ${file}`).not.toMatch(
                    new RegExp(`\\b${knob}\\b(?!-)`),
                );
            }
        }
    });

    it("mints no Confirm* or Gate* symbol", () => {
        for (const file of dialogFiles()) {
            expect(readFileSync(file, "utf8"), file).not.toMatch(
                /\b(?:Confirm|Gate)(?:Dialog|Content|Pattern)\b/,
            );
        }
    });
});

describe("G-DLG-DISMISS · no consumer-side guards", () => {
    it("binds no dismiss intent anywhere in demo/", () => {
        const offenders = demoFiles().filter((f) =>
            DISMISS_INTENTS.test(readFileSync(f, "utf8")),
        );
        expect(offenders).toEqual([]);
    });

    it("confines the library binding to ONE file", () => {
        const binders = dialogFiles().filter((f) =>
            DISMISS_INTENTS.test(readFileSync(f, "utf8")),
        );
        expect(binders).toEqual(["src/components/dialog/DialogContent.vue"]);
    });
});

describe("G-DLG-DISMISS · the rebuff is re-armable by construction", () => {
    // The cure this replaces was a scoped-CSS class on a PORTALED node: zero `data-v-*`
    // attributes ever reached it, so `animation-name` resolved to `none`, `@animationend`
    // never fired, and the latch it set could never clear — the second refusal was
    // unsignallable. The re-arm must therefore be structural, never a handshake.
    const content = () =>
        readFileSync("src/components/dialog/DialogContent.vue", "utf8");
    const css = () => readFileSync("src/components/dialog/styles.css", "utf8");

    it("keys the cue on a monotonic count, not an animationend handshake", () => {
        expect(content()).toMatch(/rebuffCount\.value \+= 1;/);
        expect(content()).not.toMatch(/animationend|animationEnd|@animationend/);
    });

    it("alternates two animation names so consecutive refusals each restart", () => {
        expect(content()).toMatch(/rebuffCount\.value % 2 === 1 \? "a" : "b"/);
        expect(css()).toMatch(/@keyframes glass-dialog-rebuff-a\b/);
        expect(css()).toMatch(/@keyframes glass-dialog-rebuff-b\b/);
        expect(css()).toMatch(/\[data-rebuff="a"\]\)\s*\{\s*animation: glass-dialog-rebuff-a/);
        expect(css()).toMatch(/\[data-rebuff="b"\]\)\s*\{\s*animation: glass-dialog-rebuff-b/);
    });

    it("moves ≤4px laterally, on the press row, and never touches the centre", () => {
        const amplitudes = [...css().matchAll(/--rebuff-x:\s*(-?[\d.]+)px;/g)].map((m) =>
            Math.abs(Number(m[1])),
        );
        expect(amplitudes.length).toBeGreaterThan(0);
        expect(Math.max(...amplitudes)).toBeLessThanOrEqual(4);
        expect(css()).toMatch(
            /translate: calc\(-50% \+ var\(--rebuff-x\)\) -50%;/,
        );
        expect(css()).toMatch(
            /animation: glass-dialog-rebuff-a var\(--spring-press-duration\) var\(--spring-press\)/,
        );
    });

    it("keeps the refusal under reduced motion, dropping only the geometry", () => {
        const prm = css().match(
            /@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/,
        );
        expect(prm).not.toBeNull();
        expect(prm![1]).toMatch(/glass-dialog-rebuff-flash/);
        expect(prm![1]).not.toMatch(/--rebuff-x/);
    });
});
