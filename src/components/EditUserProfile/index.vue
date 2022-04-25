<template>
    <div class="edit-profile-container">
        <h1>Edit profile</h1>
        <h1>Profile picture</h1>
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
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

const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    petSitterStatus: false,
})

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
        uid: 'EpLV3L5QqlanlrmH7dzjw',
    });
    ruleForm.firstName = res.data.data.firstName;
    ruleForm.lastName = res.data.data.lastName;
    ruleForm.phone = res.data.data.phone;
    ruleForm.email = res.data.data.email;
    ruleForm.location = res.data.data.address;
    ruleForm.petSitterStatus = res.data.data.isPetSitter;

    console.log('res', res);
    console.log('form', ruleForm.value);
    console.log('form first name', ruleForm.firstName);
}

const editUserProfile = async() => {
    console.log("upload first name", ruleForm.firstName)
    let status = false;
    if (ruleForm.petSitterStatus) {
        status = true;
    }

    const res = await httpServices.userProfileEdit.editUserProfile({
        uid: 'EpLV3L5QqlanlrmH7dzjw',
        firstName: ruleForm.firstName,
        lastName: ruleForm.lastName,
        phone: ruleForm.phone,
        address: ruleForm.location,
        isPetSitter: status,
    });

    console.log('res', res);
    
}


const imageUrl = ref('')

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
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

<style scoped>
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
