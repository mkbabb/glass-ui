// BK.#33 gate — the standing `G-FEEDBACK-TINT-SEAM` seat (TR §B.5, family SEAM), BOUND
// here. Nothing is minted: the seat pre-exists in the roster and this file gives it its
// first live executable, so the register budget stays exactly 60.
//
// ── THE INVARIANT ───────────────────────────────────────────────────────────────────
//
// A tone register must tint the surface's OWN plate, never a plate of its own. This is a
// structural rule, not a colour preference, and the reason is that `background` is a
// single property: when `.feedback-tone` writes a `color-mix()` it REPLACES whatever the
// rung wrote, so if the mix base is a raw plate token the rung's entire contribution —
// its tier ink, its earned-darken clamp, its `--glass-level` — is discarded at the last
// step. The surface claims a rung in its class list and paints something the ladder
// never touched, and every downstream measurement (contrast tables, transmission gates,
// the π composite) is taken against a plate no rung owns.
//
// The seam that closes it already exists and already names this consumer:
// `@utility glass-plate` publishes `--glass-veil` as a nestable VALUE token precisely so
// a surface composing the plate inside a bigger mix can read it without re-spelling the
// recipe (`src/styles/glass/veil.css`, whose header names "a tone-tinted feedback panel"
// and the capsule's warm floor as its two intended consumers). Mixing over `--glass-veil`
// keeps the rung INSIDE the tint instead of underneath it.
//
//   (a) MIX BASE — `.feedback-tone`'s `background` declaration names `--glass-veil` as
//       the base of its `color-mix()`. `--feedback-tone-rung` may appear only as the
//       `var()` FALLBACK, for a consumer that composes no rung at all.
//   (b) NO RE-POINT — no file under `src/` WRITES `--feedback-tone-rung`. A fallback that
//       anything re-points is not a fallback; it is the second plate authority this arm
//       exists to forbid, wearing a default value.
//
// Arm (b) is the one that bites in practice. Arm (a) can be satisfied while four
// consumers each override the fallback back into the mix — which is exactly the state
// this cut found and removed.
//
// ── BORN-RED, FLIPPED IN THE SAME CUT ───────────────────────────────────────────────
// Measured by RUNNING THIS FILE against a pristine `git archive HEAD` tree before the
// #33 cut. The figures are the detectors' own output:
//   (a) RED — the `background` declaration at `feedback-tone.css` mixed over
//       `var(--feedback-tone-rung)`; `--glass-veil` appeared nowhere in it.
//   (b) RED — 4 writers, all in `src/components/alert/index.ts`, one per toned arm
//       (`[--feedback-tone-rung:var(--glass-plate-wash)]`).
// Run receipt at the pre-cut tree: `Tests 2 failed | 1 passed (3)`.
// Post-cut both arms are zero, so this ships as the standing regression lock rather than
// as an `it.fails` scaffold.
//
// ── METHOD ──────────────────────────────────────────────────────────────────────────
// Comments are stripped before every scan. Without that, arm (b) is unsatisfiable by its
// own wave: this file's own prose and `feedback-tone.css`'s header both name
// `--feedback-tone-rung`, and a gate that can never go green is worth exactly as much as
// one that self-certifies. A WRITE is a declaration (`--feedback-tone-rung:` at the head
// of a declaration or inside a Tailwind arbitrary-property bracket); a READ inside
// `var(--feedback-tone-rung)` is not a write and is what the fallback is for — the
// detector distinguishes them, so the surviving fallback does not trip its own arm.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = join(process.cwd(), "src");
const TONE_CSS = join(SRC, "components/_shared/feedback/feedback-tone.css");

/** Block comments out of CSS/TS, line comments out of TS. */
function strip(text: string): string {
    return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

const SCAN_EXTS = [".css", ".ts", ".vue", ".mts"];

function walk(dir: string, out: string[] = []): string[] {
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) walk(full, out);
        else if (SCAN_EXTS.some((e) => entry.endsWith(e))) out.push(full);
    }
    return out;
}

