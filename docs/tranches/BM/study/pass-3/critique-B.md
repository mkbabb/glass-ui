# BM study, pass 3: Critic B (production iOS Safari and the evidence)

Seat: Critic B, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, page or source and staged nothing. Everything I wrote apart from this file is in my scratchpad.

**What I read.** `CHARTER.md`; `UNION.md` whole (§4's pass-3 line; §2; Q10, Q13, Q14; rows G1 to G15, A2, A3); `union-fold.md`; `INBOUND.md`; `READINGS.md` (nothing published, nothing returned); `DESIGN.md` (pass 3's §5 and every line marked "amended in pass 3"); `pass-2/fold.md`; every file under `pass-3/`; `pages/R3b.html` and `pages/R3.html`. Behind the claims: `src/styles/tokens/glass.css:1-240`, `src/styles/glass/veil.css:1-90`, `src/styles/glass/ladder.css:118-175`, `src/components/dock/styles/dock.css:100-165`, `dock/styles/adaptive-legibility.css:1-70`; `docs/precepts/restraint.md:20-70`; BL's `waves/W-R.1.md` (§1, :130, :184), `audit/INBOUND.md:235` (O-260) and `:313` (O-338), `FORMATION-PROGRESS.md:912`, `design/dock/wi8/RULINGS-6.md:13-30, :90-98`, `RULINGS-8.md:714-730`; BC's `audit/FINDINGS-DIGEST.md:40, :79, :99, :309`; BJ's `IOS27-ARCHIVE.md:1-40, :240-290`, `ECOUTE.md:101`, `PROPORTION-CATEGORIES.md:103`.

**What I ran** (all from copies in my scratchpad, through `guarded`):
- `legibility.mjs` and `ledger.mjs`, unchanged, under `--light`. Both reproduce the pass's figures exactly: every cell of §5.1's two tables, the levels 0.482 / 0.335 and 0.599 / 0.496, and the bytes 76, 355, 213, 187 and 385.
- `mc.mjs`: the pass's own composite, for the more-contrast edge and for B's total opacity against the plate BL withdrew (B3-3).
- `sites.mjs`: the same composite with atlas's own `--card` and `--foreground` (B3-8).
- The page check for R3b and R3 (`page-check.mjs`, its page list cut to the two): **refused** at 19:10:20 on the kernel zone, `data.kalloc.1024` at 13.94M, and again at the retry noted at the foot. No engine has drawn R3b.

**Verdict.** The arithmetic is sound and reproducible, and one result is robust: B's levels are solved on flat grounds, where blur and saturate change nothing, so they depend only on source-over compositing in gamma sRGB, which CSS specifies. The decisions built on it fail on the record rather than on the numbers:
- The blur value reopens an owner ruling the pass never cites: O-260 made the low-blur register, with chrome at 0, the 12.0.0 default (B3-1). The ledger credits W-R.1's removals and nets conditional ones (B3-2).
- B in dark is firmer than a plate the owner turned down, and "B is frost" runs against the record's own measure of frost (B3-3, B3-4).
- R3b asks for a preference, so it cannot be the device reading the pass names. Its letter is also taken as consent to remove the dynamic darkening the owner asked for, which the page never shows. R3 cannot settle a blur (B3-5, B3-6, B3-7).
- The 4.5:1 guarantee belongs to glass-ui's default colours. Seven of eight site checkouts re-point them (B3-8).

R3b should not be published until B3-5 and B3-6 are cured, and R3 should not be read for the blur until B3-1 and B3-7 are.

---

## Objections

### B3-1 (blocking). The blur value reopens a standing owner ruling: O-260 made the low-blur register the 12.0.0 default, with chrome at 0

**Claim.** §5.2 decision 1: "One blur value, 12 px, in both modes … R3 settles the value among 7, 12 and 16." The sketch keeps `saturate(var(--glass-saturate))`, which is 1.5, and blurs every chrome plate (`material.next.css:18`, `:26-28`). §1 law 1 ("Pass 3 proposes 12 px") and §2.1's ladder row carry it.

