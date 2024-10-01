import React from 'react';
import { useQuery } from 'react-query';
import DiscussionSubject from 'src/components/DiscussionSubject/DiscussionSubject';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { options } from 'src/constant/time-option';
import { getUserDiscussion } from 'src/helpers/api';

interface DiscussionListProps {
  title: string;
  nullListMessage: string;
  userId: number;
  id: string;
}

const DiscussionList: React.FC<DiscussionListProps> = ({ nullListMessage, title, userId, id }) => {
  const { data: discussionList, isLoading } = useQuery(
    ['discussionList', userId],
    () => getUserDiscussion(userId.toString()),
    {
      retry: false
    }
  );
  console.log(discussionList);
  return (
    <div id={id} className='mt-3'>
      <h2 className='text-2xl font-bold mb-3'>{title}</h2>
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <>
          {!discussionList && <p>{nullListMessage}</p>}
          {discussionList &&
            discussionList.map((discussion, index) => {
              return (
                <div
                  id={`${id}-card-${index}`}
                  className='border-border border-1 shadow-md shadow-border mt-4 py-4 px-6 flex items-center'
                  key={discussion._id}
                >
                  <DiscussionSubject
                    movie_id={discussion.movie_id}
                    subject={discussion.subject}
                    discussion_id={discussion._id}
                    user_id={discussion.discussion_part[0].user_id}
                    profile_path={discussion.discussion_part[0].profile_path}
                  />
                  <div className='ml-auto w-1/3 flex justify-between items-center'>
                    <p>{discussion.status ? 'Open' : 'Close'}</p>
                    <p>{discussion.discussion_part.length - 1}</p>
                    <div>
                      <p>
                        {new Date(
                          discussion.discussion_part[
                            discussion.discussion_part.length - 1
                          ].timestamp
                        ).toLocaleString('en-US', options)}
                      </p>
                      <p>
                        by {discussion.discussion_part[discussion.discussion_part.length - 1].name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default DiscussionList;
