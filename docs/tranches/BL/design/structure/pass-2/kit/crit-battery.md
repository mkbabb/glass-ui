# Intent battery (written BEFORE reading gate-dp code or Dp-proto.md; inputs read: CHARTER edict, RULINGS.md, SPECS-v2 §1 + §3)

Each plant is applied alone to a fresh copy of the migrated tree; the gate verdict is diffed against the unplanted
migrated baseline (a plant is CAUGHT only if a NEW violation appears in the expected clause or any clause naming the planted file).
Paths are HEAD paths; where migration moved the target, the plant follows the file (recorded in the results table).

| id | edict/ruling | exact plant | expected clause |
|---|---|---|---|
| I01 | R-4 misplaced composable | new `src/composables/dom/useBadgePulse.ts` (`export function useBadgePulse(){return 1}`); Badge.vue imports + calls it; nothing else reads it | placement (owned) |
| I02 | edict colocation | new `src/components/slider/useBadgeTone.ts` read only by Badge.vue | placement (owned/reach) |
| I03 | door | Badge.vue `import { useDockHold } from "../dock/composables/useDockHold"` (deep past dock's door) | placement reach |
| I04 | self-name | Badge.vue `import { Button } from "@mkbabb/glass-ui/button"` | self-name |
| I05 | CSS private reach | new `src/components/badge/styles.css` = `@import "../card/scroll.css";`, loaded by Badge.vue `<style src>`/import | placement reach (css) |
| I06 | long dir | 13 new files `src/components/badge/part01..13.ts`, each `export const pNN = NN`, all imported by Badge.vue | bound |
| I07 | >500 lines | new `src/components/badge/badgeTable.ts`, 510 lines `export const bNNN = NNN;`, imported by Badge.vue | bound |
| I08 | R-3 test outside subject | new `tests/badge-only.test.ts` importing only badge (`../src/components/badge`) | test-home |
| I09 | R-3 test in wrong unit | new `src/components/button/__tests__/badge.test.ts` importing only badge | test-home |
| I10 | R-6 dual door | `src/components/chip/index.ts` append `export { Badge } from "../badge";` | dual-door (+door-reads-door) |
| I11 | placeholder name | new `src/components/badge/helpers/utils.ts` read only by Badge.vue | (none expected: D′ has no naming law) |
| I12 | masked fallback | Badge.vue `defineAsyncComponent(() => import("./BadgeFancy.vue").catch(() => import("./Badge.vue")))`, BadgeFancy.vue absent | unresolved |
| I13 | alias (dual name) | `src/components/badge/index.ts` append `export { default as BadgeCompat } from "./Badge.vue";` | dual-door or surface pin (not gate-dp) |
| I14 | R-9 skeleton away | new `src/components/skeleton/CardSkeleton.vue` read only by `card/Card.vue` | placement (owned) |
| I15 | direction | a `src/composables/dom/useBreakpoint.ts` import of `../../components/button` | upward |
| I16 | direction, CSS | `src/styles/tokens.css` prepend `@import "../components/button/styles.css";` | upward |
| I17 | CSS door purity | `src/styles/glass.css` append `.bl-plant{color:red}` | door-impure-css |
| I18 | JS door purity | the badge door `index.ts` append `export const BADGE_PLANT = 3;` | door-impure |
| I19 | aggregator read in library | Badge.vue `import { Button } from "../../index"` | door-reads-door |
| I20 | cycle | new `src/composables/dom/cycA.ts` ↔ `cycB.ts` (each imports + uses the other), both read by useBreakpoint | cycle |
| I21 | dead file | new `src/components/badge/orphan.ts`, no readers | placement dead (or unzoned) |
| I22 | backend bin | `scripts/profile-bundle.mjs` prepend `import "./comment-census.mjs";` | bin |
| I23 | backend long dir | 2 new files in `scripts/` (`plant-a.mjs`, `plant-b.mjs`), each wired as a package.json script | bound |
| I24 | unzoned | new `src/misc.ts` imported by Button.vue | unzoned |
| I25 | recursive sub-component | new `src/components/card/CardHeaderIcon.vue` read only by CardHeader.vue | (none expected: §3.9(a) admitted) |
| I26 | kind slot wrong unit | new `src/components/dock/composables/useBadgeX.ts` read only by Badge.vue | placement |
| I27 | R-10 demo past door | a demo story `import ... from "../../../src/components/dock/composables/useDockHold"` | reach / R-10 clause |
| I28 | constant misplaced | new `src/composables/color/badgeConstants.ts` read only by badge | placement |
| I29 | wrong slot name | new `src/components/badge/tests/badge.test.ts` | test-home |
| I30 | library reads demo | Badge.vue imports a file from `demo/` | upward / zone |

Legal probes (must PASS): L1 Badge.vue imports `../../composables/dom` (door, down-rank); L2 new `src/components/badge/__tests__/Badge.test.ts` importing badge only; L3 new `src/composables/dom/useShared2.ts` read by badge AND button (global legitimately); L4 a `.visual.ts` test? (skipped: Playwright program).
