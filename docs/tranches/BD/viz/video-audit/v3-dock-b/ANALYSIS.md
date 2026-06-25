# v3-dock-b — frame-by-frame audit (iOS-27 Apple Music: dock · glass · sheet · Control Center)

**Source:** 76 frames (`frames/f001.jpg`–`f076.jpg`), one screen-recording of iOS-27 Apple Music driven through Home → New → Radio → now-playing-sheet → Search → Library → Albums-drill-in → Control Center. The whole clip is the **iOS-27 tab-bar DOCK** under live use: tab-switching, scroll-collapse, the **scroll-driven dock FISSION (sub-dock goo-split)**, the now-playing sheet expand/collapse, drill-in/back, and the Control-Center backdrop-blur engage. No aurora generative surface in this clip — the "generative" axis here is the album-art / category-tile color field + the glass material itself.

North star (CLAUDE.md + design.md): transmissive glass · vibrant accents · rounded · liquid spring with inertia/weight/bounce/squish · audacious type. glass-ui must be **fully aligned or bettered**.

---

## 1. The reference sequence — frame by frame

### A. The persistent tab-bar dock (the floating glass capsule) — f001–f005
- **f001/f002 (Home):** the dock is a floating **glass capsule** at the bottom: 5 tabs (Home·New·Radio·Library·Search), active tab (Home) = **filled red glyph + red label** + a glassy pill plate behind it (selected-as-glass), the rest ink glyphs. ABOVE it floats a **separate now-playing mini-player capsule** (album thumb + title + play + skip) — the dock is already **TWO stacked floating capsules**, each its own rounded transmissive glass stadium over black. Detached from the screen edge (margins all round — the floating-island dock, not an edge bar).
- **f005 (Radio):** active tab moved to Radio (center), red glyph+label, the pill plate slid under it. The HITS/COUNTRY/Chill art tiles are the vibrant color field.

### B. The tab-switch transition — liquid indicator + icon scale-pop + label cross-fade + accent-flood — f003·f006·f007
- **f003 (Home→New mid-transition):** the **New** glyph is mid **scale-pop** (~1.15× overshoot, bright red), label "New" mid fade-in, "Home" desaturating; the selected-pill plate is **gliding/stretched in-flight** between slots. Spring overshoot visible (glyph overshoots past 1.0 then settles).
- **f006 (settling):** the dock plate is **flushed crimson** — a momentary full-bleed accent wash sweeps the capsule on press (active glyph bright, neighbours dimmed): the **press-ripple / accent-flood** on commit.
- **f007 (Search settled):** indicator arrived, active = Search (far right), red glyph+label, pill seated; the bottom still shows the lingering crimson flood fading (EFFECTS leg trailing the SPATIAL leg).
- **Read:** ONE liquid indicator that **glides + squishes** between slots on a snappy spring with overshoot; per-tab **icon scale-pop** (~1.15×) on activation; **label cross-fade**; a momentary **accent-flood** tinting the whole plate on commit then clearing.

### C. The now-playing SHEET — bloom-up from mini-player + live-behind collapse — f008–f012, f015
- **f008→f009→f010 (expand):** tapping the mini-player **blooms it up** into the full now-playing sheet. f009 mid-bloom: album art at intermediate scale, the page behind dimming to a **brown-tinted transmissive scrim** (NOT flat black — page reads THROUGH it), the sheet **scales+fades up from the pill's rect** with album art as the FLIP element. f010 = settled player.
- **f011→f012→f015 (collapse):** the sheet **scales+translates down**; the Search page **re-emerges from the top** as the sheet recedes — the underlying page is LIVE behind the dimmed scrim (f012: album art mid-descent + page already ~70% painted above — **two surfaces co-exist**, live-behind, not a card swap). Spring: weighted ease-down, scrim fading 1→0 coupled to translate.

