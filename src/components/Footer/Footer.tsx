import React from 'react';
import logo from 'src/assets/images/Logo.png';

export default function Footer() {
  return (
    <footer className='bg-background border-t-1 border-border'>
      <div className='w-full py-4 flex items-center flex-wrap'>
        <img className='ml-8 w-24 h-4' src={logo} alt='Logo'></img>

        <span className=' text-white/60 pl-7 text-xs'>
          © TMDB, 2019—2021
          <br />
          Create by{' '}
          <a href='fb.com' className='text-primary hover:underline'>
            ABC
          </a>
        </span>

        <ul className='flex flex-wrap items-center ml-auto mr-11 text-sm font-normal text-white'>
          <li>
            <a href='about' className='mr-4 hover:underline md:mr-6 '>
              About
            </a>
          </li>
          <li>
            <a href='privacy' className='mr-4 hover:underline md:mr-6'>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href='contact' className='hover:underline'>
              Contact
            </a>
          </li>
        </ul>
        <button className='w-10 h-10 mr-12 md:mr-24'>
          <svg
            className='p-2'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              clipRule='evenodd'
              fillRule='evenodd'
              d='M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z'
            ></path>
          </svg>
        </button>
      </div>
    </footer>
  );
}
