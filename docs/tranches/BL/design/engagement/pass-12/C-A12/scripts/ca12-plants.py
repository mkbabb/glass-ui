# C-A12 plants and controls, one edit set each on the candidate (HEAD + P-E12.patch).   python3 -I ca12-plants.py <worktree> <name>
#   nozoom    (plant) frameOf with no CSS zoom: pass-11/E11/plants.py's nozoom on these bytes (its second edit was on flowBox, retired)
#   allkinds  (control, not a cure proposal) the stage's MutationObserver also hears attribute (style, class, hidden) and characterData
#             records: whether a v-show, a class toggle and a text change above a held control are unglided because they are unheard
import sys
wt, plant = sys.argv[1], sys.argv[2]
ST = "src/composables/motion/engage/stage.ts"
EDITS = {
    "nozoom": [(ST, "    let x = el.currentCSSZoom;\n", "    let x = 1;\n")],
    "allkinds": [(ST, "observer.observe(document.body, { childList: true, subtree: true });",
                  'observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["style", "class", "hidden"] });')],
}
for f, old, new in EDITS[plant]:
    p = f"{wt}/{f}"; s = open(p).read(); assert s.count(old) == 1, (plant, old); open(p, "w").write(s.replace(old, new)); print(f"plant {plant}: {f}")
