/**
 * canvas-image-processing.js — shared canvas-2d helper for effects-library
 *
 * Reproduces grainrad-style image-processing effects (halftone, Sobel edge
 * detection, dither, etc.) without WebGPU. Works by drawing a source element
 * onto an offscreen canvas, reading getImageData, and either:
 *   (a) writing transformed pixels back via putImageData, or
 *   (b) drawing graphics primitives (dots, lines) on the visible canvas based
 *       on luminance samples.
 *
 * Drop-in: load `canvas-image-processing-data.js` FIRST (base64 plate
 * registry), then `canvas-image-processing.js`. Exposes window.CanvasFX with:
 *   - halftone(canvas, srcUrl, opts)        — one-shot image
 *   - sobel(canvas, srcUrl, opts)           — one-shot image
 *   - processVideo(canvas, video, kind, opts) — RAF loop driving halftone or
 *                                               sobel per video frame
 *
 * Caveat: on file://, Chromium taints the canvas if you draw a sibling
 * file:// image OR video. The data-URI plate registry (basename → data URI)
 * avoids this — `loadImage` resolves URLs through it; for video, the calling
 * code should either set `<video src>` directly to a CANVAS_FX_PLATES entry,
 * or use the helper's `resolveSrc(url)`.
 */
(function () {
  'use strict';

  function resolveSrc(srcUrl) {
    const plates = window.CANVAS_FX_PLATES || {};
    const baseName = (srcUrl.split('/').pop() || '').replace(/\.[^.]+$/, '');
    return plates[baseName] || srcUrl;
  }

  function loadImage(srcUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('image load failed: ' + srcUrl));
      img.src = resolveSrc(srcUrl);
    });
  }

  function fitCanvas(canvas, srcW, srcH) {
    const r = canvas.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return null;
    // Internal resolution caps at 2x DPR or source size, whichever is smaller
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.min(Math.round(r.width * dpr), srcW);
    const targetH = Math.min(Math.round(r.height * dpr), srcH);
    canvas.width = targetW;
    canvas.height = targetH;
    return { w: targetW, h: targetH };
  }

  // Reusable offscreen canvas for getImageData reads. One per `processVideo`
  // call; one per one-shot. Keeping the offscreen sticky during a video loop
  // avoids re-allocating memory every frame.
  function makeReader(w, h) {
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const ctx = off.getContext('2d', { willReadFrequently: true });
    return {
      read(srcEl) {
        try {
          ctx.drawImage(srcEl, 0, 0, w, h);
          return ctx.getImageData(0, 0, w, h);
        } catch (e) {
          console.warn('[CanvasFX] cannot read source pixels —', e.message);
          return null;
        }
      },
    };
  }

  function luminance(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // ============================================================
  // Halftone
  // ============================================================

  function defaultHalftoneOpts(opts) {
    return {
      cellSize: opts.cellSize || 8,
      dotColour: opts.dotColour || '#0a0a0a',
      bgColour: opts.bgColour || '#f1ead8',
      maxRF: opts.maxRadiusFactor || 0.62,
      pattern: opts.pattern || 'circle',
      angle: opts.angle || 0,
    };
  }

  // Renders one halftone frame to `canvas`, given source ImageData of size w×h.
  // Pure synchronous — separated so the video loop can call it per frame.
  function renderHalftoneFrame(canvas, src, w, h, o) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = o.bgColour;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = o.dotColour;
    ctx.strokeStyle = o.dotColour;

    const cos = Math.cos(o.angle);
    const sin = Math.sin(o.angle);

    const diag = Math.hypot(w, h);
    const cells = Math.ceil(diag / o.cellSize) + 2;

    for (let cy = -cells; cy < cells; cy++) {
      for (let cx = -cells; cx < cells; cx++) {
        const lx = (cx + 0.5) * o.cellSize;
        const ly = (cy + 0.5) * o.cellSize;
        const rx = lx * cos - ly * sin + w * 0.5;
        const ry = lx * sin + ly * cos + h * 0.5;
        const ix = Math.round(rx);
        const iy = Math.round(ry);
        if (ix < 0 || ix >= w || iy < 0 || iy >= h) continue;

        const idx = (iy * w + ix) * 4;
        const lum = luminance(src.data[idx], src.data[idx + 1], src.data[idx + 2]);
        const t = 1 - (lum / 255);
        const r = t * o.cellSize * o.maxRF;
        if (r < 0.3) continue;

        if (o.pattern === 'circle') {
          ctx.beginPath();
          ctx.arc(rx, ry, r, 0, Math.PI * 2);
          ctx.fill();
        } else if (o.pattern === 'square') {
          ctx.fillRect(rx - r, ry - r, r * 2, r * 2);
        } else if (o.pattern === 'diamond') {
          ctx.save();
          ctx.translate(rx, ry);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-r, -r, r * 2, r * 2);
          ctx.restore();
        } else if (o.pattern === 'line') {
          ctx.lineWidth = r * 1.4;
          ctx.beginPath();
          ctx.moveTo(rx - o.cellSize * 0.5, ry);
          ctx.lineTo(rx + o.cellSize * 0.5, ry);
          ctx.stroke();
        }
      }
    }
  }

  async function halftone(canvas, srcUrl, opts = {}) {
    const o = defaultHalftoneOpts(opts);
    const img = await loadImage(srcUrl);
    const dim = fitCanvas(canvas, img.naturalWidth, img.naturalHeight);
    if (!dim) return false;
    const { w, h } = dim;
    const reader = makeReader(w, h);
    const src = reader.read(img);
    if (!src) return false;
    renderHalftoneFrame(canvas, src, w, h, o);
    return true;
  }

  // ============================================================
  // Sobel
  // ============================================================

  function defaultSobelOpts(opts) {
    return {
      threshold: opts.threshold != null ? opts.threshold : 30,
      invert: !!opts.invert,
      ink: opts.ink || [255, 255, 255],
      bg: opts.bg || [10, 10, 10],
    };
  }

  function renderSobelFrame(canvas, src, w, h, o) {
    const lum = new Float32Array(w * h);
    for (let i = 0, p = 0; i < src.data.length; i += 4, p++) {
      lum[p] = luminance(src.data[i], src.data[i + 1], src.data[i + 2]);
    }

    const ctx = canvas.getContext('2d');
    const out = ctx.createImageData(w, h);
    const od = out.data;

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i00 = (y - 1) * w + (x - 1);
        const i01 = (y - 1) * w + x;
        const i02 = (y - 1) * w + (x + 1);
        const i10 = y * w + (x - 1);
        const i12 = y * w + (x + 1);
        const i20 = (y + 1) * w + (x - 1);
        const i21 = (y + 1) * w + x;
        const i22 = (y + 1) * w + (x + 1);

        const gx = -lum[i00] + lum[i02]
                   - 2 * lum[i10] + 2 * lum[i12]
                   - lum[i20] + lum[i22];
        const gy = -lum[i00] - 2 * lum[i01] - lum[i02]
                   + lum[i20] + 2 * lum[i21] + lum[i22];

        let mag = Math.hypot(gx, gy);
        mag = Math.min(255, mag);
        if (mag < o.threshold) mag = 0;

        const t = mag / 255;
        const rr = o.invert ? o.bg[0] + (o.ink[0] - o.bg[0]) * (1 - t) : o.bg[0] + (o.ink[0] - o.bg[0]) * t;
        const gg = o.invert ? o.bg[1] + (o.ink[1] - o.bg[1]) * (1 - t) : o.bg[1] + (o.ink[1] - o.bg[1]) * t;
        const bb = o.invert ? o.bg[2] + (o.ink[2] - o.bg[2]) * (1 - t) : o.bg[2] + (o.ink[2] - o.bg[2]) * t;

        const o2 = (y * w + x) * 4;
        od[o2]     = rr;
        od[o2 + 1] = gg;
        od[o2 + 2] = bb;
        od[o2 + 3] = 255;
      }
    }

    // Fill the 1-pixel border so edges aren't a transparent frame
    for (let i = 0; i < od.length; i += 4) {
      if (od[i + 3] === 0) {
        od[i]     = o.invert ? o.ink[0] : o.bg[0];
        od[i + 1] = o.invert ? o.ink[1] : o.bg[1];
        od[i + 2] = o.invert ? o.ink[2] : o.bg[2];
        od[i + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  async function sobel(canvas, srcUrl, opts = {}) {
    const o = defaultSobelOpts(opts);
    const img = await loadImage(srcUrl);
    const dim = fitCanvas(canvas, img.naturalWidth, img.naturalHeight);
    if (!dim) return false;
    const { w, h } = dim;
    const reader = makeReader(w, h);
    const src = reader.read(img);
    if (!src) return false;
    renderSobelFrame(canvas, src, w, h, o);
    return true;
  }

  // ============================================================
  // Bayer / Floyd-Steinberg dither
  // ============================================================

  // Recursively build any 2^N Bayer matrix.
  function buildBayer(size) {
    if (size === 2) return [[0, 2], [3, 1]];
    const half = buildBayer(size / 2);
    const halfSize = size / 2;
    const m = Array.from({ length: size }, () => new Array(size));
    for (let y = 0; y < halfSize; y++) {
      for (let x = 0; x < halfSize; x++) {
        const v = half[y][x] * 4;
        m[y][x] = v;
        m[y][x + halfSize] = v + 2;
        m[y + halfSize][x] = v + 3;
        m[y + halfSize][x + halfSize] = v + 1;
      }
    }
    return m;
  }

  const BAYER_CACHE = {};
  function bayerMatrix(size) {
    if (BAYER_CACHE[size]) return BAYER_CACHE[size];
    const m = buildBayer(size);
    BAYER_CACHE[size] = m;
    return m;
  }

  const PALETTES = {
    '1bit':    [[10, 10, 10], [241, 234, 216]],
    'gameboy': [[15, 56, 15], [48, 98, 48], [139, 172, 15], [155, 188, 15]],
    'cga':     [[0, 0, 0], [85, 255, 255], [255, 85, 255], [255, 255, 255]],
  };

  function nearestPaletteColour(r, g, b, palette) {
    let best = palette[0]; let bestDist = Infinity;
    for (let i = 0; i < palette.length; i++) {
      const p = palette[i];
      const dr = r - p[0], dg = g - p[1], db = b - p[2];
      const d = dr * dr + dg * dg + db * db;
      if (d < bestDist) { bestDist = d; best = p; }
    }
    return best;
  }

  function defaultDitherOpts(opts) {
    const palette = typeof opts.palette === 'string'
      ? (PALETTES[opts.palette] || PALETTES['1bit'])
      : (opts.palette || PALETTES['1bit']);
    return {
      palette,
      matrixSize: opts.matrixSize || 8, // for Bayer
      bias: opts.bias != null ? opts.bias : 0,
    };
  }

  function renderBayerFrame(canvas, src, w, h, o) {
    const matrix = bayerMatrix(o.matrixSize);
    const N = o.matrixSize;
    const N2 = N * N;
    const ctx = canvas.getContext('2d');
    const out = ctx.createImageData(w, h);
    const od = out.data;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const t = (matrix[y % N][x % N] / N2 - 0.5) * 255;
        const r = src.data[i] + t + o.bias;
        const g = src.data[i + 1] + t + o.bias;
        const b = src.data[i + 2] + t + o.bias;
        const c = nearestPaletteColour(r, g, b, o.palette);
        od[i]     = c[0];
        od[i + 1] = c[1];
        od[i + 2] = c[2];
        od[i + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  function renderFSDitherFrame(canvas, src, w, h, o) {
    // Work on a Float32 copy so error diffusion can update in place
    const buf = new Float32Array(w * h * 3);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const si = (y * w + x) * 4;
        const bi = (y * w + x) * 3;
        buf[bi]     = src.data[si];
        buf[bi + 1] = src.data[si + 1];
        buf[bi + 2] = src.data[si + 2];
      }
    }
    const ctx = canvas.getContext('2d');
    const out = ctx.createImageData(w, h);
    const od = out.data;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const bi = (y * w + x) * 3;
        const r = buf[bi], g = buf[bi + 1], b = buf[bi + 2];
        const c = nearestPaletteColour(r, g, b, o.palette);
        const er = r - c[0], eg = g - c[1], eb = b - c[2];

        const oi = (y * w + x) * 4;
        od[oi]     = c[0];
        od[oi + 1] = c[1];
        od[oi + 2] = c[2];
        od[oi + 3] = 255;

        // Distribute error: 7/16 right, 3/16 down-left, 5/16 down, 1/16 down-right
        if (x + 1 < w) {
          const ni = (y * w + (x + 1)) * 3;
          buf[ni]     += er * 7 / 16;
          buf[ni + 1] += eg * 7 / 16;
          buf[ni + 2] += eb * 7 / 16;
        }
        if (y + 1 < h) {
          if (x > 0) {
            const ni = ((y + 1) * w + (x - 1)) * 3;
            buf[ni]     += er * 3 / 16;
            buf[ni + 1] += eg * 3 / 16;
            buf[ni + 2] += eb * 3 / 16;
          }
          {
            const ni = ((y + 1) * w + x) * 3;
            buf[ni]     += er * 5 / 16;
            buf[ni + 1] += eg * 5 / 16;
            buf[ni + 2] += eb * 5 / 16;
          }
          if (x + 1 < w) {
            const ni = ((y + 1) * w + (x + 1)) * 3;
            buf[ni]     += er * 1 / 16;
            buf[ni + 1] += eg * 1 / 16;
            buf[ni + 2] += eb * 1 / 16;
          }
        }
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  async function bayerDither(canvas, srcUrl, opts = {}) {
    const o = defaultDitherOpts(opts);
    const img = await loadImage(srcUrl);
    const dim = fitCanvas(canvas, img.naturalWidth, img.naturalHeight);
    if (!dim) return false;
    const reader = makeReader(dim.w, dim.h);
    const src = reader.read(img);
    if (!src) return false;
    renderBayerFrame(canvas, src, dim.w, dim.h, o);
    return true;
  }

  async function floydSteinbergDither(canvas, srcUrl, opts = {}) {
    const o = defaultDitherOpts(opts);
    const img = await loadImage(srcUrl);
    const dim = fitCanvas(canvas, img.naturalWidth, img.naturalHeight);
    if (!dim) return false;
    const reader = makeReader(dim.w, dim.h);
    const src = reader.read(img);
    if (!src) return false;
    renderFSDitherFrame(canvas, src, dim.w, dim.h, o);
    return true;
  }

  // ============================================================
  // ASCII filter
  // ============================================================

  function defaultAsciiOpts(opts) {
    return {
      cellSize: opts.cellSize || 8,
      charset: opts.charset || ' .,:;ilwM@',
      fgColour: opts.fgColour || '#a8ff00',
      bgColour: opts.bgColour || '#0a0a0a',
      fontFamily: opts.fontFamily || 'SF Mono, Menlo, Consolas, monospace',
    };
  }

  function renderAsciiFrame(canvas, src, w, h, o) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = o.bgColour;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = o.fgColour;
    ctx.font = `${Math.round(o.cellSize * 1.25)}px ${o.fontFamily}`;
    ctx.textBaseline = 'top';
    const cs = o.cellSize;
    const cols = Math.ceil(w / cs);
    const rows = Math.ceil(h / cs);
    const charLast = o.charset.length - 1;
    for (let cy = 0; cy < rows; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        const px = Math.min(w - 1, cx * cs + (cs >> 1));
        const py = Math.min(h - 1, cy * cs + (cs >> 1));
        const idx = (py * w + px) * 4;
        const lum = luminance(src.data[idx], src.data[idx + 1], src.data[idx + 2]);
        const ci = Math.min(charLast, Math.floor((1 - lum / 255) * charLast));
        const ch = o.charset[ci];
        if (ch === ' ') continue;
        ctx.fillText(ch, cx * cs, cy * cs);
      }
    }
  }

  async function ascii(canvas, srcUrl, opts = {}) {
    const o = defaultAsciiOpts(opts);
    const img = await loadImage(srcUrl);
    const dim = fitCanvas(canvas, img.naturalWidth, img.naturalHeight);
    if (!dim) return false;
    const reader = makeReader(dim.w, dim.h);
    const src = reader.read(img);
    if (!src) return false;
    renderAsciiFrame(canvas, src, dim.w, dim.h, o);
    return true;
  }

  // ============================================================
  // Pixel-sort classic (Kim Asendorf horizontal-row sort)
  // Static-only — animating per-frame produces incoherent flicker
  // ============================================================

  function defaultPixelSortOpts(opts) {
    return {
      thresholdHigh: opts.thresholdHigh != null ? opts.thresholdHigh : 170,
      thresholdLow:  opts.thresholdLow  != null ? opts.thresholdLow  : 50,
      order: opts.order || 'desc',
    };
  }

  async function pixelSortClassic(canvas, srcUrl, opts = {}) {
    const o = defaultPixelSortOpts(opts);
    const img = await loadImage(srcUrl);
    const dim = fitCanvas(canvas, img.naturalWidth, img.naturalHeight);
    if (!dim) return false;
    const { w, h } = dim;
    const reader = makeReader(w, h);
    const src = reader.read(img);
    if (!src) return false;

    const ctx = canvas.getContext('2d');
    const out = ctx.createImageData(w, h);
    const od = out.data;
    od.set(src.data);

    // Walk each row, identify high-luminance spans, sort by luminance
    const cmp = o.order === 'asc'
      ? (a, b) => a.lum - b.lum
      : (a, b) => b.lum - a.lum;

    for (let y = 0; y < h; y++) {
      let x = 0;
      while (x < w) {
        // Find span start (luminance >= thresholdHigh)
        while (x < w) {
          const i = (y * w + x) * 4;
          const lum = luminance(od[i], od[i + 1], od[i + 2]);
          if (lum >= o.thresholdHigh) break;
          x++;
        }
        if (x >= w) break;
        const startX = x;
        // Find span end (luminance drops below thresholdLow)
        while (x < w) {
          const i = (y * w + x) * 4;
          const lum = luminance(od[i], od[i + 1], od[i + 2]);
          if (lum < o.thresholdLow) break;
          x++;
        }
        const endX = x;
        if (endX - startX < 2) { x++; continue; }
        // Extract pixels, sort, write back
        const span = [];
        for (let k = startX; k < endX; k++) {
          const i = (y * w + k) * 4;
          span.push({
            r: od[i], g: od[i + 1], b: od[i + 2],
            lum: luminance(od[i], od[i + 1], od[i + 2]),
          });
        }
        span.sort(cmp);
        for (let k = 0; k < span.length; k++) {
          const i = (y * w + (startX + k)) * 4;
          od[i]     = span[k].r;
          od[i + 1] = span[k].g;
          od[i + 2] = span[k].b;
          od[i + 3] = 255;
        }
      }
    }
    ctx.putImageData(out, 0, 0);
    return true;
  }

  // ============================================================
  // Video pipeline — RAF loop driving halftone or sobel per frame
  // ============================================================

  /**
   * Drive `canvas` from a `<video>` element, applying `kind` ('halftone' or
   * 'sobel') to each frame.
   *
   * Performance:
   * - Sobel @ 480×270 is ~25-50 ms per frame on a typical CPU. We process at
   *   most every other animation frame (~30 fps) to leave headroom.
   * - Halftone is much cheaper (~5-10 ms) — runs every frame.
   * - Pauses when the card is offscreen (IntersectionObserver) or the tab is
   *   hidden (LazyMedia.isActive).
   *
   * Returns a `{ stop }` handle.
   */
  function processVideo(canvas, video, kind, opts = {}) {
    const renderFrame =
      kind === 'halftone'  ? renderHalftoneFrame :
      kind === 'sobel'     ? renderSobelFrame :
      kind === 'bayer'     ? renderBayerFrame :
      kind === 'fs-dither' ? renderFSDitherFrame :
      kind === 'ascii'     ? renderAsciiFrame :
      null;
    if (!renderFrame) {
      console.warn('[CanvasFX] processVideo: unknown kind', kind);
      return { stop() {} };
    }
    const o =
      kind === 'halftone'  ? defaultHalftoneOpts(opts) :
      kind === 'sobel'     ? defaultSobelOpts(opts) :
      kind === 'bayer'     ? defaultDitherOpts(opts) :
      kind === 'fs-dither' ? defaultDitherOpts(opts) :
      kind === 'ascii'     ? defaultAsciiOpts(opts) :
                             {};
    // Heavier passes — every other frame
    const skipEveryOther = kind === 'sobel' || kind === 'fs-dither';

    let dim = null;
    let reader = null;
    let lastTime = -1;
    let raf = 0;
    let frameTick = 0;
    let onScreen = true;

    function setupReader() {
      if (!video.videoWidth || !video.videoHeight) return false;
      dim = fitCanvas(canvas, video.videoWidth, video.videoHeight);
      if (!dim) return false;
      reader = makeReader(dim.w, dim.h);
      return true;
    }

    function tick() {
      raf = 0;
      if (!onScreen || (window.LazyMedia && !window.LazyMedia.isActive())) {
        // Don't burn cycles. Re-queue cheaply so we wake up when scrolled back.
        raf = requestAnimationFrame(tick);
        return;
      }
      if (!dim && !setupReader()) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (skipEveryOther && (frameTick++ & 1)) {
        raf = requestAnimationFrame(tick);
        return;
      }
      // Skip if the video hasn't advanced (paused / same frame)
      if (video.currentTime === lastTime && lastTime !== -1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastTime = video.currentTime;

      const src = reader.read(video);
      if (src) renderFrame(canvas, src, dim.w, dim.h, o);
      raf = requestAnimationFrame(tick);
    }

    // IntersectionObserver — pause processing when card is offscreen
    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        for (const e of entries) onScreen = e.isIntersecting;
      }, { rootMargin: '100px', threshold: 0.01 });
      io.observe(canvas);
    }

    // Some browsers won't paint the first frame until the video has played a bit
    if (video.readyState >= 2) raf = requestAnimationFrame(tick);
    else video.addEventListener('loadeddata', () => { raf = requestAnimationFrame(tick); }, { once: true });

    return {
      stop() {
        if (raf) cancelAnimationFrame(raf);
        if (io) io.disconnect();
      },
    };
  }

  window.CanvasFX = {
    loadImage,
    resolveSrc,
    luminance,
    halftone,
    sobel,
    bayerDither,
    floydSteinbergDither,
    ascii,
    pixelSortClassic,
    processVideo,
    PALETTES,
  };
})();
