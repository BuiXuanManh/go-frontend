import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import MovieCardRecom from 'src/components/MovieCardRecom';
import MovieCardSearch from 'src/components/MovieCardSearch/MovieCardSearch';
import MovieCardUser from 'src/components/MovieCardUser';
import { getTopRatedMovies } from 'src/helpers/api';
import { buildImageUrl, formatDateToDDMMYYYY, getColor } from 'src/helpers/utils';

interface MovieCardTopRatedProps {
  movieId: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  avgRating: number;
}

function MovieCardTopRated({
  movieId,
  posterPath,
  title,
  releaseDate,
  avgRating
}: MovieCardTopRatedProps) {
  return (
    <div className='rounded-md overflow-hidden w-40 border-border border-1 shadow-border shadow-md pb-2'>
      <Link className='contents' to={`/details/${movieId}`}>
        <img className='  w-40 h-56' src={posterPath} alt={title} />
      </Link>
      <div className='relative mt-7 px-2'>
        <Link to={`details/${movieId}`} className='font-semibold text-lg hover:text-white/70'>
          {title}
        </Link>
        <p className='text-white/70'>{releaseDate}</p>
        <span
          className={` font-semibold absolute -top-12 text-white flex justify-center items-center w-10 h-10 border-3 rounded-full bg-background/70 ${getColor(
            avgRating
          )}`}
        >
          {avgRating === undefined ? 'NR' : avgRating.toFixed(1).toString()}
        </span>
      </div>
    </div>
  );
}

function TopRatedMovies() {
  const { isLoading, data } = useQuery('movies', getTopRatedMovies);
  return (
    <div className='pt-10'>
      <h3 className='text-center text-2xl  font-semibold'>Top Rated Movies</h3>
      <div className='pb-5 grid grid-cols-5 gap-5 w-2/3 mt-4 mx-auto '>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.map(movie => (
            <MovieCardTopRated
              key={movie.id}
              movieId={movie.id}
              posterPath={buildImageUrl(movie.poster_path, 'w500')}
              title={movie.title}
              releaseDate={movie.release_date}
              avgRating={movie.vote_average}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TopRatedMovies;
