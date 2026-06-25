# W-NAV-DOCK-FIX — wire the SHIPPED dock prototypes into the live shell (the dock is the central hub)

**Tranche:** BD union · refine · nav-dock-fix
**Class:** ASSEMBLY/wiring (engines 100% shipped) + ONE optical token retune in `src/`
**Date:** 2026-06-23 (mid-tranche, fix-NOW)
**North star:** design.md §L1 six-layer Liquid Glass composite · glass+PAPER morphism · BA.W-NO-GRAY warm-chroma floor (glass is warm MATERIAL, never gray) · [[feedback-liquid-weight-universal]] (inertia/weight/bounce/squish on ALL motion). NO legacy, idiomatic, gestalt, compositor-only, PRM-carved, Safari-compatible.

---

## 0. THE MANDATE (verbatim user defects)

The demo storybook NAV DOCKS are TOTALLY BROKEN — fix NOW using the SHIPPED dock prototypes:
1. "Clicking categories does nothing" — DEAD category nav.
2. "Using these nav buttons doesn't work half of the time" — FLAKY nav-button wiring.
3. "The rail item in the centre is totally broken and needs to use our actual rail PROTOTYPE" — wire the real `<DockStack mode="facets">` (box-INVIOLATE gutter rail).
4. "None of this works." — systemic.
5. "The bottom dock should have PERSISTENT controls, but ALSO SCROLLING TABS of the current category's pages" — a persistent control group + a horizontally-scrolling `<FadingScroll>` tab strip of the current category's pages.
6. "The vertical dock is totally broken with the broken rail."
7. "When you reload a page, it very briefly displays this Pick a story item and then animates to the page — a MAJOR defect" — the async-route FOUC.

**The bar is GESTALT** — every defect closes only when a FRESH reload of the live shell reads as a working, idiomatic, liquid-glass central hub wired to the SHIPPED prototypes, in BOTH modes, BOTH viewports, on a real GPU.

---

## 1. THE FIX (the BUILD-SPEC ledger — see BUILD-SPEC.md for before/after bodies)

| # | File | Change | Defect |
|---|---|---|---|
| F1 | `demo/layout/AppShell.vue:277–297` | Gate the placeholder behind `route.matched.length === 0`, not `!Component` | 7 |
| F2 | `demo/router.ts` | `beforeResolve` one-shot eager-resolve of the first lazy component | 7 |
| F3 | `demo/layout/SidebarDock.vue:70,233–240,409–426` | Always-expanded category rail (categories clickable from frame 0); drop the dead `#collapsed` glyph | 1, 6 |
| F4 | `demo/layout/SidebarDock.vue:114–122,441–447` | Map `accent` onto `railItems`; `<DockStack mode="facets" :core :visible-count position="end">` | 3, 6 |
| F5 | `demo/layout/BottomDock.vue:97–105,380–386` | Same `accent` + `mode="facets"` rail | 3, 6 |
| F6 | `demo/layout/BottomDock.vue:56–80,247–286,356–367` | Persistent prev/next (disabled-not-removed) + `<FadingScroll axis="x">` strip of the full in-category page list; delete the ≤4 collapsed summary | 2, 5 |
| F7 | `demo/stories/dock-layer-contexts.ts` | `ContextLayer.accent: string` field + a `--section-color-N` hue per facet row | 3 |
| S1 | `src/styles/tokens/glass.css:113–117,142` | Mint `--glass-saturate-dock: 1.4`; light `--glass-blur-dock` += `saturate() brightness(1.02)` | gray-glass |
| S2 | `src/styles/tokens/glass.css:316` | `--glass-border-dock` 4% → 8% warm-ink | gray-glass |
| S3 | `src/styles/tokens/dark-arm.css:259` | Re-point dark dock saturate to the named knob (value 1.30 unchanged) | dark symmetry |
| G1 | `scripts/proof-no-gray.mjs` | 3 source witnesses (saturate-present, lockstep, border-readable); NO floor weakened | gate |
| G2 | `tests-visual/nav-dock-fix.spec.ts` | NEW — the binding π (born-RED on HEAD) | gate |

**Posture:** the rail, the contextual switching, FadingScroll, GlassDock/useDockState, DockSection, useStoryNavigation are ALL shipped — this is W-DOCK-HUB-API assembly. ONE token + ONE rim α in `src/`; the rest is `demo/`. ONE registry (`useStoryNavigation` — the router is the single source of truth; no shadow state). The `railContext` writable-computed echo-suppression is KEPT (it correctly discriminates a real chip click from a v-model echo).

