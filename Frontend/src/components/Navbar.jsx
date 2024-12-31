import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../assert/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

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
          <p 
            onClick={() => navigate('/login')} 
            className="cursor-pointer">Log in</p>
          <button
            onClick={() => navigate('/signup')}
            className="flex items-center space-x-2 bg-black text-white px-8 py-2 rounded-md"
          >
            <span>Get Started</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
