<template>
	<!-- header of pet general information page -->
	<div class="petinfo-header">
		<p>Pet General Information</p>
	</div>

	<div class="petinfo-content">
		<el-form
			:model="petForm"
			:rules="rules"
			ref="petForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<div class="buttons">
				<div>
					<el-button type="primary" @click="dialogVisible = true"
						>Delete Pet</el-button
					>
					<el-button @click="topetProfile">Cancel</el-button>
				</div>
				<el-dialog
					title="Warning"
					v-model="dialogVisible"
					width="30%"
					:before-close="handleClose"
				>
					<span>Are you sure to delete this pet? </span>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click="dialogVisible = false"
								>Cancel</el-button
							>
							<el-button
								type="primary"
								@click="
									deletePet();
									dialogVisible = false;
								"
								>Delete
							</el-button>
						</span>
					</template>
				</el-dialog>

				<el-form-item>
					<el-button type="primary" @click="submitForm('petForm')"
						>Save</el-button
					>
					<el-button @click="resetForm('petForm')">Clear</el-button>
				</el-form-item>
			</div>

			<!-- pet avatar to be updated later -->
			<div class="petavatar">
				<el-upload
					class="avatar-uploader"
					action=""
					:show-file-list="false"
					:before-upload="beforeAvatarUpload"
					:http-request="Upload"
				>
					<img
						v-if="petAvatar"
						:src="petAvatar"
						class="avatar"
						alt="upload"
					/>
					<img
						v-else
						src="https://pic.onlinewebfonts.com/svg/img_212908.png"
						class="avatar-uploader-icon"
					/>
				</el-upload>
				<p>Click to upload avatar!</p>
			</div>

			<div class="petforms">
				<div class="lc-petforms">
					<!-- pet name input -->
					<el-form-item label="Pet Name" prop="petName">
						<el-input v-model="petForm.petName"></el-input>
					</el-form-item>

					<!-- date of birth datepicker -->
					<el-form-item label="Birth Date" required>
						<el-form-item prop="petDob">
							<el-date-picker
								type="date"
								v-model="petForm.petDob"
								style="width: 100%"
								:disabledDate="disabledDateDob"
								format="YYYY/MM/DD"
								value-format="YYYY/MM/DD"
							>
							</el-date-picker>
						</el-form-item>
					</el-form-item>

					<!-- weight input -->
					<el-form-item label="Weight (kg)" prop="weight">
						<el-input
							v-model="petForm.weight"
							v-model.number="petForm.weight"
						>
						</el-input>
					</el-form-item>
				</div>

				<div class="rc-petforms">
					<!-- species breed select -->
					<el-form-item label="Species/Breed" prop="speciesAndBreed">
						<el-cascader
							v-model="petForm.speciesAndBreed"
							:options="speciesAndBreedOptions"
							@change="handleChange"
						>
						</el-cascader>
					</el-form-item>

					<!-- gender select -->
					<el-form-item label="Gender" prop="gender">
						<el-select v-model="petForm.gender">
							<el-option label="Female" value="0"></el-option>
							<el-option label="Male" value="1"></el-option>
							<el-option label="N/A" value="2"></el-option>
						</el-select>
					</el-form-item>

					<!-- height input -->
					<el-form-item
						class="test"
						label="Height (cm)"
						prop="height"
					>
						<el-input
							v-model="petForm.height"
							v-model.number="petForm.height"
						>
						</el-input>
					</el-form-item>
				</div>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import PetsTopBar from '@common/components/TopBar/index.vue';
import SideMenu from '../../common/components/SideMenu/index.vue';
import httpServices from '@services';
import { FireBaseStorage as storage } from '@services/firebase.js';
import {
	ref as ref_upload,
	uploadBytes,
	getDownloadURL
} from 'firebase/storage';
import { getStorage, ref as ref_delete, deleteObject } from 'firebase/storage';
</script>

<script>
var checknumber = (rule, value, callback) => {
	if (value < 1 && value != null && value != '') {
		callback(new Error('Must be greater than 0'));
	} else {
		callback();
	}
};

