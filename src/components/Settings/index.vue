<template>
    <div class="settings-container">
        <h1 class="setting-title">Settings</h1>
        <el-tabs v-model="activeName" class="setting-tabs" @tab-click="handleClick">
            <el-tab-pane label="Settings" name="settings">
                <div class="tab-settings">
                    <div class="tab-settings-content">



                        <div class="basic-info">
                            <div class="basic-info-title-container">
                                <h1 class="basic-info-title">BASIC INFO</h1>
                                
                            </div>

                            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
                                label-position="left" class="demo-ruleForm" :size="formSize">
                                <el-form-item label="First Name" prop="firstName">
                                    <el-input v-model="ruleForm.firstName" />
                                </el-form-item>
                                <el-form-item label="Last Name" prop="lastName">
                                    <el-input v-model="ruleForm.lastName" />
                                </el-form-item>
                                <!-- <el-form-item label="Password" prop="password">
                                    <el-input v-model="ruleForm.password" />
                                </el-form-item> -->
                                <el-form-item label="Phone" prop="phone">
                                    <el-input v-model.number="ruleForm.phone" />
                                </el-form-item>
                                <!-- <el-form-item label="Email" prop="email">
                                    <el-input v-model="ruleForm.email" />
                                </el-form-item> -->
                                <el-form-item label="Location" prop="location">
                                    <el-select v-model="ruleForm.location" filterable placeholder="Select or search your city">
                                        <el-option
                                        v-for="item in locationList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>     
                                </el-form-item>
                                <el-form-item label="Pet Sitter Status" prop="petSitterStatus">
                                    <el-select v-model="ruleForm.petSitterStatus" placeholder="Pet Sitter Status">
                                        <el-option label="Yes" value="true" />
                                        <el-option label="No" value="false" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm(ruleFormRef)">SAVE</el-button>
                                    <el-button @click="resetForm(ruleFormRef)">RESET</el-button>
                                </el-form-item>
                            </el-form>

                        </div>

                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Notification" name="notification">
                <h1>Method</h1>

            </el-tab-pane>
            <el-tab-pane label="Privacy" name="privacy">
                Privacy
            </el-tab-pane>
        </el-tabs>  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import httpServices from '@services';
import router from '@/router';
import axios from 'axios'


let userAvatarURL = ""

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    // email: '',
    location: '',
    petSitterStatus: '',

})

const locationList = ref([])

const emit = defineEmits(['changeUserInfo'])

const rules = reactive({
    //   firstName: [
    //     { required: true, message: 'Please input first name', trigger: 'blur' },
    //   ],
    //   lastName: [
    //     { required: true, message: 'Please input last name', trigger: 'blur' },
    //   ],
    password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 8, message: 'Password should be at least 8 digit', trigger: 'blur' },
    ],
    phone: [
        // { required: true, message: 'Please input phone number', trigger: 'blur' },
        { type: 'number', message: 'Please input correct phone number' },
    ],
    // email: [
    //     { required: true, message: 'Please input email address', trigger: 'blur' },
    //     { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
    // ],
    petSitterStatus: [
        //   { required: true, message: 'Please select your pet sitter status', trigger: 'change' }
    ],

})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('form submitted!')
            editSettings()
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

const editSettings = async() => {
    console.log("upload settings", ruleForm.firstName)
    let status = false;
    if (ruleForm.petSitterStatus.value) {
        status = true;
    }
    else {
        status = false;
    }

    const res = await httpServices.userProfileEdit.editUserProfile({
        uid: '4EL4hp_qRUYMzzal_G29f',
        firstName: ruleForm.firstName,
        lastName: ruleForm.lastName,
        phone: ruleForm.phone.toString(),
        address: ruleForm.location,
        isPetSitter: status,
    });

    if(res.data.status == 200) {
        emit('changeUserInfo', ruleForm.firstName, ruleForm.lastName);
        ElMessage({
            message: 'Settings updated.',
            type: 'success',
        }) 
        linkToDashboard();
    }

    console.log('res', res);
    
}

const linkToDashboard = () => {
    router.push('/dashboard')
}



let activeName = 'settings'
// let email = 'john.doe@gmail.com'
// let phone = '1234567890'
// let petSitterStatus = 'No'
// let petList = [
//     {
//         petName: 'Oliver',
//         avatar: new URL('/src/assets/Settings/cat1.png', import.meta.url).href
//     },
//     {
//         petName: 'Bella',
//         avatar: new URL('/src/assets/Settings/dog1.png', import.meta.url).href
//     },
//     {
//         petName: 'Lucy',
//         avatar: new URL('/src/assets/Settings/dog2.png', import.meta.url).href
//     },
// ]


