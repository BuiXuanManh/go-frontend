import { useQuery } from 'react-query';
import { getMovieDiscussion } from 'src/helpers/api';

const useMovieDiscussion = (movieId: string) => {
  const { isLoading, isError, data, error } = useQuery(
    ['movieDiscussion', movieId],
    () => getMovieDiscussion(movieId),
    {
      retry: false
    }
  );

  return {
    isLoading,
    isError,
    data,
    error
  };
};

export default useMovieDiscussion;
