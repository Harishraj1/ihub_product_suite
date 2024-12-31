import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../assert/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by looking for a flag in localStorage/sessionStorage
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove the login flag from localStorage
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-10">
          <img className="w-12 cursor-pointer" src={logo} alt="logo" />
          <p className="flex items-center font-medium">
            Products <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
          </p>
          <p className="flex items-center font-medium">
            Solutions <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
          </p>
          <p className="font-medium">About</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-10 font-medium">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              {/* Profile Icon */}
              <div className="w-10 h-10 rounded-full bg-gray-400 flex justify-center items-center text-white cursor-pointer">
                <span>P</span> {/* Use user's first letter as placeholder */}
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <p onClick={() => navigate('/login')} className="cursor-pointer">Log in</p>
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center space-x-2 bg-black text-white px-8 py-2 rounded-md"
              >
                <span>Get Started</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
