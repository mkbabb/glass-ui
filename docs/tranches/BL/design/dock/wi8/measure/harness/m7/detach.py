# detach.py <log> <cmd...>: MEASURE-7. Runs a chain in its own session with no controlling terminal (stdin /dev/null,
# stdout and stderr to <log>), and returns at once; the seat waits on the chain's own log in its turn. Twice a chain run
# from the tool's shell was stopped (state T) the moment the tool held it in the background: a process in it touched the
# terminal from a background process group. A session with no terminal cannot be stopped that way.
import os, sys
log, cmd = sys.argv[1], sys.argv[2:]
if os.fork():
    sys.exit(0)
os.setsid()
if os.fork():
    os._exit(0)
fd = os.open("/dev/null", os.O_RDONLY)
os.dup2(fd, 0)
out = os.open(log, os.O_WRONLY | os.O_CREAT | os.O_APPEND, 0o644)
os.dup2(out, 1)
os.dup2(out, 2)
os.execvp(cmd[0], cmd)
