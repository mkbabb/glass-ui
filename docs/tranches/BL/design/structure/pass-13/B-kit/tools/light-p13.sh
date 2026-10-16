#!/usr/bin/env bash
# light-p13.sh <built route tree (r1)> <floor-base tree> — pass 13's light measurements, run when no battery is planting
# into the route tree:
#   wd1         W-D.1 §0's five items (tools/wd1/measure.mjs) on r1, built        -> results/p13/wd1-measure.txt
#   chain-text  W-C.2 over the chain's MIGRATION text (tools/wc2/chain-text.mjs)   -> results/p13/chain-text.txt
#   frozen      the frozen-kit proof (REGISTRY §P12-6.2 step 2): diff -r pass-12/B-kit pass-13/B-kit with results/ and
#               the run and measurement scripts excluded, so the only lines are the results-path re-pointing (printed
#               again by tools/repointed/RESULTS-PATHS-p13.txt); then a sha256 per file of lib/, gate/, frozen/,
#               authored/, derive/, LAW.md and the four judges on both kits, and the floor's git status
#                                                                                   -> results/p13/frozen-kit.txt
set -u
T="$1"; BASE="$2"; HERE="$(cd "$(dirname "$0")" && pwd)"; KIT="$(dirname "$HERE")"; R="$KIT/results/p13"; ST="$KIT/../.."
{ echo "load $(sysctl -n vm.loadavg)"; node "$HERE/wd1/measure.mjs" --root "$T"; echo "wd1 rc=$?"; } > "$R/wd1-measure.txt" 2>&1
{ echo "load $(sysctl -n vm.loadavg)"; node "$HERE/wc2/chain-text.mjs" --base "$BASE" --route "$T"; echo "chain-text rc=$?"; } > "$R/chain-text.txt" 2>&1
{
echo "frozen-kit proof $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
echo "== diff -r pass-12/B-kit pass-13/B-kit (results/, the run scripts replays/heavy/batteries/browser-p1{2,3}.sh, light-p13.sh and floor-premise.mjs excluded)"
(cd "$ST" && diff -r -x results -x 'replays-p1[23].sh' -x 'heavy-p1[23].sh' -x 'batteries-p1[23].sh' -x 'browser-p1[23].sh' -x light-p13.sh -x floor-premise.mjs -x RESULTS-PATHS-p13.txt pass-12/B-kit pass-13/B-kit); echo "diff rc=$?"
echo "== sha256 of every file of the frozen parts, pass 12 vs pass 13"
n=0; d=0
for p in lib gate frozen authored derive LAW.md replay.mjs apply-row.mjs rebase.mjs record-step.mjs truncate-seq.mjs tools/browser-tally.mjs tools/rekey.mjs tools/browser-select.mjs tools/peer-closure.mjs; do
  while IFS= read -r f; do n=$((n+1)); a=$(shasum -a 256 "$ST/pass-12/B-kit/$f" | cut -c1-64); b=$(shasum -a 256 "$ST/pass-13/B-kit/$f" 2>/dev/null | cut -c1-64)
    [ "$a" = "$b" ] || { d=$((d+1)); echo "DIFFERS $f"; }; done < <(cd "$ST/pass-12/B-kit" && find "$p" -type f | sort)
done
echo "frozen parts: $n files, $d differ"
echo "== the floor (structure/floor) against HEAD: git status and git diff, the checkout"
git -C "$ST" status --porcelain -- floor | head; echo "floor status lines: $(git -C "$ST" status --porcelain -- floor | wc -l | tr -d ' ')"
git -C "$ST" diff --stat HEAD -- floor pass-12 | tail -3; echo "floor + pass-12 diff lines: $(git -C "$ST" diff HEAD -- floor pass-12 | wc -l | tr -d ' ')"
} > "$R/frozen-kit.txt" 2>&1
