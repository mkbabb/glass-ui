#!/usr/bin/env python3
"""Power hold for the glass-ui session's runs (2026-11-16, gaggle-ff's battery rule on the
owner's 60 W charger: pause at 40 % or less, resume at 80 % or more).

Every 10 s:
- HELD trees (the dock measure, the demo pass) are paused (SIGSTOP), every descendant
  included, until power-hold-RELEASE exists (a 90 W or larger charger is in).
- ALLOWED trees (the 11.1.1 release critic, approved by gaggle-ff at 20:17) run while the
  battery hold is off; the battery hold turns on at <= 40 % and off at >= 80 %. On the
  turn on they are paused; on the turn off they are continued (SIGCONT).
Prints one line per change. Appends every paused pid to power-hold-pids.txt."""
import os, re, signal, subprocess, time

HERE = os.path.dirname(os.path.abspath(__file__))
LIST = os.path.join(HERE, "power-hold-pids.txt")
RELEASE = os.path.join(HERE, "power-hold-RELEASE")
HELD = re.compile(r"glass-ui/\.claude/worktrees/(bl/dock/wi8|bl/demo)|\.p14/|m7/")
ALLOWED = re.compile(r"glass-ui/\.claude/worktrees/release-11\.1\.1")
ME = os.getpid()
LOW, HIGH = 40, 80

def table():
    out = subprocess.run(["ps", "-Ao", "pid=,ppid=,stat=,command="], capture_output=True, text=True).stdout
    rows = []
    for line in out.splitlines():
        parts = line.split(None, 3)
        if len(parts) == 4 and parts[0].isdigit():
            rows.append((int(parts[0]), int(parts[1]), parts[2], parts[3]))
    return rows

def battery():
    out = subprocess.run(["pmset", "-g", "batt"], capture_output=True, text=True).stdout
    m = re.search(r"(\d+)%", out)
    return int(m.group(1)) if m else 100

def trees(rows, pat):
    kids, cmd = {}, {}
    for p, pp, st, c in rows:
        kids.setdefault(pp, []).append(p)
        cmd[p] = c
    seen, stack = set(), [p for p, pp, st, c in rows if pat.search(c) and "power-hold" not in c]
    while stack:
        p = stack.pop()
        if p in seen or p == ME:
            continue
        seen.add(p)
        stack.extend(kids.get(p, []))
    return seen

def record(p, c):
    known = set()
    if os.path.exists(LIST):
        known = {int(l.split()[0]) for l in open(LIST) if l.strip() and l.split()[0].isdigit()}
    if p not in known:
        with open(LIST, "a") as f:
            f.write(f"{p} {c[:140]}\n")

def signal_all(pids, sig, stat, cmd, verb):
    for p in sorted(pids):
        st = stat.get(p, "Z")[:1]
        if st == "Z" or "Claude" in cmd.get(p, "") or cmd.get(p, "").startswith("claude"):
            continue
        if sig == signal.SIGSTOP and st == "T":
            continue
        if sig == signal.SIGCONT and st != "T":
            continue
        try:
            os.kill(p, sig)
        except ProcessLookupError:
            continue
        if sig == signal.SIGSTOP:
            record(p, cmd[p])
        print(f"{verb} {p} {cmd[p][:100]}", flush=True)

battery_hold = battery() <= LOW
print(f"start: battery {battery()} %, battery hold {'on' if battery_hold else 'off'}", flush=True)
while not os.path.exists(RELEASE):
    rows = table()
    stat = {p: st for p, pp, st, c in rows}
    cmd = {p: c for p, pp, st, c in rows}
    pct = battery()
    if not battery_hold and pct <= LOW:
        battery_hold = True
        print(f"battery {pct} %: hold on for the release critic", flush=True)
    elif battery_hold and pct >= HIGH:
        battery_hold = False
        print(f"battery {pct} %: hold off for the release critic", flush=True)
    signal_all(trees(rows, HELD), signal.SIGSTOP, stat, cmd, "paused")
    allowed = trees(rows, ALLOWED)
    if battery_hold:
        signal_all(allowed, signal.SIGSTOP, stat, cmd, "paused")
    else:
        signal_all(allowed, signal.SIGCONT, stat, cmd, "resumed")
    time.sleep(10)
print("hold released", flush=True)