### D. THE DOCK FISSION — scroll-collapse → sub-dock GOO-SPLIT — f033·f036–f045 (the HEADLINE)
The central behaviour, the prompt's "SUB-DOCKS goo-splitting off the core dock":
- **f033·f036 (full dock at rest):** unified 5-tab glass capsule + the now-playing mini-player capsule above.
- **f037·f038 (mid-split, the GOO-CARVE):** as the Library list **scrolls down**, the unified dock **FISSIONS**. The 5-tab capsule fragments: a **left circular Library glyph** buds off the left end, a **center now-playing mini-player capsule** anchors in the middle, a **right circular Search glyph** buds off the right end — the fragments **bridged by stretching glass necks** (alpha still fused then thinning — the metaball waist). The labels collapse to glyph-only as the box carves.
- **f039·f040 (fully split):** the dock rests as **THREE separate floating glass capsules**: `[ Library ● ]  [ ◀ now-playing ▶ ]  [ ● Search ]` — left circle, center stadium mini-player, right circle, each its own transmissive rounded pill with its own margin, floating over the list. The full nav-dock has **goo-split into a contextual sub-dock triad** (back/library + transport + search) for maximal content room.
- **f042/f045 (re-merge / mini-player expand):** scrolling back / tapping re-merges; f045 shows the center capsule **expanding** — album art reappears INSIDE it (capsule grows + art FLIPs back in), goo necks re-forming toward the flanking circles. Scroll-up → the three capsules **goo-merge** back into the unified 5-tab dock.
- **Read:** the dock has TWO topological states driven by scroll — **unified 5-tab bar** (top) ↔ **3-capsule fission triad** (scrolled). Transition = a **metaball goo-split/merge** with stretching necks, weight, spring settle. Signature = **lateral/media** (transport stays center, nav buds to flanks) — exactly glass-ui's `media` signature shape.

### E. Drill-in / back — back-capsule + dock re-expand — f057·f060–f066
- **f057 (Albums detail):** a **circular back-button glass capsule** (`<`) appears top-left, the header is a glass pill ("Albums" + filter/more), the full 5-tab dock is re-expanded (un-fissioned), Play/Shuffle are glass stadiums.
- **f060–f066:** album-grid scroll; mini-player rides above the dock; dock stays unified (short content / below collapse threshold). f063/f066 show the transport label **cross-fading** as the track advances — text cross-fade inside the capsule, not a hard cut.

### F. Control Center — backdrop-blur ENGAGE + grouped iOS-27 glass tiles — f068·f069·f072
- **f068/f069 (pull-down):** the whole app **blurs + dims** as Control Center pulls down — a **backdrop-filter blur engage** over the live app (app reads THROUGH the heavy blur, transmissive), coupled to the CC sheet translate. f069 = half-state: app heavily blurred behind, CC tiles entering.
- **f072 (CC settled):** the iOS-27 Control Center — **grouped glass tiles** (connectivity 2×2, now-playing card, **tall stadium toggles** for brightness/volume with the icon at the base, circular toggles for flashlight/timer/screen-record/Shazam), each a transmissive rounded glass plate over the dark blurred backdrop. Reference glass-tile language: rounded, transmissive, vibrant accent fills (blue connectivity, white brightness), grouped containers.

---

## 2. glass-ui CURRENT — comparison, GAP, closing wave

glass-ui already owns nearly every primitive this video shows; the gaps are mostly **wiring/integration + calibration**, not missing engines.

### Behaviour 1 — Floating glass tab-bar dock (transmissive, detached, selected-as-glass)
- **CURRENT:** `GlassDock` is the floating glass pill (`.glass-dock`, W-REGISTER-IOS selected-as-glass `--dock-control-active-bg` tier, AX.W54 glass-first, W-GLASS-CAL calm blur + OPT-IN `.glass-deep` for the maximal refractive read). Selected control reads as a glass tier above the hover fill, glyph stays warm-ink, rail accent is a luminance-lift. **Aligned** with f001/f005.
- **GAP (minor):** the reference active tab uses a **vibrant accent fill (Apple red glyph+label)**, not only a luminance-lift plate. W-REGISTER-IOS de-RED'd every interactive state to a neutral lift — correct as a *default identity*, but the reference is a **consumer accent** (presets-in-consumers: a consumer sets `--glass-accent` / the selected glyph color). Demo-calibration gap, not a library gap. The two stacked capsules (mini-player + tab bar) are a **composition** the shell must author.
- **WAVE:** no new library wave; the BD shell/AppleMusic demo composes the two-capsule stack + a consumer accent on the active tab (`useDockShellProps` + `--glass-accent`). Covered by **BD Pass-E** demo-composition follow-up.

