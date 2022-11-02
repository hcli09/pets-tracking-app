<template>
	<div style="display: flex; flex-direction: column; align-items: center">
		<el-table
			class="eventtable"
			:data="eventList"
			height="40vh"
			style="width: 100%"
		>
			<!-- <el-icon Calendar></el-icon> -->
			<el-table-column prop="eventTitle" label="Title" align="center">
				<template #default="scope">
					<div style="display: flex; align-items: center">
						<el-icon><Calendar /></el-icon>
						<span style="margin-left: 10px">{{
							scope.row.eventTitle
						}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column
				prop="description"
				label="Description"
				align="center"
			/>
			<el-table-column
				sortable
				prop="startDateTime"
				label="Start Time"
				align="center"
			/>
			<el-table-column
				sortable
				prop="endDateTime"
				label="End Time"
				align="center"
			/>
		</el-table>
		<!-- add event diaglog -->
		<el-button
			class="add-button"
			color="#76553f"
			style="border: #737bc1"
			type="primary"
			plain
			:icon="Flag"
			@click="setEventDialogVisible"
		>
			Add Event
		</el-button>

		<EventDialog
			v-if="eventDialogVisible"
			:dialogVisible="eventDialogVisible"
			@setVisible="setEventDialogVisible"
		/>
	</div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { Flag, CircleCheck, Calendar } from '@element-plus/icons-vue';

import httpServices from '@services';
import EventDialog from '@common/components/EventDialog/index.vue';
const eventDialogVisible = ref(false);
const setEventDialogVisible = () => {
	eventDialogVisible.value = !eventDialogVisible.value;
};
</script>

<script>
export default {
	data() {
		return {
			uid: localStorage.getItem('uid'),
			eventList: [],
			curr_petId: this.$route.query.id
		};
	},
	created: function () {
		//get all events of this pet
		httpServices.petprofile
			.getAllEvents({ uid: this.$data.uid })
			.then(response => {
				let eventobject = response.data.data;
				this.$data.eventList = eventobject;
				this.$data.eventList = this.$data.eventList.filter(item =>
					item.petIdList.includes(this.$data.curr_petId)
				);
			})
			.catch(error => {
				console.log(error.message);
			});
	}
};
</script>

<style lang="scss" scoped>
.add-button {
	margin-top: 1vw;
	justify-content: center;
}

:deep(.el-table td.el-table__cell div) {
	font-size: small;
}
</style>
