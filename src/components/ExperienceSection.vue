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
        <li v-for="(e, i) in experience" :key="i" class="row">
          <span class="row__fill" aria-hidden="true"></span>
          <span class="row__period f-mono">{{ tr(e.period) }}</span>
          <div class="row__main">
            <h3 class="row__role f-display">{{ tr(e.role) }}</h3>
            <p class="row__company">{{ tr(e.company) }}</p>
          </div>
          <p class="row__detail">{{ tr(e.detail) }}</p>
          <ul class="row__tags">
            <li v-for="t in e.tags" :key="t">{{ t }}</li>
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

.xp__list { list-style: none; margin: 0; padding: 0; }
.row {
  --rule: 1;
  position: relative;
  display: grid; grid-template-columns: 1fr; gap: 10px;
  padding: 28px 0 30px;
  isolation: isolate;
}
.row::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 1px; background: var(--line); transform: scaleX(var(--rule)); transform-origin: left; }
.row:last-child { border-bottom: 1px solid var(--line); }
.row__fill { position: absolute; inset: 0; background: var(--cyan); transform: scaleY(0); transform-origin: bottom; transition: transform .55s var(--ease-out); z-index: -1; }
.row:hover .row__fill { transform: scaleY(1); }
.row:hover, .row:hover .row__company, .row:hover .row__period, .row:hover .row__detail { color: var(--ink); }
.row:hover .row__tags li { border-color: rgba(10,10,10,.3); color: var(--ink); }

.row__period { font-size: 12px; color: var(--cyan); transition: color .3s; }
.row__role { font-size: clamp(28px, 3vw, 46px); font-weight: 500; letter-spacing: -0.03em; line-height: 1.02; }
.row__company { color: var(--mute); margin-top: 4px; transition: color .3s; }
.row__detail { color: #bdbdb8; font-size: 16px; line-height: 1.55; max-width: 48ch; transition: color .3s; }
.row__tags { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; padding: 0; margin: 4px 0 0; }
.row__tags li { font-family: var(--f-mono); font-size: 11px; padding: 5px 9px; border: 1px solid var(--line); color: #cfcfca; transition: color .3s, border-color .3s; }

@media (min-width: 1024px) {
  .row { grid-template-columns: 2fr 5fr 5fr 3fr; column-gap: 20px; align-items: start; padding: 34px 12px 38px; margin: 0 -12px; }
  .row__tags { justify-content: flex-end; margin: 0; }
}
</style>
