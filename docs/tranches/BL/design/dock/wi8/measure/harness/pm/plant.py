# plant.py <tree-dir> <plant> apply|revert|check, or plant.py <tree-dir> - list: MEASURE-8 part M's counter-tests, every
# plant the eighth pass's gates claim, applied to the measure's `git archive` tree of the tip only (never the worktree).
# Sources, unchanged in what each plants:
#   m8/plants8.py (with m7/plants7.py, m6, m5, m4 under it): G-1 to G-15's plants as MEASURE-8 left them
#   s8/plant8.py: tabauto, iconword, facerule (RU-75, RU-76; g8-exempt and g8-trigger are plants8's own)
#   m4/g14plants.py: G-14's nine restated groups, named g14-<group>
#   s8/bakedplant.py, darkplant.py, foldplant.py, markplant.py: RU-56, C7-3, RU-79, RU-66 (named baked, dark, fold, mark)
# Re-anchored on the tip, the fault the same (part M):
#   g9-scope     `data-dock-scope` and its ancestor write went with S2 (RU-78), so the published progress is the root's
#                own `--dock-expand-t`: the plant removes that write (G-9's "present in every row" fails)
#   g13-tabsvg   S2 took `[data-dock-glyph]` out of the tab seat's selector: cut back from `:is(svg, img, picture)`
#   g15-onestep  S4 set current 10 % and hover 8 %: current set equal to hover, 10 % to 8 %
#   g14-corner   the merge carried 11.1.0's `--radius-dock` knob into the pill's rest rule: 16 px in its place
# Dropped: tabauto (RU-75's tab half was not built, S5; the default it plants is not on the tip).
# New (part M):
#   touchcure    S6's two touch cures removed: DockTrigger's close of an open list on a touch press, and the shared scrim's
#                click on a touch press's pointerup (their files as 88ff3ff7e's parent had them)
# apply keeps each touched file's original under <tree>/.pm-orig/<plant>/ and refuses if a replacement does not match
# exactly once or the plant is already applied; revert puts the originals back; check reads the counts and writes nothing.
import contextlib, importlib.util, io, json, os, shutil, subprocess, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
D = "src/components/dock/"

def load(path, name, argv):
    spec = importlib.util.spec_from_file_location(name, path)
    m = importlib.util.module_from_spec(spec)
    old = sys.argv; sys.argv = argv
    try:
        with contextlib.redirect_stdout(io.StringIO()):
            spec.loader.exec_module(m)
    except SystemExit:
        pass
    finally:
        sys.argv = old
    return m

P = {}
p8 = load(os.path.join(H, "m8", "plants8.py"), "plants8", ["plants8", "x", "list"])
for k, (desc, reps) in p8.P.items():
    P[k] = (desc, [(f, o, n) for f, o, n in reps])
# s8/plant8.py runs on import, so its table is read from the file's text
_src = open(os.path.join(H, "s8", "plant8.py")).read()
_ns = {}
exec(_src[_src.index("P = {"):_src.index("reps = P[name]")], {}, _ns)
for k in ("tabauto", "iconword", "facerule"):
    f, o, n = _ns["P"][k]
    P[k] = ({"tabauto": "RU-75: the tab seat's default height back to auto", "iconword": "RU-75: the labelled icon seat's seat height removed",
             "facerule": "RU-76: the folded face's glyph rule removed"}[k], [(f, o, n)])
g14 = load(os.path.join(H, "m4", "g14plants.py"), "g14plants", ["g14plants", "x", "list"])
for k, (desc, reps) in g14.P.items():
    P["g14-" + k] = ("G-14 " + k + ": " + desc, list(reps))
# the special plants, as exact replacements
P["baked"] = ("RU-56: the :root-baked plates restored inside the dock (the RU-56 block cut out)", "CUT_RU56")
P["dark"] = ("C7-3: the dark blur arm back to `.dark .glass-dock` alone",
    [(D + "styles/shell.css", "    .dark .glass-dock,\n    .glass-dock.dark {", "    .dark .glass-dock {")])
P["fold"] = ("RU-79: the phone rule restored (no fold at 1440)",
    [(D + "ControlsDock.vue", '    return count === 1 ? false : "closed";',
      '    return count === 1 ? false : typeof matchMedia === "function" && matchMedia("(max-width: 40rem)").matches ? "closed" : false;')])
P["mark"] = ("RU-66: the run mark's move removed (the plate jumps)",
    [(D + "composables/useDockRunMark.ts", "        if (!start) {\n            paint(run, plate(run, next));",
      "        if (!start || true) {\n            paint(run, plate(run, next));")])
