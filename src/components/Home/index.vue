<template>
    <el-container class="dashboard-home">
        <!-- Top bar -->
        <el-header style="height: 8vh; padding: 0">
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

                <router-view></router-view>
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
import { Plus } from '@element-plus/icons-vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import SideMenu from '../../common/components/SideMenu/index.vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

const remarks = ref({ '2021-1-13': 'some tings' });
const value = ref(new Date());
</script>

<script>
export default {
    data() {
        return {
            userObject: {
                uid: 10086,
                email: 'lulalulei@gmail.com',
                firstName: 'Bruce',
                lastName: 'Wayne',
                phone: null,
                address: null,
                image: 'https://cdn-icons-png.flaticon.com/512/1320/1320933.png',
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
            album: [
                {
                    id: 1,
                    picURL: 'https://www.rd.com/wp-content/uploads/2020/07/animalmemes-12.jpg?w=1414',
                },
                {
                    id: 2,
                    picURL: 'https://www.rd.com/wp-content/uploads/2020/12/When-you-have-three-zoom-calls-back-to-back-1297963220.jpg?w=1200',
                },
                {
                    id: 3,
                    picURL: 'https://www.rd.com/wp-content/uploads/2020/07/animalmemes-21.jpg?w=1414',
                },
                {
                    id: 4,
                    picURL: 'https://www.rd.com/wp-content/uploads/2020/07/animalmemes-20.jpg?w=1414',
                },
            ],
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
    padding: 20px 25px;
}

// this folder box including the text record and the large white box
.outer-folder-box {
    margin-top: 0%;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}

.main-title-text {
    margin-left: 1rem;
    margin-bottom: 10px;
    font-size: 24px;
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
            font-weight: bold;
        }
        .el-button > span {
            font-weight: 16px;
        }
    }
}

.inner-events-tasks-box {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    // section.carousel {
    //     height: 300px;
    // }

    .album-pic {
        width: 275px;
        height: 270px;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
}

//this box is the large white box under title events and tasks
.outer-events-tasks-box {
    display: flex;
    align-items: center;
    background-color: white;
    box-sizing: border-box;
    width: 99%;
    height: 50vh;
    border-radius: 10px;
    padding: 10px;
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
    height: 270px;
    // background: #fd6540;

    //this box including one event/task box and correponding start time
    .events-tasks-big-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 0;
        margin-bottom: 20px;
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
        // margin-bottom: 30px;
        // &:last-child {
        //     margin-bottom: 0;
        // }
    }
}
</style>
