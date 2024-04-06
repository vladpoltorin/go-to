import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './options.html'),
        background: resolve(__dirname, './src/background.ts'),
        popup: resolve(__dirname, './popup.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  // server: {
  //   mimeTypes: {
  //     '*.ts': 'application/javascript',
  //   },
  // },
});
