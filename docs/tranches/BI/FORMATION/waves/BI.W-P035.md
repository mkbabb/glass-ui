# BI.W-P035 — Dock material plate

Status: **implemented; native static-backdrop acceptance pending**.

One dock plate owns the silhouette and material. `backdropMode="live"` samples the
backdrop; `backdropMode="static"` uses the non-sampling solid path. Controls and portaled
overlays do not mint competing dock plates.
