# wkbatch.py <batch-file>: MEASURE-9 part M after the reboot. Runs a batch of the queue's WebKit items inside ONE
# `guarded --exclusive webkit` run (runqm.py runs this script as an item of engine `webkit`), so the machine-wide WebKit
# lock is taken once per batch rather than once per item while other sessions also queue for it (on 2026-11-23 one take of
# the lock waited 14 to 16 minutes, and a batch of 17 probes then ran in 70 s). The batch file holds the original item
# lines, each prefixed by its item name:
#     <name> <server> <engine> <minutes> <done> <command...>
# Each item is run in order, one at a time (one browser at a time), unless its `done` already reads (runqm.py's rule:
# exists, non-empty, a JSON log with "cells": [] counts as not read). Before each item its server is checked and, if it
# is down, started here with runqm.py's command (prev 5471: vite preview of .m9m-tip/dist-m9m, the one build; plant 5474:
# .m9m-tip's dev server with VITE_DOCK_HOLD=1; base 5473: v11.0.2's dist-base), each under `guarded --light --timeout 88`;
# the servers this script started are stopped when it ends. An item whose command runs a plant (m9m/plantrunm.sh,
# m9m/g14plantrunm.sh) is given WK_HELD=1, so its own WebKit runs go through `guarded` without `--exclusive webkit`
# (this batch holds the lock; a second take would wait on it forever). An item not read after its run is run once more.
# An inner refusal (rc 75) writes the spool's STOP and ends the batch with 75. Each run and read is logged to
# logs/m9m-q.log with the 1-minute load, in runqm.py's form. When every item reads, <batch-file>.done is written.
# The guard admits a run at a 1-minute load of 36 or less and the ready list reads each gate there, so before each item
# this script waits, as the guard's headroom gate does, until the load is 36 or less (up to 30 minutes, then the item
# runs and the log says so). A plant item is not held here: its legs are guarded runs, gated by the guard itself.
import glob, json, os, signal, subprocess, sys, time
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
T = W + "/.m9m-tip"
G = os.path.expanduser("~/.claude/guard/guarded")
LOG = os.path.join(H, "..", "logs", "m9m-q.log")
SPOOL = os.path.join(H, "m9m", "q", "spool")
PORT = {"prev": 5471, "plant": 5474, "base": 5473}
SRV = {
    "plant": f'cd "{T}" && VITE_DOCK_HOLD=1 BROWSER=none exec node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5474 --strictPort',
    "base": f'cd "{W}" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir .v11.0.2/dist-base --host 127.0.0.1 --port 5473 --strictPort',
    "prev": f'cd "{T}" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-m9m --host 127.0.0.1 --port 5471 --strictPort',
}
batch = sys.argv[1]
tag = os.path.basename(batch)
def log(s):
    with open(LOG, "a") as f: f.write(f"{time.strftime('%F %T')} {s} (load {os.getloadavg()[0]:.1f})\n")
def up(port):
    return subprocess.run(["curl", "-sf", "-o", "/dev/null", "-m", "5", f"http://127.0.0.1:{port}/"]).returncode == 0
mine = {}
def ensure(kind):
    if kind not in PORT or up(PORT[kind]): return True
    p = mine.pop(kind, None)
    if p and p.poll() is None:
        p.terminate()
        try: p.wait(20)
        except subprocess.TimeoutExpired: p.kill()
    mine[kind] = subprocess.Popen([G, "--light", "--timeout", "88", "--", "bash", "-c", SRV[kind]], cwd=H,
                                  stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
    for _ in range(150):
        if up(PORT[kind]): break
        time.sleep(2)
    ok = up(PORT[kind]); log(f"server {kind} {'up' if ok else 'DID NOT START'} [{tag}]")
    if ok and kind == "plant":
        for u in ("?c=dock-wi8&cell=w-std", "?c=dock-comp&page=nav&ground=field"):
            subprocess.run(["curl", "-sf", "-o", "/dev/null", "-m", "120", f"http://127.0.0.1:5474/{u}"])
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
def inner_guard(cmd):
    # a plant runner's browser legs go through `guarded` themselves (WK_HELD=1: no --exclusive), whose headroom gate
    # waits for a load of 36 or less (up to 30 min); this script's own wait would double it (added 2026-11-23 18:10,
    # with the load at 44 to 50 from other sessions' runs for an hour)
    return "plantrunm.sh" in cmd or "g14plantrunm.sh" in cmd
lines = [l.strip() for l in open(batch) if l.strip()]
log(f"batch {tag} up: {len(lines)} items in one WebKit lock")
left, refused = 0, False
try:
    for l in lines:
        name, srv, eng, mins, done, cmd = l.split(None, 5)
        if read(done):
            log(f"skip (read) {name} [{tag}]"); continue
        for attempt in (1, 2):
            if not ensure(srv):
                time.sleep(30); continue
            waited = 0 if not inner_guard(cmd) else 1800
            while os.getloadavg()[0] > 36 and waited < 1800:
                if waited == 0: log(f"waiting for the load to reach 36 [{tag}] {name}")
                time.sleep(15); waited += 15
            if os.getloadavg()[0] > 36 and not inner_guard(cmd): log(f"load still over 36 after 30 min; run anyway (recorded) [{tag}] {name}")
            log(f"run {attempt} [{srv} {eng}, {tag}] {name}: {cmd[:170]}")
            env = {**os.environ, "PORT": str(PORT.get(srv, 5471)), "WK_HELD": "1"}
            p = subprocess.Popen(["sh", "-c", cmd], cwd=H, env=env, start_new_session=True)
            try: rc = p.wait(timeout=max(int(mins), 10) * 60)
            except subprocess.TimeoutExpired:
                try: os.killpg(p.pid, signal.SIGTERM); time.sleep(5); os.killpg(p.pid, signal.SIGKILL)
                except ProcessLookupError: pass
                p.wait(); rc = "timeout"
            if read(done):
                log(f"read rc={rc} {name} [{tag}]"); break
            log(f"NOT READ rc={rc} {name} [{tag}]")
            if rc == 75:
                refused = True; open(os.path.join(SPOOL, "STOP"), "w").write("guard refused\n")
                log(f"guard REFUSED (rc 75) inside {tag}: STOP written"); break
        else:
            left += 1
        if refused: left += 1; break
finally:
    for k, p in mine.items():
        if p.poll() is None:
            p.terminate()
            try: p.wait(20)
            except subprocess.TimeoutExpired: p.kill()
if left == 0:
    open(batch + ".done", "w").write(time.strftime("%F %T") + "\n")
log(f"batch {tag} down: {len(lines) - left} of {len(lines)} read")
sys.exit(75 if refused else (0 if left == 0 else 1))
