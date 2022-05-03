<template>
    <div>
        <h1 class="profile-heading">Profile</h1>
        <div class="upper-box">
            <el-row>
                <el-col :span="4">
                    <div class="avatar-container">
                        <img
                            class="avatar-image"
                            :src="user.image"
                            alt="user avatar image"
                        />
                    </div>

                </el-col>
                <el-col :span="8">
                    <div class="name-and-button-container">
                        <div class="name">{{ user.firstName + " "+ user.lastName }}</div>
                        <div class="button-group">
                            <el-upload                        
                                class="upload-demo"
                                action="https://api.uomg.com/api/image.sogou"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :auto-upload="true"
                            >
                                    <el-button
                                        class=""
                                        color="#76553f"
                                        style="
                                            border: #737bc1;
                                            margin-bottom: 30px;
                                        "
                                        type="primary"
                                        plain
                                        :icon="CameraFilled"
                                    >
                                        Upload new avatar
                                    </el-button>                                          
                            </el-upload>                                    

                            <el-button
                                class=""
                                color="#76553f"
                                style="
                                    border: #737bc1;
                                    margin-bottom: 30px;
                                "
                                type="primary"
                                plain
                                :icon="Edit"                 
                                @click="linkToEditProfile"                   
                            >
                                Edit profile
                            </el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="middle-box">
            <div class="info-box">
                <div class="heading-line">
                    <el-icon><message /></el-icon>
                    <div class="info-title">Email</div>
                </div>
                <div class="info-line">
                    {{ user.email }}
                </div>
            </div>
            <div class="info-box">
                <div class="heading-line">
                    <el-icon size="3vh"><PhoneFilled /></el-icon>
                    <div class="info-title">Phone</div>
                </div>
                <div class="info-line">
                    {{ user.phone }}
                </div>                                                
            </div>
            <div class="info-box">
                <div class="heading-line">
                    <el-icon size="3vh"><LocationFilled /></el-icon>
                    <div class="info-title">Location</div>
                </div>
                <div class="info-line">
                    {{ user.address }}
                </div>                        
            </div>
        </div>

        <div class="bottom-box">
            <div class="pet" v-for="(item, index) in user.petList" :key="index">  
                <div class="pet-avatar-wrapper">
                    <img :src="item.petAvatar" alt="an image of the pet's avatar">
                </div>                      
                
                <div class="pet-name"> {{item.petName}} </div>                        
            </div>
        </div>

    </div>


