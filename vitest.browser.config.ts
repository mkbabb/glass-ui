import { configDefaults, defineConfig } from "vitest/config";
import base, { BROWSER_TESTS } from "./vitest.config";

// The unit tests that launch Playwright's Chromium. Local and pre-tag only
// (`scripts/release.sh`); CI installs no browser. Spread, not `mergeConfig`: that
// concatenates arrays, so the base `include` and `exclude` would survive.
export default defineConfig({
    ...base,
    test: {
        ...base.test,
        include: [BROWSER_TESTS],
        exclude: configDefaults.exclude,
    },
});
