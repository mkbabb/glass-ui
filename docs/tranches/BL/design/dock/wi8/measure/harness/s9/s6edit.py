# s6edit.py <worktree> [part ...]: S6's source edits (RU-101 as amended for C8-M2; RU-90's O-262; RU-89 as amended for
# C8-M7). Parts: words, empty, press (default all). The idle-fold writer (RU-90, O-268) is s6idle.py, on its reading.
import sys
W = sys.argv[1]; PARTS = sys.argv[2:] or ["words", "empty", "press"]; D = W + "/src/components/dock/"
def edit(p, pairs):
    s = open(D + p).read()
    for old, new in pairs:
        c = s.count(old); assert c == 1, (p, c, old[:100]); s = s.replace(old, new)
    open(D + p, "w").write(s)
B = "composables/useDockBody.ts"
if "words" in PARTS:
    edit(B, [
     ("""    const seats = new Map<HTMLElement, { lx: number; ly: number; x: Q; y: Q; rx: number; ry: number; sx: number; sy: number; w: number; h: number; ox: number; oy: number }>();""",
      """    // RU-101: `lw` is the seat's layout extent on the dock's axis and `cw` its painted minus layout extent, held
    // under 0 while a seat that grew is cut to the extent it painted.
    const seats = new Map<HTMLElement, { lx: number; ly: number; x: Q; y: Q; rx: number; ry: number; sx: number; sy: number; w: number; h: number; ox: number; oy: number; lw: number; cw: Q }>();"""),
     ("""            const lx = child.offsetLeft + inX;
            const ly = child.offsetTop + inY;""", """            const lx = child.offsetLeft + inX;
            const ly = child.offsetTop + inY;
            const lw = o.vertical() ? child.offsetHeight : child.offsetWidth;"""),
     ("""                seats.set(child, { lx, ly, x: { d: 0, v: 0 }, y: { d: 0, v: 0 }, ...rel });""",
      """                seats.set(child, { lx, ly, x: { d: 0, v: 0 }, y: { d: 0, v: 0 }, ...rel, lw, cw: { d: 0, v: 0 } });"""),
     ("""            t.lx = lx;
            t.ly = ly;
        }""", """            // RU-101: a seat that grows is cut to the extent it painted, which glides to its new one with
            // its neighbour's carried edge; a seat that shrinks has nothing painted past its box to hold.
            if (carry && Math.abs(t.lw - lw) > 0.01) {
                t.cw.d = Math.min(0, t.cw.d + t.lw - lw);
                if (t.cw.d === 0) t.cw.v = 0;
                movedAny = true;
            }
            t.lx = lx;
            t.ly = ly;
            t.lw = lw;
        }"""),
     ("""        for (const [el, t] of seats) {
            if (seen.has(el)) continue;
            el.style.removeProperty("translate");
            seats.delete(el);
            void t;
        }""", """        for (const [el, t] of seats) {
            if (seen.has(el)) continue;
            el.style.removeProperty("translate");
            el.style.removeProperty("clip-path");
            seats.delete(el);
            void t;
        }"""),
     ("""        for (const t of seats.values()) if (t.x.d !== 0 || t.y.d !== 0) return true;""",
      """        for (const t of seats.values()) if (t.x.d !== 0 || t.y.d !== 0 || t.cw.d !== 0) return true;"""),
     ("""            for (const t of [...regions.values(), ...seats.values()]) {
                [t.x.d, t.x.v] = step(t.x.d, t.x.v, dt);
                [t.y.d, t.y.v] = step(t.y.d, t.y.v, dt);
                if (Math.abs(t.x.d) < SNAP_PX && Math.abs(t.x.v) < SNAP_V) (t.x.d = 0), (t.x.v = 0);
                if (Math.abs(t.y.d) < SNAP_PX && Math.abs(t.y.v) < SNAP_V) (t.y.d = 0), (t.y.v = 0);
            }""", """            for (const t of [...regions.values(), ...seats.values()]) {
                [t.x.d, t.x.v] = step(t.x.d, t.x.v, dt);
                [t.y.d, t.y.v] = step(t.y.d, t.y.v, dt);
                if (Math.abs(t.x.d) < SNAP_PX && Math.abs(t.x.v) < SNAP_V) (t.x.d = 0), (t.x.v = 0);
                if (Math.abs(t.y.d) < SNAP_PX && Math.abs(t.y.v) < SNAP_V) (t.y.d = 0), (t.y.v = 0);
            }
            for (const t of seats.values()) {
                [t.cw.d, t.cw.v] = step(t.cw.d, t.cw.v, dt);
                if (t.cw.d >= 0 || (Math.abs(t.cw.d) < SNAP_PX && Math.abs(t.cw.v) < SNAP_V)) (t.cw.d = 0), (t.cw.v = 0);
            }"""),
     ("""                for (const t of [...regions.values(), ...seats.values()]) (t.x.d = t.y.d = t.x.v = t.y.v = 0);""",
      """                for (const t of [...regions.values(), ...seats.values()]) (t.x.d = t.y.d = t.x.v = t.y.v = 0);
                for (const t of seats.values()) t.cw.d = t.cw.v = 0;"""),
     ("""            if (x !== 0 || y !== 0) el.style.translate = `${x.toFixed(3)}px ${y.toFixed(3)}px`;
            else if (el.style.translate) el.style.removeProperty("translate");
        }""", """            if (x !== 0 || y !== 0) el.style.translate = `${x.toFixed(3)}px ${y.toFixed(3)}px`;
            else if (el.style.translate) el.style.removeProperty("translate");
            const cut = -t.cw.d;
            if (cut > 0) el.style.clipPath = o.vertical() ? `inset(0 0 ${cut.toFixed(3)}px 0)` : flip ? `inset(0 0 0 ${cut.toFixed(3)}px)` : `inset(0 ${cut.toFixed(3)}px 0 0)`;
            else if (el.style.clipPath) el.style.removeProperty("clip-path");
        }"""),
     ("""        for (const el of seats.keys()) el.style.removeProperty("translate");
        const rr = runEl();""", """        for (const [el, t] of seats) {
            el.style.removeProperty("translate");
            el.style.removeProperty("clip-path");
            t.cw.d = t.cw.v = 0;
        }
        const rr = runEl();"""),
    ])
