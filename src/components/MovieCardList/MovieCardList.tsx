import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getMoviesByPage } from 'src/helpers/api';
import LoadingIndicator from '../LoadingIndicator';
import MovieCard from '../MovieCard';
import { buildImageUrl } from 'src/helpers/utils';
import ReactPaginate from 'react-paginate';

interface MovieCardListProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function MovieCardList({ page, setPage }: MovieCardListProps) {
  const { data: movieListData, isLoading: isMovieListLoading } = useQuery(['movieList', page], () =>
    getMoviesByPage(page)
  );
  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;

    setPage(newPage);
    // Scroll to the movie_list element
    const movieListElement = document.getElementById('movie_list');
    if (movieListElement) {
      movieListElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };
  if (isMovieListLoading) return <LoadingIndicator />;
  return (
    <div className='border-border border-b-1 pb-4'>
      <h2 id='movie_list' className='text-2xl font-semibold scroll-m-20'>
        Movie List
      </h2>
      <div className='grid grid-cols-5 gap-4 mt-4'>
        {movieListData?.movies.map((movie: any) => {
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              posterUrl={buildImageUrl(movie.poster_path, 'w500')}
              movieName={movie.title}
              rating={movie.vote_average}
              genres={movie.genres.map((genre: any) => genre.name)}
            />
          );
        })}
      </div>

      <ReactPaginate
        className='react-paginate mt-4'
        breakLabel='...'
        nextLabel='Next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        initialPage={page - 1}
        pageCount={movieListData?.total_page}
        disableInitialCallback={true}
        previousLabel='< Prev'
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default MovieCardList;
