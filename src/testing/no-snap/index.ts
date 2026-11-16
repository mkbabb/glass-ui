// The no-snap check (W-B.17 R-13): run one state change, sample every running animation
// by pausing and seeking it, and judge the samples against the law (motion-canon P0).
//
// It imports nothing from any test runner. It takes any page object with an
// `evaluate(fn, arg)` method (a Playwright page, a Puppeteer page, a CDP wrapper).

export interface PageLike {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    evaluate(fn: (arg: any) => unknown, arg?: unknown): Promise<any>;
}

export interface Change {
    /** Hover, click, key, a store write. */
    trigger: () => Promise<void>;
    /** Selectors to read; `sel::before` reads the pseudo-element. */
    targets: string[];
    /** Default: the box, opacity, scale, translate, rotate, clip-path, colours,
     *  radius, stroke-dashoffset. */
    properties?: string[];
    /** Selectors whose box must not change at any sample (neighbours). */
    still?: string[];
    /** ms between samples; default 1000 / 60. */
    step?: number;
}

export type Reading = { present: boolean; values: Record<string, string> };
export interface Frame {
    t: number;
    phase: number;
    read: Record<string, Reading>;
    /** Eased progress of each sampled animation, by index into `animations`. */
    progress: (number | null)[];
}
export interface AnimationMeta {
    target: string;
    /** The `targets` selectors this animation's element (and pseudo-element) is. */
    matches: string[];
    properties: string[];
    duration: number;
    delay: number;
    easing: string;
    kind: string;
    phase: number;
    infinite: boolean;
}
export interface Samples {
    rest: Record<string, Reading>;
    end: Record<string, Reading>;
    frames: Frame[];
    animations: AnimationMeta[];
    stillRects: Record<string, string[]>;
    properties: string[];
    step: number;
    /** What the sampler had to work around in this engine. */
    notes?: string[];
}

export interface Finding {
    clause: "cut" | "first" | "last" | "step" | "removed" | "neighbour";
    target: string;
    property: string;
    detail: string;
}
export interface LegReading {
    target: string;
    property: string;
    travel: number;
    maxStep: number;
    easedMaxStep: number | null;
    ratio: number | null;
}
export interface Verdict {
    pass: boolean;
    findings: Finding[];
    legs: LegReading[];
}

export const DEFAULT_PROPERTIES = [
    "box",
    "opacity",
    "scale",
    "translate",
    "rotate",
    "transform",
    "clip-path",
    "color",
    "background-color",
    "outline-color",
    "border-top-left-radius",
    "stroke-dashoffset",
];

/* ── In-page functions. Self-contained: they are serialized into the page. ── */

function pageRead(arg: { targets: string[]; properties: string[] }) {
    const out: Record<string, { present: boolean; values: Record<string, string> }> = {};
    for (const sel of arg.targets) {
        const m = sel.match(/^(.*?)(::(?:before|after))?$/);
        const el = document.querySelector(m![1]);
        if (!el) {
            out[sel] = { present: false, values: {} };
            continue;
        }
        const cs = getComputedStyle(el, m![2] ?? null);
        const values: Record<string, string> = {};
        for (const p of arg.properties) {
            if (p === "box") {
                const r = (el as HTMLElement).getBoundingClientRect();
                values.box = `${r.x} ${r.y} ${r.width} ${r.height}`;
            } else values[p] = cs.getPropertyValue(p);
        }
        out[sel] = { present: el.isConnected, values };
    }
    return out;
}

