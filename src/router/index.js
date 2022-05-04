import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/components/Home/index.vue';
import Login from '@/components/Login/index.vue';
import Register from '@/components/Register/index.vue';
import NotFound from '@/components/NotFound/index.vue';
import Dashboard from '@/components/Dashboard/index.vue';
import EditPet from '@/components/EditPet/index.vue';
import CreatePet from '@/components/CreatePet/index.vue';
import Invoice from '@/components/Invoice/index.vue';
import Calendar from '@/components/Calendar/index.vue';
import Settings from '@/components/Settings/index.vue';
import UserProfile from '@/components/UserProfile/index.vue';
import EditUserProfile from '@/components/EditUserProfile/index.vue';
import VaccinationHistory from '@/components/VaccinationHistory/index.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{
				path: 'dashboard',
				component: Dashboard
			},
			{
				path: 'calendar',
				component: Calendar
			},
			{
				path: '/editpet',
				component: EditPet
			},
			{
				path: '/createpet',
				component: CreatePet
			},
			{
				path: '/invoice',
				component: Invoice
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
                path: 'vaccinationhistory',
                component: VaccinationHistory
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
