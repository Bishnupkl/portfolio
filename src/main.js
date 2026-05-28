import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import { installRevealDirective } from './directives/reveal';

const app = createApp(App);

app.use(createPinia()).use(router);
installRevealDirective(app);
app.mount('#app');
