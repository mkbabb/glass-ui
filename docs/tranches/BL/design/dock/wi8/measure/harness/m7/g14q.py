# g14q.py <out-queue> <tag>: MEASURE-7 step 8, G-14 (m5/g14.sh's six release specs on the worktree, Chromium's two
# projects and WebKit 2287, --workers=1) as m7/runq.py's queue: one spec per run per engine, so the power hold's pauses
# cost one spec. Each run writes logs/m5-g14-<tag>-<part>-<spec>.log; the last item joins them into the three logs
# m6/g14cmp.py reads (m5-g14-<tag>-{chromium,webkit-a,webkit-b}.log) and compares them with master's snapshot.
import os, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
out, tag = sys.argv[1], sys.argv[2]
L = f"{H}/../logs"
SPECS = ["release-10-1-1", "release-10-1-2", "release-10-1-3", "release-10-1-4", "release-10-1-5", "release-11-0-1"]
q = []
for s in SPECS:
    log = f"{L}/m5-g14-{tag}-chromium-{s}.log"
    q.append(f"none heavy 80 ../logs/m5-g14-{tag}-chromium-{s}.log.done cd {W} && GLASS_UI_DEMO_PORT=5413 npx playwright test -c tests-visual/playwright.config.ts {s}.spec.ts --project=chromium-headless-new --project=coarse-touch --workers=1 --reporter=list > {log} 2>&1; echo rc=$? >> {log}; grep -q ' passed\\| failed\\| flaky' {log} && echo read > {log}.done")
for s in SPECS:
    part, cfg = ("webkit-a", "tests-visual/webkit-2287.config.ts") if s in ("release-10-1-1", "release-10-1-2") else ("webkit-b", "tests-visual/release-11-0-1.config.ts")
    log = f"{L}/m5-g14-{tag}-{part}-{s}.log"
    q.append(f"none webkit 60 ../logs/m5-g14-{tag}-{part}-{s}.log.done cd {W} && GLASS_UI_DEMO_PORT=5413 npx playwright test -c {cfg} {s}.spec.ts --project=webkit --workers=1 --reporter=list > {log} 2>&1; echo rc=$? >> {log}; grep -q ' passed\\| failed\\| flaky' {log} && echo read > {log}.done")
q.append(f"none light 5 - cd {L} && for p in chromium webkit-a webkit-b; do cat m5-g14-{tag}-$p-release-*.log > m5-g14-{tag}-$p.log 2>/dev/null; done; python3 {H}/m6/g14cmp.py {L} {tag} > {L}/{tag}-g14cmp.txt 2>&1")
open(out, "w").write(f"# MEASURE-7 step 8, G-14 in three projects (m7/g14q.py, tag {tag})\n" + "\n".join(q) + "\n")
print(len(q), "items")
