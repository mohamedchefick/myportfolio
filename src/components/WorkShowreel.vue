<template>
  <section ref="root" class="reel" :class="{ 'is-fallback': failed }">
    <div class="reel__head wrap">
      <span class="label">{{ t('reel.label') }}</span>
      <span class="label reel__mute">{{ failed ? t('hero.scroll') : t('reel.hint') }}</span>
    </div>

    <h2 class="reel__title wrap f-display">
      <span class="line-mask"><span>{{ t('reel.t1') }}</span></span>
      <span class="line-mask"><span><em class="f-serif">{{ t('reel.t2a') }}</em> {{ t('reel.t2b') }}</span></span>
    </h2>

    <div ref="stage" class="reel__stage" @pointermove="onPointer">
      <canvas ref="canvas" class="reel__canvas" aria-hidden="true"></canvas>

      <div class="reel__ui wrap">
        <div class="reel__count f-display" aria-live="polite">
          <span class="reel__count-mask"><Transition name="roll" mode="out-in"><span :key="active">{{ pad(active + 1) }}</span></Transition></span>
          <span class="reel__count-total">/{{ pad(projects.length) }}</span>
        </div>

        <div class="reel__info">
          <Transition name="roll" mode="out-in">
            <div :key="active" class="reel__info-inner">
              <p class="label reel__kind">{{ tr(current.kind) }} — {{ current.year }}</p>
              <h3 class="reel__name f-display">{{ current.title }}</h3>
            </div>
          </Transition>
        </div>

        <div class="reel__actions">
          <Transition name="fade" mode="out-in">
            <a v-if="current.url" :key="'a' + active" :href="current.url" target="_blank" rel="noopener" class="reel__visit" :data-cursor="t('reel.visit')">
              <span>{{ tr(current.domain) }}</span><span>↗</span>
            </a>
            <span v-else :key="'b' + active" class="reel__visit is-private"><span>{{ tr(current.domain) }}</span></span>
          </Transition>
          <div class="reel__dots" aria-hidden="true">
            <i v-for="(p, i) in projects" :key="p.id" :class="{ on: i === active }"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { projects } from '@/data/content';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion';
import { Carousel } from '@/three/Carousel';
import { t, tr } from '@/lib/i18n';

const root = ref(null);
const stage = ref(null);
const canvas = ref(null);
const active = ref(0);
const failed = ref(false);
const current = computed(() => projects[active.value]);
const pad = (n) => String(n).padStart(2, '0');

let carousel, st, io, ctx;

function onPointer(e) {
  if (!carousel) return;
  const r = stage.value.getBoundingClientRect();
  carousel.setPointer(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
}

onMounted(() => {
  const q = gsap.utils.selector(root.value);
  try {
    carousel = new Carousel(canvas.value, projects.map((p) => p.image));
  } catch (e) {
    failed.value = true; // no WebGL: the detailed list below still shows everything
    return;
  }

  const n = projects.length;
  st = ScrollTrigger.create({
    trigger: stage.value,
    start: 'top top',
    end: () => `+=${window.innerHeight * (n - 1) * 0.55}`,
    pin: true,
    scrub: true,
    snap: prefersReducedMotion ? false : { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: 'power2.inOut' },
    onUpdate(self) {
      carousel.setProgress(self.progress);
      const idx = Math.round(self.progress * (n - 1));
      if (idx !== active.value) active.value = idx;
    },
    onRefresh: () => carousel.resize(),
  });

  io = new IntersectionObserver(([e]) => (e.isIntersecting ? carousel.start() : carousel.stop()), { rootMargin: '100px' });
  io.observe(stage.value);

  ctx = gsap.context(() => {
    if (prefersReducedMotion) return;
    gsap.from(q('.reel__title .line-mask > span'), {
      yPercent: 110, duration: 1.3, stagger: 0.08, ease: 'expo.out',
      scrollTrigger: { trigger: q('.reel__title')[0], start: 'top 85%' },
    });
    gsap.from(canvas.value, {
      opacity: 0, scale: 0.92, duration: 1.6, ease: 'expo.out',
      scrollTrigger: { trigger: stage.value, start: 'top 75%' },
    });
  }, root.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
  st?.kill();
  io?.disconnect();
  carousel?.dispose();
});
</script>

<style scoped>
.reel { background: var(--ink); padding-top: clamp(96px, 12vw, 180px); }
.reel.is-fallback .reel__stage { display: none; }
.reel__head { display: flex; justify-content: space-between; border-top: 1px solid var(--line); padding-top: 14px; margin-left: var(--gutter); margin-right: var(--gutter); padding-left: 0; padding-right: 0; }
.reel__mute { color: var(--mute); }

.reel__title { margin-top: clamp(28px, 4vw, 56px); font-size: clamp(48px, 9vw, 152px); font-weight: 500; line-height: 0.92; letter-spacing: -0.045em; }
.reel__title em { color: var(--cyan); font-size: 1.08em; }

.reel__stage { position: relative; height: 100svh; overflow: hidden; }
.reel__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }

.reel__ui {
  position: absolute; inset: 0; pointer-events: none;
  display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto 1fr auto;
  padding-top: 88px; padding-bottom: 28px;
}
.reel__ui a { pointer-events: auto; }

.reel__count { grid-column: 1; grid-row: 1; display: flex; align-items: flex-start; font-weight: 500; line-height: 0.85; }
.reel__count-mask { display: inline-block; overflow: hidden; font-size: clamp(56px, 8vw, 128px); letter-spacing: -0.05em; font-variant-numeric: tabular-nums; }
.reel__count-mask > span { display: inline-block; }
.reel__count-total { font-family: var(--f-mono); font-size: 12px; color: var(--mute); margin-left: 8px; margin-top: 6px; }

.reel__info { grid-column: 1 / -1; grid-row: 3; overflow: hidden; }
.reel__kind { color: var(--cyan); margin-bottom: 6px; }
.reel__name { font-size: clamp(34px, 5vw, 80px); font-weight: 500; letter-spacing: -0.035em; line-height: 1; }

.reel__actions { grid-column: 2; grid-row: 1; display: flex; flex-direction: column; align-items: flex-end; gap: 16px; }
.reel__visit { display: inline-flex; gap: 10px; align-items: center; border: 1px solid var(--line); padding: 10px 14px; font-size: 13px; font-family: var(--f-mono); background: rgba(10, 10, 10, 0.7); transition: background .3s, color .3s, border-color .3s; }
.reel__visit:hover { background: var(--cyan); color: var(--ink); border-color: var(--cyan); }
.reel__visit.is-private { color: var(--mute); }
.reel__dots { display: flex; gap: 6px; }
.reel__dots i { width: 14px; height: 2px; background: var(--line); transition: background .4s, width .4s var(--ease-out); }
.reel__dots i.on { width: 30px; background: var(--cyan); }

@media (min-width: 1024px) {
  .reel__info { grid-column: 1; }
  .reel__actions { grid-row: 3; justify-content: flex-end; }
}

/* transitions */
.roll-enter-active, .roll-leave-active { transition: transform .5s var(--ease-out), opacity .5s; }
.roll-enter-from { transform: translateY(100%); opacity: 0; }
.roll-leave-to { transform: translateY(-100%); opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity .3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
