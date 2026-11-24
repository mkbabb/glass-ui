// witness5-snippets.mjs: the in-page readings of round 2 (value.js's four items), as
// `eval:` steps for inspect.mjs. Each returns a small JSON object.
const J = JSON.stringify;
const r1 = "const r1=n=>Math.round(n*10)/10;";

// A dock's run: the seats' room inside the run's clip at each end (the ring needs
// --dock-ring-reserve), its scroll range, and whether it reads data-run-fits.
export const dockRoom = (sel) =>
    `eval:(()=>{${r1}const d=document.querySelector(${J(sel)});if(!d)return 'none';const run=d.querySelector('.dock-layers > .dock-run');const R=run.getBoundingClientRect();const L=R.left+run.clientLeft,Rr=L+run.clientWidth;const seats=[...run.children].filter(s=>!s.classList.contains('dock-run-mark'));const a=seats[0].getBoundingClientRect(),b=seats.at(-1).getBoundingClientRect();return {fits:d.hasAttribute('data-run-fits'),run:run.scrollWidth+'/'+run.clientWidth,sl:run.scrollLeft,dockW:r1(d.getBoundingClientRect().width),roomStart:r1(a.left-L),roomEnd:r1(Rr-b.right),ring:getComputedStyle(d).getPropertyValue('--dock-ring-reserve').trim()}})()`;

// Narrow a dock's host by n px below the width the dock takes in it.
export const squeezeDock = (sel, n) =>
    `eval:(()=>{const h=document.querySelector(${J(sel)});const d=h.querySelector('.glass-dock');const w=d.getBoundingClientRect().width;h.style.inlineSize=(w-${n})+'px';h.style.alignItems='stretch';return {natural:Math.round(w*10)/10,host:Math.round((w-${n})*10)/10}})()`;

// Scroll a dock's run to its end and read the end seat's room again.
export const dockToEnd = (sel) => `eval:(()=>{const r=document.querySelector(${J(sel)}+' .dock-layers > .dock-run');r.scrollLeft=1e5;return r.scrollLeft})()`;

// Every LabeledField under a box: the field, its control column, the trigger, and how
// much of the trigger's value shows.
export const fields = (sel) =>
    `eval:(()=>{${r1}const box=document.querySelector(${J(sel)});if(!box)return 'none';return {box:box.scrollWidth+'/'+box.clientWidth,fields:[...box.querySelectorAll('[data-slot=labeled-field]')].map(f=>{const F=f.getBoundingClientRect();const t=f.querySelector('[data-slot=select-trigger]');const T=t.getBoundingClientRect();const v=t.querySelector('[data-slot=select-value]')||t.querySelector('span:not([aria-hidden])');const c=f.querySelector('.labeled-field-control');return {w:r1(F.width),sw:f.scrollWidth,cw:f.clientWidth,control:c.scrollWidth+'/'+c.clientWidth,trigger:r1(T.width),past:r1(T.right-F.right),value:v?(v.textContent.trim()+(v.scrollWidth>v.clientWidth+0.5||v.scrollHeight>v.clientHeight+1?' (cut)':'')):'?',gtc:getComputedStyle(f).gridTemplateColumns}})}})()`;

// EasingPicker: set its column to w px, then read the picker, the control row, the
// steps row and the jump-term trigger against the column's edge.
export const easing = (sel, w) =>
    `eval:(()=>{${r1}const box=document.querySelector(${J(sel)});box.style.inlineSize='${w}px';return 'ok'})()`;
export const easingRead = (sel) =>
    `eval:(()=>{${r1}const box=document.querySelector(${J(sel)});const B=box.getBoundingClientRect();const p=box.querySelector('.easing-picker')||box.firstElementChild;const row=box.querySelector('[data-slot=easing-controls]');const t=[...row.querySelectorAll('[data-slot=select-trigger]')].at(-1);const steps=t.parentElement.closest('[data-slot=easing-controls] > div')||t.parentElement;const T=t.getBoundingClientRect();const S=steps.getBoundingClientRect();const v=t.querySelector('[data-slot=select-value]')||t.querySelector('span');const kids=[...steps.children].map(c=>c.getBoundingClientRect());const lines=1+kids.filter(k=>k.top>=kids[0].bottom-1).length;return {col:r1(B.width),picker:p.scrollWidth+'/'+p.clientWidth,row:row.scrollWidth+'/'+row.clientWidth,steps:steps.scrollWidth+'/'+steps.clientWidth+' w'+r1(S.width)+' h'+r1(S.height)+' lines '+lines,trigger:r1(T.width),past:r1(T.right-B.right),value:v?(()=>{const m=document.createElement('span');m.style.cssText='position:absolute;visibility:hidden;white-space:nowrap;font:inherit';m.textContent=v.textContent.trim();v.append(m);const need=m.getBoundingClientRect().width;m.remove();return v.textContent.trim()+' needs '+r1(need)+' has '+r1(v.clientWidth)+(need>v.clientWidth+0.5?' (cut)':'')})():'?'}})()`;

