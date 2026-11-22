#!/bin/zsh
# The 11.1.1 close A/B (the 11.1.0 close's): run spec files on a `git archive <ref>` tree inside the
# worktree (.cache/close-ab/<label>), without docs/tranches (the captures; no spec reads them back),
# on its own demo server, then delete the tree. node_modules is a real directory of per-entry
# symlinks into the worktree's, with the tree's own tests-visual workspace link, so vite's dep
# cache stays in the tree.
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout N -- zsh ab.sh <label> <ref> <port> <config> <project> <spec files...> [-- extra args]
set -u
C=${0:A:h:h}; WT=${C:h:h:h}; L=$C/suite/ab; NM=$WT/node_modules
LABEL=$1; REF=$2; PORT=$3; CFG=$4; PROJ=$5; shift 5
FILES=(); EXTRA=(); side=f
for a in $@; do if [[ $a = -- ]]; then side=x; elif [[ $side = f ]]; then FILES+=("tests-visual/$a"); else EXTRA+=("$a"); fi; done
T=$WT/.cache/close-ab/$LABEL
mkdir -p $L; rm -rf $T; mkdir -p $T/node_modules/@mkbabb
git -C $WT archive $REF -- . ':(exclude)docs/tranches' | tar -x -C $T
for e in $NM/*(N) $NM/.bin(N); do [[ ${e:t} = @mkbabb || ${e:t} = .vite ]] && continue; ln -s $e $T/node_modules/${e:t}; done
for e in $NM/@mkbabb/*(N); do [[ ${e:t} = glass-ui-tests-visual ]] && continue; ln -s $e $T/node_modules/@mkbabb/${e:t}; done
ln -s ../../tests-visual $T/node_modules/@mkbabb/glass-ui-tests-visual
cd $T
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT PI_REPORT=$L/$LABEL.json
echo "$(date '+%F %T') $LABEL ($REF $(git -C $WT rev-parse --short "$REF^{commit}")) start proj=$PROJ files=${#FILES} extra=${EXTRA[*]:-} load=$(sysctl -n vm.loadavg)" | tee -a $L/runs.txt
npx playwright test -c $CFG --project=$PROJ --workers=1 $FILES $EXTRA > $L/$LABEL.log 2>&1
rc=$?
echo "$(date '+%F %T') $LABEL rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$LABEL.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
cd $WT; rm -rf $T
exit $rc
