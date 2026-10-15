// authored/p8-dock-context-label.mjs — AUTHORED input to derive/edits.mjs (step S73; pass 8,
// P7-R1). The dock context's injection label is the context's own: its one reader is
// dockContext.ts. While it sat in dock/constants.ts the context read a dock-root file, so the
// context could not become a module of its own without closing a dock ↔ dock/context cycle
// (FD-2 refuses the S73b move), and every reader of the context also evaluated constants.ts,
// which reads springPreset through the motion door (keyframes.js). The label moves to the file
// that uses it (LAW §8: a declaration moves to the module that owns its meaning).
export const why = "P7-R1 (B18, LAW §5, §8): the dock context's injection label moves from dock/constants.ts into dockContext.ts, its one reader, so the context reads no dock-root file and stops loading the motion door through constants.ts";
export const edits = [
    { file: "src/components/dock/constants.ts", why: "the label leaves for its one reader", from: "/** `Symbol()` label for the `DockContext` injection key (`dockContext.ts`). */\nexport const DOCK_CONTEXT_LABEL = \"glass-ui:dock-context\";\n\n", to: "" },
    { file: "src/components/dock/composables/dockContext.ts", why: "the context reads no dock-root file", from: "import { DOCK_CONTEXT_LABEL } from \"../constants\";\n", to: "" },
    { file: "src/components/dock/composables/dockContext.ts", why: "the label lives with the key it names", from: "// Strict and optional access share one key:", to: "/** `Symbol()` label for the `DockContext` injection key. */\nconst DOCK_CONTEXT_LABEL = \"glass-ui:dock-context\";\n\n// Strict and optional access share one key:" },
];
