# common.sh: sourced by the ninth pass's source-seat item scripts (s9/sN.sh), run from the harness directory inside
# s9/dev9.sh (the item's tree served on $PORT). probes <out> <engine> <scenario...>; pw <name> <engine> <project...> -- <spec...>
# (one G-14 run in .s9-cand against the item's dev server); plant <name> apply|revert (s9/plant9s.py on .s9-cand).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; T=$W/.s9-cand; L=../logs; PORT=${PORT:-5454}
probes() { out="$1"; e="$2"; shift 2; for sc in "$@"; do node probe.mjs "$W" dock-wi8 "$sc" --port "$PORT" --engine "$e" --out "../rows/$out" --no-strip >> "$L/s9-probe-$out.log" 2>&1; done; }
pw() { name="$1"; e="$2"; shift 2; projs=""; while [ "$1" != "--" ]; do projs="$projs --project=$1"; shift; done; shift
  cfg=playwright.config.ts; [ "$e" = webkit ] && cfg=${CFGWK:-release-11-0-1.config.ts}
  (cd "$T" && GLASS_UI_DEMO_PORT=$PORT GLASS_UI_DEMO_URL=http://127.0.0.1:$PORT npx playwright test -c tests-visual/$cfg "$@" $projs --workers=1 --reporter=list > "$OLDPWD/$L/s9-g14-$name-$e.log" 2>&1); echo "pw $name $e rc=$?"; }
plant() { python3 s9/plant9s.py "$T" "$1" "$2"; sleep 3; }
