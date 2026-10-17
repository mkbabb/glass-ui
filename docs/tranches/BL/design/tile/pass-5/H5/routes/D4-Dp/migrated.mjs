// D4-D′ pass 5 · the route's migrated arms for floor v4 (H5-5). Every site is pass 4's (`../../../../pass-4/D4-Dp-spec/
// route/migrated.mjs`) except K2, which is the harness's one transcription under D′'s declaration, `shape="cell"`
// (`../../../../harness/k2.mjs`). Pass 4's K2 carried `.tile-name { color: var(--selection-ink) }`, consumer paint on a
// tile; it leaves the arm, and REPORT `name-ink` reads whether the library moves the selected name's ink.
import base from "../../../../pass-4/D4-Dp-spec/route/migrated.mjs";
import { K2_SPECIMEN } from "../../../../harness/k2.mjs";
export default { ...base, specimen: K2_SPECIMEN("shape") };
