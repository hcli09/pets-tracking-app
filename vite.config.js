import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    resolve: {
        alias: {
            '@': '/src',
            '@assets': '/src/assets',
            '@common': '/src/common',
            '@utils': '/src/common/utils',
            '@components': '/src/components',
            '@styles':'/src/styles',
            '@services':'/src/services',
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 自定义的主题色
                additionalData: `@use "@/styles/element/index.scss" as *;`,
            },
        },
    },

    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        }),
    ],
});
