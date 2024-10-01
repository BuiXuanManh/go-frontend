import React, { useState } from 'react';

interface RatingStarProps {
  onChange: (rating: number) => void;
  initialRating?: number;
  size?: number;
}

function RatingStar({ onChange, size, initialRating }: RatingStarProps) {
  const [rating, setRating] = useState(initialRating || 0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onChange(selectedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type='button'
          onClick={() => handleStarClick(star)}
          style={{
            cursor: 'pointer',
            fontSize: size || 20,
            color: star <= rating ? 'gold' : 'grey'
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default RatingStar;
