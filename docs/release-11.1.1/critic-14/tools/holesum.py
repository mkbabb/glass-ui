import sys, ast, subprocess
for f in sys.argv[1:]:
    out = subprocess.run([sys.executable, "tools/unread.py", f"logs/{f}.json"], capture_output=True, text=True).stdout.splitlines()[1:]
    firsts, seconds, st = [], [], []
    for l in out:
        t = ast.literal_eval(l.strip())
        st.append(t[1]); firsts += t[3]; seconds += [x[0] for x in t[4]]
    npass = st.count("pass")
    print(f"{f:13} pass {npass}/{len(st)} | set-aside holes {sorted(firsts)} | read-film holes {sorted(seconds)}")
