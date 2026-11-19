<template>
  <section ref="root" class="hero">
    <canvas ref="canvas" class="hero__field" aria-hidden="true"></canvas>

    <div class="hero__inner wrap">
      <div class="hero__meta">
        <span class="label">(Portfolio) ©2026</span>
        <span class="label hero__meta-mid">Front-end<span class="hero__arrow">→</span>Full-stack</span>
        <span class="label hero__meta-end">Web · API · Mobile</span>
      </div>

      <h1 class="hero__name f-display" aria-label="Mohamed Chêfick">
        <span class="hero__line hero__line--1" aria-hidden="true">
          <span v-for="(ch, i) in 'Mohamed'" :key="'a' + i" class="hero__ch-mask"><span class="hero__ch">{{ ch }}</span></span>
        </span>
        <span class="hero__line hero__line--2" aria-hidden="true">
          <span class="hero__aside f-serif">{{ t('hero.aside') }}</span>
          <span v-for="(ch, i) in 'Chêfick'" :key="'b' + i" class="hero__ch-mask"><span class="hero__ch" :class="{ 'is-accent': i === 2 }">{{ ch }}</span></span>
        </span>
      </h1>

      <div class="hero__bottom">
        <p class="hero__intro">
          <template v-for="(w, i) in introWords" :key="locale + i"><span class="hero__wm"><span class="hero__w">{{ w }}</span></span>{{ ' ' }}</template>
        </p>
        <div class="hero__ctas">
          <a v-magnetic href="#work" class="btn btn--cyan" data-cursor="Go" @click.prevent="scrollToTarget('#work')">
            <span>{{ t('hero.ctaWork') }}</span><span class="btn__arrow">↓</span>
          </a>
          <a v-magnetic href="#contact" class="btn btn--ghost" @click.prevent="scrollToTarget('#contact')">
            <span>{{ t('hero.ctaContact') }}</span><span class="btn__arrow">→</span>
          </a>
        </div>
      </div>
    </div>

    <div class="hero__scroll label" aria-hidden="true"><span>{{ t('hero.scroll') }}</span><i></i></div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { gsap, ScrollTrigger, appState, scrollToTarget, isTouch, prefersReducedMotion } from '@/lib/motion';
import { t, locale } from '@/lib/i18n';
import { DotField } from '@/three/DotField';

const root = ref(null);
const canvas = ref(null);
const introWords = computed(() => t('hero.intro').split(' '));

let field, ctx, io, chars = [], hoverOn = false;

function playIntro() {
  const q = gsap.utils.selector(root.value);
  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onComplete: () => {
      // free the letters from their masks so they can move on hover
      q('.hero__ch-mask').forEach((m) => (m.style.overflow = 'visible'));
      hoverOn = true;
    },
  });
  tl.fromTo(q('.hero__ch'), { yPercent: 115, rotationX: -80 }, { yPercent: 0, rotationX: 0, duration: 1.6, stagger: 0.05 })
    .to(q('.hero__w'), { yPercent: 0, duration: 1.1, stagger: 0.012 }, 0.55)
    .to(q('.hero__meta .label, .hero__aside, .hero__ctas .btn, .hero__scroll'), { opacity: 1, y: 0, duration: 1, stagger: 0.05 }, 0.8);
  if (field) tl.to(field.uniforms.uReveal, { value: 1, duration: 2.8, ease: 'power2.out' }, 0.1);
}

/* Letters lift and lean toward the cursor */
function onPointer(e) {
  if (!hoverOn) return;
  chars.forEach((c) => {
    const r = c.el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const f = Math.max(0, 1 - Math.hypot(dx, dy) / 420);
    c.y(-f * f * r.height * 0.14);
    c.r(gsap.utils.clamp(-14, 14, (dx / 420) * -14 * f));
    c.s(1 + f * f * 0.06);
  });
}
function onLeave() { chars.forEach((c) => { c.y(0); c.r(0); c.s(1); }); }

