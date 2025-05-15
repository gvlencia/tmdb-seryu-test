import React, { useState } from 'react';
import { addWatchMovie } from '../services/movieApi';
import TMDBLoginModal from './TMDBLoginModal'; 

interface ButtonWatchProps {
  id: number;
  isWatchlist?: boolean;
}

const ButtonWatch: React.FC<ButtonWatchProps> = ({ id, isWatchlist }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

    const handleWatchlist = async(id: number) => {
      const session_id = localStorage.getItem('tmdb_session_id');

      if (!session_id) {
        setShowLoginModal(true);
        return;
      }

        try {
          const response = await addWatchMovie({
            account_id: localStorage.getItem('tmdb_account_id'),         
            session_id: localStorage.getItem('tmdb_session_id'), 
            media_id: id,
            watchlist: true,
          });
      
          console.log('Successfully added to watchlist:', response);
        } catch (error) {
          console.error('Error adding to watchlist:', error);
        }
    };

    const handleDislist = async(id: number) => {
      const session_id = localStorage.getItem('tmdb_session_id');

      if (!session_id) {
        setShowLoginModal(true);
        return;
      }

        try {
          const response = await addWatchMovie({
            account_id: localStorage.getItem('tmdb_account_id'),         
            session_id: localStorage.getItem('tmdb_session_id'), 
            media_id: id,
            watchlist: false,
          });
      
          console.log('Successfully removed from watchlist:', response);
          window.location.reload();
        } catch (error) {
          console.error('Error removing from watchlist:', error);
        }
    }

    return (
      <>
        <button
          onClick={() => (isWatchlist ? handleDislist(id) :  handleWatchlist(id))}
          className="bg-black/50 text-white p-1 rounded-full hover:bg-white/80 hover:text-black transition cursor-pointer"
        >
          {isWatchlist ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
          </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
          )}

        </button>
        <TMDBLoginModal show={showLoginModal} />
      </>
        
    )
};

export default ButtonWatch;