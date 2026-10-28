#!/usr/bin/env python3
"""P-E7 plants: `plants.py <plant> apply|revert <worktree>`. Each plant puts back one counterexample E7 cures, as text
edits on the candidate's bytes; `revert` restores the files byte for byte from the copies `apply` kept.
  clip6   the pass-6 construction: a promoted control is not clipped (writeClip does nothing) and the UA's
          `position-visibility` initial value (`anchors-visible`) drops it in one step (CK-20; E-10 clip-vanish,
          e7-probe cliptouch must FAIL)
  fling6  the pass-6 carry route: a host on the stage is carried by `flingStage` (the whole host stretched, trailing
          edge held, soft-limited to the reach), the body's carry skipped (CK-05; the carry's cause read)
  loupe6  the pass-6 loupe: the 2 px value mark drawn across the window, no end fade (CK-25; e7-probe loupe must FAIL)
"""
import os
import shutil
import sys

STAGE = "src/composables/motion/engage/stage.ts"
STAGE_CSS = "src/styles/glass/engage-stage.css"
ENGAGE = "src/composables/motion/engage/useEngage.ts"
SLIDER = "src/components/slider/Slider.vue"
SLIDER_CSS = "src/components/slider/styles.css"

FLING = '''
/** PLANT fling6: the pass-6 release fling, the whole host stretched with its trailing edge held. */
export function flingStage(host: HTMLElement, axis: "x" | "y", v: number): boolean {
    const h = holders.get(host);
    if (!h) return false;
    if (!v || reducedMotion()) return true;
    const ms = rowClockMs("dock", host);
    const cs = getComputedStyle(host);
    const reach = Number.parseFloat(cs.getPropertyValue(axis === "x" ? "--stage-reach" : "--scale-engage"));
    const rest = h.footprint ?? host;
    const size = axis === "x" ? rest.offsetWidth : rest.offsetHeight;
    const cap = (reach - 1) * size;
    if (!ms || !(cap > 0) || !size) return true;
    const dir = Math.sign(v);
    host.animate(
        settleFrames("dock", 0, v, ms).map((d) => {
            const t = cap * Math.tanh(d / cap);
            const s = 1 + (dir * t) / size;
            return {
                transform: axis === "x" ? `translateX(${t / 2}px) scaleX(${s})` : `translateY(${t / 2}px) scaleY(${s})`,
            };
        }),
        { duration: ms, composite: "add" },
    );
    return true;
}
'''

PLANTS = {
    "clip6": [
        (STAGE, "function writeClip(h: Holder): void {\n    if (!h.footprint) return;",
         "function writeClip(h: Holder): void {\n    return; // PLANT clip6\n    if (!h.footprint) return;"),
        (STAGE_CSS, "    position-visibility: always;\n", ""),
    ],
    "fling6": [
        (STAGE, "/**\n * Bind a control's engagement to the stage:", FLING.lstrip("\n") + "\n/**\n * Bind a control's engagement to the stage:"),
        (ENGAGE, 'import { useEngageStage } from "./stage";', 'import { flingStage, useEngageStage } from "./stage";'),
        (ENGAGE, "            onRelease: (v) => {\n                const body = d.body();",
         "            onRelease: (v) => {\n                const h = host();\n                if (h && flingStage(h, d.axis(), v)) return;\n                const body = d.body();"),
    ],
    "loupe6": [
        (SLIDER, "            </span>\n        </span>\n        <SliderTrack",
         "            </span>\n            <span class=\"glass-loupe-mark\"></span>\n        </span>\n        <SliderTrack"),
        (SLIDER_CSS, "    border-radius: var(--radius-pill);\n    mask-image: linear-gradient(\n        to right,\n        transparent,\n        black var(--loupe-band),\n        black calc(100% - var(--loupe-band)),\n        transparent\n    );\n}",
         "    border-radius: var(--radius-pill);\n}\n\n.glass-loupe-mark {\n    position: absolute;\n    inset-block: var(--loupe-ring);\n    inset-inline-start: 50%;\n    inline-size: 2px;\n    translate: -50% 0;\n    background: var(--foreground);\n    opacity: 0.24;\n}"),
    ],
}


def main() -> None:
    plant, op, wt = sys.argv[1], sys.argv[2], sys.argv[3]
    keep = os.path.join(wt, ".e7plant", plant)
    files = sorted({f for f, _, _ in PLANTS[plant]})
    if op == "apply":
        os.makedirs(keep, exist_ok=True)
        for f in files:
            dst = os.path.join(keep, f.replace("/", "__"))
            shutil.copy2(os.path.join(wt, f), dst)
        for f, a, b in PLANTS[plant]:
            p = os.path.join(wt, f)
            s = open(p).read()
            if s.count(a) != 1:
                sys.exit(f"plant {plant}: anchor not found once in {f}: {a[:60]!r}")
            open(p, "w").write(s.replace(a, b))
        print(f"plant {plant} applied to {', '.join(files)}")
    else:
        for f in files:
            shutil.copy2(os.path.join(keep, f.replace("/", "__")), os.path.join(wt, f))
        shutil.rmtree(keep)
        print(f"plant {plant} reverted")


main()
