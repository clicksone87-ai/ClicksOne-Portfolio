/* =========================================================================
   Clicksone — interactions
   Renders shared partials, then initialises each module only if its root
   element exists on the page. Motion respects prefers-reduced-motion.
   ========================================================================= */
(() => {
/* ---------- switches ---------- */
const ENABLE_SMOOTH_SCROLL = true;   // Lenis smooth scrolling (desktop only). false = native scrolling.
const DEBUG = false;                 // true = log logo-shuffle timing to the console
const LENIS_SRC = 'https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js'; // pinned version

const { PARTIALS, PROJECTS, CATEGORIES, SITE, mock } = window.CS;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const EASE = 'cubic-bezier(.16, 1, .3, 1)'; // same as --ease-out (Web Animations can't read CSS vars)
let lenis = null;

/* Run `start` while `el` is on screen and the tab is visible, `stop` otherwise. */
function whileVisible(el, start, stop, threshold = .15) {
  let onScreen = false, running = false;
  const sync = () => {
    const want = onScreen && !document.hidden;
    if (want && !running) { running = true; start(); }
    else if (!want && running) { running = false; stop(); }
  };
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); }, { threshold }).observe(el);
  document.addEventListener('visibilitychange', sync);
}

/* rAF-throttled scroll listener */
function onScrollFrame(fn) {
  let queued = false;
  const h = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; fn(); }); } };
  addEventListener('scroll', h, { passive: true });
  return h;
}

const navOffset = () => ($('.nav-bar')?.offsetHeight || 60) + 12 + 16;

/* ---------- 1. Partials ---------- */
function renderPartials() {
  const page = document.body.dataset.page || '';
  $$('[data-partial]').forEach(slot => {
    const name = slot.dataset.partial;
    const fn = PARTIALS[name];
    if (!fn) { console.warn('Unknown partial:', name); return; }
    const opts = slot.dataset.opts ? JSON.parse(slot.dataset.opts) : {};
    slot.outerHTML = name === 'header' ? fn(page) : fn(opts);
  });
  // Global, every page: floating discovery bar.
  if (!$('.book-pill')) document.body.insertAdjacentHTML('beforeend', PARTIALS.pill());
}

/* ---------- 2. Word reveal for headlines ---------- */
function splitWords(el) {
  const clone = el.cloneNode(true);
  clone.querySelectorAll('[aria-hidden="true"]').forEach(n => n.remove());
  const full = clone.textContent.replace(/\s+/g, ' ').trim();
  let k = 0;
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(t => {
        if (!t) return;
        if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return; }
        const w = document.createElement('span'); w.className = 'w';
        const i = document.createElement('span'); i.className = 'wi'; i.textContent = t; i.style.setProperty('--wi', k++);
        w.appendChild(i); frag.appendChild(w);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1 && n.tagName !== 'BR' && n.getAttribute('aria-hidden') !== 'true') walk(n);
  });
  walk(el);
  // Screen readers get the sentence once; the split words are hidden from them.
  const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
  while (el.firstChild) vis.appendChild(el.firstChild);
  const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = full;
  el.append(sr, vis);
}

function initWords() {
  const els = $$('h1, main h2, .cta-banner h2, .site-footer h2, [data-reveal="words"]').filter(e => !e.closest('dialog'));
  if (reduced) return; // headings simply show in their final state
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -25% 0px' });
  els.forEach(el => {
    el.dataset.reveal = 'words';
    el.classList.remove('load-up');
    splitWords(el);
    if (el.tagName === 'H1') { el.style.setProperty('--wd', '.1s'); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-revealed'))); }
    else io.observe(el);
  });
}

/* ---------- 3. Fade-up reveal ---------- */
function initReveal() {
  $$('[data-reveal-stagger]').forEach(p => [...p.children].forEach((c, i) => {
    c.classList.add('reveal');
    if (!c.style.getPropertyValue('--d')) c.style.setProperty('--d', `${i * .06}s`);
  }));
  const els = $$('.reveal');
  if (reduced || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: .1 });
  els.forEach(e => io.observe(e));
}

/* ---------- 4. Buttons: text roll + magnetic pull ---------- */
const esc = t => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const rollHTML = t => `<span class="roll-a">${esc(t)}</span><span class="roll-b" aria-hidden="true">${esc(t)}</span>`;
function addRoll(host) {
  if (host.querySelector('.roll')) return;
  let lab = [...host.children].find(n => n.tagName === 'SPAN' && !n.className);
  if (!lab) {
    const t = [...host.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
    if (!t) return;
    lab = document.createElement('span'); lab.textContent = t.textContent.trim(); t.replaceWith(lab);
  }
  lab.className = 'roll'; lab.innerHTML = rollHTML(lab.textContent.trim());
  host.dataset.roll = '';
}
function setRollText(host, text) {
  const r = $('.roll', host);
  if (r) r.innerHTML = rollHTML(text); else host.textContent = text;
}
function initButtons() {
  $$('.btn, .submit, .bp-cta, .nav-book').forEach(addRoll);
  if (!finePointer || reduced) return;
  $$('[data-magnetic]').forEach(b => {
    let tx = 0, ty = 0;
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      const cx = r.left - tx + r.width / 2, cy = r.top - ty + r.height / 2;
      tx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2))) * 8;
      ty = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2))) * 8;
      b.style.translate = `${tx}px ${ty}px`;
    });
    b.addEventListener('pointerleave', () => { tx = ty = 0; b.style.translate = ''; });
  });
}

