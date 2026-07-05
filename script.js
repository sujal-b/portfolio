/* ============================================================
   ALEX CARTER — AI ENGINEER PORTFOLIO
   Interactions:
   - Gooey snake cursor (20 trailing dots with sine physics)
   - 3D perspective toggle (whole page tilt)
   - Theme toggle (red / purple)
   - 3D tilt physics on logos (60px edge lift, 0.12 damping)
   - Lenis smooth scroll
   - Horizontal-scroll projects (scroll-wheel driven)
   - Menu overlay (slides up from bottom)
   - Counter animations
   - Page exit transitions
   - Form multi-select
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ======== LENIS SMOOTH SCROLL ======== */
const lenis = new Lenis({
  duration: 1.0,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect lenis to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* ======== LOADER ======== */
(function initLoader() {
  const loader = document.getElementById('loader');
  const barFill = document.getElementById('loaderBarFill');
  const statusEl = document.getElementById('loaderStatus');
  if (!loader) return;

  let progress = 0;
  const statuses = ['LOADING', 'PREPARING', 'READY'];
  document.body.style.overflow = 'hidden';
  lenis.stop();

  function tick() {
    if (progress >= 100) {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        lenis.start();
        startHeroIntro();
      }, 300);
      return;
    }
    const inc = Math.random() * 8 + 3;
    progress = Math.min(progress + inc, 100);
    barFill.style.width = progress + '%';
    const idx = Math.min(Math.floor(progress / 35), statuses.length - 1);
    statusEl.textContent = statuses[idx];
    setTimeout(tick, Math.random() * 160 + 100);
  }

  window.addEventListener('load', () => setTimeout(tick, 400));
})();

/* ======== GOOEY SNAKE CURSOR ======== */
(function initGooeyCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  const amount = 20;
  const sineDots = Math.floor(amount * 0.3);
  const width = 26;
  const idleTimeout = 150;
  let lastFrame = 0;
  let mousePosition = { x: 0, y: 0 };
  let dots = [];
  let timeoutID;
  let idle = false;

  class Dot {
    constructor(index = 0) {
      this.index = index;
      this.anglespeed = 0.05;
      this.x = 0;
      this.y = 0;
      this.scale = 1 - 0.05 * index;
      this.range = width / 2 - (width / 2) * this.scale + 2;
      this.limit = width * 0.75 * this.scale;
      this.element = document.createElement('span');
      gsap.set(this.element, { scale: this.scale });
      cursor.appendChild(this.element);
    }
  }

  function buildDots() {
    cursor.innerHTML = '';
    dots = [];
    for (let i = 0; i < amount; i++) {
      dots.push(new Dot(i));
    }
  }

  function onMouseMove(e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
  }

  function idleCheck() {
    idle = true;
    if (sineDots > 0) {
      // Sine wave idle animation
    }
  }

  function render(t) {
    if (t - lastFrame > idleTimeout) {
      idleCheck();
    }
    lastFrame = t;

    let x = mousePosition.x;
    let y = mousePosition.y;

    dots.forEach((dot, i) => {
      const nextDot = dots[i + 1] || dots[0];
      if (nextDot) {
        dot.x = lerp(dot.x, x, 0.4);
        dot.y = lerp(dot.y, y, 0.4);
        gsap.set(dot.element, { x: dot.x, y: dot.y });
        x = dot.x;
        y = dot.y;
      }
    });

    requestAnimationFrame(render);
  }

  window.addEventListener('mousemove', onMouseMove);
  buildDots();
  mousePosition.x = window.innerWidth / 2;
  mousePosition.y = window.innerHeight / 2;
  requestAnimationFrame(render);

  // Hover states (optional scaling)
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('a, button, .menu-option, .skill-item, [data-cursor]');
    if (!el) return;
    cursor.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest('a, button, .menu-option, .skill-item, [data-cursor]');
    if (!el) return;
    cursor.classList.remove('hover');
  });
})();

/* ======== CURSOR CIRCLE (hover label on projects) ======== */
(function initCursorCircle() {
  if (window.matchMedia('(hover: none)').matches) return;
  const circle = document.querySelector('.cursor-circle');
  if (!circle) return;

  window.addEventListener('mousemove', e => {
    circle.style.top = e.clientY + 'px';
    circle.style.left = e.clientX + 'px';
  });

  document.querySelectorAll('.project > *').forEach(el => {
    el.addEventListener('mouseenter', () => circle.classList.add('show'));
    el.addEventListener('mouseleave', () => circle.classList.remove('show'));
  });
})();

