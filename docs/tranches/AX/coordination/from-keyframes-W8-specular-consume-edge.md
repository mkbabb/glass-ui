# keyframes.js → glass-ui AX — live-consumer confirmation: the Card-specular publish-currency gap (the kf consume-edge)

**From:** the keyframes.js session (Tranche H, at its close — W8 the gate-regime wave). **To:**
the active AX session. **Date:** 2026-06-08. **Nature:** a coordination message (NOT a glass-ui
edit) — confirming a live consumer hit + recording the kf-side interim so the AX cut's publish is
the agreed consume-edge. Written as a distinct file so it does not touch your in-progress
`CONSTELLATION.md`, `AX.md`, the `W09-specular-tune.json` audit, or the dirty `docs/precepts`.

## What kf confirms (the §24 third-confirmation, now LIVE-reproduced)

Your **AX.W09** audit already names keyframes panels in the `cardSpecularDefault: "off"` §24
three-consumer confirmation, and the `consumerLegNote` routes the kf verification to **W34**. This
message is the live reproduction of that exact defect, observed at kf's tranche close:

- keyframes.js Tranche H added **`surface="glass"` stage `<Card>`s** (the easing/spring/sequence/
  motion-path "protagonist" stages — kf's H.W11 I5). Its design language requires the panel
  `surface="cartoon"` Cards to carry **no** tracked catch-light, and the glass stages to read as a
  clean glassy plate.
- On the **published** glass-ui line (kf bumped `^3.4.0 → ^3.5.1`, which resolved to **3.7.0**), the
  Card emits `.glass-specular-track` **unconditionally for `surface="glass"`** (the installed
  `CardFooter-*.js:37` → `t.surface === "glass" && "glass-specular-track"`). So kf's glass stages
  paint the **dead-centered, mouse-untracked white bloom** (§4 note 12's "published-3.4.0 dead-
  centered white bloom"). kf's appearance gate `proof:no-orphan-specular` (which asserts ZERO
  tracked catch-light on any kf-owned Card) went **RED (3 Cards)** on the bump — and cascaded into
  kf's new `proof:visual-lock` pixel baseline (the bloom shifted 11 named regions). At glass-ui
  **3.4.0** the same gates are **GREEN**.

## Your fix is exactly right — kf needs no override (confirming `confirmNoKfOverride`)

Your **HEAD** (`6fac61a` / `eaba94f`, unpublished) corrects it idiomatically: the opt-in
`specular?: off|subtle|full` prop, gated `specularArmed = surface==="glass" && specular!=="off"`,
default **`off`**. That is precisely the **G-1 "wire-or-omit + calmer default"** ask from kf's
`docs/tranches/H/glass-ui-AX-handoff.md`, and it makes the consumerLegNote's
`confirmNoKfOverride` **GREEN by construction**: with `specular="off"` the default, kf's glass
stages read clean off the softened default — **no kf-side `--specular-intensity` override, no
`!important` suppression, no kf fork** (kf honors inv-16: it does not patch glass-ui).

## The gap is PUBLISH-CURRENCY, and it forces a real ordering for kf

The dock-spring retune (`53c1b07`, kf's `proof:dock-morph-settled`) is in the **published** 3.5+;
the Card-specular fix is **unpublished** (HEAD → your §0b 3.8.0). So **no single published glass-ui
has both** the dock fix and clean specular — only the 3.8.0 cut. This supersedes a premature
assumption in kf's own spec (kf's harden BLK-5 read "the dock retune is published, just bump
^3.4.0→^3.5.1" — it did not see that the same versions carry the specular regression).

## kf's interim disposition (no workaround — discipline-compliant)

- kf **holds glass-ui `^3.4.0`** (the last published line clean for its glass cards). No bump until
  3.8.0.
- The **dock-lag (D5)** reverts to an honest **born-RED HANDOFF**: `proof:dock-morph-settled` stays
  born-RED, paired with this HANDOFF — the dock-lag chronic exits kf's ledger via the chronic-
  closure discipline (a HANDOFF paired with a born-RED kf gate), NOT a false green and NOT a kf
  fork of the spring.
- kf ships Tranche H on 3.4.0 with that born-RED HANDOFF; it does **not** add any specular override.

## The agreed consume-edge (no AX action required now — you're in DEV-only mode)

When the AX cut **publishes (your 3.8.0)** — carrying BOTH the Card `specular="off"` default AND the
dock-spring retune — keyframes.js bumps `@mkbabb/glass-ui` to `^3.8.0`, which simultaneously:
1. greens `proof:dock-morph-settled` (consumes the published retune — closes D5 for real), and
2. keeps `proof:no-orphan-specular` / `proof:visual-lock` green (the glass stages read clean off the
   `specular="off"` default — closes the §24/W09 kf-consumer leg, your `confirmNoKfOverride`).

That bump IS the **W34 consumer-adoption leg** for keyframes.js — listed in your ledger. No glass-ui
change is requested here beyond the publish you already plan; this message just records that kf is a
**live, blocked-at-close consumer** whose unblock is the 3.8.0 publish, so the ordering is explicit.

— keyframes.js (Tranche H · W8). Reachable via `keyframes.js/docs/tranches/H/glass-ui-AX-handoff.md`
(G-1, updated with this finding).
