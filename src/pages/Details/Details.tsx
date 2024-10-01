/* eslint-disable import/no-duplicates */
import { buildImageUrl } from 'src/helpers/utils';
import { buildCastWikiReference } from 'src/helpers/utils';
import CastCard from 'src/components/CastCard/CastCard';
import Scroller from 'src/components/Scroller/index';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MovieCardRecom from 'src/components/MovieCardRecom';
import { useParams } from 'react-router-dom';
import useMovieDetail from 'src/hooks/useMovieDetail';
import useCast from 'src/hooks/useCasts';
import useKeyword from 'src/hooks/useKeyword';
import MovieDetails from './MovieDetails';
import useUserId from 'src/hooks/useUserId';
import LoadingIndicator from 'src/components/LoadingIndicator';
import ReviewTab from './Tab/ReviewTab';
import DiscussionTab from './Tab/DiscussionTab';
import NotFound from '../NotFound/NotFound';
import { useQueries, useQuery } from 'react-query';
import { getMovieDetail, getSimilarMovies } from 'src/helpers/api';

export default function Details() {
  const { id } = useParams();

  const { userId, hasLogin } = useUserId();

  const { data: movie, isLoading: isMovieLoading, isError } = useMovieDetail(id || '');

  const { data: casts } = useCast(id || '');
  const { data: keywords } = useKeyword(id || '');
  const { data: similarMoviesData } = useQuery(['similarMovies', id], () => getSimilarMovies(id), {
    enabled: !!id,

    select: data => {
      return data.similar_movies;
    }
  });
  console.log(similarMoviesData);
  const similarMoviesQueries = useQueries(
    similarMoviesData
      ? similarMoviesData.map((movieId: string) => {
          return {
            queryKey: ['movie', movieId],
            queryFn: () => getMovieDetail(movieId.toString())
          };
        })
      : []
  );

  const isSimilarLoading = similarMoviesQueries.some(result => result.isLoading);

  if (isError) {
    return <NotFound></NotFound>;
  }

  return (
    <div className='w-auto bg-background '>
      {isMovieLoading && <LoadingIndicator />}
      {!isMovieLoading && <MovieDetails movie={movie} userId={userId} hasLogin={hasLogin} />}

      <div className='flex mt-6'>
        <div className='pl-24 pr-10 w-[calc(100vw_-_80px_-_268px)] '>
          <div className='border-border border-b-1'>
            <h2 className='text-2xl font-semibold mb-3'>Top Billed Cast</h2>
            <Scroller viewMore viewMoreLink='cast'>
              {casts?.map((cast, index) => (
                <CastCard
                  key={index}
                  imageUrl={buildImageUrl(cast.profilePath, 'w500')}
                  name={cast.name}
                  character={cast.character}
                  profilePath={buildCastWikiReference(cast.name)}
                  gender={cast.gender}
                />
              ))}
            </Scroller>
            <h3 className='font-semibold my-6'>
              <a className='hover:opacity-70' href={`/details/${id}/cast`}>
                Full Cast & Crew
              </a>
            </h3>
          </div>
          <div>
            <h2 className='text-2xl font-semibold mb-3 mt-3'>Social</h2>
            <Tabs>
              <TabList>
                <Tab>Discussions</Tab>
                <Tab>Reviews</Tab>
              </TabList>

              <TabPanel>
                {!isMovieLoading && <DiscussionTab movieId={movie?.id} />}
                {isMovieLoading && <LoadingIndicator />}
              </TabPanel>
              <TabPanel>
                {!isMovieLoading && <ReviewTab movieId={movie?.id} userId={userId} />}
                {isMovieLoading && <LoadingIndicator />}
              </TabPanel>
            </Tabs>
          </div>
          <h2 className='text-2xl font-semibold mb-3 mt-3'>Recommendations</h2>
          {isSimilarLoading && <LoadingIndicator />}
          {!isSimilarLoading ? (
            <Scroller>
              {similarMoviesQueries.splice(1).map((res, index) => {
                const movie = res.data;
                return (
                  <MovieCardRecom
                    posterUrl={buildImageUrl(movie?.backdrop_path, 'original')}
                    movieId={movie?.id}
                    rating={movie?.vote_average ?? 0}
                    title={movie?.title ?? ''}
                    key={index}
                  ></MovieCardRecom>
                );
              })}
            </Scroller>
          ) : (
            <p>
              We don&apos;t have enough data to suggest any movies based on Reptile. You can help by
              rating movies you&apos;ve seen.
            </p>
          )}
        </div>
        <div className='px-2 min-w-[15rem]'>
          <a href={movie?.homepage} rel='noreferrer' target='_blank'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
              ></path>
            </svg>
          </a>
          <p className='font-bold mt-9'>Status</p>
          <p>{movie?.status ?? '-'}</p>
          <p className='font-bold mt-5'>Original Language</p>
          <p>{movie?.originalLanguage ?? '-'}</p>
          <p className='font-bold mt-5'>Budget</p>
          <p>{movie?.budget ? `$${movie?.budget.toLocaleString()}` : '-'}</p>
          <p className='font-bold mt-5'>Revenue</p>
          <p>{movie?.revenue ? `$${movie?.revenue.toLocaleString()}` : '-'}</p>
          <div className='border-border border-b-1 mb-2 pb-6'>
            <h4 className='font-bold mt-6 text-lg'>Keywords</h4>
            <ul className='mt-2 flex flex-wrap'>
              {keywords?.map((keyword: string, index: number) => (
                <li key={index}>
                  <p className='text-sm p-2 border w-fit border-border rounded-[0.1875rem] mr-2 mt-2'>
                    {keyword}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