/* ======== THEME TOGGLE (red / purple) ======== */
(function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  // Load saved theme
  try {
    const saved = localStorage.getItem('theme') || 'red';
    document.documentElement.setAttribute('data-theme', saved);
  } catch (e) {}

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'red';
    const next = current === 'red' ? 'purple' : 'red';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

/* ======== INTERACTIVE MOUSE GLOW BACKGROUND ======== */
(function initInteractiveBackground() {
  const home = document.getElementById('home');
  if (!home) return;
  const bgField = home.querySelector('.section-bg-field');
  if (!bgField) return;

  const pointerMql = window.matchMedia('(any-pointer: fine)');
  if (!pointerMql.matches) return;

  let mouse = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };
  let active = false;

  function onMouseMove(e) {
    if (!active) {
      active = true;
    }
    const rect = home.getBoundingClientRect();
    target.x = e.clientX - rect.left;
    target.y = e.clientY - rect.top;
  }

  function update() {
    if (active) {
      // Lerp for smooth cursor trailing glow
      mouse.x = mouse.x + (target.x - mouse.x) * 0.08;
      mouse.y = mouse.y + (target.y - mouse.y) * 0.08;
      bgField.style.setProperty('--bg-mouse-x', `${mouse.x}px`);
      bgField.style.setProperty('--bg-mouse-y', `${mouse.y}px`);
    }
    requestAnimationFrame(update);
  }

  home.addEventListener('mousemove', onMouseMove, { passive: true });
  
  // Set initial position to center
  const rect = home.getBoundingClientRect();
  mouse.x = rect.width / 2;
  mouse.y = rect.height / 2;
  target.x = mouse.x;
  target.y = mouse.y;
  bgField.style.setProperty('--bg-mouse-x', `${mouse.x}px`);
  bgField.style.setProperty('--bg-mouse-y', `${mouse.y}px`);

  requestAnimationFrame(update);
})();

