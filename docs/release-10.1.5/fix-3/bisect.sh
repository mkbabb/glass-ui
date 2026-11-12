#!/bin/zsh
# fix round 3 bisect of the WebKit 10.1.3 D-1 bottom-anchored zoom cell: (v) no vertical
# spacer rules, (o) the round-2 useDockRun.ts, (h) HEAD. Files restored to HEAD on exit.
set -u
cd ${0:A:h:h:h:h}
L=docs/release-10.1.5/fix-3
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5247}
CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
restore() { git checkout HEAD -- src/components/dock/styles/run.css src/components/dock/composables/useDockRun.ts; }
trap restore EXIT INT TERM
d1() { npx playwright test $CFG release-10-1-3.spec.ts --grep "bottom-anchored · ancestor zoom 1.25 .*D-1" --repeat-each=2 --workers=1 > $L/bisect-$1.log 2>&1; echo "$1 $(grep -E '^\s+[0-9]+ (passed|failed)' $L/bisect-$1.log | tr -s ' ' | tr '\n' ' ') $(grep -m1 Received $L/bisect-$1.log)" >> $L/bisect.txt; }
: > $L/bisect.txt
python3 - <<'PY'
import re
p='src/components/dock/styles/run.css'
s=open(p).read()
a=s.index('    .glass-dock.vertical .dock-run:has(> *) {')
b=s.index('margin-block-start: calc(-1 * var(--dock-run-gap));\n    }\n', a)+len('margin-block-start: calc(-1 * var(--dock-run-gap));\n    }\n')
open(p,'w').write(s[:a]+s[b:])
PY
d1 v
restore
git show cc7ea13b3:src/components/dock/composables/useDockRun.ts > src/components/dock/composables/useDockRun.ts
d1 o
restore
d1 h
echo bisect done >> $L/bisect.txt
