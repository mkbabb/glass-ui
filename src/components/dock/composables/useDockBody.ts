/**
 * W-I.8 prototype: the dock's one carrier (R-1), its content windows (R-3) and the
 * fission seat's quantities (R-6). One requestAnimationFrame loop per dock steps every
 * moving quantity on `springPreset("dock")` and writes; it parks on the frame its last
 * quantity lands and leaves nothing scheduled or written at rest.
 *
 * The model, in document px:
 *   - the row's painted box (the plate, or the plate plus the fission seat): four edges,
 *     each a delta from its layout edge, carried to 0 with its velocity;
 *   - each region (persistent, layers, persistent-end, beside): a centre delta;
 *   - the content windows: one unit spring `f` per travel, from the painted opacities.
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
const OUT_END = 0.35;
const IN_END = 0.7;

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
}
interface PendingLeave {
    el: HTMLElement;
    region: string;
    rect: Box;
    regionCx: number;
    regionCy: number;
}

export type NeckDesign = "a" | "b";

export interface DockBody {
    /** Names the open face, the collapsed face and the fission seat for a posture travel:
     * their opacities are functions of the posture coordinate, never of a second clock. */
    postureFaces(open: HTMLElement | null | undefined, closed: HTMLElement | null | undefined, seat?: HTMLElement | null): void;
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
    beside?: Ref<HTMLElement | null>;
    besidePlate?: Ref<HTMLElement | null>;
    neck?: Ref<HTMLElement | null>;
    neckDesign: () => NeckDesign;
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
    let seatFace: HTMLElement | null = null;
    let held: number | null = null;
    // Fission geometry (measured at sync).
    let besideW = 0;
    let besideGap = 0;
    let besideLayoutR = 0;
    let besideLayoutCy = 0;
    let besideTrack: RegionTrack | null = null;
    // Loop state.
    let raf: number | null = null;
    let last: number | null = null;
    let inFlow = false;
    let wroteMargin = false;
    const settleCbs: Array<() => void> = [];
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
            next.push({ el: enter, from, role: "enter", placed: true });
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
            const paintedCx = t.cx + t.x.d;
            const paintedCy = t.cy + t.y.d;
            t.x.d = paintedCx - lcx;
            t.y.d = paintedCy - lcy;
            t.cx = lcx;
            t.cy = lcy;
            t.w = r.r - r.l;
            t.h = r.b - r.t;
        }
        for (const k of [...regions.keys()]) if (!seen.has(k)) regions.delete(k);
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

        if (!layout) {
            layout = next;
            rFrom = rTo = rNext;
            readRegions();
            readBeside();
            e = posture ? 1 : 0;
            writeExpandT();
            return;
        }

        if (changed || postureChanged || pendingLeaves.length) {
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
            readBeside();
            placeLeaves();
            if (reduce) {
                eq.v = 0;
                for (const q of Object.values(edge)) (q.d = 0), (q.v = 0);
                for (const t of regions.values()) (t.x.d = t.y.d = t.x.v = t.y.v = 0);
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

    function readBeside(): void {
        const b = o.beside?.value;
        if (!b || !b.isConnected) {
            besideTrack = null;
            return;
        }
        const cs = getComputedStyle(b);
        const padS = Number.parseFloat(cs.paddingInlineStart) || 0;
        const padE = Number.parseFloat(cs.paddingInlineEnd) || 0;
        besideGap = Math.max(0, padS - padE);
        const r = rectOf(b);
        const tx = besideTrack?.tx ?? 0;
        besideW = r.r - r.l - besideGap;
        besideLayoutR = r.r - tx;
        besideLayoutCy = (r.t + r.b) / 2 - (besideTrack?.ty ?? 0);
        besideTrack ??= { el: b, key: "beside", cx: 0, cy: 0, w: 0, h: 0, x: { d: 0, v: 0 }, y: { d: 0, v: 0 }, tx: 0, ty: 0, clipped: false };
        besideTrack.el = b;
        besideTrack.w = r.r - r.l;
        besideTrack.h = r.b - r.t;
        besideTrack.cx = besideLayoutR - besideTrack.w / 2;
        besideTrack.cy = besideLayoutCy;
        ro?.observe(b);
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
            const cbl = cbr.l - g.tx;
            const cbt = cbr.t - g.ty;
            const x = p.rect.l - p.regionCx + g.cx - cbl;
            const y = p.rect.t - p.regionCy + g.cy - cbt;
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
            for (const t of regions.values()) {
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
        const scope = el.parentElement?.closest<HTMLElement>("[data-dock-scope]");
        scope?.style.setProperty("--dock-expand-t", v);
    }

    function fission(P: Box): { p: number; main: Box; seat: Box | null; neck: Box | null } {
        const H = P.b - P.t;
        // C-4: p = s(clamp((e − a) / (1 − a))), s(x) = 3x² − 2x³: no slope at either end.
        const a = Number.parseFloat(root()?.getAttribute("data-fission-a") ?? "") || 0.25;
        const x = clamp01((e - a) / (1 - a));
        const p = besideTrack ? x * x * (3 - 2 * x) : 0;
        if (!besideTrack || p <= 0) return { p: 0, main: P, seat: null, neck: null };
        const seat = { l: P.r - besideW, t: P.t, r: P.r, b: P.b };
        const mainR = seat.l - besideGap * p;
        const main = { l: P.l, t: P.t, r: mainR, b: P.b };
        const cy = (P.t + P.b) / 2;
        const half = (H * (1 - p)) / 2;
        const neck = { l: mainR, t: cy - half, r: seat.l, b: cy + half };
        return { p, main, seat, neck };
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
        const fis = fission(P);
        const design = o.neckDesign();
        const neckEl = o.neck?.value;
        const seatPlate = o.besidePlate?.value;
        const inset = (b: Box) =>
            `${b.t - layout!.t}px ${layout!.r - b.r}px ${layout!.b - b.b}px ${b.l - layout!.l}px`;

        if (!besideTrack || fis.p <= 0) {
            plate.style.inset = inset(P);
            plate.style.borderRadius = `${R}px`;
            plate.style.removeProperty("clip-path");
            if (seatPlate) seatPlate.style.display = "none";
            if (neckEl) neckEl.style.display = "none";
        } else if (design === "a") {
            const rp = R * fis.p;
            plate.style.inset = inset(fis.main);
            plate.style.borderRadius = `${R}px ${rp}px ${rp}px ${R}px`;
            plate.style.removeProperty("clip-path");
            if (seatPlate && fis.seat) {
                seatPlate.style.display = "";
                seatPlate.style.inset = inset(fis.seat);
                seatPlate.style.borderRadius = `${rp}px ${R}px ${R}px ${rp}px`;
            }
            if (neckEl && fis.neck) {
                const nw = fis.neck.r - fis.neck.l;
                if (nw > 0.05 && fis.neck.b - fis.neck.t > 0.05) {
                    neckEl.style.display = "";
                    neckEl.style.inset = inset(fis.neck);
                } else neckEl.style.display = "none";
            }
        } else {
            // B: one leaf over the row, cut to two capsules and a waist.
            plate.style.inset = inset(P);
            plate.style.borderRadius = `${R}px`;
            if (seatPlate) seatPlate.style.display = "none";
            if (neckEl) neckEl.style.display = "none";
            plate.style.clipPath = waistPath(P, fis);
        }

        // Regions ride the plate, clipped to its painted box while travel runs.
        const clipTo = (t: RegionTrack, box: Box, r: number) => {
            const left = t.cx - t.w / 2 + t.tx;
            const top = t.cy - t.h / 2 + t.ty;
            const ci = {
                t: Math.max(0, box.t - top),
                l: Math.max(0, box.l - left),
                r: Math.max(0, left + t.w - box.r),
                b: Math.max(0, top + t.h - box.b),
            };
            t.el.style.clipPath = `inset(${ci.t}px ${ci.r}px ${ci.b}px ${ci.l}px round ${r}px)`;
            t.clipped = true;
        };
        for (const t of regions.values()) {
            t.tx = t.x.d;
            t.ty = t.y.d;
            t.el.style.translate = `${t.tx}px ${t.ty}px`;
            clipTo(t, fis.main, Math.min(R, H / 2));
        }
        if (besideTrack) {
            const b = besideTrack;
            b.tx = P.r - besideLayoutR;
            b.ty = (P.t + P.b) / 2 - besideLayoutCy;
            b.el.style.translate = `${b.tx}px ${b.ty}px`;
            clipTo(b, fis.p > 0 && fis.seat ? { ...fis.seat, l: fis.seat.l - besideGap } : P, Math.min(R, H / 2));
        }

        // Content windows (R-3).
        for (const face of faces) {
            const op =
                face.el === openFace && (postureTravel || held !== null)
                    ? clamp01((e - OUT_END) / (IN_END - OUT_END))
                    : face.el === closedFace && (postureTravel || held !== null)
                      ? clamp01(1 - e / OUT_END)
                      : face.el === seatFace && (postureTravel || held !== null)
                        ? fis.p
                        : face.role === "leave"
                    ? face.from * clamp01(1 - f / OUT_END)
                    : face.from + (1 - face.from) * clamp01((f - OUT_END) / (IN_END - OUT_END));
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

    function waistPath(P: Box, fis: ReturnType<typeof fission>): string {
        const W = P.r - P.l;
        const H = P.b - P.t;
        const r = H / 2;
        if (!fis.seat) return "none";
        const mW = fis.main.r - P.l;
        const sL = fis.seat.l - P.l;
        const p = fis.p;
        const cap = (x0: number, x1: number) =>
            `M ${x0 + r} 0 H ${x1 - r} A ${r} ${r} 0 0 1 ${x1 - r} ${H} H ${x0 + r} A ${r} ${r} 0 0 1 ${x0 + r} 0 Z`;
        if (p >= 0.999) return `path('${cap(0, mW)} ${cap(sL, W)}')`;
        const rp = r * p;
        const half = (H * (1 - p)) / 2;
        const mid = (mW + sL) / 2;
        const top = H / 2 - half;
        const bot = H / 2 + half;
        // Top: left cap, along the top, into the waist by a curve tangent to the top edge
        // and to the waist's centre line, out the same way, then the seat's right cap.
        const d = [
            `M ${r} 0`,
            `H ${mW - rp}`,
            `C ${mW} 0 ${mW} ${top} ${mid} ${top}`,
            `C ${sL} ${top} ${sL} 0 ${sL + rp} 0`,
            `H ${W - r}`,
            `A ${r} ${r} 0 0 1 ${W - r} ${H}`,
            `H ${sL + rp}`,
            `C ${sL} ${H} ${sL} ${bot} ${mid} ${bot}`,
            `C ${mW} ${bot} ${mW} ${H} ${mW - rp} ${H}`,
            `H ${r}`,
            `A ${r} ${r} 0 0 1 ${r} 0`,
            "Z",
        ].join(" ");
        return `path('${d}')`;
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
        if (plate) {
            const keepFission = !!besideTrack && lastPosture;
            if (keepFission) {
                // The open fission rest: the landed geometry stays written once.
                write();
            } else {
                plate.style.removeProperty("inset");
                plate.style.removeProperty("border-radius");
                plate.style.removeProperty("clip-path");
                o.besidePlate?.value?.style.setProperty("display", "none");
                o.neck?.value?.style.setProperty("display", "none");
            }
        }
        for (const t of regions.values()) {
            t.el.style.removeProperty("translate");
            t.el.style.removeProperty("clip-path");
            t.tx = t.ty = 0;
            t.clipped = false;
        }
        if (besideTrack) {
            besideTrack.el.style.removeProperty("translate");
            besideTrack.el.style.removeProperty("clip-path");
            besideTrack.tx = besideTrack.ty = 0;
        }
        for (const face of faces) {
            face.el.style.removeProperty("opacity");
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
        if (o.beside?.value) ro.observe(o.beside.value);
    });
    onBeforeUnmount(() => {
        ro?.disconnect();
        if (raf !== null) cancelAnimationFrame(raf);
    });

    function postureFaces(open: HTMLElement | null | undefined, closed: HTMLElement | null | undefined, seat?: HTMLElement | null): void {
        openFace = open ?? null;
        closedFace = closed ?? null;
        seatFace = seat ?? null;
    }

    const body: DockBody = { postureFaces, exchange, sync, onSettle, hold, moving: o.moving };
    provide(DOCK_BODY_KEY, body);
    return body;
}
