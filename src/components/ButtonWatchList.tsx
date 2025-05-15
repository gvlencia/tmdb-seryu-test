import React from 'react';
import { addWatchMovie } from '../services/movieApi';

interface ButtonWatchProps {
  id: number;
}

const ButtonWatch: React.FC<ButtonWatchProps> = ({ id }) => {
    const handleWatchlist = async(id: number) => {
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

    return (
        <button
          onClick={() => handleWatchlist(id)}
          className="bg-black/50 text-white p-1 rounded-full hover:bg-white/80 hover:text-black transition cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>

        </button>
    )
};

export default ButtonWatch;