import { useMutation } from 'react-query';
import { updateUserProfile } from 'src/helpers/api';
import useUser from './useUser';
import { toast } from 'react-toastify';
import {
  SERVER_UNAVAILABLE,
  REMOVE_FROM_WATCHLIST_SUCCESS,
  ADD_TO_WATCHLIST_SUCCESS
} from 'src/constant/error';

const useWatchList = (userId: number | undefined, movieId: number, onSuccess?: () => void) => {
  const { data: user, refetch } = useUser(userId);
  let isDelete = false;

  const mutation = useMutation(updateUserProfile, {
    onSuccess: () => {
      onSuccess && onSuccess();
      if (isDelete) {
        toast.success(REMOVE_FROM_WATCHLIST_SUCCESS);
      } else {
        toast.success(ADD_TO_WATCHLIST_SUCCESS);
      }
      refetch();
    },
    onError: () => {
      toast.error(SERVER_UNAVAILABLE);
    }
  });

  const updateFavorite = async () => {
    try {
      // Wait for the user profile to be fetched
      if (user.watch_list.includes(movieId)) {
        isDelete = true;
      } else {
        isDelete = false;
      }
      const updatedUser = user
        ? {
            ...user,
            watch_list: user.watch_list.includes(movieId)
              ? user.watch_list.filter(id => id !== movieId)
              : [...user.watch_list, movieId]
          }
        : null;
      await mutation.mutateAsync(updatedUser);
    } catch (error) {
      // Handle errors, if needed
      console.error('Error updating user profile', error);
    }
  };

  return { ...mutation, mutate: updateFavorite };
};

export default useWatchList;
