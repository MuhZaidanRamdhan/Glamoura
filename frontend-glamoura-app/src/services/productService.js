import axios from "axios";

const productService = {
    // Mendapatkan semua produk
    getProducts: async () => {
        const response = await axios.get('/api/products');
        
        if (response && response.data && response.data.data) {
            return response.data.data;
        } else {
            console.error('No products found');
            return [];
        }
    },

    // Mendapatkan detail produk berdasarkan ID
    getProductById: async (id) => {
        const response = await axios.get(`/api/products/${id}`);
        
        if (response && response.data) {
            return response.data;
        } else {
            console.error(`Product with ID ${id} not found`);
            return null;
        }
    },

    // Pencarian produk berdasarkan nama
    searchProducts: async (name) => {
        const response = await axios.get(`/api/products/search/${name}`);
        
        if (response && response.data && response.data.data) {
            return response.data.data;
        } else {
            console.error(`No products found with name: ${name}`);
            return [];
        }
    },

    // Mendapatkan produk berdasarkan kategori
    getProductsByCategory: async (categoryName) => {
        const response = await axios.get(`/api/products/category/${categoryName}`);
        
        if (response && response.data && response.data.data) {
            return response.data.data;
        } else {
            console.error(`No products found in category: ${categoryName}`);
            return [];
        }
    }
}

export default productService;