/* Pratibha Devi — Portfolio 2026 · interactions & motion */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const IMG = n => `assets/img/${n}.webp`;
  const pad = n => String(n).padStart(2, '0');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const PROJECTS = window.PROJECTS || [];

  if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------- smooth scroll */
  let lenis = null;
  if (!reduced && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.25, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: .95, touchMultiplier: 1.4 });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    lenis.stop();
  }
  const scrollTo = target => {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: el.id === 'home' ? -200 : -10, duration: 1.8 });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  /* ---------------------------------------------------------- loader */
  const loader = $('#loader');
  const countEl = $('#loaderCount');
  let loaded = false, loadedAt = 0, exited = false;
  const start = performance.now();
  const MIN = 1600;
  const markLoaded = () => { if (!loaded) { loaded = true; loadedAt = performance.now(); } };
  window.addEventListener('load', markLoaded);
  setTimeout(markLoaded, 4500);
  setTimeout(() => exitLoader(), 7000); // never trap anyone behind the loader

  // time-based (not frame-based) so a throttled tab still finishes
  const tickLoader = () => {
    if (exited) return;
    const now = performance.now(), t = now - start;
    let pct = 92 * (1 - Math.exp(-t / 900));
    if (loaded) pct += (100 - pct) * Math.min(1, (now - Math.max(loadedAt, start + MIN - 500)) / 500);
    pct = Math.max(0, Math.min(100, pct));
    countEl.textContent = Math.round(pct);
    if (loaded && t >= MIN && pct >= 99.5) { countEl.textContent = 100; exitLoader(); }
    else setTimeout(tickLoader, 30);
  };
  tickLoader();

  function exitLoader() {
    if (exited) return;
    exited = true;
    document.body.classList.remove('is-loading');
    if (!hasGsap || reduced) {
      loader.remove(); lenis && lenis.start(); intro(); return;
    }
    setTimeout(() => { if (loader.isConnected) { loader.remove(); lenis && lenis.start(); } }, 4000);
    gsap.timeline({ onComplete: () => { loader.remove(); } })
      .to('.loader__count, .loader__name', { y: -20, opacity: 0, duration: .6, ease: 'power2.in' })
      .to('.loader__rays', { rotate: '+=120', scale: 1.4, opacity: 0, duration: 1, ease: 'power2.inOut' }, '<')
      .to('.loader__sun', { scale: .3, duration: .6, ease: 'power3.in' }, '<.2')
      .fromTo(loader, { clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)', duration: 1.2, ease: 'expo.inOut' }, '-=.2')
      .add(() => { lenis && lenis.start(); intro(); }, '-=.75');
  }

  /* ---------------------------------------------------------- hero intro */
  function intro() {
    if (!hasGsap || reduced) return;
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from('.hero__port span', { yPercent: 70, opacity: 0, filter: 'blur(14px)', duration: 1.6, stagger: .09 })
      .fromTo('.hero__folio', { clipPath: 'inset(-20% 100% -40% 0)' }, { clipPath: 'inset(-20% -10% -40% 0)', duration: 2, ease: 'power2.inOut' }, '-=1.1')
      .from('.hero__year, .hero__sub', { y: 24, opacity: 0, filter: 'blur(8px)', duration: 1.2, stagger: .12 }, '-=1.6')
      .add(pzIntro($('.hero .pz')), 0)
      .from('.hero .deco, .hero__beads', { scale: 0, opacity: 0, duration: 1.4, stagger: .08, ease: 'back.out(2)' }, .8)
      .from('.hero__marquee', { yPercent: 100, duration: 1.4 }, .6)
      .from('.nav', { y: -40, opacity: 0, duration: 1.2 }, .9);
  }

  /* ---------------------------------------------------------- layered portrait: assembles itself */
  function pzIntro(root, opts = {}) {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, ...opts });
    if (!root) return tl;
    const q = s => root.querySelectorAll(s);
    tl.from(q('.pz-arch'), { yPercent: 10, opacity: 0, duration: 1.8 }, 0)
      .from(q('.pz-aura'), { opacity: 0, duration: 2.2 }, .2)
      .from(q('.pz-orb, .pz-glow'), { yPercent: 70, scale: .55, opacity: 0, duration: 2.6 }, .25)   // sunrise
      .from(q('.pz-rays'), { scale: .3, rotate: -70, opacity: 0, duration: 2.6 }, .6)
      .from(q('.pz-thread'), { scaleY: 0, transformOrigin: '50% 0%', duration: 1.8, ease: 'power3.inOut' }, .3)
      .from(q('.pz__fig'), { yPercent: 5, opacity: 0, filter: 'blur(14px)', duration: 2.1, clearProps: 'filter' }, .45)
      .from(q('.pz-flower'), { scale: 0, rotate: -200, duration: 2, ease: 'back.out(1.5)' }, 1.3)       // bloom
      .from(q('.pz-leaf'), { scale: 0, rotate: 60, transformOrigin: '96% 62%', duration: 1.7, ease: 'back.out(1.6)' }, 1.55)
      .from(q('.pz-earring'), { yPercent: -70, opacity: 0, duration: 1.8, stagger: .18, ease: 'elastic.out(1, .4)' }, 1.4)
      .from(q('.pz-bead'), { yPercent: -140, opacity: 0, duration: 1.5, stagger: .12 }, 1)
      .from(q('.pz-float, .pz-sparkle'), { scale: 0, opacity: 0, duration: 1.3, stagger: .06, ease: 'back.out(2)' }, 1.2);
    return tl;
  }

  /* ---------------------------------------------------------- nav */
  const nav = $('#nav');
  const glow = $('.nav__glow');
  const navLinks = $$('.nav__link');
  const sections = ['home', 'about', 'services', 'projects', 'contact'].map(id => document.getElementById(id));
  let current = '';

  const setActive = id => {
    if (id === current) return;
    current = id;
    navLinks.forEach(a => a.classList.toggle('is-active', a.dataset.nav === id));
    const link = navLinks.find(a => a.dataset.nav === id);
    if (link) { glow.style.left = link.offsetLeft + 'px'; glow.style.width = link.offsetWidth + 'px'; }
    else glow.style.width = '0px';
  };
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    const mark = innerHeight * .4;
    let id = 'home';
    sections.forEach(s => { if (s && s.getBoundingClientRect().top < mark) id = s.id; });
    setActive(id);
    if (!menu.classList.contains('is-open')) nav.classList.toggle('is-hidden', y > lastY && y > 300);
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { const c = current; current = ''; setActive(c); });
  requestAnimationFrame(() => setActive('home'));

  // mobile menu
  const burger = $('#burger');
  const menu = $('#menu');
  const toggleMenu = open => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) { lenis && lenis.stop(); nav.classList.remove('is-hidden'); }
    else lenis && lenis.start();
  };
  burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('is-open')));

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = $(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (menu.classList.contains('is-open')) { toggleMenu(false); setTimeout(() => scrollTo(target), 350); }
    else scrollTo(target);
  });

  /* ---------------------------------------------------------- cursor, trail, magnetic */
  if (finePointer && !reduced) {
    document.body.classList.add('has-cursor');
    const cur = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, lastSpark = 0, sx = 0, sy = 0;
    addEventListener('pointermove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const now = performance.now();
      if (now - lastSpark > 60 && Math.hypot(mx - sx, my - sy) > 34) { lastSpark = now; sx = mx; sy = my; spark(mx, my); }
    }, { passive: true });
    const loop = () => {
      rx += (mx - rx) * .16; ry += (my - ry) * .16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('pointerover', e => {
      const t = e.target;
      cur.classList.toggle('is-open', !!t.closest('.card.is-active'));
      cur.classList.toggle('is-hover', !!t.closest('a, button, .card, .chip, .work__labels li, input, textarea'));
    });

    function spark(x, y) {
      const s = document.createElement('i');
      s.className = 'spark-trail';
      s.style.left = x + 'px'; s.style.top = y + 'px';
      s.style.color = Math.random() < .35 ? '#C9252C' : '#8E8A83';
      const size = 6 + Math.random() * 9;
      s.style.width = s.style.height = size + 'px';
      document.body.appendChild(s);
      s.animate([
        { transform: 'scale(0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${(Math.random() - .5) * 30}px, ${10 + Math.random() * 26}px) scale(1) rotate(90deg)`, opacity: .9, offset: .35 },
        { transform: `translate(${(Math.random() - .5) * 50}px, ${40 + Math.random() * 30}px) scale(0) rotate(180deg)`, opacity: 0 }
      ], { duration: 1100 + Math.random() * 500, easing: 'cubic-bezier(.22,1,.36,1)' }).onfinish = () => s.remove();
    }

    $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * .22}px, ${y * .3}px)`;
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .8s cubic-bezier(.22,1,.36,1)';
        el.style.transform = '';
        setTimeout(() => { el.style.transition = ''; }, 800);
      });
    });

    // portrait layers drift at different depths with the pointer
    ['.hero', '.about'].forEach(sel => {
      const sec = $(sel), pz = sec && $('.pz', sec);
      if (!pz) return;
      sec.addEventListener('pointermove', e => {
        const r = pz.getBoundingClientRect();
        const mx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * .9)));
        const my = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * .9)));
        pz.style.setProperty('--mx', mx.toFixed(3));
        pz.style.setProperty('--my', my.toFixed(3));
      });
      sec.addEventListener('pointerleave', () => { pz.style.setProperty('--mx', 0); pz.style.setProperty('--my', 0); });
    });
  }

  /* ---------------------------------------------------------- dust motes */
  (() => {
    const c = $('#motes');
    if (!c || reduced) return;
    const ctx = c.getContext('2d');
    let w, h, dpr, motes = [];
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
      const n = innerWidth < 760 ? 22 : 46;
      motes = Array.from({ length: n }, () => make(true));
    };
    const make = anywhere => ({
      x: Math.random() * w, y: anywhere ? Math.random() * h : h + 20,
      r: (.6 + Math.random() * 1.8) * dpr, vy: -(.08 + Math.random() * .3) * dpr,
      ph: Math.random() * Math.PI * 2, sp: .004 + Math.random() * .01,
      red: Math.random() < .16, a: .2 + Math.random() * .5
    });
    let running = true;
    document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) requestAnimationFrame(draw); });
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.ph += m.sp; m.y += m.vy; m.x += Math.sin(m.ph) * .25 * dpr;
        if (m.y < -20) Object.assign(m, make(false));
        const tw = m.a * (.55 + .45 * Math.sin(m.ph * 3));
        ctx.beginPath();
        ctx.fillStyle = m.red ? `rgba(201,37,44,${tw})` : `rgba(91,88,83,${tw * .8})`;
        ctx.shadowBlur = m.red ? 8 * dpr : 0; ctx.shadowColor = 'rgba(201,37,44,.6)';
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    addEventListener('resize', resize);
    resize(); requestAnimationFrame(draw);
  })();

  /* ---------------------------------------------------------- marquees react to scroll speed */
  (() => {
    const anims = $$('.marquee__track').map(t => t.getAnimations()[0]).filter(Boolean);
    if (!anims.length || !lenis) return;
    let rate = 1;
    const loop = () => {
      const target = 1 + Math.min(Math.abs(lenis.velocity || 0) * .12, 5);
      rate += (target - rate) * .06;
      anims.forEach(a => { a.playbackRate = rate; });
      requestAnimationFrame(loop);
    };
    loop();
  })();

  /* ---------------------------------------------------------- scroll reveals */
  const initScroll = () => {
  if (hasGsap && window.ScrollTrigger && !reduced) {
    const st = { start: 'top 86%', toggleActions: 'play none none reverse' };

    $$('[data-reveal]').filter(el => !el.closest('.hero')).forEach(el => {
      gsap.fromTo(el, { y: 40, opacity: 0, filter: 'blur(10px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'expo.out', clearProps: 'filter', scrollTrigger: { trigger: el, ...st } });
    });
    $$('[data-stagger]').forEach(el => {
      gsap.fromTo(el.children, { y: 30, opacity: 0, scale: .9, filter: 'blur(6px)' }, { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, stagger: .07, ease: 'expo.out', clearProps: 'filter', scrollTrigger: { trigger: el, ...st } });
    });
    $$('[data-write]').forEach(el => {
      gsap.fromTo(el, { clipPath: 'inset(-30% 100% -40% 0)' }, { clipPath: 'inset(-30% -10% -40% 0)', duration: 2.2, ease: 'power2.inOut', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } });
    });
    $$('[data-parallax]').forEach(el => {
      const f = parseFloat(el.dataset.parallax);
      gsap.fromTo(el, { y: () => -f * 500 }, { y: () => f * 500, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true } });
    });

    // about: skills panel rises like a tide
    gsap.fromTo('.skills', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.skills', start: 'top 92%' } });
    gsap.fromTo('.timeline li', { x: 30, opacity: 0 }, { x: 0, opacity: 1, stagger: .15, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.timeline', start: 'top 90%' } });
    pzIntro($('.about .pz'), { scrollTrigger: { trigger: '.about__portrait', start: 'top 80%' } });

    // content scene — the orb wakes up
    const scene = gsap.timeline({ scrollTrigger: { trigger: '.content__scene', start: 'top 75%', toggleActions: 'play none none reverse' } });
    scene.from('.content__orb', { scale: .2, opacity: 0, duration: 1.8, ease: 'expo.out' })
      .from('.content__rays', { scale: .4, opacity: 0, duration: 2, ease: 'expo.out' }, '<')
      .from('.content__face', { x: -120, opacity: 0, duration: 1.8, ease: 'expo.out' }, '<.2')
      .from('.content__hand', { x: 160, opacity: 0, duration: 1.8, ease: 'expo.out' }, '<')
      .from('.content__ribbon', { x: -60, y: 40, rotate: -40, opacity: 0, duration: 2, ease: 'expo.out' }, '<.2')
      .from('.content__neuron, .content__moon, .content__cloud1, .content__cloud2, .content__crystal-r, .content__crystal-g, .content__spark', { scale: 0, opacity: 0, stagger: .08, duration: 1.2, ease: 'back.out(1.8)' }, '<.2')
      .fromTo('.content__tag', { '--line': 0, opacity: 0, y: 10 }, { '--line': 1, opacity: 1, y: 0, duration: 1.4, ease: 'expo.out' }, '-=1')
      .from('.content__more', { y: 30, opacity: 0, duration: 1, ease: 'expo.out' }, '<.2');
    gsap.to('.content__rays', { rotate: 120, ease: 'none', scrollTrigger: { trigger: '.content', start: 'top bottom', end: 'bottom top', scrub: 1 } });

    // fan entrance
    gsap.from('.card__face', { y: 260, opacity: 0, duration: 1.6, stagger: { each: .07, from: 'center' }, ease: 'expo.out', clearProps: 'all', scrollTrigger: { trigger: '.fan', start: 'top 80%' } });

    // feelings ripples
    gsap.from('.ripples i', { scale: .3, opacity: 0, stagger: .12, duration: 2, ease: 'expo.out', scrollTrigger: { trigger: '.feelings .ripples', start: 'top 95%' } });

    // contact — two minds reach for each other
    const reach = { trigger: '.connect', start: 'top 85%', end: 'center 45%', scrub: 1.4 };
    gsap.fromTo('.connect__face--l', { xPercent: -40, opacity: 0 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: reach });
    gsap.fromTo('.connect__face--r', { xPercent: 40, opacity: 0 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: reach });
    gsap.fromTo('.connect__hand--l', { xPercent: -45, opacity: 0 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: reach });
    gsap.fromTo('.connect__hand--r', { xPercent: 45, opacity: 0 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: reach });
    gsap.from('.connect__sun', { scale: 0, rotate: -90, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.connect__sun', start: 'top 92%' } });
    gsap.from('.info > div', { x: -30, opacity: 0, stagger: .12, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.info', start: 'top 88%' } });

    // footer — sunrise
    gsap.from('.footer__sun', { yPercent: 40, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: 1.2 } });
    gsap.from('.footer__face', { yPercent: 20, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: 1.2 } });
    gsap.from('.footer__tabs span', { yPercent: 60, stagger: .1, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'top 60%', scrub: 1 } });
    gsap.fromTo('.footer__sign', { clipPath: 'inset(-30% 100% -40% 0)' }, { clipPath: 'inset(-30% -10% -40% 0)', duration: 2.4, ease: 'power2.inOut', scrollTrigger: { trigger: '.footer__sign', start: 'top 95%' } });

    addEventListener('load', () => ScrollTrigger.refresh());
  }
  };

  /* ---------------------------------------------------------- card fan */
  const fanEl = $('#fan');
  const labelsEl = $('#workLabels');
  const fanIndex = $('#fanIndex');
  const N = PROJECTS.length;

  const cardHTML = (p, i) => `
    <div class="card__face">
      <div class="card__top"><span>${pad(i + 1)}</span><span class="card__toggle" aria-hidden="true"></span></div>
      <div class="card__art"><img src="${IMG(p.icon)}" alt="" draggable="false"></div>
      <div class="card__bottom">
        <p class="card__name">${p.name}</p>
        <p class="card__cat">${p.category}</p>
        <div class="card__meta"><span>${p.year} .portfolio</span><span>${pad(i + 1)} ····· ${pad(N)}</span></div>
      </div>
      <span class="card__shine"></span>
    </div>`;

  const cards = PROJECTS.map((p, i) => {
    const c = document.createElement('div');
    c.className = 'card';
    c.setAttribute('role', 'option');
    c.setAttribute('aria-label', `${p.name} — ${p.category}`);
    c.dataset.i = i;
    c.innerHTML = cardHTML(p, i);
    fanEl.appendChild(c);
    return c;
  });
  PROJECTS.forEach((p, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${p.name}</strong><small>${p.category}</small>`;
    li.addEventListener('click', () => fan.go(i));
    labelsEl.appendChild(li);
  });
  const labels = [...labelsEl.children];

  const fan = {
    active: Math.floor(N / 2),
    prevD: [],
    offset(i) { let d = (i - this.active + N) % N; if (d > N / 2) d -= N; return d; },
    layout(instant) {
      // cards spread across the full width on big screens, overlap gently on phones
      const vw = fanEl.clientWidth;
      const cw = cards[0] ? cards[0].offsetWidth : 260;
      const phone = innerWidth <= 760;
      const angle = phone ? 9 : 6;
      // keep the outermost (rotated) cards fully on screen
      const outer = Math.floor(N / 2), rad = outer * angle * Math.PI / 180, sc = 1 - outer * .03;
      const halfRot = (cw * Math.cos(rad) + cw * 1.43 * Math.sin(rad)) / 2 * sc;
      const edge = Math.max(16, vw * .025);
      const spread = phone ? cw * .5 : Math.max(cw * .5, (vw / 2 - halfRot - edge) / outer);
      const arc = cw * (phone ? .05 : .045);
      cards.forEach((c, i) => {
        const d = this.offset(i), a = Math.abs(d);
        const wrapped = this.prevD[i] !== undefined && Math.abs(d - this.prevD[i]) > N / 2;
        const y = d === 0 ? -cw * .1 : a * a * arc;
        const tf = `translate(${(d * spread).toFixed(1)}px, ${y.toFixed(1)}px) rotate(${d * angle}deg) scale(${d === 0 ? 1.08 : 1 - a * .03})`;
        if (wrapped && !instant) {
          c.style.transition = 'none'; c.style.opacity = '0'; c.style.transform = tf;
          requestAnimationFrame(() => requestAnimationFrame(() => { c.style.transition = ''; c.style.opacity = ''; }));
        } else c.style.transform = tf;
        c.style.zIndex = 20 - a;
        c.style.filter = `brightness(${1 - a * .045})`;
        c.classList.toggle('is-active', d === 0);
        c.setAttribute('aria-selected', String(d === 0));
        c.tabIndex = -1;
        this.prevD[i] = d;
      });
      labels.forEach((l, i) => l.classList.toggle('is-active', i === this.active));
      fanIndex.textContent = pad(this.active + 1);
    },
    go(i) { this.active = (i + N) % N; this.layout(); },
    next() { this.go(this.active + 1); },
    prev() { this.go(this.active - 1); }
  };
  $('#fanNext').addEventListener('click', () => fan.next());
  $('#fanPrev').addEventListener('click', () => fan.prev());
  fanEl.tabIndex = 0;
  fanEl.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); fan.next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); fan.prev(); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(fan.active, cards[fan.active]); }
  });

  // drag / swipe
  let downX = null, dragged = false;
  fanEl.addEventListener('pointerdown', e => { downX = e.clientX; dragged = false; });
  addEventListener('pointermove', e => {
    if (downX === null) return;
    const dx = e.clientX - downX;
    if (Math.abs(dx) > 50) { dragged = true; dx < 0 ? fan.next() : fan.prev(); downX = e.clientX; }
  });
  addEventListener('pointerup', () => { downX = null; });
  fanEl.addEventListener('click', e => {
    const c = e.target.closest('.card');
    if (!c || dragged) return;
    const i = +c.dataset.i;
    if (i === fan.active) openProject(i, c); else fan.go(i);
  });
  // shine follows pointer on the active card
  fanEl.addEventListener('pointermove', e => {
    const c = e.target.closest('.card.is-active');
    if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100) + '%');
    c.style.setProperty('--sy', ((e.clientY - r.top) / r.height * 100) + '%');
  });
  addEventListener('resize', () => fan.layout(true));
  fan.layout(true);

  /* ---------------------------------------------------------- project panel */
  const panel = $('#panel');
  const sheet = $('#panelSheet');
  const moods = ['orb-red', 'crystal-grey', 'lotus', 'heart-eye', 'stones', 'eye-grey', 'spiral', 'drop-red', 'leaf', 'diamond', 'neuron', 'flame'];
  let lastFocus = null;

  const projectHTML = (p, i) => {
    const next = PROJECTS[(i + 1) % N];
    const gallery = (p.images && p.images.length)
      ? p.images.map((src, k) => `<figure data-in style="transition-delay:${.1 * k}s"><img class="full" src="${src}" alt="${p.name} — image ${k + 1}" loading="lazy"></figure>`).join('')
      : [`<figure data-in><img class="full" src="${IMG(p.hero)}" alt="" loading="lazy"><figcaption>${p.feeling} · mood</figcaption></figure>`]
        .concat(p.deliverables.slice(0, 4).map((d, k) => `<figure data-in style="transition-delay:${.08 * (k + 1)}s"><img class="mood" src="${IMG(moods[(i * 3 + k) % moods.length])}" alt="" loading="lazy"><figcaption>${d}</figcaption></figure>`)).join('');
    return `
    <div class="pj">
      <div class="pj__bar">
        <p class="pj__crumb">Projects / <b>${p.name}</b></p>
        <button class="pj__close" data-close>Close <i aria-hidden="true">&times;</i></button>
      </div>
      <header class="pj__head">
        <div>
          <p class="pj__num" data-in>${pad(i + 1)} ····· ${pad(N)}</p>
          <h2 class="pj__title script" id="panelTitle" data-in style="transition-delay:.1s">${p.name}</h2>
          <p class="pj__cat" data-in style="transition-delay:.18s">${p.category}</p>
          <p class="pj__intro" data-in style="transition-delay:.26s">${p.intro}</p>
        </div>
        <div class="pj__hero" data-in style="transition-delay:.2s"><img src="${IMG(p.hero)}" alt="${p.feeling} — grain illustration"></div>
      </header>
      <dl class="pj__meta" data-in style="transition-delay:.3s">
        <div><dt>Role</dt><dd>${p.role}</dd></div>
        <div><dt>Year</dt><dd>${p.year}</dd></div>
        <div><dt>Tools</dt><dd>${p.tools.join(', ')}</dd></div>
        <div><dt>Feeling</dt><dd>${p.feeling}</dd></div>
      </dl>
      <section class="pj__story">
        <div data-in style="transition-delay:.35s"><h4><img src="${IMG('icon-mind')}" alt="">The Challenge</h4><p>${p.challenge}</p></div>
        <div data-in style="transition-delay:.42s"><h4><img src="${IMG('icon-insight')}" alt="">The Approach</h4><p>${p.approach}</p></div>
        <div data-in style="transition-delay:.49s"><h4><img src="${IMG('icon-growth')}" alt="">The Outcome</h4><p>${p.outcome}</p></div>
      </section>
      <ul class="pj__del" data-in style="transition-delay:.5s">${p.deliverables.map(d => `<li>${d}</li>`).join('')}</ul>
      <div class="pj__gallery">${gallery}</div>
      <div class="pj__next">
        <button data-goto="${(i + 1) % N}"><small>Next project</small><span class="script">${next.name}</span></button>
        <img src="${IMG(next.icon)}" alt="">
      </div>
    </div>`;
  };

  function openProject(i, originEl) {
    const p = PROJECTS[i];
    if (!p) return;
    lastFocus = document.activeElement;
    if (originEl) {
      const r = originEl.getBoundingClientRect();
      sheet.style.setProperty('--ox', (r.left + r.width / 2) + 'px');
      sheet.style.setProperty('--oy', (r.top + r.height / 2) + 'px');
    }
    sheet.innerHTML = projectHTML(p, i);
    sheet.scrollTop = 0;
    panel.setAttribute('aria-hidden', 'false');
    lenis && lenis.stop();
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('is-open')));
    setTimeout(() => { const b = $('[data-close]', sheet); b && b.focus({ preventScroll: true }); }, 300);
  }
  function closeProject() {
    if (!panel.classList.contains('is-open')) return;
    panel.classList.remove('is-open');
    setTimeout(() => {
      panel.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      if (!indexEl.classList.contains('is-open')) lenis && lenis.start();
      lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
    }, 900);
  }
  sheet.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) return closeProject();
    const g = e.target.closest('[data-goto]');
    if (g) {
      const i = +g.dataset.goto;
      fan.go(i);
      sheet.animate([{ opacity: 1, filter: 'blur(0)' }, { opacity: 0, filter: 'blur(8px)' }], { duration: 450, easing: 'ease-in' }).onfinish = () => {
        sheet.innerHTML = projectHTML(PROJECTS[i], i);
        sheet.scrollTop = 0;
        sheet.animate([{ opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0)' }], { duration: 700, easing: 'cubic-bezier(.22,1,.36,1)' });
      };
    }
  });
  $('.panel__veil').addEventListener('click', closeProject);

  /* ---------------------------------------------------------- all projects */
  const indexEl = $('#index');
  $('#indexGrid').innerHTML = PROJECTS.map((p, i) => `
    <li><button data-open="${i}"><b>${pad(i + 1)}</b><img src="${IMG(p.icon)}" alt=""><strong>${p.name}</strong><small>${p.category} · ${p.year}</small></button></li>`).join('');
  const toggleIndex = open => {
    indexEl.classList.toggle('is-open', open);
    indexEl.setAttribute('aria-hidden', String(!open));
    if (open) { lenis && lenis.stop(); setTimeout(() => $('#indexClose').focus(), 200); }
    else lenis && lenis.start();
  };
  $('#viewAll').addEventListener('click', () => toggleIndex(true));
  $('#indexClose').addEventListener('click', () => toggleIndex(false));
  indexEl.addEventListener('click', e => {
    const b = e.target.closest('[data-open]');
    if (b) { fan.go(+b.dataset.open); openProject(+b.dataset.open, b); }
  });

  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (panel.classList.contains('is-open')) closeProject();
    else if (indexEl.classList.contains('is-open')) toggleIndex(false);
    else if (menu.classList.contains('is-open')) toggleMenu(false);
  });

  /* ---------------------------------------------------------- contact form */
  const chips = $$('.chip');
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => { c.classList.toggle('is-on', c === ch); c.setAttribute('aria-checked', String(c === ch)); });
  }));
  const form = $('#contactForm');
  const note = $('#formNote');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const msg = (f.get('message') || '').trim();
    if (!msg) { note.textContent = 'Please write a short message first.'; form.message.focus(); return; }
    if (f.get('email') && !form.email.checkValidity()) { note.textContent = 'That email address looks incomplete.'; form.email.focus(); return; }
    const reason = $('.chip.is-on').textContent;
    const name = (f.get('name') || '').trim();
    const body = [msg, '', '—', name && `Name: ${name}`, f.get('email') && `Email: ${f.get('email')}`, f.get('phone') && `Phone: ${f.get('phone')}`, f.get('company') && `Company / link: ${f.get('company')}`].filter(Boolean).join('\n');
    const subject = `${reason}${name ? ' — ' + name : ''}`;
    location.href = `mailto:pratibha10121999@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Opening your email app… thank you!';
  });

  // live Hyderabad time
  const ist = $('#ist');
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
  const tick = () => { ist.textContent = fmt.format(new Date()); };
  tick(); setInterval(tick, 20000);

  initScroll();
})();
