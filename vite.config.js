import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2022',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes('@imgly/background-removal')) return 'background-removal';
          if (id.includes('browser-image-compression')) return 'image-compression';
          if (id.includes('qrcode')) return 'qrcode';
          if (id.includes('motion')) return 'motion';
        }
      }
    }
  }
});