**Evidence.**
- O-260, the owner via atlas, 2026-11-11 (`BL/audit/INBOUND.md:235`): "**The low-blur register is the library default.** … backdrop blur wash 4 px, quiet 6, resting 8, floating and overlay 0, saturate 1, no blur on the control surface. … → **12.0.0** … To prove in paint before it lands, not to reopen: floating and overlay at 0 means the dock, menus, sheets and dialogs sample no backdrop, so their fill alone must hold legibility over the aurora and over busy content in both schemes". Booked at `BL/FORMATION-PROGRESS.md:912`. W-R.1 owns the value (§1 question 4, `W-R.1.md:23`; OQ-2, `:184`: "No default value is built on a guess").
- O-338, 2026-11-13 (`BL/audit/INBOUND.md:313`). A Card painting `blur(16px) saturate(1.5)` takes a page from 121 fps to between 25 and 63 (headless Chromium, so not a phone reading). "Over a soft ground the blur is invisible (16 px and 4 px give identical pixels)". The booked ruling: "a page-sized plate is static by default and live glass is for small surfaces over moving ground (ties to O-260 …)". §5.2 keeps the content band, cards included, live at 12 px.
- O-260, O-338 and W-R.1's question 4 appear nowhere in `DESIGN.md` or `UNION.md`. §3.9, the BL-collision table this pass amended, lists none of them.
- R3's lanes are 16 px at saturate 1.5, 7 px at 1.6 and 12 px at 1.2 (`R3.html:14`, `:18`, `:22`). The ruled register is not among them: 0 on chrome, 4 to 8 on content, saturate 1. R3 would put to the owner a question he has answered and leave his answer off the page.
- The pass's own result already gives what O-260 asks for. B's level is solved over flat black and white (`legibility.mjs`, `solveLevel`), where no blur acts. Over the photograph B's lowest reading moves only from 5.76 to 6.56 across 7, 12 and 16 px (`legibility.json`, `blurSweep`). B is the proof that a fill alone holds legibility, and it needs no 12 px.

**Remedy.**
- Strike decision 1 and the 12 px from §1 law 1, §2.1 and the sketch.
- Restate §5.2 under O-260. Chrome (the dock, menus, sheets, dialogs) samples no backdrop, and B (or C) is its fill. Content takes the low register at saturate 1, and page-sized plates are static by O-338's booking.
- Withdraw R3 as the reading for the blur value.
- Add O-260, O-338 and W-R.1's questions 1 and 4 to §3.9.
- Tell the orchestrator that UNION's discrepancy 6, G1 and Q10 were written without O-260.
- One consequence the rewrite should record: with chrome at 0, every chrome surface stops being a live backdrop layer. That bears directly on Home Assistant's WKWebView gate and its bound of one live blur layer [IN HA 2].

### B3-2 (major). §5.6 credits W-R.1's removals and nets conditional ones, against §3.9 and against §4.7's discipline from this same pass; Home Assistant's margin is not checked

**Claim.** §5.6's table, "**Net** CSS −446 or better; script −2,860", every row booked to 12.0.0. §2.1's ladder row lists the same removals with no "provisional".

**Evidence.**
- §3.9: "BL's 12.0.0 wave, W-R.1, already disposes of parts BM touches. BM credits none of its removals and overturns none of its lines." W-R.1 §1 question 1 is "The rim and the shadow count … does the rim drop to one leg?" (`W-R.1.md:20`), and question 4 is the blur (B3-1). §5.4 decides "The rim's inset legs go (213 B gz)", and §5.6 nets that −213 and the radii's −76 as BM's.
- §4.7, amended in this pass by fold A8, puts "the undecided removals outside the net". §5.6 nets three removals that §5 itself calls undecided: the clamp's CSS (−187) and script (−2,860), "conditional on the owner taking B or C on R3b" (§5.3), and the rim legs, "provisional" (§5.4).
- Home Assistant's entry is at 71.6 of 71.8 kB gz [IN HA 5], which leaves 200 B, and it ships glass-ui's CSS inside the entry script (§4.7). The material's one priced addition is +385 B gz (the sketch, `ledger.json`). That is above HA's margin whenever the conditional removals do not land. No 12.0.0 entry figure for HA is computed.
- The sketch's chrome selector names `.glass-dialog` and `.glass-sheet` (`material.next.css:26`). `git grep` over `src` finds neither class, only keyframe names. The chrome band is not mapped to the selectors that would carry it (menus, popovers, Select, Combobox and Command content, toasts, tooltips, hover cards), so the +385 B does not price them.

