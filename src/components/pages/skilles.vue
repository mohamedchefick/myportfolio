<template>
  <section class="py-24 px-6 md:px-10 lg:px-16 bg-white">
    <div class="max-w-6xl mx-auto">

      <!-- Title -->
      <div class="text-center mb-16">
        <p class="inline-flex items-center gap-2 text-[#0AFFEC] font-mono text-xs tracking-widest uppercase bg-black px-4 py-2 rounded-full mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#0AFFEC] inline-block"></span>
          What I work with
        </p>
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900">
          My <span class="text-[#0AFFEC] bg-black px-3 py-1.5 rounded-xl">Skills</span>
        </h2>
        <p class="text-gray-400 text-sm mt-4 max-w-sm mx-auto">Technologies I use daily to build high-quality frontend experiences.</p>
      </div>

      <!-- Skills grid -->
      <div ref="skillsContainer" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div v-for="(skill, index) in skills" :key="index"
          class="skill-card opacity-0 group flex flex-col items-center gap-3 p-6 border border-gray-100 rounded-2xl
                 hover:border-transparent hover:shadow-[0_0_0_2px_#0AFFEC,0_8px_32px_rgba(10,255,236,0.12)]
                 transition-all duration-300 bg-white cursor-default">

          <!-- Icon -->
          <div class="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-50 group-hover:bg-[#0AFFEC]/8 transition-colors duration-300">
            <template v-if="skill.hasIcon">
              <box-icon :type="skill.type" :name="skill.name" class="w-9 h-9"></box-icon>
            </template>
            <template v-else>
              <span class="text-[#0AFFEC] font-black text-sm tracking-tight">{{ skill.abbr }}</span>
            </template>
          </div>

          <!-- Label -->
          <div class="text-center">
            <p class="font-semibold text-gray-800 text-sm leading-tight">{{ skill.label }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ skill.category }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import 'boxicons';

export default {
  name: 'TheSkills',
  data() {
    return {
      skills: [
        { name: 'html5',        type: 'logo', label: 'HTML5',       category: 'Markup',         hasIcon: true },
        { name: 'css3',         type: 'logo', label: 'CSS3',        category: 'Styling',        hasIcon: true },
        { name: 'javascript',   type: 'logo', label: 'JavaScript',  category: 'Language',       hasIcon: true },
        { name: 'typescript',   type: 'logo', label: 'TypeScript',  category: 'Language',       hasIcon: true },
        { name: 'sass',         type: 'logo', label: 'Sass',        category: 'Preprocessor',   hasIcon: true },
        { name: 'react',        type: 'logo', label: 'React',       category: 'Library',        hasIcon: true },
        { name: 'vuejs',        type: 'logo', label: 'Vue.js',      category: 'Framework',      hasIcon: true },
        { name: 'angular',      type: 'logo', label: 'Angular',     category: 'Framework',      hasIcon: true },
        { name: 'tailwind-css', type: 'logo', label: 'Tailwind',    category: 'Framework',      hasIcon: true },
        { name: 'firebase',     type: 'logo', label: 'Firebase',    category: 'Backend',        hasIcon: true },
        { name: 'nextjs',       type: 'logo', label: 'Next.js',     category: 'Framework',      hasIcon: false, abbr: 'N JS' },
        { name: 'swagger',      type: 'logo', label: 'Swagger',     category: 'API / REST',     hasIcon: false, abbr: 'SW' },
      ]
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
      const elements = this.$refs.skillsContainer?.querySelectorAll('.skill-card') ?? [];
      const scrollPosition = window.innerHeight / 1.2;
      elements.forEach((el, i) => {
        const pos = el.getBoundingClientRect().top;
        if (pos < scrollPosition && !el.classList.contains('animate-in')) {
          setTimeout(() => el.classList.add('animate-in'), i * 55);
        }
      });
    }
  }
};
</script>

<style scoped>
.animate-in {
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
