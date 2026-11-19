<template>
  <section ref="root" class="about" data-theme="light" data-rise>
    <div class="wrap">
      <div class="about__head">
        <span class="label">{{ t('about.label') }}</span>
        <span class="label about__mute">{{ t('about.sub') }}</span>
      </div>

      <div class="about__grid">
        <!-- Left: portrait pinned while the story scrolls -->
        <aside class="about__side">
          <div class="about__sticky">
            <figure class="about__photo">
              <div class="about__photo-frame">
                <img :src="portrait" alt="Mohamed Chêfick — La Nuit des Devs" loading="lazy" />
              </div>
              <figcaption class="label">{{ t('about.fig') }}</figcaption>
            </figure>

            <dl class="about__facts">
              <div v-for="f in facts" :key="f.k" class="about__fact">
                <dt class="label">{{ t(f.k) }}</dt>
                <dd>{{ f.v ? t(f.v) : f.raw }}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <!-- Right: the story -->
        <div class="about__main">
          <p class="about__now">
            <span class="about__dot" aria-hidden="true"></span>
            <span class="label">{{ t('about.now') }}</span>
            <span class="about__now-text">{{ t('about.nowText') }}</span>
          </p>

          <p ref="statement" class="about__statement f-display">
            <template v-for="(w, i) in statementWords" :key="locale + i"><span class="about__w">{{ w }}</span>{{ ' ' }}</template>
          </p>

          <div class="about__text">
            <!-- trusted, hard-coded strings from i18n.js (only <strong> markup) -->
            <p v-html="t('about.p1')"></p>
            <p v-html="t('about.p2')"></p>
          </div>

          <div class="about__sign-row">
            <p class="about__sign f-serif">— Mohamed Chêfick Koudenoukpo</p>
            <a v-magnetic href="#work" class="about__cta" @click.prevent="scrollToTarget('#work')">
              <span>{{ t('about.cta') }}</span><span class="about__cta-arrow">↓</span>
            </a>
          </div>

          <dl class="about__stats">
            <div v-for="s in stats" :key="s.key" class="about__stat">
              <dt class="label">{{ t(s.key) }}</dt>
              <dd class="f-display"><span class="about__num" :data-to="s.value">0</span><sup>{{ s.suffix }}</sup></dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import portrait from '@/assets/photos/portrait.jpg';
import { gsap, prefersReducedMotion, scrollToTarget } from '@/lib/motion';
import { t, locale } from '@/lib/i18n';
import { projects } from '@/data/content';

const stats = [
  { value: 3, suffix: '', key: 'about.s1' },
  { value: projects.length, suffix: '', key: 'about.s2' },
  { value: 6, suffix: '', key: 'about.s3' },
  { value: 3, suffix: '', key: 'about.s4' },
];

const facts = [
  { k: 'about.f.name', raw: 'Mohamed Chêfick Koudenoukpo' },
  { k: 'about.f.role', v: 'about.f.roleV' },
  { k: 'about.f.focus', v: 'about.f.focusV' },
  { k: 'about.f.edu', v: 'about.f.eduV' },
];

const root = ref(null);
const statement = ref(null);
const statementWords = computed(() => t('about.statement').split(' '));
let ctx, inkTween;

/* Word-by-word ink reveal scrubbed with scroll — rebuilt when the language changes */
function buildInk() {
  inkTween?.scrollTrigger?.kill();
  inkTween?.kill();
  if (prefersReducedMotion) return;
  inkTween = gsap.fromTo(statement.value.querySelectorAll('.about__w'), { opacity: 0.14 }, {
    opacity: 1, stagger: 0.05, ease: 'none',
    scrollTrigger: { trigger: statement.value, start: 'top 78%', end: 'bottom 50%', scrub: true },
  });
}

onMounted(() => {
  const q = gsap.utils.selector(root.value);
  buildInk();
  watch(locale, async () => { await nextTick(); buildInk(); });

  ctx = gsap.context(() => {
    if (prefersReducedMotion) {
      q('.about__num').forEach((n) => (n.textContent = n.dataset.to));
      return;
    }

    // The portrait itself stays still; only the facts below it fade in
    gsap.from(q('.about__fact'), {
      y: 20, opacity: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out',
      scrollTrigger: { trigger: q('.about__facts')[0], start: 'top 90%' },
    });

    gsap.from(q('.about__now'), { y: 20, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('.about__now')[0], start: 'top 88%' } });

    gsap.from(q('.about__text p, .about__sign-row > *'), {
      y: 40, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out',
      scrollTrigger: { trigger: q('.about__text')[0], start: 'top 82%' },
    });

    // Stats: rule draws, numbers count up
    gsap.from(q('.about__stat'), {
      '--rule': 0, y: 30, opacity: 0, duration: 1.2, stagger: 0.08, ease: 'expo.out',
      scrollTrigger: { trigger: q('.about__stats')[0], start: 'top 88%' },
    });
    q('.about__num').forEach((el) => {
      const o = { v: 0 };
      gsap.to(o, {
        v: +el.dataset.to, duration: 2, ease: 'power3.out',
        onUpdate: () => (el.textContent = Math.round(o.v)),
        scrollTrigger: { trigger: el, start: 'top 92%' },
      });
    });
  }, root.value);
});

