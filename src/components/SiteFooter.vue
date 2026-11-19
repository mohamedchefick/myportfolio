<template>
  <footer ref="root" class="ft">
    <div ref="inner" class="ft__inner">
    <div class="wrap ft__top">
      <div class="ft__col">
        <span class="label ft__mute">{{ t('ft.nav') }}</span>
        <a v-for="l in links" :key="l.id" :href="`#${l.id}`" class="u-link" @click.prevent="scrollToTarget(`#${l.id}`)">{{ t(l.key) }}</a>
      </div>
      <div class="ft__col">
        <span class="label ft__mute">{{ t('ft.else') }}</span>
        <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener" class="u-link">{{ s.name }}</a>
      </div>
      <div class="ft__col ft__col--end">
        <span class="label ft__mute">{{ t('ft.hello') }}</span>
        <a :href="`mailto:${EMAIL}`" class="u-link ft__mail">{{ EMAIL }}</a>
        <button v-magnetic type="button" class="ft__top-btn label" @click="scrollToTarget(0)">{{ t('ft.top') }}</button>
      </div>
    </div>

    <div class="ft__mark f-display" aria-hidden="true">
      <span v-for="(c, i) in 'CHÊFICK'" :key="i" class="ft__ch">{{ c }}</span>
    </div>

    <div class="wrap ft__base">
      <span class="label">© 2026 KOUDENOUKPO Mohamed Chêfick</span>
      <span class="label ft__mute">{{ t('ft.built') }}</span>
    </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { EMAIL, socials } from '@/data/content';
import { gsap, scrollToTarget, prefersReducedMotion } from '@/lib/motion';
import { t } from '@/lib/i18n';

const links = [
  { id: 'about', key: 'nav.about' },
  { id: 'work', key: 'nav.work' },
  { id: 'stack', key: 'nav.stack' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'contact', key: 'nav.contact' },
];

const root = ref(null);
const inner = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    if (prefersReducedMotion) return;
    // Curtain: the footer sits "under" the page and is uncovered as you reach the end
    gsap.fromTo(inner.value, { yPercent: -45 }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
    gsap.from(root.value.querySelectorAll('.ft__ch'), {
      yPercent: 100, duration: 1.4, stagger: 0.05, ease: 'expo.out',
      scrollTrigger: { trigger: root.value.querySelector('.ft__mark'), start: 'top 95%' },
    });
  }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<style scoped>
.ft { background: var(--ink); overflow: hidden; }
.ft__inner { padding-top: clamp(64px, 8vw, 110px); will-change: transform; }
.ft__top { display: grid; grid-template-columns: 1fr 1fr; gap: 40px 20px; padding-bottom: clamp(48px, 7vw, 90px); }
.ft__col { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; font-size: 15px; }
.ft__col .label { margin-bottom: 8px; }
.ft__col--end { grid-column: 1 / -1; }
.ft__mute { color: var(--mute); }
.ft__mail { word-break: break-all; }
.ft__top-btn { background: none; border: 1px solid var(--line); padding: 8px 12px; margin-top: 12px; transition: border-color .3s, color .3s; }
.ft__top-btn:hover { border-color: var(--cyan); color: var(--cyan); }

.ft__mark { display: flex; justify-content: space-between; overflow: hidden; padding: 0 var(--gutter); font-size: 20.5vw; font-weight: 600; line-height: 0.78; letter-spacing: -0.04em; padding-top: 0.16em; margin-bottom: -0.02em; }
.ft__ch { display: inline-block; }
.ft__ch:nth-child(3) { color: var(--cyan); }

.ft__base { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 20px; border-top: 1px solid var(--line); padding-top: 16px; padding-bottom: 22px; margin-top: 18px; }

@media (min-width: 1024px) {
  .ft__top { grid-template-columns: 3fr 3fr 6fr; }
  .ft__col--end { grid-column: auto; align-items: flex-end; text-align: right; }
}
</style>
