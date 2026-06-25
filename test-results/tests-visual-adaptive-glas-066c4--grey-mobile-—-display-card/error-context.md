# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests-visual/adaptive-glass-live.spec.ts >> adaptive-glass-live (G1 — the IN-SITU π readback, no injected ancestor bucket) >> calm-light paint arm: surface reads warm-translucent (NOT grey) @ mobile — /display/card
- Location: tests-visual/adaptive-glass-live.spec.ts:308:13

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/display/card", waiting until "networkidle"

```

# Test source

```ts
  212 |             return text.length >= 8;
  213 |         }
  214 |         for (const sel of SELECTORS) {
  215 |             const isDock = sel === ".glass-dock";
  216 |             const nodes = Array.from(document.querySelectorAll(sel)).slice(0, 4);
  217 |             for (const node of nodes) {
  218 |                 if (!(node instanceof HTMLElement) || seen.has(node)) continue;
  219 |                 if (!isBodyBearing(node, isDock)) continue;
  220 |                 seen.add(node);
  221 |                 const cs = getComputedStyle(node);
  222 |                 const surfaceBg = cs.backgroundColor;
  223 |                 // The body-register ink. Content tiers read the --muted-foreground tier
  224 |                 // (the common body text on glass; the self-engage lifts it to
  225 |                 // --foreground over light). The dock reads its own --dock-fg-on-aurora
  226 |                 // (the glyph/label register, also lifted to the warm ink).
  227 |                 const inkToken = isDock
  228 |                     ? "var(--dock-fg-on-aurora, var(--foreground))"
  229 |                     : "var(--muted-foreground)";
  230 |                 const probe = document.createElement("span");
  231 |                 probe.style.color = inkToken;
  232 |                 node.appendChild(probe);
  233 |                 const bodyInk = getComputedStyle(probe).color;
  234 |                 probe.remove();
  235 |                 const alphaMatch =
  236 |                     surfaceBg.match(/\/\s*([\d.]+)\s*\)/) ?? surfaceBg.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
  237 |                 const alpha = alphaMatch ? Number(alphaMatch[1]) : 1;
  238 |                 out.push({ selector: sel, surfaceBg, bodyInk, isDock, translucent: alpha < 0.995 });
  239 |             }
  240 |         }
  241 |         return out;
  242 |     });
  243 | }
  244 | 
  245 | async function setLight(page: Page): Promise<void> {
  246 |     await page.evaluate(() => document.documentElement.classList.remove("dark"));
  247 |     await page.waitForTimeout(120);
  248 | }
  249 | 
  250 | test.describe("adaptive-glass-live (G1 — the IN-SITU π readback, no injected ancestor bucket)", () => {
  251 |     for (const vp of VIEWPORTS) {
  252 |         for (const route of ROUTES) {
  253 |             test(`in-situ glass clears 4.5:1 body + ΔL silhouette over #fff @ ${vp.name} — ${route}`, async ({
  254 |                 page,
  255 |             }) => {
  256 |                 await page.setViewportSize({ width: vp.width, height: vp.height });
  257 |                 await page.goto(route, { waitUntil: "networkidle" });
  258 |                 await setLight(page);
  259 | 
  260 |                 const readouts = await readInSituGlass(page);
  261 |                 // A route that paints no body-bearing glass surface is not a counter-
  262 |                 // example — but the enrolled routes are chosen to paint at least one.
  263 |                 expect(
  264 |                     readouts.length,
  265 |                     `${route}: no in-situ glass surface found (the enrolled route must paint at least one body-bearing glass tier)`,
  266 |                 ).toBeGreaterThan(0);
  267 | 
  268 |                 for (const r of readouts) {
  269 |                     const effBg = effectiveOverWhite(r.surfaceBg);
  270 |                     expect(effBg, `${route} ${r.selector}: could not resolve surface bg "${r.surfaceBg}" over white`).not.toBeNull();
  271 |                     const ink = parseColor(r.bodyInk);
  272 |                     expect(ink, `${route} ${r.selector}: could not parse body ink "${r.bodyInk}"`).not.toBeNull();
  273 | 
  274 |                     // (1) BODY register clears its floor over the in-situ-darkened plate
  275 |                     // / white — 4.5:1 for content tiers, 3:1 for the large dock glyph.
  276 |                     const ratio = contrastRatio([ink![0], ink![1], ink![2]], effBg!);
  277 |                     const floor = r.isDock ? AA_LARGE : AA_BODY;
  278 |                     expect(
  279 |                         ratio,
  280 |                         `${route} ${r.selector}: body register is ${ratio.toFixed(2)}:1 over white (ink ${r.bodyInk}, bg ${r.surfaceBg}) — under ${floor}:1. The in-situ self-engage did not lift the body register over light.`,
  281 |                     ).toBeGreaterThanOrEqual(floor);
  282 | 
  283 |                     // (2) SURFACE SILHOUETTE — the plate-over-white differs from white (the
  284 |                     // G2 surface-silhouette truth; the ΔL≈0.01 plate-vanishes baseline RED).
  285 |                     const dL = Math.abs(1.0 - relLuminance(effBg!));
  286 |                     expect(
  287 |                         dL,
  288 |                         `${route} ${r.selector}: surface silhouette ΔL is ${dL.toFixed(3)} over white (bg ${r.surfaceBg}) — under the ${DELTA_L_FLOOR} visibility floor (the plate vanishes — the G2 silhouette collapse). The self-engage darken did not fire in-situ.`,
  289 |                     ).toBeGreaterThanOrEqual(DELTA_L_FLOOR);
  290 | 
  291 |                     // (3) the surface stays TRANSLUCENT (AA by going opaque is a goal-miss).
  292 |                     expect(
  293 |                         r.translucent,
  294 |                         `${route} ${r.selector}: surface went OPAQUE (bg ${r.surfaceBg}) — AA cleared by losing the glass (a goal-miss, not the adaptive darken).`,
  295 |                     ).toBe(true);
  296 |                 }
  297 |             });
  298 | 
  299 |             // BC.W-PAINT-GATE — the BIDIRECTIONAL calm-light paint arm, BESIDE the kept
  300 |             // synthetic-white contrast arm above. The white arm proves legibility-over-
  301 |             // bright (its metrics are MONOTONIC in the darken direction — a grey slab
  302 |             // scores BETTER on it). This arm is the ANTI-GREY CEILING: over the calm-light
  303 |             // page the surface's OWN composited bg must read warm + translucent (oklabL ∈
  304 |             // [0.85,0.99] ∧ chroma ≥ 0.01 ∧ alpha < 0.70). Born-RED on HEAD's grey dock
  305 |             // oklab(0.695 0.002 0.006 / 0.536). The decompose is the SHARED leaf (one math
  306 |             // source); the band verdict is paintBand. The FIX passes BOTH arms; a grey slab
  307 |             // passes the white arm yet FAILS here — the dangerous class is killed.
  308 |             test(`calm-light paint arm: surface reads warm-translucent (NOT grey) @ ${vp.name} — ${route}`, async ({
  309 |                 page,
  310 |             }) => {
  311 |                 await page.setViewportSize({ width: vp.width, height: vp.height });
> 312 |                 await page.goto(route, { waitUntil: "networkidle" });
      |                            ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  313 |                 await setLight(page);
  314 | 
  315 |                 const allReadouts = await readInSituGlass(page);
  316 |                 expect(
  317 |                     allReadouts.length,
  318 |                     `${route}: no in-situ glass surface found (the enrolled route must paint at least one body-bearing glass tier)`,
  319 |                 ).toBeGreaterThan(0);
  320 | 
  321 |                 // On a busy-aurora route the non-dock content tiers carry the earned darken
  322 |                 // (the dynamic-range shift, asserted by the white/ΔL arm above) — only the
  323 |                 // DOCK holds the calm-light REST identity. On a calm route every tier does.
  324 |                 const busy = BUSY_AURORA_ROUTES.has(route);
  325 |                 const readouts = busy ? allReadouts.filter((r) => r.isDock) : allReadouts;
  326 |                 expect(
  327 |                     readouts.length,
  328 |                     `${route}: no calm-identity surface to read (a busy-aurora route must still paint the at-REST dock)`,
  329 |                 ).toBeGreaterThan(0);
  330 | 
  331 |                 for (const r of readouts) {
  332 |                     // The decompose is the ONE shared OKLab math source (paint-arm.mjs →
  333 |                     // reflect-capture-verify.mjs oklabFromRgb); this arm authors no second.
  334 |                     const stats = statsFromResolvedBg(r.surfaceBg);
  335 |                     expect(
  336 |                         stats,
  337 |                         `${route} ${r.selector}: could not decompose surface bg "${r.surfaceBg}" to OKLab (the calm-light paint read is degenerate)`,
  338 |                     ).not.toBeNull();
  339 |                     const verdict = paintBand(stats, bandForTier(r.selector, "light"));
  340 |                     expect(
  341 |                         verdict.pass,
  342 |                         `${route} ${r.selector}: surface bg "${r.surfaceBg}" is NOT warm-translucent over the calm-light page — ${verdict.reasons.join("; ")}. The grey slab can no longer score BETTER than warm cream (the anti-correlated metric is dead). Born-RED on HEAD's grey oklab(0.695 0.002 0.006 / 0.536); GREEN only on the BC.W-ADAPTIVE-RECONCILE warm-cream fix.`,
  343 |                     ).toBe(true);
  344 |                 }
  345 |             });
  346 |         }
  347 |     }
  348 | });
  349 | 
  350 | // ── BC.W-ADAPTIVE-RECONCILE — the CONTINUOUS-TRACK branch (the live observer loop) ──────
  351 | // The observer WRITES `--glass-backdrop-luma`; the content/overlay/dock `:where()` rules
  352 | // READ it on the RHS of the `--glass-tint-strength` clamp. This branch proves the loop
  353 | // DRIVES: with a HIGH measured luma (a bright field, past the 0.6 knee) the plate resolves
  354 | // a STRONGER tint than with a LOW luma (a dark trough, below the knee) — the continuous
  355 | // dynamic-range shift, NOT a binary bucket jump and NOT a flat floor.
  356 | //
  357 | // Born-RED on the DEAD loop: at HEAD the `:where()` rules pinned a FLAT
  358 | // `var(--glass-tint-strength-floor)`, so the resolved strength is IDENTICAL regardless of
  359 | // the injected luma (ΔStrength = 0 — the observer is decorative). GREEN only when the
  360 | // clamp reads the luma. This is a deterministic CSS-resolution readback (a `calc()` over an
  361 | // injected `--glass-backdrop-luma`), so it works CROSS-ENGINE including WebKit (no
  362 | // `backdrop-filter: url()`), exactly where apple-ios27.md §6 puts the legibility — on the
  363 | // cross-engine base. The live aurora drawImage sample is the orchestrator's paint capture;
  364 | // this branch validates the SOURCE response the sample drives.
  365 | function resolvedStrengthAt(page: Page, luma: number): Promise<number | null> {
  366 |     return page.evaluate((lumaValue) => {
  367 |         const surface = document.querySelector(
  368 |             ".glass-dock, .glass-card, .glass-resting, .glass-quiet, .glass-wash, .glass-floating, .glass-overlay",
  369 |         );
  370 |         if (!(surface instanceof HTMLElement)) return null;
  371 |         // The clamp resolves --glass-tint-strength AT THE SURFACE (where the :where() rule
  372 |         // applies), reading the surface's OWN --glass-backdrop-luma. So inject the measured
  373 |         // luma the observer would WRITE (a bright field vs a dark trough) ON THE SURFACE,
  374 |         // forcing the clamp to re-resolve; a child probe then reads the result. The probe
  375 |         // is `inline-block` at a fixed 100px width so the percentage strength resolves
  376 |         // against a KNOWN base (a percentage `padding-top` resolves against the containing
  377 |         // block's WIDTH — pinning the probe's own width makes 4% read 4px deterministically).
  378 |         const priorLuma = surface.style.getPropertyValue("--glass-backdrop-luma");
  379 |         surface.style.setProperty("--glass-backdrop-luma", String(lumaValue));
  380 |         const probe = document.createElement("div");
  381 |         probe.style.display = "inline-block";
  382 |         probe.style.width = "100px";
  383 |         probe.style.paddingTop = "var(--glass-tint-strength)";
  384 |         surface.appendChild(probe);
  385 |         const px = getComputedStyle(probe).paddingTop; // e.g. "4px" (4% of the 100px width)
  386 |         probe.remove();
  387 |         // Restore the surface's prior luma (leave the live observer's state untouched).
  388 |         if (priorLuma) surface.style.setProperty("--glass-backdrop-luma", priorLuma);
  389 |         else surface.style.removeProperty("--glass-backdrop-luma");
  390 |         const m = px.match(/([\d.]+)px/);
  391 |         return m ? Number(m[1]) : null;
  392 |     }, luma);
  393 | }
  394 | 
  395 | test.describe("adaptive-glass-live (CONTINUOUS-TRACK — the observer loop DRIVES the plate)", () => {
  396 |     for (const route of ["/dock/overview", "/display/card", "/substrates/glass-material"] as const) {
  397 |         test(`bright-region plate is STRONGER than dark-region plate (the luma DRIVES) — ${route}`, async ({
  398 |             page,
  399 |         }) => {
  400 |             await page.setViewportSize({ width: 1280, height: 800 });
  401 |             await page.goto(route, { waitUntil: "networkidle" });
  402 |             await setLight(page);
  403 | 
  404 |             // A dark trough (luma 0.2, below the 0.6 knee) → the calm floor; a bright bleed
  405 |             // (luma 0.95, past the knee) → the earned darken. The clamp lerps between.
  406 |             const darkStrength = await resolvedStrengthAt(page, 0.2);
  407 |             const brightStrength = await resolvedStrengthAt(page, 0.95);
  408 |             expect(
  409 |                 darkStrength,
  410 |                 `${route}: no glass surface to probe the continuous track on`,
  411 |             ).not.toBeNull();
  412 |             expect(brightStrength, `${route}: bright-region strength read degenerate`).not.toBeNull();
```