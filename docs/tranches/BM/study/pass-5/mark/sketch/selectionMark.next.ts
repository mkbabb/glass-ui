// BM pass 5: the one selection mark's writer (DESIGN §7). A design sketch, not library source. It replaces two
// writers for one job: `useSelectionIndicator`'s per-change `width`/`height`/`translate` glide (SegmentedTabs,
// DockLayerGroup) and `useDockRunMark`'s five per-frame lengths (the dock run). keyframes.js computes, the browser
// plays (P7 as drafted, DESIGN §4.6): `playSpring` is pass 3's settle player (pass-3/fold/sketch/playSpring.ts), whose
// sampler belongs in keyframes.js.
//
// THE STATES, and what each writes:
//   rest      nothing runs. The window sits at the chosen option's layout box (offsetLeft/offsetWidth in the
//             group's own coordinates, never a rect: useDockRunMark's lesson under zoom and scaled stages).
//   hover     CSS only (the option's own light fill).
//   press     an unchosen option: its label starts toward full ink (CSS, `data-pressing`); the mark does not move.
//             The chosen option: if the group is draggable, the press grabs the mark (a follow may start).
//   follow    one write of the window's `translate` per pointer event, at the finger, after 6 px of travel; no spring.
//             Past the first or last option it clamps, or, if the owner takes "stretches past the ends", the far edge
//             leads the finger by a capped amount (S of the mark's width).
//   release   the commit is the option under the release point (law 3); the release speed, from keyframes.js's
//             estimator over the last 80 ms (UNION I9), seeds the settle on the dock row.
//   tap       the commit is the tapped option, at `click` (law 3); the mark travels on the dock row from where it is
//             drawn, keeping its speed if it was already moving (a second tap mid-glide).
//   cancel    `pointercancel` (a scroll took the touch) returns the mark to the chosen option; nothing commits (L16).
//   keyboard  arrow keys move focus and, under automatic activation, the choice; the mark travels on the row the
//             owner picks on P5-mark (Q16): the dock row, the press row, or a fade across.
//   reduced   the player's reduced-motion form: the mark dips, lands while hidden, and returns, 200 ms in all; the
//             commit itself is instant (W-R.1 :84), and what the reader sees is a fade, never a cut (law 7).
import { playSpring, playReduced, type SpringHandle, type SpringRow } from "./playSpring"; // playReduced exported for Q16's fade

export interface MarkOptions {
    group: HTMLElement;           // the strip or the run: the mark's containing block
    mark: HTMLElement;            // the one `.selection-mark`, aria-hidden and inert
    options: () => HTMLElement[]; // the options in order
    dock: SpringRow;              // SPRING_PRESETS "dock"
    keyRow: SpringRow | "fade";   // Q16, the owner's pick
    stretch: { travel: boolean; ends: boolean; cap: number; k: number }; // Q8, the owner's picks; cap 0.2, k 1.396
    commit: (index: number) => void;   // the model: aria-selected / aria-current change here, before the settle
}

export function selectionMark(o: MarkOptions) {
    let chosen = 0;
    let x = 0;                              // the window's translate where it rests or was last written
    let lead: SpringHandle | null = null;  // the window's settle, while one plays
    const fmt = (v: number) => `${v}px 0`;
    const boxOf = (i: number): [number, number] => { const el = o.options()[i]; return [el.offsetLeft, el.offsetLeft + el.offsetWidth]; };
    // The window is as wide as the widest option grown by the stretch cap, set once per layout.
    const layout = () => {
        const widest = Math.max(...o.options().map((el) => el.offsetWidth));
        o.mark.style.setProperty("--mark-w", `${widest * (1 + o.stretch.cap)}px`);
    };
    // Equal options ride one handle on the window: the whole motion. A width change, or the travel stretch, adds a
    // second handle on the fill's `translate` (the right edge relative to the window); P5-mark's `travel()` plays both
    // edges from their own springs and caps the gap at `cap` of the width. Omitted here for length.
    const travelTo = (i: number, row: SpringRow, velocity = 0) => {
        const [l1] = boxOf(i);
        lead = lead ? lead.retarget(l1) : playSpring(o.mark, "translate", fmt, row, x, l1, velocity);
        x = l1;
    };
    return {
        layout,
        tap(i: number) { if (i === chosen) return; chosen = i; o.commit(i); travelTo(i, o.dock); },
        release(i: number, velocity: number) { chosen = i; o.commit(i); travelTo(i, o.dock, velocity); },
        cancel() { travelTo(chosen, o.dock); },
        key(i: number) {
            chosen = i; o.commit(i);
            if (o.keyRow === "fade") { lead?.stop(); lead = playReduced(o.mark, "translate", fmt, o.dock, boxOf(i)[0]); x = boxOf(i)[0]; return; }
            travelTo(i, o.keyRow);
        },
        // A follow holds the mark where it is drawn (the player commits it) and then writes it at the finger.
        follow(at: number) { lead?.stop(); lead = null; x = at; o.mark.style.translate = fmt(at); },
    };
}
