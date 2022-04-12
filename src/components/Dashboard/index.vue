<template>
    <el-container class="dashboard-home">

        <!-- Top bar -->
        <el-header style="padding:0%">
            <PetsTopBar />
        </el-header>

        <el-container>
            <!-- side bar -->
            <el-aside width="13vw">
                <PetsSideBar />
            </el-aside>

            <!-- Main Dashboard, Folders and Calender -->
            <el-main style="background-color:#F2F2F2">
                <!-- folders -->
                <div class="outer-folder-box">
                    <span class="main-title-text">Records</span>
                    <div class="inner-folder-box">
                        <!-- cards showing the folders -->
                        <el-row>
                            <!-- Invoice folder -->
                            <el-col :span="3">
                                <div class="folder-box">
                                    <img class="folder-image"
                                        src="https://api.iconify.design/bxs/folder.svg?color=%23e9eaf4" />
                                    <el-button class="folder-name-button" type="text">Invoice
                                    </el-button>
                                </div>
                            </el-col>

                            <!-- Medication Report folder -->
                            <el-col :span="3">
                                <div class="folder-box">
                                    <img class="folder-image"
                                        src="https://api.iconify.design/bxs/folder.svg?color=%23ffeeea" />
                                    <el-button class="folder-name-button" type="text">Medication Report
                                    </el-button>
                                </div>
                            </el-col>

                            <!-- Vaccination History folder -->
                            <el-col :span="3">
                                <div class="folder-box">
                                    <img class="folder-image"
                                        src="https://api.iconify.design/bxs/folder.svg?color=%23fff9ec" />
                                    <el-button class="folder-name-button" type="text">Vaccination
                                        History</el-button>
                                </div>
                            </el-col>

                            <!-- add folder -->
                            <el-col :span="3">
                                <div class="folder-box">
                                    <img class="folder-image"
                                        src="https://api.iconify.design/bxs/folder-plus.svg?color=%23c0effc" />
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <!-- Events and tasks -->
                <span class="main-title-text">Events and Tasks</span>
                <div class="outer-events-tasks-box">

                    <el-row>

                        <!-- calender -->
                        <el-col :span="11">
                            <el-calendar class="calender" v-model="value" />

                        </el-col>

                        <!-- events and tasks for today -->
                        <el-col :span="8" class="summary-events-tasks-box">
                            <el-row :span="6" class="events-tasks-big-box ">
                                <b class="start-time-event-task">07:30</b>
                                <el-card shadow="hover" class="event-card">
                                    <div class="event-small-box">
                                        <div class="event-task-inside">
                                            <b>Medication Exam</b>
                                            <p>07:30-08:15</p>
                                        </div>
                                        <b>Bella</b>
                                    </div>
                                </el-card>
                            </el-row>

                            <el-row :span="6" class="events-tasks-big-box ">
                                <b class="start-time-event-task">09:20</b>
                                <el-card shadow="hover" class="event-card">
                                    <div class="event-small-box">
                                        <div class="event-task-inside">
                                            <b>Vaccination</b>
                                            <p>09:20-10:10</p>
                                        </div>
                                        <b>Lucy</b>
                                    </div>
                                </el-card>
                            </el-row>

                            <el-row :span="6" class="events-tasks-big-box ">
                                <b class="start-time-event-task">Task</b>
                                <el-card shadow="hover" class="task-card">
                                    <div class="task-small-box">
                                        <b>10 Tablets this week</b>
                                        <b>Bella</b>
                                    </div>
                                </el-card>
                            </el-row>

                            <el-row :span="6" class="events-tasks-big-box ">
                                <b class="start-time-event-task">Task</b>
                                <el-card shadow="hover" class="task-card">
                                    <div class="task-small-box">
                                        <b>10 Tablets this week</b>
                                        <b>Bella</b>
                                    </div>
                                </el-card>
                            </el-row>

                        </el-col>


                        <!-- add button for events and tasks -->
                        <el-col :span="3" class="add-events-tasks-box">
                            <el-row>
                                <el-button class="add-button" color="#4D56A2" style="border:#737BC1" type="primary"
                                    plain :icon="CirclePlusFilled"> Add Event
                                </el-button>
                            </el-row>
                            <el-row>
                                <el-button class="add-button" color="#FD6540" style="border:#FD6540" type="primary"
                                    plain :icon="CirclePlusFilled"> Add Task
                                </el-button>
                            </el-row>
                        </el-col>

                    </el-row>
                </div>

            </el-main>
        </el-container>

        </el-container>
