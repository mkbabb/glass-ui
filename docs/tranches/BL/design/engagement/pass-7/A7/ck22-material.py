# P-A7 CK-22: each consumer .vue line composing a material class whose press moved from :active to [data-press]::before
# (.glass-wash/-quiet/-resting/-floating/-overlay): the element it sits on, read back to its opening tag, and whether that
# element is pressable (a native button/a/summary/label, an @click/@pointerdown handler, role=button/tab/option, or a
# library control component that marks its own press). Sibling trees READ ONLY.
import os, re, sys, subprocess
R = "atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report".split()
SKIP = {"node_modules", "dist", "dist-demo", ".worktrees", "worktrees", ".claude", "docs", ".git", "bench", "coverage"}
CLS = re.compile(r"\bglass-(wash|quiet|resting|floating|overlay)\b")
LIB_MARKED = {"Button", "Card", "Chip", "Switch", "Checkbox", "ToggleGroupItem", "SegmentedTabs", "AccordionTrigger", "SelectTrigger", "PopoverTrigger", "DropdownMenuTrigger", "SortableItem", "SortableHandle"}
tot = {}; press = []
for r in R:
    for dp, dn, fn in os.walk(r):
        dn[:] = [d for d in dn if d not in SKIP and not d.startswith("dist")]
        for f in fn:
            if not f.endswith(".vue"): continue
            p = os.path.join(dp, f)
            try: L = open(p, encoding="utf8").read().split("\n")
            except Exception: continue
            for i, line in enumerate(L):
                if not CLS.search(line) or line.strip().startswith(("//", "*", "/*")): continue
                # the opening tag: walk back to the nearest '<Tag'
                j = i; tag = None
                while j >= 0 and j > i - 12:
                    m = list(re.finditer(r"<([A-Za-z][\w.-]*)", L[j]))
                    if m: tag = m[-1].group(1); break
                    j -= 1
                # the tag's attribute span: from j to the first line closing it
                k = i; span = "\n".join(L[j:i + 1]) if j >= 0 else line
                while k < len(L) and k < i + 12 and ">" not in L[k].split("class")[-1]: k += 1; span += "\n" + (L[k] if k < len(L) else "")
                kind = "style" if tag is None else ("pressable" if (tag in ("button", "a", "summary", "label") or re.search(r"@(click|pointerdown)|role=\"(button|tab|option|menuitem)\"", span)) else ("library-marked" if tag in LIB_MARKED else "inert"))
                tot.setdefault(r, {}).setdefault(kind, 0); tot[r][kind] += 1
                if kind in ("pressable", "library-marked"): press.append(f"{p}:{i+1} <{tag}> {kind}: {line.strip()[:140]}")
for r in R: print(r, tot.get(r, {}))
print("# pressable or library-marked lines")
print("\n".join(press) or "(none)")
