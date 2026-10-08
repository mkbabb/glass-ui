#!/usr/bin/env python3
# D2-Bp-p3-plants.py: the D2-B′ pass-3 plants (D2-Bp-proto.md §5). Each plant is the prototype tree
# with one mechanism taken out, to show the witness that should catch it does.
#
#   python3 -I D2-Bp-p3-plants.py <prototype worktree> <out dir>
#
# Writes <out>/<plant>/ with src/, demo/, tests/ and the root config files copied from the worktree
# (docs/ is not copied), node_modules symlinked to the worktree's, and the worktree's `.git` pointer
# file, so harness/build.mjs can read HEAD (run it with GIT_OPTIONAL_LOCKS=0: reads only).
import os
import shutil
import sys

SCENE = "src/components/dock/composables/useDockScene.ts"
BODY = "src/components/dock/composables/useDockBody.ts"
CONTENT = "src/components/dock/composables/useDockContent.ts"
CROSSFADE = "src/components/dock/DockCrossfade.vue"

PLANTS = {
    # the per-unit silhouette clip: no unit is clipped (W3 faces, seatOverlap, leaving)
    "noclip": [(SCENE, "    function writeClip(m: Mover, box: Span, v0: number, v1: number, P: Span, R: number, vert: boolean): void {\n",
                "    function writeClip(m: Mover, box: Span, v0: number, v1: number, P: Span, R: number, vert: boolean): void {\n        if (m) return; // PLANT noclip\n")],
    # the exchange's wipe: a unit going out keeps its whole box until the exchange lands (blank, overlap, leaving)
    "nowipe": [(SCENE, "            const [a, b] = m.exit ? exitSpan(m, box) : [box.lo, box.hi];",
                "            const [a, b] = [box.lo, box.hi]; // PLANT nowipe")],
    # the flow: no margins follow the painted plate (W3 neighbour)
    "noflow": [(SCENE, "        r.style.setProperty(\"--dock-flow-start\", `${anchor * delta}px`);\n        r.style.setProperty(\"--dock-flow-end\", `${(1 - anchor) * delta}px`);\n",
                "        // PLANT noflow\n")],
    # the hold: the flow margins without the size hold (probes `recheck`)
    "nohold": [("src/components/dock/styles/shell.css", "        flex-shrink: 0;\n        width: var(--dock-hold);\n", "        /* PLANT nohold */\n")],
    # the content subscription: the scene hears no mutation (W3 ticking, stretch)
    "nosub": [(SCENE, "        unsubscribe = content.subscribe(check);", "        unsubscribe = () => false; // PLANT nosub")],
    # text is not content: the one observer without characterData (W3 ticking)
    "nochardata": [(CONTENT, "            characterData: true,\n", "            // PLANT nochardata\n")],
    # a retargeted swap sends out only the face it leaves (probes `retarget`, leaving)
    "single": [(CROSSFADE, "    const out = [...leaving.value, prev].filter((id) => id !== next && faceEl(id));",
                "    const out = [prev].filter((id) => id !== next && faceEl(id)); // PLANT single")],
    # no clone for a seat that leaves the DOM (W3 lead-remove, content-remove leaving)
    "noghost": [(SCENE, "    function retire(seat: HTMLElement): void {\n", "    function retire(seat: HTMLElement): void {\n        if (seat) return; // PLANT noghost\n")],
    # whole-px positions only (W3 lattice seatStep, Playwright WebKit; probes `subpx`)
    "nosubpx": [(SCENE, "                x: Math.abs(fx) <= OFFSET_ROUNDING_PX ? at.x + fx : at.x,\n                y: Math.abs(fy) <= OFFSET_ROUNDING_PX ? at.y + fy : at.y,\n",
                 "                x: at.x, // PLANT nosubpx\n                y: at.y,\n")],
    # a stall steps the capped 33.3 ms instead of the cadence (ST, useDockBody.test.ts)
    "nocadence": [(BODY, "        const dt = gap > DOCK_BODY_STALL_MS ? cadence : Math.min(DOCK_BODY_MAX_DT_MS, gap);",
                   "        const dt = Math.min(DOCK_BODY_MAX_DT_MS, gap); // PLANT nocadence")],
}


def main() -> None:
    wt, out = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
    os.makedirs(out, exist_ok=True)
    for name, edits in PLANTS.items():
        dst = os.path.join(out, name)
        if os.path.exists(dst):
            shutil.rmtree(dst)
        os.makedirs(dst)
        for entry in os.listdir(wt):
            if entry in ("docs", "node_modules", ".git", "dist"):
                continue
            src = os.path.join(wt, entry)
            if os.path.isdir(src):
                shutil.copytree(src, os.path.join(dst, entry), symlinks=True, ignore=shutil.ignore_patterns("node_modules"))
            else:
                shutil.copy2(src, os.path.join(dst, entry))
        os.symlink(os.path.join(wt, "node_modules"), os.path.join(dst, "node_modules"))
        shutil.copy2(os.path.join(wt, ".git"), os.path.join(dst, ".git"))
        for path, old, new in edits:
            p = os.path.join(dst, path)
            text = open(p).read()
            if text.count(old) != 1:
                raise SystemExit(f"{name}: {path}: anchor found {text.count(old)} times")
            open(p, "w").write(text.replace(old, new))
        print(name)


main()
