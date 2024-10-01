import { Link } from 'react-router-dom';
import { getColor } from 'src/helpers/utils';
import { Rating } from 'react-simple-star-rating';
import { Tooltip } from 'react-tooltip';
import { deleteMovieRating, getMovieRatingByUser, updateMovieRating } from 'src/helpers/api';
import useUser from 'src/hooks/useUser';
import { useMutation, useQuery } from 'react-query';
import LoadingIndicator from '../LoadingIndicator';
import { useState } from 'react';
import useRating from 'src/hooks/useRating';
import useUserId from 'src/hooks/useUserId';
import useFavorite from 'src/hooks/useFavorite';
import { toast } from 'react-toastify';
import { RATING_UPDATED, SERVER_UNAVAILABLE, RATING_REMOVED } from 'src/constant/error';
import useWatchList from 'src/hooks/useWatchList';
import useUserRating from 'src/hooks/useUserRating';
import RatingStar from '../RatingStar';

type MovieCardUserProps = {
  movieId: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  overview: string;
  avgRating: number;
  isFavourite?: boolean;
  canRemove?: boolean;
  id?: string;
  removeFrom: RemoveFrom;
};

type RemoveFrom = 'watchlist-list' | 'favorite-list' | 'rating-list';

const MovieCardUser = ({
  movieId,
  posterPath,
  title,
  releaseDate,
  overview,
  avgRating,
  isFavourite,
  id,
  canRemove,
  removeFrom
}: MovieCardUserProps) => {
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [hasRated, setHasRated] = useState(false);
  const { userId, hasLogin } = useUserId();

  const userQuery = useUser(userId);
  const handleAddFavoriteSuccess = () => {
    console.log(movieId);
  };
  const handleCreateRatingSuccess = () => {
    setHasRated(true);
  };
  const { createRating } = useRating(handleCreateRatingSuccess);
  const { mutate: updateRating } = useMutation(updateMovieRating, {
    onSuccess: () => {
      toast.success(RATING_UPDATED);
    },
    onError: () => {
      toast.error(SERVER_UNAVAILABLE);
    }
  });
  const { refetch } = useUserRating({
    id: userId?.toString() ?? ''
  });
  const { mutate: deleteRating } = useMutation(deleteMovieRating, {
    onSuccess: () => {
      refetch();
      toast.success(RATING_REMOVED);
    },
    onError: () => {
      toast.error(SERVER_UNAVAILABLE);
    }
  });
  const { mutate: toggleWatchList } = useWatchList(userId, movieId);
  const handleDeleteRating = () => {
    setRating(0);
    setHasRated(false);
    deleteRating({ userId: userId ?? 1, movieId: movieId.toString() });
  };
  const { mutate: toggleFavorite } = useFavorite(userId, movieId, handleAddFavoriteSuccess);
  const handleAddFavorite = () => {
    if (hasLogin) {
      toggleFavorite();
    }
  };
  const { isLoading: isRatingLoading, refetch: getUserRating } = useQuery(
    ['userRating', userId, movieId],
    () => getMovieRatingByUser(userId ?? 0, movieId.toString()),
    {
      enabled: false,
      retry: false,
      onError: () => {
        setHasRated(false);
        setRating(0);
      },
      onSuccess: data => {
        setHasRated(true);
        console.log('data', data.rating);
        setRating(data.rating);
      }
    }
  );
  const handleRating = (rate: number) => {
    console.log(rate);
    setRating(rate);
    console.log(hasRated);
    if (hasRated === true) {
      updateRating({ user_id: userId ?? 1, movie_id: movieId, rating: rate });
    } else {
      createRating({ user_id: userId ?? 1, movie_id: movieId, rating: rate });
    }
  };

  const handleRemove = () => {
    switch (removeFrom) {
      case 'watchlist-list':
        toggleWatchList();
        break;
      case 'favorite-list':
        toggleFavorite();
        break;
      case 'rating-list':
        handleDeleteRating();
        break;
    }
  };

  return (
    <div id={id} className='flex items-center rounded-md border-border border-1 overflow-hidden'>
      <Link className='contents' to={`/details/${movieId}`}>
        <img className='  w-40 h-56' src={posterPath} alt={title} />
      </Link>
      <div className='mx-6'>
        <div className='flex items-center mb-3'>
          <span
            className={` font-semibold text-white flex justify-center items-center w-10 h-10 border-2 rounded-full bg-background/60 ${getColor(
              avgRating
            )}`}
          >
            {avgRating === undefined ? 'NR' : avgRating.toFixed(1).toString()}
          </span>
          <div className='ml-3'>
            <Link className='hover:text-white/70' to={`/details/${movieId}`}>
              <h2 className='text-lg font-bold'>{title}</h2>
            </Link>
            <p className='text-white/70'>{releaseDate}</p>
          </div>
        </div>
        <p className='line-clamp-2'>{overview}</p>
        <ul className='flex text-white/70 space-x-5 mt-3'>
          <li className='flex items-center'>
            <button
              id={`rating-btn-${movieId}`}
              onClick={() => getUserRating()}
              className='flex justify-center items-center border-1 rating-btn border-white/70 w-8 h-8 rounded-full group/rating hover:bg-white/70'
            >
              <svg
                className='fill-white/70 group-hover/rating:fill-background/70'
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 256 256'
              >
                <path d='M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z'></path>
              </svg>
            </button>
            <p className='ml-2'>Your Rating</p>
          </li>
          <li className='flex items-center'>
            <button
              onClick={hasLogin ? handleAddFavorite : () => {}}
              className={` flex justify-center items-center border-1  w-8 h-8 rounded-full group/favourite ${
                isFavourite
                  ? 'bg-red-400 border-red-400 hover:bg-red-400'
                  : 'border-white/70 hover:bg-white/70 '
              }`}
            >
              <svg
                className={
                  isFavourite
                    ? 'fill-white'
                    : 'fill-white/70 group-hover/favourite:fill-background/70'
                }
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 256 256'
              >
                <path d='M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z'></path>
              </svg>
            </button>
            <p className='ml-2'>Favourite</p>
          </li>
          <li className='flex items-center'>
            <button
              className='flex justify-center items-center border-1 border-white/70 w-8 h-8 rounded-full group/list hover:bg-white/70'
              onClick={toggleWatchList}
            >
              <svg
                className='fill-white/70 group-hover/list:fill-background/70'
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 256 256'
              >
                <path d='M224,56V72a8,8,0,0,1-8,8H96a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56ZM56,48H40a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H56a8,8,0,0,0,8-8V56A8,8,0,0,0,56,48Zm160,64H96a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A8,8,0,0,0,216,112ZM56,112H40a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H56a8,8,0,0,0,8-8V120A8,8,0,0,0,56,112Zm160,64H96a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176ZM56,176H40a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H56a8,8,0,0,0,8-8V184A8,8,0,0,0,56,176Z'></path>
              </svg>
            </button>
            <p className='ml-2'>Add to watchlist</p>
          </li>
          {canRemove && (
            <li className='flex items-center'>
              <button
                className='flex justify-center items-center border-1 border-white/70 w-8 h-8 rounded-full group/remove hover:bg-white/70'
                onClick={handleRemove}
              >
                <svg
                  className='fill-white/70 group-hover/remove:fill-background/70'
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 256 256'
                >
                  <path d='M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z'></path>
                </svg>
              </button>
              <p className='ml-2'>Remove</p>
            </li>
          )}
        </ul>
        <Tooltip
          style={{ backgroundColor: 'rgb(55, 65, 81)' }}
          id={`rating-tooltip-${movieId}`}
          clickable={true}
          openOnClick={true}
          anchorSelect={`#rating-btn-${movieId}`}
          place='right'
        >
          {isRatingLoading ? (
            <LoadingIndicator />
          ) : (
            <div className='flex items-center'>
              <svg
                onClick={handleDeleteRating}
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                fill='white'
                viewBox='0 0 256 256'
              >
                <path d='M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm40,112H88a8,8,0,0,1,0-16h80a8,8,0,0,1,0,16Z'></path>
              </svg>

              <RatingStar onChange={handleRating} initialRating={rating} size={44} />
            </div>
          )}
        </Tooltip>
      </div>
    </div>
  );
};

export default MovieCardUser;
