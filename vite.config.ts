import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    }
  },
  plugins: [
    react({
      // Enable React Fast Refresh for better development experience
      plugins: mode === 'development' ? [["@swc/plugin-react-refresh", {}]] : [],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false, // Don't expose source maps in production
    minify: 'terser', // Use terser for better compression
    target: 'es2020', // Modern browsers for smaller bundles
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@tanstack/react-query'],
          ui: ['styled-components', 'lucide-react'],
          router: ['react-router-dom']
        },
        // Optimize chunk and asset naming for better caching
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || 'unknown';
          const info = name.split('.');
          const ext = info[info.length - 1];
          
          // Keep favicon files at root without hash for consistent linking
          if (name === 'favicon.ico' || name === 'je_favicon.ico') {
            return name;
          }
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(name)) {
            return `images/[name]-[hash].${ext}`;
          }
          if (/\.(css)$/i.test(name)) {
            return `css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    // Enable compression and optimizations
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // Inline small assets as base64
  },
  preview: {
    port: 8080,
    strictPort: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'public, max-age=31536000', // 1 year cache for static assets
    }
  }
}));
