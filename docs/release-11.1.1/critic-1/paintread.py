# Critic 1: read a paint probe report. The surface id is recovered from the cell order
# (select, menu, popover), since the report's `surface` key carries the data-surface attribute.
import json, sys
names = ["select", "menu", "popover"]
for f in sys.argv[1:]:
    d = json.load(open(f)); print(d["engine"], d["version"], d["label"])
    for i, o in enumerate(d["out"]):
        s = names[i % 3]
        if "error" in o: print(" ", o["form"].ljust(7), o["scheme"].ljust(5), s.ljust(7), "ERROR", o["error"][:110]); continue
        pe, ge = o["plateEdges"], o["groundEdges"]
        print(" ", o["form"].ljust(7), o["scheme"].ljust(5), s.ljust(7), f"plate max {pe['max']:.3f} p99 {pe['p99']:.3f} | ground max {ge['max']:.3f} | bf {o['backdrop']} | clip {(o['clip'] or '')[:22]} | plate={o['plate']} surface={o['surface']} | bg {o['bg'][:40]}")
