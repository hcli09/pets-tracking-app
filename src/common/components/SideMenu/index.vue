<template>
    <sidebar-menu :menu="petsMenu" theme="white-theme" :collapsed="true" />
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
                        attributes: { src: `${pet.petAvatar}` },
                        // text: ''
                    },
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
                    hiddenOnCollapse: true,
                },
                {
                    href: '/',
                    title: 'Dashboard',
                    icon: 'fa fa-user',
                },
                {
                    href: '/charts',
                    title: 'Charts',
                    icon: 'fa fa-chart-area',
                    child: [
                        {
                            href: '/charts/sublink',
                            title: 'Sub Link',
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        petsMenu() {
            const menu = this.petList.map(pet => {
                return {
                    href: `/pet-profile?id=${pet.pid}`,
                    title: `${pet.petName}`,
                    icon: {
                        element: 'img',
                        class: '',
                        attributes: { src: `${pet.petAvatar}` },
                        // text: ''
                    },
                };
            });
            menu.unshift({
                header: 'Your Lovely Pets',
                hiddenOnCollapse: true,
            });
            return menu;
        },
    },
};
</script>

<style lang="scss">
.v-sidebar-menu {
    margin-top: 7.5vh;
}
</style>
