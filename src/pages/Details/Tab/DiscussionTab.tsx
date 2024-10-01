import LoadingIndicator from 'src/components/LoadingIndicator';
import DiscussionCard from 'src/components/Discussion/DiscussionCard';
import { options } from 'src/constant/time-option';
import { buildImageUrl } from 'src/helpers/utils';
import Discussion from 'src/types/Discussion.type';
import { Link } from 'react-router-dom';
import useMovieDiscussion from 'src/hooks/useMovieDiscussion';

type DiscussionTabProps = {
  movieId: number;
};

export default function DiscussionTab({ movieId }: DiscussionTabProps) {
  const { isLoading: isDiscussionLoading, data: discussions } = useMovieDiscussion(
    movieId?.toString()
  );

  if (isDiscussionLoading) return <LoadingIndicator />;
  return (
    <div className='border-border border-b-1'>
      {!discussions ? (
        <p>No discussions yet</p>
      ) : (
        <div className='space-y-3 mt-3'>
          {discussions.slice(0, 3).map((discussion: Discussion) => {
            return (
              <DiscussionCard
                key={discussion?._id}
                discussionId={discussion?._id}
                userId={discussion?.discussion_part[0]?.user_id.toString()}
                answerCount={discussion?.discussion_part.length - 1}
                profilePath={discussion?.discussion_part[0]?.profile_path}
                status={discussion?.status}
                subject={discussion?.subject}
                time={new Date(discussion?.discussion_part[0]?.timestamp).toLocaleString(
                  'en-US',
                  options
                )}
                username={discussion?.discussion_part[0]?.name}
              ></DiscussionCard>
            );
          })}
        </div>
      )}
      <Link className='hover:opacity-70' to='discussions'>
        <h3 className='font-semibold my-5'>Go to discussion</h3>
      </Link>
    </div>
  );
}
