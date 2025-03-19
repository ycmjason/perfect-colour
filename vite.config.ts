import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	root: "app",
	build: {
		outDir: "../dist",
	},
	plugins: [vue()],
});
