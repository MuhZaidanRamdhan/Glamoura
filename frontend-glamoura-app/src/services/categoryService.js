import axios from 'axios';

const categoryService = {
    // Mendapatkan semua kategori
    getCategories: async () => {
        const response = await axios.get('/api/categories');
        
        if (response && response.data && response.data.data) {
            return response.data.data;
        } else {
            console.error('Invalid response structure');
            return [];
        }
    },

    // mendapatkan kategori berdasarkan ID
    getCategoryById: async (id) => {
        const response = await axios.get(`/api/categories/${id}`);
        
        if (response && response.data) {
            return response.data;
        } else {
            console.error('Category not found');
            return null;
        }
    }
};

export default categoryService;