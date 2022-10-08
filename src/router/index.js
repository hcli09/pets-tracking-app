import {
	createWebHistory,
	createRouter,
	createWebHashHistory
} from 'vue-router';

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
import Medication from '@/components/Medication/index.vue';
import EventTable from '@/components/EventTable/index.vue';
import TaskTable from '@/components/TaskTable/index.vue';
import PetProfile from '@/components/PetProfile/index.vue';
import BookingTable from '@/components/BookingTable/index.vue';
import ConfirmPage from '@/components/ConfirmPage/index.vue';
import CancelPage from '@/components/CancelPage/index.vue';
import RejectPage from '@/components/RejectPage/index.vue';
import EmailVerification from '@/components/EmailVerification/index.vue';
import SendVerifyEmail from '@/components/VerifyEmail/index.vue';
import TrackingDashboard from '@/components/TrackingDashboard/index.vue';
import MainTrackingDashboard from '@/components/MainTrackingDashboard/index.vue';

const routes = [
	{
		path: '/user/booking/reject_page/',
		name: 'RejectPage',
		component: RejectPage
	},
	{
		path: '/user/booking/accept_page/',
		name: 'ConfirmPage',
		component: ConfirmPage
	},
	{
		path: '/user/booking/cancel_page/',
		name: 'CancelPage',
		component: CancelPage
	},
	{
		path: '/user/verify',
		name: 'EmailVerification',
		component: EmailVerification
	},
	{
		path: '/send-verify-email',
		name: 'SendVerifyEmail',
		component: SendVerifyEmail
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		children: [
			{
				path: '',
				component: Dashboard
			},
			{
				path: 'calendar',
				component: Calendar
			},
			{
				path: 'event-table',
				component: EventTable
			},
			{
				path: 'task-table',
				component: TaskTable
			},
			{
				path: 'editpet',
				component: EditPet
			},
			{
				path: 'createpet',
				component: CreatePet
			},
			{
				path: 'invoice',
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
				path: 'medication',
				component: Medication
			},
			{
				path: 'vaccinationhistory',
				component: VaccinationHistory
			},
			{
				path: 'pet-profile',
				component: PetProfile
			},
			{
				path: 'booking-table',
				component: BookingTable
			},
			{
				path: 'tracking-dashboard',
				component: TrackingDashboard
			},
			{
				path: 'main-tracking-dashboard',
				component: MainTrackingDashboard
			}
		]
	},
	{
		path: '/:catchAll(.*)',
		name: 'Not Found',
		component: NotFound
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	if (!localStorage.getItem('token')) {
		if (
			to.name === 'Login' ||
			to.name === 'Register' ||
			to.name === 'SendVerifyEmail' ||
			to.name === 'EmailVerification'
		) {
			next();
		} else {
			router.push({
				name: 'Login'
			});
		}
	} else {
		next();
	}
});

export default router;
