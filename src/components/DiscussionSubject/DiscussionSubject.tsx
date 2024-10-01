import { Link } from 'react-router-dom';
import { buildImageUrl } from 'src/helpers/utils';
import useMovieDetail from 'src/hooks/useMovieDetail';
import LoadingIndicator from '../LoadingIndicator';

interface DiscussionSubjectProps {
  movie_id: string;
  subject: string;
  discussion_id: string;
  user_id: string;
  profile_path: string;
}
export default function DiscussionSubject({
  movie_id,
  subject,
  profile_path,
  discussion_id,
  user_id
}: DiscussionSubjectProps) {
  const { data: movie, isLoading: isMovieLoading } = useMovieDetail(movie_id);
  return (
    <div>
      <div className='flex items-center'>
        <Link to={`/u/${user_id}`}>
          <img className='w-10 h-10 mr-4 rounded-full' src={profile_path} alt='user profile' />
        </Link>
        <Link
          className='hover:text-white/70'
          to={`/details/${movie_id}/discussions/${discussion_id}`}
        >
          {subject}
        </Link>
      </div>

      {isMovieLoading ? (
        <LoadingIndicator />
      ) : (
        <div className='flex items-center ml-12'>
          <span>↪︎</span>
          <img
            className='w-6 h-9 ml-4'
            src={buildImageUrl(movie?.posterPath, 'w92')}
            alt='movie poster'
          />
          <Link className='ml-2' to={`/details/${movie_id}`}>
            {movie?.title}
          </Link>
        </div>
      )}
    </div>
  );
}
