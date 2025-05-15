import React, { useState } from 'react';
import { addFavoriteMovie } from '../services/movieApi';
import TMDBLoginModal from './TMDBLoginModal'; 

interface ButtonFavProps {
  id: number;
  isFavorite?: boolean;
}

const ButtonFav: React.FC<ButtonFavProps> = ({ id, isFavorite }) => {
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

    const handleDislike = async(id: number) => {
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
            favorite: false,
          });
      
          console.log('Successfully removed from favorites:', response);
          window.location.reload();
        } catch (error) {
          console.error('Error removing from favorites:', error);
        }
    }

    return (
      <>
        <button
          onClick={() => (isFavorite ? handleDislike(id) : handleFavorite(id))}
          className="bg-black/50 text-white p-1 rounded-full hover:bg-white/80 hover:text-black transition cursor-pointer"
        >
         {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          )}


        </button>
       <TMDBLoginModal show={showLoginModal} />
      </>
        
    )
};

export default ButtonFav;