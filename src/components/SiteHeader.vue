<template>
  <header ref="root" class="hdr" :class="{ 'is-light': light && !open, 'is-hidden': hidden && !open, 'is-solid': solid && !open }">
    <div class="hdr__bar wrap">
      <a href="#home" class="hdr__brand f-display" :data-cursor="t('nav.top')" @click.prevent="go('#home')">
        Chêfick<sup>®</sup>
      </a>

      <nav class="hdr__nav" aria-label="Main">
        <a v-for="(l, i) in links" :key="l.id" v-magnetic="0.25" :href="`#${l.id}`" class="hdr__link" @click.prevent="go(`#${l.id}`)">
          <span class="hdr__idx f-mono">0{{ i + 1 }}</span>
          <span class="u-link">{{ t(l.key) }}</span>
        </a>
      </nav>

      <div class="hdr__meta">
        <LangSwitch />
        <span class="hdr__status"><i></i>{{ t('nav.available') }}</span>
        <span class="hdr__time f-mono">{{ time }} <span class="hdr__tz">UTC+1</span></span>
      </div>

 <LangSwitch class="hdr__lang-m" />
      <button class="hdr__burger" :aria-expanded="open" aria-controls="mobile-menu" @click="toggle">
        <span class="label">{{ open ? t('nav.close') : t('nav.menu') }}</span>
        <span class="hdr__lines" :class="{ open }"><i></i><i></i></span>
      </button>
    </div>

    <div id="mobile-menu" ref="panel" class="menu" :aria-hidden="!open">
      <nav class="menu__nav wrap">
        <a v-for="(l, i) in links" :key="l.id" :href="`#${l.id}`" class="menu__link" @click.prevent="go(`#${l.id}`)">
          <span class="line-mask"><span class="f-display">{{ t(l.key) }}</span></span>
          <span class="menu__idx f-mono">0{{ i + 1 }}</span>
        </a>
      </nav>
      <div class="menu__foot wrap">
        <a :href="`mailto:${EMAIL}`" class="menu__mail">{{ EMAIL }}</a>
        <div class="menu__socials">
          <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener">{{ s.name }}</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { gsap, ScrollTrigger, scrollToTarget, getLenis, appState } from '@/lib/motion';
import { EMAIL, socials } from '@/data/content';
import { watch } from 'vue';
import { t } from '@/lib/i18n';
import LangSwitch from '@/components/LangSwitch.vue';

const links = [
  { id: 'about', key: 'nav.about' },
  { id: 'work', key: 'nav.work' },
  { id: 'stack', key: 'nav.stack' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'contact', key: 'nav.contact' },
];

const root = ref(null);
const panel = ref(null);
const open = ref(false);
const light = ref(false);
const hidden = ref(false);
const solid = ref(false);
const time = ref('');

let clock, triggers = [], lastY = 0, menuTl;

function tick() {
  time.value = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos' }).format(new Date());
}

function toggle() {
  open.value = !open.value;
  const lenis = getLenis();
  if (open.value) { lenis?.stop(); menuTl.timeScale(1).play(); }
  else { lenis?.start(); menuTl.timeScale(1.6).reverse(); }
}

function go(sel) {
  if (open.value) toggle();
  scrollToTarget(sel, 0);
}

function onScroll() {
  const y = window.scrollY;
  hidden.value = y > 200 && y > lastY;
  solid.value = y > 40;
  lastY = y;
}

onMounted(async () => {
  tick();
  clock = setInterval(tick, 15000);
  window.addEventListener('scroll', onScroll, { passive: true });

  menuTl = gsap.timeline({ paused: true })
    .set(panel.value, { visibility: 'visible' })
    .fromTo(panel.value, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'expo.inOut' })
    .from(panel.value.querySelectorAll('.menu__link .line-mask > span'), { yPercent: 110, duration: 0.8, stagger: 0.06, ease: 'expo.out' }, '-=0.35')
    .from(panel.value.querySelectorAll('.menu__idx, .menu__foot'), { opacity: 0, duration: 0.4 }, '-=0.5');

  // Switch header colors when it crosses a light section
  await nextTick();
  watch(() => appState.ready, (r) => { if (r) bindThemes(); }, { immediate: true });
});

