import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import LoadingIndicator from 'src/components/LoadingIndicator';
import SidebarDiscussion from 'src/components/SidebarDiscussion/SidebarDiscussion';
import useMovieDetail from 'src/hooks/useMovieDetail';
import DiscussionForm from 'src/pages/Discussion/DiscussionForm';

function DiscussionLayout() {
  const [isNewDiscussion, setIsNewDiscussion] = useState(false);

  const handleNewDiscussion = () => {
    setIsNewDiscussion(true);
  };
  const { id } = useParams();

  const { data: movie, isLoading: isMovieLoading } = useMovieDetail(id || '');

  return (
    <div className='w-screen min-h-screen flex bg-background relative'>
      <SidebarDiscussion
        isNewDiscussion={isNewDiscussion}
        isOnMoviePage={id !== null && id !== undefined}
        onNewDiscussion={handleNewDiscussion}
      />
      {isMovieLoading ? (
        <LoadingIndicator />
      ) : isNewDiscussion ? (
        <DiscussionForm
          movieId={id}
          movieTitle={movie?.title}
          setIsNewDiscussion={setIsNewDiscussion}
        />
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default DiscussionLayout;
