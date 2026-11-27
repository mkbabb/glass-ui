#!/usr/bin/env python3
"""v7-table.py <record/inspect/v7.<engine>.json>: prints round 3's v7 record as one line a reading,
grouped by cell, then case and id, with each build's values side by side."""
import json
import sys
from collections import OrderedDict

rec = json.load(open(sys.argv[1]))
builds = [b["name"] for b in rec["builds"]]
rows = OrderedDict()
for r in rec["rows"]:
    if "error" in r:
        print("ERROR", r.get("build"), r.get("cell"), r["error"][:200])
        continue
    key = (r.get("cell"), r["case"], r.get("id", ""), r.get("gesture", ""))
    rows.setdefault(key, {})[r.get("build")] = r


def brief(r):
    c = r["case"]
    if c == "strip":
        return f"flag={'y' if r['flag'] else 'n'} ox={r['ox']} w={r['w']} h={r['h']} sw/cw={r['sw']}/{r['cw']} span/room={r['span']}/{r['room']} hidden={r['tabsPastClip']} box={r['box']['sw']}/{r['box']['cw']}" + (f" sib={r['sibling']['w']}x{r['sibling']['lines']}l" if r.get("sibling") else "")
    if c == "dock":
        return f"fits={'y' if r['fits'] else 'n'} ta={r['ta']} sw/cw={r['sw']}/{r['cw']}"
    if c == "cfg":
        return f"wrap={r['wrap']['ox']}/{r['wrap']['oy']} past={r['widePast']} box={r['box']['sw']}/{r['box']['cw']} closedH={r['closed']['regionH']} closedHit={r['closed']['rowHit']}"
    if c == "row":
        ch, bt = r.get("chip") or {}, r.get("button") or {}
        return f"row={r['rowW']} chip={ch.get('w')}x{ch.get('lines')}l({ch.get('wrap')}) button={bt.get('w')}x{bt.get('lines')}l({bt.get('wrap')})"
    if c == "swipe":
        moved = {k: v for k, v in r.items() if k.startswith("[") and (v["x"] or v["y"])}
        return f"page={r['pageX']},{r['pageY']} moves={r['moves']} cancel={r['cancel']} moved={moved or 0}"
    if c == "sheet":
        return f"moves={r['moves']} cancel={r['cancel']} followed={r['followed']} rest={r['rest']} strip={r['stripPanned']}"
    if c == "scroll-steady":
        return f"flag {r['before']['flag']}->{r['after']['flag']} off {r['before']['off']}->{r['after']['off']} sl {r['before']['sl']}->{r['after']['sl']}"
    if c == "flag-follows":
        return " ".join(f"{s['w']}:{'y' if s['flag'] else 'n'}/{s['ox']}" for s in r["steps"])
    if c == "wheel":
        return f"strip={r['strip']} page={r['page']}"
    if c == "sheet-strips":
        return " ".join(f"{k}: flag={'y' if v['flag'] else 'n'} ox={v['ox']} ta={v['ta']} {v['sw']}/{v['cw']}" for k, v in r.items() if k.startswith("v7-"))
    if c == "page":
        return f"docW={r['docW']}"
    return json.dumps(r)[:200]


for (cell, case, rid, gesture), per in rows.items():
    print(f"[{cell}] {case} {rid} {gesture}".rstrip())
    for b in builds:
        if b in per:
            print(f"    {b:9} {brief(per[b])}")