if "empty" in PARTS:
    edit(B, [
     ("""            t.x.d = t.cx + t.x.d + (sx * t.w) / 2 - (lcx + (sx * nw) / 2);
            t.y.d = t.cy + t.y.d + (sy * t.h) / 2 - (lcy + (sy * nh) / 2);""",
      """            if (t.w === 0 && t.h === 0 && layout) {
                // O-262 (RU-90): a region with no box when the travel starts (a foot its host shows only
                // open) painted nowhere to be carried from: it rides the root's anchored point, laid out
                // where it rests, and the plate's moving edge uncovers it.
                const at = (a: number, s: Q, e: Q) => (a < 0 ? s : a > 0 ? e : { d: (s.d + e.d) / 2, v: (s.v + e.v) / 2 });
                const ax = at(anchorX, edge.l, edge.r);
                const ay = at(anchorY, edge.t, edge.b);
                (t.x.d = ax.d), (t.x.v = ax.v);
                (t.y.d = ay.d), (t.y.v = ay.v);
            } else {
                t.x.d = t.cx + t.x.d + (sx * t.w) / 2 - (lcx + (sx * nw) / 2);
                t.y.d = t.cy + t.y.d + (sy * t.h) / 2 - (lcy + (sy * nh) / 2);
            }"""),
    ])
if "press" in PARTS:
    S = "composables/useDockState.ts"
    edit(S, [
     ("""    let expandOnPressEnd: "focus" | "hover" | null = null;""", """    let expandOnPressEnd: "focus" | "hover" | null = null;
    // RU-89: a leave after a persistent seat's press while the pointer is down folds at the lift.
    let foldOnPressEnd = false;"""),
     ("""        const deferred = seatAct ? null : expandOnPressEnd;
        expandOnPressEnd = null;""", """        const deferred = seatAct ? null : expandOnPressEnd;
        expandOnPressEnd = null;
        if (foldOnPressEnd) {
            foldOnPressEnd = false;
            if (!pointerInside && state.value === "hover" && keepOpenCount.value === 0) collapse();
        }"""),
     ("""    function dropPress() {
        expandOnPressEnd = null;""", """    function dropPress() {
        expandOnPressEnd = null;
        foldOnPressEnd = false;"""),
     ("""            if (afterSeat) collapse();
            else scheduleCollapse();""", """            // RU-89: 11.1.0's fold at once after a persistent seat's press, never while a pointer is down
            // (RU-43): then it waits for the lift.
            if (afterSeat && pressHolds()) foldOnPressEnd = true;
            else if (afterSeat) collapse();
            else scheduleCollapse();"""),
    ])
print("s6 edits applied:", PARTS)
