"""Summarize recon JSON: per site, the depth signals. usage: python3 -I summarize.py <json>..."""
import json, sys
for p in sys.argv[1:]:
    R = json.load(open(p)); M = R['modes'].get('wide', {})
    if M.get('error'): print('##', R['name'], 'ERR', M['error'][:120]); continue
    C = M.get('census', {})
    print('##', R['name'], R['url'], 'docH', M.get('docH'), 'cost', M.get('cost'))
    print('  libs', {k: v for k, v in C.get('libs', {}).items() if v}, 'canvas', C.get('canvas'), 'video', len(C.get('video', [])))
    for k in ['timeline', 'viewTl', 'scrollTl', 'mask', 'clip', 'blend', 'sticky', 'p3d', 'persp', 'bgClipText', 'bgFixed']:
        if C.get(k + 'N'): print('  ', k, C[k + 'N'], C[k][:4])
    print('  css', M.get('cssText', {}).get('counts'))
    for r in M.get('cssText', {}).get('timelineRules', [])[:3]: print('   rule', r[:220])
    for t in M.get('texts', []):
        if t['cover']['covered'] or t['dup']: print('  TEXT', t['key'], repr(t['text'][:40]), t['fs'], 'cover', t['cover'], 'dup', t['dup'], t['dups'][:2], 'hid', t['ariaHiddenAt'])
    for t in M.get('textsEnd', []): print('  TEXTEND', t['key'], repr(t['text'][:40]), t['cover'])
    for r in M.get('rates', []):
        rs = [x for x in r['ratePer100']]
        odd = [x for x in rs if abs(x - 100) > 3]
        if odd or r['transformVaries'] or isinstance(r['opacity'], list) or r['clipVaries']:
            print('  RATE', r['label'][:70], rs, 'tf' if r['transformVaries'] else '', r['tfSample'][:2] if r['transformVaries'] else '', 'op', r['opacity'], 'clip' if r['clipVaries'] else '', r['clipSample'][:2] if r['clipVaries'] else '')
    print('  writers', M.get('writes', {}).get('writers', [])[:6])
