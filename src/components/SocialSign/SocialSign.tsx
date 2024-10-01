import React from 'react';
import './SocialSign.css';

export default function SocialSign() {
  return (
    <div className='sign__social'>
      <a className='fb' href='https://www.facebook.com/'>
        <img src='/src/assets/images/fb.svg' alt='My Happy SVG' />
      </a>
      <a className='tw' href='https://twitter.com/'>
        <img src='/src/assets/images/tw.svg' alt='My Happy SVG' />
      </a>
      <a className='gl' href='https://google.com/'>
        <img src='/src/assets/images/gg.svg' alt='My Happy SVG' />
      </a>
    </div>
  );
}
