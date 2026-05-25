/**
 * _solo.js — when an effects-library demo page is loaded with `?solo=<id>`,
 * hide everything except the named card and stretch it to fill the viewport.
 *
 * Used by search.html so each result card can iframe `<page>.html?solo=<id>`
 * and show ONLY that one effect, with all its native CSS / JS / animations
 * intact. Per-snippet extraction misses too much page-level context to be
 * faithful — full-page iframe with solo mode is the safer path.
 *
 * Strategy: do NOT move the target in the DOM (that breaks SVG <use href>
 * references to <symbol> defs that live elsewhere on the page, plus any
 * page-level JS that holds DOM references). Instead:
 *   1. Hide every sibling of every ancestor of target (preserving the
 *      ancestor chain itself). SVG defs containers are kept visible-but-
 *      zero-sized so <use> refs still resolve.
 *   2. Set `display: contents` on every ancestor (except <html> and <body>)
 *      so the target lays out as if it were a direct child of body.
 *   3. Style body to fill the viewport and stretch the target to fill body.
 *   4. Strip title/caption/replay-hint inside the target — the parent
 *      search card already renders the effect name + description.
 *
 * Drop-in: <script src="_solo.js" defer></script>
 */
(function () {
  'use strict';

  const params = new URLSearchParams(location.search);
  const id = params.get('solo');
  if (!id) return;

  // (Noise stripping moved to scoped CSS below — see solo stylesheet.
  //  DOM-removing classes like `.label` was killing nested visual content
  //  e.g. lens `.fx-rack .front .label` IS the foreground text, not a
  //  meta block. Hide direct-child meta only.)

  function isDefsHost(node) {
    if (!node || node.nodeType !== 1) return false;
    if (node.tagName && node.tagName.toLowerCase() === 'svg') {
      // Treat as a defs/symbol host if it contains <defs> or <symbol>.
      if (node.querySelector('defs, symbol')) return true;
    }
    return false;
  }

  // Some demo pages have duplicate ids — e.g. colours.html uses
  // id="golden-hour" on BOTH an SVG <filter> and the .demo card. Plain
  // getElementById returns whichever appears first, which is usually the
  // filter. Look for the card-shaped element first; fall back to the
  // generic getElementById only if nothing card-shaped matches.
  const CARD_SELECTORS = [
    '.demo[id="ID"]',
    '.ease-row[id="ID"]',
    '.ramp-row[id="ID"]',
    '.scribble-stage[id="ID"]',
  ];
  function findTarget(rawId) {
    const escaped = (window.CSS && CSS.escape) ? CSS.escape(rawId) : rawId.replace(/"/g, '\\"');
    for (const tpl of CARD_SELECTORS) {
      const sel = tpl.replace('ID', escaped);
      const node = document.querySelector(sel);
      if (node) return node;
    }
    return document.getElementById(rawId);
  }

  function go() {
    const target = findTarget(id);
    if (!target) {
      document.body.textContent = 'solo target not found: #' + id;
      document.body.style.cssText = 'background:#0a0a0a;color:#888;font:11px monospace;padding:14px;margin:0;';
      return;
    }

    // Walk up the ancestor chain. At every level, hide siblings except defs
    // hosts. Mark ancestor with `data-solo-pass="1"`.
    let node = target;
    while (node && node !== document.body && node !== document.documentElement) {
      node.setAttribute('data-solo-pass', '1');
      const parent = node.parentNode;
      if (!parent || parent.nodeType !== 1) break;
      for (const sib of Array.from(parent.children)) {
        if (sib === node) continue;
        if (sib.hasAttribute('data-solo-pass')) continue;
        if (isDefsHost(sib)) {
          // Keep defs visible to the renderer but zero-sized in flow.
          sib.setAttribute('data-solo-defs', '1');
          continue;
        }
        sib.setAttribute('data-solo-hide', '1');
      }
      node = parent;
    }

    // Mark the target so the stylesheet below can address it.
    target.setAttribute('data-solo-target', '1');
    // ease-row / ramp-row need a horizontal flex layout (the page's natural
    // arrangement). .demo cards are typically vertical (stage above caption).
    const isRow = target.classList.contains('ease-row') || target.classList.contains('ramp-row');
    if (isRow) target.setAttribute('data-solo-row', '1');

    // Inject a single overriding stylesheet for solo mode.
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-solo', '1');
    styleEl.textContent = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        max-width: none !important;
        overflow: hidden !important;
        background: #0a0a0a !important;
      }
      [data-solo-hide] { display: none !important; }
      [data-solo-defs] { position: absolute !important; width: 0 !important; height: 0 !important; overflow: hidden !important; }
      /* Flatten the ancestor chain so the target lays out as a child of body. */
      [data-solo-pass]:not([data-solo-target]) { display: contents !important; }
      [data-solo-target] {
        position: relative !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        max-width: none !important;
        max-height: none !important;
        box-shadow: none !important;
        border: 0 !important;
        border-radius: 0 !important;
        overflow: hidden !important;
      }
      /* .demo (most categories): vertical stack — stage on top, fill viewport. */
      [data-solo-target]:not([data-solo-row]) {
        display: flex !important;
        flex-direction: column !important;
      }
      [data-solo-target]:not([data-solo-row]) .stage,
      [data-solo-target]:not([data-solo-row]) .subject,
      [data-solo-target]:not([data-solo-row]) .stage-inner,
      [data-solo-target]:not([data-solo-row]) .scribble-stage {
        flex: 1 1 auto !important;
        width: 100% !important;
        min-height: 0 !important;
        aspect-ratio: auto !important;
      }
      /* ease-row / ramp-row: keep the page's native horizontal layout
         (label + graphs + thumb-track + caption). Just centre vertically
         and let it use natural sizing. */
      [data-solo-target][data-solo-row] {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 16px !important;
        padding: 12px 16px !important;
      }
      /* Hide ONLY direct-child meta blocks (effect name + description). Do
         NOT hide nested matches — e.g. lens .fx-rack > .stage > .front >
         .label is the foreground text, which must stay visible. */
      [data-solo-target] > h3,
      [data-solo-target] > h4,
      [data-solo-target] > .caption,
      [data-solo-target] > .meta,
      [data-solo-target] > .replay-hint,
      [data-solo-target] > .src,
      [data-solo-target] > .ref,
      [data-solo-target] > .ease-cap {
        display: none !important;
      }
      /* For ease-row / ramp-row, .label is also the effect name — hide
         that too (the search card already shows the name). */
      [data-solo-target][data-solo-row] > .label {
        display: none !important;
      }
      /* Pointer-events off so the parent search-card buttons stay clickable. */
      html, body, body * { pointer-events: none !important; }
    `;
    document.head.appendChild(styleEl);

    // ----- auto-replay vs parent-driven -----
    //
    // Demo pages drive most animations via a `.playing` class added on
    // mouseenter (`startHoverLoop`). pointer-events: none in this iframe
    // suppresses that, so we drive it ourselves.
    //
    // Strategy:
    //   - Pages where the visual cycles on its own (CSS @keyframes infinite,
    //     or a `.playing`-driven loop): call `window.startHoverLoop(target)`
    //     after load to kick the page's own loop off.
    //   - Pages where `.playing` is a HOVER REVEAL (colours grade, parallax
    //     depth): default to NO `.playing`. The parent search.js will
    //     postMessage `solo:play` on mouseenter and `solo:stop` on
    //     mouseleave — replicating the demo's hover-to-reveal UX.
    const path = (location.pathname || '').toLowerCase();
    const isHoverReveal =
      /\bcolours\.html$/.test(path) ||
      target.id === 'parallax-depth-hover-to-drive';

    function retrigger(el) {
      el.classList.remove('playing');
      // force reflow so the CSS animation restarts
      void el.offsetWidth;
      el.classList.add('playing');
    }

    function startReplayLoop(el) {
      if (typeof window.startHoverLoop === 'function') {
        try {
          setTimeout(() => {
            try { window.startHoverLoop(el); } catch (e) { /* fall through */ }
          }, 700);
          return;
        } catch (e) { /* fall through */ }
      }
      setTimeout(() => {
        retrigger(el);
        setInterval(() => retrigger(el), 3000);
      }, 500);
    }

    if (!isHoverReveal) startReplayLoop(target);

    // ----- parent-driven control via postMessage -----
    //
    // Parent search.js sends:
    //   { type: 'solo:play' }            -> add .playing (hover-reveal on)
    //   { type: 'solo:stop' }            -> remove .playing + reset stage
    //   { type: 'solo:mouseat', fx, fy } -> dispatch synthetic mousemove on
    //                                       the inner stage at fraction
    //                                       (fx, fy) of the iframe (drives
    //                                       parallax-depth without needing
    //                                       real pointer events).
    function findStage() {
      return target.querySelector('.stage') || target;
    }
    window.addEventListener('message', function (ev) {
      const msg = ev.data;
      if (!msg || typeof msg !== 'object') return;
      if (msg.type === 'solo:play') {
        retrigger(target);
      } else if (msg.type === 'solo:stop') {
        target.classList.remove('playing');
        // Also fire mouseleave on the stage so parallax-depth resets.
        const stage = findStage();
        try {
          stage.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        } catch (e) { /* older browsers — ignore */ }
      } else if (msg.type === 'solo:mouseat') {
        const stage = findStage();
        const r = stage.getBoundingClientRect();
        const fx = typeof msg.fx === 'number' ? msg.fx : 0.5;
        const fy = typeof msg.fy === 'number' ? msg.fy : 0.5;
        const x = r.left + fx * r.width;
        const y = r.top + fy * r.height;
        try {
          stage.dispatchEvent(new MouseEvent('mousemove', {
            clientX: x, clientY: y, bubbles: true
          }));
        } catch (e) { /* ignore */ }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', go);
  } else {
    go();
  }
})();
