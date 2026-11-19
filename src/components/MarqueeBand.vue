<template>
  <div ref="root" class="mq" aria-label="Technologies">
    <div ref="track" class="mq__track">
      <div v-for="n in 2" :key="n" class="mq__group" :aria-hidden="n === 2">
        <span v-for="(t, i) in items" :key="t + n" class="mq__item f-display" :class="{ 'is-outline': i % 2 === 1 }">
          {{ t }}<i class="mq__sep"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion';

const items = ['Vue', 'React', 'Next.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Flutter', 'Three.js', 'GSAP', 'Docker'];
const root = ref(null);
const track = ref(null);
let loop, st;

onMounted(() => {
  if (prefersReducedMotion) return;
  loop = gsap.to(track.value, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
  loop.totalTime(loop.duration() * 200); // head-room so a negative timeScale can run backwards
  let dir = 1;
  st = ScrollTrigger.create({
    trigger: root.value,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate(self) {
      if (self.direction !== dir) dir = self.direction;
      const boost = Math.min(Math.abs(self.getVelocity()) / 300, 6);
      gsap.to(loop, { timeScale: dir * (1 + boost), duration: 0.2, overwrite: true });
      gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.2, ease: 'power2.out' });
    },
  });
});

onBeforeUnmount(() => { loop?.kill(); st?.kill(); });
</script>

<style scoped>
.mq { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 22px 0; background: var(--ink); }
.mq__track { display: flex; width: max-content; will-change: transform; }
.mq__group { display: flex; }
.mq__item { display: inline-flex; align-items: center; font-size: clamp(40px, 7vw, 104px); font-weight: 500; line-height: 1; text-transform: uppercase; letter-spacing: -0.03em; white-space: nowrap; }
.mq__item.is-outline { color: transparent; -webkit-text-stroke: 1px rgba(255, 255, 255, 0.55); }
.mq__sep { display: inline-block; width: 0.16em; height: 0.16em; background: var(--cyan); margin: 0 0.45em; transform: rotate(45deg); }
</style>
