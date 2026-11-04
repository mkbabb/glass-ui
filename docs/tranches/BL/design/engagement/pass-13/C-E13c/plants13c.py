# C-E13-complete plants: one edit each to cand13 (HEAD + P-E13.patch) in this seat's worktree. The caller restores the sources and reads
# the src tree back after the build (builds.sh).
#   loop   the frame read never stops at release (O-103f (3), CK-16): C-E12's `loop` plant re-cut on cand13's stage.ts:418
# usage: python3 -I plants13c.py <worktree> <plant>
import pathlib, sys
wt, plant = pathlib.Path(sys.argv[1]), sys.argv[2]
E = wt / "src/composables/motion/engage"
EDITS = {
    "loop": [(E / "stage.ts", "    if (![...holders.values()].some((x) => x.engaged)) stopFrames();\n", "")],
}
for f, old, new in EDITS[plant]:
    s = f.read_text()
    assert s.count(old) == 1, f"{plant}: {f.name}: the line is not there exactly once"
    f.write_text(s.replace(old, new))
print(f"plant {plant}: {len(EDITS[plant])} edit(s)")
