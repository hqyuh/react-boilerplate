import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(`Your application is running with PORT ${env.VITE_PORT} in ${env.NODE_ENV} environment`);
  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_PORT) || 3000
    },
    preview: {
      port: parseInt(env.VITE_PORT) || 8000
    },
    css: {
      devSourcemap: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});
