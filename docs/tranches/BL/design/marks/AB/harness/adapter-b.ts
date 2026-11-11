// Proposal B: the drawn stroke (`TextMark`, an SVG stroke measured from the glyph ink).
import { TextMark } from "../src/components/text-mark";
export const name = "B";
export const Comp = TextMark;
export const props = (shape: string, o: { ink?: string }) => ({
    shape,
    ...(o.ink ? { color: o.ink } : {}),
});
export const hideCSS = ".tm-window{display:none!important}.tm{text-decoration:none!important;background:none!important}";
export const animSel = ".tm-window,.tm-frame";
export const plain = {
    tag: (s: string) => (s === "highlight" ? "mark" : "span"),
    cls: () => "tm",
};
