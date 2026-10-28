#!/bin/zsh
# P-E7 static cells, read-only: the deletion (O-103d (5), §P6-8 "one build, not four") read on the candidate's patch and,
# as the plant that must fail it, on the pass-6 candidate's patch; the cost (CK-23) by numstat.
E=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
cell() { # <label> <patch>
  local p=$2
  # the added side of the patch, with comments and test files left out: source bytes only
  local add=$(grep -E '^\+' $p | grep -v '^+++' )
  local src=$(awk '/^diff --git/{keep=($3 ~ /^a\/src\//)} keep && /^\+/ && !/^\+\+\+/' $p)
  local n1=$(print -r -- "$src" | grep -c -E 'STAGE_VEIL|POINTER_STAGE')
  local n2=$(print -r -- "$src" | grep -c -E '"every"')
  local n3=$(print -r -- "$src" | grep -c -E 'stageVeil|setVeil|settleVeil|className = "glass-focus-veil"')
  local n4=$(print -r -- "$src" | grep -c -E '\[popover\]\.glass-focus-veil|\.glass-focus-veil\[data-engaged\]')
  local n5=$(print -r -- "$src" | grep -c -E 'flingStage')
  echo "$1 · added src lines naming STAGE_VEIL/POINTER_STAGE $n1 · the \"every\" arm $n2 · the stage veil element (stageVeil/setVeil/settleVeil/its class) $n3 · its CSS ([popover].glass-focus-veil, .glass-focus-veil[data-engaged]) $n4 · flingStage $n5 · verdict $([[ $((n1+n2+n3+n4)) == 0 ]] && echo 'DELETED' || echo 'PRESENT')"
}
cell "candidate P-E7" $E/pass-7/P-E7.patch
cell "plant: the pass-6 candidate P-E6-noveil-coarse" $E/pass-6/P-E6-noveil-coarse.patch
