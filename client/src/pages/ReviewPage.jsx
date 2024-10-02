import React, { useState } from 'react';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  const handleInputChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim()) {
      setReviews([...reviews, newReview]);
      setNewReview('');
    }
  };

  return (
    <div className="review-page">
      <h1>Leave a Review</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newReview}
          onChange={handleInputChange}
          placeholder="Write your review here"
        />
        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews-list">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default Review;
