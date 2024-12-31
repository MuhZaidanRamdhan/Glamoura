import axios from 'axios';

export const orderService = {
  createOrder: async (shippingAddress) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please log in to place an order');
    }

    const response = await axios.post(
      '/api/orders/create',
      { shipping_address: shippingAddress },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  getUserOrders: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please log in to access your orders');
    }

    const response = await axios.get('/api/user/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getOrderDetail: async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please log in to access order details');
    }

    const response = await axios.get(`/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

};