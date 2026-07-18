# REFABLE RU-03-A11Y—the BAND-A11Y band redo (thrice protocol)

- **Unit**: RU-03 band redo, BAND-A11Y (accessibility repairs: landmarks, roving focus, aria
  linkage, contrast floors, live regions).
- **Verified model**: this seat is powered by `claude-fable-5` (read verbatim from the system
  context: "The exact model ID is claude-fable-5"). Run date 2026-07-18.
- **Protocol trace**: (1) ANEW at HEAD `485891a2`—wave set derived from the binding corpus
  (RU-18 RT-1..RT-13, RU-21 N3/N5 routings, RU-33 routing 1, FABLE-DAG-REDUCTION's
  `invalid`/`errorLive` gate, GF-DOCK-PASS3 §3 + RU-05 D7, REGISTRY family K, PLAN FAMILY K)
  with every evidence pin re-proven on disk; the nine BAND drafts, `formation/challenges/`,
  and `ADJUDICATION-1.md` unread. (2) Boundary moment recorded below; SCRUTINY read the opus
  draft assume-incorrect, re-verifying every pin at HEAD. (3) UNION rewrote
  `waves/BAND-A11Y.md` in place (5 waves); ADJUDICATION-1 read only at step 3.

## Boundary moment (end of step 1)

At the end of ANEW I believed the band was a 5-6 wave band and that the opus draft would be
the PLAN's 2-wave shape scoped to the six round-2 findings—missing RU-18 pass-2's N6-N9
(above all the major-grade status-tone contrast failures), the RU-21 HeaderRibbon/Carousel
routings, the RU-33 Slider 44px regression, and the DAG-reduction `invalid`/`errorLive`
gate—and that its four W1 fixes would be directionally right but under-specified against
RU-18's C2 AMEND. Scrutiny confirmed the scope gap exactly, and surprised in the other
direction twice: the draft's placeholder census was BROADER than RU-18's (four failing
registers + the `.command__input` exemplar + the `--on-glass-muted` allowlist, all verified
at HEAD) and its center-spring anchor-un-gate subtlety (`DialogContent.vue:465`
`v-if="!isCenter"` starves `resolveSideContentEl()` on the center path) was a genuine
mechanism find my ANEW pass, leaning on RU-18 RT-3's guard-widen framing, had not derived
independently.

## Per-claim verdict table

