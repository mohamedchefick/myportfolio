<template>
  <div v-if="enabled" class="cursor" aria-hidden="true">
    <div ref="dot" class="cursor__dot"></div>
    <div ref="ring" class="cursor__ring" :class="{ 'is-label': text }"><span ref="label" class="cursor__label">{{ text }}</span></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap, isTouch, prefersReducedMotion } from '@/lib/motion';

const enabled = !isTouch && !prefersReducedMotion;
const dot = ref(null);
const ring = ref(null);
const text = ref('');

let xDot, yDot, xRing, yRing;

function onMove(e) {
  xDot(e.clientX); yDot(e.clientY);
  xRing(e.clientX); yRing(e.clientY);
}

function onOver(e) {
  const t = e.target.closest('[data-cursor], a, button, input, textarea, label');
  if (!t) { setState('', 1); return; }
  const label = t.getAttribute('data-cursor');
  if (label) setState(label, 1);
  else if (t.matches('input, textarea')) setState('', 0.4);
  else setState('', 2);
}

function setState(label, scale) {
  text.value = label;
  const size = label ? 92 : 22;
  gsap.to(ring.value, {
    width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2,
    scale: label ? 1 : scale, duration: 0.5, ease: 'expo.out',
  });
  gsap.to(dot.value, { opacity: label ? 0 : 1, duration: 0.2 });
}

function onLeave() { gsap.to([dot.value, ring.value], { opacity: 0, duration: 0.2 }); }
function onEnter() { gsap.to([dot.value, ring.value], { opacity: 1, duration: 0.2 }); }

onMounted(() => {
  if (!enabled) return;
  document.documentElement.classList.add('has-cursor');
  xDot = gsap.quickTo(dot.value, 'x', { duration: 0.08, ease: 'power3' });
  yDot = gsap.quickTo(dot.value, 'y', { duration: 0.08, ease: 'power3' });
  xRing = gsap.quickTo(ring.value, 'x', { duration: 0.5, ease: 'power3' });
  yRing = gsap.quickTo(ring.value, 'y', { duration: 0.5, ease: 'power3' });
  window.addEventListener('pointermove', onMove);
  document.addEventListener('pointerover', onOver);
  document.documentElement.addEventListener('pointerleave', onLeave);
  document.documentElement.addEventListener('pointerenter', onEnter);
});

onBeforeUnmount(() => {
  document.documentElement.classList.remove('has-cursor');
  window.removeEventListener('pointermove', onMove);
  document.removeEventListener('pointerover', onOver);
});
</script>

<style scoped>
.cursor { display: contents; }
.cursor__dot, .cursor__ring {
  position: fixed; left: 0; top: 0; z-index: 300; border-radius: 50%;
  pointer-events: none; mix-blend-mode: difference;
}
.cursor__ring.is-label { mix-blend-mode: normal; background: var(--cyan); border-color: var(--cyan); }
.cursor__dot { width: 6px; height: 6px; margin: -3px 0 0 -3px; background: #fff; }
.cursor__ring {
  width: 22px; height: 22px; margin: -11px 0 0 -11px;
  border: 1px solid #fff;
  display: grid; place-items: center;
  transition: background-color 0.3s, border-color 0.3s;
}
.cursor__label {
  font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  color: #000; white-space: nowrap; font-weight: 500;
}
</style>
