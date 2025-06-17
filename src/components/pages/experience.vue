<template>
  <div class="bg-black text-white py-10 px-6 md:px-12 lg:px-20 italic">
    <div class="max-w-4xl mx-auto">
      <!-- Main Title -->
      <h1 class="text-3xl md:text-4xl lg:text-5xl mb-8 text-center font-light">
        My Professional<span class="font-extrabold text-[#0AFFEC]"> Experience</span>
      </h1>

      <!-- Experience Container -->
      <div class="space-y-6 md:space-y-8 lg:space-y-10">
        <!-- Academic Internship at HELIS -->
        <div class="experience-item bg-gray-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg opacity-0">
          <box-icon name='react' type='logo' rotate='180' color='rgba(15,240,223,0.98)' class="w-20 h-10 custom-spin"></box-icon>
          <h2 class="text-xl md:text-2xl font-semibold mb-2">Front-End Developer (Academic Internship)</h2>
          <h3 class="text-lg md:text-xl font-medium mb-2">HELIS - Location</h3>
          <p class="text-gray-300 text-base md:text-lg">
            Academic internship of 4 months as a Front-End Developer. Practical experience with modern web technologies, including HTML, CSS, JavaScript, Vue.js, Tailwind CSS, Firebase, and more. Participation in various projects, honing my skills in responsive design and user interface development.
          </p>
        </div>

        <!-- Professional Internship at 41devs -->
        <div class="experience-item bg-gray-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg opacity-0">
          <box-icon name='vuejs' type='logo' color='rgba(15,240,223,0.98)' class="w-20 h-10 custom-flash"></box-icon>
          <h2 class="text-xl md:text-2xl font-semibold mb-2">Front-End Developer (Professional Internship)</h2>
          <h3 class="text-lg md:text-xl font-medium mb-2">41devs - Location</h3>
          <p class="text-gray-300 text-base md:text-lg">
            4-month professional internship at 41devs. Contributed to the development of interactive web applications using frameworks such as Vue.js and libraries like Tailwind CSS. Assisted in debugging and optimizing code to improve performance and user experience.
          </p>
        </div>

        <!-- Academic Training -->
        <div class="experience-item bg-gray-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg opacity-0">
          <box-icon name='briefcase' color='rgba(15,240,223,0.98)' class="w-20 h-10  custom-flash"></box-icon>
          <h2 class="text-xl md:text-2xl font-semibold mb-2">Academic Training</h2>
          <h3 class="text-lg md:text-xl font-medium mb-2">Bac+3 - Field of Study</h3>
          <p class="text-gray-300 text-base md:text-lg">
            Bac+3 degree in web development. Gained fundamental knowledge in programming, web development, and software engineering principles. Continuous improvement of skills through self-learning and professional development.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExperienceSection',
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // Initial check
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      console.log('Scroll event triggered');
      const elements = document.querySelectorAll('.experience-item');
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
/* Animation for fading in and sliding up */
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

.experience-item {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s forwards;
}
@keyframes slow-flash {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  .custom-flash {
    animation: slow-flash 2s infinite; /* Animation de 3 secondes, répétée en boucle */
  }
  @keyframes slow-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .custom-spin {
    animation: slow-spin 5s linear infinite; /* 5 secondes pour une rotation complète */
  }
</style>
