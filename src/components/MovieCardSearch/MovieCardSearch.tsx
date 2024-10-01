import { Link } from 'react-router-dom';

type MovieCardSearchProps = {
  movieId: number;
  posterPath: string;
  title: string;
  releaseDate: string;
  overview: string;
};

const MovieCardSearch = ({
  movieId,
  posterPath,
  title,
  releaseDate,
  overview
}: MovieCardSearchProps) => {
  return (
    <div className='flex items-center rounded-md border-border border-1 overflow-hidden'>
      <Link className='contents' to={`/details/${movieId}`}>
        <img className=' w-24 h-36' src={posterPath} alt={title} />
      </Link>
      <div className='mx-6'>
        <Link className='hover:text-white/70' to={`/details/${movieId}`}>
          <h2 className='text-lg font-bold'>{title}</h2>
        </Link>
        <p className='text-white/70 mb-3'>{releaseDate}</p>
        <p className='line-clamp-2'>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCardSearch;