/* ---------- 5. Custom cursor label (desktop) ---------- */
function initCursor() {
  if (!finePointer || reduced) return;
  const el = document.createElement('div');
  el.className = 'cursor-label'; el.setAttribute('aria-hidden', 'true'); el.innerHTML = '<span></span>';
  document.body.appendChild(el);
  const label = el.firstChild;
  let x = 0, y = 0, tx = 0, ty = 0, raf = 0, active = false;
  const loop = () => {
    x += (tx - x) * .18; y += (ty - y) * .18;
    el.style.transform = `translate(${x}px, ${y}px)`;
    raf = (active || Math.abs(tx - x) + Math.abs(ty - y) > .5) ? requestAnimationFrame(loop) : 0;
  };
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; if (active && !raf) raf = requestAnimationFrame(loop); }, { passive: true });
  document.addEventListener('pointerover', e => {
    const t = e.target.closest('[data-cursor]');
    if (!t) return;
    label.textContent = t.dataset.cursor;
    if (!active) { x = tx = e.clientX; y = ty = e.clientY; el.style.transform = `translate(${x}px, ${y}px)`; }
    active = true; el.classList.add('on');
    if (!raf) raf = requestAnimationFrame(loop);
  });
  document.addEventListener('pointerout', e => {
    const t = e.target.closest('[data-cursor]');
    if (t && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-cursor]'))) { active = false; el.classList.remove('on'); }
  });
}

/* ---------- 6. Optional smooth scroll (Lenis) ---------- */
function initSmooth() {
  if (!ENABLE_SMOOTH_SCROLL || reduced || !finePointer) return;
  const s = document.createElement('script');
  s.src = LENIS_SRC;
  s.onload = () => {
    if (!window.Lenis) return;
    lenis = new window.Lenis({ autoRaf: true, lerp: .1 });
    if (window.ScrollTrigger) lenis.on('scroll', window.ScrollTrigger.update); // keep pinned sections in sync
    // same-page #anchor links: keep the offset for the floating header
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href*="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const u = new URL(a.href, location.href);
      if (u.pathname !== location.pathname || !u.hash) return;
      const t = document.getElementById(decodeURIComponent(u.hash.slice(1)));
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t, { offset: -navOffset() });
      history.pushState(null, '', u.hash);
    });
  };
  s.onerror = () => console.warn('Lenis unavailable, using native scrolling');
  document.head.appendChild(s);
}

/* ---------- 7. Floating discovery bar ---------- */
const PILL = { el: null, shown: false, flags: { hero: true, footer: false, menu: false, closed: false } };
function setPill(key, val) {
  PILL.flags[key] = val;
  const el = PILL.el;
  if (!el) return;
  const hide = Object.values(PILL.flags).some(Boolean);
  el.classList.toggle('is-hidden', hide);
  el.toggleAttribute('inert', hide);
  if (!hide && !PILL.shown) { PILL.shown = true; el.classList.add('shine'); }
}
function initPill() {
  const el = $('.book-pill');
  if (!el) return;
  PILL.el = el;
  try { PILL.flags.closed = sessionStorage.getItem('cs-pill-closed') === '1'; } catch { /* storage blocked */ }
  $('.bp-x', el)?.addEventListener('click', () => {
    setPill('closed', true);
    try { sessionStorage.setItem('cs-pill-closed', '1'); } catch { /* storage blocked */ }
  });
  const check = () => setPill('hero', scrollY < innerHeight * .8);
  onScrollFrame(check);
  addEventListener('resize', check);
  const f = $('.site-footer');
  if (f) new IntersectionObserver(([e]) => setPill('footer', e.isIntersecting)).observe(f);
  check();
}

/* ---------- 8. Header: glass bar, glide pill, hide on scroll, dropdown, mobile menu ---------- */
function initHeader() {
  const bar = $('.nav-bar');
  if (!bar) return;
  const dd = $('.nav-dd', bar);
  const mm = $('#mobile-menu');

  if (dd) {
    const b = $('.dd-btn', dd);
    const set = open => { dd.classList.toggle('open', open); b.setAttribute('aria-expanded', open); if (open) bar.classList.remove('is-hidden'); };
    let t;
    if (finePointer) {
      dd.addEventListener('mouseenter', () => { clearTimeout(t); set(true); });
      dd.addEventListener('mouseleave', () => { t = setTimeout(() => set(false), 160); });
    }
    b.addEventListener('click', () => set(!dd.classList.contains('open')));
    dd.addEventListener('focusout', e => { if (!dd.contains(e.relatedTarget)) set(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
    document.addEventListener('click', e => { if (!dd.contains(e.target)) set(false); });
  }

  // gliding highlight pill: rests on the current page's link, follows hover/focus
  const nav = $('.nav', bar), glide = nav && $('.nav-glide', nav);
  if (glide) {
    nav.classList.add('has-glide');
    const items = $$(':scope > .nav-link, .nav-dd > .nav-link', nav);
    const cur = items.find(a => a.classList.contains('is-current'));
    const place = (el, instant) => {
      if (!el || !el.offsetWidth) { glide.style.opacity = '0'; return; }
      if (glide.style.opacity !== '1') instant = true; // appear in place rather than sliding from 0
      const nr = nav.getBoundingClientRect(), r = el.getBoundingClientRect();
      if (instant) glide.classList.add('no-anim');
      glide.style.setProperty('--gx', `${r.left - nr.left}px`);
      glide.style.setProperty('--gw', `${r.width}px`);
      if (instant) { void glide.offsetWidth; glide.classList.remove('no-anim'); }
      glide.style.opacity = '1';
    };
    items.forEach(a => { a.addEventListener('mouseenter', () => place(a)); a.addEventListener('focus', () => place(a)); });
    nav.addEventListener('mouseleave', () => place(cur));
    nav.addEventListener('focusout', e => { if (!nav.contains(e.relatedTarget)) place(cur); });
    const rest = () => { glide.style.opacity = '0'; place(cur, true); };
    rest();
    addEventListener('resize', rest);
    document.fonts?.ready.then(rest);
  }

  // hide on scroll down past 120px, show on any scroll up; progress line
  let lastY = scrollY;
  const update = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', max > 0 ? Math.min(1, Math.max(0, y / max)).toFixed(4) : 0);
    const lt = Math.min(1, Math.max(0, (y - 40) / 360)); // 0 at the top → 1 once you are below the hero's top
    bar.style.setProperty('--lt', lt.toFixed(3));
    bar.classList.toggle('is-light', lt > .5);
    const locked = (dd && dd.classList.contains('open')) || (mm && !mm.hidden);
    if (locked || y < 120 || y < lastY) bar.classList.remove('is-hidden');
    else if (y > lastY + 2) bar.classList.add('is-hidden');
    lastY = y;
  };
  onScrollFrame(update);
  update();
  bar.addEventListener('focusin', () => bar.classList.remove('is-hidden'));

  const mb = $('.menu-btn', bar);
  if (mb && mm) {
    const set = open => {
      mm.hidden = !open; mb.setAttribute('aria-expanded', open);
      mb.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mb.innerHTML = open ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
                          : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) { bar.classList.remove('is-hidden'); lenis?.stop(); } else lenis?.start();
      setPill('menu', open);
    };
    mb.addEventListener('click', () => set(mm.hidden));
    $$('a', mm).forEach(a => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mm.hidden) { set(false); mb.focus(); } });
    matchMedia('(min-width: 1141px)').addEventListener('change', e => { if (e.matches) set(false); });
  }
}

