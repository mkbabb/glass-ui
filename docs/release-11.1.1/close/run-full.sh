#!/bin/bash
# The 11.1.1 close: the visual suite's rest on the full git-archive tree of HEAD
# (.cache/close-full/head/tree): the worktree chunks' branch-only titles again (ch-env), then the
# chunks not yet run there, one guarded step at a time.
C=$(cd "$(dirname "$0")" && pwd); G=~/.claude/guard/guarded
export ROOT=$C/../../../.cache/close-full/head/tree
ROOT=$(cd "$ROOT" && pwd); export ROOT
echo "$(date '+%F %T') full-tree suite start; $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+')" >> $C/run.log
$G --timeout 60 -- zsh $C/scripts/suite.sh ch-env 5353 tests-visual/playwright.config.ts chromium-headless-new $C/lists/ch-env -g "$(cat $C/lists/ch-env.grep)" > $C/suite/ch-env.guard.log 2>&1
echo "$(date '+%F %T') ch-env guard-rc=$? $(grep -m1 -E '^\[guarded\] REFUSED' $C/suite/ch-env.guard.log)" | tee -a $C/suite/queue.txt
grep -qE '^\[guarded\] REFUSED' $C/suite/ch-env.guard.log && exit 3
zsh $C/scripts/queue.sh ch-part-ad ch-part-ag ch-part-ah ch-part-ai ch-part-aj ch-part-ak ch-part-al co-part-aa co-part-ab co-part-ac co-part-ad co-part-ae co-part-af co-part-ag co-part-ah co-part-ai co-part-aj co-part-ak co-part-al
echo "$(date '+%F %T') full-tree suite exit $?; $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+')" >> $C/run.log
