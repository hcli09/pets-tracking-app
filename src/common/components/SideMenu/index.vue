<template>
	<sidebar-menu
		:menu="petsMenu"
		theme="white-theme"
		:collapsed="true"
		@item-click="loadPetPage"
	/>
</template>

<script>
export default {
	props: ['petList', 'uid'],
	created() {
		console.log(
			this.petList.map(pet => {
				return {
					href: `/pet-profile?id=${pet.pid}`,
					title: `${pet.petName}`,
					icon: {
						element: 'img',
						class: '',
						attributes: { src: `${pet.petAvatar}` }
					}
				};
			})
		);
		console.log(this.petsMenu);
	},
	data() {
		return {
			menu: [
				{
					header: 'Your Lovely Pets',
					hiddenOnCollapse: true
				},
				{
					href: '/',
					title: 'Dashboard',
					icon: 'fa fa-user'
				},
				{
					href: '/charts',
					title: 'Charts',
					icon: 'fa fa-chart-area',
					child: [
						{
							href: '/charts/sublink',
							title: 'Sub Link'
						}
					]
				}
			]
		};
	},
	computed: {
		petsMenu() {
			const menu = this.petList.map(pet => {
				return {
					petId: pet.petId,
					title: `${pet.petName}`,
					icon: {
						element: 'img',
						class: '',
						attributes: { src: `${pet.petAvatar}` }
					}
				};
			});
			menu.unshift({
				header: 'Your Lovely Pets',
				hiddenOnCollapse: true
			});
			return menu;
		}
	},
	methods: {
		loadPetPage(event, item, node) {
			location.href = `/editpet?id=${item.petId}`;
		}
	}
};
</script>

<style lang="scss">
.v-sidebar-menu {
	margin-top: 7.5vh;
}
</style>
