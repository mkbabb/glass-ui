# s3edit.py <worktree>: S3's source edits (RU-93 as amended for R8-7, C8-5, C8-12; RU-111): the dock's glass level as one
# token, `--glass-level-dock` (1 at :root, 0.7 under .dark), read by `.glass-dock`, set by the a11y brackets, and read by
# the README's matching-plate recipe.
import sys
W = sys.argv[1]
def edit(p, pairs):
    s = open(W + "/" + p).read()
    for old, new in pairs:
        c = s.count(old); assert c == 1, (p, c, old[:80]); s = s.replace(old, new)
    open(W + "/" + p, "w").write(s)
edit("src/styles/tokens/glass.css", [
 ("""    --glass-veil-dock:    var(--glass-veil-base); /* RU-44: the dock rides the base rung */
""", """    --glass-veil-dock:    var(--glass-veil-base); /* RU-44: the dock rides the base rung */
    /* The dock's glass level (W-I.8 RU-93): 1 in light, 0.7 under `.dark` (below), so the dark dock
       hides about as much of a busy page as the light one. `.glass-dock` and a plate that matches
       the dock read it, and the a11y brackets set it (glass/a11y-fallback.css). */
    --glass-level-dock: 1;
"""),
 ("""    --control-surface-bg-hover:  color-mix(in oklab, var(--glass-plate-quiet), var(--glass-plate-resting) 35%);
}
""", """    --control-surface-bg-hover:  color-mix(in oklab, var(--glass-plate-quiet), var(--glass-plate-resting) 35%);
}

.dark {
    --glass-level-dock: 0.7;
}
"""),
])
edit("src/styles/glass/a11y-fallback.css", [
 ("""@media (prefers-reduced-transparency: reduce) {
    :root,
    :root .glass-dock {
        --glass-level: 0;
        --glass-grain-opacity: 0;
    }
}""", """@media (prefers-reduced-transparency: reduce) {
    :root {
        --glass-level: 0;
        --glass-grain-opacity: 0;
    }
    /* The dock's level reaches the dock and a matching plate through its token, on every
       element its dark line sets it (tokens/glass.css). */
    :root,
    .dark {
        --glass-level-dock: 0;
    }
}"""),
 ("""@media (prefers-contrast: more) {
    :root,
    :root .glass-dock {
        --glass-level: 0.3;""", """@media (prefers-contrast: more) {
    :root,
    .dark {
        --glass-level-dock: 0.3;
    }
    :root {
        --glass-level: 0.3;"""),
])
edit("src/components/dock/styles/dock.css", [
 ("""    /* RU-67: the plate's level is 1 in both schemes. Dark takes the level at which the dark
       dock hides as much of a grid page as the light dock does at its own (MEASURE-8 H6),
       which is 1, so one rule serves both. The a11y brackets and the static arm still win. */
    .glass-dock {
        --glass-level: 1;
    }""", """    /* RU-93: the plate's level is the dock's token, 1 in light and 0.7 in dark (tokens/glass.css),
       which the a11y brackets set; the static arm still wins. */
    .glass-dock {
        --glass-level: var(--glass-level-dock);
    }"""),
])
edit("src/components/dock/README.md", [
 ("""A plate outside a dock that should read as the dock's, such as a neck between two docks
or a bare plate, applies the `glass-plate` utility with
`--glass-veil-tier: var(--glass-veil-dock)`. It sets no `--glass-level`: the level is 1
outside a dock, and 1 is the dock's level in both schemes.""", """A plate outside a dock that should read as the dock's, such as a neck between two docks
or a bare plate, applies the `glass-plate` utility with
`--glass-veil-tier: var(--glass-veil-dock)` and `--glass-level: var(--glass-level-dock)`.
The dock's level is 1 in light and 0.7 in dark, and it falls to 0 under reduced
transparency and 0.3 under more contrast, so the plate follows the dock in each."""),
])
print("s3 edits applied")
