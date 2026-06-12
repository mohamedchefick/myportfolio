<template>
  <section class="experience-bg py-24 px-6 md:px-10 lg:px-16 relative overflow-hidden">

    <div class="orb-exp"></div>

    <div class="max-w-4xl mx-auto relative z-10">

      <!-- Title -->
      <div class="text-center mb-16">
        <p class="inline-flex items-center gap-2 text-[#0AFFEC] font-mono text-xs tracking-widest uppercase mb-5">
          <span class="w-6 h-px bg-[#0AFFEC]"></span>
          My journey
          <span class="w-6 h-px bg-[#0AFFEC]"></span>
        </p>
        <h2 class="text-3xl md:text-4xl font-extrabold text-white">
          Professional <span class="text-[#0AFFEC]">Experience</span>
        </h2>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-5 top-3 bottom-3 w-px bg-gradient-to-b from-[#0AFFEC]/40 via-[#0AFFEC]/20 to-transparent hidden md:block"></div>

        <div class="space-y-6">
          <div v-for="(exp, i) in experiences" :key="i"
            class="experience-item opacity-0 flex gap-6 md:gap-10">

            <!-- Timeline dot -->
            <div class="hidden md:flex flex-col items-center flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-[#0AFFEC]/10 border border-[#0AFFEC]/40 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(10,255,236,0.15)]">
                <box-icon :name="exp.icon" color="#0AFFEC" class="w-5 h-5"></box-icon>
              </div>
            </div>

            <!-- Card -->
            <div class="flex-1 exp-card border border-gray-800 p-6 md:p-8 rounded-2xl transition-all duration-300
                        hover:border-[#0AFFEC]/30 hover:shadow-[0_0_40px_rgba(10,255,236,0.06)]">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h3 class="text-white font-bold text-lg leading-tight">{{ exp.title }}</h3>
                  <p class="text-gray-400 text-sm font-medium mt-1">{{ exp.company }}</p>
                </div>
                <span class="text-[#0AFFEC] text-xs font-mono bg-[#0AFFEC]/10 border border-[#0AFFEC]/20 px-3 py-1.5 rounded-full self-start whitespace-nowrap">
                  {{ exp.period }}
                </span>
              </div>
              <p class="text-gray-500 text-sm leading-relaxed mb-4">{{ exp.description }}</p>
              <!-- Tech tags -->
              <div v-if="exp.tags" class="flex flex-wrap gap-2">
                <span v-for="tag in exp.tags" :key="tag"
                  class="text-xs text-gray-400 bg-gray-800/80 border border-gray-700 px-2.5 py-1 rounded-lg">
                  {{ tag }}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import 'boxicons';

export default {
  name: 'ExperienceSection',
  data() {
    return {
      experiences: [
        {
          icon: 'laptop',
          title: 'Frontend Developer',
          company: '41devs',
          period: '2 years',
          description: 'Worked for 2 years as a frontend developer, contributing to the design and development of scalable web applications. Handled UI architecture, API integration with REST & Swagger, code optimization, and delivery of pixel-perfect interfaces.',
          tags: ['Vue.js', 'Angular', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST API', 'Swagger']
        },
        {
          icon: 'code-alt',
          title: 'Frontend Developer',
          company: 'Academic Internship — HELIS',
          period: '4 months',
          description: 'Practical experience with modern web technologies including HTML, CSS, JavaScript, Vue.js, Tailwind CSS, and Firebase. Participated in multiple projects, honing skills in responsive design and user interface development.',
          tags: ['Vue.js', 'Tailwind CSS', 'Firebase', 'JavaScript']
        },
        {
          icon: 'book-open',
          title: 'Academic Training',
          company: 'Bac+3 — Web Development',
          period: '3 years',
          description: 'Degree in web development. Acquired solid foundations in programming, web engineering, and software architecture. Continuously expanding knowledge through self-learning and hands-on projects.',
          tags: ['HTML', 'CSS', 'JavaScript', 'Web Architecture']
        }
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
      const elements = document.querySelectorAll('.experience-item');
      const scrollPosition = window.innerHeight / 1.3;
      elements.forEach((el, i) => {
        const position = el.getBoundingClientRect().top;
        if (position < scrollPosition && !el.classList.contains('animate-in')) {
          setTimeout(() => el.classList.add('animate-in'), i * 150);
        }
      });
    }
  }
};
</script>

<style scoped>
.experience-bg {
  background-color: #0A0A0A;
  background-image:
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: -1px -1px;
}
.orb-exp {
  position: absolute;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(10,255,236,0.06), transparent 70%);
  border-radius: 50%;
  top: -200px; right: -200px;
  pointer-events: none;
}
.exp-card {
  background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
}
.animate-in {
  animation: fadeInUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
