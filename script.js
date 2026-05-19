/* ======== SMOOTH SCROLL (LENIS) ======== */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ======== UTILS ======== */
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (min, max) => Math.random() * (max - min) + min;

/* ======== PAGE LOADER ======== */
(function initLoader() {
  const loader = document.getElementById('loader');
  const barFill = document.getElementById('loaderBarFill');
  const percentEl = document.getElementById('loaderPercent');
  if (!loader) return;

  let progress = 0;
  const statusTexts = ['Initializing experience', 'Loading assets', 'Preparing interface', 'Almost ready'];

  function tick() {
    if (progress >= 100) {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      startHeroAnimation();
      return;
    }
    const increment = Math.random() * 8 + 2;
    progress = Math.min(progress + increment, 100);
    barFill.style.width = progress + '%';
    percentEl.textContent = Math.floor(progress) + '%';

    const statusIndex = Math.min(Math.floor(progress / 30), statusTexts.length - 1);
    const statusEl = loader.querySelector('.loader-status');
    if (statusEl) statusEl.textContent = statusTexts[statusIndex];

    setTimeout(tick, Math.random() * 200 + 120);
  }

  window.addEventListener('load', () => {
    setTimeout(tick, 300);
  });
  document.body.style.overflow = 'hidden';
})();

/* ======== HERO LETTER ANIMATION ======== */
function startHeroAnimation() {
  const title = document.getElementById('heroTitle');
  const subtitle = document.getElementById('heroSubtitle');
  const desc = document.getElementById('heroDesc');
  if (!title) return;

  function splitChars(el) {
    const text = el.textContent;
    el.innerHTML = '';
    [...text].forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      el.appendChild(span);
    });
  }

  splitChars(title);
  if (subtitle) splitChars(subtitle);
  if (desc) splitChars(desc);

  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

  function animateChars(els, delay, charDelay, dur) {
    els.forEach((span, i) => {
      span.style.transition = `opacity ${dur}ms ${ease}, filter ${dur}ms ${ease}, transform ${dur}ms ${ease}`;
      span.style.transitionDelay = `${delay + i * charDelay}ms`;
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        els.forEach(span => {
          span.style.opacity = '1';
          span.style.filter = 'blur(0)';
          span.style.transform = 'translateY(0)';
        });
      });
    });
  }

  const titleChars = title.querySelectorAll('.char');
  animateChars(titleChars, 0, 30, 500);

  if (subtitle) {
    const subChars = subtitle.querySelectorAll('.char');
    animateChars(subChars, titleChars.length * 30 + 60, 25, 400);
  }

  if (desc) {
    const subLen = subtitle ? subtitle.querySelectorAll('.char').length : 0;
    const descChars = desc.querySelectorAll('.char');
    animateChars(descChars, (titleChars.length + subLen) * 25 + 120, 10, 300);
  }
}

/* ======== CUSTOM CURSOR ======== */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mx = 0, my = 0;
  let fx = 0, fy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateFollower() {
    fx = lerp(fx, mx, 0.12);
    fy = lerp(fy, my, 0.12);
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('[data-cursor="hover"], a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
})();

/* ======== HERO LETTER ANIMATION ======== */
(function initHeroAnimation() {
  const title = document.getElementById('heroTitle');
  const subtitle = document.getElementById('heroSubtitle');
  const desc = document.getElementById('heroDesc');
  if (!title) return;

  function splitChars(el) {
    const text = el.textContent;
    el.innerHTML = '';
    [...text].forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      el.appendChild(span);
    });
  }

  splitChars(title);
  if (subtitle) splitChars(subtitle);

  const loaderDelay = 800;
  const charDelay = 30;
  const duration = 600;
  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

  const titleChars = title.querySelectorAll('.char');
  titleChars.forEach((span, i) => {
    span.style.transition = `opacity ${duration}ms ${ease}, filter ${duration}ms ${ease}, transform ${duration}ms ${ease}`;
    span.style.transitionDelay = `${loaderDelay + i * charDelay}ms`;
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      titleChars.forEach(span => {
        span.style.opacity = '1';
        span.style.filter = 'blur(0)';
        span.style.transform = 'translateY(0)';
      });
    });
  });

  if (subtitle) {
    const subChars = subtitle.querySelectorAll('.char');
    const subStart = loaderDelay + titleChars.length * charDelay + 100;
    subChars.forEach((span, i) => {
      span.style.transition = `opacity ${duration}ms ${ease}, filter ${duration}ms ${ease}, transform ${duration}ms ${ease}`;
      span.style.transitionDelay = `${subStart + i * charDelay}ms`;
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        subChars.forEach(span => {
          span.style.opacity = '1';
          span.style.filter = 'blur(0)';
          span.style.transform = 'translateY(0)';
        });
      });
    });
  }

  if (desc) {
    const descDelay = loaderDelay + (titleChars.length + (subtitle ? subtitle.querySelectorAll('.char').length : 0)) * charDelay + 200;
    desc.style.transition = `opacity 800ms ${ease}, transform 800ms ${ease}`;
    desc.style.transitionDelay = `${descDelay}ms`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        desc.style.opacity = '1';
        desc.style.transform = 'translateY(0)';
      });
    });
  }
})();

