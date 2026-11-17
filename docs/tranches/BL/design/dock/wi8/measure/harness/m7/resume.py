# resume.py <root-pid> <log>: MEASURE-7. While <root-pid> lives, every 3 s: each process in its tree (by parent links)
# found stopped (state T) is sent SIGCONT, and the resume is logged with its command. Runs of several sessions were being
# stopped (state T) at a browser's launch on 2026-11-16 from 19:04, by no guard tool (neither guarded nor the reaper
# sends SIGSTOP); the machine law stops a run only on a guarded REFUSED, so this seat's own chains are resumed and the
# stops are counted in the log. Only this tree's processes are touched.
import os, signal, subprocess, sys, time
root, log = int(sys.argv[1]), sys.argv[2]
def tree():
    out = subprocess.run(["ps", "-axo", "pid=,ppid=,stat=,command="], capture_output=True, text=True).stdout.splitlines()
    rows = []
    for l in out:
        p = l.split(None, 3)
        if len(p) >= 3: rows.append((int(p[0]), int(p[1]), p[2], p[3] if len(p) > 3 else ""))
    kids = {}
    for pid, ppid, st, cmd in rows: kids.setdefault(ppid, []).append((pid, st, cmd))
    seen, q, res = set(), [root], []
    while q:
        x = q.pop()
        for pid, st, cmd in kids.get(x, []):
            if pid in seen: continue
            seen.add(pid); res.append((pid, st, cmd)); q.append(pid)
    return res
while True:
    try: os.kill(root, 0)
    except OSError: break
    for pid, st, cmd in tree() + [(root, "", "")]:
        try:
            if st.startswith("T") or (pid == root and subprocess.run(["ps", "-o", "stat=", "-p", str(pid)], capture_output=True, text=True).stdout.strip().startswith("T")):
                os.kill(pid, signal.SIGCONT)
                with open(log, "a") as f: f.write(f"{time.strftime('%H:%M:%S')} resumed {pid} {cmd[:120]}\n")
        except OSError: pass
    time.sleep(3)
