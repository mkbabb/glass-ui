# g14q8.py <stage-dir> <prefix> <tag> <ref> <tree-dir> <port> [specs...]: the eighth pass's source seat, G-14 as
# s8/spool8.py items (m7/g14q.py's method: one spec per run per engine, Chromium's two projects and WebKit 2287,
# --workers=1), run in a `git archive` tree of <ref> (s8/tree8.sh) on its own port, so a reading is of the ref.
# WebKit: release-10-1-1 and -10-1-2 on webkit-2287.config.ts, -10-1-3 to -11-0-1 on release-11-0-1.config.ts, -11-0-2
# on its own config, ro-loop on ro-loop.config.ts with RO_LOOP_WEBKIT=1. Items are named <prefix>-NN-...; logs are
# logs/s8-g14-<tag>-<engine>-<spec>.log.
import os, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
st, pre, tag, ref, tree, port = sys.argv[1:7]
SPECS = sys.argv[7:] or ["release-10-1-1", "release-10-1-2", "release-10-1-3", "release-10-1-4", "release-10-1-5", "release-11-0-1", "release-11-0-2", "ro-loop"]
os.makedirs(st, exist_ok=True)
n = 0
def item(name, line):
    global n
    n += 1
    open(f"{st}/{pre}-{n:02d}-{name}.item", "w").write(line + "\n")
item("tree", f"light 15 - {H}/s8/tree8.sh {ref} {tree}")
for s in SPECS:
    log = f"../logs/s8-g14-{tag}-chromium-{s}.log"
    item(f"chromium-{s}", f"heavy 80 {log}.done cd {tree} && GLASS_UI_DEMO_PORT={port} npx playwright test -c tests-visual/playwright.config.ts {s}.spec.ts --project=chromium-headless-new --project=coarse-touch --workers=1 --reporter=list > {H}/{log} 2>&1; echo rc=$? >> {H}/{log}; grep -q ' passed\\| failed\\| flaky' {H}/{log} && echo read > {H}/{log}.done")
for s in SPECS:
    cfg = {"release-10-1-1": "webkit-2287", "release-10-1-2": "webkit-2287", "release-11-0-2": "release-11-0-2", "ro-loop": "ro-loop"}.get(s, "release-11-0-1")
    env = "RO_LOOP_WEBKIT=1 " if s == "ro-loop" else ""
    log = f"../logs/s8-g14-{tag}-webkit-{s}.log"
    item(f"webkit-{s}", f"webkit 60 {log}.done cd {tree} && {env}GLASS_UI_DEMO_PORT={port} npx playwright test -c tests-visual/{cfg}.config.ts {s}.spec.ts --project=webkit --workers=1 --reporter=list > {H}/{log} 2>&1; echo rc=$? >> {H}/{log}; grep -q ' passed\\| failed\\| flaky' {H}/{log} && echo read > {H}/{log}.done")
print(n, "items")