/* ======== PARTICLE NETWORK ======== */
(function initParticleNetwork() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let mouse = { x: null, y: null };
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
  }

  class Particle {
    constructor() {
      const rect = canvas.parentElement.getBoundingClientRect();
      this.w = rect.width;
      this.h = rect.height;
      this.x = Math.random() * this.w;
      this.y = Math.random() * this.h;
      this.vx = rand(-0.3, 0.3);
      this.vy = rand(-0.3, 0.3);
      this.r = rand(0.5, 1.8);
      this.opacity = rand(0.2, 0.5);
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          this.vx += (dx / dist) * force * 0.015;
          this.vy += (dy / dist) * force * 0.015;
        }
      }

      this.vx *= 0.993;
      this.vy *= 0.993;

      if (this.x < -10) this.x = this.w + 10;
      if (this.x > this.w + 10) this.x = -10;
      if (this.y < -10) this.y = this.h + 10;
      if (this.y > this.h + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const area = rect.width * rect.height;
    const count = Math.min(Math.floor(area / 7000), 140);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = dx * dx + dy * dy;
        if (dist < maxDist * maxDist) {
          const d = Math.sqrt(dist);
          const opacity = (1 - d / maxDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    const rect = canvas.parentElement.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      dpr = window.devicePixelRatio || 1;
      resize();
      initParticles();
    }, 150);
  });

  const hero = canvas.parentElement;
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
})();

