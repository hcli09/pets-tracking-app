<template>
	<el-tooltip
		class="box-item"
		effect="dark"
		content="Back to last page"
		placement="top-start"
	>
		<el-button
			type="primary"
			:icon="ArrowLeftBold"
			circle
			@click="goBack"
			class="back-button"
			size="large"
		/>
	</el-tooltip>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftBold } from '@element-plus/icons-vue';

const router = useRouter();

const goBack = () => {
	router.go(-1);
};
</script>

<style scoped>
.back-button {
	position: absolute;
	right: 60px;
	bottom: 40px;
	z-index: 10000;
}
</style>
