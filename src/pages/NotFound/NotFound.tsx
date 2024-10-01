import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div>
      <img src='/src/assets/images/404.svg' alt='404' className='w-2/5 pt-24 mx-auto' />
      <h1 className='text-4xl font-bold text-center mt-10'>Page not found</h1>
    </div>
  );
};

export default NotFound;
