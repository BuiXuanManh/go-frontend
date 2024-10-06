/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingIndicator from '../LoadingIndicator';
import { getLeaderboard } from 'src/helpers/api';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
// import { buildImageUrl } from 'src/helpers/utils';

function Leaderboard() {
  const { data: leaderBoardData, isLoading: isLeaderBoardLoading } = useQuery(
    'leaderBoard',
    getLeaderboard,
    {
      select(data) {
        if (!data) return data;
        const movieRated = data?.map((user: any) => user?.movies_rated);
        const maxMoviesRated = Math.max(movieRated);
        const updatedData = data?.map((user: any) => ({
          ...user,
          percentage: (user.movies_rated / maxMoviesRated) * 100
        }));
        return updatedData;
      }
    }
  );
  if (isLeaderBoardLoading) return <LoadingIndicator />;
  return (
    <div className='mt-4'>
      <div className='flex items-center'>
        <h2 className='text-2xl font-semibold'>Leaderboard</h2>
        <span className='w-2 h-2 bg-gradient-to-r mx-2 from-lighterGreen rounded-full to-lightGreen' />
        <span className=' text-sm font-light'>Movie rated</span>
      </div>
      <ul className='w-full flex flex-wrap'>
        {leaderBoardData?.slice(0, 10)?.map((user: any) => {
          return (
            <li className='w-1/2 pl-5 flex mt-5' key={user.user_id}>
              <Link className='w-12 h-12 mr-2' to={`/u/${user.user_id}`}>
                <img
                  className='w-full h-full rounded-full overflow-hidden'
                  src={
                    user.picture_profile
                      ? user.picture_profile
                      : 'https://picsum.photos/id/' + user.id + '/200/300'
                  }
                  alt={user.username}
                />
              </Link>
              <div className='ml-5 w-full'>
                <Link
                  className='hover:text-lightGreen inline-block w-fit'
                  to={`/u/${user.user_id}`}
                >
                  <h3 className='text-xl font-semibold  w-fit'>{user.username}</h3>
                </Link>
                <div className='flex w-full items-center'>
                  <div
                    style={{ width: `${user.percentage}%` }}
                    className={`h-1.5 rounded-md bg-gradient-to-r from-lighterGreen to-lightGreen`}
                  ></div>
                  <span className='ml-2 text-sm font-semibold'>{user.movies_rated}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Leaderboard;
