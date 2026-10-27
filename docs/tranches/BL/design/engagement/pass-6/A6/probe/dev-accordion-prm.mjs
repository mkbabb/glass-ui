// dev read: the accordion scene under reduce, before and after its Enter commit (the region's own state)
import { witness, openPage, tabKey, KEY_DWELL } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";
await witness("dev", "accordion prm", async ({ E, T, cell, engine }) => {
  for (const prm of [true, false]) {
    const P = await openPage(E, T, "accordion", { prm });
    try {
      const rd = () => P.page.evaluate(() => { const r = document.querySelector("main[data-scene]").getBoundingClientRect(); const c = document.querySelector('[data-state="open"][role="region"], [data-slot="accordion-content"]'); const cr = c?.getBoundingClientRect(); return { root: [r.width, r.height], content: c ? { h: cr.height, state: c.getAttribute("data-state"), text: c.textContent.slice(0, 40), anim: getComputedStyle(c).animationName } : null, items: [...document.querySelectorAll("[data-state]")].map((e) => `${e.tagName}.${e.getAttribute("data-state")}`).join(",") }; });
      await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(300);
      const a = await rd(); await P.page.keyboard.press("Enter", KEY_DWELL); await P.page.waitForTimeout(400); const b = await rd();
      cell(`prm ${prm}`, "REPORT", JSON.stringify({ a, b }).slice(0, 900));
    } finally { await P.close(); }
  }
});
