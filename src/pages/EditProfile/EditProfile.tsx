import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { PROFILE_UPDATED_SUCCESS, SERVER_UNAVAILABLE } from 'src/constant/error';
import { updateUserProfile } from 'src/helpers/api';
import { buildUserImageUrl } from 'src/helpers/utils';
import useUser from 'src/hooks/useUser';
import useUserId from 'src/hooks/useUserId';

const accentColors = [
  '0177d2',
  '01b4e4',
  '01c6ac',
  '01d277',
  '805be7',
  '959595',
  'd27701',
  'd29001',
  'd40242',
  'ea148c'
];

function EditProfile() {
  const { userId } = useUserId();

  const [selectedColor, setSelectedColor] = React.useState(0);

  const { data: user, isLoading } = useUser(userId);

  const navigate = useNavigate();

  const { mutate: updateUser, isLoading: updateUserLoading } = useMutation(updateUserProfile, {
    onSuccess: () => {
      navigate('/');
      toast.success(PROFILE_UPDATED_SUCCESS);
    },
    onError: () => {
      toast.error(SERVER_UNAVAILABLE);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUser({
      ...user,
      picture_profile: buildUserImageUrl(user?.username, accentColors[selectedColor], 'fff')
    });
  };

  return (
    <form onSubmit={handleSubmit} className='px-24 py-3'>
      <h2 className='font-semibold text-2xl'>Edit Profile</h2>
      {isLoading && <LoadingIndicator />}
      <label htmlFor='username' className='block mt-4 text-lg'>
        Username
      </label>
      {!isLoading && (
        <input
          id='username'
          className='border-border border-1 py-1.5 mt-2'
          disabled
          type='text'
          value={user?.username}
        ></input>
      )}

      <p className='block mt-4 text-lg'>Current Avatar</p>
      {!isLoading && (
        <img className='w-20 h-20 mt-2 rounded-full' src={user?.picture_profile} alt='Avatar'></img>
      )}
      <p className='block mt-4 text-lg'>Accent Color</p>
      <div className='flex justify-between'>
        {accentColors.map((color, index) => (
          <button
            key={index}
            type='button'
            onClick={() => setSelectedColor(index)}
            className={`w-14 h-14 mt-2 rounded-full hover:bg-[url('/src/assets/images/tick.svg')] bg-no-repeat bg-center cursor-pointer ${
              selectedColor === index ? `bg-[url('/src/assets/images/tick.svg')]` : ''
            } `}
            style={{ backgroundColor: `#${color}` }}
          />
        ))}
      </div>
      <button type='submit' className='primary-btn mt-4 px-4 py-1 mt-4'>
        {updateUserLoading && <LoadingIndicator />}
        {!updateUserLoading && 'Save'}
      </button>
    </form>
  );
}

export default EditProfile;
