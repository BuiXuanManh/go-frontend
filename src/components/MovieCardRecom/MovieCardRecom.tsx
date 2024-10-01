import React from 'react';
import { Link } from 'react-router-dom';

interface MovieCardRecomProps {
  posterUrl: string;
  rating?: number;
  movieId: number;
  title: string;
}

const MovieCardRecom: React.FC<MovieCardRecomProps> = ({ posterUrl, rating, title, movieId }) => {
  return (
    <div className='w-60'>
      <Link to={`/details/${movieId}`}>
        <img className='h-32 w-60 rounded-md' src={posterUrl} alt={title} />
      </Link>
      <div className='flex'>
        <h2>{title}</h2>
        <p className='ml-auto'> {rating * 10}%</p>
      </div>
    </div>
  );
};

export default MovieCardRecom;
