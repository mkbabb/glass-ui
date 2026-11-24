# inksumm.py <logs-dir> <engine>: MEASURE-9 part M, G-15 on m9/ink9.mjs's three split logs (logs/m9-ink-m9m-ink{1,2,3}.<engine>.json),
# scored as RULINGS-8's ready list words it: words 4.5 on every seat (a words cell on the warm field in dark that reads no
# lower than v11.0.2's on the same cell is named under question 21, not RED); glyphs 3; nothing unsettled; marks at 1.2 and
# hover at 1.1 against the dock (questions 18 and 21's defaults), v11.0.2's per-cell floors printed beside; hover against
# current printed; the loose control at v11.0.2's computed fills. Prints every failing line.
import json, glob, os, sys
L, E = sys.argv[1], sys.argv[2]
fs = sorted(glob.glob(os.path.join(L, f"m9-ink-m9m-ink[123].{E}.json")))
base = {}
bf = os.path.join(L, f"m8-ink-base.{E}.json")
if os.path.exists(bf):
    for c in json.load(open(bf)).get("cells", []):
        for it in c.get("all") or []:
            if it["kind"] == "text": base[(c["page"], c["ground"], c["scheme"], it["text"])] = it["cr"]
n = dict(cells=0, words=0, glyphs=0, marks=0, hovers=0); red, named, printed = [], [], []
mins = dict(word=9e9, glyph=9e9, mark=9e9, hover=9e9, sep=9e9)
for f in fs:
    for c in json.load(open(f))["cells"]:
        n["cells"] += 1; where = f"{c['page']} {c['ground']} {c['scheme']} {c.get('posture')}"
        for it in c.get("all") or []:
            k = "words" if it["kind"] == "text" else "glyphs"; n[k] += 1
            mins["word" if k == "words" else "glyph"] = min(mins["word" if k == "words" else "glyph"], it["cr"])
            if it.get("unsettled"): red.append(f"unsettled {where}: {it['kind']} {it['text']} op {it.get('op')}")
            if it["pass"]: continue
            if it["kind"] == "text":
                b = base.get((c["page"], c["ground"], c["scheme"], it["text"]))
                if c["ground"] == "field" and c["scheme"] == "dark" and b is not None and it["cr"] >= b - 0.005:
                    named.append(f"{where}: words {it['text']} {it['cr']} (v11.0.2 {b}): named under question 21")
                else: red.append(f"{where}: words {it['text']} {it['cr']} < 4.5 (v11.0.2 on the cell: {b})")
            else: red.append(f"{where}: glyph {it['text']} {it['cr']} < {it['need']}")
        for m in (c.get("marks") or []) + (c["hover"] if isinstance(c.get("hover"), list) else []):
            if m.get("mark") is None: continue
            n["marks"] += 1; mins["mark"] = min(mins["mark"], m["mark"])
            fl = f" (v11.0.2 floor {m.get('base')})" if m.get("base") is not None else ""
            fl += f" [{m['dock']}]" if m.get("dock") else ""
            if m["mark"] < 1.2: red.append(f"{where}: mark {m['name']} {m['mark']} < 1.2{fl}")
            h = m.get("hover")
            if h:
                n["hovers"] += 1; mins["hover"] = min(mins["hover"], h["againstGround"]); mins["sep"] = min(mins["sep"], h["againstCurrent"])
                if h["againstGround"] < 1.1: red.append(f"{where}: hover {h['name']} {h['againstGround']} off the dock < 1.1")
                printed.append(f"{where}: hover {h['name']} off the dock {h['againstGround']}, from current {m['name']} {h['againstCurrent']}; mark {m['mark']}{fl}")
        for x in c.get("looseFails") or []: red.append(f"loose {c['ground']} {c['scheme']}: {x}")
print(f"{E}: {len(fs)} logs, {n['cells']} cells, {n['words']} words, {n['glyphs']} glyphs, {n['marks']} marks, {n['hovers']} hovers")
print(f"  lowest: words {mins['word']}, glyph {mins['glyph']}, mark {mins['mark']}, hover off the dock {mins['hover']}, hover from current {mins['sep']}")
print(f"RED ({len(red)}):"); [print("  " + x) for x in red]
print(f"named under question 21 ({len(named)}):"); [print("  " + x) for x in named]
print("printed (hover and mark per cell, v11.0.2 floors beside):"); [print("  " + x) for x in printed]
