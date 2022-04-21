<template>
    <!-- side menu -->
    <el-menu :collapse="true">
        <el-scrollbar>
            <div>
                <!-- add pet -->
                <el-menu-item class="side-bar-menu-item" @click="addPet(uid)">
                    <img
                        class="side-bar-menu-item-petphoto"
                        src="https://api.iconify.design/akar-icons/circle-plus.svg?color=%2376553f&width=1500"
                    />
                    <p>Add Pet</p>
                </el-menu-item>

                <!-- pet card -->
                <template v-for="pet in petList" :key="pet.pid">
                    <el-menu-item
                        class="side-bar-menu-item"
                        @click="clickPet(pet.pid, pet.petName)"
                    >
                        <img
                            class="side-bar-menu-item-petphoto"
                            :src="pet.petAvatar"
                        />
                        <p>{{ pet.petName }}</p>
                    </el-menu-item>
                </template>
            </div>
        </el-scrollbar>
    </el-menu>
</template>

<script>
export default {
    name: 'PetsTopBar',
    props: ['petList', 'uid'],

    methods: {
        //print for now
        addPet(uid) {
            console.log(uid);
        },
        clickPet(petId, petName) {
            console.log('redirect to ' + petName + ' petId: ' + petId);
        },
    },
};
</script>

<style lang="scss" scoped>
.el-scrollbar {
    height: 95vh;
}

.el-scrollbar ::v-deep .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
}

.side-bar-menu-item {
    height: 10vh;

    .side-bar-menu-item-petphoto {
        margin: 0 1vh;
        height: 6vmin;
        width: 6vmin;
        clip-path: circle();
    }

    p {
        color: #76553f;
        font-size: 1.8vmin;
        font-family: Trebuchet MS;
    }
}
</style>
