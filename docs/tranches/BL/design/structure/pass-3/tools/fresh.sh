#!/bin/sh
# fresh.sh <worktree> [--floor] [--at <sha>] — a fresh linked worktree at <sha> (default:
# the checkout's HEAD), with the two node_modules symlinks. With --floor, the checkout's
# floor (this pass's, possibly not yet committed) is copied over the worktree's, so the
# tree is <sha> + the P3 floor. Without it the tree carries <sha>'s own floor (the
# "before" arm of every plant).
set -e
REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
WT=$1; shift
FLOOR=0; AT=HEAD
while [ $# -gt 0 ]; do
    case "$1" in
        --floor) FLOOR=1 ;;
        --at) AT=$2; shift ;;
    esac
    shift
done
FL=docs/tranches/BL/design/structure/floor
if [ -e "$WT" ]; then git -C "$REPO" worktree remove --force "$WT"; fi
git -C "$REPO" worktree add --detach "$WT" "$AT" >/dev/null 2>&1
ln -s "$REPO/node_modules" "$WT/node_modules"
ln -s "$REPO/tests-visual/node_modules" "$WT/tests-visual/node_modules"
if [ "$FLOOR" = 1 ]; then rsync -a --delete "$REPO/$FL/" "$WT/$FL/"; fi
echo "fresh $WT at $(git -C "$WT" rev-parse --short HEAD)$([ "$FLOOR" = 1 ] && echo ' + P3 floor')"
