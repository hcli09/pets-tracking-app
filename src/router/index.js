import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/components/Home/index.vue';
import Login from '@/components/Login/index.vue';
import NotFound from '@/components/NotFound/index.vue';
import Dashboard from '@/components/Dashboard/index.vue';
import EditPet from '@/components/EditPet/index.vue';
import CreatePet from '@/components/CreatePet/index.vue';


const routes = [
    {
        path: '/:catchAll(.*)',
        name: 'Not Found',
        component: NotFound,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/editpet',
        name: 'EditPet',
        component: EditPet,
    },
    {
        path: '/createpet',
        name: 'CreatePet',
        component: CreatePet,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
