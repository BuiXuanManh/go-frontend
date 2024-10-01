import { useMutation } from 'react-query';
import { createDiscussionPart } from 'src/helpers/api';
import useUser from './useUser';
import DiscussionPart from 'src/types/DiscussionPart.type';
import { toast } from 'react-toastify';
import { POST_DISCUSSION_FAILED, REPLY_POSTED } from 'src/constant/error';

const useDiscussionPart = (userId: number, discussionId: string, onSuccess?: () => void) => {
  const { data: user } = useUser(userId);
  const mutation = useMutation(
    (discussionPart: DiscussionPart) => createDiscussionPart(discussionId, discussionPart),
    {
      onSuccess: () => {
        onSuccess && onSuccess();
        toast.success(REPLY_POSTED);
      },
      onError: () => {
        toast.error(POST_DISCUSSION_FAILED);
      }
    }
  );

  const createPart = async (description: string) => {
    try {
      // Wait for the user profile to be fetched
      const discussionPart: DiscussionPart = {
        description: description,
        user_id: userId,
        title: '',
        timestamp: new Date().toISOString(),
        profile_path: user?.picture_profile || '',
        name: user?.username || 'Anonymous',
        part_id: 0,
        is_reply_of: null
      };
      await mutation.mutateAsync(discussionPart);
    } catch (error) {
      // Handle errors, if needed
      console.error('Error updating user profile', error);
    }
  };

  return { ...mutation, mutate: createPart };
};

export default useDiscussionPart;
