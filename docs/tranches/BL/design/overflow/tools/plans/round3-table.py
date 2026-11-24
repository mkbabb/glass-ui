"""Prints round3.mjs readings as compact lines: python3 -I round3-table.py <json>..."""
import json, sys
for path in sys.argv[1:]:
    d = json.load(open(path))
    print(f"== {path} ({d['engine']} {d.get('version')})")
    for r in d["rows"]:
        c = r.get("case")
        if c is None:
            print("ERROR", r); continue
        if c in ("tabs-ring", "fold8-ring"):
            g = r.get("ring") or {}
            p, m = g.get("past") or {}, g.get("room") or {}
            f = lambda o: "/".join(str(o.get(k, "-")) for k in "tblr")
            print(f"{c:10} {r['build']:5} {r['cell']:5} {(r.get('stripId') or ('uv' if 'vertical' in r.get('cls','') else 'u' if 'underline' in r.get('cls','') else 'p' if r.get('cls') else 'f8')):3} t{r['tabIndex']} fv={int(r['focus'].get('fv', 0))}{'' if r['focus'].get('how','').startswith('script') else '(Tab)'} "
                  f"{r['strip']['ox']}/{r['strip']['oy']} pad={r['strip']['padding']:<10} {r['outline']:<22} past t/b/l/r {f(p):<22} room {f(m):<26} cut={g.get('cut')} px={g.get('px')}")
        elif c == "fold8-glide":
            print(f"{c:10} {r['build']:5} {r['cell']:5} {r['behavior']:6} " + " ".join(f"{s['at']}:{s['strip']}/{s['box']}" for s in r["samples"]))
        elif c == "menu-shortcut":
            s = r.get("shortcut") or {}
            print(f"{c:10} {r['build']:5} {r['cell']:5} shortcut {s.get('w')}x{s.get('h')} lines={s.get('lines')} wrap={s.get('wrap')} row={r.get('row')}")
        elif c == "accordion-count":
            a, b = r.get("count") or {}, r.get("badge") or {}
            print(f"{c:10} {r['build']:5} {r['cell']:5} count {a.get('w')}x{a.get('h')} lines={a.get('lines')} wrap={a.get('wrap')}; badge {b.get('w')}x{b.get('h')} lines={b.get('lines')} ws={b.get('ws')}; trigger {r.get('trigger')}")
        elif c == "dialog-token-button":
            print(f"{c:10} {r['build']:5} {r['cell']:5} {r.get('ox')}/{r.get('oy')} {r.get('sw')}/{r.get('cw')} label past {r.get('labelPastBy')} reach {r.get('reach')} {r.get('error','')}")
