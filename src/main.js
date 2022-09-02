import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css'; // importing tailwind css must come before element plus
import ElementPlus from 'element-plus';
import * as ElIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from '@/router';
import axios from 'axios';
import VueSidebarMenu from 'vue-sidebar-menu';
import '@styles/side-menu/custom-var.scss';

// axios
axios.defaults.baseURL = 'https://pets-app.azurewebsites.net/';
// v-calendar
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
// vue-datepicker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

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
app.component('Datepicker', Datepicker);

app.mount('#app');
