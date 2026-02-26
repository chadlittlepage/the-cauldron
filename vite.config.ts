import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { compression } from 'vite-plugin-compression2';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    mode === 'production' && compression({ algorithms: ['gzip', 'brotliCompress'] }),
    mode === 'production' &&
      sentryVitePlugin({
        org: 'cell-division',
        project: 'hexwave',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        sourcemaps: { filesToDeleteAfterUpload: ['./dist/**/*.map'] },
        silent: !process.env.SENTRY_AUTH_TOKEN,
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    sourcemap: 'hidden',
    chunkSizeWarningLimit: 250, // kB — flag chunks > 250 KB
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          supabase: ['@supabase/supabase-js'],
          stripe: ['@stripe/stripe-js'],
          query: ['@tanstack/react-query'],
          sentry: ['@sentry/react'],
        },
      },
    },
  },
}));
