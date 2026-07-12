# BI.W-AUTH-SHELL-BG — retire the heaviest shader as a page wash + the one-GL-per-route budget

Band B5 (substrates / perf). The auth-shell mounts the heaviest shader (a 4.87MP Fourier SDF) as a
decorative page background PLUS an aurora (2–3 live GL contexts). Retire the fourier page-bg + hold the
one-GL budget.

## §Mandate

Discharges (registry rows this wave OWNS):
- **PERF-2 [P0] / FAM-5** — auth-shell mounts the library's heaviest shader (a full-bleed 4.87MP Fourier
  SDF) as decorative page background behind an auth form, plus a brand-panel aurora (measured live: 3
  contexts — fourier 3024×1612 = 4.87MP + aurora 793×1079 + a stray aurora 2268×1209).
- **UF-K4** — "Performance on /compositions/auth-shell is miserable."
- **FAM-5 multi-GL-routes / W-VIZ-ROUTE-ONE-GL** — the one-GL-per-route budget is not held (the stray/leaked
  aurora context) — the CONFIRMED auth-shell instance owned here; the unconfirmed grid-route leak is a rider
  obligation (real-nav confirmation owed).

## §Design

Decided mechanism — FAM-5 disposition W-FOURIER-PAGE-BG-RETIRE: a teaching SDF must NEVER be an ambient page
wash. NO re-litigating (the heaviest-in-library shader as a decorative wash is the definitional over-provision).

- **Drop `{kind:"fourier"}` from auth-shell's manifest row** (`manifest.ts:1277`) — use `paper`/`grid` or a
  single FROZEN frame; the auth form does not need a live epicycle field behind it.
- **Fold the `fourier` background KIND out of StoryHero** (or gate it to `freeze`/one-shot only) — a
  full-bleed live Fourier SDF as a `StoryHero` background kind is retired (`StoryHero.vue:319-323` mounts
  `<FourierField>` `position:fixed inset:0` for `kind==='fourier'`); no route declares a live fourier wash.
- **The one-GL-per-route budget:** auth-shell drops to ONE (or zero) live GL context — the second brand-panel
  aurora (`auth-shell.vue:58`) + the stray aurora are reconciled (the stray-context is a possible undisposed
  hero-field surviving the route swap; StoryHero must dispose the manifest background field when the route
  body hosts its own field — `StoryHero.vue:303-323` always mounts the manifest background even when the
  route body has its own).
- The whole-route sufficiency: this + W-FOURIER-RIBBON together retire the fourier ROUTE complaint (the
  ribbon fixes the fill; this removes the leaked/decorative contexts — co-equal terms).

## §Work

- `demo/stories/manifest.ts:1277` — drop `{ kind:"fourier" }` from the auth-shell row → `paper`/`grid` or a
  frozen frame.
- `demo/.../StoryHero.vue:319-323` — fold the `fourier` background kind out (or gate to `freeze`/one-shot);
  `:303-323` — dispose the manifest background field when the route body hosts its own studio field (kill the
  double-mount).
- `demo/stories/compositions/auth-shell.vue:58` — reconcile the second brand-panel aurora (drop or share the
  one context).
- `dock/overview.vue:626` — the 2nd aurora beside the DockStage aurora (coordinate with W-STAGE-FIELD-CLAMP —
  one GL context per route).

## §Acceptance

Gate: **`proof:one-gl-per-route`** (NEW or EXTEND) + the auth-shell context census.
Born-RED at HEAD: `/compositions/auth-shell` mounts 3 GL contexts (fourier 4.87MP + 2 auroras);
`StoryHero` carries the `fourier` background kind. GREEN here.
- AB1 — the auth-shell manifest row carries NO `{kind:"fourier"}`; no route declares a live fourier wash.
- AB2 — `/compositions/auth-shell` mounts ≤1 live GL context (the fourier page-bg + the stray aurora gone).
- AB3 — `StoryHero` disposes the manifest background field when the route body hosts its own (no
  double-mount); the `fourier` kind folded/gated to freeze.
- Self-test bite: a planted `{kind:"fourier"}` page-bg REDs; a planted route with 3+ GL contexts REDs.

## §π/DELTA

`tests-visual/auth-shell-bg.spec.ts` (NEW; LOCAL) + `W-AUTH-SHELL-BG-DELTA.md`:
- The live canvas census on `/compositions/auth-shell`: ≤1 GL context (down from 3); the auth form reads
  clean over the paper/grid/frozen backdrop; both modes.
- The frame-timing before/after (the "miserable" → smooth read) on Chrome + **real WebKit**.
- Rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE compositions verdict.

## §Obligations

- **Device run (SAF-1):** the auth-shell frame-timing on real WebKit (UF-K4). `dis:safari-metal-verify` seam.
- **Rider obligation (unconfirmed):** the grid-route stray-aurora leak (drawer / drawer-live-behind showed a
  live aurora despite a `grid` category default — measured under SYNTHETIC pushState nav, needs REAL
  link-navigation confirmation + a canvas census after several hops). CONFIRM under real nav; if it
  reproduces, the StoryHero dispose fix (AB3) covers it — else record as a synthetic-nav artifact. Owed at
  build, not guessed.
- No cross-repo ask (demo manifest + StoryHero fix; no library API change).

## §Dispositions

- **W-VIZ-ROUTE-ONE-GL** (the FAM-5 multi-GL row) is FOLDED here (the confirmed auth-shell instance + the
  StoryHero double-mount dispose); the unconfirmed grid-route leak is the rider obligation above — NOT a
  separate wave, NOT a re-book.
- The whole-route sufficiency fence with W-FOURIER-RIBBON is recorded (the two are co-equal route terms).
