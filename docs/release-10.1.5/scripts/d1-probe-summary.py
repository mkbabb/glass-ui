# fix 9 scratch: summarise d1probe JSON lines: largest visible frame step and the frames around it.
import json, sys
for path in sys.argv[1:]:
    print('==', path)
    for n, line in enumerate(open(path)):
        f = json.loads(line)
        most, at = 0, 0
        for i in range(1, len(f)):
            if min(f[i]['o'], f[i-1]['o']) <= 0.05: continue
            d = abs(f[i]['top'] - f[i-1]['top'])
            if d > most: most, at = d, i
        print(f'rep {n}: step {most:.2f} at frame {at}')
        if most >= 1:
            for g in f[max(0, at-3):at+2]:
                print('   ', g)