onBeforeUnmount(() => { ctx?.revert(); inkTween?.scrollTrigger?.kill(); inkTween?.kill(); });
</script>

<style scoped>
.about { background: var(--paper); color: var(--ink); padding: clamp(96px, 12vw, 180px) 0 clamp(88px, 11vw, 170px); }
.about__head { display: flex; justify-content: space-between; border-top: 1px solid var(--line-dark); padding-top: 14px; margin-bottom: clamp(36px, 5vw, 80px); }
.about__mute { color: var(--mute-dark); }

.about__grid { display: grid; gap: 0; }

/* Mobile / tablet: lead with the statement, then the portrait, then the story */
.about__main { display: contents; }
.about__now { order: 1; }
.about__statement { order: 2; }
.about__side { order: 3; margin-top: 48px; }
.about__text { order: 4; }
.about__sign-row { order: 5; }
.about__stats { order: 6; }

/* ── Portrait + facts ── */
.about__photo { margin: 0; }
.about__photo-frame { overflow: hidden; aspect-ratio: 4 / 5; background: var(--paper-2); }
.about__photo-frame img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; transform: scale(1.16); transform-origin: 66% 76%; }
.about__photo figcaption { margin-top: 10px; color: var(--mute-dark); }

.about__facts { margin: 26px 0 0; border-top: 1px solid var(--ink); }
.about__fact { display: grid; grid-template-columns: 110px 1fr; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--line-dark); align-items: baseline; }
.about__fact dt { color: var(--mute-dark); }
.about__fact dd { margin: 0; font-size: 15px; font-weight: 500; }

/* ── Story ── */
.about__now { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; padding: 10px 14px; border: 1px solid var(--line-dark); width: fit-content; max-width: 100%; margin-bottom: clamp(28px, 3.5vw, 48px); }
.about__now .label { color: var(--mute-dark); }
.about__now-text { font-size: 14px; font-weight: 500; }
.about__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--ink); position: relative; }
.about__dot::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid var(--ink); animation: ring 2.4s var(--ease-out) infinite; }
@keyframes ring { 0% { transform: scale(0.6); opacity: 1; } 100% { transform: scale(2.2); opacity: 0; } }

.about__statement { font-size: clamp(30px, 3.7vw, 64px); line-height: 1.06; font-weight: 500; letter-spacing: -0.03em; }
.about__w { display: inline-block; }

.about__text { display: grid; gap: 22px; margin-top: clamp(40px, 5vw, 72px); font-size: clamp(17px, 1.3vw, 20px); line-height: 1.6; color: #2f2f2c; }
.about__text :deep(strong) { color: var(--ink); font-weight: 600; }

.about__sign-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; margin-top: 34px; padding-top: 24px; border-top: 1px solid var(--line-dark); }
.about__sign { font-size: clamp(22px, 2vw, 30px); }
.about__cta { display: inline-flex; align-items: center; gap: 14px; height: 50px; padding: 0 22px; background: var(--ink); color: var(--paper); font-weight: 500; font-size: 15px; transition: background .35s, color .35s; }
.about__cta:hover { background: var(--cyan); color: var(--ink); }
.about__cta-arrow { transition: transform .5s var(--ease-out); }
.about__cta:hover .about__cta-arrow { transform: translateY(4px); }

.about__stats { display: grid; grid-template-columns: repeat(2, 1fr); margin: clamp(48px, 6vw, 88px) 0 0; }
.about__stat {
  --rule: 1;
  position: relative; padding: 20px 16px 22px 0;
  display: flex; flex-direction: column-reverse; justify-content: flex-end; gap: 10px;
}
.about__stat::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 2px; background: var(--ink); transform: scaleX(var(--rule)); transform-origin: left; }
.about__stat:nth-child(even) { padding-left: 16px; border-left: 1px solid var(--line-dark); }
.about__stat dd { margin: 0; font-size: clamp(56px, 6vw, 104px); font-weight: 500; line-height: 0.85; letter-spacing: -0.05em; font-variant-numeric: tabular-nums; }
.about__stat sup { font-size: 0.42em; vertical-align: top; position: relative; top: 0.1em; margin-left: 2px; }
.about__stat dt { color: var(--mute-dark); font-size: 10.5px; line-height: 1.45; max-width: 18ch; }

@media (min-width: 768px) {
  .about__text { grid-template-columns: 1fr 1fr; column-gap: 32px; }
  .about__stats { grid-template-columns: repeat(4, 1fr); }
  .about__stat { padding-left: 16px; border-left: 1px solid var(--line-dark); }
  .about__stat:first-child { padding-left: 0; border-left: 0; }
}

@media (min-width: 1024px) {
  .about__grid { grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 20px; align-items: start; }
  .about__side { grid-column: 1 / span 4; align-self: stretch; }
  .about__sticky { position: sticky; top: 104px; }
  .about__main { grid-column: 6 / span 7; grid-row: 1; display: block; }
  .about__side { grid-row: 1; order: 0; margin-top: 0; }
}
</style>
