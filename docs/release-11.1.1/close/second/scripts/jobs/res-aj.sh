#!/bin/zsh
# The 11.1.1 second close: ch-part-aj's two branch-only titles, alone and repeated on both trees:
# release-10-1-2 "O-101 · vertical · reversal · the expanded endpoint follows the pane (390->1440)"
# (a 60 s timeout in the chunk) and release-10-1-3 "390 · right-anchored · ancestor zoom 1.25 ›
# D-1" (2.056 against < 2 in the chunk). Each three times on the head tree, three on the red tree
# (v11.1.0's src under the same demo and specs), then three on the head tree again.
set -u
C=${0:A:h:h:h}; S=$C/scripts; F=${C:h:h:h:h}/.cache/close-full
G='O-101 · vertical · reversal · the expanded endpoint follows the pane \(390->1440\)|right-anchored · ancestor zoom 1\.25 D-1 \(critique-7\)'
for spec in "head a" "red a" "head b"; do
  set -- ${=spec}
  ROOT=$F/$1/tree zsh $S/suite.sh resolve/aj-$1-$2 5355 tests-visual/playwright.config.ts chromium-headless-new $C/lists/r1012-1013 -g "$G" --repeat-each=3
done
