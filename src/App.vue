<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
	<!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
	<router-view v-if="isRouterAlive"></router-view>
</template>

<script>
export default {
	name: 'Pets App',
	provide() {
		return {
			reload: this.reload
		};
	},
	data() {
		return {
			isRouterAlive: true
		};
	},
	methods: {
		reload() {
			this.isRouterAlive = false;
			this.$nextTick(() => {
				this.isRouterAlive = true;
			});
		}
	}
};
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	// font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
	//     'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
	//tabs used for list and grid view in folders
	.el-tabs__content {
		height: 65vh;
	}
	//background color of tabs used for list and grid view in folders
	// .el-tabs__nav-scroll {
	// 	background-color: #f1eeec;
	// }
	//text color and font used in table in folders
	.cell {
		color: #76553f;
		font-family: 'Trebuchet MS';
	}
}

#app {
	/* font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; */
	font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB',
		'Microsoft YaHei', Arial, sans-serif;
	margin: 0;
	padding: 0;
}
// $--color-primary: #76553f;

// :root {
//     --el-color-primary: #76553f;
// }

.el-form-item__label {
	color: #76553f;
	text-align: justify;
}

.el-input__inner {
	/* box-shadow: 0 0 0 1px #76553f inset; */
	font-family: Trebuchet MS;
	color: #76553f;
}
</style>
