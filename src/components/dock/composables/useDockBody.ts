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
/** R-3's one window: 1 at 0, 0 from 0.7 on. At the middle of a travel each face reads
 *  0.29, so the plate is never empty and neither face passes half strength while the
 *  other shows (P0a rule 4). At 0.55 each read 0.09 there: two 60 Hz frames of a fold
 *  with nothing in the dock (C2-5). */
const W_END = 0.7;
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
    /** Test-only: pose the open dock at a posture coordinate e (null releases). */
    hold(e: number | null): void;
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

function rectOf(el: Element): Box {
    const r = el.getBoundingClientRect();
    return { l: r.left + scrollX, t: r.top + scrollY, r: r.right + scrollX, b: r.bottom + scrollY };
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
    const seats = new Map<HTMLElement, { lx: number; ly: number; x: Q; y: Q }>();
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
            if (place) for (const p of ["inset", "inset-inline-start", "left", "top", "width", "height"]) enter.style.removeProperty(p);
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
        f.el.style.removeProperty("opacity");
        f.el.style.removeProperty("translate");
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
            const sx = flip ? -side : side;
            t.x.d = t.cx + t.x.d + (sx * t.w) / 2 - (lcx + (sx * nw) / 2);
            t.y.d = t.cy + t.y.d + (side * t.h) / 2 - (lcy + (side * nh) / 2);
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
        for (const child of run.children) {
            if (!(child instanceof HTMLElement) || child.offsetParent === null) continue;
            seen.add(child);
            const lx = child.offsetLeft;
            const ly = child.offsetTop;
            const t = seats.get(child);
            if (!t) {
                seats.set(child, { lx, ly, x: { d: 0, v: 0 }, y: { d: 0, v: 0 } });
                ro?.observe(child);
                continue;
            }
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

    function sync(reason: string): void {
        const el = root();
        if (!el || !el.isConnected) return;
        const reduce = o.reducedMotion();
        const prevPainted = painted();
        const next = rectOf(el);
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
            return;
        }

        if (changed || postureChanged || pendingLeaves.length || seatsMoved) {
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
            placeLeaves();
            // R-3: a face returned to is carried from where it painted to its place in the
            // new layout: painted minus what the layout and its region's carry would paint,
            // with the velocity that keeps it still against that carry.
            for (const f of faces) {
                if (!f.ret) continue;
                const g = regions.get(f.home ?? "layers");
                const r = rectOf(f.el);
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
            const r = runEl();
            if (r && o.runScroll) {
                if (postureChanged && posture) {
                    const to = o.runScroll.resting(savedScroll ?? readScroll(r));
                    scrollQ.d = scrollQ.v = 0;
                    scrollRest = null;
                    if (to !== null) writeScroll(r, to);
                } else if (posture && seatsMoved) {
                    const from = scrollRest !== null ? scrollRest + scrollQ.d : readScroll(r);
                    o.runScroll.halt();
                    const to = o.runScroll.resting(from);
                    if (to !== null && (scrollRest !== null || Math.abs(from - to) > 0.01)) {
                        scrollQ.d = from - to;
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
            el.setAttribute("data-morphing", "");
            o.moving.value = true;
            start(reason === "ro");
        }
    }

    function placeLeaves(): void {
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
            const x = p.rect.l - cbl - g.x.d - (Number.parseFloat(ms.marginLeft) || 0);
            const y = p.rect.t - cbt - g.y.d - (Number.parseFloat(ms.marginTop) || 0);
            el.style.inset = "auto";
            el.style.insetInlineStart = "auto";
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.style.width = `${p.rect.r - p.rect.l}px`;
            el.style.height = `${p.rect.b - p.rect.t}px`;
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
        if (postureTravel || held !== null) return restR[0] + (restR[1] - restR[0]) * clamp01(e);
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
        if (held !== null) e = held;
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
        const clipTo = (t: RegionTrack, box: Box, r: number) => {
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
            t.el.style.clipPath = `inset(${ci.t}px ${ci.r}px ${ci.b}px ${ci.l}px round ${r}px)`;
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
        const rr = runEl();
        if (rr && scrollRest !== null) writeScroll(rr, scrollRest + scrollQ.d);
        for (const [el, t] of seats) {
            if (t.x.d !== 0 || t.y.d !== 0) el.style.translate = `${t.x.d.toFixed(3)}px ${t.y.d.toFixed(3)}px`;
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
        // Content (R-3, RU-2): one window, w(x) = clamp(1 − x / 0.7). For a posture change
        // the summary reads w(e) and the run w(1 − e); for a content change the leaving
        // face reads w(f) and the entering face w(1 − f). Under reduced motion (R-11) the
        // coordinate is a linear 100 ms clock and each face fades across the whole of it.
        const reduce = o.reducedMotion();
        const win = reduce ? (x: number) => clamp01(1 - x) : w;
        const posing = postureTravel || held !== null;
        for (const face of faces) {
            let op: number;
            if (face.el === openFace && posing) op = win(1 - e);
            else if (face.el === closedFace && posing) op = win(e);
            else if (face.role === "leave") op = face.from * win(f);
            else {
                // The entering window; an early face reads the same window from the start
                // of the exchange (1 at f = 0.7) instead of from 0.3 on.
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

    function hold(pose: number | null): void {
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
            mo = new MutationObserver(() => sync("content"));
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

    function postureFaces(open: HTMLElement | null | undefined, closed: HTMLElement | null | undefined): void {
        openFace = open ?? null;
        closedFace = closed ?? null;
    }

    const body: DockBody = { postureFaces, exchange, sync, onSettle, hold, moving: o.moving };
    provide(DOCK_BODY_KEY, body);
    return body;
}
