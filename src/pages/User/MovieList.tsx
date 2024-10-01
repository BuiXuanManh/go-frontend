import React from 'react';
import { useQueries } from 'react-query';
import LoadingIndicator from 'src/components/LoadingIndicator';
import MovieCardSearch from 'src/components/MovieCardSearch/MovieCardSearch';
import MovieCardUser from 'src/components/MovieCardUser';
import { getMovieDetail } from 'src/helpers/api';
import { buildImageUrl, formatDateToDDMMYYYY, mapJsonToMovie } from 'src/helpers/utils';

interface MovieListProps {
  title: string;
  nullListMessage: string;
  movieIds: number[];
  canRemove?: boolean;
  favoriteList?: number[];
  id?: string;
}

const MovieList: React.FC<MovieListProps> = ({
  movieIds,
  nullListMessage,
  title,
  canRemove,
  favoriteList,
  id
}) => {
  console.log('movieIds', movieIds);
  if (movieIds === null || movieIds === undefined)
    return (
      <div className='mt-4'>
        <p>{nullListMessage}</p>
      </div>
    );

  const movieQueries = useQueries(
    movieIds.map(movieId => {
      return {
        queryKey: ['movie', movieId],
        queryFn: () => getMovieDetail(movieId.toString())
      };
    })
  );

  const isLoading = movieQueries.some(result => result.isLoading);
  console.log(title);
  return (
    <div id={id} className='mt-3'>
      <h2 className='text-2xl font-bold mb-3'>{title}</h2>
      {movieIds.length === 0 && <p id={`${id}-message`}>{nullListMessage}</p>}
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <div className='space-y-3'>
          {movieQueries.map((res, index) => {
            const movie = mapJsonToMovie(res.data);
            console.log(movie.id, favoriteList?.includes(movie.id));
            return (
              <MovieCardUser
                id={`${id}-card-${index}`}
                key={index}
                movieId={movie.id}
                posterPath={buildImageUrl(movie.posterPath, 'original')}
                title={movie.title}
                isFavourite={favoriteList?.includes(movie.id)}
                releaseDate={formatDateToDDMMYYYY(movie.releaseDate)}
                overview={movie.overview}
                avgRating={movie.rating}
                canRemove={canRemove}
                removeFrom={id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MovieList;
