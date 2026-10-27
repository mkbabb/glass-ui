// D4 pass 9 · CRITIC route: the pass-8 route of record (`../../../../pass-8/routes/D4-Dp8`, C1 declaring shape="cell",
// O-103c) unchanged, plus two attack compositions that are no consumer site (build.mjs renders each as
// `<key>-migrated`, as written, no twin). Both sit in C1's own host (`<Card size="sm" class="tx-c1 w-auto p-1">`):
//   c1long   C1's group as the route writes it, but fixed at w-48 (192 px, C1's own min) and holding a ladder of
//            labels one character apart (14..30), each with a count, so some label sits at the wrap boundary in
//            regular weight. Selection sets weight 600 (styles.css); the input asks whether the heavier ink re-wraps a
//            label or moves the count, i.e. whether O-103c's "selection must not change its geometry" holds for C1's
//            anatomy with content C1 could plausibly carry, not only C1's five strings
//   c1bare   C1 exactly as the route writes it, with L-3's opt-out written on the group (`--selection-paint: bare`,
//            the consumer write O-94a names): a cell in both states, no shift, and the perimeter still carries
import base from "../../../../pass-8/routes/D4-Dp8/migrated.mjs";

const HOST = (g) => `<Card size="sm" class="tx-c1 w-auto p-1">${g}</Card>`;
const LADDER = Array.from({ length: 17 }, (_, k) => {
  const n = 14 + k;
  const label = "Awaiting a reply from the reviewer".slice(0, n).trimEnd().padEnd(n, "s");
  return { value: `l${n}`, label, count: String(10 + k * 7) };
});
const c1 = base.c1.group;
if (!c1.includes('shape="cell"') || !c1.includes('class="min-w-48"') || !c1.includes('v-for="o in STATUSES"')) throw new Error("A9: C1's route group changed shape; the attack anchors are gone");

const m = { ...base };
m.c1long = {
  group: HOST(c1
    .replace('class="min-w-48"', 'class="w-48"')
    .replace('aria-label="Status"', 'aria-label="Status ladder"')
    .replace('v-for="o in STATUSES"', `v-for="o in ${JSON.stringify(LADDER).replace(/"/g, "'")}"`)),
};
m.c1bare = {
  group: HOST(c1.replace('aria-label="Status"', 'aria-label="Status (bare)" style="--selection-paint: bare"')),
};
if (!m.c1bare.group.includes("--selection-paint: bare")) throw new Error("A9: the bare write did not land");
export default m;