/* ======== 3D PERSPECTIVE TOGGLE + DEPTH TILT ENGINE ======== */
(function initPerspectiveTilt() {
  'use strict';

  const INTENSITY = 0.35;
  const DAMP = 0.12;
  const RIGHT_CAP_ENABLED = true;
  const RIGHT_CAP_DEG = 10;

  const pointerMql = window.matchMedia('(any-pointer: fine)');
  const hoverMql = window.matchMedia('(any-hover: hover)');
  const widthMql = window.matchMedia('(min-width: 769px)');
  const reducedMotionMql = window.matchMedia('(prefers-reduced-motion: reduce)');

  const toggleBtn = document.getElementById('perspectiveToggle');
  if (toggleBtn) toggleBtn.setAttribute('role', 'button');

  const gateMatches = () =>
    pointerMql.matches && hoverMql.matches && widthMql.matches && !reducedMotionMql.matches;

  const showToggle = () => { if (toggleBtn) { toggleBtn.style.display = ''; toggleBtn.setAttribute('aria-hidden', 'false'); } };
  const hideToggle = () => { if (toggleBtn) { toggleBtn.style.display = 'none'; toggleBtn.setAttribute('aria-hidden', 'true'); } };

  if (!gateMatches()) {
    hideToggle();
    return;
  }
  showToggle();

  const items = [
    { sel: '.home-1', depth: 6, rotate: 2 },
    { sel: '.home-2', depth: 12, rotate: 3 },
    { sel: '.home-3', depth: 40, rotate: 4 },
    { sel: '.projects-section .heading', depth: 140, rotate: 8 },
    { sel: '.projects-container-wrapper', depth: 140, rotate: 28, rightMaxRotate: 3 },
    { sel: '.home-3 .home-cta', depth: 60, rotate: 10 },
  ];

  const wrappers = Array.from(document.querySelectorAll('.perspective-wrapper'));

  const states = wrappers.map(el => {
    const targets = items.flatMap(it => {
      const nodes = el.querySelectorAll(it.sel);
      return Array.from(nodes).map(node => ({
        el: node,
        depth: it.depth,
        rotate: it.rotate,
        rightMaxRotate: it.rightMaxRotate ?? null
      }));
    });
    return { el, inView: false, hovering: false, targets, tx: 0, ty: 0 };
  });

  function setWillChange(state, on) {
    for (const t of state.targets) t.el.style.willChange = on ? 'transform' : '';
  }
  function resetTargets(state) {
    for (const t of state.targets) t.el.style.transform = '';
  }

  let nx = 0, ny = 0;
  let rafId = 0;

  function applyFrame() {
    rafId = 0;
    for (const s of states) {
      if (s.targets.length === 0) continue;
      const targetX = s.inView && s.hovering ? nx : 0;
      const targetY = s.inView && s.hovering ? ny : 0;
      s.tx += (targetX - s.tx) * DAMP;
      s.ty += (targetY - s.ty) * DAMP;
      for (const t of s.targets) {
        const dx = -s.tx * t.depth * INTENSITY;
        const dy = -s.ty * t.depth * INTENSITY;
        let ry = s.tx * t.rotate * INTENSITY;
        const rx = s.ty * -t.rotate * INTENSITY;
        if (s.tx > 0) {
          const cap = t.rightMaxRotate ?? RIGHT_CAP_DEG;
          if (RIGHT_CAP_ENABLED && cap != null) ry = Math.min(ry, cap);
        }
        t.el.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotateY(${ry}deg) rotateX(${rx}deg)`;
      }
      if (!s.inView && Math.abs(s.tx) < 0.001 && Math.abs(s.ty) < 0.001) {
        s.tx = s.ty = 0;
        resetTargets(s);
      }
    }
    if (states.some(s => {
      const targetX = s.inView && s.hovering ? nx : 0;
      const targetY = s.inView && s.hovering ? ny : 0;
      return Math.abs(targetX - s.tx) > 0.001 || Math.abs(targetY - s.ty) > 0.001;
    })) {
      rafId = requestAnimationFrame(applyFrame);
    }
  }

  function tick() {
    if (!rafId && states.some(s => s.inView || Math.abs(s.tx) > 0.001 || Math.abs(s.ty) > 0.001)) {
      rafId = requestAnimationFrame(applyFrame);
    }
  }

  function onPointerMove(e) {
    if (!enabled) return;
    const vw = window.innerWidth || 1;
    const vh = window.innerHeight || 1;
    let x = (e.clientX / vw - 0.5) * 2;
    let y = (e.clientY / vh - 0.5) * 2;
    nx = x < -1 ? -1 : x > 1 ? 1 : x;
    ny = y < -1 ? -1 : y > 1 ? 1 : y;
    const hoveredWrapper = document.elementFromPoint(e.clientX, e.clientY)?.closest('.perspective-wrapper');
    for (const s of states) s.hovering = s.el === hoveredWrapper;
    tick();
  }

  function onPointerLeave() {
    for (const s of states) s.hovering = false;
    tick();
  }

  let io = null;
  function observeAll() {
    if (!io) {
      io = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const s = states.find(st => st.el === entry.target);
          if (!s) continue;
          s.inView = entry.isIntersecting;
          if (!s.inView) s.hovering = false;
          tick();
        }
      }, { threshold: 0 });
    }
    for (const s of states) io.observe(s.el);
  }
  function unobserveAll() { if (io) io.disconnect(); }

  let enabled = false;
  function disablePerspective() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    window.removeEventListener('pointermove', onPointerMove);
    document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    unobserveAll();
    for (const s of states) {
      s.inView = false;
      s.hovering = false;
      s.tx = s.ty = 0;
      resetTargets(s);
      setWillChange(s, false);
    }
    enabled = false;
    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', 'false');
  }
  function enablePerspective() {
    if (!gateMatches()) { handleEnvChange(); return; }
    if (enabled) return;
    for (const s of states) setWillChange(s, true);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave, { passive: true });
    observeAll();
    enabled = true;
    if (toggleBtn) { toggleBtn.setAttribute('aria-pressed', 'true'); showToggle(); }
    tick();
  }

  const handleEnvChange = () => {
    if (gateMatches()) { showToggle(); if (!enabled) return; }
    else { if (enabled) disablePerspective(); hideToggle(); detachEnvListeners(); }
  };
  function attachEnvListeners() {
    pointerMql.addEventListener('change', handleEnvChange);
    hoverMql.addEventListener('change', handleEnvChange);
    widthMql.addEventListener('change', handleEnvChange);
    reducedMotionMql.addEventListener('change', handleEnvChange);
  }
  function detachEnvListeners() {
    pointerMql.removeEventListener('change', handleEnvChange);
    hoverMql.removeEventListener('change', handleEnvChange);
    widthMql.removeEventListener('change', handleEnvChange);
    reducedMotionMql.removeEventListener('change', handleEnvChange);
  }

  attachEnvListeners();
  enablePerspective();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', e => {
      e.preventDefault();
      if (enabled) disablePerspective();
      else if (gateMatches()) enablePerspective();
    });
  }
})();

/* ======== HINTS TOGGLE (press 'h' to reveal all hover-texts) ======== */
(function initHints() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') {
      document.body.classList.toggle('hints-active');
    }
  });
})();

/* ======== 3D TILT PHYSICS (logos, footer) ======== */
(function initTilt() {
  if (prefersReduced) return;

  const LIFT_PX = 60;
  const DAMPING = 0.12;

  function setupTilt(rootEl) {
    const tiltEl = rootEl.querySelector('.perspective-hover-element');
    if (!tiltEl) return;

    let isInView = false;
    let hovering = false;
    const state = { rx: 0, ry: 0 };
    const target = { rx: 0, ry: 0 };

    const io = new IntersectionObserver((entries) => {
      isInView = entries[0].isIntersecting;
    }, { root: null, threshold: 0 });
    io.observe(rootEl);

    function clampAngle(v, a) { return Math.max(-a, Math.min(a, v)); }

    function mapPointer(e) {
      if (e.pointerType === 'touch') return;
      const r = rootEl.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = (e.clientX - cx) / (r.width / 2);
      const ny = (e.clientY - cy) / (r.height / 2);

      const minDim = Math.max(1, Math.min(r.width, r.height));
      const degMax = Math.atan(LIFT_PX / (minDim / 2)) * (180 / Math.PI);

      target.ry = clampAngle(nx * degMax, degMax);
      target.rx = clampAngle(-ny * degMax, degMax);
    }

    function onEnter() { hovering = true; }
    function onLeave() { hovering = false; target.rx = 0; target.ry = 0; }

    rootEl.addEventListener('pointerenter', onEnter);
    rootEl.addEventListener('pointermove', mapPointer);
    rootEl.addEventListener('pointerleave', onLeave);

    function tick() {
      if (isInView) {
        state.rx = lerp(state.rx, target.rx, DAMPING);
        state.ry = lerp(state.ry, target.ry, DAMPING);
        tiltEl.style.transform = `rotateX(${state.rx}deg) rotateY(${state.ry}deg)`;
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  document.querySelectorAll('.perspective-hover-container').forEach(setupTilt);
})();

/* ======== HERO INTRO ======== */
function startHeroIntro() {
  if (typeof gsap === 'undefined') return;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  gsap.set('.kala-letter', { y: '110%', opacity: 0 });
  gsap.set('.hero-heading span', { y: '110%' });
  gsap.set('.home-2-right, .home-3', { opacity: 0, y: 20 });

  tl.to('.kala-letter', { y: '0%', opacity: 1, duration: 0.9, stagger: 0.06, ease: 'expo.out' })
    .to('.hero-heading span', { y: '0%', duration: 0.8, stagger: 0.08, ease: 'expo.out' }, '-=0.5')
    .to('.home-2-right', { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
    .to('.home-3', { y: 0, opacity: 1, duration: 0.7 }, '-=0.4');
}

/* ======== HORIZONTAL PROJECTS SCROLL ======== */
(function initHorizontalProjects() {
  const section = document.querySelector('.projects-section');
  const container = document.querySelector('.projects-container');
  const heading = document.querySelector('.projects-section .heading');
  if (!section || !container || !heading) return;

  const media = gsap.matchMedia();

  media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
    const context = gsap.context(() => {
      const travel = () => {
        const gap = parseFloat(getComputedStyle(section).columnGap) || 26;
        return Math.max(0, container.scrollWidth + heading.offsetWidth + gap - window.innerWidth);
      };

      gsap.to(container, {
        x: () => -travel(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${travel() / 1.4}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }, section);

    return () => context.revert();
  });

  media.add('(max-width: 768px), (prefers-reduced-motion: reduce)', () => {
    gsap.set(container, { clearProps: 'transform' });
  });
})();

/* ======== MENU OVERLAY ======== */
(function initMenuOverlay() {
  const btn = document.getElementById('menuToggle');
  const panel = document.getElementById('menuPanel');
  if (!btn || !panel) return;

  let isOpen = false;
  let ySetter = null;

  // Initial position: off-screen below
  gsap.set(panel, { y: window.innerHeight, visibility: 'hidden' });

  function open() {
    isOpen = true;
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('open');
    panel.style.visibility = 'visible';
    gsap.to(panel, {
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: true,
    });
    document.body.style.overflow = 'hidden';
    lenis.stop();
  }

  function close() {
    isOpen = false;
    panel.setAttribute('aria-hidden', 'true');
    panel.classList.remove('open');
    gsap.to(panel, {
      y: window.innerHeight,
      duration: 0.45,
      ease: 'power3.in',
      overwrite: true,
      onComplete: () => {
        if (!isOpen) panel.style.visibility = 'hidden';
      },
    });
    document.body.style.overflow = '';
    lenis.start();
  }

  btn.addEventListener('click', () => {
    if (isOpen) close();
    else open();
  });

  // Close on link click
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => close());
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close();
  });

  // Reposition on resize
  window.addEventListener('resize', () => {
    if (!isOpen) {
      gsap.set(panel, { y: window.innerHeight });
    }
  });
})();

/* ======== FORM MULTI-SELECT ======== */
(function initFormMultiSelect() {
  document.querySelectorAll('.options-group').forEach(group => {
    group.querySelectorAll('.menu-option').forEach(opt => {
      opt.addEventListener('click', () => {
        // Budget = single select; Service = multi
        const type = group.dataset.type;
        if (type === 'budget') {
          group.querySelectorAll('.menu-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
        } else {
          opt.classList.toggle('selected');
        }
      });
    });
  });

  const form = document.getElementById('contactForm');
  const submit = document.getElementById('formSubmit');
  if (form && submit) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const original = submit.textContent;
      submit.textContent = 'Sending...';
      submit.disabled = true;
      setTimeout(() => {
        submit.textContent = '✓ Sent';
        setTimeout(() => {
          submit.textContent = original;
          submit.disabled = false;
          form.reset();
          document.querySelectorAll('.menu-option.selected').forEach(o => o.classList.remove('selected'));
        }, 2000);
      }, 1200);
    });
  }
})();

/* ======== COUNTER ANIMATIONS ======== */
(function initCounters() {
  const nums = document.querySelectorAll('.about-stat-num');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      let current = 0;
      const duration = 1800;
      const start = performance.now();

      function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        current = target * eased;
        el.textContent = current.toFixed(decimals);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
})();

/* ======== LIVE GITHUB + LEETCODE STATS ======== */
(function initCodingActivity() {
  const githubPanel = document.querySelector('.github-activity');
  const leetcodePanel = document.querySelector('.leetcode-activity');
  if (!githubPanel || !leetcodePanel) return;

  const CACHE_KEY = 'portfolio-coding-stats-v1';
  const CACHE_TTL = 30 * 60 * 1000;
  const GITHUB_USER = 'sujal-b';
  const LEETCODE_USER = 'KaiSuke';

  function readCache() {
    try {
      return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function writeCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ ...data, cachedAt: Date.now() }));
    } catch {
      // Live rendering still works when storage is disabled.
    }
  }

  async function fetchJson(url, timeout = 10000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }

  function longestStreak(contributions) {
    let longest = 0;
    let current = 0;
    contributions.forEach(day => {
      current = day.count > 0 ? current + 1 : 0;
      longest = Math.max(longest, current);
    });
    return longest;
  }

  function renderGithub(data, stale = false) {
    const values = {
      contributions: Number(data.totalContributions || 0).toLocaleString(),
      repos: Number(data.publicRepos || 0).toLocaleString(),
      stars: Number(data.stars || 0).toLocaleString(),
      streak: `${Number(data.longestStreak || 0)}d`,
    };
    Object.entries(values).forEach(([key, value]) => {
      const element = githubPanel.querySelector(`[data-github-stat="${key}"]`);
      if (element) element.textContent = value;
    });

    const grid = githubPanel.querySelector('[data-contribution-grid]');
    grid.replaceChildren(...data.contributions.map(day => {
      const cell = document.createElement('span');
      cell.className = 'contribution-day';
      cell.dataset.level = clamp(Number(day.level) || 0, 0, 4);
      cell.title = `${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`;
      return cell;
    }));
    grid.setAttribute('aria-label', `${values.contributions} GitHub contributions in the last year`);
    githubPanel.dataset.state = stale ? 'stale' : 'ready';
    githubPanel.querySelector('[data-github-status]').textContent = stale
      ? 'Showing cached data · live refresh unavailable'
      : `Live data · updated ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  function normalizeLeetcode(payload) {
    const rows = payload.submitStats?.acSubmissionNum;
    if (!Array.isArray(rows)) throw new Error('Unexpected LeetCode response');
    const counts = Object.fromEntries(rows.map(item => [item.difficulty.toLowerCase(), Number(item.count) || 0]));
    return {
      total: counts.all || 0,
      easy: counts.easy || 0,
      medium: counts.medium || 0,
      hard: counts.hard || 0,
    };
  }

  function renderLeetcode(data, stale = false) {
    leetcodePanel.querySelector('[data-leetcode-total]').textContent = Number(data.total).toLocaleString();
    const maxDifficulty = Math.max(data.easy, data.medium, data.hard, 1);
    ['easy', 'medium', 'hard'].forEach(difficulty => {
      const row = leetcodePanel.querySelector(`[data-difficulty="${difficulty}"]`);
      row.querySelector('.difficulty-meta strong').textContent = `${data[difficulty]} solved`;
      requestAnimationFrame(() => {
        row.querySelector('.difficulty-track span').style.width = `${(data[difficulty] / maxDifficulty) * 100}%`;
      });
    });
    leetcodePanel.dataset.state = stale ? 'stale' : 'ready';
    leetcodePanel.querySelector('[data-leetcode-status]').textContent = stale
      ? 'Showing cached data · live refresh unavailable'
      : `Live data · updated ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  async function loadGithub() {
    const [profile, repos, calendar] = await Promise.all([
      fetchJson(`https://api.github.com/users/${GITHUB_USER}`),
      fetchJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner&sort=updated`),
      fetchJson(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`),
    ]);
    const contributions = Array.isArray(calendar.contributions) ? calendar.contributions : [];
    if (!contributions.length) throw new Error('No contribution data returned');
    return {
      totalContributions: calendar.total?.lastYear ?? contributions.reduce((sum, day) => sum + day.count, 0),
      publicRepos: profile.public_repos,
      stars: repos.reduce((sum, repo) => sum + (Number(repo.stargazers_count) || 0), 0),
      longestStreak: longestStreak(contributions),
      contributions,
    };
  }

  async function loadLeetcode() {
    const payload = await fetchJson(`https://leetcode-api-pied.vercel.app/user/${LEETCODE_USER}`, 15000);
    return normalizeLeetcode(payload);
  }

  const cached = readCache();
  if (cached?.github) renderGithub(cached.github, Date.now() - cached.cachedAt >= CACHE_TTL);
  if (cached?.leetcode) renderLeetcode(cached.leetcode, Date.now() - cached.cachedAt >= CACHE_TTL);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL) return;

  Promise.allSettled([loadGithub(), loadLeetcode()]).then(([githubResult, leetcodeResult]) => {
    const nextCache = { github: cached?.github, leetcode: cached?.leetcode };

    if (githubResult.status === 'fulfilled') {
      nextCache.github = githubResult.value;
      renderGithub(githubResult.value);
    } else if (cached?.github) {
      renderGithub(cached.github, true);
    } else {
      githubPanel.dataset.state = 'error';
      githubPanel.querySelector('[data-github-status]').textContent = 'Live GitHub data is temporarily unavailable';
    }

    if (leetcodeResult.status === 'fulfilled') {
      nextCache.leetcode = leetcodeResult.value;
      renderLeetcode(leetcodeResult.value);
    } else if (cached?.leetcode) {
      renderLeetcode(cached.leetcode, true);
    } else {
      leetcodePanel.dataset.state = 'error';
      leetcodePanel.querySelector('[data-leetcode-status]').textContent = 'Live LeetCode data is temporarily unavailable';
    }

    if (nextCache.github || nextCache.leetcode) writeCache(nextCache);
  });
})();

