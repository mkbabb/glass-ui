# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: release-11-1-1.spec.ts >> expand · an ExpandableContainer reopened while it leaves turns from where it is
- Location: release-11-1-1.spec.ts:1468:1

# Error details

```
Error: the reopen lands mid-exit {"top":1,"atTurn":0,"between":27,"share":0.123,"end":1,"frames":[[-8,0],[0,0],[5,0],[13,0],[21,0],[28,0],[37,0.01],[43,0.026],[50,0.052],[57,0.088],[66,0.139],[74,0.19],[79,0.227],[86,0.274],[95,0.343],[103,0.401],[108,0.435],[116,0.497],[124,0.55],[131,0.599],[141,0.657],[146,0.685],[154,0.728],[161,0.765],[169,0.8],[175,0.823],[182,0.847],[190,0.872],[197,0.894],[206,0.915],[213,0.93],[219,0.941],[227,0.953],[235,0.977],[245,1],[252,1],[260,1],[269,1],[275,1],[283,1]]}

expect(received).toBeGreaterThan(expected)

Expected: > 0.02
Received:   0
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - generic "Exits" [ref=e4]:
      - toolbar [ref=e8]:
        - button "Home" [ref=e9] [cursor=pointer]: ⌂
        - combobox "Select view" [ref=e10] [cursor=pointer]:
          - generic [ref=e11]: Picker
          - generic: Picker
          - img [ref=e12]
        - button "Actions" [ref=e14] [cursor=pointer]: ⋯
      - status [ref=e15]
    - generic [ref=e16]:
      - button "Popover" [ref=e17]
      - button "Tooltip" [ref=e18]
      - button "Tooltip 2" [ref=e19]
      - button "Dialog" [ref=e20]
      - button "Sheet right" [ref=e21]
      - button "Sheet bottom" [ref=e22]
      - button "Sheet top" [ref=e23]
      - button "Sheet left" [ref=e24]
      - button "Detented" [ref=e25]
    - generic [ref=e26]:
      - button "Toast" [ref=e27]
      - button "Brief toast" [ref=e28]
      - combobox [ref=e29] [cursor=pointer]:
        - generic: Picker
        - img [ref=e30]
      - button "Pressed 0" [ref=e32]
    - generic [ref=e33]:
      - button "Collapsible" [ref=e35]
      - heading "Accordion" [level=3] [ref=e38]:
        - button "Accordion" [ref=e39] [cursor=pointer]:
          - text: Accordion
          - img [ref=e40]
    - button "Toggle fullscreen" [ref=e42]
  - dialog "Fullscreen" [ref=e43]:
    - button "Exit fullscreen" [active] [ref=e45]:
      - img [ref=e46]
    - generic [ref=e52]: A figure.
  - region "Notifications (F8)":
    - list
```

# Test source

