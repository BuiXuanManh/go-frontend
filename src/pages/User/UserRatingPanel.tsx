import React from 'react';
import { AxisOptions, Chart } from 'react-charts';
import { useQueries, useQuery } from 'react-query';
import { getMovieDetail, getUserRating } from 'src/helpers/api';
import MovieList from './MovieList';
import { RatingRawData } from './UserOverView';

export type Series = {
  label: string;
  data: RatingData[];
};

interface UserRatingPanelProps {
  ratingData: RatingRawData[];
  favoriteList?: number[];
}
type RatingData = {
  rateCount: number;
  year: string;
};

function countRatings(ratings: RatingRawData[]): RatingData[] {
  const countMap: { [key: string]: number } = {};
  let minYear = Math.min(...ratings.map(rating => rating.year));
  const maxYear = Math.max(...ratings.map(rating => rating.year));

  if (minYear === maxYear) {
    minYear = minYear - 1;
  }

  // Initialize countMap with default counts for ratings from 0 to 10
  for (let i = minYear; i <= maxYear; i++) {
    countMap[i.toString()] = 0;
  }

  // Count the ratings
  for (const { year } of ratings) {
    const key = year.toString();
    countMap[key] += 1;
  }

  // Convert the countMap to the desired format
  const result: RatingData[] = Object.entries(countMap).map(([year, rateCount]) => ({
    year,
    rateCount
  }));

  return result;
}

const UserRatingPanel = ({ ratingData, favoriteList }: UserRatingPanelProps) => {
  const primaryAxis = React.useMemo(
    (): AxisOptions<RatingData> => ({
      position: 'bottom',
      getValue: datum => datum.year,
      shouldNice: true
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<RatingData>[] => [
      {
        getValue: datum => datum.rateCount,
        elementType: 'area',
        shouldNice: false
      }
    ],
    []
  );
  const data: Series[] = [
    {
      label: 'Ratings',
      data: countRatings(ratingData ?? [])
    }
  ];
  console.log('data', data);
  const movieIds = ratingData?.map(rating => rating.movie_id) ?? [];

  const movieQueries = useQueries(
    movieIds.map(movieId => {
      return {
        queryKey: ['movie', movieId],
        queryFn: () => getMovieDetail(movieId.toString())
      };
    })
  );

  const isLoading = movieQueries.some(result => result.isLoading);

  console.log('years', ratingData);

  return (
    <div className='mt-3'>
      {ratingData && (
        <>
          <h2 className='text-2xl font-bold'>Rating By Year</h2>
          <div className='w-full h-24'>
            <Chart
              options={{
                data: data,
                primaryAxis: primaryAxis,
                secondaryAxes: secondaryAxes,
                dark: true
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserRatingPanel;
