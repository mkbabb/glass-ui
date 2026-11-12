# fix 12: summarise critic 12's c12a/c12b rows banked under fix-12/<arm>/<project>/.
#   python3 -I docs/release-10.1.5/scripts/fix-12-summary.py <dir>
import json, sys
B = sys.argv[1].rstrip('/') + '/'
for row in json.load(open(B + 'c12b.json')):
    sw = row['sweep']
    print('c12b', row['width'], 'coarse' if row['coarse'] else 'fine', row['dir'],
          'end ring worst', max((x['endRing'] or {}).get('worst', 0) for x in sw),
          '| first ring worst', max((x['firstRing'] or {}).get('worst', 0) for x in sw),
          '| caps hid 0 not round', [x['cap'] for x in sw if x['rest']['run']['hidden'] == 0 and not x['rest']['uniform']],
          '| hover hid 0 not round', [x['cap'] for x in sw if x['hover'] and x['hover']['run']['hidden'] == 0 and not x['hover']['uniform']],
          '| pct', any(x['rest']['pct'] for x in sw))
for row in json.load(open(B + 'c12a.json')):
    sw = row['sweep']
    print('c12a', row['width'], 'dark' if row['dark'] else 'light', 'found', sum(1 for x in sw if x['first'] and x['last']), '/', len(sw),
          '| cuts (stage, first, last)', [(x['stage'], x['first'] and x['first']['worst'], x['last'] and x['last']['worst']) for x in sw
                                          if (x['first'] and x['first']['worst'] > 0.5) or (x['last'] and x['last']['worst'] > 0.5)])