async function pageCollect(arg: { phase: number; frames: number; targets: string[] }) {
    const w = window as unknown as { __noSnap?: { all: Set<Animation>; list: Animation[] } };
    const raf = () => new Promise((r) => requestAnimationFrame(() => r(null)));
    const state = (w.__noSnap ??= { all: new Set(), list: [] });
    let fresh: Animation[] = [];
    for (let i = 0; i < arg.frames && fresh.length === 0; i++) {
        await raf();
        fresh = document
            .getAnimations()
            .filter((a) => !state.all.has(a) && a.playState !== "finished" && a.playState !== "idle");
    }
    // One more frame for siblings that start a frame later (Vue's enter-to swap).
    if (fresh.length) {
        await raf();
        fresh = document
            .getAnimations()
            .filter((a) => !state.all.has(a) && a.playState !== "finished" && a.playState !== "idle");
    }
    const describe = (a: Animation) => {
        const e = a.effect as KeyframeEffect;
        const t = e?.target as Element | null;
        const matches = arg.targets.filter((sel) => {
            const m = sel.match(/^(.*?)(::(?:before|after))?$/)!;
            return document.querySelector(m[1]) === t && (e.pseudoElement ?? null) === (m[2] ?? null);
        });
        const name = t
            ? `${t.tagName.toLowerCase()}${t.id ? "#" + t.id : ""}${e.pseudoElement ?? ""}`
            : "?";
        let props: string[] = [];
        if ((a as CSSTransition).transitionProperty) props = [(a as CSSTransition).transitionProperty];
        else
            props = [
                ...new Set(
                    (e?.getKeyframes() ?? []).flatMap((k) =>
                        Object.keys(k).filter(
                            (p) => !["offset", "computedOffset", "easing", "composite"].includes(p),
                        ),
                    ),
                ),
            ].map((p) => p.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()));
        const tm = e?.getTiming() ?? {};
        return {
            target: name,
            matches,
            properties: props,
            duration: Number(tm.duration) || 0,
            delay: Number(tm.delay) || 0,
            easing: String(tm.easing ?? ""),
            kind: a.constructor.name,
            phase: arg.phase,
            infinite: tm.iterations === Infinity,
        };
    };
    // A probe per animation carries the same timing (effect easing and the first
    // keyframe's easing) on a 0-to-1 opacity, so its value IS the leg's eased progress.
    const probes = fresh.map((a): Animation | null => {
        const e = a.effect as KeyframeEffect;
        const kf = e.getKeyframes();
        const div = document.createElement("div");
        div.setAttribute("data-no-snap-probe", "");
        div.style.cssText = "position:fixed;inset:0 auto auto 0;inline-size:1px;block-size:1px;visibility:hidden;pointer-events:none";
        document.body.append(div);
        const tm = e.getTiming();
        const note = (m: string) => {
            const st = state as unknown as { notes?: string[] };
            st.notes = [...(st.notes ?? []), m];
        };
        const attempts: [Keyframe[], KeyframeAnimationOptions][] = [
            [[{ opacity: 0, easing: kf[0]?.easing ?? "linear" }, { opacity: 1 }], { duration: tm.duration as number, delay: tm.delay, easing: tm.easing, iterations: tm.iterations, direction: tm.direction, fill: "both" }],
            [[{ opacity: 0 }, { opacity: 1 }], { duration: Number(tm.duration) || 1, easing: tm.easing, fill: "both" }],
        ];
        let p: Animation | null = null;
        for (const [k, o] of attempts) {
            try {
                p = div.animate(k, o);
                break;
            } catch (err) {
                note(`probe refused: ${String(err)}; keyframe easing ${JSON.stringify(kf[0]?.easing)}, timing ${JSON.stringify({ d: tm.duration, e: tm.easing, i: String(tm.iterations), dir: tm.direction })}`);
            }
        }
        if (!p) return null;
        p.pause();
        state.all.add(p);
        return p;
    });
    const metas = fresh.map(describe);
    for (const a of fresh) {
        a.pause();
        state.all.add(a);
        state.list.push(a);
    }
    (state as unknown as { probes: (Animation | null)[] }).probes = [
        ...((state as unknown as { probes?: (Animation | null)[] }).probes ?? []),
        ...probes,
    ];
    return { count: fresh.length, metas, base: state.list.length - fresh.length, notes: (state as unknown as { notes?: string[] }).notes ?? [] };
}