/* ---------- 9. Home hero: drifting blobs, mouse glow, showreel scale-in ---------- */
function initHero() {
  const hero = $('.hero');
  if (hero) {
    whileVisible(hero, () => hero.classList.remove('is-off'), () => hero.classList.add('is-off'), 0);
    const g = $('.hero-glow', hero);
    if (g && finePointer && !reduced) {
      let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
      const loop = () => {
        x += (tx - x) * .12; y += (ty - y) * .12;
        g.style.transform = `translate(${x}px, ${y}px)`;
        raf = Math.abs(tx - x) + Math.abs(ty - y) > .5 ? requestAnimationFrame(loop) : 0;
      };
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        tx = e.clientX - r.left; ty = e.clientY - r.top;
        if (!hero.classList.contains('glow-on')) { x = tx; y = ty; hero.classList.add('glow-on'); }
        if (!raf) raf = requestAnimationFrame(loop);
      });
      hero.addEventListener('pointerleave', () => hero.classList.remove('glow-on'));
    }
  }
  const leader = $('.hero-leader');
  if (hero && leader && finePointer && !reduced) {
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      leader.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5).toFixed(3));
      leader.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5).toFixed(3));
    });
    hero.addEventListener('pointerleave', () => { leader.style.setProperty('--mx', 0); leader.style.setProperty('--my', 0); });
  }
  // Slider section grows from 0.92 to 1 (and loses its corner radius) as it scrolls in.
  const sr = $('.slider.showreel');
  if (sr && !reduced) {
    const upd = () => {
      const top = sr.getBoundingClientRect().top, vh = innerHeight;
      sr.style.setProperty('--sr', Math.min(1, Math.max(0, (vh - top) / (vh * .7))).toFixed(3));
    };
    let handler = null;
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !handler) { handler = onScrollFrame(upd); }
      else if (!e.isIntersecting && handler) { removeEventListener('scroll', handler); handler = null; }
      upd();
    }).observe(sr);
    upd();
  }
}

/* ---------- 10. Client logos: FLIP shuffle, no duplicates ----------
   Old behaviour waited a full 3.2s interval before the first shuffle and skipped every tick while
   the (almost full-width) wall sat under a resting mouse cursor: mouseenter fired as the page
   scrolled under the pointer, but mouseleave only fires after the mouse moves, so the hover flag
   stuck and the shuffle could stall indefinitely. */
function initLogos() {
  const wall = $('.logo-wall');
  if (!wall || reduced) return;
  let timer = 0, running = false, hovering = false, hoverT = 0;
  const shuffle = () => {
    const tiles = $$('.logo-tile', wall);
    const first = new Map(tiles.map(t => [t, t.getBoundingClientRect()]));
    const order = tiles.slice();
    do { for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; } }
    while (order.every((t, i) => t === tiles[i])); // the new order always differs
    order.forEach(t => wall.appendChild(t));       // same 9 nodes moved, so no logo can repeat
    order.forEach((t, k) => {
      const a = first.get(t), b = t.getBoundingClientRect();
      if (!b.width) return; // shuffled into the hidden ninth slot
      if (!a.width) { t.animate([{ opacity: 0, transform: 'scale(.86)' }, { opacity: 1, transform: 'none' }], { duration: 650, easing: EASE, delay: k * 25, fill: 'backwards' }); return; }
      const dx = a.left - b.left, dy = a.top - b.top;
      if (!dx && !dy) return;
      t.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
        { duration: 700, easing: EASE, delay: k * 25, fill: 'backwards' });
    });
    if (DEBUG) console.debug('[logos] shuffle', Date.now());
  };
  const tick = () => { timer = setTimeout(tick, 2000); if (!hovering) shuffle(); };
  const start = () => { if (running) return; running = true; clearTimeout(timer); timer = setTimeout(tick, 250); };
  const stop = () => { running = false; clearTimeout(timer); };
  const unhover = () => { clearTimeout(hoverT); hovering = false; };
  wall.addEventListener('mouseenter', () => { clearTimeout(hoverT); hovering = true; });
  wall.addEventListener('mouseleave', () => { clearTimeout(hoverT); hoverT = setTimeout(() => { hovering = false; }, 300); });
  addEventListener('scroll', unhover, { passive: true });
  document.addEventListener('visibilitychange', unhover);
  whileVisible(wall, start, stop, .15);
}