function bindThemes() {
  triggers.forEach((t) => t.kill());
  triggers = [...document.querySelectorAll('[data-theme="light"]')].map((el) =>
    ScrollTrigger.create({
      trigger: el,
      start: 'top 36px',
      end: 'bottom 36px',
      onToggle: (self) => { light.value = self.isActive; },
    }),
  );
}

onBeforeUnmount(() => {
  clearInterval(clock);
  window.removeEventListener('scroll', onScroll);
  triggers.forEach((t) => t.kill());
});
</script>

<style scoped>
.hdr { position: fixed; top: 0; left: 0; right: 0; z-index: 100; color: var(--white); transition: color 0.4s, transform 0.6s var(--ease-out); }
.hdr.is-light { color: var(--ink); --lang-on: var(--paper); }
.hdr.is-hidden { transform: translateY(-100%); }

/* Solid bar behind the header once the page has scrolled, so it never mixes with the content */
.hdr::before {
  content: ''; position: absolute; left: 0; right: 0; top: 0; height: 72px; z-index: 1;
  background: rgba(10, 10, 10, 0.94);
  border-bottom: 1px solid var(--line);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);
  opacity: 0; transition: opacity .35s, background-color .4s, border-color .4s;
  pointer-events: none;
}
.hdr.is-solid::before { opacity: 1; }
.hdr.is-light::before { background: rgba(243, 242, 238, 0.94); border-bottom-color: var(--line-dark); }
.hdr__bar { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; height: 72px; }

.hdr__brand { font-size: 20px; font-weight: 600; letter-spacing: -0.01em; }
.hdr__brand sup { font-size: 9px; font-family: var(--f-mono); margin-left: 2px; vertical-align: super; }

.hdr__nav { display: none; gap: 28px; }
.hdr__link { display: inline-flex; align-items: baseline; gap: 6px; font-size: 14px; font-weight: 500; }
.hdr__idx { font-size: 10px; opacity: 0.45; }

.hdr__meta { display: none; align-items: center; gap: 20px; font-size: 13px; }
.hdr__status { display: inline-flex; align-items: center; gap: 8px; font-weight: 500; }
.hdr__status i { width: 7px; height: 7px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 0 0 rgba(10,255,236,.6); animation: ping 2.4s infinite; }
.hdr.is-light .hdr__status i { background: var(--ink); animation: none; }
.hdr__time { font-size: 12px; }
.hdr__tz { opacity: 0.45; }

@keyframes ping { 0% { box-shadow: 0 0 0 0 rgba(10,255,236,.55); } 80%, 100% { box-shadow: 0 0 0 9px rgba(10,255,236,0); } }

.hdr__lang-m { margin-left: auto; margin-right: 18px; }
.hdr__burger { display: inline-flex; align-items: center; gap: 12px; background: none; border: 0; padding: 8px 0; }
.hdr__lines { position: relative; width: 22px; height: 10px; }
.hdr__lines i { position: absolute; left: 0; right: 0; height: 1.5px; background: currentColor; transition: transform 0.5s var(--ease-out), top 0.5s var(--ease-out); }
.hdr__lines i:first-child { top: 0; }
.hdr__lines i:last-child { top: 8.5px; }
.hdr__lines.open i:first-child { top: 4.25px; transform: rotate(45deg); }
.hdr__lines.open i:last-child { top: 4.25px; transform: rotate(-45deg); }

@media (min-width: 1024px) {
  .hdr__nav, .hdr__meta { display: flex; }
  .hdr__burger, .hdr__lang-m { display: none; }
}

/* Mobile menu */
.menu {
  position: fixed; inset: 0; z-index: 1; visibility: hidden;
  background: var(--ink); color: var(--white);
  display: flex; flex-direction: column; justify-content: space-between;
  padding-top: 110px; padding-bottom: 28px;
}
.menu__nav { display: flex; flex-direction: column; }
.menu__link { display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid var(--line); padding: 10px 0; }
.menu__link .f-display { font-size: clamp(44px, 12vw, 72px); font-weight: 500; line-height: 1.02; }
.menu__idx { font-size: 11px; color: var(--mute); margin-top: 10px; }
.menu__foot { display: flex; flex-direction: column; gap: 14px; font-size: 14px; }
.menu__mail { color: var(--cyan); word-break: break-all; }
.menu__socials { display: flex; flex-wrap: wrap; gap: 18px; color: var(--mute); }
</style>