function pageSeek(arg: { t: number; base: number; targets: string[]; properties: string[] }) {
    const w = window as unknown as { __noSnap: { list: Animation[] } };
    const list = w.__noSnap.list;
    for (let i = arg.base; i < list.length; i++) {
        const a = list[i];
        const tm = (a.effect as KeyframeEffect).getComputedTiming();
        const end = Number(tm.endTime);
        // Just inside the end: an unfilled animation's last frame, not its after phase.
        if (a.playState === "idle") continue; // cancelled under the sampler (a transition an animation replaced)
        a.currentTime = Number.isFinite(end) ? Math.min(arg.t, end - 0.01) : arg.t;
    }
    const probes = (w.__noSnap as unknown as { probes: (Animation | null)[] }).probes;
    for (let i = arg.base; i < list.length; i++) if (probes[i] && list[i].currentTime !== null) probes[i]!.currentTime = list[i].currentTime;
    const progress = list.map((_, i) =>
        i < arg.base || !probes[i] ? null : Number(getComputedStyle((probes[i]!.effect as KeyframeEffect).target!).opacity),
    );
    return { progress };
}

async function pageFinish(arg: { base: number }) {
    const w = window as unknown as { __noSnap: { list: Animation[] } };
    const list = w.__noSnap.list;
    for (let i = arg.base; i < list.length; i++) {
        const a = list[i];
        const tm = (a.effect as KeyframeEffect).getTiming();
        if (tm.iterations === Infinity) a.play();
        else a.finish();
    }
}

async function pageSettle() {
    const raf = () => new Promise((r) => requestAnimationFrame(() => r(null)));
    for (let i = 0; i < 60; i++) {
        const live = document
            .getAnimations()
            .filter((a) => a.playState === "running" && (a.effect as KeyframeEffect).getTiming().iterations !== Infinity);
        if (!live.length) break;
        await Promise.all(live.map((a) => a.finished.catch(() => null)));
    }
    await raf();
    await raf();
    for (const d of document.querySelectorAll("[data-no-snap-probe]")) d.remove();
    delete (window as unknown as { __noSnap?: unknown }).__noSnap;
}

/** Run one state change and sample it. */
export async function sampleChange(page: PageLike, change: Change): Promise<Samples> {
    const properties = change.properties ?? DEFAULT_PROPERTIES;
    const step = change.step ?? 1000 / 60;
    const targets = change.targets;
    const still = change.still ?? [];
    const readArg = { targets, properties };
    const stillArg = { targets: still, properties: ["box"] };
    const stillRects: Record<string, string[]> = {};
    const noteStill = async () => {
        if (!still.length) return;
        const r = await page.evaluate(pageRead, stillArg);
        for (const s of still) (stillRects[s] ??= []).push(r[s]?.values.box ?? "absent");
    };

    await page.evaluate(() => {
        delete (window as unknown as { __noSnap?: unknown }).__noSnap;
        (window as unknown as { __noSnap: unknown }).__noSnap = {
            all: new Set(document.getAnimations()),
            list: [],
        };
    });
    const rest = await page.evaluate(pageRead, readArg);
    await noteStill();
    await change.trigger();

    const frames: Frame[] = [];
    const animations: AnimationMeta[] = [];
    const notes: string[] = [];
    let offset = 0;
    for (let phase = 0; phase < 4; phase++) {
        const got = await page.evaluate(pageCollect, { phase, frames: phase === 0 ? 4 : 12, targets });
        if (!got.count) break;
        animations.push(...got.metas);
        if (got.notes?.length) notes.push(...got.notes);
        const finite = got.metas.filter((m: AnimationMeta) => !m.infinite);
        const span = finite.length
            ? Math.max(...finite.map((m: AnimationMeta) => m.delay + m.duration))
            : 1000;
        const n = Math.ceil(span / step);
        for (let k = 0; k <= n; k++) {
            const t = Math.min(k * step, span);
            const { progress } = await page.evaluate(pageSeek, { t, base: got.base, ...readArg });
            const read = await page.evaluate(pageRead, readArg);
            await noteStill();
            frames.push({ t: offset + t, phase, read, progress });
        }
        offset += span;
        await page.evaluate(pageFinish, { base: got.base });
        if (!finite.length) break;
    }
    await page.evaluate(pageSettle);
    const end = await page.evaluate(pageRead, readArg);
    await noteStill();
    return { rest, end, frames, animations, stillRects, properties, step, notes };
}

/* ── Judging ── */

