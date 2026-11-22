#!/bin/bash
# Critic 12, after chain.sh: the release-10-1-5 critic and fix specs (32 files, never run by
# critics 8 to 11) in WebKit 2287 on the tip, then the files with a failing title on v11.1.0,
# one heavy run at a time, each through the run guard.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-12; L=$D/logs
until grep -q "CHAIN-DONE" $L/runs.out; do sleep 30; done
echo "CHAIN2-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
bash $D/r1015/run.sh tip r1015-tip-wk
files=$(python3 - "$L/r1015-tip-wk.json" <<'EOF'
import json, sys
r = json.load(open(sys.argv[1])); bad = set()
def walk(s, f=None):
    f = s.get("file", f)
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            if t["results"] and t["results"][-1]["status"] not in ("passed", "skipped"):
                bad.add(sp.get("file", f))
    for c in s.get("suites", []): walk(c, f)
for s in r["suites"]: walk(s)
print(" ".join(sorted(b.split("/")[-1] for b in bad if b)))
EOF
)
echo "$(date +%T) r1015 failing files on the tip: ${files:-none}" >> $L/runs.out
if [ -n "$files" ]; then bash $D/r1015/run.sh red r1015-red-wk $files; fi
echo "CHAIN2-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
