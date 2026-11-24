
(() => {
  const ua = navigator.userAgent;
  const safari = (ua.match(/Version\/([\d.]+)/) || [])[1];
  const ios = ua.match(/OS (\d+)_(\d+)(?:_(\d+))?/);
  document.getElementById("env").textContent =
    (safari ? "Safari " + safari : "Browser: " + (ua.match(/(Chrome|Firefox)\/[\d.]+/) || ["unknown"])[0]) +
    (ios ? " · iOS " + ios[1] + "." + ios[2] + (ios[3] ? "." + ios[3] : "") : "") +
    " · screen scale " + (window.devicePixelRatio || 1);

  const pad = document.getElementById("pad"), cv = document.getElementById("cv"), ctx = cv.getContext("2d");
  const hint = document.getElementById("hint");
  const colour = () => getComputedStyle(document.documentElement).getPropertyValue("--trail").trim() || "#c60";
  const ev = { pm: [], co: [], tm: [], raf: [] };
  let down = false, raf = 0;
  const best = (stamps) => {
    let b = 0;
    for (let i = 0, j = 0; i < stamps.length; i++) {
      while (stamps[i] - stamps[j] > 1000) j++;
      b = Math.max(b, i - j + 1);
    }
    return b;
  };
  const show = () => {
    document.getElementById("n-pm").textContent = best(ev.pm);
    document.getElementById("n-co").textContent = ev.co.length ? best(ev.co) : "n/a";
    document.getElementById("n-tm").textContent = best(ev.tm);
    document.getElementById("n-raf").textContent = best(ev.raf);
  };
  const frame = (t) => { ev.raf.push(t); if (down) raf = requestAnimationFrame(frame); };
  let last = null;
  pad.addEventListener("pointerdown", (e) => {
    down = true; hint.style.opacity = "0"; cv.classList.remove("fade");
    for (const k in ev) ev[k] = [];
    const r = pad.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    cv.width = r.width * d; cv.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    ctx.strokeStyle = colour(); ctx.lineWidth = 3; ctx.lineCap = "round";
    last = [e.clientX - r.left, e.clientY - r.top];
    pad.setPointerCapture && pad.setPointerCapture(e.pointerId);
    raf = requestAnimationFrame(frame);
  });
  pad.addEventListener("pointermove", (e) => {
    if (!down) return;
    const now = performance.now();
    ev.pm.push(now);
    if (e.getCoalescedEvents) for (const c of e.getCoalescedEvents()) ev.co.push(c.timeStamp || now);
    const r = pad.getBoundingClientRect(), p = [e.clientX - r.left, e.clientY - r.top];
    ctx.beginPath(); ctx.moveTo(last[0], last[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); last = p;
  });
  pad.addEventListener("touchmove", () => { if (down) ev.tm.push(performance.now()); }, { passive: true });
  const up = () => {
    if (!down) return;
    down = false; cancelAnimationFrame(raf);
    ev.co.sort((a, b) => a - b);
    show();
    cv.classList.add("fade");
    setTimeout(() => { ctx.clearRect(0, 0, cv.width, cv.height); cv.classList.remove("fade"); }, 320);
  };
  pad.addEventListener("pointerup", up);
  pad.addEventListener("pointercancel", up);
})();
