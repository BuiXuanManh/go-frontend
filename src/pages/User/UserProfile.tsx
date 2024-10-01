import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { getColor } from 'src/helpers/utils';
import useUserRating from 'src/hooks/useUserRating';
import UserOverview from './UserOverView';
import UserRatingPanel from './UserRatingPanel';
import useUser from 'src/hooks/useUser';
import MovieList from './MovieList';
import DiscussionList from './DiscussionList';
import useUserId from 'src/hooks/useUserId';

const UserProfile = () => {
  const { id, type } = useParams();

  const { userId } = useUserId();

  const getSelectedIndex = () => {
    switch (type) {
      case 'ratings':
        return 1;
      case 'recommendations':
        return 2;
      case 'discussion':
        return 3;
      case 'watchlist':
        return 4;
      default:
        return 0;
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex());

  const { data: userProfileData, isLoading } = useUser(parseInt(id));

  const [avarageRating, setAvarageRating] = useState<number | undefined>(undefined);

  useEffect(() => {
    setSelectedIndex(getSelectedIndex());
  }, [type]);

  const { data: ratingData, isLoading: isRatingLoading } = useUserRating({
    id: id ?? '',
    onSuccess: data => {
      let totalRating = 0;
      data.forEach(element => {
        totalRating += element.rating;
      });
      console.log('totalRating', totalRating);
      setAvarageRating(totalRating / data.length);
    }
  });

  const onSelect = (index: number, lastIndex: number, event: Event) => {
    setSelectedIndex(index);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className='relative md:h-96 lg:h-[25rem] flex justify-center items-center lg:px-24 '>
        <div className='md:h-96 lg:h-full w-full overflow-hidden absolute left-0 top-0 '>
          <img
            id='backdrop'
            src='/src/assets/images/bg.png'
            className='w-full h-full object-cover obtnRatingject-bottom'
            alt='backdrop'
          ></img>
        </div>
        <div className='relative flex w-full lg:scale-100 scale-75 items-center'>
          <img
            id='profile-img'
            className='rounded-full w-48 h-48 overflow-hidden'
            src={userProfileData.picture_profile}
            alt='user profile'
          />
          <div className='ml-4'>
            <span id='username' className='text-3xl font-bold'>
              {userProfileData.username}
            </span>
            <span className='text-lg text-white/70 ml-2'> Member since October 2023</span>
            <div className='flex items-center mt-5'>
              <span
                id='avarage-rating'
                className={`text-xl font-semibold text-white flex justify-center items-center w-16 h-16 border-[3.5px] rounded-full bg-background/60 ${getColor(
                  avarageRating
                )}`}
              >
                {avarageRating === undefined ? 'NR' : avarageRating.toFixed(1).toString()}
              </span>
              <span className='ml-5 leading-tight'>
                Average <br></br> Movie Score
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='py-3 px-24 '>
        <Tabs onSelect={onSelect} selectedIndex={selectedIndex}>
          <TabList className={'flex justify-center border-border border-b-1 react-tabs__tab-list '}>
            <Tab>Overview</Tab>
            {userId === parseInt(id || '0') && (
              <>
                <Tab>Ratings</Tab>
                <Tab>Recommendations</Tab>
                <Tab>Discussion</Tab>
                <Tab>Watchlist</Tab>
              </>
            )}
          </TabList>
          <TabPanel>
            <UserOverview userId={id} ratingData={ratingData} favourites={[233, 3, 5, 6, 11]} />
            {userId === parseInt(id || '0') && (
              <MovieList
                title={'My Favorite List'}
                nullListMessage={`You don't have any favorite movie yet.`}
                favoriteList={userProfileData.favorite_list}
                id='favorite-list'
                canRemove
                movieIds={userProfileData.favorite_list}
              />
            )}
          </TabPanel>
          <TabPanel>
            <UserRatingPanel
              ratingData={ratingData}
              favoriteList={userProfileData.favorite_list}
            ></UserRatingPanel>
            <MovieList
              movieIds={ratingData?.map(rating => parseInt(rating.movie_id)) ?? []}
              nullListMessage={`You haven't rate any movie yet`}
              title='My Ratings'
              id='rating-list'
              canRemove
              favoriteList={userProfileData.favorite_list}
            />
          </TabPanel>
          <TabPanel>
            <MovieList
              title={'My Recommendations'}
              nullListMessage={`We don't have enough data to suggest any movies. You can help by rating movies
              you've seen.`}
              id='recommendation-list'
              favoriteList={userProfileData.favorite_list}
              movieIds={userProfileData.recommendation_list}
            />
          </TabPanel>
          <TabPanel>
            <DiscussionList
              title='My Discussions'
              id='discussion-list'
              nullListMessage="You don' have any discussion yet"
              userId={userProfileData.id}
            />
          </TabPanel>
          <TabPanel>
            <MovieList
              title={'My Watchlist'}
              nullListMessage={`You don't have any movie in your watchlist yet`}
              id='watchlist-list'
              favoriteList={userProfileData.favorite_list}
              movieIds={userProfileData.watch_list}
              canRemove={true}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
export default UserProfile;
