<template>
  <div class="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16 mt-4 lg:mt-2">
    <h1 class="text-3xl text-center mb-8">
      My <span class="font-extrabold text-[#0AFFEC] bg-black px-3 py-2 rounded-2xl">Skills</span>
    </h1>
    <div
      class="flex flex-wrap justify-center gap-6 md:gap-10 lg:grid lg:grid-cols-4 lg:gap-10 lg:py-10"
      ref="skillsContainer"
    >
      <button
        v-for="(skill, index) in skills"
        :key="index"
        class="skill-button p-4 border-black border-2 rounded-lg hover:bg-gray-300 flex items-center justify-center transition-colors duration-300"
        :aria-label="skill.label"
      >
        <box-icon :type="skill.type" :name="skill.name" class="w-24 h-24 md:w-28 md:h-28"></box-icon>
        <span class="mt-2 text-sm text-center" v-html="skill.description"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSkills",
  data() {
    return {
      skills: [
        { name: 'html5', type: 'logo', label: 'HTML5', description: 'HTML5<br>Markup Language' },
        { name: 'css3', type: 'logo', label: 'CSS3', description: 'CSS3<br>Styling Language' },
        { name: 'javascript', type: 'logo', label: 'JavaScript', description: 'JavaScript<br>Programming Language' },
        { name: 'sass', type: 'logo', label: 'Sass', description: 'Sass<br>CSS Preprocessor' },
        { name: 'react', type: 'logo', label: 'React', description: 'React<br>JavaScript Library' },
        { name: 'vuejs', type: 'logo', label: 'Vue.js', description: 'Vue.js<br>JavaScript Framework' },
        { name: 'tailwind-css', type: 'logo', label: 'Tailwind CSS', description: 'Tailwind CSS<br>Utility-First CSS Framework' },
        { name: 'firebase', type: 'logo', label: 'Firebase', description: 'Firebase<br>Backend Service' },
        { name: 'typescript', type: 'logo', label: 'Typescript', description: 'Typescript<br>Improved Javascript.' },
      ]
    };
  },
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

