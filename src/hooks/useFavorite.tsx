import { useMutation } from 'react-query';
import { updateUserProfile } from 'src/helpers/api';
import useUser from './useUser';
import {
  ADD_TO_FAVORITES_SUCCESS,
  REMOVE_FROM_FAVORITES_SUCCESS,
  SERVER_UNAVAILABLE
} from 'src/constant/error';
import { toast } from 'react-toastify';

const useFavorite = (userId: number | undefined, favoriteId: number, onSuccess?: () => void) => {
  const { data: user, refetch } = useUser(userId);
  let isDelete = false;
  const mutation = useMutation(updateUserProfile, {
    onSuccess: () => {
      onSuccess && onSuccess();
      refetch();
      if (isDelete) {
        toast.success(REMOVE_FROM_FAVORITES_SUCCESS, {
          toastId: `remove_from_favorites_${favoriteId}`
        });
      } else {
        toast.success(ADD_TO_FAVORITES_SUCCESS);
      }
    },
    onError: () => {
      toast.error(SERVER_UNAVAILABLE);
    }
  });

  const updateFavorite = async () => {
    try {
      // Wait for the user profile to be fetched
      if (user.favorite_list.includes(favoriteId)) {
        isDelete = true;
      } else {
        isDelete = false;
      }
      const updatedUser = user
        ? {
            ...user,
            favorite_list: user.favorite_list.includes(favoriteId)
              ? user.favorite_list.filter(id => id !== favoriteId)
              : [...user.favorite_list, favoriteId]
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

export default useFavorite;
