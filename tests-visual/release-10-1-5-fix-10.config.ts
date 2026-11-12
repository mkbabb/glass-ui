// fix 10 (10.1.5): the 2287 WebKit config with fix 10's probes, critic 10's cells and the release specs matched.
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit"
            ? { ...p, testMatch: ["release-10-1-5-fix-10-p4.spec.ts", "release-10-1-5-fix-10-zoom.spec.ts", "release-10-1-5-fix-10-edge.spec.ts", "release-10-1-5-critic-10.spec.ts", "release-10-1-5-critic-10b.spec.ts", "release-10-1-5.spec.ts", "release-10-1-4.spec.ts", "release-10-1-3.spec.ts"] }
            : p,
    ),
};
