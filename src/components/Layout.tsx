import React from 'react';
import { Outlet } from 'react-router-dom';
// import { NavBar } from './Navbar';
import { useNavigate } from 'react-router-dom';

export const Layout: React.FC = () => {
  const nav = useNavigate();
  return (
    <div className="mx-auto max-w-4xl">
      {/* <NavBar /> */}
      <div>
        <button onClick={() => nav('/')}>Home Page</button>
      </div>
      <div className="py-2 px-6">
        <Outlet />
      </div>
    </div>
  );
};
