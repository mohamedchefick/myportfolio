<template>
  <div class="flex flex-col">
    <!-- Header -->
    <header class="flex justify-between items-center px-6 md:px-10 lg:px-20 py-4 shadow-2xl border-b relative rounded-b-3xl bg-white">
      <!-- Logo -->
      <div class="py-2 transition-transform transform hover:scale-105 font-bold text-2xl ">
        <a @click.prevent="scrollToSection('home')" class="flex items-center justify-center">
          <img :src="images.LOGO" alt="Logo" class="w-10">
          MYPORTFOLIO
        </a>
      </div>

      <!-- Navigation Links (Hidden on small screens and shown on medium and larger screens) -->
      <div class="hidden lg:flex gap-6 lg:gap-10 xl:gap-20 items-center">
        <h1 class="cursor-pointer font-semibold relative inline-block overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-black after:to-black after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
          <a @click.prevent="scrollToSection('home')">Home</a>
        </h1>
        <h1 class="font-semibold cursor-pointer relative inline-block overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-black after:to-black after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
          <a @click.prevent="scrollToSection('skills')">My Skills</a>
        </h1>
        <h1 class="font-semibold cursor-pointer relative inline-block overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-black after:to-black after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
          <a @click.prevent="scrollToSection('experience')">Experience</a>
        </h1>
        <h1 class="font-semibold cursor-pointer relative inline-block overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-black after:to-black after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
          <a @click.prevent="scrollToSection('projects')">Projects</a>
        </h1>
      </div>

      <!-- Button CV (Always visible) -->
      <div @click.prevent="scrollToSection('experience')" class="hidden cursor-pointer lg:flex border-2 px-6 md:px-8 lg:px-10 py-2 rounded-full text-white bg-black font-extrabold hover:scale-105 transition-transform duration-150">
        <a>Mon CV</a>
      </div>

      <!-- Burger Button (Visible on small screens) -->
      <div class="lg:hidden">
        <button @click="toggleMenu" class="focus:outline-none">
          <!-- Icon for the burger menu -->
          <svg class="w-8 h-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Mobile Menu (Hidden on medium and larger screens) -->
    <div :class="`lg:hidden fixed top-16 left-0 w-full text-center py-4 px-6 transition-transform duration-300 ease-in-out bg-white ${menuOpen ? 'block' : 'hidden'}`">
      <h1 class="font-semibold mb-4">
        <a @click.prevent="scrollToSection('home'); closeMenu()">Home</a>
      </h1>
      <h1 class="font-semibold mb-4">
        <a @click.prevent="scrollToSection('skills'); closeMenu()">My Skills</a>
      </h1>
      <h1 class="font-semibold mb-4">
        <a @click.prevent="scrollToSection('experience'); closeMenu()">Experience</a>
      </h1>
      <h1 class="font-semibold mb-4">
        <a @click.prevent="scrollToSection('projects'); closeMenu()">Projects</a>
      </h1>
      <div class="border-2 px-6 md:px-8 lg:px-10 py-2 inline-block rounded-full text-white bg-black font-extrabold hover:scale-105 transition-transform duration-150">
        <a @click.prevent="scrollToSection('experience'); closeMenu()">Mon CV</a>
      </div>
    </div>
    
    <!-- Spacer for Hero Section -->
    <div :class="`h-${menuOpen ? '32' : '0'} transition-height duration-300`"></div>

    <!-- Hero Section -->
    <section id="hero" class="bg-white py- sm:py-10 md:py-10 lg:py-0">
      <!-- Content of the Hero Section -->
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import LOGO from "../../assets/MhLogo.jpg";

// Variables
const images = { LOGO };
const menuOpen = ref(false);

const scrollToSection = (id, duration = 1000) => {
  const targetElement = document.getElementById(id);
  if (!targetElement) return;

  const start = window.scrollY;
  const end = targetElement.offsetTop;
  const startTime = performance.now();

  const scroll = (currentTime) => {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, start + (end - start) * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

// Handle closing the menu when the user scrolls
const handleScroll = () => {
  if (menuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Ensure the dropdown menu appears above other content */
.menu {
  z-index: 10;
}
html {
  scroll-behavior: smooth;
}
</style>
