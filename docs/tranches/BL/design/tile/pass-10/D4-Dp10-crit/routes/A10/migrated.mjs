// D4 pass 10 · CRITIC route A10: D′ v9's route of record (`../../../routes/D4-Dp10`, i.e. H9's `MIGRATED("shape")`,
// C1 declaring shape="cell" in sites.mjs, L-4) unchanged, plus four attack compositions that no consumer writes
// (build.mjs renders each as `<key>-migrated`, as written, no twin). They ask whether "selection changes no geometry"
// (O-103c, O-103e) holds BY CONSTRUCTION under the cure, past H9's one ladder at one width:
//   c1long   C1's group at its own 192 px (w-48) over a LONGER ladder than H9's: 47 labels, 14 to 60 characters, so
//            labels sit at one-, two- and three-line wrap boundaries at every viewport the sweep reads
//   c1wide   the same ladder at 256 px (w-64): a second column width, so boundaries fall elsewhere
//   c1bare   C1 with L-3's opt-out on the group (`--selection-paint: bare`): a cell in both states, no shift
//   pillwrap a pill group (no shape: the library default) in a fixed 260 px flex-wrap row of seven pills, so a pill
//            that widened by a pixel on selection would push a sibling onto the next line: a pill row at its edge
import { MIGRATED } from "../../../../harness/sites.mjs";

const base = MIGRATED("shape");
const HOST = (g) => `<Card size="sm" class="tx-c1 w-auto p-1">${g}</Card>`;
const SENTENCE = "Awaiting a reply from the reviewer before the merge can land";
export const LONG = Array.from({ length: 47 }, (_, k) => {
  const n = 14 + k;
  return { value: `m${n}`, label: SENTENCE.slice(0, n).trimEnd().padEnd(n, "s"), count: String(10 + k * 7) };
});
const PILLS = ["Elastic", "Critically damped", "Board", "Overdamped", "Drafts", "Spring", "Underdamped"];
const c1 = base.c1.group;
for (const a of ['shape="cell"', 'class="min-w-48"', 'aria-label="Status"', 'v-for="o in STATUSES"'])
  if (!c1.includes(a)) throw new Error(`A10: C1's transcription has no ${a}; the attack anchors are gone`);
const lit = (v) => JSON.stringify(v).replace(/"/g, "'");
const ladder = (w, label) => HOST(c1
  .replace('class="min-w-48"', `class="${w}"`)
  .replace('aria-label="Status"', `aria-label="${label}"`)
  .replace('v-for="o in STATUSES"', `v-for="o in ${lit(LONG)}"`));

const m = { ...base };
m.c1long = { group: ladder("w-48", "Status ladder, long") };
m.c1wide = { group: ladder("w-64", "Status ladder, wide") };
m.c1bare = { group: HOST(c1.replace('aria-label="Status"', 'aria-label="Status (bare)" style="--selection-paint: bare"')) };
m.pillwrap = {
  group: `<ToggleGroup type="single" data-group aria-label="Pill wrap" class="flex flex-wrap gap-1" style="width: 260px" v-model="model">
        <ToggleGroupItem v-for="p in ${lit(PILLS)}" :key="p" :value="p" data-item><span data-ink data-line-slot>{{ p }}</span></ToggleGroupItem>
      </ToggleGroup>`,
};
if (!m.c1bare.group.includes("--selection-paint: bare") || !m.c1long.group.includes("w-48") || !m.c1wide.group.includes("w-64")) throw new Error("A10: an attack write did not land");
export default m;
