/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }) => {
  const buildConfig = {
    plugins: [react(), viteTsconfigPaths()],
    esbuild: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    },
    test: {
      environment: 'jsdom',
      globals: true,
    },
    build: {
      outDir: 'build',
      hunkSizeWarningLimit: 1000 * 500,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
    },
  };

  const devConfig = { ...buildConfig };

  if (command === 'serve') return devConfig;
  return buildConfig;
});
