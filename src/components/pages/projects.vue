<template>
    <div class="bg-black text-white">
        <h2 class="text-3xl md:text-4xl font-normal text-white text-center pt-5 animate-fade-in-up">My <span class="font-extrabold text-[#0AFFEC]">Projects</span></h2>
        
       <!-- Section 1 -->
        <div class="p-5 md:p-10 lg:p-20 flex flex-col lg:flex-row gap-5 items-center project-item">
        <!-- Image -->
        <div class="w-full lg:w-1/2">
            <a href="https://laboutiquechine.surge.sh/" class="block w-full h-full">
            <img :src="images.IMGecomerce" alt="E-commerce" class="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-700 hover:scale-105">
            </a>
        </div>

        <!-- Text Content -->
        <div class="w-full lg:w-1/2 flex flex-col items-center justify-center text-xl text-center lg:text-left">
            <h1 class="text-4xl font-extrabold flex items-start justify-start">01.</h1>
            <h3 class="italic">
            <span class="text-2xl font-extrabold">"LaboutiqueChine"</span> is your go-to online destination for authentic products directly from China. We offer a wide range of items, from trendy clothing and tech gadgets to unique accessories and high-quality beauty products. Whether you’re looking for fashion items, home decor, or innovative products, our store provides a smooth, secure, and fast shopping experience. Explore our collections, take advantage of our exclusive offers, and let us bring a touch of Chinese exoticism with reliable and speedy service.
            </h3>
        </div>
        </div>

        
        <hr class="mx-5 md:mx-20">
                
        <!-- Section 2 -->
        <div class="p-5 md:p-10 lg:p-20 flex flex-col lg:flex-row gap-5 items-center project-item">
            <!-- Image -->
            <div class="w-full lg:w-1/2 lg:order-last">
                <a href="https://fames-frontend.connect-me-app.com/" class="block w-full h-full">
                    <img :src="images.IMGBlog" alt="Blog" class="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-700 hover:scale-105 mb-5 lg:mb-0">
                </a>
            </div>

            <!-- Text Content -->
            <div class="w-full lg:w-1/2 flex flex-col items-center justify-center text-xl text-center lg:text-left">
                <h1 class="text-4xl font-extrabold flex items-start justify-start">02.</h1>
                <h3 class="italic">
                    <span class="text-2xl font-extrabold">"FAMES Bénin"</span> is the official site of the Beninese Students Association in China. Created to strengthen ties among Beninese students abroad, our blog is a platform dedicated to exchanges, information, and solidarity. Here, we share articles about student life in China, practical advice for newcomers, internship and job opportunities, as well as inspiring success stories. Whether you are a student, an alumnus, or simply interested in Sino-Beninese relations, FAMES Bénin invites you to join a dynamic and engaged community.
                </h3>
            </div>
        </div>

    </div>
</template>

<script>
import IMGecomerce from "../../assets/IMGE_COMERCE.png";
import IMGBlog from "../../assets/IMGBlog.png";

export default {
    name: 'the-projects',
    data() {
        return {
            images: { IMGecomerce, IMGBlog }
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
            const elements = document.querySelectorAll('.project-item');
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

.project-item {
  opacity: 0; /* Start with hidden state */
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

/* Optional: Animation for hover scale effect on images */
img {
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.05);
}
</style>
