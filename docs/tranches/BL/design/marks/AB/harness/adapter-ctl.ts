// Control: today's HandMark on release/11.1.0, in its in-view mode (the O-190 setting).
import { HandMark } from "../src/components/handmark";
export const name = "control";
export const Comp = HandMark;
export const props = (shape: string, o: { ink?: string }) => ({
    shape,
    trigger: "in-view",
    // HandMark's `color` is a colour for the stroke but a hue number for the band.
    ...(o.ink ? { color: shape === "highlight" ? "175" : o.ink } : {}),
});
export const hideCSS = ".hm-reveal{display:none!important}";
export const animSel = ".hm-reveal,.hm-mark,.hm-guide,.hm-ink";
export const plain: null | { tag: (s: string) => string; cls: (s: string) => string } = null;
