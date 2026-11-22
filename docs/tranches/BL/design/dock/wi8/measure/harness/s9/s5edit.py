# s5edit.py <worktree>: S5's source edits (RU-98 as amended for C8-2, C8-9; RU-99; RU-100 as amended for R8-10).
import sys
W = sys.argv[1]; D = W + "/src/components/dock/"
def edit(p, pairs):
    s = open(D + p).read()
    for old, new in pairs:
        c = s.count(old); assert c == 1, (p, c, old[:90]); s = s.replace(old, new)
    open(D + p, "w").write(s)
edit("styles/density.css", [
 ("        --dock-tab-h: calc(38px * var(--dock-scale));\n", "        /* RU-98: a tab seat is the control's height (RU-55: every seat in a run is). */\n        --dock-tab-h: var(--dock-control-size);\n"),
 ("""        --dock-layer-height: 2.75rem;
        --dock-padding-block: 0.25rem;""", """        --dock-layer-height: 2.75rem;
        /* RU-100: the top-right bar's glyph is the normal size, half its seat (IDIOM-TOPBAR rule 4). */
        --dock-icon-glyph-ratio: 0.5;
        --dock-padding-block: 0.25rem;"""),
])
edit("styles/controls/triggers.css", [
 ("""    /* W-I.8 step 7 (the trigger's seat): a trigger in a run is a seat of the run, so by default it
       takes the run's seat height (Home Assistant's GlassTabs, LF-11: a 148 by 31 trigger beside
       44 px seats). A site's `--dock-trigger-min-height` still outranks it. Its padding stays the
       density's `--dock-trigger-padding-*`, which every dock sets, so no default can sit under a
       site's value there. */
    .glass-dock .dock-run :is(.dock-trigger, .dock-select-trigger, .dock-dropdown-trigger) {
        min-height: var(--dock-trigger-min-height, var(--dock-control-size));
    }""", """    /* W-I.8 step 7 (the trigger's seat): RU-99, a trigger anywhere in a dock, in the run or either
       persistent region, is at least one seat in both axes (Home Assistant's GlassTabs, LF-11: a
       148 by 31 trigger beside 44 px seats; fourier's stage triggers, 38 px in a 44 px cell). A
       site's `--dock-trigger-min-height` still outranks the height. Its padding stays the density's
       `--dock-trigger-padding-*`, which every dock sets, so no default can sit under a site's value
       there. */
    .glass-dock :is(.dock-run, .dock-persistent) :is(.dock-trigger, .dock-select-trigger, .dock-dropdown-trigger) {
        min-height: var(--dock-trigger-min-height, var(--dock-control-size));
        min-inline-size: var(--dock-control-size);
    }"""),
])
print("s5 edits applied")
