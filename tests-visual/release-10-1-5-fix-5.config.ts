// fix round 5 (10.1.5): the 2287 WebKit config with the fix-5 record probe matched.
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit" ? { ...p, testMatch: ["release-10-1-5-fix-5-probe.spec.ts"] } : p,
    ),
};