/* ======== SKILLS CONSTELLATION ======== */
(function initSkillsConstellation() {
  const canvas = document.getElementById('skillsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const skills = [
    { name: 'PyTorch', x: 0.12, y: 0.3, group: 0 },
    { name: 'Scikit-learn', x: 0.28, y: 0.18, group: 0 },
    { name: 'RAG', x: 0.18, y: 0.6, group: 0 },
    { name: 'Vector Quant.', x: 0.32, y: 0.5, group: 0 },
    { name: 'MLOps', x: 0.42, y: 0.32, group: 0 },
    { name: 'CI/CD', x: 0.5, y: 0.15, group: 0 },
    { name: 'Pandas', x: 0.55, y: 0.4, group: 1 },
    { name: 'NumPy', x: 0.62, y: 0.2, group: 1 },
    { name: 'SQL', x: 0.68, y: 0.5, group: 1 },
    { name: 'Tableau', x: 0.52, y: 0.65, group: 1 },
    { name: 'Forecasting', x: 0.72, y: 0.32, group: 1 },
    { name: 'Docker', x: 0.82, y: 0.18, group: 2 },
    { name: 'Celery', x: 0.88, y: 0.45, group: 2 },
    { name: 'Redis', x: 0.78, y: 0.62, group: 2 },
    { name: 'FastAPI', x: 0.92, y: 0.28, group: 2 },
    { name: 'Azure', x: 0.85, y: 0.72, group: 2 },
    { name: 'Git', x: 0.72, y: 0.78, group: 2 },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [1, 3], [1, 4], [2, 3], [3, 4], [4, 5],
    [5, 6], [5, 7], [6, 7], [6, 9], [7, 10], [8, 9], [8, 10],
    [10, 11], [11, 12], [11, 14], [12, 13], [12, 15], [13, 16], [14, 15],
    [4, 6], [8, 11], [13, 16],
  ];

  const adjacency = skills.map((_, i) =>
    connections.filter(c => c[0] === i || c[1] === i).map(c => c[0] === i ? c[1] : c[0])
  );

  const groupColors = ['#ffffff', '#9ba1a5', '#707070'];
  let nodes = [];
  let animProgress = 0;
  let isVisible = false;
  let dpr = window.devicePixelRatio || 1;
  let w = 0, h = 0;

  let dragIdx = -1;
  let dragOffsetX = 0, dragOffsetY = 0;
  const springStrength = 0.08;
  const springDamping = 0.85;
  const hitRadius = 'ontouchstart' in window ? 40 : 28;
  const maxPullDist = 80;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = skills.map(s => ({
      x: s.x * w,
      y: s.y * h,
      homeX: s.x * w,
      homeY: s.y * h,
      vx: 0, vy: 0,
      name: s.name,
      group: s.group,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const p = Math.min(animProgress, 1);

    connections.forEach(([a, b], i) => {
      const cp = Math.max(0, Math.min(1, (p - i * 0.025) * 2.5));
      if (cp <= 0 || !nodes[a] || !nodes[b]) return;
      const isHighlighted = dragIdx >= 0 && (a === dragIdx || b === dragIdx);
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y);
      ctx.lineTo(
        nodes[a].x + (nodes[b].x - nodes[a].x) * cp,
        nodes[a].y + (nodes[b].y - nodes[a].y) * cp
      );
      ctx.strokeStyle = isHighlighted
        ? `rgba(255, 255, 255, ${0.18 * cp})`
        : `rgba(255, 255, 255, ${0.06 * cp})`;
      ctx.lineWidth = isHighlighted ? 1.2 : 0.8;
      ctx.stroke();
    });

    nodes.forEach((node, i) => {
      const np = Math.max(0, Math.min(1, (p - i * 0.035) * 2));
      if (np <= 0) return;
      const isDragged = i === dragIdx;
      const isConnected = dragIdx >= 0 && adjacency[dragIdx].includes(i);
      const radius = isDragged ? 22 : (isConnected ? 18 : 14);
      const dotSize = isDragged ? 4 : (isConnected ? 3 : 2.5);

      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
      if (isDragged) {
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else if (isConnected) {
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${0.08 * np})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, dotSize * np, 0, Math.PI * 2);
      ctx.fillStyle = groupColors[node.group];
      ctx.globalAlpha = isDragged ? 1 : np;
      ctx.fill();

      ctx.font = isDragged ? '11px "Fragment Mono", monospace' : '10px "Fragment Mono", monospace';
      ctx.fillStyle = groupColors[node.group];
      ctx.textAlign = 'center';
      ctx.globalAlpha = isDragged ? 1 : np * 0.8;
      ctx.fillText(node.name, node.x, node.y - (isDragged ? 18 : 14));
      ctx.globalAlpha = 1;
    });
  }

  function updatePhysics() {
    if (dragIdx < 0) return;
    const dragged = nodes[dragIdx];
    adjacency[dragIdx].forEach(ni => {
      const node = nodes[ni];
      const dx = dragged.x - node.homeX;
      const dy = dragged.y - node.homeY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pull = Math.min(dist, maxPullDist);
      const angle = Math.atan2(dy, dx);
      const targetX = node.homeX + Math.cos(angle) * pull * springStrength * 4;
      const targetY = node.homeY + Math.sin(angle) * pull * springStrength * 4;
      node.vx += (targetX - node.x) * springStrength;
      node.vy += (targetY - node.y) * springStrength;
      node.vx *= springDamping;
      node.vy *= springDamping;
      node.x += node.vx;
      node.y += node.vy;
    });
  }

  function returnToHome() {
    nodes.forEach(node => {
      if (dragIdx >= 0 && nodes[dragIdx] === node) return;
      node.vx += (node.homeX - node.x) * 0.04;
      node.vy += (node.homeY - node.y) * 0.04;
      node.vx *= 0.88;
      node.vy *= 0.88;
      node.x += node.vx;
      node.y += node.vy;
    });
  }

  function animate() {
    if (isVisible && animProgress < 1.5) animProgress += 0.012;
    updatePhysics();
    if (dragIdx < 0) returnToHome();
    draw();
    requestAnimationFrame(animate);
  }

  function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function hitTest(px, py) {
    for (let i = 0; i < nodes.length; i++) {
      const dx = px - nodes[i].x;
      const dy = py - nodes[i].y;
      if (dx * dx + dy * dy < hitRadius * hitRadius) return i;
    }
    return -1;
  }

  function onPointerDown(e) {
    const pos = getPointerPos(e);
    const idx = hitTest(pos.x, pos.y);
    if (idx < 0) return;
    dragIdx = idx;
    dragOffsetX = nodes[idx].x - pos.x;
    dragOffsetY = nodes[idx].y - pos.y;
    canvas.style.cursor = 'grabbing';
    e.preventDefault();
  }

  function onPointerMove(e) {
    const pos = getPointerPos(e);
    if (dragIdx >= 0) {
      nodes[dragIdx].x = pos.x + dragOffsetX;
      nodes[dragIdx].y = pos.y + dragOffsetY;
      nodes[dragIdx].vx = 0;
      nodes[dragIdx].vy = 0;
    } else {
      canvas.style.cursor = hitTest(pos.x, pos.y) >= 0 ? 'grab' : 'default';
    }
  }

  function onPointerUp() {
    dragIdx = -1;
    canvas.style.cursor = 'default';
  }

  canvas.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);

  resize();
  animate();

  window.addEventListener('resize', () => {
    dpr = window.devicePixelRatio || 1;
    resize();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isVisible) isVisible = true;
    });
  }, { threshold: 0.25 });
  observer.observe(canvas.parentElement);
})();

