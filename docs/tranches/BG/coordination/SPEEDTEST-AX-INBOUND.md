# SPEEDTEST-AX INBOUND — dispositions (2026-07-01)

**Source:** the SPEEDTEST-AX Pass-8 relay packet (source-of-record
`speedtest/docs/tranches/AX/coordination/BG.md` @ `11dd84a1+`), relayed by the user. Read
READ-ONLY; every disposition below is a glass-ui-side fold or a relay-back. speedtest gates
NOTHING on these (their process law) — no publish pressure exists.

## Context

Authored against `tranche/BG @ 2d21e63f`. Every packet claim was re-verified on OUR disk
(3-lane verification, run `wf_d1958428-039`) — several packet claims are corrected below where
disk truth diverged. All accepted items ride the joint **5.0.0** cut. The parked `4.3.0` keeps
its fixed staged contents (`28cf1cd1`); no new riders are added to it.

The packet carries 8 open asks + 2 new asks + 1 candidate + the §2/§3/§4 coordination items.
The four already-SHIPPED asks retire from the census as filed.

## Dispositions

**1 · ASK-GU-SEAL-DISC + ASK-GU-SEAL-DRAWSVG → ACCEPT — NEW row F6.7 `BG.W-SEAL-DISC` (P, 5.0.0).**
CompletionSeal gains `shape="disc"` (a filled-disc register joining `{check|ring|wordmark}`),
`personalBest: boolean` (the earned-gold garnish per the "gold is EARNED: the dock CTA +
personal-best garnish" canon — may mint `--seal-best`), and the disc→ring→check draw SEQUENCING
gesture. kf5 `fromDrawSVG` is decide-at-build: the CSS `stroke-dashoffset` wipe stays the floor;
wire `fromDrawSVG` only if it strengthens the gesture within the PRM/compositor laws
(KS-MOTION-DISNEY governs). Disk truth: the shape union today is `{check|ring|wordmark}`
(`constants.ts:21`) — no disc, no custom-path API, and no BG/BH row builds CompletionSeal (only
BH.B2.2's gate-path re-point touches it). This gates AX W3's seal consume — the release-line
answer AX needs is **5.0.0**. Their two-surface interim (CompletionRing + CompleteBadge) holds
until the 5.0.0 pin bump.

**2 · ASK-GU-DOCK-LABEL-RATIO → ACCEPT — clause on 4.1 (WS2 dock convergence, which already owns
the cockpit preset).** Flip `[data-preset="cockpit"]` `--dock-label-ratio` `0.42 → 0.275`
(`density.css:387` verified `0.42` at HEAD; speedtest ratified `0.275` = 12.1px at the 2.75rem
control in production). The `:root` `0.5088` default is untouched. Their local override deletes on
the 5.0.0 bump.

**3 · ASK-GU-PAPER-GRID-BREATHE → ACCEPT — clause on 14.1 (F4 `W-PAPER-TEXTURE-UNIFY`).** Ship the
opt-in `.paper-grid-breathe` register on the STATIC paper-grid utility: a slow low-amplitude
compositor-only opacity oscillation (long clock, PRM-static per the §6 calm register). CSS-only —
no timer, no Oscillator dependency (kf Oscillator stays booked). Disk truth: the WebGPU PaperGrid
viz already breathes internally (no consumer knob — that stays internal); speedtest's ask is on the
static utility its cards host.

**4 · ASK-GU-ONGLASS-FOREGROUND-RUNG → ACCEPT — clause on 3.5 (F2 tentpole
`W-GLASS-REGISTER-UNIFY`).** The on-glass foreground rung-completeness check rides the tentpole's
composited-fill calibration: verify whisper→body-strong coverage against the unified fill; author
missing rungs ONLY on a measured AA gap (no speculative rungs). Disk truth: `--on-glass-muted` +
`-strong` shipped (BB); `cd9ce46` (3.6) landed the 8px peer wider than the packet stated — the dock
AND the default Card also resolve it; wash/floating/overlay/deep differ BY DESIGN.

**5 · ASK-GU-LIQUIDFILL → ACCEPT — NEW row F6.8 `BG.W-LIQUID-FILL` (P, 5.0.0).** Extract Slider's
glass-cylinder fill recipe (`Slider.vue:184-217`) as the ONE shared liquid-fill register —
`Progress variant="liquid"` + the `.glass-liquid-fill` utility — with Slider re-reading the shared
register (consumer #1; the speedtest meter is #2 — the ≥2-consumer bar met honestly). Phase-color
composable without per-site glass knowledge. The fewer-sharper-primitives direction: one liquid-fill
recipe, N surfaces.

**6 · ASK-GU-LIQUIDHOVER residual → PARTIAL — clause on 3.10 (`W-GLASS-DYNAMICS`) + DECLINE the
blanket tier-root delegation.** ACCEPTED half — the interactive-glass-gleams rule: a `:pressable`
Card auto-arms specular exactly the way Button's glass variants do (one coherent rule — interactive
glass gleams). DECLINED half — a tier-root `pointermove` delegation arming ALL descendant glass: the
static-plate fence is deliberate (Card's specular default-OFF is a design decision — a static
content plate must not gleam; delegation erases the interactive/static distinction). Disk truth:
per-component `vSpecular` shipped (Button variant-gated, 5 dock controls, ScrubberTimeline; Card
opt-in via `:specular`). speedtest's path TODAY: `<Card :specular>` per interactive surface.
RE-LITIGATE-IF: a measured case where per-surface opt-in provably fails at scale.

**7 · ASK-GU-CARDTITLE-INK-CLIP → DISCHARGED-BY-EXISTING + DECLINE the library seam.** CardTitle is
a plain `<h3>` wrapper — a consumer CLASS on the slotted title node carries `background-image` +
`background-clip: text` + `color: transparent` today (unlayered consumer utilities beat `@layer
components`; our own `.metal-{gold,silver,bronze}` text-clip register proves the pattern inside this
cascade). The library-owned generic gradient-ink seam is DECLINED on the one-ink doctrine (heading
ink is `--foreground`; the metal family is the sanctioned clip register; a generic gradient-ink token
is technicolor-drift surface). Recipe relayed below (Relay-back (d)). RE-LITIGATE-IF: a second
consumer needs the seam AND the consumer-class route measurably fails.

**8 · ASK-GU-HERO-FACE-PRELOAD → ACCEPT — clause on BH.B2-export-reshape + a CORRECTION.**
Correction: the raw woff2 IS already separable and consumer-referenceable — `package.json` ships
`"./fonts/*" → dist/fonts/*` (incl. `plus-jakarta-sans-latin.woff2`, the VARIABLE display face wght
200..800). The real gap: IF `dist/styles/fonts.css` base64-inlines its `@font-face` `src`, a preload
of the standalone woff2 fetches a DIFFERENT resource and never matches. The clause: the fonts arm of
B2 delivers a preload-MATCHING posture — `@font-face` `src` referencing the same `./fonts/*.woff2`
URL a consumer preloads (inline-vs-URL decided with the Lighthouse number; if inline stays, ship a
documented linked variant) + a MIGRATION/`crossorigin` note.

**9 · ASK-GU-A11Y-AXE-CARVEOUTS → SPLIT.**
- **(A) ToastClose accessible name → ACCEPT — clause on `W-DESHADCN` (F6).** CONFIRMED real defect:
  `ToastClose.vue` renders a bare `<X>` svg with no `aria-label` (our disk). Ship a default
  accessible name (`aria-label` "Dismiss", overridable). speedtest un-excludes
  `[data-reka-toast-announce-exclude]` on the 5.0.0 bump.
- **(B) FocusScope sentinel span → PERMANENT-STAMP.** The sentinel is reka-ui UPSTREAM DOM
  (`node_modules/reka-ui` `useFocusGuards` `createFocusGuard` — `data-reka-focus-guard` +
  `tabIndex=0`); glass-ui's `FocusScope` is a thin pass-through rendering no sentinel of its own.
  glass-ui will not monkey-patch upstream DOM. speedtest archives the carve-out with justification
  "reka-upstream, permanent"; it dies naturally if reka fixes it.

**10 · ASK-GU-AURORA-SCHEME-LUMA → ACCEPT — clause on the F9 aurora wave `W-AUR-IMAGE-SOURCE` (the
config-surface wave).** `deriveAurora` gains a scheme/luminance option (`scheme: 'dark'` preset
shifting `DERIVE_L_BAND`, or an `lBand` override) — the `avoidHues` companion knob. Disk truth:
`avoidHues` shipped as `[start,end]` range tuples (`color.ts:156`); harmony exists; NO luminance
target today (fixed `DERIVE_L_BAND [0.35,0.95]`). Their measured dark-mode defect (light-pastel
aurora → flat gray composite) is the same luminous-dark identity concern `W-DARK-MATERIAL` owns — a
one-knob library affordance is coherent. Their scheme-conditional config interim deletes on consume.

**11 · §2 `.glass-refract` → roster + MIGRATION clause on the SOTA-LADDER successor rows (13.2 / F2.2
per the SUPERSESSION INDEX) + a CORRECTION.** Correction: the rename was a CLEAN BREAK at 4.1.0 — NO
`.glass-refract` selector survives at 4.2.0 (only the kept `--glass-refract*` token axis + the
internal `#glass-refract` filter id + the `glass-refract.css` FILENAME). speedtest's
`CompleteBadge.vue:16` `glass-refract` class binding is therefore ALREADY INERT at their current
4.2.0 pin — there is no future sequencing hazard, the garnish is silently absent TODAY. Disposition:
(a) speedtest recorded in the 13.2/F2.2 consumer-impact roster + a MIGRATION row for the
`glass-refract.css` file retire; (b) sequencing answer: the retire and SEAL-DISC both ride 5.0.0 —
CompleteBadge is replaced wholesale by the shipped disc seal in the SAME consume, so nothing needs
scheduling around.

**12 · §3 BH B7 roster → CONFIRM + ADD.**
- **(a) speedtest→/timeline: CONFIRMED verify-only.** `TimelineSegment` is exported from `/timeline`
  at HEAD (`timeline/index.ts:3`) AND at the published 4.2.0 (their tarball verification
  independently matches ours); their W2.c pre-empt + the dead `vite` `optimizeDeps` string are noted
  (the string is live until the `/api` import re-points — their nuance is correct).
- **(b) ADD the speedtest `--ring` row.** `SurveyStep.vue:177,180` `var(--phase-color, var(--ring))`
  fallbacks + the `tokens.css:821` `--focus-ring-color` note — fallback-degrading, on the named
  migration line per inv-11; counted by `proof:crossrepo-asks:bh`'s covered-floor.
- **(c) `--glass-blur-dock` / `goo-blob → blob`: no speedtest row owed** (their census: zero
  consumption) — recorded as explicit-absent.

**13 · §4 value.js dist-tag → DONE.** `latest` re-tagged `1.1.1 → 1.2.0` (verified on the registry
2026-07-02; 1.2.0 published 2026-06-24; the lag was a local-publish artifact, not a hold).

**14 · §6 land signals → PROMISED.** WS3 glass/saturate standardization = 3.5 `W-GLASS-REGISTER-UNIFY`;
WS2 dock convergence = 4.1. Both ride 5.0.0. The BG orchestrator relays a one-line signal when each
lands (and the cut line), so AX W3-close re-measures on schedule.

## Cursor clauses

To be applied by the orchestrator (record only — the live build engine owns
`EXECUTION-PROGRESS.md`). One clause per target row, each tagged with its ask id + this doc's item.

- **4.1** — `[data-preset="cockpit"] --dock-label-ratio 0.42→0.275` (12.1px at the 2.75rem control,
  speedtest-ratified); `:root 0.5088` untouched; local override deletes on the bump.
  *(ASK-GU-DOCK-LABEL-RATIO; SPEEDTEST-AX-INBOUND #2)*
- **14.1** — ship the opt-in `.paper-grid-breathe` register on the STATIC paper-grid utility: a slow
  low-amplitude compositor-only opacity oscillation, CSS-only (no timer/Oscillator), PRM-static per
  the §6 calm register. *(ASK-GU-PAPER-GRID-BREATHE; SPEEDTEST-AX-INBOUND #3)*
- **3.5** — the on-glass foreground rung-completeness check rides the tentpole's composited-fill
  calibration (whisper→body-strong); author a missing rung ONLY on a measured AA gap — no speculative
  rungs. *(ASK-GU-ONGLASS-FOREGROUND-RUNG; SPEEDTEST-AX-INBOUND #4)*
- **3.10** — a `:pressable` Card auto-arms specular the way Button's glass variants do (interactive
  glass gleams); DECLINE the blanket tier-root pointermove delegation — the static-plate fence is
  deliberate. *(ASK-GU-LIQUIDHOVER; SPEEDTEST-AX-INBOUND #6)*
- **W-DESHADCN** — ToastClose ships a default `aria-label` "Dismiss" (overridable); the bare `<X>`
  svg gets a real accessible name. speedtest un-excludes at 5.0.0.
  *(ASK-GU-A11Y-AXE-CARVEOUTS-A; SPEEDTEST-AX-INBOUND #9)*
- **W-AUR-IMAGE-SOURCE** — `deriveAurora` gains a `scheme`/`lBand` luminance option (the `avoidHues`
  companion knob) shifting `DERIVE_L_BAND` toward the luminous-dark identity; the scheme-conditional
  consumer interim deletes on consume. *(ASK-GU-AURORA-SCHEME-LUMA; SPEEDTEST-AX-INBOUND #10)*
- **BH.B2-export-reshape** — the fonts arm delivers a preload-MATCHING posture: `@font-face` `src`
  references the same `./fonts/*.woff2` URL a consumer preloads (inline-vs-URL decided by the
  Lighthouse number; linked variant if inline stays) + a MIGRATION/`crossorigin` note.
  *(ASK-GU-HERO-FACE-PRELOAD; SPEEDTEST-AX-INBOUND #8)*
- **BH.B6+B7-asks** — CONFIRM speedtest→/timeline verify-only (TimelineSegment exported at 4.2.0);
  ADD the speedtest `--ring` fallback row (`SurveyStep.vue:177,180` + `tokens.css:821`) to the B7
  roster so `proof:crossrepo-asks:bh`'s covered-floor counts it. *(SPEEDTEST-AX-INBOUND #12)*
- **13.2 / F2.2** — record speedtest `CompleteBadge.vue:16` in the consumer-impact roster + a
  MIGRATION row for the `glass-refract.css` file retire; the class binding is ALREADY inert at 4.2.0
  (clean-break rename at 4.1.0), so no deletion-sequencing hazard exists — the retire + SEAL-DISC ride
  5.0.0 together. *(§2 .glass-refract; SPEEDTEST-AX-INBOUND #11)*
- **NEW F6.7 `BG.W-SEAL-DISC` (P, 5.0.0)** — CompletionSeal gains `shape="disc"` +
  `personalBest:boolean` (earned-gold garnish, may mint `--seal-best`) + the disc→ring→check draw
  sequencing; kf5 `fromDrawSVG` decide-at-build over the CSS `stroke-dashoffset` floor.
  *(ASK-GU-SEAL-DISC + ASK-GU-SEAL-DRAWSVG; SPEEDTEST-AX-INBOUND #1)*
- **NEW F6.8 `BG.W-LIQUID-FILL` (P, 5.0.0)** — extract Slider's glass-cylinder fill
  (`Slider.vue:184-217`) as the ONE shared liquid-fill register (`Progress variant="liquid"` +
  `.glass-liquid-fill`); Slider re-reads it (consumer #1, speedtest meter #2).
  *(ASK-GU-LIQUIDFILL; SPEEDTEST-AX-INBOUND #5)*

## Relay-back (for the user to relay to the speedtest agent)

(a) Census accepted — the 8 open + 2 new + 1 candidate are dispositioned above; the four SHIPPED
asks retire from the list as filed.

(b) ALL accepted items ride the joint **5.0.0** cut — SEAL-DISC included (AX sequences its seal
consume on the 5.0.0 pin bump; the parked 4.3.0 gains no riders).

(c) CORRECTIONS: your CompleteBadge `glass-refract` garnish is ALREADY inert at 4.2.0 (clean-break
rename at 4.1.0, no alias) — no deletion-sequencing hazard exists; and `./fonts/*` ALREADY ships
separable woff2 (the preload blocker is the `@font-face`-`src` match, which B2 fixes).

(d) CardTitle ink-clip recipe (no library seam needed): put your gradient class ON the slotted title
node — `background-image: <your-gradient>; -webkit-background-clip: text; background-clip: text;
color: transparent` — consumer utilities win over `@layer components`; our `.metal-gold` register is
the in-cascade proof.

(e) LIQUIDHOVER: interactive-glass-gleams accepted (`:pressable` Card auto-arm); blanket tier-root
delegation declined (static-plate fence) — use `<Card :specular>` per interactive surface today.

(f) FocusScope sentinel: PERMANENT-STAMP (reka upstream) — archive the carve-out with justification;
ToastClose gets a real name at 5.0.0 — un-exclude then.

(g) value.js `latest → 1.2.0` DONE.

(h) Land signals for 3.5 + 4.1 promised.

(i) `--ring` row added to the B7 roster; /timeline confirmed verify-only at 4.2.0.