/* ======== SCROLL HINT PROGRESS ======== */
(function initScrollHint() {
  const hint = document.querySelector('.scroll-hint-loading');
  const fill = document.querySelector('.scroll-hint-bar-fill');
  if (!hint || !fill) return;

  function update() {
    const h = document.documentElement;
    const scrolled = h.scrollTop || document.body.scrollTop;
    const total = h.scrollHeight - h.clientHeight;
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    fill.style.width = pct + '%';

    // Hide after first scroll
    if (scrolled > 100) {
      hint.classList.remove('active');
    } else {
      hint.classList.add('active');
    }
  }
  lenis.on('scroll', update);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ======== SMOOTH SCROLL FOR ANCHORS ======== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -40, duration: 1.2 });
    });
  });
})();

/* ======== PAGE EXIT TRANSITIONS ======== */
// (For a single-page portfolio this is light — just animate section reveals on scroll)
(function initSectionReveals() {
  gsap.utils.toArray('.section').forEach(section => {
    const heading = section.querySelector('.heading, .contact-heading, .home-kala-logo');
    if (!heading) return;

    if (section.classList.contains('projects-section')) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        height: 0,
        duration: 1,
        ease: 'power3.out',
      });
    } else {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  });
})();

/* ======== EXPERIENCE TELEMETRY DASHBOARD ======== */
(function initExperienceTelemetry() {
  const section = document.querySelector('.experience-section');
  const consoleEl = document.querySelector('.telemetry-console');
  const scrubLine = document.getElementById('scrub-line');
  const nodes = [
    document.getElementById('node-0'),
    document.getElementById('node-1')
  ];
  if (!section || !consoleEl || !scrubLine || !nodes[0]) return;

  const EXPERIENCES = [
    {
      title: "AI/ML Developer Intern",
      company: "Arista Systems Pvt. Ltd.",
      date: "Jun 2025 – Aug 2025",
      metrics: { loss: 0.2180, acc: 82.60, epoch: 50 },
      bullets: [
        "Built a multi-source analytics platform in Python, SQL, and FastAPI ingesting data from 3 heterogeneous pipelines, serving insight queries with sub-2s response for 10M rows.",
        "Improved sales forecast accuracy to 82.6% MAPE using Facebook Prophet with custom seasonality features, directly informing inventory decisions.",
        "Automated routine data pulls and reporting workflows, reducing manual report preparation time by approximately 30%."
      ]
    },
    {
      title: "AI/ML Lead",
      company: "Google Developer Groups (GDG) — Amity University Mumbai",
      date: "Oct 2025 – Present",
      metrics: { loss: 0.0240, acc: 95.40, epoch: 100 },
      bullets: [
        "Designed and owned the AI/ML technical curriculum covering supervised learning, LLM orchestration (LangChain), and RAG pipelines.",
        "Scaled chapter technical engagement from 0 to 250+ students across 3 on-campus events; directly mentored 4 project teams through model selection, evaluation, and deployment."
      ]
    }
  ];

  let activeIndex = -1;
  const dossierContainer = document.getElementById('dossier-content');

  // Helper to load content with text scramble reveal
  function loadDossier(index) {
    if (activeIndex === index) return;
    activeIndex = index;

    // Set active state on nodes and animate scale
    nodes.forEach((n, idx) => {
      if (idx === index) {
        n.classList.add('active');
        // Elastic scale bounce
        gsap.fromTo(n, { attr: { r: 7 } }, { attr: { r: 12 }, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      } else {
        if (n.classList.contains('active')) {
          gsap.to(n, { attr: { r: 7 }, duration: 0.3 });
        }
        n.classList.remove('active');
      }
    });

    const exp = EXPERIENCES[index];
    
    // Build HTML template
    const bulletsHtml = exp.bullets.map(b => `<div class="dossier-bullet">${b}</div>`).join('');
    const newContent = `
      <div class="dossier-header-info">
        <h3 class="dossier-title">${exp.title}</h3>
        <div class="dossier-meta">
          <span>${exp.company}</span>
          <span>${exp.date}</span>
        </div>
      </div>
      <div class="dossier-bullet-list">
        ${bulletsHtml}
      </div>
    `;

    // Scramble effect
    scrambleText(dossierContainer, newContent);

    // Animate dashboard numbers
    animateMetricValue('loss-val', exp.metrics.loss, 4);
    animateMetricValue('acc-val', exp.metrics.acc, 2, '%');
    animateMetricValue('epoch-val', exp.metrics.epoch, 0, '/100');
    
    // Animate GPU load a bit dynamically to look alive
    const targetGpu = index === 0 ? 68.2 : index === 1 ? 84.7 : 98.4;
    animateMetricValue('gpu-load', targetGpu, 1, '%');
  }

  // Text Scramble Reveal function
  function scrambleText(targetEl, finalHtml) {
    const chars = '0123456789ABCDEF[]/_$#@%+-*';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = finalHtml;
    
    // Get plain text length
    const plainText = tempDiv.textContent || '';
    const length = plainText.length;
    
    let frame = 0;
    const maxFrames = 12;
    const interval = 16; // 60fps-ish
    
    targetEl.innerHTML = '';
    
    // Show scrambled characters
    const timer = setInterval(() => {
      frame++;
      let currentText = '';
      for (let i = 0; i < length; i++) {
        if (plainText[i] === '\n' || plainText[i] === ' ') {
          currentText += plainText[i];
        } else if (Math.random() < frame / maxFrames) {
          // Resolve letter
          currentText += plainText[i];
        } else {
          // Scrambled letter
          currentText += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      // Render text (plain text for scramble state, then final html structure)
      if (frame >= maxFrames) {
        clearInterval(timer);
        targetEl.innerHTML = finalHtml;
      } else {
        targetEl.textContent = currentText;
      }
    }, interval);
  }

  // Smooth number counting animation
  function animateMetricValue(id, targetVal, decimals = 2, suffix = '') {
    const el = document.getElementById(id);
    if (!el) return;

    let currentVal = parseFloat(el.dataset.current || '0');
    if (isNaN(currentVal)) currentVal = 0;

    const obj = { value: currentVal };
    gsap.to(obj, {
      value: targetVal,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => {
        el.dataset.current = obj.value;
        if (decimals === 0) {
          el.textContent = Math.round(obj.value) + suffix;
        } else {
          el.textContent = obj.value.toFixed(decimals) + suffix;
        }
      }
    });
  }

  // Initialize dossier with node 0 info
  loadDossier(0);

  // Scroll Trigger coordinates map
  const coordinates = [
    { x: 200, index: 0 },
    { x: 600, index: 1 }
  ];

  // Pin section and scrub vertical line
  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      id: 'experience-trigger',
      start: 'top top',
      end: '+=800',
      pin: true,
      scrub: 1.0,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Map scroll progress (0 to 1) to chart x-coordinates (200 to 600)
        const startX = 200;
        const endX = 600;
        const currentX = startX + self.progress * (endX - startX);
        
        scrubLine.setAttribute('x1', currentX);
        scrubLine.setAttribute('x2', currentX);

        // Find closest checkpoint node
        let closestIndex = 0;
        let minDiff = Infinity;
        coordinates.forEach(coord => {
          const diff = Math.abs(currentX - coord.x);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = coord.index;
          }
        });
        
        loadDossier(closestIndex);
      }
    }
  });

  // Node clicks to jump scroll position
  nodes.forEach((node, index) => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      const trigger = ScrollTrigger.getById('experience-trigger');
      if (trigger) {
        const scrollPos = trigger.start + (index / (nodes.length - 1)) * (trigger.end - trigger.start);
        lenis.scrollTo(scrollPos, { duration: 1.0 });
      }
    });
  });
})();

/* ======== CONSOLE EASTER EGG ======== */
console.log('%cSB', 'font-size:80px;font-weight:700;color:#EB0004;font-family:monospace;');
console.log('%cSujal Barwad — AI Engineer · Built with Kala-inspired design DNA', 'font-family:monospace;font-size:11px;color:#888;');
console.log('%cPress [H] to reveal all hover annotations', 'font-family:monospace;font-size:10px;color:#555;');
