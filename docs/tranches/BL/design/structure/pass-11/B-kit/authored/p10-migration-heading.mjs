// p10-migration-heading.mjs — S75 (pass 10, P9-R2 (a)): the chain writes its MIGRATION section
// under the bare version it ships in, `## 11.0.0`, in W-C.2's form (one section per version, headed
// by the bare version), with no tranche id; and the lines of MIGRATION.md that name a tranche
// ("BL" or the word "tranche": 9 on the pass-9 tree, the heading and 8 floor-base lines) go in this
// same row, each re-worded by what it says. MIGRATION.md ships (package.json `files`), so S70's
// datum is re-measured after this row.
export const why = "P9-R2 (a): the chain's MIGRATION section is headed `## 11.0.0`, the bare version it ships in, with no tranche id (W-C.2's form; W-D.1 D1-G10), and the eight other MIGRATION.md lines that name a tranche say what they mean without it, in the same row; MIGRATION.md ships, so the datum is re-measured at S70";

const w = (from, to, why) => ({ file: "MIGRATION.md", from, to, why });

export const edits = [
    w("## UNRELEASED — the structure cut (BL)\n", "## 11.0.0\n", "the section is headed by the version it ships in (W-C.2 §3.5); the tranche id goes"),
    w("re-mints them in its own\ntranche. The old spellings", "re-mints them in its own\ncode. The old spellings", "a consumer re-mints the utilities in its code"),
    w("consumer's own tranche). The `proof:tabs-unified`", "consumer's own records). The `proof:tabs-unified`", "the rows live in the consumer's records"),
    w("AZ tranche's breaks (the dock taxonomy", "AZ cut's breaks (the dock taxonomy", "the breaks of that cut"),
    w("AI-CARRY-GLASS-UI-KEYFRAMES-EDGE 4-tranche chronic.", "AI-CARRY-GLASS-UI-KEYFRAMES-EDGE chronic, carried four times.", "the chronic, without the word"),
    w("v1.0 is the L-tranche cohort release.", "v1.0 is the cohort release.", "the release, without the tranche id"),
    w("chronic (4-tranche\ndeferral from AI).", "chronic (deferred\nfour times from AI).", "the chronic's length, without the word"),
    w("- **Tranche plan**: `docs/tranches/L/L.md`", "- **Plan**: `docs/tranches/L/L.md`", "the plan, without the tranche label"),
    w("The 4.0.0 major collects the BA tranche's clean breaks", "The 4.0.0 major collects the BA cut's clean breaks", "the breaks of that cut"),
];
