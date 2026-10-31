# bootsize.py <tree>: the boot graph from dist-demo/index.html (modulepreload + module script srcs), against the 503,808 B ceiling.
import re,sys,os
t=sys.argv[1]+'/dist-demo'; h=open(t+'/index.html').read()
fs=sorted(set(re.findall(r'<link[^>]*rel="modulepreload"[^>]*href="([^"]+)"',h)+re.findall(r'<script[^>]*type="module"[^>]*src="([^"]+)"',h)+re.findall(r'href="([^"]+\.js)"',h)))
n=sum(os.path.getsize(t+f) for f in fs); print(f"{len(fs)} files / {n} B; ceiling 503808; margin {503808-n} B"); print([(f,os.path.getsize(t+f)) for f in fs if 'useDockScene' in f])
