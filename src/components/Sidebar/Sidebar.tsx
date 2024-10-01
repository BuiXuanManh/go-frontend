// SideBar.tsx
import React from 'react';

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-16 lg:hidden w-[18.75rem] bg-background p-5 z-20 border-primary border-t-4 transition ease-in-out duration-300 h-[calc(100%-3.5rem)] ${
        isOpen ? 'right-0' : 'right-[-18.75rem]'
      }`}
    >
      <nav>
        <ul className=' text-white space-y-6 mt-4 md:transform-none w-auto'>
          <li>
            <a className='hover:text-primary transition ease-out duration-300' href='movies'>
              Movies
            </a>
          </li>
          <li>
            <a className='hover:text-primary transition ease-out duration-300' href='tv-shows'>
              Tv shows
            </a>
          </li>
          <li>
            <a className='hover:text-primary transition ease-out duration-300' href='people'>
              People
            </a>
          </li>
          <li>
            <a className='hover:text-primary transition ease-out duration-300' href='people'>
              More
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