---

## 2. THE GATE — `proof:no-gray` extend-in-place + the binding π (born-RED on the CURRENT defect)

### 2.1 — `proof:no-gray.mjs` source witnesses (G1, device-free, NO floor weakened)

Add to the source arm (parse `src/styles/tokens/glass.css` + `dark-arm.css`):

```js
// W-NAV-DOCK-FIX — the optical gray-slab class machine-caught (the chroma-floor asserts
// already pass at HEAD because the base --card is warm; these witnesses catch the MISSING
// light-concentration filter — the real optical-gray root). NO existing floor moved.
const glassCss = read("src/styles/tokens/glass.css");
const darkArm  = read("src/styles/tokens/dark-arm.css");

// W1 — the light dock blur carries a saturate() companion (the flat-slab root cannot
//      regress to blur()-alone silently). Born-RED on HEAD (`--glass-blur-dock: blur(…)`).
const lightDockBlur = matchDecl(glassCss, "--glass-blur-dock"); // the :root (light) decl
witness("dock-blur-has-saturate-light", /saturate\(/.test(lightDockBlur),
    "light --glass-blur-dock must carry a saturate() light-concentration companion");

// W2 — the saturate is ≥ 1.2 in light AND the dark arm carries its own (the §2c pair).
const lightSat = Number((glassCss.match(/--glass-saturate-dock:\s*([\d.]+)/) ?? [])[1]);
const darkHasDockSat = /--glass-saturate-dock:\s*[\d.]+/.test(darkArm)
    || /--glass-blur-dock:[^;]*saturate\(/.test(darkArm);
witness("dock-blur-saturate-lockstep", lightSat >= 1.2 && darkHasDockSat,
    "light dock saturate ≥ 1.2 AND the dark arm carries its own dock saturate");

// W3 — the light dock border α ≥ 6% (the silhouette floor — catches a regress to 4%).
const borderPct = Number((glassCss.match(/--glass-border-dock:[^;]*var\(--foreground\)\s*([\d.]+)%/) ?? [])[1]);
witness("dock-border-readable-light", borderPct >= 6,
    "light --glass-border-dock ≥ 6% warm-ink (the readable silhouette)");
```

### 2.2 — `tests-visual/nav-dock-fix.spec.ts` (G2, the binding π — born-RED on the CURRENT defect)

A REAL Playwright π over the live `:5199` shell, BOTH projects (`chromium-headless-new` desktop + `coarse-touch` mobile), BOTH modes. Each `expect` is born-RED on HEAD (the defect tree) and GREEN after the fix. SKETCH:

