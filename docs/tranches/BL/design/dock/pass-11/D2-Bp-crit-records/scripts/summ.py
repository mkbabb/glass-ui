# summ.py <records dir>: this seat's readings beside the rows (none a row), after the pass-10 critic's summ.py. Per log file:
# reads, splice, sliver, blank, stub, error, load range; every red line listed. Sections: the retarget A/B (pass-10 builder's
# absum.py), the reversal-stub A/B (revst/), the swap reversal and its retarget (swrev/), a retarget during the morph reversal
# (rtrev/), retarget·N at the unswept offsets (edge/), and the frozen vmorph collapse (frz/).
import glob, re, sys, os, subprocess
R = sys.argv[1]
def scan(pat, title):
    print(f"== {title}")
    tot = {}
    for f in sorted(glob.glob(os.path.join(R, pat))):
        ls = [l.rstrip() for l in open(f, encoding="utf8") if re.search(r"\[load [\d.]+\]", l)]
        if not ls: print(os.path.basename(f), "no reads"); continue
        ld = [float(re.search(r"\[load ([\d.]+)\]", l).group(1)) for l in ls]
        sp = [l for l in ls if re.search(r"splice [1-9]", l)]; sl = [l for l in ls if re.search(r"sliver [1-9]", l)]
        bl = [l for l in ls if "BLANK" in l]; st = [l for l in ls if "stub false" in l]; er = [l for l in ls if "ERROR" in l]
        nr = [l for l in ls if "NOT-REACHED" in l]
        print(f"{os.path.basename(f)}: reads {len(ls)} splice {len(sp)} sliver {len(sl)} blank {len(bl)} stub {len(st)} error {len(er)}{' not-reached ' + str(len(nr)) if nr else ''} load {min(ld)}-{max(ld)}")
        for l in sorted(set(sp + sl + bl + st + er), key=ls.index): print("   ", l[:230])
print("== retarget A/B (pass-10 builder's absum.py)")
print(subprocess.run(["python3", "-I", "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-10/D2-Bp-proto-records/scripts/absum.py", R], capture_output=True, text=True).stdout)
scan("revst/*.log", "reversal stub A/B (phase2.mjs rev-c, bp10 / bp8)")
scan("swrev/*.log", "swap reversed, and retargeted during the reversal (swrev.mjs)")
scan("rtrev/*.log", "a retarget during the morph reversal (phase3.mjs)")
scan("edge/*.log", "retarget·N at the unswept offsets (sweep.mjs)")
print("== frozen vmorph collapse (frz.mjs)")
for f in sorted(glob.glob(os.path.join(R, "frz/*.log"))):
    ls = [l.rstrip() for l in open(f, encoding="utf8") if "[load" in l]
    if not ls: continue
    ld = [float(re.search(r"\[load ([\d.]+)\]", l).group(1)) for l in ls]
    lfs = [l for l in ls if "lastFrameSplice true" in l]; cut = [l for l in ls if "facingCut true" in l]; nh = [l for l in ls if "held false" in l]; er = [l for l in ls if "ERROR" in l]
    print(f"{os.path.basename(f)}: reads {len(ls)} frozen-on-a-splice-frame {len(lfs)} facingCut {len(cut)} freeze-not-held {len(nh)} error {len(er)} load {min(ld)}-{max(ld)}")
    for l in cut + nh + er: print("   ", l[:300])