/* ---------- 11. Work: mosaic, sliding filter pill, inset-hover tags, modal ---------- */
function initWork() {
  const grid = $('.work-grid');
  if (!grid) return;
  const tabsEl = $('.tabs'), ind = $('.tab-ind', tabsEl || document);
  const tabs = $$('.tabs .tab');
  const cards = $$('.work-card', grid);
  const limit = +grid.dataset.limit || 0;      // home: fixed number of cards + link to the Work page
  const per = +grid.dataset.perPage || 0;      // work page: cards per "View More Work" step
  const loadBtn = $('.work-load');
  let key = tabs[0]?.dataset.filter || 'all', pages = 1;
  const tabPageSize = matchMedia('(max-width: 640px)').matches ? 2 : 6;
  let tabPage = 0;
  let renderTabPage = () => {};

  const measureTags = () => $$('.work-tag', grid).forEach(t => {
    const l = $('.wt-label', t);
    if (l && l.offsetWidth) t.style.setProperty('--lw', `${l.offsetWidth}px`);
  });
  const moveInd = () => {
    const a = tabs.find(t => t.classList.contains('is-active'));
    if (!ind || !a) return;
    tabsEl.classList.add('has-ind');
    ind.style.setProperty('--tx', `${a.offsetLeft}px`);
    ind.style.setProperty('--ty', `${a.offsetTop}px`);
    ind.style.setProperty('--tw', `${a.offsetWidth}px`);
    ind.style.setProperty('--th', `${a.offsetHeight}px`);
  };
  const layout = (animate, from = 0) => {
    const all = key === 'all' ? cards.filter(c => !c.hasAttribute('data-soon')) : cards.filter(c => c.dataset.cat === key);
    const max = limit || (per ? per * pages : Infinity);
    const vis = all.slice(0, max);
    cards.forEach(c => c.classList.toggle('is-hidden', !vis.includes(c)));
    if (loadBtn) loadBtn.closest('.work-more').hidden = all.length <= max;
    vis.forEach((el, k) => {
      if (!animate) { el.classList.add('reveal'); el.style.setProperty('--d', `${(k % 4) * .06}s`); }
      else if (!reduced && k >= from) { el.classList.remove('is-entering'); void el.offsetWidth; el.style.setProperty('--d', `${(k - from) * .05}s`); el.classList.add('is-entering'); }
    });
    requestAnimationFrame(measureTags);
    if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  const apply = k => {
    key = k; pages = 1;
    tabs.forEach(t => { const on = t.dataset.filter === key; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', on); });
    const selected = tabs.findIndex(t => t.dataset.filter === key);
    if (selected >= 0) renderTabPage(Math.floor(selected / tabPageSize));
    moveInd();
    layout(true);
  };
  loadBtn?.addEventListener('click', () => { const from = per * pages; pages++; layout(true, from); });
  layout(false);
  moveInd();
  const qcat = new URLSearchParams(location.search).get('cat'); // e.g. work.html?cat=social from the What We Do circle
  document.fonts?.ready.then(() => { moveInd(); measureTags(); });
  addEventListener('resize', () => { moveInd(); measureTags(); });
  tabs.forEach(t => t.addEventListener('click', () => apply(t.dataset.filter)));
  const prev = $('.tabs-prev'), next = $('.tabs-next');
  if (tabsEl && next) {
    const pageCount = Math.max(1, Math.ceil(tabs.length / tabPageSize));
    renderTabPage = page => {
      tabPage = Math.max(0, Math.min(page, pageCount - 1));
      const start = tabPage * tabPageSize, end = start + tabPageSize;
      tabs.forEach((t, i) => {
        const visible = i >= start && i < end;
        t.hidden = !visible;
        t.classList.toggle('is-page-hidden', !visible);
        t.setAttribute('aria-hidden', String(!visible));
      });
      if (prev) {
        prev.hidden = tabPage === 0;
        prev.classList.toggle('is-page-hidden', tabPage === 0);
        prev.disabled = tabPage === 0;
      }
      tabsEl.classList.toggle('is-last-page', tabPage === pageCount - 1);
      next.disabled = tabPage === pageCount - 1;
      moveInd();
    };
    prev?.addEventListener('click', () => renderTabPage(tabPage - 1));
    next.addEventListener('click', () => renderTabPage(tabPage + 1));
    let wheelLock = false;
    tabsEl.addEventListener('wheel', e => {
      const delta = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta || wheelLock) return;
      const target = tabPage + (delta > 0 ? 1 : -1);
      if (target < 0 || target >= pageCount) return;
      e.preventDefault();
      renderTabPage(target);
      wheelLock = true;
      setTimeout(() => { wheelLock = false; }, 350);
    }, { passive: false });
    let dragStart = 0, dragging = false, suppressClick = false;
    tabsEl.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragStart = e.clientX;
      dragging = true;
      tabsEl.classList.add('is-dragging');
      tabsEl.setPointerCapture?.(e.pointerId);
    });
    tabsEl.addEventListener('pointerup', e => {
      if (!dragging) return;
      const distance = e.clientX - dragStart;
      dragging = false;
      tabsEl.classList.remove('is-dragging');
      if (Math.abs(distance) < 40) return;
      e.preventDefault();
      renderTabPage(tabPage + (distance < 0 ? 1 : -1));
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 350);
    });
    tabsEl.addEventListener('pointercancel', () => {
      dragging = false;
      tabsEl.classList.remove('is-dragging');
    });
    tabsEl.addEventListener('click', e => {
      if (!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    }, true);
    addEventListener('resize', () => renderTabPage(tabPage));
    renderTabPage(0);
    if (qcat && tabs.some(t => t.dataset.filter === qcat)) apply(qcat);
  }
  tabsEl?.addEventListener('keydown', e => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0 || !['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
    const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    n.focus(); n.click();
  });

  const modal = $('.work-modal');
  if (!modal) return;
  const catName = Object.fromEntries(CATEGORIES);
  const open = id => {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;
    $('.modal-media', modal).innerHTML = mock(p);
    $('.modal-cat', modal).textContent = catName[p.cat];
    $('h3', modal).textContent = p.title;
    $('.modal-desc', modal).textContent = p.desc;
    modal.showModal();
  };
  grid.addEventListener('click', e => {
    const b = e.target.closest('.work-media');
    if (b) open(b.closest('.work-card').dataset.id);
  });
  $('.modal-x', modal).addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  const hash = location.hash.slice(1);
  if (hash && PROJECTS.some(p => p.id === hash)) setTimeout(() => open(hash), 400);
}

/* ---------- 11b. "See more work" ring: rotates with scroll ---------- */
function initRing() {
  const sec = $('.more-work');
  if (!sec || reduced) return;
  const upd = () => {
    const r = sec.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
    sec.style.setProperty('--ring-rot', `${(p * 120).toFixed(2)}deg`);
  };
  let h = null;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !h) h = onScrollFrame(upd);
    else if (!e.isIntersecting && h) { removeEventListener('scroll', h); h = null; }
    upd();
  }).observe(sec);
}

