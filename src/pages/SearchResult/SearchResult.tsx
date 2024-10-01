import React, { useEffect, useState } from 'react';
import MovieCardSearch from 'src/components/MovieCardSearch/MovieCardSearch';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { buildImageUrl, mapJsonToMovie } from 'src/helpers/utils';
import { formatDateToDDMMYYYY } from './../../helpers/utils';
import Movie from 'src/types/Movie';
import './search.css';
import useSearchMovie from 'src/hooks/useSearchMovie';
import ReactPaginate from 'react-paginate';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { INVALID_SEARCH_QUERY } from './../../constant/error';

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the query parameters from location.search
  const queryParams = new URLSearchParams(location.search);

  // Get a specific query parameter value
  let page = queryParams.get('page');
  const query = queryParams.get('query');
  const { type } = useParams();
  console.log(type);

  if (!page) {
    page = '1';
  }
  const { data, isLoading } = useSearchMovie(query, parseInt(page));
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  if (isLoading) return <LoadingIndicator />;
  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;

    // Update the URL with the new page parameter
    queryParams.set('page', newPage.toString());
    navigate(`${window.location.pathname}?${queryParams.toString()}`);
  };
  return (
    <div className='w-auto min-h-screen bg-background flex px-24 pt-20'>
      <div className='w-64 min-w-[15rem] rounded-md border-border border-1 h-fit overflow-hidden'>
        <div className='bg-border p-4'>
          <h2 className='text-xl font-semibold'>Search Results</h2>
        </div>
        <div>
          <ul className='search-menu'>
            <li className={type === 'movies' ? 'selected' : ''}>
              <Link to={`/search/movies${query ? `?query=${query}` : ''}`}>Movies</Link>
              <span>10</span>
            </li>
            <li className={type === 'tv' ? 'selected' : ''}>
              <Link to={`/search/tv${query ? `?query=${query}` : ''}`}>TV Shows</Link>
              <span>10</span>
            </li>
            <li className={type === 'people' ? 'selected' : ''}>
              <Link to={`/search/people${query ? `?query=${query}` : ''}`}>People</Link>
              <span>10</span>
            </li>
            <li className={type === 'keyword' ? 'selected' : ''}>
              <Link to={`/search/keyword${query ? `?query=${query}` : ''}`}>Keyword</Link>
              <span>10</span>
            </li>
          </ul>
        </div>
      </div>
      {data ? (
        <div className='space-y-4 ml-12'>
          {data?.movies.map((movie: Movie) => (
            <div key={movie.id}>
              <MovieCardSearch
                movieId={movie.id}
                posterPath={buildImageUrl(movie.posterPath, 'original')}
                title={movie.title}
                releaseDate={formatDateToDDMMYYYY(movie.releaseDate)}
                overview={movie.overview}
              />
            </div>
          ))}
          <ReactPaginate
            className='react-paginate'
            breakLabel='...'
            nextLabel='Next >'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            initialPage={data?.page - 1}
            pageCount={data?.total_page}
            previousLabel='< Prev'
            renderOnZeroPageCount={null}
          />
        </div>
      ) : (
        <div className='flex flex-col ml-12 space-y-4'>
          <h1>{INVALID_SEARCH_QUERY}</h1>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
