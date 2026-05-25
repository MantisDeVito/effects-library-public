/**
 * favorites.js — unified favorites across the effects-library
 *
 * One localStorage store for starred items from any catalogue: overlays,
 * sound-fx, shared-library, and anything added later. Each asset has a
 * globally-unique source-prefixed id like "overlays/Light Leaks/03.mp4".
 *
 * Drop-in: <script src="lib/favorites.js"></script>
 * Pages call Favorites.mountStar(containerEl, assetId) to render a toggle.
 *
 * Migrates legacy "shared-lib-favs" key on first load — old shared-library
 * browser entries were stored as "<category>\x00<file>"; we prefix them
 * with "shared-library/" to normalise into the new scheme.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'effects-lib-favs';
  const LEGACY_KEY = 'shared-lib-favs';

  let favorites = null;
  const listeners = new Set();

  function load() {
    if (favorites) return favorites;
    favorites = new Set();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        for (const id of JSON.parse(raw)) favorites.add(id);
      }
      // One-time migration from the shared-library browser's old key
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        for (const k of JSON.parse(legacy)) {
          // Old format: "<category>\x00<file>" where file starts with "<Category>/..."
          const nullIdx = k.indexOf('\x00');
          if (nullIdx >= 0) {
            const file = k.slice(nullIdx + 1);
            favorites.add('shared-library/' + file);
          }
        }
        localStorage.removeItem(LEGACY_KEY);
        save();
      }
    } catch {
      // Corrupt storage — start fresh
      favorites = new Set();
    }
    return favorites;
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    } catch {}
    for (const fn of listeners) {
      try { fn(); } catch {}
    }
  }

  function add(id) {
    load();
    if (!favorites.has(id)) {
      favorites.add(id);
      save();
    }
  }

  function remove(id) {
    load();
    if (favorites.has(id)) {
      favorites.delete(id);
      save();
    }
  }

  function toggle(id) {
    load();
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    save();
    return favorites.has(id);
  }

  function has(id) {
    return load().has(id);
  }

  function list(sourceFilter) {
    const all = [...load()];
    if (!sourceFilter) return all;
    const prefix = sourceFilter.endsWith('/') ? sourceFilter : sourceFilter + '/';
    return all.filter((id) => id.startsWith(prefix));
  }

  function clear() {
    load();
    favorites.clear();
    save();
  }

  function on(event, fn) {
    if (event !== 'change') return () => {};
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  /**
   * Inject a star toggle button into a container element.
   * - containerEl: the element whose position:relative frame hosts the star
   * - assetId: source-prefixed unique id, e.g. "overlays/Light Leaks/03.mp4"
   * - opts.position: "top-right" (default) or "inline" (returns an inline button)
   * Returns the button element.
   */
  function mountStar(containerEl, assetId, opts) {
    opts = opts || {};
    load();
    const inline = opts.position === 'inline';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lib-star' + (inline ? ' lib-star-inline' : '');
    btn.title = 'Favorite';
    btn.setAttribute('aria-pressed', favorites.has(assetId) ? 'true' : 'false');
    btn.textContent = favorites.has(assetId) ? '\u2605' : '\u2606';

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const nowFav = toggle(assetId);
      btn.textContent = nowFav ? '\u2605' : '\u2606';
      btn.setAttribute('aria-pressed', nowFav ? 'true' : 'false');
      containerEl.classList.toggle('lib-fav', nowFav);
    });

    if (favorites.has(assetId)) containerEl.classList.add('lib-fav');
    if (!inline) containerEl.appendChild(btn);
    return btn;
  }

  // Inject default star styling once per page
  function injectStarCss() {
    if (document.getElementById('lib-star-style')) return;
    const style = document.createElement('style');
    style.id = 'lib-star-style';
    style.textContent = `
      .lib-star {
        position: absolute; top: 8px; right: 8px; z-index: 5;
        appearance: none;
        background: rgba(0, 0, 0, 0.55);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #888;
        width: 28px; height: 28px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 15px;
        line-height: 1;
        display: flex; align-items: center; justify-content: center;
        transition: color 120ms, border-color 120ms, background 120ms;
      }
      .lib-star:hover { color: #ffb800; border-color: #ffb800; }
      .lib-fav > .lib-star,
      .lib-fav .lib-star { color: #ffb800; border-color: #ffb800; }
      .lib-star-inline {
        position: static; background: transparent; border: 1px solid rgba(255, 255, 255, 0.12);
      }
    `;
    document.head.appendChild(style);
  }

  // Public API
  window.Favorites = {
    add, remove, toggle, has, list, clear, on, mountStar,
    get size() { return load().size; },
  };

  // Auto-setup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      load();
      injectStarCss();
    });
  } else {
    load();
    injectStarCss();
  }
})();