/* ---------- 11c. About: flip-book ----------
   Slow scrolling leaves Strategy visible and readable. Fast scrolling advances pages, with
   a short lock between turns so the book never races through its content.
   The 01 / 02 / 03 buttons jump to a page. No pinning, so nothing overlaps.
   Reduced motion or no GSAP: the plain list (.pillars-list) is shown instead. */
function initFlipbook() {
  const stage = $('.fb-stage');
  if (!stage || reduced || !window.gsap) return;
  const isMobile = matchMedia('(max-width: 640px)').matches;
  const leaves = $$('.fb-leaf', stage), steps = $$('.fb-step', stage), mobilePanels = $$('.fb-mobile-panel', stage);
  document.documentElement.classList.add('has-flipbook');
  let page = 0, lastY = scrollY, lastTime = performance.now(), lastFlipAt = 0;
  const order = () => leaves.forEach((l, k) => {
    const a = +gsap.getProperty(l, '--a') || 0;
    l.style.zIndex = a > 90 ? 10 + k : 20 - k; // turned pages stack on the left in reading order
  });
  const go = n => {
    n = Math.max(0, Math.min(steps.length - 1, n));
    if (n === page) return;
    page = n;
    steps.forEach((s, k) => { const on = k === page; s.classList.toggle('is-active', on); s.setAttribute('aria-pressed', on); });
    if (isMobile) mobilePanels.forEach((panel, k) => panel.classList.toggle('is-active', k === page));
    else leaves.forEach((l, k) => gsap.to(l, { '--a': page > k ? 180 : 0, duration: .9, ease: 'power2.inOut', overwrite: true,
      delay: page > k ? k * .1 : (leaves.length - 1 - k) * .1, onUpdate: order }));
  };
  const onScrollIntent = () => {
    const now = performance.now(), y = scrollY, dy = y - lastY;
    const dt = Math.max(16, now - lastTime);
    lastY = y;
    lastTime = now;
    const speed = Math.abs(dy) / dt;
    if (Math.abs(dy) < 3 || speed < .8 || now - lastFlipAt < 700) return;
    lastFlipAt = now;
    go(page + (dy > 0 ? 1 : -1));
  };
  const resetToStrategy = () => {
    go(0);
    lastY = scrollY;
    lastTime = performance.now();
    lastFlipAt = lastTime;
  };
  steps.forEach((s, k) => s.addEventListener('click', () => go(k)));
  if (isMobile) return;
  stage.addEventListener('pointerenter', resetToStrategy);
  let h = null;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !h) { resetToStrategy(); h = onScrollFrame(onScrollIntent); }
    else if (!e.isIntersecting && h) { removeEventListener('scroll', h); h = null; }
  }).observe(stage);
}

/* ---------- 11d. Services: stacked sticky cards (previous card shrinks + dims) ---------- */
function initOrbit() {
  $$('.w-orbit').forEach(setupOrbit);
}
function setupOrbit(box) {
  const chars = window.CS.CHARACTERS, dots = $$('.wo-dot', box), panel = $('.wo-panel', box), hero = $('.wo-hero', box);
  let cur = box.dataset.start ? +box.dataset.start : 0;
  const view = $('a.wo-view', box);
  const select = i => {
    if (i === cur) return;
    cur = i;
    const ch = chars[i];
    dots.forEach((d, k) => { const on = k === i; d.classList.toggle('is-active', on); d.setAttribute('aria-pressed', on); });
    panel.classList.add('is-swapping'); hero.classList.add('is-swapping');
    setTimeout(() => {
      $('.wo-count', panel).textContent = `${String(i + 1).padStart(2, '0')} / ${String(chars.length).padStart(2, '0')}`;
      $('.wo-name', panel).textContent = ch.name;
      $('.wo-desc', panel).textContent = ch.desc;
      $('.wo-tags', panel).innerHTML = ch.tags.map(t => `<li>${t}</li>`).join('');
      hero.src = `assets/characters/${ch.img}.jpg`;
      if (view) view.href = `work.html?cat=${ch.id}`;
      box.classList.add('has-pick');
      panel.classList.remove('is-swapping'); hero.classList.remove('is-swapping');
      box.classList.remove('just-picked'); void box.offsetWidth; box.classList.add('just-picked');
    }, reduced ? 0 : 220);
  };
  dots.forEach((d, k) => d.addEventListener('click', () => select(k)));
  // "See This Work" filters the grid below to this character's category
  $('button.wo-view', box)?.addEventListener('click', () => {
    const tab = $$('.tabs .tab').find(t => t.dataset.filter === chars[cur].id);
    if (tab) { tab.click(); $('.work-grid')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }
  });
  box.classList.add('is-off');
  whileVisible(box, () => box.classList.remove('is-off'), () => box.classList.add('is-off'), 0);
}

function initWwd() {
  const sec = $('.wwd');
  if (!sec) return;
  const chars = window.CS.CHARACTERS, cards = $$('.wwd-card', sec), box = $('.wwd-detail', sec);
  let last = null;
  const open = (i, from) => {
    const ch = chars[i];
    cards.forEach((c, k) => c.classList.toggle('is-active', k === i));
    $('.wwd-photo', box).src = `assets/characters/${ch.img}.jpg`;
    $('.wwd-count', box).textContent = `${String(i + 1).padStart(2, '0')} / ${String(chars.length).padStart(2, '0')}`;
    $('.wwd-name2', box).textContent = ch.name;
    $('.wwd-desc', box).textContent = ch.desc;
    $('.wwd-tags', box).innerHTML = ch.tags.map(t => `<li>${t}</li>`).join('');
    $('.wwd-view', box).href = `work.html?cat=${ch.id}`;
    box.hidden = false; sec.classList.add('is-open');
    box.classList.remove('pop'); void box.offsetWidth; box.classList.add('pop');
    last = from || null;
    $('.wwd-close', box).focus({ preventScroll: true });
  };
  const close = () => {
    box.hidden = true; sec.classList.remove('is-open');
    sec.classList.remove('is-paused');
    cards.forEach(c => c.classList.remove('is-active'));
    last?.focus({ preventScroll: true });
  };
  cards.forEach((c, k) => c.addEventListener('click', () => { open(k, c); sec.classList.add('is-paused'); }));
  $('.wwd-close', box).addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !box.hidden) close(); });
  sec.addEventListener('click', e => { if (!box.hidden && !box.contains(e.target) && !e.target.closest('.wwd-card')) close(); });
  sec.addEventListener('mouseleave', () => { if (!box.hidden) sec.classList.remove('is-paused'); });
  sec.classList.add('is-off');
  whileVisible(sec, () => sec.classList.remove('is-off'), () => sec.classList.add('is-off'), 0);
}

