#!/usr/bin/env bash
# Fix 7: the CHANGELOG half of critique 6's finding 3 (a bordered --dock-active-* treatment) and
# the merge's corner record, read from the 11.1.0 entry of <CHANGELOG.md>.
#   changelog-check.sh <CHANGELOG.md>
set -u
E=$(awk '/^## 11\.1\.0/{on=1;next} /^## /{if(on)exit} on' "$1" | tr '\n' ' ' | tr -s ' ')
ok=1
chk() { if echo "$E" | grep -qE -e "$2"; then echo "PASS $1"; else echo "FAIL $1"; ok=0; fi; }
nochk() { if echo "$E" | grep -qE -e "$2"; then echo "FAIL $1"; ok=0; else echo "PASS $1"; fi; }
chk "a bordered active treatment: border and shadow stay at the edge, the fill inset" 'border and shadow stay at the control.s edge while the fill sits inset'
chk "and how to bring them together" '--dock-icon-padding: 0'
chk "a control with its own dir keeps the plate" 'carries a `dir` of its own'
chk "--radius-dock sets the corner, with the bar restore" '`--radius-dock` sets the dock.s corner again.*--radius-dock: 1rem'
nochk "no internal vocabulary" '\bO-[0-9]{3}\b|\bW-[A-Z]\.[0-9]|\blane\b|\btranche\b|\bcritic\b|\bwave\b'
[ $ok = 1 ] && echo "VERDICT PASS" || echo "VERDICT FAIL"
