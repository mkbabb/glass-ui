# runq.py <spool-dir> <log>: MEASURE-8 part M's queue. m8/runq.py's servers and retries with s8/spool8.py's spool: items
# are files dropped into <spool-dir> (lowest name first), so the seat holds one heavy run at a time while it writes the
# next items. Each item holds one line:
#     <server> <engine> <minutes> <done> <command...>
# server: prev (the measure's one build of the tip, vite preview of .pm-tip/dist-pm on 5401), plant (the tip tree's vite
# dev server on 5404 with VITE_DOCK_HOLD=1, which reads the tree's src live, so a plant applied to the tree is read without
# a build), base (v11.0.2's page, .v11.0.2/dist-base on 5403, RU-69's row) or none. engine: chromium, webkit (run under
# `--exclusive webkit`), gpu (`--cpu-cores 0`), heavy, light, or raw (a script that guards its own runs). done: a path
# relative to the harness directory that exists, non-empty, once the item is read (a JSON log with "cells": [] counts as
# not read), or `-`. An item not read after its run is run again, up to four times. A server runs under the guard's
# 88-minute cap and is restarted before an item once it is 30 minutes old. A finished item moves to <spool-dir>/done/.
# The runner exits when the spool is empty and <spool-dir>/END exists, or before its next item when STOP does. Every run,
# retry and skip is logged with the 1-minute load.
import json, os, subprocess, sys, time, glob
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
T = W + "/.pm-tip"
G = os.path.expanduser("~/.claude/guard/guarded")
sp, logf = sys.argv[1], sys.argv[2]
os.makedirs(os.path.join(sp, "done"), exist_ok=True)
def log(s):
    with open(logf, "a") as f: f.write(f"{time.strftime('%F %T')} {s} (load {os.getloadavg()[0]:.1f})\n")
def up(port):
    return subprocess.run(["curl", "-sf", "-o", "/dev/null", "-m", "5", f"http://127.0.0.1:{port}/"]).returncode == 0
PORT = {"prev": 5401, "plant": 5404, "base": 5403}
servers, started = {}, {}
def stop(kind):
    p = servers.pop(kind, None)
    if p and p.poll() is None:
        p.terminate()
        try: p.wait(20)
        except subprocess.TimeoutExpired: p.kill()
        time.sleep(2)
def ensure(kind):
    if kind == "none": return True
    port = PORT[kind]
    p = servers.get(kind)
    if p and p.poll() is None and time.time() - started.get(kind, 0) > 1800:
        stop(kind); log(f"server {kind} restarted (over 30 min)")
    if up(port): return True
    stop(kind)
    if kind == "plant":
        cmd = [G, "--light", "--timeout", "88", "--", "bash", "-c", f'cd "{T}" && VITE_DOCK_HOLD=1 BROWSER=none exec node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5404 --strictPort']
    elif kind == "base":
        cmd = [G, "--light", "--timeout", "88", "--", "bash", "-c", f'cd "{W}" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir .v11.0.2/dist-base --host 127.0.0.1 --port 5403 --strictPort']
    else:
        cmd = [G, "--light", "--timeout", "88", "--", "bash", "-c", f'cd "{T}" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-pm --host 127.0.0.1 --port 5401 --strictPort']
    servers[kind] = subprocess.Popen(cmd, cwd=H, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
    started[kind] = time.time()
    for _ in range(300):
        if up(port): break
        time.sleep(2)
    ok = up(port)
    log(f"server {kind} {'up' if ok else 'DID NOT START'}")
    if ok and kind == "plant":
        for u in ("?c=dock-wi8&cell=w-std", "?c=dock-comp&page=nav&ground=field"):
            subprocess.run(["curl", "-sf", "-o", "/dev/null", "-m", "120", f"http://127.0.0.1:{port}/{u}"])
    return ok
def read(done):
    if done == "-": return False
    fs = glob.glob(os.path.join(H, done))
    if not fs: return False
    for f in fs:
        if os.path.getsize(f) == 0: return False
        if f.endswith(".json"):
            try: d = json.load(open(f))
            except Exception: return False
            if isinstance(d, dict) and (d.get("cells") == [] or (isinstance(d.get("summary"), dict) and d["summary"].get("cells") == 0)): return False
    return True
log(f"spool {sp} up")
try:
    while True:
        if os.path.exists(os.path.join(sp, "STOP")):
            log("stopped (STOP)"); break
        items = sorted(f for f in os.listdir(sp) if f.endswith(".item"))
        if not items:
            if os.path.exists(os.path.join(sp, "END")): log("spool empty, END"); break
            time.sleep(10); continue
        name = items[0]; path = os.path.join(sp, name)
        srv, eng, mins, done, cmd = open(path).read().strip().split(None, 4)
        if read(done):
            log(f"skip (read) {name}")
        else:
            for attempt in range(1, 5):
                if not ensure(srv):
                    time.sleep(30); continue
                flags = {"webkit": ["--exclusive", "webkit"], "gpu": ["--cpu-cores", "0"], "light": ["--light"]}.get(eng, [])
                log(f"run {attempt} [{srv} {eng}] {name}: {cmd[:170]}")
                argv = ["sh", "-c", cmd] if eng == "raw" else [G, *flags, "--timeout", mins, "--", "sh", "-c", cmd]
                env = {**os.environ, "PORT": str(PORT.get(srv, 5401))}
                r = subprocess.run(argv, cwd=H, env=env)
                if done == "-" or read(done):
                    log(f"read rc={r.returncode} {name}"); break
                log(f"NOT READ rc={r.returncode} {name}")
                if r.returncode == 75:
                    log("guard REFUSED (rc 75): STOP written"); open(os.path.join(sp, "STOP"), "w").write("guard refused\n"); break
        os.replace(path, os.path.join(sp, "done", name))
finally:
    for k in list(servers): stop(k)
    log("spool down")
