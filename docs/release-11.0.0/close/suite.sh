#!/usr/bin/env bash
# 11.0.0 close — the full visual suite on the committed tree, the shape of the 10.1.4 close's
# suite.sh so the failure sets compare: every top-level tests-visual/*.spec.ts, chromium-headless-new
# and coarse-touch in 25-file chunks, then the webkit project on build 2287 under
# --exclusive webkit. Each chunk its own guarded call; GLASS_UI_DEMO_URL names this run's server.
# usage: suite.sh OUT PORT [FILES]
cd "$(dirname "$0")/../../.."
W=$PWD; O=$1; PORT=$2; FILES=${3:-}
G=$HOME/.claude/guard/guarded
mkdir -p "$O"
export GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://localhost:$PORT
S=$O/summary.txt
dfgate() { local a; a=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}'); [ "$a" -ge 6 ] || { echo "DISK STOP before $1 (${a}G)" >> "$S"; exit 9; }; }
cd "$W/tests-visual"
if [ -z "$FILES" ]; then ls *.spec.ts | sort > "$O/files.txt"; else cp "$FILES" "$O/files.txt"; fi
( cd "$O" && rm -f chunk-?? && split -l 25 files.txt chunk- )
for proj in ${PROJECTS:-chromium-headless-new coarse-touch}; do
  for f in "$O"/chunk-??; do
    [ -s "$f" ] || continue
    n=$proj-$(basename "$f")
    [ -f "$O/$n.json" ] && continue
    dfgate "$n"
    PI_REPORT="$O/$n.json" "$G" --timeout 85 -- npx playwright test --project=$proj --workers=1 $(cat "$f" | tr '\n' ' ') > "$O/$n.log" 2>&1
    echo "$n rc=$? $(date +%T) $(tail -12 "$O/$n.log" | grep -E '^ +[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' | tr -s ' ' | tr '\n' ' ')" >> "$S"
    rm -rf "$W/tests-visual/test-results"
  done
done
WKF=$(grep -E '^(safari-webgl|aurora-swraster|release-10-1-[0-9])\.spec\.ts$' "$O/files.txt" | tr '\n' ' ')
if [ -n "$WKF" ] && [ -z "$SKIP_WEBKIT" ] && [ ! -f "$O/webkit.json" ]; then
  dfgate webkit
  PI_REPORT="$O/webkit.json" "$G" --exclusive webkit --timeout 85 -- npx playwright test -c webkit-2287.config.ts --project=webkit --workers=1 $WKF > "$O/webkit.log" 2>&1
  echo "webkit rc=$? $(date +%T) $(tail -12 "$O/webkit.log" | grep -E '^ +[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' | tr -s ' ' | tr '\n' ' ')" >> "$S"
  rm -rf "$W/tests-visual/test-results"
fi
echo DONE >> "$S"
