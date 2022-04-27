<template>
    <div class="edit-profile-container">
        <h1 class="edit-profile-heading">Edit profile</h1>

        <div class="avatar-container">
            <img
                class="avatar-image"
                :src="imageURL"
                alt="user avatar image"
            />
        </div>

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




        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
            label-position="left" class="demo-ruleForm" :size="formSize">
            <el-form-item label="First Name" prop="firstName">
                <el-input v-model="ruleForm.firstName" />
            </el-form-item>
            <el-form-item label="Last Name" prop="lastName">
                <el-input v-model="ruleForm.lastName" />
            </el-form-item>
            <el-form-item label="Phone" prop="phone">
                <el-input v-model="ruleForm.phone" />
            </el-form-item>
            <el-form-item label="Location" prop="location">
                <el-input v-model="ruleForm.location" />
            </el-form-item>
            <el-form-item label="Pet Sitter Status" prop="petSitterStatus">
                <el-select v-model="ruleForm.petSitterStatus" placeholder="Pet Sitter Status">
                    <el-option label="Yes" value="true" />
                    <el-option label="No" value="false" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">SAVE</el-button>
                <el-button @click="resetForm(ruleFormRef)">CANCEL</el-button>
            </el-form-item>
        </el-form>






    </div>
    
</template>

<script setup>

import { reactive, ref, onMounted } from 'vue'
import httpServices from '@services';
import router from '@/router';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { CameraFilled } from '@element-plus/icons-vue';


// const user = reactive({
//     uid: '4EL4hp_qRUYMzzal_G29f',
//     email: '',
//     firstName: '',
//     lastName: '',
//     phone: null,
//     address: null,
//     image: '',
// })

const imageURL = ref('https://cdn-icons-png.flaticon.com/512/1320/1320933.png')
const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
    firstName: 'Bruce',
    lastName: 'Wayne',
    phone: '12345678',
    location: 'Sydney',
    petSitterStatus: 'No',
})

const emit = defineEmits(['changeUserAvater'])

const rules = reactive({
    firstName: [
        { required: true, message: 'Please input first name', trigger: 'blur' },
    ],
    lastName: [
        { required: true, message: 'Please input last name', trigger: 'blur' },
    ],
    phone: [
        // { required: true, message: 'Please input phone number', trigger: 'blur' },
    ],
    petSitterStatus: [
        //   { required: true, message: 'Please select your pet sitter status', trigger: 'change' }
    ],

})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('form is valid')
            editUserProfile()
        } else {
            console.log('form is not valid', fields)
        }
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

//get user's data
onMounted(() => {
    getUserProfile();
})

const getUserProfile = async() => {
    const res = await httpServices.userProfile.getUserProfile({
        uid: '4EL4hp_qRUYMzzal_G29f',
    });
    ruleForm.firstName = res.data.data.firstName;
    ruleForm.lastName = res.data.data.lastName;
    ruleForm.phone = res.data.data.phone;
    ruleForm.email = res.data.data.email;
    ruleForm.location = res.data.data.address;
    ruleForm.petSitterStatus = res.data.data.isPetSitter?'Yes':'No';

    imageURL.value = res.data.data.image;

    console.log('res', res);
    console.log('form', ruleForm.value);
    console.log('form first name', ruleForm.firstName);
}

const editUserProfile = async() => {
    console.log("upload first name", ruleForm.firstName)
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
        phone: ruleForm.phone,
        address: ruleForm.location,
        isPetSitter: status,
    });

    if(res.data.status == 200) {
        linkToProfile();
    }

    console.log('res', res);
    
}




const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageURL.value = URL.createObjectURL(uploadFile.raw)
  emit('changeUserAvater', URL.createObjectURL(uploadFile.raw))
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

const linkToProfile = () => {
    router.push('/userprofile')
}

</script>

<style lang="scss" scoped>
.edit-profile-container {

    .edit-profile-heading {
        font-size: 3vh;
        color: #785741;
        margin-bottom: 2vh;
    }
    .avatar-container {
        .avatar-image {
            width: 22vh;
            margin-bottom: 2vh;
        }
    }
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
