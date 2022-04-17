<template>
    <el-container class="dashboard-home">
        <!-- Top bar -->
        <el-header style="height: 6vh; padding: 0">
            <PetsTopBar
                :firstName="userObject.firstName"
                :lastName="userObject.lastName"
                :UserAvatar="userObject.image"
            />
        </el-header>

        <el-container>
            <!-- side bar -->
            <el-aside style="width: 65px">
                <!-- <PetsSideBar :petList="userObject.petList" :uid="userObject.uid" /> -->
                <SideMenu
                    :petList="userObject.petList"
                    :uid="userObject.uid"
                ></SideMenu>
            </el-aside>

            <!-- Main part -->
            <el-main style="background-color: #f2f4f7">
                <!-- Dashboard, Calender and folders -->
                <!-- folders -->
                <div class="outer-folder-box">
                    <span class="main-title-text">Records</span>
                    <div class="inner-folder-box">
                        <!-- cards showing the folders -->
                        <el-row>
                            <template
                                v-for="(folder, index) in userObject.folderList"
                                :key="folder.id"
                            >
                                <el-col :span="3">
                                    <div class="folder-box">
                                        <!-- assign folders with different colors -->
                                        <img
                                            v-if="index % 3 === 0"
                                            class="folder-image"
                                            src="https://api.iconify.design/bxs/folder.svg?color=%23e9eaf4"
                                        />

                                        <img
                                            v-if="index % 3 === 1"
                                            class="folder-image"
                                            src="https://api.iconify.design/bxs/folder.svg?color=%23ffeeea"
                                        />

                                        <img
                                            v-if="index % 3 === 2"
                                            class="folder-image"
                                            src="https://api.iconify.design/bxs/folder.svg?color=%23fff9ec"
                                        />

                                        <el-button
                                            class="folder-name-button"
                                            type="text"
                                            >{{ folder.folderName }}
                                        </el-button>
                                    </div>
                                </el-col>
                            </template>

                            <!-- add folder -->
                            <el-col :span="3">
                                <div class="folder-box">
                                    <img
                                        class="folder-image"
                                        src="https://api.iconify.design/bxs/folder-plus.svg?color=%23c0effc"
                                    />
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <!-- Events and tasks -->
                <div class="outer-folder-box">
                    <span class="main-title-text">Events and Tasks</span>
                    <div class="outer-events-tasks-box">
                        <el-row>
                            <!-- calender -->
                            <el-col :span="11">
                                <el-calendar class="calender" v-model="value" />
                            </el-col>

                            <!-- events and tasks for today -->
                            <el-col :span="8" class="summary-events-tasks-box">
                                <el-row :span="6" class="events-tasks-big-box">
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

                                <el-row :span="6" class="events-tasks-big-box">
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

                                <el-row :span="6" class="events-tasks-big-box">
                                    <b class="start-time-event-task">Task</b>
                                    <el-card shadow="hover" class="task-card">
                                        <div class="task-small-box">
                                            <b>10 Tablets this week</b>
                                            <b>Bella</b>
                                        </div>
                                    </el-card>
                                </el-row>

                                <el-row :span="6" class="events-tasks-big-box">
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
                                    <el-button
                                        class="add-button"
                                        color="#76553f"
                                        style="border: #737bc1"
                                        type="primary"
                                        plain
                                        :icon="CirclePlusFilled"
                                    >
                                        Add Event
                                    </el-button>
                                </el-row>
                                <el-row>
                                    <el-button
                                        class="add-button"
                                        color="#76553f"
                                        style="border: #fd6540"
                                        type="primary"
                                        plain
                                        :icon="CirclePlusFilled"
                                    >
                                        Add Task
                                    </el-button>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-main>
            <!-- end of main part for dashboard -->
        </el-container>
    </el-container>
</template>

<script setup>
import { ref } from 'vue';
import PetsTopBar from '@common/components/TopBar/index.vue';
import PetsSideBar from '@common/components/SideBar/index.vue';
import { Setting } from '@element-plus/icons-vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import SideMenu from '../../common/components/SideMenu/index.vue';

const value = ref(new Date());
</script>

