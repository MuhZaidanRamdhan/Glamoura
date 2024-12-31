// Konfigurasi Vite untuk proyek React
import { defineConfig } from 'vite' // Mengimpor fungsi untuk mendefinisikan konfigurasi Vite
import react from '@vitejs/plugin-react' // Mengimpor plugin React untuk Vite

// Konfigurasi utama untuk Vite
export default defineConfig({
  plugins: [react()], // Menambahkan plugin React untuk mendukung JSX dan fitur terkait

  // Konfigurasi server untuk proxy API
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Menyeting target API ke alamat lokal (backend Laravel)
        changeOrigin: true, // Mengubah asal permintaan untuk menangani CORS
        headers: {
          Accept: 'application/json', // Menyertakan header Accept untuk format JSON
          "Content-Type": 'application/json', // Menyertakan header Content-Type sebagai JSON
        }
      }
    }
  }
})
