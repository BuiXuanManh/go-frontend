import { useQuery } from 'react-query';
import { getUserRating } from 'src/helpers/api';

const useUserRating = (data: {
  id: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  return useQuery(['userRating', data.id], () => getUserRating(data.id), {
    onSuccess: data.onSuccess,
    onError: data.onError,
    retry: false,
    refetchOnWindowFocus: false,
    select: data => {
      console.log('data', data);
      return data.map(rating => {
        return {
          rating: rating.rating,
          movie_id: rating.movie_id,
          year: new Date(rating.timestamp * 1000).getFullYear()
        };
      });
    }
  });
};

export default useUserRating;
