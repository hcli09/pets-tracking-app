import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as ElIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from '@/router';

const app = createApp(App);
Object.keys(ElIcons).forEach(key => {
    app.component(key, ElIcons[key]);
});
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.mount('#app');
