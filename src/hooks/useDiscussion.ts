import { useMutation } from 'react-query';
import { createMovieDiscussion } from 'src/helpers/api';
import useUser from './useUser';
import Discussion from 'src/types/Discussion.type';
import ObjectID from 'bson-objectid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  DELETE_DISCUSSION_FAILED,
  DISCUSSION_POSTED,
  POST_DISCUSSION_FAILED
} from 'src/constant/error';

const useDiscussion = (movieId: string, userId: number, onSuccess?: () => void) => {
  const { data: user } = useUser(userId);
  const navigate = useNavigate();
  const mutation = useMutation((discussion: Discussion) => createMovieDiscussion(discussion), {
    onSuccess: () => {
      onSuccess && onSuccess();
      navigate(`/details/${movieId}/discussions/${id}`);
      toast.success(DISCUSSION_POSTED);
    },
    onError: () => {
      toast.error(POST_DISCUSSION_FAILED);
    }
  });
  let id = '';
  const createPart = async (subject: string, description: string) => {
    id = ObjectID().toHexString();
    try {
      // Wait for the user profile to be fetched
      const discussion: Discussion = {
        _id: id,
        movie_id: parseInt(movieId),
        status: true,
        subject: subject,
        discussion_part: [
          {
            description: description,
            user_id: userId,
            title: '',
            timestamp: new Date().toISOString(),
            profile_path: user?.picture_profile || '',
            name: user?.username || 'Anonymous',
            part_id: 0,
            is_reply_of: null
          }
        ]
      };
      await mutation.mutateAsync(discussion);
    } catch (error) {
      // Handle errors, if needed
      console.error('Error create discussion', error);
    }
  };

  return { ...mutation, mutate: createPart };
};

export default useDiscussion;