<script>
export default {
    data() {
        return {
            userObject: {
                uid: 10086,
                email: 'lulalulei@gmail.com',
                firstName: 'Lucy',
                lastName: 'Wayne',
                phone: null,
                address: null,
                image: 'https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_960_720.png',
                petList: [
                    {
                        pid: 1,
                        petName: 'Bella',
                        petAvatar:
                            'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
                    },
                    {
                        pid: 2,
                        petName: 'Lucy ',
                        petAvatar:
                            'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
                    },
                    {
                        pid: 3,
                        petName: 'Oliver',
                        petAvatar:
                            'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg',
                    },
                    {
                        pid: 4,
                        petName: 'Rocky',
                        petAvatar:
                            'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
                    },
                    {
                        pid: 5,
                        petName: 'Lily',
                        petAvatar:
                            'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
                    },
                    {
                        pid: 6,
                        petName: 'Roxy',
                        petAvatar:
                            'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg',
                    },
                    {
                        pid: 7,
                        petName: 'Emma',
                        petAvatar:
                            'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
                    },
                    {
                        pid: 8,
                        petName: 'Annie',
                        petAvatar:
                            'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
                    },
                    {
                        pid: 9,
                        petName: 'Teddy',
                        petAvatar:
                            'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
                    },
                    {
                        pid: 10,
                        petName: 'Cody',
                        petAvatar:
                            'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
                    },
                    {
                        pid: 11,
                        petName: 'Max',
                        petAvatar:
                            'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg',
                    },
                    {
                        pid: 12,
                        petName: 'Angel',
                        petAvatar:
                            'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
                    },
                ],
                taskList: [],
                eventList: [],
                folderList: [
                    { folderid: 1, folderName: 'Invoice' },
                    { folderid: 2, folderName: 'Medication Report' },
                    { folderid: 3, folderName: 'Vaccination History' },
                ],
            },
        };
    },
};
</script>

<style lang="scss" scoped>
.dashboard-home {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 99%;
    background-color: #f2f4f7;
}

.el-main {
    padding: 10px 20px;
}

// this folder box including the text record and the large white box
.outer-folder-box {
    margin-top: 0%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}

.main-title-text {
    margin-left: 1rem;
    margin-bottom: 10px;
    font-size: medium;
    color: #76553f;
    font-family: Trebuchet MS;
    font-weight: bold;
}

// the large white box below the text record
.inner-folder-box {
    height: 17.5vh;
    width: 99%;
    border-radius: 10px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: left;
    // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    //box for each folder, including the folder name and folder icon
    .folder-box {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        padding-left: 2vw;
        margin-top: 0.5vmax;
        margin-bottom: 0.5vmax;

        .folder-image {
            // height: 10vh;
            width: 12vh;
        }

        .folder-name-button {
            padding-top: 0.1vmax;
            align-items: center;
            width: 1vh;
        }
    }
}

.calender {
    margin: 6vh 0 0 9vh;

    :deep(.el-calendar-day) {
        height: 5vh;
    }

    :deep(.el-calendar__header) {
        padding: 0px;
    }
}

//this box is the large white box under title events and tasks
.outer-events-tasks-box {
    // margin-top: 1rem;
    background-color: white;
    width: 99%;
    height: 60vh;
    border-radius: 10px;
    // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    .el-row {
        padding-top: 2vh;
    }
}

//this box including all the events and tasks for this day
.summary-events-tasks-box {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;

    //this box including one event/task box and correponding start time
    .events-tasks-big-box {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .start-time-event-task {
        margin-right: 1.8vw;
        color: #908f8c;
        font-family: Trebuchet MS;
        font-size: 2vmin;
        width: 2vw;
    }

    .event-card {
        width: 35vh;
        height: 10vh;
        background-color: #e9eaf4;
        border-radius: 1rem;
    }

    .task-card {
        width: 35vh;
        height: 10vh;
        background-color: #ffeeea;
        border-radius: 1rem;
    }

    //including event/task name, time and pet name
    .event-small-box {
        height: 6vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;

        //event name and pet name
        b {
            font-family: Trebuchet MS;
            color: #4d56a2;
            font-size: 1.8vmin;
        }

        //event detail time
        p {
            font-family: Trebuchet MS;
            color: #737bc1;
            font-size: 1.5vmin;
        }
    }

    //including event/task name and time
    .event-task-inside {
        padding-right: 2rem;
    }

    :deep(.el-card__body) {
        padding: 2.2vh;
        text-align: center;
    }

    :deep(.el-card__body) {
        padding: 2.2vh;
        text-align: center;
    }

    //including event/task name, time and pet name
    .task-small-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 1.4vh;

        b {
            font-family: Trebuchet MS;
            color: #fd6540;
            font-size: 1.8vmin;
        }
    }
}

.add-events-tasks-box {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    padding-left: 1vw;

    .add-button {
        width: 7rem;
        height: 3rem;
        border-radius: 1rem;
    }
}
</style>
