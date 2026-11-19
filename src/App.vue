<template>
  <AppLoader v-if="!loaderGone" @done="onLoaded" />
  <CustomCursor />
  <SiteHeader />

  <main>
    <HeroSection id="home" />
    <MarqueeBand />
    <AboutSection id="about" />
    <WorkShowreel id="work" />
    <WorkList />
    <EarlyWork />
    <StackSection id="stack" />
    <ExperienceSection id="experience" />
    <ContactSection id="contact" />
  </main>

  <SiteFooter />
  <div class="grain" aria-hidden="true"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { appState, initSmoothScroll, getLenis, ScrollTrigger, initRise } from '@/lib/motion';
import { locale } from '@/lib/i18n';

import AppLoader from '@/components/AppLoader.vue';
import CustomCursor from '@/components/CustomCursor.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import HeroSection from '@/components/HeroSection.vue';
import MarqueeBand from '@/components/MarqueeBand.vue';
import AboutSection from '@/components/AboutSection.vue';
import WorkShowreel from '@/components/WorkShowreel.vue';
import WorkList from '@/components/WorkList.vue';
import EarlyWork from '@/components/EarlyWork.vue';
import StackSection from '@/components/StackSection.vue';
import ExperienceSection from '@/components/ExperienceSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import SiteFooter from '@/components/SiteFooter.vue';

const loaderGone = ref(false);
const cleanups = [];

onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  const lenis = initSmoothScroll();
  lenis?.stop();
});

function onLoaded() {
  loaderGone.value = true;
  appState.ready = true;
  getLenis()?.start();
  requestAnimationFrame(() => {
    cleanups.push(initRise());
    ScrollTrigger.refresh();
  });
}

// Text length changes between languages: recompute every trigger position.
watch(locale, async () => {
  await nextTick();
  requestAnimationFrame(() => ScrollTrigger.refresh());
});

onBeforeUnmount(() => cleanups.forEach((c) => c()));
</script>
