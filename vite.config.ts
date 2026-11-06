import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || process.env.VITE_SITE_URL || 'https://ekumbatidemo.onrender.com').replace(/\/+$/, '');

  let siteDomain = 'ekumbatidemo.onrender.com';
  try {
    siteDomain = new URL(siteUrl).hostname;
  } catch {
    // fallback domain if URL parsing fails
  }

  // Populate process.env so Vite's built-in HTML %VITE_*% replacer recognizes both variables
  process.env.VITE_SITE_URL = siteUrl;
  process.env.VITE_SITE_DOMAIN = siteDomain;

  const htmlMetaTransformPlugin: Plugin = {
    name: 'html-meta-transform',
    transformIndexHtml(html: string) {
      return html
        .replace(/%VITE_SITE_URL%/g, siteUrl)
        .replace(/%VITE_SITE_DOMAIN%/g, siteDomain);
    },
  };

  return {
    plugins: [react(), htmlMetaTransformPlugin],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-leaflet': ['leaflet', 'react-leaflet'],
            'vendor-motion': ['framer-motion'],
            'vendor-supabase': ['@supabase/supabase-js'],
            'vendor-icons': ['lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      port: 3000,
    },
  };
});
