(function () {
  const LIVE = new Set([
    'index.html', 'search.html', 'recipes.html', 'transitions.html',
    'entrances.html', 'lower-thirds.html', 'colours.html', 'logos.html',
    'mograph.html', 'glitch.html', 'captions.html', 'atmosphere.html'
  ]);

  function isLiveHref(href) {
    if (!href) return false;
    if (href.startsWith('file:')) return false;
    if (href.startsWith('http://') || href.startsWith('https://')) return true;
    if (href.startsWith('shared-library/')) return false;
    const clean = href.split('#')[0].split('?')[0];
    return LIVE.has(clean);
  }

  function cleanup() {
    const nav = document.querySelector('.topnav nav');
    if (!nav) return;

    nav.querySelectorAll('a.group-head').forEach(a => {
      if (!isLiveHref(a.getAttribute('href'))) {
        const span = document.createElement('span');
        span.className = a.className;
        span.textContent = a.textContent;
        a.replaceWith(span);
      }
    });

    nav.querySelectorAll('.group .dropdown a, .group a:not(.group-head)').forEach(a => {
      if (!isLiveHref(a.getAttribute('href'))) {
        a.remove();
      }
    });

    nav.querySelectorAll('.group').forEach(g => {
      if (g.querySelectorAll('a').length === 0) {
        g.remove();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanup);
  } else {
    cleanup();
  }
})();
