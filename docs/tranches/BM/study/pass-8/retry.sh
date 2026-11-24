#!/bin/zsh
# BM pass 8: the owed browser check, retried no more often than every 10 minutes until an hour after the first refusal
# (23:38:13), each attempt logged to retry.log. Stops at the first admission.
cd /Users/mkbabb/Programming/glass-ui
LOG=docs/tranches/BM/study/pass-8/retry.log
n=4
for t in "2026-11-23 00:14:20" "2026-11-23 00:24:30" "2026-11-23 00:34:40"; do
  target=$(date -j -f "%Y-%m-%d %H:%M:%S" "$t" +%s)
  while [ "$(date +%s)" -lt "$target" ]; do sleep 5; done
  out=$(~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/pass-8/check/page-check.mjs 2>&1); rc=$?
  r=$(print -r -- "$out" | grep -m1 REFUSED)
  if [ -n "$r" ]; then
    echo "$(date +%H:%M:%S) attempt $n (pass-8 page-check.mjs, headless Chromium): $r" >> $LOG
  else
    echo "$(date +%H:%M:%S) attempt $n (pass-8 page-check.mjs, headless Chromium): ADMITTED rc=$rc" >> $LOG
    print -r -- "$out" | grep -v WARN | tail -40 > docs/tranches/BM/study/pass-8/check/page-check.out
    break
  fi
  n=$((n+1))
done
tail -3 $LOG
