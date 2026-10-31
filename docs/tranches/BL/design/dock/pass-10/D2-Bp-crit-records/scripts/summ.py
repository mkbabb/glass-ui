# summ.py <records dir>: this seat's readings beside the rows (none a row): the sweeps (sweep/*.log, the builder's sweep.mjs lines),
# the phase reads (ph/*.log, phase2.mjs lines) and the retarget A/B (ab/, through the builder's absum.py). Per file: reads, splice,
# sliver, blank, stub, error, load range; every red line listed.
import glob, re, sys, os, subprocess
R = sys.argv[1]
def scan(pat, title):
    print(f"== {title}")
    for f in sorted(glob.glob(os.path.join(R, pat))):
        ls = [l.rstrip() for l in open(f, encoding="utf8") if re.search(r"\[load [\d.]+\]", l)]
        if not ls: print(os.path.basename(f), "no reads"); continue
        ld = [float(re.search(r"\[load ([\d.]+)\]", l).group(1)) for l in ls]
        sp = [l for l in ls if re.search(r"splice [1-9]", l)]; sl = [l for l in ls if re.search(r"sliver [1-9]", l)]
        bl = [l for l in ls if "BLANK" in l]; st = [l for l in ls if "stub false" in l]; er = [l for l in ls if "ERROR" in l]
        nr = [l for l in ls if "NOT-REACHED" in l]
        print(f"{os.path.basename(f)}: reads {len(ls)} splice {len(sp)} sliver {len(sl)} blank {len(bl)} stub {len(st)} error {len(er)}{' not-reached ' + str(len(nr)) if nr else ''} load {min(ld)}-{max(ld)}")
        for l in sorted(set(sp + sl + bl + st + er), key=ls.index): print("   ", l[:200])
scan("sweep/*.log", "sweeps (sweep.mjs)")
scan("ph/*.log", "phase reads (phase2.mjs)")
print("== retarget A/B (pass-10 builder's absum.py)")
print(subprocess.run(["python3", "-I", "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-10/D2-Bp-proto-records/scripts/absum.py", R], capture_output=True, text=True).stdout)
