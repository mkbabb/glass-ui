// authored/p8-dock-context-doors.mjs — AUTHORED input to derive/edits.mjs (step S73c; pass 8,
// P7-R1, LAW §5). After S73b the dock context is the dock's sub-module context/: it gets its
// door (B7), the entry record lists it (B7), and every crossing into it goes through that door
// (B1): the dock's own files and the dock entry from inside the dock, and the slider's dock hold
// from outside. The dock hold read the context through the dock entry's door, which carries the
// dock's keyframes-bearing names; through the context's own door it reads only the context, so
// the root's Slider stops reaching @mkbabb/keyframes.js (B18's names arm, the floor base's state).
export const why = "P7-R1 (B18, LAW §5): the dock context's door carries the context's names; the dock entry, GlassDock, DockSeparator, DockLayerGroup and the slider's dock hold read it there, so Slider (on the root) no longer evaluates the dock entry and its keyframes-bearing names";

const DOOR = `// components/dock/context — module door: the dock's typed provide/inject, read by the dock and
// by the controls that render inside it (the slider's dock hold).
export type { DockContext, DockOrientation } from "./dockContext";
export { DOCK_CONTEXT_KEY, provideDockContext, useDockContext, useOptionalDockContext } from "./dockContext";
`;

export const edits = [
    { file: "src/components/dock/context/index.ts", why: "the context module's door (B7)", create: DOOR },
    { file: "scripts/structure/records/entry-record.json", why: "the entry record lists every src door (B7)", from: `        "src/components/dock/legibility/index.ts",\n`, to: `        "src/components/dock/context/index.ts",\n        "src/components/dock/legibility/index.ts",\n` },
    { file: "src/components/dock/index.ts", why: "the dock entry takes the context's names through its door (B1)", from: `} from "./context/dockContext";\n`, to: `} from "./context";\n` },
    { file: "src/components/dock/GlassDock.vue", why: "a crossing into the context goes through its door (B1)", from: `import { provideDockContext } from "./context/dockContext";`, to: `import { provideDockContext } from "./context";` },
    { file: "src/components/dock/DockSeparator.vue", why: "a crossing into the context goes through its door (B1)", from: `import { useOptionalDockContext } from "./context/dockContext";`, to: `import { useOptionalDockContext } from "./context";` },
    { file: "src/components/dock/DockLayerGroup.vue", why: "a crossing into the context goes through its door (B1)", from: `import { useOptionalDockContext } from "./context/dockContext";`, to: `import { useOptionalDockContext } from "./context";` },
    { file: "src/components/slider/useDockHold.ts", why: "the dock hold reads the context through the context's door, not the dock entry's (B1: the door of the module that holds the name; the entry's door carries the dock's keyframes-bearing names)", from: `import { useOptionalDockContext } from "../dock";`, to: `import { useOptionalDockContext } from "../dock/context";` },
];
