import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-bold hover:text-blue-400 transition duration-300">
              GameZone
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <span 
              className="text-lg cursor-pointer hover:text-blue-400 transition duration-300"
              onClick={() => navigate('/HomePage')}
            >
              Home
            </span>
            <span 
              className="text-lg cursor-pointer hover:text-blue-400 transition duration-300"
              onClick={() => navigate('/create-game')}
            >
              Add Game
            </span>
            <span 
              className="text-lg cursor-pointer hover:text-blue-400 transition duration-300"
              onClick={() => navigate('/Profile')}
            >
                Profile
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-2">
          <span 
            className="block text-lg cursor-pointer text-white hover:text-blue-400 transition duration-300"
            onClick={() => {
              setIsOpen(false);
              navigate('/');
            }}
          >
            Home
          </span>
          <span 
            className="block text-lg cursor-pointer text-white hover:text-blue-400 transition duration-300"
            onClick={() => {
              setIsOpen(false);
              navigate('/add-game');
            }}
          >
            Add Game
          </span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;