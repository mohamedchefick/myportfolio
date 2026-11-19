<template>
  <section ref="root" class="stack" data-theme="light" data-rise>
    <div class="wrap">
      <div class="stack__head">
        <span class="label">{{ t('stack.label') }}</span>
        <span class="label stack__mute">{{ t('stack.sub') }}</span>
      </div>

      <h2 class="stack__title f-display">
        <span class="line-mask"><span>{{ t('stack.t1') }}</span></span>
        <span class="line-mask"><span><em class="f-serif">{{ t('stack.t2a') }}</em> {{ t('stack.t2b') }}</span></span>
      </h2>

      <div class="stack__cols">
        <article v-for="c in capabilities" :key="c.key" class="cap">
          <div class="cap__rule"></div>
          <div class="cap__top">
            <span class="cap__idx f-mono">{{ c.index }}</span>
            <h3 class="cap__title f-display">{{ c.title }}</h3>
          </div>
          <p class="cap__note f-serif">{{ tr(c.note) }}</p>
          <p class="cap__body">{{ tr(c.body) }}</p>
          <ul class="cap__list">
            <li v-for="it in c.items" :key="it"><span>{{ it }}</span></li>
          </ul>
        </article>
      </div>

      <div class="process">
        <p class="label process__label">{{ t('stack.process') }}</p>
        <ol class="process__steps">
          <li v-for="(s, i) in steps" :key="i" class="step">
            <span class="step__n f-mono">{{ String(i + 1).padStart(2, '0') }}</span>
            <h4 class="step__t f-display">{{ tr(s.t) }}</h4>
            <p class="step__d">{{ tr(s.d) }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { capabilities, steps } from '@/data/content';
import { t, tr } from '@/lib/i18n';
import { gsap, prefersReducedMotion } from '@/lib/motion';

const root = ref(null);
let ctx;

onMounted(() => {
  const q = gsap.utils.selector(root.value);
  ctx = gsap.context(() => {
    if (prefersReducedMotion) return;
    gsap.from(q('.stack__title .line-mask > span'), { yPercent: 110, duration: 1.3, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: q('.stack__title')[0], start: 'top 85%' } });

    q('.cap').forEach((c, i) => {
      const s = gsap.utils.selector(c);
      gsap.timeline({ scrollTrigger: { trigger: c, start: 'top 82%' }, defaults: { ease: 'expo.out' }, delay: i * 0.08 })
        .from(s('.cap__rule'), { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'expo.inOut' })
        .from(s('.cap__top, .cap__note, .cap__body'), { y: 30, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.3)
        .from(s('.cap__list li'), { y: 14, opacity: 0, duration: 0.7, stagger: 0.04 }, 0.5);
    });

    gsap.from(q('.step'), { y: 50, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: q('.process')[0], start: 'top 82%' } });
  }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<style scoped>
.stack { background: var(--paper); color: var(--ink); padding: clamp(96px, 12vw, 190px) 0; }
.stack__head { display: flex; justify-content: space-between; border-top: 1px solid var(--line-dark); padding-top: 14px; }
.stack__mute { color: var(--mute-dark); }
.stack__title { margin: clamp(28px, 4vw, 56px) 0 clamp(56px, 8vw, 120px); font-size: clamp(42px, 7.4vw, 128px); font-weight: 500; line-height: 0.95; letter-spacing: -0.045em; }
.stack__title em { font-size: 1.06em; }

.stack__cols { display: grid; gap: 56px; }
.cap__rule { height: 2px; background: var(--ink); margin-bottom: 18px; }
.cap__top { display: flex; align-items: baseline; gap: 12px; }
.cap__idx { font-size: 12px; color: var(--mute-dark); }
.cap__title { font-size: clamp(34px, 3.6vw, 56px); font-weight: 500; letter-spacing: -0.035em; line-height: 1; }
.cap__note { font-size: clamp(20px, 1.6vw, 24px); margin: 14px 0 12px; color: var(--ink); }
.cap__body { color: #3a3a37; font-size: 16px; line-height: 1.55; max-width: 40ch; }
.cap__list { list-style: none; margin: 22px 0 0; padding: 0; border-top: 1px solid var(--line-dark); }
.cap__list li { border-bottom: 1px solid var(--line-dark); padding: 11px 0; font-size: 15px; font-weight: 500; position: relative; overflow: hidden; }
.cap__list li span { position: relative; z-index: 1; display: inline-block; transition: transform .5s var(--ease-out); }
.cap__list li::before { content: ''; position: absolute; inset: 0; background: var(--ink); transform: scaleY(0); transform-origin: bottom; transition: transform .45s var(--ease-out); }
.cap__list li:hover::before { transform: scaleY(1); }
.cap__list li:hover span { transform: translateX(12px); color: var(--cyan); }

.process { margin-top: clamp(80px, 10vw, 160px); }
.process__label { color: var(--mute-dark); margin-bottom: 18px; }
.process__steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr; border-top: 1px solid var(--ink); }
.step { padding: 22px 0 26px; border-bottom: 1px solid var(--line-dark); display: grid; grid-template-columns: 48px 1fr; column-gap: 8px; }
.step__n { font-size: 12px; color: var(--mute-dark); padding-top: 8px; }
.step__t { font-size: clamp(26px, 2.4vw, 36px); font-weight: 500; letter-spacing: -0.03em; }
.step__d { grid-column: 2; color: #3a3a37; font-size: 15px; margin-top: 6px; max-width: 34ch; }

@media (min-width: 768px) {
  .process__steps { grid-template-columns: repeat(2, 1fr); }
  .step:nth-child(odd) { padding-right: 24px; border-right: 1px solid var(--line-dark); }
  .step:nth-child(even) { padding-left: 24px; }
}
@media (min-width: 1024px) {
  .stack__cols { grid-template-columns: repeat(3, 1fr); column-gap: 32px; }
  .process__steps { grid-template-columns: repeat(4, 1fr); }
  .step { grid-template-columns: 1fr; padding: 22px 24px 30px 0; border-right: 1px solid var(--line-dark); border-bottom: 0; }
  .step:nth-child(even) { padding-left: 24px; }
  .step:nth-child(n+2) { padding-left: 24px; }
  .step:last-child { border-right: 0; }
  .step__n { padding-top: 0; margin-bottom: 26px; }
  .step__d { grid-column: 1; }
}
</style>
