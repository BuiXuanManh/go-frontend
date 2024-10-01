import React from 'react';
import ReactQuill from 'react-quill';
import LoadingIndicator from '../LoadingIndicator';

interface QuillFormProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  hidden?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

function QuillForm({ value, setValue, hidden, isLoading, onSubmit, onCancel }: QuillFormProps) {
  return (
    <form hidden={hidden} onSubmit={onSubmit}>
      <ReactQuill theme='snow' value={value} onChange={setValue} />
      <button
        type='submit'
        className='font-semibold mt-8 mr-10 bg-[#01b4e4] rounded-md px-4 py-1.5 hover:bg-opacity-0 hover:text-[#01b4e4] hover:underline transition duration-300'
      >
        {isLoading ? <LoadingIndicator /> : 'Submit'}
      </button>
      <button onClick={onCancel} type='button' className='hover:underline'>
        Cancel
      </button>
    </form>
  );
}

export default QuillForm;
