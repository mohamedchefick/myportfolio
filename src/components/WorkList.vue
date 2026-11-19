<template>
  <section ref="root" class="work">
    <div class="wrap">
      <div class="work__intro">
        <span class="label">{{ t('work.index') }}</span>
        <p class="work__lead">{{ t('work.lead') }}</p>
      </div>

      <article v-for="(p, i) in projects" :key="p.id" class="case" :class="{ 'is-flip': i % 2 === 1 }">
        <header class="case__head">
          <span class="case__num f-mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="case__title f-display"><span class="line-mask"><span>{{ p.title }}</span></span></h3>
          <span class="case__kind label">{{ tr(p.kind) }}</span>
          <span class="case__year label">{{ p.year }}</span>
        </header>

        <div class="case__body">
          <component
            :is="p.url ? 'a' : 'div'"
            :href="p.url || undefined"
            :target="p.url ? '_blank' : undefined"
            rel="noopener"
            class="case__media"
            :data-cursor="p.url ? t('work.visit') : 'Private'"
          >
            <div class="browser">
              <div class="browser__bar">
                <i></i><i></i><i></i>
                <span class="browser__url f-mono">{{ p.url ? (p.countries ? 'oremi.mli.41devs.co' : tr(p.domain)) : 'private' }}</span>
              </div>
              <div class="browser__screen">
                <img :src="p.image" :alt="`${p.title} — screenshot`" loading="lazy" />
              </div>
            </div>
            <!-- iPhone 15 mock-up (CSS only) -->
            <div v-if="p.mobile" class="phone">
              <div class="phone__body">
                <span class="phone__btn phone__btn--action" aria-hidden="true"></span>
                <span class="phone__btn phone__btn--vol-up" aria-hidden="true"></span>
                <span class="phone__btn phone__btn--vol-down" aria-hidden="true"></span>
                <span class="phone__btn phone__btn--power" aria-hidden="true"></span>
                <div class="phone__screen">
                  <div class="phone__status" aria-hidden="true">
                    <span class="phone__time">9:41</span>
                    <span class="phone__icons">
                      <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
                      <svg viewBox="0 0 16 12"><path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.6 10.6 0 0 0 8 .4 10.6 10.6 0 0 0 .5 3.4l1.2 1.3A9 9 0 0 1 8 2.2Zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3A7.2 7.2 0 0 0 8 4a7.2 7.2 0 0 0-4.9 1.9l1.2 1.3c1-.9 2.3-1.4 3.7-1.4Zm0 3.5c.5 0 1 .2 1.3.5L8 11.6 6.7 9.8c.3-.3.8-.5 1.3-.5Z" /></svg>
                      <svg viewBox="0 0 27 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="19" height="8" rx="2" /><rect x="24" y="4" width="1.6" height="4" rx=".8" opacity=".45" /></svg>
                    </span>
                  </div>
                  <span class="phone__island" aria-hidden="true"></span>
                  <img :src="p.mobile" :alt="`${p.title} — mobile`" loading="lazy" />
                  <span class="phone__home" aria-hidden="true"></span>
                </div>
              </div>
            </div>
          </component>

          <div class="case__text">
            <p class="case__layer label">{{ tr(p.layer) }}</p>
            <p class="case__summary">{{ tr(p.summary) }}</p>
            <div v-if="p.countries" class="countries">
              <p class="label countries__label">{{ t('work.countries') }}</p>
              <ul>
                <li v-for="c in p.countries" :key="c.code">
                  <a :href="c.url" target="_blank" rel="noopener" class="country">
                    <span class="country__code f-mono">{{ c.code }}</span>
                    <span class="country__name">{{ tr(c.name) }}</span>
                    <span class="country__arrow">↗</span>
                  </a>
                </li>
              </ul>
            </div>
            <ul class="case__stack">
              <li v-for="t in p.stack" :key="t">{{ t }}</li>
            </ul>
            <figure v-if="p.extra" class="case__extra">
              <img :src="p.extra" :alt="`${p.title} — secondary screen`" loading="lazy" />
              <figcaption class="label">{{ t('work.also') }} — {{ tr(p.extraCaption) }}</figcaption>
            </figure>
            <a v-if="p.url && !p.countries" :href="p.url" target="_blank" rel="noopener" class="case__link">
              <span class="u-link">{{ t('work.visit') }} {{ tr(p.domain) }}</span><span class="case__link-arrow">↗</span>
            </a>
            <p v-else-if="!p.url" class="case__private label">{{ t('work.private') }}</p>
          </div>
        </div>
      </article>

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { projects } from '@/data/content';
import { t, tr } from '@/lib/i18n';