| # | Draft claim | Verdict | Detail |
|---|---|---|---|
| R1 | Reduced-motion substrate is a band-wide CONFIRMED KEEP | RATIFIED | RU-18 + REGISTRY concur; fence carried whole (`a11y-overrides.css:7-33`, PRM signal plumbing) |
| R2 | Test substrate: rendered-attr discipline, `DockBackgroundToggle.a11y.test.ts` + `dialog-spring.test.ts` precedents | RATIFIED | idiom verified; carried |
| R3 | W1-A nav landmark: defect pins + aside→nav fix + dead-attr drop + probes | RATIFIED | all pins re-verified at HEAD (`AppShell.vue:174`, `SidebarDock.vue:110-114`, GlassDock zero-role, `BottomDock.vue:88`); matches RT-1 |
| R4 | W1-B aria-pressed: tri-state `active` + the over-application guard probe | RATIFIED | concurs with RU-18 C2 AMEND + PLAN; OPEN-B1 closed as tri-state; consumers verified (`overview.tile.vue:15`, `controls.vue:112,140`); `active: false` default at `DockControl.vue:67` |
| R5 | W1-C focus-return: guard-widen is insufficient—the anchor un-gate is load-bearing | RATIFIED | the draft's genuine mechanism find; verified `:392-395`, `:399`, `:465` at HEAD; beyond RT-3's framing (PLAN had absorbed it as "guard-widen + anchor un-gate") |
| R6 | W1-D placeholder: four-register census + one-token fix + fs gate + allowlist + `--surface-tint-35` delete lean | RATIFIED | all six census rows verified at HEAD (incl. the two registers RU-18 did not census: `components.css:63-65`, `tags-input/styles.css:38-40`); OPEN-D1 closed DELETE, OPEN-D2 allowlist ratified; one path correction (`src/styles/theme/bridges.css:153`, not tokens/) |
| R7 | Dock keyboard belongs with the Family-G greenfield; no second dock keyboard model in this band | RATIFIED | exactly how it resolved (GF-DOCK owns implementation + π-KEYBOARD) |
| R8 | W2-F hero heading dedup → Family D, reference not duplicate | RATIFIED | PLAN W2 + RU-05 R2 concur; pins re-verified at moved chassis paths (`demo/chassis/hero/StoryHero.vue:162,186`, `demo/chassis/section/StorySection.vue:32`, `_frame/VizStudio.vue:73`) |
| R9 | π/DELTA shape: placeholder browser contrast capture + focus-return browser capture; A/B no π | RATIFIED | carried; extended by W3's re-ink DELTA |
| O1 | Band scope = the six round-2 findings; round-2b findings "outside this band's scope" | **OPUS-WRONG** | the REFABLE demarcation supersedes the round-2 artifacts: the band's authority is the RU-18 union (10 ratified opus claims + 9 FABLE-NEW), plus the RU-21/RU-33/DAG routings that name BAND-A11Y. Corrected: the band discharges RT-1..RT-13, not findings 1-6 |
| O2 | Two-wave band shape (`W-A11Y-STATE` + `W-A11Y-RULINGS`) | **OPUS-WRONG** | under-scoped by the same gap; corrected to five waves (STATE / LINKAGE / CONTRAST / LIVE-REGIONS / ROVING-RULINGS). The N6 status-tone majors alone force a contrast wave |
| O3 | Skip-to-content link routed away ("routes to whoever owns the AppShell shell pass; OPEN for the lead to assign") | **OPUS-WRONG** | RU-18 RT-5 routes it INTO BAND-A11Y explicitly; corrected to W1-E, born-RED at HEAD |
| O4 | "no ArrowUp/Down handler anywhere in the dock (…)" | **OPUS-WRONG** | false at HEAD: `DockLayerGroup.vue:100-105,214,231-232` carries the full roving register via `useSelectionGroup`; the same categorical RU-18 falsified in C5/C10. Accurate sentence: the GlassDock strip + demo shell docks have no roving; the layer rail does |
| O5 | OPEN-E1: the dock toolbar-vs-nav ruling is open, "draft takes no side" | **OPUS-WRONG at HEAD** (faithful at compile) | DECIDED since: ADJUDICATION-1 ruling 4 routed it into the greenfield; GF-DOCK-PASS3 §3 decided toolbar + roving + `RouterLink`/`aria-current`; RU-05 D7 ratified. Corrected to a DECIDED record (W5-A) with the comment truth-up riding family J |
| O6 | OPEN-E2 DockControl double-disabled: "flagged, not drafted (outside the six)" | **OPUS-WRONG** | RU-18 RT-10 folds it into the band's one DockControl decision; corrected to the decided W5-C clause (focusable `aria-disabled` boundary model, non-button arm preserved per C9 AMEND, click suppression required) |
| N1 | W2-A tab↔panel linkage—DockLayerGroup/DockLayer + PagerDots (`aria-controls`, `tabpanel`/`id`/`labelledby`) | **FABLE-NEW** | RT-7 (RU-18 N1/N2); verified absent at HEAD; SegmentedTabs `option.controls` the model |
| N2 | W2-B ComboboxInput SearchIcon `aria-hidden` + decorative-icon sweep | **FABLE-NEW** | RT-8 (N3); `ComboboxInput.vue:33` vs `CommandInput.vue:25` verified |
| N3 | W2-C AppShell per-`<kbd>` combo-label de-dup | **FABLE-NEW** | RT-9 (N4); `AppShell.vue:239` verified |
| N4 | W2-D Carousel unconditional `tabindex="0"` → conditional on the named-region arm | **FABLE-NEW** | RU-21 N5 routing; `Carousel.vue:86-89` verified |
| N5 | W2-E Slider focus ribbon `:focus-within` → focus-visible register | **FABLE-NEW** | RU-18 N5; `Slider.vue:416` vs `:583` verified |
| N6 | W2-F Slider 44px coarse-floor restore | **FABLE-NEW** | RU-33 routing 1 adopted; thumb at `Slider.vue:234` carries no `touch-hit-area` at HEAD while `Slider.vue:376,391-396` + `a11y-overrides.css:162` still describe it; DOC-TRUTH halves routed |
| N7 | W3-A status-tone re-ink (light success 2.21 / dark success 1.58 / light info 3.49 / dark info 2.36 / dark destructive 3.07) | **FABLE-NEW, the band's MAJOR** | RT-11 (N6); token values re-verified unchanged at HEAD (`color-radius.css:283-293`, `dark-arm.css:104-111,157-168`; consumer `button/styles.css:95-100`); opaque paints, decided statically |
| N8 | W3-B dialog close-X open-state seat (2.34 effective) + the muted/secondary 4.39 caution | **FABLE-NEW** | RT-12 (N7/N8); `DialogContent.vue:490` verified |
| N9 | W3-C the ONE table-driven contrast invariant gate (absorbing the W1-D source scan) | **FABLE-NEW** | the band's single contribution to the post-abrogation ~40-60 gate census |
| N10 | W4-A InfiniteScroll polite loading/exhausted live region | **FABLE-NEW** | RT-13 (N9); sentinel-only at HEAD (`InfiniteScroll.vue:43`); `SortableList.vue:66` the model |
| N11 | W4-B `invalid`/`errorLive` ruling: KEEP—load-bearing a11y contract | **FABLE-NEW** | discharges the FABLE-DAG-REDUCTION gate; wiring verified (`LabeledField.vue:10,25,28,38,59-60,68`); BAND-REDUCTION may re-home, not drop |
| N12 | W1-F composition heading repairs (empty-states h3-no-h2; auth-shell h1→h3) | **FABLE-NEW** | RT-6's composition half (C7); `empty-states.vue:134`, `auth-shell.vue:87,120` verified; distinct from the family-D chassis seam |

