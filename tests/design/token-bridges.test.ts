import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// O-20 A-14 — the `@theme inline` bridge names are not an override point.
//
// `src/styles/theme/bridges.css` is one `@theme inline{}` block. Its left-hand names
// are Tailwind THEME KEYS: they generate utilities (`shadow-glass-quiet`,
// `blur-glass-wash`, `size-icon-md`) with the referenced value substituted in place.
// Tailwind emits such a key as a custom property only when something in the SAME build
// reads it with `var()` — and nothing in this library's own build reads the
// shadow/blur/icon bridges, so none of them emits here; the shadow family also measures
// zero in four independently compiled consumer bundles (the icon family does not: one of
// those bundles emits `--spacing-icon-xs`/`-lg`/`-hero`, from its own build's reads).
// The override point is always the tokens.css spelling,
// `--glass-shadow-quiet` and its siblings, declared in a plain `:root`.
//
// Two arms:
//   (a) ANTI-REGRESSION — nothing in `src/` or `demo/` reads a shadow/blur/icon bridge
//       name through `var()`. GREEN at the time of writing; it is what keeps README's
//       paragraph true.
//   (b) BORN-RED — README's §Design Tokens carries the bridge paragraph and no longer
//       carries the sentence "Consumers override any token locally per project", which
//       is a positive falsehood for every bridge name.
//
// SCOPE. Arm (a) covers the three families measured at ZERO reads
// (`--shadow-glass-*`, `--blur-glass-*`, `--spacing-icon-*`). The wider bridge roster
// is NOT asserted: `--text-*`, `--color-accent` and the `--font-*`/`--tracking-*`/
// `--leading-*` keys are read through `var()` at 50 sites today. That measurement is
// recorded in the lane record rather than hidden behind a failing assertion.
// ─────────────────────────────────────────────────────────────────────────────

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");

const BRIDGES = "src/styles/theme/bridges.css";
/** The bridge families that no source reads — the ones README's paragraph is about. */
const FAMILIES = ["--shadow-glass-", "--blur-glass-", "--spacing-icon-"];

/** Left-hand names declared in bridges.css. */
const bridgeNames = (css: string): string[] => [
    ...new Set(css.match(/(?<=^\s*)--[A-Za-z0-9_-]+(?=\s*:)/gm) ?? []),
];

const SOURCE_EXT = /\.(css|ts|vue|js|html)$/;

const sourceFiles = (root: string): { path: string; text: string }[] =>
    readdirSync(join(process.cwd(), root), { recursive: true, withFileTypes: true })
        .filter((e) => e.isFile() && SOURCE_EXT.test(e.name))
        .map((e) => ({
            path: join(e.parentPath, e.name),
            text: readFileSync(join(e.parentPath, e.name), "utf8"),
        }));

describe("@theme inline bridges", () => {
    const css = read(BRIDGES);
    const names = bridgeNames(css).filter((n) => FAMILIES.some((f) => n.startsWith(f)));

    it("declares the shadow/blur/icon bridge families", () => {
        // Five shadow rungs are bridged; `--glass-shadow-capsule` deliberately is not.
        expect(names.filter((n) => n.startsWith("--shadow-glass-")).sort()).toEqual([
            "--shadow-glass-floating",
            "--shadow-glass-overlay",
            "--shadow-glass-quiet",
            "--shadow-glass-resting",
            "--shadow-glass-wash",
        ]);
        expect(
            names.filter((n) => n.startsWith("--blur-glass-")).length,
        ).toBeGreaterThan(0);
        expect(
            names.filter((n) => n.startsWith("--spacing-icon-")).length,
        ).toBeGreaterThan(0);
    });

    it("is never read through var() in src/ or demo/ — a bridge name resolves to nothing", () => {
        const reads: string[] = [];
        for (const root of ["src", "demo"]) {
            for (const { path, text } of sourceFiles(root)) {
                if (path === join(process.cwd(), BRIDGES)) continue;
                text.split("\n").forEach((line, i) => {
                    for (const m of line.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)) {
                        if (names.includes(m[1]))
                            reads.push(`${path}:${i + 1} ${m[1]}`);
                    }
                });
            }
        }
        expect(reads, "var() reads of a non-emitting bridge name").toEqual([]);
    });
});

describe("README §Design Tokens", () => {
    const readme = read("README.md");
    const section = readme.split("## Design Tokens")[1]?.split("\n## ")[0] ?? "";

    it("does not claim every token is overridable — bridge names are not", () => {
        expect(readme).not.toContain(
            "Consumers override any token locally per project",
        );
    });

    it("states the bridge rule and names the real override point", () => {
        expect(section).toContain("@theme inline");
        expect(section).toContain("--glass-shadow-quiet");
    });
});
