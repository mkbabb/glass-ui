#!/usr/bin/env python3
"""Power hold for the glass-ui session's runs (2026-11-16/17, gaggle-ff's battery rule on the
owner's 60 W charger).

Three runs, each with every descendant: the 11.1.1 release critic (approved 20:17), the dock
pass (21:18) and the demo pass (00:20). All three pause at <= 40 % and resume at >= 80 %.
On a fall of 15 minutes in a row the demo pass pauses first; a further 15 minutes of fall
pauses the dock pass too. Both resume when the battery is >= 80 % and higher than 5 minutes
before. Every 10 s; one printed line per change; paused pids appended to
power-hold-pids.txt; state kept in power-hold-state.json across restarts. Ends when
power-hold-RELEASE exists."""
import json, os, re, signal, subprocess, time

HERE = os.path.dirname(os.path.abspath(__file__))
LIST = os.path.join(HERE, "power-hold-pids.txt")
STATE = os.path.join(HERE, "power-hold-state.json")
RELEASE = os.path.join(HERE, "power-hold-RELEASE")
DEMO = re.compile(r"glass-ui/\.claude/worktrees/bl/demo|\.p14/")
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

def apply(pids, hold, stat, cmd):
    sig, verb = (signal.SIGSTOP, "paused") if hold else (signal.SIGCONT, "resumed")
    for p in sorted(pids):
        st = stat.get(p, "Z")[:1]
        if st == "Z" or "Claude" in cmd.get(p, "") or cmd.get(p, "").startswith("claude"):
            continue
        if (hold and st == "T") or (not hold and st != "T"):
            continue
        try:
            os.kill(p, sig)
        except ProcessLookupError:
            continue
        if hold:
            record(p, cmd[p])
        print(f"{verb} {p} {cmd[p][:100]}", flush=True)

try:
    saved = json.load(open(STATE))
except Exception:
    saved = {}
history = [tuple(x) for x in saved.get("history", [])]
low_hold = saved.get("low_hold", battery() <= LOW)
fall_level = saved.get("fall_level", 0)
fall_since = saved.get("fall_since", None)
print(f"start: battery {battery()} %, low hold {'on' if low_hold else 'off'}, fall level {fall_level}", flush=True)
while not os.path.exists(RELEASE):
    now, pct = time.time(), battery()
    history.append((now, pct))
    history = [(t, v) for t, v in history if now - t <= FALL_S + 60]
    if not low_hold and pct <= LOW:
        low_hold = True
        print(f"battery {pct} %: all three runs pause (<= {LOW} %)", flush=True)
    elif low_hold and pct >= HIGH:
        low_hold = False
        print(f"battery {pct} %: all three runs resume (>= {HIGH} %)", flush=True)
    window = [v for t, v in history if now - t <= FALL_S]
    old = [v for t, v in history if now - t >= FALL_S]
    falling = bool(old) and all(b <= a for a, b in zip(window, window[1:])) and pct < old[-1]
    if falling and fall_level < 2 and (fall_since is None or now - fall_since >= FALL_S):
        fall_level += 1
        fall_since = now
        print(f"battery {pct} %: fell for 15 minutes in a row, {'the demo pass' if fall_level == 1 else 'the dock pass'} pauses", flush=True)
    elif fall_level:
        past = [v for t, v in history if now - t >= RISE_S]
        if pct >= HIGH and past and pct > past[-1]:
            fall_level, fall_since = 0, None
            print(f"battery {pct} %: rising again, the paused passes resume", flush=True)
    rows = table()
    stat = {p: st for p, pp, st, c in rows}
    cmd = {p: c for p, pp, st, c in rows}
    apply(trees(rows, CRITIC), low_hold, stat, cmd)
    apply(trees(rows, DOCK), low_hold or fall_level >= 2, stat, cmd)
    apply(trees(rows, DEMO), low_hold or fall_level >= 1, stat, cmd)
    json.dump({"history": history, "low_hold": low_hold, "fall_level": fall_level, "fall_since": fall_since}, open(STATE, "w"))
    time.sleep(10)
print("hold released", flush=True)
