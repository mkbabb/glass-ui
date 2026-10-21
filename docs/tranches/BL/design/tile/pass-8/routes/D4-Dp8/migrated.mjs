// D4 pass 8 · D′ v8's migrated arms: the harness's one transcription under D′'s declaration (`../../../harness/sites.mjs`,
// `MIGRATED("shape")`) with C1 declaring `shape="cell"`, as INBOUND O-103c rules Q-10's remainder: "(i) C1 declares
// shape=\"cell\"". The declaration is on C1's group, so every option of C1 is a cell at rest and selected (the condition:
// selection changes no geometry; read by `../../probes/c1-box.mjs`). H8 is H7 plus the B-1 writer read only, so the
// transcription of record (`sites.mjs` c1, "no declaration on either route (Q-10 (b))") is unchanged and this route
// carries the ruling; XSCRIPT reads it as the declaration (` shape="cell"` removed, the site equals the transcription).
import { MIGRATED } from "../../../harness/sites.mjs";

const m = MIGRATED("shape");
m.c1 = {
  ...m.c1,
  group: m.c1.group.replace('<ToggleGroup type="single" orientation="vertical"', '<ToggleGroup type="single" shape="cell" orientation="vertical"'),
};
if (!m.c1.group.includes('shape="cell"')) throw new Error("D4-Dp8 route: C1's declaration did not land");
export default m;
