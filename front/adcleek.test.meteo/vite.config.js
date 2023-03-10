import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { VitePluginFonts } from 'vite-plugin-fonts';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginFonts({
      google: {
        families: ['Montserrat'],
      },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@modules': fileURLToPath(
        new URL('./src/components/modules', import.meta.url)
      ),
      '@elements': fileURLToPath(
        new URL('./src/components/elements', import.meta.url)
      ),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/vars/index.scss";`,
      },
    },
  },
});
