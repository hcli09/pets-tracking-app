import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { scssVars } from './src/styles/variables';

export default defineConfig({
	resolve: {
		alias: {
			'@': '/src',
			'@assets': '/src/assets',
			'@common': '/src/common',
			'@utils': '/src/common/utils',
			'@components': '/src/components',
			'@services': '/src/services',
			'@styles': '/src/styles'
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				// 自定义的主题色
				additionalData:
					`@use "@/styles/element/index.scss" as *;` + scssVars()
			}
		}
	},

	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
		}),
		Components({
			resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
		})
	],
	base: './'
	// proxy: {
	//     '/api': {
	//         target: 'https://pets-app.azurewebsites.net/',
	//         changeOrigin: true,
	//         logLevel: 'debug',
	//         secure: false,
	//         rewrite: path => {
	//             console.log(path);
	//             return path.replace(/^\/api/, '');
	//         },
	//     },
	// },

	// server: {
	//     port: '8715',
	// },
});
