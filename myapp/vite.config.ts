import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [sveltekit()],
    define: {
        VITE_BACK_URI: process.env.VITE_BACK_URI,
        VITE_SOCKET_URL: process.env.VITE_SOCKET_URL,
    },
});
