# H-motion-cohesion — adversarial hardening of the spring/easing vocabulary

Lane: RED-TEAM the motion cohesion of glass-ui (AY) + slides (L). Verdict: **GAPS-FOUND**.

The §6 easing doctrine (`tokens.css:162-190`) is well-authored and the FOUR animated
surfaces it names (dock / aurora / blob / `ui/` press primitives) are genuinely
clean. But the doctrine is NOT machine-enforced library-wide, the one gate that
checks it is excluded from CI AND currently red, and four off-doctrine survivors
sit on surfaces the gate cannot see. The dock-lockstep chronic is architecturally
SOLVED and live-gated — AY's W-DOCK framing over-states it as unsolved.

---

## FINDING 1 — `--dock-press-spring` root default is OFF-DOCTRINE (`--spring-bouncy`), shadowed by a local re-point

`tokens.css:1771`:
```
--dock-press-spring: var(--duration-fast) var(--spring-bouncy);
```
`dock-controls.css:43` (re-points it for the 4 named controls):
```
:where(.dock-icon-button, .dock-tab-button, .dock-select-trigger, .dock-dropdown-trigger) {
    --dock-press-spring: var(--duration-fast) var(--spring-smooth);
```

The §6 doctrine (`tokens.css:172-174`) is explicit: transform press/active → `--spring-smooth`
(the ONE register) or `--spring-snappy` (crisp press). NEVER bouncy — the doctrine establishes
the RESTRAINED register. The root token mints `--spring-bouncy` (ζ=0.45, +20.5% overshoot — an
EMPHATIC bounce on a press), then `dock-controls.css` locally re-points it to `--spring-smooth`
for the four named controls. So:
- the root default is off-doctrine,
- the re-point is exactly the per-surface FORK the doctrine claims to have killed ("ONE recorded
  rule so the animation easing stops forking live", `tokens.css:163`),
- ANY consumer of `--dock-press-spring` that is NOT one of the four named controls inherits the
  bouncy value — a silent off-doctrine register.

Root-fix: the root `--dock-press-spring` should BE `--spring-smooth` (the doctrine register); the
dock-controls.css re-point then becomes a dead byte-identical redeclaration and is deleted. One
token, one register, no fork. The comment at `tokens.css:1764-1771` ("rather than a flat ease")
also needs reconciling — it argues FOR a spring on the press, which is right, but names neither
the doctrine register nor the §6 cross-reference.

## FINDING 2 — `cartoon-surface` hover lift violates the doctrine on BOTH legs

`cards.css:40-42`:
```
transition:
    translate var(--duration-normal) var(--spring-bouncy),
    box-shadow var(--duration-normal) var(--ease-apple);
```
- `translate … var(--spring-bouncy)` — transform hover must be `--spring-smooth` (the ONE
  register, §6 `tokens.css:172`). `--spring-bouncy` is the ENTER register, not a hover.
- `box-shadow … var(--ease-apple)` — DIRECTLY contradicts the doctrine's `--ease-apple`
  exclusivity claim (`tokens.css:187-189`): "`--ease-apple` is the ambient-only register
  (consumed SOLELY by the Pulse aura … NOT a second smooth-ease authority for interactive
  transforms)." A card hover box-shadow IS an interactive surface leg → it must ride
  `--ease-standard`.

Root-fix: `translate … var(--spring-smooth), box-shadow … var(--ease-standard)`. `cards.css` is
NOT in the gate's `SURFACE_CSS` scan, so this drifted silently.

## FINDING 3 — hardcoded `ms`/keyword-ease surface-transition survivors (gate-invisible)

These sit on surface (opacity/color) transitions with hardcoded durations + a bare ease keyword,
NONE of which the gate's `EASING_LITERAL_RE` (cubic-bezier / linear()-stops / press-literal) can
see:

- `Aurora.vue:223` — `transition: opacity 600ms ease-out;` (surface opacity; should be
  `var(--duration-*) var(--ease-out)` or `--ease-standard`). Aurora.vue IS in the gate's
  `SURFACE_SFC` set but the bare-keyword+ms form passes clean.
- `MetricRow.vue:229,246` — `transition: color 220ms ease-out;` (×2; surface color → §6 says
  `--ease-standard`; the `220ms` is a magic number, the doctrine surface register is bezier).
- `transitions.css:497` — `opacity var(--duration-fast) ease` (bare `ease`; minor — but the
  doctrine surface register is `--ease-standard`, not the browser default `ease`).

The class is "the gate cannot see a hardcoded duration or a bare ease-keyword on a surface
transition." A component can hardcode `transition: color 300ms ease` library-wide and never red.

## FINDING 4 — Toast is on the wrong register (tw-animate-css, not the spring vocabulary)

`transitions.css:152-191` (the Toast contract doc) + `Toast.vue` consume reka's `tw-animate-css`
`animate-in`/`animate-out`/`slide-in-from-*`/`fade-out-80` chain — the tw-animate-css ease-out
curve, NOT the glass-ui `--spring-*` enter / `--ease-out` exit vocabulary. Every other entrance
surface (dialog-scale, pop, dropdown, fade-slide) rides the spring registers; the Toast does not.
This is a documented-but-uncohesive register: the toast "arrives" on a foreign easing. Either
re-express the toast entrance/exit on the glass-ui enter-spring/exit-bezier registers, or record
the tw-animate-css delegation as a DELIBERATE keep with a §6 cross-reference (it currently reads
as an unexamined default).

## FINDING 5 — `proof:animation-coherence` is NOT in CI and is currently RED

- The gate is in `package.json:670` but ABSENT from `.github/workflows/ci.yml` (the CI runs
  `proof:spring-tokens-synced` + `proof:dock-opacity-lockstep`, not `proof:animation-coherence`,
  not `proof:dock-animation-live`, not `proof:tabs-unified`). `proof:gen-ci-fresh` byte-locks the
  CI manifest, so this exclusion is canonical — the one-motion-source library guard runs nowhere
  in the pipeline.
- Running it locally: **FAIL**. It reds on the cross-repo census — `../speedtest` reads
  `var(--ease-apple-spring)` at 3 sites with no local def (`MeterColumn.vue:291,292`,
  `SpeedtestResults.vue:842`), inheriting the EXCISED glass-ui token → those speedtest transitions
  degrade to instant/linear RIGHT NOW. A live consumer-divergence motion defect.
- A gate that EXISTS but is excluded from CI because it fails is a dead gate (no-legacy / honesty
  violation). It must be either green-and-in-CI or formally retired.

## FINDING 6 — the gate's SURFACE scope is too narrow to enforce the doctrine

`proof-animation-coherence.mjs` scans only THREE CSS files (`dock.css`, `dock-controls.css`,
`utilities.css`) + 2 SFCs (Aurora, GooBlob) for easing forks. It does NOT scan `transitions.css`,
`animations.css`, `cards.css`, `instrument-chassis.css`, `drawer.css`, the dock partials
(`dock/*.css`), or the ~30 component SFC `<style>` blocks (MetricRow, ScrollingText, Timeline,
Notification, Slider, …). Findings 2+3 live in unscanned files. Further, the gate proves "no
hand-rolled spring fork" but does NOT enforce the §6 REGISTER ASSIGNMENT (surface→bezier,
transform→smooth, enter→spring, exit→bezier). `--dock-press-spring: var(--spring-bouncy)`
(Finding 1) is invisible — it's a valid `var()` composition, just the WRONG register. The gate
needs (a) the full animated-surface file set, and (b) a register-assignment assertion (a surface
prop transition must not name a `--spring-*`; a hover/press transform must name `--spring-smooth`
or `--spring-snappy`, never `--spring-bouncy`/`--spring-dock`).

