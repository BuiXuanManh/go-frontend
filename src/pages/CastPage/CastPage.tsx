import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { buildCastWikiReference, buildImageUrl, mapJsonToCrews } from 'src/helpers/utils';
import useCast from 'src/hooks/useCasts';
import useCrew from 'src/hooks/useCrew';
import useMovieDetail from 'src/hooks/useMovieDetail';
import Crew from './../../types/Crew';

function CastPage() {
  const { id } = useParams();
  console.log(id);
  const { data: movieDetailData, isLoading: movieDetailIsLoading } = useMovieDetail(id);
  const { data: casts, isLoading: castsIsLoading } = useCast(id);
  const navigate = useNavigate();

  const createDepartmentMap = data => {
    const crewData = mapJsonToCrews(data.crew);
    console.log(crewData);
    return crewData.reduce((acc, obj) => {
      const department = obj.department;

      if (acc.hasOwnProperty(department)) {
        acc[department].push(obj);
      } else {
        acc[department] = [obj];
      }

      return acc;
    }, {});
  };

  const { data: crews, isLoading: crewsIsLoading } = useCrew(id, createDepartmentMap);

  console.log(crews);
  return (
    <div className=''>
      {!movieDetailIsLoading && (
        <div className='flex w-full mt-16 h-40 items-center px-16 bg-gray-700 '>
          <Link to={`/details/${id}`}>
            <img
              className='w-20 h-32 rounded-md'
              src={buildImageUrl(movieDetailData?.posterPath, 'w92')}
              alt={movieDetailData?.title}
            />
          </Link>

          <div className='ml-4'>
            <Link className='hover:text-white/70' to={`/details/${id}`}>
              <h2 className='text-4xl font-bold'>
                {movieDetailData?.title}
                <span className='text-white/70 font-normal'>
                  {' ('}
                  {movieDetailData?.releaseDate.getFullYear()}
                  {')'}
                </span>
              </h2>
            </Link>
            <button
              onClick={() => navigate(`/details/${id}`)}
              className='text-white/70 hover:text-white/50 font-semibold'
            >
              &larr; Back to main
            </button>
          </div>
        </div>
      )}
      {movieDetailIsLoading && <LoadingIndicator />}
      <div className='flex w-full  px-16 mt-8 flex-wrap'>
        <div className='w-1/2'>
          <h3 className='text-xl font-semibold'>
            Cast <span className='text-white/70 font-normal'>{casts?.length}</span>
          </h3>
          <ul className='space-y-4 mt-4'>
            {casts?.map(cast => (
              <li className='flex items-center' key={cast.id}>
                <Link to={buildCastWikiReference(cast.name)}>
                  <img
                    className='w-16 h-16 object-cover overflow-hidden border-border border-1 shadow-lg shadow-border rounded-md'
                    src={
                      buildImageUrl(cast.profilePath, 'w92') ||
                      `/src/assets/images/placeholder${cast.gender ? '' : '-female'}.svg`
                    }
                    onError={e => {
                      e.currentTarget.src = `/src/assets/images/placeholder${
                        cast.gender ? '' : '-female'
                      }.svg`;
                    }}
                    alt={cast.name}
                  />
                </Link>
                <div className='ml-3'>
                  <Link to={buildCastWikiReference(cast.name)}>
                    <p className='font-semibold'>{cast.name}</p>
                  </Link>

                  <p className='text-white/70'>{cast.character}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-1/2'>
          {crewsIsLoading && <LoadingIndicator />}
          {!crewsIsLoading && (
            <>
              <h3 className='text-xl font-semibold'>
                Crew <span className='text-white/70 font-normal'>{crews?.length}</span>
              </h3>
              {Object.keys(crews).map(department => (
                <div key={department}>
                  <h4 className='mt-4 font-semibold'>{department}</h4>
                  <ul className='space-y-4 mt-4'>
                    {crews[department].map((crewMember: Crew) => (
                      <li className='flex items-center' key={crewMember.id}>
                        <Link to={buildCastWikiReference(crewMember.name)}>
                          <img
                            className='w-16 h-16 object-cover overflow-hidden border-border border-1 shadow-lg shadow-border rounded-md'
                            src={
                              buildImageUrl(crewMember.profile_path, 'w92') ||
                              `/src/assets/images/placeholder${
                                crewMember.gender ? '' : '-female'
                              }.svg`
                            }
                            onError={e => {
                              e.currentTarget.src = `/src/assets/images/placeholder${
                                crewMember.gender ? '' : '-female'
                              }.svg`;
                            }}
                            alt={crewMember.name}
                          />
                        </Link>
                        <div className='ml-3'>
                          <Link to={buildCastWikiReference(crewMember.name)}>
                            <p className='font-semibold'>{crewMember.name}</p>
                          </Link>
                          <p className='text-white/70'>{crewMember.job}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CastPage;