```ts
  1379 |     }
  1380 |     return stopFilm(page, 1200);
  1381 | }
  1382 | 
  1383 | /** What is seen of the overlay at rest, open: read by opening it, then closing it. */
  1384 | async function overlayFull(page: Page, project: string): Promise<number> {
  1385 |     await pressOn(page, project, `${EXPAND} [data-mode="expand"]`);
  1386 |     await page.waitForTimeout(900);
  1387 |     const vw = page.viewportSize()!;
  1388 |     const box = (await page.locator(PANEL).boundingBox())!;
  1389 |     await page.keyboard.press("Escape");
  1390 |     await page.waitForTimeout(900);
  1391 |     const w = Math.max(0, Math.min(box.x + box.width, vw.width) - Math.max(box.x, 0));
  1392 |     const h = Math.max(0, Math.min(box.y + box.height, vw.height) - Math.max(box.y, 0));
  1393 |     return (w * h) / (vw.width * vw.height);
  1394 | }
  1395 | 
  1396 | function judgeOverlay(film: Film, vw: { width: number; height: number }, from: number, full: number) {
  1397 |     const ch = overlayChannel(vw);
  1398 |     const before = film.frames.filter((f) => f.t < from);
  1399 |     const series: [number, number][] = [before[before.length - 1], ...film.frames.filter((f) => f.t >= from)].map((f) => [f.t, ch(f) / full]);
  1400 |     const top = 1;
  1401 |     return {
  1402 |         top: +top.toFixed(3),
  1403 |         atTurn: +series[0][1].toFixed(3),
  1404 |         between: series.filter(([, v]) => v > 0.02 && v < 0.98).length,
  1405 |         share: +worstFrameShare(series, 1).toFixed(3),
  1406 |         end: +series[series.length - 1][1].toFixed(3),
  1407 |         frames: series.map(([t, v]) => [Math.round(t - from), +v.toFixed(3)]).slice(0, 40),
  1408 |     };
  1409 | }
  1410 | 
  1411 | const toggle = (project: string) => (page: Page) => pressOn(page, project, '[data-testid="x-expand-toggle"]');
  1412 | 
  1413 | test("expand · an ExpandableContainer enters on a tween", async ({ page }, info) => {
  1414 |     const project = info.project.name;
  1415 |     await openHarness(page);
  1416 |     await page.locator(EXPAND).scrollIntoViewIfNeeded();
  1417 |     const full = await overlayFull(page, project);
  1418 |     const film = await filmExpand(page, () => pressOn(page, project, `${EXPAND} [data-mode="expand"]`));
  1419 |     const read = judgeOverlay(film, page.viewportSize()!, film.mark, full);
  1420 |     await info.attach("enter", { body: JSON.stringify(read), contentType: "application/json" });
  1421 |     const at = JSON.stringify(read);
  1422 |     expect(read.end, `it ends whole ${at}`).toBeGreaterThan(0.95);
  1423 |     expect(read.between, `more than two frames between gone and whole ${at}`).toBeGreaterThan(2);
  1424 |     expect(read.share, `no frame carries more than a fifth ${at}`).toBeLessThanOrEqual(0.2);
  1425 | });
  1426 | 
  1427 | for (const route of ["exit", "escape", "open"] as const) {
  1428 |     test(`expand · an ExpandableContainer leaves on a tween by ${route}`, async ({ page }, info) => {
  1429 |         const project = info.project.name;
  1430 |         await openHarness(page);
  1431 |         await page.locator(EXPAND).scrollIntoViewIfNeeded();
  1432 |         const full = await overlayFull(page, project);
  1433 |         await pressOn(page, project, `${EXPAND} [data-mode="expand"]`);
  1434 |         await page.waitForTimeout(900);
  1435 |         const act =
  1436 |             route === "exit"
  1437 |                 ? () => pressOn(page, project, `${EXPAND} [data-mode="collapse"]`)
  1438 |                 : route === "escape"
  1439 |                   ? () => page.keyboard.press("Escape")
  1440 |                   : () => page.evaluate(() => (document.querySelector('[data-testid="x-expand-toggle"]') as HTMLElement).click());
  1441 |         const film = await filmExpand(page, act);
  1442 |         const read = judgeOverlay(film, page.viewportSize()!, film.mark, full);
  1443 |         await info.attach("leave", { body: JSON.stringify(read), contentType: "application/json" });
  1444 |         const at = JSON.stringify(read);
  1445 |         expect(read.end, `it ends gone ${at}`).toBeLessThan(0.02);
  1446 |         expect(read.between, `more than two frames between whole and gone ${at}`).toBeGreaterThan(2);
  1447 |         expect(read.share, `no frame carries more than a fifth ${at}`).toBeLessThanOrEqual(0.2);
  1448 |     });
  1449 | }
  1450 | 
  1451 | test("expand · an ExpandableContainer closed while it enters turns from where it is", async ({ page }, info) => {
  1452 |     const project = info.project.name;
  1453 |     await openHarness(page);
  1454 |     await page.locator(EXPAND).scrollIntoViewIfNeeded();
  1455 |     const full = await overlayFull(page, project);
  1456 |     const film = await filmExpand(page, () => pressOn(page, project, `${EXPAND} [data-mode="expand"]`), {
  1457 |         wait: 60,
  1458 |         act: () => page.keyboard.press("Escape"),
  1459 |     });
  1460 |     const read = judgeOverlay(film, page.viewportSize()!, film.turn, full);
  1461 |     await info.attach("turn", { body: JSON.stringify(read), contentType: "application/json" });
  1462 |     const at = JSON.stringify(read);
  1463 |     expect(read.atTurn, `the close lands mid-entrance ${at}`).toBeGreaterThan(0.02);
  1464 |     expect(read.end, `it ends gone ${at}`).toBeLessThan(0.02);
  1465 |     expect(read.share, `no frame carries more than a fifth ${at}`).toBeLessThanOrEqual(0.2);
  1466 | });
  1467 | 
  1468 | test("expand · an ExpandableContainer reopened while it leaves turns from where it is", async ({ page }, info) => {
  1469 |     const project = info.project.name;
  1470 |     await openHarness(page);
  1471 |     await page.locator(EXPAND).scrollIntoViewIfNeeded();
  1472 |     const full = await overlayFull(page, project);
  1473 |     await pressOn(page, project, `${EXPAND} [data-mode="expand"]`);
  1474 |     await page.waitForTimeout(900);
  1475 |     const film = await filmExpand(page, () => page.keyboard.press("Escape"), { wait: 50, act: () => toggle(project)(page) });
  1476 |     const read = judgeOverlay(film, page.viewportSize()!, film.turn, full);
  1477 |     await info.attach("turn", { body: JSON.stringify(read), contentType: "application/json" });
  1478 |     const at = JSON.stringify(read);
> 1479 |     expect(read.atTurn, `the reopen lands mid-exit ${at}`).toBeGreaterThan(0.02);
       |                                                            ^ Error: the reopen lands mid-exit {"top":1,"atTurn":0,"between":27,"share":0.123,"end":1,"frames":[[-8,0],[0,0],[5,0],[13,0],[21,0],[28,0],[37,0.01],[43,0.026],[50,0.052],[57,0.088],[66,0.139],[74,0.19],[79,0.227],[86,0.274],[95,0.343],[103,0.401],[108,0.435],[116,0.497],[124,0.55],[131,0.599],[141,0.657],[146,0.685],[154,0.728],[161,0.765],[169,0.8],[175,0.823],[182,0.847],[190,0.872],[197,0.894],[206,0.915],[213,0.93],[219,0.941],[227,0.953],[235,0.977],[245,1],[252,1],[260,1],[269,1],[275,1],[283,1]]}
  1480 |     expect(read.end, `it ends whole ${at}`).toBeGreaterThan(0.95);
  1481 |     expect(read.share, `no frame carries more than a fifth ${at}`).toBeLessThanOrEqual(0.2);
  1482 | });
  1483 | 
  1484 | test("expand · Escape is live from the entrance's first frame", async ({ page }, info) => {
  1485 |     const project = info.project.name;
  1486 |     await openHarness(page);
  1487 |     await page.locator(EXPAND).scrollIntoViewIfNeeded();
  1488 |     // The press, then Escape in the first frame after it.
  1489 |     await page.evaluate(
  1490 |         () =>
  1491 |             new Promise<void>((done) => {
  1492 |                 (document.querySelector('[data-testid="x-expand"] [data-mode="expand"]') as HTMLElement).click();
  1493 |                 requestAnimationFrame(() => {
  1494 |                     (document.activeElement ?? document.body).dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  1495 |                     done();
  1496 |                 });
  1497 |             }),
  1498 |     );
  1499 |     void project;
  1500 |     await page.waitForTimeout(800);
  1501 |     expect(await page.locator(`${EXPAND}[data-state="collapsed"]`).count(), "Escape in the entrance's first frame closes it").toBe(1);
  1502 | });
  1503 | 
  1504 | // ── leave ──────────────────────────────────────────────────────────────────────────
  1505 | //   leave  every surface that opens says when its leave has finished: one bubbling,
  1506 | //          composed `leave-finished` event from its content element, with its kind in
  1507 | //          `detail`, stamped at or after the last frame in which the surface is still
  1508 | //          seen, and the same-named Vue emit once with it; a close reversed by a reopen
  1509 | //          says nothing.
  1510 | 
  1511 | const leaves = [
  1512 |     { name: "Dialog", kind: "dialog", trigger: '[data-testid="x-dialog"]', content: '[data-testid="x-dialog-content"]' },
  1513 |     { name: "Sheet", kind: "sheet", trigger: '[data-testid="x-sheet-right"]', content: '[data-testid="x-sheet-right-content"]' },
  1514 |     { name: "Popover", kind: "popover", trigger: '[data-testid="x-popover"]', content: '[data-testid="x-popover-content"]' },
  1515 |     { name: "DropdownMenu", kind: "menu", trigger: '[data-testid="x-menu"]', content: '[data-testid="x-menu-content"]' },
  1516 |     { name: "Select", kind: "select", trigger: '[data-testid="x-select"]', content: '[data-testid="x-select-content"]' },
  1517 |     { name: "Tooltip", kind: "tooltip", trigger: '[data-testid="x-tooltip"]', content: '[data-testid="x-tooltip-content"]', hover: true },
  1518 |     { name: "Toast", kind: "toast", trigger: '[data-testid="x-toast"]', content: '[data-slot="toast"]', dismiss: '[data-slot="toast"] button[aria-label="Dismiss"]' },
  1519 | ];
  1520 | 
  1521 | async function listenLeaves(page: Page): Promise<void> {
  1522 |     await page.evaluate(() => {
  1523 |         const w = window as unknown as { __leaves: { at: number; kind: string; bubbles: boolean; composed: boolean }[] };
  1524 |         w.__leaves = [];
  1525 |         window.addEventListener("leave-finished", (e) => {
  1526 |             const ce = e as CustomEvent<{ kind: string }>;
  1527 |             w.__leaves.push({ at: performance.now(), kind: ce.detail?.kind, bubbles: ce.bubbles, composed: ce.composed });
  1528 |         });
  1529 |     });
  1530 | }
  1531 | 
  1532 | const readLeaves = (page: Page) =>
  1533 |     page.evaluate(() => ({
  1534 |         events: (window as unknown as { __leaves: { at: number; kind: string; bubbles: boolean; composed: boolean }[] }).__leaves,
  1535 |         emitted: (window as unknown as { __emitted?: Record<string, number> }).__emitted ?? {},
  1536 |     }));
  1537 | 
  1538 | for (const c of leaves) {
  1539 |     const open = async (page: Page, project: string) => (c.hover ? page.locator(c.trigger).hover() : pressOn(page, project, c.trigger));
  1540 |     const close = async (page: Page, project: string) =>
  1541 |         c.dismiss ? pressOn(page, project, c.dismiss) : c.hover ? page.mouse.move(8, 880) : page.keyboard.press("Escape");
  1542 | 
  1543 |     test(`leave · a ${c.name} says once that its leave has finished, after its last seen frame`, async ({ page }, info) => {
  1544 |         const project = info.project.name;
  1545 |         test.skip(Boolean(c.hover) && isPhone(project), "a Tooltip does not open on touch");
  1546 |         await openHarness(page);
  1547 |         await listenLeaves(page);
  1548 |         await open(page, project);
  1549 |         await page.locator(`${c.content}[data-state$="open"]`).first().waitFor();
  1550 |         await page.waitForTimeout(900);
  1551 |         await startFilm(page, c.content);
  1552 |         await markFilm(page);
  1553 |         await close(page, project);
  1554 |         const film = await stopFilm(page, 1200);
  1555 |         const { events, emitted } = await readLeaves(page);
  1556 |         const seen = seenChannel(page.viewportSize()!);
  1557 |         const lastSeen = Math.max(...film.frames.filter((f) => f.t >= film.mark && seen(f) > 0.001).map((f) => f.t), film.mark);
  1558 |         const read = {
  1559 |             events: events.map((e) => ({ ...e, at: Math.round(e.at - film.t0 - film.mark) })),
  1560 |             lastSeen: Math.round(lastSeen - film.mark),
  1561 |             emitted: emitted[c.content.match(/"(x-[^"]+)"/)?.[1] ?? ""] ?? null,
  1562 |         };
  1563 |         await info.attach("leave", { body: JSON.stringify(read), contentType: "application/json" });
  1564 |         const at = JSON.stringify(read);
  1565 |         expect(events.length, `one event ${at}`).toBe(1);
  1566 |         expect(events[0].kind, `its kind ${at}`).toBe(c.kind);
  1567 |         expect(events[0].bubbles && events[0].composed, `it bubbles and is composed ${at}`).toBe(true);
  1568 |         expect(events[0].at - film.t0, `it comes at or after the last seen frame ${at}`).toBeGreaterThanOrEqual(lastSeen);
  1569 |         if (c.kind !== "toast") expect(read.emitted, `the Vue emit fires once with it ${at}`).toBe(1);
  1570 |     });
  1571 | 
  1572 |     test(`leave · a ${c.name} closed and reopened mid-exit says nothing`, async ({ page }, info) => {
  1573 |         const project = info.project.name;
  1574 |         test.skip(Boolean(c.hover) && isPhone(project), "a Tooltip does not open on touch");
  1575 |         test.skip(c.kind === "toast", "a dismissed toast is not reopened");
  1576 |         await openHarness(page);
  1577 |         await listenLeaves(page);
  1578 |         await open(page, project);
  1579 |         await page.locator(`${c.content}[data-state$="open"]`).first().waitFor();
```