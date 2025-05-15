import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutSession } from '../services/authentication'

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const sessionId = localStorage.getItem('tmdb_session_id')
    setIsLoggedIn(!!sessionId)
  }, [])

  const handleLogout = async () => {
    const sessionId = localStorage.getItem('tmdb_session_id')
    if (!sessionId) return
  
    try {
      await logoutSession(sessionId) // ⬅️ Panggil API logout dari TMDB
      localStorage.removeItem('tmdb_session_id')
      localStorage.removeItem('tmdb_request_token')
      window.location.reload() // atau redirect ke halaman home
    } catch (error) {
      console.error('Logout gagal:', error)
    }
  }
  
  return (
    <header className="flex justify-between items-center bg-[#48a8e2] fixed top-0 left-0 right-0 z-50 px-10 sm:px-20 py-2.5 text-white font-['Poppins']">
      <div
        className="font-black text-[20px] sm:text-[40px] tracking-[5px] cursor-pointer"
        onClick={() => navigate('/')}
      >
        C I N E M A
      </div>
      <nav className="flex hidden sm:block">
        <a href="/favorite" className="text-white no-underline ml-[30px] text-[18px]">
          Favorite
        </a>
        <a href="/watchlist" className="text-white no-underline ml-[30px] text-[18px]">
          Watchlist
        </a>

        {isLoggedIn && (
          <button onClick={handleLogout} className="ml-[30px] text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1
                2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0
                1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
