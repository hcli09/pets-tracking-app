import { createWebHistory, createRouter } from 'vue-router';

import Home from '@/components/Home/index.vue';
import Login from '@/components/Login/index.vue';
import Register from '@/components/Register/index.vue';
import NotFound from '@/components/NotFound/index.vue';
import Dashboard from '@/components/Dashboard/index.vue';
import EditPet from '@/components/EditPet/index.vue';
import CreatePet from '@/components/CreatePet/index.vue';
import InvoiceFolder from '@/components/InvoiceFolder/index.vue';

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
				path: '/editpet',
				component: EditPet
			},
			{
				path: '/createpet',
				component: CreatePet
			},
			{
				path: '/invoice',
				component: InvoiceFolder
			}
		]
	},
	{
		path: '/home',
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
