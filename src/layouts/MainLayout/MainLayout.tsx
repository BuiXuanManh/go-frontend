import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import SideBar from 'src/components/Sidebar/Sidebar';

export default function MainLayout() {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setSideBarOpen(!isSideBarOpen);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSideBar();
      }
    };

    if (isSideBarOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSideBarOpen]);
  return (
    <div id='outer-container'>
      <Header onBurgerMenuClick={toggleSideBar} isOpen={isSideBarOpen} />
      <div className='mt-16 min-h-screen pb-4 bg-background' id='page-wrap'>
        <Outlet />
      </div>
      <Footer />
      {isSideBarOpen && (
        <div
          className='lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10'
          onClick={closeSideBar}
          onKeyDown={event => {
            // Handle keyboard events for accessibility
            if (event.key === 'Enter' || event.key === ' ') {
              closeSideBar();
            }
          }}
          role='button'
          tabIndex={0} // Make the overlay focusable
        ></div>
      )}{' '}
      <SideBar isOpen={isSideBarOpen} onClose={closeSideBar} />
    </div>
  );
}