onMounted(() => {
  const q = gsap.utils.selector(root.value);

  if (!prefersReducedMotion) {
    gsap.set(q('.hero__ch'), { yPercent: 115, transformPerspective: 600, transformOrigin: '50% 100%' });
    gsap.set(q('.hero__w'), { yPercent: 110 });
    gsap.set(q('.hero__meta .label, .hero__aside, .hero__ctas .btn, .hero__scroll'), { opacity: 0, y: 14 });
  }

  try {
    field = new DotField(canvas.value);
    if (prefersReducedMotion) field.uniforms.uReveal.value = 1;
    io = new IntersectionObserver(([e]) => (e.isIntersecting ? field.start() : field.stop()));
    io.observe(root.value);
  } catch (e) {
    field = null; // no WebGL: the section still works without it
  }

  ctx = gsap.context(() => {
    if (prefersReducedMotion) return;
    const st = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true };
    // On scroll the name breaks apart, each letter on its own depth
    q('.hero__ch-mask').forEach((m, i) => {
      const dir = i % 2 ? 1 : -1;
      gsap.to(m, {
        yPercent: -40 - ((i * 37) % 60),
        rotationX: 35 * dir,
        rotationZ: 6 * dir,
        z: 80 + ((i * 53) % 120),
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: st,
      });
    });
    gsap.to(q('.hero__bottom'), { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '60% top' } });
    gsap.to(canvas.value, { opacity: 0.2, ease: 'none', scrollTrigger: st });
  }, root.value);

  if (!isTouch && !prefersReducedMotion) {
    chars = q('.hero__ch').map((el) => ({
      el,
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.5)' }),
      r: gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'elastic.out(1, 0.5)' }),
      s: gsap.quickTo(el, 'scale', { duration: 0.9, ease: 'elastic.out(1, 0.5)' }),
    }));
    root.value.addEventListener('pointermove', onPointer);
    root.value.addEventListener('pointerleave', onLeave);
  }

  watch(() => appState.ready, (r) => r && !prefersReducedMotion && playIntro(), { immediate: true });
  ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
  ctx?.revert();
  io?.disconnect();
  field?.dispose();
  root.value?.removeEventListener('pointermove', onPointer);
  root.value?.removeEventListener('pointerleave', onLeave);
});
</script>

<style scoped>
.hero { position: relative; min-height: 100svh; overflow: hidden; background: var(--ink); }
.hero__field { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }

.hero__inner {
  position: relative; z-index: 1;
  min-height: 100svh;
  display: flex; flex-direction: column; justify-content: space-between; gap: 40px;
  padding-top: 96px; padding-bottom: 28px;
}

.hero__meta { display: flex; justify-content: space-between; gap: 12px; color: var(--mute); border-top: 1px solid var(--line); padding-top: 14px; }
.hero__meta-mid, .hero__meta-end { display: none; }
.hero__arrow { color: var(--cyan); margin: 0 0.5em; }

.hero__name {
  font-weight: 600; line-height: 0.84; letter-spacing: -0.045em; text-transform: uppercase;
  font-size: clamp(52px, 17vw, 340px);
  perspective: 900px; transform-style: preserve-3d;
}
.hero__line { display: flex; white-space: nowrap; transform-style: preserve-3d; }
.hero__line--2 { position: relative; justify-content: flex-end; align-items: flex-end; }
.hero__ch-mask { display: inline-block; overflow: hidden; padding-top: 0.08em; margin-top: -0.08em; transform-style: preserve-3d; will-change: transform; }
.hero__ch { display: inline-block; will-change: transform; }
.hero__ch.is-accent { color: var(--cyan); }

.hero__aside { display: none; text-transform: none; font-size: clamp(18px, 1.7vw, 28px); line-height: 1.05; letter-spacing: 0; color: var(--mute); position: absolute; left: 0; bottom: 0.5em; max-width: 9em; white-space: normal; }

.hero__bottom { display: flex; flex-direction: column; gap: 26px; }
.hero__intro { font-size: clamp(18px, 1.55vw, 24px); line-height: 1.35; max-width: 34ch; font-weight: 500; letter-spacing: -0.01em; }
.hero__wm { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.hero__w { display: inline-block; }
.hero__ctas { display: flex; flex-wrap: wrap; gap: 10px; }

.hero__scroll { display: none; }

.btn { display: inline-flex; align-items: center; gap: 14px; height: 52px; padding: 0 22px; font-weight: 500; font-size: 15px; border: 1px solid transparent; transition: background-color .35s, color .35s, border-color .35s; }
.btn__arrow { display: inline-block; transition: transform .5s var(--ease-out); }
.btn:hover .btn__arrow { transform: translate(3px, 3px); }
.btn--ghost:hover .btn__arrow { transform: translateX(5px); }
.btn--cyan { background: var(--cyan); color: var(--ink); }
.btn--cyan:hover { background: var(--white); }
.btn--ghost { border-color: var(--line); color: var(--white); background: rgba(10, 10, 10, 0.5); }
.btn--ghost:hover { border-color: var(--white); }

@media (min-width: 768px) {
  .hero__meta-mid, .hero__meta-end { display: inline; }
  .hero__aside { display: block; }
}

@media (min-width: 1024px) {
  .hero__inner { padding-top: 92px; }
  .hero__name { font-size: clamp(120px, 17.2vw, 340px); margin: auto 0; }
  .hero__bottom { flex-direction: row; justify-content: space-between; align-items: flex-end; }
  .hero__scroll {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    position: absolute; left: 50%; bottom: 28px; transform: translateX(-50%); color: var(--mute); z-index: 2;
  }
  .hero__scroll i { width: 1px; height: 38px; background: var(--line); position: relative; overflow: hidden; }
  .hero__scroll i::after { content: ''; position: absolute; inset: 0; background: var(--cyan); animation: drip 2.2s var(--ease-out) infinite; }
}

@keyframes drip { 0% { transform: translateY(-100%); } 60%, 100% { transform: translateY(100%); } }
</style>
