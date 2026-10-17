// D4-F pass 5 · the route's migrated arms for floor v4 (H5-5). Every site is the one pass 4 ran (`../../../../pass-3/
// D4-F-spec/route/migrated.mjs`, through pass 4's route.json) except K2, which is the harness's one transcription
// under F's declaration, the stage in `#media` (`../../../../harness/k2.mjs`). It equals pass 4's K2 byte for byte in
// markup and CSS; it is imported so that the two routes cannot drift again.
import base from "../../../../pass-3/D4-F-spec/route/migrated.mjs";
import { K2_SPECIMEN } from "../../../../harness/k2.mjs";
export default { ...base, specimen: K2_SPECIMEN("anatomy") };
