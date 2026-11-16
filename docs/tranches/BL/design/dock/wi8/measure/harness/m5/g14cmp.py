# g14cmp.py <logs-dir>: G-14, the build against master's snapshot. Reads the list reporter's
# lines from logs/m3-g14-{build,base}-{chromium,webkit-a,webkit-b}.log and prints, per engine,
# the tests that fail on the build and pass on master (new), those that fail on both, and those
# that pass on the build and fail on master; then the new failures grouped by spec and describe.
import re, sys, collections
d = sys.argv[1]
LINE = re.compile(r"^\s+([✓✘-])\s+\d+\s+\[([^\]]+)\]\s+›\s+(\S+?):(\d+):\d+\s+›\s+(.*?)(?:\s+\(\d+(?:\.\d+)?m?s\))?\s*$")
def read(tag):
    out = {}
    for part in ("chromium", "webkit-a", "webkit-b"):
        try:
            for l in open(f"{d}/{"m5" if tag=="build" else "m3"}-g14-{tag}-{part}.log", encoding="utf-8"):
                m = LINE.match(l)
                if not m: continue
                st, proj, f, ln, title = m.groups()
                key = (proj, f.split("/")[-1], title)
                # A retry that passes after a failure is flaky; the last line wins otherwise.
                prev = out.get(key)
                out[key] = "flaky" if prev == "fail" and st == "✓" else ("pass" if st == "✓" else "fail" if st == "✘" else "skip")
        except FileNotFoundError:
            pass
    return out
b, m = read("build"), read("base")
for eng in ("chromium-headless-new", "coarse-touch", "webkit"):
    keys = [k for k in b if k[0] == eng]
    new = [k for k in keys if b[k] == "fail" and m.get(k) == "pass"]
    both = [k for k in keys if b[k] == "fail" and m.get(k) == "fail"]
    fixed = [k for k in keys if b[k] == "pass" and m.get(k) == "fail"]
    unmatched = [k for k in keys if k not in m]
    print(f"{eng}: {len(keys)} tests on the build; new failures {len(new)}, failing on both {len(both)}, passing only on the build {len(fixed)}, not on master {len(unmatched)}")
    groups = collections.Counter((k[1], k[2].split(" › ")[0]) for k in new)
    for (f, g), n in groups.most_common():
        print(f"    {n:3d}  {f} › {g}")