/* ======== SCROLL REVEAL ======== */
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach(el => observer.observe(el));
})();

/* ======== STAT COUNTERS ======== */
(function initStatCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target'));
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));

  function animateCounter(el, target) {
    const duration = 1800;
    const start = performance.now();
    const decimals = (target.toString().split('.')[1] || '').length;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = (eased * target).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }
})();

/* ======== LEETCODE STATS ======== */
(function initLeetCodeStats() {
  const totalEl = document.getElementById('lcTotal');
  const easyEl = document.getElementById('lcEasy');
  const mediumEl = document.getElementById('lcMedium');
  const hardEl = document.getElementById('lcHard');
  const easyBar = document.getElementById('lcEasyBar');
  const mediumBar = document.getElementById('lcMediumBar');
  const hardBar = document.getElementById('lcHardBar');
  if (!totalEl) return;

  fetch('https://alfa-leetcode-api.onrender.com/KaiSuke/solved')
    .then(res => {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })
    .then(data => {
      const total = data.solvedProblem || 0;
      const easy = data.easySolved || 0;
      const medium = data.mediumSolved || 0;
      const hard = data.hardSolved || 0;

      totalEl.textContent = total;
      easyEl.textContent = easy;
      mediumEl.textContent = medium;
      hardEl.textContent = hard;

      const max = Math.max(easy, medium, hard, 1);
      requestAnimationFrame(() => {
        easyBar.style.width = (easy / max * 100) + '%';
        mediumBar.style.width = (medium / max * 100) + '%';
        hardBar.style.width = (hard / max * 100) + '%';
      });
    })
    .catch(() => {
      totalEl.textContent = '58';
      easyEl.textContent = '27';
      mediumEl.textContent = '29';
      hardEl.textContent = '2';
      requestAnimationFrame(() => {
        easyBar.style.width = (27 / 29 * 100) + '%';
        mediumBar.style.width = '100%';
        hardBar.style.width = (2 / 29 * 100) + '%';
      });
    });
})();

