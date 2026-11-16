#!/bin/zsh
# 11.1.0 close A/B: run spec files on a `git archive <ref>` tree inside the worktree (.cache/close-ab/<label>),
# on its own demo server, then delete the tree. node_modules is a real directory of per-entry symlinks into
# the main checkout's, so vite's dep cache stays in the tree (the v11.0.0 baseline's arrangement).
#   ~/.claude/guard/guarded --timeout N -- zsh ab.sh <label> <ref> <port> <project> <spec files...>
set -u
C=${0:A:h:h}; WT=${C:h:h:h}; L=$C/suite/ab; NM=/Users/mkbabb/Programming/glass-ui/node_modules
LABEL=$1; REF=$2; PORT=$3; PROJ=$4; shift 4
T=$WT/.cache/close-ab/$LABEL
mkdir -p $L; rm -rf $T; mkdir -p $T/node_modules/@mkbabb
git -C $WT archive $REF | tar -x -C $T
for e in $NM/*(N) $NM/.bin(N); do [[ ${e:t} = @mkbabb || ${e:t} = .vite ]] && continue; ln -s $e $T/node_modules/${e:t}; done
for e in $NM/@mkbabb/*(N); do [[ ${e:t} = glass-ui-tests-visual ]] && continue; ln -s $e $T/node_modules/@mkbabb/${e:t}; done
ln -s ../../tests-visual $T/node_modules/@mkbabb/glass-ui-tests-visual
cd $T
FILES=(); for f in $@; do FILES+=("tests-visual/$f"); done
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT PI_REPORT=$L/$LABEL.json
echo "$(date '+%F %T') $LABEL ($REF $(git -C $WT rev-parse --short $REF)) start proj=$PROJ files=${#FILES}" | tee -a $L/runs.txt
npx playwright test -c tests-visual/playwright.config.ts --project=$PROJ --workers=1 $FILES > $L/$LABEL.log 2>&1
rc=$?
echo "$(date '+%F %T') $LABEL rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$LABEL.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
cd $WT; rm -rf $T
exit $rc
