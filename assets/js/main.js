/* LP Dra. Larissa Pires: animações e interações (GSAP 3.12.5 + ScrollTrigger) */
(function () {
class DCLogic {}
class Component extends DCLogic {
  componentDidMount() {
    var me = this;
    var both = function () { me.drawTraco(); };
    both();
    this.dt = [setTimeout(both, 400), setTimeout(both, 1500)];
    this.onDt = both;
    window.addEventListener('resize', this.onDt);
    this.startMotion();
    this.setupBar();
    this.setupRail();
    this.setupMascot();
    this.setupQuiz();
    this.setupAreas();
    this.setupMap();
    this.setupCf();
  }
  componentWillUnmount() { if (this.ioB) this.ioB.disconnect(); this.dt.forEach(clearTimeout); window.removeEventListener('resize', this.onDt); this.stopMotion(); if (this.offRail) this.offRail(); if (this.offMas) this.offMas(); if (this.ioA) this.ioA.disconnect(); if (this.ioC) this.ioC.disconnect(); }
  drawTraco() {
    var root = document.getElementById('lproot'), svg = document.getElementById('trh'), p = document.getElementById('trhp');
    if (!root || !svg || !p) return;
    var q = function (s) { return document.querySelector(s); };
    var pos = function (e) { var x = 0, y = 0, n = e; while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x: x, y: y, w: e.offsetWidth, h: e.offsetHeight }; };
    var W = root.offsetWidth, H = root.offsetHeight, mob = window.matchMedia('(max-width:900px)').matches;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var els = { lg: q('#lgbox'), st: q('#topo .sh'), cr: q('section[aria-label="Credenciais"] > div'), qd: q('#quando > div > div'), dt: q('.dt'), sn: q('#sinais > div'), lp: q('#final .lp') };
    for (var k in els) if (!els[k]) return;
    var lg = pos(els.lg), st = pos(els.st.parentNode), cr = pos(els.cr), qd = pos(els.qd), dt = pos(els.dt), sn = pos(els.sn), lp = pos(els.lp);
    var cards = document.querySelectorAll('#quando .card'), lc = pos(cards[cards.length - 1]);
    var gut = Math.max(9, (W - 1240) / 4), gL = gut, gR = W - gut;
    var m = function (x, y) { return [st.x + x / 620 * st.w, st.y + y / 700 * st.h]; };
    var cr2 = function (pts) {
      var a = pts[0], z = pts[pts.length - 1], P = [a, a].concat(pts).concat([z, z]), s = '';
      var f = function (v) { return v.toFixed(1); };
      for (var i = 0; i < P.length - 2; i++) {
        var p = P[i], q = P[i + 1], r = P[i + 2];
        s += ' C' + f((2 * p[0] + q[0]) / 3) + ' ' + f((2 * p[1] + q[1]) / 3) + ' ' + f((p[0] + 2 * q[0]) / 3) + ' ' + f((p[1] + 2 * q[1]) / 3) + ' ' + f((p[0] + 4 * q[0] + r[0]) / 6) + ' ' + f((p[1] + 4 * q[1] + r[1]) / 6);
      }
      return s;
    };
    var cx = lg.x + lg.w + 2, ty = lg.y + 12;
    var d = 'M' + cx + ' ' + ty;
    var midY = function (a, b) { return (a + b) / 2; };
    var yCQ = qd.y - Math.min(34, (qd.y - cr.y - cr.h) / 2), yQD = midY(lc.y + lc.h, dt.y), yWV = dt.y + dt.h + Math.min(90, (sn.y - dt.y - dt.h) * .4);
    var u = function (x, y) { return [lp.x - 26 + x / 300 * (lp.w + 52), lp.y - 16 + y / 100 * (lp.h + 32)]; };
    var lpEnd = ' C' + u(10, 84).join(' ') + ' ' + u(30, 96).join(' ') + ' ' + u(120, 100).join(' ') + ' C' + u(250, 106).join(' ') + ' ' + u(306, 84).join(' ') + ' ' + u(298, 48).join(' ') + ' C' + u(290, 8).join(' ') + ' ' + u(170, -6).join(' ') + ' ' + u(70, 2).join(' ') + ' C' + u(-4, 8).join(' ') + ' ' + u(-8, 60).join(' ') + ' ' + u(22, 84).join(' ') + ' C' + u(50, 104).join(' ') + ' ' + u(160, 108).join(' ') + ' ' + u(230, 96).join(' ');
    if (mob) {
      d += cr2([[cx, ty], [cx + 70, ty - 6], [W - 34, ty + 2], [gR, ty + 110], [gR, ty + 200], [gR, st.y + st.h / 2], [gR, cr.y], [gR, lc.y], [gR, lc.y + lc.h - 10], [gR - 30, yQD], [W * .5, yQD + 4], [gL + 30, yQD + 8], [gL, dt.y + 40], [gL, dt.y + 160], [gL, dt.y + dt.h], [gL, sn.y + 40], [gL, sn.y + sn.h], [gL, lp.y - 160], [gL + 6, lp.y], u(-70, 125), u(-30, 110)]);
    } else {
      d += cr2([[cx, ty], [cx + 80, ty - 4], [cx + 200, ty], [Math.max(cx + 240, Math.min(lg.x + 560, st.x - 60)), ty + 6], m(40, 70), m(330, 70), m(600, 130), m(670, 380), [gR - 10, st.y + st.h - 20], [gR, st.y + st.h + 110], [gR, cr.y + cr.h - 30], [W * .78, yCQ - 6], [W * .5, yCQ], [W * .22, yCQ + 6], [gL, qd.y + 90], [gL, lc.y], [gL, lc.y + lc.h - 40], [W * .16, yQD], [W * .5, yQD], [W * .84, yQD], [gR, dt.y + 110], [gR, dt.y + dt.h - 120], [gR - 10, dt.y + dt.h - 20], [W * .78, yWV], [W * .5, yWV], [W * .2, yWV - 4], [gL + 40, yWV - 2], [gL, yWV + 40], [gL, yWV + 100], [gL, sn.y + sn.h], [gL, lp.y - 170], [gL + 10, lp.y + 10], u(-80, 128), u(-30, 110)]);
    }
    d += lpEnd;
    p.setAttribute('d', d);
    var s1 = document.getElementById('trs1'), s2 = document.getElementById('trs2'), s3 = document.getElementById('trs3'), s4 = document.getElementById('trs4');
    [s1, s2, s3, s4].forEach(function (s) { if (s) s.setAttribute('offset', '1'); });
    var L = p.getTotalLength(), STEP = 20, n = Math.ceil(H / STEP) + 2, tb = new Array(n).fill(0), cur = 0;
    for (var l = 0; l <= L; l += 14) { var pt = p.getPointAtLength(l), ix = Math.max(0, Math.floor(pt.y / STEP)); for (var j = ix; j < n; j++) { if (tb[j] < l) tb[j] = l; else break; } }
    var blur = function (a, r) { var o = [], sum = 0, i; for (i = 0; i < a.length; i++) { var c = 0, t = 0; for (var k = Math.max(0, i - r); k <= Math.min(a.length - 1, i + r); k++) { t += a[k]; c++; } o.push(t / c); } return o; };
    tb = blur(blur(tb, 14), 14);
    this.lineL = L; this.lineT = tb;
    if (this.lineOn) this.lineSet(this.lineCur, true);
  }
  lineTarget() {
    var t = this.lineT, y = window.scrollY + window.innerHeight * .62;
    if (!t || !t.length) return 0;
    if (window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 4) return this.lineL;
    var f = Math.max(0, y / 20), i = Math.min(t.length - 2, Math.floor(f)), r = f - i;
    return t[i] + (t[i + 1] - t[i]) * r;
  }
  lineSet(v, keep) {
    var p = document.getElementById('trhp'), d = document.getElementById('trhd'), L = this.lineL;
    if (!keep) this.lineCur = v;
    if (!p) return;
    var n = Math.min(v, L);
    p.style.strokeDasharray = L + ' ' + (L + 10);
    p.style.strokeDashoffset = L - n;
  }
  setupCf() {
    var st = document.querySelector('.cfs'); if (!st) return;
    var cs = Array.prototype.slice.call(st.querySelectorAll('.cfc')), ds = Array.prototype.slice.call(document.querySelectorAll('.cfd')), dots = document.querySelector('.cfdots'), n = cs.length, cur = 0;
    if (dots) dots.innerHTML = cs.map(function (c, i) { return '<i data-i="' + i + '"></i>'; }).join('');
    var dl = dots ? dots.querySelectorAll('i') : [];
    var lay = function () {
      var mob = window.innerWidth <= 900, gap = mob ? window.innerWidth * .5 : Math.min(260, window.innerWidth * .19);
      cs.forEach(function (c, i) {
        var d = i - cur; if (d > n / 2) d -= n; if (d < -n / 2) d += n;
        var a = Math.abs(d), sc = 1 - Math.min(a, 3) * (mob ? .16 : .13), x = d * gap * (a > 1 ? .92 : 1);
        c.style.transform = 'translateX(' + x.toFixed(1) + 'px) translateZ(' + (-a * 80) + 'px) rotateY(' + (-d * 16) + 'deg) scale(' + sc.toFixed(3) + ')';
        c.style.zIndex = String(20 - a); c.style.opacity = a > (mob ? 1 : 2) ? '0' : String(1 - a * .12);
        c.style.filter = a ? 'saturate(.75) brightness(.78)' : 'none';
        c.style.pointerEvents = a > (mob ? 1 : 2) ? 'none' : 'auto';
        c.classList.toggle('on', !a); c.classList.toggle('far', a > 1); c.tabIndex = a ? -1 : 0; c.setAttribute('aria-current', a ? 'false' : 'true');
      });
      ds.forEach(function (d, i) { d.classList.toggle('on', i === cur); });
      Array.prototype.forEach.call(dl, function (d, i) { d.classList.toggle('on', i === cur); });
    };
    var go = function (i) { cur = (i + n) % n; lay(); };
    cs.forEach(function (c, i) { c.addEventListener('click', function () { if (i !== cur) go(i); }); });
    Array.prototype.forEach.call(dl, function (d, i) { d.addEventListener('click', function () { go(i); }); });
    document.querySelector('.cfprev').addEventListener('click', function () { go(cur - 1); });
    document.querySelector('.cfnext').addEventListener('click', function () { go(cur + 1); });
    st.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { go(cur + 1); cs[cur].focus(); } if (e.key === 'ArrowLeft') { go(cur - 1); cs[cur].focus(); } });
    var sx = null, sy = 0;
    st.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; });
    st.addEventListener('pointerup', function (e) { if (sx === null) return; var dx = e.clientX - sx; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - sy)) go(cur + (dx < 0 ? 1 : -1)); sx = null; });
    st.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    st.addEventListener('touchend', function (e) { if (sx === null) return; var t = e.changedTouches[0], dx = t.clientX - sx; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(t.clientY - sy)) go(cur + (dx < 0 ? 1 : -1)); sx = null; }, { passive: true });
    var w = st.parentNode, D = 5000, tm = 0, hov = false, user = false, vis = false;
    w.style.setProperty('--cfd', D + 'ms');
    var sched = function () { clearTimeout(tm); w.classList.remove('auto'); if (user || hov || !vis) return; void w.offsetWidth; w.classList.add('auto'); tm = setTimeout(function () { go(cur + 1); }, D); };
    var go0 = go; go = function (i) { go0(i); sched(); };
    var stop = function () { user = true; clearTimeout(tm); w.classList.remove('auto'); };
    ['pointerdown', 'keydown'].forEach(function (ev) { w.addEventListener(ev, stop); });
    w.querySelectorAll('.cfx,.cfdots').forEach(function (el) { el.addEventListener('click', stop, true); });
    w.addEventListener('mouseenter', function () { hov = true; w.classList.add('paused'); clearTimeout(tm); });
    w.addEventListener('mouseleave', function () { hov = false; w.classList.remove('paused'); sched(); });
    st.classList.add('pre');
    if (typeof IntersectionObserver !== 'undefined') {
      var first = true;
      this.ioC = new IntersectionObserver(function (es) { es.forEach(function (e) { vis = e.isIntersecting; if (vis && first) { first = false; requestAnimationFrame(function () { st.classList.remove('pre'); cs.forEach(function (c, i) { var d = Math.abs(i - cur); d = Math.min(d, n - d); c.style.transitionDelay = (d * 0.09) + 's'; }); lay(); setTimeout(function () { cs.forEach(function (c) { c.style.transitionDelay = ''; }); }, 1400); }); } sched(); }); }, { threshold: .35 });
      this.ioC.observe(w);
    } else { st.classList.remove('pre'); vis = true; sched(); }
    window.addEventListener('resize', lay); lay();
  }
  setupAcc() {
    var row = document.querySelector('.acr'); if (!row) return;
    var ps = Array.prototype.slice.call(row.querySelectorAll('.acp')), dots = document.querySelector('.acd');
    var act = function (p) { ps.forEach(function (q) { var o = q === p; q.classList.toggle('on', o); q.setAttribute('aria-expanded', o ? 'true' : 'false'); }); };
    ps.forEach(function (p) {
      p.addEventListener('mouseenter', function () { if (window.innerWidth > 900) act(p); });
      p.addEventListener('focus', function () { if (window.innerWidth > 900) act(p); });
      p.addEventListener('click', function () { if (window.innerWidth > 900) act(p); });
      p.addEventListener('keydown', function (e) { var i = ps.indexOf(p); if (e.key === 'ArrowRight' && ps[i + 1]) { ps[i + 1].focus(); } if (e.key === 'ArrowLeft' && ps[i - 1]) { ps[i - 1].focus(); } });
    });
    if (dots) {
      dots.innerHTML = ps.map(function () { return '<i></i>'; }).join('');
      var ds = dots.querySelectorAll('i'), upd = function () { var c = row.scrollLeft + row.clientWidth / 2, best = 0, bd = 1e9; ps.forEach(function (p, i) { var d = Math.abs(p.offsetLeft + p.offsetWidth / 2 - c); if (d < bd) { bd = d; best = i; } }); ds.forEach(function (d, i) { d.classList.toggle('on', i === best); }); };
      row.addEventListener('scroll', function () { requestAnimationFrame(upd); }, { passive: true }); upd();
    }
  }
  setupMap() {
    var v = document.querySelector('.mpv'); if (!v) return;
    var w = v.querySelector('.mpw'), pin = v.querySelector('.mpp'), hint = v.querySelector('.mph');
    var L = Array.prototype.slice.call(w.querySelectorAll('.mpL'));
    var outer = L[0], ox = parseFloat(outer.style.left), oy = parseFloat(outer.style.top), ow = parseFloat(outer.style.width), oh = parseFloat(outer.style.height);
    var S0 = .5, SMIN = .09, SMAX = 1.6, st = { s: S0, x: 0, y: 0 }, ht = 0;
    var home = function () { var r = v.getBoundingClientRect(), desk = window.innerWidth > 900; return { x: r.width * (desk ? .66 : .5), y: r.height * (desk ? .52 : .55) }; };
    var clamp = function () {
      var r = v.getBoundingClientRect(), s = st.s;
      var minX = r.width - (ox + ow) * s, maxX = -ox * s, minY = r.height - (oy + oh) * s, maxY = -oy * s;
      st.x = Math.min(maxX, Math.max(minX, st.x)); st.y = Math.min(maxY, Math.max(minY, st.y));
    };
    var draw = function () {
      clamp();
      w.style.transform = 'translate(' + st.x.toFixed(1) + 'px,' + st.y.toFixed(1) + 'px) scale(' + st.s.toFixed(4) + ')';
      pin.style.left = st.x + 'px'; pin.style.top = st.y + 'px';
      L.forEach(function (im) { var z = +im.getAttribute('data-z'), need = { 15: 0, 16: .11, 17: .22, 18: .45 }[z]; im.style.visibility = st.s >= need ? 'visible' : 'hidden'; });
    };
    var zoomAt = function (f, cx, cy, anim) {
      var ns = Math.min(SMAX, Math.max(SMIN, st.s * f)); f = ns / st.s;
      st.x = cx - (cx - st.x) * f; st.y = cy - (cy - st.y) * f; st.s = ns;
      v.classList.toggle('anim', !!anim); draw();
    };
    var reset = function (anim) { var h = home(); st.s = S0; st.x = h.x; st.y = h.y; v.classList.toggle('anim', !!anim); draw(); };
    var say = function (t) { hint.textContent = t; hint.classList.add('on'); clearTimeout(ht); ht = setTimeout(function () { hint.classList.remove('on'); }, 1400); };
    var mid = function () { var r = v.getBoundingClientRect(); return [r.width / 2, r.height / 2]; };
    v.querySelector('.mzi').addEventListener('click', function () { var m = mid(); zoomAt(1.6, m[0], m[1], true); });
    v.querySelector('.mzo').addEventListener('click', function () { var m = mid(); zoomAt(1 / 1.6, m[0], m[1], true); });
    v.querySelector('.mzr').addEventListener('click', function () { reset(true); });
    v.addEventListener('wheel', function (e) {
      if (!(e.ctrlKey || e.metaKey)) { say('Use Ctrl + rolagem para dar zoom'); return; }
      e.preventDefault(); var r = v.getBoundingClientRect(); zoomAt(Math.exp(-e.deltaY * .0025), e.clientX - r.left, e.clientY - r.top, false);
    }, { passive: false });
    v.addEventListener('dblclick', function (e) { var r = v.getBoundingClientRect(); zoomAt(1.8, e.clientX - r.left, e.clientY - r.top, true); });
    var P = {}, last = null, pd = 0;
    var pts = function () { return Object.keys(P).map(function (k) { return P[k]; }); };
    v.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.mpz')) return;
      P[e.pointerId] = { x: e.clientX, y: e.clientY, t: e.pointerType };
      var a = pts();
      if (e.pointerType === 'touch' && a.length < 2) { last = null; return; }
      try { v.setPointerCapture(e.pointerId); } catch (er) {}
      v.classList.remove('anim'); v.classList.add('drag');
      last = a.length >= 2 ? null : { x: e.clientX, y: e.clientY }; pd = 0;
    });
    v.addEventListener('pointermove', function (e) {
      if (!P[e.pointerId]) return;
      var prev = P[e.pointerId]; P[e.pointerId] = { x: e.clientX, y: e.clientY, t: e.pointerType };
      var a = pts(), r = v.getBoundingClientRect();
      if (a.length >= 2) {
        e.preventDefault();
        var d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y), cx = (a[0].x + a[1].x) / 2 - r.left, cy = (a[0].y + a[1].y) / 2 - r.top;
        if (pd) { st.x += (e.clientX - prev.x) / 2; st.y += (e.clientY - prev.y) / 2; zoomAt(d / pd, cx, cy, false); }
        pd = d; return;
      }
      if (e.pointerType === 'touch') { return; }
      if (last) { st.x += e.clientX - last.x; st.y += e.clientY - last.y; last = { x: e.clientX, y: e.clientY }; draw(); }
    });
    var up = function (e) { delete P[e.pointerId]; if (pts().length < 2) pd = 0; if (!pts().length) { last = null; v.classList.remove('drag'); } };
    v.addEventListener('pointerup', up); v.addEventListener('pointercancel', up); v.addEventListener('pointerleave', function (e) { if (e.pointerType !== 'touch') up(e); });
    v.addEventListener('touchstart', function (e) { if (e.touches.length === 1) say('Use dois dedos para mover e dar zoom'); }, { passive: true });
    v.addEventListener('touchmove', function (e) { if (e.touches.length >= 2) e.preventDefault(); }, { passive: false });
    window.addEventListener('resize', function () { reset(false); });
    reset(false);
    var grow = function () { v.classList.add('anim'); st.s = S0 / 1.25; var h = home(); st.x = h.x; st.y = h.y; draw(); };
    if (typeof IntersectionObserver !== 'undefined') {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); var m = home(); st.s = S0 * .6; st.x = m.x; st.y = m.y; v.classList.remove('anim'); draw(); requestAnimationFrame(function () { requestAnimationFrame(function () { reset(true); }); }); } }, { threshold: .4 });
      io.observe(v);
    }
  }
  setupAreas() {
    var box = document.querySelector('.arx'); if (!box) return;
    var tabs = Array.prototype.slice.call(box.querySelectorAll('.art')), pans = Array.prototype.slice.call(box.querySelectorAll('.arpn'));
    var cur = 0, tm = 0, user = false, vis = false, D = 7000;
    box.style.setProperty('--ad', D + 'ms');
    var go = function (i, focus) {
      cur = (i + tabs.length) % tabs.length;
      tabs.forEach(function (t, k) { var on = k === cur; t.classList.toggle('on', on); t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; });
      pans.forEach(function (p, k) { p.classList.toggle('on', k === cur); });
      var t = tabs[cur], strip = t.parentNode;
      if (window.innerWidth <= 900 && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: t.offsetLeft - 20, behavior: 'smooth' });
      if (focus) t.focus();
      clearTimeout(tm); if (!user && vis) tm = setTimeout(function () { go(cur + 1); }, D);
    };
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { user = true; box.classList.add('paused'); go(k); });
      t.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); user = true; go(cur + 1, true); } if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); user = true; go(cur - 1, true); } });
    });
    box.addEventListener('mouseenter', function () { box.classList.add('paused'); clearTimeout(tm); });
    box.addEventListener('mouseleave', function () { if (!user) { box.classList.remove('paused'); go(cur); } });
    if (typeof IntersectionObserver !== 'undefined') {
      this.ioA = new IntersectionObserver(function (es) { es.forEach(function (e) { vis = e.isIntersecting; if (vis && !user) go(cur); else clearTimeout(tm); }); }, { threshold: .35 });
      this.ioA.observe(box);
    } else { vis = true; go(0); }
  }
  setupQuiz() {
    var btns = Array.prototype.slice.call(document.querySelectorAll('.qz')), panel = document.querySelector('.qzp');
    if (!btns.length || !panel) return;
    var n = panel.querySelector('.qzn'), ring = panel.querySelector('.qzr1'), h = panel.querySelector('.qzh'), dsc = panel.querySelector('.qzd'), cta = panel.querySelector('.qzb'), bar = document.querySelector('.mbar');
    var base = 'Olá! Vim pela página da Dra. Larissa e gostaria de agendar uma avaliação.';
    var barTxt = bar ? bar.querySelector('span') : null, barOrig = barTxt ? barTxt.textContent : '', ctaLbl = cta.childNodes[0];
    var upd = function () {
      var sel = btns.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; }).map(function (b) { return b.getAttribute('data-s'); });
      var c = sel.length;
      n.textContent = c; n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump');
      ring.style.strokeDashoffset = String(327 - 327 * c / btns.length);
      if (!c) { h.textContent = 'Nenhum sinal marcado ainda'; dsc.textContent = 'Toque nos cartões para montar a sua lista.'; }
      else if (c < 3) { h.textContent = c === 1 ? '1 sinal marcado' : c + ' sinais marcados'; dsc.textContent = 'Vale conversar com a especialista para entender o que está acontecendo.'; }
      else { h.textContent = c + ' sinais marcados'; dsc.textContent = 'Uma avaliação ajuda a esclarecer o seu caso e as opções de tratamento.'; }
      panel.classList.toggle('has', c > 0);
      var msg = base + (c ? ' Sinais que marquei: ' + sel.join('; ') + '.' : '');
      var href = 'https://wa.me/5586999908713?text=' + encodeURIComponent(msg);
      cta.href = href; ctaLbl.textContent = c ? (window.innerWidth > 900 ? 'Enviar meus sinais pelo WhatsApp' : 'Enviar meus sinais') : 'Agendar minha avaliação';
      if (bar) { bar.href = href; if (barTxt) barTxt.textContent = c ? 'Enviar ' + c + (c === 1 ? ' sinal' : ' sinais') + ' pelo WhatsApp' : barOrig; }
      return c;
    };
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var on = b.getAttribute('aria-pressed') !== 'true';
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
        var c = upd();
        try { window.dispatchEvent(new CustomEvent('tsay', { detail: on ? (c >= 3 ? 'Já dá pra conversar!' : 'Anotado!') : 'Tirei da lista' })); } catch (e) {}
      });
    });
  }
  setupMascot() {
    var el = document.querySelector('.tms'), ph = document.querySelector('.tph'), bub = document.querySelector('.tmb');
    if (!el || !ph) return;
    var S = [['#topo','Oi! Vem comigo?'],['#quando','Essas são as áreas dela'],['#sobre','Prazer, Dra. Larissa'],['#sinais','Algum desses é você?'],['#avaliacao','Tudo explicado, sem pressa'],['#duvidas','Dúvida? Tem resposta aqui'],['#clinica','Olha o consultório'],['#local','Fica fácil de chegar'],['#final','Bora agendar?']].map(function (x) { return [document.querySelector(x[0]), x[1]]; }).filter(function (x) { return x[0]; });
    var raf = 0, lastY = window.scrollY, wt = 0, st = 0, cur = -1, dir = 1;
    var say = function (t) { bub.textContent = t; el.classList.add('say'); clearTimeout(st); st = setTimeout(function () { el.classList.remove('say'); }, 2600); };
    var ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
    var upd = function () {
      raf = 0;
      var vw = window.innerWidth, vh = window.innerHeight, y = window.scrollY, mob = vw <= 900;
      var r = ph.getBoundingClientRect(), w0 = r.width || 150;
      var max = Math.max(1, document.documentElement.scrollHeight - vh), p = Math.min(1, y / max);
      var t = mob ? 0 : ease(Math.min(1, Math.max(0, y / (vh * .7))));
      var gut = (vw - 1240) / 2, w1 = gut > 120 ? 60 : 50;
      var x1 = (gut > 70 ? vw - gut / 2 - w1 / 2 : vw - w1 - 10) + Math.sin(p * Math.PI * 9) * Math.min(10, gut / 8);
      var y1 = vh * .16 + p * vh * .58;
      var w = w0 + (w1 - w0) * t, x = r.left + (x1 - r.left) * t, yy = r.top + (y1 - r.top) * t;
      el.style.width = w + 'px';
      el.style.transform = 'translate(' + x.toFixed(1) + 'px,' + yy.toFixed(1) + 'px) rotate(' + (t > .9 ? dir * 4 : 0) + 'deg)';
      el.classList.add('on');
      if (!mob && t > .98) {
        var c = 0; S.forEach(function (s2, i) { if (s2[0].getBoundingClientRect().top < vh * .5) c = i; });
        if (c !== cur) { cur = c; if (c > 0) say(S[c][1]); }
      } else if (y < 40 && cur !== 0) { cur = 0; setTimeout(function () { if (window.scrollY < 40) say(S[0][1]); }, 2600); }
    };
    var on = function () {
      var y = window.scrollY; if (y !== lastY) { dir = y > lastY ? 1 : -1; lastY = y; el.classList.add('walk'); clearTimeout(wt); wt = setTimeout(function () { el.classList.remove('walk'); }, 220); }
      if (!raf) raf = requestAnimationFrame(upd);
    };
    window.addEventListener('tsay', function (e) { if (window.innerWidth > 900) say(e.detail); });
    window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    upd(); setTimeout(upd, 600); setTimeout(upd, 1600);
    this.offMas = function () { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); clearTimeout(st); clearTimeout(wt); };
  }
  setupRail() {
    var nav = document.querySelector('.prg'), fill = document.querySelector('.prf'), bar = document.querySelector('.prm');
    if (!nav) return;
    var S = [['#topo','Início'],['#quando','Áreas'],['#sobre','Sobre'],['#sinais','Sinais'],['#avaliacao','Avaliação'],['#duvidas','Dúvidas'],['#clinica','A clínica'],['#local','Como chegar'],['#final','Agendar']];
    var items = [];
    S.forEach(function (x) {
      var sec = document.querySelector(x[0]); if (!sec) return;
      var a = document.createElement('a'); a.href = x[0]; a.innerHTML = '<span>' + x[1] + '</span>';
      a.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' }); });
      nav.appendChild(a); items.push({ a: a, s: sec });
    });
    var raf = 0;
    var upd = function () {
      raf = 0;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight), y = window.scrollY, p = Math.min(1, y / max), cur = 0;
      items.forEach(function (it, i) {
        var t = it.s.getBoundingClientRect().top + y, f = i === 0 ? 0 : Math.min(1, Math.max(0, (t - window.innerHeight * .45) / max));
        if (i === items.length - 1) f = 1;
        it.a.style.top = (f * 100) + '%'; it.f = f;
        if (p >= f - .002) cur = i;
      });
      items.forEach(function (it, i) { it.a.classList.toggle('on', i <= cur); it.a.classList.toggle('cur', i === cur); });
      if (fill) fill.style.transform = 'scaleY(' + p + ')';
      if (bar) bar.style.transform = 'scaleX(' + p + ')';
    };
    var on = function () { if (!raf) raf = requestAnimationFrame(upd); };
    window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    upd(); setTimeout(upd, 800); setTimeout(upd, 2000);
    this.offRail = function () { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }
  setupBar() {
    var bar = document.querySelector('.mbar'), cta = document.querySelector('#topo .btn');
    if (!bar || !cta || typeof IntersectionObserver === 'undefined') return;
    var ends = document.querySelectorAll('[data-mbar-end]'), past = false, vis = 0, seen = new Set();
    var upd = function () { bar.classList.toggle('on', past && seen.size === 0); };
    this.ioB = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.target === cta) past = !e.isIntersecting && e.boundingClientRect.top < 0;
        else if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target);
      });
      upd();
    });
    this.ioB.observe(cta);
    ends.forEach(function (e) { this.ioB.observe(e); }, this);
  }
  startMotion() {
    var self = this, n = 0;
    var t = function () {
      if (self.booted || self.dead) return;
      if (window.gsap && window.ScrollTrigger) return self.bootMotion();
      if (++n < 50) self.mt = setTimeout(t, 100);
    };
    t();
    if (!this.onRz) { this.onRz = function () { t(); }; window.addEventListener('resize', this.onRz); }
  }
  bootMotion() {
    var d = document.documentElement;
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm || d.scrollHeight < window.innerHeight + 200) return;
    this.booted = true;
    var g = window.gsap, ST = window.ScrollTrigger, self = this;
    g.registerPlugin(ST);
    d.classList.add('gs');
    this.ctx = g.context(function () { self.motion(g, ST); });
    this.onLd = function () { ST.refresh(); };
    if (window.ResizeObserver) { var tm; this.ro = new ResizeObserver(function () { clearTimeout(tm); tm = setTimeout(function () { ST.refresh(); }, 250); }); this.ro.observe(document.body); }
    window.addEventListener('load', this.onLd);
    document.querySelectorAll('img').forEach(function (i) { if (!i.complete) i.addEventListener('load', self.onLd, { once: true }); });
  }
  stopMotion() {
    this.dead = true;
    clearTimeout(this.mt);
    if (this.onRz) window.removeEventListener('resize', this.onRz);
    if (this.onLd) window.removeEventListener('load', this.onLd);
    if (this.ro) this.ro.disconnect();
    if (this.ctx) this.ctx.revert();
    document.documentElement.classList.remove('gs');
  }
  motion(g, ST) {
    /*M*/
    var mob = window.matchMedia('(max-width:900px)').matches;
    var $ = function (s) { return g.utils.toArray(s); };
    var rev = function (s, v, t) {
      var els = $(s); if (!els.length) return;
      g.from(els, Object.assign({ y: 44, autoAlpha: 0, duration: 1.1, ease: 'power3.out', stagger: .1, scrollTrigger: { trigger: t || els[0], start: 'top 88%', once: true } }, v || {}));
    };
    var dash = function (el) {
      var s = el.ownerSVGElement, b = s.getBoundingClientRect(), vb = s.viewBox.baseVal;
      if (!b.width) return false;
      var L = el.getTotalLength() * Math.max(b.width / vb.width, b.height / vb.height) * 1.06;
      g.set(el, { strokeDasharray: L, strokeDashoffset: L });
      return true;
    };
    var hero = '#topo';
    var intro = g.timeline({ defaults: { ease: 'power4.out' } });
    intro.from('#topo .hg > div:first-child > :first-child', { y: 20, autoAlpha: 0, duration: .7 }, .1)
      .from('#topo h1 .w', { yPercent: 80, rotate: 5, autoAlpha: 0, duration: 1.1, stagger: .05 }, .2)
      .from('#topo .hg > div:first-child > *:not(h1):not(:first-child)', { y: 30, autoAlpha: 0, duration: .9, stagger: .1 }, .75)
      .from('#topo .sh', { scale: .55, rotation: 14, autoAlpha: 0, duration: 1.5, ease: 'elastic.out(1,.75)' }, .3)
      .from('#topo .ph', { yPercent: 18, scale: .94, autoAlpha: 0, duration: 1.4 }, .6)
      .from('#topo .ph + div', { scaleX: 0, transformOrigin: '0% 50%', duration: 1 }, .9)
      .from('#topo .fc', { scale: .4, autoAlpha: 0, duration: 1, ease: 'back.out(2)', stagger: .18 }, 1.1);
    var me5 = this; this.drawTraco();
    intro.from('#lgimg', { scale: .7, autoAlpha: 0, duration: .9, ease: 'back.out(1.8)' }, .05);
    $('.tr-i').forEach(function (a) { if (dash(a)) intro.to(a, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' }, .3); });
    this.lineOn = true; this.lineSet(0);
    var hd = { v: 0 };
    var toHead = function (dur) { g.to(hd, { v: me5.lineTarget(), duration: dur, ease: 'power1.out', overwrite: true, onUpdate: function () { me5.lineSet(hd.v); } }); };
    g.delayedCall(.25, function () { g.to(hd, { v: me5.lineTarget(), duration: 2.6, ease: 'sine.inOut', onUpdate: function () { me5.lineSet(hd.v); } }); });
    ST.create({ start: 0, end: 'max', onUpdate: function () { toHead(.5); } });
    ST.addEventListener('refresh', function () { me5.drawTraco(); });
    g.to('#topo .sh', { borderRadius: '64px', duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
    if (!mob) {
      $('#topo .fc').forEach(function (c, i) { g.to(c, { y: i % 2 ? 13 : -13, rotation: i % 2 ? 1.4 : -1.4, duration: 3 + i * .6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.2 }); });
      var ls = [['#topo .ph', -12], ['#topo .sh', -12], ['#topo .ph + div', -6]].map(function (l) { return [g.quickTo(l[0], 'x', { duration: 1, ease: 'power3' }), l[1]]; });
      var cs = $('#topo .fc').map(function (c, i) { return [g.quickTo(c, 'x', { duration: 1.1, ease: 'power3' }), 24 + i * 7]; });
      document.getElementById('topo').addEventListener('mousemove', function (e) {
        var p = e.clientX / window.innerWidth - .5;
        ls.concat(cs).forEach(function (l) { l[0](p * l[1]); });
      });
      $('.btn').forEach(function (b) {
        var bx = g.quickTo(b, 'x', { duration: .6, ease: 'power3' }), by = g.quickTo(b, 'y', { duration: .6, ease: 'power3' });
        b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); bx((e.clientX - r.left - r.width / 2) * .16); by((e.clientY - r.top - r.height / 2) * .32); });
        b.addEventListener('mouseleave', function () { bx(0); by(0); });
      });
      $('.card').forEach(function (c) {
        var ic = c.querySelector('.ic');
        c.addEventListener('mouseenter', function () { g.to(c, { y: -10, boxShadow: '0 22px 44px rgba(52,59,58,.12)', duration: .4, ease: 'power3.out' }); g.to(ic, { rotation: 12, scale: 1.15, duration: .5, ease: 'back.out(3)' }); });
        c.addEventListener('mouseleave', function () { g.to(c, { y: 0, boxShadow: '0 0 0 rgba(52,59,58,0)', duration: .5, ease: 'power3.out' }); g.to(ic, { rotation: 0, scale: 1, duration: .5 }); });
      });
    }
    g.to('.btn > svg', { x: 5, duration: .7, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    g.fromTo('#topo .btn:first-child', { boxShadow: '0 0 0 0 rgba(86,112,107,.55)' }, { boxShadow: '0 0 0 18px rgba(86,112,107,0)', duration: 1.8, repeat: -1, repeatDelay: .5, ease: 'power2.out', delay: 2.4 });
    g.to('#wv1', { attr: { d: 'M0 76 C240 30 460 28 720 70 C980 110 1200 104 1440 44 L1440 110 L0 110 Z' }, ease: 'none', scrollTrigger: { trigger: '#wv1', start: 'top bottom', end: 'bottom top', scrub: .8 } });

    var cred = document.querySelector('section[aria-label="Credenciais"] > div');
    g.from(cred, { scale: .9, autoAlpha: 0, duration: 1, ease: 'back.out(1.4)', scrollTrigger: { trigger: cred, start: 'top 90%', once: true } });
    rev(cred.children, { stagger: .15, delay: .2 }, cred);

    rev('#quando > div > div:first-child > *', {}, '#quando h2');
    var ul = document.querySelector('#quando h2 svg path');
    var ut = g.timeline({ scrollTrigger: { trigger: '#quando h2', start: 'top 82%', once: true }, delay: .6 });
    if (dash(ul)) ut.to(ul, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' });
    $('.card').forEach(function (c, i) {
      var tl = g.timeline({ scrollTrigger: { trigger: c, start: 'top 90%', once: true }, delay: mob ? 0 : (i % 3) * .14 });
      tl.from(c, { y: 70, scale: .92, autoAlpha: 0, duration: 1, ease: 'power3.out' })
        .from(c.querySelector('.ic'), { scale: 0, rotation: -90, duration: .8, ease: 'back.out(2.4)' }, .25);
    });

    var es = document.getElementById('estetica');
    if (es) rev(es.firstElementChild, { scale: .94 });

    var dt = document.querySelector('.dt');
    g.fromTo(dt, { scale: .9 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: dt, start: 'top 95%', end: 'top 50%', scrub: .7 } });
    rev('.dt > div:first-child > *', { x: -50, y: 0 }, '.dt');
    g.fromTo('.dt > img', { clipPath: 'inset(50% 50% 50% 50% round 200px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.5, ease: 'power4.inOut', scrollTrigger: { trigger: '.dt > img', start: 'top 80%', once: true } });

    g.to('#wv2', { attr: { d: 'M0 44 C260 96 520 96 760 44 C1000 10 1240 26 1440 74 L1440 110 L0 110 Z' }, ease: 'none', scrollTrigger: { trigger: '#wv2', start: 'top bottom', end: 'bottom top', scrub: .8 } });

    rev('#sinais > div > p, #sinais h2', {}, '#sinais h2');
    var sgf = document.querySelector('.sgf');
    if (sgf) { g.from(sgf, { y: 50, scale: .96, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sgf, start: 'top 92%', once: true } }); }

    rev('#duvidas h2', {});
    $('#duvidas details').forEach(function (d) {
      g.from(d, { x: 50, autoAlpha: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: d, start: 'top 92%', once: true } });
      d.addEventListener('toggle', function () { if (d.open) { g.from(d.querySelector('p'), { y: -12, autoAlpha: 0, duration: .5, ease: 'power2.out' }); } ST.refresh(); });
    });

    var fi = document.querySelector('#final > div');
    g.fromTo(fi, { scale: .88 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: fi, start: 'top 98%', end: 'top 50%', scrub: .7 } });
    rev('#final h2, #final h2 ~ p', {}, '#final h2');
    var ci = document.querySelector('#final > div > img');
    g.from(ci, { scale: .7, rotation: -10, autoAlpha: 0, duration: 1.3, ease: 'back.out(1.5)', scrollTrigger: { trigger: fi, start: 'top 75%', once: true } });
    g.to(ci, { borderRadius: '56% 44% 42% 58% / 44% 56% 46% 54%', duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    g.fromTo('#final .btn', { boxShadow: '0 0 0 0 rgba(52,59,58,.45)' }, { boxShadow: '0 0 0 18px rgba(52,59,58,0)', duration: 1.8, repeat: -1, repeatDelay: .5, ease: 'power2.out' });
    var fsafe = function () {
      var max = ST.maxScroll(window);
      ST.getAll().forEach(function (t) { if (t.vars.once && t.animation && t.start >= max - 2) t.animation.progress(1); });
    };
    ST.addEventListener('refresh', fsafe);
    fsafe();
    /*M*/
  }
  renderVals() {
    return {};
  }
}
function boot() { if (window.__lp) return; window.__lp = new Component(); window.__lp.componentDidMount(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

/* Rastreamento: clique em qualquer link de WhatsApp = Lead */
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
  if (!a) return;
  var label = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'clique_whatsapp', cta_texto: label, cta_url: a.href });
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
  if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { cta_texto: label });
}, true);
