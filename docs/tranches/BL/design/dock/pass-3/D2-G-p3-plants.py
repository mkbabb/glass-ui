#!/usr/bin/env python3
# D2-G-p3-plants.py: the D2-G pass-3 plants (D2-G-proto.md §6). Each plant is the prototype tree
# with one mechanism taken out, to show the witness that should catch it does.
#
#   python3 -I D2-G-p3-plants.py <prototype worktree> <harness build.mjs> <out dir> [plant ...]
#
# Every plant is built INSIDE the worktree (the seat's build fence): the edit is applied, the
# build runs (harness/build.mjs <wt> --out <out> --label <plant>), and the file is restored. The
# restore is checked by sha256 against the file before the edit; a mismatch stops the script.
import hashlib
import subprocess
import sys

AP = "src/components/dock/composables/useDockAperture.ts"
CONTENT = "src/components/dock/composables/useDockContent.ts"
CROSSFADE = "src/components/dock/DockCrossfade.vue"
DOCKCSS = "src/components/dock/styles/dock.css"

PLANTS = {
    # the swap's seam: entering seats wait for the seats they cover (W3 swap-* blank)
    "noseam": [(AP, "            if (under.length && over.length) {\n",
                "            if (under.length && over.length && under.length < 0) { // PLANT noseam\n")],
    # the face door clips at its own box, the root's padding line, not the glass (W3 leaving)
    "noreach": [(AP, "        const end = (trails ? lo(pe!, ax) : nat.hi) - dp - lr.right;\n",
                 "        const end = 0; // PLANT noreach\n")],
    # a stale start is kept, and a replay on a stale clock starts on it (ST same-task, 1raf)
    "nostale": [(AP, "wall - (first.startTime as number) > STALL_MS\n",
                 "wall > 0 && false // PLANT nostale\n"),
                (AP, "prev && prev.t0 != null && performance.now() - now <= STALL_MS\n",
                 "prev // PLANT nostale\n")],
    # a retarget trusts the frame clock (W3 reversal trajectory, Playwright WebKit)
    "nopainted": [(AP, "    function paintedTau(root: HTMLElement, ep: Episode, tau: number): number {\n        const P = parts(root);\n",
                   "    function paintedTau(root: HTMLElement, ep: Episode, tau: number): number {\n        if (root) return tau; // PLANT nopainted\n        const P = parts(root);\n")],
    # every ResizeObserver delivery replays the episode (ST 2raf, Playwright WebKit)
    "nosizes": [(AP, "if (entries.some((x) => seen.get(x.target) !== sizeOf(x.target))) run();",
                 "if (entries.length) run(); // PLANT nosizes")],
    # the content subscription: the carrier hears no mutation (W3 stretch·lead-add, H3-6)
    "nosub": [(AP, "        if (records.some((r) => !(r.target as Element).closest?.(\".dock-ghosts\")))\n",
               "        if (records.length < 0) // PLANT nosub\n")],
    # text is not content: the one observer without characterData (W3 ticking)
    "nochardata": [(CONTENT, "            characterData: true,\n", "            // PLANT nochardata\n")],
    # the hit pair's arc: the press surface is the window's rectangle (lune probe)
    "nohit": [(DOCKCSS, "        clip-path: inset(0 round var(--dock-corner));\n", "        /* PLANT nohit */\n")],
    # a unit under the paint floor stays pressable (hit probe, warm collapse ghost hits)
    "novis": [(AP, "            if (vals.some((v) => v <= PAINTS))\n",
               "            if (vals.some((v) => v < 0)) // PLANT novis\n")],
    # the flow: the in-flow neighbour jumps to the new layout (W3 neighbour)
    "noflow": [(AP, "            if (m.some((v) => Math.abs(v) > STILL_PX)) {\n                animate(\n                    root,\n                    \"--dock-flow-lo\",",
                "            if (m.some((v) => v !== v)) { // PLANT noflow\n                animate(\n                    root,\n                    \"--dock-flow-lo\",")],
    # a swap during a swap sends out only the face it leaves (probe retarget: vanish)
    "noset": [(CROSSFADE, "    leaving.value = new Set([...leaving.value, prev].filter((id) => id !== next && faceEl(id)));",
               "    leaving.value = new Set([prev]); // PLANT noset")],
}


def sha(path: str) -> str:
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()


def main() -> None:
    wt, build, out = sys.argv[1], sys.argv[2], sys.argv[3]
    names = sys.argv[4:] or list(PLANTS)
    for name in names:
        edits = PLANTS[name]
        saved = {}
        for rel, old, new in edits:
            p = f"{wt}/{rel}"
            if p not in saved:
                with open(p, encoding="utf-8") as f:
                    saved[p] = (f.read(), sha(p))
        try:
            for rel, old, new in edits:
                p = f"{wt}/{rel}"
                with open(p, encoding="utf-8") as f:
                    text = f.read()
                if text.count(old) != 1:
                    sys.exit(f"{name}: anchor not found once in {rel}")
                with open(p, "w", encoding="utf-8") as f:
                    f.write(text.replace(old, new, 1))
            r = subprocess.run(["node", build, wt, "--out", out, "--label", name], capture_output=True, text=True)
            print(name, "build exit", r.returncode, r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-400:])
        finally:
            for p, (text, digest) in saved.items():
                with open(p, "w", encoding="utf-8") as f:
                    f.write(text)
                if sha(p) != digest:
                    sys.exit(f"{name}: restore of {p} does not match")
        print(name, "restored", ", ".join(sorted(saved)))


if __name__ == "__main__":
    main()
