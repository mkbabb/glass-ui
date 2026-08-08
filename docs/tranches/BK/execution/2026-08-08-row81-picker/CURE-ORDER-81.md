# CURE-ORDER #81 W-PICKER — driver-ratified residue (2026-08-08)

Adjudicator (Fable, quartet seat wf_7eda1899-6e3) ruled CURE-REQUIRED. The driver ratifies
the five cures verbatim. What STANDS: the selection (#81 first of the ⊕⁵⁷ tier-3 band,
edge banked, verified on the live cursor); the cut's substance — F1's never-painted
gutter cure (`.ps-7` now emits, was 0 rules), the C-11/K-10 relocation
(field-surfaces 202→28, payload → `styles/glass/overlay-plate.css` 186), the C-12/K-11
option-radius law on disk, receipt byte-identical, vue-tsc 0, row-own 33/33, the 11
foreign failures all traced (#40/#7).

## Cures

- **C1 (code, BLOCKING):** `CommandDialog.vue` carries the row's own boolean-cast latch —
  empirically, an uncontrolled CommandDialog forwards `open:false`/`modal:false` to
  Dialog and `open:false` to Command, pinning the palette shut. Mirror Command.vue's cure
  exactly: `undefined` defaults + omit-when-unset for `open`/`defaultOpen`/`modal`/
  `unmountOnHide`. (The dialog-half is pre-existing at HEAD — so this is an uncured
  rewritten-in-fence file, not a fresh regression; the fence already owns the file.)
- **C2 (gate):** widen G6 to CommandDialog — the gate's title asserts an invariant its
  body checks only against Command.vue. Born-RED: prove the widened case RED on the
  pre-C1 bytes (scratch-copy revert), then GREEN.
- **C3 (test):** exercise the uncontrolled arm in `CommandDialog.test.ts` — mount with no
  `open` prop, assert the palette opens (defaultOpen path) and reka receives no
  `open:false`.
- **C4 (record + paste-block truth):**
  (a) correct RECORD §4(1) + both banked paste blocks: the PROPORTION §7b class is
  discharged at Command.vue AND CommandDialog only after C1 — restate with C1 named.
  (b) adjudicate RT-24C ON THE RECORD: cursor #24 routes select/combobox → #81 and the
  record carries zero focus-veil adjudication; read the #24 block's route content from
  the cursor and dispose of it with grounds (execute, refuse-with-grounds, or route
  onward — silence is the one option TR forbids).
  (c) figures, each with detector stated: utility-emit `:87`→`:105`; field-surfaces
  202→**203**; the π cell "10→12"→"none→12"; DELETED 5→**6**; "9 re-declared"→**8-of-10**.
  (d) adjudicate CWT-3 §3.2's `--dropdown-text-secondary` re-point on the record —
  executed, refused-with-grounds, or routed; state which and why from disk.
  (e) adjudicate the Command-row corner under the C-12 law: the law keys radius to the
  select-viewport inset only — state whether command rows take the C-12 radius or keep
  their own, with the law's own terms as grounds.
- **C5 (environment, advisory):** kill the stale vite process (pid 61360 if still live;
  re-derive the pid, never trust the banked one) and rebuild dist-demo before seal.

## Residue carried (booked, not this cure's — fold the cheap ones if the file is open)

A-D2 nit (CommandItem.vue "survives ONLY as" under-counts the disabled arm — optional
one-word fix, foldable); A-D8 (same-value duplicate `overflow-y`, command styles.css:82
vs `.fading-scroll--y` base-misc.css:74 — optional strike, foldable); F26's detector is
line-shaped and blind to the multi-line export block at src/index.ts:145 (returns 0
either way; the substantive claim holds — note it); the concurrent-writer hazard (B-D6):
receipts taken in this tree are racy while any seat runs in-tree bites — the DRIVER
takes the final receipt after all seats return; #22's skip-list description says
CURE-CUT, cursor says SEALED ⊕³⁵ — harmless, note if touched; π owed to #10 (G2 GUTTER +
G5 PAINT-FLOOR + eight new paint cells, with the C4c "none→12" correction applied before
banking).

## Driver duties at commit (not the cure seat's)

Scoped add of the lane's fence (the lane was clean in the shared tree at selection —
verify no foreign hunks appeared since); re-run demo:dist:build + the receipt LAST,
after every seat has returned (B-D6); leak-check; ⊕-index derived at commit time from
the cursor tail.
