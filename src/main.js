import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from '@/router';
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App);

app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.mount('#app');
app.use(VueAxios, axios);
