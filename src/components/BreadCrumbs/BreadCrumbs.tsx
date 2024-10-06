/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { NavLink } from 'react-router-dom';
import useMovieDetail from 'src/hooks/useMovieDetail';
// import useDiscussion from 'src/hooks/useDiscussion';
import { useQuery } from 'react-query';
import { getDiscussion } from 'src/helpers/api';

function BreadCrumbsMovie({ match }: { match: any }) {
  const { data: movie, isLoading: isMovieLoading } = useMovieDetail(match.params.movieId);
  if (isMovieLoading) return <span>Movie</span>;
  return <span>{movie?.title}</span>;
}

function BreadCrumbsDiscussion({ match }: { match: any }) {
  const { data: discussion, isLoading } = useQuery(['discussion', match.params.discussionId], () =>
    getDiscussion(match.params.discussionId)
  );
  if (isLoading) return <span>Discussion Detail</span>;
  return <span>{discussion.subject}</span>;
}

function BreadCrumbsMovieDiscussion({ match }: { match: any }) {
  const { data: discussion, isLoading } = useQuery(['discussion', match.params.discussionId], () =>
    getDiscussion(match.params.discussionId)
  );
  if (isLoading) return <span>Discussion Detail</span>;
  return <span>{discussion.subject}</span>;
}

const BreadCrumbs = () => {
  const routes = [
    { path: '/details/:movieId', breadcrumb: BreadCrumbsMovie },
    { path: '/discussions/:discussionId', breadcrumb: BreadCrumbsDiscussion },
    { path: '/details/:movieId/discussions/:discussionId', breadcrumb: BreadCrumbsMovieDiscussion },
    { path: 'details', breadcrumb: null }
  ];

  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className='text-lg mt-2'>
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <>
          <NavLink key={match.pathname} to={match.pathname}>
            {breadcrumb}
          </NavLink>
          {index !== breadcrumbs.length - 1 && ' → '}
        </>
      ))}
    </div>
  );
};
export default BreadCrumbs;