const COLOR = /color/;
function parse(prop: string, s: string | undefined): number[] {
    if (s === undefined) return [];
    const v = s.trim();
    if (prop === "scale" && (v === "none" || v === "")) return [1, 1];
    if (prop === "translate" && (v === "none" || v === "")) return [0, 0];
    if (prop === "rotate" && (v === "none" || v === "")) return [0];
    if (prop === "clip-path" && v === "none") return [];
    if (prop === "transform" && (v === "none" || v === "")) return [1, 0, 0, 1, 0, 0];
    const nums = (v.match(/-?\d*\.?\d+(?:e-?\d+)?/gi) ?? []).map(Number);
    if (prop === "scale" && nums.length === 1) return [nums[0], nums[0]];
    if (prop === "translate" && nums.length === 1) return [nums[0], 0];
    if (prop === "box") return nums.slice(2, 4).concat(nums.slice(0, 2));
    // A colour is compared premultiplied, in whatever space the engine serialized it:
    // a fade from transparent is a fade, whatever the channels say at alpha 0.
    if (COLOR.test(prop) && nums.length >= 3) {
        const alpha = nums.length >= 4 ? nums[nums.length - 1] : 1;
        const ch = nums.slice(0, 3);
        const unit = ch.some((x) => Math.abs(x) > 1) ? 255 : 1;
        return [...ch.map((x) => (x / unit) * alpha), alpha];
    }
    return nums;
}
function dist(a: number[], b: number[]): number {
    if (a.length !== b.length) return Infinity;
    return Math.sqrt(a.reduce((s, x, i) => s + (x - b[i]) ** 2, 0));
}
function tol(prop: string, sample: number[]): number {
    if (prop === "opacity") return 0.01;
    if (prop === "scale" || prop === "transform") return 0.002;
    if (COLOR.test(prop)) return 0.005;
    return 0.5;
}
const reading = (r: Reading | undefined, prop: string): number[] =>
    !r || !r.present ? (prop === "opacity" ? [0] : []) : parse(prop, r.values[prop]);

const PROP_ALIASES: Record<string, string[]> = {
    box: ["inline-size", "block-size", "width", "height", "translate", "transform", "scale", "rotate", "all"],
    "border-top-left-radius": ["border-radius", "border-top-left-radius", "all"],
    "background-color": ["background-color", "background", "all"],
};
const SIZE = ["inline-size", "block-size", "width", "height"];
function covers(meta: AnimationMeta, target: string, prop: string): boolean {
    // A box moved by a size tween anywhere in the change is that tween's (follow).
    if (prop === "box" && meta.properties.some((p) => SIZE.includes(p))) return true;
    if (!meta.matches.includes(target)) return false;
    const names = PROP_ALIASES[prop] ?? [prop, "all"];
    return meta.properties.some((p) => names.includes(p) || p === prop);
}

const invisible = (r: Reading | undefined): boolean =>
    !r || !r.present || r.values.visibility === "hidden" || (r.values.opacity !== undefined && Number(r.values.opacity) <= 0.01);