## FINDING 7 — value-drift: the doctrine comment says `1.035`, the token is `1.05`

`--scale-hover-btn` = `1.05` (`tokens.css:1454`), but THREE doctrine comments cite the wrong
value: `tokens.css:184`, `tokens.css:1443`, `utilities.css:1040` all say "the restrained
`--scale-hover-btn` = 1.035". A stale documented-vs-actual drift — either the comments are wrong
(token was bumped 1.035→1.05 without updating prose) or the token regressed off the intended
restrained value. Reconcile to ONE number and one rationale.

## FINDING 8 — the dock-lockstep "items lag" is SOLVED + live-gated; AY's W-DOCK framing over-states it

The corpus (#5) + ledger (CHRONIC) describe "the shell shrinks first, items lag a few ms" as an
unsolved chronic and AY.W-DOCK1/W-DOCK2 propose a from-first-principles rebuild. But the source is
ALREADY one-clock by construction:
- `dockMorphContext.ts:121-239` — ONE shared `SpringProgress` writes ONE `--dock-morph-t` scalar
  to the `.glass-dock` root; the box size, child stagger (`--dock-expand-t`), AND the leaving-pane
  opacity (`layers.css:118-130`, `calc(1 - var(--dock-morph-t))`) all read that ONE scalar.
- `proof:dock-animation-live` (`proof-dock-animation-live.mjs`) is a REAL Playwright rAF probe
  asserting the box-width onset and the `--dock-morph-t` onset are within ≤1 frame — the cardinal
  DELTA the lane wants.

So the lockstep is converged AND has a live behavioral gate. AY.W-DOCK should be RE-FRAMED from
"rebuild lockstep" to "(a) CAPTURE the live DELTA proving lockstep on the current build (the user's
lag perception may be from a pre-AX build); (b) close the gate blind-spot in Finding 9; (c)
promote the live gate into CI." A from-scratch rebuild of solved architecture is a precept
violation (no churn without a defect).