## Counts

**OPUS-WRONG 6 (O1-O6) · FABLE-NEW 12 (N1-N12) · RATIFIED 9 (R1-R9).**

The draft was competent inside its fence—every one of its evidence pins verified at HEAD, two
of its findings (the four-register placeholder census, the anchor un-gate) exceed the RU-18
union—but the fence itself was wrong: it was drawn around the superseded six-finding opus
audit, and the corrected corpus makes the band 2.5x its drafted scope, including the only
major-grade contrast failure any pass found.

## ROUTING

1. **Lead amendment pass**—`PLAN.md` FAMILY K (`:206-213`) is stale: 2 waves / "4 live-defect
   fixes" vs the union's 5 waves including the N6 major; the PLAN band row needs the
   amendment.
2. **Lead amendment pass, re-opened-ruling flag**—ADJUDICATION-1's standing "Bands SOUND as
   amended: … A11Y …" is overtaken for A11Y: the ruling's input (the six-finding round-2
   audit) was replaced by the RU-18 union via this redo. Flagged here per the redo-overturns-
   input clause, not silently contradicted. ADJUDICATION-1 ruling 4 itself STANDS and is
   carried in W5-A.
3. **BAND-STORY (family D)**—the chassis hero h1/h2 seam (StoryHero/StorySection); BAND-A11Y
   W5-D registers only the acceptance criterion (one h1 per page, no duplicated outline).
4. **BAND-DOC-TRUTH (family J)**—SidebarDock "roving category tablist" comments
   (`SidebarDock.vue:71,117`); the `touch-hit-area` six-atom header
   (`a11y-overrides.css:108-165`); the CHANGELOG 7.0.0 Slider [CORRECTION] bullet after W2-F
   lands (RU-33 routes 2-3); the `useSelectionIndicator.ts:16-24` comment (GF-DOCK's truth-up,
   noted for the same sweep).
5. **GF-DOCK W3**—owns the dock roving/toolbar implementation, the `toolbar` role-menu value
   in `useSelectionGroup`, focus⟂occlusion, and π-KEYBOARD; BAND-A11Y W5-B (HeaderRibbon
   adoption) depends on that value landing.
6. **BAND-REDUCTION**—the Labeled* prop dedup proceeds under the W4-B KEEP ruling
   (`invalid`/`errorLive` survive as API surface + wired behavior).
7. **BAND-GATES**—one row: the W3-C contrast-floors gate enters the invariant census.
8. **Q060-style outbound**—`--surface-tint-35` clean-break delete: sibling consumers (if any)
   update via their own tranche addendum per the consumer-updates ruling.
