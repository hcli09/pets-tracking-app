import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': '/src',
            '@assets': '/src/assets',
            '@common': '/src/common',
            '@utils': '/src/common/utils',
            '@components': '/src/components',
        },
    },

    plugins: [vue()],
});

