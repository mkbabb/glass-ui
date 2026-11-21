# plant8.py <tree-dir> <plant> apply|revert: the source seat's plants for S5 and S6, applied to a candidate tree only,
# never the worktree. apply keeps the file's original beside it (<file>.s8-orig) and writes the plant; revert puts the
# original back. Each replacement is exact and must occur once.
#   tabauto   RU-75's: the tab seat's default height back to `auto` (G-13's seat line RED on the tab seats)
#   iconword  RU-75's, the other selector: the labelled icon seat's seat height removed (RED on Focus)
#   facerule  RU-76's: the folded face's glyph rule removed (RED: the face's glyph falls back to its floor)
#   g8-exempt   H2's (RU-72): the trigger exemption removed, so a press on the trigger of an open surface folds the dock
#   g8-trigger  H2's (RU-62): the scrim's stamp removed and a quiet focus return cancelling the linger again
# A plant may make several replacements; each file it touches keeps its original beside it.
import os, sys
T, name, op = sys.argv[1:4]
P = {
    "tabauto": ("src/components/dock/styles/controls/tab-button.css",
                "min-height: var(--dock-tab-h, var(--dock-tab-min-height, var(--dock-control-size)));",
                "min-height: var(--dock-tab-h, var(--dock-tab-min-height, auto));"),
    "iconword": ("src/components/dock/styles/controls/icon-button.css",
                 "        min-block-size: var(--dock-control-size);\n    }\n\n    .dock-icon-button--compact",
                 "    }\n\n    .dock-icon-button--compact"),
    "facerule": ("src/components/dock/styles/morph.css",
                 ".glass-dock .dock-layer--summary > :is(svg, img, picture) {",
                 ".glass-dock .dock-layer--summary > :is(svg, img, picture):not(*) {"),
    "g8-exempt": ("src/components/dock/composables/useDockState.ts",
                  "        if (!root || root.contains(e.target as Node)) return;",
                  "        if (!root || (root.contains(e.target as Node) && !(e.target as Element).closest?.(\"[aria-expanded='true'], [data-state='open']\"))) return;"),
    "g8-trigger": [("src/components/sheet/SheetContent.vue", '<ModalOverlay v-bind="dock.portalAttrs.value" :opacity', '<ModalOverlay :opacity'),
                   ("src/components/dialog/DialogContent.vue", '<ModalOverlay v-bind="dock.portalAttrs.value" veil', '<ModalOverlay veil'),
                   ("src/components/dock/composables/useDockState.ts", "        if (!quietReturn) clearTimer();", "        clearTimer();")],
}
reps = P[name] if isinstance(P[name], list) else [P[name]]
files = sorted({f for f, _, _ in reps})
if op == "apply":
    for f in files:
        p = os.path.join(T, f)
        s = open(p).read()
        open(p + ".s8-orig", "w").write(s)
        for g, old, new in reps:
            if g != f:
                continue
            assert s.count(old) == 1, f"{name}: plant site not found once in {f}"
            s = s.replace(old, new)
        open(p, "w").write(s)
    print(f"{name} applied")
else:
    for f in files:
        p = os.path.join(T, f)
        os.replace(p + ".s8-orig", p)
    print(f"{name} reverted")
