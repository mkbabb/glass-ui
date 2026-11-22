# wait.py <item-prefix> [max-seconds]: part M's foreground wait. Returns when the spool item whose name starts with
# <item-prefix> is in done/, when STOP or a guard refusal appears, when the runner is gone, or after max-seconds
# (default 570); prints the queue log's last lines and the count of items left.
import os, sys, time, glob, subprocess
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sp = os.path.join(H, "pm", "q", "spool"); logf = os.path.join(H, "..", "logs", "pm-q.log")
pre = sys.argv[1]; mx = float(sys.argv[2]) if len(sys.argv) > 2 else 570
t0 = time.time(); why = "timeout"
while time.time() - t0 < mx:
    if glob.glob(os.path.join(sp, "done", pre + "*")) and not glob.glob(os.path.join(sp, pre + "*.item")): why = "done"; break
    if os.path.exists(os.path.join(sp, "STOP")): why = "STOP"; break
    if subprocess.run(["pgrep", "-f", "pm/runq.py"], capture_output=True).returncode != 0: why = "runner gone"; break
    time.sleep(15)
lines = open(logf).read().strip().split("\n")
print(why, f"after {time.time()-t0:.0f}s;", len(glob.glob(os.path.join(sp, "*.item"))), "items left")
for l in lines[-4:]: print(l[:170])
bad = [l for l in lines if "NOT READ" in l or "REFUSED" in l]
print("not read so far:", len(bad)); [print("  ", l[:170]) for l in bad[-5:]]
