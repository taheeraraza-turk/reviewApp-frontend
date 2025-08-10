import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { fetchProductById, fetchReviewsByProductId } from '../services/productService';
import { addReview, updateReview, deleteReview } from '../services/reviewService';
import '../styles/productsdetail.css';

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [reviewForm, setReviewForm] = useState({ username: '', rating: 5, comment: '' });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 5, comment: '' });

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    setLoadingProduct(true);
    fetchProductById(id)
      .then(data => {
        setProduct(data);
        setLoadingProduct(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingProduct(false);
      });

    setLoadingReviews(true);
    fetchReviewsByProductId(id)
      .then(data => {
        setReviews(data);
        setLoadingReviews(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingReviews(false);
      });
  }, [id]);

  if (loadingProduct) return <Loader />;
  if (!product) return <p>Product not found.</p>;

  // Handle new review input change
  const handleChange = e => {
    setReviewForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle new review submit
  const handleSubmitReview = async e => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    if ( !reviewForm.comment) {
      setFormError('Please fill in all fields');
      setSubmitting(false);
      return;
    }

    try {
      const reviewData = {
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
      };

      // POST review to backend with token
      const data = await addReview(id, reviewData, token);

      setReviews(prev => [...prev, data]);
      setReviewForm({ username: '', rating: 5, comment: '' });
    } catch (err) {
      setFormError(err.message);
    }
    setSubmitting(false);
  };

  // Start editing review
  const startEdit = review => {
    setEditingReviewId(review._id);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  // Handle edit form input change
  const handleEditChange = e => {
    setEditForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit edited review
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!editForm.comment) {
      alert('Comment cannot be empty');
      return;
    }
    try {
      const updatedReview = await updateReview(editingReviewId, {
        rating: Number(editForm.rating),
        comment: editForm.comment,
      }, token);

      setReviews(reviews.map(r => r._id === editingReviewId ? updatedReview : r));
      setEditingReviewId(null);
    } catch (err) {
      alert('Failed to update review: ' + err.message);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingReviewId(null);
  };

  // Delete review
  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await deleteReview(reviewId, token);
      setReviews(reviews.filter(r => r._id !== reviewId));
    } catch (err) {
      alert('Failed to delete review: ' + err.message);
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-details">
        <img
          src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={product.title}
          className="product-image"
        />
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        {loadingReviews ? (
          <Loader />
        ) : reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map(review => (
            <div key={review._id} className="review-card">
              <p><strong>{review.username}</strong></p>

              {editingReviewId === review._id ? (
                <form onSubmit={handleSubmitEdit}>
                  <label>
                    Rating:
                    <select
                      name="rating"
                      value={editForm.rating}
                      onChange={handleEditChange}
                    >
                      {[5,4,3,2,1].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Comment:
                    <textarea
                      name="comment"
                      value={editForm.comment}
                      onChange={handleEditChange}
                    />
                  </label>
                  <button type="submit">Save</button>
                  <button type="button" onClick={cancelEdit} style={{ marginLeft: '10px' }}>Cancel</button>
                </form>
              ) : (
                <>
                  <p>Rating: {review.rating} / 5</p>
                  <p>{review.comment}</p>
                  {/* Show edit/delete only if logged in user is the author */}
                  {user && user.id === review.userId && (
                    <div style={{ marginTop: '10px' }}>
                      <button onClick={() => startEdit(review)}>Edit</button>
                      <button onClick={() => handleDelete(review._id)} style={{ marginLeft: '10px' }}>Delete</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>

      <div className="add-review-section">
        <h2>Add a Review</h2>
        <form onSubmit={handleSubmitReview} className="review-form">
         

          <label>
            Rating:
            <select
              name="rating"
              value={reviewForm.rating}
              onChange={handleChange}
              disabled={submitting}
            >
              {[5,4,3,2,1].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>

          <label>
            Comment:
            <textarea
              name="comment"
              value={reviewForm.comment}
              onChange={handleChange}
              disabled={submitting}
              required
            />
          </label>

          {formError && <p style={{ color: 'red' }}>{formError}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}

