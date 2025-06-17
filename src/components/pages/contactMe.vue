<template>
    <div class="bg-slate-100 py-10 md:py-9">
        <h1 class="text-3xl md:text-4xl lg:text-5xl mb-8 text-center py-5 font-bold animate-fade-in-up">
            Contact <span class="text-[#0AFFEC] bg-black px-3 py-2 rounded-2xl">Me</span>
        </h1>
        <div class="flex flex-col lg:flex-row">
            <!-- Paragraph Section -->
            <div class="w-full lg:w-1/2 flex items-center justify-center p-5 md:p-10 lg:p-20 paragraph-item">
                <p class="text-base md:text-lg lg:text-xl italic text-center lg:text-left">
                    Transform your ideas into a modern and efficient website that captures attention and generates results. 
                    Contact me today to bring your digital project to life and stand out online with a tailor-made solution!
                    <br>
                    <a href="mailto:Koudenoukpoabiola@gmail.com">
                        <span class="mt-4 cursor-pointer font-semibold relative inline-block overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-black after:to-black after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
                            Koudenoukpoabiola@gmail.com
                        </span>
                    </a>
                </p>
            </div>
            
            <!-- Inputs Section -->
            <div class="w-full lg:w-1/2 p-5 md:p-10 lg:p-20 flex flex-col justify-center space-y-4 inputs-item">
                <input v-model="name" type="text" class="border border-black py-3 px-4 w-full rounded-lg" placeholder="Your name">
                <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
                
                <input v-model="email" type="email" class="border border-black py-3 px-4 w-full rounded-lg" placeholder="Email">
                <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
                
                <input v-model="website" type="text" class="border border-black py-3 px-4 w-full rounded-lg" placeholder="Your website (If exists)">
                <span v-if="errors.website" class="text-red-500">{{ errors.website }}</span>
                
                <textarea v-model="description" class="border border-black py-3 px-4 w-full h-32 rounded-lg" placeholder="Description"></textarea>
                <span v-if="errors.description" class="text-red-500">{{ errors.description }}</span>
                
                <div class="flex flex-col lg:flex-row gap-4 lg:gap-2 items-center lg:items-start justify-center lg:justify-start">
                    <button @click="validateForm" class="text-[#0AFFEC] text-lg md:text-xl font-semibold px-6 md:px-8 py-2 rounded-xl shadow-xl bg-black hover:scale-105 transition-transform duration-150">Contact-Me</button>
                    <div class="flex gap-2">
                        <a href="https://www.facebook.com/profile.php?id=100089825846100" target="_blank" rel="noopener noreferrer">
                            <button class="p-2 border-black border-2 rounded-lg hover:bg-gray-200 flex items-center justify-center">
                                <box-icon type='logo' name='facebook' color="#1877F2" class="text-[#1877F2] hover:text-white"></box-icon>
                            </button>
                        </a>
                        <a href="https://www.instagram.com/mh_chefick?igsh=MWViNXJkcGszbHdybQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                            <button class="p-2 border-black border-2 rounded-lg hover:bg-gray-200 flex items-center justify-center">
                                <box-icon name='instagram-alt' type='logo' color="#E4405F" class="text-[#E4405F] hover:text-white"></box-icon>
                            </button>
                        </a>
                        <a href="https://wa.me/+24102390936" target="_blank" rel="noopener noreferrer">
                            <button class="p-2 border-black border-2 rounded-lg hover:bg-gray-200 flex items-center justify-center">
                                <box-icon name='whatsapp' type='logo' color="#25D366" class="text-[#25D366] hover:text-white"></box-icon>
                            </button>
                        </a>
                        <a href="https://github.com/mohamedchefick" target="_blank" rel="noopener noreferrer">
                            <button class="p-2 border-black border-2 rounded-lg hover:bg-gray-200 flex items-center justify-center">
                                <box-icon name='github' type='logo' color="#181717" class="text-[#181717] hover:text-white"></box-icon>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../../Config/firebaseConfig'; // Ajuste le chemin en fonction de ton projet
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'vue3-toastify'; // Importer la fonction de toast
import 'vue-toastification/dist/index.css';
// import Toaste from './toast.vue'

export default {
    name: "the-contact",
    // components :"Toaste",
    data() {
        return {
            name: '',
            email: '',
            website: '',
            description: '',
            errors: {}
        };
    },
    methods: {
        validateForm() {
            this.errors = {}; // Réinitialiser les erreurs

            // Validation du nom
            if (!this.name) {
                this.errors.name = "Name is required.";
            }

            // Validation de l'email
            if (!this.email) {
                this.errors.email = "Email is required.";
            } else if (!this.validEmail(this.email)) {
                this.errors.email = "The email is not valid.";
            }

            // Validation du site web (optionnel)
            if (this.website && !this.validWebsite(this.website)) {
                this.errors.website = "The website URL is invalid.";
            }

            // Validation de la description
            if (!this.description) {
                this.errors.description = "Description is required.";
            }

            // Si aucune erreur, soumettre le formulaire
            if (Object.keys(this.errors).length === 0) {
                this.submitForm();
            }
        },
        validEmail(email) {
            // Regex simple pour valider les emails
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        validWebsite(url) {
            // Regex simple pour valider les URLs
            const re = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            return re.test(url);
        },
        async submitForm() {
            try {
                await addDoc(collection(db, 'Client'), {
                    name: this.name,
                    email: this.email,
                    website: this.website,
                    description: this.description,
                    timestamp: new Date()
                });
                toast.success('Message sent successfully!'); // Afficher un toast de succès
                // Réinitialiser les champs après l'envoi
                this.name = '';
                this.email = '';
                this.website = '';
                this.description = '';
            } catch (error) {
                toast.error("Error adding document: " + error.message); // Afficher un toast d'erreur
            }
        },
        handleScroll() {
            const paragraphItem = document.querySelector('.paragraph-item');
            const inputsItem = document.querySelector('.inputs-item');
            const scrollPosition = window.innerHeight / 1.5;
            
            if (paragraphItem) {
                const position = paragraphItem.getBoundingClientRect().top;
                if (position < scrollPosition) {
                    paragraphItem.classList.add('animate-fade-in-up');
                } else {
                    paragraphItem.classList.remove('animate-fade-in-up');
                }
            }
            
            if (inputsItem) {
                const position = inputsItem.getBoundingClientRect().top;
                if (position < scrollPosition) {
                    inputsItem.classList.add('animate-fade-in-up');
                } else {
                    inputsItem.classList.remove('animate-fade-in-up');
                }
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll(); // Initial check
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style scoped>
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

.paragraph-item,
.inputs-item {
  opacity: 0; /* Start with hidden state */
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

button {
  transition: transform 0.3s ease-in-out;
}

button:hover {
  transform: scale(1.05);
}

</style>
