import axios from "axios";

const PaymentService = {
  async createPayment(paymentMethod) {
    try {
      const response = await axios.post("/api/user/payment", {
        payment_method: paymentMethod,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to create payment");
    }
  },

  async getUserPayments() {
    try {
      const response = await axios.get("/api/user/payment");
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Failed to fetch payments");
    }
  },
};

export default PaymentService;
