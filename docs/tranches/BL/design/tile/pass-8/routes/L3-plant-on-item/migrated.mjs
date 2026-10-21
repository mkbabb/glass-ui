// D4 pass 8 · L-3's planted composition (the registry's plant: "a plant writing it on the item FAILs"): bare-pill's and
// bare-tile's `--selection-paint: bare` moves from the group element to each option. The pin refuses it there, so the
// opt-out does not land and the probe's `bare-pill` and `bare-tile` cells must FAIL.
import { compose } from "../L3/compose.mjs";
export default compose({ plantOnItem: true });
