<template>
  <section class="py-24 px-6 md:px-10 lg:px-16 bg-[#0A0A0A]">
    <div class="max-w-6xl mx-auto">

      <!-- Title -->
      <div class="text-center mb-20">
        <p class="inline-flex items-center gap-2 text-[#0AFFEC] font-mono text-xs tracking-widest uppercase mb-5">
          <span class="w-6 h-px bg-[#0AFFEC]"></span>
          My work
          <span class="w-6 h-px bg-[#0AFFEC]"></span>
        </p>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white">
          Featured <span class="text-[#0AFFEC]">Projects</span>
        </h2>
      </div>

      <!-- Projects -->
      <div class="space-y-28">

        <!-- Project 1 -->
        <div class="project-item opacity-0 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <!-- Image -->
          <div class="w-full lg:w-1/2 relative">
            <div class="project-img-wrapper overflow-hidden rounded-2xl border border-gray-800">
              <img :src="images.IMGecomerce" alt="LaboutiqueChine"
                class="w-full h-auto object-cover hover:scale-105 transition-transform duration-700">
            </div>
          </div>
          <!-- Text -->
          <div class="w-full lg:w-1/2 space-y-5">
            <div class="flex items-center gap-3">
              <span class="text-[7rem] font-black text-gray-800/30 leading-none select-none">01</span>
            </div>
            <h3 class="text-white text-2xl md:text-3xl font-extrabold -mt-8">LaboutiqueChine</h3>
            <div class="w-10 h-0.5 bg-[#0AFFEC] rounded-full"></div>
            <p class="text-gray-400 text-sm leading-relaxed">
              An online destination for authentic Chinese products — clothing, tech gadgets, accessories, and beauty items — with a smooth, secure, and fast shopping experience.
            </p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project1Tech" :key="tech"
                class="text-xs font-medium bg-gray-800/80 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <!-- Separator -->
        <div class="border-t border-gray-800/60"></div>

        <!-- Project 2 -->
        <div class="project-item opacity-0 flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 items-center">
          <!-- Image -->
          <div class="w-full lg:w-1/2">
            <div class="project-img-wrapper overflow-hidden rounded-2xl border border-gray-800">
              <img :src="images.IMGBlog" alt="FAMES Bénin"
                class="w-full h-auto object-cover hover:scale-105 transition-transform duration-700">
            </div>
          </div>
          <!-- Text -->
          <div class="w-full lg:w-1/2 space-y-5">
            <div class="flex items-center gap-3">
              <span class="text-[7rem] font-black text-gray-800/30 leading-none select-none">02</span>
            </div>
            <h3 class="text-white text-2xl md:text-3xl font-extrabold -mt-8">FAMES Bénin</h3>
            <div class="w-10 h-0.5 bg-[#0AFFEC] rounded-full"></div>
            <p class="text-gray-400 text-sm leading-relaxed">
              Official site of the Beninese Students Association in China — a platform for exchanges, solidarity, articles, practical advice, and career opportunities.
            </p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project2Tech" :key="tech"
                class="text-xs font-medium bg-gray-800/80 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import IMGecomerce from "../../assets/IMGE_COMERCE.png";
import IMGBlog from "../../assets/IMGBlog.png";

export default {
  name: 'the-projects',
  data() {
    return {
      images: { IMGecomerce, IMGBlog },
      project1Tech: ['Vue.js', 'Tailwind CSS', 'Firebase', 'JavaScript'],
      project2Tech: ['Vue.js', 'Tailwind CSS', 'JavaScript']
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const elements = document.querySelectorAll('.project-item');
      const scrollPosition = window.innerHeight / 1.3;
      elements.forEach((el, i) => {
        const position = el.getBoundingClientRect().top;
        if (position < scrollPosition && !el.classList.contains('animate-in')) {
          setTimeout(() => el.classList.add('animate-in'), i * 200);
        }
      });
    }
  }
};
</script>

<style scoped>
.project-img-wrapper {
  position: relative;
}
.project-img-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(10, 255, 236, 0.04));
  z-index: 1;
  pointer-events: none;
  border-radius: inherit;
}
.animate-in {
  animation: fadeInUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
