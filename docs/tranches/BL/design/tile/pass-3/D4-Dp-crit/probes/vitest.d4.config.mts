import { mergeConfig } from "vitest/config";
import base from "./vitest.config.ts";
export default mergeConfig(base, { cacheDir: new URL("./.vite-cache-vitest", import.meta.url).pathname });
