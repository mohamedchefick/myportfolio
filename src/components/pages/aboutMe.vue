<template>
  <div class="p-10 md:p-20 lg:p-40 flex flex-col lg:flex-row gap-5 items-center bg-gray-100">
    <!-- About Me Image -->
    <img :src="images.IMGAboutMe" alt="About Me" class="w-full lg:w-1/2 rounded-lg shadow-lg animate-fade-in-zoom">

    <!-- About Me Text -->
    <div class="text-center lg:text-left space-y-4 lg:pl-10 max-w-prose animate-fade-in-zoom">
      <h2 class="text-3xl md:text-4xl font-normal text-gray-800">About <span class="font-extrabold text-[#0AFFEC] bg-black px-3 py-2 rounded-2xl">Me</span></h2>
      <p class="text-gray-600 text-base md:text-lg italic">
        As a passionate front-end developer with a Bac+3 degree,
        I have honed my skills in web development through academic
        and professional internships. My journey began with a
        three-month academic internship at HELIS, where I
        gained practical experience with modern web technologies.
        <br>
      </p>
      <p class="text-gray-600 text-base md:text-lg italic">
        I further advanced my expertise during a one-month professional
        internship at 41devs and three months academic, contributing
        to the development of interactive web applications.
        I am currently expanding my knowledge in artificial
        intelligence at Cerco IA, eager to combine my front-end
        development skills with AI innovations to create impactful
        digital experiences.
      </p>
    </div>
  </div>
</template>

<script>
import IMGAboutMe from "../../assets/aboutMe.png";
export default {
  name: 'the-about',
  data() {
    return {
      images: { IMGAboutMe }
    };
  },
  mounted() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const elements = document.querySelectorAll('.animate-slide-in-left, .animate-slide-in-right');
      const scrollPosition = window.innerHeight / 1.2;
      elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        if (position < scrollPosition) {
          element.classList.add('animate-fade-in');
        } else {
          element.classList.remove('animate-fade-in');
        }
      });
    }
  }
}
</script>
<style scoped>
/* Animation for fade in with zoom effect */
@keyframes fadeInZoom {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-zoom {
  animation: fadeInZoom 1s ease-out forwards;
}
</style>
