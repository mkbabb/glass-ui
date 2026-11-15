// The dock's painted reads, for the release witnesses restated by W-I.8 (RU-22 pile (a)).
//
// Under the one carrier the dock's root is its layout box and paints nothing; the plate
// (`.glass-dock > .dock-plate`) is the painted shape. Three reads the shipped witnesses
// took from the old mechanism now live here:
//
//   - The corner. A pill rests at an oversized radius on all four corners (`9999px`), and
//     CSS scales all four by one factor until they fit, so the used corner is exactly half
//     the cross extent. `__usedRadii(el)` returns each corner's used value, as a length
//     string. A corner that is not a single length (a percentage, an elliptical pair) is
//     returned as computed, so a witness that asks for "one length" still bites on it.
//   - The visible box. A region is clipped to its lane by `clip-path: inset()` while a
//     travel runs, not by its box's overflow. `__visibleBox(el, stop)` cuts an element's
//     box by every ancestor's overflow clip and by every ancestor's (and its own) inset clip,
//     up to `stop`.
//   - The painted box: `__plateBox()`, the plate's border box.
import type { Page } from "@playwright/test";

declare global {
    interface Window {
        __usedRadii(el: Element): string[];
        __visibleBox(
            el: Element,
            stop?: Element | null,
        ): { l: number; t: number; r: number; b: number };
        __plateBox(): { left: number; right: number; top: number; bottom: number };
    }
}

/** Install the reads on every page the test opens. */
export function installPaintReads(page: Page): Promise<void> {
    return page.addInitScript(() => {
        const one = (v: string) => /^-?[\d.]+px$/.test(v.trim());
        window.__usedRadii = (el: Element) => {
            const cs = getComputedStyle(el);
            const raw = [
                cs.borderTopLeftRadius,
                cs.borderTopRightRadius,
                cs.borderBottomRightRadius,
                cs.borderBottomLeftRadius,
            ];
            if (!raw.every(one)) return raw;
            const r = raw.map((v) => Number.parseFloat(v));
            const b = el.getBoundingClientRect();
            // The used values: every corner scaled by the one factor that makes each side's
            // two corners fit it (CSS Backgrounds 3, "corner curves overlap").
            const w = (el as HTMLElement).offsetWidth || b.width;
            const h = (el as HTMLElement).offsetHeight || b.height;
            const f = Math.min(
                1,
                w / (r[0]! + r[1]! || Infinity),
                w / (r[3]! + r[2]! || Infinity),
                h / (r[0]! + r[3]! || Infinity),
                h / (r[1]! + r[2]! || Infinity),
            );
            return r.map((v) => `${Math.round(v * f * 1000) / 1000}px`);
        };
        const insetOf = (cs: CSSStyleDeclaration): number[] | null => {
            const m = /^inset\(([^)]*)\)/.exec(cs.clipPath);
            if (!m) return null;
            const parts = m[1]!.split(/\s+round\s+/)[0]!.trim().split(/\s+/).map((p) => Number.parseFloat(p));
            const [t, r = t, b = t, l = r] = parts as [number, number?, number?, number?];
            return [t, r!, b!, l!];
        };
        window.__visibleBox = (el: Element, stop?: Element | null) => {
            const box = el.getBoundingClientRect();
            let [l, t, r, b] = [box.left, box.top, box.right, box.bottom];
            for (let a: Element | null = el; a && a !== document.body && a !== stop; a = a.parentElement) {
                const cs = getComputedStyle(a);
                const ab = a.getBoundingClientRect();
                if (a !== el) {
                    if (cs.overflowX !== "visible") [l, r] = [Math.max(l, ab.left), Math.min(r, ab.right)];
                    if (cs.overflowY !== "visible") [t, b] = [Math.max(t, ab.top), Math.min(b, ab.bottom)];
                }
                const ins = insetOf(cs);
                if (ins) {
                    l = Math.max(l, ab.left + ins[3]!);
                    r = Math.min(r, ab.right - ins[1]!);
                    t = Math.max(t, ab.top + ins[0]!);
                    b = Math.min(b, ab.bottom - ins[2]!);
                }
            }
            return { l, t, r, b };
        };
        window.__plateBox = () => {
            const p = document.querySelector(".glass-dock > .dock-plate")!.getBoundingClientRect();
            return { left: p.left, right: p.right, top: p.top, bottom: p.bottom };
        };
    });
}
