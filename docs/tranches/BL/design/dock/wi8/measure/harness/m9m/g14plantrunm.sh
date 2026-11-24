#!/usr/bin/env bash
# g14plantrunm.sh <plant>: MEASURE-9 part M, a G-14 counter-test in four projects (pm/g14plantrun.sh's frame). The plant
# (m9m/plantm.py: G-14's nine restated groups as g14-<group>, and the ninth's plants on restated tests) is applied to the
# measure's tree of the ninth tip (.m9m-tip) only; its release sites run against the tree's own dev server (the configs'
# webServer, port 5484, which reads the tree's src live): Chromium's two projects (chromium-headless-new, coarse-touch) in
# one run, WebKit 2287's two (webkit, webkit-touch) by each spec's config under `--exclusive webkit`; then reverted (also on
# exit) and the tree's src checked against HEAD. Sites are the eighth's at the tip's line numbers (H4's restatements moved
# release-10-1-3's by 5 and release-10-1-2's O-101 and O-101a cells), or a spec with a -g title. A plant bites in a project
# when a site fails under it and passes on the tip's own G-14 run (logs/m9m-g14-tip-*). Log: logs/m9m-g14plant-<plant>.log.
# After the reboot (2026-11-23), as m9m/plantrunm.sh: G14P_ENGINES=chromium (the runner's item; log as above) and
# G14P_ENGINES=webkit inside m9m/wkbatch.py, which holds the WebKit lock and sets WK_HELD=1, so the WebKit runs go
# through `guarded` without `--exclusive webkit` (log logs/m9m-g14plant-<plant>.webkit.log). Unset, both run as before.
# A plant a killed run left applied is reverted and logged before this one is applied.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.m9m-tip; G=~/.claude/guard/guarded
p="$1"; ENGINES="${G14P_ENGINES:-chromium webkit}"; PL="$H/m9m/plantm.py"
if [ "$ENGINES" = webkit ]; then log="$L/m9m-g14plant-$p.webkit.log"; else log="$L/m9m-g14plant-$p.log"; fi; tmp="$log.part"
has() { case " $ENGINES " in *" $1 "*) return 0;; esac; return 1; }
WX="--exclusive webkit"; [ "${WK_HELD:-0}" = 1 ] && WX=""
# sites: "<spec> [<spec:line>...]" lines; GREP: a title pattern for the whole selection
GREP=""
case "$p" in
  g14-corner|g2-curve) S="release-10-1-5.spec.ts:217 release-10-1-5.spec.ts:294 release-10-1-5.spec.ts:318 release-10-1-5.spec.ts:336 release-10-1-5.spec.ts:999 release-11-0-1.spec.ts:105 release-11-0-1.spec.ts:115 release-11-0-1.spec.ts:126 release-11-0-1.spec.ts:142";;
  g14-clock) S="release-10-1-3.spec.ts:167 release-10-1-3.spec.ts:390 release-10-1-3.spec.ts:947";;
  g14-lane) S="release-10-1-3.spec.ts:612 release-10-1-3.spec.ts:648";;
  g14-lane-1501|g2-nocut) S="release-11-0-2.spec.ts"; GREP="content stays inside the plate and fades";;
  g14-reserve|stale-target) S="release-10-1-2.spec.ts:488 release-10-1-2.spec.ts:564";;
  g14-touch) S="release-10-1-1.spec.ts:137 release-10-1-1.spec.ts:156 release-10-1-1.spec.ts:186";;
  g14-press) S="release-10-1-5.spec.ts:1617";;
  g14-cap) S="release-10-1-5.spec.ts:2603 release-10-1-5.spec.ts:1424";;
  g14-fits) S="release-10-1-5.spec.ts:732 release-10-1-5.spec.ts:1228 release-10-1-5.spec.ts:1453";;
  g14-zoom) S="release-10-1-3.spec.ts:947";;
  s4-press2) S="release-11-0-2.spec.ts"; GREP="fill · in dark";;
  s4-hover8) S="release-11-0-2.spec.ts"; GREP="light scheme";;
  s6-empty) S="release-11-0-2.spec.ts"; GREP="rail ·";;
  *) echo "unknown $p"; exit 2;;
esac
PLANT="$p"; [ "$p" = g14-lane-1501 ] && PLANT=g14-lane
revert() { if [ -d "$T/.s9-orig/$PLANT" ]; then python3 "$PL" "$T" "$PLANT" revert >> "$tmp" 2>&1; fi; }
trap revert EXIT INT TERM
echo "== $p ($PLANT) [$ENGINES] $(date '+%F %T') (load $(sysctl -n vm.loadavg))" > "$tmp"
for d in "$T"/.s9-orig/*; do [ -d "$d" ] || continue; echo "-- a plant left applied: $(basename "$d"), reverted" >> "$tmp"; python3 "$PL" "$T" "$(basename "$d")" revert >> "$tmp" 2>&1; done
python3 "$PL" "$T" "$PLANT" apply >> "$tmp" 2>&1 || { echo "apply failed" >> "$tmp"; mv "$tmp" "$log"; exit 0; }
A=""; B=""; C=""
for s in $S; do case "$s" in release-10-1-1*|release-10-1-2*) A="$A $s";; release-11-0-2*) C="$C $s";; *) B="$B $s";; esac; done
g() { [ -n "$GREP" ] && printf -- '-g\n%s\n' "$GREP"; }
run() { # <label> <guard flags> <config> <projects> <sites>
  local lab="$1" fl="$2" cfg="$3" pr="$4"; shift 4
  echo "-- $lab $(date '+%T') (load $(sysctl -n vm.loadavg))" >> "$tmp"
  if [ -n "$GREP" ]; then (cd "$T" && GLASS_UI_DEMO_PORT=5484 $G $fl --timeout 45 -- npx playwright test -c tests-visual/$cfg $* -g "$GREP" $pr --workers=1 --reporter=list) >> "$tmp" 2>&1
  else (cd "$T" && GLASS_UI_DEMO_PORT=5484 $G $fl --timeout 45 -- npx playwright test -c tests-visual/$cfg $* $pr --workers=1 --reporter=list) >> "$tmp" 2>&1; fi
  local rc=$?; echo "$lab rc=$rc" >> "$tmp"; [ $rc = 75 ] && { echo "guard REFUSED" >> "$tmp"; revert; mv "$tmp" "$log"; exit 75; }
}
has chromium && run chromium "" playwright.config.ts "--project=chromium-headless-new --project=coarse-touch" $S
if has webkit; then
[ -n "$A" ] && run webkit-a "$WX" webkit-2287.config.ts "--project=webkit --project=webkit-touch" $A
[ -n "$B" ] && run webkit-b "$WX" release-11-0-1.config.ts "--project=webkit --project=webkit-touch" $B
[ -n "$C" ] && run webkit-c "$WX" release-11-0-2.config.ts "--project=webkit --project=webkit-touch" $C
fi
revert
python3 "$H/pm/clean.py" "$T" >> "$tmp" 2>&1 || { echo "TREE NOT CLEAN after $p" >> "$tmp"; mv "$tmp" "$log"; exit 3; }
echo "== done $(date '+%F %T')" >> "$tmp"; mv "$tmp" "$log"