### Behaviour 2 — Liquid tab indicator + icon scale-pop + label cross-fade + accent-flood
- **CURRENT:** `useTabIndicator` (SegmentedTabs) is a **glide+squish** liquid indicator on `--spring-snappy` at `--tab-indicator-duration` with release-at-arrival squish (volume-preserving, capped ≤1.08), center-anchored, axis-derived — **aligned** with the glide+squish read in f003. IconChip has a spring-clock scale(0.85→1) reveal (W-SUFFUSE3).
- **GAP:** the *nav-dock tab bar* (`DockTabButton`) does NOT carry the SegmentedTabs liquid indicator — dock tabs are individual controls with a `--dock-control-active-bg` plate; there is **no gliding indicator that travels between dock tabs**, **no per-glyph scale-pop on activation**, and **no momentary accent-flood** on commit (f006's crimson flood). Dock-tab activation is a state swap, not a liquid traverse.
- **WAVE:** propose **`BD.W-DOCK-TAB-INDICATOR`** — bring the SegmentedTabs liquid-indicator engine (the SAME `useTabIndicator` glide+squish, axis-derived) into the nav-dock tab row + per-glyph activation scale-pop (compose IconChip reveal spring on `data-active` flip) + an OPT-IN one-shot commit accent-flood (`--dock-accent-flood-t` plus-lighter wash off the selected `--glass-accent`, PRM-static, the fission-ripple precedent). ONE engine, no fork.

### Behaviour 3 — THE DOCK FISSION (scroll-collapse → 3-capsule goo-split) — THE HEADLINE GAP
- **CURRENT:** glass-ui **HAS the entire engine** — `useDockFission` (n-ary detach orchestrator: ONE `SpringProgress`/`DOCK_SPRING`, per-piece `--split-dx/dy`/`--neck-t`, `useLiquidFlex` tanh recoil capped LOW, `usePointerVelocityField` seam-tension, PRM sync-seat, bidirectional split↔merge) + `DockGooFilter` (Safari-safe sRGB `filter:url()` metaball mount, non-zero host, generous region) + `fission-bridge.css` (stretching goo necks + neck specular-sweep + ripple + merge-splash) + the three **DOCK_SPLIT_SIGNATURES (search/media/nav)** — the `media` signature is **exactly** the f037–f040 lateral-peel (transport-center, nav-buds-flank) shape. And `useScrollChrome` is the scroll-collapse-state machine.
- **GAP (integration, NOT engine):** `useDockFission` is consumed **only in demo stories** (`DynamicIslandCall.vue`, `liquid-playground.vue`) — **NOT wired into the live nav-dock** and **NOT driven by scroll**. The reference's defining move — *scroll the list down → the unified 5-tab dock goo-splits into the 3-capsule triad → scroll up → re-merge* — is **unassembled**. `useScrollChrome` (collapse-t shrink) and `useDockFission` (split) exist as separate primitives never **composed** into the scroll-driven topology change. This is the single largest gap: the engine is fully built, the **assembly into the shell + the scroll-trigger** is missing.
- **WAVE:** propose **`BD.W-DOCK-SCROLL-FISSION`** — compose `useScrollChrome` → `useDockFission` so a scroll-down past threshold drives `split()` (the `media` signature: 5-tab bar → `[Library●][◀player▶][●Search]` triad) and scroll-up drives `merge()`, wired on the real `GlassDock` nav register (shell BottomDock), behind an opt-in `:fissionOnScroll` prop. The now-playing center piece is the persistent transport anchor; the flanking circles are the contextual nav buds (back/library + search). Reuse the SAME engine + the `media` signature (no fork). **Highest-value wave in the tranche** — the iOS-27 dock signature, glass-ui ONE composition away.

### Behaviour 4 — Now-playing sheet bloom-up + live-behind collapse
- **CURRENT:** `useBloomUp` (pill→player FLIP bloom, SAME-element album-art FLIP, field-hue warm) is **already wired** in `demo/stories/dock/examples/AppleMusic.vue` (preset bouncy, blur, fieldHue) — **aligned** with f008–f010. `Drawer mode="live-behind"` (peek/half/full snap over a live still-interactive surface, the house `useDrawerSnap` `SpringProgress` engine) covers the live-behind read of f011/f012. Scrim = the A5-1 `color-mix` modal scrim.
- **GAP (minor):** the collapse is **live-behind with the page sliding up THROUGH a transmissive scrim** (f012 both surfaces co-existing). `useBloomUp` reset is a FLIP-back; the **co-existing-page-slides-up** read wants the `Drawer live-behind` snap path. The two should reconcile so the now-playing sheet is ONE register (bloom-up open + live-behind snap-down).
- **WAVE:** demo-composition (AppleMusic.vue refinement under **BD Pass-E**); no new library engine (both `useBloomUp` and `Drawer live-behind` ship). Optionally **`BD.W-NOWPLAYING-RECONCILE`** to fold them into one demo register.

### Behaviour 5 — Drill-in back-capsule + dock re-expand
- **CURRENT:** back-button is a glass capsule (`DockIconButton`/glass-pill); dock re-expand is the `useDockState` collapse↔expand morph. `useDockContextSilhouette` (route→facet detach/merge resolver) already models "which controls bud off / merge in per context" and **feeds `useDockFission`**. Aligned in primitive form.
- **GAP:** the **context-driven silhouette change** (drill into Albums → a back-capsule buds off, the dock recomposes) is demoed but not shell-wired — same integration gap as Behaviour 3.
- **WAVE:** rides **`BD.W-DOCK-SCROLL-FISSION`** / the contextual-dock shell wiring (`useDockContextSilhouette` + `useDockFission` in the shell).

### Behaviour 6 — Backdrop-blur engage (Control Center) + grouped glass tiles
- **CURRENT:** the glass material is the `.glass-material` `::before` specular + `backdrop-filter` blur ladder + saturate companions + `.glass-deep` for the maximal blur; grouped tiles are `glass-floating`/`glass-card` rounded plates. The CC tall-toggle / connectivity-grid is a **composition** of existing tiers. Transmissive-through-blur = the W-DARK-MATERIAL luminosity-lift companion.
- **GAP:** no **`backdrop-filter` blur-ENGAGE transition** primitive — a surface ramping its backdrop blur 0→deep as an overlay pulls over the live app (f068/f069). glass-ui blur is static per tier; W-LIQUIDHOVER grain-engage cross-fades opacity, not backdrop-blur radius. (The CC tile LANGUAGE is fully expressible with current tiers — a demo composition.)
- **WAVE:** propose **`BD.W-BACKDROP-BLUR-ENGAGE`** (small) — a compositor-safe blur-engage ramp (`--glass-blur-engage-t` driving the `backdrop-filter` radius over a deep endpoint, the `.glass-deep` `--glass-depth` lerp generalized to a transition scalar, PRM-instant) for the over-app-pulls-an-overlay case. Lower priority than the fission wave.

### Behaviour 7 — Audacious type + vibrant color field
- **CURRENT:** the √φ display ladder + section-color rainbow + warm-cream identity. The reference's large titles map to `text-display-*`; the category color tiles map to the section-color field. **Aligned** (W-DISPLAY-TRACKING calibrated the negative tracking).
- **GAP:** none structural — calibration only.

---

## 3. Top-gaps summary

The single dominant gap is **integration, not engine**: glass-ui already ships the entire iOS-27 dock-fission stack — `useDockFission` (the n-ary goo-split orchestrator with the `media`/`search`/`nav` signatures, the `media` one exactly matching the reference's lateral transport-anchored split), `DockGooFilter` (Safari-safe metaball mount), `fission-bridge.css` (stretching necks + specular-sweep + ripple + merge-splash), `useScrollChrome` (scroll-collapse state), `useTabIndicator` (glide+squish liquid indicator), `useBloomUp` (pill→player FLIP) and `Drawer live-behind` — but **none of it is composed into the live nav-dock**: the reference's defining behaviour (scroll a list → the unified 5-tab glass dock goo-SPLITS into the floating `[Library][now-playing][Search]` capsule triad → scroll up → re-merge) is unassembled, existing only in isolated demo stories. The top closing waves are **(1) `BD.W-DOCK-SCROLL-FISSION`** — wire `useScrollChrome`→`useDockFission` (the `media` signature) onto the real shell dock for the scroll-driven 3-capsule split/merge (highest value, ONE composition away); **(2) `BD.W-DOCK-TAB-INDICATOR`** — bring the SegmentedTabs liquid glide+squish indicator + per-glyph activation scale-pop + a one-shot commit accent-flood into the nav-dock tab row; **(3) `BD.W-BACKDROP-BLUR-ENGAGE`** — a small blur-engage ramp for the Control-Center-over-live-app read. The active-tab vibrant-accent and the two-capsule mini-player stack are presets-in-consumers (BD demo-composition, Pass-E), not library gaps. glass-ui is calibration- and assembly-bound, not primitive-bound — one tranche of wiring from fully bettering this reference.
