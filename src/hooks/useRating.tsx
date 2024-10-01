import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { RATING_SUBMITTED, SERVER_UNAVAILABLE } from 'src/constant/error';
import { createMovieRating } from 'src/helpers/api';
import Rating from 'src/types/Rating';

const useRating = (onSuccess?: () => void) => {
  const createRating = async (rating: Rating) => {
    return await createMovieRating(rating);
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation(createRating, {
    onSuccess: () => {
      onSuccess && onSuccess();
      toast.success(RATING_SUBMITTED);
    },
    onError: () => {
      toast.error(SERVER_UNAVAILABLE);
    }
  });

  return { createRating: mutate, isLoading, isError, isSuccess };
};

export default useRating;
