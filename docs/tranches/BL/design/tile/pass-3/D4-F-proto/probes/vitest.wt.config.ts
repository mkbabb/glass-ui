// D4-F pass-3 prototype · the worktree's vitest config, banked here because run-proto.sh and unit-plants.sh call
// `--config vitest.wt.config.ts` at the worktree root (copy it there: `cp probes/vitest.wt.config.ts <wt>/`).
// It is the repo's own config with the cache pinned inside the worktree (nothing writes through the node_modules
// symlink) and two workers (the machine's resource law).
import { defineConfig, mergeConfig } from "vitest/config";
import base from "./vitest.config";

export default mergeConfig(
    base,
    defineConfig({
        cacheDir: "./.vite-cache/vitest-wt",
        test: { maxWorkers: 2, minWorkers: 1 },
    }),
);
