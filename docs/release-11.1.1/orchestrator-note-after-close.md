# Orchestrator note (2026-11-22 15:55, after the release close). BINDING for fix seat 13, the critics and the next close.

The close found 11.1.1 not ready: merging master (d464304d7) brought two failures into `scripts/release.sh`'s own gates, and restating one exposed a defect inside item 7. The ruling:

**Keep the merge.** 11.1.1 is cut from `release/11.1.1` with master merged, not from the pre-merge tree 540e1e79e. Both failures are master's own (the pixel floor fails on master's tip 48bebb122 too), so a tag cut before the merge would leave master's gates broken and the release unable to merge back clean.

Fix seat 13 builds these, in order, one commit each, each with its witness:

(a) **The pixel floor reads the renderer from the page again.** The rebuilt demo dropped the substrate studio's visible renderer badge (master e4361f2ee), and the demo's law is the component first with no badge. So the substrate's own element states its renderer as data attributes (`data-renderer`, `data-state`, the values the deleted `RendererStatus.vue` wrote), with no visible text, and `tests-visual/substrate-paints-color.spec.ts` (:435, :683) reads them there. Witness: the green floor and both planted self-tests pass on the merged tree, and each planted self-test still fails its plant.

(b) **The CommandDialog cells drive the rebuilt Command page.** Apply `docs/release-11.1.1/close/exits/commanddialog-restate.patch`. Escape and outside: RED on v11.1.0's source, GREEN on the branch, four projects (as the close read them).

(c) **A palette closed by a pick keeps its rows through its exit.** On a pick, reka writes the picked value into the input's query (`resetSearchTermOnSelect`), so a page whose rows follow the query refilters them in the first frame of the exit and the plate drops from 435 to 119 px while it fades: an instant change, inside item 7 ("the CommandDialog keeps its list through the exit"). Cure at the root in glass's Command: the query, and so the rows and the plate's box, hold from the pick's frame to the exit's last frame; the query clears once the exit has finished, so the next open starts empty as it does today. No new prop, export or token. Witness: the pick cell's plate box constant within 1 px from the pick's frame to the exit's last frame, RED on the merged tip and on v11.1.0, GREEN after, in all four projects; escape and outside unchanged; the next open's query empty. One CHANGELOG clause.

(d) **`scripts/release.sh` builds the demo before `npm test`**, as release.yml does (the boot-graph freshness check failed after the merge until `npm run demo:dist:build` ran).

(e) **Resolve the WebKit title** `release-10-1-5` "fix 12, coarse phone > t1 O-201 vertical" (alone, repeated, both trees): a regression, a stale witness restated, or a load flake.

The next close runs the visual suite on a full git-archive tree of the tip (the worktree is sparse, without docs/tranches) and reads every coarse-touch chunk (ab to al were not read). Critique 12's open gaps A to N stay for INBOUND, outside the finite list.
