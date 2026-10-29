// D4 pass 11 · CRITIC route A11: the pass-10 critic's A10 (`../../../../pass-10/D4-Dp10-crit/routes/A10`, itself H9's
// `MIGRATED("shape")` plus c1long, c1wide, c1bare and pillwrap), imported unchanged, plus this seat's own attack
// compositions on O-103c / O-103e ("C1 is a cell in BOTH states; selection changes no geometry, for ANY content C1's
// layout can hold"). None is a consumer's; each is C1's own anatomy (sites.mjs:77, the ruled shape="cell") with one
// variable moved:
//   c1rtl   the 47-label ladder at 192 px under dir="rtl": the inline axis flips, start-aligned text flips, the count
//           sits on the other side, ArrowDown still walks the column
//   c1sm    the ladder at 192 px with size="sm" (the sm tile pad and the sm control text: boundaries fall elsewhere)
//   c1lg    the ladder at 192 px with size="lg" (the lg pill pad is written; the tile pad must still win: the `lg` trap)
//   c1rich  C1 holding richer content than a label and a count: a 16 px media glyph that reads currentColor, a label,
//           a count, and a second, block-level description line that wraps; 12 options at 192 px
//   c1multi C1's anatomy as type="multiple" (several on at once): the same cell law, with more than one selected
import A10, { LONG } from "../../../../pass-10/D4-Dp10-crit/routes/A10/migrated.mjs";

const lit = (v) => JSON.stringify(v).replace(/"/g, "'");
const HOST = (g) => `<Card size="sm" class="tx-c1 w-auto p-1">${g}</Card>`;
const c1 = A10.c1.group;
for (const a of ['shape="cell"', 'class="min-w-48"', 'aria-label="Status"', 'v-for="o in STATUSES"', 'type="single"'])
  if (!c1.includes(a)) throw new Error(`A11: C1's transcription has no ${a}; the attack anchors are gone`);
const ladder = (label, extra = "") => c1
  .replace('class="min-w-48"', `class="w-48"${extra}`)
  .replace('aria-label="Status"', `aria-label="${label}"`)
  .replace('v-for="o in STATUSES"', `v-for="o in ${lit(LONG)}"`);

const RICH = Array.from({ length: 12 }, (_, k) => ({
  value: `r${k}`,
  label: LONG[k * 4].label,
  count: String(3 + k * 11),
  note: "Last touched by the reviewer, " + "two days ago and again this morning".slice(0, 6 + k * 3),
}));
const rich = `<ToggleGroup type="single" shape="cell" orientation="vertical" data-group aria-label="Status, rich" class="w-48" v-model="model">
        <ToggleGroupItem v-for="o in ${lit(RICH)}" :key="o.value" :value="o.value" data-item>
          <svg data-ink viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" /></svg>
          <span data-ink data-line-slot class="flex-1 text-start">{{ o.label }}</span>
          <span data-ink class="num">{{ o.count }}</span>
          <span data-ink class="block text-start text-micro">{{ o.note }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`;

const m = { ...A10 };
m.c1rtl = { group: `<div dir="rtl">${HOST(ladder("Status ladder, rtl", ' dir="rtl"'))}</div>` };
m.c1sm = { group: HOST(ladder("Status ladder, sm", ' size="sm"')) };
m.c1lg = { group: HOST(ladder("Status ladder, lg", ' size="lg"')) };
m.c1rich = { group: HOST(rich) };
m.c1multi = { group: HOST(ladder("Status ladder, multiple").replace('type="single"', 'type="multiple"').replace('v-model="model"', 'v-model="multi"')) };
for (const k of ["c1rtl", "c1sm", "c1lg", "c1rich", "c1multi"]) if (!m[k].group.includes('shape="cell"')) throw new Error(`A11: ${k} lost shape="cell"`);
if (!m.c1multi.group.includes('type="multiple"') || !m.c1sm.group.includes('size="sm"') || !m.c1rtl.group.includes('dir="rtl"')) throw new Error("A11: an attack write did not land");
export default m;
