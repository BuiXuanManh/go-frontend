import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import DiscussionPartCard from 'src/components/Discussion/DiscussionPartCard';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { getDiscussion } from 'src/helpers/api';
import DiscussionPart from 'src/types/DiscussionPart.type';
import 'react-quill/dist/quill.snow.css';
import useUserId from 'src/hooks/useUserId';
import useDiscussionPart from 'src/hooks/useDiscussionPart';
import { toast } from 'react-toastify';
import useMovieDetail from 'src/hooks/useMovieDetail';
import QuillForm from 'src/components/QuillForm';
import { DISCUSSION_EDITED, REPLY_DELETED, REPLY_EDITED } from 'src/constant/error';
import BreadCrumbs from 'src/components/BreadCrumbs/BreadCrumbs';

function DiscussionDetails() {
  const { discussion_id, id } = useParams();
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { hasLogin, userId } = useUserId();
  const {
    data: discussion,
    isLoading,
    refetch
  } = useQuery(['discussion', discussion_id], () => getDiscussion(discussion_id));
  const { data: movie, isLoading: isMovieLoading } = useMovieDetail(id);
  const { mutate: addDiscussionPart, isLoading: isAddDiscussion } = useDiscussionPart(
    userId,
    discussion_id,
    () => {
      setValue('');
      setIsOpen(false);
      refetch();
    }
  );
  const onPartDeleteSuccess = () => {
    toast.success(REPLY_DELETED);
    refetch();
  };
  const onPartEditSuccess = (partId: number) => {
    if (partId === 0) {
      toast.success(DISCUSSION_EDITED);
    } else toast.success(REPLY_EDITED);
    refetch();
  };
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addDiscussionPart(value);
    console.log(value);
  };

  if (isLoading) return <LoadingIndicator />;
  return (
    <div className='w-full p-8'>
      {isMovieLoading && `Let's Chat`}
      {!isMovieLoading && <h2 className='text-2xl font-semibold'>Discuss {movie?.title}</h2>}
      <BreadCrumbs />
      <div className='space-y-10 mt-8'>
        {discussion.discussion_part.map((part: DiscussionPart, index: number) => {
          if (index === 0) {
            return (
              <DiscussionPartCard
                key={index}
                discussionPart={part}
                subject={discussion.subject}
                discussionId={discussion._id}
                onPartEditSuccess={onPartEditSuccess}
                canDelete={discussion.discussion_part.length === 1}
              />
            );
          } else {
            return (
              <DiscussionPartCard
                discussionId={discussion._id}
                key={index}
                onPartDeleteSuccess={onPartDeleteSuccess}
                onPartEditSuccess={onPartEditSuccess}
                discussionPart={part}
                subject={discussion.subject}
                isReply={true}
              />
            );
          }
        })}
      </div>

      <QuillForm
        onCancel={toggleOpen}
        hidden={!isOpen}
        onSubmit={handleSubmit}
        value={value}
        setValue={setValue}
        isLoading={isAddDiscussion}
      />
      {!isOpen && (
        <button
          onClick={toggleOpen}
          hidden={!hasLogin}
          className='font-semibold mt-8 mr-10 bg-[#01b4e4] rounded-md px-4 py-1.5 hover:bg-opacity-0 hover:text-[#01b4e4] hover:underline transition duration-300'
        >
          Reply
        </button>
      )}
    </div>
  );
}

export default DiscussionDetails;
