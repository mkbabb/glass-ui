// authored/minify-types.mjs — AUTHORED input to derive/edits.mjs (step B-S11, LAW §5, B12).
//
// S10 moved scripts/lib/minify-css.mjs to minify-css.ts through the engine. This row gives it
// its own types (the main program checks it strictly through vite.style-fold.ts), deletes the
// .d.mts mirror, and spells its two importers extensionless (bundler resolution; no
// allowImportingTsExtensions). Three comments that cite the file by name follow it.

export const why = "B12: minify-css declares its own types; the .d.mts mirror leaves";

const F = "scripts/lib/minify-css.ts";
export const edits = [
    { file: F, all: true, why: "typed predicates", from: "(code) =>", to: "(code: number) =>" },
    { file: F, why: "typed", from: "function consumeEscape(css, start) {", to: "function consumeEscape(css: string, start: number): { end: number; point: number; hexDigits: number; terminated: boolean } {" },
    { file: F, why: "typed", from: "function consumeString(css, start) {", to: "function consumeString(css: string, start: number): number {" },
    { file: F, why: "typed", from: "function consumeComment(css, start) {", to: "function consumeComment(css: string, start: number): number {" },
    { file: F, why: "typed", from: "function consumeName(css, start) {", to: "function consumeName(css: string, start: number): { end: number; decoded: string; unterminatedHex: boolean } {" },
    { file: F, why: "typed; the index is in range, so the code point is defined", from: "            const point = css.codePointAt(end);\n", to: "            const point = css.codePointAt(end) as number;\n" },
    { file: F, why: "typed", from: "function consumeUrl(css, start) {", to: "function consumeUrl(css: string, start: number): number {" },
    { file: F, why: "typed", from: "function scanCss(css) {", to: "function scanCss(css: string): { output: string; hasComment: boolean } {" },
    { file: F, why: "typed", from: "    const emit = (token, structural = false) => {", to: "    const emit = (token: string, structural = false): void => {" },
    { file: F, why: "typed", from: "export function minifyCss(css) {", to: "export function minifyCss(css: string): string {" },
    { file: F, why: "typed", from: "export function hasCommentOutsideString(css) {", to: "export function hasCommentOutsideString(css: string): boolean {" },
    { file: "scripts/lib/minify-css.d.mts", why: "B12: the mirror leaves", remove: true },
    { file: "vite.style-fold.ts", why: "extensionless under bundler resolution", from: `import { minifyCss } from "./scripts/lib/minify-css.ts";`, to: `import { minifyCss } from "./scripts/lib/minify-css";` },
    { file: "vite.style-fold.ts", why: "the comment cites the file by name", from: " * minify-css.mjs` `minifyCss`)", to: " * minify-css.ts` `minifyCss`)" },
    { file: "tests/styles/minify-css.test.ts", why: "extensionless under bundler resolution", from: `from "../../scripts/lib/minify-css.ts";`, to: `from "../../scripts/lib/minify-css";` },
    { file: "tests/public-surface.spec.ts", why: "the comment cites the file by name", from: "`scripts/lib/minify-css.mjs:18`", to: "`scripts/lib/minify-css.ts:18`" },
    { file: "scripts/verify-export-types.mjs", why: "the comment cites the file by name", from: "`scripts/lib/minify-css.mjs:18`", to: "`scripts/lib/minify-css.ts:18`" },
];
