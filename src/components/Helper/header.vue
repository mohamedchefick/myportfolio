<template>
  <header :class="['fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg border-b border-gray-900' : 'bg-transparent']">
    <div class="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between">

      <!-- Logo -->
      <a @click.prevent="scrollToSection('home')" class="flex items-center gap-2 cursor-pointer">
        <img :src="images.LOGO" alt="Logo" class="w-9 h-9 rounded-full object-cover">
        <span class="font-bold text-lg tracking-tight text-white">MH<span class="text-[#0AFFEC]">.</span></span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-8">
        <a v-for="link in navLinks" :key="link.id"
          @click.prevent="scrollToSection(link.id)"
          class="text-sm font-medium text-gray-300 hover:text-[#0AFFEC] cursor-pointer transition-colors duration-200">
          {{ link.label }}
        </a>
      </nav>

      <!-- CTA -->
      <a @click.prevent="scrollToSection('contact')"
        class="hidden lg:flex items-center bg-[#0AFFEC] text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-[#0AFFEC]/80 transition-all duration-200 cursor-pointer">
        Contact Me
      </a>

      <!-- Mobile burger -->
      <button @click="toggleMenu" class="lg:hidden text-white p-1 focus:outline-none">
        <svg v-if="!menuOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <transition name="slide-down">
      <div v-if="menuOpen" class="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800 px-6 py-4">
        <a v-for="link in navLinks" :key="link.id"
          @click.prevent="scrollToSection(link.id); closeMenu()"
          class="block py-3 text-sm font-medium text-gray-300 hover:text-[#0AFFEC] cursor-pointer transition-colors border-b border-gray-800/50 last:border-0">
          {{ link.label }}
        </a>
        <a @click.prevent="scrollToSection('contact'); closeMenu()"
          class="mt-4 inline-flex bg-[#0AFFEC] text-black font-bold text-sm px-5 py-2.5 rounded-lg cursor-pointer">
          Contact Me
        </a>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import LOGO from "../../assets/MhLogo.jpg";

const images = { LOGO };
const menuOpen = ref(false);
const scrolled = ref(false);

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
];

const scrollToSection = (id, duration = 800) => {
  const el = document.getElementById(id);
  if (!el) return;
  const start = window.scrollY;
  const end = el.offsetTop - 70;
  const startTime = performance.now();
  const scroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    window.scrollTo(0, start + (end - start) * ease);
    if (elapsed < duration) requestAnimationFrame(scroll);
  };
  requestAnimationFrame(scroll);
};

const toggleMenu = () => { menuOpen.value = !menuOpen.value; };
const closeMenu = () => { menuOpen.value = false; };

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
  if (menuOpen.value) closeMenu();
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
