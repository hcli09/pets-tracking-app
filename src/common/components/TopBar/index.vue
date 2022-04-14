<template>
    <div class="top-bar-box">

        <!-- left hand side of dashboard top bar -->
        <p class="top-bar-title">Dashboard</p>

        <!-- right hand side of the dashboard top bar -->
        <div class="top-bar-right">
            <p class="top-bar-username">{{ firstName }} {{ lastName }}</p>
            <img class="top-bar-avatar" :src="UserAvatar" @click="clickUserAvatar()" />
            <el-button class="top-bar-settings" type="primary" :icon="Setting" plain @click="clickSettings()">Settings
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { Setting } from "@element-plus/icons-vue";
</script>

<script>
export default {
    name: 'PetsTopBar',
    props: ['firstName', 'lastName', 'UserAvatar'],

    //print for now
    methods: {
        clickSettings() {
            console.log('redirect to setting page');
        },

        clickUserAvatar() {
            console.log('redirect to userprofile');
        }
    }
};
</script>

<style lang="scss" scoped>
.top-bar-box {
    height: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.99;
    background-color: white;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}


//title dashabord 
.top-bar-title {
    margin-left: 1vw;
    font-size: x-large;
    font-family: Trebuchet MS;
    color: #76553f;
}


//username, avatar, settings
.top-bar-right {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .top-bar-username {
        margin-right: 1.1vw;
        font-size: medium;
        font-family: Trebuchet MS;
        color: #76553f;
    }

    .top-bar-avatar {
        margin-right: 1.1vw;
        height: 2.7rem;
        width: 2.7rem;
        border-radius: 10%
    }

    .top-bar-settings {
        margin-right: 1.1vw;
        border: #76553f;
    }
}
</style>
