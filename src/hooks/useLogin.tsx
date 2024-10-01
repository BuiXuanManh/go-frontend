import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login } from 'src/helpers/api';
import { LoginResponse } from 'src/helpers/type';

export function useSignIn() {
  const navigate = useNavigate();

  const { mutate: signInMutation } = useMutation<
    LoginResponse,
    unknown,
    { Username: string; Password: string },
    unknown
  >({
    mutationFn: ({ Username, Password }) => login(Username, Password),
    onSuccess: data => {
      // TODO: save the user in the state
      console.log('data', data);
      navigate('/');
    }
  });

  return signInMutation;
}
