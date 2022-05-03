import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/components/Home/index.vue';
import Login from '@/components/Login/index.vue';
import Register from '@/components/Register/index.vue';
import NotFound from '@/components/NotFound/index.vue';
import Dashboard from '@/components/Dashboard/index.vue';
import Calendar from '@/components/Calendar/index.vue';

import Settings from '@/components/Settings/index.vue';
import UserProfile from '@/components/UserProfile/index.vue';
import EditUserProfile from '@/components/EditUserProfile/index.vue';
import EditPet from '@/components/EditPet/index.vue';
import CreatePet from '@/components/CreatePet/index.vue';
import Record from '@/components/Record/index.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '',
                component: Dashboard
            },
            {
                path: 'userprofile',
                component: UserProfile
            },
            {
                path: 'editprofile',
                component: EditUserProfile                
            }, 
            {
                path: 'settings',
                component: Settings               
            },
            {
                path: 'record',
                component: Record
            },
            {
				path: 'calendar',
				component: Calendar
			}                        
        ]
    },
    {
        path: '/home',
        redirect: '/'
    },
    {
		path: '/dashboard',
		redirect: '/'
	},
    {
        path: '/:catchAll(.*)',
        name: 'Not Found',
        component: NotFound
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {

        path: '/editpet',
        name: 'EditPet',
        component: EditPet
    },
    {
        path: '/createpet',
        name: 'CreatePet',
        component: CreatePet
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
