import json,sys
d=json.load(open(sys.argv[1]))
C=d['cells']
print('VERSION',d.get('version'),'error',d.get('error'))
for t in ['light','dark','forced']:
    c=C.get(f'sel-{t}')
    if not c: continue
    print('SEL',t,c['supports'],c['scheme'],c['errors'])
    for k,v in c['rows'].items(): print('  ',k,'plain text px',v['plain']['textColourPx'],'ink',v['plain']['inkShare'],'| selected text px',v['selected']['textColourPx'],'ink',v['selected']['inkShare'],'ground',v['selected']['ground'],'share',v['selected']['groundShare'])
    print('   bands',c['bands'])
for sh in ['underline','highlight']:
    c=C.get(f'comp-{sh}')
    if c:
        print('COMP',sh,'errors',c['errors'])
        print('  ssr',c['ssr'])
        print('  atMount',[(a['probe'],a['childElements'],a['textContent'][:12]) for a in c['atMount']][:3])
        for k,v in c['held'].items():
            print(f"  held {k:7s} ink={v['ink']} lines={v['lines']} rects={v['rects']} disp={v['display']} tc={v['textContent'][:14]!r}.. len={len(v['textContent'])} inner={len(v['innerText'])} sel={len(v['selection'])} inert={v['layerInert']} cloneFocus={v.get('cloneFocus')} attrs={v['copyAttrs']} hostAttrCopies={v['copiesCarryingHostAttrs']} us={v['layerUserSelect']}")
        print('  swap',{k:(v['pixels'],v['maxChannelDelta']) for k,v in c['swap'].items()})
        print('  rest',{k:(v['ink'],v['childElements']) for k,v in c['rest'].items()})
        print('  drawn',c['drawn'])
    c=C.get(f'clipped-{sh}')
    if c:
        print('CLIPPED',sh,{k:v['ink'] for k,v in c['after3s'].items() if k in('ellipsis','clamp','scroller')},'drawn',[x for x in c['drawn'] if x in('ellipsis','clamp','scroller')],'magenta',c['magenta'],'ratios',c['intersectionBefore'],'nudge',c['scrollerAfterNudge'],c['errors'])
    c=C.get(f'late-{sh}')
    if c:
        print('LATE',sh,'before',{k:(v['ink'],v['lines']) for k,v in c['before'].items()},c.get('fontsBefore'),'afterFace',{k:(v['ink'],v['lines']) for k,v in c['afterFace'].items()},'loaded',c['lateLoaded'],c.get('lateEvent'),'drawnAfterFace',c['drawnAfterFace'],'afterFaceVsRest',c['afterFaceVsRest'],'landedVsRest',c['swapLandedVsRest'],'drawn',c['drawn'],c['errors'])
    c=C.get(f'far-{sh}')
    if c:
        print('FAR',sh,c['atLoad'],c['after1s'],'entered',c['enteredAtStep'],'scrollY',c['scrollY'],c['swapLandedVsRest'],c['errors'])
