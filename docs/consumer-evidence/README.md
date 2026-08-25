# Consumer Evidence

Per-artefact notes recording the ≥2-consumer bar (J inv-10) for a library surface
that ships at <2 in-repo consumers — the substrate-with-consumer record an audit
cites only while the proof grep still passes.

## The forcing rule — every doc is gate-read OR deleted (BH.B4d)

> **[2026-08-25 · BK #76 α5] THE FORCING RULE HAS NO ENFORCER AT HEAD, AND HAS NOT
> HAD ONE SINCE #65.** Everything below this bracket describes machinery that is
> absent from the tree. Measured this seat, detectors verbatim:
>
> - `node -e` over `package.json.scripts` for the seven gate names this file
>   names → **all seven ABSENT**: `proof:consumer-evidence-live` ·
>   `proof:spa-view` · `proof:haptic` · `proof:virtual-window` ·
>   `proof:component-orphan` · `proof:consumers:static` · `proof:consumers:build`.
> - `Object.keys(scripts).filter(k => k.startsWith("proof"))` → **`(none)`**. The
>   whole `proof:*` namespace was collapsed at **#65 W-GATE-COLLAPSE** under the
>   gates-abrogation mandate. This file was never truthed against that collapse.
> - `ls scripts/ | grep -i "consumer\|evidence\|orphan"` → **`(none matching)`**.
> - `grep -rn "consumer-evidence" scripts/ tests/` → **zero readers**. No
>   registered gate seat reads this directory by any name.
>
> So the "**LIVE** or **deleted** — no third state" law has been running with its
> falsifier unplugged, and the third state is what the corpus is actually in. The
> consequence is measured and banked, not guessed: **23 of 25 docs carry 52 unique
> dead path cites** (detector: every `` `src|scripts|demo|tests/…` `` backticked path
> per file, `os.path.exists` on the pre-`:` stem) — **10 restructure-drift** (the
> artefact lives, the cite predates the BI `custom/` flatten), **38 with no
> successor on disk**, and **4 foreign-repo false-positive cites** (`use-deck.md:18`
> atlas · `useStagger.md:13-14` speedtest ×2 · `header-ribbon.md:22` keyframes — all
> correctly cited in their own sentences; the detector cannot see repo boundaries).
> [2026-08-25 · adjudication cure: the banked 22/49/1 was a hybrid no consistent
> detector policy reproduces. A re-runner at the landed state measures 23/54 — this
> bracket's own two absence cites (this README's `src/stage/useStageDeck.ts` and
> `canvas-anchored-overlay.md`'s `src/components/hover-card/`) read as +2.]
> Full table + classification: the α5 RECORD §4.
>
> This seat truths the **four artefacts TR#76 names** and the BEAD census row. The
> other 18 docs are **ROUTED, not swept** — each needs the disposition of the wave
> that deleted its artefact, and striking them by adjacency is how scope leaks.
> **Re-grounding the forcing gate is the root fix and is routed with them**; until
> it lands, treat every path cite in this directory as dated, not current.
>
> Also stale in the paragraph below: *"the dir was pruned 60 → 31"* — `ls
> docs/consumer-evidence/ | wc -l` reads **25** at this HEAD.

`proof:consumer-evidence-live` (`scripts/proof-consumer-evidence-live.mjs`) kills
the **write-once-never-read** class permanently: a note authored to satisfy a bar
at mint time, then never re-read, rots as dead prose. Every file here is **LIVE**
or it is **deleted** — no third state. A file is LIVE iff EITHER:

- **gate-referenced** — a registered `scripts/*.mjs` gate READS it, either by its
  path `consumer-evidence/<name>.md` (e.g. `proof:spa-view` reads `spa-view.md`,
  `proof:haptic` reads `use-haptic.md`) or via a templated `consumer-evidence/${…}`
  read over a quoted-basename list (`proof:virtual-window` verifies the
  section-window helper docs' src-path claims). The doc earns its keep by being read.
- **orphan-exemption** — `<name>` matches a published `custom/` package that
  `proof:component-orphan` keeps via its evidence-doc allowlist (a published
  package with <2 non-self consumers; deleting the doc would RED that gate). The
  forcing gate reuses the orphan gate's own census — DRY, no second walk.

A doc that is neither REDs the gate: re-ground it onto a real gate, or delete it
(the clean-break discipline — no dead notes). At BH.B4d the dir was pruned 60 → 31
(the retired surfaces `underline`/`is-mac`, the ≥2-consumer package notes no gate
reads, and the composable-return-shape trivia). `README.md` is exempt (the policy
index).

`proof:consumers:static` (`npm run proof:consumers:static`) is the orthogonal
static consumer contract on top of these notes: it rejects non-core root imports,
undeclared subpaths, retired style paths, and `glass-ui/src` source-relative
imports across `fourier-analysis/web`, `words/frontend`, `bbnf-lang/playground`,
and `speedtest`. Build proof is `npm run proof:consumers:build`.
