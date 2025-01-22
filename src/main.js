import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'vue-toastification/dist/index.css';
import './assets/main.css';

// Enregistrement du service worker pour PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

const app = createApp(App);
app.use(createPinia());

app.mount('#app');
