Gate plants on the replayed tree (digest 6618df1f…). Each <name>.json is an in-memory overlay
({path: full text}) read by the landed gate; nothing is written to the tree.
  node scripts/structure/seal/seal.mjs --overlay <name>.json --json out.json
verdicts.json: every clause whose count moved against the unplanted run, with the new rows.
The overlay files carry the replayed tree's text of the planted file plus the plant; regenerate
them from the tree if the chain changes. B-11 is planted by the gate's own test (seal.test.ts:
"has one pin path"); its CLI output is ../tc-seal-pin.txt.
