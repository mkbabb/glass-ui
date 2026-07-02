# The Fable/DesignSync design-review arm (BG.W-FABLE-DESIGN-ARM · GA-3 · PE-FABLE)

The canon home for the 2026-07-01 Fable/DesignSync mandate. Lives OUT of the `src/`
submodule (the tranche-doc home the close-family waves keep). Machine-locked by
`proof:meta` (the `fable-arm-present` arm).

## The mandate (the freshest binding directive)

All frontend DESIGN work is authored by FABLE instances via the frontend-design
MCP. DesignSync syncs the enrolled surfaces to a `claude.ai/design` project for
card-based, incremental gestalt review. Opus/sonnet fan-out is for MECHANICAL
audit + build only, never for judging the design. This is the direct cure for the
disease the last three ships carried: opus-fanout-built visuals, self-judged green,
that the user then read as broken.

## The per-wave schema (every VISUAL wave names both halves)

Every VISUAL wave declares two things in the `fable / designSync` column of the
`docs/tranches/BG/execution/EXECUTION-PROGRESS.md` §1 MASTER TABLE — the single
machine-readable per-wave cursor:

- **`fableArm`** — the Fable design arm: the design-language authoring surface (the
  gestalt decision the wave owns). e.g. `dock fission bloom`, `V↔H real morph`.
- **`designSyncSurface`** — the DesignSync review card set the wave syncs to. e.g.
  `/navigation dock fission`, `/dock morph-showcase + in-situ shell`.

The cell format is `<fableArm> / <designSyncSurface>` (space-slash-space; an internal
`darken/lift` / `Card/Tab/Slider/Dialog` slash is not a delimiter). A VISUAL wave is
any §1 row whose `class` cell carries a paint `P` token (`P`, `H/P`, `P (cond)`); a
bare `H` / `H→ci` wave is structural/mechanical and carries `—`.

## The close precondition (the human half of the seam)

The DesignSync review returned a PASS gestalt verdict from a FABLE instance, NOT the
building agent, over the wave's `designSyncSurface` — this is a **CLOSE PRECONDITION**
for every VISUAL wave. A visual wave closing without a filed Fable PASS REDs the
close (`proof:ba-gestalt` G8 is the machine half; the filed Fable verdict is the
human half). The builder never signs off on its own paint (the non-authoring fence).

## DesignSync provisioning is USER-GATED (R16) — enforceable in both states

Standing up the `claude.ai/design` DesignSync project is a USER-GATED step: the
schema + the routing are locked now, but the review surface itself is provisioned on
the user's word (a device-free gate does not spin up an MCP project). The mandate is
**enforceable in both states**:

- **Provisioned** — the DesignSync project exists; the FABLE instance files its PASS
  verdict against the synced surface cards.
- **Not-yet-provisioned** — a FABLE instance (never the builder) records the verdict
  against the committed dual-engine captures (`docs/tranches/BG/audit/visual/
  *-DELTA.md`), the same non-authoring paint close every visual wave already owes.

Either way the verdict comes from Fable, not the builder. `proof:meta`'s
`fable-arm-present` arm locks the SCHEMA + this recorded routing so the mandate
cannot silently un-encode; the human PASS is the paint-close artifact.

## The gate

`proof:meta · fable-arm-present` (born-RED → GREEN at this wave):

- **S1 schema completeness** — every §1 VISUAL row names both halves (parsed by
  header name, column-order-free). Born-RED on the 3 §1 rows the fold left half-less
  (`W-COMPOSITED-GESTALT-GATE`, `W-ANIMATION-CONGRUENCE`, `W-CUT`) + the F6.3
  `BH.W-MOTION-AXIS` class reconcile (`H` → `H/P`, VISUAL per AMENDED-GESTALT-PLAN
  §1).
- **S2 provisioning presence** — this canon carries the close-precondition + the
  USER-GATED provisioning + the enforceable-in-both-states fallback; the
  `DIRECTIVE-LEDGER` §7b PE-FABLE row names `W-FABLE-DESIGN-ARM` as owner.
- **self-test** — 6 synthetic bites (a `P`-row `—` flags, a both-arms `P`-row does
  not, an `H`-row `—` does not, a half-less cell flags, an `H/P`-row `—` flags, an
  internal-slash cell does not false-split).
