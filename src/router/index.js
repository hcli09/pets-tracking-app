import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/components/Home/index.vue';
import Login from '@/components/Login/index.vue';
import Register from '@/components/Register/index.vue';
import NotFound from '@/components/NotFound/index.vue';
import Dashboard from '@/components/Dashboard/index.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{
				path: '',
				component: Dashboard
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
