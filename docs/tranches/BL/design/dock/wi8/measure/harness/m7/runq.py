# runq.py <queue-file> <log>: MEASURE-7, a queue of small guarded runs that survives the glass-ui session's power hold
# (docs/tranches/BL/driver/power-hold.py pauses this seat's runs while the battery falls and lets them go at 80 % and
# rising; a guarded run paused past its timeout is killed on resume). Each queue line is
#     <server> <engine> <minutes> <done> <command...>
# server: dev (the worktree's dev server, m6/devserve.sh on 5402, this seat's pages copied in), preview (the pass's
# build, vite preview of dist-wi8 on 5401) or none; engine: chromium, webkit (run under `--exclusive webkit`), gpu
# (Chromium with `--cpu-cores 0`), light, or raw (a script that guards its own runs, not wrapped); done: a path relative to the harness directory that exists, non-empty, once
# the item is read (a JSON log with "cells": [] or "summary": {"cells": 0} counts as not read), or `-` (always run).
# An item not read after its run is run again, up to six times (a run paused past its timeout is killed on resume). The server is started when an item needs it and is
# not answering, under its own guarded run, and stopped at the end. Every run, retry and skip is logged with the load.
import json, os, subprocess, sys, time, glob
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
G = os.path.expanduser("~/.claude/guard/guarded")
APP = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/animation/harness/app"
qf, logf = sys.argv[1], sys.argv[2]
def log(s):
    with open(logf, "a") as f: f.write(f"{time.strftime('%H:%M:%S')} {s} (load {os.getloadavg()[0]:.1f})\n")
def up(port):
    return subprocess.run(["curl", "-sf", "-o", "/dev/null", "-m", "5", f"http://127.0.0.1:{port}/"]).returncode == 0
def pages():
    subprocess.run(["bash", "-c", f'''rm -rf "{W}/demo/__anim"; mkdir -p "{W}/demo/__anim/mounts/comp"; cp -R "{APP}/." "{W}/demo/__anim/"
cp "{H}/m6/comp/"*.vue "{H}/m7/comp/"*.vue "{W}/demo/__anim/mounts/comp/"; cp "{H}/m6/dock-comp.vue" "{W}/demo/__anim/mounts/dock-comp.vue"; cp "{H}/dock-wi8.vue" "{W}/demo/__anim/mounts/dock-wi8.vue"
sed -i '' 's|    dock: {{ mount: "hand" }},|    dock: {{ mount: "hand" }},\\n    "dock-comp": {{ mount: "hand" }},\\n    "dock-wi8": {{ mount: "hand" }},|' "{W}/demo/__anim/registry.ts"'''])
servers = {}
def ensure(kind):
    if kind == "none": return True
    port = 5402 if kind == "dev" else 5401
    if up(port): return True
    p = servers.get(kind)
    if p and p.poll() is None: p.terminate(); time.sleep(2)
    if kind == "dev":
        cmd = [G, "--light", "--timeout", "88", "--", f"{H}/m6/devserve.sh", "5402", "86"]
    else:
        cmd = [G, "--light", "--timeout", "88", "--", "bash", "-c", f'cd "{W}" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-wi8 --host 127.0.0.1 --port 5401 --strictPort']
    servers[kind] = subprocess.Popen(cmd, cwd=H, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
    for _ in range(300):
        if up(port): break
        time.sleep(2)
    ok = up(port)
    log(f"server {kind} {'up' if ok else 'DID NOT START'}")
    if ok and kind == "dev":
        # the dev server compiles a page on its first request; warm the three pages once
        for u in ("?c=dock-wi8&cell=w-pill", "?c=dock-comp&page=nav&ground=field", "?c=dock-comp&page=loose&ground=field"):
            subprocess.run(["curl", "-sf", "-o", "/dev/null", "-m", "60", f"http://127.0.0.1:{port}/{u}"])
    return ok
def read(done):
    if done == "-": return False
    fs = glob.glob(os.path.join(H, done))
    if not fs: return False
    for f in fs:
        if os.path.getsize(f) == 0: return False
        if f.endswith(".json"):
            try:
                d = json.load(open(f))
            except Exception:
                return False
            if isinstance(d, dict) and (d.get("cells") == [] or (isinstance(d.get("summary"), dict) and d["summary"].get("cells") == 0)): return False
    return True
items = []
for line in open(qf):
    line = line.strip()
    if not line or line.startswith("#"): continue
    srv, eng, mins, done, cmd = line.split(None, 4)
    items.append((srv, eng, mins, done, cmd))
if any(i[0] == "dev" for i in items): pages()
log(f"queue {qf}: {len(items)} items")
for srv, eng, mins, done, cmd in items:
    if read(done):
        log(f"skip (read) {done}"); continue
    for attempt in range(1, 7):
        if not ensure(srv):
            time.sleep(30); continue
        flags = {"webkit": ["--exclusive", "webkit"], "gpu": ["--cpu-cores", "0"], "light": ["--light"]}.get(eng, [])
        log(f"run {attempt} [{eng}] {cmd[:150]}")
        # raw: a script that runs its own heavy steps under the guard (g14plantrun7.sh, g16.sh), so it is not wrapped again
        argv = ["sh", "-c", cmd] if eng == "raw" else [G, *flags, "--timeout", mins, "--", "sh", "-c", cmd]
        r = subprocess.run(argv, cwd=H, env={**os.environ, "PORT": "5402" if srv == "dev" else "5401"})
        if read(done) or done == "-":
            log(f"read rc={r.returncode} {done}"); break
        log(f"NOT READ rc={r.returncode} {done}")
for k, p in servers.items():
    if p.poll() is None:
        p.terminate()
        try: p.wait(20)
        except subprocess.TimeoutExpired: p.kill()
time.sleep(3)
log("queue done")
