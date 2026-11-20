# spool8.py <spool-dir> <log>: the eighth pass's source seat. Runs the items dropped into <spool-dir> one at a time,
# lowest file name first, so the seat holds one heavy run at a time while items keep arriving. Each item is a file
# holding one line, m8/runq.py's form without the server:
#     <engine> <minutes> <done> <command...>
# engine: heavy, light, webkit (`--exclusive webkit`), gpu (`--cpu-cores 0`) or raw (a script that guards its own
# runs); done: a path relative to the harness directory that exists, non-empty, once the item is read, or `-`.
# An item not read after its run is run again, up to three times. A finished item moves to <spool-dir>/done/. The
# runner exits when the spool is empty and <spool-dir>/END exists, or before its next item when <spool-dir>/STOP does.
import glob, os, subprocess, sys, time
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
G = os.path.expanduser("~/.claude/guard/guarded")
sp, logf = sys.argv[1], sys.argv[2]
os.makedirs(os.path.join(sp, "done"), exist_ok=True)
def log(s):
    with open(logf, "a") as f: f.write(f"{time.strftime('%H:%M:%S')} {s} (load {os.getloadavg()[0]:.1f})\n")
def read(done):
    if done == "-": return False
    fs = glob.glob(os.path.join(H, done))
    return bool(fs) and all(os.path.getsize(f) > 0 for f in fs)
log(f"spool {sp} up")
while True:
    if os.path.exists(os.path.join(sp, "STOP")):
        log("stopped (STOP)"); break
    items = sorted(f for f in os.listdir(sp) if f.endswith(".item"))
    if not items:
        if os.path.exists(os.path.join(sp, "END")): log("spool empty, END"); break
        time.sleep(10); continue
    name = items[0]; path = os.path.join(sp, name)
    eng, mins, done, cmd = open(path).read().strip().split(None, 3)
    if read(done):
        log(f"skip (read) {name}")
    else:
        for attempt in range(1, 4):
            flags = {"webkit": ["--exclusive", "webkit"], "gpu": ["--cpu-cores", "0"], "light": ["--light"]}.get(eng, [])
            log(f"run {attempt} [{eng}] {name}: {cmd[:160]}")
            argv = ["sh", "-c", cmd] if eng == "raw" else [G, *flags, "--timeout", mins, "--", "sh", "-c", cmd]
            r = subprocess.run(argv, cwd=H)
            if done == "-" or read(done):
                log(f"read rc={r.returncode} {name}"); break
            log(f"NOT READ rc={r.returncode} {name}")
    os.replace(path, os.path.join(sp, "done", name))
log("spool down")
