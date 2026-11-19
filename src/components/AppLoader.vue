<template>
  <div ref="root" class="loader" role="status" aria-label="Loading">
    <div class="loader__top wrap">
      <span class="label">Mohamed Chêfick</span>
      <span class="label loader__mute">Portfolio — ©2026</span>
    </div>

    <div class="loader__center wrap">
      <p ref="words" class="loader__words f-display">
        <span class="line-mask"><span>{{ t('loader.w1') }}</span></span>
        <span class="line-mask"><span>{{ t('loader.w2') }}</span></span>
        <span class="line-mask"><span>{{ t('loader.w3') }}</span></span>
      </p>
    </div>

    <div class="loader__bottom wrap">
      <div class="loader__bar"><span ref="bar"></span></div>
      <span ref="count" class="loader__count f-display">000</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap, prefersReducedMotion } from '@/lib/motion';
import { t } from '@/lib/i18n';

const emit = defineEmits(['done']);
const root = ref(null);
const words = ref(null);
const bar = ref(null);
const count = ref(null);

function assetsReady() {
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const load = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((r) => window.addEventListener('load', r, { once: true }));
  // never block more than 6s on a slow network
  return Promise.race([Promise.all([fonts, load]), new Promise((r) => setTimeout(r, 6000))]);
}

onMounted(async () => {
  if (prefersReducedMotion) {
    await assetsReady();
    emit('done');
    return;
  }

  const progress = { v: 0 };
  const render = () => {
    count.value.textContent = String(Math.round(progress.v)).padStart(3, '0');
    bar.value.style.transform = `scaleX(${progress.v / 100})`;
  };

  const lines = words.value.querySelectorAll('.line-mask > span');
  gsap.set(lines, { yPercent: 110 });
  const wordsTl = gsap.timeline();
  lines.forEach((l, i) => {
    wordsTl.to(l, { yPercent: 0, duration: 0.7, ease: 'expo.out' }, i * 0.45);
    if (i < lines.length - 1) wordsTl.to(l, { yPercent: -110, duration: 0.6, ease: 'expo.in' }, i * 0.45 + 0.4);
  });

  // fill to 80% while waiting, then finish once assets are in
  const fill = gsap.to(progress, { v: 82, duration: 1.4, ease: 'power2.out', onUpdate: render });
  await Promise.all([assetsReady(), new Promise((r) => setTimeout(r, 1500))]);
  fill.kill();
  await gsap.to(progress, { v: 100, duration: 0.45, ease: 'power2.inOut', onUpdate: render });

  const tl = gsap.timeline({ onComplete: () => emit('done') });
  tl.to([count.value, lines], { yPercent: -110, duration: 0.6, ease: 'expo.in' })
    .to(root.value.querySelectorAll('.label, .loader__bar'), { opacity: 0, duration: 0.3 }, '<')
    .to(root.value, { clipPath: 'inset(0 0 100% 0)', duration: 1.05, ease: 'expo.inOut' }, '-=0.15');
});
</script>

<style scoped>
.loader {
  position: fixed; inset: 0; z-index: 200;
  background: var(--ink);
  color: var(--white);
  display: flex; flex-direction: column; justify-content: space-between;
  clip-path: inset(0 0 0 0);
}
.loader__top { display: flex; justify-content: space-between; padding-top: 28px; }
.loader__mute { color: var(--mute); }
.loader__center { flex: 1; display: flex; align-items: center; }
.loader__words { position: relative; height: 1.1em; font-size: clamp(32px, 6vw, 80px); font-weight: 500; line-height: 1; }
.loader__words .line-mask { position: absolute; left: 0; top: 0; white-space: nowrap; }
.loader__bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; padding-bottom: 20px; }
.loader__bar { flex: 1; height: 1px; background: var(--line); margin-bottom: 0.9em; overflow: hidden; }
.loader__bar span { display: block; height: 100%; background: var(--cyan); transform: scaleX(0); transform-origin: left; }
.loader__count { font-size: clamp(72px, 16vw, 220px); font-weight: 600; line-height: 0.8; overflow: hidden; font-variant-numeric: tabular-nums; }
</style>