export default {
	data() {
		return {
			uid: localStorage.getItem('uid'),
			petId: this.$route.query.id,
			userObject: {
				firstName: '',
				lastName: '',
				image: 'https://cdn-icons-png.flaticon.com/512/1320/1320933.png',
				petList: [],
				folderList: []
			},

			petAvatar: '',
			rules: {
				petName: [
					{
						required: true,
						message: 'Please enter the pet name',
						trigger: 'blur'
					}
				],
				gender: [
					{
						required: true,
						message: 'Please select the gender',
						trigger: 'change'
					}
				],
				petDob: [
					{
						type: 'date',
						required: true,
						message: 'Please select date of birth',
						trigger: 'change'
					}
				],
				weight: [
					{ type: 'number', message: 'Weight must be a number' },
					{ validator: checknumber, trigger: 'blur' }
				],
				height: [
					{
						type: 'number',
						message: 'Height must be a number',
						trigger: 'change'
					},
					{ validator: checknumber, trigger: 'blur' }
				],
				speciesAndBreed: [
					{
						required: true,
						message: 'Please select Species and Breeds',
						trigger: 'change'
					}
				]
			},

			// array for casecader
			speciesAndBreedOptions: [],

			//pet dob can not be later than today
			disabledDateDob(time) {
				return time.getTime() > Date.now();
			}
		};
	},

	created() {
		this.$data.dialogVisible = false;
		this.$data.petForm = {
			petName: '',
			gender: '',
			petDob: '',
			species: '',
			speciesAndBreed: '',
			weight: null,
			height: null
		};
	},

	mounted() {
		httpServices.petInfo.getSpecies().then(response => {
			let species_list = response.data.data;
			for (let species of species_list) {
				let curr_speciesid = species.speciesId;
				let test_species = {
					value: species.speciesName,
					label: species.speciesName
				};

				httpServices.petInfo
					.getBreed({ speciesId: curr_speciesid })
					.then(response => {
						let children = [];
						let breed_list = response.data.data;
						for (const breed of breed_list) {
							let temp = {
								value: breed.breedName,
								label: breed.breedName
							};
							children.push(temp);
						}
						test_species['children'] = children;
						this.$data.speciesAndBreedOptions.push(test_species);
					});
			}
		}),
			//get pet profile
			httpServices.petInfo
				.getPet({ uid: this.$data.uid, petId: this.$data.petId })
				.then(response => {
					let petobject = response.data.data;

					//edit page, assign pet object to pet form
					this.$data.petForm.petName = petobject.petName;
					this.$data.petForm.gender = petobject.gender.toString();
					this.$data.petForm.petDob = petobject.petDob;
					this.$data.petForm.weight =
						petobject.weight === 0 ? null : petobject.weight;
					this.$data.petForm.height =
						petobject.height === 0 ? null : petobject.height;
					this.$data.petForm.speciesAndBreed = [
						petobject.species,
						petobject.breed
					];
					this.$data.petAvatar = petobject.petAvatar;
				})
				.catch(error => {
					console.log(error.message);
				});
	},

	methods: {
		topetProfile() {
			this.$router.push({
				path: '/home/pet-profile',
				query: { id: this.$data.petId }
			});
		},

		Upload() {},
		handleClose(done) {
			done();
		},

		submitForm(petForm) {
			this.$refs[petForm].validate(valid => {
				if (valid) {
					let petForm = this.$data.petForm;
					let petObject = {
						uid: this.$data.uid,
						petId: this.$data.petId,

						petName: petForm.petName,
						gender: parseInt(petForm.gender),
						petDob: petForm.petDob,
						species: petForm.speciesAndBreed[0],
						breed: petForm.speciesAndBreed[1],
						weight:
							petForm.weight == null || petForm.weight === ''
								? 0
								: petForm.weight,
						height:
							petForm.height == null || petForm.height === ''
								? 0
								: petForm.height,

						//avatar name
						petAvatar: this.$data.petAvatar
					};

					//update pet profile
					httpServices.petInfo
						.updatePet(petObject)
						.then(response => {
							this.topetProfile();
						})
						.catch(error => {
							console.log(error);
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
			this.petAvatar = '';
		},

		deletePet() {
			try {
				httpServices.petInfo
					.deletePet({ uid: this.$data.uid, petId: this.$data.petId })
					.then(response => {
						const storage = getStorage();
						// Create a reference to the file to delete
						const avatar_ref = decodeURIComponent(
							this.$data.petAvatar.split('/').pop().split('?')[0]
						);
						const desertRef = ref_delete(storage, avatar_ref);
						// Delete the file
						deleteObject(desertRef).then(() => {
							// File deleted successfully
						});
						location.href = '/';
					});
			} catch (error) {
				ElMessage.error('Failed to delete pet');
				console.log(error);
			}
		},

		handleChange(value) {
			console.log(value);
		},

		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error(
					'Upload avatar image can only be in JPG format!'
				);
				return false;
			}

			if (!isLt2M) {
				this.$message.error(
					'Upload avatar image size cannot exceed 2MB!'
				);
				return false;
			}

			//get current timstamp, timestamp will always be unique for each user
			const currentDate = new Date();
			const timestamp = currentDate.getTime();

			const storageRef = ref_upload(
				storage,
				this.$data.uid + '_petAvatar' + '_' + timestamp
			);
			uploadBytes(storageRef, file).then(() => {
				getDownloadURL(storageRef).then(url => {
					this.petAvatar = url;
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.petinfo-header {
	height: 10vh;
	position: relative;
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

	:deep(.avatar-uploader .el-upload) {
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
		border-radius: 50%;
	}

	.avatar {
		width: 9vw;
		height: 9vw;
		display: block;
		border-radius: 50%;
	}
}

.petinfo-content {
	background-color: white;
	height: 73vmin;
	margin: 0 2.5vw;
	padding: 2vh 3vw;
	border-radius: 1rem;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

	.buttons {
		padding: 1.5vh 0 0.5vh 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: #f2f2f2 solid;
	}

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
	font-family: Trebuchet MS;

	.lc-petforms {
		width: 340px;
	}

	:deep(.el-form-item__label) {
		color: #76553f;
		text-align: justify;
		margin-right: 20px;
		font-size: medium;
	}
	:deep(.el-input__inner) {
		box-shadow: 0 0 0 1px #76553f inset;
		font-family: Trebuchet MS;
		color: #76553f;
		font-size: medium;
	}
}
</style>
