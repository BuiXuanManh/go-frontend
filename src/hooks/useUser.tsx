import { useQuery } from 'react-query';
import { getUserProfile } from 'src/helpers/api';

const useUser = (id: number | undefined, onSuccess?: (data) => void) => {
  return useQuery(['user', id], () => getUserProfile(id), {
    enabled: id !== undefined && id !== null,
    onSuccess: onSuccess,
    staleTime: 0
  });
};

export default useUser;
