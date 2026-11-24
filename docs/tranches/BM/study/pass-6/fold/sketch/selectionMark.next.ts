// BM pass 6's fold of pass 5 (A5-1, A5-2, A5-3, A5-6, A5-8, B5-4, B5-7, B5-10, B5-11): the one selection mark's
// writer, with its input. A design sketch, not library source; it replaces pass-5/mark/sketch/selectionMark.next.ts.
// keyframes.js computes, the browser plays (P7 as drafted, DESIGN §4.6): `playSpring` is the settle player, amended
// in this fold to end within half a pixel of its rest (B5-5), and `estimateVelocity` is keyframes.js's release
// estimator over 80 ms (UNION I9). Both are external here, as they would be in the library.
//
// THE STATES, and what each writes:
//   rest     nothing runs. The mark sits at the chosen option's layout box (offsetLeft/offsetWidth, never a rect).
//   hover    CSS only (the option's own plate at the light strength, the chosen option's too).
//   press    CSS only: the pressed option's plate takes the press tone, the chosen option's under the mark.
//   follow   after 6 px of travel, one write of `translate` per pointer event; the pressed plate stands down. The grab offset is taken where the
//            slack runs out, from where the mark is drawn, so it never jumps (A5-3). Past an end it holds still.
//   release  the commit is the option under the finger (law 3, B5-11). The settle is seeded with the mark's own speed
//            over the last 80 ms (zero while it was held at an end), capped so it passes its rest by no more than a
//            settle from a standing start, plus a quarter pixel, and zero if it moves away from its rest (A5-1).
//   tap      the commit is the tapped option, at `click`; the mark travels from where it is drawn, with its speed.
//   cancel   `pointercancel` returns the mark to the chosen option; nothing commits (L16).
//   keyboard arrow keys move focus and, under automatic activation, the choice; the mark fades across (Q16's
//            proposal, A5-9) or glides on the row the owner picks.
//   reduced  the player's reduced form: the mark dips, lands while hidden, and returns (200 ms); never a cut.
import { playSpring, playReduced, seedCap, type SpringHandle, type SpringRow } from "./playSpring";
import { estimateVelocity } from "@mkbabb/keyframes.js";

export interface MarkOptions {
    group: HTMLElement;              // the strip or the run: the mark's containing block
    mark: HTMLElement;               // the one `.selection-mark`, aria-hidden and inert
    options: () => HTMLElement[];    // the options in order
    dock: SpringRow;                 // SPRING_PRESETS "dock"
    keys: SpringRow | "fade";        // Q16, the owner's pick; "fade" proposed
    draggable: boolean;              // §3.4: a host opts in; a run that scrolls never does (§8.1)
    commit: (index: number) => void; // the model: aria-selected / aria-current change here, before the settle
}

export function selectionMark(o: MarkOptions) {
    let chosen = 0;
    let x = 0;                                 // the mark's translate where it rests or was last written
    let play: SpringHandle | null = null;
    const fmt = (v: number) => `${v}px 0`;
    const boxOf = (i: number) => { const el = o.options()[i]; return { x: el.offsetLeft, w: el.offsetWidth }; };
    const drawn = () => (play ? play.position() : x);
    const travelTo = (i: number, row: SpringRow, speed?: number) => {
        const to = boxOf(i).x;
        play = play && speed === undefined ? play.retarget(to) : (play?.stop(), playSpring(o.mark, "translate", fmt, row, drawn(), to, speed ?? 0));
        x = to;
    };
    const indexAt = (px: number) => {
        const opts = o.options();
        for (let i = 0; i < opts.length; i++) { const b = boxOf(i); if (px >= b.x && px < b.x + b.w) return i; }
        return px < boxOf(0).x ? 0 : opts.length - 1;
    };
    const layout = () => { o.mark.style.setProperty("--mark-w", `${boxOf(chosen).w}px`); x = boxOf(chosen).x; o.mark.style.translate = fmt(x); };

    let drag: { x0: number; grab?: number; samples: [number, number][] } | null = null;
    const local = (e: PointerEvent) => e.clientX - o.group.getBoundingClientRect().left;
    const onDown = (e: PointerEvent) => {
        const i = o.options().findIndex((el) => el.contains(e.target as Node));
        if (i !== chosen || !o.draggable) return;
        o.group.setPointerCapture(e.pointerId);
        drag = { x0: local(e), samples: [] };
    };
    const onMove = (e: PointerEvent) => {
        if (!drag) return;
        const px = local(e);
        if (drag.grab === undefined) {
            if (Math.abs(px - drag.x0) < 6) return;
            x = drawn(); play?.stop(); play = null;
            drag.grab = px - x;
            o.group.toggleAttribute("data-following", true);
        }
        const last = boxOf(o.options().length - 1).x;
        x = Math.min(last, Math.max(boxOf(0).x, px - drag.grab));
        o.mark.style.translate = fmt(x);
        drag.samples.push([e.timeStamp, x]);
    };
    const onUp = (e: PointerEvent, cancelled: boolean) => {
        o.group.removeAttribute("data-following");
        if (!drag) return;
        const d = drag; drag = null;
        if (d.grab === undefined) return;
        if (cancelled) { travelTo(chosen, o.dock); return; }
        const i = indexAt(local(e));
        if (i !== chosen) { chosen = i; o.commit(i); }
        const to = boxOf(i).x, v = estimateVelocity(d.samples, 80);
        travelTo(i, o.dock, seedCap(o.dock, to - x, v));
    };
    o.group.addEventListener("pointerdown", onDown);
    o.group.addEventListener("pointermove", onMove);
    o.group.addEventListener("pointerup", (e) => onUp(e, false));
    o.group.addEventListener("pointercancel", (e) => onUp(e, true));
    o.group.addEventListener("click", (e) => {
        const i = o.options().findIndex((el) => el.contains(e.target as Node));
        if (i < 0 || i === chosen) return;
        chosen = i; o.commit(i); travelTo(i, o.dock);
    });
    return {
        layout,
        key(i: number) {
            chosen = i; o.commit(i);
            if (o.keys === "fade") { play?.stop(); play = playReduced(o.mark, "translate", fmt, o.dock, boxOf(i).x); x = boxOf(i).x; return; }
            travelTo(i, o.keys);
        },
    };
}