/**
 * The `.feedback-tone` rule's `background` declaration, comments stripped. Parsed by
 * brace-matching from the selector rather than by a line range, so the arm survives the
 * file being re-indented or the rule moving.
 */
function feedbackToneBackground(): string {
    const css = strip(readFileSync(TONE_CSS, "utf8"));
    const at = css.search(/(^|[\s}])\.feedback-tone\s*\{/m);
    if (at < 0) return "";
    const open = css.indexOf("{", at);
    let depth = 0;
    let end = open;
    for (let i = open; i < css.length; i++) {
        if (css[i] === "{") depth++;
        else if (css[i] === "}") {
            depth--;
            if (depth === 0) {
                end = i;
                break;
            }
        }
    }
    const body = css.slice(open + 1, end);
    const decl = body.match(/(^|;)\s*background\s*:([\s\S]*?);/);
    return decl ? decl[2] : "";
}

/** Every `src/` file that DECLARES `--feedback-tone-rung` (a read through `var()` is not one). */
function rungWriters(): string[] {
    const hits: string[] = [];
    for (const file of walk(SRC)) {
        const text = strip(readFileSync(file, "utf8"));
        for (const m of text.matchAll(/--feedback-tone-rung\s*:/g)) {
            const before = text.slice(Math.max(0, m.index - 4), m.index);
            // `var(--feedback-tone-rung)` never precedes a colon; a `var(` prefix here
            // would mean a malformed read, so guard it anyway and count only declarations.
            if (before.endsWith("var(")) continue;
            hits.push(`${file.slice(SRC.length + 1)}`);
        }
    }
    return hits;
}

describe("gate:G-FEEDBACK-TINT-SEAM — the tone register tints its own rung", () => {
    it("(a) `.feedback-tone` mixes over `--glass-veil`, the rung's published plate value", () => {
        const bg = feedbackToneBackground();
        expect(bg, "`.feedback-tone { background: … }` not found").not.toBe("");
        expect(bg).toMatch(/color-mix\(/);
        expect(
            bg.includes("--glass-veil"),
            `the mix base is not the rung's own plate: ${bg.replace(/\s+/g, " ").trim()}`,
        ).toBe(true);
        // `--feedback-tone-rung` survives ONLY as the var() fallback of that base.
        if (bg.includes("--feedback-tone-rung")) {
            expect(
                /var\(\s*--glass-veil\s*,\s*var\(\s*--feedback-tone-rung\s*\)\s*\)/.test(bg),
                "`--feedback-tone-rung` appears outside the `--glass-veil` fallback slot",
            ).toBe(true);
        }
    });

    it("(b) nothing in `src/` re-points `--feedback-tone-rung` — it is a fallback, not a seam", () => {
        const writers = rungWriters();
        // The declaration in `feedback-tone.css`'s own `:root` block IS the fallback's
        // definition and is the one legal writer.
        const foreign = writers.filter(
            (f) => f !== "components/_shared/feedback/feedback-tone.css",
        );
        expect(foreign, `re-points found: ${foreign.join(", ")}`).toEqual([]);
        expect(
            writers.filter((f) => f === "components/_shared/feedback/feedback-tone.css")
                .length,
            "the fallback is declared exactly once",
        ).toBe(1);
    });

    it("self-test — the detectors bite on the pre-cut shapes", () => {
        // Arm (a)'s mutation: the mix base reverted to the raw fallback token.
        const reverted = "color-mix(in oklab, var(--feedback-tone-rung), var(--tone) 18%)";
        expect(reverted.includes("--glass-veil")).toBe(false);
        // Arm (b)'s mutation: a Tailwind arbitrary-property re-point, the exact shape the
        // four alert arms carried.
        const armed = strip("const x = '[--feedback-tone-rung:var(--glass-plate-wash)]';");
        expect(/--feedback-tone-rung\s*:/.test(armed)).toBe(true);
        // And the fallback READ must not read as a write, or the arm eats its own cure.
        const read = strip("background: var(--glass-veil, var(--feedback-tone-rung));");
        expect(/--feedback-tone-rung\s*:/.test(read)).toBe(false);
    });
});
