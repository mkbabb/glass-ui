// Proposal C (atlas, inbound): HandMark reworked as a measured rule and a flat band
// (branch u/ow-glass-type-mark, a44ef3598; its src/components/handmark/ copied verbatim).
import { HandMark } from "../src/components/handmark";
export const name = "C";
export const Comp = HandMark;
// `color` is a CSS colour for every shape; the default trigger is already in-view.
export const props = (shape: string, o: { ink?: string }) => ({
    shape,
    ...(o.ink ? { color: o.ink } : {}),
});
export const hideCSS = ".hm-reveal{display:none!important}";
export const animSel = ".hm-reveal,.hm-mark,.hm-guide,.hm-ink";
// The proposal offers no class a page can use without the component.
export const plain: null | { tag: (s: string) => string; cls: (s: string) => string } = null;
