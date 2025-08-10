import axios from 'axios';

const API_URL = 'https://review-app-backend-delta.vercel.app'; // adjust if needed

export const fetchProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};


export const fetchReviewsByProductId = async (productId) => {
  try {
    const res = await axios.get(`${API_URL}/reviews/product/${productId}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('API error response:', error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error('No response received:', error.request);
    } else {
      // Other errors
      console.error('Error', error.message);
    }
    throw error;
  }
};


