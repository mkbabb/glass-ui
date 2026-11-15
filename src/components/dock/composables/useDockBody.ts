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
/** R-3's one window: 1 at 0, 0 from 0.55 on (RU-2). */
const W_END = 0.55;
const w = (x: number) => (x <= 0 ? 1 : x >= W_END ? 0 : 1 - x / W_END);
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
    moving: Ref<boolean>;
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
    let capsule = true;
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

    const root = () => o.root.value;

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
        return pxOf(cs.borderTopLeftRadius, Math.min(w, h));
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
            if (inline !== "") return Number.parseFloat(inline);
            return Number.parseFloat(getComputedStyle(el).opacity);
        };
        const next: FaceTrack[] = [];
        // Every face still showing leaves from its painted opacity (R-5).
        const group = (enter ?? leave)?.parentElement ?? null;
        for (const f of faces) {
            if (f.el === enter) continue;
            const op = opOf(f.el);
            if (f.el.parentElement !== group) {
                // Another group's faces keep their direction from where they paint.
                next.push({ el: f.el, from: op, role: f.role, placed: f.placed });
                continue;
            }
            if (op > 0.001) next.push({ el: f.el, from: op, role: "leave", placed: f.placed });
            else f.el.style.removeProperty("opacity");
        }
        if (leave && !next.some((f) => f.el === leave)) next.push({ el: leave, from: opOf(leave), role: "leave", placed: false });
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
            next.push({ el: enter, from, role: "enter", placed: true, dir });
            enter.style.opacity = String(from);
        }
        for (const f of next) if (f.role === "leave") f.el.style.opacity = String(f.from);
        faces = next;
        u = 1;
        uv = 0;
        travelling = true;
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
                const lcx = (r.l + r.r) / 2;
                const lcy = (r.t + r.b) / 2;
                t.cx = lcx;
                t.cy = lcy;
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
            t.x.d = t.cx + t.x.d + (side * t.w) / 2 - (lcx + (side * nw) / 2);
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
                capsule =
                    rFrom >= Math.min(pw, ph) / 2 - 0.75 && rNext >= Math.min(w, h) / 2 - 0.75;
                layout = next;
            }
            if (postureChanged) {
                // Painted minus target, with the velocity it had (a return turns it).
                eq.d = e - (posture ? 1 : 0);
                postureTravel = true;
            }
            readRegions();
            placeLeaves();
            if (reduce) {
                eq.v = 0;
                for (const q of Object.values(edge)) (q.d = 0), (q.v = 0);
                for (const t of regions.values()) (t.x.d = t.y.d = t.x.v = t.y.v = 0);
                for (const t of seats.values()) (t.x.d = t.y.d = t.x.v = t.y.v = 0);
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
            if (ft) ft.placed = true;
        }
    }

    function currentRadius(pw: number, ph: number): number {
        if (capsule) return Math.min(pw, ph) / 2;
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
        if (raf === null) {
            scopeEl = undefined;
            last = inFrame ? (document.timeline.currentTime as number | null) : null;
            write();
            raf = requestAnimationFrame(frame);
        }
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
                if (Math.abs(q.d) < 0.1 && Math.abs(q.v) < 6) (q.d = 0), (q.v = 0);
            }
            for (const t of [...regions.values(), ...seats.values()]) {
                [t.x.d, t.x.v] = step(t.x.d, t.x.v, dt);
                [t.y.d, t.y.v] = step(t.y.d, t.y.v, dt);
                if (Math.abs(t.x.d) < 0.1 && Math.abs(t.x.v) < 6) (t.x.d = 0), (t.x.v = 0);
                if (Math.abs(t.y.d) < 0.1 && Math.abs(t.y.v) < 6) (t.y.d = 0), (t.y.v = 0);
            }
            if (reduce) {
                // R-11: the coordinate runs as a linear clock, whole at 100 ms.
                eq.d = Math.sign(eq.d) * Math.max(0, Math.abs(eq.d) - dt / 0.1);
                u = Math.max(0, u - dt / 0.1);
                uv = 0;
            } else {
                [eq.d, eq.v] = step(eq.d, eq.v, dt);
                if (Math.abs(eq.d) < 0.0005 && Math.abs(eq.v) < 0.01) (eq.d = 0), (eq.v = 0);
                [u, uv] = step(u, uv, dt);
                if (u < 0) u = 0;
                if (Math.abs(u) < 0.002 && Math.abs(uv) < 0.05) (u = 0), (uv = 0);
            }
        }
        for (const q of Object.values(edge)) if (q.d !== 0) live = true;
        for (const t of regions.values()) if (t.x.d !== 0 || t.y.d !== 0) live = true;
        for (const t of seats.values()) if (t.x.d !== 0 || t.y.d !== 0) live = true;
        if (u !== 0) live = true;
        if (eq.d !== 0) live = true;
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
        if (postureTravel) el.style.setProperty("--dock-morph-t", f.toFixed(4));

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
            .filter((t): t is RegionTrack => !!t && t.w > 0.5 && t.h > 0.5);
        // R-5: each seat whose place changed rides its own translate to 0.
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
        const boundary = (a: RegionTrack, b: RegionTrack): number =>
            b.key === "persistent-end"
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
        const posing = postureTravel || held !== null;
        for (const face of faces) {
            let op: number;
            if (face.el === openFace && posing) op = win(1 - e);
            else if (face.el === closedFace && posing) op = win(e);
            else if (face.role === "leave") op = face.from * win(f);
            else {
                const inW = win(1 - f);
                op = face.from + (1 - face.from) * inW;
                // RU-11: the entering face arrives over 8 px from the side it lives on.
                if (face.dir && !reduce) {
                    const off = face.dir * ENTER_PX * (1 - inW);
                    face.el.style.translate = o.vertical() ? `0 ${off.toFixed(3)}px` : `${off.toFixed(3)}px 0`;
                }
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
        for (const t of regions.values()) {
            t.el.style.removeProperty("translate");
            t.el.style.removeProperty("clip-path");
            t.tx = t.ty = 0;
            t.clipped = false;
        }
        for (const face of faces) {
            face.el.style.removeProperty("opacity");
            face.el.style.removeProperty("translate");
            if (face.placed || face.role === "leave") for (const p of ["inset", "inset-inline-start", "left", "top", "width", "height"]) face.el.style.removeProperty(p);
        }
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

    onMounted(() => {
        sync("mount");
        if (typeof ResizeObserver === "undefined") return;
        ro = new ResizeObserver(() => sync("ro"));
        const el = root();
        if (el) ro.observe(el);
        for (const { el: r } of o.regions()) if (r) ro.observe(r);
        for (const seat of seats.keys()) ro.observe(seat);
    });
    onBeforeUnmount(() => {
        ro?.disconnect();
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
