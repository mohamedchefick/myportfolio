<template>
  <section class="py-24 px-6 md:px-10 lg:px-16 bg-[#F8FAFC]">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col lg:flex-row items-center gap-14 lg:gap-24">

        <!-- Image block -->
        <div class="flex-shrink-0 w-full lg:w-auto">
          <div class="relative max-w-sm mx-auto lg:max-w-none w-fit">
            <!-- Accent bracket lines -->
            <div class="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-[#0AFFEC] rounded-tl-lg"></div>
            <div class="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-[#0AFFEC] rounded-br-lg"></div>
            <img :src="images.IMGAboutMe" alt="Mohamed Chêfick"
              class="w-full lg:w-80 xl:w-96 rounded-2xl object-cover shadow-2xl">
          </div>
        </div>

        <!-- Text block -->
        <div class="flex-1 text-center lg:text-left">
          <p class="inline-flex items-center gap-2 text-[#0AFFEC] font-mono text-xs tracking-widest uppercase bg-black px-4 py-2 rounded-full mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-[#0AFFEC] inline-block"></span>
            Who I am
          </p>
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            About <span class="text-[#0AFFEC] bg-black px-3 py-1.5 rounded-xl">Me</span>
          </h2>
          <p class="text-gray-600 text-base leading-relaxed mb-4">
            I am a passionate frontend developer with 2 years of professional experience at <span class="text-black font-semibold">41devs</span>, where I built scalable web applications using <span class="font-medium text-gray-800">Vue.js, Angular, Next.js</span> and integrated REST APIs documented with <span class="font-medium text-gray-800">Swagger</span>.
          </p>
          <p class="text-gray-600 text-base leading-relaxed mb-8">
            My academic background includes a Bac+3 in web development and an internship at HELIS, where I strengthened my fundamentals in responsive design and modern frameworks. I am currently expanding into AI development at <span class="text-black font-semibold">Cerco IA</span>.
          </p>

          <!-- Stats row -->
          <div class="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto lg:mx-0">
            <div class="text-center lg:text-left">
              <p class="text-2xl font-extrabold text-[#0AFFEC]">4+</p>
              <p class="text-gray-500 text-xs mt-0.5 leading-tight">Years<br>experience</p>
            </div>
            <div class="text-center lg:text-left">
              <p class="text-2xl font-extrabold text-[#0AFFEC]">10+</p>
              <p class="text-gray-500 text-xs mt-0.5 leading-tight">Technologies<br>mastered</p>
            </div>
            <div class="text-center lg:text-left">
              <p class="text-2xl font-extrabold text-[#0AFFEC]">5+</p>
              <p class="text-gray-500 text-xs mt-0.5 leading-tight">Projects<br>delivered</p>
            </div>
          </div>

          <!-- Tech tags -->
          <div class="flex flex-wrap gap-2 justify-center lg:justify-start">
            <span v-for="tag in tags" :key="tag"
              class="text-xs font-semibold bg-black text-white px-3 py-1.5 rounded-full hover:bg-[#0AFFEC] hover:text-black transition-colors duration-200 cursor-default">
              {{ tag }}
            </span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import IMGAboutMe from "../../assets/aboutMe.png";

export default {
  name: 'the-about',
  data() {
    return {
      images: { IMGAboutMe },
      tags: ['Vue.js', 'Angular', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'REST API', 'Swagger']
    };
  }
};
</script>
