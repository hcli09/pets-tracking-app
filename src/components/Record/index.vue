<template>
    <div>
        <el-container>
            <el-header style="background-color:#eedad1;color:#c17754;height:10vh;line-height:10vh">VACCINATION HISTORY</el-header>
            <el-container>
                <el-main style="padding:0; margin-top:3vh">
                  <div class="table-wrapper">
                    <div class="upper-button-wrapper">                      
                      <el-button>Add</el-button>                      
                      <el-button-group>
                        <el-button>List View</el-button>
                        <el-button>Grid View</el-button>
                      </el-button-group>
                    </div>
                    <el-table 
                      class="table" 
                      :data="hardcodeTableData" 
                      :default-sort="{ prop: 'date', order: 'descending' }"
                      style="width: 100%"
                    >
                        <el-table-column 
                          prop="pet" 
                          label="PET" 
                          :filters="hardcodePetList"
                          :filter-method="filterHandler"
                          width="200" align="center" 
                        />
                        <el-table-column prop="vacType" label="VACCINATION TYPE" width="300" align="center" />
                        <el-table-column prop="date" label="DATE" sortable width="200" align="center" />

                        <el-table-column label="Operations" align="center">
                          <template #default="scope">
                            <el-button
                              size="small"
                              
                              @click="handleDelete(scope.$index, scope.row)"
                              >View</el-button
                            >
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                              >Edit</el-button
                            >
                            <el-button
                              size="small"
                              
                              @click="handleDelete(scope.$index, scope.row)"
                              >Delete</el-button
                            >
                          </template>
                        </el-table-column>

                    </el-table>
                  </div>

                </el-main>
                           
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
// 连api后换成实际的table data
const hardcodeTableData = [
  {
    pet: 'Lucy',
    vacType: 'Vaccination Type 1',
    date: '2021-05-02',
  },
  {
    pet: 'Bella',
    vacType: 'Vaccination Type 2',
    date: '2021-03-12',
  },
  {
    pet: 'Tom',
    vacType: 'Vaccination Type 1',
    date: '2021-10-19',
  },
  {
    pet: 'Jerry',
    vacType: 'Vaccination Type 3',
    date: '2021-09-30',
  },
]

const hardcodePetList = [
  { text: 'Lucy', value: 'Lucy' },
  { text: 'Bella', value: 'Bella' },
  { text: 'Tom', value: 'Tom' },
  { text: 'Jerry', value: 'Jerry' },
]

const filterHandler = (value, row, column) => {
  const property = column['property']
  return row[property] === value
}


</script>

<style lang="scss" scoped>

.table-wrapper {
  height: 60vh;
  padding: 5vh;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .upper-button-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3vh;
  }
  .table {
      border-radius: 1.5vh;
  }
}        


.table .el-table__body {
    /* border-collapse: separate;
    border-spacing:10vh 10vh;
    table-layout:auto !important; */
}
</style>