import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/components/Home/index.vue';
import Login from '@/components/Login/index.vue';
import NotFound from '@/components/NotFound/index.vue';
import Dashboard from '@/components/Dashboard/index.vue';
import Settings from '@/components/Settings/index.vue';
import UserProfile from '@/components/UserProfile/index.vue';
import EditUserProfile from '@/components/EditUserProfile/index.vue';


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
        path: '/settings',
        name: 'Settings',
        component: Settings,
    },
    {
        path: '/userprofile',
        name: 'User Profile',
        component: UserProfile,
    },
    {
        path: '/userprofile/edit',
        name: 'Edit User Profile',
        component: EditUserProfile,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
