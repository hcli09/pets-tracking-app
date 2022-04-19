<template>
    <el-container class="dashboard-home">

        <!-- Top bar -->
        <el-header style="height: 6vh; padding:0">
            <PetsTopBar :firstName="userObject.firstName" :lastName="userObject.lastName"
                :UserAvatar="userObject.image" />
        </el-header>

        <el-container>
            <!-- side bar -->
            <el-aside style="width:12vw">
                <PetsSideBar :petList="userObject.petList" :uid="userObject.uid" />
            </el-aside>

            <!-- start of pet general info page -->
            <el-main style="background-color:#F2F2F2">


                <!-- header of pet general information page -->
                <div class="petinfo-header">
                    <p>Pet General Information</p>
                </div>

                <div class="petinfo-content">

                    <el-form :model="petForm" :rules="rules" ref="petForm" label-width="100px" class="demo-ruleForm">

                        <div class="buttons">
                            <el-button type="primary" @click="dialogVisible = true">Delete this pet</el-button>

                            <el-dialog title="Warning" v-model="dialogVisible" width="30%" :before-close="handleClose">
                                <span>Are you sure to delete this pet?
                                </span>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="dialogVisible = false">Cancel</el-button>
                                        <el-button type="primary" @click="deletePet(); dialogVisible = false">Delete
                                        </el-button>
                                    </span>
                                </template>
                            </el-dialog>


                            <el-form-item>
                                <el-button type="primary" @click="submitForm('petForm')">Save</el-button>
                                <el-button @click="resetForm('petForm')">Reset</el-button>
                            </el-form-item>
                        </div>



                        <!-- pet avatar to be updated later -->
                        <div class="petavatar">
                            <el-upload class="avatar-uploader" action="https://www.imgurl.org/upload/aws_s3"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="petAvatar" :src="petAvatar" class="avatar" alt="upload">
                                <img v-else src="https://pic.onlinewebfonts.com/svg/img_212908.png"
                                    class="avatar-uploader-icon">
                            </el-upload>
                            <p>Click to upload avatar!</p>
                        </div>

                        <div class="petforms">

                            <div>
                                <!-- pet name input -->
                                <el-form-item label="Pet Name" prop="petName">
                                    <el-input v-model="petForm.petName"></el-input>
                                </el-form-item>

                                <!-- gender select -->
                                <el-form-item label="Gender" prop="gender">
                                    <el-select v-model="petForm.gender">
                                        <el-option label="Female" value="0"></el-option>
                                        <el-option label="Male" value="1"></el-option>
                                        <el-option label="N/A" value="2"></el-option>
                                    </el-select>
                                </el-form-item>

                                <!-- date of birth datepicker -->
                                <el-form-item label="Date of Birth" required>
                                    <el-form-item prop="petDob">
                                        <el-date-picker type="date" v-model="petForm.petDob" style="width: 100%;"
                                            format="YYYY/MM/DD" value-format="YYYY/MM/DD">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-form-item>
                            </div>

                            <div>
                                <!-- species breed select -->
                                <el-form-item label="Species/Breed" prop="speciesAndBreed">
                                    <el-cascader v-model="petForm.speciesAndBreed" :options="speciesAndBreedOptions"
                                        @change="handleChange">
                                    </el-cascader>
                                </el-form-item>

                                <!-- weight input -->
                                <el-form-item label="Weight (kg)" prop="weight">
                                    <el-input v-model="petForm.weight" v-model.number="petForm.weight"></el-input>
                                </el-form-item>

                                <!-- height input -->
                                <el-form-item label="Height (cm)" prop="height">
                                    <el-input v-model="petForm.height" v-model.number="petForm.height"></el-input>
                                </el-form-item>

                            </div>
                        </div>


                    </el-form>


                </div>


            </el-main>
        </el-container>
    </el-container>
</template>


<script setup>
import PetsTopBar from '@common/components/TopBar/index.vue'
import PetsSideBar from '@common/components/SideBar/index.vue'

