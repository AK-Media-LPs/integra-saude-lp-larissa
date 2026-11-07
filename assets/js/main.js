/* Mini-runtime: substitui o motor do Claude Design (estado + bindings) por JS puro. */
(function () {
  var PROPS = {};
  function DCLogic(props) { this.props = props || {}; this.state = {}; }
  DCLogic.prototype.setState = function (p) {
    var ps = this.state;
    this.state = Object.assign({}, ps, typeof p === 'function' ? p(ps) : p);
    paint(this);
    if (this.componentDidUpdate) this.componentDidUpdate(this.props, ps);
  };
  var VALS = {};
  function fill(t) { return t.replace(/\{\{\s*([\w$]+)\s*\}\}/g, function (_, k) { var v = VALS[k]; return v == null ? '' : String(v); }); }
  function paint(c) {
    VALS = c.renderVals ? (c.renderVals() || {}) : {};
    document.querySelectorAll('[data-x]').forEach(function (el) {
      for (var i = 0; i < el.attributes.length; i++) {
        var a = el.attributes[i];
        if (a.name.indexOf('data-x-') !== 0) continue;
        var n = a.name.slice(7);
        if (n === 'if') el.hidden = !VALS[a.value];
        else if (n === 'onclick') continue;
        else el.setAttribute(n, fill(a.value));
      }
    });
  }
  function wire() {
    document.querySelectorAll('[data-x-onclick]').forEach(function (el) {
      el.addEventListener('click', function (e) { var f = VALS[el.getAttribute('data-x-onclick')]; if (typeof f === 'function') f(e); });
    });
  }
class Component extends DCLogic {
  componentDidMount() {
    var me = this;
    var both = function () { me.drawTraco(); };
    requestAnimationFrame(function () { setTimeout(both, 0); });
    this.dt = [setTimeout(both, 400), setTimeout(both, 1500)];
    var rz = 0; this.onDt = function () { if (rz) return; rz = requestAnimationFrame(function () { rz = 0; both(); }); };
    window.addEventListener('resize', this.onDt);
    this.startMotion();
    this.setupBar();
  }
  componentWillUnmount() { if (this.ioB) this.ioB.disconnect(); this.dt.forEach(clearTimeout); window.removeEventListener('resize', this.onDt); this.stopMotion(); }
  drawTraco() {
    var root = document.getElementById('lproot'), svg = document.getElementById('trh'), p = document.getElementById('trhp');
    if (!root || !svg || !p) return;
    var q = function (s) { return document.querySelector(s); };
    var pos = function (e) { var x = 0, y = 0, n = e; while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; } return { x: x, y: y, w: e.offsetWidth, h: e.offsetHeight }; };
    var W = root.offsetWidth, H = root.offsetHeight, mob = window.matchMedia('(max-width:900px)').matches;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var els = { lg: q('#lgbox'), st: q('#topo .sh'), cr: q('section[aria-label="Credenciais"] > div'), qd: q('#quando > div > div'), dt: q('.dt'), bt: q('#encb'), ph: q('#enci'), dn: q('.dn'), lp: q('#final .lp') };
    for (var k in els) if (!els[k]) return;
    var lg = pos(els.lg), st = pos(els.st.parentNode), cr = pos(els.cr), qd = pos(els.qd), dt = pos(els.dt), bt = pos(els.bt), ph = pos(els.ph), dn = pos(els.dn), lp = pos(els.lp);
    var cards = document.querySelectorAll('.card'), lc = pos(cards[cards.length - 1]);
    var mks = Array.prototype.map.call(document.querySelectorAll('.mk'), function (m) { var r = pos(m); return [r.x + r.w / 2, r.y + r.h / 2]; });
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
    var lk = lg.w / 150, R0 = 73.6 * lk, cx = lg.x + lg.w / 2, ty = lg.y + 1.4 * lk;
    var d = 'M' + cx + ' ' + ty + ' A' + R0 + ' ' + R0 + ' 0 1 1 ' + cx + ' ' + (ty + 2 * R0) + ' A' + R0 + ' ' + R0 + ' 0 1 1 ' + cx + ' ' + ty;
    var pcx = ph.x + ph.w / 2, pcy = ph.y + ph.h / 2, PR = ph.w / 2 + 10;
    var at = function (deg) { var a = deg * Math.PI / 180; return [pcx + PR * Math.cos(a), pcy + PR * Math.sin(a)]; };
    var arc = function (to, large) { return ' A' + PR + ' ' + PR + ' 0 ' + (large ? 1 : 0) + ' 1 ' + to[0].toFixed(1) + ' ' + to[1].toFixed(1); };
    var midY = function (a, b) { return (a + b) / 2; };
    var yCQ = qd.y - Math.min(34, (qd.y - cr.y - cr.h) / 2), yQD = midY(lc.y + lc.h, dt.y), yWV = dt.y + dt.h + Math.min(90, (mks[0][1] - dt.y - dt.h) * .22);
    var steps = mks.slice();
    var tg = function (deg, k) { var a = deg * Math.PI / 180; var c = at(deg); return [c[0] - Math.sin(a) * k, c[1] + Math.cos(a) * k]; };
    var u = function (x, y) { return [lp.x - 26 + x / 300 * (lp.w + 52), lp.y - 16 + y / 100 * (lp.h + 32)]; };
    var lpEnd = ' C' + u(10, 84).join(' ') + ' ' + u(30, 96).join(' ') + ' ' + u(120, 100).join(' ') + ' C' + u(250, 106).join(' ') + ' ' + u(306, 84).join(' ') + ' ' + u(298, 48).join(' ') + ' C' + u(290, 8).join(' ') + ' ' + u(170, -6).join(' ') + ' ' + u(70, 2).join(' ') + ' C' + u(-4, 8).join(' ') + ' ' + u(-8, 60).join(' ') + ' ' + u(22, 84).join(' ') + ' C' + u(50, 104).join(' ') + ' ' + u(160, 108).join(' ') + ' ' + u(230, 96).join(' ');
    var by = bt.y + bt.h / 2, lastM = mks[mks.length - 1];
    if (mob) {
      d += cr2([[cx, ty], [cx + 70, ty - 6], [W - 34, ty + 2], [gR, ty + 110], [gR, ty + 200], [gR, st.y + st.h / 2], [gR, cr.y], [gR, lc.y], [gR, lc.y + lc.h - 10], [gR - 30, yQD], [W * .5, yQD + 4], [gL + 30, yQD + 8], [gL, dt.y + 40], [gL, dt.y + 160], [gL, dt.y + dt.h], [gL, mks[0][1] - 170], [gL, mks[0][1] - 62]].concat(steps).concat([[lastM[0] - 6, lastM[1] + 150], [gL, lastM[1] + 300], [gL, at(270)[1] - 200], [gL + 6, at(270)[1] - 50], tg(270, -90), at(270)]));
      d += arc(at(90)) + arc(at(270)) + arc(at(90));
      d += cr2([at(90), tg(90, 90), [gL + 20, at(90)[1] + 30], [gL, dn.y + dn.h + 90], [gL, lp.y - 160], [gL + 6, lp.y], u(-70, 125), u(-30, 110)]);
    } else {
      d += cr2([[cx, ty], [cx + 120, ty], [cx + 300, ty - 4], [Math.min(lg.x + 560, st.x - 60), ty + 6], m(40, 70), m(330, 70), m(600, 130), m(670, 380), [gR - 10, st.y + st.h - 20], [gR, st.y + st.h + 110], [gR, cr.y + cr.h - 30], [W * .78, yCQ - 6], [W * .5, yCQ], [W * .22, yCQ + 6], [gL, qd.y + 90], [gL, lc.y], [gL, lc.y + lc.h - 40], [W * .16, yQD], [W * .5, yQD], [W * .84, yQD], [gR, dt.y + 110], [gR, dt.y + dt.h - 120], [gR - 10, dt.y + dt.h - 20], [W * .78, yWV], [W * .5, yWV], [W * .2, yWV - 4], [gL + 40, yWV - 2], [gL, yWV + 40], [gL, yWV + 100], [gL, mks[0][1] - 120], [gL + 4, mks[0][1] - 46], [Math.max(gL + 22, mks[0][0] - 70), mks[0][1] - 2]].concat(steps).concat([[lastM[0] + 170, lastM[1]], [gR - 40, lastM[1] + 30], [gR, lastM[1] + 170], [gR, pcy - 200], tg(-10, -110), at(-10)]));
      d += arc(at(170), true) + arc(at(350), true) + arc(at(80), false);
      d += cr2([at(80), tg(80, 100), [bt.x + bt.w + 80, by + 12], [bt.x + bt.w, by], [bt.x, by], [bt.x - 60, by + 10], [gL + 10, by + 90], [gL, dn.y + dn.h + 70], [gL, lp.y - 170], [gL + 10, lp.y + 10], u(-80, 128), u(-30, 110)]);
    }
    d += lpEnd;
    p.setAttribute('d', d);
    var s1 = document.getElementById('trs1'), s2 = document.getElementById('trs2'), s3 = document.getElementById('trs3'), s4 = document.getElementById('trs4');
    if (s1) { var bb = p.getBBox(), fr = function (v) { return ((v - bb.y) / bb.height).toFixed(4); }; s1.setAttribute('offset', fr(dn.y - 10)); s2.setAttribute('offset', fr(dn.y)); s3.setAttribute('offset', fr(dn.y + dn.h)); s4.setAttribute('offset', fr(dn.y + dn.h + 10)); }
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
    var n = Math.min(v, L);
    p.style.strokeDasharray = L + ' ' + (L + 10);
    p.style.strokeDashoffset = L - n;
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
    var tl; this.onLd = function () { clearTimeout(tl); tl = setTimeout(function () { ST.refresh(); }, 200); };
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
    g.to('#topo .sh', { rotation: -1.5, borderRadius: '88px 52px 96px 60px', duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
    if (!mob) {
      $('#topo .fc').forEach(function (c, i) { g.to(c, { y: i % 2 ? 13 : -13, rotation: i % 2 ? 1.4 : -1.4, duration: 3 + i * .6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.2 }); });
      var ls = [['#topo .ph', -12], ['#topo .sh', 12], ['#topo .ph + div', -6]].map(function (l) { return [g.quickTo(l[0], 'x', { duration: 1, ease: 'power3' }), l[1]]; });
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
        c.addEventListener('mouseenter', function () { g.to(c, { y: -10, boxShadow: '0 22px 44px rgba(4,67,77,.12)', duration: .4, ease: 'power3.out' }); g.to(ic, { rotation: 12, scale: 1.15, duration: .5, ease: 'back.out(3)' }); });
        c.addEventListener('mouseleave', function () { g.to(c, { y: 0, boxShadow: '0 0 0 rgba(4,67,77,0)', duration: .5, ease: 'power3.out' }); g.to(ic, { rotation: 0, scale: 1, duration: .5 }); });
      });
    }
    g.to('.btn > svg', { x: 5, duration: .7, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    g.fromTo('#topo .btn:first-child', { boxShadow: '0 0 0 0 rgba(0,125,115,.55)' }, { boxShadow: '0 0 0 18px rgba(0,125,115,0)', duration: 1.8, repeat: -1, repeatDelay: .5, ease: 'power2.out', delay: 2.4 });
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

    rev('#como-funciona > div > p, #como-funciona h2', {}, '#como-funciona h2');
    $('.stp').forEach(function (s, i) {
      var tl = g.timeline({ scrollTrigger: { trigger: mob ? s : '.steps', start: mob ? 'top 80%' : 'top 72%', once: true }, delay: mob ? 0 : i * .3 });
      tl.from(s.querySelector('.mk'), { scale: 0, rotation: -90, duration: .9, ease: 'back.out(2.2)' })
        .from(s.querySelectorAll('h3, p'), { y: 26, autoAlpha: 0, duration: .8, ease: 'power3.out', stagger: .1 }, .25);
    });

    g.from('.dn', { y: 90, scale: .94, autoAlpha: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform', scrollTrigger: { trigger: '.dn', start: 'top 88%', once: true } });
    g.from('.dn .w', { yPercent: 70, rotate: 5, autoAlpha: 0, duration: .9, ease: 'power4.out', stagger: .06, scrollTrigger: { trigger: '.dn h2', start: 'top 82%', once: true } });
    rev('.dnt', { y: 24, delay: .3 }, '.dn h2');
    g.from('#enci', { scale: .55, rotation: -14, autoAlpha: 0, duration: 1.4, ease: 'back.out(1.5)', scrollTrigger: { trigger: '.dng', start: 'top 80%', once: true } });
    g.to('#encr', { rotation: 360, transformOrigin: '50% 50%', duration: 70, ease: 'none', repeat: -1 });

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
    g.fromTo('#final .btn', { boxShadow: '0 0 0 0 rgba(4,67,77,.45)' }, { boxShadow: '0 0 0 18px rgba(4,67,77,0)', duration: 1.8, repeat: -1, repeatDelay: .5, ease: 'power2.out' });
    var fsafe = function () {
      var max = ST.maxScroll(window);
      ST.getAll().forEach(function (t) { if (t.vars.once && t.animation && t.start >= max - 2) t.animation.progress(1); });
    };
    ST.addEventListener('refresh', fsafe);
    fsafe();
    
  }
  renderVals() {
    return {};
  }
}
  function boot() {
    var c = new Component(PROPS);
    if (!c.state) c.state = {};
    paint(c); wire();
    if (c.componentDidMount) c.componentDidMount();
    window.addEventListener('pagehide', function () { if (c.componentWillUnmount) c.componentWillUnmount(); });
  }
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
