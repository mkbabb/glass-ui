# dup9.py [ref]: MEASURE-9 part H, item H12 (RU-109 as amended for C8-M12): code lines of src/components/dock (the
# counter's rule) that repeat, read from `git show <ref>` (default HEAD): every normalized code line of 24 characters or
# more (whitespace collapsed; a line that is only a brace, an import or an export list left out) that appears two or more
# times in one file, or in two files, with each place. A repeat is a place to look for a shorter form, not one by itself.
# Output: logs/m9-dup.txt.
import collections, os, re, subprocess, sys
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
L = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "logs")
ref = sys.argv[1] if len(sys.argv) > 1 else "HEAD"
files = [f for f in subprocess.run(["git", "-C", W, "ls-tree", "-r", "--name-only", ref, "--", "src/components/dock"], capture_output=True, text=True).stdout.split() if re.search(r"\.(ts|vue|css)$", f)]
seen = collections.defaultdict(list)
for f in files:
    lines = subprocess.run(["git", "-C", W, "show", f"{ref}:{f}"], capture_output=True, text=True).stdout.split("\n")
    inc = False
    for i, l in enumerate(lines, 1):
        s = l.strip()
        if inc:
            if "*/" in s: inc = False
            continue
        if s.startswith("/*") and "*/" not in s: inc = True; continue
        if not s or s.startswith(("//", "/*", "*", "<!--", "import ", "export {", "} from")): continue
        n = re.sub(r"\s+", " ", s)
        if len(n) < 24 or re.fullmatch(r"[})\];,]+", n): continue
        seen[n].append((f.replace("src/components/dock/", ""), i))
groups = sorted(((n, p) for n, p in seen.items() if len(p) > 1), key=lambda x: (-len(x[1]), x[0]))
with open(os.path.join(L, "m9-dup.txt"), "w") as out:
    out.write(f"# repeated code lines in src/components/dock at {ref}: {len(groups)} lines repeated, {sum(len(p) - 1 for _, p in groups)} repeats\n")
    for n, p in groups:
        out.write(f"{len(p)}x  {n[:150]}\n      " + ", ".join(f"{f}:{i}" for f, i in p) + "\n")
print(open(os.path.join(L, "m9-dup.txt")).read()[:6000])