import { gsap, prefersReducedMotion } from '@/lib/motion';

const root = ref(null);
let ctx;


onMounted(() => {
  const q = gsap.utils.selector(root.value);


  ctx = gsap.context(() => {
    if (prefersReducedMotion) return;

    gsap.from(q('.work__lead'), { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: q('.work__intro')[0], start: 'top 85%' } });

    q('.case').forEach((c) => {
      const s = gsap.utils.selector(c);
      const tl = gsap.timeline({ scrollTrigger: { trigger: c, start: 'top 78%' }, defaults: { ease: 'expo.out' } });
      tl.from(s('.case__title .line-mask > span'), { yPercent: 110, duration: 1.3 })
        .from(s('.case__num, .case__kind, .case__year'), { opacity: 0, y: 10, duration: 0.8, stagger: 0.06 }, 0.1)
        // Screens simply fade and slide in once — no scaling, skew or parallax, so nothing distorts
        .from(s('.browser'), { y: 60, opacity: 0, duration: 1.4 }, 0)
        .from(s('.case__text > *'), { y: 30, opacity: 0, duration: 1, stagger: 0.07 }, 0.4)
        .from(s('.case__stack li'), { opacity: 0, x: -8, duration: 0.6, stagger: 0.04 }, 0.8);

      const phone = s('.phone');
      if (phone.length) tl.from(phone, { y: 40, opacity: 0, duration: 1.4 }, 0.5);
    });

  }, root.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});
</script>

<style scoped>
.work { background: var(--ink); padding: clamp(72px, 10vw, 160px) 0 clamp(80px, 10vw, 160px); position: relative; }

.work__intro { display: grid; gap: 18px; padding-bottom: clamp(56px, 8vw, 120px); border-bottom: 1px solid var(--line); }
.work__intro .label { color: var(--mute); }
.work__lead { font-size: clamp(20px, 2.1vw, 32px); line-height: 1.25; letter-spacing: -0.015em; max-width: 38ch; font-weight: 500; }

/* ── Case ── */
.case { padding: clamp(56px, 8vw, 130px) 0; border-bottom: 1px solid var(--line); }
.case__head { display: grid; grid-template-columns: auto 1fr auto; align-items: baseline; column-gap: 14px; row-gap: 6px; margin-bottom: clamp(26px, 3.5vw, 48px); }
.case__num { font-size: 12px; color: var(--cyan); }
.case__title { grid-column: 2 / -1; font-size: clamp(40px, 6.6vw, 112px); font-weight: 500; letter-spacing: -0.045em; line-height: 0.95; }
.case__kind { grid-column: 2; color: var(--mute); }
.case__year { color: var(--mute); justify-self: end; }

.case__body { display: grid; gap: clamp(32px, 4vw, 64px); }

.case__media { position: relative; display: block; padding-bottom: 6%; }

