import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { reactive } from 'vue';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouch =
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Global app state shared across sections */
export const appState = reactive({
  ready: false, // true once the preloader has left the screen
});

let lenis = null;

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion) return lenis;
  lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollToTarget(target, offset = 0) {
  if (target === 0) {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.6 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Splits the text of an element into words wrapped in masks.
 * Returns the inner spans so they can be animated.
 */
export function splitWords(el, { mask = true } = {}) {
  const text = el.textContent.trim().replace(/\s+/g, ' ');
  el.textContent = '';
  const words = [];
  text.split(' ').forEach((w, i, arr) => {
    const outer = document.createElement('span');
    outer.style.display = 'inline-block';
    if (mask) {
      outer.style.overflow = 'hidden';
      outer.style.verticalAlign = 'top';
      outer.style.paddingBottom = '0.08em';
      outer.style.marginBottom = '-0.08em';
    }
    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.textContent = w;
    outer.appendChild(inner);
    el.appendChild(outer);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
    words.push(inner);
  });
  return words;
}

export { gsap, ScrollTrigger };

/* ───────────── Global scroll effects (Lusion / Lenis inspired) ───────────── */

/**
 * Sections marked `data-rise` enter like a card sliding over the previous one:
 * inset with rounded corners, opening to full-bleed as they reach the top.
 */
export function initRise() {
  if (prefersReducedMotion) return () => {};
  const tweens = gsap.utils.toArray('[data-rise]').map((el) =>
    gsap.fromTo(
      el,
      { clipPath: 'inset(0% 3.5% 0% 3.5% round 44px 44px 0px 0px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 15%', scrub: true },
      },
    ),
  );
  return () => tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
}

/** v-magnetic: the element is pulled toward the pointer while hovered. */
export const vMagnetic = {
  mounted(el, binding) {
    if (prefersReducedMotion || isTouch) return;
    const strength = binding.value ?? 0.3;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    el._mMove = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    el._mLeave = () => { xTo(0); yTo(0); };
    el.addEventListener('pointermove', el._mMove);
    el.addEventListener('pointerleave', el._mLeave);
  },
  unmounted(el) {
    el.removeEventListener('pointermove', el._mMove);
    el.removeEventListener('pointerleave', el._mLeave);
  },
};
