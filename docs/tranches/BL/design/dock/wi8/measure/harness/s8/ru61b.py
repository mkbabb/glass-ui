# ru61b.py <tree-dir> <form> apply|revert: S7, RU-61's second prototype round (RU-84 as amended for R7-4), applied to a
# candidate tree only, never the worktree; it never joins the source (question 14's default: no overlay in 11.2.0).
# apply keeps the tree's useDockBody.ts beside it (<file>.s8-orig); revert puts it back.
#   m7      MEASURE-7's margin (m7/ru61.patch) ported onto the merged carrier as it stood: on the open trigger an
#           in-flow root takes a negative inline margin on the side away from its anchor, what the open posture adds,
#           and reads its box again (the extra layout MEASURE-7 counted: 3 of 12 trigger frames at four).
#   arith   the second round: the same margin, and the box the carrier keeps is moved by the margin's arithmetic
#           (start edge less the start margin) instead of read again, so the trigger frame keeps its one read of the
#           root (RU-84: "in the carrier's one write, with no read of the root after it moves").
# Both take the margin off on the fold's trigger before the folded layout is read, as m7 did, write the margin after
# the fit key's extents are read (so that read stays in the trigger's layout), and stop the in-flow bottom-edge margin
# while the open root lies over its row. Horizontal, left to right only (the prototype's scope).
import os, sys
T, form, op = sys.argv[1:4]
p = os.path.join(T, "src/components/dock/composables/useDockBody.ts")
if op == "revert":
    os.replace(p + ".s8-orig", p)
    print("ru61b reverted")
    sys.exit(0)
s = open(p).read()
open(p + ".s8-orig", "w").write(s)
reread = "                if (s0) next = rectOf(el);\n" if form == "m7" else "                next = { l: next.l - s0, r: next.r - s0, t: next.t, b: next.b };\n"
R = [
    ("    let wroteMargin = false;\n",
     "    let wroteMargin = false;\n    /** RU-61 (prototype): the open in-flow root's negative margin is written. */\n    let overMargin = false;\n"),
    ("        // RU-53: the carrier's read of the root, named, so a fold frame's first forced layout is told from a flag's.\n        if (POSE) performance.mark(\"dock:rect\");\n        const next = rectOf(el);\n",
     "        // RU-61 (prototype): the fold's trigger takes the in-flow margin off before the folded layout is read.\n"
     "        const opening = o.expanded() && lastPosture === false;\n"
     "        if (!o.expanded() && overMargin) {\n"
     "            el.style.removeProperty(\"margin-inline-start\");\n"
     "            el.style.removeProperty(\"margin-inline-end\");\n"
     "            overMargin = false;\n"
     "        }\n"
     "        // RU-53: the carrier's read of the root, named, so a fold frame's first forced layout is told from a flag's.\n"
     "        if (POSE) performance.mark(\"dock:rect\");\n"
     "        let next = rectOf(el);\n"),
    # The margin is written after the fit key's extents are read (RU-54), so that read stays in rectOf's layout.
    ("        if (layout) {\n            const keep = ",
     "        // RU-61 (prototype): an in-flow dock lies over its row. On the open trigger the root takes a negative margin\n"
     "        // on the side away from its anchor, what the open posture adds, so no neighbour's box changes.\n"
     "        if (opening && layout && !o.vertical() && /^(static|relative|sticky)$/.test(getComputedStyle(el).position)) {\n"
     "            const dw = next.r - next.l - (layout.r - layout.l);\n"
     "            if (dw > 0.5) {\n"
     "                const an = el.getAttribute(\"data-anchor\");\n"
     "                const s0 = an === \"end\" ? dw : an === \"start\" ? 0 : dw / 2;\n"
     "                const e0 = dw - s0;\n"
     "                if (s0) el.style.marginInlineStart = `${(-s0).toFixed(3)}px`;\n"
     "                if (e0) el.style.marginInlineEnd = `${(-e0).toFixed(3)}px`;\n"
     "                overMargin = true;\n"
     + reread +
     "            }\n"
     "        }\n"
     "        if (layout) {\n            const keep = "),
    ("        if (inFlow && !o.vertical()) {\n", "        if (inFlow && !o.vertical() && !overMargin) {\n"),
]
for old, new in R:
    assert s.count(old) == 1, f"ru61b: site not found once: {old[:60]!r}"
    s = s.replace(old, new)
open(p, "w").write(s)
print(f"ru61b {form} applied")
