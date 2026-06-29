# Consumer Evidence

Per-artefact notes recording the ≥2-consumer bar (J inv-10) for a library surface
that ships at <2 in-repo consumers — the substrate-with-consumer record an audit
cites only while the proof grep still passes.

## The forcing rule — every doc is gate-read OR deleted (BH.B4d)

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
