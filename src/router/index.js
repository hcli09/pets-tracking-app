import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/components/Home.vue';
import NotFound from '@/components/NotFound/index.vue';


const routes = [
    {
        path: '/:catchAll(.*)',
        name: 'Not Found',
        component: NotFound,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
