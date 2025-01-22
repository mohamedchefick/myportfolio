<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 sm:py-6 md:py- lg:py- xl:py- 2xl:py- lg:mt-2 xl:">
    <h1 class="text-3xl text-center mb-8">
      My <span class="font-extrabold text-[#0AFFEC] bg-black px-3 py-2 rounded-2xl">Skills</span>
    </h1>
    <div
      class="flex flex-wrap justify-center gap-6 md:gap-10 lg:grid lg:grid-cols-4 lg:gap-10 lg:py-10"
      ref="skillsContainer"
    >
      <!-- Skill Buttons Row 1 -->
      <button class="skill-button p-4 border-black border-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300" aria-label="HTML5">
        <box-icon type='logo' name='html5' class="w-24 h-24 md:w-28 md:h-28"></box-icon>
        <span class="mt-2 text-sm text-center">HTML5<br>Markup Language</span>
      </button>
      <button class="skill-button p-4 border-black border-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300" aria-label="CSS3">
        <box-icon name='css3' type='logo' class="w-24 h-24 md:w-28 md:h-28"></box-icon>
        <span class="mt-2 text-sm text-center">CSS3<br>Styling Language</span>
      </button>
      <button class="skill-button p-4 border-black border-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300" aria-label="JavaScript">
        <box-icon name='javascript' type='logo' class="w-24 h-24 md:w-28 md:h-28"></box-icon>
        <span class="mt-2 text-sm text-center">JavaScript<br>Programming Language</span>
      </button>
      <button class="skill-button p-4 border-black border-2 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors duration-300" aria-label="Sass">
        <box-icon name='sass' type='logo' class="w-24 h-24 md:w-28 md:h-28"></box-icon>
        <span class="mt-2 text-sm text-center">Sass<br>CSS Preprocessor</span>
      </button>

      <!-- Skill Buttons Row 2 -->
      <button class="skill-button p-4 border-black border-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300" aria-label="React">
        <box-icon type='logo' name='react' class="w-24 h-24 md:w-28 md:h-28"></box-icon>
        <span class="mt-2 text-sm text-center">React<br>JavaScript Library</span>
      </button>
      <button class="skill-button p-4 border-black border-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300" aria-label="Vue.js">
        <box-icon name='vuejs' type='logo' class="w-24 h-24 md:w-28 md:h-28"></box-icon>
        <span class="mt-2 text-sm text-center">Vue.js<br>JavaScript Framework</span>
      </button>
      <button class="skill-button p-4 border-black border-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300" aria-label="Tailwind CSS">
        <box-icon name='tailwind-css' type='logo' class="w-24 h-24 md:w-28 md:h-28"></box-icon>
        <span class="mt-2 text-sm text-center">Tailwind CSS<br>Utility-First CSS Framework</span>
      </button>
      <button class="skill-button p-4 border-black border-2 rounded-lg hover:bg-gray-200 flex items-center justify-center transition-colors duration-300" aria-label="Firebase">
        <box-icon name='firebase' type='logo' class="w-24 h-24 md:w-28 md:h-28"></box-icon>
        <span class="mt-2 text-sm text-center">Firebase<br>Backend Service</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "the-skills",
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // Initial check
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const elements = this.$refs.skillsContainer.querySelectorAll('.skill-button');
      const scrollPosition = window.innerHeight / 1.5;
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        
        if (position < scrollPosition) {
          element.classList.add('animate-fade-in-up');
        } else {
          element.classList.remove('animate-fade-in-up');
        }
      });
    }
  }
}
</script>

<style scoped>
/* Définir l'animation d'apparition */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-button {
  opacity: 0;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.skill-button.animate-fade-in-up {
  animation: fadeInUp 0.6s forwards;
}
</style>
