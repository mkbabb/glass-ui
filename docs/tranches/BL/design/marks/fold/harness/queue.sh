#!/usr/bin/env bash
# The fold seat's runs, in order. One guarded run per Chromium probe; the two WebKit probes share one
# guarded run (one wait on the machine-wide lock), each with its own browser. Exit codes land in log-queue.txt.
HERE=$(cd "$(dirname "$0")" && pwd); O=$(cd "$HERE/../out" && pwd)
G=~/.claude/guard/guarded
FINAL="sel,fold,comp,clipped,late,far"; BITE="comp,clipped,late"; BV="half,noinline,nolh,nofontland,cloneall,noinert"
"$G" --timeout 30 -- "$HERE/run.sh" 7951 chromium "$O" "$FINAL" final "" > "$O/log-chromium-final.txt" 2>&1
echo "$(date +%H:%M:%S) chromium final exit $?" >> "$O/log-queue.txt"
"$G" --timeout 30 -- "$HERE/run.sh" 7951 chromium "$O" "$BITE" bite "$BV" > "$O/log-chromium-bite.txt" 2>&1
echo "$(date +%H:%M:%S) chromium bite ($BV) exit $?" >> "$O/log-queue.txt"
"$G" --timeout 30 -- "$HERE/run.sh" 7951 chromium "$O" "comp" bite2 "nous" > "$O/log-chromium-bite2.txt" 2>&1
echo "$(date +%H:%M:%S) chromium bite2 (nous) exit $?" >> "$O/log-queue.txt"
"$G" --timeout 45 --exclusive webkit -- bash -c "'$HERE/run.sh' 7951 webkit '$O' '$FINAL' final ''; a=\$?; '$HERE/run.sh' 7951 webkit '$O' '$BITE' bite '$BV'; b=\$?; '$HERE/run.sh' 7951 webkit '$O' comp bite2 nous; c=\$?; echo final=\$a bite=\$b bite2=\$c; exit \$((a+b+c))" > "$O/log-webkit.txt" 2>&1
echo "$(date +%H:%M:%S) webkit final, bite, bite2 exit $? ($(tail -1 "$O/log-webkit.txt"))" >> "$O/log-queue.txt"
echo done >> "$O/log-queue.txt"
