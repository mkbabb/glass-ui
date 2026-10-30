#!/usr/bin/env python3
# H10's summariser: one short line per lens cell of a stage log (logs/<stage>-<engine>[-hash].log).
import re, sys
for p in sys.argv[1:]:
    t = open(p, encoding='utf8').read().split('\n')
    print('==', p.split('/')[-1], '|', t[0][t[0].find('load'):][:70] if t else '')
    for l in t:
        m = re.match(r'\s+(PASS|FAIL|REPORT|UNMEASURED)\s+E-1[03] \S+ (loupe (?:side|wobble|clock|exit scroll)[^·]*(?:·[^·]*){0,3}?|lensfilm · \w+) · (.*)', l)
        if not m: continue
        s, name, rest = m.groups(); L = re.search(r'load ([\d.]+)', rest); bits = []
        for rx in [r'(\d+) side change', r'largest one-frame move(?: against the track)? ([\d.]+) px', r'bound ([\d.]+) px = the span ([\d.]+) × row (\w+)', r'off its edge by > 2 px on (\d+) frames', r'worst ([\d.]+) px, 0? ?', r'worst pinned edge (-?[\d.]+) px', r'on the exit.s own frames (-?[\d.]+) px', r'ends flush (\w+)', r'whole at the end (\w+)']:
            q = re.search(rx, rest)
            if q: bits.append('/'.join(q.groups()))
        if 'lensfilm' in name:
            bits = [','.join(re.findall(r'worst off (\d+) px, (\d+) frames', rest)[i]) for i in range(len(re.findall(r'worst off (\d+) px, (\d+) frames', rest)))] or re.findall(r'worst off (\d+)', rest)
        print(f'  {s:6} {name.strip():44} {" | ".join(bits)}  L{L.group(1) if L else ""}')
    v = [x for x in t if re.match(r'E-\d+ \w+ (PASS|FAIL|UNMEASURED) ·', x)]
    for x in v: print('  ', x[:100])
