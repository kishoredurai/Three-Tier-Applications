  /* Home.js */

  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import './Home.css';

  function Home() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleDropdown = () => setDropdownOpen((open) => !open);
    const handleSelect = (role) => {
      setSelected(role);
      setDropdownOpen(false);
    };

    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 to-blue-100 animate-fade-in">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600 animate-pulse drop-shadow-lg">Welcome to Student-Teacher Portal</h1>
          <p className="text-lg text-gray-700 font-medium animate-fade-in-slow">Select your role to get started</p>
        </div>
        <div className="w-full max-w-xs">
          <div className="relative">
            <button onClick={handleDropdown} className="w-full flex justify-between items-center px-6 py-4 bg-white border-2 border-orange-400 rounded-xl shadow-lg font-bold text-lg text-gray-800 hover:bg-orange-50 transition-all duration-200 focus:outline-none">
              {selected ? selected : 'Choose Role'}
              <svg className={`w-5 h-5 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-orange-200 rounded-xl shadow-xl animate-dropdown">
                <button onClick={() => handleSelect('Student')} className="block w-full text-left px-6 py-3 hover:bg-orange-100 rounded-t-xl">Student</button>
                <button onClick={() => handleSelect('Teacher')} className="block w-full text-left px-6 py-3 hover:bg-orange-100 rounded-b-xl">Teacher</button>
              </div>
            )}
          </div>
          {selected && (
            <div className="mt-8 flex flex-col items-center gap-6 animate-fade-in-slow">
              <div className="w-full">
                <Link to={`/${selected.toLowerCase()}`} className="block w-full px-8 py-6 bg-gradient-to-b from-orange-400 to-orange-600 text-white rounded-2xl shadow-2xl text-2xl font-bold text-center border-4 border-orange-300 hover:scale-105 hover:shadow-orange-400 transition-transform duration-200">
                  Go to {selected} Portal
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  export default Home;