**Remedy.**
- Book the rim legs and the radii to W-R.1, uncredited.
- Move the clamp rows into a conditional block outside the net, as §4.7 does.
- Compute HA's 12.0.0 entry figure with the conditional removals absent.
- Map the chrome band to real selectors and re-measure the addition.
- Mark §2.1's row provisional.

### B3-3 (major). In dark, B is firmer than the plate the owner turned down as near-solid; the pass calls it "about as firm"

**Claim.** §5.2 decision 6: "In dark, B is about as firm as the plate BL ruled more than 'a bit' firmer (RULINGS-6, row 5 …)". Decision 2 makes B the chrome mix, "0.335 in dark".

**Evidence.**
- RULINGS-6 row 5 (`BL/design/dock/wi8/RULINGS-6.md:27`): "the dark plate at 0.4 reads near-opaque | **Confirmed.** … its alpha is 0.4 × 0.18 + 0.6 = 0.67 … Two thirds solid is not 'a bit'". RU-57 (`:97`) records that plate as an exclusion "from readings already on record", "withdrawn as near-opaque".
- RULINGS-8 question 10 (`RULINGS-8.md:720-725`), to the owner: "at the fourth every other dock hides the pattern entirely, which is the near-solid dock you turned down". The default there is the third step.
- B by the same arithmetic: 0.335 × 0.14 + 0.665 = **0.712** in dark (`mc.mjs`), against the withdrawn 0.672. In light, 0.566. C in dark is 0.573, inside the exclusion.
- The record on a static, unconditional firm dock: BC's audit (`BC/audit/FINDINGS-DIGEST.md:79`, `:99`, `:309`) holds the owner's "ALL glass far too dark + grey (major regression)" and "BOTH docks broken (grey opaque slabs)". That followed a blanket darken that the audit calls "the OPPOSITE of dynamic" against his G2 ask, and BC restored the dynamic behaviour. §5.2 and §5.3 cite none of this, and neither does R3b.

**Remedy.** Write "firmer than the withdrawn plate (0.71 against 0.67)". Put one line on R3b beside B: in BL he turned down a near-solid dark dock. Either make C the dark default until R3b returns, or state why B overrides a reading on record.

### B3-4 (major). "B is frost" contradicts the record's only operational definition of frost

**Claim.** §5.2 decision 6: "C-59 asks for frost, not clear glass, and B is frost." (d): "Today's dock is close to it (63 % kept, +8 %)."

**Evidence.**
- [ARC] §5(i), measured on an iPhone 16 Pro (`IOS27-ARCHIVE.md:248`): "mean L −2%, sd 80% kept, high-frequency 10% kept, saturation +62%. That quadruple is the operational definition of 'blurred and frosted' versus 'shiny and bright'". glass-ui's ladder codifies "the 80%-structure-kept transmission target" (`tokens/glass.css:24-26`).
- B, from the pass's own `legibility.json` (`transmission`, over the photograph):

  | Mode | Mean luminance | Structure kept | Saturation |
  |---|---|---|---|
  | Light | +39.2 % | 31 % | −45 % |
  | Dark | −48.9 % | 21 % | −62 % |

  Every measure moves away from the definition. §5.2 quotes the structure figure alone.
