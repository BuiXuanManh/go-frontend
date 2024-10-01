import { useQuery, useQueryClient } from 'react-query';
import { getMovieDetail } from 'src/helpers/api';
import { mapJsonToMovie } from 'src/helpers/utils';

const useMovieDetail = (movieId: string, onError?: (error) => void, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(
    ['movieDetail', movieId],
    () => getMovieDetail(movieId),
    {
      select(data) {
        return mapJsonToMovie(data);
      },
      onError: onError,
      onSuccess: onSuccess,
      initialData: () => {
        const movie = queryClient
          .getQueryData('movies')
          ?.movies?.find(movie => movie.id == movieId);
        if (movie) {
          return movie;
        } else {
          return undefined;
        }
      },
      enabled: !!movieId
    }
  );

  return {
    isLoading,
    isError,
    data,
    error
  };
};

export default useMovieDetail;
