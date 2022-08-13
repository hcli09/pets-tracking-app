<template>
    <Close @click="$router.back()" />
    <div>
        <el-container>
            <el-header style="background-color:#eedad1;color:#c17754;height:10vh;line-height:10vh">VACCINATION HISTORY</el-header>
            <el-container>
                <el-main style="padding:0; margin-top:3vh">

                  <div class="record-box">
                    <div class="table-wrapper">
                      <el-table 
                        class="table" 
                        :data="displayedRecordList" 
                        :default-sort="{ prop: 'date', order: 'descending' }"
                        style="width: 100%"
                      >
                          
                          <el-table-column 
                            prop="petName" 
                            label="PET" 
                            :filters="petList"
                            :filter-method="filterHandler"
                            width="150" align="center" 
                          />
                          <el-table-column prop="vacType" label="VACCINATION TYPE" width="200" align="center" />
                          <el-table-column prop="date" label="DATE" sortable width="150" align="center" />

                          <el-table-column label="Operations" align="center" width="200">
                            <template #default="scope">
                              <el-button size="small" @click="editDialogFormVisible=true;fillFormByRow(scope.$index, scope.row)"
                                >Edit</el-button
                              >
                              <el-popconfirm
                                confirm-button-text="Yes"
                                cancel-button-text="No"
                                :icon="InfoFilled"
                                icon-color="#76553f"
                                title="Are you sure to delete this?"
                                @confirm="handleDelete(scope.$index, scope.row)"
                                @cancel="cancelEvent"
                              >
                                <template #reference>
                                  <el-button size="small">Delete</el-button>
                                </template>
                              </el-popconfirm>

                            </template>
                          </el-table-column>
                          <el-table-column prop="recordTitle" label="Description" width="200" align="center" />
                      </el-table>
                      <div class="add-button-wrapper">
                        <el-button class="add-button" @click="addDialogFormVisible = true">
                          <el-icon style="margin-right:1vh"><circle-plus-filled /></el-icon>
                          Add
                        </el-button>
                      </div>
                      
                    </div>

                    <div class="right-filter">
                      <el-form>
                        <el-form-item class="datepicker">
                          <p>Date Filter</p>
                          <el-date-picker
                            v-model="dateRange"
                            type="daterange"
                            range-separator="to"
                            start-placeholder="Start"
                            end-placeholder="End"
                            align="center"
                            size="mini"
                            @change="applyFilter"
                          >
                          </el-date-picker>
                        </el-form-item>

                        <div class="pet-filter">
                          <p>Pet Filter</p>
                          <el-select
                            v-model="petSelected"
                            placeholder="Select Pet"
                            @change="applyFilter"
                          >
                            <el-option
                              v-for="pet in petList"
                              :key="pet.value"
                              :label="pet.text"
                              :value="pet.value"
                            >
                            </el-option>
                          </el-select>
                        </div>

                        <div class="filter_add">
                          <el-button
                            class="rihgt_buttons"
                            style="margin-top: 1vw"
                            type="primary"
                            plain
                            @click="resetRecordList"
                            >Reset Filters</el-button
                          >
                          <!-- add new document pop up window -->
                          <el-button
                            class="rihgt_buttons"
                            @click="AdddialogFormVisible = true"
                            label="Add"
                            type="primary"
                            plain
                            style="margin-top: 1vw"
                            ><el-icon><Plus /></el-icon> Add New</el-button
                          >
                        </div>
                      </el-form>
                    </div>

                  </div>



              

                </el-main>
                           
            </el-container>
        </el-container>

        <!-- dialog for adding a new vaccine record -->

        <el-dialog v-model="addDialogFormVisible" title="Add vaccination record" @close="resetForm()">
          <el-form :model="form">
            <el-form-item label="Vaccination type" :label-width="formLabelWidth">
              <el-autocomplete
                v-model="form.vacType"
                :fetch-suggestions="querySearch"
                clearable
                placeholder="Please input vaccination type"
                @select="handleSelect"   
                style="width:45vh"              
              />
            </el-form-item>
            <el-form-item label="Date" :label-width="formLabelWidth">
              <el-date-picker v-model="form.date" type="date" placeholder="Date" :disabled-date="disabledDate" value-format="YYYY-MM-DD" style="width:45vh"/>
            </el-form-item>
            <el-form-item label="Pet" :label-width="formLabelWidth">
              <el-select v-model="form.petId" placeholder="Select pet" style="width:45vh">
                <el-option
                  v-for="item in petList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                />
              </el-select>              
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
              <el-input v-model="form.recordTitle" placeholder="Enter description" autocomplete="off" />
            </el-form-item>            
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addDialogFormVisible = false">Close</el-button>
              <el-button type="primary" @click="addVaccination();addDialogFormVisible = false"
                >Save</el-button
              >
            </span>
          </template>
        </el-dialog>    

        <!-- dialog for editing a vaccine record -->
        <el-dialog v-model="editDialogFormVisible" title="Edit vaccination record" @close="resetForm()">
          <el-form :model="form">
            <el-form-item label="Vaccination type" :label-width="formLabelWidth">
              <el-autocomplete
                v-model="form.vacType"
                :fetch-suggestions="querySearch"
                clearable
                placeholder="Please input vaccination type"
                @select="handleSelect"
                style="width:45vh"                
              />
            </el-form-item>
            <el-form-item label="Date" :label-width="formLabelWidth">
              <el-date-picker v-model="form.date" type="date" placeholder="Date" :disabled-date="disabledDate" value-format="YYYY-MM-DD" style="width:45vh"/>
            </el-form-item>
            <el-form-item label="Pet" :label-width="formLabelWidth">
              <el-select v-model="form.petId" placeholder="Select pet" style="width:45vh">
                <el-option
                  v-for="item in petList"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                />
              </el-select>              
            </el-form-item>
            <el-form-item label="Description" :label-width="formLabelWidth">
              <el-input v-model="form.recordTitle" placeholder="Enter description" autocomplete="off" />
            </el-form-item>            
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="editDialogFormVisible = false">Close</el-button>
              <el-button type="primary" @click="editVaccination();editDialogFormVisible = false;"
                >Save</el-button
              >
            </span>
          </template>
        </el-dialog>            

    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import httpServices from '@services';
