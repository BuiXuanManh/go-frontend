import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from 'src/components/Input/Input';
import LoadingIndicator from 'src/components/LoadingIndicator';
import {
  CHANGE_PASSWORD_FAILED,
  MANDATORY_FIELDS,
  PASSWORDS_DONT_MATCH,
  PASSWORD_CHANGED_SUCCESSFULLY,
  SAME_OLD_NEW_PASSWORD
} from 'src/constant/error';
import { changePassword } from 'src/helpers/api';
import useUserId from 'src/hooks/useUserId';

function ChangePass() {
  const { userId } = useUserId();

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [newPassError, setNewPassError] = React.useState('');

  const { mutate: changePass, isLoading: changePassLoading } = useMutation(changePassword, {
    onSuccess: () => {
      navigate('/');
      toast.success(PASSWORD_CHANGED_SUCCESSFULLY);
    },
    onError(error, variables, context) {
      setPasswordError(error.response.data.message);
      toast.error(CHANGE_PASSWORD_FAILED);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setError('');
    setPasswordError('');
    setNewPassError('');
    event.preventDefault();
    if (!oldPassword || !newPassword || !repeatPassword) {
      toast.error(MANDATORY_FIELDS);
      return;
    }
    if (oldPassword === newPassword) {
      setNewPassError(SAME_OLD_NEW_PASSWORD);
      return;
    }
    if (newPassword !== repeatPassword) {
      setError(PASSWORDS_DONT_MATCH);
      return;
    }
    changePass({
      userId: userId,
      oldPassword,
      newPassword
    });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      <h2 className='font-semibold text-2xl w-fit'>Change Password</h2>
      <label htmlFor='old-pass' className='block mt-4 text-lg w-1/3'>
        Old Password
      </label>
      <Input
        id='old-pass'
        className='w-1/3'
        placeholder='Current Password'
        type='password'
        value={oldPassword}
        errorMessage={passwordError}
        onChange={e => setOldPassword(e.target.value)}
      />
      <label htmlFor='new-pass' className='block mt-4 text-lg w-1/3 '>
        New Password
      </label>
      <Input
        id='new-pass'
        className='w-1/3'
        placeholder='New Password'
        type='password'
        errorMessage={newPassError}
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <label htmlFor='repeat-pass' className='block mt-4 text-lg w-1/3'>
        Repeat New Password
      </label>
      <Input
        id='repeat-pass'
        className='w-1/3'
        placeholder='Repeat New Password'
        type='password'
        value={repeatPassword}
        errorMessage={error}
        onChange={e => setRepeatPassword(e.target.value)}
      />
      <button type='submit' className='primary-btn mt-4 px-4 py-1 mt-4'>
        {changePassLoading && <LoadingIndicator />}
        {!changePassLoading && 'Submit'}{' '}
      </button>
    </form>
  );
}

export default ChangePass;
