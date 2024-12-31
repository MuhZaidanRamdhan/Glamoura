import axios from 'axios';

// Fungsi login
export const login = async (email, password) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    const { token, role } = response.data;

    // Simpan token dan role ke localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    return { token, role };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Fungsi untuk mendapatkan role pengguna
export const getRole = () => {
  return localStorage.getItem('role');
};

export const logout = () => {
  // Hapus token dari localStorage
  localStorage.removeItem('token');
};