- O-2, the owner, 2026-07-24 (`BJ/…/ECOUTE.md:101`): tabs and slider "far too trite, shiny, and bright--not like blurred and frosted glass". The mechanism the record names for it is a "~50% cream veil, no blur, specular-led" (`PROPORTION-CATEGORIES.md:103`). B in light is a 51.8 % cream mix, with blur and no specular.
- On the other side, W-R.1's G6 (`W-R.1.md:130`) applies C-59 to menus ("read as surfaces, not smudges at alpha .18 to .22"). A firmer chrome has support; the word "frost" does not.
- (d)'s "close": 63 % and +8 % against 80 % and +62 %.

**Remedy.** Drop "B is frost", or define frost by a measure and report all four figures. Tell the owner on R3b that B in light is a cream mix of about half, the kind O-2 named. Correct "close" in (d).

### B3-5 (major). R3b asks for a preference, so it is not the device reading of the model; it states computed figures as measurements and has never been drawn

**Claim.** §5.9: "The legibility test is a model … R3b is its device reading."

**Evidence.**
- The ask (`R3b.html:92`): "send the letter you would ship: A, B or C." No question asks which word fails to read on which ground, so the returned letter cannot confirm or refute a single cell of §5.1.
- The note (`:101`): "Measured on a computer, not on a phone: over black in Light the word reads 1.2 to 1 on A, 4.5 to 1 on B and 3 to 1 on C …". These are `legibility.mjs` outputs, a Node model. Every engine run of the pass was refused, so nothing was measured. Legend B (`:96`) says "just enough that a small word stays readable over anything, white or black", a model result given as fact. Telling the reader the expected answer before he looks is the fault pass 2's B-8 was accepted on for P2-scroll ("told the owner what to expect").
- Four answers across two appearance modes (a letter twice, edge or none twice). The ask says "the five backgrounds"; the script draws six bands, with the photograph twice (`:125`).
- No engine has drawn the page. The pass's three attempts were refused between 13.83M and 13.90M (`retry.log`), and mine at 19:10:20 at 13.94M. The static check and the stub run say nothing on layout or paint (§5.9).
- R3b's A is labelled "glass-ui's dock glass today" but is drawn at 12 px, with no clamp, rim or hairline. Today's dock has 16 px and all three. R3's A is a third "today": the resting ink at 16 px.

**Remedy.**
- Ask, per band, which letters' word he cannot read. That is one look per band, and it checks the model.
- Strike the figures and "readable over anything" from the page, or label them "computed, never drawn".
- Make the ask's count match the bands, and label A "today's tint at the new blur".
- Hold the page until its 390 and 1440 check runs.

### B3-6 (major). The clamp's removal rests on a model of a clamp the library does not have, and R3b's letter is taken as consent to a removal the page never shows

**Claim.** §5.3: "the whole clamp goes in 12.0.0 … The canvas path goes too", "conditional on the owner taking B or C on R3b". §5.1 item 2: "In light it adds dark ink under dark words and lowers every reading (the photograph: 55 % under 4.5:1 becomes 65 %)."

**Evidence.**
- R3b's legend and ask say nothing of the clamp, and its A is drawn without one. The owner's ask behind the clamp is "darken DYNAMICALLY like iOS 27" (`adaptive-legibility.css:16-18`). BC restored that dynamic behaviour after a static darken drew his "grey opaque slabs" (B3-3). A pick of B or C would be read as consent to a removal that was never put to him.
- The model applies the clamp's ceiling, +2 steps, at every pixel (`legibility.mjs`, `clampMax`). The clamp itself "at or below the knee … resolves EXACTLY the rung's own ink" and adds ink only past the knee, over a bright measured backdrop (`glass/veil.css:37-40`, `:57-73`). In light that is where dark words already read. The 65 % is reached only when the clamp's one sample point is bright over a photograph that is dark elsewhere. The dark-mode result stands: 1.09 rises only to 1.31 over white.
- The canvas path reads pixels the page paints itself (value.js `Dock.vue:301`, keyframes `ChromeDock.vue:461`). By the brief's bar it is no workaround, and it is the one dynamic route left once the walk is refused. §5.1 tests the clamp's two ink steps, not a canvas-driven change of the mix, so it does not show that the canvas path fails.

