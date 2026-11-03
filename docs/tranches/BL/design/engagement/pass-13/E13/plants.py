# P-E13 plants: one edit each to the candidate (HEAD + P-E13.patch) in a worktree, each stepping one cure back to its pass-12 shape.
# usage: python3 -I plants.py <worktree> <plant>   (the caller restores the sources and reads the src tree back after the build)
#   level     the map read as its axis lengths (P-E12's ownScale): a rotation or skew lays the glide level      -> E-10 hg13 xf rotate/skew/matrix
#   child     the observer hears child lists only (P-E12's watchWorld)                                          -> E-10 hg13 kind style|class|hidden|text
#   stale     the place painted is read only at the hold and on events, not per frame                           -> E-10 hg13 anim, the H12 hostglide cells
#   noown     own() hands every write to the observer (the stage hears itself)                                   -> E-10 hg13 reentry
#   typedom   the token read is Typed OM (P-E12's tokenOf)                                                       -> E-11 forms (math), census (WebKit)
#   reachzero a refused reach input leaves the registered 0                                                      -> E-11 reachin
import pathlib, sys
wt, plant = pathlib.Path(sys.argv[1]), sys.argv[2]
E = wt / "src/composables/motion/engage"
EDITS = {
    "level": [(E / "stage.ts", "    return { a: (px.x - p.x) / 40, b: (py.x - p.x) / 40, c: (px.y - p.y) / 40, d: (py.y - p.y) / 40 };",
               "    const a = (px.x - p.x) / 40, b = (py.x - p.x) / 40, c = (px.y - p.y) / 40, d = (py.y - p.y) / 40;\n    return { a: Math.hypot(a, c), b: 0, c: 0, d: Math.hypot(b, d) };")],
    "child": [(E / "stage.ts", "{ childList: true, subtree: true, attributes: true, characterData: true }", "{ childList: true, subtree: true }")],
    "stale": [(E / "stage.ts", "        if (!h.engaged) continue;\n        h.painted = centreOf(h.host);\n        sizes?.unobserve(h.host);", "        if (!h.engaged) continue;\n        sizes?.unobserve(h.host);"),
              (E / "stage.ts", "            placeLens(h);\n            h.painted = centreOf(h.host);\n        }", "            placeLens(h);\n        }")],
    "noown": [(E / "own.ts", "    if (depth > 0 || !ear) {", "    if (depth > 0 || !ear || ear) {")],
    "typedom": [(E / "settle.ts", "    const v = valueOf(text, unit);",
                 "    let v = Number.NaN;\n    try {\n        v = CSSNumericValue.parse(getComputedStyle(el).getPropertyValue(token).trim()).to(unit).value;\n    } catch {\n        // refused\n    }")],
    "reachzero": [(E / "stage.ts", "    let reach = \"1\";", "    let reach = \"0\";")],
}
for f, old, new in EDITS[plant]:
    s = f.read_text()
    assert s.count(old) == 1, f"{plant}: {f.name}: the line is not there exactly once"
    f.write_text(s.replace(old, new))
print(f"plant {plant}: {len(EDITS[plant])} edit(s)")
