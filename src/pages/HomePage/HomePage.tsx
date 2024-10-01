import MovieCard from 'src/components/MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState } from 'react';
import { buildImageUrl, mapJsonToMovie } from 'src/helpers/utils';
import { useQuery } from 'react-query';
import { getMoviePopular } from 'src/helpers/api';
import Leaderboard from 'src/components/Leaderboard/Leaderboard';
import MovieCardList from 'src/components/MovieCardList/MovieCardList';

export default function HomePage() {
  const [backdropURL, setBackdropURL] = useState('/src/assets/images/backdrop.png');
  const [page, setPage] = useState(1);

  let sliderRef = useRef(null);
  const onError = () => {
    setBackdropURL('/src/assets/images/backdrop.png');
  };
  const { isLoading, data } = useQuery('movies', () => getMoviePopular(), {
    staleTime: 1000 * 60 * 1, // 1 minutes
    onError: onError
  });

  if (isLoading) return <div className='text-black'>Loading...</div>;

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    draggable: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    afterChange: (current: number) => {
      setBackdropURL(buildImageUrl(data[current]?.backdrop_path, 'original'));
    }
  };
  const onClickNext = () => {
    sliderRef.slickNext();
  };
  const onClickPrev = () => {
    sliderRef.slickPrev();
  };

  return (
    <div className='w-auto  bg-background '>
      <div className='relative md:h-96 lg:h-[40rem] flex justify-center items-center lg:px-24 '>
        <div className='md:h-96 lg:h-[40rem] w-full overflow-hidden absolute left-0 top-0 '>
          <img
            loading='lazy'
            src={backdropURL}
            className='w-full h-auto opacity-10'
            alt='backdrop'
          ></img>
        </div>
        <div className='relative flex w-full flex-col justify-between'>
          <div className='flex'>
            <h1 className='text-4xl uppercase'>Trending</h1>
            <button
              className='ml-auto border-none mr-4 hover:bg-transparent w-fit group/left'
              onClick={onClickPrev}
            >
              <svg
                className='w-6 h-6 text-gray-400 group-hover/left:text-white transition'
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
                  d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                ></path>
              </svg>
            </button>
            <button
              className='border-none hover:bg-transparent w-fit group/right'
              onClick={onClickNext}
            >
              <svg
                className='w-6 h-6  text-gray-400 group-hover/right:text-white transition'
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
                  d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
                ></path>
              </svg>
            </button>
          </div>
          <div className='mt-12'>
            <Slider
              ref={slider => {
                sliderRef = slider;
              }}
              {...settings}
            >
              {data?.map((movie, index) => {
                const card = mapJsonToMovie(movie);
                return (
                  <MovieCard
                    key={index}
                    id={card.id}
                    className='scale-50 md:scale-100'
                    posterUrl={buildImageUrl(card.posterPath, 'w500')}
                    movieName={card.title}
                    rating={card.rating}
                    genres={card.genres}
                  ></MovieCard>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      <div className='py-10 px-24'>
        <MovieCardList page={page} setPage={setPage} />

        <Leaderboard />
      </div>
    </div>
  );
}
