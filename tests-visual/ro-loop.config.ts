// O-360a: the ro-loop witness on Playwright WebKit build 2287. Run under
// `guarded --exclusive webkit`:
//   RO_LOOP_WEBKIT=1 npx playwright test -c tests-visual/ro-loop.config.ts ro-loop.spec.ts --project=webkit
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) => (p.name === "webkit" ? { ...p, testMatch: ["ro-loop.spec.ts"] } : p)),
};