</script>

<script>
export default {
    data() {
        return {
            // mock userobject data, use for sidebar and top bar. need uid to get userobject, uid is from session storage
            userObject: {
                "uid": 10086,
                "email": "lulalulei@gmail.com",
                "firstName": "Lucy",
                "lastName": "Wayne",
                "phone": null,
                "address": null,
                "image": "https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_960_720.png",
                "petList": [
                    { pid: 1, petName: "Bella", petAvatar: "https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg" },
                    { pid: 2, petName: "Lucy ", petAvatar: "https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png" },
                    { pid: 3, petName: "Oliver", petAvatar: "https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg" },
                    { pid: 4, petName: "Rocky", petAvatar: "https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg" },
                    { pid: 5, petName: "Lily", petAvatar: "https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png" },
                    { pid: 6, petName: "Roxy", petAvatar: "https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg" },
                    { pid: 7, petName: "Emma", petAvatar: "https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg" },
                    { pid: 8, petName: "Annie", petAvatar: "https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png" },
                    { pid: 9, petName: "Teddy", petAvatar: "https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg" },
                    { pid: 10, petName: "Cody", petAvatar: "https://cdn0.iconfinder.com/data/icons/black-cat-emoticon-filled/64/cute_cat_kitten_face_per_avatar-02-512.png" },
                    { pid: 11, petName: "Max", petAvatar: "https://previews.123rf.com/images/lar01joka/lar01joka1804/lar01joka180400019/100152648-cute-shiba-inu-dog-avatar.jpg" },
                    { pid: 12, petName: "Angel", petAvatar: "https://thumbs.dreamstime.com/b/dog-avatar-25770385.jpg" },],
                "taskList": [],
                "eventList": [],
                "folderList": [{ folderid: 1, folderName: "Invoice" }, { folderid: 2, folderName: "Medication Report" }, { folderid: 3, folderName: "Vaccination History" }]
            },
            // mock petid for now, since need to get petid from sessions storage later on
            petId: 12345,

            // pet form, get from backend to show on the edit page, after editing then send to backend
            petForm: {
                petName: '',
                gender: '',
                petDob: '',
                species: '',
                speciesAndBreed: '',
                weight: '',
                height: '',
            },
            // pet avatar, get from backend to show on the edit page, after editing then send to backend
            petAvatar: '',

            // rules for pet form input
            rules: {
                petName: [
                    { required: true, message: 'Please enter the pet name', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: 'Please select the gender', trigger: 'change' }
                ],
                petDob: [
                    { type: 'date', required: true, message: 'Please select date of birth', trigger: 'change' }
                ],
                weight: [
                    { type: 'number', message: 'Weight must be a number' }
                ],
                height: [
                    { type: 'number', message: 'Height must be a number' }
                ],
                speciesAndBreed: [
                    { required: true, message: 'Please select Species and Breeds', trigger: 'change' }
                ]
            },

            // array for casecader
            speciesAndBreedOptions: [],
            dialogVisible: false,
        }
    },



    created: function () {
        // TODO: fetch uid and petId from session storage

        //fetch breeds and species from backedn, generate species and breeds options to match the cascader format in element plus
        fetch('http://127.0.0.1:4523/mock/819321/data/species_list', { method: "POST" })
            .then(response => response.json())
            .then(json => {
                let species_list = json.data;
                for (let species of species_list) {
                    let curr_speciesid = species.speciesId
                    let test_species = {
                        value: species.speciesName,
                        label: species.speciesName,
                    };

                    fetch('http://127.0.0.1:4523/mock/819321/data/breed_list', { method: "POST", body: { speciesId: curr_speciesid } })
                        .then(response => response.json())
                        .then(json => {

                            let children = [];
                            let breed_list = json.data;
                            for (const breed of breed_list) {
                                let temp = { value: breed.breedName, label: breed.breedName };
                                children.push(temp);
                            }
                            test_species["children"] = children;
                            this.$data.speciesAndBreedOptions.push(test_species);

                            // console.log(this.$data.speciesAndBreedOptions);
                        });
                }
            })


        // fetch pet object from backend
        fetch('http://127.0.0.1:4523/mock/819321/user/pet/profile', { method: "POST", body: { uid: this.$data.userObject.uid, petId: this.$data.petId } })
            .then(res => res.json())
            .then(json => {
                let petobject = json.data;
                console.log(json.data);
                //edit page, assign pet object to pet form
                this.$data.petForm.petName = petobject.petName;
                this.$data.petForm.gender = petobject.gender.toString();
                this.$data.petForm.petDob = petobject.petDob;
                this.$data.petForm.weight = petobject.weight;
                this.$data.petForm.height = petobject.height;
                this.$data.petForm.speciesAndBreed = [petobject.species, petobject.breed];

                this.$data.petAvatar = petobject.petAvatar;
            });
    },



    methods: {
        handleClose(done) {
            done();
        },
        //send petforms to backend
        submitForm(petForm) {
            this.$refs[petForm].validate((valid) => {
                if (valid) {
                    let petForm = this.$data.petForm;
                    let petObject = {
                        //mock uid and pid for now
                        uid: this.$data.userObject.uid,
                        pid: this.$data.petId,

                        //from pet form
                        petName: petForm.petName,
                        gender: parseInt(petForm.gender),
                        petDob: petForm.petDob,
                        species: petForm.speciesAndBreed[0],
                        breed: petForm.speciesAndBreed[1],
                        weight: petForm.weight,
                        height: petForm.height,

                        //avatar url
                        petAvatar: this.$data.petAvatar,
                    };
                    console.log(petObject);

                    //update pet profile
                    fetch('http://127.0.0.1:4523/mock/819321/user/pet/profile/update', { method: "POST", body: petObject })
                        .then(response => response.json())
                        .then(json => {
                            // console.log(json.status);
                            // TODO: check if status is 200
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        // clear all inputs
        resetForm(petForm) {
            this.$refs[petForm].resetFields();
        },

        // Delete pet
        deletePet() {
            fetch('http://127.0.0.1:4523/mock/819321/user/pet/delete', { method: "DELETE", body: { uid: this.$data.userObject.uid, petId: this.$data.petId } })
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    // TODO: check if status is 200
                });
        },

        handleChange(value) {
            console.log(value);
        },

        //avatar
        handleAvatarSuccess(res, file) {
            this.petAvatar = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('Upload avatar image can only be in JPG format!');
            }
            if (!isLt2M) {
                this.$message.error('Upload avatar image size cannot exceed 2MB!');
            }
            return isJPG && isLt2M;
        },
    },
}
</script>


<style lang="scss">
.dashboard-home {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    background-color: #F2F2F2;
}


.petinfo-header {
    height: 15vh;
    position: relative;
    background-color: #F2F2F2;
    padding-left: 3vw;
    margin-bottom: 1vh;

    p {
        margin: 0;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        font-size: large;
        font-family: Trebuchet MS;
        color: #76553f;
    }
}

.petavatar {
    p {
        display: flex;
        justify-content: center;
        color: #76553f;
        font-family: Trebuchet MS;
        font-size: medium;
    }

    .avatar-uploader {
        margin: 2vh;
        display: flex;
        justify-content: center;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #76553f;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #76553f;
        width: 9vw;
        height: 9vw;
        line-height: 9vw;
        text-align: center;
    }

    .avatar {
        width: 9vw;
        height: 9vw;
        display: block;
    }
}

.petinfo-content {
    background-color: white;
    height: 69vh;
    padding: 2vh 3vw;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    .buttons {
        padding: 1.5vh 0 0.5vh 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: #F2F2F2 solid;
    }

    ;

    .petavatar {
        display: block;
        justify-content: space-between;
        align-items: center;
    }
}

.petforms {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 9vh 0;

}
</style>