function initCharacters() {
  $$('.char-visual').forEach(v => { v.classList.add('is-off'); whileVisible(v, () => v.classList.remove('is-off'), () => v.classList.add('is-off'), 0); });
}

function initStack() {
  const stack = $('.svc-stack');
  if (!stack || reduced) return;
  const cards = $$('.svc-card', stack);
  const small = matchMedia('(max-width: 640px)');
  const upd = () => {
    for (let k = 0; k < cards.length - 1; k++) {
      if (small.matches) { cards[k].style.removeProperty('--sp'); continue; }
      const r = cards[k].getBoundingClientRect(), n = cards[k + 1].getBoundingClientRect();
      cards[k].style.setProperty('--sp', Math.min(1, Math.max(0, (r.bottom - n.top) / r.height)).toFixed(3));
    }
  };
  let h = null;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !h) h = onScrollFrame(upd);
    else if (!e.isIntersecting && h) { removeEventListener('scroll', h); h = null; }
    upd();
  }).observe(stack);
}

/* ---------- 11e. Banner: pause the call ring + marquee when off screen ---------- */
function initBanners() {
  $$('.cta-banner').forEach(b => b.classList.add('is-off'));
  $$('.cta-banner').forEach(b => whileVisible(b, () => b.classList.remove('is-off'), () => b.classList.add('is-off'), 0));
}

/* ---------- 6. Services switcher ---------- */
function initServices() {
  const sw = $('.svc-switch');
  if (sw) {
    const tabs = $$('.svc-tab', sw), panels = $$('.svc-panel', sw);
    const ms = +sw.dataset.autoplay || 7000;
    sw.style.setProperty('--auto', `${ms}ms`);
    let i = 0, timer, inView = false, paused = false;
    const go = n => {
      i = (n + panels.length) % panels.length;
      tabs.forEach((t, k) => { t.classList.toggle('is-active', k === i); t.setAttribute('aria-selected', k === i); $('.prog', t).classList.remove('run'); });
      panels.forEach((p, k) => { p.classList.toggle('is-active', k === i); p.toggleAttribute('inert', k !== i); });
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
      schedule();
    };
    const schedule = () => {
      clearTimeout(timer);
      if (reduced || !inView || paused) return;
      const prog = $('.prog', tabs[i]);
      void prog.offsetWidth; prog.classList.add('run');
      timer = setTimeout(() => go(i + 1), ms);
    };
    const pause = on => {
      paused = on; sw.classList.toggle('paused', on);
      if (on) clearTimeout(timer); else schedule();
    };
    tabs.forEach((t, k) => t.addEventListener('click', () => go(k)));
    sw.addEventListener('mouseenter', () => pause(true));
    sw.addEventListener('mouseleave', () => pause(false));
    sw.addEventListener('focusin', () => pause(true));
    sw.addEventListener('focusout', e => { if (!sw.contains(e.relatedTarget)) pause(false); });
    $('.svc-tabs', sw).addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { go(i + 1); tabs[i].focus(); }
      if (e.key === 'ArrowLeft') { go(i - 1); tabs[i].focus(); }
    });
    // swipe on touch
    let sx = null;
    $('.svc-stage', sw).addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    $('.svc-stage', sw).addEventListener('touchend', e => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
    });
    panels.forEach((p, k) => p.toggleAttribute('inert', k !== 0));
    whileVisible(sw, () => { inView = true; schedule(); }, () => { inView = false; clearTimeout(timer); });
  }

  // Pointer parallax on every service visual
  if (!finePointer || reduced) return;
  $$('[data-tilt]').forEach(v => {
    const layers = $$('.layer', v);
    let raf = 0;
    v.addEventListener('pointermove', e => {
      const r = v.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => layers.forEach(l => {
        const d = +l.dataset.depth || 10;
        l.style.translate = `${x * d}px ${y * d}px`;
      }));
    });
    v.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); layers.forEach(l => l.style.translate = ''); });
  });
}

/* ---------- 7. Impact: count-up, live charts, 3D tilt ---------- */
function initImpact() {
  const grid = $('.impact-grid');
  if (!grid) return;
  const nums = $$('[data-count]', grid);
  const fmt = (el, v) => { el.textContent = `${el.dataset.pre}${Math.round(v).toLocaleString('en-US')}${el.dataset.suf}`; };
  const run = () => {
    grid.classList.add('is-live');
    const token = run.token = (run.token || 0) + 1; // a newer run cancels an older one
    nums.forEach((el, k) => {
      const end = +el.dataset.count;
      if (reduced) return fmt(el, end);
      const dur = 1600, t0 = performance.now() + k * 90 + 300;
      fmt(el, 0);
      const tick = now => {
        if (run.token !== token) return;
        const p = Math.min(1, Math.max(0, (now - t0) / dur));
        fmt(el, end * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  // count up every time the cards come back into view (not just once), reset when they leave
  let shown = false;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !shown) { shown = true; run(); }
    else if (!e.isIntersecting && e.intersectionRatio === 0) { shown = false; }
  }, { threshold: [0, .25] }).observe(grid);
  whileVisible(grid, () => grid.classList.remove('is-off'), () => grid.classList.add('is-off'), 0);
  if (!finePointer || reduced) return;
  $$('[data-tilt-card]', grid).forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.classList.add('tilting');
      c.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
      c.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
    });
    c.addEventListener('pointerleave', () => { c.classList.remove('tilting'); c.style.removeProperty('--rx'); c.style.removeProperty('--ry'); });
  });
}

