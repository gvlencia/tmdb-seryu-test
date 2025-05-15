import React, { useState } from 'react';
import { addFavoriteMovie } from '../services/movieApi';
import TMDBLoginModal from './TMDBLoginModal'; 

interface ButtonFavProps {
  id: number;
}

const ButtonFav: React.FC<ButtonFavProps> = ({ id }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
    const handleFavorite = async(id: number) => {
      const session_id = localStorage.getItem('tmdb_session_id');

      if (!session_id) {
        setShowLoginModal(true);
        return;
      }
      
        try {
          const response = await addFavoriteMovie({
            account_id: localStorage.getItem('tmdb_account_id'),         
            session_id: localStorage.getItem('tmdb_session_id'), 
            media_id: id,
            favorite: true,
          });
      
          console.log('Successfully added to favorites:', response);
        } catch (error) {
          console.error('Error adding to favorites:', error);
        }
      };

    return (
      <>
        <button
          onClick={() => handleFavorite(id)}
          className="bg-black/50 text-white p-1 rounded-full hover:bg-white/80 hover:text-black transition cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>

        </button>
       <TMDBLoginModal show={showLoginModal} />
      </>
        
    )
};

export default ButtonFav;