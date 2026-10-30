#!/usr/bin/env python3
# P-E9: the probe P-E9-probe.patch = HEAD + pass-8/P-E8.patch (the promoted construction, (c)) + the SHARED loupe items
# (CK-25: the lens laid on its track's painted box, at its painted scale, hung below at the viewport's top), ported here
# byte for byte from the candidate's lens code. Run in the worktree at HEAD + P-E8.patch: `probe-port.py <worktree>`.
import sys, re
W = sys.argv[1]
def sub(p, old, new):
    p = f"{W}/{p}"; s = open(p).read(); assert old in s, (p, old[:70]); open(p, "w").write(s.replace(old, new, 1))

# ── slider/styles.css: the lens's transform is the stage's correction and painted scale; the below arm; reduce keeps it ──
sub("src/components/slider/styles.css", "    transform: scale(var(--held-scale-x, 1), var(--held-scale-y, 1));\n",
    "    transform: translate(var(--lens-dx, 0px), var(--lens-dy, 0px)) scale(var(--lens-sx, 1), var(--lens-sy, 1));\n")
sub("src/components/slider/styles.css", "[data-engaged] > .glass-loupe {\n    scale: 1;",
    "/* At the viewport's top the lens hangs below its track, rising from the track's edge. */\n.glass-loupe[data-engage-lens-below] {\n    bottom: auto;\n    top: anchor(bottom);\n    transform-origin: 50% 0;\n}\n\n[data-engaged] > .glass-loupe {\n    scale: 1;")
sub("src/components/slider/styles.css", "        transition-duration: 0.01ms;\n        transform: none;\n", "        transition-duration: 0.01ms;\n")
# ── Slider.vue: the lens and its subject named for the stage; the clone laid out at the track's layout width ──
sub("src/components/slider/Slider.vue", "    const rect = track.getBoundingClientRect();\n    loupeTrackW.value = rect.width;\n    lens.style.setProperty(\"--loupe-track-w\", `${rect.width}px`);",
    "    loupeTrackW.value = track.offsetWidth;\n    lens.style.setProperty(\"--loupe-track-w\", `${track.offsetWidth}px`);")
sub("src/components/slider/Slider.vue", "            class=\"glass-loupe glass-plate\"\n            aria-hidden=\"true\"", "            class=\"glass-loupe glass-plate\"\n            data-engage-lens\n            aria-hidden=\"true\"")
sub("src/components/slider/Slider.vue", "<SliderTrack class=\"slider-track track-well\" :style=\"{ anchorName: trackAnchor }\">",
    "<SliderTrack class=\"slider-track track-well\" data-engage-lens-subject :style=\"{ anchorName: trackAnchor }\">")
# ── engage.css: --held-scale-* had one other reader (the lens); the grow is written in place ──
sub("src/styles/utilities/engage.css", "    --held-scale-x: calc(1 + (var(--stage-reach) - 1) * var(--rung-grow));\n    --held-scale-y: calc(1 + (var(--scale-engage) - 1) * var(--rung-grow));\n    scale: var(--held-scale-x) var(--held-scale-y);",
    "    scale: calc(1 + (var(--stage-reach) - 1) * var(--rung-grow))\n        calc(1 + (var(--scale-engage) - 1) * var(--rung-grow));")
# ── stage.ts: the candidate's lens code (Lens, lensScale = the candidate's paintedScale, placeLens), called in the resize step ──
LENS = '''
/** P-E9 shared loupe item (CK-25): the lens laid on its subject's painted box; the candidate's code, ported. */
interface Lens {
    el: HTMLElement | null;
    dx: number;
    dy: number;
    below: boolean;
    written: string;
}
const noLens = (): Lens => ({ el: null, dx: 0, dy: 0, below: false, written: "" });
const lenses = new WeakMap<Holder, Lens>();

function lensScale(el: HTMLElement): { x: number; y: number } {
    let x = 1;
    let y = 1;
    for (let e: Element | null = el; e; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (cs.transform && cs.transform !== "none") {
            const m = new DOMMatrixReadOnly(cs.transform);
            x *= Math.hypot(m.a, m.b);
            y *= Math.hypot(m.c, m.d);
        }
        if (cs.scale && cs.scale !== "none") {
            const [sx, sy = sx] = cs.scale.split(" ").map(Number.parseFloat);
            x *= sx ?? 1;
            y *= sy ?? 1;
        }
        if (e.matches(":popover-open, :modal")) break;
    }
    return { x, y };
}

const round2 = (v: number): number => Math.round(v * 100) / 100;

function placeLens(h: Holder): void {
    const lens = h.host.querySelector<HTMLElement>(":scope > [data-engage-lens]");
    const subject = h.host.querySelector<HTMLElement>("[data-engage-lens-subject]");
    if (!lens || !subject || !lens.offsetHeight) return;
    const s = lensScale(subject);
    const t = subject.getBoundingClientRect();
    const below = t.top - lens.offsetHeight * s.y < 0;
    let L = lenses.get(h);
    if (!L || L.el !== lens) lenses.set(h, (L = { ...noLens(), el: lens }));
    if (below !== L.below) {
        Object.assign(L, { dx: 0, dy: 0, below });
        lens.toggleAttribute("data-engage-lens-below", below);
    } else {
        const r = lens.getBoundingClientRect();
        L.dx = round2(L.dx + (t.left + t.width / 2 - (r.left + r.width / 2)));
        L.dy = round2(L.dy + (below ? t.bottom - r.top : t.top - r.bottom));
    }
    const sx = `${Math.round(s.x * 1e4) / 1e4}`;
    const sy = `${Math.round(s.y * 1e4) / 1e4}`;
    const written = `${L.dx} ${L.dy} ${sx} ${sy}`;
    if (written === L.written) return;
    L.written = written;
    lens.style.setProperty("--lens-dx", `${L.dx}px`);
    lens.style.setProperty("--lens-dy", `${L.dy}px`);
    lens.style.setProperty("--lens-sx", sx);
    lens.style.setProperty("--lens-sy", sy);
}
'''
sub("src/composables/motion/engage/stage.ts", "/** Each frame while the stage holds anything:", LENS.lstrip("\n") + "\n/** Each frame while the stage holds anything:")
sub("src/composables/motion/engage/stage.ts", "        if (!samePlace(at, h.at)) writeGeometry(h, at);\n        writePaint(h);\n",
    "        if (!samePlace(at, h.at)) writeGeometry(h, at);\n        writePaint(h);\n        if (h.engaged) placeLens(h);\n")
print("probe port applied")
