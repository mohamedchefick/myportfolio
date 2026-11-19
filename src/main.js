import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'vue3-toastify/dist/index.css';
import './assets/main.css';
import { vMagnetic } from './lib/motion';

const app = createApp(App);
app.use(createPinia());
app.directive('magnetic', vMagnetic);
app.mount('#app');
