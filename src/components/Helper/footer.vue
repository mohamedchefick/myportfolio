<template>
    <div class="bg-black p-4 md:p-5 lg:p-6 text-white flex flex-col md:flex-row items-center justify-between">
        <!-- Logo and Text -->
        <div class="flex items-center justify-center gap-2 mb-4 md:mb-0 logo-text-item">
            <img :src="images.LOGO" alt="Logo" class="w-8 md:w-10 rounded-full animate-slide-left">
            <h1 class="text-xl md:text-2xl font-bold animate-slide-left">Mh_Chêfick</h1>
        </div>
        <!-- Copyright Information -->
        <p class="text-sm md:text-base text-center md:text-right animate-slide-right">
          &copy; 2024 <a href="mailto:Koudenoukpoabiola@gmail.com" class="text-[#0AFFEC] hover:underline">Koudenoukpoabiola@gmail.com</a>. All rights reserved...
        </p>
    </div>
</template>

<script>
import LOGO from "../../assets/MhLogo.jpg"

export default {
    name: "the-footer",
    data() {
        return {
            images: { LOGO },
        }
    }
}
</script>

<style scoped>
/* Animation for sliding from left */
@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Animation for sliding from right */
@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.logo-text-item .animate-slide-left {
  animation: slideLeft 1s ease-out forwards;
}

.animate-slide-right {
  animation: slideRight 1s ease-out forwards;
}
</style>
