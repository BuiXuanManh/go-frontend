import React from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from 'src/components/BreadCrumbs/BreadCrumbs';
import LoadingIndicator from 'src/components/LoadingIndicator';
import Table from 'src/components/Table/Table';
import { options } from 'src/constant/time-option';
import { getMovieDiscussion } from 'src/helpers/api';
import useMovieDetail from 'src/hooks/useMovieDetail';

const DiscussionMovie: React.FC = () => {
  const { id } = useParams();
  const headers = [
    { title: 'Subject', dataIndex: 'subject', className: 'w-1/2 px-4 py-4' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Replies', dataIndex: 'replies' },
    { title: 'Last Reply', dataIndex: 'last_reply' }
  ];
  const { data: movie, isLoading: isMovieLoading } = useMovieDetail(id);

  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['movieDiscussion', id], () => getMovieDiscussion(id), {
    enabled: !!id,
    retry: false,
    staleTime: 0,
    select: data => {
      console.log(data);
      return data?.map((discussion: any) => {
        return {
          _id: discussion._id,
          subject: (
            <div className='flex items-center'>
              <Link to={`/u/${discussion.discussion_part[0].user_id}`}>
                <img
                  className='w-10 h-10 mr-4 rounded-full'
                  src={discussion.discussion_part[0].profile_path}
                  alt='user profile'
                />
              </Link>
              <Link
                className='hover:text-white/70'
                to={`/details/${discussion.movie_id}/discussions/${discussion._id}`}
              >
                {discussion.subject}
              </Link>
            </div>
          ),
          status: discussion.status ? 'Open' : 'Closed',
          replies: discussion.discussion_part.length - 1,
          last_reply: (
            <div>
              <p>
                {new Date(
                  discussion.discussion_part[discussion.discussion_part.length - 1].timestamp
                ).toLocaleString('en-US', options)}
              </p>
              <p>by {discussion.discussion_part[discussion.discussion_part.length - 1].name}</p>
            </div>
          )
        };
      });
    }
  });
  if (isLoading) return <LoadingIndicator />;

  return (
    <div className='w-full p-8'>
      {isMovieLoading && `Let's Chat`}
      {!isMovieLoading && <h2 className='text-2xl font-semibold'>Discuss {movie?.title}</h2>}
      <BreadCrumbs />

      <Table
        className='border-border border-1 shadow-md shadow-border/50 rounded-sm mt-8 w-full'
        classNameTable='bg-transparent w-full'
        classNameBody='border-t border-[#01b4e4]/50'
        classNameRowSelected={data ? '' : 'bg-border/30 '}
        classNameHeader='bg-transparent text-white text-left'
        classNameRow='bg-border/30 '
        classNameRowOdd='bg-transparent '
        noDivider={true}
        canSelected={false}
        headers={headers}
        data={
          data
            ? data
            : [
                {
                  subject: <p>No discussions.</p>,
                  colSpan: 4
                }
              ]
        }
      />
    </div>
  );
};

export default DiscussionMovie;
