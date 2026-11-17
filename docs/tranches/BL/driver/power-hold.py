#!/usr/bin/env python3
"""Power hold for the glass-ui session's runs (2026-11-16, gaggle-ff's battery rule on the
owner's 60 W charger).

Every 10 s:
- HELD trees (the demo pass) are paused (SIGSTOP), every descendant included, until
  power-hold-RELEASE exists (a 90 W or larger charger is in).
- The release critic (approved 20:17) and the dock pass (approved 21:18) run under the
  40/80 rule: both pause at <= 40 % and resume at >= 80 %.
- The dock pass also pauses when the battery has fallen for 15 minutes in a row, and
  resumes only when the battery is >= 80 % and higher than 5 minutes before.
Prints one line per change. Appends every paused pid to power-hold-pids.txt."""
import os, re, signal, subprocess, time

HERE = os.path.dirname(os.path.abspath(__file__))
LIST = os.path.join(HERE, "power-hold-pids.txt")
RELEASE = os.path.join(HERE, "power-hold-RELEASE")
HELD = re.compile(r"glass-ui/\.claude/worktrees/bl/demo|\.p14/")
CRITIC = re.compile(r"glass-ui/\.claude/worktrees/release-11\.1\.1")
DOCK = re.compile(r"glass-ui/\.claude/worktrees/bl/dock/wi8|m7/")
ME = os.getpid()
LOW, HIGH = 40, 80
FALL_S, RISE_S = 15 * 60, 5 * 60

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
    kids = {}
    for p, pp, st, c in rows:
        kids.setdefault(pp, []).append(p)
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
        if (sig == signal.SIGSTOP and st == "T") or (sig == signal.SIGCONT and st != "T"):
            continue
        try:
            os.kill(p, sig)
        except ProcessLookupError:
            continue
        if sig == signal.SIGSTOP:
            record(p, cmd[p])
        print(f"{verb} {p} {cmd[p][:100]}", flush=True)

history = []  # (time, percent)
low_hold = battery() <= LOW
fall_hold = False
print(f"start: battery {battery()} %, low hold {'on' if low_hold else 'off'}", flush=True)
while not os.path.exists(RELEASE):
    now, pct = time.time(), battery()
    history.append((now, pct))
    history = [(t, v) for t, v in history if now - t <= FALL_S + 60]
    if not low_hold and pct <= LOW:
        low_hold = True
        print(f"battery {pct} %: both runs pause (<= {LOW} %)", flush=True)
    elif low_hold and pct >= HIGH:
        low_hold = False
        print(f"battery {pct} %: both runs resume (>= {HIGH} %)", flush=True)
    window = [v for t, v in history if now - t <= FALL_S]
    old = [v for t, v in history if now - t >= FALL_S]
    falling = bool(old) and all(b <= a for a, b in zip(window, window[1:])) and pct < old[-1]
    if not fall_hold and falling:
        fall_hold = True
        print(f"battery {pct} %: fell for 15 minutes in a row, the dock pass pauses", flush=True)
    elif fall_hold:
        past = [v for t, v in history if now - t >= RISE_S]
        if pct >= HIGH and past and pct > past[-1]:
            fall_hold = False
            print(f"battery {pct} %: rising again, the dock pass resumes", flush=True)
    rows = table()
    stat = {p: st for p, pp, st, c in rows}
    cmd = {p: c for p, pp, st, c in rows}
    signal_all(trees(rows, HELD), signal.SIGSTOP, stat, cmd, "paused")
    critic, dock = trees(rows, CRITIC), trees(rows, DOCK)
    signal_all(critic, signal.SIGSTOP if low_hold else signal.SIGCONT, stat, cmd, "paused" if low_hold else "resumed")
    hold_dock = low_hold or fall_hold
    signal_all(dock, signal.SIGSTOP if hold_dock else signal.SIGCONT, stat, cmd, "paused" if hold_dock else "resumed")
    time.sleep(10)
print("hold released", flush=True)
