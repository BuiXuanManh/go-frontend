import React from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { REVIEW_REMOVED, SERVER_UNAVAILABLE } from 'src/constant/error';
import { deleteUserReview } from 'src/helpers/api';
import useUserId from 'src/hooks/useUserId';
import ReviewForm from 'src/pages/Details/ReviewForm';

type ReviewCardProps = {
  reviewTime: string;
  userId: number;
  movieId: number;
  avatar: string;
  username: string;
  title: string;
  content: string;
  refetch: () => void;
};
//1kks3YnVkpyQxzw36CObFPvhL5f.jpg

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewTime,
  username,
  title,
  content,
  avatar,
  userId,
  movieId,
  refetch
}) => {
  const deleteReviewMutation = useMutation(
    ['delete-review', userId, movieId],
    () => deleteUserReview(userId.toString(), movieId.toString()),
    {
      onSuccess: () => {
        toast.success(REVIEW_REMOVED);
        refetch();
      },
      onError: () => {
        toast.error(SERVER_UNAVAILABLE);
      }
    }
  );
  const { userId: currentUserId } = useUserId();
  const [toggleEdit, setToggleEdit] = React.useState(false);
  return (
    <div>
      <div className='flex mt-4 items-center '>
        <img src={avatar} className='w-10 h-10 rounded-full overflow-hidden' alt='avatar' />
        <div className='ml-4'>
          <p>{title}</p>
          <p className='text-xs text-white/60'>
            Written by {username} on {reviewTime}
          </p>
        </div>
        {userId === currentUserId && (
          <button id={`edit-${username}`} className='w-5 h-5 ml-auto'>
            <img src='/src/assets/images/edit.svg' alt='settings' />
          </button>
        )}
      </div>
      {!toggleEdit && (
        <p className='border-border border-1 rounded-md p-5 mt-4 line-clamp-5'>{content}</p>
      )}
      {toggleEdit && (
        <ReviewForm
          className='mt-4'
          userId={userId}
          movieId={movieId}
          initValue={content}
          canCancel
          isEdit
          onCancel={() => setToggleEdit(false)}
          onSuccess={() => {
            setToggleEdit(false);
            refetch();
          }}
        />
      )}
      <Tooltip
        style={{ backgroundColor: 'rgb(55, 65, 81)' }}
        opacity={1}
        anchorSelect={`#edit-${username}`}
        place='bottom'
        openOnClick
        clickable
      >
        <ul className='space-y-2 py-1'>
          <li>
            <button
              onClick={() => {
                setToggleEdit(true);
              }}
            >
              Edit
            </button>
          </li>
          <li>
            <button onClick={() => deleteReviewMutation.mutate()}>Delete</button>
          </li>
        </ul>
      </Tooltip>
    </div>
  );
};

export default ReviewCard;
