/**
 * W-I.8 prototype: the dock's one carrier (R-1), and its content window (R-3). One requestAnimationFrame loop per dock steps every
 * moving quantity on `springPreset("dock")` and writes; it parks on the frame its last
 * quantity lands and leaves nothing scheduled or written at rest.
 *
 * The model, in document px:
 *   - the row's painted box (the plate, or the plate plus the fission seat): four edges,
 *     each a delta from its layout edge, carried to 0 with its velocity;
 *   - each region (persistent, layers, persistent-end): the delta of the edge it is
 *     carried by;
 *   - the posture coordinate `e` and the exchange coordinate `f` (R-1, R-3).
 *
 * The spec splits this into useDockBody / useDockScene / useDockContent; the prototype
 * keeps it in one file.
 */
import { inject, onBeforeUnmount, onMounted, provide, type InjectionKey, type Ref } from "vue";
import { DOCK_SPRING } from "../constants";

const OMEGA = (2 * Math.PI) / DOCK_SPRING.response;
const ZETA = DOCK_SPRING.dampingFraction;
const WD = OMEGA * Math.sqrt(Math.max(1e-6, 1 - ZETA * ZETA));
const MAX_DT = 0.033;
/** The test-only pose (`__dockPose`): a build constant, so every branch that reads it is
 *  dropped from the published bundle, and G-12 scans the built script for the name. */
const POSE = import.meta.env.VITE_DOCK_HOLD === "1";
/** R-3's one window: 1 at 0, 0 from 0.55 on (RU-2). Content of two sizes goes out, then
 *  in (P0a rule 4): at the middle each face reads 0.09. 0.7 was built and read (C2-5): it
 *  closes the dip (each face 0.29 at the middle) and prints the two faces over each
 *  other for about three 60 Hz frames, which is v11.0.1's look and the fault the owner
 *  named (`fold-2.md`, the crop). 0.55 stands. */
const W_END = 0.55;
const w = (x: number) => (x <= 0 ? 1 : x >= W_END ? 0 : 1 - x / W_END);
/** A quantity lands when it is this close and this slow (px, px/s). 0.25 px is the floor
 *  RU-19 already uses for what an eye resolves in a moving edge; at 0.04 px the window
 *  stayed open about 200 ms after the plate was within half a pixel of its rest (C2-18). */
const SNAP_PX = 0.25;
const SNAP_V = 8;
/** R-5 (RU-11): the entering face's travel along the dock's axis. */
const ENTER_PX = 8;

/** Closed-form step of the dock spring toward 0 (mass 1). */
function step(x: number, v: number, dt: number): [number, number] {
    if (dt <= 0) return [x, v];
    const e = Math.exp(-ZETA * OMEGA * dt);
    const c = Math.cos(WD * dt);
    const s = Math.sin(WD * dt);
    const B = (v + ZETA * OMEGA * x) / WD;
    const nx = e * (x * c + B * s);
    const nv = e * (-ZETA * OMEGA * (x * c + B * s) + (-x * WD * s + B * WD * c));
    return [nx, nv];
}

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

interface Box {
    l: number;
    t: number;
    r: number;
    b: number;
}
interface Q {
    d: number;
    v: number;
}
interface FitPlan {
    run: HTMLElement;
    fits: boolean;
    whole: boolean;
    room: string;
}
interface RegionTrack {
    el: HTMLElement;
    key: string;
    cx: number;
    cy: number;
    w: number;
    h: number;
    x: Q;
    y: Q;
    tx: number;
    ty: number;
    clipped: boolean;
}
interface FaceTrack {
    el: HTMLElement;
    from: number;
    role: "enter" | "leave";
    placed: boolean;
    /** The side an entering face arrives from on the dock's axis (+1 trailing, −1 leading). */
    dir?: number;
    /** A placed leaving face: its region and that region's carried delta at placement, so
     *  it is held where it painted while the region rides its edge (R-4, C-1). */
    region?: string;
    d0x?: number;
    d0y?: number;
    /** A face returned to (R-3): where it painted before the return, its region, and the
     *  carry that takes it from there to its place in the new layout with no step. */
    ret?: Box;
    home?: string;
    q?: { x: Q; y: Q };
    /** An entering face that starts its rise at once: no other face of its group was
     *  above half strength when it entered (a third change on weak faces). */
    early?: boolean;
    /** A control the host removed from the open run: glass holds it where it painted,
     *  inert, and it fades on the leaving window; it leaves the DOM at the landing (R-3). */
    ghost?: boolean;
}
interface PendingLeave {
    el: HTMLElement;
    region: string;
    rect: Box;
    regionCx: number;
    regionCy: number;
}

export interface DockBody {
    /** Names the open face, the collapsed face and the fission seat for a posture travel:
     * their opacities are functions of the posture coordinate, never of a second clock. */
    postureFaces(open: HTMLElement | null | undefined, closed: HTMLElement | null | undefined): void;
    /** Called pre-flush, before the DOM changes which faces show. */
    exchange(leave: HTMLElement | null | undefined, enter: HTMLElement | null | undefined, region?: string, place?: boolean): void;
    /** Reads layout and retargets every quantity. */
    sync(reason: string): void;
    /** Subscribes to the end of the current travel (or now, at rest). */
    onSettle(cb: () => void): void;
    /** Test-only, present only in a build with VITE_DOCK_HOLD=1: pose the open dock at a
     *  posture coordinate e (null releases). */
    __dockPose?: (e: number | null) => void;
    readonly moving: Ref<boolean>;
}

export const DOCK_BODY_KEY: InjectionKey<DockBody> = Symbol("glass-dock-body");
export function useOptionalDockBody(): DockBody | undefined {
    return inject(DOCK_BODY_KEY, undefined);
}

export interface UseDockBodyOptions {
    root: Ref<HTMLElement | null>;
    plate: Ref<HTMLElement | null>;
    regions: () => Array<{ key: string; el: HTMLElement | null }>;
    /** The run: the box whose children are the seats (R-5, the open seat). */
    run?: Ref<HTMLElement | null>;
    expanded: () => boolean;
    vertical: () => boolean;
    reducedMotion: () => boolean;
    /** `shape="pill"`: the corner is half the painted cross extent (R-1, RU-13). */
    pill: () => boolean;
    moving: Ref<boolean>;
    /** R-5: the run's scroll offset as one more quantity (the run composable's reads). */
    runScroll?: { resting: (from: number) => number | null; halt: () => void };
}

/** The dock's effective CSS zoom (an ancestor's `zoom`): boxes are read in the viewport's
 *  px and written in the dock's own, so every read is divided by it (10.1.3 critique-7). */
let Z = 1;
function bcr(el: Element): { left: number; top: number; right: number; bottom: number; width: number; height: number } {
    const r = el.getBoundingClientRect();
    if (Z === 1) return r;
    return { left: r.left / Z, top: r.top / Z, right: r.right / Z, bottom: r.bottom / Z, width: r.width / Z, height: r.height / Z };
}
function rectOf(el: Element): Box {
    const r = bcr(el);
    const sx = scrollX / Z;
    const sy = scrollY / Z;
    return { l: r.left + sx, t: r.top + sy, r: r.right + sx, b: r.bottom + sy };
}
function pxOf(v: string, basis: number): number {
    if (v.endsWith("%")) return (Number.parseFloat(v) / 100) * basis;
    return Number.parseFloat(v) || 0;
}

