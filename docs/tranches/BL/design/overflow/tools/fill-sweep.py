#!/usr/bin/env python3
"""fill-sweep.py: writes the generated tables into SWEEP.md between their markers
(`<!-- table:NAME -->` ... `<!-- /table:NAME -->`), so a rerun replaces them in place.
A bare `⟨NAME-rows⟩` or `⟨cure-sweep⟩` placeholder is turned into a marked block first."""
import pathlib, re, subprocess

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
SWEEP = ROOT / "SWEEP.md"
CURE_ROUTES = ",".join([
    "/containers/sheet", "/data/timeline", "/foundations/colors", "/forms/toggle", "/display/buttons",
    "/forms/inputs", "/forms/labeled-field", "/forms/checks", "/containers/dropdown-menu",
    "/containers/popover", "/forms/select", "/containers/command", "/containers/accordion", "/forms/chip",
    "/containers/expandable-container", "/compositions/settings", "/compositions/auth-shell",
    "/navigation/pager-dots", "/ovf.html", "/containers/dialog", "/feedback/toast", "/containers/tooltip",
])


def run(*cmd):
    return subprocess.run(cmd, check=True, capture_output=True, text=True, cwd=ROOT).stdout.strip()


def tables():
    out = {
        "f1": run(str(HERE / "tables.sh"), "F1"),
        "f2": run(str(HERE / "tables.sh"), "F2,F3 Toast"),
        "f3": run(str(HERE / "tables.sh"), "F3 DropdownMenu,F3 Popover,F3 Select,F3 narrow,F3 ToggleGroup,F3 Button,F3 Label,F3 Tooltip"),
        "f4": run(str(HERE / "tables.sh"), "F4"),
        "fold": run(str(HERE / "tables.sh"), "B1,B2,M1,M2,M3,M4,L1"),
        "fold-v3": run("node", str(HERE / "witness-table.mjs"), str(ROOT / "record/inspect/witness3-fold.chromium.json")),
    }
    # round 2: value.js's items on the base, v4 and v5, one column per build; a later file's
    # row replaces an earlier one's (witness5b re-read the picker with its value's width;
    # witness5s read the steps row's Slider and took the pictures, base and v5 only)
    ins = ROOT / "record/inspect"
    have = lambda *names: [str(ins / n) for n in names if (ins / n).exists()]
    v5c = have("witness5.chromium.json", "witness5b.chromium.json", "witness5c.chromium.json", "witness5s.chromium.json")
    if v5c:
        out["v5"] = run("node", str(HERE / "witness-table.mjs"), "--cols", "base,cure4,cure5", *v5c)
    v5w = have("witness5.webkit.json")
    if v5w:
        out["v5-webkit"] = run("node", str(HERE / "witness-table.mjs"), "--cols", "base,cure4,cure5", *v5w)
    wk5 = have("witness-wk5.webkit.json")
    if wk5:
        out["wk5"] = run("node", str(HERE / "witness-table.mjs"), "--cols", "base,cure4,cure5", *wk5)
    run("node", str(HERE / "families.mjs"), "record/raw", "--routes", "/ovf.html?fold&round=2", "--out", "record/families.fold5.json")
    out["cure-sweep-fold5"] = run("node", str(HERE / "compare.mjs"), "record/families.fold5.json")
    run("node", str(HERE / "families.mjs"), "record/raw", "--routes", CURE_ROUTES, "--out", "record/families.cure-routes.json")
    run("node", str(HERE / "families.mjs"), "record/raw", "--out", "record/families.json")
    run("node", str(HERE / "analyze.mjs"), "record/raw", "--tag", "base", "--out", "record/faults.base.json")
    out["cure-sweep"] = run("node", str(HERE / "compare.mjs"), "record/families.cure-routes.json")
    return out


s = SWEEP.read_text()
for name in ["f1", "f2", "f3", "f4", "fold", "fold-v3"]:
    s = s.replace(f"⟨{name}-rows⟩", f"<!-- table:{name} -->\n<!-- /table:{name} -->")
s = s.replace("⟨cure-sweep⟩", "<!-- table:cure-sweep -->\n<!-- /table:cure-sweep -->")
tabs = tables()
for name in tabs:
    if f"<!-- table:{name} -->" not in s:
        print("no marker for", name)
for name, body in tabs.items():
    s = re.sub(
        rf"<!-- table:{re.escape(name)} -->.*?<!-- /table:{re.escape(name)} -->",
        lambda m: f"<!-- table:{name} -->\n{body}\n<!-- /table:{name} -->",
        s,
        flags=re.S,
    )
SWEEP.write_text(s)
print("filled", SWEEP)
