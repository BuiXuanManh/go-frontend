import React, { ReactNode } from 'react';

interface DropdownMenuProps {
  button: React.ReactNode;
  children: ReactNode[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = () => {
  return <div className='dropdown-menu'></div>;
};

export default DropdownMenu;
