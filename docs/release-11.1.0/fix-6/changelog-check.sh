#!/usr/bin/env bash
# The CHANGELOG half of fix 6: the 11.1.0 entry tells a consumer that --dock-icon-hover-bg
# takes a colour and what to do with `active` on a glyph nav control, and carries no
# internal vocabulary.   changelog-check.sh <CHANGELOG.md>
E=$(awk '/^## 11\.1\.0/{on=1;next} /^## /{if(on)exit} on' "$1")
ok=1
grep -q 'dock-icon-hover-bg' <<<"$E" && grep -q 'give it a colour' <<<"$E" || { echo "FAIL hover token: no colour sentence"; ok=0; }
grep -q 'no longer need it' <<<"$E" || { echo "FAIL active on a glyph nav control: no advice"; ok=0; }
grep -q 'hover, press and `active` fills' <<<"$E" || { echo "FAIL headline: active fill not named"; ok=0; }
grep -qE 'O-[0-9]{3}|W-[A-Z]\.[0-9]|\b(lane|tranche|seat|critic|witness)\b|docs/tranches' <<<"$E" && { echo "FAIL internal vocabulary"; ok=0; }
[ $ok = 1 ] && echo PASS || echo FAIL
