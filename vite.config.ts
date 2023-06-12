import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-console
  console.log(mode);
  dotenv.config({ path: `.env.${mode}` });

  return {
    plugins: [react()],
  };
});
