import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from '@/router';
// vue sidebar menu
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components

const app = createApp(App);
app.use(VueSidebarMenu);
app.use(VCalendar, {});
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.mount('#app');
