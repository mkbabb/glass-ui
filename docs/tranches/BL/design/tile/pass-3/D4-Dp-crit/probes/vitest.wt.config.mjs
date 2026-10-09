import { mergeConfig } from "vitest/config";
import base from "./wt/vitest.config.ts";
export default mergeConfig(base, { root: new URL("./wt", import.meta.url).pathname, cacheDir: new URL("./wt/.vite-cache-vitest", import.meta.url).pathname });
