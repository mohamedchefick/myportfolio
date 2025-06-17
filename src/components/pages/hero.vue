<template>
  <div ref="heroSection" class="flex flex-col-reverse lg:flex-row items-center justify-center mx-5 md:mx-10 lg:mx-20 xl:mx-32 lg:h-screen opacity-0 mb-10 md:mb-0 mt-20 sm:mt-2">
      <div class="shadow-2xl p-8 md:p-12 lg:py-20 lg:px-20 rounded-3xl bg-white text-center lg:text-left">
          <h1 class="font-extrabold text-2xl md:text-3xl">Hello, I am Koudenoukpo Mohamed Chêfick, a front-end developer.</h1>
          <p class="font-semibold mt-4">Passionate about web development, I build modern, dynamic, and responsive interfaces that deliver engaging and intuitive user experiences...</p>
          <br>
          <div class="gap-2 flex justify-center lg:justify-start">
            <a href="https://www.facebook.com/profile.php?id=100089825846100" target="_blank" rel="noopener noreferrer">
                <button class="p-2 border-black border-2 rounded-lg hover:bg-gray-400">
                <box-icon type='logo' name='facebook' color="#1877F2" class="text-[#1877F2] hover:text-white"></box-icon>
            </button>
            </a>
              <a href="https://www.instagram.com/mh_chefick?igsh=MWViNXJkcGszbHdybQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                <button class="p-2 border-black border-2 rounded-lg hover:bg-gray-400">
                    <box-icon name='instagram-alt' type='logo' color="#E4405F" class="text-[#E4405F] hover:text-white"></box-icon>
                </button>
            </a>
            <a href="https://wa.me/+24102390936" target="_blank" rel="noopener noreferrer">
                <button class="p-2 border-black border-2 rounded-lg hover:bg-gray-400">
                    <box-icon name='whatsapp' type='logo' color="#25D366" class="text-[#25D366] hover:text-white"></box-icon>
                </button>
            </a>
            <a href="https://github.com/mohamedchefick" target="_blank" rel="noopener noreferrer">
                <button class="p-2 border-black border-2 rounded-lg hover:bg-gray-400">
                <box-icon name='github' type='logo' color="#181717" class="text-[#181717] hover:text-white"></box-icon>
            </button>
            </a>
          </div>
      </div>
      <img :src="images.IMGHero" class=" w-full md:w-1/2 lg:w-1/2 mb-8 lg:mb-0">
  </div>
</template>

<script>
import 'boxicons'
import IMGHero from '../../assets/Banner.png'

export default {
  name: 'the-hero',
  data() {
      return {
          images: { IMGHero }
      }
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
          const element = this.$refs.heroSection;
          const position = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.5;

          if (position < screenPosition) {
              element.classList.add('animate-fade-in-up');
          } else {
              element.classList.remove('animate-fade-in-up');
          }
      }
  }
}
</script>


<style scoped>
/* styles scoped */
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

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
}

</style>
