# HC-underline-spec — hc2 spec-hardening lane record (AY.W-UNDERLINE)

**Lane:** HC-underline-spec (phase SpecHarden) · 2026-06-09
**Deliverable:** EDITED `docs/tranches/AY/waves/AY.W-UNDERLINE.md` — the ten NECESSITY-MATRIX §2
W-UNDERLINE build refinements folded in as RULINGS (the new spec §6, DEC-1…DEC-10), every open
option DECIDED so the build agent arrives to decisions, not menus.
**Verdict:** SPEC-HARDENED. The wave stays born-RED (re-confirmed at HEAD: no
`src/components/custom/underline/`, no `src/subpaths/underline.ts`, no `GlassUnderline*` in
`src/api/index.ts` — the only "underline" hit is the SegmentedTabs variant comment at
`src/api/index.ts:256`).

## What changed in the spec (all file:line re-verified against live sources this date)

| DEC | Ruling | Grounding |
|---|---|---|
| 1 | Consumer count ×2 not ×3; §1 + Unblocks + the L-grep target corrected | `slides/src/decks/til-briefing/slides/SlideSovereignty.vue:159-161` bare BY DESIGN; the twins are `SlideIntro.vue:130-131` (`s1-draw`) + `SlideCloser.vue:127-128` (`cta-draw`) |
| 2 | Third clock = declarative `active?: boolean` prop (PICKED over play()-on-slide-activation); full edge contract specced (rising plays / falling resets-to-undrawn so re-rise replays / mount-active plays / PRM rising snaps; `undefined` = source-parity imperative; load-clock-only; no `delayMs`) | the slides' attribute-gated CSS clock `[data-state="active"] … forwards` at `SlideIntro.vue:130`, `SlideCloser.vue:127`; the imperative alternative re-creates per-consumer ref+watcher glue — the exact inversion the wave deletes |
| 3 | Stroke metrics tokenized: `--gu-stroke-width` (2.4) / `--gu-ink-height` (0.5em) / `--gu-ink-offset` (-0.18em); ghost derives `+1` user-unit | source constants `HandUnderline.vue:193,202` (2.4/3.4), ink box `:174-182`; slides' bolder register (6 / 0.3em / -0.16em·-0.14em) at `SlideIntro.vue:122-129`, `SlideCloser.vue:118-126` |
| 4 | Dark arm DELETES — no `:where(.dark)` block crosses; `var(--primary)` re-resolves by cascade; NCSU lift → consumer `color` prop; unit witness added to §3 | `HandUnderline.vue:208-210` |
| 5 | `animation-timeline: var(--gu-timeline, view())` custom-property indirection; the `@media` PRM + `@supports` fences transpose AS-IS; gate-1 π owns the quirk surface | `HandUnderline.vue:219-240` (`--beat-tl` hardcode at `:234`) |
| 6 | easeOutCubic default stands + doctrine note (ink = irreversible additive reveal; overshoot would retract laid ink — the AX.W52 §6 "never overshoot past gone" logic); `easing?: TimingFunction` prop for the slides' expo register | `HandUnderline.vue:117-120`; slides `var(--ease-out-expo)` at `SlideIntro.vue:130` |
| 7 | `paths` escape carries the FULL tuple `{ stroke, ghost?, viewBox?, len? }` (a bare `d` escape breaks the dash model — slides geometry is `0 0 100 12` + dasharray 260/340 vs canonical `0 0 100 10` + 120); AND slides do NOT use it — they adopt canonical+ghost (no third fork) | `SlideIntro.vue:57,128`; `SlideCloser.vue:125`; `HandUnderline.vue:78-83` |
| 8 | Packaging RECONCILED before mint: `/underline` mints NOW (named for the 6 shipped sites, not the zero-consumer family headroom); the handmark family (`custom/handmark/` + `/handmark`, pencil-boil PEER) reconciles AT its S2 landing with two sanctioned outcomes recorded (fold-in + `/underline` retires clean-break, OR sibling-consuming) and one forbidden outcome (a parallel second underline impl — the H5 defect); component-name ownership assigned to that reconcile | `sci-report/usf/docs/tranches/C/handmark/glassui-upstream.md` §0-1 (shape/peer), §5 (S1 atlas-LOCAL first → S2 glass-ui → S3 collapse); `audit/research-necessity/underline.md` refinement 8 |
| 9 | PRM seam = module-local ONE-SHOT read (the `useCountup.ts:56-64` idiom); the shared-leaf extraction routed OUT to motion-cohesion as a disposition row (≥2-sites bar already met by `useRAFLoop.ts:108,234-247` + `useCountup.ts:56-64`); the one stale-attr nuance recorded | both glass-ui sites re-verified at HEAD; every animation channel already structurally fenced (CSS `@media` outer fence; engine `respectReducedMotion: true`) |
| 10 | KEEP `HU_LEN` 120 (no `getTotalLength()`), gate-4-locked; NEW time-domain math recorded: visible draw completes at t ≈ 0.45·drawMs under easeOutCubic (offset(t)=120·(1−t)³, drawn at offset ≤ 20) — the trailing ~55% is the production-proven settle beat; measurement rejected because per-path exactness forks the single shared `--hu-off` scalar (STROKE_D ≠ GHOST_D true lengths) + mount layout-read/SSR hazard; `pathLength` normalization named as the unshipped exactness escape | `HandUnderline.vue:74-83,116-124` |

## Gap surfaced beyond the matrix list (new finding)

- The lane audit's "truncates the ease tail ~17% early" (`underline.md` refinement 10) measured
  in OFFSET space (20/120). In TIME space under easeOutCubic the visual completion is ≈45% of
  `drawMs` — i.e. a 700 ms draw is visually done in ~315 ms and `play()` resolves ~385 ms later.
  Not a defect (the mastheads ship this rhythm; the Sequence beat absorbs it) but it WAS
  undocumented and would have surprised the slides re-point (their CSS clocks run 0.8/0.85 s
  end-to-end). Now recorded in DEC-10 so `drawMs` tuning at adopt is informed.

## Spec sections touched

Header (Unblocks + Hardened stamp) · §1 (DEC-1 count + cites) · §2 (rewritten 1-9: PRM one-shot,
dark-arm delete, `--gu-*` tokens, full-tuple `paths` + slides-adopt-canonical, timeline var
indirection, `active` contract, `easing` prop, README/demo/consumer rows updated to ×2) ·
§3 (test rows: active edges, paths tuple, no-`.dark` witness, `--gu-*` live retune) ·
§4 (gate 1 + `active` arm; gate 4 locks DEC-10) · §5 (fence: handmark family out, PRM-leaf
extraction routed, no `delayMs`, grep ×2) · §6 (NEW — the decision ledger).
