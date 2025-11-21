import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // allows local + network access (mobile testing)
    port: 8080, // custom dev port
  },

  build: {
    // Prevents large bundle warnings until chunks exceed 1MB
    chunkSizeWarningLimit: 1000,

    // Optimize chunking for faster load times
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          firebase: ["firebase/app", "firebase/firestore", "firebase/auth"],
          ui: ["lucide-react", "@radix-ui/react-dialog"],
        },
      },
    },
  },

  plugins: [
    react(), 
    // Enable lovable component tagger in development mode only
    mode === "development" && componentTagger()
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
