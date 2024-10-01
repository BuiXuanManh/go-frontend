import React, { useState } from 'react';
import useUserId from 'src/hooks/useUserId';
import ReactQuill from 'react-quill';
import useDiscussion from 'src/hooks/useDiscussion';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { toast } from 'react-toastify';

interface DiscussionFormProps {
  movieId: string;
  movieTitle: string;
  setIsNewDiscussion: React.Dispatch<React.SetStateAction<boolean>>;
}

function DiscussionForm({ movieId, movieTitle, setIsNewDiscussion }: DiscussionFormProps) {
  const { userId } = useUserId();
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const addNewDiscussionSuccess = () => {
    setIsNewDiscussion(false);
  };
  const { mutate: addDiscussion, isLoading: isAddDiscussion } = useDiscussion(
    movieId,
    userId,
    addNewDiscussionSuccess
  );
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addDiscussion(subject, description);
    console.log(subject, description);
  };
  return (
    <form onSubmit={handleSubmit} className='w-full p-8'>
      <h2 className='text-2xl font-semibold'>Discuss {movieTitle}</h2>
      <h3 className='font-semibold mt-6'>For Item</h3>
      <p className='mt-2'>{movieTitle}</p>
      <div className='mt-4'>
        <label htmlFor='subject' className='font-semibold'>
          Subject
        </label>
        <input
          value={subject}
          onChange={event => setSubject(event.target.value)}
          className='w-full border-border border-1 mt-2'
        ></input>
      </div>
      <div className='mt-4'>
        <label htmlFor='subject' className='font-semibold'>
          Message
        </label>
        <ReactQuill theme='snow' value={description} onChange={setDescription} />
      </div>
      <button
        type='submit'
        className='font-semibold mt-8 mr-10 bg-[#01b4e4] rounded-md px-4 py-1.5 hover:bg-opacity-0 hover:text-[#01b4e4] hover:underline transition duration-300'
      >
        {isAddDiscussion ? <LoadingIndicator /> : 'Submit'}
      </button>
      <button type='button' className='hover:underline' onClick={() => setIsNewDiscussion(false)}>
        Cancel
      </button>{' '}
    </form>
  );
}

export default DiscussionForm;