## FINDING 9 — the live dock gate samples a LEAVING child, never the ENTERING stagger onset

`proof-dock-animation-live.mjs:130-170` samples a "representative LEAVING child" (`.dock-layer--summary`)
opacity and asserts only that it ramps. It does NOT assert the ENTERING detail children's
stagger-onset against the morph-t. The user's #5 complaint is specifically the items fading IN
(the expanding detail children) lagging the shell. The gate proves box-rides-scalar + a leaving
child fades, but an items-IN-lag regression (e.g. a child stagger window mis-tuned, or a re-added
per-child CSS transition with a second clock) would pass. The gate's "child stagger" claim (line 7)
is not backed by an entering-child onset assertion.

---

## Cross-references (other lanes)
- The slides bespoke `constellation.ts` rolls its own `easeInOutQuad` + rAF loop
  (`../slides/.../constellation*.ts:226,516`) — a parallel motion path. KILL belongs to the
  constellation lane (AY.W-CON3 / L.W-consume), noted here for cohesion.
- slides `deck.css:357,409-411` carries hardcoded `0.5s`/`1s` durations (easing IS tokenized via
  `--spring-deck`/`--ease-standard`). Minor; the deck spring is correctly dogfooded
  (`deckSpring.ts` → keyframes.js → `--spring-smooth`).

## Which AY wave owns motion cohesion?

NONE. AY has NO motion-cohesion wave. Motion is scattered across W-DOCK (lockstep only) and the
§6 doctrine is treated as already-shipped. This lane's findings need a NET-NEW wave.

## Convergence criteria (the acceptance bar)

Motion cohesion is "perfected" when: (1) every animated surface in `src/` resolves its easing from
the §6 register (surface→`--ease-standard`, transform hover/press→`--spring-smooth`/`-snappy`,
enter→spring, exit→bezier) with ZERO hardcoded `ms`/bezier/bare-keyword survivors; (2)
`proof:animation-coherence` is GREEN (speedtest re-pointed off `--ease-apple-spring`), widened to
the full animated-surface file set, asserts the register assignment, and is IN CI; (3) the live
dock gate (`proof:dock-animation-live`) asserts the ENTERING stagger onset ≤1 frame and is IN CI
with a captured DELTA artefact; (4) the `--scale-hover-btn` value/comment drift reconciled; (5) the
Toast register decision recorded (re-expressed on the spring vocabulary OR a documented keep).
