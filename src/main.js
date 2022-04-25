import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as ElIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from '@/router';
// vue sidebar menu
import VueSidebarMenu from 'vue-sidebar-menu';
import '@styles/side-menu/custom-var.scss';
// axios
import axios from 'axios';
axios.defaults.baseURL = 'https://pets-app.azurewebsites.net/';
// v-calendar
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
// clock
// import Vue from 'vue';
// import VueClock from '@dangvanthanh/vue-clock';

// Vue.use(VueClock);
// ElementIcon
const app = createApp(App);
Object.keys(ElIcons).forEach(key => {
    app.component(key, ElIcons[key]);
});
app.use(VueSidebarMenu);
// app.component('VueClock', VueClock);
app.use(VCalendar, {});
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.mount('#app');
