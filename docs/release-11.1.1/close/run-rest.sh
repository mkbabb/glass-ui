#!/bin/bash
# The 11.1.1 close: the rest of the visual suite on the full tree of HEAD, Chromium's chunks first and
# their branch-only titles resolved, then coarse-touch's, then theirs. One guarded step at a time.
C=$(cd "$(dirname "$0")" && pwd); B=$C/../../release-11.1.0/close/suite
export ROOT=$(cd $C/../../../.cache/close-full/head/tree && pwd)
echo "$(date '+%F %T') run-rest start; $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+')" >> $C/run.log
zsh $C/scripts/queue.sh ch-part-ad ch-part-ag ch-part-ah ch-part-ai ch-part-aj ch-part-ak ch-part-al || exit $?
python3 -I $C/scripts/branch-only.py $B/chromium-headless-new-failed-titles.txt $C/suite/ch-part-a{a,b,c,e,f}.json $C/suite/ch-part-a{d,g,h,i,j,k,l}.json --minus-pass $C/suite/ch-env.json > $C/suite/ch-branch-only.txt
echo "$(date '+%F %T') ch chunks done: $(wc -l < $C/suite/ch-branch-only.txt | tr -d ' ') branch-only; $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+')" >> $C/run.log
bash $C/scripts/resolve.sh ch $C/suite/ch-branch-only.txt || exit $?
zsh $C/scripts/queue.sh co-part-aa co-part-ab co-part-ac co-part-ad co-part-ae co-part-af co-part-ag co-part-ah co-part-ai co-part-aj co-part-ak co-part-al || exit $?
python3 -I $C/scripts/branch-only.py $B/coarse-touch-failed-titles.txt $C/suite/co-part-a?.json > $C/suite/co-branch-only.txt
echo "$(date '+%F %T') co chunks done: $(wc -l < $C/suite/co-branch-only.txt | tr -d ' ') branch-only; $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+')" >> $C/run.log
bash $C/scripts/resolve.sh co $C/suite/co-branch-only.txt || exit $?
echo "$(date '+%F %T') run-rest done; $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+')" >> $C/run.log
