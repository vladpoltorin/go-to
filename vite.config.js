import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import typescript from '@rollup/plugin-typescript';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './src/main.tsx', // Your main React app entry point
        background: './src/background.ts',
      },
      output: {
        dir: 'dist',
        entryFileNames: '[name].js', // Specifies that the output files should be named after their entry names without hashes
        // format: 'esm', // or 'esm' or 'cjs' depending on your target environment
        // sourcemap: true,
      },
    },
  },
});
