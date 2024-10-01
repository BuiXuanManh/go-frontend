import { useQuery } from 'react-query';
import { getMovieKeyword } from 'src/helpers/api';

const useKeyword = (id: string) => {
  return useQuery(['keyword', id], () => getMovieKeyword(id));
};

export default useKeyword;
