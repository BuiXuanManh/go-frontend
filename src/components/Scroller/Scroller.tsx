import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ScrollerProps {
  viewMore?: boolean;
  viewMoreLink?: string;
  children?: ReactNode[];
}

const Scroller: React.FC<ScrollerProps> = ({ children, viewMore, viewMoreLink }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showViewMore, setShowViewMore] = useState(viewMore);

  const handleScroll = e => {
    if (e.target.scrollLeft >= 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    const container = document.getElementById('scroller-container');
    if (container) {
      setShowViewMore(container.scrollWidth > container.clientWidth);
    }
  }, [children]);
  return (
    <div
      className={`relative after:content-[""] after:w-14 after:h-full after:absolute after:top-0 after:right-0 after:bg-gradient-to-r after:transition-opacity after:duration-500 from-textbox/0 to-textbox after:pointer-events-none ${
        scrolled ? 'after:opacity-0' : 'after:opacity-100'
      }`}
    >
      <ol
        id='scroller-container'
        className={'flex space-x-4 pb-5 scrollbar overflow-x-scroll'}
        onScroll={handleScroll}
      >
        {children?.map((child, index) => <li key={index}>{child}</li>)}
        {showViewMore && (
          <Link className='font-bold flex items-center' to={viewMoreLink || ''}>
            <span className='w-24'>View more &rarr;</span>
          </Link>
        )}
      </ol>
    </div>
  );
};

export default Scroller;
