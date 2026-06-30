// Theme toggle (persist) + mobile nav + tabsets + search modal (Pagefind, lazy).
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var tt = document.getElementById('theme-toggle');
    if (tt) tt.addEventListener('click', function () {
      var dark = document.documentElement.classList.toggle('dark');
      try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    });

    // Mobile menu toggle
    var mt = document.querySelector('.menu-toggle');
    var sidebar = document.querySelector('.sidebar');
    if (mt && sidebar) mt.addEventListener('click', function () {
      var open = sidebar.classList.toggle('open');
      mt.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Tabsets — build nav from each panel's data-tab label
    document.querySelectorAll('[data-tabset]').forEach(function (set) {
      var panels = Array.prototype.slice.call(set.querySelectorAll('.tabset-panel'));
      if (!panels.length) return;
      var nav = document.createElement('div');
      nav.className = 'tabset-nav';
      nav.setAttribute('role', 'tablist');
      panels.forEach(function (panel, i) {
        var btn = document.createElement('button');
        btn.className = 'tabset-tab';
        btn.type = 'button';
        btn.setAttribute('role', 'tab');
        btn.textContent = panel.getAttribute('data-tab') || ('Tab ' + (i + 1));
        btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        if (i === 0) panel.classList.add('active');
        btn.addEventListener('click', function () {
          nav.querySelectorAll('.tabset-tab').forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
          panels.forEach(function (p) { p.classList.remove('active'); });
          btn.setAttribute('aria-selected', 'true');
          panel.classList.add('active');
        });
        nav.appendChild(btn);
      });
      set.insertBefore(nav, set.firstChild);
    });

    // Type filter bar (works on any page with .filter-bar[data-filter-target])
    document.querySelectorAll('.filter-bar[data-filter-target]').forEach(function (bar) {
      var target = bar.getAttribute('data-filter-target');
      var rows = document.querySelectorAll(target + ' [data-type]');
      bar.querySelectorAll('.filter-btn[data-filter-type]').forEach(function (b) {
        b.addEventListener('click', function () {
          var t = b.getAttribute('data-filter-type');
          bar.querySelectorAll('.filter-btn').forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
          rows.forEach(function (r) { r.hidden = !(t === 'all' || r.getAttribute('data-type') === t); });
        });
      });
    });

    // Article TOC — build from headings, place in the sidenote gutter (CSS)
    var toc = document.getElementById('toc');
    if (toc) {
      var content = document.querySelector('.content');
      // the right gutter is shared — if a portrait/press photo already lives there, skip the TOC
      var gutterTaken = content && content.querySelector('figure.portrait, figure.press-photo');
      var hs = content ? content.querySelectorAll('h2[id], h3[id]') : [];
      if (hs.length >= 3 && !gutterTaken) {
        var ul = toc.querySelector('ul');
        var links = [];
        hs.forEach(function (h) {
          var li = document.createElement('li');
          if (h.tagName === 'H3') li.className = 'toc-sub';
          var a = document.createElement('a');
          a.href = '#' + h.id;
          a.textContent = h.textContent;
          li.appendChild(a);
          ul.appendChild(li);
          links.push({ a: a, h: h });
        });
        toc.hidden = false;
        // scrollspy: mark the section nearest the top
        var spy = function () {
          var top = window.scrollY + 120;
          var cur = links[0];
          for (var i = 0; i < links.length; i++) {
            if (links[i].h.offsetTop <= top) cur = links[i];
          }
          links.forEach(function (l) { l.a.classList.toggle('active', l === cur); });
        };
        spy();
        window.addEventListener('scroll', spy, { passive: true });
      }
    }

    // Search modal — lazy-load Pagefind on first open
    var modal = document.getElementById('search-modal');
    var openBtn = document.getElementById('search-toggle');
    var closeBtn = modal && modal.querySelector('.search-close');
    var loaded = false;
    function load() {
      if (loaded) return; loaded = true;
      var base = window.SITE_BASE || '/';
      var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = base + 'pagefind/pagefind-ui.css';
      document.head.appendChild(css);
      var s = document.createElement('script'); s.src = base + 'pagefind/pagefind-ui.js';
      s.onload = function () { new PagefindUI({ element: '#search', bundlePath: base + 'pagefind/', showSubResults: true, showImages: false, translations: {
        placeholder: 'Search',
        clear_search: 'Clear',
        load_more: 'Load more results',
        search_label: 'Search this site',
        filters_label: 'Filters',
        zero_results: 'No results for [SEARCH_TERM]',
        many_results: '[COUNT] results for [SEARCH_TERM]',
        one_result: '[COUNT] result for [SEARCH_TERM]',
        alt_search: 'No results for [SEARCH_TERM]. Showing results for [DIFFERENT_TERM] instead',
        search_suggestion: 'No results for [SEARCH_TERM]. Try one of these searches:',
        searching: 'Searching for [SEARCH_TERM]...'
      } }); };
      document.body.appendChild(s);
    }
    function open() { if (!modal) return; load(); modal.hidden = false; var i = modal.querySelector('input'); if (i) i.focus(); }
    function close() { if (modal) modal.hidden = true; }
    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
      if (e.key === '/' && modal && modal.hidden && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
    });
  });
})();
