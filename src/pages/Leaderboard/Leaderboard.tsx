import React from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { getLeaderboard } from 'src/helpers/api';

export type RatingData = {
  username: string;
  movies_rated: number;
};

export type Series = {
  label: string;
  data: RatingData[];
};

function Leaderboard() {
  const { data: leaderBoardData, isLoading: isLeaderBoardLoading } = useQuery(
    'leaderBoard',
    getLeaderboard
  );
  const primaryAxis = React.useMemo(
    (): AxisOptions<RatingData> => ({
      getValue: datum => datum.username
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<RatingData>[] => [
      {
        getValue: datum => datum.movies_rated,
        elementType: 'bar'
      }
    ],
    []
  );

  const data: Series[] = [
    {
      label: 'Ratings',
      data: leaderBoardData
    }
  ];
  return (
    <>
      {isLeaderBoardLoading ? (
        <LoadingIndicator />
      ) : (
        <div className='w-full flex flex-col items-center '>
          <div className='w-1/3 h-56 mt-10 '>
            <Chart
              options={{
                data: data,
                primaryAxis: primaryAxis,
                secondaryAxes: secondaryAxes,
                dark: true
              }}
            />
          </div>
          <h2 className='text-2xl font-semibold mt-5'>Contribution leaders for the week</h2>
          <ul>
            {leaderBoardData.map((user: any, index: number) => {
              return (
                <li className='flex mt-5 items-center' key={user.user_id}>
                  <span className='text-xl font-semibold w-10'>{index + 1}</span>
                  <Link className='w-12 h-12 mr-2' to={`/u/${user.user_id}`}>
                    <img
                      className='w-full h-full rounded-full overflow-hidden'
                      src={user.picture_profile}
                      alt={user.username}
                    />
                  </Link>
                  <div>
                    <Link
                      className='hover:text-lightGreen inline-block w-fit'
                      to={`/u/${user.user_id}`}
                    >
                      <h3 className='text-xl font-semibold  w-fit'>{user.username}</h3>
                    </Link>
                    <p className='text-sm'>
                      Member since: {Math.floor(Math.random() * (2023 - 2015 + 1)) + 2015}, movies
                      rated: {user.movies_rated}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default Leaderboard;
