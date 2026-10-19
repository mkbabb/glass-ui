#!/usr/bin/env python3
"""FLOOR-V5 seat · writes a git-applicable patch from a worktree WITHOUT a git write (no `git add -N`).

  mkpatch.py head  <worktree> <out>              the worktree against HEAD: `git diff HEAD --binary` for tracked paths,
                                                 `git diff --no-index /dev/null <path>` for each untracked path
  mkpatch.py snap  <worktree> <patch> <snapdir>  copy every path <patch> touches (as it stands now) into <snapdir>;
                                                 a path absent now is recorded in <snapdir>/.absent
  mkpatch.py since <worktree> <snapdir> <out>    the worktree against <snapdir> (git diff --no-index), snapped paths only (the
                                                 rebased route patch: what the route adds on top of the snapped state)
"""
import difflib, os, re, shutil, subprocess, sys


def run(cwd, *args, ok=(0,)):
    p = subprocess.run(args, cwd=cwd, capture_output=True)
    if p.returncode not in ok:
        sys.exit(f"{args}: exit {p.returncode}\n{p.stderr.decode()}")
    return p.stdout


def paths_of(patch):
    return [m.group(1) for m in re.finditer(r"^diff --git a/(\S+) b/\S+$", open(patch).read(), re.M)]


def file_diff(path, old, new):
    """one git-style diff block; old/new are str or None (absent)"""
    a = old.splitlines(keepends=True) if old is not None else []
    b = new.splitlines(keepends=True) if new is not None else []
    for s in (a, b):
        if s and not s[-1].endswith("\n"):
            sys.exit(f"{path}: no newline at end of file (not handled)")
    head = f"diff --git a/{path} b/{path}\n"
    if old is None:
        head += "new file mode 100644\n"
    elif new is None:
        head += "deleted file mode 100644\n"
    body = "".join(difflib.unified_diff(a, b, "/dev/null" if old is None else f"a/{path}",
                                        "/dev/null" if new is None else f"b/{path}", n=3))
    if not body:
        return ""
    # difflib writes "--- a/x\n+++ b/x\n" with no tab-date; git apply accepts that
    return head + body


def main():
    mode = sys.argv[1]
    if mode == "head":
        wt, out = sys.argv[2], sys.argv[3]
        text = run(wt, "git", "diff", "HEAD", "--binary").decode()
        untracked = [l[3:] for l in run(wt, "git", "status", "--porcelain").decode().splitlines() if l.startswith("?? ")]
        for u in sorted(untracked):
            if u.endswith("/"):
                sys.exit(f"untracked directory {u}: list its files")
            text += run(wt, "git", "diff", "--no-index", "--binary", "/dev/null", u, ok=(0, 1)).decode()
        open(out, "w").write(text)
        print(f"wrote {out}: {len(paths_of(out))} files ({len(untracked)} new)")
    elif mode == "snap":
        wt, patch, snap = sys.argv[2:5]
        shutil.rmtree(snap, ignore_errors=True)
        os.makedirs(snap)
        absent = []
        for p in paths_of(patch):
            src = os.path.join(wt, p)
            if os.path.exists(src):
                os.makedirs(os.path.dirname(os.path.join(snap, p)), exist_ok=True)
                shutil.copyfile(src, os.path.join(snap, p))
            else:
                absent.append(p)
        open(os.path.join(snap, ".absent"), "w").write("".join(a + "\n" for a in absent))
        open(os.path.join(snap, ".paths"), "w").write("".join(p + "\n" for p in paths_of(patch)))
        print(f"snapped {len(paths_of(patch))} paths ({len(absent)} absent)")
    elif mode == "since":
        wt, snap, out = sys.argv[2:5]
        text = ""
        for p in open(os.path.join(snap, ".paths")).read().split():
            s, w = os.path.join(snap, p), os.path.join(wt, p)
            # git's own diff (read-only, --no-index) so hunks align as `git diff` would; paths rewritten to a/<p> b/<p>
            d = run(wt, "git", "diff", "--no-index", "--binary", s if os.path.exists(s) else "/dev/null",
                    w if os.path.exists(w) else "/dev/null", ok=(0, 1)).decode()
            for x in (s, w):
                d = d.replace("a/" + x.lstrip("/"), "a/" + p).replace("b/" + x.lstrip("/"), "b/" + p)
            d = re.sub(r"^diff --git \S+ \S+$", f"diff --git a/{p} b/{p}", d, count=1, flags=re.M)
            text += d
        open(out, "w").write(text)
        print(f"wrote {out}: {len(paths_of(out))} files")
    else:
        sys.exit(__doc__)


main()
