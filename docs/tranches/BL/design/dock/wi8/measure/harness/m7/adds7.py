# adds7.py: MEASURE-7 step 7, RULINGS-6's two small adds (RU-63's ADDS table), written into the worktree's CSS.
#   the trigger's seat: a DockTrigger in a run takes the run's seat height and padding as a default under the sites'
#     tokens (Home Assistant's GlassTabs, LF-11: 148 by 31 beside 44 px seats). Amended (fold 6: C-8): a site's
#     `--dock-trigger-padding-*` (atlas, speedtest) and `--dock-trigger-min-height` (fourier) outrank it. Three lines.
#     As applied, the rule also wrote padding-block and padding-inline from the tab seat's tokens; adds7.mjs read them
#     at 8 px against the tab seat's 12 in both engines, because density.css sets `--dock-trigger-padding-*` on every
#     dock (:146-153, :211-218), so a default under a site's value never shows. Those two lines were taken out after
#     the reading; the min-height line stands.
#   the group as a frame: a direct child of the run with role="group" is a frame and its seats are the snap targets, as a
#     layer group already is (gregg's PageDock: WebKit pinned the row at 0). Two selectors.
import pathlib, sys
D = pathlib.Path("/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/src/components/dock/styles")
def rep(p, old, new):
    s = p.read_text()
    if s.count(old) != 1: sys.exit(f"{p.name}: anchor count {s.count(old)}")
    p.write_text(s.replace(old, new))
rep(D / "controls/triggers.css", '''    /* The pickers move OFF the opaque `--muted` flat plate onto the''', '''    /* W-I.8 step 7 (the trigger's seat): a trigger in a run is a seat of the run, so by default it
       takes the run's seat height and the tab seat's padding (Home Assistant's GlassTabs, LF-11: a
       148 by 31 trigger beside 44 px seats). A site's `--dock-trigger-padding-*` and
       `--dock-trigger-min-height` still outrank it. */
    .glass-dock .dock-run :is(.dock-trigger, .dock-select-trigger, .dock-dropdown-trigger) {
        min-height: var(--dock-trigger-min-height, var(--dock-control-size));
        padding-block: var(--dock-trigger-padding-block, var(--dock-tab-padding-block, 0.375rem));
        padding-inline: var(--dock-trigger-padding-inline, var(--dock-tab-padding-inline, 0.75rem));
    }
    /* trigger seat end */

    /* The pickers move OFF the opaque `--muted` flat plate onto the''')
rep(D / "run.css", '''    .glass-dock :where(.dock-layers) > .dock-run > .dock-layer-group .dock-face.is-active > .dock-face-content > * {
        scroll-snap-align: start;
    }
''', '''    .glass-dock :where(.dock-layers) > .dock-run > .dock-layer-group .dock-face.is-active > .dock-face-content > * {
        scroll-snap-align: start;
    }

    /* W-I.8 step 7 (the group as a frame): a direct child of the run with role="group" is a frame
       too, and its seats are the snap targets (gregg's PageDock: as one snap area wider than the
       port, its group pinned WebKit's run at 0). */
    .glass-dock :where(.dock-layers) > .dock-run > [role="group"] {
        scroll-snap-align: none;
    }

    .glass-dock :where(.dock-layers) > .dock-run > [role="group"] > * {
        scroll-snap-align: start;
    }
    /* group frame end */
''')
print("adds written")
