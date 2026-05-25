/* ============================================================
   search.js — Effects Library search/filter UI
   Reads window.EFFECTS_CATALOGUE (loaded via <script src=...>).
   No fetch, no modules — works from file://.
   All cards / filters / chips built via createElement +
   textContent (no innerHTML on user data) for XSS safety.
   ============================================================ */
(function () {
  'use strict';

  const ALL = (window.EFFECTS_CATALOGUE || []).slice();
  const TOTAL = ALL.length;

  // ---------- category metadata ----------
  // Just a pretty label + the skeleton/loading background class.
  // Real per-card previews come from lazy iframes pointing at snippet-frame.html.
  const CATEGORY_META = {
    atmosphere:    { label: 'Atmosphere',    pv: 'pv-atmosphere'    },
    beats:         { label: 'Beats',         pv: 'pv-beats'         },
    'camera-moves':{ label: 'Camera moves',  pv: 'pv-camera-moves'  },
    colours:       { label: 'Colours',       pv: 'pv-colours'       },
    'ease-curves': { label: 'Ease curves',   pv: 'pv-ease-curves'   },
    glitch:        { label: 'Glitch',        pv: 'pv-glitch'        },
    lens:          { label: 'Lens',          pv: 'pv-lens'          },
    logos:         { label: 'Logos',         pv: 'pv-logos'         },
    mograph:       { label: 'Mograph',       pv: 'pv-mograph'       },
    scribbles:     { label: 'Scribbles',     pv: 'pv-scribbles'     },
    shapes:        { label: 'Shapes',        pv: 'pv-shapes'        },
    templates:     { label: 'Templates',     pv: 'pv-templates'     },
    text:          { label: 'Text',          pv: 'pv-text'          },
    'time-ramps':  { label: 'Time ramps',    pv: 'pv-time-ramps'    },
    transitions:   { label: 'Transitions',   pv: 'pv-transitions'   },
  };

  const BUILD_AT = window.EFFECTS_CATALOGUE_BUILD_AT || 'dev';
  // Each iframe loads a full demo page (CSS, JS, image/video assets). Keeping
  // 8 mounted is plenty for a viewport's worth of cards on Brave/Chrome.
  const FRAME_CONCURRENCY_CAP = 8;
  // Stagger mounts so opening the unfiltered "all 204" view doesn't queue
  // dozens of doc loads at once.
  const MOUNT_STAGGER_MS = 90;

  // Map each catalogue category to its source HTML page. The card iframe
  // loads `<page>.html?solo=<card_match>` and the page's _solo.js script
  // hides everything except that one card. Faithful previews — all the
  // page's CSS, JS, image assets and animations stay intact.
  const CATEGORY_PAGE = {
    atmosphere:    'atmosphere.html',
    beats:         'beats.html',
    'camera-moves':'camera-moves.html',
    colours:       'colours.html',
    'ease-curves': 'ease-curves.html',
    glitch:        'glitch.html',
    lens:          'lens.html',
    logos:         'logos.html',
    mograph:       'mograph.html',
    scribbles:     'scribbles.html',
    shapes:        'shapes.html',
    templates:     'templates.html',
    text:          'text.html',
    'time-ramps':  'time-ramps.html',
    transitions:   'transitions.html',
  };

  function el(tag, className, text) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text != null) e.textContent = text;
    return e;
  }

  // ---------- requirement metadata ----------
  const REQ_META = {
    'CSS':        { cls: 'css',        label: 'css' },
    'SVG':        { cls: 'svg',        label: 'svg' },
    'AE':         { cls: 'ae',         label: 'ae' },
    'AE-Plexus':  { cls: 'ae-plexus',  label: 'ae · plexus' },
    'AE-Plugin':  { cls: 'ae-plugin',  label: 'ae · plugin' },
    'Premiere':   { cls: 'premiere',   label: 'premiere' },
    'Video':      { cls: 'video',      label: 'video' },
  };
  const REQ_ORDER = ['CSS','SVG','AE','AE-Plexus','AE-Plugin','Premiere','Video'];

  // ---------- state ----------
  const state = {
    q: '',
    categories: new Set(),
    requires: new Set(),
    sort: 'category',
    recent: loadRecent(),
  };

  // ---------- counts ----------
  const CAT_COUNTS = {};
  const REQ_COUNTS = {};
  for (const e of ALL) {
    CAT_COUNTS[e.category] = (CAT_COUNTS[e.category] || 0) + 1;
    for (const r of e.requires || []) REQ_COUNTS[r] = (REQ_COUNTS[r] || 0) + 1;
  }
  const CAT_LIST = Object.keys(CAT_COUNTS).sort();

  // ---------- DOM helpers ----------
  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ---------- rendering: rail ----------
  function renderRail() {
    const catList = $('#cat-list');
    catList.replaceChildren();
    CAT_LIST.forEach(c => catList.appendChild(buildOpt('cat', c, (CATEGORY_META[c] && CATEGORY_META[c].label) || c, CAT_COUNTS[c])));

    const reqList = $('#req-list');
    reqList.replaceChildren();
    REQ_ORDER.filter(r => REQ_COUNTS[r]).forEach(r => {
      reqList.appendChild(buildOpt('req', r, (REQ_META[r] && REQ_META[r].label) || r, REQ_COUNTS[r]));
    });

    catList.addEventListener('click', onOptClick);
    reqList.addEventListener('click', onOptClick);
  }

  function buildOpt(kind, val, label, count) {
    const lbl = el('label', 'opt');
    lbl.dataset.kind = kind;
    lbl.dataset.val = val;
    lbl.appendChild(el('span', 'label', label));
    lbl.appendChild(el('span', 'count', String(count)));
    return lbl;
  }

  function onOptClick(ev) {
    const opt = ev.target.closest('.opt');
    if (!opt) return;
    ev.preventDefault();
    const kind = opt.dataset.kind;
    const val = opt.dataset.val;
    const target = kind === 'cat' ? state.categories : state.requires;
    if (target.has(val)) target.delete(val);
    else target.add(val);
    syncOptStates();
    apply();
  }

  function syncOptStates() {
    $$('#cat-list .opt').forEach(o => o.classList.toggle('checked', state.categories.has(o.dataset.val)));
    $$('#req-list .opt').forEach(o => o.classList.toggle('checked', state.requires.has(o.dataset.val)));
  }

  // ---------- filter + sort ----------
  function filterAndSort() {
    const q = state.q.trim().toLowerCase();
    const tokens = q ? q.split(/\s+/).filter(Boolean) : [];
    const cats = state.categories;
    const reqs = state.requires;

    let out = ALL.filter(e => {
      if (cats.size && !cats.has(e.category)) return false;
      if (reqs.size) {
        for (const r of reqs) if (!(e.requires || []).includes(r)) return false;
      }
      if (tokens.length) {
        const hay = (
          e.name + ' ' + e.category + ' ' + (e.description || '') + ' ' +
          (e.tags || []).join(' ') + ' ' + (e.section || '') + ' ' +
          (e.requires || []).join(' ')
        ).toLowerCase();
        for (const t of tokens) if (!hay.includes(t)) return false;
      }
      return true;
    });

    if (state.sort === 'name') {
      out.sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.sort === 'recent') {
      const recentIdx = new Map(state.recent.map((id, i) => [id, i]));
      out.sort((a, b) => {
        const ai = recentIdx.has(a.id) ? recentIdx.get(a.id) : Infinity;
        const bi = recentIdx.has(b.id) ? recentIdx.get(b.id) : Infinity;
        return ai - bi || a.name.localeCompare(b.name);
      });
    } else {
      out.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    }
    return out;
  }

  // ---------- rendering: results ----------
  function renderResults() {
    const list = filterAndSort();
    const grid = $('#grid');
    const stat = $('#results-stat');
    stat.replaceChildren();
    const num = el('span', 'num', String(list.length));
    const tot = el('span', 'total', ' / ' + TOTAL);
    stat.appendChild(num); stat.appendChild(tot);

    const chips = $('#active-chips');
    chips.replaceChildren();
    for (const c of state.categories) chips.appendChild(buildChip('cat', c, (CATEGORY_META[c] && CATEGORY_META[c].label) || c));
    for (const r of state.requires) chips.appendChild(buildChip('req', r, (REQ_META[r] && REQ_META[r].label) || r));
    if (state.q) chips.appendChild(buildChip('q', '__q__', '“' + state.q + '”'));

    grid.replaceChildren();
    if (!list.length) {
      grid.classList.add('empty');
      const wrap = el('div', 'empty-state');
      wrap.appendChild(el('div', 'big', 'NO MATCHES'));
      const hint = el('div', '', 'No effects match the current filters. Try removing a constraint or clearing the search.');
      wrap.appendChild(hint);
      grid.appendChild(wrap);
      return;
    }
    grid.classList.remove('empty');
    const frag = document.createDocumentFragment();
    for (const e of list) frag.appendChild(buildCard(e));
    grid.appendChild(frag);

    armInViewObserver();
  }

  function buildChip(kind, val, label) {
    const span = el('span', 'chip', label);
    span.dataset.kind = kind;
    span.dataset.val = val;
    return span;
  }

  function buildCard(e) {
    const meta = CATEGORY_META[e.category] || { label: e.category, pv: '' };
    const card = el('article', 'card' + (state.recent.indexOf(e.id) !== -1 ? ' recent' : ''));
    card.dataset.id = e.id;

    // Preview — skeleton (category-themed background) replaced by a lazy
    // iframe pointing at the actual demo page in solo mode. Every card
    // has an iframe target since _add-card-ids.mjs injected an id on every
    // .demo / .ease-row / .ramp-row in the source pages.
    const page = CATEGORY_PAGE[e.category];
    const hasFrame = !!(page && e.card_match);
    const pv = el('div', 'pv ' + (meta.pv || '') + (hasFrame ? '' : ' no-snippet'));
    pv.dataset.id = e.id;
    pv.dataset.cardMatch = e.card_match || '';
    pv.dataset.page = page || '';
    pv.dataset.hasFrame = hasFrame ? '1' : '0';
    pv.appendChild(el('span', 'cat-badge', meta.label));
    if (!hasFrame) {
      pv.appendChild(el('span', 'no-snippet-badge', 'no preview'));
    }
    card.appendChild(pv);

    // body
    const body = el('div', 'body');
    body.appendChild(el('h3', 'name', e.name));
    body.appendChild(el('p', 'desc', e.description || ''));
    const pills = el('div', 'pills');
    (e.requires || []).forEach(r => {
      const m = REQ_META[r] || { cls: '', label: r.toLowerCase() };
      pills.appendChild(el('span', 'pill ' + m.cls, m.label));
    });
    body.appendChild(pills);
    card.appendChild(body);

    // actions
    const actions = el('div', 'actions');
    const demoBtn = el('a', 'demo-btn', 'View demo →');
    demoBtn.href = e.demo_url || '#';
    demoBtn.target = '_blank';
    demoBtn.rel = 'noopener';
    demoBtn.dataset.id = e.id;
    demoBtn.addEventListener('click', () => addRecent(e.id));
    actions.appendChild(demoBtn);

    const applyBtn = el('button', 'apply-btn', 'Apply with Claude');
    applyBtn.type = 'button';
    applyBtn.dataset.id = e.id;
    applyBtn.addEventListener('click', onApplyClick);
    actions.appendChild(applyBtn);
    card.appendChild(actions);

    // Hover-driven previews:
    //   - colours: .playing class fades in the graded layer (before/after).
    //     The demo page's own UX uses :hover to reveal the grade; we
    //     forward parent hover into the iframe via postMessage.
    //   - parallax-depth-hover-to-drive: the demo expects mousemove on its
    //     stage. We forward parent-card mouse position as fractional
    //     (fx, fy) so the iframe can dispatch a synthetic mousemove on
    //     the right element regardless of size.
    if (e.category === 'colours') {
      card.addEventListener('mouseenter', () => postToFrame(card, { type: 'solo:play' }));
      card.addEventListener('mouseleave', () => postToFrame(card, { type: 'solo:stop' }));
    }
    if (e.id === 'camera-moves-parallax-depth-hover-to-drive') {
      card.addEventListener('mousemove', (ev) => {
        const r = card.getBoundingClientRect();
        const fx = (ev.clientX - r.left) / Math.max(1, r.width);
        const fy = (ev.clientY - r.top) / Math.max(1, r.height);
        postToFrame(card, { type: 'solo:mouseat', fx, fy });
      });
      card.addEventListener('mouseleave', () => postToFrame(card, { type: 'solo:stop' }));
    }

    return card;
  }

  function postToFrame(card, msg) {
    const iframe = card.querySelector('iframe.pv-frame');
    if (!iframe || !iframe.contentWindow) return;
    try { iframe.contentWindow.postMessage(msg, '*'); } catch (e) { /* iframe not ready */ }
  }

  // ---------- in-view observer + lazy iframe mounting ----------
  // Maintains a Map of currently-mounted iframes keyed by effect id.
  //
  // Strategy after Callum feedback (2026-05-02): mount on intersect, but
  // DO NOT unmount on exit. Eviction is driven solely by the concurrency
  // cap (FRAME_CONCURRENCY_CAP) — when a new mount needs space, we drop
  // the iframe whose card is furthest from the viewport centre. This
  // avoids the constant mount/unmount churn that happened with the
  // previous "exit unmounts" rule and made the all-204 view lag.
  // Mounts are also serialised through a queue with MOUNT_STAGGER_MS
  // between each, so opening a large unfiltered grid spreads doc loads
  // across the first second instead of firing them all at once.
  let io = null;
  const liveFrames = new Map(); // id -> { iframe, pv }
  const mountQueue = [];
  let mountQueueTimer = null;

  function buildIframe(page, cardMatch) {
    const iframe = document.createElement('iframe');
    iframe.className = 'pv-frame';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('tabindex', '-1');
    iframe.dataset.v = BUILD_AT;
    iframe.src = page + '?solo=' + encodeURIComponent(cardMatch) + '&v=' + encodeURIComponent(BUILD_AT);
    iframe.addEventListener('load', () => iframe.classList.add('loaded'));
    return iframe;
  }

  function processMountQueue() {
    if (mountQueue.length === 0) { mountQueueTimer = null; return; }
    const pv = mountQueue.shift();
    // Filter stale queue entries (removed from DOM, or already mounted, or
    // no longer flagged as needing a frame).
    if (!pv.isConnected || pv.dataset.hasFrame !== '1') {
      mountQueueTimer = setTimeout(processMountQueue, 0);
      return;
    }
    const id = pv.dataset.id;
    if (!id || liveFrames.has(id)) {
      mountQueueTimer = setTimeout(processMountQueue, 0);
      return;
    }
    const page = pv.dataset.page;
    const cardMatch = pv.dataset.cardMatch;
    if (!page || !cardMatch) {
      mountQueueTimer = setTimeout(processMountQueue, 0);
      return;
    }
    enforceConcurrencyCap();
    const iframe = buildIframe(page, cardMatch);
    pv.appendChild(iframe);
    liveFrames.set(id, { iframe, pv });
    mountQueueTimer = setTimeout(processMountQueue, MOUNT_STAGGER_MS);
  }

  function queueMount(pv) {
    if (pv.dataset.hasFrame !== '1') return;
    const id = pv.dataset.id;
    if (!id || liveFrames.has(id)) return;
    if (mountQueue.indexOf(pv) !== -1) return;
    mountQueue.push(pv);
    if (mountQueueTimer === null) processMountQueue();
  }

  function unmountFrame(pv) {
    const id = pv.dataset.id;
    const rec = id ? liveFrames.get(id) : null;
    if (!rec) return;
    if (rec.iframe && rec.iframe.parentNode) {
      rec.iframe.parentNode.removeChild(rec.iframe);
    }
    liveFrames.delete(id);
  }

  function enforceConcurrencyCap() {
    while (liveFrames.size >= FRAME_CONCURRENCY_CAP) {
      const center = window.innerHeight / 2;
      let worstId = null;
      let worstDist = -1;
      for (const [id, rec] of liveFrames) {
        const r = rec.pv.getBoundingClientRect();
        const cardCenter = r.top + r.height / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist > worstDist) { worstDist = dist; worstId = id; }
      }
      if (!worstId) break;
      unmountFrame(liveFrames.get(worstId).pv);
    }
  }

  function armInViewObserver() {
    // Reset live frames + queue between renders (filter changes rebuild the grid).
    for (const [, rec] of liveFrames) {
      if (rec.iframe && rec.iframe.parentNode) rec.iframe.parentNode.removeChild(rec.iframe);
    }
    liveFrames.clear();
    mountQueue.length = 0;
    if (mountQueueTimer !== null) { clearTimeout(mountQueueTimer); mountQueueTimer = null; }

    if (!('IntersectionObserver' in window)) {
      const pvs = $$('.card .pv');
      for (const pv of pvs) {
        pv.classList.add('in-view');
        queueMount(pv);
      }
      return;
    }
    if (io) io.disconnect();
    io = new IntersectionObserver(entries => {
      for (const en of entries) {
        const pv = en.target;
        if (en.isIntersecting) {
          pv.classList.add('in-view');
          queueMount(pv);
        } else {
          pv.classList.remove('in-view');
          // No unmount on exit — eviction handled by concurrency cap only.
          // This prevents thrash when a card briefly leaves the rootMargin.
        }
      }
    }, { rootMargin: '200px 0px', threshold: 0 });
    $$('.card .pv').forEach(elem => io.observe(elem));
  }

  // ---------- search input ----------
  let qDeb = null;
  function onSearchInput(ev) {
    const v = ev.target.value;
    clearTimeout(qDeb);
    qDeb = setTimeout(() => { state.q = v; apply(); }, 80);
  }

  function clearAll() {
    state.q = '';
    state.categories.clear();
    state.requires.clear();
    $('#search-input').value = '';
    syncOptStates();
    apply();
  }

  function onChipClick(ev) {
    const chip = ev.target.closest('.chip');
    if (!chip) return;
    const kind = chip.dataset.kind;
    const val = chip.dataset.val;
    if (kind === 'cat') state.categories.delete(val);
    else if (kind === 'req') state.requires.delete(val);
    else if (kind === 'q') { state.q = ''; $('#search-input').value = ''; }
    syncOptStates();
    apply();
  }

  function apply() {
    renderResults();
    persistFilters();
  }

  // ---------- apply with Claude → clipboard ----------
  function onApplyClick(ev) {
    // Capture button reference synchronously — ev.currentTarget becomes null
    // after the handler returns, so referring to it inside .then() crashes.
    const btn = ev.currentTarget;
    const id = btn ? btn.dataset.id : null;
    if (!id) return;
    const e = ALL.find(x => x.id === id);
    if (!e) return;
    const prompt = buildApplyPrompt(e);
    copyToClipboard(prompt).then(() => {
      flashCopied(btn);
      showToast('Prompt copied — paste into Claude.');
    }).catch(() => {
      showToast('Copy failed — see console for prompt.');
      console.warn('Copy failed. Prompt was:\n\n' + prompt);
    });
    addRecent(id);
  }

  function buildApplyPrompt(e) {
    const reqs = (e.requires || []).join(', ') || 'unspecified';
    const params = e.params && Object.keys(e.params).length
      ? Object.entries(e.params).map(([k, v]) => k + '=' + JSON.stringify(v)).join(', ')
      : 'none documented';
    const tags = (e.tags || []).join(', ') || '—';
    const snippet = e.implementation_snippet || '(no snippet on disk)';
    return [
      'Apply effect `' + e.id + '` from effects-library/effects-catalogue.json to my current edit.',
      '',
      'Effect: ' + e.name,
      'Category: ' + e.category + (e.section ? ' · ' + e.section : ''),
      'Description: ' + (e.description || ''),
      'Implementation snippet: effects-library/' + snippet,
      'Demo page: effects-library/' + (e.demo_url || ''),
      'Required: ' + reqs,
      'Tunable params: ' + params,
      'Tags: ' + tags,
      '',
      "Walk me through the application step by step. If I'm in Premiere, give me the AE/Premiere recipe (effect names, plugin names, plugin params, key blend modes, opacity %, retime curves). If I'm building in CSS / SVG / Remotion, paste the snippet adapted to my context — and tell me what to swap out.",
      '',
      'Ask me up front: (1) which platform am I in (Premiere, AE, CSS/web, Remotion)? (2) what\'s the underlying clip / target layer? (3) any tone or duration constraints?'
    ].join('\n');
  }

  function copyToClipboard(text) {
    // Textarea fallback. Used when navigator.clipboard is unavailable OR
    // when it rejects (which happens on file:// in Brave/Chrome under
    // strict permissions policies).
    const tryTextarea = () => new Promise((resolve, reject) => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        const cmd = document.execCommand;
        const ok = cmd && cmd.call(document, 'copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error('legacy copy failed'));
      } catch (err) { reject(err); }
    });
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Chain .catch so rejections (file:// permission denied) fall through
      // to the textarea path instead of bubbling to the caller.
      return navigator.clipboard.writeText(text).catch(() => tryTextarea());
    }
    return tryTextarea();
  }

  function flashCopied(btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ Copied';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 1500);
  }

  // ---------- toast ----------
  let toastTimer = null;
  function showToast(msg) {
    const elx = $('#toast');
    elx.textContent = msg;
    elx.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => elx.classList.remove('show'), 1900);
  }

  // ---------- recent ----------
  const RECENT_KEY = 'effects-search:recent';
  const FILTER_KEY = 'effects-search:state';
  function loadRecent() {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr.slice(0, 12) : [];
    } catch { return []; }
  }
  function addRecent(id) {
    if (!id) return;
    state.recent = [id, ...state.recent.filter(x => x !== id)].slice(0, 12);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(state.recent)); } catch {}
  }

  // ---------- persist filters ----------
  function persistFilters() {
    try {
      localStorage.setItem(FILTER_KEY, JSON.stringify({
        q: state.q,
        categories: [...state.categories],
        requires: [...state.requires],
        sort: state.sort,
      }));
    } catch {}
  }
  function loadFilters() {
    try {
      const raw = localStorage.getItem(FILTER_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s.q) state.q = s.q;
      if (Array.isArray(s.categories)) state.categories = new Set(s.categories);
      if (Array.isArray(s.requires)) state.requires = new Set(s.requires);
      if (s.sort) state.sort = s.sort;
    } catch {}
  }

  // ---------- init ----------
  function init() {
    if (!ALL.length) {
      const grid = $('#grid');
      grid.replaceChildren();
      const ws = el('div', 'empty-state');
      ws.appendChild(el('div', 'big', 'NO CATALOGUE'));
      ws.appendChild(el('div', '', 'effects-catalogue.js failed to load. Run "node build-catalogue.mjs" from effects-library/.'));
      grid.appendChild(ws);
      return;
    }

    loadFilters();

    $('#total-count').textContent = TOTAL;
    $('#cat-count').textContent = Object.keys(CAT_COUNTS).length;
    const buildAt = window.EFFECTS_CATALOGUE_BUILD_AT || '';
    if (buildAt) $('#build-stamp').textContent = '· built ' + buildAt;

    renderRail();
    syncOptStates();

    if (state.q) $('#search-input').value = state.q;
    if (state.sort) $('#sort-select').value = state.sort;

    $('#search-input').addEventListener('input', onSearchInput);
    $('#search-input').addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.target.value = ''; state.q = ''; apply(); }
    });
    $('#clear-cat').addEventListener('click', () => { state.categories.clear(); syncOptStates(); apply(); });
    $('#clear-req').addEventListener('click', () => { state.requires.clear(); syncOptStates(); apply(); });
    $('#clear-all').addEventListener('click', clearAll);
    $('#active-chips').addEventListener('click', onChipClick);
    $('#sort-select').addEventListener('change', e => { state.sort = e.target.value; apply(); });

    document.addEventListener('keydown', e => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        $('#search-input').focus();
      }
    });

    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
