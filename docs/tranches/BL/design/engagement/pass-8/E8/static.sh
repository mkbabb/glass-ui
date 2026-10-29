#!/bin/zsh
# P-E8 static cells, read-only, on a tree built from each patch (HEAD archive + git apply in the scratch dir passed as $1):
# P-1/E-1 the deletions (position-visibility, @property --veil-x/--veil-y and their readers, the anchor pin) and the pass-7
# construction's deletion cell (E7/static.sh's five names) on the candidate; the pass-7 candidate is the plant that must fail.
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
S=$1; G=/Users/mkbabb/Programming/glass-ui
cell() { # <label> <patch>
  rm -rf $S/t && mkdir -p $S/t && (cd $G && git archive HEAD) | tar -x -C $S/t && (cd $S/t && git apply $2)
  local s=$S/t/src
  local pv=$(grep -rn "position-visibility" $s | grep -v "^\s*//" | grep -vc "^[^:]*:[0-9]*:\s*\(//\|\*\|/\*\)")
  local vr=$(grep -rnE "@property --veil-[xy]" $s | wc -l | tr -d ' ')
  local vu=$(grep -rnE "var\(--veil-[xy]\)" $s | wc -l | tr -d ' ')
  local an=$(grep -rnE "anchor-name|position-anchor\"|setProperty\(\"position-anchor|anchor\((left|top)\)|anchor-size\(" $s/composables/motion/engage $s/styles/glass/engage-stage.css | wc -l | tr -d ' ')
  local e7=$(grep -rnE "STAGE_VEIL|POINTER_STAGE|flingStage|stageVeil|setVeil|settleVeil" $s | wc -l | tr -d ' ')
  echo "$1 · position-visibility declarations in src (comments excluded) $pv · @property --veil-x/--veil-y $vr · var(--veil-x|y) readers $vu · the stage's anchor pin (anchor-name/position-anchor writes, anchor()/anchor-size() in engage-stage.css) $an · the pass-7 deletion names $e7 · verdict $([[ $((pv+vr+vu+an+e7)) == 0 ]] && echo 'DELETED' || echo 'PRESENT')"
}
cell "candidate P-E8 ($(shasum $P/pass-8/P-E8.patch | cut -c1-8))" $P/pass-8/P-E8.patch
cell "plant: the pass-7 candidate P-E7 ($(shasum $P/pass-7/P-E7.patch | cut -c1-8))" $P/pass-7/P-E7.patch
rm -rf $S/t
