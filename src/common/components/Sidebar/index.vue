<template>
    <div class="side-bar-box">
        <!-- side menu -->
        <el-menu class="side-bar-menu">
            <!-- first pet card -->
            <el-menu-item class="side-bar-menu-item" index="1">
                <img class="side-bar-menu-item-petphoto" src="@assets/Dashboard/Oliver-petphoto.png" />
                <p>Oliver</p>
            </el-menu-item>

            <!-- second pet card -->
            <el-menu-item class="side-bar-menu-item " index="2">
                <img class="side-bar-menu-item-petphoto" src="@assets/Dashboard/Lucy-petphoto.png" />
                <p>Lucy</p>
            </el-menu-item>

            <!-- third pet card -->
            <el-menu-item class="side-bar-menu-item" index="3">
                <img class="side-bar-menu-item-petphoto" src="@assets/Dashboard/Lucy-petphoto.png" />
                <p>Bella</p>
            </el-menu-item>

        </el-menu>

        <!-- add pet button -->
        <el-button class="add-pet-button" type="primary" plain :icon="CirclePlusFilled"> Add </el-button>


        <!-- log out button-->
        <el-button class="log-out-button" type="primary" plain>Log Out</el-button>

</div>
</template>

<script setup>
import { CirclePlusFilled } from "@element-plus/icons-vue";
</script>

<script >
export default {
    name: 'PetsSideBar'
};
</script>

<style lang="scss" scoped>
.side-bar-box {
    width: 99%;
    height: 100%;
    padding-top: 0.2vh;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

.side-bar-menu {
    width: 101%;
    align-items: center;
    flex-direction: column;
}

.side-bar-menu-item {
    height: 11vh;
}

.side-bar-menu-item-petphoto {
    margin: 0 1vh;
    height: 8vmin;
    width: 8vmin;
    clip-path: circle();
}

p {
    color: #76553f;
    font-size: 2vmin;
    font-family: Trebuchet MS;
}

.add-pet-button {
    margin-top: 2vmax;
    justify-content: space-evenly;
    width: 7vw;
    height: 5vh;
    border: #76553f;
    border-radius: 1rem;
}

.log-out-button {
    width: 7vw;
    height: 5vh;
    margin-top: auto;
    margin-bottom: 4vh;
    border: #76553f;
    border-radius: 1rem;
}
</style>
