#!/bin/zsh
# The 11.1.1 second close: ch-rel's one branch-only title, release-10-1-5 "critique 8, coarse phone >
# n1", alone and repeated on both trees: the head tree three times, the red tree (v11.1.0's src
# under the same demo and specs) three times, then the head tree three times again.
set -u
C=${0:A:h:h:h}; S=$C/scripts; F=${C:h:h:h:h}/.cache/close-full
G='critique 8, coarse phone n1 a fitting vertical'
for spec in "head a" "red a" "head b"; do
  set -- ${=spec}
  ROOT=$F/$1/tree zsh $S/suite.sh resolve/n1-$1-$2 5355 tests-visual/playwright.config.ts chromium-headless-new $C/lists/r1015 -g "$G" --repeat-each=3
done