export function useDockBody(o: UseDockBodyOptions): DockBody {
    // Layout of the row (the root's border box) and its painted deltas.
    let layout: Box | null = null;
    const edge: Record<"l" | "t" | "r" | "b", Q> = {
        l: { d: 0, v: 0 },
        t: { d: 0, v: 0 },
        r: { d: 0, v: 0 },
        b: { d: 0, v: 0 },
    };
    let rFrom = 0;
    let rTo = 0;
    // R-1 (RU-13): the rest corner of each posture, each capped at half its cross extent.
    const restR: [number, number] = [0, 0];
    const regions = new Map<string, RegionTrack>();
    // R-5 (RU-8): each seat of the run, by its layout offset in the run; a seat whose place
    // changes carries a translate from where it painted to 0.
    // Each seat's layout box relative to the run's border box at scroll (sx, sy), so a
    // seat the host removes can be held where it painted (R-3, a control that leaves).
    const seats = new Map<HTMLElement, { lx: number; ly: number; x: Q; y: Q; rx: number; ry: number; sx: number; sy: number; w: number; h: number; ox: number; oy: number }>();
    // Controls the host removed from the open run, held by glass until the landing.
    const ghosts = new Set<HTMLElement>();
    let faces: FaceTrack[] = [];
    const pendingLeaves: PendingLeave[] = [];
    // Content windows and the posture coordinate.
    let u = 0; // 1 - f
    let uv = 0;
    let travelling = false;
    let postureTravel = false;
    let lastPosture = o.expanded();
    // The posture coordinate (R-1, C-3): a quantity of its own on the same spring, 0
    // collapsed and 1 open, moved by a posture change and by nothing else.
    let e = lastPosture ? 1 : 0;
    const eq: Q = { d: 0, v: 0 };
    let openFace: HTMLElement | null = null;
    // R-5: the run's scroll offset, a quantity of the loop: it rests at `scrollRest` and
    // paints at `scrollRest + scrollQ.d`. `savedScroll` is the offset the open face had
    // when it folded, restored when it opens (RU-17: a face with no box loses its offset).
    const scrollQ: Q = { d: 0, v: 0 };
    let scrollRest: number | null = null;
    let savedScroll: number | null = null;
    let closedFace: HTMLElement | null = null;
    let held: number | null = null;
    // Loop state.
    let raf: number | null = null;
    let last: number | null = null;
    let inFlow = false;
    let wroteMargin = false;
    const settleCbs: Array<() => void> = [];
    let scopeEl: HTMLElement | null | undefined;
    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;

    const root = () => o.root.value;
    // A horizontal dock in a right-to-left page: the regions' physical order is reversed,
    // so the edge each is carried by and its lane are read from where it paints, not from
    // its name (C2-8). Read once per sync.
    let flip = false;
    // The root edge a change of layout keeps in place (an edge-anchored dock), per axis:
    // -1 the start, +1 the end, 0 neither or both. Read once per sync.
    let anchorX = 0;
    let anchorY = 0;

    function runEl(): HTMLElement | null {
        const r = o.run?.value;
        return r && r.isConnected ? r : null;
    }
    function readScroll(r: HTMLElement): number {
        return o.vertical() ? r.scrollTop : r.scrollLeft;
    }
    function writeScroll(r: HTMLElement, v: number): void {
        if (o.vertical()) r.scrollTop = v;
        else r.scrollLeft = v;
    }

    function painted(): Box | null {
        if (!layout) return null;
        return {
            l: layout.l + edge.l.d,
            t: layout.t + edge.t.d,
            r: layout.r + edge.r.d,
            b: layout.b + edge.b.d,
        };
    }

    function restRadius(el: HTMLElement, w: number, h: number): number {
        const cs = getComputedStyle(el);
        return Math.min(Math.min(w, h) / 2, pxOf(cs.borderTopLeftRadius, Math.min(w, h)));
    }

    /** Pre-flush: remember where the leaving content paints. */
    function exchange(
        leave: HTMLElement | null | undefined,
        enter: HTMLElement | null | undefined,
        region = "layers",
        place = true,
    ): void {
        const g = regions.get(region);
        if (leave && place) {
            const r = rectOf(leave);
            const gr = g ? { cx: g.cx + g.tx, cy: g.cy + g.ty } : { cx: (r.l + r.r) / 2, cy: (r.t + r.b) / 2 };
            pendingLeaves.push({ el: leave, region, rect: r, regionCx: gr.cx, regionCy: gr.cy });
        }
        const opOf = (el: HTMLElement) => {
            const inline = el.style.opacity;
            const v = Number.parseFloat(inline !== "" ? inline : getComputedStyle(el).opacity);
            // An element with no computed opacity (no style sheet applies) paints at 1.
            return Number.isFinite(v) ? v : 1;
        };
        const next: FaceTrack[] = [];
        // RU-17: the open face's run offset, kept for the unfold (its box goes at rest).
        if (leave && leave === openFace) {
            const r = runEl();
            if (r) savedScroll = scrollRest !== null ? scrollRest + scrollQ.d : readScroll(r);
        }
        // Every face still showing leaves from its painted opacity (R-5). The opacities
        // are read before any face's style is touched: a tracked face's painted value is
        // its inline one, and the class it still carries pre-flush says nothing of it.
        const paintedOp = new Map<HTMLElement, number>();
        for (const f of faces) paintedOp.set(f.el, opOf(f.el));
        const group = (enter ?? leave)?.parentElement ?? null;
        // R-3: a return to a face still tracked inverts the exchange where it is. The two
        // roles trade, the coordinate becomes 1 − f with its velocity negated, and nothing
        // restarts: the face returned to takes no entering offset and keeps its painted
        // place (it is carried from there to its layout place like any other quantity),
        // and each opacity continues from the value on screen.
        const back = enter ? faces.find((f) => f.el === enter) : undefined;
        const fwd = leave ? faces.find((f) => f.el === leave) : undefined;
        const posture = (el: HTMLElement | null | undefined) => !!el && (el === openFace || el === closedFace);
        if (
            travelling && back && fwd && enter && leave &&
            back.role === "leave" && fwd.role === "enter" &&
            !posture(enter) && !posture(leave) &&
            faces.filter((f) => f.el.parentElement === group).length === 2
        ) {
            const f0 = clamp01(1 - u);
            const a = paintedOp.get(enter) ?? 0;
            const b = paintedOp.get(leave) ?? 0;
            const win = o.reducedMotion() ? (x: number) => clamp01(1 - x) : w;
            const k = win(f0); // the returned-to face's window after the inversion
            const m = win(1 - f0); // the other's
            if ((k < 0.999 || a > 0.999) && (m > 0.001 || b < 0.001)) {
                const ret = place ? rectOf(enter) : undefined;
                if (place) for (const p of ["inset", "inset-inline-start", "left", "top", "width", "height", "translate"]) enter.style.removeProperty(p);
                faces = faces.map((f) =>
                    f.el === enter
                        ? { el: f.el, from: k < 0.999 ? (a - k) / (1 - k) : 0, role: "enter" as const, placed: true, ret, home: region }
                        : f.el === leave
                          ? { el: f.el, from: m > 0.001 ? b / m : 0, role: "leave" as const, placed: false }
                          : f,
                );
                u = 1 - u;
                uv = -uv;
                return;
            }
        }
        for (const f of faces) {
            if (f.el === enter) continue;
            const op = paintedOp.get(f.el) ?? 0;
            if (f.el.parentElement !== group) {
                // Another group's faces keep their direction from where they paint.
                next.push({ el: f.el, from: op, role: f.role, placed: f.placed });
                continue;
            }
            if (op > 0.001 || f.el === leave) next.push({ el: f.el, from: op, role: "leave", placed: f.placed });
            else clearFace(f);
        }
        if (leave && !next.some((f) => f.el === leave)) next.push({ el: leave, from: paintedOp.get(leave) ?? opOf(leave), role: "leave", placed: false });
        if (enter) {
            // A face that was leaving and is now entering (a posture travel turned: collapse()
            // mid-unfold) gives back the hold translate it was placed with, or it paints that
            // far from its place for the whole travel (10.1.3 critique-3: 183 px outside the plate).
            if (place) for (const p of ["inset", "inset-inline-start", "left", "top", "width", "height", "translate"]) enter.style.removeProperty(p);
            const known = faces.find((f) => f.el === enter);
            const from = known ? opOf(enter) : 0;
            // RU-11: a later layer (later in the tree) arrives from the trailing side, an
            // earlier one from the leading side. A posture exchange has no direction.
            let dir: number | undefined;
            if (leave && enter !== openFace && enter !== closedFace) {
                const later = !!(leave.compareDocumentPosition(enter) & Node.DOCUMENT_POSITION_FOLLOWING);
                const rtl = getComputedStyle(enter).direction === "rtl" && !o.vertical();
                dir = (later ? 1 : -1) * (rtl ? -1 : 1);
            }
            // A retarget onto weak faces: when nothing else in the group is above half
            // strength the entering face rises from the first frame, so the plate is not
            // left with nothing readable while a fresh window runs (C2-4).
            const early = travelling && !next.some((f) => f.el.parentElement === group && f.from > 0.5);
            next.push({ el: enter, from, role: "enter", placed: true, dir, early });
            enter.style.opacity = String(from);
        }
        for (const f of next) if (f.role === "leave") f.el.style.opacity = String(f.from);
        faces = next;
        u = 1;
        uv = 0;
        travelling = true;
    }

    /** A face that leaves the travel keeps none of the styles the loop wrote on it. */
    function clearFace(f: FaceTrack): void {
        if (f.ghost) {
            ghosts.delete(f.el);
            f.el.remove();
            return;
        }
        f.el.style.removeProperty("opacity");
        f.el.style.removeProperty("translate");
        if (f.el.style.transition === "none") f.el.style.removeProperty("transition");
        if (f.placed || f.role === "leave") for (const p of ["inset", "inset-inline-start", "left", "top", "width", "height"]) f.el.style.removeProperty(p);
    }

    function readRegions(): void {
        const seen = new Set<string>();
        for (const { key, el } of o.regions()) {
            if (!el || !el.isConnected) continue;
            seen.add(key);
            ro?.observe(el);
            const r = rectOf(el);
            let t = regions.get(key);
            if (!t || t.el !== el) {
                t = { el, key, cx: 0, cy: 0, w: 0, h: 0, x: { d: 0, v: 0 }, y: { d: 0, v: 0 }, tx: 0, ty: 0, clipped: false };
                t.cx = (r.l + r.r) / 2;
                t.cy = (r.t + r.b) / 2;
                // The size too: the edge carry reads the old box's edges, so a region first
                // read with no size was carried by its centre on its first change.
                t.w = r.r - r.l;
                t.h = r.b - r.t;
                regions.set(key, t);
            }
            // Layout = what the box would be without our translate.
            const lcx = (r.l + r.r) / 2 - t.tx;
            const lcy = (r.t + r.b) / 2 - t.ty;
            const nw = r.r - r.l;
            const nh = r.b - r.t;
            // C-2: a region is carried by the edge it shares with the plate or its
            // neighbour, never by its centre: the trailing region by its end edge, the
            // others by their start edge. -1 start, +1 end, on each axis.
            const side = key === "persistent-end" ? 1 : -1;
            // On the inline axis the start edge is the right one in a right-to-left dock.
            let sx = flip ? -side : side;
            let sy = side;
            // An edge-anchored dock (O-110: pinned by `right` or `bottom`) keeps one edge of
            // its box where it was; every region but the trailing one is carried by that
            // edge, so what it holds stays where it paints while the other edge travels
            // (10.1.3 critique-7: a folded face slid 240 px with the moving edge of a
            // right-anchored dock).
            if (key !== "persistent-end") {
                if (anchorX) sx = anchorX;
                if (anchorY) sy = anchorY;
            }
            t.x.d = t.cx + t.x.d + (sx * t.w) / 2 - (lcx + (sx * nw) / 2);
            t.y.d = t.cy + t.y.d + (sy * t.h) / 2 - (lcy + (sy * nh) / 2);
            t.cx = lcx;
            t.cy = lcy;
            t.w = nw;
            t.h = nh;
        }
        for (const k of [...regions.keys()]) if (!seen.has(k)) regions.delete(k);
    }

    /** Reads each seat's layout offset; returns true when a seat's place changed while the
     *  run is the face on screen. Offsets are layout, so our translate is not in them. */
    function readSeats(carry: boolean): boolean {
        const run = o.run?.value;
        if (!run || !run.isConnected) return false;
        let movedAny = false;
        const seen = new Set<HTMLElement>();
        const rr = bcr(run);
        // The run's origin without its region's written translate: where it is laid out.
        const lane = regions.get("layers");
        const ox = rr.left + scrollX / Z - (lane ? lane.tx : 0);
        const oy = rr.top + scrollY / Z - (lane ? lane.ty : 0);
        // A seat's place is in its region, not in the run: RU-27's whole-seat window centres
        // the run in the region, so when the flag comes or goes the run's own box moves and
        // every seat with it; that move is carried like any other change of place.
        const host = run.parentElement;
        const inX = !host ? 0 : run.offsetParent === host ? run.offsetLeft : run.offsetParent === host.offsetParent ? run.offsetLeft - host.offsetLeft : 0;
        const inY = !host ? 0 : run.offsetParent === host ? run.offsetTop : run.offsetParent === host.offsetParent ? run.offsetTop - host.offsetTop : 0;
        for (const child of run.children) {
            if (!(child instanceof HTMLElement) || child.offsetParent === null || ghosts.has(child)) continue;
            seen.add(child);
            const lx = child.offsetLeft + inX;
            const ly = child.offsetTop + inY;
            // The box without the translate the loop wrote, relative to the run.
            const cr = bcr(child);
            const tr = seats.get(child);
            const rel = {
                rx: cr.left - (tr ? tr.x.d : 0) - rr.left,
                ry: cr.top - (tr ? tr.y.d : 0) - rr.top,
                sx: run.scrollLeft,
                sy: run.scrollTop,
                w: cr.width,
                h: cr.height,
                ox,
                oy,
            };
            const t = tr;
            if (!t) {
                seats.set(child, { lx, ly, x: { d: 0, v: 0 }, y: { d: 0, v: 0 }, ...rel });
                ro?.observe(child);
                continue;
            }
            Object.assign(t, rel);
            if (carry && (Math.abs(t.lx - lx) > 0.01 || Math.abs(t.ly - ly) > 0.01)) {
                // Painted minus layout, with the velocity it had (a second change retargets).
                t.x.d += t.lx - lx;
                t.y.d += t.ly - ly;
                movedAny = true;
            }
            t.lx = lx;
            t.ly = ly;
        }
        for (const [el, t] of seats) {
            if (seen.has(el)) continue;
            el.style.removeProperty("translate");
            seats.delete(el);
            void t;
        }
        return movedAny;
    }

    /** The open run's one fit reading (RU-26, RU-27, RU-28): the seats' span in layout
     *  boxes, then the fit law, then the whole-seat flag. Every seat is one seat wide, the
     *  current one included, so nothing is lifted for the read and nothing in the run is
     *  sized by script. A horizontal run reads its port from the layers region it fills, a
     *  box the whole-seat cap does not change, so a host that gives the dock more room is
     *  read again (the root's observer fires) and the flag goes. */
    /** What a horizontal run's client box adds to its layers region uncapped, unyielded (RU-27). */
    let capExtra = 0;
    function fitRun(run: HTMLElement, open: boolean): FitPlan | null {
        // The fit is the open run's. A face with no box (RU-17), or a run leaving on a fold (its
        // region already laid out at the folded size), keeps the reading it had when it was
        // laid out open; it was flipped and read again on every fold (RU-29's second read).
        if (!open || run.offsetParent === null) return null;
        const v = o.vertical();
        // Layout extents only: the scroll extent counts the seats' carry translates mid-travel.
        let first = Infinity;
        let last = -Infinity;
        let size = -1;
        let same = true;
        let n = 0;
        for (const c of run.children) {
            if (!(c instanceof HTMLElement) || ghosts.has(c) || c.offsetParent === null) continue;
            const a0 = v ? c.offsetTop : c.offsetLeft;
            const sz = v ? c.offsetHeight : c.offsetWidth;
            first = Math.min(first, a0);
            last = Math.max(last, a0 + sz);
            if (size < 0) size = sz;
            else if (Math.abs(sz - size) > 0.5) same = false;
            n++;
        }
        const span = last > first ? last - first : 0;
        // The port is the shipped one, the run's client box, read uncapped. RU-27's cap narrows
        // that box, and a capped run is a run that did not fit, so the reserve did not yield: its
        // uncapped client box is the layers region it fills (which the cap does not change) plus
        // what the run's box added to the region when it was last read uncapped and not fitting.
        const host = run.parentElement;
        const capped = !v && !!host && run.hasAttribute("data-run-whole");
        // Fractional boxes for the capped reading: two rounded client widths can sum a pixel
        // over the one the run has uncapped, and the flag then reads its own cap.
        const port = v ? run.clientHeight : capped ? Math.round(host!.getBoundingClientRect().width + capExtra) : run.clientWidth;
        const fits = span > 0 && span <= port;
        if (!v && host && !capped && !fits) capExtra = run.clientWidth - host.getBoundingClientRect().width;
        // RU-27: the seats do not fit, so the run scrolls and its window is a whole number of
        // seats (run.css); the carrier sets only the flag. Not on a plain run, a run of
        // seats of more than one size, or a vertical run (12.0.0).
        const whole = !v && !fits && same && n >= 2 && root()?.getAttribute("data-run") !== "plain";
        const room = v && fits ? `${Math.floor(((port - span) / 2) * 100) / 100}px` : "";
        return { run, fits, whole, room };
    }

    /** The fit law (10.1.5 e4, k3, p2): `data-run-fits` says the seats' span is no longer
     *  than the run's port, and under it the reserve yields to the room left (run.css THE
     *  RESERVE YIELDS), so a run whose seats all show scrolls nothing it hides. On a vertical
     *  dock the room is `--dock-run-room-block`, half what the seats leave. Written from the
     *  open run's layout on the trigger frame, before the new layout is read, and held while
     *  the run has no box. */
    let fitPublished = "";
    /** The open run's last fit reading (RU-30 reads it). */
    let runFits = true;
    /** Writes the fit law and RU-27's flag from one reading; true when a box may move. */
    function writeFit(plan: FitPlan): boolean {
        const el = root();
        runFits = plan.fits;
        let moved = false;
        if (plan.run.hasAttribute("data-run-whole") !== plan.whole) {
            plan.run.toggleAttribute("data-run-whole", plan.whole);
            moved = true;
        }
        const value = `${plan.fits ? 1 : 0} ${plan.room}`;
        if (!el || value === fitPublished) return moved;
        fitPublished = value;
        if (plan.room) el.style.setProperty("--dock-run-room-block", plan.room);
        else el.style.removeProperty("--dock-run-room-block");
        el.toggleAttribute("data-run-fits", plan.fits);
        return true;
    }

    /** R-1 (C2-6): a pill taller than one row is still a stadium, so the open face's content
     *  is padded in from the ends until it lies inside the curve. Each child of the run is
     *  read as the rounded shape it is (its own corner), so a row of round seats needs
     *  nothing more than the padding it has; a box whose corner is r − √(r² − (r − b)²) short
     *  of the curve gets that much more inline padding on each side. Read in layout boxes
     *  (no translate the loop wrote), written once from the rest just read; the read after
     *  it takes the new width. */
    function fitCurve(el: HTMLElement, open: boolean, run: HTMLElement | null, fits: boolean): string | null {
        const had = el.style.getPropertyValue("--dock-curve-inset") !== "";
        // RU-30: the curve inset is for a run whose content all shows. A run that overflows
        // its axis is clipped square by its own port at a flush edge (10.1.5 k2), and its
        // child cut by the port's far edge read a corner that changed with the inset, so
        // each pass wrote a different one and the dock never rested (a cycle of five
        // insets in WebKit, of two in Chromium, a sync on every frame).
        if (!o.pill() || !open || !run || run.offsetParent === null || !fits) return had ? "" : null;
        const v = o.vertical();
        const R0 = bcr(el);
        const rad = (v ? R0.width : R0.height) / 2;
        const g = regions.get("layers");
        // The run's own carry (a face the loop moves, a return mid-fold) is a translate on
        // the run, not layout: it is taken out with the region's, or a carried run reads
        // its seats that far outside the curve (O-101a: a 200 px inset on a one-row dock).
        const [fx = 0, fy = 0] = (run.style.translate || "0 0").split(/\s+/).map((v) => Number.parseFloat(v) || 0);
        const gx = (g ? g.tx : 0) + fx;
        const gy = (g ? g.ty : 0) + fy;
        // The run's port clips its content, so a child is read only as far as the port.
        const rp = bcr(run);
        const port = { l: rp.left - gx, t: rp.top - gy, r: rp.right - gx, b: rp.bottom - gy };
        // In the cross-axis frame: `a` runs along the dock, `c` across it; the caps' centres
        // sit at a0 + rad and a1 − rad, on the cross centre line.
        const a0 = v ? R0.top : R0.left;
        const a1 = v ? R0.bottom : R0.right;
        const cMid = v ? R0.left + R0.width / 2 : R0.top + R0.height / 2;
        let short = -Infinity;
        for (const c of run.children) {
            if (!(c instanceof HTMLElement) || ghosts.has(c) || c.offsetParent === null) continue;
            const q = bcr(c);
            if (q.width <= 0 || q.height <= 0) continue;
            const t = seats.get(c);
            const l = Math.max(port.l, q.left - gx - (t ? t.x.d : 0));
            const tp = Math.max(port.t, q.top - gy - (t ? t.y.d : 0));
            const r = Math.min(port.r, q.right - gx - (t ? t.x.d : 0));
            const b = Math.min(port.b, q.bottom - gy - (t ? t.y.d : 0));
            if (r - l <= 0 || b - tp <= 0) continue;
            const rho = Math.min(Number.parseFloat(getComputedStyle(c).borderTopLeftRadius) || 0, (r - l) / 2, (b - tp) / 2);
            const lim = rad - rho;
            if (lim <= 0) continue;
            const along = v ? [tp + rho, b - rho] : [l + rho, r - rho];
            const across = v ? [l + rho, r - rho] : [tp + rho, b - rho];
            for (const cc of across) {
                const dc = Math.abs(cc - cMid);
                if (dc > lim) continue;
                const reach = Math.sqrt(lim * lim - dc * dc);
                short = Math.max(short, a0 + rad - reach - along[0], along[1] - (a1 - rad + reach));
            }
        }
        if (short === -Infinity) return null;
        const cs = getComputedStyle(el);
        const pad = Number.parseFloat(v ? cs.paddingTop : cs.paddingLeft) || 0;
        if (!had && short <= 0.25) return null;
        const want = Math.ceil((pad + short) * 4) / 4;
        const now = Number.parseFloat(el.style.getPropertyValue("--dock-curve-inset")) || 0;
        return !had || Math.abs(now - want) > 0.25 ? `${want}px` : null;
    }

    /** RU-35: master's names, kept as outputs through 11.2.0 (deleted in 12.0.0): the root's
     *  layout extent on the dock's axis in the posture it rests in (`--dock-expanded-px` or
     *  `--dock-collapsed-px`) and its cross extent (`--dock-plate-cross-px`), in px, from the
     *  layout this sync has just read. Written on trigger frames only, read by no rule of
     *  glass. A posture the dock has never rested in has no name: the carrier never measures
     *  a posture it is not in (RU-17), where master measured both at mount. */
    const outputs: Record<string, string> = {};
    function writeOutputs(el: HTMLElement, box: Box, posture: boolean): void {
        const v = o.vertical();
        const w = box.r - box.l;
        const h = box.b - box.t;
        const put = (k: string, px: number) => {
            const val = `${Math.round(px * 100) / 100}px`;
            if (outputs[k] === val) return;
            outputs[k] = val;
            el.style.setProperty(k, val);
        };
        put(posture ? "--dock-expanded-px" : "--dock-collapsed-px", v ? h : w);
        put("--dock-plate-cross-px", v ? w : h);
    }

    function sync(reason: string): void {
        const el = root();
        if (!el || !el.isConnected) return;
        Z = (el as HTMLElement & { currentCSSZoom?: number }).currentCSSZoom ?? 1;
        const reduce = o.reducedMotion();
        const prevPainted = painted();
        // RU-29: the trigger frame reads the new layout once. The flags that change layout
        // (the fit law, RU-27's whole-seat window, the curve inset) are decided from that one
        // read and written together; only when one changed is the layout read once more.
        if (POSE) performance.mark("dock:read", { detail: { reason } });
        {
            const open = o.expanded();
            const run = runEl();
            const plan = run ? fitRun(run, open) : null;
            const inset = fitCurve(el, open, run, plan ? plan.fits : runFits);
            if (POSE) performance.mark("dock:flags");
            const fitMoved = plan ? writeFit(plan) : false;
            if (inset !== null) {
                if (inset === "") el.style.removeProperty("--dock-curve-inset");
                else el.style.setProperty("--dock-curve-inset", inset);
            }
            if (POSE && (fitMoved || inset !== null)) performance.mark("dock:reread", { detail: { fit: fitMoved, inset, fits: plan?.fits ?? null, whole: plan?.whole ?? null } });
        }
        const next = rectOf(el);
        if (layout) {
            const keep = (a0: number, a1: number, b0: number, b1: number) => {
                const s0 = Math.abs(a0 - b0) <= 0.5, s1 = Math.abs(a1 - b1) <= 0.5;
                return s1 && !s0 ? 1 : s0 && !s1 ? -1 : 0;
            };
            anchorX = keep(layout.l, layout.r, next.l, next.r);
            anchorY = keep(layout.t, layout.b, next.t, next.b);
        }
        const posture = o.expanded();
        const postureChanged = posture !== lastPosture;
        lastPosture = posture;
        flip = !o.vertical() && getComputedStyle(el).direction === "rtl";

        // The rest corners, read from the root (the plate inherits it).
        const w = next.r - next.l;
        const h = next.b - next.t;
        const rNext = restRadius(el, w, h);
        const changed =
            !layout ||
            Math.abs(next.l - layout.l) > 0.01 ||
            Math.abs(next.r - layout.r) > 0.01 ||
            Math.abs(next.t - layout.t) > 0.01 ||
            Math.abs(next.b - layout.b) > 0.01;

        // The seats carry only when the open face stays on screen (a content change).
        const seatsMoved = readSeats(!postureChanged && posture);
        if (!layout) {
            layout = next;
            rFrom = rTo = rNext;
            restR[posture ? 1 : 0] = rNext;
            restR[posture ? 0 : 1] = rNext;
            readRegions();
            e = posture ? 1 : 0;
            writeExpandT();
            writeOutputs(el, next, posture);
            return;
        }

        // R-5: the open seat moving in a scrolling run is a content change even when no seat
        // changes place (every seat is one seat wide, RU-28): the offset that brings it in is a
        // quantity of the loop.
        // Left to the run's own reach it scrolled a mandatory-snap port, which snapped each
        // written offset to a seat (whole-seat steps in one row).
        let scrollOnly = false;
        {
            const r = runEl();
            if (r && o.runScroll && posture && !postureChanged && !seatsMoved && reason === "content") {
                const from = scrollRest !== null ? scrollRest + scrollQ.d : readScroll(r);
                const to = o.runScroll.resting(from);
                scrollOnly = to !== null && Math.abs(to - from) > 0.5;
            }
        }
        if (changed || postureChanged || pendingLeaves.length || seatsMoved || scrollOnly) {
            if (prevPainted && changed) {
                // Each edge holds painted minus layout, with the velocity it had.
                edge.l.d = prevPainted.l - next.l;
                edge.t.d = prevPainted.t - next.t;
                edge.r.d = prevPainted.r - next.r;
                edge.b.d = prevPainted.b - next.b;
                const pw = prevPainted.r - prevPainted.l;
                const ph = prevPainted.b - prevPainted.t;
                rFrom = currentRadius(pw, ph);
                rTo = rNext;
                layout = next;
            }
            restR[posture ? 1 : 0] = rNext;
            if (postureChanged) {
                // Painted minus target, with the velocity it had (a return turns it).
                eq.d = e - (posture ? 1 : 0);
                postureTravel = true;
            }
            readRegions();
            // RU-29: every read of this sync before its first write. The returned faces'
            // rectangles, the run's resting offset and the leaving faces' containing blocks
            // are read here; placeLeaves, the offset and write() come after.
            const retRects = new Map<HTMLElement, Box>();
            for (const f of faces) if (f.ret) retRects.set(f.el, rectOf(f.el));
            const r = runEl();
            let restTo: number | null | undefined;
            let restFrom = 0;
            if (r && o.runScroll) {
                if (postureChanged && posture) restTo = o.runScroll.resting(savedScroll ?? readScroll(r));
                else if (posture && (seatsMoved || scrollOnly)) {
                    restFrom = scrollRest !== null ? scrollRest + scrollQ.d : readScroll(r);
                    o.runScroll.halt();
                    restTo = o.runScroll.resting(restFrom);
                }
            }
            const leaves = readLeaves();
            if (POSE) performance.mark("dock:write");
            placeLeaves(leaves);
            // R-3: a face returned to is carried from where it painted to its place in the
            // new layout: painted minus what the layout and its region's carry would paint,
            // with the velocity that keeps it still against that carry.
            for (const f of faces) {
                if (!f.ret) continue;
                const g = regions.get(f.home ?? "layers");
                const r = retRects.get(f.el)!;
                const gx = g ? g.x : { d: 0, v: 0 };
                const gy = g ? g.y : { d: 0, v: 0 };
                f.q = {
                    x: { d: f.ret.l - (r.l - (g?.tx ?? 0) + gx.d), v: -gx.v },
                    y: { d: f.ret.t - (r.t - (g?.ty ?? 0) + gy.d), v: -gy.v },
                };
                f.ret = undefined;
            }
            // R-5: the run's offset. On an unfold it is restored on this frame, with the
            // open seat brought in (RU-17); on a content change in the open run it is one
            // more quantity, from where it painted to where it rests.
            if (r && o.runScroll) {
                if (postureChanged && posture) {
                    scrollQ.d = scrollQ.v = 0;
                    scrollRest = null;
                    if (restTo != null) writeScroll(r, restTo);
                } else if (posture && (seatsMoved || scrollOnly)) {
                    const to = restTo ?? null;
                    if (to !== null && (scrollRest !== null || Math.abs(restFrom - to) > 0.01)) {
                        scrollQ.d = restFrom - to;
                        scrollRest = to;
                    }
                }
            }
            // R-1: a window resize seats every quantity at layout with no travel, and so
            // does a change before the dock's first frame: nothing has painted to glide from.
            // A resize that arrives while a travel runs is a retarget like any other: each
            // quantity already holds painted minus the new layout and glides on (C2-17).
            const seated = (resized && raf === null && !travelling) || !shown;
            if (reduce || seated) {
                if (seated) {
                    eq.d = eq.v = 0;
                    u = uv = 0;
                }
                eq.v = 0;
                for (const q of Object.values(edge)) (q.d = 0), (q.v = 0);
                for (const t of regions.values()) (t.x.d = t.y.d = t.x.v = t.y.v = 0);
                for (const t of seats.values()) (t.x.d = t.y.d = t.x.v = t.y.v = 0);
                for (const f of faces) if (f.q) f.q.x.d = f.q.y.d = f.q.x.v = f.q.y.v = 0;
                scrollQ.d = scrollQ.v = 0;
            }
            if (postureChanged || changed) {
                if (!travelling) {
                    u = 1;
                    uv = 0;
                }
                travelling = true;
            }
            writeOutputs(el, next, posture);
            el.setAttribute("data-morphing", "");
            o.moving.value = true;
            start(reason === "ro");
            if (POSE) performance.mark("dock:end");
        }
    }

    /** The leaving faces' placements, all read before any is written (RU-29: with two faces
     *  leaving at once, a containing block read between two writes was a layout of its own). */
    interface LeavePlan {
        p: (typeof pendingLeaves)[number];
        g: RegionTrack;
        x: number;
        y: number;
        w: number;
        h: number;
    }
    function readLeaves(): LeavePlan[] {
        const out: LeavePlan[] = [];
        while (pendingLeaves.length) {
            const p = pendingLeaves.shift()!;
            const g = regions.get(p.region);
            const el = p.el;
            const cb = (el.offsetParent as HTMLElement | null) ?? el.parentElement;
            if (!cb || !g) continue;
            const cbr = rectOf(cb);
            // The containing block's layout position (it rides the region's translate).
            // `left`/`top` are from the padding edge, inside the containing block's border.
            const cbl = cbr.l - g.tx + cb.clientLeft;
            const cbt = cbr.t - g.ty + cb.clientTop;
            // `left`/`top` place the margin box; the rect read is the border box.
            const ms = getComputedStyle(el);
            // The region's next written translate is its carried delta, so the face paints
            // where it painted: cb's layout edge + this offset + that delta.
            // An absolute box in a scroll container is placed in its scrolled content.
            const x = p.rect.l - cbl - g.x.d - (Number.parseFloat(ms.marginLeft) || 0) + cb.scrollLeft;
            const y = p.rect.t - cbt - g.y.d - (Number.parseFloat(ms.marginTop) || 0) + cb.scrollTop;
            // The rect is the border box; a content-box face (the run, padded on both axes)
            // given it as `height` grew by its padding and centred its seats 4 px lower.
            const px = (k: string) => Number.parseFloat(ms.getPropertyValue(k)) || 0;
            const cbx = ms.boxSizing === "border-box";
            const padW = cbx ? 0 : px("padding-left") + px("padding-right") + px("border-left-width") + px("border-right-width");
            const padH = cbx ? 0 : px("padding-top") + px("padding-bottom") + px("border-top-width") + px("border-bottom-width");
            out.push({ p, g, x, y, w: p.rect.r - p.rect.l - padW, h: p.rect.b - p.rect.t - padH });
        }
        return out;
    }

    function placeLeaves(plans: LeavePlan[]): void {
        for (const { p, g, x, y, w, h } of plans) {
            const el = p.el;
            el.style.inset = "auto";
            el.style.insetInlineStart = "auto";
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.style.width = `${w}px`;
            el.style.height = `${h}px`;
            const ft = faces.find((f) => f.el === el);
            if (ft) {
                ft.placed = true;
                ft.region = p.region;
                ft.d0x = g.x.d;
                ft.d0y = g.y.d;
            }
        }
    }

    function currentRadius(pw: number, ph: number): number {
        // A pill is half its painted cross extent in every frame: the owner's "Rounded."
        if (o.pill()) return Math.min(pw, ph) / 2;
        // A rounded or card dock: the lerp of its two rests on e in a posture travel.
        if (postureTravel || (POSE && held !== null)) return restR[0] + (restR[1] - restR[0]) * clamp01(e);
        const f = 1 - u;
        return rFrom + (rTo - rFrom) * clamp01(f);
    }

    function start(inFrame: boolean): void {
        const el = root();
        if (el) {
            // Only a dock in normal block flow writes the margin: in a flex or grid
            // parent a margin moves the dock itself (centring) and the model goes stale.
            const pos = getComputedStyle(el).position;
            const parent = el.parentElement ? getComputedStyle(el.parentElement).display : "";
            inFlow = (pos === "static" || pos === "relative") && /^(block|flow-root|list-item)$/.test(parent);
        }
        if (!isLive()) {
            // A retarget that leaves nothing to move (a reversal before any frame painted)
            // is no travel: no busy window is made up for it.
            if (raf !== null) cancelAnimationFrame(raf);
            raf = null;
            rest();
            return;
        }
        if (raf === null) {
            scopeEl = undefined;
            last = inFrame ? (document.timeline.currentTime as number | null) : null;
            raf = requestAnimationFrame(frame);
        }
        // The trigger's write: the painted state with its new targets (the same paint, so
        // no step), and the published values that read the new travel.
        write();
    }

    function isLive(): boolean {
        for (const q of Object.values(edge)) if (q.d !== 0) return true;
        for (const t of regions.values()) if (t.x.d !== 0 || t.y.d !== 0) return true;
        for (const t of seats.values()) if (t.x.d !== 0 || t.y.d !== 0) return true;
        if (scrollQ.d !== 0 || eq.d !== 0) return true;
        for (const f of faces) if (f.q && (f.q.x.d !== 0 || f.q.y.d !== 0)) return true;
        // The exchange coordinate moves only a face that is not a posture face in a
        // posture travel (those read e).
        if (u !== 0 && faces.some((f) => !(postureTravel && (f.el === openFace || f.el === closedFace)))) return true;
        return false;
    }

    function frame(now: number): void {
        raf = null;
        const dt = last === null ? 0 : Math.min(now - last, MAX_DT * 1000) / 1000;
        last = now;
        const reduce = o.reducedMotion();
        let live = false;
        if (dt > 0) {
            for (const q of Object.values(edge)) {
                [q.d, q.v] = step(q.d, q.v, dt);
                if (Math.abs(q.d) < SNAP_PX && Math.abs(q.v) < SNAP_V) (q.d = 0), (q.v = 0);
            }
            [scrollQ.d, scrollQ.v] = step(scrollQ.d, scrollQ.v, dt);
            if (Math.abs(scrollQ.d) < SNAP_PX && Math.abs(scrollQ.v) < SNAP_V) (scrollQ.d = 0), (scrollQ.v = 0);
            for (const t of [...regions.values(), ...seats.values()]) {
                [t.x.d, t.x.v] = step(t.x.d, t.x.v, dt);
                [t.y.d, t.y.v] = step(t.y.d, t.y.v, dt);
                if (Math.abs(t.x.d) < SNAP_PX && Math.abs(t.x.v) < SNAP_V) (t.x.d = 0), (t.x.v = 0);
                if (Math.abs(t.y.d) < SNAP_PX && Math.abs(t.y.v) < SNAP_V) (t.y.d = 0), (t.y.v = 0);
            }
            for (const f of faces) {
                if (!f.q) continue;
                [f.q.x.d, f.q.x.v] = step(f.q.x.d, f.q.x.v, dt);
                [f.q.y.d, f.q.y.v] = step(f.q.y.d, f.q.y.v, dt);
                if (reduce || (Math.abs(f.q.x.d) < SNAP_PX && Math.abs(f.q.x.v) < SNAP_V)) (f.q.x.d = 0), (f.q.x.v = 0);
                if (reduce || (Math.abs(f.q.y.d) < SNAP_PX && Math.abs(f.q.y.v) < SNAP_V)) (f.q.y.d = 0), (f.q.y.v = 0);
            }
            if (reduce) {
                // R-11: under reduced motion, the preference set mid-travel included, every
                // geometric quantity is at its rest in this frame.
                for (const q of Object.values(edge)) (q.d = 0), (q.v = 0);
                for (const t of [...regions.values(), ...seats.values()]) (t.x.d = t.y.d = t.x.v = t.y.v = 0);
                scrollQ.d = scrollQ.v = 0;
                // R-11: the coordinate runs as a linear clock, whole at 100 ms.
                eq.d = Math.sign(eq.d) * Math.max(0, Math.abs(eq.d) - dt / 0.1);
                u = Math.max(0, u - dt / 0.1);
                uv = 0;
            } else {
                [eq.d, eq.v] = step(eq.d, eq.v, dt);
                if (Math.abs(eq.d) < 0.002 && Math.abs(eq.v) < 0.05) (eq.d = 0), (eq.v = 0);
                [u, uv] = step(u, uv, dt);
                if (u < 0) u = 0;
                if (Math.abs(u) < 0.002 && Math.abs(uv) < 0.05) (u = 0), (uv = 0);
            }
        }
        live = isLive();
        if (live) {
            write();
            raf = requestAnimationFrame(frame);
        } else {
            rest();
        }
    }

    function writeExpandT(): void {
        const el = root();
        if (!el) return;
        const v = e.toFixed(4);
        el.style.setProperty("--dock-expand-t", v);
        // C-16: the scope element is found once per travel (start, rest), not each frame.
        if (scopeEl === undefined) scopeEl = el.parentElement?.closest<HTMLElement>("[data-dock-scope]") ?? null;
        scopeEl?.style.setProperty("--dock-expand-t", v);
    }

    function write(): void {
        const el = root();
        const plate = o.plate.value;
        const P = painted();
        if (!el || !plate || !layout || !P) return;
        const f = clamp01(1 - u);
        // The posture coordinate: its own quantity, never read from the plate's extent.
        e = clamp01((lastPosture ? 1 : 0) + eq.d);
        if (POSE && held !== null) e = held;
        writeExpandT();
        // `--dock-morph-t` keeps master's meaning through 11.2.0 (R-10): the progress of the
        // current posture travel, 0 to 1, so a reversal reads 1 − t where it turns.
        if (postureTravel) el.style.setProperty("--dock-morph-t", (lastPosture ? e : 1 - e).toFixed(4));

        const W = P.r - P.l;
        const H = P.b - P.t;
        const R = currentRadius(W, H);
        plate.style.inset = `${P.t - layout.t}px ${layout.r - P.r}px ${layout.b - P.b}px ${P.l - layout.l}px`;
        plate.style.borderRadius = `${R}px`;

        // Regions ride the plate, clipped to its painted box while travel runs.
        // A lane rounds only the corners it shares with the plate: `round r` on all four
        // corners of a lane narrower than 2r was scaled down by CSS on every corner, so the
        // plate-side corners were less round than the plate and content painted past its curve.
        const clipTo = (t: RegionTrack, box: Box, rIn: number) => {
            const on = (a: number, b: number) => Math.abs(a - b) <= 0.5;
            // RU-31: a lane that shares an end with the plate and is narrower on the dock's
            // axis than the radius it would round that end with is closed. CSS scales a
            // rounded inset narrower than its radius down on every corner, so such a band
            // paints up to 4.39 px outside the plate's curve (keyframes's transport under
            // reduced motion), and nothing whole fits in a band inside a cap.
            const vAxis = o.vertical();
            const shares = vAxis ? on(box.t, P.t) || on(box.b, P.b) : on(box.l, P.l) || on(box.r, P.r);
            const along = vAxis ? box.b - box.t : box.r - box.l;
            if (shares && rIn > 0 && along < rIn) {
                t.el.style.clipPath = "inset(50%)";
                t.clipped = true;
                return;
            }
            const cr =(y: "t" | "b", x: "l" | "r") => (on(box[y], P[y]) && on(box[x], P[x]) ? rIn : 0);
            const r = `${cr("t", "l")}px ${cr("t", "r")}px ${cr("b", "r")}px ${cr("b", "l")}px`;
            const left = t.cx - t.w / 2 + t.tx;
            const top = t.cy - t.h / 2 + t.ty;
            // C-1: the plate's painted box in the region's own coordinates. Insets may be
            // negative; the region's layout box is never a clip edge.
            const ci = {
                t: box.t - top,
                l: box.l - left,
                r: left + t.w - box.r,
                b: top + t.h - box.b,
            };
            t.el.style.clipPath = `inset(${ci.t}px ${ci.r}px ${ci.b}px ${ci.l}px round ${r})`;
            t.clipped = true;
        };
        // C-2: each region is clipped to its lane: the plate's painted box narrowed to
        // the painted edges of its neighbours on the main axis.
        const order = ["persistent", "layers", "persistent-end"]
            .map((k) => regions.get(k))
            .filter((t): t is RegionTrack => !!t);
        // The lanes run in painted order: reversed in a right-to-left dock.
        if (flip) order.reverse();
        // A region with no size still gets its lane: its leaving face is placed out of flow
        // and paints, and without a lane it painted over its neighbour (keyframes's transport).
        // R-5: each seat whose place changed rides its own translate to 0, and the run's
        // offset rides its quantity, so a seat's painted place is one curve.
        // WebKit keeps a scroll offset whole, so an offset written with a fraction steps by
        // a pixel when it rounds. The offset is written whole and its fraction rides the
        // seats' translate, so the two together are the quantity (not in a right-to-left
        // run, whose offsets count the other way; there the offset is written as it is).
        const rr = runEl();
        let fx = 0;
        let fy = 0;
        if (rr && scrollRest !== null) {
            const target = scrollRest + scrollQ.d;
            const whole = flip ? target : Math.round(target);
            writeScroll(rr, whole);
            if (o.vertical()) fy = whole - target;
            else fx = whole - target;
        }
        for (const [el, t] of seats) {
            const x = t.x.d + fx;
            const y = t.y.d + fy;
            if (x !== 0 || y !== 0) el.style.translate = `${x.toFixed(3)}px ${y.toFixed(3)}px`;
            else if (el.style.translate) el.style.removeProperty("translate");
        }
        for (const t of order) {
            t.tx = t.x.d;
            t.ty = t.y.d;
            t.el.style.translate = `${t.tx}px ${t.ty}px`;
        }
        const vert = o.vertical();
        // The boundary between two neighbours is the painted edge of the one carried by
        // it: the trailing region's start edge, else the leading region's end edge.
        // a paints before b on the axis. The run yields to its neighbour on either side, so
        // the boundary is the neighbour's facing edge: b's near edge when a is the run,
        // a's far edge otherwise.
        const boundary = (a: RegionTrack, b: RegionTrack): number =>
            a.key === "layers"
                ? vert ? b.cy - b.h / 2 + b.ty : b.cx - b.w / 2 + b.tx
                : vert ? a.cy + a.h / 2 + a.ty : a.cx + a.w / 2 + a.tx;
        order.forEach((t, i) => {
            const lane = { ...P };
            const prev = order[i - 1];
            const next = order[i + 1];
            if (vert) {
                if (prev) lane.t = Math.max(lane.t, boundary(prev, t));
                if (next) lane.b = Math.min(lane.b, boundary(t, next));
            } else {
                if (prev) lane.l = Math.max(lane.l, boundary(prev, t));
                if (next) lane.r = Math.min(lane.r, boundary(t, next));
            }
            clipTo(t, lane, Math.min(R, H / 2));
        });
        // Content (R-3, RU-2): one window, w(x) = clamp(1 − x / 0.55). For a posture change
        // the summary reads w(e) and the run w(1 − e); for a content change the leaving
        // face reads w(f) and the entering face w(1 − f). Under reduced motion (R-11) the
        // coordinate is a linear 100 ms clock and each face fades across the whole of it.
        const reduce = o.reducedMotion();
        const win = reduce ? (x: number) => clamp01(1 - x) : w;
        const posing = postureTravel || (POSE && held !== null);
        for (const face of faces) {
            let op: number;
            if (face.el === openFace && posing) op = win(1 - e);
            else if (face.el === closedFace && posing) op = win(e);
            else if (face.role === "leave") op = face.from * win(f);
            else {
                // The entering window; an early face reads the same window from the start
                // of the exchange (1 at f = 0.55) instead of from 0.45 on.
                const inW = face.early && !reduce ? clamp01(f / W_END) : win(1 - f);
                op = clamp01(face.from + (1 - face.from) * inW);
                if (face.q) face.el.style.translate = `${face.q.x.d.toFixed(3)}px ${face.q.y.d.toFixed(3)}px`;
                // RU-11: the entering face arrives over 8 px from the side it lives on.
                if (face.dir && !reduce) {
                    const off = face.dir * ENTER_PX * (1 - inW);
                    face.el.style.translate = o.vertical() ? `0 ${off.toFixed(3)}px` : `${off.toFixed(3)}px 0`;
                }
            }
            // The leaving face does not move: it is held where it painted against its
            // region's carry, and only the plate's moving edge cuts it (R-4, C-1).
            if (face.role === "leave" && face.region !== undefined) {
                const t = regions.get(face.region);
                if (t) face.el.style.translate = `${(-(t.tx - (face.d0x ?? 0))).toFixed(3)}px ${(-(t.ty - (face.d0y ?? 0))).toFixed(3)}px`;
            }
            face.el.style.opacity = op.toFixed(4);
        }

        // An in-flow dock: its following neighbours track the painted bottom edge.
        if (inFlow && !o.vertical()) {
            const mb = edge.b.d;
            if (Math.abs(mb) > 0.01) {
                el.style.marginBlockEnd = `${mb}px`;
                wroteMargin = true;
            } else if (wroteMargin) {
                el.style.removeProperty("margin-block-end");
                wroteMargin = false;
            }
        }
    }

    function rest(): void {
        const el = root();
        const plate = o.plate.value;
        travelling = false;
        if (postureTravel) {
            postureTravel = false;
            el?.style.removeProperty("--dock-morph-t");
        }
        e = lastPosture ? 1 : 0;
        writeExpandT();
        scopeEl = undefined;
        if (plate) {
            plate.style.removeProperty("inset");
            plate.style.removeProperty("border-radius");
        }
        for (const el of seats.keys()) el.style.removeProperty("translate");
        const rr = runEl();
        if (rr && scrollRest !== null) writeScroll(rr, scrollRest);
        scrollRest = null;
        scrollQ.d = scrollQ.v = 0;
        for (const t of regions.values()) {
            t.el.style.removeProperty("translate");
            t.el.style.removeProperty("clip-path");
            t.tx = t.ty = 0;
            t.clipped = false;
        }
        for (const face of faces) clearFace(face);
        faces = [];
        if (wroteMargin) {
            el?.style.removeProperty("margin-block-end");
            wroteMargin = false;
        }
        el?.removeAttribute("data-morphing");
        o.moving.value = false;
        const cbs = settleCbs.splice(0);
        for (const cb of cbs) cb();
    }

    function onSettle(cb: () => void): void {
        if (raf === null && !travelling) cb();
        else settleCbs.push(cb);
    }

    function __dockPose(pose: number | null): void {
        held = pose;
        if (pose !== null) {
            root()?.setAttribute("data-morphing", "");
            write();
        } else {
            rest();
        }
    }

    let resized = false;
    let shown = false;
    let resizeFrame: number | null = null;
    function onWindowResize(): void {
        resized = true;
        if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
            // R-1: the resize is read once, at layout, with no travel: a dock whose size
            // did not change (so no ResizeObserver record) still moved, and a model left at
            // the old place would start the next travel from it.
            sync("resize");
            resizeFrame = requestAnimationFrame(() => {
                resized = false;
                resizeFrame = null;
            });
        });
    }
    onMounted(() => {
        window.addEventListener("resize", onWindowResize);
        sync("mount");
        requestAnimationFrame(() => {
            shown = true;
        });
        if (typeof ResizeObserver === "undefined") return;
        ro = new ResizeObserver(() => sync("ro"));
        const el = root();
        if (el) ro.observe(el);
        for (const { el: r } of o.regions()) if (r) ro.observe(r);
        for (const seat of seats.keys()) ro.observe(seat);
        // The content observer (R-1's one trigger per fact): a seat's current mark or the
        // seat set changes in a task, and its record arrives as a microtask, before the
        // next frame, so the change is read before any frame paints it.
        const run = o.run?.value;
        if (run && typeof MutationObserver !== "undefined") {
            mo = new MutationObserver((recs) => {
                onRunRecords(recs);
                sync("content");
            });
            mo.observe(run, { attributes: true, attributeFilter: ["aria-current"], childList: true, subtree: true });
        }
    });
    onBeforeUnmount(() => {
        window.removeEventListener("resize", onWindowResize);
        if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
        ro?.disconnect();
        mo?.disconnect();
        if (raf !== null) cancelAnimationFrame(raf);
    });

    /** R-3 (C-5): a control that joins the open run enters on the entering window, and one
     *  the host removes is held where it painted, inert and out of flow, and leaves on the
     *  leaving window; it goes from the DOM with the landing. The records arrive as a
     *  microtask after the host's patch, before any frame paints the change. A move (the
     *  same node removed and added) is neither. A folded dock's run has no box: nothing. */
    function onRunRecords(recs: MutationRecord[]): void {
        const run = runEl();
        if (!run || !shown || !o.expanded() || run.offsetParent === null) return;
        const joined: HTMLElement[] = [];
        let any = false;
        for (const rec of recs) {
            if (rec.type !== "childList" || rec.target !== run) continue;
            for (const n of rec.removedNodes) {
                if (!(n instanceof HTMLElement) || ghosts.has(n) || n.parentNode === run) continue;
                const t = seats.get(n);
                if (!t) continue;
                // Where it painted: the run's origin at the last read (read now, the run is
                // already laid out for the new set) plus its region's translate as written.
                const lane = regions.get("layers");
                const l = t.ox + (lane ? lane.tx : 0) + t.rx - (run.scrollLeft - t.sx) + t.x.d;
                const tp = t.oy + (lane ? lane.ty : 0) + t.ry - (run.scrollTop - t.sy) + t.y.d;
                const inline = Number.parseFloat(n.style.opacity);
                const from = Number.isFinite(inline) ? inline : 1;
                ghosts.add(n);
                n.setAttribute("data-dock-leaving", "");
                n.setAttribute("aria-hidden", "true");
                n.inert = true;
                n.style.position = "absolute";
                n.style.margin = "0";
                n.style.pointerEvents = "none";
                n.style.opacity = String(from);
                n.style.transition = "none";
                // Out of the run: the run's scroll port is laid out for the new set already and
                // cut a seat removed at its end in the first row. Its lane is the run's region.
                (run.parentElement ?? run).appendChild(n);
                pendingLeaves.push({ el: n, region: "layers", rect: { l, t: tp, r: l + t.w, b: tp + t.h }, regionCx: 0, regionCy: 0 });
                faces.push({ el: n, from, role: "leave", placed: false, ghost: true });
                any = true;
            }
            for (const n of rec.addedNodes) {
                if (!(n instanceof HTMLElement) || ghosts.has(n) || seats.has(n) || n.parentNode !== run) continue;
                joined.push(n);
            }
        }
        for (const n of joined) {
            // The loop owns its opacity for the travel; a seat's own opacity transition
            // would lag every write.
            n.style.transition = "none";
            n.style.opacity = "0";
            faces.push({ el: n, from: 0, role: "enter", placed: false, early: travelling });
            any = true;
        }
        if (any) {
            if (!travelling) {
                u = 1;
                uv = 0;
            }
            travelling = true;
        }
    }

    function postureFaces(open: HTMLElement | null | undefined, closed: HTMLElement | null | undefined): void {
        openFace = open ?? null;
        closedFace = closed ?? null;
    }

    const body: DockBody = { postureFaces, exchange, sync, onSettle, moving: o.moving };
    if (POSE) body.__dockPose = __dockPose;
    provide(DOCK_BODY_KEY, body);
    return body;
}
