import { witness, openPage, center } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";
await witness("dev", "sheet prm", async ({ E, T, cell }) => {
  for (const prm of [false, true]) {
    const P = await openPage(E, T, "sheet", { prm });
    try {
      const sel = '[data-slot="sheet-detent-handle"]';
      const rd = () => P.page.evaluate((s) => { const h = document.querySelector(s); const g = h?.firstElementChild; return { press: h?.hasAttribute("data-press"), op: g && getComputedStyle(g).opacity, drag: !!document.querySelector("[data-dragging]"), hover: h?.matches(":hover") }; }, sel);
      const c = await center(P.page, sel); await P.page.mouse.move(c.x, c.y); await P.page.waitForTimeout(300);
      const h = await rd(); await P.page.mouse.down(); await P.page.waitForTimeout(250); const p = await rd(); await P.page.mouse.up();
      cell(`prm ${prm}`, "REPORT", JSON.stringify({ h, p }));
    } finally { await P.close(); }
  }
});