# re-anchored
P["g9-scope"] = ("G-9: the published progress write removed (the root's --dock-expand-t)",
    [(D + "composables/useDockBody.ts", '        el.style.setProperty("--dock-expand-t", e.toFixed(4));', "        void e;")])
P["g13-tabsvg"] = ("G-13 / RU-65, RU-87: the tab seat's glyph rule cut back to a direct svg",
    [(D + "styles/controls/tab-button.css", ".dock-tab-button > :is(svg, img, picture) {", ".dock-tab-button > svg {")])
P["g15-onestep"] = ("G-15 (RU-68): the current step set equal to hover (10 % to 8 %)",
    [(D + "styles/dock.css", "        --dock-control-active-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 10%, transparent);",
      "        --dock-control-active-bg: color-mix(in oklab, var(--dock-fg-on-aurora, var(--foreground)) 8%, transparent);")])
P["g14-corner"] = ("G-14 corner: the pill's rest corner a fixed 16 px (re-anchored: 11.1.0's --radius-dock knob)",
    [(D + "styles/run.css", "    .glass-dock.shape-pill {\n        border-radius: var(--radius-dock);\n    }",
      "    .glass-dock.shape-pill {\n        border-radius: 16px;\n    }")])
P.pop("tabauto")  # RU-75's tab half was not built (S5: the hypothesis did not hold), so its plant has no site on the tip
P["touchcure"] = ("RU-72 (S6): the two touch cures removed (DockTrigger's close on a touch press, the scrim's touch click)", "FILES_88ff3ff7e^")

def resolve(tree, name):
    desc, reps = P[name]
    if reps == "CUT_RU56":
        f = D + "styles/dock.css"
        s = open(os.path.join(tree, f)).read()
        i = s.find("/* W-I.8 RU-56:"); j = s.find("/* RU-56 end */", i)
        if i < 0 or j < 0: return desc, [(f, "\0missing RU-56 markers", "")]
        return desc, [(f, s[i:j + len("/* RU-56 end */")], "")]
    if reps == "FILES_88ff3ff7e^":
        out = []
        for f in ("src/components/dock/DockTrigger.vue", "src/components/dialog/ModalScrim.vue"):
            old = open(os.path.join(tree, f)).read()
            new = subprocess.run(["git", "-C", W, "show", f"88ff3ff7e^:{f}"], capture_output=True, text=True, check=True).stdout
            out.append((f, old, new))
        return desc, out
    return desc, reps

def counts(tree, name):
    desc, reps = resolve(tree, name)
    staged, bad = {}, []
    for f, old, new in reps:
        p = os.path.join(tree, f)
        if not os.path.exists(p): bad.append(f"{f}: missing"); continue
        s = staged.get(f) or open(p).read()
        if old is None: s = s + new
        else:
            c = s.count(old)
            if c != 1: bad.append(f"{f}: matches {c} times"); continue
            s = s.replace(old, new)
        staged[f] = s
    return desc, staged, bad

if __name__ == "__main__":
    tree, name, act = sys.argv[1], sys.argv[2], (sys.argv[3] if len(sys.argv) > 3 else "list")
    if act == "list" or name == "-":
        print(json.dumps({k: v[0] for k, v in P.items()}, indent=1)); sys.exit(0)
    orig = os.path.join(tree, ".pm-orig", name)
    if act == "check":
        desc, staged, bad = counts(tree, name)
        print(("OK   " if not bad else "BAD  ") + name + ("" if not bad else "  " + " | ".join(bad))); sys.exit(1 if bad else 0)
    if act == "apply":
        if os.path.exists(orig): sys.exit(f"{name} already applied")
        desc, staged, bad = counts(tree, name)
        if bad: sys.exit(f"{name}: " + " | ".join(bad))
        for f in staged:
            os.makedirs(os.path.dirname(os.path.join(orig, f)), exist_ok=True)
            shutil.copyfile(os.path.join(tree, f), os.path.join(orig, f))
        for f, s in staged.items(): open(os.path.join(tree, f), "w").write(s)
        print("applied", name, "-", desc)
    elif act == "revert":
        if not os.path.exists(orig): sys.exit(f"{name} not applied")
        for root, _, files in os.walk(orig):
            for fn in files:
                src = os.path.join(root, fn); rel = os.path.relpath(src, orig)
                shutil.copyfile(src, os.path.join(tree, rel))
        shutil.rmtree(orig)
        print("reverted", name)
