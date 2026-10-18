# H10-migrate-check.py · D3 pass 10, H10-2: proves the rulings migration changed no reading. For each migrated file, the
# banked pass-9 version (git HEAD) and the migrated one hold the same rulings in the same order (`at`, `says`); each
# `why` is the banked one, less a leading "REPORTED, " or "REPORTED: " where that prefix became verdict "reported";
# every banked REPORTED reading (a `why` starting "REPORTED" or carrying "REPORTED:") is verdict "reported", every other
# ruling verdict "true" except the explicitly named ones (FV8's dock.css:15, whose `why` reported its clause in words).
#   python3 -I H10-migrate-check.py <repo root>
import json, re, subprocess, sys
R = sys.argv[1]
P = "docs/tranches/BL/design/material/pass-9/"
NAMED = {"FV8-rulings.json": {"src/components/dock/styles/dock.css:15"}}
bad = 0
for f in ["FV8-rulings.json", "MS7-rulings.json", "MS7-rulings-proposed.json"]:
    old = json.loads(subprocess.run(["git", "-C", R, "show", f"HEAD:{P}{f}"], capture_output=True, check=True, text=True).stdout)
    new = json.load(open(f"{R}/{P}{f}", encoding="utf-8"))
    errs = []
    if [(x["at"], x["says"]) for x in old] != [(x["at"], x["says"]) for x in new]: errs.append("at/says list differs")
    for o, n in zip(old, new):
        if set(n) != {"at", "says", "verdict", "why"}: errs.append(f"{n['at']}: keys {sorted(n)}")
        rep = o["why"].startswith("REPORTED") or "REPORTED:" in o["why"] or o["at"] in NAMED.get(f, set())
        if n["verdict"] != ("reported" if rep else "true"): errs.append(f"{o['at']}: verdict {n['verdict']}")
        if n["why"] != re.sub(r"^REPORTED[,:] ", "", o["why"]): errs.append(f"{o['at']}: why changed")
    tally = {v: sum(x["verdict"] == v for x in new) for v in ("true", "reported")}
    print(f"{f}: {len(old)} → {len(new)} rulings · true {tally['true']} · reported {tally['reported']} · "
          f"{'no reading changed' if not errs else 'CHANGED: ' + '; '.join(errs[:5])}")
    for x in new:
        if x["verdict"] == "reported": print(f"    reported {x['at']}")
    bad += bool(errs)
print("MIGRATE-CHECK " + ("PASS" if not bad else f"FAIL ({bad} files)"))
sys.exit(1 if bad else 0)
