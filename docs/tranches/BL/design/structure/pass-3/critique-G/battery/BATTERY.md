# D1 pass 3 · critique-G · intent battery

Seat: fresh critic of D1-G, model `claude-opus-5-5`. Written 2026-09-25T02:05Z, after reading REGISTRY §P2-6.4, §P2-6.5, §P2-7 and RULINGS.md, and before reading `pass-3/G-kit/`, `pass-3/G-proto.md` or `pass-3/xj-BonG.md`. The hash of this directory is in `../BATTERY-HASH.txt`.

One probe per checklist item. Two kinds:

- **Structural probes** (`probes.mjs`) read the replayed tree `T` (and the committed docs in it). No mutation.
- **Plants** (`plants.mjs`) mutate `T`, run the route's gate command (`GATE`, fixed from the kit before planting), record exit code and every output line that is new against the unplanted baseline, then restore the exact bytes. The tree digest is taken before and after the whole battery. A plant locates its target by basename, since the migrated paths are unknown when the battery is written. `expect: RED` means the gate must exit non-zero or print a new violation line; `expect: GREEN` means no new line and exit unchanged (negative controls).

An item is CLOSED only when every probe listed for it passes on a replayed tree. Otherwise it is OPEN, and the failing probe is the counterexample.

| item | probe(s) | pass criterion |
|---|---|---|
| S-01 | `probes S-01` | every file under `pass-3/G-kit/` and `pass-3/xj-*` is tracked at the worktree's commit; the pass-2 kit (`pass-2/kit/`) is tracked; the replay reads nothing outside tracked files (checked in step 2 from the replay command) |
| S-02 | `probes S-02` | RULINGS has P3-R1; on `T` the 7 kernel-published hooks (`useClipboard`, `useDragVelocity`, `useRAFLoop`, `useYieldToMain`, `useScrollChrome`, `useScrollProgress`, `useRoutePointer`) all live under `src/composables/` |
| S-03 | `probes S-03` | RULINGS has P3-R2..R9; on `T`: `package.json` exports `./aurora-config` (P3-R5); `accent-tone.css` is not beside `Chip.vue` unless read only by chip after the collapse (P3-R2, reported); every `.bundle-ratchet` ceiling equals HEAD's, or a ruled row changes it (P3-R9) |
| S-04 | `probes S-04` | the landed `placement.mjs` has the `anchor` parameter and `placement.mjs --root T` reports 0 `move` and 0 `global` rows |
| S-05 | `plants K-S05` | a move list that moves `useScrollChrome.ts` into its first component consumer is refused by the engine on `T` (`--dry`), naming FD-2 |
| S-06 | `plants K-S06` | `import "@mkbabb/glass-ui/badge"` added to `Chip.vue` turns the gate RED |
| S-07 | `plants K-S07` | a `join(process.cwd(), "src/components/" + n)` read in a scripts file raises a `computed-read` census row in the landed graph |
| S-08 | `probes S-08` | on `T` after build: `entries.mjs check` exits 0; `dist/styles/theme.css` exists; the replay log carries no `refused` move |
| S-09 | step 2 | the kit's replay run twice from committed artifacts gives one digest, and the second run applies 0 changes |
| S-10 | `probes S-10` | `cascade.mjs verify` of `T`'s dist against the pre-replay dist is GREEN (or each divergence is listed and ruled); `classify.mjs --base <pre-replay copy> --root T` leaves 0 `UNCLASSIFIED` |
| S-11 | `probes S-11` | `scripts/structure/` exists on `T`; no file outside `docs/` imports from `docs/`; `npx vitest run` on `T` has 0 failures in the FD-6 layout-pin class |
| S-12 | `probes S-12` | `browser.mjs --root T --moved <kit lists>` exits 0 with GREEN, and the route committed a browser-seat result |
| S-13 | `probes S-13` | `xj-BonG.md` and `xj-GonB.md` are tracked and each states its clause results and a merge verdict |
| G-01 | `probes G-01` | the kit holds a spec (law) text naming every clause E0..E7 and a disposition for each of G-proto(pass-2) §8's 9 choices (CSS hold, global-zone landing, sibling-stem rename, `STAGES`, slot tolerance, eponymy pin, hook-only `composables/`, relay-cure rows, auto-hold); the gate, lists and rows are tracked |
| G-02 | `probes G-02`, `plants K-E4 K-E5 K-E6 K-E7` | the gate is reached by `npm test`; E4..E7 read 0 (or each residue is a ruled row) on `T`; each of the four plants turns its clause RED |
| G-03 | `probes G-03`, `plants K-G03a K-G03b` | on `T`: a dir named `detents` under sheet, `renderer` under fourier-field, `config` under aurora (or committed override rows that say otherwise with a reason); no dir named `aurora-frag`, `mediums-glsl`, `aurora-wgsl` or `*-frag`/`*-glsl`/`*-wgsl`; a module-set pin is committed; renaming `detents` (K-G03a) and adding an unpinned module dir (K-G03b) each turn the gate RED |
| G-04 | `plants K-P18 K-P20 K-P21 K-B8 K-B12 K-B14` | each RED: P18 a deep relative reach into a dock-private composable from `Badge.vue`; P20 a same-door alias `GlassDockLegacy.ts` published on the dock door; P21 `import("./<existing>").catch(() => null)`; B8 a type-only import of a component file from `src/composables/`; B12 a non-door relay; B14 a statement that is not a re-export inside a JS door |
| G-05 | `plants K-P19 K-P19b` | RED: `dock/utils/utils.ts` over `dock/utils/format.ts` (eponymous placeholder); a module dir named `misc` holding an eponymous `misc.ts` |
| G-06 | `plants K-P28 K-B35`, `probes G-06` | RED: `scripts/foo-helper.mjs` read by one bin only (P28); a bin's private helper placed inside another bin's dir (B-35); structural: no top-level `scripts/` non-bin file with fewer than 2 bin readers |
| G-07 | `plants K-B10 K-B28 K-B14g K-B22`, `probes G-07` | RED: a component sheet `@import`ing another unit's private sheet (B-10); a component sheet moved into `src/styles/` and imported by the aggregator (B-28); `import.meta.glob` reaching out of a door (B-14); `<style src>` carve (B-22). Structural: the kit states its answer to the symbol-grain question (B-30) |
| G-08 | `plants K-P07a` | GREEN: `dock/registry.ts` importing 3 dock SFCs only into an object literal, read by `GlassDock.vue`, demands no move and no clause rises (negative control) |
| G-09 | `probes G-09` | a churn tool and its output are committed; rerunning the tool reproduces the committed rate, and it used each commit's own entry map and hysteresis |
| G-10 | `probes G-10` | on `T`, no non-slot dir in the five zones holds more than 12 direct files, and `menu`, `styles/glass`, `styles/tokens` and `tests-visual` are split into named modules; slots hold 12 or fewer (P3-R3) |
| G-11 | `probes G-11` | on `T`: `./aurora-config` exported; E5 0; E6 0; files over 500 lines 0 (or generated and verified); at least one `src/**/__tests__/`; scripts restructured; the gate wired |
| G-12 | `probes G-12` | on `T`: the max src dir depth is reported; every parent↔child dir import cycle is either counted by FD-2 (a plant creating a new one is refused) or covered by a ruling that says it is intra-unit |
| (control) | `plants K-L1` | GREEN: a legitimate test inside a unit's `__tests__/` importing only that unit |