.browser { background: #1c1c1c; border: 1px solid rgba(255,255,255,.08); overflow: hidden; box-shadow: 0 40px 80px -40px rgba(0,0,0,.9); transform: translateZ(0); }
.browser__bar { display: flex; align-items: center; gap: 6px; height: 30px; padding: 0 12px; border-bottom: 1px solid rgba(255,255,255,.06); }
.browser__bar i { width: 8px; height: 8px; border-radius: 50%; background: #3a3a3a; }
.browser__url { margin: 0 auto; font-size: 11px; color: var(--mute); transform: translateX(-18px); }
.browser__screen { aspect-ratio: 16 / 10; overflow: hidden; }
.browser__screen img { width: 100%; height: 100%; object-fit: cover; object-position: top; transition: filter .6s; }
.case__media:hover .browser__screen img { filter: saturate(1.08); }

/* ── iPhone 15 mock-up — every size is relative to the phone width (cqw) ── */
.phone {
  position: absolute; right: -2%; bottom: -4%; width: 22%; min-width: 96px;
  container-type: inline-size;
}
.phone__body {
  position: relative;
  padding: 3.4cqw;                                  /* bezel */
  background: #111113;
  border-radius: 16cqw;
  box-shadow:
    inset 0 0 0 0.7cqw #3b3b3f,                     /* aluminium edge */
    inset 0 0 0 1.2cqw #18181a,
    0 30px 60px -20px rgba(0, 0, 0, 0.95);
}
.phone__btn { position: absolute; width: 1.1cqw; background: #2c2c2f; border-radius: 1cqw; }
.phone__btn--action   { left: -0.9cqw; top: 19%; height: 6%; }
.phone__btn--vol-up   { left: -0.9cqw; top: 29%; height: 11%; }
.phone__btn--vol-down { left: -0.9cqw; top: 42%; height: 11%; }
.phone__btn--power    { right: -0.9cqw; top: 31%; height: 17%; }

.phone__screen {
  position: relative; overflow: hidden;
  aspect-ratio: 393 / 852;                          /* iPhone 15 logical resolution */
  border-radius: 12.6cqw;
  background: #fff;
  display: flex; flex-direction: column;
}
.phone__status {
  flex: 0 0 auto; height: 13.5cqw;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.2cqw 7.5cqw 0 9cqw;
  background: #fff; color: #000;
}
.phone__time { font-family: -apple-system, 'SF Pro Text', 'General Sans', sans-serif; font-size: 4.4cqw; font-weight: 600; letter-spacing: -0.01em; }
.phone__icons { display: inline-flex; align-items: center; gap: 1.4cqw; }
.phone__icons svg { height: 3cqw; width: auto; fill: currentColor; }
.phone__island {
  position: absolute; top: 3cqw; left: 50%; transform: translateX(-50%);
  width: 32cqw; height: 9.4cqw; border-radius: 99px; background: #000; z-index: 2;
}
.phone__screen img { flex: 1 1 auto; min-height: 0; width: 100%; object-fit: cover; object-position: top; }
.phone__home {
  position: absolute; left: 50%; bottom: 2cqw; transform: translateX(-50%);
  width: 35cqw; height: 1.3cqw; border-radius: 99px; background: rgba(0, 0, 0, 0.82); z-index: 2;
}

.case__text { display: flex; flex-direction: column; gap: 22px; }
.case__layer { color: var(--cyan); }
.case__summary { font-size: clamp(17px, 1.3vw, 20px); line-height: 1.55; color: #cfcfca; max-width: 46ch; }
.case__stack { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; padding: 0; margin: 0; }
.case__stack li { font-family: var(--f-mono); font-size: 11.5px; padding: 6px 10px; border: 1px solid var(--line); color: #d9d9d4; }
.case__extra { margin: 4px 0 0; max-width: 360px; }
.case__extra img { border: 1px solid var(--line); }
.case__extra figcaption { margin-top: 8px; color: var(--mute); }
.case__link { display: inline-flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 500; align-self: flex-start; padding-top: 6px; }
.case__link-arrow { color: var(--cyan); transition: transform .5s var(--ease-out); }
.case__link:hover .case__link-arrow { transform: translate(3px, -3px); }
.case__private { color: var(--mute); }

.countries { border-top: 1px solid var(--line); padding-top: 14px; }
.countries__label { color: var(--mute); margin-bottom: 8px; }
.countries ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
.country { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--line); font-size: 15px; font-weight: 500; transition: color .3s, padding .5s var(--ease-out); }
.country__code { font-size: 10px; color: var(--mute); width: 20px; }
.country__arrow { margin-left: auto; color: var(--cyan); opacity: 0; transform: translate(-4px, 4px); transition: opacity .3s, transform .5s var(--ease-out); }
.country:hover { color: var(--cyan); }
.country:hover .country__arrow { opacity: 1; transform: none; }
@media (min-width: 1024px) { .countries ul { grid-template-columns: 1fr; } }

@media (min-width: 1024px) {
  .work__intro { grid-template-columns: repeat(12, minmax(0,1fr)); column-gap: 20px; }
  .work__intro .label { grid-column: 1 / span 3; }
  .work__lead { grid-column: 4 / -1; }

  .case__body { grid-template-columns: repeat(12, minmax(0,1fr)); column-gap: 20px; align-items: start; }
  .case__media { grid-column: 1 / span 8; }
  .case__text { grid-column: 10 / span 3; padding-top: 8px; }
  .case.is-flip .case__media { grid-column: 5 / span 8; grid-row: 1; }
  .case.is-flip .case__text { grid-column: 1 / span 3; grid-row: 1; }
  .case.is-flip .phone { right: auto; left: -7%; bottom: -10%; width: 19%; }
  .case.is-flip .case__head { text-align: right; }
}


</style>
