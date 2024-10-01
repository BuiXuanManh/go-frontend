import { useQuery } from 'react-query';
import { mapJsonToCrews } from 'src/helpers/utils';
import { getMovieCrew } from 'src/helpers/api';

const useCrew = (id: string, select?: (data: any) => any) => {
  return useQuery(['crew', id], () => getMovieCrew(id), {
    select(data) {
      if (select) {
        return select(data);
      }
      return mapJsonToCrews(data.crew);
    }
  });
};

export default useCrew;
