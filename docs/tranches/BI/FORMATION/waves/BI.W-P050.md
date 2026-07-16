# BI.W-P050 — LiquidGrid product truth

**Status:** DONE

LiquidGrid retains one `LiquidGridConfig` and one shared scene lifecycle across its WebGPU and WebGL2 adapters. Grid and warp semantics, pointer input, color resolution, status, resize, reduced motion, and teardown remain common product behavior.

README defaults now match `DEFAULT_LIQUID_GRID_CONFIG`, and unsupported authored-zero pixel-parity claims are removed. Grid density, line hierarchy, warp, optional face styling, presets, shaders, and the public API are unchanged.
