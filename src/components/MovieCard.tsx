import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MovieCard.css'; // Pastikan path ini sesuai dengan struktur folder Anda
import { addFavoriteMovie } from '../services/movieApi';

import ButtonFav from './ButtonFav';
import ButtonWatch from './ButtonWatchList';

interface MovieCardProps {
  id: number;
  title: string;
  year: string;
  image: string;
  isFavorite?: boolean;
  isWatchlist?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, year, image, isFavorite, isWatchlist }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${id}`);
  };

  const handleFavorite = async(id: number) => {
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
    <div className="movie-card relative group " >
      <img src={image} alt={title} />
      <div className="absolute bottom-20 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ButtonFav id={id} isFavorite={isFavorite}/>
        <ButtonWatch id={id} isWatchlist={isWatchlist}/>
      </div>
      <div className="movie-info cursor-pointer" onClick={handleClick}>
        <h4 className='movie-title truncate'>{title}</h4>
        <p>{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
