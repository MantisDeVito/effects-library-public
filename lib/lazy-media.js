/**
 * lazy-media.js — shared perf helper for effects-library
 *
 * Auto-retrofits every <video autoplay> on the page so it only plays when
 * scrolled into view, and pauses when off-screen or when the tab is hidden.
 * Exposes LazyMedia.isVisible() / LazyMedia.isActive() for canvas pages
 * to gate their requestAnimationFrame loops.
 *
 * Drop-in: <script src="lib/lazy-media.js"></script> at the end of <body>.
 * No page changes required for videos — attributes are rewritten automatically.
 */
(function () {
  'use strict';

  const ROOT_MARGIN = '300px 0px';
  const THRESHOLD = 0.1;

  let io = null;
  const managedVideos = new Set();

  function manageVideo(video) {
    if (managedVideos.has(video)) return;
    managedVideos.add(video);

    // Strip autoplay so the browser doesn't pre-decode everything at load
    video.removeAttribute('autoplay');
    // Metadata is cheap and gives us dimensions/duration; frames stay deferred
    if (!video.getAttribute('preload')) video.preload = 'metadata';
    // Muted + inline are required for programmatic play() without gesture
    video.muted = true;
    video.playsInline = true;

    // Pause anything that already started before the observer attached
    if (!video.paused) video.pause();

    io.observe(video);
  }

  function handleEntries(entries) {
    for (const entry of entries) {
      const v = entry.target;
      if (entry.isIntersecting) {
        if (v.paused && !document.hidden) {
          const p = v.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        }
      } else {
        if (!v.paused) v.pause();
      }
    }
  }

  function setupObserver() {
    if (io) return;
    io = new IntersectionObserver(handleEntries, {
      rootMargin: ROOT_MARGIN,
      threshold: THRESHOLD,
    });
  }

  function scanAndManage() {
    setupObserver();
    // Catch both existing autoplay videos and anything tagged .lazy-play
    const all = document.querySelectorAll('video[autoplay], video.lazy-play');
    for (const v of all) manageVideo(v);
  }

  // Watch for videos added dynamically by page scripts (e.g. overlays.html grid init)
  function setupMutationObserver() {
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.tagName === 'VIDEO') {
            manageVideo(node);
          } else if (node.querySelectorAll) {
            for (const v of node.querySelectorAll('video')) manageVideo(v);
          }
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function pauseAll() {
    for (const v of managedVideos) {
      if (!v.paused) v.pause();
    }
  }

  function resumeVisible() {
    if (!io) return;
    for (const v of managedVideos) {
      const r = v.getBoundingClientRect();
      const onScreen =
        r.bottom > -300 && r.top < (window.innerHeight + 300) &&
        r.right > 0 && r.left < window.innerWidth;
      if (onScreen && v.paused) {
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAll();
    else resumeVisible();
  });

  // Public API for canvas pages
  window.LazyMedia = {
    /** Is the tab active (not hidden)? */
    isActive() {
      return !document.hidden;
    },
    /** Is this element currently in the viewport (with slop)? */
    isVisible(el) {
      if (!el || document.hidden) return false;
      const r = el.getBoundingClientRect();
      return r.bottom > -200 && r.top < (window.innerHeight + 200) &&
             r.right > 0 && r.left < window.innerWidth;
    },
    /** Manually enrol a video (e.g. one created by page script without autoplay attr) */
    manage(video) { manageVideo(video); },
    /** Count of videos currently under management (debug) */
    managedCount() { return managedVideos.size; },
  };

  // Kick off once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      scanAndManage();
      setupMutationObserver();
    });
  } else {
    scanAndManage();
    setupMutationObserver();
  }
})();