</template>

<script setup>
import { ref } from 'vue'
import PetsTopBar from '@common/components/TopBar/index.vue'
import PetsSideBar from '@common/components/SideBar/index.vue'
import { Setting } from '@element-plus/icons-vue'
import { CirclePlusFilled } from "@element-plus/icons-vue";


const value = ref(new Date())
</script>

<style lang="scss" scoped>
.dashboard-home {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #F2F2F2;

}


// this folder box including the text record and the large white box
.outer-folder-box {
    margin-top: 0%;
    margin-bottom: 1.5vmax;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: left
}

.main-title-text {
    margin-left: 1rem;
    margin-bottom: 0.8rem;
    font-size: medium;
    color: #76553f;
    font-family: Trebuchet MS;
}

// the large white box below the text record
.inner-folder-box {
    height: 17.5vh;
    width: 99%;
    border-radius: 1rem;
    background-color: white;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: left;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

//box for each folder, including the folder name and folder icon
.folder-box {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding-left: 2vw;
    margin-top: 0.5vmax;
    margin-bottom: 0.5vmax;
}

.folder-image {
    // height: 10vh;
    width: 12vh;
}

.folder-name-button {
    padding-top: 0.1vmax;
    align-items: center;
    width: 1vh;
}

//this box is the large white box under title events and tasks
.outer-events-tasks-box {
    margin-top: 1rem;
    background-color: white;
    width: 99%;
    height: 60vh;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    .el-row {
        padding-top: 2vh;
    }
}

.add-events-tasks-box {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    padding-left: 1vw;
}

.add-button {
    width: 7rem;
    height: 3rem;
    border-radius: 1rem;
}

//this box including all the events and tasks for this day
.summary-events-tasks-box {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
}

//this box including one event/task box and correponding start time
.events-tasks-big-box {
    display: flex;
    flex-direction: row;
    align-items: center
}

.start-time-event-task {
    margin-right: 1.8vw;
    color: #908F8C;
    font-family: Trebuchet MS;
    font-size: 2vmin;
    width: 2vw;
}

.event-card {
    width: 35vh;
    height: 10vh;
    background-color: #E9EAF4;
    border-radius: 1rem;
}

:deep(.el-card__body) {
    padding: 2.2vh;
    text-align: center;
}

//including event/task name, time and pet name
.event-small-box {
    height: 6vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly
}

//including event/task name and time
.event-task-inside {
    padding-right: 2rem;
}

//event name and pet name
.event-small-box b {
    font-family: Trebuchet MS;
    color: #4D56A2;
    font-size: 1.8vmin;
}

//event detail time
.event-small-box p {
    font-family: Trebuchet MS;
    color: #737BC1;
    font-size: 1.5vmin;
}

//including event/task name, time and pet name
.task-small-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1.4vh;
}

//task title and pet name
.task-small-box b {
    font-family: Trebuchet MS;
    color: #FD6540;
    font-size: 1.8vmin;
}

.task-card {
    width: 35vh;
    height: 10vh;
    background-color: #FFEEEA;
    border-radius: 1rem;
}

.calender {
    margin: 6vh 0 0 9vh;

    :deep(.el-calendar-day) {
        height: 5vh;
        width: 3vw;
    }
}

.calender {
    :deep(.el-calendar__header) {
        padding: 0px;
    }
}
</style>