# W-AUTH-SHELL-BG — DELTA

**BI.W-AUTH-SHELL-BG** (PERF-2 [P0] / UF-K4 / FAM-5 · W-VIZ-ROUTE-ONE-GL fold). Retire
the library's heaviest shader as a decorative page wash + hold the one-GL-per-route
budget on `/compositions/auth-shell`.

## The defect (HEAD)

`/compositions/auth-shell` mounted **THREE live GL contexts**:

| context | source | size |
|---|---|---|
| fourier SDF | StoryHero `background: { kind: "fourier" }` → full-bleed `<FourierField>` | 3024×1612 = **4.87MP** (the library's HEAVIEST shader) |
| brand aurora | `auth-shell.vue` brand-panel `<Aurora>` | 793×1079 |
| shell aurora | the recessive AppShell `<Aurora>` (fourier is achromatic → does NOT suppress it) | 2268×1209 |

A teaching epicycle SDF ran as an ambient page wash behind an auth form — the
definitional over-provision ("performance is miserable", UF-K4).

## The fix

- **The `fourier` page-background kind is RETIRED (clean break, no alias).** Removed from
  the `StoryBackgroundKind` union (`aurora-hero.ts`), from `GL_BG_KINDS` (`focal.ts`), and
  from `StoryHero.vue` (the `<FourierField>` import + `liveBackdrop` term + the
  `kind === 'fourier'` template branch all folded out). No route declares a live fourier
  wash. The teaching `<FourierField>` lives ONLY on `/substrates/fourier-field` (a
  contained field over a calm paper wash), never as a page background.
- **auth-shell declares a calm `grid` blueprint wash (zero GL)** in its manifest row
  (`manifest.ts`) — not `paper` (that would collide with `paper-glass`, breaking the hero
  ≥4-distinct-substrate spread).
- **The recessive shell aurora stands down.** `compositions/auth-shell` is enrolled in
  `SELF_STAGES_GL` (`focal.ts`) — it mounts its OWN route-representative GL field (the
  brand-panel aurora) outside the `background` channel, the composition analogue of a
  `<DockStage>` route — so `suppressesShellField` returns true and the shell `<Aurora>`
  is not mounted.
- **The bespoke composition floats its own content (no double-frame).** `StoryHero`'s
  `fullBleed` is extended so a `heroTitle: false` bespoke composition over a STATIC wash
  ALSO floats its content directly (no chassis card) — auth-shell's self-authored
  split-panel is not double-framed by a StoryHero card. The ONLY `heroTitle: false` static
  hero is auth-shell (the live heroes already float via `liveBackdrop`).

Net: **3 GL contexts → 1** (the brand aurora), the fourier 4.87MP page-wash gone, the
shell aurora suppressed.

## The runtime census (binding truth)

`tests-visual/auth-shell-bg.spec.ts` on `chromium-headless-new` (getContext-instrumented,
side-effect-free GPU-context allocation count), BOTH modes:

```
[auth-shell-bg light] { liveGl: 1, canvasCount: 1, fullBleedGl: 0, hasEmail: true, hasPassword: true, hasSignIn: true }
[auth-shell-bg dark ] { liveGl: 1, canvasCount: 1, fullBleedGl: 0, hasEmail: true, hasPassword: true, hasSignIn: true }
```

- **ONE-GL** — `liveGl === 1` (down from 3). AB2 met.
- **NO-FOURIER** — `fullBleedGl === 0`; only ONE canvas on the whole page (the contained
  brand aurora). The 4.87MP fourier page-wash is gone. AB1 met.
- **FORM-CLEAN** — the email + password inputs + the sign-in button read clean over the
  calm grid backdrop, both modes. AB3 (form legibility) met.

## Gates

- `proof:one-gl-per-route` (NEW, `local`+`ci`) — 3/3 pass (AB1 fourier-kind-retired · AB2
  auth-shell-one-GL · AB3 no-double-mount). Self-test: bite-1 (planted `{kind:"fourier"}`
  page-bg → AB1 RED) + bite-2 (planted SELF_STAGES_GL route with a GL bg → AB3 RED) — both
  have teeth. Born-RED at HEAD (auth-shell manifest carried `{kind:"fourier"}`, StoryHero
  carried the FourierField branch, auth-shell not in SELF_STAGES_GL).
- `proof:focal-complete` — GREEN. C3 `expectGlKinds` re-pointed to the 3 surviving GL
  kinds (aurora · constellation · liquid-grid). C2 admits auth-shell (⊇ check).
- `proof:page-redesign` — GREEN. The `<FourierField>`-behind-the-card assert re-pointed
  to `<LiquidGrid>`; the StoryBackground union assert drops `fourier`, adds `liquid-grid`.
  The hero spread stays ≥4 distinct (intro=aurora, hero=constellation, paper-glass=paper,
  auth-shell=grid).

## Rider obligation (grid-route stray-aurora leak)

The unconfirmed grid-route stray-aurora leak (drawer / drawer-live-behind showed a live
aurora under SYNTHETIC pushState nav) is EXPLAINED by the same mechanism: the route swap
is a bare KEYED ATOMIC `<component :is>` swap (AppShell — no `<Transition>` leave window),
so an OLD route's StoryHero/shell field unmounts synchronously with the new mount. The
shell aurora is a PERSISTED node re-configured per non-focal nav, never re-mounted. Any
"stray" full-bleed aurora on a non-focal route is the SHELL aurora (correct — kept as the
warm underpaint), not a leaked hero field. Under real link-navigation the census reads
ONE canvas on auth-shell. Recorded as a synthetic-nav artifact of the pushState harness,
not a live leak — the StoryHero fold + SELF_STAGES_GL suppression cover the confirmed
auth-shell instance.

## Obligations booked

- **SAF-1 (device run):** the auth-shell frame-timing on real WebKit (the "miserable" →
  smooth read) rides the `dis:safari-metal-verify` seam / W-PI-IN-CLOSE battery.
- The π rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE compositions verdict.
