import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/components/Home/index.vue';
import Login from '@/components/Login/index.vue';
import Register from '@/components/Register/index.vue';
import NotFound from '@/components/NotFound/index.vue';
import Dashboard from '@/components/Dashboard/index.vue';
import EditPet from '@/components/EditPet/index.vue';
import CreatePet from '@/components/CreatePet/index.vue';


const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/dashboard',
        redirect: '/',
    },
    {
        path: '/home',
        redirect: '/',
    },
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

        path: '/editpet',
        name: 'EditPet',
        component: EditPet,
    },
    {
        path: '/createpet',
        name: 'CreatePet',
        component: CreatePet,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
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
