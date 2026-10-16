// authored/alpha-home.mjs — AUTHORED input to derive/edits.mjs (step S45, pass 5; R-3, B16).
// tests/styles/route-motion/alpha.test.ts (a part of the route-motion split) has one subject,
// composables/motion/route (ROUTE_GRAMMAR). It read the name through ./motion-core, the door of
// composables/motion, so colocating it into motion/route/__tests__/ would have a file inside
// route read its parent's door: FD-2 refused the move (S44: motion <-> motion/route). A test
// reads its home's subtree (LAW §5), so it takes the name from its subject module's door, and
// the colocation that follows (S46) adds no co-cyclic pair.
export const why = "R-3 / B16: the route-motion alpha test reads ROUTE_GRAMMAR from its subject module (composables/motion/route), not the parent's door, so its colocation adds no FD-2 pair";
export const edits = [
    {
        file: "tests/styles/route-motion/alpha.test.ts",
        why: "the subject module's door, not composables/motion's (FD-2 on the colocation)",
        from: 'import { ROUTE_GRAMMAR } from "../../../src/composables/motion/motion-core";',
        to: 'import { ROUTE_GRAMMAR } from "../../../src/composables/motion/route";',
    },
];
