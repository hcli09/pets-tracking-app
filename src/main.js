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
axios.defaults.baseURL = 'https://pets-backend.azurewebsites.net';
// For local mock
// axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/819321-0-default/';

//using axios request interceptor to change the uid in the payload, because all uid in the code are hardcoded
axios.interceptors.request.use(config => {
	// if (
	// 	config.hasOwnProperty('data') &&
	// 	config.url !== '/login' &&
	// 	config.url !== '/register'
	// ) {
	// 	config.data.uid = window.localStorage.getItem('uid');
	// }
	// if (
	// 	config.hasOwnProperty('params') &&
	// 	config.url !== '/login' &&
	// 	config.url !== '/register'
	// ) {
	// 	config.params.uid = window.localStorage.getItem('uid');
	// }

	return config;
});

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
