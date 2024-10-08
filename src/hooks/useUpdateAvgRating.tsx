// import React from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { SERVER_UNAVAILABLE } from 'src/constant/error';
import { updateAvgRating } from 'src/helpers/api';

const useUpdateAvgRating = (movie_id:number) => {
    const UpdateAvg= async () => {
        return await updateAvgRating(movie_id);
      }
      const { mutate, isLoading, isError, isSuccess } = useMutation(UpdateAvg, {
        onError: () => {
          toast.error(SERVER_UNAVAILABLE);
        }
      });
    
      return {  mutate, isLoading, isError, isSuccess };
};

export default useUpdateAvgRating;