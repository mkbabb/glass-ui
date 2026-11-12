// Proposal A: the typographic mark (`Mark`, a text decoration drawn in by a copy).
import { Mark } from "../src/components/mark";
export const name = "A";
export const Comp = Mark;
export const props = (shape: string, o: { ink?: string }) => ({
    shape,
    ...(o.ink ? { style: `--mark-ink:${o.ink}` } : {}),
});
export const hideCSS =
    ".mark-underline,.mark-highlight{text-decoration:none!important}.mark-layer{display:none!important}";
export const animSel = ".mark-line,.mark-slide";
export const plain = {
    tag: (s: string) => (s === "highlight" ? "mark" : "span"),
    cls: (s: string) => (s === "highlight" ? "mark-highlight" : "mark-underline"),
};
