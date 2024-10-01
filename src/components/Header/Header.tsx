import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import logo from 'src/assets/images/Logo.png';
import useUser from 'src/hooks/useUser';
import useUserId from 'src/hooks/useUserId';

type HeaderProps = {
  isOpen: boolean;
  onBurgerMenuClick: () => void;
};

export default function Header(props: HeaderProps) {
  const { onBurgerMenuClick, isOpen } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { userId, hasLogin } = useUserId();

  const { data: user } = useUser(userId);

  const toggleMenu = () => {
    onBurgerMenuClick();
  };

  const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Perform the action you want when Enter is pressed
      navigate(`/search?query=${searchQuery}`);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <header className='py-2 fixed top-0 left-0 w-full bg-background border-b-1 border-border z-50'>
      <div className='flex items-center h-12'>
        <a href='/'>
          <img className='ml-8 w-24 h-4' src={logo} alt='Logo'></img>
        </a>
        <nav>
          <ul className=' text-white hidden lg:flex lg:space-x-14 md:ml-8 md:transform-none xl:ml-16 w-auto'>
            <li>
              <a className='hover:text-primary transition ease-out duration-300' href='/top-rated'>
                Top Rated Movies
              </a>
            </li>
            <li>
              <Link
                className='hover:text-primary transition ease-out duration-300'
                to='/leaderboard'
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                className='hover:text-primary transition ease-out duration-300'
                to='/discussions'
              >
                Discussion
              </Link>
            </li>
          </ul>
        </nav>
        <div className='flex items-center relative ml-auto'>
          <input
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleEnterKeyPress}
            className='ml-auto mr-6 w-64 hidden lg:block xl:mr-10 xl:w-80 h-9 pr-8 rounded-md'
            placeholder='Search...'
          ></input>
          <svg
            className='w-4 h-4 hover:text-primary text-white absolute right-12 transition ease-out duration-300 cursor-pointer'
            onClick={() => navigate(`/search?query=${searchQuery}`)}
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            ></path>
          </svg>
        </div>
        <button className='border-none group/lang flex items-center w-auto px-1 hover:bg-transparent hover:text-primary'>
          <span>EN</span>
          <svg
            className='pl-1 w-4 h-4 text-white group-hover/lang:text-primary transition ease-out duration-300'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 8.25l-7.5 7.5-7.5-7.5'
            ></path>
          </svg>
        </button>
        {hasLogin ? (
          <>
            <svg
              className='w-6 h-6 ml-12 mr-12'
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='25'
              viewBox='0 0 20 25'
              fill='none'
            >
              <path
                d='M20 18.0704V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19V18.0704C3.44775e-06 17.7411 0.0812955 17.4169 0.236661 17.1266C0.392026 16.8363 0.616659 16.5889 0.89062 16.4062L1.21881 16.1874C1.76673 15.8222 2.21598 15.3273 2.52671 14.7467C2.83743 14.1661 3.00001 13.5178 3 12.8592V9C3.00043 7.49286 3.48726 6.02611 4.3881 4.81783C5.28895 3.60955 6.5557 2.72428 8 2.29364V1C8 0.734784 8.10536 0.48043 8.29289 0.292893C8.48043 0.105357 8.73478 0 9 0H11C11.2652 0 11.5196 0.105357 11.7071 0.292893C11.8946 0.48043 12 0.734784 12 1V2.31073C13.4633 2.79869 14.7348 3.7368 15.6328 4.99093C16.5309 6.24505 17.0094 7.751 17 9.29346V12.8592C17 13.5178 17.1626 14.1661 17.4733 14.7467C17.784 15.3273 18.2333 15.8222 18.7812 16.1874L19.1094 16.4062C19.3833 16.5889 19.608 16.8363 19.7633 17.1266C19.9187 17.4169 20 17.7411 20 18.0704ZM8 23C8 23.5304 8.21071 24.0391 8.58579 24.4142C8.96086 24.7893 9.46957 25 10 25C10.5304 25 11.0391 24.7893 11.4142 24.4142C11.7893 24.0391 12 23.5304 12 23V22H8V23Z'
                fill='white'
              />
            </svg>
            <img
              id='user-avatar'
              className='w-8 h-8 mr-12 rounded-full'
              src={user?.picture_profile}
              alt='Avatar'
            ></img>
            <Tooltip
              style={{ backgroundColor: 'rgb(55, 65, 81)' }}
              id='user-avatar-tooltip'
              anchorSelect='#user-avatar'
              place='bottom'
            >
              Profiles and Settings
            </Tooltip>

            <Tooltip
              style={{ backgroundColor: 'rgb(55, 65, 81)', minWidth: '170px', padding: '0' }}
              opacity={1}
              place='bottom'
              anchorSelect='#user-avatar'
              openOnClick
              clickable
            >
              <div className='py-1 px-0.5'>
                <div className='p-3'>
                  <h2 className='text-white font-semibold text-md '>
                    <Link to={`/u/${userId}`}>{user?.username}</Link>
                  </h2>
                  <p className='text-xs text-white/70'>
                    <Link to={`/u/${userId}`}>View profile</Link>
                  </p>
                </div>
                <hr className='border-white/30'></hr>
                <ul className='my-1'>
                  <li className=' hover:bg-gray-800 py-1.5 px-3'>
                    <Link to={`/u/${userId}/discussion`}>Discussion</Link>
                  </li>
                  <li className=' hover:bg-gray-800 py-1.5 px-3'>
                    <Link to={`/u/${userId}/recommendations`}>Recommendation</Link>
                  </li>
                  <li className=' hover:bg-gray-800 py-1.5 px-3'>
                    <Link to={`/u/${userId}/ratings`}>Ratings</Link>
                  </li>
                  <li className=' hover:bg-gray-800 py-1.5 px-3'>
                    <Link to={`/u/${userId}/watchlist`}>Watchlist</Link>
                  </li>
                </ul>
                <hr className='border-white/30'></hr>
                <ul className='my-1'>
                  <li className=' hover:bg-gray-800 py-1.5 px-3'>
                    <Link to={`/profiles`}>Edit Profile</Link>
                  </li>
                  <li className=' hover:bg-gray-800 py-1.5 px-3'>
                    <Link to={`/change-password`}>Change Password</Link>
                  </li>
                </ul>
                <hr className='border-white/30'></hr>
                <p className=' mt-1 hover:bg-gray-800 py-1.5 px-3'>
                  <Link to='/logout'>Logout</Link>
                </p>
              </div>
            </Tooltip>
          </>
        ) : (
          <button
            className='primary-btn w-auto px-5 h-9 ml-6 mr-10 xl:ml-11 xl:mr-18 '
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>
        )}

        <nav>
          <button
            className={` w-10 h-10 mr-6 lg:hidden relative focus:outline-none border-none hover:bg-transparent hover:text-primary transition ease-out ${
              isOpen ? 'text-primary' : 'text-white'
            }`}
            onClick={toggleMenu}
          >
            <span className='sr-only'>Open main menu</span>
            <div className='block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2'>
              <span
                aria-hidden='true'
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  isOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                aria-hidden='true'
                className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out ${
                  isOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                aria-hidden='true'
                className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${
                  isOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </nav>
      </div>
    </header>
  );
}