**Remedy.**
- Put one line on R3b: "B or C replaces the dock's dynamic darkening with a fixed mix."
- Correct item 2's light sentence to the clamp's actual rule.
- Keep the canvas path out of §5.3's removal until value.js and keyframes answer §5.8's question, or until a canvas-driven mix is modelled.

### B3-7 (major). R3 cannot settle the blur value or how close the frost is to Safari's bar, and no overlay is read against Safari's own menu

**Claim.** §5.2 decision 1: "R3 settles the value among 7, 12 and 16". §5.7: "R3 still decides the blur value, and how close the frost is to Safari's own bar". §5.9, row 1.

**Evidence.**
- Each R3 lane changes blur, saturate and veil together (`R3.html:14-23`, `:33`):

  | Lane | Blur | Saturate | Veil |
  |---|---|---|---|
  | A | 16 px | 1.5 | warm ink 0.14 |
  | B | 7 px | 1.6 | ink 0.03 |
  | C | 12 px | 1.2 in light, 1.3 in dark | white wash 53.5 % (grey 65.1 % in dark) |

  A pick names a bundle and cannot name a blur. The mix pass 3 decides is on no R3 lane, so R3 cannot say how close it comes to Safari's bar.
- §3.6's R3 row (`DESIGN.md:198`): "overlays are calibrated against Safari's own menu in passes 3 and 8". Decision 2 puts menus, popovers, dialogs, sheets, toasts, tooltips and hover cards on B from dock-sized strips. Neither R3 nor R3b shows an overlay, and §5.9 does not list the overlay reading as owed.

**Remedy.** Say what an R3 pick can decide: a tint family, not a blur (after B3-1 the blur needs no lane). Add to §5.9 the overlay reading owed: a menu beside Safari's own, in light and dark. Mark the overlay half of decision 2 as unread.

### B3-8 (major). B's 4.5:1 holds for glass-ui's default colours only; seven of eight site checkouts re-point them, and atlas reads 4.23

**Claim.** §5.1 item 3: "B holds 4.5:1 over every ground in both modes". §5.5: "A reader with Reduce Transparency on gets chrome whose words hold 4.5:1 over any ground". The sketch fixes the mix as constants, 0.482 and 0.335 (`material.next.css:19`, `:23`).

**Evidence.**
- `git grep` at §3.1's refs finds sites that set their own `--card` or `--foreground`:
  - atlas: `src/design/tokens/color.css:290-293`, `:356`.
  - value.js: `demo/styles/shell.css:337` (`--foreground: var(--ink-primary)`).
  - keyframes: `scripts/build/vite/critical-css.ts:52-53`.
  - gaggle: `dashboard/src/report/styles/tokens.css:44` (`--card: var(--paper)`).
  - sci-report: `dashboards/vft-germination/styles/vft-tokens.css:39-40`.
  - Home Assistant: `frontend/src/styles/tokens.css:9-10`.
  - daraksha: `src/scripture/HeadDock.vue:174` (`--card: transparent`).
  - fourier: none found.
