// Fix seat 9: the release config's four projects, pointed at this probe. Copied with the
// probe into the worktree's tests-visual/fix9-probe/.
import release from "../release-11-1-1.config";

const dir = new URL(".", import.meta.url).pathname;

export default {
    ...release,
    testDir: dir,
    projects: release.projects!.map((p) => ({ ...p, testDir: dir, testMatch: ["*.probe.ts"] })),
};