/** Judge the samples against the law. */
export function judgeChange(samples: Samples, bound: { slack?: number } = {}): Verdict {
    const slack = bound.slack ?? 1.15;
    const findings: Finding[] = [];
    const legs: LegReading[] = [];
    const { rest, end, frames, animations, properties } = samples;
    const sizeTween = animations.some((m) => m.properties.some((p) => SIZE.includes(p)));

    for (const target of Object.keys(rest)) {
        const mine = animations.filter((m) => m.matches.includes(target));
        // The removed clause: a node is in the document at every sample of every phase
        // in which it animates.
        if (mine.length) {
            const lastPhase = Math.max(...mine.map((m) => m.phase));
            const gone = frames.findIndex((f) => f.phase <= lastPhase && !f.read[target]?.present);
            const firstOwn = frames.findIndex((f) => mine.some((m) => m.phase === f.phase));
            if (gone !== -1 && gone >= firstOwn)
                findings.push({ clause: "removed", target, property: "-", detail: `absent at sample ${gone}, inside its own phase` });
        }
        const presentBoth = !!rest[target]?.present && !!end[target]?.present;
        for (const prop of properties) {
            // A node that arrives or leaves is judged on its opacity alone at the end it is absent.
            if (!presentBoth && prop !== "opacity") {
                if (!rest[target]?.present && !end[target]?.present) continue;
            }
            const r = reading(rest[target], prop);
            const e = reading(end[target], prop);
            const comparable = presentBoth || prop === "opacity";
            const t0 = tol(prop, r.length ? r : e);
            const changed = comparable && (r.length !== e.length || dist(r, e) > t0);
            const covering = animations
                .map((m, i) => ({ m, i }))
                .filter(({ m }) => covers(m, target, prop));
            if (changed && !covering.length) {
                findings.push({ clause: "cut", target, property: prop, detail: `rest ${r.join(",")} end ${e.join(",")}, no animation` });
                continue;
            }
            if (!frames.length) continue;
            const series = frames.map((f) => reading(f.read[target], prop));
            const first = series[0];
            const last = series[series.length - 1];
            const spatial = prop !== "opacity" && !COLOR.test(prop);
            if (changed && first.length && r.length && dist(first, r) > t0 && !(spatial && invisible(rest[target])))
                findings.push({ clause: "first", target, property: prop, detail: `first ${first.join(",")} rest ${r.join(",")}` });
            if (changed && last.length && e.length && dist(last, e) > t0 && !(spatial && invisible(end[target])))
                findings.push({ clause: "last", target, property: prop, detail: `last ${last.join(",")} end ${e.join(",")}` });
            // Box steps are judged only under a size tween; a transformed box is judged
            // by its own transform leg.
            if (prop === "box" && !sizeTween) continue;
            const travel = series.reduce(
                (m, v) => (v.length && first.length ? Math.max(m, dist(v, first)) : m),
                0,
            );
            const full = Math.max(travel, first.length && last.length ? dist(first, last) : 0);
            if (!(full > t0) || !Number.isFinite(full)) continue;
            let maxStep = 0;
            let eased: number | null = null;
            for (let k = 0; k + 1 < frames.length; k++) {
                if (frames[k].phase !== frames[k + 1].phase) continue;
                const a = series[k];
                const b = series[k + 1];
                if (!a.length || !b.length) continue;
                // A spatial reset while invisible is not seen.
                if (prop !== "opacity" && invisible(frames[k].read[target]) && invisible(frames[k + 1].read[target])) continue;
                const d = dist(a, b) / full;
                if (Number.isFinite(d)) maxStep = Math.max(maxStep, d);
                for (const { i } of covering) {
                    if (animations[i].phase !== frames[k].phase) continue;
                    const pa = frames[k].progress[i];
                    const pb = frames[k + 1].progress[i];
                    if (pa == null || pb == null) continue;
                    eased = Math.max(eased ?? 0, Math.abs(pb - pa));
                }
            }
            const ratio = eased ? maxStep / eased : null;
            legs.push({ target, property: prop, travel: full, maxStep, easedMaxStep: eased, ratio });
            if (eased !== null && maxStep > slack * eased + 1e-6)
                findings.push({ clause: "step", target, property: prop, detail: `max step ${maxStep.toFixed(3)} of travel vs eased ${eased.toFixed(3)}` });
            // The absolute clause: whatever its own curve says, no leg lands more than
            // two fifths of its travel between two samples, and a leg is at least five
            // samples long. A cut given two frames (`transition: all 20ms`) fails here.
            const own = Math.max(
                0,
                ...covering.map(
                    ({ i }) => new Set(frames.map((f) => f.progress[i]).filter((v) => v != null)).size,
                ),
            );
            if (eased !== null && maxStep > 0.4 + 1e-6)
                findings.push({ clause: "step", target, property: prop, detail: `max step ${maxStep.toFixed(3)} of travel, over 0.4` });
            if (eased !== null && own < 5)
                findings.push({ clause: "step", target, property: prop, detail: `${own} samples, under 5` });
            if (eased === null && maxStep > 1 / 3)
                findings.push({ clause: "step", target, property: prop, detail: `max step ${maxStep.toFixed(3)} of travel, no animation object` });
        }
    }
    for (const [sel, rects] of Object.entries(samples.stillRects)) {
        const first = rects[0];
        const moved = rects.findIndex((r) => r !== first);
        if (moved !== -1)
            findings.push({ clause: "neighbour", target: sel, property: "box", detail: `moved at sample ${moved}: ${first} -> ${rects[moved]}` });
    }
    return { pass: findings.length === 0, findings, legs };
}
