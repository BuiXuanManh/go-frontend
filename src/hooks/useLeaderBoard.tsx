/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { SERVER_UNAVAILABLE } from 'src/constant/error';
import { createLeaderBoard } from 'src/helpers/api';

const useLeaderBoard = (movie_id:number,user_id:number) => {
    const createLeader= async (rate:any) => {
        return await createLeaderBoard(movie_id,user_id,rate);
      }
      const { mutate, isLoading, isError, isSuccess } = useMutation(createLeader, {
        onError: (error) => {
          console.log(error)
          toast.error(SERVER_UNAVAILABLE);
        }
      });
    
      return {  mutate, isLoading, isError, isSuccess };
};

export default useLeaderBoard;