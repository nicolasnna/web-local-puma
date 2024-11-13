import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: ``,
      },
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
      { find: "@reducer", replacement: path.resolve(__dirname, "src/reducer") },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@services", replacement: path.resolve(__dirname, "src/services") },
      { find: "@styles", replacement: path.resolve(__dirname, "src/styles") },
    ],
  },
})
