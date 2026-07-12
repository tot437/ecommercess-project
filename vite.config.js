import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5173', // Make sure this matches your BACKEND port
                changeOrigin: true,
                secure: false,
            },
            'images': {
                target: 'http://localhost:5173'
            }
        }
    }
})