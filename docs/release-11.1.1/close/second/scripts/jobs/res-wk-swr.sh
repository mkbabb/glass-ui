#!/bin/zsh
# The 11.1.1 second close: WebKit's two branch-only titles, aurora-swraster "fallback ground matches
# the composite reference" (light, dark), on the red tree (v11.1.0's src under the tip's demo and
# specs) three times, then on the head tree three times. Run under the WebKit lock (queue2.sh).
set -u
C=${0:A:h:h:h}; S=$C/scripts; F=${C:h:h:h:h}/.cache/close-full
G='fallback ground matches the composite reference within the certify band'
for spec in "red a" "head a"; do
  set -- ${=spec}
  ROOT=$F/$1/tree zsh $S/suite.sh resolve/wk-swr-$1-$2 5354 tests-visual/webkit-2287.config.ts webkit $C/lists/swr -g "$G" --repeat-each=3
done
