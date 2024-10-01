import { Link } from 'react-router-dom';
import { getColor } from 'src/helpers/utils';

interface MovieCardProps {
  id: number;
  posterUrl: string;
  movieName: string;
  rating: number;
  genres: string[];
  className?: string;
}

export default function MovieCard(props: MovieCardProps) {
  const { id, posterUrl, movieName, genres, rating, className } = props;

  return (
    <div className={`flex ${className} w-[14.5rem]`}>
      <div>
        <div className='flex relative group/play before:absolute before:bg-black/[0.35] before:inset-0 before:z-0 before:opacity-0 before:transition-opacity before:duration-500 before:pointer-events-none before:hover:opacity-100'>
          <img className='w-[14.5rem] h-[21.5rem] rounded-lg' src={posterUrl} alt={movieName} />
          <Link
            className='absolute flex justify-center items-center w-14 h-14 bg-white rounded-full top-1/2 left-1/2 z-30 text-primary outline transition duration-500 transform scale-90 opacity-0 outline-6 -m-7 outline-white/[0.3] group-hover/play:opacity-100 hover:outline-primary/[0.4]'
            to={`/details/${id}`}
          >
            <span className='flex justify-center items-center'>
              <svg
                className='w-8 h-8'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path d='M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z'></path>
              </svg>
            </span>
          </Link>
          <span
            className={`text-sm font-semibold text-white absolute z-30 flex justify-center items-center w-9 h-9 top-4 left-4 border-2 rounded-full bg-background/60 ${getColor(
              rating
            )}`}
          >
            {rating === undefined ? 'NR' : rating.toFixed(1).toString()}
          </span>
        </div>
        <div className='pl-2 pr-2'>
          <p className='text-white mt-2 text-xl'>{movieName}</p>
          <span className='text-primary line-clamp-2 text-base'>{genres.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}
