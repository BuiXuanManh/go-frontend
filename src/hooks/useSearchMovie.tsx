/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { searchMovie } from 'src/helpers/api';
import { mapJsonToMovie } from 'src/helpers/utils';

const useSearchMovie = (query: string, page: number) => {
  return useQuery(['search-movies', query, page], () => searchMovie(query, Number(page)), {
    select(data) {
      return {
        movies: data?.movies.map((movie: any) => mapJsonToMovie(movie)),
        page: data?.page,
        page_size: data?.page_size,
        total_page: data?.total_page
      };
    },
    retry: false
  });
};

export default useSearchMovie;