</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import httpServices from '@services';
import router from '@/router';
import { PhoneFilled } from '@element-plus/icons-vue';
import { LocationFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'

import PetsTopBar from '@common/components/TopBar/index.vue';
import PetsSideBar from '@common/components/SideBar/index.vue';
import { Setting } from '@element-plus/icons-vue';
import { Plus } from '@element-plus/icons-vue';
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { CameraFilled } from '@element-plus/icons-vue';
import { Edit } from '@element-plus/icons-vue';

import SideMenu from '../../common/components/SideMenu/index.vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';


const upload = ref()


const user = reactive({
    uid: '4EL4hp_qRUYMzzal_G29f',
    email: '',
    firstName: '',
    lastName: '',
    phone: null,
    address: null,
    image: '',
    petList: [],
})

// const user = reactive({
//     uid: 10086,
//     email: 'lulalulei@gmail.com',
//     firstName: 'Bruce',
//     lastName: 'Wayne',
//     phone: 12345678,
//     address: "Sydney",
//     image: 'https://cdn-icons-png.flaticon.com/512/1320/1320933.png',
//     petList: [
//         {
//             pid: 1,
//             petName: 'Bella',
//             petAvatar:
//                 'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
//         },
//         {
//             pid: 2,
//             petName: 'Lucy ',
//             petAvatar:
//                 'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
//         },
//         {
//             pid: 3,
//             petName: 'Oliver',
//             petAvatar:
//                 'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg',
//         },
//         {
//             pid: 4,
//             petName: 'Rocky',
//             petAvatar:
//                 'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
//         },
//         {
//             pid: 5,
//             petName: 'Lily',
//             petAvatar:
//                 'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
//         },
//         {
//             pid: 6,
//             petName: 'Roxy',
//             petAvatar:
//                 'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg',
//         },
//         {
//             pid: 7,
//             petName: 'Emma',
//             petAvatar:
//                 'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
//         },
//         {
//             pid: 8,
//             petName: 'Annie',
//             petAvatar:
//                 'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
//         },
//         {
//             pid: 9,
//             petName: 'Teddy',
//             petAvatar:
//                 'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
//         },
//         {
//             pid: 10,
//             petName: 'Cody',
//             petAvatar:
//                 'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
//         },
//         {
//             pid: 11,
//             petName: 'Max',
//             petAvatar:
//                 'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg',
//         },
//         {
//             pid: 12,
//             petName: 'Angel',
//             petAvatar:
//                 'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
//         },
//     ],    
// })


//get user's data
onMounted(() => {
    getAllUsers();
    getUserProfile();
    emit('changeUserAvater', user.image)
})

const getUserProfile = async() => {
    const res = await httpServices.userProfile.getUserProfile({
        uid: '4EL4hp_qRUYMzzal_G29f',
    });
    user.image = res.data.data.image;
    user.firstName = res.data.data.firstName;
    user.lastName = res.data.data.lastName;
    user.petList = res.data.data.petList;
    user.email = res.data.data.email;
    user.phone = res.data.data.phone;
    user.isPetSitter = res.data.data.isPetSitter;
    user.address = res.data.data.address;
    console.log('res', res);
    console.log('firstName:', user.firstName);
}

const getAllUsers = async() => {
    const res = await httpServices.userProfile.getAllUsers();
    console.log("all users", res);
}

const linkToEditProfile = () => {
    router.push('/editprofile')
}

const emit = defineEmits(['changeUserAvater'])



// const userObject = {
//     uid: 10086,
//     email: 'lulalulei@gmail.com',
//     firstName: 'Bruce',
//     lastName: 'Wayne',
//     phone: null,
//     address: null,
//     image: 'https://cdn-icons-png.flaticon.com/512/1320/1320933.png',
//     petList: [
//         {
//             pid: 1,
//             petName: 'Bella',
//             petAvatar:
//                 'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
//         },
//         {
//             pid: 2,
//             petName: 'Lucy ',
//             petAvatar:
//                 'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
//         },
//         {
//             pid: 3,
//             petName: 'Oliver',
//             petAvatar:
//                 'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg',
//         },
//         {
//             pid: 4,
//             petName: 'Rocky',
//             petAvatar:
//                 'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
//         },
//         {
//             pid: 5,
//             petName: 'Lily',
//             petAvatar:
//                 'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
//         },
//         {
//             pid: 6,
//             petName: 'Roxy',
//             petAvatar:
//                 'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg',
//         },
//         {
//             pid: 7,
//             petName: 'Emma',
//             petAvatar:
//                 'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
//         },
//         {
//             pid: 8,
//             petName: 'Annie',
//             petAvatar:
//                 'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
//         },
//         {
//             pid: 9,
//             petName: 'Teddy',
//             petAvatar:
//                 'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
//         },
//         {
//             pid: 10,
//             petName: 'Cody',
//             petAvatar:
//                 'https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png',
//         },
//         {
//             pid: 11,
//             petName: 'Max',
//             petAvatar:
//                 'https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg',
//         },
//         {
//             pid: 12,
//             petName: 'Angel',
//             petAvatar:
//                 'https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg',
//         },
//     ],
//     taskList: [],
//     eventList: [],
//     folderList: [
//         { folderid: 1, folderName: 'Invoice' },
//         { folderid: 2, folderName: 'Medication Report' },
//         { folderid: 3, folderName: 'Vaccination History' },
//     ],
// }


const handleAvatarSuccess = (
  response,
  uploadFile
) => {
    user.image = URL.createObjectURL(uploadFile.raw)
    emit('changeUserAvater', URL.createObjectURL(uploadFile.raw))
    ElMessage({
        message: 'New avatar uploaded.',
        type: 'success',
    })    
    console.log("upload", user.image)
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}


</script>

<style lang="scss" scoped>
// .profile-container {
//     position: absolute;
//     top: 0px;
//     bottom: 0px;
//     width: 99%;
//     background-color: #f2f4f7;
    .profile-heading {
        color: #76553f;
        font-family: Trebuchet MS;
        font-size: 3vh;
        margin-bottom: 2vh;;
    }
    .upper-box {
        height: 17.5vh;
        padding-left: 5vh;
        border-radius: 10px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: left;
        // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

        .avatar-container {
            text-align: center;
            margin-top: 3vh;

            .avatar-image {
                width: 10vh;
            }
        }

        .name-and-button-container {
            text-align: left;
            margin-top: 3vh;
            .name {
                color: #76553f;
                font-family: Trebuchet MS;
            }
            .button-group {
                margin-top: 2vh;
                display: flex;

                .upload-demo {
                    margin-right: 3vh;
                    
                }
            }
        }

    }

    .middle-box {
        margin-top: 3vh;
        padding: 5vh 15vh;
        height: 27vh;
        border-radius: 10px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: left;
        // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;        

        
        .info-box {
            color: #76553f;
            font-family: Trebuchet MS;
            .heading-line {
                display: flex;
                // .email-icon {
                //     height: 3vh;
                //     width: 3vh;
                // }
                .info-title {
                    margin-left: 1vh;
                }
            }

        }
    }

    .bottom-box {
        margin-top: 3vh;
        padding: 5vh 10vh;
        border-radius: 10px;
        background-color: white;     
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;  
        display: flex;       
        flex-wrap: wrap;

        .pet {
            width: calc(100% / 7);
            min-width: calc(100% / 7);
            max-width: calc(100% / 7);
            margin-bottom: 5vh;

            display: flex;
            justify-content: space-between;
            flex-direction: column;

            .pet-avatar-wrapper {
                display: flex;
                justify-content: center;
                margin-bottom: 2vh;
                img {
                    width: 11vh;
                    border-radius: 1vh;
                    text-align: center;
                }
            }
            .pet-name {
                color: #76553f;
                font-family: Trebuchet MS;                
                text-align: center;
            }
        }
    }

// }

</style>