import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'app/pages/index.html'),
        about: resolve(__dirname, 'app/pages/about-us.html'),
        achievements: resolve(__dirname, 'app/pages/achievements.html'),
      },
    },
  },
});
