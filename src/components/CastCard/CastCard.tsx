import React from 'react';
import { buildImageUrl } from 'src/helpers/utils';

interface CastCardProps {
  imageUrl: string;
  name: string;
  character: string;
  profilePath: string;
  gender: boolean;
}

const CastCard: React.FC<CastCardProps> = ({ imageUrl, name, character, profilePath, gender }) => {
  return (
    <div className='hover:shadow-gray-800/70 hover:shadow-lg shadow-none transition border-border rounded-lg border-1 h-72 w-[8rem] bg-textbox overflow-clip'>
      <a href={profilePath} target='_blank' rel='noreferrer'>
        <img
          className='w-[8.6rem] h-[10.9rem]'
          src={imageUrl || `/src/assets/images/placeholder${gender ? '' : '-female'}.svg`}
          onError={e => {
            e.currentTarget.src = `/src/assets/images/placeholder${gender ? '' : '-female'}.svg`;
          }}
          alt={`${name} as ${character}`}
        />
      </a>
      <a href={profilePath} className='hover:opacity-70' target='_blank' rel='noreferrer'>
        <p className='font-bold mx-2 mt-1'>{name}</p>
      </a>
      <p className='text-sm mx-2'>{character}</p>
    </div>
  );
};

export default CastCard;
