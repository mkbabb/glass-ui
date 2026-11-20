// Dismiss an age, cookie or store-locale gate: click the first visible control whose text says yes/accept/enter/stay.
// Evaluated in the page; returns what it clicked. Used by scan.mjs (--gate) and drill.mjs (spec.pre).
(() => {
  const re = /^(yes\b.*|accept( all)?( cookies)?|allow all|agree|i agree|i accept|ok|enter( site)?|got it|stay on .*|continue)$/i;
  const done = [];
  for (let pass = 0; pass < 2; pass++) {
    for (const el of document.querySelectorAll('button, a, [role="button"], input[type="button"], input[type="submit"]')) {
      const t = (el.innerText || el.value || '').replace(/\s+/g, ' ').trim();
      if (!t || t.length > 40 || !re.test(t)) continue;
      const r = el.getBoundingClientRect(); if (r.width < 4 || r.height < 4) continue;
      el.click(); done.push(t); break;
    }
  }
  return done;
})()