- With atlas's light colours (card `oklch(0.99 0.01 55)`, foreground `oklch(0.255 0.028 55)`), B's constant mix gives **4.23:1** over black (`sites.mjs`, the pass's own composite). With `--card: transparent` the mix adds no firmness at daraksha's head dock.
- §5.6's census counts neither token. Only Home Assistant's recomputation is owed (§5.9).

**Remedy.** Scope both claims to glass-ui's default colours. Owe per-site levels in pass 10 for every site that re-points `--card` or `--foreground`, or say how a site's colours set its mix.

### B3-9 (minor). Q14's route depends on B and keeps a live backdrop under an opaque plate

**Claim.** §5.5: "The firmer default carries Safari's readers. B is the material for every reader", and at level 0 "Every plate turns opaque, and the blur drops with it".

**Evidence.**
- The route holds only if the owner takes B. With C, §5.1's own table puts small words in dark under 4.5:1 on 7 % of the photograph and 35 % of the aurora; with A it fails outright. The content band stays translucent for these readers, though removing translucency is what Reduce Transparency is for.
- At level 0 the sketch's `--glass-blur` resolves to `blur(0px) saturate(1.5)` (`material.next.css:18`). That is a non-empty backdrop filter, so the compositor still samples the backdrop behind an opaque fill. This is an inference from WebKit treating any non-`none` `backdrop-filter` as a backdrop layer [IOS §2.3]. Backdrop cost is a first-class gate in Home Assistant's WKWebView [IN HA, bounds], and HA already strips a backdrop filter it does not want (`tokens.css:84-85`, the slider range's grasp carrier).

**Remedy.** State the route as conditional on B. At level 0, resolve `backdrop-filter` to `none`.

### B3-10 (minor). Two smaller claims past their evidence

- **"within 2 points of Apple's veil in each mode"** (§5.2 (a)). This counts the card layer only. With its ink, B covers 56.6 % in light and 71.2 % in dark, against the fit's 53.5 % and 65.1 %, which is 3 and 6 points more. The amounts match by coincidence: B was solved for glass-ui's colours, not fitted to Apple's.
- **"In dark there is none … Apple's measured rim does the same"** (§5.4).
  - The rim reading is rida's iOS 27 simulator fit of a menu (pcc@6405, sim), not a device reading, and MacRumors' darkened edge names no mode.
  - The cut between "needs a hairline" (light, plate 1.12 off the page) and "stands off by itself" (dark, 1.23) has no source.
  - The edge is measured over the page, white and black only (`legibility.json`, `edge`). The photograph and the aurora are left out, though over them a dark plate can match its ground.

**Remedy.** Correct both sentences. Measure the edge over the photograph and the aurora as well, and leave the per-mode cut to R3b's edge pair.

---

## Dropped on the second reading

- **The model's colour space.** B's levels are solved over flat grounds, where blur and saturate do nothing. They depend only on source-over compositing in gamma sRGB, which CSS specifies and which iOS composites the same way. Only the photograph and aurora cells depend on the filter's space, and they are confirmations. Dropped.
- **C-59 applied to chrome.** BL's W-R.1 G6 already reads C-59 for menus (`W-R.1.md:130`). Dropped.
- **The more-contrast edge.** "That is the 3:1 … pass 10 measures it" looked unsupported. Computed (`mc.mjs`): on chrome at level 0.3 times the mix, the half-strength foreground border reads 3.02 to 4.10 against the plate over the page, white, black and grey, in both modes. It holds. The painted measurement stays owed.
- **Box identity.** The sketch sets `border-color` only, and the dock and the floating and overlay rungs already carry a 1 px border (`dock.css:162`, `ladder.css:140`, `:159`). No box moves. Dropped (the unmapped selectors are in B3-2).
- **The retry cadence.** The pass stopped after 18 minutes, not 60. The law caps the window ("for up to 60 minutes"), and the zone falls only on a reboot. Dropped. The one short interval was self-reported.
- **The dark aurora as a bright ground.** The default config carries an explicit palette, and the shader's dark mode factor changes chroma, not lightness (`aurora.frag.ts:360-363`). Not contradicted. Dropped.
- **The fold's panel refit (B-3).** Checked: `cubic-bezier(0.215, 0, 0.059, 1.288)` peaks at 4.20 % at x 0.748 and stays monotone in x. It holds.

## What the pass does not touch, checked

- **Low Power Mode at 30 fps and WKWebView at 60.** §5 animates nothing new, and "a plate keeps its rung while it moves" holds.
- **gaggle's GPU words.** The aurora ground is a static JPEG inside the page only. No library chunk changes.
- **The static walk.** It stays refused.

## Retry

The R3b and R3 page check was refused at 19:10:20 (13.94M) and again at the retry at 19:20:25 (13.98M). The zone has only climbed, and it falls only on a reboot, so I stopped there. The check stays owed with the pass's own command (`check/page-check.mjs`). None of the objections above waits on it, because headless Chromium draws neither WebKit's backdrop nor the iPhone's.