/* ---------- 8. Process: panels expand on hover / focus / tap ---------- */
function initProcess() {
  $$('.process').forEach(proc => {
    const steps = $$('.step', proc);
    const open = s => steps.forEach(x => x.classList.toggle('is-open', x === s));
    steps.forEach(s => {
      s.addEventListener('mouseenter', () => open(s));
      s.addEventListener('focus', () => open(s));
      s.addEventListener('click', () => open(s));
    });
    proc.addEventListener('mouseleave', () => open(steps[0]));
    proc.addEventListener('focusout', e => { if (!proc.contains(e.relatedTarget)) open(steps[0]); });
  });
}

/* ---------- 9. Global reach: country labels on the globe open the matching review ---------- */
const GLOBE = { ready: false, index: 0, focus() {} };
// cobe's own projection (from its shader): screen = M(theta, phi) · P, visible when z > 0
function projectPlace(lat, lon, phi, theta) {
  const la = lat * Math.PI / 180, lo = lon * Math.PI / 180 - Math.PI, a = Math.cos(la);
  const px = -a * Math.cos(lo), py = Math.sin(la), pz = a * Math.sin(lo);
  const c = Math.cos(theta), d = Math.cos(phi), e = Math.sin(theta), f = Math.sin(phi);
  return { x: d * px + f * pz, y: f * e * px + c * py - d * e * pz, z: -f * c * px + e * py + d * c * pz };
}
function placeLabels(phi, theta) {
  const wrap = $('.globe-wrap');
  if (!wrap) return;
  const w = wrap.offsetWidth, places = window.CS.GLOBE_PLACES;
  $$('.g-label', wrap).forEach((el, k) => {
    const g = places[k], p = projectPlace(g.lat, g.lon, phi, theta);
    // labels whose text sits left of the dot are anchored by their right edge
    el.style.transform = `translate(${((1 + .8 * p.x) * w / 2).toFixed(1)}px, ${((1 - .8 * p.y) * w / 2).toFixed(1)}px)${g.left ? ' translateX(-100%)' : ''}`;
    el.classList.toggle('is-back', p.z < .18);
  });
}
const anglesFor = (lat, lon) => ({ phi: Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2), theta: (lat * Math.PI) / 180 * .7 });
function initReach() {
  const rv = $('.rv');
  if (!rv) return;
  const slides = $$('.rv-slide', rv), count = $('.rv-count b', rv), stage = $('.reach-stage');
  const labels = $$('.g-label[data-i]');
  const n = slides.length, MS = 6500;
  let i = 0, timer = 0, paused = false, visible = false;
  rv.style.setProperty('--rv-ms', `${MS}ms`);
  // static placement until the WebGL globe is ready (also the no-WebGL fallback view)
  const start = anglesFor(45, -45);
  placeLabels(start.phi, .75);
  addEventListener('resize', () => { if (!GLOBE.ready) placeLabels(start.phi, .75); });
  const schedule = () => {
    clearTimeout(timer);
    rv.classList.remove('run');
    if (reduced || paused || !visible) return;
    void rv.offsetWidth;
    rv.classList.add('run');
    timer = setTimeout(() => go(i + 1), MS);
  };
  const go = (k, user = false) => {
    i = (k + n) % n;
    slides.forEach((s, j) => { s.classList.toggle('is-active', j === i); s.toggleAttribute('aria-hidden', j !== i); });
    labels.forEach(l => { const on = (l.dataset.rv || l.dataset.i).split(',').map(Number).includes(i); l.classList.toggle('is-active', on); l.setAttribute('aria-pressed', on); });
    if (count) count.textContent = String(i + 1).padStart(2, '0');
    GLOBE.index = i;
    if (GLOBE.ready && user) GLOBE.focus(i);
    schedule();
  };
  labels.forEach(l => l.addEventListener('click', () => go(+l.dataset.i, true)));
  $('.rv-prev', rv).addEventListener('click', () => go(i - 1, true));
  $('.rv-next', rv).addEventListener('click', () => go(i + 1, true));
  const pause = on => { paused = on; rv.classList.toggle('paused', on); if (on) clearTimeout(timer); else schedule(); };
  stage.addEventListener('mouseenter', () => pause(true));
  stage.addEventListener('mouseleave', () => pause(false));
  stage.addEventListener('focusin', () => pause(true));
  stage.addEventListener('focusout', e => { if (!stage.contains(e.relatedTarget)) pause(false); });
  whileVisible(stage, () => { visible = true; go(i); }, () => { visible = false; clearTimeout(timer); rv.classList.remove('run'); }, .2);
}

/* ---------- 10. Globe (lazy) ---------- */
function initGlobe() {
  const wrap = $('.globe-wrap');
  if (!wrap) return;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    // cobe: tiny WebGL dotted globe. Pinned version; CSS globe + labels stay if this fails.
    import('https://cdn.jsdelivr.net/npm/cobe@0.6.3/+esm')
      .then(m => mountGlobe(wrap, m.default))
      .catch(err => console.warn('Globe fallback in use:', err));
  }, { rootMargin: '300px' });
  io.observe(wrap);
}

