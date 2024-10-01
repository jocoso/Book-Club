import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: "0.0.0.0",
        port: process.env.PORT || 3000, // Port fallback
        proxy: {
            "/graphql": {
                target: import.meta.env.VITE_API_URL || "http://localhost:3001", // Use VITE prefixed environment variables
                changeOrigin: true,
                secure: false,
            },
        },
        define: {
            'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://book-club-8svz.onrender.com/')
        },
    },
});
