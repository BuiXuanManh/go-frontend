/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { SERVER_UNAVAILABLE } from 'src/constant/error';
import { createLeaderBoard } from 'src/helpers/api';

const useLeaderBoard = (user_id:number) => {
    const createLeader= async () => {
        return await createLeaderBoard(user_id,);
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