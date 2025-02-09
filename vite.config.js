import path from 'path';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www');

export default async () => {
  return {
    plugins: [
      react(),
      VitePWA({
        strategies: 'injectManifest',
        injectRegister: null,
        manifest: false,
        injectManifest: {
          globPatterns: ['**/*.{woff,woff2,js,css,png,jpg,svg,html}'],
          maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
        },
        srcDir: PUBLIC_DIR,
        filename: 'service-worker.js',
        registerType: 'autoUpdate',
      }),
    ],
    root: SRC_DIR,
    base: '',
    publicDir: PUBLIC_DIR,
    build: {
      outDir: BUILD_DIR,
      assetsDir: 'assets',
      assetsInlineLimit: 0,
      emptyOutDir: true,
      rollupOptions: {
        treeshake: false,
      },
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': SRC_DIR,
      },
    },
    server: {
      host: true,
      strictPort: true,
      // open: true,
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
  };
};
