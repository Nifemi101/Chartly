import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  root: resolve(__dirname),
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
};