// The vertical scrollers under a box (and open overlays): computed overflow on both
// axes and the sideways room.
export const scrollers = (sels) =>
    `eval:(()=>{const out=[];for(const sel of ${J(sels)}){for(const el of document.querySelectorAll(sel)){for(const e of [el,...el.querySelectorAll('*')]){const c=getComputedStyle(e);if(!/auto|scroll/.test(c.overflowY))continue;const n=e.getAttribute('data-testid')||e.getAttribute('data-slot')||(typeof e.className==='string'?e.className.split(' ').filter(x=>!/[:[\\]/]/.test(x)).slice(0,2).join('.'):e.tagName);out.push(n+' x:'+c.overflowX+' y:'+c.overflowY+' '+e.scrollWidth+'/'+e.clientWidth)}}}return out})()`;

// Plant a block 1 px wider than a scroller's padding box at its top, from its padding
// edge: a 1 px spill, the size value.js read on daraksha's bench.
export const spill = (sel) =>
    `eval:(()=>{const e=document.querySelector(${J(sel)});if(!e)return 'none';const c=getComputedStyle(e);const d=document.createElement('div');d.setAttribute('data-ovf-spill','');d.style.cssText='block-size:24px;inline-size:'+(e.clientWidth+1)+'px;margin-inline-start:-'+c.paddingLeft+';flex:none';e.prepend(d);e.scrollTop=0;return {sw:e.scrollWidth,cw:e.clientWidth,ox:c.overflowX}})()`;
export const sl = (sel) => `eval:document.querySelector(${J(sel)})?.scrollLeft`;

// The wrap form of the steps row, for comparison: the row wraps and the Select keeps 9rem.
export const easingWrap = (sel) =>
    `eval:(()=>{const box=document.querySelector(${J(sel)});const t=[...box.querySelectorAll('[data-slot=easing-controls] [data-slot=select-trigger]')].at(-1);t.style.flexShrink='0';t.parentElement.closest('[data-slot=easing-controls] > div').style.flexWrap='wrap';return 'ok'})()`;
// A label's text.
export const label = (sel, i, text) =>
    `eval:(()=>{const l=document.querySelectorAll(${J(sel)})[${i}];if(!l)return 'none';l.textContent=${J(text)};return 'ok'})()`;

// Focus a dock run's last seat from script (no pointer has been used, so the ring shows)
// and read the ring's room at the run's end after the run's own reach has run.
export const focusLast = (sel) =>
    `eval:(()=>{const d=document.querySelector(${J(sel)});const run=d.querySelector('.dock-layers > .dock-run');const seats=[...run.children].filter(s=>!s.classList.contains('dock-run-mark'));const last=seats.at(-1);const f=last.matches('button,[tabindex]')?last:last.querySelector('button,[tabindex]');f.focus();return {focused:document.activeElement===f,visible:f.matches(':focus-visible'),outline:getComputedStyle(f).outlineWidth+' + '+getComputedStyle(f).outlineOffset}})()`;
// The steps row's Slider: its width, its floor, its track, the lane the thumb's centre
// travels, and the thumb.
export const sliderRead = (sel) =>
    `eval:(()=>{${r1}const box=document.querySelector(${J(sel)});const s=box.querySelector('[data-slot=easing-controls] [data-slot=slider]');if(!s)return 'none';const w=(e)=>e?r1(e.getBoundingClientRect().width):null;return {col:w(box),slider:w(s),floor:getComputedStyle(s).minWidth,track:w(s.querySelector('.slider-track')),lane:w(s.querySelector('.slider-lane')),thumb:w(s.querySelector('.slider-thumb'))}})()`;
