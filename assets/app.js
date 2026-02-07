(() => {
  const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // year
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // mega menu click-to-open on desktop
  const navItems = [...document.querySelectorAll('.navItem')];
  navItems.forEach((it) => {
    const a = it.querySelector(':scope > a');
    const mega = it.querySelector('.mega');
    if (!a || !mega) return;
    a.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 1100px)').matches) return;
      e.preventDefault();
      const open = it.classList.toggle('open');
      navItems.forEach((o) => { if (o !== it) o.classList.remove('open'); });
      if (!open) it.classList.remove('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (navItems.some(it => it.contains(e.target))) return;
    navItems.forEach(it => it.classList.remove('open'));
  });

  // mobile nav
  const hamb = document.getElementById('hamb');
  const mob = document.getElementById('mobileNav');
  const mobClose = document.getElementById('mobClose');
  const openMob = () => { if (!mob || !hamb) return; mob.classList.add('open'); hamb.setAttribute('aria-expanded','true'); };
  const closeMob = () => { if (!mob || !hamb) return; mob.classList.remove('open'); hamb.setAttribute('aria-expanded','false'); };
  hamb?.addEventListener('click', () => (mob?.classList.contains('open') ? closeMob() : openMob()));
  mobClose?.addEventListener('click', closeMob);
  mob?.addEventListener('click', (e) => { if (e.target === mob) closeMob(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMob(); });

  // reveal
  const els = [...document.querySelectorAll('[data-reveal]')];
  if (els.length) {
    if (!('IntersectionObserver' in window)) els.forEach(e => e.classList.add('in'));
    else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
      }, { threshold: 0.16 });
      els.forEach(e => io.observe(e));
    }
  }

  // Dark mode
  const modeBtn = document.getElementById('modeBtn');
  const saved = localStorage.getItem('fxab_mode');
  if (saved === 'dark') document.body.classList.add('dark');
  const setLabel = () => { if (!modeBtn) return; modeBtn.textContent = document.body.classList.contains('dark') ? 'Light mode' : 'Dark mode'; };
  setLabel();
  modeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('fxab_mode', document.body.classList.contains('dark') ? 'dark' : 'light');
    setLabel();
  });

  // VanillaTilt
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), { max: 8, speed: 700, glare: true, 'max-glare': 0.22, scale: 1.02 });
  }

  // particles.js
  if (window.particlesJS && document.getElementById('particles')) {
    const isDark = document.body.classList.contains('dark');
    particlesJS('particles', {
      particles: {
        number: { value: window.matchMedia('(max-width: 560px)').matches ? 45 : 75, density: { enable: true, value_area: 920 } },
        color: { value: isDark ? ['#FFFFFF', '#00E5FF'] : ['#00E5FF', '#1E293B'] },
        shape: {
          type: ['circle', 'char'],
          character: { value: ['$', '€', '£', '¥', '1', '0'], font: 'JetBrains Mono', weight: '700', fill: true }
        },
        opacity: { value: isDark ? 0.45 : 0.30, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 150, color: '#00E5FF', opacity: isDark ? 0.18 : 0.10, width: 1 },
        move: { enable: true, speed: 0.6, direction: 'none', out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: false }, resize: true },
        modes: { repulse: { distance: 110, duration: 0.35 } }
      },
      retina_detect: true
    });
  }

  // canvas helper
  function setupCanvasHiDPI(canvas) {
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const W = Math.max(1, Math.floor(r.width));
      const H = Math.max(1, Math.floor(r.height));
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      return { W, H };
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return { ctx, resize };
  }

  // simulated WebSocket feed
  const cards = [...document.querySelectorAll('[data-pair]')];
  const state = new Map();

  function seed(pair) {
    const base = {
      EURUSD: 1.0847,
      GBPUSD: 1.2612,
      USDJPY: 149.32,
      XAUUSD: 2056.8,
      AUDUSD: 0.6589,
      USDCAD: 1.3478,
      BTCUSD: 43195,
      ETHUSD: 2316,
    }[pair] ?? (1 + Math.random());
    const arr = Array.from({ length: 50 }, () => base * (1 + (Math.random() - 0.5) * 0.002));
    state.set(pair, { last: base, ticks: arr, prevClose: base * (1 + (Math.random() - 0.5) * 0.012) });
  }

  function driftAmt(pair) {
    return (
      pair === 'BTCUSD' ? 42 :
      pair === 'ETHUSD' ? 5.2 :
      pair === 'XAUUSD' ? 1.8 :
      pair === 'USDJPY' ? 0.06 :
      pair === 'USDCAD' ? 0.0011 :
      pair === 'AUDUSD' ? 0.0009 :
      0.0012
    );
  }

  function fmt(pair, v) {
    if (pair === 'BTCUSD' || pair === 'ETHUSD') return v.toFixed(0);
    if (pair === 'XAUUSD') return v.toFixed(1);
    if (pair === 'USDJPY') return v.toFixed(2);
    return v.toFixed(5);
  }

  function update(pair) {
    const s = state.get(pair) || (seed(pair), state.get(pair));
    const drift = (Math.random() - 0.5) * driftAmt(pair);
    s.last = s.last + drift;
    s.ticks.shift();
    s.ticks.push(s.last);
  }

  function drawSpark(canvas, arr) {
    if (!canvas) return;
    const { ctx, resize } = setupCanvasHiDPI(canvas);
    const { W, H } = resize();
    ctx.clearRect(0, 0, W, H);
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const pad = 2;
    const step = (W - pad * 2) / (arr.length - 1);

    ctx.beginPath();
    for (let i = 0; i < arr.length; i++) {
      const x = pad + i * step;
      const t = (arr[i] - min) / (max - min || 1);
      const y = pad + (1 - t) * (H - pad * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(30,41,59,.85)';
    if (document.body.classList.contains('dark')) ctx.strokeStyle = 'rgba(255,255,255,.90)';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.90;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function renderCards() {
    cards.forEach((card) => {
      const pair = card.getAttribute('data-pair');
      const s = state.get(pair) || (seed(pair), state.get(pair));
      const priceEl = card.querySelector('[data-price]');
      const chgEl = card.querySelector('[data-chg]');
      const spark = card.querySelector('canvas');

      const chg = ((s.last - s.prevClose) / (s.prevClose || 1)) * 100;
      if (priceEl) priceEl.textContent = fmt(pair, s.last);
      if (chgEl) {
        chgEl.textContent = `${chg >= 0 ? '▲' : '▼'} ${Math.abs(chg).toFixed(2)}%`;
        chgEl.classList.toggle('pos', chg >= 0);
        chgEl.classList.toggle('neg', chg < 0);
      }
      drawSpark(spark, s.ticks);

      card.classList.remove('pulse');
      void card.offsetWidth;
      card.classList.add('pulse');
    });

    document.querySelectorAll('[data-live-dot]')?.forEach(d => d.classList.add('on'));
  }

  if (cards.length) {
    cards.forEach(c => seed(c.getAttribute('data-pair')));
    renderCards();
    setInterval(() => {
      cards.forEach(c => update(c.getAttribute('data-pair')));
      renderCards();
    }, 1200);
  }

  // terminal mock
  const chart = document.getElementById('termChart');
  const depth = document.getElementById('termDepth');
  if (chart && depth) {
    const c1 = setupCanvasHiDPI(chart);
    const c2 = setupCanvasHiDPI(depth);

    let last = 1.084;
    const candles = [];
    function pushCandle() {
      const o = last;
      const delta = (Math.random() - 0.5) * 0.0014;
      const c = o + delta;
      const hi = Math.max(o, c) + Math.random() * 0.0009;
      const lo = Math.min(o, c) - Math.random() * 0.0009;
      last = c;
      candles.push({ o, c, hi, lo });
      if (candles.length > 72) candles.shift();
    }
    for (let i = 0; i < 56; i++) pushCandle();

    function drawCandles() {
      const { ctx, resize } = c1;
      const { W, H } = resize();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(0,0,0,.12)';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(255,255,255,.10)';
      for (let i = 1; i < 6; i++) {
        const y = (H / 6) * i;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      const min = Math.min(...candles.map(x => x.lo));
      const max = Math.max(...candles.map(x => x.hi));
      const padX = 10, padY = 12;
      const usableW = W - padX * 2;
      const usableH = H - padY * 2;
      const cw = usableW / candles.length;
      const yOf = (p) => {
        const t = (p - min) / (max - min || 1);
        return padY + (1 - t) * usableH;
      };

      for (let i = 0; i < candles.length; i++) {
        const x = padX + i * cw + cw * 0.5;
        const w = Math.max(3, cw * 0.55);
        const cd = candles[i];
        const up = cd.c >= cd.o;
        const col = up ? 'rgba(0,217,163,1)' : 'rgba(239,68,68,1)';

        ctx.strokeStyle = col;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(x, yOf(cd.hi));
        ctx.lineTo(x, yOf(cd.lo));
        ctx.stroke();

        const y1 = yOf(cd.o);
        const y2 = yOf(cd.c);
        const top = Math.min(y1, y2);
        const bot = Math.max(y1, y2);
        ctx.fillStyle = up ? 'rgba(0,217,163,.14)' : 'rgba(239,68,68,.12)';
        ctx.strokeStyle = col;
        ctx.beginPath();
        ctx.rect(x - w / 2, top, w, Math.max(2, bot - top));
        ctx.fill();
        ctx.stroke();
      }

      const py = yOf(last);
      ctx.strokeStyle = 'rgba(0,229,255,.55)';
      ctx.setLineDash([4,4]);
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(W, py); ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(226,232,240,.84)';
      ctx.font = '12px JetBrains Mono';
      ctx.fillText('FXAB Terminal (demo)', 12, 18);
    }

    function drawDepth() {
      const { ctx, resize } = c2;
      const { W, H } = resize();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(0,0,0,.12)';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = 'rgba(226,232,240,.84)';
      ctx.font = '12px JetBrains Mono';
      ctx.fillText('Order book (sim)', 12, 18);

      const rows = 16;
      for (let i = 0; i < rows; i++) {
        const y = 34 + i * ((H - 46) / rows);
        const bid = Math.max(0.06, Math.random());
        const ask = Math.max(0.06, Math.random());
        ctx.fillStyle = 'rgba(0,217,163,.18)';
        ctx.fillRect(10, y, (W - 20) * 0.42 * bid, 12);
        ctx.fillStyle = 'rgba(239,68,68,.14)';
        const w = (W - 20) * 0.42 * ask;
        ctx.fillRect(W - 10 - w, y, w, 12);
      }
    }

    function step() {
      if (!rm) {
        if (Math.random() < 0.14) pushCandle();
        else {
          const lastC = candles[candles.length - 1];
          const d = (Math.random() - 0.5) * 0.00030;
          lastC.c += d;
          last = lastC.c;
          lastC.hi = Math.max(lastC.hi, lastC.c);
          lastC.lo = Math.min(lastC.lo, lastC.c);
        }
      }
      drawCandles();
      drawDepth();
      requestAnimationFrame(step);
    }
    step();
  }

  // simple localized strings (demo)
  const i18n = {
    en: { headline: "Trade global markets with precision.", sub: "Execution-led infrastructure. Transparent conditions. Swiss-clean design." },
    es: { headline: "Opera mercados globales con precisión.", sub: "Infraestructura orientada a ejecución. Condiciones transparentes." },
    fr: { headline: "Tradez les marchés mondiaux avec précision.", sub: "Infrastructure orientée exécution. Conditions transparentes." },
    de: { headline: "Handeln Sie globale Märkte mit Präzision.", sub: "Ausführungsorientierte Infrastruktur. Transparente Konditionen." },
    ar: { headline: "تداول الأسواق العالمية بدقة.", sub: "بنية تحتية موجهة للتنفيذ. شروط شفافة." },
    hi: { headline: "सटीकता के साथ वैश्विक बाज़ारों में ट्रेड करें।", sub: "एक्ज़ीक्यूशन-फ़र्स्ट इंफ्रास्ट्रक्चर। पारदर्शी शर्तें।" },
  };

  function setLang(lang){
    const map = i18n[lang] || i18n.en;
    const h = document.querySelector('[data-i18n="headline"]');
    const s = document.querySelector('[data-i18n="sub"]');
    if (h) h.textContent = map.headline;
    if (s) s.textContent = map.sub;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('fxab_lang', lang);
  }

  document.querySelectorAll('[data-lang]')?.forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });
  const savedLang = localStorage.getItem('fxab_lang');
  if (savedLang) setLang(savedLang);

})();
