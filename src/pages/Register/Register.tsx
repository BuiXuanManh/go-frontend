import React, { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import logo from 'src/assets/images/Logo.png';
import SocialSign from 'src/components/SocialSign';
import '../Login/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createUserProfile } from 'src/helpers/api';
import { User } from 'src/helpers/type';
import { buildUserImageUrl } from 'src/helpers/utils';
import Input from 'src/components/Input/Input';
import { toast } from 'react-toastify';
import {
  MANDATORY_FIELDS,
  PASSWORDS_DONT_MATCH,
  PASSWORDS_MIN_LENGTH,
  REGISTER_FAILED,
  REGISTER_SUCCESSFULLY,
  USERNAME_TAKEN
} from 'src/constant/error';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const { mutate: register } = useMutation(createUserProfile, {
    onSuccess: () => {
      toast.success(REGISTER_SUCCESSFULLY, { toastId: 'registerSuccessfully' });
      navigate('/login');
    },
    onError: error => {
      if (error.response.status === 502) setUsernameError(USERNAME_TAKEN);

      toast.error(REGISTER_FAILED);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError('');
    setUsernameError('');
    setRepeatPasswordError('');
    if (!username || !password || !repeatPassword) {
      toast.error(MANDATORY_FIELDS, {
        toastId: 'mandatoryFieldsError'
      });
      return;
    }
    if (password.length < 8) {
      setPasswordError(PASSWORDS_MIN_LENGTH);
      return;
    }
    if (password !== repeatPassword) {
      setRepeatPasswordError(PASSWORDS_DONT_MATCH);
      return;
    }
    const userProfile: User = {
      id: 1,
      username: username,
      password_hash: password,
      favorite_list: [],
      recommendation_list: [],
      watch_list: [],
      picture_profile: buildUserImageUrl(username, '13b6dc', 'fff')
    };
    register(userProfile);
  };

  return (
    <div id='container'>
      <form id='register' onSubmit={handleSubmit} className='form-container'>
        <img src={logo} alt='Logo'></img>
        <Input
          id='usernameInput'
          type='text'
          placeholder='Username'
          value={username}
          errorMessage={usernameError}
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          id='passwordInput'
          type='password'
          placeholder='Password'
          value={password}
          errorMessage={passwordError}
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          id='repeatPasswordInput'
          type='password'
          placeholder='Repeat Password'
          value={repeatPassword}
          errorMessage={repeatPasswordError}
          onChange={e => setRepeatPassword(e.target.value)}
        />

        <button id='signUpButton' type='submit' className='primary-btn h-11 mb-4 mt-9'>
          Sign up
        </button>
        <span className='sign__delimiter'>or</span>
        <SocialSign></SocialSign>
        <span className='sign__text'>
          Already have an account?{' '}
          <Link id='signInLink' to='/login'>
            Sign in!
          </Link>
        </span>
      </form>
    </div>
  );
}