import router from '@/router';
import Close from '@common/components/CloseButton/index.vue';


const userID = ref('4EL4hp_qRUYMzzal_G29f')
const addDialogFormVisible = ref(false)
const editDialogFormVisible = ref(false)
const formLabelWidth = '140px'
const vaccinations = ref([])
const displayedRecordList = ref([])
const recordList = ref([])
const petList = ref([])
const dateRange = ref('')
const petSelected = ref('')


const form = reactive({
  recordId: '',
  recordTitle: '',
  vacType: '',
  petId: '',
  date: '',
})

const applyFilter = () => {
  displayedRecordList.value = recordList.value.slice()
  if (dateRange.value !== '' && petSelected.value === '') {
    let startDate = new Date(
      dateRange.value[0].toISOString().split('T')[0]
    );
    let endDate = new Date(
      dateRange.value[1].toISOString().split('T')[0]
    );

    for (let record of recordList.value) {
      let recordDate = new Date(record.date);
      if (
        recordDate.getTime() < startDate.getTime() ||
        recordDate.getTime() > endDate.getTime()
      ) {
        var index =
          displayedRecordList.value.indexOf(record);
        if (index !== -1) {
          displayedRecordList.value.splice(index, 1);
        }
      }
    }
  }  
  if (petSelected.value !== '' && dateRange.value === '') {
    for (let record of recordList.value) {
      if (record.petId != petSelected.value) {
        var index =
          displayedRecordList.value.indexOf(record);
        if (index !== -1) {
          displayedRecordList.value.splice(index, 1);
        }
      }
    }
  }
  if (dateRange.value !== '' && petSelected.value !== '') {
    let startDate = new Date(
      dateRange.value[0].toISOString().split('T')[0]
    );
    let endDate = new Date(
      dateRange.value[1].toISOString().split('T')[0]
    );

    for (let record of recordList.value) {
      let recordDate = new Date(record.date);
      console.log(record);
      if (
        recordDate.getTime() < startDate.getTime() ||
        recordDate.getTime() > endDate.getTime() ||
        record.petId !== petSelected.value
      ) {
        var index =
          displayedRecordList.value.indexOf(record);
        if (index !== -1) {
          displayedRecordList.value.splice(index, 1);
        }
      }
    }
  }  
}

const resetRecordList = () => {
  displayedRecordList.value = recordList.value;
  dateRange.value = '';
  petSelected.value = '';  
}


