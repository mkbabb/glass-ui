import os, re, sys
def css(root):
    t = ''
    for d, _, fs in os.walk(root):
        for f in fs:
            if f.endswith('.css'):
                t += open(os.path.join(d, f), encoding='utf-8', errors='replace').read()
    return t
def js(root):
    t = ''
    for d, _, fs in os.walk(root):
        for f in fs:
            if f.endswith('.js'):
                t += open(os.path.join(d, f), encoding='utf-8', errors='replace').read()
    return t
a, b = css(sys.argv[1]), css(sys.argv[2])
ja, jb = js(sys.argv[1]), js(sys.argv[2])
kinds = {
 'custom property decl': r'(?<![\w-])(--[\w-]+)\s*:',
 '@property': r'@property\s+(--[\w-]+)',
 'keyframes': r'@keyframes\s+([\w-]+)',
 'layer names': r'@layer\s+([\w\-, .]+)[;{]',
 'class selector': r'\.((?:[a-zA-Z_][\w-]*))(?=[^{}]*\{)',
 'data- attribute (css)': r'\[(data-[\w-]+)',
}
for k, rx in kinds.items():
    sa, sb = set(re.findall(rx, a)), set(re.findall(rx, b))
    if k == 'layer names':
        sa = {x.strip() for s in sa for x in s.split(',')}; sb = {x.strip() for s in sb for x in s.split(',')}
    print(f'{k}: {len(sa)} -> {len(sb)}; removed {sorted(sa-sb)[:40]}; added {sorted(sb-sa)[:40]}')
rx = r'["\'`](--[\w-]+)["\'`]'
sa, sb = set(re.findall(rx, ja)), set(re.findall(rx, jb))
print(f'JS-written custom properties: {len(sa)} -> {len(sb)}; removed {sorted(sa-sb)}; added {sorted(sb-sa)}')