/* ======== GITHUB CONTRIBUTION CALENDAR ======== */
(function initGitHubCalendar() {
  const grid = document.getElementById('ghCalendar');
  const totalEl = document.getElementById('ghTotal');
  const commitsEl = document.getElementById('ghCommits');
  const reposEl = document.getElementById('ghRepos');
  if (!grid) return;

  const API = 'https://github-contributions-api.jogruber.de/v4/sujal-b';

  function renderFallback() {
    totalEl.textContent = '299';
    commitsEl.textContent = '150';
    reposEl.textContent = '12';
    var fallback = [
      {d:'2025-01-05',c:3,l:1},{d:'2025-01-06',c:1,l:1},{d:'2025-01-08',c:2,l:1},
      {d:'2025-01-12',c:4,l:1},{d:'2025-01-15',c:1,l:1},{d:'2025-01-20',c:3,l:1},
      {d:'2025-01-25',c:1,l:1},{d:'2025-02-02',c:2,l:1},{d:'2025-02-09',c:1,l:1},
      {d:'2025-02-14',c:3,l:1},{d:'2025-02-23',c:1,l:1},{d:'2025-03-01',c:2,l:1},
      {d:'2025-03-08',c:1,l:1},{d:'2025-03-12',c:5,l:2},{d:'2025-03-16',c:1,l:1},
      {d:'2025-03-21',c:2,l:1},{d:'2025-03-28',c:1,l:1},{d:'2025-04-01',c:3,l:1},
      {d:'2025-04-06',c:4,l:1},{d:'2025-04-12',c:2,l:1},{d:'2025-04-20',c:1,l:1},
      {d:'2025-04-27',c:3,l:1},{d:'2025-05-04',c:1,l:1},{d:'2025-05-11',c:2,l:1},
      {d:'2025-05-18',c:4,l:1},{d:'2025-05-25',c:1,l:1},{d:'2025-06-01',c:3,l:1},
      {d:'2025-06-08',c:2,l:1},{d:'2025-06-11',c:1,l:1},{d:'2025-06-15',c:5,l:2},
      {d:'2025-06-22',c:1,l:1},{d:'2025-06-29',c:3,l:1},{d:'2025-07-06',c:2,l:1},
      {d:'2025-07-13',c:4,l:1},{d:'2025-07-20',c:1,l:1},{d:'2025-07-27',c:3,l:1},
      {d:'2025-08-03',c:2,l:1},{d:'2025-08-10',c:6,l:2},{d:'2025-08-14',c:8,l:3},
      {d:'2025-08-18',c:3,l:1},{d:'2025-08-23',c:2,l:1},{d:'2025-08-25',c:1,l:1},
      {d:'2025-09-01',c:4,l:1},{d:'2025-09-05',c:2,l:1},{d:'2025-09-09',c:1,l:1},
      {d:'2025-09-15',c:3,l:1},{d:'2025-09-29',c:1,l:1},{d:'2025-11-22',c:2,l:1},
      {d:'2025-12-03',c:8,l:4},{d:'2025-12-04',c:3,l:1},{d:'2025-12-05',c:1,l:1},
      {d:'2025-12-06',c:2,l:1},{d:'2025-12-07',c:3,l:1},{d:'2025-12-08',c:1,l:1},
      {d:'2025-12-09',c:2,l:1},{d:'2025-12-10',c:1,l:1},{d:'2025-12-13',c:3,l:1},
      {d:'2025-12-14',c:1,l:1},{d:'2025-12-15',c:2,l:1},{d:'2025-12-16',c:1,l:1},
      {d:'2025-12-21',c:3,l:1},{d:'2025-12-23',c:1,l:1},{d:'2025-12-25',c:2,l:1},
      {d:'2025-12-29',c:1,l:1},{d:'2025-12-31',c:3,l:1},
      {d:'2026-01-02',c:2,l:1},{d:'2026-01-07',c:1,l:1},{d:'2026-01-10',c:1,l:1},
      {d:'2026-01-11',c:1,l:1},{d:'2026-01-12',c:6,l:2},{d:'2026-01-13',c:1,l:1},
      {d:'2026-01-15',c:1,l:1},{d:'2026-01-17',c:1,l:1},{d:'2026-01-20',c:5,l:2},
      {d:'2026-01-22',c:1,l:1},{d:'2026-01-23',c:1,l:1},{d:'2026-01-25',c:1,l:1},
      {d:'2026-01-27',c:2,l:1},{d:'2026-01-29',c:1,l:1},{d:'2026-02-02',c:1,l:1},
      {d:'2026-02-09',c:1,l:1},{d:'2026-02-14',c:1,l:1},{d:'2026-02-18',c:3,l:1},
      {d:'2026-02-23',c:1,l:1},{d:'2026-02-26',c:1,l:1},{d:'2026-02-28',c:2,l:1},
      {d:'2026-03-06',c:1,l:1},{d:'2026-03-07',c:3,l:1},{d:'2026-03-08',c:1,l:1},
      {d:'2026-03-09',c:8,l:4},{d:'2026-03-10',c:1,l:1},{d:'2026-03-11',c:1,l:1},
      {d:'2026-03-12',c:6,l:4},{d:'2026-03-13',c:1,l:1},{d:'2026-03-16',c:2,l:1},
      {d:'2026-03-21',c:1,l:1},{d:'2026-03-23',c:1,l:1},{d:'2026-03-28',c:3,l:1},
      {d:'2026-03-29',c:1,l:1},{d:'2026-03-30',c:1,l:1},{d:'2026-03-31',c:2,l:1},
      {d:'2026-04-01',c:1,l:1},{d:'2026-04-02',c:1,l:1},{d:'2026-04-03',c:1,l:1},
      {d:'2026-04-04',c:1,l:1},{d:'2026-04-05',c:1,l:1},{d:'2026-04-06',c:4,l:3},
      {d:'2026-04-07',c:3,l:2},{d:'2026-04-08',c:2,l:2},{d:'2026-04-20',c:1,l:1},
      {d:'2026-04-21',c:2,l:2},{d:'2026-04-22',c:1,l:1},{d:'2026-04-23',c:1,l:1},
      {d:'2026-04-25',c:1,l:1},{d:'2026-04-26',c:1,l:1},{d:'2026-04-27',c:1,l:1},
      {d:'2026-04-29',c:1,l:1},{d:'2026-05-04',c:1,l:1},{d:'2026-05-05',c:1,l:1},
      {d:'2026-05-06',c:5,l:4},{d:'2026-05-07',c:1,l:1},{d:'2026-05-08',c:1,l:1},
      {d:'2026-05-10',c:6,l:4},{d:'2026-05-11',c:4,l:4}
    ];
    var sorted = fallback.map(function(f) { return { date: f.d, count: f.c, level: f.l }; });
    sorted.sort(function(a, b) { return a.date.localeCompare(b.date); });
    var firstDate = new Date(sorted[0].date + 'T00:00:00');
    var startDay = firstDate.getDay();
    var padded = [];
    for (var i = 0; i < startDay; i++) {
      var dd = new Date(firstDate);
      dd.setDate(dd.getDate() - (startDay - i));
      padded.push({ date: dd.toISOString().split('T')[0], count: 0, level: 0, isPadding: true });
    }
    var allDays = padded.concat(sorted);
    allDays.forEach(function(day) {
      var el = document.createElement('div');
      el.className = 'github-day';
      var lv = day.level || 0;
      el.setAttribute('data-level', lv);
      if (!day.isPadding) {
        var dt = new Date(day.date + 'T00:00:00');
        var fmt = dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        var c = day.count || 0;
        el.title = c === 0 ? 'No contributions on ' + fmt : c + ' contribution' + (c !== 1 ? 's' : '') + ' on ' + fmt;
      }
      grid.appendChild(el);
    });
    var sc = grid.closest('.github-calendar-scroll');
    if (sc) requestAnimationFrame(function() { sc.scrollLeft = sc.scrollWidth; });
  }

  fetch(API)
    .then(function(res) {
      if (!res.ok) throw new Error('API ' + res.status);
      return res.json();
    })
    .then(function(data) {
      var contributions = data.contributions || [];
      var totalObj = data.total || {};
      var total = Object.values(totalObj).reduce(function(s, v) { return s + v; }, 0);
      totalEl.textContent = total;

      var sorted = contributions.slice().sort(function(a, b) { return a.date.localeCompare(b.date); });

      var firstDate = new Date(sorted[0].date + 'T00:00:00');
      var startDay = firstDate.getDay();
      var padded = [];
      for (var i = 0; i < startDay; i++) {
        var d = new Date(firstDate);
        d.setDate(d.getDate() - (startDay - i));
        padded.push({ date: d.toISOString().split('T')[0], count: 0, level: 0, isPadding: true });
      }
      var allDays = padded.concat(sorted);

      allDays.forEach(function(day) {
        var el = document.createElement('div');
        el.className = 'github-day';
        var lv = day.level || 0;
        el.setAttribute('data-level', lv);

        if (!day.isPadding) {
          var date = new Date(day.date + 'T00:00:00');
          var formatted = date.toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
          });
          var count = day.count || 0;
          el.title = count === 0
            ? 'No contributions on ' + formatted
            : count + ' contribution' + (count !== 1 ? 's' : '') + ' on ' + formatted;
        }
        grid.appendChild(el);
      });

      var scrollContainer = grid.closest('.github-calendar-scroll');
      if (scrollContainer) {
        requestAnimationFrame(function() { scrollContainer.scrollLeft = scrollContainer.scrollWidth; });
      }

      fetch('https://api.github.com/search/commits?q=author:sujal-b', { headers: { Accept: 'application/vnd.github.cloak-preview+json' } })
        .then(function(r) { return r.json(); })
        .then(function(d) { commitsEl.textContent = d.total_count || 0; })
        .catch(function() { commitsEl.textContent = '150'; });

      fetch('https://api.github.com/users/sujal-b')
        .then(function(r) { return r.json(); })
        .then(function(u) { reposEl.textContent = u.public_repos || 0; })
        .catch(function() { reposEl.textContent = '12'; });
    })
    .catch(function() {
      renderFallback();
    });
})();

