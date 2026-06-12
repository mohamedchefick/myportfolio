<template>
  <section class="hero-bg min-h-screen flex flex-col items-center justify-center pt-20 relative overflow-hidden">

    <!-- Ambient orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full py-16 lg:py-0 relative z-10">
      <div class="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-24">

        <!-- Text content -->
        <div ref="heroText" class="flex-1 opacity-0 text-center lg:text-left">

          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-[#0AFFEC]/10 border border-[#0AFFEC]/20 text-[#0AFFEC] text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-[#0AFFEC] pulse-dot inline-block"></span>
            Available for hire · Frontend Developer
          </div>

          <!-- Name -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-[72px] font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Hello, I'm<br>
            <span class="gradient-name">Mohamed<br>Chêfick</span>
          </h1>

          <!-- Description -->
          <p class="text-gray-400 text-base lg:text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
            Crafting modern, performant, and pixel-perfect interfaces with
            <span class="text-white font-medium">Vue.js</span>,
            <span class="text-white font-medium">React</span>,
            <span class="text-white font-medium">Angular</span> &
            <span class="text-white font-medium">Next.js</span> —
            from concept to production.
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <a @click.prevent="scrollToSection('projects')"
              class="glow-btn px-8 py-3.5 bg-[#0AFFEC] text-black font-bold rounded-xl text-sm cursor-pointer text-center transition-all duration-300 hover:scale-[1.03]">
              View Projects
            </a>
            <a @click.prevent="scrollToSection('contact')"
              class="px-8 py-3.5 border border-gray-700 text-white font-semibold rounded-xl text-sm cursor-pointer text-center transition-all duration-300 hover:border-[#0AFFEC] hover:text-[#0AFFEC]">
              Get in Touch
            </a>
          </div>

          <!-- Social icons -->
          <div class="flex gap-3 justify-center lg:justify-start">
            <a v-for="social in socials" :key="social.name"
               :href="social.url" target="_blank" rel="noopener noreferrer"
               class="p-2.5 border border-gray-800 rounded-xl bg-white/5 hover:border-[#0AFFEC] hover:bg-[#0AFFEC]/10 transition-all duration-300">
              <box-icon :name="social.icon" :type="social.type" :color="social.color" class="w-5 h-5"></box-icon>
            </a>
          </div>
        </div>

        <!-- Image -->
        <div ref="heroImage" class="flex-shrink-0 opacity-0">
          <div class="image-wrapper">
            <div class="image-ring"></div>
            <img :src="images.IMGHero" alt="Mohamed Chêfick"
              class="relative z-10 w-64 sm:w-80 lg:w-[380px] object-contain float-animation image-glow">
          </div>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
      <span class="text-gray-400 text-xs tracking-widest uppercase">Scroll</span>
      <div class="scroll-line"></div>
    </div>

  </section>
</template>

<script>
import 'boxicons';
import IMGHero from '../../assets/Banner.png';

export default {
  name: 'the-hero',
  data() {
    return {
      images: { IMGHero },
      socials: [
        { name: 'facebook', icon: 'facebook', type: 'logo', url: 'https://www.facebook.com/profile.php?id=100089825846100', color: '#1877F2' },
        { name: 'instagram', icon: 'instagram-alt', type: 'logo', url: 'https://www.instagram.com/mh_chefick', color: '#E4405F' },
        { name: 'whatsapp', icon: 'whatsapp', type: 'logo', url: 'https://wa.me/+24102390936', color: '#25D366' },
        { name: 'github', icon: 'github', type: 'logo', url: 'https://github.com/mohamedchefick', color: '#ffffff' },
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      if (this.$refs.heroText) this.$refs.heroText.classList.add('animate-in');
    }, 100);
    setTimeout(() => {
      if (this.$refs.heroImage) this.$refs.heroImage.classList.add('animate-in');
    }, 350);
  },
  methods: {
    scrollToSection(id, duration = 800) {
      const el = document.getElementById(id);
      if (!el) return;
      const start = window.scrollY;
      const end = el.offsetTop - 70;
      const startTime = performance.now();
      const scroll = (t) => {
        const elapsed = t - startTime;
        const p = Math.min(elapsed / duration, 1);
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        window.scrollTo(0, start + (end - start) * ease);
        if (elapsed < duration) requestAnimationFrame(scroll);
      };
      requestAnimationFrame(scroll);
    }
  }
};
</script>

<style scoped>
/* Background */
.hero-bg {
  background-color: #0A0A0A;
  background-image:
    radial-gradient(ellipse 80% 45% at 50% 0%, rgba(10, 255, 236, 0.07) 0%, transparent 65%),
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 100%, 48px 48px, 48px 48px;
  background-position: 0 0, -1px -1px, -1px -1px;
}

/* Ambient orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
  opacity: 0.12;
}
.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #0AFFEC, transparent 70%);
  top: -150px; left: -100px;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #0AFFEC, transparent 70%);
  bottom: 0; right: -80px;
  opacity: 0.06;
}

/* Gradient name */
.gradient-name {
  background: linear-gradient(135deg, #ffffff 0%, #0AFFEC 60%, #00e5d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glow button */
.glow-btn {
  box-shadow: 0 0 20px rgba(10, 255, 236, 0.35), 0 0 60px rgba(10, 255, 236, 0.1);
}
.glow-btn:hover {
  box-shadow: 0 0 30px rgba(10, 255, 236, 0.55), 0 0 80px rgba(10, 255, 236, 0.2);
}

/* Image wrapper */
.image-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-ring {
  position: absolute;
  inset: -16px;
  border-radius: 50%;
  border: 1px dashed rgba(10, 255, 236, 0.25);
  animation: slow-spin 20s linear infinite;
}
.image-glow {
  filter: drop-shadow(0 0 40px rgba(10, 255, 236, 0.18)) drop-shadow(0 0 80px rgba(10, 255, 236, 0.06));
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
.float-animation {
  animation: float 5s ease-in-out infinite;
}

/* Ring spin */
@keyframes slow-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Pulse dot */
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.8); }
}
.pulse-dot {
  animation: pulse-dot 2.5s ease-in-out infinite;
}

/* Scroll indicator */
@keyframes scroll-line {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, #0AFFEC, transparent);
  animation: scroll-line 2s ease-in-out infinite;
}

/* Entrance animations */
.animate-in {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
