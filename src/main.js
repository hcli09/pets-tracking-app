import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as ElIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from '@/router';
// vue sidebar menu
import VueSidebarMenu from 'vue-sidebar-menu';

import axios from 'axios';

axios.defaults.baseURL = 'https://pets-app.azurewebsites.net/';

const app = createApp(App);
Object.keys(ElIcons).forEach(key => {
    app.component(key, ElIcons[key]);
});

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
