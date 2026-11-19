<template>
  <section ref="root" class="early" aria-labelledby="early-title">
    <div class="wrap">
      <div class="early__head">
        <span class="label">{{ t('work.earlier') }}</span>
        <span class="label early__mute">2023</span>
      </div>

      <div class="early__grid">
        <div class="early__intro">
          <h2 id="early-title" class="early__title f-display">
            <span class="line-mask"><span>{{ t('early.t1') }}</span></span>
            <span class="line-mask"><span><em class="f-serif">{{ t('early.t2') }}</em></span></span>
          </h2>
          <p class="early__lead">{{ t('early.lead') }}</p>
        </div>

        <ol class="early__list">
          <li v-for="(a, i) in archive" :key="a.title" class="entry">
            <div class="entry__top">
              <span class="entry__num f-mono">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="label entry__meta">{{ tr(a.kind) }} · {{ a.year }}</span>
              <span class="label entry__tag">{{ t('early.archived') }}</span>
            </div>
            <h3 class="entry__title f-display">{{ a.title }}</h3>
            <p class="entry__summary">{{ tr(a.summary) }}</p>
            <ul class="entry__stack">
              <li v-for="s in a.stack" :key="s">{{ s }}</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { archive } from '@/data/content';
import { gsap, prefersReducedMotion } from '@/lib/motion';
import { t, tr } from '@/lib/i18n';

const root = ref(null);
let ctx;

onMounted(() => {
  const q = gsap.utils.selector(root.value);
  ctx = gsap.context(() => {
    if (prefersReducedMotion) return;
    gsap.from(q('.early__title .line-mask > span'), {
      yPercent: 110, duration: 1.3, stagger: 0.08, ease: 'expo.out',
      scrollTrigger: { trigger: q('.early__title')[0], start: 'top 85%' },
    });
    gsap.from(q('.early__lead'), {
      y: 30, opacity: 0, duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: q('.early__lead')[0], start: 'top 88%' },
    });
    q('.entry').forEach((el) => {
      gsap.from(el, { '--rule': 0, duration: 1.3, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 88%' } });
      gsap.from(el.querySelectorAll('.entry__top, .entry__title, .entry__summary, .entry__stack'), {
        y: 30, opacity: 0, duration: 1.1, stagger: 0.07, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
  }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<style scoped>
.early { background: var(--ink); padding: 0 0 clamp(96px, 12vw, 180px); }
.early__head { display: flex; justify-content: space-between; border-top: 1px solid var(--line); padding-top: 14px; }
.early__mute { color: var(--mute); }

.early__grid { display: grid; gap: 48px; margin-top: clamp(32px, 4.5vw, 64px); }

.early__title { font-size: clamp(40px, 5.6vw, 96px); font-weight: 500; line-height: 0.95; letter-spacing: -0.045em; }
.early__title em { color: var(--cyan); font-size: 1.06em; }
.early__lead { margin-top: 24px; font-size: clamp(16px, 1.25vw, 19px); line-height: 1.6; color: #bdbdb8; max-width: 38ch; }

.early__list { list-style: none; margin: 0; padding: 0; }
.entry { --rule: 1; position: relative; padding: 26px 0 34px; }
.entry::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 1px; background: var(--line); transform: scaleX(var(--rule)); transform-origin: left; }
.entry:last-child { border-bottom: 1px solid var(--line); }

.entry__top { display: flex; align-items: center; gap: 14px; }
.entry__num { font-size: 12px; color: var(--cyan); }
.entry__meta { color: var(--mute); }
.entry__tag { margin-left: auto; color: var(--mute); border: 1px solid var(--line); padding: 4px 8px; }

.entry__title { margin-top: 18px; font-size: clamp(32px, 3.8vw, 60px); font-weight: 500; letter-spacing: -0.035em; line-height: 1; }
.entry__summary { margin-top: 14px; font-size: clamp(16px, 1.2vw, 18px); line-height: 1.6; color: #cfcfca; max-width: 52ch; }
.entry__stack { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; margin: 18px 0 0; padding: 0; }
.entry__stack li { font-family: var(--f-mono); font-size: 11.5px; padding: 6px 10px; border: 1px solid var(--line); color: #d9d9d4; }

@media (min-width: 1024px) {
  .early__grid { grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 20px; align-items: start; }
  .early__intro { grid-column: 1 / span 4; }
  .early__list { grid-column: 6 / span 7; }
}
</style>
