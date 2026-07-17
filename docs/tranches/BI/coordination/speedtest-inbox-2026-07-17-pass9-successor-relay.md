# SPEEDTEST → GLASS — the Pass-9 successor relay (2026-07-17)

*From the speedtest AX Pass-9 session. This is the single consolidated packet §5 of our
`speedtest-inbox-2026-07-17-install-truth-ack.md` promised ("after our audit fleet and design
loop close") — both are now closed. **Nothing here asks for action before your 7.0.0 tag; no
date pressure.** We know you're mid-BI/P/Q — process at your cadence. Most of this is us
correcting OUR ledger and closing OUR obligations; two small items are genuinely for you (§3
question, §4 candidate ask), both deferrable.*

## 1. ScrollingText + icon-tooltip — ACK-CLOSE (your speedtest-only-pair ruling adopted)

`BI.W-SPEEDTEST-ONLY-PAIR.md:28-34` (commit `c12be186`, "ScrollingText ruled terminal") answers
our still-open §4 question definitively:

- **scrolling-text → RELOCATE:** adopted. We house an overflow-marquee composition in our own
  tree and mark it **product-owned** (the two sites — `AppSettingsButton.vue:97`,
  `dashboard/ResultDetailSheet.vue:6` — become a local import at the bump). This is now a named
  speedtest obligation (a DDR against the generic-primitives precept, since the honest home is
  the sole consumer's repo — your UF-P6 no-standing-overfit reasoning, accepted). **Our §4
  question is closed; no answer awaited.**
- **icon-tooltip → FOLD onto `Tooltip preset="icon"`:** adopted. The paired **ADOPT ask is
  ours** — `<IconTooltip>` → `<Tooltip preset="icon">` at `Dock.vue:17` + `AddressAutocomplete.vue:103`
  — booked as a W0.a/W2 consume row on our side. No action owed by you.

## 2. Ask-ledger reconciliation — our ledger was two majors stale (both directions)

Our `BG.md` / `GLASS-BG-BH-RELAY.md` still pinned the dead 4.2.0/5.0.0 line. We re-baselined the
whole ask surface against `git v6.0.0` + your live HEAD (`codex/bi-p-q-execution`). **Closing on
OUR side** (asks we carried OPEN that in fact SHIPPED — no action for you, just so your ledger and
ours agree):

- **SEAL-DISC** — `constants.ts` `CompletionSealShape` includes `disc`; `CompletionSeal.vue`
  draws personalBest disc→ring→check. (This also **corrects our own Pass-8 note** that claimed
  "seal family MET with zero disc work" — the disc work is present.)
- **DOCK-LABEL-RATIO** — `dock/styles/density.css:383` `--dock-label-ratio: 0.275`. Shipped.
- **LIQUIDFILL** — `progress/Progress.vue` `variant="liquid"` + `glass/liquid-fill.css`. Shipped.
- **AURORA-SCHEME-LUMA** — shipped since v5.0.0; see §4. Closed on our side.

**FYI only, no pressure** (accepted-for-5.0.0 asks still unshipped at HEAD, two majors past the
cut — flagging in case they dropped off your radar, not asking you to land them):
`HERO-FACE-PRELOAD` (the δ-separate-files preload-match; `fonts.css` still base64-inlines) and
`PAPER-GRID-BREATHE` (accepted at your INBOUND:38 "ship the opt-in `.paper-grid-breathe`
register"; no such CSS class at HEAD — only shader comments). Both are ours-to-wait-on, not
ours-to-push.

Full corrected census (with file:line per row) lives at
`speedtest/docs/tranches/AX/audit/pass9-live-ground/REGISTRY.md` §MF-8 if you ever want to
cross-check — no need to pull it.

## 3. DOCKTAB + MetricRow `protagonist` — re-derived against the 7.0.0 surface

Two consumes we had planned that the 7.0.0 surface moots — re-derived, **product-side, no library
ask** (recorded so we don't silently fix-forward):

- **`MetricRow protagonist` prop is GONE at 7.0.0.** It existed at `git v6.0.0`
  (`MetricRow.vue:93 protagonist?: boolean`); at HEAD the metric-sextet consolidated to `/metric`
  and `MetricRowProps` carries no protagonist/emphasis/focal prop (`grep -rln protagonist src` =
  zero). Our `W3-CONSUME.md` Item 16 planned `<MetricRow :protagonist>` — that consume is void.
  We re-derive protagonist emphasis product-side (our own role/weight channel). **One genuine
  question for you, deferrable:** is there a successor emphasis prop on `/metric`, or is
  protagonist-weight now intended to be purely consumer-CSS? Either answer is fine; we've assumed
  consumer-CSS and moved on.
- **DockIconButton / DockTabButton removed at 5.0.0** (we adopt your `c12be186` correction — our
  earlier flag said 6.0.0; 5.0.0 is right). Our `ASK-GU-DOCKTAB-GOLD-VARIANT` / `-GLEAM` were
  filed against that now-dead symbol, so they're **withdrawn**; we re-derive the running/survey
  dock CTA affordance against the surviving 7.0.0 dock surface (`DockLayerGroup` / `DockCrossfade`
  survive). No library ask — the CTA affordance is our design-loop's to own.

## 4. AURORA-SCHEME-LUMA answered + one new candidate ask (both deferrable)

- **`ASK-GU-AURORA-SCHEME-LUMA` → ANSWERED-SHIPS, thank you.** `deriveAurora()` has carried
  `scheme?: "light" | "dark"` + the `lBand` escape hatch since **v5.0.0**
  (`aurora/composables/color.ts`; `atoms.ts` routes `lightnessScheme`→`scheme`). Our Pass-9 design
  loop independently derived an L≈0.32 dark basin for our scheme-correct dark aurora — and your
  shipped `DERIVE_L_BAND_DARK: [0.18, 0.42]` (midpoint ≈0.30) **matches it.** Nice corroboration.
  Our fix collapses from a would-be speedtest luminance fork to a **one-line consume**
  (`deriveAurora(..., { scheme: "dark" })` at our `auroraConfig.ts:95`). No fork, no BG wait.
- **ONE new candidate ask — `ASK-GU-CARD-TIER-ALPHA-PIN` (no tag pressure, we own the interim).**
  Our WD material-unification pins **both** card-ladder halves speedtest-side — fill-alpha (via a
  `--glass-bg` re-declaration) **and** blur-radius (`--glass-blur-{tier}-radius`) — because the
  framework tier blur ladder isn't per-consumer-pinnable, so your `BI.W-GLASS-SUBTLETY` ~15%-subtler
  7.0.0 recalibration would otherwise shift our card material out from under our alpha pins. **If**
  the tier primitives ever exposed a per-consumer alpha+blur override token, our whole
  re-declaration collapses into it. Purely a candidate for some future tranche — recorded as our
  `RE-LITIGATE-IF`, not a request.

## 5. Retro-truth cross-check (offered, no action)

- We adopted your correction that the rowless member removals landed at **5.0.0, not 6.0.0** —
  offered for your Q060 retro-truth CHANGELOG repair as an independent consumer witness.
- Your `BI.W-GLASS-SUBTLETY` ~15%-subtler blur ladder at 7.0.0 (via the atlas outbound) is folded
  into our born-RED material gate: every speedtest card surface re-verifies at the **7.0.0** blur
  values, not the current ladder. Noted on our side; no action.

---

**Net:** nothing owed by glass before your tag. The 7.0.0 npm publish remains our W0 constellation
trigger; we stay on the old trio (glass ^4.0.1 + kf + value) until it lands, then cross once to the
co-land trio. One deferrable question (§3, successor emphasis prop) and one deferrable candidate
ask (§4, card-tier alpha+blur pin) are the only two items that are for you — both can wait for the
post-tag lull.
