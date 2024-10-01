import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// Ensure VITE_API_URL is available via process.env during build
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: "0.0.0.0",
        port: process.env.PORT || 3000, // Use process.env.PORT for server port
        proxy: {
            "/graphql": {
                target: process.env.VITE_API_URL || "http://localhost:3001", // Use process.env for VITE_API_URL
                changeOrigin: true,
                secure: false,
            },
        },
    },
    define: {
        // Define VITE_API_URL for use in client code
        'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://book-club-8svz.onrender.com/'),
    },
});
