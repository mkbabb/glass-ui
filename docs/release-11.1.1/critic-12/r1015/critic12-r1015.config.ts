// Critic 12: the release-10-1-5 critic and fix specs (every release-10-1-5-*.spec.ts but the
// release spec itself, which the step list runs) in their own engine, Playwright WebKit 2287,
// one project. Copied into tests-visual for the run and removed after it.
import wk from "../webkit-2287.config";

export default {
    ...wk,
    testDir: new URL("..", import.meta.url).pathname,
    webServer: { ...(wk.webServer as object), reuseExistingServer: false },
    projects: wk.projects!.filter((p) => p.name === "webkit").map((p) => ({ ...p, testMatch: ["release-10-1-5-*.spec.ts"] })),
};