const querySearch = (queryString, cb) => {
  const results = queryString
    ? vaccinations.value.filter(createFilter(queryString))
    : vaccinations.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString) => {
  return (vac) => {
    return (
      vac.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    { value: 'Feline panleukopenia virus' },
    { value: 'Feline herpesvirus' },
    { value: 'Feline calicivirus' },
    { value: 'Feline leukaemia virus' },
    { value: 'Rabies' },
    { value: 'Chlamydophila felis' },
    { value: 'Bordetella bronchiseptica' },
    { value: 'Distemper' },
    { value: 'Hepatitis' },
    { value: 'Parvovirus' },
    { value: 'Bordetella' },
    { value: 'Leptospirosis' },
    { value: 'Lyme Disease' },
    { value: 'Coronavirus' },
    { value: 'Giardia' },
    { value: 'Canine Influenza H3N8' },
    { value: 'Rattlesnake vaccine' },

  ]
}

const handleSelect = (item) => {
  console.log(item)
}

const disabledDate = (time) => {
  return time.getTime() > Date.now()
}

const getAllVaccination = async () => {
	const res = await httpServices.vaccinationHistory.getAllVaccination({
    uid: userID.value,
    recordType: "Vaccination"
  });
  console.log("vaccine table: ", res.data)
  recordList.value = res.data.data
  displayedRecordList.value = res.data.data

	// console.log('all vaccination', res);
};

const getPetList = async () => {
	const res = await httpServices.vaccinationHistory.getPetList({
    uid: userID.value,
  });
  console.log("pet list:", res.data.data)
	for (let item of res.data.data) {
		petList.value.push({ text: item.petName, value: item.petId });
	}  
  //hardcode
  // petList.value = [
  //   { text: 'Lucy', value: '01' },
  //   { text: 'Bella', value: '02' },
  //   { text: 'Tom', value: '03' },
  //   { text: 'Jerry', value: '04' },
  // ]

	// console.log('pet list', res);
};

const fillFormByRow = (index, row) => {
  form.recordId = row.recordId
  form.recordTitle = row.recordTitle
  form.vacType = row.vacType
  form.petId = row.petId
  form.date = row.date
  console.log(index, row)
}

const resetForm = () => {
  form.recordId = ''
  form.recordTitle = ''
  form.vacType = ''
  form.petId = ''
  form.date = ''
}

onMounted(() => {
  getAllVaccination()
  getPetList()
  vaccinations.value = loadAll()
})



const filterHandler = (value, row, column) => {
  // const property = column['property']
  // return row[property] === value
  return row.petId === value
}

const addVaccination = async () => {
  const res = await httpServices.vaccinationHistory.addVaccination({
    uid: userID.value,
    record: {
      recordType: 'Vaccination',
      recordTitle: form.recordTitle,
      date: form.date,
      fileDir: null,
      fileFormat: null,
      vacType: form.vacType,
      petId: form.petId
    }
  });
  if (res.data.status === 200) {
		ElMessage({
			message: 'New record added',
			type: 'success'
		});    
    getAllVaccination()
  }
  console.log("add res: ", res.data)

  console.log("send")
}

const editVaccination = async () => {
  const res = await httpServices.vaccinationHistory.editVaccination({
    uid: userID.value,
    newRecord: {
      recordId: form.recordId,
      recordType: 'Vaccination',
      recordTitle: form.recordTitle,
      date: form.date,
      fileDir: null,
      fileFormat: null,
      vacType: form.vacType,
      petId: form.petId
    }
  });
  if (res.data.status === 200) {
		ElMessage({
			message: 'Record updated',
			type: 'success'
		});    
    getAllVaccination()
  }
  console.log("edit")
}

const handleDelete = async (index, row) => {
  console.log("row.recordId,", row.recordId)
  const res = await httpServices.vaccinationHistory.deleteVaccination({
    uid: userID.value,
    recordId: row.recordId
  });  
  if (res.data.status === 200) {
		ElMessage({
			message: 'Record deleted',
			type: 'success'
		});    
    getAllVaccination()
  }  
  console.log("delete,", res)
}

</script>

<style lang="scss" scoped>
.el-input {
  width: 45vh;
}
.record-box {
  display: flex;
	justify-content: space-between;
  height: 60vh;
  padding: 5vh;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .table-wrapper {
    .table {
        border-radius: 1.5vh;
    }
  }
  .right-filter {
    .datepicker {
      width: 210px;
      margin-top: 8px;
      p {
        color: #76553f;
        margin: 0 2px;
        font-family: 'Trebuchet MS';
        font-size: 14px;
        font-weight: bold;
      }
    }
    .pet-filter {
      width: 210px;
      margin-top: 15px;
      p {
        color: #76553f;
        margin: 0 2px;
        font-family: 'Trebuchet MS';
        font-size: 14px;
        font-weight: bold;
      }

      :deep(.el-select .el-input__inner) {
        font-size: 14px;
        width: 210px;
      }
    }
}
  .add-button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 3vh;
    .add-button {

    }
  }

}
       

.filter_add {
	display: flex;
	justify-content: space-evenly;
	flex-direction: column;
	align-items: center;

	.rihgt_buttons {
		margin-left: 0;
		margin-right: 0;
		width: 100px;
		height: 40px;
	}
}

.table .el-table__body {
    /* border-collapse: separate;
    border-spacing:10vh 10vh;
    table-layout:auto !important; */
}
</style>