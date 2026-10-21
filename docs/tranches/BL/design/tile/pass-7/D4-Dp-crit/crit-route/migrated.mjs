// D4-D′ pass-7 critic · Q-10 (b) as ruled (O-103: "tiles only"), read on its one D′ answer. The registry's sheet says
// (b) leaves C1 RED "or C1 declares a tile at a 16 px corner on a 40 px row" (§P2-5, §P5-5 row 2). The route's own
// transcription (`../../H7/routes/D4-Dp`, `harness/sites.mjs` c1: "no declaration on either route (Q-10 (b))") keeps
// C1 a pill, so T-3 reads it against the tile bar and fails. This dir is the same transcription with ONE change: C1's
// group declares `shape="cell"`. Not a migration of record and not a harness change: a measured input for the
// agglomerate (T-3, T-4, T-5, T-7 are C1's gates, scenes.mjs:50).
import { MIGRATED } from "../../../harness/sites.mjs";
const m = MIGRATED("shape");
m.c1 = { ...m.c1, group: m.c1.group.replace('<ToggleGroup type="single" orientation="vertical"', '<ToggleGroup type="single" shape="cell" orientation="vertical"') };
if (!m.c1.group.includes('shape="cell"')) throw new Error("crit-route: the C1 declaration did not land");
export default m;
