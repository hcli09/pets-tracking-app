<template>
    <!-- Top bar -->

    <!-- left hand side of dashboard top bar -->
    <div class="top-bar-box">
        <p class="top-bar-title">Dashboard</p>

        <!-- right hand side of the dashboard top bar -->
        <div class="top-bar-right">
            <p class="top-bar-username">John Doe </p>
            <img class="top-bar-avatar" src="@assets/Dashboard/Userphoto.png" />
            <!-- <el-button class="top-bar-settings" type="text">Settings</el-button>   -->
            <el-button class="top-bar-settings" type="primary" :icon="Setting" plain @click="setting()">Settings
            </el-button>
        </div>  </div> 
</template>

<script setup>
import { Setting } from "@element-plus/icons-vue";
</script>

<script>
export default {
    name: 'PetsTopBar',
    methods: {
        setting() {
            console.log('setting');
        }
    }
};
</script>

<style lang="scss" scoped>
.top-bar-box {
    width: 100%;
    height: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.99;
    background-color: white;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}


.top-bar-title {
    margin-left: 1vw;
    font-size: x-large;
    font-family: Trebuchet MS;
    color: #76553f;
}

.top-bar-right {
    display: flex;
    justify-content: space-around;
    align-items: center
}

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
</style>