/* ======== SMOOTH SCROLL ======== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        lenis.scrollTo(target, { offset: -40 });
      }
    });
  });
})();

/* ======== ACTIVE NAV ======== */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.hero-nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
})();

/* ======== LIQUID DISTORTION (HERO) ======== */
(function initLiquidDistortion() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = canvas.parentElement;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
  let time = 0;

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uIntensity;

    // Simplex-like noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m * m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;

      // Mouse influence — distorts UVs based on distance to cursor
      float dist = distance(uv, uMouse);
      float influence = smoothstep(0.5, 0.0, dist);

      // Liquid warp
      float noiseX = snoise(vec2(uv.x * 3.0 + uTime * 0.15, uv.y * 3.0 + uTime * 0.1)) * 0.02;
      float noiseY = snoise(vec2(uv.x * 3.0 - uTime * 0.1, uv.y * 3.0 + uTime * 0.15)) * 0.02;

      // Mouse-driven distortion
      float mouseNoiseX = snoise(vec2(uv.x * 5.0 + uTime * 0.3, uv.y * 5.0) + uMouse * 3.0) * 0.04 * influence;
      float mouseNoiseY = snoise(vec2(uv.x * 5.0, uv.y * 5.0 + uTime * 0.3) + uMouse * 3.0) * 0.04 * influence;

      uv.x += (noiseX + mouseNoiseX) * uIntensity;
      uv.y += (noiseY + mouseNoiseY) * uIntensity;

      // Chromatic aberration for liquid feel
      float r = smoothstep(0.0, 1.0, uv.x + (noiseX * 0.5) * uIntensity);
      float g = smoothstep(0.0, 1.0, uv.x);
      float b = smoothstep(0.0, 1.0, uv.x - (noiseX * 0.5) * uIntensity);

      // Monochrome output — grayscale with subtle distortion visibility
      float brightness = (r + g + b) / 3.0;

      // Edge glow near distortion
      float edge = smoothstep(0.0, 0.3, dist) * influence * 0.15;

      // Final monochrome color — subtle white lines on transparent
      float lineStrength = abs(snoise(vec2(uv.x * 8.0 + uTime * 0.05, uv.y * 8.0 - uTime * 0.03)));
      lineStrength = smoothstep(0.45, 0.55, lineStrength) * 0.04;

      // Warp lines that react to mouse
      float warpLine = abs(snoise(vec2(uv.x * 12.0 + uTime * 0.08 + influence * 0.5, uv.y * 12.0)));
      warpLine = smoothstep(0.48, 0.52, warpLine) * 0.06 * (0.3 + influence * 0.7);

      float alpha = (lineStrength + warpLine + edge) * uIntensity;
      gl_FragColor = vec4(vec3(1.0), alpha);
    }
  `;

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: 1.0 }
    },
    transparent: true,
    depthTest: false
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function resize() {
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    material.uniforms.uIntensity.value = Math.min(rect.width / 1440, 1);
  }

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.targetX = (e.clientX - rect.left) / rect.width;
    mouse.targetY = 1.0 - (e.clientY - rect.top) / rect.height;
  });

  container.addEventListener('mouseleave', () => {
    mouse.targetX = 0.5;
    mouse.targetY = 0.5;
  });

  function animate() {
    requestAnimationFrame(animate);
    time += 0.016;

    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    material.uniforms.uTime.value = time;
    material.uniforms.uMouse.value.set(mouse.x, mouse.y);

    renderer.render(scene, camera);
  }

  resize();
  animate();
  window.addEventListener('resize', resize);
})();
