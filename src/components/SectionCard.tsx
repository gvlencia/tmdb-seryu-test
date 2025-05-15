import React from 'react';
import MovieCard from './MovieCard';

import '../styles/SectionCard.css'; 

interface Movie {
  id: number;
  title: string;
  year: string;
  posterUrl: string;
  isFavorite?: boolean;
  isWatchlist?: boolean;
}

interface WatchlistProps {
  title: string;
  movies: Movie[];
}

const Watchlist: React.FC<WatchlistProps> = ({ title, movies }) => {
  return (
    <div className="bg-black min-h-screen py-8">
      <h1 className="text-white text-3xl font-bold mb-6 section-card-title">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie, idx) => (
          <MovieCard
            id={movie.id}
            key={idx}
            title={movie.title}
            year={movie.year}
            image={movie.posterUrl}
            isFavorite={movie.isFavorite}
            isWatchlist={movie.isWatchlist}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
