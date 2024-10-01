import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { options } from 'src/constant/time-option';
import useUserId from 'src/hooks/useUserId';
import DiscussionPart from 'src/types/DiscussionPart.type';
import { deleteDiscussion, deleteDiscussionPart, updateDiscussionPart } from './../../helpers/api';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import QuillForm from '../QuillForm';
import {
  DELETE_DISCUSSION_FAILED,
  DELETE_REPLY_FAILED,
  DISCUSSION_DELETED,
  EDIT_DISCUSSION_FAILED,
  EDIT_REPLY_FAILED
} from 'src/constant/error';

interface DiscussionPartCardProps {
  discussionId: string;
  discussionPart: DiscussionPart;
  subject: string;
  isReply?: boolean;
  canDelete?: boolean;
  onPartDeleteSuccess?: () => void;
  onPartEditSuccess?: (partId: number) => void;
}
function DiscussionPartCard({
  discussionPart,
  subject,
  isReply,
  discussionId,
  canDelete = true,
  onPartDeleteSuccess,
  onPartEditSuccess
}: DiscussionPartCardProps) {
  const { userId } = useUserId();
  const [isEditting, setIsEditting] = useState(false);
  const [value, setValue] = useState(discussionPart.description);

  const navigate = useNavigate();

  const { mutate: deletePart } = useMutation(
    (partId: number) => deleteDiscussionPart(discussionId, partId),
    {
      onSuccess: onPartDeleteSuccess,
      onError: () => {
        toast.error(DELETE_REPLY_FAILED);
      }
    }
  );
  const { mutate: deleteDiscussionMutation } = useMutation(() => deleteDiscussion(discussionId), {
    onSuccess: () => {
      toast.success(DISCUSSION_DELETED);
      navigate(-1);
    },
    onError: () => {
      toast.error(DELETE_DISCUSSION_FAILED);
    }
  });
  const { mutate: editDiscussion } = useMutation(
    (discussionPart: DiscussionPart) => updateDiscussionPart(discussionId, discussionPart),
    {
      onSuccess: () => {
        onPartEditSuccess && onPartEditSuccess(discussionPart.part_id);
      },
      onError: () => {
        if (discussionPart.part_id === 0) {
          toast.error(EDIT_DISCUSSION_FAILED);
        } else {
          toast.error(EDIT_REPLY_FAILED);
        }
      }
    }
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updateDiscussionPart = { ...discussionPart, description: value };
    editDiscussion(updateDiscussionPart);
    setIsEditting(false);
  };

  const handleDelete = () => {
    if (discussionPart.part_id === 0) {
      deleteDiscussionMutation();
    } else {
      deletePart(discussionPart.part_id);
    }
  };
  return (
    <div className='border-border border-1'>
      <div className='p-2 w-full bg-[#24232b] flex items-center border-border border-b-1'>
        <img className='rounded-full w-10 h-10' src={discussionPart.profile_path} alt='Profile' />
        <div className='ml-4 '>
          {!isReply && <h2 className='text-lg font-semibold'>{subject}</h2>}
          {isReply && (
            <h2 className='text-lg '>
              Reply by <span className='font-semibold'>{discussionPart.name}</span>
            </h2>
          )}

          <span className='font-light'>
            {!isReply && <>posted by {discussionPart.name} </>}
            on {new Date(discussionPart.timestamp).toLocaleString('en-US', options)}
          </span>
        </div>
      </div>
      {!isEditting && (
        <div
          className='discussion-part p-4  border-border border-b-1'
          dangerouslySetInnerHTML={{ __html: discussionPart.description }}
        ></div>
      )}
      {isEditting && (
        <div className='p-3 border-border border-b-1'>
          <QuillForm
            hidden={!isEditting}
            value={value}
            setValue={setValue}
            onSubmit={handleSubmit}
            onCancel={() => setIsEditting(false)}
          />
        </div>
      )}
      <div className='text-sm py-2 px-4 flex justify-between'>
        <div className='flex space-x-2'>
          <button className='flex items-center'>
            <img className='w-5 h-5' src='/src/assets/images/like.svg' alt='like button' />
            Like
          </button>

          <button className='flex items-center'>
            <img className='w-5 h-5' src='/src/assets/images/quote.svg' alt='quote button' />
            Quote
          </button>
        </div>
        <div className='flex space-x-3'>
          {userId === discussionPart.user_id && (
            <button id={`edit-${discussionPart.part_id}`} className='w-5 h-5'>
              <img src='/src/assets/images/edit.svg' alt='settings' />
            </button>
          )}
          {userId !== discussionPart.user_id && (
            <>
              <button>Report</button>
              <button>Ignore</button>
            </>
          )}
        </div>
      </div>

      <Tooltip
        style={{ backgroundColor: 'rgb(55, 65, 81)' }}
        opacity={1}
        anchorSelect={`#edit-${discussionPart.part_id}`}
        place='bottom'
        openOnClick
        clickable
      >
        <ul className='space-y-2 py-1'>
          <li>
            <button onClick={() => setIsEditting(true)}>Edit</button>
          </li>
          <li>
            <button hidden={!canDelete} onClick={handleDelete}>
              Delete
            </button>
          </li>
        </ul>
      </Tooltip>
    </div>
  );
}

export default DiscussionPartCard;
