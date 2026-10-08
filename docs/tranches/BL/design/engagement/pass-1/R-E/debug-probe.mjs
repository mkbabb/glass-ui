#!/usr/bin/env node
// R-E · debug reads behind glance.mjs's first run: (1) is the thumb :focus-visible after a pointer drag (reka focuses it
// by script)? (2) the switch's [data-g] presence; (3) WebKit ::backdrop opacity when data-engaged is set after vs before
// showPopover (plain page).
const L = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";
const { serveTarget, Engine, openPage, center, load, parseArgs, acquireLock } = await import(L);
const a = parseArgs(); await acquireLock();
const T = await serveTarget({ build: a.build });
for (const name of ["chromium", "webkit"]) {
  const E = new Engine(name); await E.browser();
  const P = await openPage(E, T, "glance", { vp: { width: 900, height: 640 } });
  const c = await center(P.page, '[data-g="slider-a"] [role=slider]');
  await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(300); await P.page.mouse.up(); await P.page.waitForTimeout(800);
  const r = await P.page.evaluate(() => { const t = document.querySelector('[data-g="slider-a"] [role=slider]'); return { focused: document.activeElement === t, fv: t.matches(":focus-visible"), scale: getComputedStyle(document.querySelector('[data-g="slider-a"]')).scale, switchEl: !!document.querySelector('[data-g="switch"]'), switchTag: document.querySelector('[role=switch]')?.outerHTML.slice(0, 160) }; });
  console.log(name, "after pointer drag", JSON.stringify(r), "load", load());
  const p2 = await (await E.browser()).newPage();
  await p2.setContent(`<style>#p::backdrop{opacity:0;background:red;transition:opacity 50ms} #p[data-e]::backdrop{opacity:1} #q::backdrop{opacity:0;background:red;transition:opacity 50ms} #q[data-e]::backdrop{opacity:1}</style><div id=p popover=manual>p</div><div id=q popover=manual>q</div>`);
  const b = await p2.evaluate(async () => {
    const p = document.getElementById("p"), q = document.getElementById("q");
    p.showPopover(); p.setAttribute("data-e", ""); // after
    await new Promise((r) => setTimeout(r, 300)); const after = getComputedStyle(p, "::backdrop").opacity; p.hidePopover();
    q.setAttribute("data-e", ""); q.showPopover(); // before
    await new Promise((r) => setTimeout(r, 300)); const before = getComputedStyle(q, "::backdrop").opacity;
    q.removeAttribute("data-e"); await new Promise((r) => setTimeout(r, 300)); const removed = getComputedStyle(q, "::backdrop").opacity;
    return { attrAfterShow: after, attrBeforeShow: before, attrRemovedWhileOpen: removed };
  });
  console.log(name, "::backdrop opacity", JSON.stringify(b), "load", load());
  await E.close();
}
T.close();
