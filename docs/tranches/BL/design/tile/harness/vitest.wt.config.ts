// H4-3 · the unit driver's vitest config, carried by the harness (unit.mjs copies it to the worktree root as
// `vitest.h4.config.ts` for the run and removes it after). It is the worktree's own config with the cache pinned
// inside the worktree (nothing writes through the node_modules symlink) and two workers (the machine's resource law).
import { defineConfig, mergeConfig } from "vitest/config";
import base from "./vitest.config";

export default mergeConfig(
    base,
    defineConfig({
        cacheDir: "./.vite-cache/vitest-h4",
        test: { maxWorkers: 2, minWorkers: 1 },
    }),
);
