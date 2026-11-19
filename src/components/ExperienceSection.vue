<template>
  <section ref="root" class="xp">
    <div class="wrap">
      <div class="xp__head">
        <span class="label">{{ t('xp.label') }}</span>
        <span class="label xp__mute">{{ t('xp.sub') }}</span>
      </div>

      <h2 class="xp__title f-display">
        <span class="line-mask"><span>{{ t('xp.t1') }}</span></span>
        <span class="line-mask"><span>{{ t('xp.t2a') }} <em class="f-serif">{{ t('xp.t2b') }}</em>.</span></span>
      </h2>

      <ol class="xp__list">
        <li v-for="(e, i) in experience" :key="i" class="row" :class="{ 'is-current': e.current }">
          <span class="row__fill" aria-hidden="true"></span>
          <span class="row__dot" aria-hidden="true"></span>
          <span class="row__period f-mono">
            {{ tr(e.period) }}
            <span v-if="e.current" class="visually-hidden">— {{ t('xp.current') }}</span>
          </span>
          <div class="row__main">
            <h3 class="row__role f-display">{{ tr(e.role) }}</h3>
            <p class="row__company">{{ tr(e.company) }}</p>
          </div>
          <p class="row__detail">{{ tr(e.detail) }}</p>
          <ul class="row__tags">
            <li v-for="tag in e.tags" :key="tag">{{ tag }}</li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { experience } from '@/data/content';
import { t, tr } from '@/lib/i18n';
import { gsap, prefersReducedMotion } from '@/lib/motion';

const root = ref(null);
let ctx;

onMounted(() => {
  const q = gsap.utils.selector(root.value);
  ctx = gsap.context(() => {
    if (prefersReducedMotion) return;
    gsap.from(q('.xp__title .line-mask > span'), { yPercent: 110, duration: 1.3, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: q('.xp__title')[0], start: 'top 85%' } });
    q('.row').forEach((r) => {
      gsap.from(r, { '--rule': 0, duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: r, start: 'top 88%' } });
      gsap.from(r.querySelectorAll('.row__period, .row__main, .row__detail, .row__tags'), {
        y: 34, opacity: 0, duration: 1.1, stagger: 0.06, ease: 'expo.out',
        scrollTrigger: { trigger: r, start: 'top 88%' },
      });
    });
  }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<style scoped>
.xp { background: var(--ink); padding: clamp(96px, 12vw, 190px) 0; }
.xp__head { display: flex; justify-content: space-between; border-top: 1px solid var(--line); padding-top: 14px; }
.xp__mute { color: var(--mute); }
.xp__title { margin: clamp(28px, 4vw, 56px) 0 clamp(48px, 7vw, 100px); font-size: clamp(42px, 7.4vw, 128px); font-weight: 500; line-height: 0.95; letter-spacing: -0.045em; }
.xp__title em { color: var(--cyan); font-size: 1.06em; }

.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

.xp__list { list-style: none; margin: 0; padding: 0; position: relative; }

/* ── Mobile / tablet: vertical timeline ── */
.xp__list::before { content: ''; position: absolute; left: 5px; top: 10px; bottom: 10px; width: 1px; background: var(--line); }

.row {
  --rule: 1;
  position: relative;
  display: grid; grid-template-columns: 1fr; gap: 10px;
  padding: 0 0 40px 32px;
}
.row:last-child { padding-bottom: 0; }
.row__fill { display: none; }

.row__dot {
  position: absolute; left: 0; top: 4px;
  width: 11px; height: 11px; border-radius: 50%;
  background: var(--ink); border: 1px solid var(--mute);
}
.row.is-current .row__dot { background: var(--cyan); border-color: var(--cyan); }
.row.is-current .row__dot::after {
  content: ''; position: absolute; inset: -5px; border-radius: 50%; border: 1px solid var(--cyan);
  animation: xp-ping 2.4s var(--ease-out) infinite;
}
@keyframes xp-ping { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.8); opacity: 0; } }

.row__period {
  justify-self: start;
  font-size: 11px; letter-spacing: 0.04em; color: var(--cyan);
  border: 1px solid rgba(10, 255, 236, 0.35); padding: 3px 8px;
}
.row__role { font-size: clamp(26px, 7vw, 46px); font-weight: 500; letter-spacing: -0.03em; line-height: 1.04; }
.row__company { color: var(--mute); margin-top: 6px; font-size: 15px; }
.row__detail { color: #bdbdb8; font-size: 16px; line-height: 1.55; max-width: 48ch; }
.row__tags { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; padding: 0; margin: 4px 0 0; }
.row__tags li { font-family: var(--f-mono); font-size: 11px; padding: 5px 9px; border: 1px solid var(--line); color: #cfcfca; }

/* ── Desktop: full-width table rows ── */
@media (min-width: 1024px) {
  .xp__list::before { display: none; }
  .row {
    grid-template-columns: 2fr 5fr 5fr 3fr; column-gap: 20px; align-items: start;
    padding: 34px 12px 38px; margin: 0 -12px;
    isolation: isolate;
  }
  .row:last-child { padding-bottom: 38px; border-bottom: 1px solid var(--line); }
  .row::after { content: ''; position: absolute; left: 12px; right: 12px; top: 0; height: 1px; background: var(--line); transform: scaleX(var(--rule)); transform-origin: left; }
  .row__dot { display: none; }
  .row__period { border: 0; padding: 0; font-size: 12px; display: inline-flex; align-items: center; gap: 8px; }
  .row.is-current .row__period::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--cyan); }
  .row__role { font-size: clamp(28px, 3vw, 46px); }
  .row__tags { justify-content: flex-end; margin: 0; }

  .row__fill { display: block; position: absolute; inset: 0; background: var(--cyan); transform: scaleY(0); transform-origin: bottom; transition: transform .55s var(--ease-out); z-index: -1; }
  .row__period, .row__company, .row__detail, .row__tags li { transition: color .3s, border-color .3s; }
}

/* Hover highlight only where a real pointer exists — never sticks on touch screens */
@media (min-width: 1024px) and (hover: hover) and (pointer: fine) {
  .row:hover .row__fill { transform: scaleY(1); }
  .row:hover, .row:hover .row__company, .row:hover .row__period, .row:hover .row__detail { color: var(--ink); }
  .row:hover.is-current .row__period::before { background: var(--ink); }
  .row:hover .row__tags li { border-color: rgba(10, 10, 10, 0.3); color: var(--ink); }
}
</style>
