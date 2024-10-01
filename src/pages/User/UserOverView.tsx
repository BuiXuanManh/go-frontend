import React from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { useQueries, useQuery } from 'react-query';
import { getMovieDetail, getUserReview } from 'src/helpers/api';

export type RatingData = {
  rate: string;
  rateCount: number;
  year: number;
};

export type Series = {
  label: string;
  data: RatingData[];
};

export type RatingRawData = {
  movie_id: string;
  rating: number;
  year: number;
};

export interface UserOverviewProps {
  ratingData: RatingRawData[];
  favourites: number[];
  userId: string;
  // Define the props for the component here
}

function countRatings(ratings: RatingRawData[]): RatingData[] {
  const countMap: { [key: string]: number } = {};

  // Initialize countMap with default counts for ratings from 0 to 10
  for (let i = 0; i <= 10; i++) {
    countMap[i.toString()] = 0;
  }

  // Count the ratings
  for (const { rating } of ratings) {
    const key = rating.toString();
    countMap[key] += 1;
  }

  // Convert the countMap to the desired format
  const result: RatingData[] = Object.entries(countMap).map(([rate, rateCount]) => ({
    rate,
    rateCount,
    year: 0
  }));

  return result;
}

const UserOverview: React.FC<UserOverviewProps> = props => {
  // Implement the component logic here
  const primaryAxis = React.useMemo(
    (): AxisOptions<RatingData> => ({
      getValue: datum => datum.rate
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<RatingData>[] => [
      {
        getValue: datum => datum.rateCount,
        elementType: 'bar'
      }
    ],
    []
  );

  const data: Series[] = [
    {
      label: 'Ratings',
      data: countRatings(props.ratingData ?? [])
    }
  ];
  const movieQueries = useQueries(
    props.favourites.map(movieId => {
      return {
        queryKey: ['movie', movieId],
        queryFn: () => getMovieDetail(movieId.toString())
      };
    })
  );

  const { data: reviewData } = useQuery(
    ['userReview', props.userId],
    () => getUserReview(props.userId),
    {
      select: data => data?.length ?? 0
    }
  );

  const isLoading = movieQueries.some(result => result.isLoading);

  return (
    // JSX code for rendering the component
    <div className='mt-3'>
      <h2 className='text-2xl font-bold'>Stats</h2>
      <div className='flex justify-between'>
        <div>
          <p className='text-lg'>Total Rating</p>
          <p id='total-rating' className='text-[4rem] font-bold'>
            {props.ratingData?.length ?? 0}
          </p>
        </div>
        <div>
          <p className='text-lg'>Total Reviews</p>
          <p id='total-review' className='text-[4rem] font-bold'>
            {reviewData ?? 0}
          </p>
        </div>
        <div className='w-1/3'>
          <p className='text-lg'>Rating Overview</p>
          <Chart
            options={{
              data: data,
              primaryAxis: primaryAxis,
              secondaryAxes: secondaryAxes,
              dark: true
            }}
          />
        </div>
      </div>
      {/* <h2 className='text-2xl font-bold mt-8 '>Favourites</h2>
      <div className='space-y-3 mt-4 pt-3'>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          movieQueries.map((res, index) => {
            const movie = mapJsonToMovie(res.data);
            return (
              <MovieCardUser
                key={index}
                movieId={movie.id}
                posterPath={buildImageUrl(movie.posterPath, 'original')}
                title={movie.title}
                avgRating={movie.rating}
                releaseDate={formatDateToDDMMYYYY(movie.releaseDate)}
                overview={movie.overview}
              />
            );
          })
        )}
      </div> */}
    </div>
  );
};

export default UserOverview;
