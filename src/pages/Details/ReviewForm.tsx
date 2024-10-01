import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { MANDATORY_FIELDS, REVIEW_UPDATED, SERVER_UNAVAILABLE } from 'src/constant/error';
import { updateUserReview } from 'src/helpers/api';
import useUserReview from 'src/hooks/useUserReview';

interface ReviewFormProps {
  className?: string;
  userId: number;
  movieId: number;
  initValue?: string;
  canCancel?: boolean;
  onCancel?: () => void;
  isEdit?: boolean;
  hidden?: boolean;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = props => {
  // Define the state variables here
  const [review, setReview] = useState<string>(props.initValue || '');
  const { mutate: createReview } = useUserReview(props.userId, props.movieId, props.onSuccess);
  const updateUserReviewMutation = useMutation(
    ['update-review', props.userId, props.movieId],
    () =>
      updateUserReview({
        user_id: props.userId,
        movie_id: props.movieId,
        comment: review
      }),
    {
      onSuccess: () => {
        toast.success(REVIEW_UPDATED);
        props.onSuccess && props.onSuccess();
      },
      onError: () => {
        toast.error(SERVER_UNAVAILABLE);
      }
    }
  );
  // Define the event handlers here

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (review === '') {
      toast.error(MANDATORY_FIELDS);
      return;
    }
    if (props.isEdit) {
      updateUserReviewMutation.mutate();
      return;
    }
    createReview(review);
    // Handle form submission logic here
  };

  // Render the component JSX here
  return (
    <form
      className={`border-border border rounded-md p-5 ${props.className}`}
      hidden={props.hidden}
      onSubmit={handleSubmit}
    >
      <textarea
        className=' h-48 w-full text-area resize-none '
        id='review'
        placeholder='Review'
        value={review}
        onChange={handleReviewChange}
      />
      <div className='flex'>
        <button type='submit' className='primary-btn h-10 w-fit px-6 mt-4'>
          Send
        </button>
        <button
          hidden={!props.canCancel}
          onClick={props.onCancel}
          type='button'
          className='h-10 w-fit px-6 mt-4 ml-4'
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
