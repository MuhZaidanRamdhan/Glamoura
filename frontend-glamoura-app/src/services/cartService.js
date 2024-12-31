import axios from "axios";

export const cartService = {
    async getUserCart() {
      const response = await axios.get(`/api/user/carts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    },
  
    async addToCart(productId, quantity) {
      const response = await axios.post(`/api/carts/create`, {
        product_id: productId,
        quantity
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    },
  
    async updateCartItem(cartId, quantity) {
      const response = await axios.put(`/api/carts/${cartId}`, {
        quantity
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    },
  
    async removeFromCart(cartId) {
      const response = await axios.delete(`/api/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    }
  };