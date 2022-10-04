<template>
	<sidebar-menu
		v-if="flag"
		theme="white-theme"
		:menu="petsMenu"
		:collapsed="true"
		@item-click="loadPetPage"
	/>
</template>

<script>
export default {
	props: ['petList', 'uid'],
	data() {
		return {
			flag: false,
			petsMenu: [
				{
					header: 'Your Lovely Pets',
					hiddenOnCollapse: true
				}
			]
		};
	},
	watch: {
		petList: function (newVal, _oldVal) {
			const menu = JSON.parse(JSON.stringify(newVal));

			this.petsMenu = menu.map(pet => {
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
			this.petsMenu.unshift({
				header: 'Your Lovely Pets',
				hiddenOnCollapse: true
			});
			this.flag = true;
		}
	},

	methods: {
		loadPetPage(event, item, node) {
			location.href = `#/home/pet-profile?id=${item.petId}`;
			location.reload();
		}
	}
};
</script>

<style lang="scss">
.v-sidebar-menu {
	margin-top: 7.5vh;
}
</style>
