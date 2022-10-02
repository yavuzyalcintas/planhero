import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { Mode, plugin as mdPlugin } from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //Markdown(),
    react({
      include: [/\.tsx$/, /\.md$/], // <-- 添加.md
    }),
    mdPlugin({ mode: [Mode.REACT] }),
  ],
});
