#!/usr/bin/env bash
# Fix seat 13: the pixel floor's three legs as release.sh runs them, on one tree, each
# through its own guarded call, with the tree's own dev server on the port given.
#   floor.sh <tree> <port> <tag> [legs...]   legs: green planted flood (default all three)
# Each leg's log and its report land in fix-13/logs/<tag>-<leg>.*; run lines in runs.out.
set -u
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-13/logs
G=~/.claude/guard/guarded
T=$1; P=$2; TAG=$3; shift 3
legs=("$@"); [[ ${#legs[@]} -eq 0 ]] && legs=(green planted flood)
mkdir -p "$L"
for leg in "${legs[@]}"; do
  case $leg in
    green) script=gate:pixel-floor; report=pi-report-green.json ;;
    planted) script=gate:pixel-floor:planted; report=pi-report-planted.json ;;
    flood) script=gate:pixel-floor:planted:flood; report=pi-report-flood.json ;;
    *) echo "leg?"; exit 2 ;;
  esac
  s=$(date +%s); l0=$(sysctl -n vm.loadavg)
  (cd "$T" && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P \
    "$G" --timeout 30 -- npm -w tests-visual run "$script") > "$L/$TAG-$leg.log" 2>&1
  rc=$?
  cp "$T/tests-visual/.cache/$report" "$L/$TAG-$leg.json" 2>/dev/null
  echo "$(date +%T) $TAG $leg exit $rc $(( $(date +%s) - s ))s load $l0 -> $(sysctl -n vm.loadavg) $(grep -m1 -E 'pixel-floor gate|PLANTED|REFUSED' "$L/$TAG-$leg.log")" >> "$L/runs.out"
  grep -q '^\[guarded\] REFUSED' "$L/$TAG-$leg.log" && exit 75
done
exit 0