```ts
import { test, expect } from "@playwright/test";

// W-NAV-DOCK-FIX π — the binding paint over the REAL shell. Born-RED on the defect tree.
const ROUTE = "/forms/inputs"; // a deep route with >1 facet + multi-page category

for (const mode of ["light", "dark"] as const) {
  test.describe(`nav-dock-fix · ${mode}`, () => {

    test("defect 7 — NO 'Pick a story' FOUC on a matched-route reload", async ({ page }) => {
      // Watch for the literal placeholder text from the very first frame.
      await page.addInitScript(() => {
        (window as any).__sawPick = false;
        new MutationObserver(() => {
          if (document.body?.textContent?.includes("Pick a story"))
            (window as any).__sawPick = true;
        }).observe(document.documentElement, { childList: true, subtree: true });
      });
      await page.goto(`http://localhost:5199${ROUTE}`, { waitUntil: "commit" });
      await page.waitForSelector("[data-testid='bottom-dock-collapsible']");
      // BORN-RED: HEAD flashes the placeholder ~181–414ms during async resolve.
      expect(await page.evaluate(() => (window as any).__sawPick)).toBe(false);
    });

    test("defects 1,6 — category nav LIVE from frame 0 (not inert)", async ({ page }) => {
      await page.goto(`http://localhost:5199${ROUTE}`);
      const items = page.locator(".demo-sidebar-item");
      const n = await items.count();
      expect(n).toBeGreaterThan(3);
      // Every category button is clickable AT REST — no hover-dwell.
      for (let i = 0; i < n; i++) {
        const pe = await items.nth(i).evaluate((el) => getComputedStyle(el).pointerEvents);
        // BORN-RED: HEAD reads "none" on the collapsed dock's inert #default layer.
        expect(pe).not.toBe("none");
      }
      // A click navigates AND paints the section (no dead-click, no placeholder).
      const before = page.url();
      await items.last().click();
      await page.waitForFunction((u) => location.href !== u, before);
      expect(page.url()).not.toBe(before);
      expect(await page.evaluate(() => document.body.textContent?.includes("Pick a story"))).toBe(false);
    });

    test("defects 3,6 — the rail is the SHIPPED facets carousel (accent, box-inviolate)", async ({ page }) => {
      await page.goto(`http://localhost:5199${ROUTE}`);
      for (const id of ["sidebar-dock-rail", "bottom-dock-rail"]) {
        const rail = page.locator(`[data-testid='${id}']`);
        // BORN-RED: HEAD renders data-mode="stack".
        await expect(rail).toHaveAttribute("data-mode", "facets");
        // Each facet chip resolves a DISTINCT --glass-accent (not the transparent no-op).
        const accents = await rail.locator(".dock-facet-chip").evaluateAll((els) =>
          els.map((el) => getComputedStyle(el).getPropertyValue("--glass-accent").trim()));
        expect(accents.length).toBeGreaterThan(1);
        expect(new Set(accents).size).toBeGreaterThan(1); // distinct hues
        expect(accents.every((a) => a && a !== "transparent")).toBe(true);
      }
      // BOX-INVIOLATE — the dock box is constant across the fan open/closed.
      const dock = page.locator("[data-testid='sidebar-dock-collapsible']");
      const b0 = await dock.boundingBox();
      await page.locator("[data-testid='sidebar-dock-rail']").hover();
      await page.waitForTimeout(400); // past the spring settle
      const b1 = await dock.boundingBox();
      expect(Math.abs(b1!.width - b0!.width)).toBeLessThan(1);
      expect(Math.abs(b1!.height - b0!.height)).toBeLessThan(1);
    });

    test("defects 2,5 — persistent controls + scrolling category-page tab strip", async ({ page }) => {
      await page.goto(`http://localhost:5199${ROUTE}`);
      const strip = page.locator(".demo-bottom-dock__tabs");
      await expect(strip).toBeVisible();
      // The tab count == the full in-category page list (NOT the ≤4 summary slice).
      const tabCount = await strip.locator("button, a").count();
      // BORN-RED: HEAD has NO strip (0 tabs in #default; ≤4 in the inert #collapsed).
      expect(tabCount).toBeGreaterThan(4);
      // Exactly one active tab carries aria-current="page".
      expect(await strip.locator("[aria-current='page']").count()).toBe(1);
      // Overflow scrolls INSIDE the FadingScroll port — the dock height is constant.
      const dock = page.locator("[data-testid='bottom-dock-collapsible']");
      const h0 = (await dock.boundingBox())!.height;
      await strip.evaluate((el) => { const sc = el.querySelector("[data-fade-scroll-content], *"); (sc as HTMLElement).scrollLeft = 9999; });
      const h1 = (await dock.boundingBox())!.height;
      expect(Math.abs(h1 - h0)).toBeLessThan(1);
      // Prev/next are PRESENT (four-state, disabled at boundary — never DOM-absent).
      await expect(page.getByLabel("Previous story")).toBeAttached();
      await expect(page.getByLabel("Next story")).toBeAttached();
      // Clicking a tab navigates (one registry).
      const before = page.url();
      await strip.locator("button, a").last().click();
      await page.waitForFunction((u) => location.href !== u, before);
    });

    test("defect 6 — warm-cream luminous glass, NEVER gray (OKLab readback)", async ({ page }) => {
      await page.goto(`http://localhost:5199${ROUTE}`);
      // paint-arm.mjs OKLab parse of the composited dock plate + a rail chip.
      const samples = await page.evaluate(() => {
        const grab = (sel: string) => {
          const el = document.querySelector(sel) as HTMLElement | null;
          return el ? getComputedStyle(el).backgroundColor : "";
        };
        return {
          dock: grab(".demo-bottom-dock__shell"),
          chip: grab(".dock-facet-chip"),
        };
      });
      // Use the shared paint-arm oklab() parser — assert hue ∈ [45,85], C ≥ floor.
      for (const css of Object.values(samples)) {
        const { L, C, H } = parseOklab(css); // from tests-visual/_paint-arm helper
        expect(H).toBeGreaterThanOrEqual(45);
        expect(H).toBeLessThanOrEqual(85);   // BORN-RED if it drifts to ~95° yellow-green
        expect(C).toBeGreaterThanOrEqual(mode === "light" ? 0.010 : 0.008);
      }
    });

    test("§3 — liquid-weight: the rail fan springs+staggers (overshoot frame-series)", async ({ page }) => {
      await page.goto(`http://localhost:5199${ROUTE}`);
      const rail = page.locator("[data-testid='sidebar-dock-rail']");
      // Sample the member transform across the fan — a spring overshoots past the
      // settled scale before settling (NOT a linear/hard show). BORN-RED if any
      // member jumps from hidden→shown with no in-between spring frame.
      const series = await sampleTransformSeries(page, rail, ".dock-stack-member", 600);
      expect(hasOvershoot(series)).toBe(true);
      // PRM run — the squish is OFF, the fade is KEPT, no overshoot.
      await page.emulateMedia({ reducedMotion: "reduce" });
      const prm = await sampleTransformSeries(page, rail, ".dock-stack-member", 600);
      expect(hasOvershoot(prm)).toBe(false);
    });
  });
}
```

**Enrollment:** the new spec is auto-enrolled by `proof:visual-runner` (the non-private glob); it rides `--run pi` (LOCAL real-GPU) + the W-REFLECT close. The `dark` arm flips `.dark` on `<html>` before each `goto`. `parseOklab`/`sampleTransformSeries`/`hasOvershoot` reuse the shared `tests-visual/_paint-arm` + the dock-morph-family frame-series helpers (NO new helper engine — compose the shipped π leaves).

### 2.3 — born-RED proof (the defect-tree anchor)
On the CURRENT HEAD tree every `expect` above fails: the FOUC fires (defect 7), the category buttons read `pointer-events:none` (defects 1/6), the rail reads `data-mode="stack"` with no accent (defects 3/6), the tab strip is absent (defects 2/5), the optical dock plate reads flat (gray-glass). The gate is born-RED on the disease and flips GREEN at the fix — the cardinal-lesson anchor.

---

## 3. THE `proof:ba-gestalt` VERDICT (the gestalt close oracle)

The dock + cross-page gestalt surfaces re-earn their PASS on a FRESH capture at W-REFLECT, BOTH modes, over the REAL shell backdrop — the holistic "does it read as a working liquid-glass central hub" judgement the per-mechanism π cannot prove. Every declared capture path resolves on disk (the anti-evasion floor). DELTA at `docs/tranches/BD/viz/refine/nav-dock-fix/W-NAV-DOCK-FIX-DELTA.md`.

---

## 4. FENCES (binding)

NO re-fork (wire the shipped `<DockStack mode="facets">`/`useContextualDockLayers`/`<FadingScroll>`/`GlassDock`/`useStoryNavigation`; `proof:dock-rail-realize` R1/R3 reds a second rail SFC) · NO Lenis/GSAP (native `.smooth-scroll` + FadingScroll) · NO gray (warm material, no `--surface-tint-N` neutral on the rail) · NO layout animation (compositor-only, box-INVIOLATE) · NO snap/hop/linear-move (liquid-weight on all motion) · NO FOUC workaround (router-ready + `route.matched.length`, not a setTimeout/opacity hack) · PRM-carved + Safari-compatible + four-state contract · presets-in-consumers (the rail hues are `--section-color-N` library identities READ by the demo, never minted).

---

## 5. CLOSE CONDITION

`complete` IFF all 8 acceptance verdicts (BUILD-SPEC §8) PASS on a FRESH capture in BOTH modes + BOTH viewports over the REAL shell on a real GPU (Chromium + Safari), `proof:no-gray` GREEN (G1 witnesses + the π dock arm), `tests-visual/nav-dock-fix.spec.ts` GREEN under `--run pi`, the `proof:ba-gestalt` dock + cross-page verdicts GREEN on the fresh capture, and `npm run typecheck` + `proof:no-layout-animation` + `proof:dock-rail-realize` + `proof:animation-coherence` all GREEN (no spring re-tune, no second rail, no layout animation). Else `complete_with_misses` with the named gestalt miss.
