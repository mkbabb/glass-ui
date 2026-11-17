# ru61.py: MEASURE-7 step 6, RU-61 as a prototype (not in the pass unless its gate is GREEN in both engines and the
# owner has seen the cover strip). Applied to the worktree's carrier for the prototype's cells, saved as m7/ru61.patch,
# then reverted with `git checkout` of the one file.
#
# The mechanism as RU-61 writes it, amended (R-4, C-3): in the open trigger's write the carrier gives an in-flow root
# (its own computed position static, relative or sticky) a negative margin on the side away from its anchor, equal to
# what the open posture adds on the dock's axis (the open layout just read less the folded layout it rested in); the
# anchor is the site's (`data-anchor`, GlassDock: start or end; unset is center, which grows both ways); no slot
# inference. The fold's trigger removes it before the folded layout is read. The margin moves the root itself when the
# anchor is not the start, so the carrier reads the root once more (counted against RU-53's bound). A fixed or
# absolute dock, and a dock that never folds, are untouched. The in-flow block-end tracking (its neighbours followed the
# painted bottom edge) does not run while the prototype's margin stands. Horizontal docks only in this prototype.
import pathlib, sys
p = pathlib.Path("/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/src/components/dock/composables/useDockBody.ts")
s = p.read_text()
def rep(old, new):
    global s
    if s.count(old) != 1: sys.exit(f"anchor count {s.count(old)}: {old[:90]!r}")
    s = s.replace(old, new)
rep('''        // RU-53: the carrier's read of the root, named, so a fold frame's first forced layout is told from a flag's.
        if (POSE) performance.mark("dock:rect");
        const next = rectOf(el);''',
'''        // RU-61 (prototype): the fold's trigger takes the in-flow margin off before the folded layout is read.
        const opening = o.expanded() && lastPosture === false;
        if (!o.expanded() && overMargin) {
            el.style.removeProperty("margin-inline-start");
            el.style.removeProperty("margin-inline-end");
            overMargin = false;
        }
        // RU-53: the carrier's read of the root, named, so a fold frame's first forced layout is told from a flag's.
        if (POSE) performance.mark("dock:rect");
        let next = rectOf(el);
        // RU-61 (prototype): an in-flow dock lies over its row. On the open trigger the root takes a negative margin
        // on the side away from its anchor, what the open posture adds, so no neighbour's box changes.
        if (opening && layout && !o.vertical() && /^(static|relative|sticky)$/.test(getComputedStyle(el).position)) {
            const dw = next.r - next.l - (layout.r - layout.l);
            if (dw > 0.5) {
                const an = el.getAttribute("data-anchor");
                const s0 = an === "end" ? dw : an === "start" ? 0 : dw / 2;
                const e0 = dw - s0;
                if (s0) el.style.marginInlineStart = `${(-s0).toFixed(3)}px`;
                if (e0) el.style.marginInlineEnd = `${(-e0).toFixed(3)}px`;
                overMargin = true;
                if (POSE) performance.mark("dock:rect", { detail: { over: true } });
                if (s0) next = rectOf(el);
            }
        }''')
rep('''    let inFlow = false;''', '''    let inFlow = false;
    /** RU-61 (prototype): the open in-flow root's negative margin is written. */
    let overMargin = false;''')
rep('''        if (inFlow && !o.vertical()) {
            const mb = edge.b.d;''', '''        if (inFlow && !o.vertical() && !overMargin) {
            const mb = edge.b.d;''')
p.write_text(s)
print("ru61 applied")
