<template>
  <footer class="bg-black border-t border-gray-900 px-6 md:px-10 lg:px-16 py-8">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

      <!-- Logo -->
      <div class="flex items-center gap-2">
        <img :src="images.LOGO" alt="Logo" class="w-8 h-8 rounded-full object-cover">
        <span class="text-white font-bold text-lg">MH<span class="text-[#0AFFEC]">.</span></span>
      </div>

      <!-- Copyright -->
      <p class="text-gray-600 text-xs text-center">
        &copy; 2026 Koudenoukpo Mohamed Chêfick. All rights reserved.
      </p>

      <!-- Social icons -->
      <div class="flex gap-3">
        <a v-for="social in socials" :key="social.name"
           :href="social.url" target="_blank" rel="noopener noreferrer"
           class="p-2 border border-gray-800 rounded-lg hover:border-[#0AFFEC] transition-colors duration-200">
          <box-icon :name="social.icon" :type="social.type" :color="social.color" class="w-4 h-4"></box-icon>
        </a>
      </div>

    </div>
  </footer>
</template>

<script>
import LOGO from "../../assets/MhLogo.jpg";
import 'boxicons';

export default {
  name: 'the-footer',
  data() {
    return {
      images: { LOGO },
      socials: [
        { name: 'facebook', icon: 'facebook', type: 'logo', url: 'https://www.facebook.com/profile.php?id=100089825846100', color: '#1877F2' },
        { name: 'instagram', icon: 'instagram-alt', type: 'logo', url: 'https://www.instagram.com/mh_chefick', color: '#E4405F' },
        { name: 'github', icon: 'github', type: 'logo', url: 'https://github.com/mohamedchefick', color: '#9CA3AF' },
      ]
    };
  }
};
</script>