// change tabs
function handleClick(tab, event) {
    console.log(tab, event)
}

onMounted(() => {
    getUserProfile();
    getLocationList();
})

const getLocationList = async() => {
    const res = await httpServices.userProfileEdit.getLocationList();
    for (let item of res.data.data) {
        locationList.value.push({value: item.cityName, label: item.cityName})
    }
}

const getUserProfile = async() => {
    const res = await httpServices.userProfile.getUserProfile({
        uid: '4EL4hp_qRUYMzzal_G29f',
    });
    // user.image = res.data.data.image;
    ruleForm.firstName = res.data.data.firstName;
    ruleForm.lastName = res.data.data.lastName;
    // user.petList = res.data.data.petList;
    // ruleForm.email = res.data.data.email;
    ruleForm.phone = Number(res.data.data.phone);
    ruleForm.petSitterStatus = res.data.data.isPetSitter?'Yes':'No';
    ruleForm.location = res.data.data.address;
    console.log('res', res);
}

//   fetch('https://pets-app.azurewebsites.net/data/location_list')
//   .then(res => res.json())
//   .then(json => {
//       console.log(json);
//       });


// axios.post('https://pets-app.azurewebsites.net/user/profile', { uid: "EpLV3L5QqlanlrmH7dzjw" }).
//     then(res => {
//         console.log(res.data)
//         userAvatarURL = res.image
//     })




</script>

<style lang="scss" scoped>
.settings-container {
    .setting-title {
        font-size: 1.3rem
            /* 13/10 */
        ;
        font-weight: normal;
        color: #76553f;
        margin-bottom: 1vh;
    }
}

.tab-settings-content {
    display: flex;

    .profile {
        border-right: .1rem
            /* 1/10 */
            solid #e6e6e6;
        padding: 0 2rem
            /* 20/10 */
        ;

        .profile-heading {
            text-align: center;
            font-size: 1.3rem
                /* 13/10 */
            ;
            font-weight: normal;
            color: #6c6c6c;
        }

        .user-avatar-container {
            display: flex;
            justify-content: center;

            .user-avatar {
                height: 7.2rem
                    /* 72/10 */
                ;
                width: 7.2rem
                    /* 72/10 */
                ;
                border-radius: 3.6rem
                    /* 36/10 */
                ;

            }
        }

        .user-name {
            text-align: center;
            font-size: 1.4rem
                /* 14/10 */
            ;
            font-weight: normal;
            margin-bottom: 2.8rem
                /* 28/10 */
            ;
        }

        .pet-list {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem
                /* 20/10 */
            ;
            padding: 0 3.7rem
                /* 37/10 */
            ;

            .pet-container {

                .pet-avatar {
                    height: 4.6rem
                        /* 46/10 */
                    ;
                    width: 4.6rem
                        /* 46/10 */
                    ;
                    border-radius: 2.3rem
                        /* 23/10 */
                    ;
                }

                .pet-name {
                    font-size: 1.2rem
                        /* 12/10 */
                    ;
                    font-weight: normal;
                    text-align: center;
                }
            }
        }

        .profile-info-container {
            display: flex;

            .profile-info-title {
                margin-right: 4.8rem
                    /* 48/10 */
                ;
            }

            .profile-info-title>div {
                font-size: 1.2rem
                    /* 12/10 */
                ;
                color: #6c6c6c;
                margin-bottom: 1.2rem
                    /* 12/10 */
                ;
            }

            .profile-info-content>div {
                font-size: 1.2rem
                    /* 12/10 */
                ;
                color: #6c6c6c;
                margin-bottom: 1.2rem
                    /* 12/10 */
                ;
            }

        }
    }

    .basic-info {
        padding-left: 2.5rem
            /* 25/10 */
        ;
        margin-top: 2vh;

        .basic-info-title-container {
            display: flex;
            padding-bottom: 1.5rem
                /* 15/10 */
            ;
            border-bottom: 1px solid #e5e5e5;
            margin-bottom: 1.5rem
                /* 15/10 */
            ;

            .basic-info-title {
                font-size: .9rem
                    /* 9/10 */
                ;
                font-weight: normal;
                margin-right: 5rem
                    /* 50/10 */
                ;
            }
        }

    }
}
</style>
