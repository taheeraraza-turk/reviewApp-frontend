import axios from 'axios';

const API_URL = 'http://localhost:5000'; // adjust if needed

// Get reviews for product (public)
export const fetchReviews = async (productId) => {
  const res = await axios.get(`${API_URL}/reviews/product/${productId}`);
  return res.data;
};

// Add review (protected)
export const addReview = async (productId, review, token) => {
  const res = await axios.post(`${API_URL}/reviews/${productId}`, review, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};


export const updateReview = async (reviewId, reviewData, token) => {
  const res = await axios.put(`${API_URL}/reviews/${reviewId}`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteReview = async (reviewId, token) => {
  const res = await axios.delete(`${API_URL}/reviews/${reviewId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
