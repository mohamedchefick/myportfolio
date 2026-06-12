<template>
  <section class="py-24 px-6 md:px-10 lg:px-16 bg-white">
    <div class="max-w-6xl mx-auto">

      <!-- Title -->
      <div class="text-center mb-16">
        <p class="inline-flex items-center gap-2 text-[#0AFFEC] font-mono text-xs tracking-widest uppercase bg-black px-4 py-2 rounded-full mb-5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#0AFFEC] inline-block"></span>
          Let's talk
        </p>
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900">
          Contact <span class="text-[#0AFFEC] bg-black px-3 py-1.5 rounded-xl">Me</span>
        </h2>
        <p class="text-gray-400 text-sm mt-4">Have a project in mind? Let's make it happen.</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-12 lg:gap-24">

        <!-- Left -->
        <div class="lg:w-5/12 space-y-8">
          <p class="text-gray-600 text-base leading-relaxed">
            Transform your ideas into a modern and efficient product. Whether it's a landing page, a full web app, or an API integration — I deliver clean, performant, production-ready frontends.
          </p>

          <!-- Email -->
          <a href="mailto:mohamedchefickmhchefick@gmail.com"
            class="group flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-[#0AFFEC]/40 hover:shadow-[0_0_20px_rgba(10,255,236,0.08)] transition-all duration-300">
            <div class="w-11 h-11 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
              <box-icon name='envelope' color="#0AFFEC" class="w-5 h-5"></box-icon>
            </div>
            <div>
              <p class="text-gray-400 text-xs mb-0.5">Email me at</p>
              <p class="text-gray-800 text-sm font-semibold break-all group-hover:text-black transition-colors">mohamedchefickmhchefick@gmail.com</p>
            </div>
          </a>

          <!-- Social -->
          <div>
            <p class="text-gray-400 text-xs font-mono tracking-widest uppercase mb-3">Find me on</p>
            <div class="flex gap-3">
              <a v-for="social in socials" :key="social.name"
                 :href="social.url" target="_blank" rel="noopener noreferrer"
                 class="p-2.5 border border-gray-200 rounded-xl hover:border-black hover:shadow-sm transition-all duration-200">
                <box-icon :name="social.icon" :type="social.type" :color="social.color" class="w-5 h-5"></box-icon>
              </a>
            </div>
          </div>
        </div>

        <!-- Right: Form -->
        <div class="flex-1 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Name</label>
              <input v-model="name" type="text" placeholder="Your name"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300
                       focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all">
              <p v-if="errors.name" class="text-red-400 text-xs">{{ errors.name }}</p>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</label>
              <input v-model="email" type="email" placeholder="your@email.com"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300
                       focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all">
              <p v-if="errors.email" class="text-red-400 text-xs">{{ errors.email }}</p>
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Website <span class="normal-case text-gray-300">(optional)</span></label>
            <input v-model="website" type="text" placeholder="https://yoursite.com"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300
                     focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all">
            <p v-if="errors.website" class="text-red-400 text-xs">{{ errors.website }}</p>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Message</label>
            <textarea v-model="description" placeholder="Tell me about your project..." rows="5"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300
                     focus:outline-none focus:border-black focus:ring-1 focus:ring-black/10 transition-all resize-none"></textarea>
            <p v-if="errors.description" class="text-red-400 text-xs">{{ errors.description }}</p>
          </div>

          <button @click="validateForm"
            class="w-full sm:w-auto px-10 py-3.5 bg-black text-white font-bold text-sm rounded-xl
                   hover:bg-[#0AFFEC] hover:text-black transition-all duration-300 hover:shadow-[0_0_24px_rgba(10,255,236,0.35)]">
            Send Message
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { db } from '../../Config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'vue3-toastify';
import 'boxicons';

export default {
  name: 'the-contact',
  data() {
    return {
      name: '',
      email: '',
      website: '',
      description: '',
      errors: {},
      socials: [
        { name: 'facebook', icon: 'facebook', type: 'logo', url: 'https://www.facebook.com/profile.php?id=100089825846100', color: '#1877F2' },
        { name: 'instagram', icon: 'instagram-alt', type: 'logo', url: 'https://www.instagram.com/mh_chefick', color: '#E4405F' },
        { name: 'whatsapp', icon: 'whatsapp', type: 'logo', url: 'https://wa.me/+24102390936', color: '#25D366' },
        { name: 'github', icon: 'github', type: 'logo', url: 'https://github.com/mohamedchefick', color: '#181717' },
      ]
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.name) this.errors.name = 'Name is required.';
      if (!this.email) this.errors.email = 'Email is required.';
      else if (!this.validEmail(this.email)) this.errors.email = 'Invalid email address.';
      if (this.website && !this.validWebsite(this.website)) this.errors.website = 'Invalid website URL.';
      if (!this.description) this.errors.description = 'Message is required.';
      if (Object.keys(this.errors).length === 0) this.submitForm();
    },
    validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); },
    validWebsite(u) { return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(u); },
    async submitForm() {
      try {
        await addDoc(collection(db, 'Client'), {
          name: this.name, email: this.email,
          website: this.website, description: this.description,
          timestamp: new Date()
        });
        toast.success('Message sent successfully!');
        this.name = ''; this.email = ''; this.website = ''; this.description = '';
      } catch (error) {
        toast.error('Error sending message: ' + error.message);
      }
    }
  }
};
</script>
