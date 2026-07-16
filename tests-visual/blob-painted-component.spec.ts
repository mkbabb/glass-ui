import { expect, test } from "@playwright/test";

const FOOTPRINT = 200;
const SEED = "p047:#b5947f";
// V-A68 keeps the pre-W29 baseline separate from the sole-radius tuned comparison.
const RADII = [0.26, 0.325] as const;

type Measurement = {
    engine: "webgpu" | "webgl2";
    dpr: number;
    bodyRadius: number;
    width: number;
    height: number;
    componentArea: number;
    diameterRatio: number;
    centroidError: { x: number; y: number };
    hullInset: number;
    edgeBandCssPx: number;
    bufferSha256: string;
    configSha256: string;
    seedHex: string;
    settledFrame: {
        timeSec: number;
        simulationTimeMs: number;
        buffer: { width: number; height: number; dpr: number };
        simulationOrigin: { x: number; y: number };
    };
};

test("P047 reads the origin component from both renderer buffers at DPR 1 and 2", async ({
    browser,
}) => {
    test.setTimeout(120_000);
    const measurements: Measurement[] = [];

    for (const dpr of [1, 2]) {
        const context = await browser.newContext({
            deviceScaleFactor: dpr,
            viewport: { width: 800, height: 600 },
        });
        const page = await context.newPage();
        await page.goto("/");
        expect(await page.evaluate(() => devicePixelRatio)).toBe(dpr);

        for (const bodyRadius of RADII) {
            const rows = await page.evaluate(
                async ({ bodyRadius, dpr, footprint, seed }) => {
                    const [
                        types,
                        constants,
                        satellitesModule,
                        glProgram,
                        glUpload,
                        bridge,
                        shader,
                        renderer,
                    ] = await Promise.all([
                        import("/src/components/blob/types.ts"),
                        import("/src/components/blob/constants.ts"),
                        import("/src/components/blob/composables/useBlobSatellites.ts"),
                        import(
                            "/src/components/blob/composables/buildMetaballProgram.ts"
                        ),
                        import(
                            "/src/components/blob/composables/uploadBlobUniforms.ts"
                        ),
                        import("/src/components/blob/composables/uniformBridgeWGPU.ts"),
                        import("/src/components/blob/shaders/metaball.wgsl.ts"),
                        import(
                            "/src/components/blob/composables/useMetaballRenderer.ts"
                        ),
                    ]);

                    const stable = (value: unknown): string => {
                        if (Array.isArray(value))
                            return `[${value.map(stable).join(",")}]`;
                        if (value && typeof value === "object") {
                            return `{${Object.entries(value)
                                .sort(([a], [b]) => a.localeCompare(b))
                                .map(
                                    ([key, item]) =>
                                        `${JSON.stringify(key)}:${stable(item)}`,
                                )
                                .join(",")}}`;
                        }
                        return JSON.stringify(value);
                    };
                    const hex = (bytes: ArrayBuffer | Uint8Array): string =>
                        [
                            ...(bytes instanceof Uint8Array
                                ? bytes
                                : new Uint8Array(bytes)),
                        ]
                            .map((byte) => byte.toString(16).padStart(2, "0"))
                            .join("");
                    const sha256 = async (
                        bytes: ArrayBuffer | Uint8Array,
                    ): Promise<string> =>
                        hex(await crypto.subtle.digest("SHA-256", bytes));
                    const rgb = (css: string): [number, number, number] => {
                        const match = /^#([0-9a-f]{6})$/i.exec(css);
                        if (!match)
                            throw new Error(
                                `P047 fixture color must be canonical hex: ${css}`,
                            );
                        const n = Number.parseInt(match[1]!, 16);
                        return [
                            (n >> 16) / 255,
                            ((n >> 8) & 255) / 255,
                            (n & 255) / 255,
                        ];
                    };

                    const config = structuredClone(types.BLOB_CONFIG_DEFAULTS);
                    Object.assign(config.geometry, {
                        bodyRadius,
                        orbitRadius: 0.4,
                        satelliteRadius: 0.09,
                        eccentricity: 0.03,
                    });
                    config.surface.fissionAmp = 0.6;
                    config.quality = "full";

                    const width = Math.round(footprint * 1.6 * dpr);
                    const height = width;
                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;

                    const pointer = {
                        pointer: { value: { x: 0, y: 0 } },
                        velocity: { value: { x: 0, y: 0 } },
                        pulse: { value: 0 },
                        active: { value: false },
                        trailSources: () => ({ sources: [], count: 0 }),
                    };
                    const mood = constants.MOOD_TARGETS.sleepy;
                    const satelliteSystem = satellitesModule.useBlobSatellites(
                        config,
                        seed,
                    );
                    satelliteSystem.tick(0, mood);
                    satelliteSystem.tick(2500, mood);
                    if (!satelliteSystem.isQuiescent())
                        throw new Error("P047 frozen satellite frame is not quiescent");

                    const frame = {
                        params: mood,
                        rgb: rgb("#b5947f"),
                        simTimeMs: 2500,
                        timeSec: 2.5,
                        resolveColor: rgb,
                        rimColor: config.surface.rimColor,
                        paletteStops: config.color.paletteStops,
                        satColors: config.color.satelliteColors,
                    };
                    const settledFrame = renderer.resolveBlobSettledFrame(frame, {
                        w: width,
                        h: height,
                        dpr,
                        changed: true,
                    });
                    if (!settledFrame)
                        throw new Error("P047 settled-frame seam stayed null");

                    const analyse = async (
                        engine: "webgpu" | "webgl2",
                        pixels: Uint8Array,
                    ) => {
                        const alpha = (index: number) => pixels[index * 4 + 3]!;
                        const originX = Math.floor(
                            settledFrame.simulationOrigin.x * width,
                        );
                        const originY = Math.floor(
                            settledFrame.simulationOrigin.y * height,
                        );
                        const origin = originY * width + originX;
                        if (alpha(origin) < 128)
                            throw new Error(
                                `${engine}: simulation origin is outside alpha>=0.5`,
                            );

                        const flood = (threshold: number) => {
                            const seen = new Uint8Array(width * height);
                            const queue = new Int32Array(width * height);
                            let read = 0;
                            let write = 1;
                            queue[0] = origin;
                            seen[origin] = 1;
                            while (read < write) {
                                const point = queue[read++]!;
                                const x = point % width;
                                const neighbors = [
                                    x > 0 ? point - 1 : -1,
                                    x + 1 < width ? point + 1 : -1,
                                    point >= width ? point - width : -1,
                                    point + width < seen.length ? point + width : -1,
                                ];
                                for (const next of neighbors) {
                                    if (
                                        next >= 0 &&
                                        !seen[next] &&
                                        alpha(next) >= threshold
                                    ) {
                                        seen[next] = 1;
                                        queue[write++] = next;
                                    }
                                }
                            }
                            return { seen, queue, count: write };
                        };

                        const solid = flood(128);
                        const fringe = flood(1);
                        let sx = 0;
                        let sy = 0;
                        let minX = width;
                        let maxX = -1;
                        let minY = height;
                        let maxY = -1;
                        let perimeter = 0;
                        for (let i = 0; i < solid.count; i++) {
                            const point = solid.queue[i]!;
                            const x = point % width;
                            const y = Math.floor(point / width);
                            sx += x + 0.5;
                            sy += y + 0.5;
                            minX = Math.min(minX, x);
                            maxX = Math.max(maxX, x);
                            minY = Math.min(minY, y);
                            maxY = Math.max(maxY, y);
                            perimeter +=
                                (x === 0 || !solid.seen[point - 1] ? 1 : 0) +
                                (x + 1 === width || !solid.seen[point + 1] ? 1 : 0) +
                                (y === 0 || !solid.seen[point - width] ? 1 : 0) +
                                (y + 1 === height || !solid.seen[point + width]
                                    ? 1
                                    : 0);
                        }
                        let partial = 0;
                        for (let i = 0; i < fringe.count; i++) {
                            const a = alpha(fringe.queue[i]!);
                            if (a > 0 && a < 255) partial++;
                        }

                        const footprintPx = footprint * dpr;
                        const footprintStartX = (width - footprintPx) / 2;
                        const footprintStartY = (height - footprintPx) / 2;
                        const cx = sx / solid.count;
                        const cy = sy / solid.count;
                        return {
                            engine,
                            dpr,
                            bodyRadius,
                            width,
                            height,
                            componentArea: solid.count,
                            diameterRatio:
                                (2 * Math.sqrt(solid.count / Math.PI)) / footprintPx,
                            centroidError: {
                                x: Math.abs(cx - (originX + 0.5)) / footprintPx,
                                y: Math.abs(cy - (originY + 0.5)) / footprintPx,
                            },
                            hullInset:
                                Math.min(
                                    minX - footprintStartX,
                                    footprintStartX + footprintPx - (maxX + 1),
                                    minY - footprintStartY,
                                    footprintStartY + footprintPx - (maxY + 1),
                                ) / footprintPx,
                            edgeBandCssPx: partial / Math.max(perimeter, 1) / dpr,
                            bufferSha256: await sha256(pixels),
                            configSha256: await sha256(
                                new TextEncoder().encode(stable(config)),
                            ),
                            seedHex: hex(new TextEncoder().encode(seed)),
                            settledFrame,
                        };
                    };

                    const renderWebGL2 = async () => {
                        const gl = canvas.getContext("webgl2", {
                            alpha: true,
                            premultipliedAlpha: true,
                            antialias: false,
                            preserveDrawingBuffer: false,
                        });
                        if (!gl) throw new Error("WebGL2 unavailable");
                        const program = glProgram.buildMetaballProgram(gl);
                        gl.viewport(0, 0, width, height);
                        glUpload.uploadBlobUniforms(
                            gl,
                            program.prog,
                            program.vao,
                            program.locs,
                            canvas,
                            config,
                            pointer,
                            satelliteSystem,
                            frame,
                        );
                        gl.finish();
                        const pixels = new Uint8Array(width * height * 4);
                        gl.readPixels(
                            0,
                            0,
                            width,
                            height,
                            gl.RGBA,
                            gl.UNSIGNED_BYTE,
                            pixels,
                        );
                        gl.deleteProgram(program.prog);
                        gl.deleteShader(program.vs);
                        gl.deleteShader(program.fs);
                        gl.deleteBuffer(program.buf);
                        gl.deleteVertexArray(program.vao);
                        return analyse("webgl2", pixels);
                    };

                    const renderWebGPU = async () => {
                        const adapter = await navigator.gpu?.requestAdapter();
                        if (!adapter) throw new Error("WebGPU adapter unavailable");
                        const device = await adapter.requestDevice();
                        const format = navigator.gpu.getPreferredCanvasFormat();
                        const module = device.createShaderModule({
                            code: shader.METABALL_WGSL,
                        });
                        const compilation = await module.getCompilationInfo();
                        const errors = compilation.messages.filter(
                            (message) => message.type === "error",
                        );
                        if (errors.length)
                            throw new Error(
                                errors.map((message) => message.message).join("\n"),
                            );

                        const uniformBuffer = device.createBuffer({
                            size: bridge.BLOB_WGPU_UNIFORM_BYTES,
                            usage: 0x40 | 0x8,
                        });
                        const layout = device.createBindGroupLayout({
                            entries: [
                                {
                                    binding: 0,
                                    visibility: 0x2,
                                    buffer: { type: "uniform" },
                                },
                            ],
                        });
                        const pipeline = device.createRenderPipeline({
                            layout: device.createPipelineLayout({
                                bindGroupLayouts: [layout],
                            }),
                            vertex: { module, entryPoint: "vs_main" },
                            fragment: {
                                module,
                                entryPoint: "fs_main",
                                targets: [
                                    {
                                        format,
                                        blend: {
                                            color: {
                                                srcFactor: "one",
                                                dstFactor: "one-minus-src-alpha",
                                                operation: "add",
                                            },
                                            alpha: {
                                                srcFactor: "one",
                                                dstFactor: "one-minus-src-alpha",
                                                operation: "add",
                                            },
                                        },
                                    },
                                ],
                            },
                            primitive: { topology: "triangle-list" },
                        });
                        const bindGroup = device.createBindGroup({
                            layout,
                            entries: [
                                { binding: 0, resource: { buffer: uniformBuffer } },
                            ],
                        });
                        const scratch = bridge.packBlobWGPUUniforms(
                            bridge.createBlobWGPUUniformScratch(),
                            canvas,
                            config,
                            pointer,
                            satelliteSystem,
                            frame,
                        );
                        device.queue.writeBuffer(uniformBuffer, 0, scratch.buffer);

                        const texture = device.createTexture({
                            size: [width, height],
                            format,
                            usage: 0x10 | 0x1,
                        });
                        const bytesPerRow = Math.ceil((width * 4) / 256) * 256;
                        const readBuffer = device.createBuffer({
                            size: bytesPerRow * height,
                            usage: 0x1 | 0x8,
                        });
                        const encoder = device.createCommandEncoder();
                        const pass = encoder.beginRenderPass({
                            colorAttachments: [
                                {
                                    view: texture.createView(),
                                    clearValue: { r: 0, g: 0, b: 0, a: 0 },
                                    loadOp: "clear",
                                    storeOp: "store",
                                },
                            ],
                        });
                        pass.setPipeline(pipeline);
                        pass.setBindGroup(0, bindGroup);
                        pass.draw(3);
                        pass.end();
                        encoder.copyTextureToBuffer(
                            { texture },
                            { buffer: readBuffer, bytesPerRow, rowsPerImage: height },
                            [width, height],
                        );
                        device.queue.submit([encoder.finish()]);
                        await readBuffer.mapAsync(0x1);
                        const mapped = new Uint8Array(readBuffer.getMappedRange());
                        const pixels = new Uint8Array(width * height * 4);
                        for (let y = 0; y < height; y++) {
                            pixels.set(
                                mapped.subarray(
                                    y * bytesPerRow,
                                    y * bytesPerRow + width * 4,
                                ),
                                y * width * 4,
                            );
                        }
                        readBuffer.unmap();
                        readBuffer.destroy();
                        texture.destroy();
                        uniformBuffer.destroy();
                        device.destroy();
                        return analyse("webgpu", pixels);
                    };

                    return Promise.all([renderWebGPU(), renderWebGL2()]);
                },
                {
                    bodyRadius,
                    dpr,
                    footprint: FOOTPRINT,
                    seed: SEED,
                },
            );
            measurements.push(...(rows as Measurement[]));
        }
        await context.close();
    }

    expect(measurements).toHaveLength(8);
    for (const row of measurements) {
        expect(row.centroidError.x).toBeLessThanOrEqual(0.05);
        expect(row.centroidError.y).toBeLessThanOrEqual(0.05);
        expect(row.hullInset).toBeGreaterThanOrEqual(0.12);
        expect(row.edgeBandCssPx).toBeLessThanOrEqual(2);
    }

    const finalRows = measurements.filter((row) => row.bodyRadius === 0.325);
    for (const row of finalRows) {
        expect(row.diameterRatio).toBeGreaterThanOrEqual(0.645);
        expect(row.diameterRatio).toBeLessThanOrEqual(0.675);
    }

    for (const bodyRadius of RADII) {
        const rows = measurements.filter((row) => row.bodyRadius === bodyRadius);
        const ratios = rows.map((row) => row.diameterRatio);
        expect(Math.max(...ratios) - Math.min(...ratios)).toBeLessThanOrEqual(0.01);
        expect(new Set(rows.map((row) => row.configSha256)).size).toBe(1);
        expect(new Set(rows.map((row) => row.seedHex)).size).toBe(1);
        expect(
            new Set(
                rows.map(
                    (row) =>
                        `${row.settledFrame.timeSec}:${row.settledFrame.simulationTimeMs}`,
                ),
            ).size,
        ).toBe(1);
    }
});
