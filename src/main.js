import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from '@/router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSidebarMenu from 'vue-sidebar-menu';
import '@styles/side-menu/custom-var.scss';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';


// Use v-calendar & v-date-picker components
const app = createApp(App);
app.use(VueSidebarMenu);
app.use(VCalendar, {});
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.mount('#app');
app.use(VueAxios, axios);