function mountGlobe(wrap, createGlobe) {
  const canvas = $('.globe-canvas', wrap);
  const places = window.CS.GLOBE_PLACES;
  const start = anglesFor(45, -45);
  let phi = start.phi, theta = .75, width = 0, drag = null, dragOffset = 0, velocity = 0, target = null;
  const resize = () => { width = canvas.offsetWidth; };
  resize();
  addEventListener('resize', resize);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const TAU = Math.PI * 2;
  const markers = () => places.map(g => ({ location: [g.lat, g.lon], size: target && (g.reviews || []).includes(target.i) ? .12 : .07 }));
  let holdUntil = 0;
  GLOBE.focus = i => {
    const g = places.find(x => (x.reviews || [x.review]).includes(i));
    if (g) { target = { ...anglesFor(g.lat, g.lon), i }; holdUntil = 0; }
  };
  const globe = createGlobe(canvas, {
    devicePixelRatio: dpr, width: width * dpr, height: width * dpr,
    phi, theta, dark: 1, diffuse: 1.3, mapSamples: 16000, mapBrightness: 6,
    baseColor: [0.32, 0.14, 0.58], markerColor: [0.86, 0.72, 1], glowColor: [0.42, 0.15, 0.75],
    markers: markers(),
    onRender: state => {
      if (!drag && target) {
        let d = (target.phi - (phi + dragOffset)) % TAU;
        if (d > Math.PI) d -= TAU; if (d < -Math.PI) d += TAU;
        const k = reduced ? 1 : .05;
        phi += d * k; theta += (target.theta - theta) * k;
        // once it has arrived, hold on the country for a moment, then go back to spinning
        if (Math.abs(d) < .01) { if (!holdUntil) holdUntil = performance.now() + 3500; else if (performance.now() > holdUntil) target = null; }
      } else if (!drag) {
        phi += (reduced ? 0 : .0028) + velocity; velocity *= .94; // slow, steady spin
        theta += (.75 - theta) * .02;
      }
      state.phi = phi + dragOffset;
      state.theta = theta;
      state.width = width * dpr; state.height = width * dpr;
      state.markers = markers();
      placeLabels(phi + dragOffset, theta);
    },
  });
  GLOBE.ready = true;
  requestAnimationFrame(() => canvas.classList.add('ready'));
  wrap.style.pointerEvents = 'auto';
  canvas.style.cursor = 'grab';
  canvas.addEventListener('pointerdown', e => { drag = { x: e.clientX, base: dragOffset }; target = null; canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; });
  canvas.addEventListener('pointermove', e => {
    if (!drag) return;
    const next = drag.base + (e.clientX - drag.x) / 160;
    velocity = (next - dragOffset) * .3; dragOffset = next;
  });
  const end = () => { drag = null; canvas.style.cursor = 'grab'; };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  if (typeof globe.toggle === 'function') whileVisible(wrap, () => globe.toggle(true), () => globe.toggle(false));
}

/* ---------- 11. Pricing: highlight cycles through plans; click holds one ---------- */
function initPricing() {
  const plans = $('.plans');
  if (!plans) return;
  const cards = $$('.plan', plans), hint = $('.plans-hint');
  const popular = cards.find(c => c.classList.contains('popular'));
  let idx = cards.indexOf(popular), held = null, hover = false, timer = 0;
  const focus = c => { cards.forEach(x => x.classList.toggle('is-focus', x === c)); plans.classList.toggle('has-focus', c !== popular || !!held); };
  const tick = () => { if (held || hover) return; idx = (idx + 1) % cards.length; focus(cards[idx]); };
  cards.forEach((c, k) => {
    c.addEventListener('mouseenter', () => { hover = true; focus(c); });
    c.addEventListener('focusin', () => focus(c));
    c.addEventListener('click', e => {
      if (e.target.closest('a')) return; // the plan button still navigates
      held = held === c ? null : c;
      cards.forEach(x => x.classList.toggle('is-held', x === held));
      idx = k; focus(c);
      if (hint) hint.textContent = held ? `Holding ${$('h3', c).textContent}. Click it again to resume.` : 'Plans highlight in turn. Click a plan to hold it.';
    });
  });
  plans.addEventListener('mouseleave', () => { hover = false; focus(held || cards[idx]); });
  if (reduced) { if (hint) hint.hidden = true; return; }
  whileVisible(plans, () => { clearInterval(timer); timer = setInterval(tick, 2600); }, () => clearInterval(timer), .3);
}

/* ---------- 12. Contact form ---------- */
function initForm() {
  $$('.contact-form').forEach(form => {
    const status = $('.form-status', form);
    form.addEventListener('input', e => e.target.classList.remove('invalid'));
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const bad = $$('[required]', form).filter(f => !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value)));
      bad.forEach(f => f.classList.add('invalid'));
      if (bad.length) { status.className = 'form-status err'; status.textContent = 'Please fill in the highlighted fields.'; bad[0].focus(); return; }
      const data = Object.fromEntries(new FormData(form));
      const btn = $('.submit', form);
      if (SITE.formEndpoint) {
        btn.disabled = true; setRollText(btn, 'Sending…');
        try {
          const r = await fetch(SITE.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
          if (!r.ok) throw new Error(r.status);
          form.reset(); status.className = 'form-status ok'; status.textContent = 'Thanks! Your enquiry is in. We reply within 24 hours.';
        } catch {
          status.className = 'form-status err'; status.textContent = `Something went wrong. Email us at ${SITE.email}.`;
        } finally { btn.disabled = false; setRollText(btn, 'Send My Enquiry'); }
      } else {
        const body = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\nBudget: ${data.budget}\nCompany: ${data.company || '-'}\n\n${data.message}`;
        location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Project enquiry: ${data.service}`)}&body=${encodeURIComponent(body)}`;
        status.className = 'form-status ok'; status.textContent = 'Your email app should open with the enquiry ready to send.';
      }
    });
  });
}

/* ---------- boot ---------- */
document.documentElement.classList.add('js');
if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
renderPartials();
initWords();
initButtons();
initPill();
initHeader();
initWork();
initReveal();
initHero();
initLogos();
initCursor();
initSmooth();
initFlipbook();
initStack();
initCharacters();
initWwd();
initOrbit();
initBanners();
initServices();
initImpact();
initProcess();
initReach();
initGlobe();
initPricing();
initForm();
// Honour #anchors that only exist after partials render (e.g. services.html#branding)
if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) requestAnimationFrame(() => t.scrollIntoView()); }
// Recalculate pinned sections whenever the page height settles (fonts, images, filtering)
if (window.ScrollTrigger) {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
  let rt = 0, lastH = 0;
  new ResizeObserver(() => { const h = document.body.offsetHeight; if (Math.abs(h - lastH) < 2) return; lastH = h; clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 250); }).observe(document.body);
}
})();
