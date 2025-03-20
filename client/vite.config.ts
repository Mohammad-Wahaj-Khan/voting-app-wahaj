import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: "dist", // Vercel `dist` folder ko deploy karega
  },
  server: {
    strictPort: true, // Ensure port consistency
  },
  resolve: {
    alias: {
      '@': '/src', // Allows cleaner imports
    },
  },
});
